import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  name: string;
  client: string | null;
  status: string;
  progress: number;
  revenue: number;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export interface Payment {
  id: string;
  project_id: string | null;
  amount: number;
  description: string | null;
  paid_at: string | null;
  created_at: string;
}

// ── Queries ──

export const useProjects = () =>
  useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

export const useLeads = () =>
  useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lead[];
    },
  });

export const usePayments = () =>
  useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payments").select("*").order("paid_at", { ascending: false });
      if (error) throw error;
      return data as Payment[];
    },
  });

// ── Mutations: Projects ──

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: { name: string; client: string | null; revenue: number; status: string; progress: number }) => {
      const { error } = await supabase.from("projects").insert(p);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });
};

export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: { id: string; name?: string; client?: string | null; revenue?: number; status?: string; progress?: number }) => {
      const { error } = await supabase.from("projects").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });
};

// ── Mutations: Leads ──

export const useUpdateLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: { id: string; status?: string }) => {
      const { error } = await supabase.from("leads").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-leads"] }),
  });
};

// ── Mutations: Payments ──

export const useCreatePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: { project_id: string | null; amount: number; description: string | null }) => {
      const { error } = await supabase.from("payments").insert(p);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-payments"] }),
  });
};

// ── Unread Messages ──

export const useUnreadMessages = () => {
  return useQuery({
    queryKey: ["admin-unread-messages"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "novo")
        .not("message", "is", null);
      if (error) throw error;
      return count ?? 0;
    },
  });
};

// ── Dashboard KPIs ──

export const useDashboardKPIs = () => {
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: leads, isLoading: loadingLeads } = useLeads();
  const { data: payments, isLoading: loadingPayments } = usePayments();

  const isLoading = loadingProjects || loadingLeads || loadingPayments;
  const activeProjects = projects?.filter((p) => p.status === "em_progresso").length ?? 0;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const monthlyRevenue = payments?.filter((p) => p.paid_at && p.paid_at >= startOfMonth).reduce((sum, p) => sum + Number(p.amount), 0) ?? 0;
  const totalRevenue = payments?.reduce((sum, p) => sum + Number(p.amount), 0) ?? 0;
  const totalLeads = leads?.length ?? 0;
  const convertedLeads = leads?.filter((l) => l.status === "convertido").length ?? 0;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const chartData = (() => {
    if (!payments?.length) return [];
    const months: Record<string, number> = {};
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    payments.forEach((p) => {
      if (!p.paid_at) return;
      const d = new Date(p.paid_at);
      const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
      months[key] = (months[key] ?? 0) + Number(p.amount);
    });
    return Object.entries(months).sort(([a], [b]) => a.localeCompare(b)).map(([key, receita]) => ({
      month: monthNames[parseInt(key.split("-")[1])],
      receita,
    }));
  })();

  const recentActivity = (() => {
    const items: Array<{ type: "lead" | "payment"; label: string; desc: string; created_at: string }> = [];
    leads?.slice(0, 5).forEach((l) => items.push({ type: "lead", label: "Novo lead recebido", desc: `${l.name} — ${l.company ?? l.email}`, created_at: l.created_at }));
    payments?.slice(0, 5).forEach((p) => items.push({ type: "payment", label: "Pagamento recebido", desc: `${p.description ?? "Pagamento"} — €${Number(p.amount).toLocaleString()}`, created_at: p.paid_at ?? p.created_at }));
    return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 6);
  })();

  return { isLoading, activeProjects, monthlyRevenue, totalRevenue, totalLeads, conversionRate, chartData, recentActivity, projects: projects ?? [] };
};
