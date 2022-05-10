## 설치 및 실행
```
npm install
npm run start:dev
```

## 병원관련 API or 샘플 API 제작 중
```
- 회원가입
- 로그인
- 게시글 작성(인증)
```

```
공부 겸 개인서버에 올릴 서버 구축 중
DB 서버는 현재 도커로 돌리는 중
```

##환경 변수에 대한 설정
```
.env 파일 생성

DB_HOSTSET IP OR LOCAL
DB_PORT=SET DB PORT
DB_USERNAME=SET DB USER NAME(example : root)
DB_PASSWORD=SET DB PASSWORD(example : rootPassword
DB_DATABASE=SET DB TABLE NAME

SECRET_KEY=SET SECRET_KEY(example : HELLO_WORLD)

PORT=SET SERVER PORT
NODE_DEV=SET NODE_DEV(MODE => development, production ... )

ADMIN_USER=SET SWAGGER ADMIN_USER
ADMIN_PASSWORD=SET SWAGGER ADMIN_USER_PASSWORD

복사 붙여 넣기 후 본인환경에 맞는 세팅 진행
```
