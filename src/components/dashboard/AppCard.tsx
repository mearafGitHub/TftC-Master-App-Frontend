
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface AppCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  highlight?: boolean;
}

const AppCard = ({ title, description, icon, url, highlight = false }: AppCardProps) => {
  const handleOpenApp = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className={`app-card ${highlight ? 'border-primary/40' : ''}`}>
      {highlight && <div className="app-card-highlight" />}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-full bg-primary/10 p-2 text-primary flex items-center justify-center">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-4">
        <Button
          className="w-full gap-2"
          onClick={handleOpenApp}
        >
          Open App
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppCard;
