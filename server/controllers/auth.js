import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import { createError } from "../utility/error.js";
import jwt from "jsonwebtoken";


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Bu email adresi zaten kullanımda." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ success: true, message: "Kullanıcı başarıyla oluşturuldu.", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ success: false, message: "Yanlış kimlik bilgileri." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password, ...others } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({
      success: true,
      message: "Başarıyla giriş yapıldı.",
      user: others,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Geçersiz token" });
      }
      return res.status(200).json({ message: "Başarıyla çıkış yapıldı" });
    });
  } catch (err) {
    next(err);
  }
};