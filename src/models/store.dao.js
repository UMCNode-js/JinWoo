import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { getReviewByReviewIdAtFirst, getReviewByReviewId, getMissionByMissionId, getMissionByMissionIdAtFirst } from "./store.sql";
import { status } from "../../config/response.status";

//가게아이디, size, cursorId를 사용해 size만큼의 해당가게 리뷰를 반환 (이때 반환되는 데이터는 데이터베이스에서 가져온 날것의 데이터이다)
export const getPreviewReview = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();

        //cursorId가 undefined이거나 null이다 >> 처음으로 조회를 시작했다. 
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [parseInt(storeId), parseInt(size)]);
            //리뷰 하나하나에대한 데이터 리턴
            conn.release();
            return reviews;
    
        }else{
            const [reviews] = await pool.query(getReviewByReviewId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const getPreviewMission = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();

        //cursorId가 undefined이거나 null이다 >> 처음으로 조회를 시작했다. 
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [missions] = await pool.query(getMissionByMissionIdAtFirst, [parseInt(storeId), parseInt(size)]);
            //리뷰 하나하나에대한 데이터 리턴
            conn.release();
            return missions;
    
        }else{
            const [missions] = await pool.query(getMissionByMissionId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return missions;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}