// dtos/user.dto.js

// 회원가입기능
export const signinResponseDTO = (user, prefer) => {

    const preferFood = [];
    
    for (let i = 0; i < prefer[0].length; i++) {
        preferFood.push(prefer[0][i].f_category_name);
    }

    return {"email": user[0].email, "name": user[0].user_name, "preferCategory": preferFood};
}



//나의 리뷰 모아보기
export const showReviewResponseDTO = (data) => {
    const reviews = [];

    for(let i = 0; i < data.length; i++){
        reviews.push({
            "member_id": data.member_id,
            "store_id": data.store_id,
            "body": data.body,
            "score": data.score            
        })
    }

    return {"reviewData": reviews, "cursorId": data[data.length-1].review_id}
}

//나의 "진행중인" 미션 모아보기

export const previewMissionResponseDTO = (data) => {
    const missions = [];

    for(let i = 0; i < data.length; i++) {
        missions.push({
            "store_id": data[i].store_id,
            "reward": data[i].reward,
            "deadline": data[i].deadline,
            "mission_spec": data[i].mission_spec,
            "created_at": formatDate(data[i].created_at),
            "updated_at": formatDate(data[i].updated_at)

        })
    }
    //미션데이터들을 배열형태로 반환
    return {"missionData": missions, "cursorId": data[data.length-1].mission_id};
}


//Intl.DateTimeFormat 객체를 사용하여 날짜를 한국식(kr)으로 포맷팅하고 문자열에서 불필요한 공백을 제거하고 마지막 문자를 제거하여 반환
const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}


//미션완료로 변경------------------------
//다시 프론트에서 사용하는 형태로 변경
export const setMissionResponseDTO = (data) => {

    return {"id": data.missionId, "specification": data.mission_sepc};
}