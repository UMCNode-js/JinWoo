// user.route.js

import express from "express";
import asyncHandler from 'express-async-handler';

import { userSignin, showUserReviews } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(userSignin)); //회원가입

userRouter.post('/missions', asyncHandler(showUserReviews)) //내가(현재 사용자가) 작성한 리뷰 목록