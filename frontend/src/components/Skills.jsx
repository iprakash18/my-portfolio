import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { skills } from '../mock';

const Skills = () => {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Technical <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Comprehensive expertise across modern DevOps tools, cloud platforms, and automation technologies
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup, index) => (
              <Card
                key={index}
                data-testid={`skill-card-${index}`}
                className="bg-card border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                    <span className="text-foreground group-hover:text-cyan-500 transition-colors">
                      {skillGroup.category}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-secondary hover:bg-cyan-500/20 text-foreground hover:text-cyan-600 dark:hover:text-cyan-300 border border-border hover:border-cyan-500/50 transition-all duration-200 cursor-default px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
