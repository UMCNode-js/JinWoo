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