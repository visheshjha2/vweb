import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projects = [
  {
    title: "SaaS Dashboard",
    description: "A comprehensive analytics dashboard with real-time data visualization and user management.",
    tags: ["React", "TypeScript", "Tailwind", "Chart.js"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with smooth animations and glassmorphism design.",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team features.",
    tags: ["React", "Firebase", "TypeScript", "Zustand"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Content Generator",
    description: "AI-powered content creation tool leveraging GPT for marketing and blogging.",
    tags: ["Next.js", "OpenAI", "Prisma", "tRPC"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Fitness Tracking App",
    description: "Mobile-first fitness application with workout tracking and progress analytics.",
    tags: ["React Native", "Node.js", "MongoDB"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const Projects = () => {
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
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Portfolio</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Featured{" "}
              <span className="text-gradient-accent">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of my best work, showcasing expertise in web development, 
              design, and problem-solving across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group glass-card overflow-hidden hover:border-primary/50 transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.liveUrl}
                      className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
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
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="heroOutline" size="xl" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View More on GitHub
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Projects;
