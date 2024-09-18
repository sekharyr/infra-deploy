// // app/api/save-json/route.ts

// import fs from 'fs';
// import path from 'path';
// import { NextResponse } from 'next/server';

// // Resolve path to the 'uploads' directory within the 'public' folder
// const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// // const uploadsDir = path.join(process.cwd(), "public\\uploads");
// // const filePath = path.join(uploadsDir, "site-data.json");
// // fs.writeFileSync(filePath, JSON.stringify(site, null, 2), "utf8");
// // const fileUrl = "/uploads/ajeel_tssr_info.xlsx";

// export async function POST(req: Request) {
//   try {
//     const { site } = await req.json();

//     // Ensure the uploads directory exists
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     // Define the file path
//     const filePath = path.join(uploadsDir, 'site-data.json');

//     // Write the JSON file
//     fs.writeFileSync(filePath, JSON.stringify(site, null, 2), 'utf8');

//     return NextResponse.json({ message: 'File saved successfully' });
//   } catch (error) {
//     console.error('Error saving file:', error);
//     return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
//   }
// }

// app/api/save-json/route.ts

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export async function POST(req: Request) {
  try {
    const { site } = await req.json();

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Define the file path for the template and output file
    const templatePath = path.join(process.cwd(), 'public\\uploads', 'ajeel_info_template.json');
    const filePath = path.join(uploadsDir, 'site-data.json');
    const picture = path.join(process.cwd(), 'public\\uploads', `${site.sitePhotos[0].name}`);
    const picture_path = picture.replace(/\\/g, '\\\\');

    // Read and parse the template
    const template = fs.readFileSync(templatePath, 'utf8');
    let jsonContent = template;

    // Replace placeholders with actual site values
    jsonContent = jsonContent
      .replace(/{site_id}/g, site.siteId || '')
      .replace(/{site_name}/g, site.siteName || '')
      .replace(/{region}/g, site.region || '')
      .replace(/{project_name}/g, site.project.name || '')
      .replace(/{picture}/g, picture_path || '');

    // Write the updated JSON content to the file
    fs.writeFileSync(filePath, jsonContent, 'utf8');

    return NextResponse.json({ message: 'File saved successfully' });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}

// // Handle other HTTP methods
// export async function GET() {
//   return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
// }


// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
