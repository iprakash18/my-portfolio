import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { loadAllPosts } from '../lib/blogs';

const BlogPreview = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    loadAllPosts()
      .then(posts => {
        if (cancelled) return;
        // Show 3 most recent posts (by date, ignoring featured)
        const sorted = [...posts].sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );
        setRecentPosts(sorted.slice(0, 3));
      })
      .catch(err => console.error('[BlogPreview] Failed to load posts:', err));
    return () => { cancelled = true; };
  }, []);

  if (recentPosts.length === 0) return null;

  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Latest <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Articles</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Sharing knowledge, best practices, and real-world experiences in DevOps, Cloud, and Infrastructure
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentPosts.map((post) => (
              <Card
                key={post.slug}
                data-testid={`home-blog-card-${post.slug}`}
                className="bg-card border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group hover:-translate-y-1 flex flex-col"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {post.category && (
                      <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50">
                        {post.category}
                      </Badge>
                    )}
                    {post.featured && (
                      <Badge className="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/50">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-500 transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    {post.publishedDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    )}
                    {post.readTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min</span>
                      </div>
                    )}
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 p-0 h-auto text-sm group/btn">
                      Read Article
                      <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link to="/blog">
              <Button
                size="lg"
                data-testid="view-all-articles-btn"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
