const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWhitoutToken = (enpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${enpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export const fetchWhitToken = (enpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${enpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        })
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}
