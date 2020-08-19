const connection = require('../utils/connection');

class Post {
    constructor({ id = null, title = null, content = null, author = null, creationDate = null }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.creationDate = creationDate;
    }
}