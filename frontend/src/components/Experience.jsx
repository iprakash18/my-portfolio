import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { experience } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Work <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 border-4 border-background shadow-lg shadow-cyan-500/50 z-10"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-8 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}>
                    <Card
                      data-testid={`experience-card-${job.id}`}
                      className="bg-card border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 group"
                    >
                      <CardContent className="p-6">
                        {/* Company & Title */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-500 transition-colors mb-2">
                            {job.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 mb-2">
                            <Briefcase className="h-4 w-4" />
                            <span className="font-semibold">{job.company}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground space-y-1 sm:space-y-0">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{job.period}</span>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-border mb-4"></div>

                        {/* Responsibilities */}
                        <ul className="space-y-2">
                          {job.responsibilities.slice(0, 3).map((responsibility, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                              <span className="text-cyan-500 mt-1.5 flex-shrink-0">•</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                          {job.responsibilities.length > 3 && (
                            <li className="text-sm text-muted-foreground italic">
                              + {job.responsibilities.length - 3} more achievements
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
