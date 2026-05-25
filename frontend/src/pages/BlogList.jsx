import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { blogPosts } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-secondary/50 to-transparent">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  DevOps Insights
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Sharing knowledge, best practices, and real-world experiences in DevOps, Cloud, and Infrastructure
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="blog-search-input"
                  className="pl-12 py-6 bg-card border-border focus:border-cyan-500 text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'border-border text-muted-foreground hover:border-cyan-500/50 hover:text-cyan-500'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 flex items-center">
                <span className="text-cyan-500">Featured Articles</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map(post => (
                  <Card
                    key={post.id}
                    data-testid={`featured-post-${post.id}`}
                    className="bg-card border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 group overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge className="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/50 mb-3">
                          Featured
                        </Badge>
                        <Link to={`/blog/${post.id}`}>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-cyan-500 transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-secondary text-muted-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Link to={`/blog/${post.id}`}>
                        <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 p-0 h-auto group/btn">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            </h2>
            {regularPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map(post => (
                  <Card
                    key={post.id}
                    data-testid={`blog-post-${post.id}`}
                    className="bg-card border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50 mb-3">
                        {post.category}
                      </Badge>
                      <Link to={`/blog/${post.id}`}>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-500 transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>

                      <Link to={`/blog/${post.id}`}>
                        <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 p-0 h-auto text-sm group/btn">
                          Read Article
                          <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;