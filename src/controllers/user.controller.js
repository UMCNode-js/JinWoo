import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinUser, getMyMission, getMyReview, setMissionSpec } from "../services/user.service.js";

export const userSignin = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}

//자신의 리뷰 목록
export const showUserReviews = async (req, res, next) => {
    console.log("자신의 리뷰들 요청");

    res.send(response(status.SUCCESS, await getMyReview(req.params.userId, req.body)));
}

//나의 진행 중인 미션 목록
export const showUserMissions = async (req, res, next) => {
    console.log("자신의 진행중인 미션 목록 요청");

    res.send(response(status.SUCCESS, await getMyMission(req.params.userId, req,body)));
}

//진행 중인 미션을 "진행 완료"로 바꾸기
export const completeMission = async (req, res, next) => {
    console.log("미션 완료처리");

    res.send(response(status.SUCCESS, await setMissionSpec(req.body)));
}