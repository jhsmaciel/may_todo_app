import Axios from 'axios'
export const api = Axios.create({
    baseURL: 'https://pacific-dusk-98357.herokuapp.com/',
})