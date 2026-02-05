import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Trash2, Bell, X, LogOut, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, loading, isAdmin, signIn, signUp, signOut } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    live_url: "",
    github_url: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
      fetchMessages();
      
      const channel = supabase
        .channel('contact_messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'contact_messages' },
          (payload) => {
            setMessages(prev => [payload.new as ContactMessage, ...prev]);
            setUnreadCount(prev => prev + 1);
            toast({
              title: "New message received!",
              description: `From: ${(payload.new as ContactMessage).name}`,
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAdmin]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error fetching projects", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error fetching messages", variant: "destructive" });
    } else {
      setMessages(data || []);
      setUnreadCount(data?.filter(m => !m.is_read).length || 0);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    }
    
    setAuthLoading(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Error uploading image", description: uploadError.message, variant: "destructive" });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        setUploading(false);
        return;
      }
    }
    
    const { error } = await supabase.from('projects').insert({
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
      image_url: imageUrl,
      live_url: newProject.live_url || null,
      github_url: newProject.github_url || null
    });

    if (error) {
      toast({ title: "Error adding project", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Project added successfully!" });
      setNewProject({ title: "", description: "", tags: "", live_url: "", github_url: "" });
      setImageFile(null);
      setImagePreview(null);
      setShowAddForm(false);
      fetchProjects();
    }
    setUploading(false);
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    
    if (error) {
      toast({ title: "Error deleting project", variant: "destructive" });
    } else {
      toast({ title: "Project deleted!" });
      fetchProjects();
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);
    
    if (!error) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const message = messages.find(m => m.id === id);
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    
    if (!error) {
      setMessages(prev => prev.filter(m => m.id !== id));
      if (message && !message.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      toast({ title: "Message deleted!" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    
    const { error } = await signUp(email, password);
    
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please check your email to verify your account, then sign in." });
      setIsSignUp(false);
    }
    
    setAuthLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background sunlight-effect flex items-center justify-center p-6">
        <motion.div 
          className="glass-card p-8 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            {isSignUp ? "Admin Sign Up" : "Admin Login"}
          </h1>
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
                minLength={6}
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={authLoading}>
              {authLoading ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background sunlight-effect">
      {/* Header */}
      <header className="border-b border-border/50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg glass-subtle hover:border-primary/50 transition-colors"
              >
                <Bell className="w-5 h-5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <motion.div
                  className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto glass-card p-4 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Messages</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No messages yet</p>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg border ${msg.is_read ? 'border-border/30 bg-card/30' : 'border-primary/50 bg-primary/5'}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground truncate">{msg.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                              <p className="text-sm text-foreground mt-1 line-clamp-2">{msg.message}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {!msg.is_read && (
                                <button
                                  onClick={() => handleMarkAsRead(msg.id)}
                                  className="p-1 hover:bg-muted rounded"
                                  title="Mark as read"
                                >
                                  <Eye className="w-4 h-4 text-primary" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1 hover:bg-destructive/20 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(msg.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-foreground">Projects</h2>
            <Button variant="hero" onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>

          {/* Add Project Form */}
          {showAddForm && (
            <motion.form
              className="glass-card p-6 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleAddProject}
            >
              <h3 className="font-semibold text-foreground mb-4">New Project</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newProject.tags}
                    onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                    placeholder="React, TypeScript, Tailwind"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Project Image</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {imageFile ? "Change Image" : "Upload Image"}
                    </Button>
                    {imagePreview && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setImageFile(null); setImagePreview(null); }}
                          className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="live_url">Project Link (opens in new tab)</Label>
                  <Input
                    id="live_url"
                    value={newProject.live_url}
                    onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={newProject.github_url}
                    onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" variant="hero" disabled={uploading}>
                  {uploading ? "Uploading..." : "Save Project"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowAddForm(false); setImageFile(null); setImagePreview(null); }}>Cancel</Button>
              </div>
            </motion.form>
          )}

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="glass-card overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="h-40 bg-muted">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No projects yet. Add your first project!</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
