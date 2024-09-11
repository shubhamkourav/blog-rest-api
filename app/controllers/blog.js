const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
    const blog = new Blog(req.body);

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all blog posts with pagination
exports.getAllBlogs = async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
        return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    const startIndex = (page - 1) * limit;

    try {
        const total = await Blog.countDocuments();
        if (startIndex >= total) {
            return res.status(404).json({ message: 'No blog posts found' });
        }
        const blogs = await Blog.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(startIndex)
            .limit(limit);

        res.json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single blog post by id
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {

        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }
        res.status(500).json({ error: error.message });
    }
};

// Update a blog post by id
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }
        res.status(400).json({ error: error.message });
    }
};

// Delete a blog post by id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {

        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }
        res.status(500).json({ error: error.message });
    }
};

// Search blog posts by title or content
exports.searchBlogs = async (req, res) => {
    const query = req.query.q;

    if (!query || query.trim() === '') {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const blogs = await Blog.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { content: new RegExp(query, 'i') }
            ]
        });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filter blog posts by category
exports.filterBlogsByCategory = async (req, res) => {
    const category = req.params.category;

    try {
        const blogs = await Blog.find({ category });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get blog posts by tag
exports.getBlogsByTag = async (req, res) => {
    const tag = req.params.tag;

    try {
        const blogs = await Blog.find({ tags: tag });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get blog posts by date range
exports.getBlogsByDateRange = async (req, res) => {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
        return res.status(400).json({ message: 'Start date and end date are required' });
    }

    try {
        const blogs = await Blog.find({
            createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) }
        });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get blog posts by popularity
exports.getBlogsByPopularity = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ views: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Increment views count for a blog post by id
exports.incrementBlogViews = async (req, res) => {
    const id = req.params.id;

    try {
        const blog = await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {

        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }
        res.status(500).json({ error: error.message });
    }
};
