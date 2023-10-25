
## 📌 개요


- **`프로젝트 명` :** I Pill U 리팩토링
- **`프로젝트 기간` :** 2023.08.13. - 2023.10.20.
- **`한 줄 소개` :** APP Router 기반 Server Action, RSC을 활용한 Serverless 어플리케이션
- **`배포 주소` :** [I Pill U 홈페이지](https://seb42-main-013-refactored.vercel.app/)
- **`테스트 계정` :**  `🔒 ID`  hetidom546@weirby.com `🔑 Password`  qwer1234!
  
<br/>   

## 🛠️ 기술 스택
<p>
<img src="https://img.shields.io/badge/Next.Js-000000?style=flat&logo=Git&logoColor=white">  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/Firestore-F2AC3C?style=flat&logo=Firebase&logoColor=black"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=black"> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat&logo=Tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/Mui-007FFF?style=flat&logo=Mui&logoColor=white"> 
 
</p>

<br/>  


## 📂 폴더 구조

```
🏠 app
├── 📂 (api)
│   ├── sessionlogin ────────────── 🍪 세션 쿠키 생성 API
│   └── csrf ────────────────────── 🪪 CSRF토큰 발행 API
├── 📂 (auth)
│   ├── 📃 login  ───────────────── 👤 로그인 페이지
│   ├── 📃 signip ───────────────── 👤 회원가입 페이지
│   └── layout.tsx
├── 📂 (home)
│   ├── 📃 @intro ───────────────── 🏠 메인페이지 1 (Parallel Routes)
│   ├── 📃 @suggest ─────────────── 🏠 메인페이지 2 (Parallel Routes)
│   │   ├── 📃 create ───────────── 📝 데이터 생성/수정 페이지
│   │   ├── 📃 mypage ───────────── 👤 유저 정보 조회/수정 페이지
│   │   ├── 📃 search ───────────── 🔍 영양제 검색 페이지 (네이버 쇼핑)
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


## 📺 시연 영상
|구글 회원가입|구글 로그인|로그아웃|세션 만료|
|:---:|:---:|:---:|:---:|
|![signupwithGoogle](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/19b02cad-bf3d-4181-b847-f2c46b9f3f2c)|![signinwithGoogle](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/8d920456-2a9d-4768-a2f9-291db16f5883)|![logout](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/8634baae-d4b6-4bad-b205-51f52ab8278b)|![세션만료](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/27ec9cc7-392c-4114-ba03-0defdea4d5cb)|
|<span>`firebase`</span> `CSRFToken` `useForm` `zod` `API`|<span>`firebase`</span> `CSRFToken` `useForm` `zod` `API`|<span>`RCC`</span></br>`server action`</br>`useFormstate`|<span>`firebase`</span> `session cookie`|





|이메일 회원가입|인증 전 로그인|인증 후 로그인|
|:---:|:---:|:---:|
|![signInwithEmail](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/2ae46225-bcb5-4813-b3ee-15cd38d782a8)|![loginError=email-not-verified](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/d5e8b8c5-202c-4708-928d-6ac080435597)|![emailLogin_afterVerifiing](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/10d365f9-dc2c-4123-90e3-0935e3f7e518)|
|<span>`firebase`</span> `CSRFToken` `useForm` `zod`| `Error handling`|`Error handling`|

|메인페이지|건강고민 탭|회원정보 수정|검색|
|:---:|:---:|:---:|:---:|
|![main22](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/4e806d03-beea-4537-bb5b-9c46f71df40f)|![main](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/1b2785fa-f669-44bd-ae9c-06f0cff16c9c)|![userUpdate](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/74315374-de00-404d-a671-78da6a1607cc)|![search](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/5c56cff9-e059-4567-ab4b-6a75565513d8)|
|<span>`ParallelRoutes` `skeleton`</span>|<span>`dynamic load` `placehold` `blurDataURL` `PlacierHolder`</span>|<span>`RCC` `server action` `useOptimistic`</br>`Optimistic-UI` `.bind`</span>|<span>`RCC` `SSR`</br>`NAVER API`</span>|



|영양제 조회|영양제 생성|영양제 수정|영양제 삭제|
|---|---|---|---|
|![filter sort](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/77b84f9e-fd39-4a6b-ac77-d821000c2d92)|![create2](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/f499402b-069d-4330-9f9c-d71801d671a9)|![updatepill](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/eceb9420-afa5-4d9b-9e09-49438efcbe4c)|![delete](https://github.com/JOAAAAAAAAAAA/seb42_main_013_refactored/assets/116185146/d71b8180-95e0-4b89-b93b-3e9f3a88e4a1)|
|`RSC` `SSR`<img width=1300 style="opacity:0"/>|`CSRFToken API`</br>`server action`</br>`useFormstate`</br>`server-onlyForm`</br>`zod` `stateless modal`|`CSRFToken API`</br>`server action`</br>`useContext`|`server action`</br>`useOptimistic`</br>`Optimistic-UI`|


<br/>


## 🔐 Auth 순서도
```mermaid
sequenceDiagram
participant User
participant App Client
participant App Server
participant Firebase Client SDK
participant Firebase Server SDK
participant OAuth Provider
User->>App Client:구글로 로그인하기 클릭
App Client->>Firebase Client SDK:SignInWithGoogle()
Firebase Client SDK->>App Client:Reirect to Sign in page
App Client->>OAuth Provider:[POST]Email & Password
OAuth Provider-->>Firebase Client SDK:User Credential
Firebase Client SDK-->>App Client:ID Token
App Client->>App Server: [POST]/auth/sessionlogin ID Token
App Server->>App Server:Csrf verified !
App Server->>Firebase Admin SDK:VerifyIdToken(ID Token)
Firebase Admin SDK-->>App Server:OK
App Server->>Firebase Admin SDK:createSessionCookie()
Firebase Admin SDK-->>App Server:SessionCookie
App Server-->>App Client:SessionCookie
App Client->>Firebase Client SDK:Sign out()
Firebase Client SDK-xFirebase Client SDK:Sign out()
```

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

