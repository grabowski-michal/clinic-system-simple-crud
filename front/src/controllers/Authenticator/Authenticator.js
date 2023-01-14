import axios from 'axios';

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Authenticator {
    static async getLoginInfo () {
        let username = localStorage.getItem('username');
        let token = localStorage.getItem('token');
        let response = { logged: false };

        console.log(username);
        console.log(token);

        if (username && token) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: '*/*'
                    }
                  }
                await axios.get('http://localhost:8080/hello', config)
                .then((res) => {
                    console.log("response?");
                    response = {
                        username: username,
                        token: token,
                        logged: true
                    }
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem('username');
                    localStorage.removeItem('token');
                    return;
                });
            } catch (ex) {
                localStorage.removeItem('username');
                localStorage.removeItem('token');
                return;
            }
        }
        return response;
    }

    static async handleLogout () {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    static async handleLogin (username, password) {
        let response;
        await axios.post('http://localhost:8080/authenticate', { username: username, password: password })
        .then((res) => {
            console.log(res);
            if (res.status == 100 || res.status == 200) {
                let token = res.data.token;
                response = {
                    username: username,
                    token: token,
                    logged: true
                }
                localStorage.setItem('username', username);
                localStorage.setItem('token', token);
            } else {
                response = {
                    logged: false
                }
            }
        })
        .catch((err) => {
            response = {
                logged: false
            }
        });

        return response;
    }

    static async handleRegister (registerData) {
        const response = await axios.post('http://localhost:8080/register', registerData);

        return response;
    }


}

export default Authenticator;


