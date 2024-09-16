const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

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
    const response = await axios.post('https://files.zxcoderid.my.id//api2image', form, {
      headers: {
        ...form.getHeaders(), // Tambahkan header dari FormData
      }
    });

    // Mendapatkan URL dari respons JSON
      if (response.data && response.data.url) {
        resolve(response.data.url);  // Kembalikan URL gambar yang diupload
      } else {
        reject('URL not found in the response.');
      }
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message);
  }
};
