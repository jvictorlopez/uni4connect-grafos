"""
╔═══════════════════════════════════════════════════════════════════════════╗
║  Uni4Connect – API de Recomendação de Networking Acadêmico               ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  OBJETIVO                                                                ║
║  ─ Receber o perfil do aluno logado (formulário do front)                ║
║  ─ Calcular similaridade com os 100 alunos mockados                      ║
║  ─ Construir um GRAFO NÃO DIRECIONADO, PONDERADO                         ║
║    • Nós   → estudantes                                                  ║
║    • Arestas→ similaridade (peso)                                        ║
║  ─ Detectar comunidades (Louvain) e hubs (Betweenness Centrality)        ║
║  ─ Devolver em formato D3.js (nodes[] + links[])                         ║
║                                                                         ║
║  TEORIA (resumida nos comentários abaixo)                                ║
║  • Algoritmo de recomendação ≈ modelo “People You May Know”              ║
║    usado em LinkedIn / Instagram:                                        ║
║      ↳ similaridade de atributos (conteúdo) +                             ║
║      ↳ proximidade topológica (amigos-de-amigos / communities)           ║
║  • Louvain para descoberta de comunidades (versão leve de clustering     ║
║    hierárquico semelhante ao “interest clusters” do Instagram)           ║
║  • Betweenness Centrality ≈ quantifica influência de um nó (análoga      ║
║    a “usuários conectores” em redes sociais).                            ║
╚═══════════════════════════════════════════════════════════════════════════╝
"""

# backend/main.py  –  versão com garantia de vizinhos + componentes fortes
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import itertools, json, pathlib
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

try:
    import community as community_louvain  # python-louvain
except ImportError:
    raise RuntimeError("pip install python-louvain")

# ───────────────────────── Carga inicial ───────────────────────── #
ROOT = pathlib.Path(__file__).parent
DATA_FILE = ROOT / "data" / "students_mock.json"
DATA: List[Dict[str, Any]] = json.loads(DATA_FILE.read_text("utf-8"))
_next_id = max(s["id"] for s in DATA) + 1

