import { Router } from "express";
import { removeImages, uploadImages } from "../controllers/images.js";
import cloudinary from "../configs/cloudinaryConfig.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer";
const routerImages = Router();

const storage = new CloudinaryStorage({

    cloudinary: cloudinary,
    params:{
        folder:"demo-images",
        format:"jpg"
    }
})
export const upload = multer({storage: storage})

routerImages.post("/upload",upload.array("images",10),uploadImages)
routerImages.delete("/remove/:public_id",removeImages)

export default routerImages