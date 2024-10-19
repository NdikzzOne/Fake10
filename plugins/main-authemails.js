let handler = async (m, { conn, args, usedPrefix }) => {
  conn.emailsauth = conn.emailsauth ? conn.emailsauth : {};
  let randomSecurity = await generateRandomCode(7);
  let id = m.sender;
  let timeout = 180000;
  let poin = `${Math.floor(Math.random() * 5000)}`
  let tiketcoin = 1;
  if(!args[0]) return m.reply(`Contoh Penggunaan: /gmailreg alifiani@gmail.com`)
  if (id in conn.emailsauth) {
      return conn.reply(m.chat, '⚠️ Selesaikan Pendaftaran Kamu Saat Ini Sebelum Lanjut....', conn.emailsauth[id][0]);
  }
  let json = randomSecurity;
  
  const HttpsProxyAgent = require('https-proxy-agent');
  const nodemailer = require('nodemailer');
  const proxy = 'http://103.111.136.82:8080'; // Proxy
  const agent = new HttpsProxyAgent(proxy); // Konfigurasi agent proxy

  // Konfigurasi transporter
  let transporter = nodemailer.createTransport({
      proxy: agent,
      host: 'kanade.kawaiihost.net',
      port: 465,
      secure: true,
      requireTLS: false,
      auth: {
          user: 'tesmail@zxcodermyz.my.id',
          pass: 'QrJrKc}sX9mV',
      },
  });

  // Data email yang akan dikirim
  let mailOptions = {
      from: 'Bot-OTP WA',
      to: args[0],
      subject: 'KODE VERIFIKASI WHATSAPP - BOT MULTIDEVICE',
      text: `Masih Versi Demo Lagi males ngoding html:V
Nih Kode Verifikasinya Ngab ==> ${randomSecurity}

caranya langsung kirim pesan kepada bot nya sebelum Habis waktunya 1menit`,
  };

      // Kirim email menggunakan async/await
      let details = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + details.response);
  
  let teks = `${htki} 𝚅𝙴𝚁𝙸𝙵𝙸𝙺𝙰𝚂𝙸 𝙼𝙴𝙻𝙰𝙻𝚄𝙸 𝙿𝙴𝚂𝙰𝙽 𝙶𝙼𝙰𝙸𝙻 ${htka}

⻝ Success Kode Verifikasi telah terkirim
⻝ Cek Pada Pesan gmail ${args[0]}

🌏 Status Code Sent: ${details.response}
`.trim();

  let msg = await conn.sendMessage(m.chat, {
      text: teks,
      contextInfo: {
          externalAdReply: {
              title: "",
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: "",
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, { quoted: m });

  let { key } = msg;

  conn.emailsauth[id] = [
      msg,
      json,
      setTimeout(() => {
          if (conn.emailsauth[id]) {
              conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.emailsauth[id][0]);
              delete conn.emailsauth[id];
          }
      }, timeout),
      key
  ];
}

handler.help = ['verify-emailauth'];
handler.tags = ['game'];
handler.command = /^(verify-emailauth|gmailreg)$/i;
handler.limit = true;
handler.group = false;

module.exports = handler;
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
