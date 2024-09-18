import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from "path"

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const label = data.get('label')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const randomNumber = Math.floor(Math.random() * 1000000);
  const uploads_dir = path.join(process.cwd(), "public\\uploads");
  // const path = `C:\\Users\\Sekhar Yadavali-1503\\Desktop\\SiteAutomation\\uploads\\${file.name.replace(/(.*)(\.[\w\d_-]+)$/i, `$1_${randomNumber}$2`)}`;
  const fileName = `${file.name.replace(/(.*)(\.[\w\d_-]+)$/i, `$1_${randomNumber}$2`)}` 
  const file_url = `${uploads_dir}\\${fileName}`
  // const path = `C:\\Users\\Sekhar Yadavali-1503\\Desktop\\SiteAutomation\\uploads\\${file.name}`
  await writeFile(file_url, buffer)
  const fileUrl = `/uploads/${fileName}`;
  console.log(`open ${file_url} to see the uploaded file`)

  return NextResponse.json({ name: file.name, url: fileUrl, label: label })
}