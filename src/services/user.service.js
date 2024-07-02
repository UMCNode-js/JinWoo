import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { showReviewResponseDTO, signinResponseDTO } from "../dtos/user.dto"
import { addUser, getUser, getUserPreferToUserID, setPrefer } from "../models/user.dao";

//회원가입
export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;

    //UI에서 데이터베이스로 값을 입력OR수정할 때에는 데이터베이스에 맞는 형태로 변환이 필요함
    const joinUserData = await addUser({
        'email': body.email,
        'name': body.name,
        'gender': body.gender,
        'birth': birth,
        'addr': body.addr,
        'specAddr': body.specAddr,
        'phone': body.phone
    });

    if(joinUserData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData));
    }
}


//사용자 작성 리뷰조회
export const getMyReview = async (userId, query) => {
    const {reviewId, size = 3} = query;
    
    return showReviewResponseDTO(await getUserMission(reviewId, size, userId));
}


//자신이 진행중인 미션 목록
export const getMyMission = async (userId, query) => {
    const {missionId, size = 3} = query;
    
    return previewMissionResponseDTO(await getPreviewMission(missionId, size, userId));
}



//진행 중인 미션 "진행 완료로 바꾸기"
export const setMissionSpec = async (data) => {
    const { missionId, specification} = data; //프론트에서 { missionId: , missionSpec: }형태로 데이터가 넘어왔음


    //데이터베이스의 속성에 맞게 변수명 변경
    await setMission({
        'id': missionId,
        'mission_spec': specification
    })


    return ;
}