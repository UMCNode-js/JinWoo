import { reviewPreview, missionPreview } from "../controllers/store.controller";


export const storeRouter = express.Router({mergeParams: true});

//가게의 리뷰 모아보기
storeRouter.get('/reviews', asyncHandler(reviewPreview));

//가게의 미션 모아보기
storeRouter.get('/missions', asyncHandler(missionPreview));