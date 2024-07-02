import express from 'express';
import { tempRouter } from './src/routes/temp.route.js';
import { userRouter } from './src/routes/user.route.js';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import { status } from './config/response.status.js';


const app = express();
// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.use('/temp', tempRouter);
app.use('/user', userRouter); //ch9   ch10 1번, 3번, 4번
app.use('/:storeId', storeRouter); //ch10 실습, 미션2번


app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;   
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
});




/* 
db.config.js : 데이터베이스 연결해서 사용할 pool
index.js : 경로지정
route.js : 경로에 맞는 함수 실행
controllers : 프론트와 서버 사이의 데이터 전달 및 성공여부 전달
provider, service : 서버에 맞는 데이터형태로 변환 및 목적에 맞는 메소드 실행 (메소드는 dao, dto에서 가져옴)
dao.js : 데이터베이스 sql파일의 메소드 호출해 데이터베이스 조작
sql.js :
dto.js : 데이터베이스로 부터 전달받은 "데이터덩어리(데이터 스키마 본연의 형태)"를 프론트에서 사용할 수있는 형태로 변환 

config/response.status.js : response로 전송할 데이터에 들어갈 SUCCESS, ERR에 들어갈 세부 내용 작성
*/