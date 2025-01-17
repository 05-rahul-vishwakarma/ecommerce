import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const form = new IncomingForm();
    const data = await request.formData();
    const file = data.get('ecommerce'); // Assuming the file input name is 'ecommerce'

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
      });
    }

    // Define temporary file path (Windows-compatible)
    const tempDir = path.join(__dirname, 'tmp'); // or use a platform-specific directory
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true }); // Create the directory if it doesn't exist
    }

    const tempFilePath = path.join(tempDir, file.name);
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(tempFilePath, Buffer.from(fileBuffer));

    // Upload the file to Cloudinary 
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'uploads',
        public_id: `${Date.now()}_${file.name}`,
      });

      const imageUrl = cloudinaryResponse.secure_url;

      // Delete the temporary file
      fs.unlinkSync(tempFilePath);

      return new Response(JSON.stringify({ imageUrl }), { status: 200 });
    } catch (cloudinaryError) {
      console.error('Error uploading to Cloudinary:', cloudinaryError);
      return new Response(
        JSON.stringify({ error: 'Failed to upload image to Cloudinary' }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500 }
    );
  }
}
