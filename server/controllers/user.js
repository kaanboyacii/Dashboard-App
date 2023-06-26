import { createError } from "../utility/error.js";
import User from "../models/User.js"
import bcrypt from "bcrypt";

export const updateImg = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: { img: req.body.img },
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        const { password, ...rest } = req.body;
        let updatedUser;
  
        if (password) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...rest,
                password: hash,
              },
            },
            { new: true }
          );
        } else {
          updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: rest },
            { new: true }
          );
        }
  
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can update only your account!"));
    }
  };
  
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("User has been deleted");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}
