import axios from 'axios';

export default axios.create({
    baseURL: 'https://vuegram-clone-b7eaa.firebaseio.com/',
    params: {
        key: 'AIzaSyBWXm0OREHNKRYmk_VK1QVxw79TSSb1sDM',
    }
});