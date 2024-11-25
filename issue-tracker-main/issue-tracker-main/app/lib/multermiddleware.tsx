import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

// Helper to set up multer in Next.js
export const multerMiddleware = (upload: any) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      upload(req, res, (err: any) => {
        if (err) reject(err);
        resolve(req);
      });
    });
};
