import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Linkedin, Github, Instagram, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { blogPosts, profileData } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../hooks/use-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <Button onClick={() => navigate('/blog')} data-testid="back-to-blog-btn">Back to Blog</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Article link has been copied to clipboard.",
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            data-testid="blog-back-btn"
            className="text-cyan-500 hover:text-cyan-600 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 lg:px-8 max-w-4xl pb-20">
          <div className="mb-8">
            <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50 mb-4">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge className="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/50 mb-4 ml-2">
                Featured
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-secondary text-muted-foreground">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <Button
              variant="outline"
              onClick={handleShare}
              data-testid="share-article-btn"
              className="border-border hover:border-cyan-500/50 text-muted-foreground hover:text-cyan-500"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-8"></div>

          {/* Article Content */}
          <div
            className="prose dark:prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-cyan-600 dark:prose-h2:text-cyan-400
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-cyan-500 prose-a:no-underline hover:prose-a:text-cyan-600
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-ul:my-4
              prose-ol:text-muted-foreground prose-ol:my-4
              prose-li:my-2
              prose-code:text-cyan-500 prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-secondary prose-pre:border prose-pre:border-border
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <div className="h-px bg-border my-12"></div>

          {/* Author Info */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{profileData.name}</h3>
                  <p className="text-muted-foreground mb-4">{profileData.summary}</p>
                  <div className="flex space-x-3">
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-600 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-600 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={profileData.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-600 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href={profileData.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-600 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-secondary/30 py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
                Related <span className="text-cyan-500">Articles</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {relatedPosts.map(relatedPost => (
                  <Card
                    key={relatedPost.id}
                    className="bg-card border-border hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <Link to={`/blog/${relatedPost.id}`}>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-cyan-500 transition-colors mb-3 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{relatedPost.readTime} min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
