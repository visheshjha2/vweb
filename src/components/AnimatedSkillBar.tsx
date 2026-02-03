import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

const AnimatedSkillBar = ({ name, level, delay = 0 }: AnimatedSkillBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate the percentage number
      const duration = 1000; // 1 second
      const startTime = Date.now();
      const startDelay = delay * 1000;

      const timer = setTimeout(() => {
        const animate = () => {
          const elapsed = Date.now() - startTime - startDelay;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.round(easeOutQuart * level);
          
          setDisplayValue(currentValue);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, startDelay);

      return () => clearTimeout(timer);
    }
  }, [isInView, level, delay]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-primary">{displayValue}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-sun-orange rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ 
            duration: 1, 
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedSkillBar;
