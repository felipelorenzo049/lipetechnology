
INSERT INTO public.projects (name, client, status, progress, revenue) VALUES
  ('EasyLine – The Way', 'EasyLine', 'em_progresso', 75, 4800),
  ('Plate Boutique', 'Plate Boutique', 'concluido', 100, 3200),
  ('Sistema de Agendamento', 'Clínica Saúde', 'em_progresso', 40, 2800),
  ('Milan Couture', 'Milan Couture', 'pendente', 10, 5500);

-- Insert sample payments (using subqueries to get project IDs)
INSERT INTO public.payments (project_id, amount, description, paid_at) VALUES
  ((SELECT id FROM public.projects WHERE name = 'EasyLine – The Way'), 2400, 'Pagamento inicial - EasyLine', now() - interval '45 days'),
  ((SELECT id FROM public.projects WHERE name = 'EasyLine – The Way'), 2400, 'Segunda parcela - EasyLine', now() - interval '15 days'),
  ((SELECT id FROM public.projects WHERE name = 'Plate Boutique'), 1600, 'Pagamento inicial - Plate Boutique', now() - interval '60 days'),
  ((SELECT id FROM public.projects WHERE name = 'Plate Boutique'), 1600, 'Pagamento final - Plate Boutique', now() - interval '20 days'),
  ((SELECT id FROM public.projects WHERE name = 'Sistema de Agendamento'), 1400, 'Pagamento inicial - Agendamento', now() - interval '10 days'),
  ((SELECT id FROM public.projects WHERE name = 'Milan Couture'), 1800, 'Sinal - Milan Couture', now() - interval '5 days');

-- Insert sample leads
INSERT INTO public.leads (name, email, phone, company, budget, message, status, created_at) VALUES
  ('João Silva', 'joao@bistro.pt', '+351 912 345 678', 'Restaurante Bistrô', '€2.000 – €5.000', 'Precisamos de um website moderno para o nosso restaurante', 'novo', now() - interval '12 minutes'),
  ('Maria Santos', 'maria@dentalplus.pt', '+351 923 456 789', 'Clínica Dental Plus', '€5.000 – €10.000', 'Landing page para captação de pacientes', 'contactado', now() - interval '1 day'),
  ('Carlos Mendes', 'carlos@techstart.pt', '+351 934 567 890', 'TechStart', '€2.000 – €5.000', 'App web para gestão interna', 'convertido', now() - interval '15 days'),
  ('Ana Ferreira', 'ana@modaana.pt', '+351 945 678 901', 'Moda Ana', '€1.000 – €2.000', 'Loja online de roupas', 'perdido', now() - interval '30 days');
