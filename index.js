const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();

const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/mini-trips.appspot.com/o/trips%2Fexperience-the-cultural-diversity-of-india-at-bharat-parv-2023-at-the-iconic-red-fort-delhi-0?alt=media&token=7bcb358a-6054-46d7-bd45-1af039f974b0';


app.get('/image', async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            url: imgUrl,
            responseType: 'arraybuffer'
        });

        let imageData = response.data;
        let processedImage = await sharp(imageData)
            .resize(500, 500)
            .toFormat('jpeg')
            .toBuffer();

        res.set('Content-Type', 'image/jpeg');
        res.send(processedImage);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the image');
    }
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});
