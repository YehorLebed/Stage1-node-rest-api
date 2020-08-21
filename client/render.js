export function clearApp() {
    document.getElementById('data').innerHTML = '';
    document.getElementById('form').innerHTML = '';
}

function createPostHTMLElement(post) {
    const { id, title, content, author, creationDate } = post;
    return `
    <h2>Response:</h2>
    <div class="card">
        <div class="card-body">
            <small>#${id}</small>
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${content}</p>
            <a href="#" class="btn btn-primary">${author}</a>
            <small>${creationDate}</small>
        </div>
    </div>`;
}

export function renderFormCreatePost(parent, { title, content, author } = {}) {
    parent.innerHTML = `
    <h2>Form:</h2>
    <form>
        <div class="form-group">
          <label for="title">Title:</label>
          <input required type="text" class="form-control" id="title" ${title && `value="${title}"`}>
        </div>

        <div class="form-group">
            <label for="content">Content</label>
            <textarea class="form-control" id="content">${content || ''}</textarea>
        </div>

        <div class="form-group">
          <label for="author">Author</label>
          <input required type="text" class="form-control" id="author" ${author && `value="${author}"`}>
        </div>

        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
    </form>
    `;
}

export function renderInputPostId(parent) {
    parent.innerHTML = `
    <h2>Form:</h2>
    <form>
        <div class="form-group">
            <label for="postId">PostId:</label>
            <input required type="number" class="form-control" id="postId">
        </div>
        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
    <form>
    `
}

export function renderPosts(posts, parent) {
    let htmlElementPosts = '';
    posts.forEach(post => htmlElementPosts += createPostHTMLElement(post));
    parent.innerHTML = htmlElementPosts;
}

export function renderPost(post, parent) {
    const postHtmlElement = createPostHTMLElement(post);
    parent.innerHTML = postHtmlElement;
}