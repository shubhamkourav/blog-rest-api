const route = require('express').Router();
const controller = require('../controllers/blog');

/**
 * Get all blogs from the database.
 *
 * @returns {Promise<Array<Blog>>} An array of Blog objects.
 */
route.get('/', controller.getAllBlogs);

/**
 * Get a single blog by its id from the database.
 *
 * @param {string} id - The unique identifier of the blog.
 * @returns {Promise<Blog | null>} A single Blog object or null if not found.
 */
route.get('/:id', controller.getBlogById);

/**
 * Update a blog by its id in the database.
 *
 * @param {string} id - The unique identifier of the blog.
 * @param {Blog} updatedBlog - The updated Blog object.
 * @returns {Promise<Blog | null>} A single Blog object or null if not found.
 */
route.put('/:id', controller.updateBlog);

/**
 * Delete a blog by its id from the database.
 *
 * @param {string} id - The unique identifier of the blog.
 * @returns {Promise<Blog | null>} A single Blog object or null if not found.
 */
route.delete('/:id', controller.deleteBlog);

/**
 * Search for blogs based on a query.
 *
 * @param {string} query - The search query.
 * @returns {Promise<Array<Blog>>} An array of Blog objects that match the query.
 */
route.get('/search', controller.searchBlogs);

/**
 * Filter blogs by category.
 *
 * @param {string} category - The category to filter by.
 * @returns {Promise<Array<Blog>>} An array of Blog objects that belong to the specified category.
 */
route.get('/category/:category', controller.filterBlogsByCategory);

/**
 * Get blogs by tag.
 *
 * @param {string} tag - The tag to filter by.
 * @returns {Promise<Array<Blog>>} An array of Blog objects that have the specified tag.
 */
route.get('/tag/:tag', controller.getBlogsByTag);

/**
 * Get blogs by date range.
 *
 * @param {string} start_date - The start date for filtering.
 * @param {string} end_date - The end date for filtering.
 * @returns {Promise} An array of Blog objects that have the specified
 * date range within the specified range.
 **/
route.get('/date-range', controller.getBlogsByDateRange);

/**
 * Get blogs by popularity
 * @returns {Promise} An array of Blog objects that have the specified
 * popularity within the specified range
 *
 */
route.get('/popularity', controller.getBlogsByPopularity);

/**
 * Increment views count for a blog post by id
 *
 * @param {string} id - The unique identifier of the blog.
 * 
 * @returns {Promise} An a of Blog object that have the specified
 */
route.put('/:id/views', controller.incrementBlogViews);

module.exports = route;
