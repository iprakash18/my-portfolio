import React from 'react';
import { User, Target, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { profileData, education } from '../mock';

const About = () => {
  const highlights = [
    {
      icon: Award,
      title: '13+ Years',
      description: 'DevOps Experience'
    },
    {
      icon: Target,
      title: 'Multi-Cloud',
      description: 'AWS & GCP Expert'
    },
    {
      icon: User,
      title: 'Certified',
      description: 'CKA, Terraform, AWS'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Column - Image/Visual */}
            <div className="relative">
              <div className="relative z-10">
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-bold text-white">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{profileData.name}</h3>
                          <p className="text-cyan-400">{profileData.title}</p>
                        </div>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                      <div className="space-y-3 text-slate-300">
                        <p className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                          <span>{profileData.location}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          <span>{education.degree} in {education.field}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                          <span>{education.institution}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Background Decoration */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {profileData.summary}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Throughout my career, I've had the privilege of working with leading organizations 
                in the banking and technology sectors, where I've designed and implemented robust 
                CI/CD pipelines, managed complex Kubernetes deployments, and automated infrastructure 
                at scale.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                I'm passionate about DevSecOps practices, believing that security should be integrated 
                into every stage of the development lifecycle. My approach combines technical expertise 
                with a deep understanding of business needs to deliver solutions that drive real value.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card
                  key={index}
                  className="bg-slate-800/30 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                      <Icon className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;