import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserData } from '@/types/mars';
import { ProgressHeader } from './ProgressHeader';

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
    <div className="min-h-screen bg-background">
      <ProgressHeader
        currentStep={3}
        totalSteps={5}
        onBack={onBack}
        title="Lifestyle Assessment"
        subtitle="Daily habits and behavioral patterns evaluation"
      />
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="exerciseHabits" className="text-foreground font-medium">Exercise and Fitness Habits</Label>
            <Select value={formData.exerciseHabits} onValueChange={(value) => setFormData(prev => ({ ...prev, exerciseHabits: value }))}>
              <SelectTrigger className="mt-2 bg-card border-border">
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

          <div>
            <Label htmlFor="dietType" className="text-foreground font-medium">Dietary Preferences</Label>
            <Select value={formData.dietType} onValueChange={(value) => setFormData(prev => ({ ...prev, dietType: value }))}>
              <SelectTrigger className="mt-2 bg-card border-border">
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

          <div>
            <Label htmlFor="sleepHours" className="text-foreground font-medium">Average Sleep Hours per Night</Label>
            <Input
              id="sleepHours"
              type="number"
              min="3"
              max="12"
              step="0.5"
              value={formData.sleepHours}
              onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: e.target.value }))}
              className="mt-2 bg-card border-border"
              placeholder="Hours of sleep"
              required
            />
          </div>

          <div>
            <Label htmlFor="addictions" className="text-foreground font-medium">Substance Use and Dependencies</Label>
            <Select value={formData.addictions} onValueChange={(value) => setFormData(prev => ({ ...prev, addictions: value }))}>
              <SelectTrigger className="mt-2 bg-card border-border">
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

          <div className="bg-card/50 p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-2">Mission Lifestyle Requirements</h3>
            <p className="text-xs text-muted-foreground">
              Mars colonists must maintain strict health standards with limited recreational substances, 
              regular exercise in confined spaces, and adaptable dietary requirements based on available resources.
            </p>
          </div>

          <div className="pt-6 border-t border-border">
            <Button 
              type="submit" 
              variant="mars" 
              size="lg" 
              disabled={!isValid}
              className="w-full"
            >
              Continue to Skills Assessment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};