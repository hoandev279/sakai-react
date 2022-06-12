import axios from "axios";

export const getProductsSmall = () => {
    return axios.get("assets/demo/data/products-small.json").then((res) => res.data.data);
};

export const getProducts = () => {
    return axios.get("assets/demo/data/products.json").then((res) => res.data.data);
};

export const getProductsWithOrdersSmall = () => {
    return axios.get("assets/demo/data/products-orders-small.json").then((res) => res.data.data);
};
