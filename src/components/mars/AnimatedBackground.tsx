import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const AnimatedStars = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-mars-glow animate-glow-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${particle.speed + 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export const FloatingTechElements = () => {
  const techElements = [
    { icon: '◊', delay: '0s' },
    { icon: '△', delay: '2s' },
    { icon: '□', delay: '4s' },
    { icon: '○', delay: '1s' },
    { icon: '◇', delay: '3s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techElements.map((element, index) => (
        <div
          key={index}
          className="absolute text-mars-rust/30 text-2xl animate-drift"
          style={{
            top: `${20 + (index * 15)}%`,
            animationDelay: element.delay,
            animationDuration: `${15 + (index * 2)}s`,
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
};

export const TechGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="w-full h-full bg-gradient-to-br from-transparent via-mars-rust/5 to-transparent">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--mars-rust) / 0.1) 1px, transparent 1px),
              linear-gradient(180deg, hsl(var(--mars-rust) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
};

export const GlowOrb = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-mars-glow/20 animate-glow-pulse blur-xl" />
      <div className="absolute inset-2 rounded-full bg-mars-rust/40 animate-glow-pulse blur-lg" />
      <div className="relative w-4 h-4 rounded-full bg-mars-glow animate-float" />
    </div>
  );
};