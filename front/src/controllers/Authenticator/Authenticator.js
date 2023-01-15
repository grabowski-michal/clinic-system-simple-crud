import axios from 'axios';

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Authenticator {
    static config = (token) => {
        return ({
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*'
            }
        });
    }

    static async getLoginInfo () {
        let username = localStorage.getItem('username');
        let token = localStorage.getItem('token');
        let response = { logged: false };

        if (username && token) {
            try {
                await axios.get('http://localhost:8080/hello', Authenticator.config(token))
                .then((res) => {
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
        console.log(response);
        return response;
    }

    static async getUserData () {
        let username = localStorage.getItem('username');
        let token = localStorage.getItem('token');
        let response = { data: {}, logged: false };

        if (username && token) {
            try {
                const request = {
                    ...Authenticator.config(token),
                    params: {
                        token: token
                    }
                }
                console.log(request);
                await axios.get('http://localhost:8080/getUserInfo', request)
                .then((res) => {
                    response = {
                        data: res.data,
                        logged: true,
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
            } catch (ex) {
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

    static async handleUpdateUser (alteredData) {
        let data = {
            token: localStorage.getItem('token'),
            user: alteredData
        };
        const response = await axios.put('http://localhost:8080/alterUser', data, Authenticator.config(localStorage.getItem('token')));
        return response;
    }

    static async handleUpdateAddress (alteredData) {
        let data = {
            token: localStorage.getItem('token'),
            address: alteredData
        };
        const response = await axios.put('http://localhost:8080/alterAddress', data, Authenticator.config(localStorage.getItem('token')));
        return response;
    }

    static async handleUpdatePassword (alteredData) {
        let data = {
            token: localStorage.getItem('token'),
            oldPassword: alteredData.oldPassword,
            newPassword: alteredData.newPassword
        };
        const response = await axios.put('http://localhost:8080/alterPassword', data, Authenticator.config(localStorage.getItem('token')));
        return response;
    }

    static async getDoctorsFromDepartment (department) {
        let token = localStorage.getItem('token');
        let response = { data: {}, logged: false };

        if (token) {
            try {
                const request = {
                    ...Authenticator.config(token),
                    params: {
                        token: token,
                        department: department
                    }
                }
                console.log(request);
                await axios.get('http://localhost:8080/getDoctors', request)
                .then((res) => {
                    response = {
                        data: res.data,
                        logged: true,
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
            } catch (ex) {
                return;
            }
        }
        return response;
    }

    static async handleMakeAppointment (appointmentData) {
        appointmentData = {
            appointment: appointmentData
        }
        appointmentData.token = localStorage.getItem('token');
        console.log(appointmentData);
        const response = await axios.post('http://localhost:8080/makeAppointment', appointmentData, Authenticator.config(localStorage.getItem('token')));
        return response;
    }

    static async getAppointments () {
        let token = localStorage.getItem('token');
        let response = { data: {}, logged: false };

        if (token) {
            try {
                const request = {
                    ...Authenticator.config(token),
                    params: {
                        token: token
                    }
                }
                console.log(request);
                await axios.get('http://localhost:8080/getAppointments', request)
                .then((res) => {
                    response = {
                        data: res.data,
                        logged: true,
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
            } catch (ex) {
                return;
            }
        }
        return response;
    }

    static async handleCancelAppointment (appointmentId) {

        let data = {
            ...Authenticator.config(localStorage.getItem('token')),
            data: {
                token: localStorage.getItem('token'),
                id: parseInt(appointmentId)
            }
        }
        const response = await axios.delete('http://localhost:8080/cancelAppointment', data);
        return response;
    }


}

export default Authenticator;


