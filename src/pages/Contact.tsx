import { useState } from "react";
import { Mail, MapPin, Send, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import DevpostIcon from "@/components/DevpostIcon";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "visheshjha2@gmail.com",
    href: "mailto:visheshjha2@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Available Worldwide",
    href: null,
  },
];

const socialLinks = [
  {
    name: "GitHub",
    url: "https://www.github.com/visheshjha2",
    icon: Github,
  },
  {
    name: "Devpost",
    url: "https://www.devpost.com/visheshjha2",
    icon: DevpostIcon,
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <main className="bg-background min-h-screen sunlight-effect">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium text-xs sm:text-sm tracking-wider uppercase">Get in Touch</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              Let's Work{" "}
              <span className="text-gradient-accent">Together</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Have a project in mind? I'd love to hear about it. Send me a message 
              and let's create something amazing together.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-12 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-8">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Send a Message</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 bg-background/50 border-border/50 focus:border-primary"
                      placeholder="Your name"
                      required
                      maxLength={100}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 bg-background/50 border-border/50 focus:border-primary"
                      placeholder="your@email.com"
                      required
                      maxLength={255}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 min-h-[120px] sm:min-h-[150px] bg-background/50 border-border/50 focus:border-primary"
                      placeholder="Tell me about your project..."
                      required
                      maxLength={1000}
                    />
                  </div>

                  <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="glass-card p-5 sm:p-8">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Contact Info</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.title} className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground text-sm sm:text-base">{info.title}</h3>
                          {info.href ? (
                            <a 
                              href={info.href}
                              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm sm:text-base break-all"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground text-sm sm:text-base">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="glass-card p-5 sm:p-8">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Follow Me</h2>
                  <div className="flex gap-3 sm:gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg glass-subtle flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                        title={social.name}
                      >
                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
