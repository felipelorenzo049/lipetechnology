import { Construction } from "lucide-react";

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
      <Construction className="h-8 w-8 text-muted-foreground" />
    </div>
    <h2 className="text-xl font-bold font-headline text-foreground">{title}</h2>
    <p className="mt-2 text-sm text-muted-foreground">Esta secção estará disponível em breve.</p>
  </div>
);

export default PlaceholderView;
