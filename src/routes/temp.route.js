import express from 'express';
import { tempException } from '../controllers/temp.controllers.js';

export const tempRouter = express.Router();

// /temp 뒤에 /test 일 경우 tempTest 실행
// tempRouter.get('/test', tempTest);

tempRouter.get('/exception/:flag',tempException);

//이 경로의 통신을 가능하게 해주는 코드