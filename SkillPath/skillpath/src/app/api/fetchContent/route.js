// /app/api/fetchContent/route.js

import { Storage } from '@google-cloud/storage';
import { NextResponse } from 'next/server';


// Decode the base64-encoded credentials
const credentialsBase64 = process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS_BASE64;

if (!credentialsBase64) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS_BASE64');
}

const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'));

// Initialize the Google Cloud Storage client
const storage = new Storage({
  projectId: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT,
  credentials: credentials,
});


export async function GET(request) {
  const bucketName = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET;

  // Retrieve the 'filePath' query parameter from the request URL
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("filePath");

  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);

    // Check if the file exists
    const [exists] = await file.exists();

    if (!exists) {
      console.error("File does not exist in the specified bucket.");
      return NextResponse.json(
        { message: "File not found in the specified bucket" },
        { status: 404 }
      );
    }

    // Download the file contents
    const [content] = await file.download();
    const data = JSON.parse(content.toString());

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching content:", error.message);
    return NextResponse.json(
      { message: "Error fetching content", error: error.message },
      { status: 500 }
    );
  }
}
