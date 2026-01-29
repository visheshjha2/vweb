import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles, Mail, MapPin, Send, Github, ExternalLink, Search, Zap, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";
import DevpostIcon from "@/components/DevpostIcon";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Contact form validation
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

// Skills data
const skills = [
  { name: "SMTP", level: 95 },
  { name: "SEO Optimization", level: 90 },
  { name: "API Integration", level: 85 },
  { name: "Hosting", level: 88 },
  { name: "Authentication System", level: 95 },
  { name: "Database Design", level: 80 },
];

const values = [
  { icon: Mail, title: "SMTP Integration", description: "Reliable email delivery systems for your applications." },
  { icon: Search, title: "SEO Optimized", description: "Ensuring your website ranks high on search engines." },
  { icon: Zap, title: "Performance", description: "Optimizing every detail for lightning-fast load times." },
  { icon: Users, title: "User-Centric", description: "Putting users first in every design and development decision." },
];

// Projects data
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
}

const defaultProjects: Project[] = [
  { id: "1", title: "SaaS Dashboard", description: "A comprehensive analytics dashboard with real-time data visualization.", tags: ["React", "TypeScript", "Tailwind"], image_url: "/placeholder.svg", live_url: "#", github_url: "#" },
  { id: "2", title: "E-Commerce Platform", description: "Full-stack e-commerce solution with payment integration.", tags: ["Next.js", "Node.js", "PostgreSQL"], image_url: "/placeholder.svg", live_url: "#", github_url: "#" },
  { id: "3", title: "Portfolio Website", description: "Modern portfolio website with smooth animations.", tags: ["React", "Framer Motion", "Tailwind"], image_url: "/placeholder.svg", live_url: "#", github_url: "#" },
];

// Contact info
const contactInfo = [
  { icon: Mail, title: "Email", value: "visheshjha2@gmail.com", href: "mailto:visheshjha2@gmail.com" },
  { icon: MapPin, title: "Location", value: "Available Worldwide", href: null },
];

const socialLinks = [
  { name: "GitHub", url: "https://www.github.com/visheshjha2", icon: Github },
  { name: "Devpost", url: "https://www.devpost.com/visheshjha2", icon: DevpostIcon },
];

const Index = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        setProjects(defaultProjects);
      } else {
        setProjects(data);
      }
      setLoadingProjects(false);
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({ title: "Validation Error", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });
    if (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Message Sent!", description: "Thank you for reaching out. I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="container mx-auto px-6 lg:px-8 py-4">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-sun-orange flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">V</span>
              </div>
              <span className="font-display font-bold text-xl text-white drop-shadow-lg">VWEB</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {["Home", "About", "Projects", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 drop-shadow-lg"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="hidden md:block">
              <Button variant="hero" size="default" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Home Section */}
      <section 
        id="home" 
        className="relative min-h-screen overflow-hidden"
        style={{
          backgroundImage: "url('/images/homepage-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom fade gradient to black */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="min-h-screen flex items-center">
            <motion.div
              className="max-w-3xl space-y-8 py-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-white/90 drop-shadow">Premium Web Development</span>
                </div>
              </motion.div>

              <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg">
                  Crafting<br />
                  <span className="text-gradient-accent">Digital</span><br />
                  Experiences
                </h1>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                We design and develop stunning websites, modern SaaS platforms, 
                and immersive digital products that captivate users and drive results.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button variant="hero" size="xl" asChild>
                  <a href="#contact">
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="#projects">View Portfolio</a>
                </Button>
              </motion.div>

              <motion.div
                className="flex gap-8 pt-8 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {[
                  { value: "50+", label: "Projects Delivered" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "5★", label: "Average Rating" },
                ].map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-2xl md:text-3xl font-display font-bold text-white drop-shadow-lg">{stat.value}</div>
                    <div className="text-sm text-white/70 drop-shadow">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative bg-background sunlight-effect section-fade-top">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">About Me</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              Passionate Developer & <span className="text-gradient-accent">Designer</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">
              I'm Vishesh Jha, a full-stack developer and designer with a passion for creating 
              beautiful, functional digital experiences.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">Skills & Expertise</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <ScrollReveal key={skill.name} delay={index * 0.1}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-sun-orange rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <ScrollReveal key={value.title} delay={index * 0.1}>
                  <div className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-display font-semibold text-foreground mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative bg-charcoal section-fade-top">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-40 left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              Featured <span className="text-gradient-accent">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A collection of my best work, showcasing expertise in web development.
            </p>
          </ScrollReveal>

          {loadingProjects ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <div className="group glass-card overflow-hidden hover:border-primary/50 transition-all duration-500 h-full">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <img src={project.image_url || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.live_url && project.live_url !== "#" && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        {project.github_url && project.github_url !== "#" && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {(project.tags || []).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative bg-background sunlight-effect section-fade-top">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full opacity-15 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Get in Touch</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              Let's Work <span className="text-gradient-accent">Together</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a project in mind? I'd love to hear about it.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="glass-card p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground/90">Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-2" placeholder="Your name" required maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground/90">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-2" placeholder="your@email.com" required maxLength={255} />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-foreground/90">Message</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="mt-2 min-h-[150px]" placeholder="Tell me about your project..." required maxLength={1000} />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : (<>Send Message <Send className="w-4 h-4 ml-2" /></>)}
                  </Button>
                </div>
              </form>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="glass-card p-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">Contact Info</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.title} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{info.title}</h4>
                          {info.href ? (
                            <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors duration-300">{info.value}</a>
                          ) : (
                            <p className="text-muted-foreground">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="glass-card p-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">Follow Me</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group" title={social.name}>
                        <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative bg-background border-t border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-sun-orange flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">V</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">VWEB</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2025 VWEB. All rights reserved.</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group" title={social.name}>
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
