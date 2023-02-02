const express = require('express');
const axios = require('axios');
const sharp = require('sharp');

const app = express();

function toQueryParams(obj) {
    return Object.keys(obj).map(key => `${key}=${obj[key].trim()}`).join('&')
}

app.get('/ie/:path(*)', async (req, res) => {
    const path = req.params.path
    const query = req.query

    const format = req.query.format || 'avif'
    delete req.query.format;
    
    const width = req.query.width || 400
    delete req.query.width;
    
    const quality = req.query.quality || 80
    delete req.query.quality;

    try {
        const response = await axios({
            method: 'get',
            url: path + '?' + toQueryParams(query),
            responseType: 'arraybuffer'
        });

        let imageData = response.data;
        let processedImage = await sharp(imageData)
            .resize(width, null)
            .toFormat(format)
            .quality(quality)
            .toBuffer();

        res.set('Content-Type', `image/${format}`);
        res.send(processedImage);
    } catch (error) {
        console.error(error);
        res.status(404).send('An error occurred while retrieving the image');
    }
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});
