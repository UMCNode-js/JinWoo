// store.dto.js


//저장되어 있는 리뷰데이터를 배열형태로 reviews에 저장하여 통째로 리턴
//데이터베이스로부터 전달받은 데이터들을 웹페이지데이터의 양식에 맞게 변환하여 반환
export const previewReviewResponseDTO = (data) => {

    const reviews = [];

    for (let i = 0; i < data.length; i++) {
        reviews.push({ 
            "user_name": data[i].user_name,
            "rate": data[i].rate,
            "review_body": data[i].review_content,
            "create_date": formatDate(data[i].created_at) //날짜 형식변환
        })
    }
    return {"reviewData": reviews, "cursorId": data[data.length-1].review_id};        
}



//미션 모아보기
//------------------------------------------------------------
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
