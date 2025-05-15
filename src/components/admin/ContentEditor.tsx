
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ExternalLink } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
}

const ContentEditor = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const { toast } = useToast();

  // Simulate fetching content
  useEffect(() => {
    const storedItems = localStorage.getItem("tftc-content");
    if (storedItems) {
      try {
        setContentItems(JSON.parse(storedItems));
      } catch (e) {
        console.error("Error parsing content:", e);
      }
    } else {
      // Default content
      const defaultContent = [
        {
          id: "1",
          title: "Project Management",
          description: "Manage projects, tasks, and team collaboration",
          url: "https://example.com/project-management",
        },
        {
          id: "2",
          title: "Document Editor",
          description: "Create and edit documents in real-time",
          url: "https://example.com/document-editor",
        },
      ];
      setContentItems(defaultContent);
      localStorage.setItem("tftc-content", JSON.stringify(defaultContent));
    }
    
    // Fetch applications
    const storedApps = localStorage.getItem("tftc-apps");
    if (storedApps) {
      try {
        setApplications(JSON.parse(storedApps));
      } catch (e) {
        console.error("Error parsing applications:", e);
      }
    } else {
      // Default applications
      const defaultApps = [
        {
          id: "1",
          name: "Document Editor",
          description: "Create and edit documents in real-time",
          url: "https://example.com/editor",
          icon: "file-text",
        },
        {
          id: "2",
          name: "Project Management",
          description: "Track projects and collaborate with team members",
          url: "https://example.com/projects",
          icon: "layout",
        },
      ];
      setApplications(defaultApps);
      localStorage.setItem("tftc-apps", JSON.stringify(defaultApps));
    }
  }, []);

  const handleEditItem = (item: ContentItem) => {
    setEditingItem({ ...item });
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    const updatedItems = editingItem.id 
      ? contentItems.map(item => item.id === editingItem.id ? editingItem : item) 
      : [...contentItems, { ...editingItem, id: Date.now().toString() }];
      
    setContentItems(updatedItems);
    localStorage.setItem("tftc-content", JSON.stringify(updatedItems));
    
    toast({
      title: "Content updated",
      description: "The changes have been saved successfully.",
    });
    
    setEditingItem(null);
  };

  const handleAddNewContent = () => {
    setEditingItem({ id: "", title: "", description: "", url: "" });
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = contentItems.filter(item => item.id !== id);
    setContentItems(updatedItems);
    localStorage.setItem("tftc-content", JSON.stringify(updatedItems));
    
    toast({
      title: "Content deleted",
      description: "The item has been removed successfully.",
    });
  };
  
  // Application handlers
  const handleEditApp = (app: Application) => {
    setEditingApp({ ...app });
  };
  
  const handleSaveApp = () => {
    if (!editingApp) return;
    
    const updatedApps = editingApp.id
      ? applications.map(app => app.id === editingApp.id ? editingApp : app)
      : [...applications, { ...editingApp, id: Date.now().toString() }];
      
    setApplications(updatedApps);
    localStorage.setItem("tftc-apps", JSON.stringify(updatedApps));
    
    toast({
      title: "Application updated",
      description: "The application has been saved successfully.",
    });
    
    setEditingApp(null);
  };
  
  const handleAddNewApp = () => {
    setEditingApp({ id: "", name: "", description: "", url: "", icon: "app" });
  };
  
  const handleDeleteApp = (id: string) => {
    const updatedApps = applications.filter(app => app.id !== id);
    setApplications(updatedApps);
    localStorage.setItem("tftc-apps", JSON.stringify(updatedApps));
    
    toast({
      title: "Application deleted",
      description: "The application has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList className="mb-4">
              <TabsTrigger value="content">
                <FileText className="mr-2 h-4 w-4" />
                Content Items
              </TabsTrigger>
              <TabsTrigger value="applications">
                <ExternalLink className="mr-2 h-4 w-4" />
                Applications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              {editingItem ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={editingItem.url}
                      onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveItem}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button onClick={handleAddNewContent}>Add New Content</Button>
                  
                  <div className="space-y-4">
                    {contentItems.map((item) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <p className="text-sm text-blue-500">{item.url}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:bg-red-500/10 hover:text-red-500" 
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="applications">
              {editingApp ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input
                      id="app-name"
                      value={editingApp.name}
                      onChange={(e) => setEditingApp({ ...editingApp, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="app-description">Description</Label>
                    <Textarea
                      id="app-description"
                      value={editingApp.description}
                      onChange={(e) => setEditingApp({ ...editingApp, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="app-url">URL</Label>
                    <Input
                      id="app-url"
                      value={editingApp.url}
                      onChange={(e) => setEditingApp({ ...editingApp, url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="app-icon">Icon</Label>
                    <Input
                      id="app-icon"
                      value={editingApp.icon}
                      onChange={(e) => setEditingApp({ ...editingApp, icon: e.target.value })}
                      placeholder="file-text, layout, etc."
                    />
                    <p className="text-xs text-muted-foreground">Enter icon name from Lucide icons</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveApp}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingApp(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button onClick={handleAddNewApp}>Add New Application</Button>
                  
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{app.name}</h3>
                            <p className="text-sm text-muted-foreground">{app.description}</p>
                            <p className="text-sm text-blue-500">{app.url}</p>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Icon: {app.icon}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditApp(app)}>
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:bg-red-500/10 hover:text-red-500" 
                              onClick={() => handleDeleteApp(app.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentEditor;
