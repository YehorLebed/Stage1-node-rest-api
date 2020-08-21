function handleError(error) {
    console.log(error.toJSON());
    if (error.response.status === 401) {
        handleUnathorizedError(error);
        alert('Try again!')
    }
}

function handleUnathorizedError(error) {
    if (error.response.headers['x-token'] && !localStorage.getItem('token')) {
        localStorage.setItem('token', error.response.headers['x-token']);
    }
}

function getHeaders(method) {
    const headers = {};

    const token = localStorage.getItem('token');
    if (token) {
        headers['x-token'] = token;
    }

    if (method === 'POST' || method === 'PUT') {
        headers['content-type'] = 'application/json';
    }

    return headers;
}

export async function getPosts() {
    try {
        const headers = getHeaders();

        const res = await axios({
            method: 'GET',
            url: `http://localhost:3000/api/posts`,
            headers: headers
        });

        return res.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getPostById(id) {
    try {
        const headers = getHeaders();

        const res = await axios({
            method: 'GET',
            url: `http://localhost:3000/api/posts/${id}`,
            headers: headers
        });

        return res.data;
    } catch (error) {
        handleError(error);
    }
}

export async function createPost(post) {
    try {
        const headers = getHeaders('POST')

        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/posts',
            headers: headers,
            data: post
        });

        return res.data;
    } catch (error) {
        handleError(error);
    }
}

export async function updatePostById(id, post) {
    try {
        const headers = getHeaders('PUT');

        const res = await axios({
            method: 'PUT',
            url: `http://localhost:3000/api/posts/${id}`,
            headers: headers,
            data: post
        });

        return res.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deletePostById(id) {
    try {
        const headers = getHeaders();

        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:3000/api/posts/${id}`,
            headers: headers,
        });

        return res.data;
    } catch (error) {
        handleError(error);
    }
}
