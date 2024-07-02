// store.sql.js

export const getReviewByReviewId = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? AND r.review_id < ? "  //r.review_id가 아니라 r.id가 되어야하는게 아닌지 의문
+ "ORDER BY r.review_id DESC LIMIT ? ;" /////////////////////////////

export const getReviewByReviewIdAtFirst = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"


//가게의 미션들 -----------------------------------

//필요한 데이터 >> 미션id, 가게id, 포인트(reward), 가게이름, 가게 카테고리
export const getMissionByMissionId = 
"SELECT m.id, s.id, m.reward, s.name, s.category "  //음식 카테고리 해결해야함
+ "FROM mission m JOIN store s on m.store_id = s.id "
+ "WHERE m.store_id = ? AND s.id < ? "
+ "ORDER BY m.id DESC LIMIT ? ;"



export const getMissionByMissionIdAtFirst =
"SELECT m.id, s.id, m.reward, s.name, s.category "
+ "FROM mission m JOIN store s on m.store_id = s.id "
+ "WHERE m.store_id = ? " // 해당 테이블에서 해당 레코드의 id >> 몇번째 레코드인지
+ "ORDER BY m.id DESC LIMIT ? ;"


// 