import React, { useEffect, useState } from "react";
import { LogOut, Save, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SettingsView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("A password deve ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("As passwords não coincidem.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);
    if (error) {
      toast.error("Erro ao atualizar password: " + error.message);
    } else {
      toast.success("Password atualizada com sucesso!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-lg font-bold font-headline text-foreground">Configurações</h2>

      {/* Profile */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Conta Admin</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Alterar Password</h3>
        <input
          type="password"
          placeholder="Nova password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          type="password"
          placeholder="Confirmar password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleChangePassword}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" /> {saving ? "A guardar..." : "Guardar Password"}
        </button>
      </div>

      {/* Logout */}
      <div className="glass rounded-2xl p-5">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Terminar Sessão
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
