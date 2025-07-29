import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { UserData, SKILLS } from '@/types/mars';
import { ProgressHeader } from './ProgressHeader';

interface Step4Props {
  userData: UserData;
  onUpdate: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4Skills = ({ userData, onUpdate, onNext, onBack }: Step4Props) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(userData.skills || []);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ skills: selectedSkills });
    onNext();
  };

  const isValid = selectedSkills.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <ProgressHeader
        currentStep={4}
        totalSteps={5}
        onBack={onBack}
        title="Skills & Experience"
        subtitle="Technical abilities and specialized knowledge"
      />
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-foreground font-medium text-base mb-4 block">
              Select all skills and areas of expertise that apply to you:
            </Label>
            <p className="text-sm text-muted-foreground mb-6">
              Choose any relevant professional skills, hobbies, or areas where you have significant experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SKILLS.map((skill) => (
                <div key={skill} className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors">
                  <Checkbox
                    id={skill}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                    className="border-mars-rust data-[state=checked]:bg-mars-rust data-[state=checked]:border-mars-rust"
                  />
                  <Label htmlFor={skill} className="text-sm text-foreground cursor-pointer flex-1">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card/50 p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-2">
              Skills Priority for Mars Mission
            </h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="text-mars-rust">High Priority:</span> Medical, Engineering, Agriculture, Research</p>
              <p><span className="text-mars-oxide">Medium Priority:</span> Construction, Electronics, Emergency Response</p>
              <p><span className="text-muted-foreground">Valuable:</span> All other skills contribute to mission success</p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Selected: <span className="text-mars-rust font-mono">{selectedSkills.length}</span> skills
          </div>

          <div className="pt-6 border-t border-border">
            <Button 
              type="submit" 
              variant="mars" 
              size="lg" 
              disabled={!isValid}
              className="w-full"
            >
              Continue to Psychological Evaluation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};