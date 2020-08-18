const { getConnection } = require('../utils/connection');

class PostDBController {

    // Tested
    static async getAllPosts() {
        try {
            const connection = await getConnection();

            const query = 'SELECT id, title, content, author, creationDate FROM post';
            const res = await connection.query(query);

            return res[0];
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async getPostById(id) {
        try {
            const connection = await getConnection();

            const query = 'SELECT id, title, content, author, creationDate FROM post WHERE id = ?';
            const res = await connection.execute(query, [id]);

            return res[0][0];
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async getPostByTitleAndAuthor(title, author) {
        try {
            const connection = await getConnection();

            const query = 'SELECT id, title, content, author, creationDate FROM post WHERE title = ? AND author = ?';
            const res = await connection.execute(query, [title, author]);

            return res[0][0];
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async deletePostById(id) {
        try {
            const connection = await getConnection();

            const query = 'DELETE FROM post WHERE id = ?';
            const res = await connection.execute(query, [id]);

            return res;
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async createPost(post) {
        const { title, content, author } = post;
        try {
            const connection = await getConnection();

            const query = 'INSERT INTO post(title, content, author) VALUES(?, ?, ?)';
            const res = await connection.execute(query, [title, content, author]);

            return res[0] && res[0].insertId;
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    static async updatePost(post) {
        const { id, title, content, author } = post;
        try {
            const connection = await getConnection();

            const query = 'UPDATE post SET title=?, content=?, author=? WHERE id=?';
            const res = await connection.execute(query, [title, content, author, id]);
            console.log(res);

            return res[0][0];
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }
}

module.exports = PostDBController;