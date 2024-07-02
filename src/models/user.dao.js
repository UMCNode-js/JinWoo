// models/user.dao.js

import { pool } from "../../config/db.config";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from "./user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmEmail, data.email);

        if(confirm[0].isExistEmail){
            conn.release();
            return -1;
        }

        const result = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        console.log(user);

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return user;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//사용자 리뷰목록------------------------------------------------------------------------------------------------

export const getPreviewReview = async (reviewId, size, userId) => {
    try {
        const conn = await pool.getConnection();

        //cursorId가 undefined이거나 null이다 >> 처음으로 조회를 시작했다. 
        if(reviewId == "undefined" || typeof reviewId == "undefined" || reviewId == null){
            const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [parseInt(userId), parseInt(size)]);
            //리뷰 하나하나에대한 데이터 리턴
            conn.release();
            return reviews;
    
        }else{
            const [reviews] = await pool.query(getReviewByReviewId, [parseInt(userId), parseInt(reviewId), parseInt(size)]);
            conn.release();
            return reviews;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const getPreviewMission = async (cursorId, size, userId) => {
    try {
        const conn = await pool.getConnection();

        //cursorId가 undefined이거나 null이다 >> 처음으로 조회를 시작했다. 
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [missions] = await pool.query(getMissionByMissionIdAtFirst, [parseInt(userId), parseInt(size)]);
            //리뷰 하나하나에대한 데이터 리턴
            conn.release();
            return missions;
    
        }else{
            const [missions] = await pool.query(getMissionByMissionId, [parseInt(userId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return missions;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}



//미션 세팅-----------------------------------------------------------------------
//1. setMission(실제 데이터베이스 조작), 2. getMissionSpecification

//데이터베이스 수정
export const updateMission = async (data) => {
    const conn = await pool.getConnection();

    const result = await pool.query(updataMissionSpec, [data.id, data.mission_spec]);
    conn.release();

    return result.insertId;
}

//SELECT문이 아닌 쿼리문의 반환값 : 방금 삽입한 레코드객체
/*
insertId: 새로 삽입된 행의 ID (자동 증가(primary key) 열의 값)
affectedRows: 영향을 받은 행의 수 (INSERT 문의 경우 보통 1)
changedRows: 변경된 행의 수 (INSERT 문의 경우 보통 0)
fieldCount: 결과 필드의 수 (SELECT 문의 경우에 사용됨)
serverStatus: 서버의 상태
warningCount: 경고 수
*/


export const getMissionSpecification = async (missionId) => {
    try{
        const conn = await pool.getConnection();

        //missionId가 일치하는 미션의 mission_sepc값 반환하는 쿼리문 실행
        const mission_spec = await pool.query(getSpecification, [missionId]);
        conn.release();
        return mission_spec;
    }

    catch{
        throw new BaseError(status.PARAMETER_IS_WRONG) //status파일에 에러 추가한 후 변경해야함
    }
}


