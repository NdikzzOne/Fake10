let fetch = require('node-fetch')
let { fileIO, api} = require('../lib/uploadFile.js')
let fs = require('fs')
let handler = async (m, { conn, usedPrefix, command, text }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Kirim/Reply Gambar dengan caption .remini'
m.reply(wait)
let media = await q.download()
let url = await fileIO(media)
let hasil = `${webapi}api/ai/remini?url=${url}&apikey=${apichan}`
const response = await fetch(hasil);
    const buffer = await response.buffer();
//let hasil = `https://tesapi.zxcoderid.xyz/api/ai/remini?url=${url}&apikey=${apichan}`
/*if (!hasil) {
    hasil = `https://api.lolhuman.xyz/api/upscale?apikey=${apichan}&img=${url}`
}*/
   fs.writeFileSync('./tmp/remini.webp', buffer);
            conn.sendFile(m.chat, './tmp/remini.webp', 'remini.jpg', wm, m)
//conn.sendFile(m.chat, hasil, '', wm, m)
	
}
handler.help = ['remini']
handler.tags = ['maker']
handler.command = /^(remini|hd|hdr|upscale)$/i
handler.limit = true

module.exports = handler
