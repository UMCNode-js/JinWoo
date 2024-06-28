//Service와 비슷
//BUT 더 단순한 기능을 제공
import { previewReviewResponseDTO } from "../dtos/store.dto";
import { getPreviewReview } from "../models/store.dao";

export const getReview = async (storeId, query) => {
    const {reviewId, size = 3} = query; // 디폴트 매개변수 >> 입력되지않는다면 3으로 설정
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId)); //매개변수 자리에
        //reviewData: 모든리뷰데이터가 들어있는 배열, 현재 cursorId(현재 마지막으로 본data의 review_id)
}