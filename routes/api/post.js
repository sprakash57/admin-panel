const router = require('express').Router();
const auth = require('../../middleware/auth');
const { postValidation, commentValidation } = require('../../middleware/validation');
const ctrls = require('../../controllers/post');

/**
 * @route api/post
 * @desc Create a post
 * @access Private 
 */
router.post('/', [auth, postValidation], ctrls.createPost)

/**
 * @route api/post
 * @desc Fetch all post
 * @access Private 
 */
router.get('/', auth, ctrls.fetchAllPost);

/**
 * @route api/post/:post_id
 * @desc Fetch post by id
 * @access Private 
 */
router.get('/:post_id', auth, ctrls.fetchPost);

/**
 * @route api/post/:post_id
 * @desc Delete post by id
 * @access Private 
 */
router.delete('/:post_id', auth, ctrls.deletePost);

/**
 * @route api/post/like/:id
 * @desc Like a post
 * @access Private 
 */
router.put('/like/:id', auth, ctrls.likePost);

/**
 * @route api/post/unlike/:id
 * @desc Remove like from a post
 * @access Private 
 */
router.put('/unlike/:id', auth, ctrls.unlikePost);

/**
 * @route api/post/comment/:id
 * @desc Comment on a post
 * @access Private 
 */
router.put('/comment/:id', [auth, commentValidation], ctrls.createComment)

/**
 * @route api/post/comment/:id/:comment_id
 * @desc Delete a comment on a post
 * @access Private 
 */
router.delete('/comment/:id/:comment_id', auth, ctrls.deleteComment)

module.exports = router;