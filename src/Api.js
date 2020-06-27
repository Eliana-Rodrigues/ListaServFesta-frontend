import axios from 'axios';

const Api = axios.create({
    baseURL:'https://ListaServFesta.herokuapp.com'
})

export default Api;