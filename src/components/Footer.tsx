import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: Github,
    },
    {
      name: "Devpost",
      url: "https://devpost.com",
      icon: ExternalLink,
    },
  ];

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative bg-sun-black border-t border-border/50">
      {/* Sunlight glow effect at top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.5) 50%, transparent 100%)",
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-sun-orange flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">V</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">VWEB</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Crafting exceptional digital experiences through innovative web development and design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg glass-subtle flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                    <social.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VWEB. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed & Developed by{" "}
            <span className="text-primary font-medium">Vishesh Jha</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
