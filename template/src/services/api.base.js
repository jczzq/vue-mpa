import request from './request.js';

export default {
    sample(data) {
        var url = '/api/auth/form';
        return request(url, 'post', data);
    }
};
