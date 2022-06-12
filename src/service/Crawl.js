import axios from 'axios'

export const getCrawlFb = () => {
    return axios.get('assets/demo/data/crawl.json')
        .then(res => res.data.data);
}

export const getCustomersLarge = () => {
    return axios.get('assets/demo/data/customers-medium.json')
        .then(res => res.data.data);
}