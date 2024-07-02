// models/user.sql.js
//회원가입-------------------------------------------------------------------------------------
export const insertUserSql = "INSERT INTO user (email, user_name, gender, birth, user_address, user_spec_address, user_phone) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM user WHERE user_id = ?";

export const connectFoodCategory = "INSERT INTO user_favor_category (f_category_id, user_id) VALUES (?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";

export const getPreferToUserID =
"SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name "
+ "FROM user_favor_category ufc JOIN food_category_list fcl on ufc.f_category_id = fcl.f_category_id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.f_category_id ASC;";

//---------------------------------------------------------------------------------------------

//리뷰 ------------------------------------------------------------------------------------------
//필요한 정보 >> 사용자id, 리뷰id, 사용자 닉네임, 별점, 작성날짜, 리뷰내용(body), 
export const getReviewByReviewId = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.member_id = ? AND r.review_id < ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"

export const getReviewByReviewIdAtFirst = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.member_id = ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"



//----------------------------------------------------------------------------------------------

//나의 "진행 중인 미션" 모아보기-----------------------------------------------------------------------------
//필요한 데이터 >> 미션id, 가게id, 포인트(reward), 가게이름, 가게 카테고리
//"진행중인"미션 모아보기 임으로 미션 전체 모아보기에서 진행상태 추가해야함
export const getMissionByMissionId = 
"SELECT m.id, s.id, m.reward, s.name, s.category "  //음식 카테고리 해결해야함
+ "FROM mission m JOIN store s on m.store_id = s.id "
+ "WHERE m.store_id = ? AND s.id < ? AND m.mission_spec = 'inProgress "
+ "ORDER BY m.id DESC LIMIT ? ;"



export const getMissionByMissionIdAtFirst =
"SELECT m.id, s.id, m.reward, s.name, s.category "
+ "FROM mission m JOIN store s on m.store_id = s.id "
+ "WHERE m.store_id = ? AND m.mission_spec = 'inProgress " // 해당 테이블에서 해당 레코드의 id >> 몇번째 레코드인지
+ "ORDER BY m.id DESC LIMIT ? ;"


//미션 상태 세팅
//--------------------------------------------------------------------------

export const updateMission =
"UPDATE mission SET mission_spec = ? WHERE mission_id = ? ;"


export const getSpecification =
"SELECT mission_spec "
+ "FROM mission "
+ "WHERE id = ? ;"



