import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen hero-gradient noise-overlay overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--sun-orange) / 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full py-20">
            {/* Left content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Premium Web Development
                  </span>
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-foreground">Crafting</span>
                  <br />
                  <span className="text-gradient-accent">Digital</span>
                  <br />
                  <span className="text-foreground">Experiences</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                We design and develop stunning websites, modern SaaS platforms, 
                and immersive digital products that captivate users and drive results.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button variant="hero" size="xl">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="heroOutline" size="xl">
                  View Portfolio
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-8 pt-8 border-t border-border/50"
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
                    <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side - Hero image */}
            <motion.div
              className="relative lg:ml-auto"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Glow behind image */}
                <div 
                  className="absolute inset-0 blur-3xl opacity-50 scale-90"
                  style={{
                    background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                  }}
                />
                
                {/* Main hero image */}
                <motion.img
                  src={heroImage}
                  alt="Modern web development showcase"
                  className="relative z-10 w-full max-w-2xl mx-auto drop-shadow-2xl"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating glass cards */}
                <motion.div
                  className="absolute -left-4 top-1/4 glass-card px-4 py-3 z-20"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Live Preview</div>
                      <div className="text-xs text-muted-foreground">Real-time updates</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-4 bottom-1/3 glass-card px-4 py-3 z-20"
                  animate={{
                    y: [0, 12, 0],
                    rotate: [2, -2, 2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-card"
                          style={{
                            background: `linear-gradient(135deg, hsl(${180 + i * 40} 70% 60%), hsl(${200 + i * 40} 70% 50%))`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-foreground">+12 Online</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
