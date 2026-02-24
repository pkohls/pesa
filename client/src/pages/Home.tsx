import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, AreaChart, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Target, Zap, DollarSign, TrendingDown } from "lucide-react";

// Dados de crescimento de participação
const growthData = [
  { period: "2025/1", participants: 207, workshops: 12, avgParticipants: 17 },
  { period: "2025/2", participants: 1369, workshops: 28, avgParticipants: 49 },
];

// Dados de participação por temática
const thematicData = [
  { name: "IA em Trabalhos Acadêmicos", participants: 509, color: "#3b82f6" },
  { name: "Gestão do Tempo", participants: 415, color: "#8b5cf6" },
  { name: "Textos Acadêmicos + IA", participants: 377, color: "#ec4899" },
  { name: "Outros Temas", participants: 68, color: "#06b6d4" },
];

// Dados de impacto financeiro
const financialScenarios = [
  {
    name: "Conservador",
    reduction: 0.02,
    color: "#ef4444",
    description: "Redução de 2% na evasão"
  },
  {
    name: "Moderado",
    reduction: 0.04,
    color: "#f59e0b",
    description: "Redução de 4% na evasão"
  },
  {
    name: "Otimista",
    reduction: 0.06,
    color: "#10b981",
    description: "Redução de 6% na evasão"
  },
];

const calculateFinancialImpact = (reduction: number) => {
  const totalStudents = 15000;
  const monthlyTuition = 1200;
  const annualTuition = monthlyTuition * 12;
  const cac = 2500;
  const pesaCost = 635000;

  const retainedStudents = Math.floor(totalStudents * reduction);
  const recoveredRevenue = retainedStudents * annualTuition;
  const cacSavings = retainedStudents * cac;
  const totalImpact = recoveredRevenue + cacSavings;
  const roi = ((totalImpact - pesaCost) / pesaCost) * 100;
  const paybackMonths = (pesaCost / totalImpact) * 12;

  return {
    retainedStudents,
    recoveredRevenue,
    cacSavings,
    totalImpact,
    roi,
    paybackMonths,
  };
};

