import { motion } from "framer-motion";
import { Code, Palette, Zap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const skills = [
  { name: "React/Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 88 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Database Design", level: 80 },
];

const values = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Blending aesthetics with functionality for memorable experiences.",
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
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">About Me</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Passionate Developer &{" "}
              <span className="text-gradient-accent">Designer</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Vishesh Jha, a full-stack developer and designer with a passion for creating 
              beautiful, functional digital experiences. With years of experience in web development, 
              I bring ideas to life through clean code and stunning visuals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Skills & Expertise
              </h2>
              <p className="text-muted-foreground mb-8">
                Continuously learning and mastering the latest technologies to deliver 
                exceptional results for every project.
              </p>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-sun-orange rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
