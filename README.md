# 整合型六個網頁應用程式系統

這是一個由六個網頁應用程式組成的整合型系統，包含協作、維修、檢核、專案、報表、用戶等功能。

## 系統架構

- **前端**: React + Material-UI + Cloudflare
- **後端**: Node.js + Express
- **資料庫**: Supabase
- **字體**: 源樣黑體 (iansui)
- **主題**: 深色主題，藍黑色主色調，紫色輔色調

## 六個應用程式

1. **協作 (Collaboration)** - 多人協作的git雲端版本管理系統
2. **維修 (Maintenance)** - 維修管理系統
3. **檢核 (Inspection)** - 檢核管理系統
4. **專案 (Project)** - 專案管理系統
5. **報表 (Report)** - 報表系統
6. **用戶 (User)** - 用戶管理系統

## 目錄結構

```
/
├── Global File/          # 全域資料
├── collaboration/        # 協作應用程式
├── maintenance/          # 維修應用程式
├── inspection/           # 檢核應用程式
├── project/             # 專案應用程式
├── report/              # 報表應用程式
├── user/                # 用戶應用程式
├── public/              # 靜態資源
├── src/                 # 主要源碼
└── server.js            # 伺服器入口
```

## 安裝與執行

```bash
npm install
npm run dev
```

## 預設管理員帳號

- 帳號: admin
- 密碼: adminacl53959233