const fetch = require('node-fetch');
require("dotenv").config();

let url = "https://dev-441752-admin.okta.com/api/v1/users?limit=200";
let headers = {
    Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "SSWS 00qthC_Tls-hpzrR2uHvPtIVKyCgD1AAP6Vasd7RxQ"
}

const get_data = async (url, headers) => {
    try {
        const res = await fetch(url, headers);
        const json = await res.json();
        console.log(json)
    } catch (error) {
        console.log(error)
    }
}

// let data = get_data(url);

// console.log(data);