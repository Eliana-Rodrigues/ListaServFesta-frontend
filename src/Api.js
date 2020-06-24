import axios from 'axios';

const Api = axios.create({
    baseURL:'https://ListaServFesta-frontend.herokuapp.com'
})

export default Api;