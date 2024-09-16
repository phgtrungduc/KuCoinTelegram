const fs = require('fs');
const path = require('path');
const axios = require('axios');
const colors = require('colors');
const readline = require('readline');
const FormData = require('form-data');

class KucoinAPIClient {
    constructor() {
        this.headers = {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "Origin": "https://www.kucoin.com",
            "Referer": "https://www.kucoin.com/miniapp/tap-game?inviterUserId=376905749&rcode=QBSLTEH5",
            "Sec-Ch-Ua": '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
            "Sec-Ch-Ua-Mobile": "?1",
            "Sec-Ch-Ua-Platform": '"Android"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36"
        };
    }

    log(msg, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        switch(type) {
            case 'success':
                console.log(`[${timestamp}] [*] ${msg}`.green);
                break;
            case 'custom':
                console.log(`[${timestamp}] [*] ${msg}`.magenta);
                break;        
            case 'error':
                console.log(`[${timestamp}] [!] ${msg}`.red);
                break;
            case 'warning':
                console.log(`[${timestamp}] [*] ${msg}`.yellow);
                break;
            default:
                console.log(`[${timestamp}] [*] ${msg}`.blue);
        }
    }

    async countdown(seconds) {
        for (let i = seconds; i > 0; i--) {
            const timestamp = new Date().toLocaleTimeString();
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`[${timestamp}] [*] Chờ ${i} giây để tiếp tục...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 0);
    }

    generateRandomPoints(totalPoints, numRequests) {
        let points = new Array(numRequests).fill(0);
        let remainingPoints = totalPoints;

        for (let i = 0; i < numRequests - 1; i++) {
            const maxPoint = Math.min(60, remainingPoints - (numRequests - i - 1));
            const point = Math.floor(Math.random() * (maxPoint + 1));
            points[i] = point;
            remainingPoints -= point;
        }

        points[numRequests - 1] = remainingPoints;

        for (let i = points.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [points[i], points[j]] = [points[j], points[i]];
        }

        return points;
    }

    async increaseGold(cookie, increment, molecule) {
        const url = "https://www.kucoin.com/_api/xkucoin/platform-telebot/game/gold/increase?lang=en_US";
        
        const formData = new FormData();
        formData.append('increment', increment);
        formData.append('molecule', molecule);
        const headers = {
            ...this.headers,
            "Cookie": cookie,
            ...formData.getHeaders()
        };

        try {
            const response = await axios.post(url, formData, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: `HTTP Error: ${response.status}` };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async main() {
        // const dataFile = path.join(__dirname, 'data.txt');
        // const cookies = fs.readFileSync(dataFile, 'utf8')
        //     .replace(/\r/g, '')
        //     .split('\n')
        //     .filter(Boolean);
        const cookies = '__cf_bm=Hu44_.MAi_sKiDpx7jM_kUnVHoGI2w0s88ytXhCZ2U0-1726148283-1.0.1.1-sRBWjShOWRrNCfi.oFR.JU7lB2iG.sq_mB9z1ajHRYWd4O2QDppDJjOLuuDZtB.vX9C3Aseu0ipv6qYfPYFlOA; _cfuvid=nFvh_H57JMaC2w_bnQZFW7dWPBj1Nxom2MPeCKYgJqs-1726148283715-0.0.1.1-604800000; x_g_t_k=E6F8864D5C5894AF2E5EDE87B93BDFDD968A1A5C85F72CD1DB1F84FE66E7921E832CC70C5AE1EE7CFA159DD5DB3BB798446588C8F6E62B4B2CCF2B875BB86581DA0F868CF269D1EED12A6451A2F5DEB9DE390BFF1D45FCE55CDCFA31D46ED298; cf_clearance=awtuS4QtmHpubUy0rMk_Z3JwAizoxXQ8IotLH.x1JBM-1726148506-1.2.1.1-uu8S4M5BsE7RDosz4m8A241A5g1pthLZDLm1yU914w.OIqIVaCPMePIlJzdEnYMmg2Q4dxiXYasE7GMgyu.Y9Ddwx9QQVoeQlmczo4KNQM9JUeQtk.9shp2zYErL8xxWcHpvAH.q.pPPZNZJtoWcxhM_8Ze4cTKuMsMvbffgFdTD5eUMVFvs0CPI2SW7_HcoV69LUwlmeNdoaCdwPR8r8Jw2CRp4oVMqXGitC3KnkQwBqEk4LVXeB9b2qA3vV0iMhH29SeLFc0utHgV6nguTxEDDIMexFcnz2PS25n7hwQTz.oHgSZPx3CA5FBtrEglQHqTN1HTGOMsAW_eeI32HGHv5ducf.Onzig3KVtsgZgnnsTXDjvSRx6Gw3YrKIo6.PQmQw3.Qa1VlhAsCAoOXhA'
            .replace(/\r/g, '')
            .split('\n')
            .filter(Boolean);

        while (true) {
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                
                console.log(`========== Tài khoản ${i + 1} ==========`);
                
                const points = this.generateRandomPoints(3000, 55);
                let totalPoints = 0;
                let currentMolecule = 3000;

                for (let j = 0; j < points.length; j++) {
                    const increment = points[j];
                    currentMolecule -= increment; 

                    this.log(`Lần ${j + 1}: Bón ${increment} sâu cho ếch...`, 'info');
                    
                    const result = await this.increaseGold(cookie, increment, currentMolecule);
                    if (result.success) {
                        this.log(`Cho ăn thành công, đã bón được ${result.data.data} sâu`, 'success');
                        totalPoints += increment;
                        this.log(`Số sâu còn lại: ${currentMolecule}`, 'custom');
                    } else {
                        this.log(`Không thể bón sâu: ${result.error}`, 'error');
                    }

                    await this.countdown(3);
                }

                this.log(`Tổng số gold đã tăng: ${totalPoints}`, 'custom');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }

            await this.countdown(300);
        }
    }
}

const client = new KucoinAPIClient();
client.main().catch(err => {
    client.log(err.message, 'error');
    process.exit(1);
});