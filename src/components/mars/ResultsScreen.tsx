import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EvaluationResult, UserData } from '@/types/mars';
import { CheckCircle, XCircle, Award, User, Download, Share } from 'lucide-react';

interface ResultsScreenProps {
  result: EvaluationResult;
  userData: UserData;
  onContinue: () => void;
}

export const ResultsScreen = ({ result, userData, onContinue }: ResultsScreenProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-mars-glow';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = () => {
    return result.status === 'Selected' ? (
      <CheckCircle className="h-8 w-8 text-green-400" />
    ) : (
      <XCircle className="h-8 w-8 text-red-400" />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {getStatusIcon()}
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Evaluation Complete
          </h1>
          <p className="text-muted-foreground">
            Mars Colonization Candidacy Assessment Results
          </p>
        </div>

        {/* Main Results Card */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Score */}
            <div className="text-center">
              <div className="mb-4">
                <div className={`text-6xl font-bold font-mono ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}
                </div>
                <div className="text-sm text-muted-foreground font-mono">/ 100</div>
              </div>
              
              <Badge 
                variant={result.status === 'Selected' ? 'default' : 'destructive'} 
                className="text-lg px-4 py-2 mb-4"
              >
                {result.status}
              </Badge>

              <div className="space-y-2">
                <div className="flex items-center justify-center text-mars-rust">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="font-medium">{result.suggestedRole}</span>
                </div>
                <div className="flex items-center justify-center text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm">{userData.fullName}</span>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Assessment Breakdown</h3>
              
              {Object.entries(result.breakdown).map(([category, score]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {category === 'compatibility' ? 'Mission Compatibility' : category}
                    </span>
                    <span className={`text-sm font-mono ${getScoreColor(score)}`}>
                      {score}/100
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-mars-rust to-mars-glow h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Mission Suitability</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age Compatibility:</span>
                <span className="text-foreground">
                  {userData.age && userData.age >= 25 && userData.age <= 45 ? 'Optimal' : 
                   userData.age && userData.age >= 18 && userData.age <= 55 ? 'Suitable' : 'Challenging'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Health Status:</span>
                <span className="text-foreground">{userData.generalHealth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Skills Count:</span>
                <span className="text-foreground">{userData.skills.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercise Level:</span>
                <span className="text-foreground">
                  {userData.exerciseHabits?.includes('Daily') ? 'Excellent' :
                   userData.exerciseHabits?.includes('Regular') ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Next Steps</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              {result.status === 'Selected' ? (
                <>
                  <p>• Advanced medical screening</p>
                  <p>• Technical skills verification</p>
                  <p>• Extended psychological evaluation</p>
                  <p>• Physical training program assignment</p>
                  <p>• Mission-specific role training</p>
                </>
              ) : (
                <>
                  <p>• Areas for improvement identified</p>
                  <p>• Reapplication possible after development</p>
                  <p>• Alternative space program opportunities</p>
                  <p>• Ground support role consideration</p>
                  <p>• Future mission eligibility review</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="mars" size="lg" onClick={onContinue} className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Generate Certificate
          </Button>
          <Button variant="minimal" size="lg" className="flex items-center">
            <Share className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-xs font-mono text-muted-foreground">
            M.A.R.S. EVALUATION COMPLETE • SESSION ID: {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};