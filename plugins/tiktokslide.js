let fetch = require('node-fetch')

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
	if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
    m.reply('Sabar Sedang Mengunduh Media Dari Link Tersebut Kak!')
	try {
		let res = await fetch(`${neNdikz}api/tiktok?url=${args[0]}&apikey=${neoapi}`)
		let tate = await res.json()
		anu = tate.data
        let capt = `☑️`
		for(let x of anu.photo)
            conn.sendFile(m.chat, x, 'jpeg/image', `${capt}`, m)
	}
}

handler.menu = ['tiktokslide <url>']
handler.tags = ['download']
handler.command = /^((tt|tiktok)slide)$/i

handler.premium = false
handler.limit = true

module.exports = handler
