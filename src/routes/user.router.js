// user.route.js

import express from "express";
import asyncHandler from 'express-async-handler';

import { userSignin, showUserReviews, showUserMissions } from "../controllers/user.controller.js";

export const userRouter = express.Router();

//회원가입
userRouter.post('/signin', asyncHandler(userSignin)); 
//나의 리뷰 모아보기
userRouter.post('/reviews', asyncHandler(showUserReviews)); //내가(현재 사용자가) 작성한 리뷰 목록
//사용자 미션 모아보기
userRouter.post('/missions', asyncHandler(showUserMissions));
//진행 중인 미션 "진행 완료"로 바꾸기
userRouter.post('/missions/:mission_id/complete', asyncHandler(completeMission));