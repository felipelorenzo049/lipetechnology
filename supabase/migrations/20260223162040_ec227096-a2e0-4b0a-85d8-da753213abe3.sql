
-- DELETE policies for projects and payments
CREATE POLICY "Authenticated users can delete projects"
ON public.projects FOR DELETE TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete payments"
ON public.payments FOR DELETE TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete leads"
ON public.leads FOR DELETE TO authenticated
USING (true);