# ───────────────────────── FastAPI / CORS ──────────────────────── #
app = FastAPI(title="Uni4Connect-API", version="0.3.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ────────────────────────── Modelos ────────────────────────────── #
class StudentIn(BaseModel):
    nomeCompleto: str
    curso: str
    semestre: str
    tempoFormatura: str
    trabalhando: bool
    interessesProfissionais: List[str]
    hobbies: List[str]
    esportes: List[str]
    estilosMusical: List[str]
    prefereSair: bool
    locaisLazer: List[str]
    tipoConexoes: List[str]

class Node(BaseModel):
    id: int
    label: str
    group: str
    community: int
    component: int
    centrality: float

class Link(BaseModel):
    source: int
    target: int
    weight: float
    reason: str

class GraphResponse(BaseModel):
    nodes: List[Node]
    links: List[Link]
    stats: Dict[str, Any]

# ────────────── Similaridade (Jaccard + pesos) ─────────────────── #
def jaccard(a:set,b:set): return 0 if not (a or b) else len(a&b)/len(a|b)

def sim_alunos(a,b):
    s_hobby   = jaccard(set(a["hobbies"]), set(b["hobbies"]))
    s_curso   = 1.0 if a["curso"]==b["curso"] else 0.0
    s_esporte = jaccard(set(a["esportes"]), set(b["esportes"]))
    s_musica  = 1.0 if a["estiloMusical"]==b["estiloMusical"] else 0.0
    s_prof    = jaccard(set(a["interessesProfissionais"]),
                        set(b["interessesProfissionais"]))
    score = 0.30*s_hobby + 0.25*s_curso + 0.15*s_esporte + 0.10*s_musica + 0.20*s_prof
    reasons = {"Hobbies":s_hobby,"Curso":s_curso,"Esportes":s_esporte,"Música":s_musica,"Profissional":s_prof}
    return dict(score=round(score,4), reason=max(reasons,key=reasons.get))

# ────────────────── Construção do Grafo Generalizado ───────────── #
def build_graph(alunos, threshold=0.25):
    G = nx.Graph()
    for stu in alunos:
        G.add_node(stu["id"], label=stu["nome"], group=stu["curso"])
    for a,b in itertools.combinations(alunos,2):
        sim = sim_alunos(a,b)
        if sim["score"]>=threshold:
            G.add_edge(a["id"], b["id"], weight=sim["score"], reason=sim["reason"])
    return G

GRAPH_BASE = build_graph(DATA)

# ──────────────── Métricas: Louvain, Componentes, BC ───────────── #
def enrich(G:nx.Graph):
    # Comunidades Louvain
    part = community_louvain.best_partition(G, weight="weight")
    nx.set_node_attributes(G, part, "community")
    # Componentes fortemente conexas (aqui == connected components)
    for comp_id, comp_nodes in enumerate(nx.connected_components(G), start=1):
        for n in comp_nodes:
            G.nodes[n]["component"] = comp_id
    # Betweenness centrality normalizado
    bc = nx.betweenness_centrality(G, weight="weight")
    maxbc = max(bc.values()) or 1
    nx.set_node_attributes(G, {n:round(v/maxbc,4) for n,v in bc.items()}, "centrality")

# ────────────────── Garantia de k vizinhos ----------------------- #
def ensure_k_neighbors(G:nx.Graph, new_student, alunos, k=7):
    """Se o novo nó não tiver vizinhos suficientes, força k mais similares."""
    current_neighbors = set(G.neighbors(new_student["id"]))
    if len(current_neighbors) >= k:
        return
    # calcula todas similaridades
    scores = [
        (sim_alunos(new_student, other)["score"], other["id"],
         sim_alunos(new_student, other)["reason"])
        for other in alunos if other["id"]!=new_student["id"]
    ]
    scores.sort(reverse=True)
    for score, oid, reason in scores:
        if oid in current_neighbors: continue
        G.add_edge(new_student["id"], oid, weight=score, reason=reason)
        current_neighbors.add(oid)
        if len(current_neighbors)>=k: break

# ─────────────────────────── API -------------------------------- #
@app.post("/submeter-perfil", response_model=GraphResponse)
async def submeter(perfil: StudentIn):
    global _next_id
    new_student = {
        "id": _next_id,
        "nome": perfil.nomeCompleto,
        "curso": perfil.curso,
        "semestre": int(perfil.semestre or 0),
        "tempoFormatura": float(perfil.tempoFormatura or 0),
        "trabalha": perfil.trabalhando,
        "interessesProfissionais": perfil.interessesProfissionais,
        "hobbies": perfil.hobbies,
        "esportes": perfil.esportes,
        "estiloMusical": perfil.estilosMusical[0] if perfil.estilosMusical else "",
        "prefereSair": perfil.prefereSair,
        "locaisSaida": perfil.locaisLazer,
        "tipoConexoesDesejadas": perfil.tipoConexoes,
    }
    _next_id = max(s["id"] for s in DATA) + 1

    alunos = DATA + [new_student]
    G = build_graph(alunos, threshold=0.25)
    ensure_k_neighbors(G, new_student, alunos, k=7)
    enrich(G)

    ego_nodes = [new_student["id"]] + list(G.neighbors(new_student["id"]))
    SG = G.subgraph(ego_nodes).copy()

    nodes = [
        Node(
            id=n,
            label=SG.nodes[n]["label"],
            group=SG.nodes[n]["group"],
            community=SG.nodes[n]["community"],
            component=SG.nodes[n]["component"],
            centrality=SG.nodes[n]["centrality"],
        ) for n in SG.nodes
    ]
    links = [
        Link(
            source=u, target=v,
            weight=d["weight"], reason=d["reason"]
        ) for u,v,d in SG.edges(data=True)
    ]
    stats = {
        "n_nodes": SG.number_of_nodes(),
        "n_edges": SG.number_of_edges(),
        "components": len(set(nx.get_node_attributes(SG,"component").values())),
        "avg_similarity": round(sum(d["weight"] for _,_,d in SG.edges(data=True))/(SG.number_of_edges() or 1),3)
    }
    return GraphResponse(nodes=nodes, links=links, stats=stats)

@app.get("/ping")
async def ping(): return {"status":"ok"}
