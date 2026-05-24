import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { profileData } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              {profileData.name}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Senior Technology Engineer specializing in DevOps, Cloud Infrastructure, and CI/CD automation with 13+ years of experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex flex-col space-y-3">
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={profileData.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Medium</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;