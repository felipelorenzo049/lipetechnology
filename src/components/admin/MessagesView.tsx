import React, { useState } from "react";
import { Mail, MailOpen, ExternalLink, Search } from "lucide-react";
import { useLeads, useUpdateLead } from "@/hooks/use-admin-data";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";

const MessagesView = () => {
  const { data: leads, isLoading } = useLeads();
  const updateLead = useUpdateLead();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const messages = (leads ?? [])
    .filter((l) => l.message && l.message.trim().length > 0)
    .filter(
      (l) =>
        !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        l.company?.toLowerCase().includes(search.toLowerCase()) ||
        l.message?.toLowerCase().includes(search.toLowerCase())
    );

  const selected = messages.find((m) => m.id === selectedId);

  const handleSelect = (id: string, status: string) => {
    setSelectedId(id);
    if (status === "novo") {
      updateLead.mutate({ id, status: "contactado" });
    }
  };

  const timeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: pt });
    } catch {
      return "";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-[500px] rounded-2xl" />
          <Skeleton className="h-[500px] rounded-2xl lg:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-headline text-foreground">
          Mensagens{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ({messages.filter((m) => m.status === "novo").length} novas)
          </span>
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3" style={{ minHeight: 500 }}>
        {/* List */}
        <div className="glass rounded-2xl p-3 flex flex-col">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar mensagens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto">
            {messages.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">Nenhuma mensagem</p>
            )}
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => handleSelect(m.id, m.status)}
                className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                  selectedId === m.id
                    ? "glass text-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="mt-0.5">
                  {m.status === "novo" ? (
                    <Mail className="h-4 w-4 text-primary" />
                  ) : (
                    <MailOpen className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`truncate text-sm ${m.status === "novo" ? "font-semibold text-foreground" : "font-medium"}`}>
                      {m.name}
                    </span>
                    {m.status === "novo" && (
                      <span className="shrink-0 h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="truncate text-xs">{m.company ?? m.email}</p>
                  <p className="mt-0.5 truncate text-xs opacity-70">{m.message}</p>
                </div>
                <span className="shrink-0 text-[10px] whitespace-nowrap">{timeAgo(m.created_at)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="glass rounded-2xl p-5 lg:col-span-2 flex flex-col">
          {!selected ? (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              <p className="text-sm">Seleciona uma mensagem para visualizar</p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selected.name}</h3>
                  <p className="text-sm text-muted-foreground">{selected.email}</p>
                  {selected.phone && <p className="text-sm text-muted-foreground">{selected.phone}</p>}
                  {selected.company && (
                    <p className="mt-1 text-xs text-muted-foreground">Empresa: {selected.company}</p>
                  )}
                  {selected.budget && (
                    <p className="text-xs text-muted-foreground">Orçamento: {selected.budget}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{timeAgo(selected.created_at)}</span>
              </div>

              <div className="flex-1 rounded-xl bg-muted/50 p-4">
                <p className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                  {selected.message}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: Contacto LIPE Technology`}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <ExternalLink className="h-4 w-4" /> Responder por Email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
