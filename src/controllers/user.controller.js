import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinUser, showUserReviews } from "../services/user.service.js";

export const userSignin = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}

//자신의 리뷰 목록
export const showUserReviews = async (req, res, next) => {
    console.log("자신의 리뷰들 요청");

    res.send(response(status.SUCCESS, await showReview(req.body)));
}