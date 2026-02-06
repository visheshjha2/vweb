import { Mail, Shield, Server, Search, Zap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const skills = [
  { name: "SMTP", level: 95 },
  { name: "SEO Optimization", level: 90 },
  { name: "API Integration", level: 85 },
  { name: "Hosting", level: 88 },
  { name: "Authentication System", level: 95 },
  { name: "Database Design", level: 80 },
];

const values = [
  {
    icon: Mail,
    title: "SMTP Integration",
    description: "Reliable email delivery systems for your applications.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Ensuring your website ranks high on search engines.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing every detail for lightning-fast load times.",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Putting users first in every design and development decision.",
  },
];

const About = () => {
  return (
    <main className="bg-background min-h-screen sunlight-effect">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-primary font-medium text-xs sm:text-sm tracking-wider uppercase">About Me</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              Passionate Developer &{" "}
              <span className="text-gradient-accent">Designer</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              I'm Vishesh Jha, a full-stack developer and designer with a passion for creating 
              beautiful, functional digital experiences. With years of experience in web development, 
              I bring ideas to life through clean code and stunning visuals.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Skills & Expertise
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Continuously learning and mastering the latest technologies to deliver 
                exceptional results for every project.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {skills.map((skill, index) => (
                  <ScrollReveal key={skill.name} delay={index * 0.1}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-primary text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-sun-orange rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {values.map((value, index) => (
                <ScrollReveal key={value.title} delay={index * 0.1}>
                  <div className="glass-card p-4 sm:p-6 group hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{value.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
