const connection = require('../utils/connection');

class PostDB {
    
    // Tested
    static async getAll() {
        try {
            const query = 'SELECT id, title, content, author, creationDate FROM post';
            const res = await connection.promise().query(query);

            return res[0];
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async getById(id) {
        try {
            const query = 'SELECT id, title, content, author, creationDate FROM post WHERE id = ?';
            const res = await connection.promise().execute(query, [id]);

            return res[0][0] || null;
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async getByTitleAndAuthor(title, author) {
        try {
            const query = 'SELECT id, title, content, author, creationDate FROM post WHERE title = ? AND author = ?';
            const res = await connection.promise().execute(query, [title, author]);

            return res[0][0] || null;
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async create(post) {
        const { title, content, author } = post;
        try {
            const query = 'INSERT INTO post(title, content, author) VALUES(?, ?, ?)';
            const res = await connection.promise().execute(query, [title, content, author]);

            return res[0] && res[0].insertId;
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    static async update(id, post) {
        const { title, content, author } = post;
        try {
            const query = 'UPDATE post SET title=?, content=?, author=? WHERE id=?';
            const res = await connection.promise().execute(query, [title, content, author, id]);

            return res[0] && res[0].info;
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }

    // Tested
    static async deleteById(id) {
        try {
            const query = 'DELETE FROM post WHERE id = ?';
            const res = await connection.promise().execute(query, [id]);

            return res;
        } catch (error) {
            console.error('Database error');
            throw error;
        }
    }
}

module.exports = PostDB;