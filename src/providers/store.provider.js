//Service와 비슷
//BUT 더 단순한 기능을 제공

export const getReview = async (storeId, query) => {
    const {reviewId, size = 3} = query; // 디폴트 매개변수 >> 입력되지않는다면 3으로 설정
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}