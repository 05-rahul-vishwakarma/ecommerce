import axios from 'axios';
import sharp from 'sharp';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required.' });
    }

    try {
        // Fetch the image from the URL
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Convert the image to PNG format using sharp
        const convertedImage = await sharp(response.data)
            .toFormat('png')
            .toBuffer();

        // Set the response headers and send the converted image
        res.setHeader('Content-Type', 'image/png');
        res.send(convertedImage);
    } catch (error) {
        console.error('Error converting image:', error);
        res.status(500).json({ error: 'Failed to convert image.' });
    }
}