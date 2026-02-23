import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/use-admin-data";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const statusLabels: Record<string, string> = {
  em_progresso: "Em progresso",
  concluido: "Concluído",
  pendente: "Pendente",
};

const statusColor: Record<string, string> = {
  em_progresso: "bg-primary/20 text-primary",
  concluido: "bg-secondary/20 text-secondary",
  pendente: "bg-accent/20 text-accent",
};

const ProjectsView = () => {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", client: "", revenue: "", status: "pendente", progress: 0 });

  const resetForm = () => setForm({ name: "", client: "", revenue: "", status: "pendente", progress: 0 });

  const handleCreate = async () => {
    await createProject.mutateAsync({
      name: form.name,
      client: form.client || null,
      revenue: Number(form.revenue) || 0,
      status: form.status,
      progress: form.progress,
    });
    resetForm();
    setOpen(false);
  };

  const startEdit = (p: any) => {
    setEditId(p.id);
    setForm({ name: p.name, client: p.client ?? "", revenue: String(p.revenue ?? 0), status: p.status, progress: p.progress });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    await updateProject.mutateAsync({
      id: editId,
      name: form.name,
      client: form.client || null,
      revenue: Number(form.revenue) || 0,
      status: form.status,
      progress: form.progress,
    });
    setEditId(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-headline text-foreground">Projetos</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus size={16} /> Novo Projeto
            </button>
          </DialogTrigger>
          <DialogContent className="glass border-border">
            <DialogHeader><DialogTitle>Novo Projeto</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <input placeholder="Nome do projeto" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input placeholder="Cliente" value={form.client} onChange={(e) => setForm(f => ({ ...f, client: e.target.value }))} className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input placeholder="Receita (€)" type="number" value={form.revenue} onChange={(e) => setForm(f => ({ ...f, revenue: e.target.value }))} className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger className="bg-muted border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_progresso">Em progresso</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <label className="text-sm text-muted-foreground">Progresso: {form.progress}%</label>
                <input type="range" min={0} max={100} value={form.progress} onChange={(e) => setForm(f => ({ ...f, progress: Number(e.target.value) }))} className="w-full" />
              </div>
              <button onClick={handleCreate} disabled={!form.name || createProject.isPending} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                {createProject.isPending ? "A criar..." : "Criar Projeto"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass rounded-2xl p-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Projeto</th>
              <th className="pb-3 pr-4 font-medium">Cliente</th>
              <th className="pb-3 pr-4 font-medium">Estado</th>
              <th className="pb-3 pr-4 font-medium">Receita</th>
              <th className="pb-3 pr-4 font-medium">Progresso</th>
              <th className="pb-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 pr-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="py-3 pr-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="py-3 pr-4"><Skeleton className="h-5 w-24 rounded-full" /></td>
                    <td className="py-3 pr-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="py-3 pr-4"><Skeleton className="h-2 w-24 rounded-full" /></td>
                    <td className="py-3"><Skeleton className="h-4 w-16" /></td>
                  </tr>
                ))
              : projects?.map((p) =>
                  editId === p.id ? (
                    <tr key={p.id} className="border-b border-border/50">
                      <td className="py-2 pr-2"><input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded border border-border bg-muted px-2 py-1 text-sm text-foreground" /></td>
                      <td className="py-2 pr-2"><input value={form.client} onChange={(e) => setForm(f => ({ ...f, client: e.target.value }))} className="w-full rounded border border-border bg-muted px-2 py-1 text-sm text-foreground" /></td>
                      <td className="py-2 pr-2">
                        <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v }))}>
                          <SelectTrigger className="h-8 bg-muted border-border text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="em_progresso">Em progresso</SelectItem>
                            <SelectItem value="concluido">Concluído</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 pr-2"><input type="number" value={form.revenue} onChange={(e) => setForm(f => ({ ...f, revenue: e.target.value }))} className="w-20 rounded border border-border bg-muted px-2 py-1 text-sm text-foreground" /></td>
                      <td className="py-2 pr-2"><input type="range" min={0} max={100} value={form.progress} onChange={(e) => setForm(f => ({ ...f, progress: Number(e.target.value) }))} className="w-24" /></td>
                      <td className="py-2 flex gap-1">
                        <button onClick={handleUpdate} className="rounded p-1.5 text-secondary hover:bg-secondary/10"><Check size={16} /></button>
                        <button onClick={() => setEditId(null)} className="rounded p-1.5 text-muted-foreground hover:bg-muted"><X size={16} /></button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={p.id} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{p.name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{p.client ?? "—"}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[p.status] ?? ""}`}>
                          {statusLabels[p.status] ?? p.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-sm text-foreground">€{Number(p.revenue).toLocaleString()}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 flex gap-1">
                        <button onClick={() => startEdit(p)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Pencil size={14} /></button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={14} /></button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="glass border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminar projeto?</AlertDialogTitle>
                              <AlertDialogDescription>Esta ação não pode ser desfeita. O projeto "{p.name}" será eliminado permanentemente.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteProject.mutate(p.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  )
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsView;
