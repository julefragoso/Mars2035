import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserData } from '@/types/mars';
import { ProgressHeader } from './ProgressHeader';
import { AnimatedStars, FloatingTechElements, GlowOrb } from './AnimatedBackground';
import { TechPanel, HologramLine } from './TechElements';

interface Step1Props {
  userData: UserData;
  onUpdate: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step1Identification = ({ userData, onUpdate, onNext, onBack }: Step1Props) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    country: userData.country,
    nativeLanguage: userData.nativeLanguage,
    profession: userData.profession
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  const isValid = formData.fullName && formData.country && formData.nativeLanguage && formData.profession;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <AnimatedStars />
      <FloatingTechElements />
      
      <ProgressHeader
        currentStep={1}
        totalSteps={5}
        onBack={onBack}
        title="Personal Identification"
        subtitle="Basic information required for mission records"
      />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        <TechPanel className="animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <GlowOrb className="w-8 h-8 mx-auto mb-3" />
              <HologramLine 
                text="Candidate Registration Protocol" 
                className="text-lg font-medium"
                delay={500}
              />
            </div>

            <div className="space-y-6">
              <div className="animate-stagger-fade" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="fullName" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Full Legal Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Enter your complete legal name"
                  required
                />
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.4s' }}>
                <Label htmlFor="country" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Country of Origin
                </Label>
                <Input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Country of citizenship"
                  required
                />
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.6s' }}>
                <Label htmlFor="nativeLanguage" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Native Language
                </Label>
                <Input
                  id="nativeLanguage"
                  type="text"
                  value={formData.nativeLanguage}
                  onChange={(e) => setFormData(prev => ({ ...prev, nativeLanguage: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Primary spoken language"
                  required
                />
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.8s' }}>
                <Label htmlFor="profession" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Current Profession
                </Label>
                <Input
                  id="profession"
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Your current job or field of expertise"
                  required
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <Button 
                type="submit" 
                variant="mars" 
                size="lg" 
                disabled={!isValid}
                className="w-full relative overflow-hidden group"
              >
                <span className="relative z-10">Continue to Physical Assessment</span>
                {isValid && (
                  <div className="absolute inset-0 bg-gradient-to-r from-mars-glow/20 to-mars-rust/20 animate-shimmer" />
                )}
              </Button>
            </div>
          </form>
        </TechPanel>
      </div>
    </div>
  );
};