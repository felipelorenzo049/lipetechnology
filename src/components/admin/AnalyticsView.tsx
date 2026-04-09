import React from "react";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useLeads, useProjects, usePayments } from "@/hooks/use-admin-data";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = [
  "hsl(220 78% 57%)",   // primary
  "hsl(142 71% 45%)",   // secondary/green
  "hsl(38 92% 50%)",    // accent/amber
  "hsl(0 72% 51%)",     // red
  "hsl(262 83% 58%)",   // purple
];

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === "number" && p.name?.includes("Receita") ? `€${p.value.toLocaleString()}` : p.value}</p>
      ))}
    </div>
  );
};

const AnalyticsView = () => {
  const { data: leads, isLoading: ll } = useLeads();
  const { data: projects, isLoading: lp } = useProjects();
  const { data: payments, isLoading: lpm } = usePayments();
  const isLoading = ll || lp || lpm;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[320px] rounded-2xl" />)}
        </div>
      </div>
    );
  }

  // Leads per month
  const leadsByMonth: Record<string, number> = {};
  (leads ?? []).forEach((l) => {
    const d = new Date(l.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    leadsByMonth[key] = (leadsByMonth[key] ?? 0) + 1;
  });
  const leadsChart = Object.entries(leadsByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => ({ month: monthNames[parseInt(key.split("-")[1])], Leads: count }));

  // Revenue accumulated
  const revenueByMonth: Record<string, number> = {};
  (payments ?? []).forEach((p) => {
    if (!p.paid_at) return;
    const d = new Date(p.paid_at);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    revenueByMonth[key] = (revenueByMonth[key] ?? 0) + Number(p.amount);
  });
  let acc = 0;
  const revenueChart = Object.entries(revenueByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      acc += val;
      return { month: monthNames[parseInt(key.split("-")[1])], Receita: acc };
    });

  // Lead status distribution
  const statusMap: Record<string, number> = {};
  const statusLabels: Record<string, string> = { novo: "Novo", contactado: "Contactado", convertido: "Convertido", perdido: "Perdido" };
  (leads ?? []).forEach((l) => {
    const label = statusLabels[l.status] ?? l.status;
    statusMap[label] = (statusMap[label] ?? 0) + 1;
  });
  const leadStatusChart = Object.entries(statusMap).map(([name, value]) => ({ name, value }));

  // Project status distribution
  const projStatusMap: Record<string, number> = {};
  const projLabels: Record<string, string> = { em_progresso: "Em progresso", concluido: "Concluído", pendente: "Pendente" };
  (projects ?? []).forEach((p) => {
    const label = projLabels[p.status] ?? p.status;
    projStatusMap[label] = (projStatusMap[label] ?? 0) + 1;
  });
  const projStatusChart = Object.entries(projStatusMap).map(([name, value]) => ({ name, value }));

  // Conversion over time
  const convByMonth: Record<string, { total: number; converted: number }> = {};
  (leads ?? []).forEach((l) => {
    const d = new Date(l.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    if (!convByMonth[key]) convByMonth[key] = { total: 0, converted: 0 };
    convByMonth[key].total++;
    if (l.status === "convertido") convByMonth[key].converted++;
  });
  const convChart = Object.entries(convByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, v]) => ({
      month: monthNames[parseInt(key.split("-")[1])],
      "Taxa (%)": v.total > 0 ? Math.round((v.converted / v.total) * 100) : 0,
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold font-headline text-foreground">Analytics</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leads per month */}
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Leads por Mês</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 25% 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Leads" fill="hsl(220 78% 57%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue accumulated */}
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Receita Acumulada</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart}>
                <defs>
                  <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 25% 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Receita" stroke="hsl(142 71% 45%)" strokeWidth={2} fill="url(#gradRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead status pie */}
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Leads por Estado</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadStatusChart} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {leadStatusChart.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project status pie */}
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Projetos por Estado</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={projStatusChart} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {projStatusChart.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion rate over time */}
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Taxa de Conversão por Mês</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={convChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 25% 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Taxa (%)" fill="hsl(38 92% 50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
