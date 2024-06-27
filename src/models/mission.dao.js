// models/user.dao.js

import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { InsertMemberMission, confirmEmail, getMemberId, insertUserSql} from "./domission.sql.js";



// id일치하는 사용자 레코드 속성 반환
export const getMemberId = async (member_id) => {
    try {
        const conn = await pool.getConnection();
        const member = await pool.query(getMemberId, member_id); //매개변수로 전달받은 memberId로 getMemberId함수를 실행

        conn.release();

        return member;    //member에 대한 데이터를 리턴
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// 해당 mission_id의 미션 레코드 반환
export const getMission = async (mission_id) => {
    try {
        const conn = await pool.getConnection();
        const mission = await pool.query(getMission, mission_id);

        conn.release();

        return mission;

    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStore = async (store_id) => {
    try{
        const conn = await pool.getConnection(); //pool에 연결
        const store = await pool.query(getStore, store_id)

        conn.release();

        return store;

    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG); // 수정요망
    }
}


//member_mission 테이블에 insert
export const InsertMemberMission = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const result = await pool.query(InsertMemberMission, [data.member_id, data.mission_id]);

        conn.release();
    }
    catch (err){

    }
}



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
        return result[0].insertId; //id를 리턴
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}