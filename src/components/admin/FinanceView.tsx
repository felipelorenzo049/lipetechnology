import { useState } from "react";
import { Plus, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayments, useProjects, useCreatePayment } from "@/hooks/use-admin-data";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const FinanceView = () => {
  const { data: payments, isLoading } = usePayments();
  const { data: projects } = useProjects();
  const createPayment = useCreatePayment();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ project_id: "", amount: "", description: "" });

  const totalRevenue = payments?.reduce((s, p) => s + Number(p.amount), 0) ?? 0;

  const handleCreate = async () => {
    await createPayment.mutateAsync({
      project_id: form.project_id || null,
      amount: Number(form.amount),
      description: form.description || null,
    });
    setForm({ project_id: "", amount: "", description: "" });
    setOpen(false);
  };

  const getProjectName = (id: string | null) =>
    projects?.find((p) => p.id === id)?.name ?? "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-headline text-foreground">Financeiro</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus size={16} /> Novo Pagamento
            </button>
          </DialogTrigger>
          <DialogContent className="glass border-border">
            <DialogHeader><DialogTitle>Registar Pagamento</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <Select value={form.project_id} onValueChange={(v) => setForm(f => ({ ...f, project_id: v }))}>
                <SelectTrigger className="bg-muted border-border"><SelectValue placeholder="Projeto associado" /></SelectTrigger>
                <SelectContent>
                  {projects?.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input placeholder="Valor (€)" type="number" value={form.amount} onChange={(e) => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input placeholder="Descrição" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <button onClick={handleCreate} disabled={!form.amount || createPayment.isPending} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                {createPayment.isPending ? "A registar..." : "Registar Pagamento"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Total card */}
      <div className="glass rounded-2xl p-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
          <DollarSign className="h-6 w-6 text-secondary" />
        </div>
        <div>
          {isLoading ? <Skeleton className="h-8 w-32" /> : (
            <p className="text-2xl font-bold font-headline text-foreground">€{totalRevenue.toLocaleString()}</p>
          )}
          <p className="text-sm text-muted-foreground">Receita total acumulada</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Projeto</th>
              <th className="pb-3 pr-4 font-medium">Descrição</th>
              <th className="pb-3 pr-4 font-medium">Valor</th>
              <th className="pb-3 font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <td key={j} className="py-3 pr-4"><Skeleton className="h-4 w-20" /></td>
                    ))}
                  </tr>
                ))
              : payments?.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-medium text-foreground">{getProjectName(p.project_id)}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{p.description ?? "—"}</td>
                    <td className="py-3 pr-4 font-mono text-foreground">€{Number(p.amount).toLocaleString()}</td>
                    <td className="py-3 text-xs text-muted-foreground">
                      {p.paid_at ? formatDistanceToNow(new Date(p.paid_at), { addSuffix: true, locale: pt }) : "—"}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceView;
