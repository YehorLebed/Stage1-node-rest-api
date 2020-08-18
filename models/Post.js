const connection = require('../utils/connection');

class Post {
    constructor(id, title, content, author, creationDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.creationDate = creationDate;
    }
}