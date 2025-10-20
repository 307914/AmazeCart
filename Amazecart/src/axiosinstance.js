import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: 'http://localhost:2000',
  withCredentials: true,
});

export const END_POINTS = {
  USER: {
    LOGIN: '/router/login',
    SIGNUP: '/router/signup',
    RESETPASSWORD: '/router/reset-password',
    LOGOUT: '/router/logout',
    LOGINVIACOOKIE: '/router/login',
    SCANQRCODE: '/router/scanqrcode',
  },
  STRIPE: {
    CREATE: '/stripe/create-checkout-session',
    CHECKOUT_SESSION: '/stripe/checkout-session',
  },
  PRODUCTS: {
    PRODUCT: '/products',
    PAGINATED: '/paginated',
  },
  CART: {
    ADD: '/cart/add',
    REMOVE: '/cart/remove',
    INCREMENT: '/cart/increment',
    DECREMENT: '/cart/decrement',
    GETCARTITEMS: '/cart/getcartitems',
    CLEAR_CART: '/cart/clear-cart',
  },
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};
