import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class UserService {

    url = `${BASE_URL}/api/v1/users/`;

    getUserByEmail(email){
        return axios.get(this.url + "getByEmail/" + email);
    }

    updateUser(userId, user, token) {
        return axios.post(this.url + "update/" + userId, user, {
            headers: {
                "Authorization": token
            }
        });
    }

    likePost(postId, userId, token) {
        return axios.post(this.url + "like/" + postId + "/" + userId, null, {
            headers: {
                "Authorization": token
            }
        });
    }

    removeLikePost(postId, userId, token) {
        return axios.post(this.url + "removeLike/" + postId + "/" + userId, null, {
            headers: {
                "Authorization": token
            }
        });
    }
}
