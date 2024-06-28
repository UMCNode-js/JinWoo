import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getReview } from "../providers/store.provider.js";

export const reviewPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await getReview(req.params.storeId, req.query)));
    //             웹으로응답    정상수행됐음을 알림          웹페이지에서 사용하는 형태로 변환된 리뷰배열을 전달
}