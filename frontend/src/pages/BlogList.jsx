import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { loadAllPosts } from '../lib/blogs';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadAllPosts()
      .then(p => { if (!cancelled) { setPosts(p); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        {!loading && posts.length > 0 && (
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
        )}

        {/* All Posts */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load articles: {error}</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <Card
                    key={post.slug}
                    data-testid={`blog-post-${post.slug}`}
                    className="bg-card border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
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
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
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
