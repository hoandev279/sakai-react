import axios from 'axios'

export const getCustomersMedium = () => {
    return axios.get('assets/demo/data/customers-medium.json')
        .then(res => res.data.data);
}

export const getCustomersLarge = () => {
    return axios.get('assets/demo/data/customers-medium.json')
        .then(res => res.data.data);
}