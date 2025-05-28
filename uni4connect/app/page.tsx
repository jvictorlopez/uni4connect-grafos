"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Network,
  GraduationCap,
  Briefcase,
  Music,
  Coffee,
  BookOpen,
  Dumbbell,
  MapPin,
  Filter,
  Zap,
} from "lucide-react"

export default function LinkedUniforPrototype() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    curso: "",
    semestre: "",
    tempoFormatura: "",
    trabalhando: false,
    interessesProfissionais: [] as string[],
    hobbies: [] as string[],
    esportes: [] as string[],
    estilosMusical: [] as string[],
    prefereSair: false,
    locaisLazer: [] as string[],
    tipoConexoes: [] as string[],
  })

  const cursos = [
    "Administração",
    "Arquitetura e Urbanismo",
    "Ciência da Computação",
    "Direito",
    "Enfermagem",
    "Engenharia Civil",
    "Engenharia de Produção",
    "Fisioterapia",
    "Medicina",
    "Odontologia",
    "Psicologia",
    "Sistemas de Informação",
  ]

  const interessesProfissionais = [
    "Pesquisa Acadêmica",
    "Estágio",
    "Concursos Públicos",
    "Empreendedorismo",
    "Setor Privado",
    "Consultoria",
    "Startups",
    "ONGs",
    "Freelancer",
  ]

  const hobbies = [
    "Leitura",
    "Séries",
    "Filmes",
    "Tocar Instrumento",
    "Dança",
    "Culinária",
    "Artesanato",
    "Fotografia",
    "Desenho",
    "Escrita",
    "Gaming",
  ]

  const esportes = [
    "Futebol",
    "Vôlei",
    "Natação",
    "Musculação",
    "Corrida",
    "Basquete",
    "Tênis",
    "Yoga",
    "Pilates",
    "Artes Marciais",
  ]

  const estilosMusical = [
    "Pop",
    "Rock",
    "MPB",
    "Sertanejo",
    "Funk",
    "Trap",
    "Gospel",
    "Eletrônico",
    "Jazz",
    "Reggae",
    "Indie",
  ]

  const locaisLazer = [
    "Bar",
    "Restaurante",
    "Balada",
    "Cinema",
    "Praia",
    "Parque",
    "Rolê em Casa",
    "Shopping",
    "Teatro",
  ]

  const handleMultiSelect = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Uni4Connect</h1>
                <p className="text-sm text-gray-600">Rede Inteligente de Networking Acadêmico</p>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              <GraduationCap className="w-4 h-4 mr-1" />
              Universidade de Fortaleza
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção 1: Formulário de Cadastro */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Cadastro de Perfil</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Preencha suas informações para encontrar conexões inteligentes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Informações Acadêmicas
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        placeholder="Digite seu nome completo"
                        value={formData.nomeCompleto}
                        onChange={(e) => setFormData((prev) => ({ ...prev, nomeCompleto: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="curso">Curso</Label>
                      <Select
                        value={formData.curso}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, curso: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {cursos.map((curso) => (
                            <SelectItem key={curso} value={curso}>
                              {curso}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="semestre">Semestre Atual</Label>
                      <Select
                        value={formData.semestre}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, semestre: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}`}>
                              {i + 1}º Semestre {i >= 10 ? "(10+)" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="formatura">Tempo para Formatura (anos)</Label>
                      <Input
                        id="formatura"
                        type="number"
                        min="0.5"
                        max="10"
                        step="0.5"
                        placeholder="Ex: 2.5"
                        value={formData.tempoFormatura}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tempoFormatura: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Situação Profissional */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                    Situação Profissional
                  </h3>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="trabalhando"
                      checked={formData.trabalhando}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, trabalhando: checked }))}
                    />
                    <Label htmlFor="trabalhando">Está trabalhando atualmente?</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Interesses Profissionais</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {interessesProfissionais.map((interesse) => (
                        <div key={interesse} className="flex items-start space-x-2 min-w-0">
                          <Checkbox
                            id={interesse}
                            checked={formData.interessesProfissionais.includes(interesse)}
                            onCheckedChange={() => handleMultiSelect("interessesProfissionais", interesse)}
                            className="mt-0.5 flex-shrink-0"
                          />
                          <Label htmlFor={interesse} className="text-sm leading-tight break-words">
                            {interesse}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Interesses Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Coffee className="w-5 h-5 mr-2 text-orange-600" />
                    Interesses Pessoais
                  </h3>

                  <div className="space-y-2">
                    <Label>Hobbies</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {hobbies.map((hobby) => (
                        <div key={hobby} className="flex items-center space-x-2">
                          <Checkbox
                            id={hobby}
                            checked={formData.hobbies.includes(hobby)}
                            onCheckedChange={() => handleMultiSelect("hobbies", hobby)}
                          />
                          <Label htmlFor={hobby} className="text-sm">
                            {hobby}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Dumbbell className="w-4 h-4 mr-2" />
                      Esportes Favoritos
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {esportes.map((esporte) => (
                        <div key={esporte} className="flex items-center space-x-2">
                          <Checkbox
                            id={esporte}
                            checked={formData.esportes.includes(esporte)}
                            onCheckedChange={() => handleMultiSelect("esportes", esporte)}
                          />
                          <Label htmlFor={esporte} className="text-sm">
                            {esporte}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Music className="w-4 h-4 mr-2" />
                      Estilos Musicais Preferidos
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {estilosMusical.map((estilo) => (
                        <div key={estilo} className="flex items-center space-x-2">
                          <Checkbox
                            id={estilo}
                            checked={formData.estilosMusical.includes(estilo)}
                            onCheckedChange={() => handleMultiSelect("estilosMusical", estilo)}
                          />
                          <Label htmlFor={estilo} className="text-sm">
                            {estilo}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Estilo de Socialização */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                    Estilo de Socialização
                  </h3>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="prefereSair"
                      checked={formData.prefereSair}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, prefereSair: checked }))}
                    />
                    <Label htmlFor="prefereSair">Prefere sair para socializar?</Label>
                  </div>

                  {formData.prefereSair && (
                    <div className="space-y-2 ml-6">
                      <Label>Locais de Preferência</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {locaisLazer.map((local) => (
                          <div key={local} className="flex items-center space-x-2">
                            <Checkbox
                              id={local}
                              checked={formData.locaisLazer.includes(local)}
                              onCheckedChange={() => handleMultiSelect("locaisLazer", local)}
                            />
                            <Label htmlFor={local} className="text-sm">
                              {local}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Tipo de Conexões Desejadas</Label>
                    <div className="space-y-2">
                      {["Amizades", "Oportunidades Profissionais", "Dates"].map((tipo) => (
                        <div key={tipo} className="flex items-center space-x-2">
                          <Checkbox
                            id={tipo}
                            checked={formData.tipoConexoes.includes(tipo)}
                            onCheckedChange={() => handleMultiSelect("tipoConexoes", tipo)}
                          />
                          <Label htmlFor={tipo}>{tipo}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Gerar Minha Rede de Conexões
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Seção 2: Visualização do Grafo */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur h-full">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Network className="w-5 h-5" />
                  <span>Sua Rede de Conexões</span>
                </CardTitle>
                <CardDescription className="text-green-100">
                  Visualização interativa baseada em similaridade
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Filtros de Visualização */}
                <div className="mb-6">
                  <Label className="flex items-center mb-3">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros de Visualização
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {["Curso", "Hobbies", "Esportes", "Música", "Profissional"].map((filtro) => (
                      <Badge key={filtro} variant="outline" className="cursor-pointer hover:bg-blue-50">
                        {filtro}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Área do Grafo - Placeholder para D3.js */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 min-h-[400px] flex flex-col items-center justify-center">
                  <Network className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Sua rede aparecerá aqui após o envio dos dados
                  </h3>
                  <p className="text-gray-500 mb-4 max-w-md">
                    O grafo interativo será renderizado usando D3.js, mostrando suas conexões baseadas em similaridade
                    de interesses, curso e objetivos.
                  </p>
                  <div className="text-xs text-gray-400 bg-white px-3 py-1 rounded border">
                    {/* Comentário técnico para integração futura */}🔧 Integração D3.js: fetch('/api/graph-data') →
                    renderGraph(data)
                  </div>
                </div>

                {/* Legenda */}
                <div className="mt-6">
                  <Label className="mb-3 block">Legenda de Conexões</Label>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Mesmo Curso</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Hobbies Similares</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Objetivos Profissionais</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Estilo de Vida</span>
                    </div>
                  </div>
                </div>

                {/* Estatísticas Futuras */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">--</div>
                    <div className="text-xs text-gray-600">Conexões Diretas</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">--</div>
                    <div className="text-xs text-gray-600">Comunidades</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">--%</div>
                    <div className="text-xs text-gray-600">Similaridade Média</div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-400 text-center bg-gray-50 p-2 rounded">
                  {/* Comentários técnicos para desenvolvimento futuro */}🚀 Backend: Python + NetworkX | Algoritmos:
                  Louvain, Centralidade | API: REST endpoints
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
