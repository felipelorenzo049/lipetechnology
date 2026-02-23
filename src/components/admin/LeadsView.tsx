import { useState } from "react";
import { Eye, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeads, useUpdateLead, type Lead } from "@/hooks/use-admin-data";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

const statusLabels: Record<string, string> = {
  novo: "Novo",
  contactado: "Contactado",
  convertido: "Convertido",
  perdido: "Perdido",
};

const statusColor: Record<string, string> = {
  novo: "bg-primary/20 text-primary",
  contactado: "bg-accent/20 text-accent",
  convertido: "bg-secondary/20 text-secondary",
  perdido: "bg-destructive/20 text-destructive",
};

const LeadsView = () => {
  const { data: leads, isLoading } = useLeads();
  const updateLead = useUpdateLead();
  const [viewing, setViewing] = useState<Lead | null>(null);

  const handleStatusChange = (id: string, status: string) => {
    updateLead.mutate({ id, status });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-headline text-foreground">Leads / Clientes</h2>

      <div className="glass rounded-2xl p-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Nome</th>
              <th className="pb-3 pr-4 font-medium">Email</th>
              <th className="pb-3 pr-4 font-medium">Empresa</th>
              <th className="pb-3 pr-4 font-medium">Orçamento</th>
              <th className="pb-3 pr-4 font-medium">Estado</th>
              <th className="pb-3 pr-4 font-medium">Data</th>
              <th className="pb-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="py-3 pr-4"><Skeleton className="h-4 w-20" /></td>
                    ))}
                  </tr>
                ))
              : leads?.map((l) => (
                  <tr key={l.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-medium text-foreground">{l.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{l.email}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{l.company ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{l.budget ?? "—"}</td>
                    <td className="py-3 pr-4">
                      <Select value={l.status} onValueChange={(v) => handleStatusChange(l.id, v)}>
                        <SelectTrigger className={`h-7 w-32 border-0 text-xs font-medium ${statusColor[l.status] ?? ""}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="novo">Novo</SelectItem>
                          <SelectItem value="contactado">Contactado</SelectItem>
                          <SelectItem value="convertido">Convertido</SelectItem>
                          <SelectItem value="perdido">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(l.created_at), { addSuffix: true, locale: pt })}
                    </td>
                    <td className="py-3">
                      <button onClick={() => setViewing(l)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="glass border-border">
          <DialogHeader><DialogTitle>Detalhes do Lead</DialogTitle></DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Nome:</span> <span className="text-foreground font-medium">{viewing.name}</span></div>
              <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{viewing.email}</span></div>
              <div><span className="text-muted-foreground">Telefone:</span> <span className="text-foreground">{viewing.phone ?? "—"}</span></div>
              <div><span className="text-muted-foreground">Empresa:</span> <span className="text-foreground">{viewing.company ?? "—"}</span></div>
              <div><span className="text-muted-foreground">Orçamento:</span> <span className="text-foreground">{viewing.budget ?? "—"}</span></div>
              <div><span className="text-muted-foreground">Estado:</span> <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[viewing.status] ?? ""}`}>{statusLabels[viewing.status] ?? viewing.status}</span></div>
              <div>
                <span className="text-muted-foreground">Mensagem:</span>
                <p className="mt-1 rounded-lg bg-muted p-3 text-foreground">{viewing.message ?? "Sem mensagem"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsView;
