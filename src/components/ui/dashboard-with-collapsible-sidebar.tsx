import React, { useState } from "react";
import {
  LayoutDashboard,
  Layers,
  Users,
  DollarSign,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";

interface SidebarProps {
  selected: string;
  setSelected: (s: string) => void;
  unreadCount?: number;
}

export const AdminSidebar = ({ selected, setSelected, unreadCount }: SidebarProps) => {
  const [open, setOpen] = useState(true);

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r border-border bg-background transition-all duration-300 ${
        open ? "w-[220px]" : "w-[60px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">L</span>
        </div>
        {open && (
          <span className="gradient-text font-headline text-lg font-bold tracking-tight">
            LIPE
          </span>
        )}
      </div>

      {/* Menu */}
      <div className="space-y-1 px-2 py-4">
        <SidebarOption Icon={LayoutDashboard} title="Dashboard" selected={selected} setSelected={setSelected} open={open} />
        <SidebarOption Icon={Layers} title="Projetos" selected={selected} setSelected={setSelected} open={open} />
        <SidebarOption Icon={Users} title="Clientes" selected={selected} setSelected={setSelected} open={open} />
        <SidebarOption Icon={DollarSign} title="Financeiro" selected={selected} setSelected={setSelected} open={open} />
        <SidebarOption Icon={BarChart3} title="Analytics" selected={selected} setSelected={setSelected} open={open} />
        <SidebarOption Icon={MessageSquare} title="Mensagens" selected={selected} setSelected={setSelected} open={open} notifs={unreadCount} />
        <SidebarOption Icon={Settings} title="Configurações" selected={selected} setSelected={setSelected} open={open} />
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute bottom-0 left-0 right-0 flex items-center gap-2 border-t border-border px-4 py-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ChevronsRight
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        {open && <span className="text-sm">Recolher</span>}
      </button>
    </nav>
  );
};

interface OptionProps {
  Icon: React.ElementType;
  title: string;
  selected: string;
  setSelected: (s: string) => void;
  open: boolean;
  notifs?: number;
}

const SidebarOption = ({ Icon, title, selected, setSelected, open, notifs }: OptionProps) => {
  const isActive = selected === title;

  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-lg px-3 transition-all duration-200 ${
        isActive
          ? "glass text-primary glow-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {open && (
        <span className="ml-3 text-sm font-medium">{title}</span>
      )}
      {(notifs ?? 0) > 0 && open && (
        <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
          {notifs}
        </span>
      )}
    </button>
  );
};

export default AdminSidebar;
