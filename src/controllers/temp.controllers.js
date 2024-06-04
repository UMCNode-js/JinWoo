import { status } from '../../config/response.status.js';
import { CheckFlag } from '../services/temp.service.js';
import { response } from '../../config/response.js';

//status 중 SUCCESS에 해당하는 응답 내용이 응답 포맷에 넣어져 전송됨
// export const tempTest = (req, res, next) => {
//     res.send(response(status.SUCCESS, getTempData()));
// };


export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}