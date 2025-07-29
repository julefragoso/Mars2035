import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EvaluationResult, UserData } from '@/types/mars';
import { Download, Share, RotateCcw, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { AnimatedStars, FloatingTechElements, GlowOrb } from './AnimatedBackground';
import { TechPanel, HologramLine } from './TechElements';

interface FinalScreenProps {
  result: EvaluationResult;
  userData: UserData;
  onRestart: () => void;
}

export const FinalScreen = ({ result, userData, onRestart }: FinalScreenProps) => {
  const certificateId = `MARS-${Date.now().toString(36).toUpperCase()}`;
  const shareUrl = `https://mars-program.space/certificate/${certificateId}`;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <AnimatedStars />
      <FloatingTechElements />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Digital Certificate */}
        <TechPanel className="p-8 mb-8 relative overflow-hidden animate-fade-in-up">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-32 h-32 border border-mars-rust rounded-full animate-float"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 border border-mars-oxide rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-mars-rust/30 rounded-full animate-glow-pulse"></div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-mars-rust font-mono text-sm tracking-widest mb-2">
                OFFICIAL MARS COLONIZATION PROGRAM
              </div>
              <h1 className="text-4xl font-display font-bold text-foreground mb-2">
                M.A.R.S. CERTIFICATE
              </h1>
              <div className="text-sm text-muted-foreground">
                Mars Admission & Ranking System • Evaluation Certificate
              </div>
            </div>

            {/* Certificate Body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Candidate Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {userData.fullName}
                  </h2>
                  <p className="text-muted-foreground">
                    {userData.profession} • {userData.country}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Overall Score</div>
                    <div className="text-2xl font-bold font-mono text-mars-glow">
                      {result.overallScore}/100
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Mission Status</div>
                    <Badge 
                      variant={result.status === 'Selected' ? 'default' : 'destructive'}
                      className="mt-1"
                    >
                      {result.status}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Suggested Role</div>
                    <div className="text-lg font-medium text-mars-rust">
                      {result.suggestedRole}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <div className="font-mono text-mars-rust">{result.breakdown.physical}</div>
                    <div className="text-muted-foreground">Physical</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <div className="font-mono text-mars-rust">{result.breakdown.mental}</div>
                    <div className="text-muted-foreground">Mental</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <div className="font-mono text-mars-rust">{result.breakdown.skills}</div>
                    <div className="text-muted-foreground">Skills</div>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <div className="font-mono text-mars-rust">{result.breakdown.compatibility}</div>
                    <div className="text-muted-foreground">Compatibility</div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg inline-block mb-3">
                  <QRCodeSVG 
                    value={shareUrl} 
                    size={120}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Certificate Verification
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>Certificate ID: {certificateId}</div>
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div>Verification: mars-program.space</div>
              </div>
            </div>
          </div>
        </TechPanel>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button variant="mars" size="lg" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Certificate
          </Button>
          <Button variant="minimal" size="lg" className="flex items-center">
            <Share className="h-4 w-4 mr-2" />
            Share on Social Media
          </Button>
          <Button variant="ghost" size="lg" className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Blockchain
          </Button>
        </div>

        {/* Next Steps or Restart */}
        <div className="text-center space-y-4">
          {result.status === 'Selected' ? (
            <div className="bg-card border border-mars-rust/50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-foreground mb-3">
                Congratulations, Mars Candidate!
              </h3>
              <p className="text-muted-foreground mb-4">
                You have been preliminarily selected for the Mars colonization program. 
                Next steps include advanced screening and specialized training.
              </p>
              <Button variant="mars">
                Begin Advanced Application Process
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium text-foreground mb-3">
                Thank You for Your Interest
              </h3>
              <p className="text-muted-foreground mb-4">
                While not selected for this mission, opportunities for future Mars programs 
                and Earth-based space program roles remain available.
              </p>
              <div className="space-x-4">
                <Button variant="minimal">
                  Explore Alternative Programs
                </Button>
                <Button variant="ghost" onClick={onRestart} className="flex items-center">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Evaluation Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-xs font-mono text-muted-foreground mb-2">
            M.A.R.S. PROGRAM • ADVANCING HUMAN SPACE EXPLORATION
          </p>
          <p className="text-xs text-muted-foreground">
            This evaluation is part of a simulated Mars colonization selection process.
          </p>
        </div>
      </div>
    </div>
  );
};