const mongoose = require('mongoose');

const Blog = mongoose.model('Blog');

// create a new blog post
exports.createBlog = async (req, res) => {
    const blog = new Blog(req.body);

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get all blog posts
// paginate all blog posts
exports.getAllBlogs = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const total = await Blog.countDocuments();

    try {
        const blogs = await Blog.find()
           .sort({ createdAt: -1 })
           .limit(limit)
           .skip(startIndex);

        res.json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// get a single blog post by id
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update a blog post by id
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a blog post by id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// search blog posts by title or content
exports.searchBlogs = async (req, res) => {
    const query = req.query.q;
    try {
        const blogs = await Blog.find({ $or: [{ title: new RegExp(query, 'i') }, { content: new RegExp(query, 'i') }] });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// filter blog posts by category
exports.filterBlogsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const blogs = await Blog.find({ category });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get blog posts by tag
exports.getBlogsByTag = async (req, res) => {
    const tag = req.params.tag;
    try {
        const blogs = await Blog.find({ tags: tag });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get blog posts by date range
exports.getBlogsByDateRange = async (req, res) => {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    try {
        const blogs = await Blog.find({ createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get blog posts by popularity
exports.getBlogsByPopularity = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ views: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// increment views count for a blog post by id
exports.incrementBlogViews = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};