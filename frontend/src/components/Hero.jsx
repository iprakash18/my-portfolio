import React from 'react';
import { ArrowRight, Download, Linkedin, Github, Instagram, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { profileData } from '../mock';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Hi, I'm </span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {profileData.name}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 animate-slide-up animation-delay-200">
            {profileData.title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up animation-delay-400">
            Specializing in Cloud Infrastructure, CI/CD pipelines, and automation. 
            Building scalable, secure, and efficient DevOps solutions for enterprises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up animation-delay-600">
            <Button
              size="lg"
              onClick={() => window.open(profileData.linkedin, '_blank')}
              data-testid="connect-linkedin-btn"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group"
            >
              Connect on LinkedIn
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open(profileData.resumeUrl, '_blank')}
              data-testid="download-resume-btn"
              className="border-cyan-500/50 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 px-8 py-6 text-lg rounded-lg transition-all duration-300 group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6 animate-slide-up animation-delay-800">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-linkedin-link"
              className="flex items-center space-x-2 text-muted-foreground hover:text-cyan-500 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-secondary group-hover:bg-cyan-500/10 border border-border group-hover:border-cyan-500/50 transition-all">
                <Linkedin className="h-5 w-5" />
              </div>
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-github-link"
              className="flex items-center space-x-2 text-muted-foreground hover:text-cyan-500 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-secondary group-hover:bg-cyan-500/10 border border-border group-hover:border-cyan-500/50 transition-all">
                <Github className="h-5 w-5" />
              </div>
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={profileData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-instagram-link"
              className="flex items-center space-x-2 text-muted-foreground hover:text-cyan-500 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-secondary group-hover:bg-cyan-500/10 border border-border group-hover:border-cyan-500/50 transition-all">
                <Instagram className="h-5 w-5" />
              </div>
              <span className="text-sm">Instagram</span>
            </a>
            <a
              href={profileData.medium}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-medium-link"
              className="flex items-center space-x-2 text-muted-foreground hover:text-cyan-500 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-secondary group-hover:bg-cyan-500/10 border border-border group-hover:border-cyan-500/50 transition-all">
                <ExternalLink className="h-5 w-5" />
              </div>
              <span className="text-sm">Medium</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
