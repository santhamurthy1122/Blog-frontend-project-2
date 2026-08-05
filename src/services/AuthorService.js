import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class AuthorService {

    url = `${BASE_URL}/api/v1/authors/`;

    getall() {
        return axios.get(this.url + "getall");
    }

    getById(authorId) {
        return axios.get(this.url + "getById/" + authorId);
    }
}
