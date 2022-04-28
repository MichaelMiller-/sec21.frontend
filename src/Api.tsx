import axios from 'axios';

// https://www.digitalocean.com/community/tutorials/react-axios-react

export default axios.create({
    baseURL: process.env.REACT_APP_BACKEND
});