import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { certifications } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 lg:py-28 bg-slate-900/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Certifications & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4">
              Industry-recognized certifications validating expertise in cloud and DevOps technologies
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 backdrop-blur group cursor-pointer hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                    <Award className="h-10 w-10 text-cyan-400" />
                  </div>

                  {/* Certification Name */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                    {cert.name}
                  </h3>

                  {/* Issuer */}
                  <Badge
                    variant="secondary"
                    className="bg-slate-700/50 text-slate-300 border border-slate-600 px-3 py-1"
                  >
                    {cert.issuer}
                  </Badge>

                  {/* Verified Badge */}
                  <div className="mt-4 flex items-center justify-center space-x-1 text-xs text-cyan-400">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span>Verified</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              Continuously learning and staying updated with the latest technologies and best practices in DevOps and Cloud Computing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;