const express = require('express');
require('dotenv').config();
const PostDBController = require('./controllers/PostController');

const app = express();

const { PORT } = process.env;

app.use(express.json({ extended: true }));

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await PostDBController.getAllPosts();
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
});

app.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostDBController.getPostById(+id);
        return res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
});

app.post('/api/posts', async (req, res) => {
    const post = req.body;
    try {

        // ? how to understand that post already exists
        const postExists = await PostDBController.getPostByTitleAndAuthor(post.title, post.author);

        if (postExists) {
            return res.status(409).json({ message: 'Post already exists' });
        }

        const postId = await PostDBController.createPost(post);
        return res.status(201).json({ id: postId });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
});

app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    try {
        const postExists = await PostDBController.getPostById(+id);

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

        const resultOfUpdate = await PostDBController.updatePost(id, post);
        return res.status(201).json({ id, result: resultOfUpdate });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
});

// app.patch('/api/posts/:id', async (req, res) => {
//     const { id } = req.params;
//     const post = req.body;
//     try {
//         const postExists = await PostDBController.getPostById(+id);

//         if (!postExists) {
//             return res.status(409).json({ message: 'Post does not exist' });
//         }

//         const resultOfUpdate = await PostDBController.updatePost(post);
//         return res.status(201).json({ result: resultOfUpdate });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'error' });
//     }
// });

app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const postExists = await PostDBController.getPostById(+id);

        if (!postExists) {
            return res.status(409).json({ message: 'Post does not exist' });
        }

        const deletedPost = await PostDBController.deletePostById(id);
        return res.status(201).json({ id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error' });
    }
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

