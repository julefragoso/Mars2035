import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserData } from '@/types/mars';
import { ProgressHeader } from './ProgressHeader';
import { AnimatedStars, FloatingTechElements, GlowOrb } from './AnimatedBackground';
import { TechPanel, HologramLine } from './TechElements';

interface Step2Props {
  userData: UserData;
  onUpdate: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Physical = ({ userData, onUpdate, onNext, onBack }: Step2Props) => {
  const [formData, setFormData] = useState({
    age: userData.age?.toString() || '',
    sex: userData.sex,
    height: userData.height?.toString() || '',
    weight: userData.weight?.toString() || '',
    bloodType: userData.bloodType,
    generalHealth: userData.generalHealth
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      age: formData.age ? parseInt(formData.age) : null,
      sex: formData.sex,
      height: formData.height ? parseInt(formData.height) : null,
      weight: formData.weight ? parseInt(formData.weight) : null,
      bloodType: formData.bloodType,
      generalHealth: formData.generalHealth
    });
    onNext();
  };

  const isValid = formData.age && formData.sex && formData.height && formData.weight && formData.bloodType && formData.generalHealth;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <AnimatedStars />
      <FloatingTechElements />
      
      <ProgressHeader
        currentStep={2}
        totalSteps={5}
        onBack={onBack}
        title="Physical Assessment"
        subtitle="Medical and biological compatibility evaluation"
      />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        <TechPanel className="animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <GlowOrb className="w-8 h-8 mx-auto mb-3" />
              <HologramLine 
                text="Biometric Data Collection" 
                className="text-lg font-medium"
                delay={500}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-stagger-fade" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="age" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="65"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Years"
                  required
                />
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.3s' }}>
                <Label htmlFor="sex" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Biological Sex
                </Label>
                <Select value={formData.sex} onValueChange={(value) => setFormData(prev => ({ ...prev, sex: value }))}>
                  <SelectTrigger className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.4s' }}>
                <Label htmlFor="height" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  min="140"
                  max="220"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Centimeters"
                  required
                />
              </div>

              <div className="animate-stagger-fade" style={{ animationDelay: '0.5s' }}>
                <Label htmlFor="weight" className="text-foreground font-medium flex items-center">
                  <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  min="40"
                  max="150"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow transition-colors"
                  placeholder="Kilograms"
                  required
                />
              </div>
            </div>

            <div className="animate-stagger-fade" style={{ animationDelay: '0.6s' }}>
              <Label htmlFor="bloodType" className="text-foreground font-medium flex items-center">
                <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                Blood Type
              </Label>
              <Select value={formData.bloodType} onValueChange={(value) => setFormData(prev => ({ ...prev, bloodType: value }))}>
                <SelectTrigger className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="animate-stagger-fade" style={{ animationDelay: '0.7s' }}>
              <Label htmlFor="generalHealth" className="text-foreground font-medium flex items-center">
                <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
                General Health Status
              </Label>
              <Select value={formData.generalHealth} onValueChange={(value) => setFormData(prev => ({ ...prev, generalHealth: value }))}>
                <SelectTrigger className="mt-2 bg-card/50 border-mars-rust/30 focus:border-mars-glow">
                  <SelectValue placeholder="Assess your overall health" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent - No medical issues, peak physical condition</SelectItem>
                  <SelectItem value="Good">Good - Minor medical history, generally healthy</SelectItem>
                  <SelectItem value="Fair">Fair - Some ongoing health concerns, managed with treatment</SelectItem>
                  <SelectItem value="Poor">Poor - Significant health issues affecting daily life</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-6 border-t border-border animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Button 
                type="submit" 
                variant="mars" 
                size="lg" 
                disabled={!isValid}
                className="w-full relative overflow-hidden group"
              >
                <span className="relative z-10">Continue to Lifestyle Assessment</span>
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