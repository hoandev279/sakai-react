import axios from 'axios'

export const getCrawlFb = () => {
    return axios.get('assets/demo/data/crawl.json')
        .then(res => res.data.data);
}

export const getPosts = () => {
    return axios.get('assets/demo/data/posts.json')
        .then(res => res.data.data);
}