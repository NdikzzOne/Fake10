const fetch = require('node-fetch')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

/**
 * Upload image to btch.pages.dev
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
  try {
    // Deteksi ekstensi file dari buffer
    const { ext, mime } = await fromBuffer(buffer);
    
    if (!ext || !mime) {
      throw new Error('Unable to determine file type from buffer.');
    }

    // Buat form data
    let form = new FormData();
    form.append('image', buffer, {
      filename: `upload.${ext}`, // Beri nama file dengan ekstensi yang ditemukan
      contentType: mime // Berikan MIME type berdasarkan file
    });

    // Mengirim permintaan POST dengan axios
    const response = await axios.post('https://files.zxcoderid.my.id/upload', form, {
      headers: {
        ...form.getHeaders(), // Tambahkan header dari FormData
      }
    });

    // Parsing respons HTML untuk mengambil URL
    const cheerio = require('cheerio');
    const $ = cheerio.load(response.data);
    const message = $('p').text(); // Ambil teks dari elemen <p>
    const urlMatch = message.match(/Access it at:\s*(https?:\/\/[^\s]+)/); // Ekstrak URL

    if (urlMatch) {
      return urlMatch[1].trim(); // Kembalikan URL dari file yang sudah diunggah
    } else {
      throw new Error('URL not found in the response.');
    }
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message);
  }
};
