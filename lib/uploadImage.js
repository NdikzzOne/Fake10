const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Fungsi untuk meng-upload gambar dan mendapatkan URL dalam JSON format
function UploadImage(filePath) {
  return new Promise((resolve, reject) => {
    // Baca file yang akan diupload
    const fileStream = fs.createReadStream(filePath);

    // Buat form data
    const form = new FormData();
    form.append('image', fileStream);

    // Mengirim permintaan POST dengan axios ke /api2image
    axios.post('https://files.zxcoderid.my.id/api2image', form, {
      headers: {
        ...form.getHeaders(), // Mengatur header yang sesuai
      }
    })
    .then(response => {
      // Mendapatkan URL dari respons JSON
      if (response.data && response.data.url) {
        resolve(response.data.url);  // Kembalikan URL gambar yang diupload
      } else {
        reject('URL not found in the response.');
      }
    })
    .catch(error => {
      reject('Error uploading file: ' + error.message);
    });
  });
}

module.exports = { UploadImage };
