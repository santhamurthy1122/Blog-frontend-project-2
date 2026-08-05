import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class AuthService {

    url = `${BASE_URL}/api/v1/auth/`;

    login(userLoginDto){
        return axios.post(`${BASE_URL}/login`, userLoginDto);
    }

    register(user) {
        return axios.post(this.url + "register", user);
    }
}
