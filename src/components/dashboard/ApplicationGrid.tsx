
import AppCard from "./AppCard";
import { Atom, Fan, TreeDeciduous, Combine } from "lucide-react";

const applications = [
  {
    id: 1,
    title: "Zanzibar",
    description: "First fully digital economic zone in East Africa",
    icon: <Atom className="h-6 w-6" />,
    url: "https://www.toolsforthecommons.com/#solutions",
    highlight: false,
  },
  {
    id: 2,
    title: "Central Asia",
    description: "AI and software-focused Digital Economic Zone in Central Asia",
    icon: <Fan className="h-6 w-6" />,
    url: "https://www.toolsforthecommons.com/#solutions",
    highlight: false,
  },
  {
    id: 3,
    title: "Amazonia",
    description: "Brazil's first Digital Zone for bio-economy",
    icon: <TreeDeciduous className="h-6 w-6" />,
    url: "https://www.toolsforthecommons.com/#solutions",
    highlight: false,
  },
  {
    id: 4,
    title: "Cyprus",
    description: "Digital framework intersecting the EU, Middle East, and North Africa",
    icon: <Combine className="h-6 w-6" />,
    url: "https://www.toolsforthecommons.com/#solutions",
    highlight: false,
  },
];

const ApplicationGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        <AppCard
          key={app.id}
          title={app.title}
          description={app.description}
          icon={app.icon}
          url={app.url}
          highlight={app.highlight}
        />
      ))}
    </div>
  );
};

export default ApplicationGrid;
