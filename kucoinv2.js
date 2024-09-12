const axios = require('axios');

const url = 'https://www.kucoin.com/_api/xkucoin/platform-telebot/game/gold/increase?lang=en_US';

const headers = {
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryu5hdFbG0TrPW8AQu',
    'cookie': '__cf_bm=Hu44_.MAi_sKiDpx7jM_kUnVHoGI2w0s88ytXhCZ2U0-1726148283-1.0.1.1-sRBWjShOWRrNCfi.oFR.JU7lB2iG.sq_mB9z1ajHRYWd4O2QDppDJjOLuuDZtB.vX9C3Aseu0ipv6qYfPYFlOA; _cfuvid=nFvh_H57JMaC2w_bnQZFW7dWPBj1Nxom2MPeCKYgJqs-1726148283715-0.0.1.1-604800000; x_g_t_k=E6F8864D5C5894AF2E5EDE87B93BDFDD968A1A5C85F72CD1DB1F84FE66E7921E832CC70C5AE1EE7CFA159DD5DB3BB798446588C8F6E62B4B2CCF2B875BB86581DA0F868CF269D1EED12A6451A2F5DEB9DE390BFF1D45FCE55CDCFA31D46ED298; cf_clearance=awtuS4QtmHpubUy0rMk_Z3JwAizoxXQ8IotLH.x1JBM-1726148506-1.2.1.1-uu8S4M5BsE7RDosz4m8A241A5g1pthLZDLm1yU914w.OIqIVaCPMePIlJzdEnYMmg2Q4dxiXYasE7GMgyu.Y9Ddwx9QQVoeQlmczo4KNQM9JUeQtk.9shp2zYErL8xxWcHpvAH.q.pPPZNZJtoWcxhM_8Ze4cTKuMsMvbffgFdTD5eUMVFvs0CPI2SW7_HcoV69LUwlmeNdoaCdwPR8r8Jw2CRp4oVMqXGitC3KnkQwBqEk4LVXeB9b2qA3vV0iMhH29SeLFc0utHgV6nguTxEDDIMexFcnz2PS25n7hwQTz.oHgSZPx3CA5FBtrEglQHqTN1HTGOMsAW_eeI32HGHv5ducf.Onzig3KVtsgZgnnsTXDjvSRx6Gw3YrKIo6.PQmQw3.Qa1VlhAsCAoOXhA',
    'origin': 'https://www.kucoin.com',
    'priority': 'u=1, i',
    'referer': 'https://www.kucoin.com/miniapp/tap-game',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
};

const data = `------WebKitFormBoundaryu5hdFbG0TrPW8AQu\r\n` +
    `Content-Disposition: form-data; name="increment"\r\n\r\n` +
    `15\r\n------WebKitFormBoundaryu5hdFbG0TrPW8AQu\r\n` +
    `Content-Disposition: form-data; name="molecule"\r\n\r\n` +
    `3000\r\n------WebKitFormBoundaryu5hdFbG0TrPW8AQu--\r\n`;

setInterval(() => {
    let bodyFormData = new FormData();
    bodyFormData.append('increment', 15);
    bodyFormData.append('molecule', 3000);

    axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: headers,
    })
        .then(function (response) {
            //handle success
            console.log(response.data);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}, 3000)
