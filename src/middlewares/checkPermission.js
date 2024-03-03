import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config()

const { SECRET_CODE } = process.env
export const checkPermission = async (req, res, next) => {
    try {
        //Buoc 1 : Kiem tra nguoi dung da dawng nhap chuaw
        const token = req.headers.authorization?.split(" ")[1];
   
        //Buoc 2 : Kiem tra token
        if (!token) {
            return res.status(400).json({
                message: "Ban chua dang nhap"
            });
        }
        //Buoc 3: Kiem tra quen cua nguoi dung
        const dedcode = jwt.verify(token, SECRET_CODE);
        
        const user = await User.findById(dedcode._id);
        if (!user) {
            return res.status(400).json({
                message: "Token degbug"
            })
        }
        if (user.role !== "admin") {
            return res.status(400).json({
                message: "Ban khong co quyen lam viec nay"
            })
        }
        //Buoc 4 : Next
        next();

    } catch (error) {
        return res.json({
            name: error.name,
            message: error.message
        })
    }
}