# 訂房網站專案

![Imgur](https://imgur.com/ozwWQjZ.gif)

本專案是一個基於 Next.js 13 app directory 開發的全端模擬 AirBnB 訂房網站，使用 TypeScript 和 TailwindCSS 等技術。並使用 NextAuth.js 進行會員管理，資以 Prisma 作為與 MongoDB 串連的資料庫工具。

## 作品網址
- [Reservation](https://reservation-example.vercel.app/)
  - 帳號：test@email.com
  - 密碼：test12345

## 目錄
- [訂房網站專案](#訂房網站專案)
  - [作品網址](#作品網址)
  - [目錄](#目錄)
  - [工具](#工具)
  - [專案特色](#專案特色)
  - [網站地圖](#網站地圖)
  - [資料庫架構圖](#資料庫架構圖)
  - [Demo](#demo)
    - [登入頁面](#登入頁面)
    - [房源列表](#房源列表)
    - [租房頁面](#租房頁面)
    - [訂房頁面](#訂房頁面)
    - [會員管理](#會員管理)
  - [作者](#作者)

## 工具
- Next.js 13
- TypeScript
- Tailwind CSS
- NextAuth.js
- Prisma
- MongoDB
- React-select
- React-leaflet
- Next-cloudinary
- Next-auth
- React-date-range
- Zustand
- React-hot-toast
- React-hook-form
- React-spinners

## 專案特色

- 房源列表
  - 可以類別的做篩選。
  - navbar 搜尋欄中更可以對時間、地點、房間數、人數、廁所數做篩選。
  - 以 query string 的方式傳遞篩選條件。
- 租房頁面
  - 第一步是選擇類別
  - 第二步是選擇地點，並以 react-select 作為下拉選單套件搭配 react-leaflet 地圖的套件進行地點的選擇
  - 第三步是上傳圖片，使用 next-cloudinary 作為圖片庫的儲存庫套件
  - 第四步是填寫房源的資訊
  - 第五步是設定房客數、房間數、床數及廁所數
  - 完成後即可將資料寫入資料庫
- 訂房頁面
  - 每個 listing 點進去可以有各自的房源的頁面
  - 使用 react-date-range 製作月曆的 ui 及日期日期選擇功能
  - 按下一步跳出 dialog 視窗，顯示訂購資訊，並填寫訂購人訊息
  - 送出表單將資料寫入資料庫
- 會員管理
  > 使用者可以透過登入註冊系統，管理自己的個人資訊。在登入後，使用者可以點選會員選單中各項功能
  - 「我的旅遊」查看已訂購的房源
  - 「我的最愛」查看自己收藏的房源
  - 「我的預定」查看自己房源的所有訂單，並可以查看訂單明細及取消客戶的訂單
  - 「我的房源」來查看及刪除自己的房源。
  - 使用者也可以透過 Google、GitHub 等 OAuth 登入系統。
- 資料庫設計
  >使用 Prisma 作為與 MongoDB 串聯的資料庫工具，其中 User 對 Account、Listing、Reservation 都是一對多的關聯，其中 Listing 對 Reservation 也是一對多關聯。
- 通知管理 : 使用 react-hot-toast 套件來顯示通知。
- 表單管理 : 使用 react-hook-form 套件來管理表單。
- 頁面加載 : 建立 `loading` 頁面使用 react-spinners 套件來顯示頁面加載的動畫。
- 錯誤頁面 : 若使用者進入不存在的路由或發生錯誤，將會跳轉至 `error` 頁面，提示使用者發生錯誤的原因。

## 網站地圖

```mermaid
graph TD;
  A[主頁] -->|點擊搜尋欄| B(搜尋頁)
  B -->|選擇條件| C(搜尋結果)
  A -->|點擊列表項目| D(房源詳細資訊)
  D --> E(選擇日期)
  E -->|點擊預訂| F(填寫訂單)
  F -->|送出表單| G(轉跳至我的訂單)
 
  A -->|點擊登入| J(登入頁)
  J -->|輸入資訊| K(送出表單)
  K -->|驗證成功| L(回到主頁)

  A -->|點擊註冊| M(註冊頁)
  M -->|輸入資訊| N(送出表單)
  N -->|驗證成功| O(回到主頁)

  A -->|點擊新增房源| X(選擇類別)
  X -->|下一步| Y(選擇地點)
  Y -->|下一步| AA(上傳圖片)
  AA -->|下一步| AB(填寫房源資訊)
  AB -->|下一步| AC(設定房客數 房間數 床數及廁所數)
  AC -->|完成| AD(回到主頁)

  A -->|點擊我的旅遊| P(訂單列表)
  P -->|點擊取消訂單| R(取消訂單)
  R -->|確認取消| S(更新訂單狀態)

  A -->|點擊我的最愛| T(最愛列表)
  T -->|點擊列表項目| D(房源詳細資訊)

  A -->|點擊我的房源| U(房源列表)
  U -->|點擊刪除| W(刪除房源)
  W -->|確認刪除| AE(更新項目列表)

  A -->|點擊我的預定| AF(預定列表)
  AF -->|點擊訂單明細| AG(查看訂單明細)
  AG -->|點擊取消客戶訂單| AH(取消訂單)
  AH -->|確認取消| AI(更新訂單狀態)

```
## 資料庫架構圖
```mermaid
erDiagram
    User {
        id             String PK "@default(auto())"
        name           String
        email          String UK
        emailVerified  DateTime
        image          String
        hashedPassword String
        createdAt      DateTime "@default(now())"
        updatedAt      DateTime "@updatedAt"
        favoriteIds    String[]
    }

    Account {
        id                String PK "@default(auto())"
        userId            String FK
        type              String
        provider          String
        providerAccountId String
        refresh_token     String
        access_token      String
        expires_at        Int
        token_type        String
        scope             String
        id_token          String 
        session_state     String
    }

    Listing {
        id            String PK "@default(auto())"
        title         String
        description   String
        imageSrc      String
        createdAt     DateTime "@default(now())"
        category      String
        roomCount     Int
        bathroomCount Int
        guestCount    Int
        bedCount      Int
        locationValue String
        userId        String FK
        price         Int
    }

    Reservation {
        id            String PK "@default(auto())"
        userId        String FK
        listingId     String FK
        startDate     DateTime
        endDate       DateTime
        totalPrice    Int
        userName      String
        email         String
        address       String
        phone         String
        arrivalTime   String
        isMainGuest   Boolean
        mainGuestName String
        message       String
        createdAt     DateTime "@default(now())"
    }

    User ||--o{ Account: has
    User ||--o{ Listing: has
    User ||--o{ Reservation:has
    Listing ||--o{ Reservation: has


```

## Demo
### 登入頁面
![Imgur](https://imgur.com/SguUoou.jpg)
### 房源列表
![Imgur](https://imgur.com/VnFpn8U.jpg)
### 租房頁面
![Imgur](https://imgur.com/s9pQY6O.gif)
### 訂房頁面
![Imgur](https://imgur.com/5ueBrb2.gif)
### 會員管理
![Imgur](https://imgur.com/LpbGN6z.jpg)

## 作者
藍奕欣
[Github](https://github.com/ysl0628)<br>
LinkedIn: [藍奕欣](https://www.linkedin.com/in/奕欣-藍-100371248/)<br>
Email: yihsinlan@gmail.com
