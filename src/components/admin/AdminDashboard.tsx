import React, { useState } from "react";
import {
  Layers,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CreditCard,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AdminSidebar } from "@/components/ui/dashboard-with-collapsible-sidebar";

/* ── Mock data ── */
const revenueData = [
  { month: "Jan", receita: 4200, projetos: 2 },
  { month: "Fev", receita: 5800, projetos: 3 },
  { month: "Mar", receita: 4900, projetos: 2 },
  { month: "Abr", receita: 7200, projetos: 4 },
  { month: "Mai", receita: 6800, projetos: 3 },
  { month: "Jun", receita: 9100, projetos: 5 },
  { month: "Jul", receita: 8400, projetos: 4 },
  { month: "Ago", receita: 10200, projetos: 6 },
];

const activities = [
  { icon: UserPlus, label: "Novo lead recebido", desc: "Restaurante Bistrô — website + branding", time: "Há 12 min", color: "text-secondary" },
  { icon: CreditCard, label: "Pagamento recebido", desc: "EasyLine — €2.400,00", time: "Há 2h", color: "text-primary" },
  { icon: CheckCircle2, label: "Projeto concluído", desc: "Plate Boutique — entrega final", time: "Há 5h", color: "text-secondary" },
  { icon: UserPlus, label: "Novo lead recebido", desc: "Clínica Dental Plus — landing page", time: "Há 1 dia", color: "text-accent" },
  { icon: CreditCard, label: "Pagamento recebido", desc: "Milan Couture — €1.800,00", time: "Há 2 dias", color: "text-primary" },
];

const projects = [
  { name: "EasyLine – The Way", status: "Em progresso", progress: 75 },
  { name: "Plate Boutique", status: "Concluído", progress: 100 },
  { name: "Sistema de Agendamento", status: "Em progresso", progress: 40 },
  { name: "Milan Couture", status: "Pendente", progress: 10 },
];

const statusColor: Record<string, string> = {
  "Em progresso": "bg-primary/20 text-primary",
  "Concluído": "bg-secondary/20 text-secondary",
  "Pendente": "bg-accent/20 text-accent",
};

/* ── KPI Card ── */
const KPICard = ({
  icon: Icon,
  label,
  value,
  change,
  positive,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) => (
  <div className="glass rounded-2xl p-5 transition-all hover:glow-primary">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span
        className={`flex items-center gap-1 text-xs font-medium ${
          positive ? "text-secondary" : "text-destructive"
        }`}
      >
        {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change}
      </span>
    </div>
    <p className="mt-3 text-2xl font-bold font-headline text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

/* ── Custom Recharts Tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-primary">Receita: €{payload[0]?.value?.toLocaleString()}</p>
    </div>
  );
};

/* ── Main Dashboard ── */
const AdminDashboard = () => {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar selected={selected} setSelected={setSelected} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="border-b border-border px-6 py-5 lg:px-8">
          <h1 className="text-2xl font-bold font-headline text-foreground">
            Bem-vindo, <span className="gradient-text">Admin</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Painel de controlo — LIPE Technology
          </p>
        </header>

        <div className="space-y-6 p-6 lg:p-8">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KPICard icon={Layers} label="Projetos Ativos" value="6" change="+2 este mês" positive />
            <KPICard icon={DollarSign} label="Receita Mensal" value="€10.200" change="+21%" positive />
            <KPICard icon={Users} label="Leads Recebidos" value="18" change="+33%" positive />
            <KPICard icon={TrendingUp} label="Taxa de Conversão" value="44%" change="-3%" positive={false} />
          </div>

          {/* Chart + Activity */}
          <div className="grid gap-6 xl:grid-cols-3">
            {/* Revenue Chart */}
            <div className="glass rounded-2xl p-5 xl:col-span-2">
              <h2 className="mb-4 text-lg font-bold font-headline text-foreground">
                Receita Mensal
              </h2>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="gradientReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(220 78% 57%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(220 78% 57%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 25% 18%)" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="receita"
                      stroke="hsl(220 78% 57%)"
                      strokeWidth={2}
                      fill="url(#gradientReceita)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl p-5">
              <h2 className="mb-4 text-lg font-bold font-headline text-foreground">
                Atividade Recente
              </h2>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted ${a.color}`}>
                      <a.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{a.label}</p>
                      <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects table */}
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 text-lg font-bold font-headline text-foreground">
              Projetos em Andamento
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Projeto</th>
                    <th className="pb-3 pr-4 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Progresso</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{p.name}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[p.status]}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">{p.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