// Dados de projeção de maturidade
const maturityData = [
  {
    year: "2026",
    phase: "Consolidação",
    focus: "Padronização de indicadores",
    coverage: 45,
    maturity: 30,
    description: "Calendário anual, relatórios periódicos, cobertura em momentos críticos"
  },
  {
    year: "2027",
    phase: "Expansão",
    focus: "Ações segmentadas",
    coverage: 65,
    maturity: 50,
    description: "Segmentação por perfil, devolutivas por curso, grupos prioritários"
  },
  {
    year: "2028",
    phase: "Qualificação",
    focus: "Learning Analytics",
    coverage: 85,
    maturity: 75,
    description: "Painéis e alertas, ciclos regulares de análise e intervenção"
  },
  {
    year: "2029",
    phase: "Maturidade",
    focus: "Referência Nacional",
    coverage: 100,
    maturity: 100,
    description: "Série histórica consolidada, impacto comprovado, posicionamento estratégico"
  },
];

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2029");
  const [selectedScenario, setSelectedScenario] = useState("Moderado");
  const [tuitionValue, setTuitionValue] = useState(1200);
  const [totalStudentsValue, setTotalStudentsValue] = useState(15000);

  const selectedPhase = useMemo(() => {
    return maturityData.find(d => d.year === selectedYear);
  }, [selectedYear]);

  const currentScenario = useMemo(() => {
    return financialScenarios.find(s => s.name === selectedScenario);
  }, [selectedScenario]);

  const financialData = useMemo(() => {
    return calculateFinancialImpact(currentScenario?.reduction || 0.04);
  }, [currentScenario]);

  // Dados para gráfico de composição de impacto
  const impactComposition = [
    { name: "Receita Recuperada", value: financialData.recoveredRevenue, color: "#3b82f6" },
    { name: "Economia CAC", value: financialData.cacSavings, color: "#8b5cf6" },
  ];

  // Dados para comparação de cenários
  const scenarioComparison = financialScenarios.map(scenario => {
    const data = calculateFinancialImpact(scenario.reduction);
    return {
      name: scenario.name,
      roi: data.roi,
      impacto: data.totalImpact / 1e6,
      color: scenario.color,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">PESA Growth</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">UCB Permanência Estudantil</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dashboard Interativo</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">2025-2029</p>
          </div>
        </div>
      </header>

      <main className="container py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Crescimento e Maturidade do <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">PESA</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Visualize a evolução da participação estudantil e a jornada de transformação institucional do Programa de Permanência Estudantil e Sucesso Acadêmico.
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">1.369 participantes em 2025/2</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-purple-900 dark:text-purple-200">+560% de crescimento</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="growth" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="growth">Crescimento</TabsTrigger>
            <TabsTrigger value="thematic">Temáticas</TabsTrigger>
            <TabsTrigger value="maturity">Maturidade</TabsTrigger>
            <TabsTrigger value="financial">Impacto Financeiro</TabsTrigger>
          </TabsList>

          {/* Tab 1: Crescimento */}
          <TabsContent value="growth" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Crescimento Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">+560%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">De 207 para 1.369 participantes</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Workshops Oferecidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">+133%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">De 12 para 28 oficinas</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Média por Workshop</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+188%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">De 17 para 49 participantes</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Evolução de Participação (2025)</CardTitle>
                <CardDescription>Comparativo entre semestres</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="period" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f3f4f6"
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="participants" fill="#3b82f6" name="Participantes" />
                    <Line yAxisId="right" type="monotone" dataKey="avgParticipants" stroke="#8b5cf6" name="Média por Workshop" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Temáticas */}
          <TabsContent value="thematic" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Distribuição por Temática (2025/2)</CardTitle>
                <CardDescription>Participação em oficinas temáticas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={thematicData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f3f4f6"
                      }}
                    />
                    <Bar dataKey="participants" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thematicData.map((item, idx) => (
                <Card key={idx} className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{item.participants}</p>
                      </div>
                      <div 
                        className="w-12 h-12 rounded-lg opacity-20" 
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: Maturidade */}
          <TabsContent value="maturity" className="space-y-6">
            {/* Seletor de Anos */}
            <div className="flex gap-2 flex-wrap">
              {maturityData.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedYear === item.year
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>

            {/* Detalhes do Ano Selecionado */}
            {selectedPhase && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedPhase.year} - {selectedPhase.phase}</CardTitle>
                      <CardDescription className="text-base mt-2">{selectedPhase.focus}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Maturidade Institucional</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{selectedPhase.maturity}%</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">{selectedPhase.description}</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Cobertura de Ações</span>
                        <span className="text-slate-600 dark:text-slate-400">{selectedPhase.coverage}%</span>
                      </div>
                      <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${selectedPhase.coverage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Linha do Tempo */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Jornada de Maturidade (2026-2029)</CardTitle>
                <CardDescription>Evolução institucional do PESA</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={maturityData}>
                    <defs>
                      <linearGradient id="colorMaturity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f3f4f6"
                      }}
                      formatter={(value) => `${value}%`}
                    />
                    <Area type="monotone" dataKey="maturity" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMaturity)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grid de Fases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {maturityData.map((item, idx) => (
                <Card 
                  key={idx} 
                  className={`border-0 shadow-lg cursor-pointer transition-all ${
                    selectedYear === item.year 
                      ? "ring-2 ring-blue-600 shadow-xl" 
                      : "hover:shadow-xl"
                  }`}
                  onClick={() => setSelectedYear(item.year)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.year}</CardTitle>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        {idx + 1}
                      </div>
                    </div>
                    <CardDescription>{item.phase}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{item.focus}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Maturidade</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{item.maturity}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${item.maturity}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 4: Impacto Financeiro */}
          <TabsContent value="financial" className="space-y-6">
            {/* Seletor de Cenários */}
            <div className="flex gap-2 flex-wrap">
              {financialScenarios.map((scenario) => (
                <button
                  key={scenario.name}
                  onClick={() => setSelectedScenario(scenario.name)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-white shadow-lg`}
                  style={{
                    backgroundColor: selectedScenario === scenario.name ? scenario.color : `${scenario.color}80`,
                    opacity: selectedScenario === scenario.name ? 1 : 0.6,
                  }}
                >
                  {scenario.name}
                </button>
              ))}
            </div>

            {/* KPIs Principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Alunos Retidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{financialData.retainedStudents}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Anualmente</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Receita Recuperada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {(financialData.recoveredRevenue / 1e6).toFixed(2)}M</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mensalidades</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Economia CAC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {(financialData.cacSavings / 1e6).toFixed(2)}M</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sem nova captação</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{financialData.roi.toFixed(0)}%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Retorno anual</p>
                </CardContent>
              </Card>
            </div>

            {/* Detalhes do Cenário */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedScenario}</CardTitle>
                    <CardDescription className="text-base mt-2">{currentScenario?.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Impacto Total Anual</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">R$ {(financialData.totalImpact / 1e6).toFixed(2)}M</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Payback</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{financialData.paybackMonths.toFixed(1)}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">meses</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Custo PESA</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ 635K</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">anual</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Lucro Líquido</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {(((financialData.totalImpact || 0) - 635000) / 1e6).toFixed(2)}M</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">anual</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Composição */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Composição do Impacto Financeiro</CardTitle>
                  <CardDescription>Receita vs. Economia CAC</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={impactComposition}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: R$ ${(value / 1e6).toFixed(2)}M`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {impactComposition.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `R$ ${(value / 1e6).toFixed(2)}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Comparação de Cenários */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Comparação de Cenários</CardTitle>
                  <CardDescription>ROI e Impacto Total</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={scenarioComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#f3f4f6"
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="impacto" fill="#3b82f6" name="Impacto (Milhões R$)" />
                      <Bar yAxisId="right" dataKey="roi" fill="#10b981" name="ROI (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Análise de Sensibilidade */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Análise de Sensibilidade</CardTitle>
                <CardDescription>Como variações nos parâmetros afetam o ROI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mensalidade Média: R$ {tuitionValue.toLocaleString()}</label>
                  </div>
                  <Slider
                    value={[tuitionValue]}
                    onValueChange={(value) => setTuitionValue(value[0])}
                    min={800}
                    max={2000}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Intervalo: R$ 800 - R$ 2.000</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Total de Alunos: {totalStudentsValue.toLocaleString()}</label>
                  </div>
                  <Slider
                    value={[totalStudentsValue]}
                    onValueChange={(value) => setTotalStudentsValue(value[0])}
                    min={5000}
                    max={30000}
                    step={1000}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Intervalo: 5.000 - 30.000 alunos</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Stats */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">5.227</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Estudantes Monitorados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">28</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Oficinas em 2025/2</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">4</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Eixos de Atuação</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-600 dark:text-pink-400">100%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Meta 2029</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-3">PESA UCB</h3>
              <p className="text-sm">Permanência Estudantil e Sucesso Acadêmico</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Contato</h3>
              <p className="text-sm">Bloco R - Sala 206</p>
              <p className="text-sm">pesa@ucb.br</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Universidade</h3>
              <p className="text-sm">Universidade Católica de Brasília</p>
              <p className="text-sm">© 2026 - Todos os direitos reservados</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>Dashboard desenvolvido para apresentação estratégica do PESA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
