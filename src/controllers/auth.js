import User from "../models/User.js";
import { signUpValidator, signInValidator } from "../validation/auth.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const {SECRET_CODE} = process.env

export const signUp = async (req, res) => {
    try {
        //B1:Validate 
        const { error } = signUpValidator.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })

        }
        //B2:Kiem tra ton tai email
        const userExists = await User.findOne({ email: req.body.emai });
        if (userExists) {
            return res.status(400).json({
                message: "Email này đã được đăng kí bạn có muốn đăng nhập không?"
            })
        };
        //B3:Ma hoa password 
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //B4:Khoi tao user trong db
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        });

        //B5:Thong bao cho nguoi dung dang ky thanh cong
        // Xoa password
        user.password = undefined
        return res.status(200).json({
            message: "Dang ky acount thanh cong",
            user,
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message

        })
    }
}

export const signIn = async (req, res) => {
    try {
        //Buoc 1:Validate data tu client
        const { error } = signInValidator.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(error => error.message)
            return res.status(400).json({
                message: errors
            })
        }
        //Buoc 2:Kiem tra email da ton tai tu he thong hay chua
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                message: "Email chua duoc dang ky ban co muon dang ky khong"
            })
        };

        //Buoc 3:Kiem tra password
        const isMath = await bcrypt.compare(req.body.password,user.password);
        if(!isMath) {
            return res.status(404).json({
                message: "Password error"
            })
        }

        //Buoc 4:Tao JWT 
        const accessToken = jwt.sign({_id:user.id},SECRET_CODE,{expiresIn:"1d"})
        //Buoc 5:Tra ra thong bao cho nguoi dung.
        user.password = undefined
        user.confirmPassword = undefined
        return res.status(200).json({
            message: "Dang nhap thanh cong",
            user,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}