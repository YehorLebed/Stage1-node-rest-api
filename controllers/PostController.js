const PostDB = require('../models/PostDB');

module.exports.getAll = async (req, res) => {
    try {
        const posts = await PostDB.getAll();
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
}

module.exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostDB.getById(+id);
        return res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
}

module.exports.create = async (req, res) => {
    const post = req.body;
    try {
        // ? how to understand that post already exists
        const postExists = await PostDB.getByTitleAndAuthor(post.title, post.author);

        if (postExists) {
            return res.status(409).json({ message: 'Post already exists' });
        }

        const postId = await PostDB.create(post);
        return res.status(201).json({ id: postId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
}

module.exports.update = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    try {
        const postExists = await PostDB.getById(+id);

        if (!postExists) {
            return res.status(409).json({ message: 'Post does not exist' });
        }

        // so-so
        // let isNeedToUppdate = false;
        // for (let key in post) {
        //     if (post[key] !== postExists[key]) {
        //         isNeedToUppdate = true;
        //         break;
        //     }
        // }

        // if(!isNeedToUppdate) {
        //     return res.status(409).json({ message: 'Post date is equal, please send updated data' });
        // }

        const resultOfUpdate = await PostDB.update(id, post);
        return res.status(201).json({ id, result: resultOfUpdate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const postExists = await PostDB.getById(+id);

        if (!postExists) {
            return res.status(409).json({ message: 'Post does not exist' });
        }

        await PostDB.deleteById(id);
        return res.status(201).json({ id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
}