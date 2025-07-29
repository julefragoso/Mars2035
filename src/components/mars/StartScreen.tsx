import { Button } from '@/components/ui/button';
import { Rocket, Activity, Zap, Satellite } from 'lucide-react';
import { AnimatedStars, FloatingTechElements, TechGrid, GlowOrb } from './AnimatedBackground';
import { HologramLine, TechPanel, DataStream, LoadingBar } from './TechElements';
import { useEffect, useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [systemReady, setSystemReady] = useState(false);

  useEffect(() => {
    // Simulate system initialization
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setSystemReady(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const stepElements = [
    { id: '01', label: 'Identity', icon: Activity },
    { id: '02', label: 'Physical', icon: Zap },
    { id: '03', label: 'Lifestyle', icon: Activity },
    { id: '04', label: 'Skills', icon: Satellite },
    { id: '05', label: 'Psychology', icon: Activity },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-mars-soil/5">
      {/* Animated Background Elements */}
      <AnimatedStars />
      <FloatingTechElements />
      <TechGrid />
      <DataStream />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center space-y-8 mb-12">
            <div className="flex items-center justify-center mb-8 animate-fade-in-up">
              <div className="relative">
                <Rocket className="h-20 w-20 text-mars-rust animate-rocket-launch" />
                <GlowOrb className="absolute -top-2 -right-2 w-6 h-6" />
              </div>
              <div className="ml-6 text-left">
                <h1 className="text-6xl font-display font-bold tracking-tight text-foreground animate-stagger-fade">
                  M.A.R.S.
                </h1>
                <HologramLine 
                  text="Mars Admission & Ranking System"
                  delay={1000}
                  className="text-lg uppercase tracking-wider mt-2"
                />
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
              <TechPanel className="max-w-2xl mx-auto">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-light text-foreground">
                    Official Mars Colonization Selection Protocol
                  </h2>
                  <p className="text-sm font-mono leading-relaxed text-muted-foreground">
                    Advanced psychometric and physiological assessment system designed to identify
                    optimal candidates for humanity's first permanent off-world settlement initiative.
                  </p>
                </div>
              </TechPanel>

              {/* System Status */}
              <div className="max-w-md mx-auto space-y-4">
                <LoadingBar 
                  progress={loadingProgress} 
                  label="System Initialization" 
                />
                {systemReady && (
                  <HologramLine 
                    text="✓ All systems operational. Ready for candidate evaluation."
                    className="text-center text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Evaluation Steps Preview */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '2s' }}>
            <TechPanel>
              <h3 className="text-center text-lg font-medium text-foreground mb-6">
                Evaluation Protocol Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {stepElements.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={step.id}
                      className="relative text-center p-4 border border-mars-rust/20 rounded bg-card/10 hover:bg-card/20 transition-all duration-300 animate-stagger-fade"
                      style={{ animationDelay: `${2.5 + (index * 0.2)}s` }}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Icon className="h-6 w-6 text-mars-glow animate-float" style={{ animationDelay: `${index * 0.5}s` }} />
                      </div>
                      <div className="text-mars-rust font-mono text-sm font-medium">{step.id}</div>
                      <div className="text-xs text-muted-foreground mt-1">{step.label}</div>
                      
                      {/* Progress indicators */}
                      <div className="absolute top-1 right-1 w-2 h-2 bg-mars-glow rounded-full animate-glow-pulse" 
                           style={{ animationDelay: `${index * 0.3}s` }} />
                    </div>
                  );
                })}
              </div>
            </TechPanel>
          </div>

          {/* Action Section */}
          <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '3s' }}>
            <Button 
              onClick={onStart} 
              variant="mars" 
              size="lg"
              disabled={!systemReady}
              className="px-16 py-6 text-xl font-medium relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <Activity className="h-5 w-5 mr-3 animate-float" />
                {systemReady ? 'Initialize Evaluation Sequence' : 'Preparing Systems...'}
              </span>
              {systemReady && (
                <div className="absolute inset-0 bg-gradient-to-r from-mars-glow/20 to-mars-rust/20 animate-shimmer" />
              )}
            </Button>
            
            <div className="flex justify-center space-x-8 text-xs font-mono text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-glow-pulse" />
                Security Cleared
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                Neural Link Active
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-glow-pulse" />
                Quantum Encrypted
              </div>
            </div>

            <p className="text-xs font-mono text-muted-foreground mt-6">
              Estimated completion time: 8-12 minutes • Classification Level: RESTRICTED
            </p>
          </div>
        </div>
      </div>

      {/* Corner Tech Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-mars-rust/50 animate-glow-pulse" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-mars-rust/50 animate-glow-pulse" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-mars-rust/50 animate-glow-pulse" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-mars-rust/50 animate-glow-pulse" />
    </div>
  );
};