import axios from 'axios';
import { getCookie } from '../shared/Cookie';

// 1. Axios instance생성

const deafultURL = 'http://localhost:3000';

const api = axios.create({
    baseURL: deafultURL,
    credentials: true,
});
// headers에 content-type을 정하게 되면,
// 프리플라이트가 날아가지 않아서 로그인 실패

export const apiJson = axios.create({
    baseURL: deafultURL,
    credentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiForm = axios.create({
    baseURL: deafultURL,
    credentials: true,
    headers: {
        'Content-Type': 'mutipart/form-data',
    },
});

// 2. request interceptor
// 인증이 필요한 요청을 중간에 가로채서 헤더에 토큰 소매넣기 해주기

// apiJson이나 apiForm 별도로 만든 api 요청으로 필요할 경우
// apiJson.interceptors.request.use(
// apiForm.interceptors.request.use(
api.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        config.headers['Refresh-token'] = refreshToken;
        return config;
    },
    (error) => {
        console.log(error);
    }
);

apiForm.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        config.headers['Refresh-token'] = refreshToken;
        return config;
    },
    (error) => {
        console.log(error);
    }
);

// 3. response interceptor // Q. 어떤 경우에 쓰이는지?
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
    }
);

// 4.
const apis = {

    //이부분을 수정할 것!!
    //user
    // dupCheckId: (payload) => api.get(`users/auth/dupcheck/${payload}`),
    // registerUser: (payload) => api.post('/users/auth/signup', payload),
    // loginUser: (payload) => api.post('/users/auth/login', payload),
    // logoutUser: (payload) => api.get('/users/logout', payload),
    // getNewToken: (payload) => api.post('/users/renew', payload),

    // post
    // getAllPosts: () => api.get('/posts'),
    // writePost: (payload) => apiForm.post('/posts', payload),
    // getThisPost: (postId) => api.get(`posts/${postId}`),
    // editPost: (payload) => api.post('url', payload),
    // removePost: (postId) => api.delete(`posts/${postId}`),
};

export default apis;