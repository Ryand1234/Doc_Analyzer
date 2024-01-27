import fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next'
import pdfParse from 'pdf-parse';
import mammoth from "mammoth";
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});
export const config = {
  api: {
    bodyParser: false
  }
};
export default function handler(
  req: any,
  res: any
) {
  // console.log("HO")
  if (req.method === "GET") {
    res.status(405).json({ message: "Get not allowed" })
  }
  try {
    // Use multer middleware to handle file upload
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Access the uploaded file through req.file
      const uploadedFile = req.file;

      // Check if a file was provided
      if (!uploadedFile) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      // console.log(uploadedFile);
      // Process the file as needed
      const pdfData = Buffer.from(uploadedFile.buffer);
      const ext = uploadedFile.originalname.split('.').pop()
      if (ext == 'pdf') {
        // Parse the PDF content
        pdfParse(pdfData).then((data) => {
          // Extracted text content from the PDF
          const textContent = data.text;
          res.status(200).json({ message: 'File uploaded successfully!', content: textContent });

        }).catch((error) => {
          console.error('Error parsing PDF:', error);
          res.status(500).json({ message: 'File uploaded unsuccessfully!', content: null });
        });
      } else {
        if (ext == 'docx') {
          mammoth.extractRawText({ arrayBuffer: uploadedFile.buffer })
            .then(result => {
              // `result.value` contains the text extracted from the DOCX
              const textContent = result.value;
              res.status(200).json({ message: 'File uploaded successfully!', content: textContent });
            })
            .catch(error => {
              console.error(error);
              res.status(500).json({ message: 'File uploaded unsuccessfully!', content: null });
            });
        } else {
          const textContent = uploadedFile.buffer.toString('utf-8');

          // console.log(fileContent);

          res.status(200).json({ message: 'File uploaded successfully!', content: textContent });
        }
      }


    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}