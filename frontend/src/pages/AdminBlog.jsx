import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ArrowLeft, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { blogPosts as initialPosts } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState(initialPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    readTime: 5,
    featured: false
  });

  const handleCreate = () => {
    setIsEditing(true);
    setCurrentPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      readTime: 5,
      featured: false
    });
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      readTime: post.readTime,
      featured: post.featured
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
      toast({
        title: "Post Deleted",
        description: "The blog post has been removed.",
      });
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: 'Prakash Iyyanarappan',
      publishedDate: new Date().toISOString().split('T')[0]
    };

    if (currentPost) {
      // Update existing post
      setPosts(posts.map(p => p.id === currentPost.id ? { ...currentPost, ...postData } : p));
      toast({
        title: "Post Updated",
        description: "The blog post has been updated successfully.",
      });
    } else {
      // Create new post
      const newPost = {
        ...postData,
        id: Math.max(...posts.map(p => p.id)) + 1
      };
      setPosts([newPost, ...posts]);
      toast({
        title: "Post Created",
        description: "New blog post has been created successfully.",
      });
    }

    setIsEditing(false);
    setCurrentPost(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPost(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Blog <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Admin</span>
              </h1>
              <p className="text-muted-foreground">Manage your blog posts (Frontend Mock)</p>
            </div>
            {!isEditing && (
              <Button
                onClick={handleCreate}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            )}
          </div>

          {isEditing ? (
            /* Editor Form */
            <Card className="bg-slate-800/40 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentPost ? 'Edit Post' : 'Create New Post'}</span>
                  <Button variant="ghost" onClick={handleCancel}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    className="bg-slate-900/50 border-slate-600 focus:border-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt *</label>
                  <Textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief description"
                    rows={3}
                    className="bg-slate-900/50 border-slate-600 focus:border-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Content * (HTML supported)</label>
                  <Textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Full content with HTML tags"
                    rows={12}
                    className="bg-slate-900/50 border-slate-600 focus:border-cyan-500 text-white font-mono text-sm"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                    <Input
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g., DevOps, Cloud"
                      className="bg-slate-900/50 border-slate-600 focus:border-cyan-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Read Time (minutes)</label>
                    <Input
                      name="readTime"
                      type="number"
                      value={formData.readTime}
                      onChange={handleChange}
                      className="bg-slate-900/50 border-slate-600 focus:border-cyan-500 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tags (comma separated)</label>
                  <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="DevOps, Kubernetes, AWS"
                    className="bg-slate-900/50 border-slate-600 focus:border-cyan-500 text-white"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="featured" className="text-sm text-slate-300">
                    Mark as Featured
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Post
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="border-slate-600">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Posts List */
            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card className="bg-slate-800/40 border-slate-700">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground mb-4">No blog posts yet.</p>
                    <Button onClick={handleCreate} variant="outline">
                      Create your first post
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                posts.map(post => (
                  <Card key={post.id} className="bg-slate-800/40 border-slate-700 hover:border-cyan-500/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                              {post.category}
                            </Badge>
                            {post.featured && (
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-700/50 text-slate-300 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(post)}
                            className="border-slate-600 hover:border-cyan-500/50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(post.id)}
                            className="border-slate-600 hover:border-red-500/50 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminBlog;