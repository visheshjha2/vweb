import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import DevpostIcon from "./DevpostIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-sun-orange flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-base sm:text-lg">V</span>
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-foreground">VWEB</span>
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
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg glass-subtle flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {currentYear} VWEB. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Designed & Developed by{" "}
            <span className="text-primary font-medium">Vishesh Jha</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
