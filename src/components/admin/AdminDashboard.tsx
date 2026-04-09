import React, { useState } from "react";
import {
  Layers, DollarSign, Users, TrendingUp, ArrowUpRight, CreditCard, UserPlus, LogOut,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { AdminSidebar } from "@/components/ui/dashboard-with-collapsible-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardKPIs, useUnreadMessages } from "@/hooks/use-admin-data";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import ProjectsView from "./ProjectsView";
import LeadsView from "./LeadsView";
import FinanceView from "./FinanceView";
import PlaceholderView from "./PlaceholderView";

const statusLabels: Record<string, string> = { em_progresso: "Em progresso", concluido: "Concluído", pendente: "Pendente" };
const statusColor: Record<string, string> = { em_progresso: "bg-primary/20 text-primary", concluido: "bg-secondary/20 text-secondary", pendente: "bg-accent/20 text-accent" };

const KPICard = ({ icon: Icon, label, value, loading }: { icon: React.ElementType; label: string; value: string; loading?: boolean }) => (
  <div className="glass rounded-2xl p-5 transition-all hover:glow-primary">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
      <ArrowUpRight className="h-4 w-4 text-secondary" />
    </div>
    {loading ? <Skeleton className="mt-3 h-8 w-24" /> : <p className="mt-3 text-2xl font-bold font-headline text-foreground">{value}</p>}
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return <div className="glass rounded-lg px-3 py-2 text-xs"><p className="font-medium text-foreground">{label}</p><p className="text-primary">Receita: €{payload[0]?.value?.toLocaleString()}</p></div>;
};

const timeAgo = (date: string) => { try { return formatDistanceToNow(new Date(date), { addSuffix: true, locale: pt }); } catch { return ""; } };

const DashboardView = () => {
  const { isLoading, activeProjects, monthlyRevenue, totalLeads, conversionRate, chartData, recentActivity, projects } = useDashboardKPIs();
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard icon={Layers} label="Projetos Ativos" value={String(activeProjects)} loading={isLoading} />
        <KPICard icon={DollarSign} label="Receita Mensal" value={`€${monthlyRevenue.toLocaleString()}`} loading={isLoading} />
        <KPICard icon={Users} label="Leads Recebidos" value={String(totalLeads)} loading={isLoading} />
        <KPICard icon={TrendingUp} label="Taxa de Conversão" value={`${conversionRate}%`} loading={isLoading} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="glass rounded-2xl p-5 xl:col-span-2">
          <h2 className="mb-4 text-lg font-bold font-headline text-foreground">Receita Mensal</h2>
          <div className="h-[280px]">
            {isLoading ? <Skeleton className="h-full w-full rounded-xl" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs><linearGradient id="gradientReceita" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(220 78% 57%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(220 78% 57%)" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 25% 18%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="receita" stroke="hsl(220 78% 57%)" strokeWidth={2} fill="url(#gradientReceita)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="mb-4 text-lg font-bold font-headline text-foreground">Atividade Recente</h2>
          <div className="space-y-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3"><Skeleton className="h-8 w-8 rounded-lg" /><div className="flex-1 space-y-1"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-48" /></div></div>
                ))
              : recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted ${a.type === "lead" ? "text-secondary" : "text-primary"}`}>
                      {a.type === "lead" ? <UserPlus className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1"><p className="text-sm font-medium text-foreground">{a.label}</p><p className="truncate text-xs text-muted-foreground">{a.desc}</p></div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{timeAgo(a.created_at)}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h2 className="mb-4 text-lg font-bold font-headline text-foreground">Projetos em Andamento</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="pb-3 pr-4 font-medium">Projeto</th><th className="pb-3 pr-4 font-medium">Cliente</th><th className="pb-3 pr-4 font-medium">Estado</th><th className="pb-3 pr-4 font-medium">Receita</th><th className="pb-3 font-medium">Progresso</th></tr></thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/50"><td className="py-3 pr-4"><Skeleton className="h-4 w-32" /></td><td className="py-3 pr-4"><Skeleton className="h-4 w-20" /></td><td className="py-3 pr-4"><Skeleton className="h-5 w-24 rounded-full" /></td><td className="py-3 pr-4"><Skeleton className="h-4 w-16" /></td><td className="py-3"><Skeleton className="h-2 w-24 rounded-full" /></td></tr>
                  ))
                : projects.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{p.name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{p.client ?? "—"}</td>
                      <td className="py-3 pr-4"><span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[p.status] ?? ""}`}>{statusLabels[p.status] ?? p.status}</span></td>
                      <td className="py-3 pr-4 font-mono text-sm text-foreground">€{Number(p.revenue).toLocaleString()}</td>
                      <td className="py-3"><div className="flex items-center gap-3"><div className="h-2 w-24 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} /></div><span className="text-xs text-muted-foreground font-mono">{p.progress}%</span></div></td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const viewMap: Record<string, React.ReactNode> = {
  Dashboard: <DashboardView />,
  Projetos: <ProjectsView />,
  Clientes: <LeadsView />,
  Financeiro: <FinanceView />,
  Analytics: <AnalyticsView />,
  Mensagens: <MessagesView />,
  Configurações: <SettingsView />,
};

const AdminDashboard = () => {
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const { data: unreadCount } = useUnreadMessages();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar selected={selected} setSelected={setSelected} unreadCount={unreadCount ?? 0} />
      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between border-b border-border px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground">
              Bem-vindo, <span className="gradient-text">Admin</span>
            </h1>
            <p className="text-sm text-muted-foreground">Painel de controlo — LIPE Technology</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <LogOut size={16} /> Sair
          </button>
        </header>
        <div className="p-6 lg:p-8">
          {viewMap[selected] ?? <DashboardView />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
