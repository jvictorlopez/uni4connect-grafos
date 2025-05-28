import json, random, pathlib, itertools, faker
from faker import Faker

fake = Faker("pt_BR")
root = pathlib.Path(__file__).parent
out  = root / "data" / "students_mock.json"
out.parent.mkdir(exist_ok=True)

cursos = [
    "Engenharia da Computação", "Direito", "Medicina", "Administração",
    "Arquitetura", "Psicologia", "Publicidade", "Design", "Engenharia Civil"
]
hobbies = ["Leitura", "Séries", "Filmes", "Tocar Instrumento", "Dança",
           "Culinária", "Artesanato", "Fotografia", "Desenho", "Gaming"]
esportes = ["Futebol", "Vôlei", "Natação", "Musculação", "Corrida",
            "Basquete", "Yoga", "Pilates", "Tênis", "Artes Marciais"]
musicas = ["Pop", "Rock", "MPB", "Sertanejo", "Funk", "Trap",
           "Gospel", "Eletrônico", "Jazz", "Indie"]
interesses_prof = [
    "Pesquisa Acadêmica","Estágio","Concursos Públicos","Empreendedorismo",
    "Setor Privado","Consultoria","Startups","ONGs","Freelancer"
]
locais = ["Bar","Restaurante","Balada","Cinema","Praia","Parque","Rolê em Casa"]

def sample(lst,min_=1,max_=3):
    k = random.randint(min_,min(max_,len(lst)))
    return random.sample(lst,k)

estudantes = []
for i in range(1,101):
    curso = random.choice(cursos)
    semestre = random.randint(1,10)
    entry = {
        "id": i,
        "nome": fake.name(),
        "curso": curso,
        "semestre": semestre,
        "tempoFormatura": round(random.uniform(1.0,6.0),1),
        "trabalha": random.choice([True, False]),
        "interessesProfissionais": sample(interesses_prof,2,4),
        "hobbies": sample(hobbies,2,5),
        "esportes": sample(esportes,1,3),
        "estiloMusical": random.choice(musicas),
        "prefereSair": (ps := random.choice([True,False])),
        "locaisSaida": sample(locais,1,3) if ps else [],
        "tipoConexoesDesejadas": sample(["Amizades",
                                         "Oportunidades Profissionais",
                                         "Dates"],1,3)
    }
    estudantes.append(entry)

with open(out, "w", encoding="utf-8") as fp:
    json.dump(estudantes, fp, ensure_ascii=False, indent=2)

print(f"✅ 100 alunos falsos salvos em {out}")
