import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

console.log(REACT_APP_API_URL);

const ElectionsAxios = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default ElectionsAxios;
