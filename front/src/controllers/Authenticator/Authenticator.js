import axios from 'axios';

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Authenticator {





    static async getLoginInfo () {
        let username = localStorage.getItem('username');
        let token = localStorage.getItem('token');
        let response = { logged: false };

        if (username && token) {
            try {
                axios.get('http://localhost:8080/hello', {})
                .then((res) => {
                    console.log("response?");
                    response = {
                        username: username,
                        token: token,
                        logged: true
                    }
                })
                .catch((err) => {
                    return;
                });
            } catch (ex) {
                return;
            }
        }
        return response;
    }

    static async handleLogin (username, password) {
        const response = await axios.post('http://localhost:8080/register', { username: username, password: password });

        console.log(response);
    }

    static async handleRegister (registerData) {
        const response = await axios.post('http://localhost:8080/register', registerData);

        console.log(response);
    }


}

export default Authenticator;


