import { IncomingForm } from 'formidable';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle multipart/form-data
  },
};

// Define the POST method
export async function POST(request) {
  try {
    const form = new IncomingForm();

    // Convert the Next.js request to a readable stream
    const data = await request.formData();
    const file = data.get('ecommerce'); // Assuming the file input name is 'ecommerce'

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
      });
    }

    // Save the file temporarily
    const tempFilePath = `/tmp/${file.name}`;
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(tempFilePath, Buffer.from(fileBuffer));

    // Upload the file to Cloudinary
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'uploads', // Optional: Organize files into a folder
        public_id: `${Date.now()}_${file.name}`, // Unique file name
      });

      const imageUrl = cloudinaryResponse.secure_url; // URL of the uploaded file

      // Delete the temporary file
      fs.unlinkSync(tempFilePath);

      // Return the image URL to the client
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