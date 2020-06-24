import axios from 'axios';

const api = axios.create({
    baseURL:'https://ListaServFesta-frontend.herokuapp.com'
})

export default Api;