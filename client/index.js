import { getPosts, getPostById, createPost, updatePostById, deletePostById } from './apiService.js';
import { renderPosts, renderPost, renderFormCreatePost, renderInputPostId, clearApp } from './render.js';


// Utils
document.getElementById('clearData').onclick = event => {
  clearApp()
}

document.getElementById('clearToken').onclick = event => {
  localStorage.clear('token');
}


// API
document.getElementById('getPosts').onclick = async event => {
  clearApp();
  const posts = await getPosts();
  if (posts) {
    console.log('posts:', posts);
    renderPosts(posts, document.getElementById('data'))
  }
}

document.getElementById('getPostById').onclick = async event => {
  clearApp();

  // render form for creation a post
  // add listener to rendered form submition
  renderInputPostId(document.getElementById('form'));
  document.getElementById('submit').onclick = async event => {

    const id = document.getElementById('postId').value;
    if (!id) return;

    event.preventDefault();

    const post = await getPostById(id);
    if (post) {
      console.log('post', post);
      renderPost(post, document.getElementById('data'))
    }
  }
}

document.getElementById('createPost').onclick = async event => {
  clearApp();

  // render form for creation a post
  // add listener to rendered form submition
  renderFormCreatePost(document.getElementById('form'));
  document.getElementById('submit').onclick = async event => {

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    // basic validation
    if (!title.trim() || !content.trim() || !author.trim()) return;

    event.preventDefault();

    // request for creation post
    const newPost = { title, content, author };
    const res = await createPost(newPost);

    // if post have been created fecth it by id
    if (res) {
      console.log('created post id:', res.id);
      const post = await getPostById(res.id);

      if (post) {
        console.log('post: ', post);
        renderPost(post, document.getElementById('data'))
      }
    }

  }
}

document.getElementById('deletePost').onclick = async event => {
  clearApp();

  // render form for creation a post
  // add listener to rendered form submition
  renderInputPostId(document.getElementById('form'));
  document.getElementById('submit').onclick = async event => {

    const id = document.getElementById('postId').value;
    if (!id) return;

    event.preventDefault();

    const res = await deletePostById(id);
    if (res) {
      console.log('deleted post id:', res.id);
    }
  }
}

document.getElementById('updatePost').onclick = async event => {
  clearApp();

  // get post by id
  renderInputPostId(document.getElementById('form'));
  document.getElementById('submit').onclick = async event => {

    const id = document.getElementById('postId').value;
    if (!id) return;

    event.preventDefault();

    const post = await getPostById(id);
    if (post) {
      console.log('post', post);
      renderFormCreatePost(document.getElementById('form'), post);

      document.getElementById('submit').onclick = async event => {

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;

        // basic validation
        if (!title.trim() || !content.trim() || !author.trim()) return;

        event.preventDefault();

        // request for creation post
        const newPost = { title, content, author };
        const res = await updatePostById(id, newPost)

        // if post have been created fecth it by id
        if (res) {
          console.log('updated post id:', res.id);
          const post = await getPostById(res.id);

          if (post) {
            console.log('post: ', post);
            renderPost(post, document.getElementById('data'))
          }
        }

      }
    }
  }

  // fill the form with it's info

  // send it to the server

  // recieve it id
}

