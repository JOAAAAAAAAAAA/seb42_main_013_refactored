## 📌 개요


- **`프로젝트 명` :** I Pill U 리팩토링
- **`프로젝트 기간` :** 2023.08.13. - 2023.10.20.
- **`한 줄 소개` :** APP Router 기반 Server Action, RSC을 활용한 Serverless 어플리케이션
- **`배포 주소` :** [I Pill U 홈페이지](https://seb42-main-013-refactored.vercel.app/)
- **`테스트 계정` :**  `🔒 ID`  hetidom546@weirby.com `🔑 Password`  qwer1234!
  
<br/>   

## 🛠️ 기술 스택
<p>
<img src="https://img.shields.io/badge/Next.Js-000000?style=flat&logo=Git&logoColor=white">  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=black"> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat&logo=Tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/Mui-007FFF?style=flat&logo=Mui&logoColor=white">
 
</p>

<br/>   

## 📂 폴더 구조

```
app
├── 📂 (api)
│   ├── sessionlogin ────────────── 🍪 세션 쿠키 생성 API
│   └── csrf ────────────────────── 🪪 CSRF토큰 발행 API
├── 📂 (home)
│   ├── 📃 @intro ───────────────── 🏠 메인페이지 1 (Parallel Routes)
│   ├── 📃 @suggest ─────────────── 🏠 메인페이지 2 (Parallel Routes)
│   │   ├── 📃 create ───────────── 📝 데이터 생성/수정 페이지
│   │   ├── 📃 mypage ───────────── 👤 유저 정보 조회/수정 페이지
│   │   ├── 📃 search ───────────── 🔍 영양제 검색 페이지 (네이버 쇼핑)
│   │   ├── 📃 login ────────────── 👤 로그인 페이지
│   │   ├── 📃 signup ───────────── 👤 회원가입 페이지
│   │   └── 📃 summary ──────────── 🗂️ 유저 데이터 조회/삭제 페이지
│   └── layout.tsx
├── 📂 compoenents ──────────────── 📦 모든 페이지에서 공통으로 사용되는 컴포넌트
└── layout.tsx
📂 context ──────────────────────── 🔐 Auth Context
📂 firebase ─────────────────────── 🔐 Firebase setup
📂 lib ──────────────────────────── 🛠️ 서버액션, helper
📂 mui ──────────────────────────── 🎨 MUI setup
📂 zodSchema ────────────────────── 🔏 유효성 검사 스키마
middleware.ts
types.ts
```

<br/>   


## 시연 영상

|구글 회원가입|구글 로그인|로그아웃|
|---|---|---|
|![구글회원가입_세션생성](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/ce5d74d0-4bf7-4cd6-84af-7471c80f7bde)|![구글로그인](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/11427e2e-001d-407c-b8ab-4e4233d53563)|![로그아웃](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/79adf95c-3e65-4b57-af93-9189674c66f4)|

|이메일 회원가입|인증 전 로그인|인증 후 로그인|
|---|---|---|
|![이메일회원가입withoutclick](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/164b7627-1e03-48b6-98eb-d4bda5b87597)|![회원가입후 노인증](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/bde73b65-5159-4f3a-bfb5-360aea206474)|![인증후로그인](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/34a2fc2f-6138-4fa4-8660-4564a15b6c8d)|

|세션 만료|회원정보 수정|검색|
|---|---|---|
![세션만료](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/27ec9cc7-392c-4114-ba03-0defdea4d5cb)|![useupdate](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/6ac8e345-fd35-4539-82d8-eebd71e801f7)|![검색](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/f026b72d-760b-4046-b2d1-855115ca8742)|


|영양제 조회|영양제 생성|영양제 수정|영양제 삭제|
|---|---|---|---|
|![filter sort](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/77b84f9e-fd39-4a6b-ac77-d821000c2d92)|![create2](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/f499402b-069d-4330-9f9c-d71801d671a9)|![updatepill](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/eceb9420-afa5-4d9b-9e09-49438efcbe4c)|![delete](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/d71b8180-95e0-4b89-b93b-3e9f3a88e4a1)|



<br>

## :pencil2: 커밋 & 코드 컨벤션
```
[Feat] 새로운 기능 추가 
[Fix] 버그 수정 
[Design] CSS 등 사용자 UI 디자인 변경 
[Style] 코드 수정은 없지만, 코드 포맷 변경시 작성 
[Refactor] 코드 리팩토링 
[Comment] 필요한 주석 추가 및 변경 
[Docs] 문서 수정 
[Test] 테스트 및 테스트 리팩토링 코드 작성(프로덕션 코드 변경 X) 
[Chore] 빌드 업무 수정, 패키지 매니저 설정 및 수정(프로덕션 코드 변경 X) 
[Rename] 파일 및 폴더를 수정하는 작업 
[Remove] 파일 및 폴더를 삭제하는 작업 
[Init] 브랜치 초기화 및 초기셋팅 관련된 설정일 경우
```

