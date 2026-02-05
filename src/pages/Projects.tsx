import { useEffect, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
}

const defaultProjects = [
  {
    id: "1",
    title: "SaaS Dashboard",
    description: "A comprehensive analytics dashboard with real-time data visualization and user management.",
    tags: ["React", "TypeScript", "Tailwind", "Chart.js"],
    image_url: "/placeholder.svg",
    live_url: "#",
    github_url: "#",
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image_url: "/placeholder.svg",
    live_url: "#",
    github_url: "#",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Modern portfolio website with smooth animations and glassmorphism design.",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    image_url: "/placeholder.svg",
    live_url: "#",
    github_url: "#",
  },
];

const ensureAbsoluteUrl = (url: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error || !data || data.length === 0) {
        setProjects(defaultProjects);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <main className="bg-background min-h-screen sunlight-effect">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Portfolio</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Featured{" "}
              <span className="text-gradient-accent">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of my best work, showcasing expertise in web development, 
              design, and problem-solving across various industries.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <div className="group glass-card overflow-hidden hover:border-primary/50 transition-all duration-500 h-full">
                    {/* Project Image */}
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent opacity-40" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.live_url && project.live_url !== "#" && (
                          <a
                            href={ensureAbsoluteUrl(project.live_url) || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        {project.github_url && project.github_url !== "#" && (
                          <a
                            href={ensureAbsoluteUrl(project.github_url) || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {(project.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* View More CTA */}
          <ScrollReveal className="text-center mt-16">
            <Button variant="heroOutline" size="xl" asChild>
              <a href="https://github.com/visheshjha2" target="_blank" rel="noopener noreferrer">
                View More on GitHub
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Projects;
