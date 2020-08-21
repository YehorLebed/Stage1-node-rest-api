function handleUnathorizedError(error, fetchFunction) {
    if (error.response.headers['x-token'] && !localStorage.getItem('token')) {
        localStorage.setItem('token', error.response.headers['x-token']);
    }
}

export async function getPosts() {
    try {
        const token = localStorage.getItem('token');

        const headers = {};

        if (token) {
            headers['x-token'] = token;
        }

        const res = await axios({
            method: 'GET',
            url: `http://localhost:3000/api/posts`,
            headers: headers
        });

        return res.data;
    } catch (error) {
        console.log(error.toJSON());
        if (error.response.status === 401) {
            handleUnathorizedError(error);
            alert('Try again!')
        }
    }
}

export async function getPostById(id) {
    try {
        const token = localStorage.getItem('token');

        const headers = {};

        if (token) {
            headers['x-token'] = token;
        }

        const res = await axios({
            method: 'GET',
            url: `http://localhost:3000/api/posts/${id}`,
            headers: headers
        });

        return res.data;
    } catch (error) {
        console.log(error.toJSON());
        if (error.response.status === 401) {
            handleUnathorizedError(error);
            alert('Try again!')
        }
    }
}

export async function createPost(post) {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'content-type': 'application/json'
        };

        if (token) {
            headers['x-token'] = token;
        }

        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/posts',
            headers: headers,
            data: post
        });

        return res.data;
    } catch (error) {
        console.log(error.toJSON());
        if (error.response.status === 401) {
            handleUnathorizedError(error);
            alert('Try again!')
        }
    }
}

export async function updatePostById(id, post) {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'content-type': 'application/json'
        };

        if (token) {
            headers['x-token'] = token;
        }

        const res = await axios({
            method: 'PUT',
            url: `http://localhost:3000/api/posts/${id}`,
            headers: headers,
            data: post
        });

        return res.data;
    } catch (error) {
        console.log(error.toJSON());
        if (error.response.status === 401) {
            handleUnathorizedError(error);
            alert('Try again!')
        }
    }
}

export async function deletePostById(id) {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'content-type': 'application/json'
        };

        if (token) {
            headers['x-token'] = token;
        }

        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:3000/api/posts/${id}`,
            headers: headers,
        });

        return res.data;
    } catch (error) {
        console.log(error.toJSON());
        if (error.response.status === 401) {
            handleUnathorizedError(error);
            alert('Try again!')
        }
    }
}
