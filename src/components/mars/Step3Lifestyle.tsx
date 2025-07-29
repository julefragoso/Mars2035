import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserData } from '@/types/mars';
import { ProgressHeader } from './ProgressHeader';
import { AnimatedStars, FloatingTechElements, GlowOrb } from './AnimatedBackground';
import { TechPanel, HologramLine } from './TechElements';

interface Step3Props {
  userData: UserData;
  onUpdate: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Lifestyle = ({ userData, onUpdate, onNext, onBack }: Step3Props) => {
  const [formData, setFormData] = useState({
    exerciseHabits: userData.exerciseHabits,
    dietType: userData.dietType,
    sleepHours: userData.sleepHours?.toString() || '',
    addictions: userData.addictions
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      exerciseHabits: formData.exerciseHabits,
      dietType: formData.dietType,
      sleepHours: formData.sleepHours ? parseInt(formData.sleepHours) : null,
      addictions: formData.addictions
    });
    onNext();
  };

  const isValid = formData.exerciseHabits && formData.dietType && formData.sleepHours && formData.addictions;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <AnimatedStars />
      <FloatingTechElements />
      
      <ProgressHeader
        currentStep={3}
        totalSteps={5}
        onBack={onBack}
        title="Lifestyle Assessment"
        subtitle="Daily habits and behavioral patterns evaluation"
      />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        <TechPanel className="animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <GlowOrb className="w-8 h-8 mx-auto mb-3" />
              <HologramLine 
                text="Lifestyle Compatibility Protocol" 
                className="text-lg font-medium"
                delay={500}
              />
            </div>

            <div className="space-y-6">
              <div className="animate-stagger-fade" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="exerciseHabits" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Exercise and Fitness Habits
                </Label>
                <Select value={formData.exerciseHabits} onValueChange={(value) => setFormData(prev => ({ ...prev, exerciseHabits: value }))}>
                  <SelectTrigger className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow">
                    <SelectValue placeholder="Select your exercise routine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily intense training">Daily intense training (2+ hours)</SelectItem>
                    <SelectItem value="Regular exercise (3-5x/week)">Regular exercise (3-5x per week)</SelectItem>
                    <SelectItem value="Moderate activity">Moderate activity (1-2x per week)</SelectItem>
                    <SelectItem value="Minimal exercise">Minimal exercise (occasional)</SelectItem>
                    <SelectItem value="Sedentary lifestyle">Sedentary lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.4s' }}>
                <Label htmlFor="dietType" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Dietary Preferences
                </Label>
                <Select value={formData.dietType} onValueChange={(value) => setFormData(prev => ({ ...prev, dietType: value }))}>
                  <SelectTrigger className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow">
                    <SelectValue placeholder="Select your diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Balanced/Omnivore">Balanced/Omnivore - No restrictions</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian - No meat</SelectItem>
                    <SelectItem value="Vegan">Vegan - No animal products</SelectItem>
                    <SelectItem value="Keto/Low-carb">Keto/Low-carb</SelectItem>
                    <SelectItem value="Paleo">Paleo</SelectItem>
                    <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="Other specialized">Other specialized diet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.6s' }}>
                <Label htmlFor="sleepHours" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Average Sleep Hours per Night
                </Label>
                <Input
                  id="sleepHours"
                  type="number"
                  min="3"
                  max="12"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Hours of sleep"
                  required
                />
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.8s' }}>
                <Label htmlFor="addictions" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Substance Use and Dependencies
                </Label>
                <Select value={formData.addictions} onValueChange={(value) => setFormData(prev => ({ ...prev, addictions: value }))}>
                  <SelectTrigger className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow">
                    <SelectValue placeholder="Select applicable options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None - No substance dependencies</SelectItem>
                    <SelectItem value="Caffeine only">Caffeine only (coffee, tea, energy drinks)</SelectItem>
                    <SelectItem value="Social drinking">Social drinking (alcohol occasionally)</SelectItem>
                    <SelectItem value="Regular drinking">Regular drinking (alcohol weekly)</SelectItem>
                    <SelectItem value="Tobacco use">Tobacco use (cigarettes, vaping)</SelectItem>
                    <SelectItem value="Prescription medications">Prescription medications (daily)</SelectItem>
                    <SelectItem value="Multiple substances">Multiple substances</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-card/30 p-4 rounded-lg border border-mars-rust/20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
                <GlowOrb className="w-4 h-4 mr-2" />
                Mission Lifestyle Requirements
              </h3>
              <p className="text-xs text-muted-foreground">
                Mars colonists must maintain strict health standards with limited recreational substances, 
                regular exercise in confined spaces, and adaptable dietary requirements based on available resources.
              </p>
            </div>

            <div className="pt-6 border-t border-border animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <Button 
                type="submit" 
                variant="mars" 
                size="lg" 
                disabled={!isValid}
                className="w-full relative overflow-hidden group"
              >
                <span className="relative z-10">Continue to Skills Assessment</span>
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