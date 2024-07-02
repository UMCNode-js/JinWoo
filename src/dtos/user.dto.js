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