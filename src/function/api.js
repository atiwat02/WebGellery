import Axios from 'axios'

const apiHost = "http://localhost:5000";


export const signup = (data) => {
    return Axios
        .post(apiHost + `/signup`, data)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};


export const signin = (data) => {
    return Axios
        .post(apiHost + `/signin`, data)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};


export const upload = (data) => {
    return Axios
        .post(apiHost + `/upload`, data)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const setdata = (data) => {
    return Axios
        .post(apiHost + `/setdata`, data)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const viewdata = () => {
    return Axios
        .get(apiHost + `/viewdata`)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};