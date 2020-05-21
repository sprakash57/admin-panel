const { validationResult } = require('express-validator');
const { setErrorMsg } = require('../utils/index');
const User = require('../model/User');
const Post = require('../model/Post');

exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        await newPost.save();
        res.json({ message: 'Post created', newPost });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.fetchAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts)
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.fetchPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (post) return res.json(post);
        return res.status(404).json(setErrorMsg('Post not found'));
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json(setErrorMsg('Post not found'));
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        //Check if post exist
        if (!post) return res.status(404).json(setErrorMsg('Post not found'));
        //Check if user is authrized to delete
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json(setErrorMsg('User not authorized'));
        }
        await post.remove();
        res.json({ message: 'Post deleted', post });
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(404).json(setErrorMsg('Post not found'));
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if the post has already been liked
        if (post.likes.some(l => l.user.toString() === req.user.id)) {
            return res.status(400).json(setErrorMsg('Post already liked'));
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json({ message: 'liked', likes: post.likes });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if the post has not been liked
        if (post.likes.every(l => l.user.toString() !== req.user.id)) {
            return res.status(400).json(setErrorMsg('Post has not been liked'));
        }
        post.likes = post.likes.filter(l => l.user.toString() !== req.user.id);
        await post.save();
        res.json({ message: 'like removed', likes: post.likes });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.createComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json({ message: 'Post created', comments: post.comments });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Extract comment
        const comment = post.comments.find(c => c.id === req.params.comment_id);
        if (!comment) return res.status(404).json(setErrorMsg('Comment not found'));
        //User added the comment will only able to delete the comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json(setErrorMsg('User not authorized'));
        }
        post.comments = post.comments.filter(c => c.id.toString() !== req.params.comment_id);
        await post.save();
        res.json({ message: "Comment Deleted", comments: post.comments });
    } catch (error) {
        res.status(500).json(setErrorMsg(error.message));
    }
}
