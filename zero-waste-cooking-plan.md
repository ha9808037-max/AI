# 🌱 剩食料理推薦 App — 專案計畫

## Top-Level Overview

**目標：** 打造一款幫助全世界減少食物浪費的 Web App。用戶輸入手邊剩餘食材，AI 即時生成創意食譜，並追蹤每次料理節省的碳排放量，達到珍惜資源、減少食物浪費的社會影響力。

**核心理念：**
- 零廢棄烹飪（Zero Waste Cooking）：善用邊角料（菜梗、果皮、骨頭）
- 風味重塑（Creative Upcycling）：剩餘食材二次創作為全新菜色
- 減碳環保（Sustainability）：量化每次料理的碳足跡貢獻

**技術棧：**
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- 資料庫: PostgreSQL
- AI API: OpenAI GPT-4o + Google Gemini（可切換）
- 語言: 繁體中文 + 英文（i18n）
- 部署目標: Web App（瀏覽器使用）

---

## Sub-Task 1：專案初始化與 Monorepo 結構建立

**Intent：** 建立整個專案的目錄結構、設定前後端開發環境、安裝必要相依套件，確保開發環境一致可執行。

**Expected Outcomes：**
- `apps/frontend/` — React + TypeScript + Vite 專案可啟動
- `apps/backend/` — Node.js + Express + TypeScript 可啟動
- `packages/shared/` — 共用型別定義（食材、食譜、用戶等）
- 根目錄有 `package.json` 管理 workspace
- `.env.example` 檔案說明所需環境變數

**Todo List：**
1. 在 `AI/` 目錄下初始化 npm workspace（monorepo）
2. 建立 `apps/frontend/` — 使用 Vite + React + TypeScript 模板
3. 建立 `apps/backend/` — Node.js + Express + TypeScript 設定
4. 建立 `packages/shared/` — 共用 TypeScript 型別與常數
5. 設定 ESLint + Prettier 統一程式碼風格
6. 建立 `.env.example` 列出所有必要環境變數
7. 建立根目錄 `README.md` 說明專案啟動方式

**Relevant Context：**
- 工作目錄：`AI/`
- 使用 npm workspaces 管理 monorepo

**Status：** [ ] pending

---

## Sub-Task 2：資料庫設計與 PostgreSQL Schema 建立

**Intent：** 設計並建立 PostgreSQL 資料庫結構，支援用戶帳號、食材紀錄、AI 生成食譜、收藏清單、碳足跡累計等核心功能。

**Expected Outcomes：**
- 完整的 SQL migration 檔案
- 6 張核心資料表建立完成
- 資料表關聯與索引設定正確

**Todo List：**
1. 設計 `users` 表（id, email, password_hash, display_name, language, created_at）
2. 設計 `ingredients` 表（id, user_id, name, quantity, unit, expiry_date, created_at）
3. 設計 `recipes` 表（id, title, description, steps, ingredients_used, ai_provider, language, created_at）
4. 設計 `user_recipes` 表（id, user_id, recipe_id, is_favorite, created_at）— 用戶與食譜的關聯
5. 設計 `carbon_records` 表（id, user_id, recipe_id, co2_saved_grams, food_saved_grams, created_at）
6. 設計 `user_stats` 視圖（view）— 匯總用戶總碳足跡貢獻與食譜數量
7. 建立 migration 腳本與 seed 測試資料

**Relevant Context：**
- 碳足跡計算基礎：每公斤食物廢棄物約產生 2.5kg CO₂e（IPCC 數據）
- 使用 `pg` 或 `drizzle-orm` 操作 PostgreSQL

**Status：** [ ] pending

---

## Sub-Task 3：後端 API — 用戶認證系統

**Intent：** 實作 JWT 基礎的用戶註冊、登入、登出功能，保護需要驗證的 API 端點。

**Expected Outcomes：**
- `POST /api/auth/register` — 用戶註冊
- `POST /api/auth/login` — 用戶登入，回傳 JWT
- `POST /api/auth/logout` — 登出
- `GET /api/auth/me` — 取得當前用戶資訊
- JWT middleware 可保護其他 API 路由

**Todo List：**
1. 安裝 `bcryptjs`、`jsonwebtoken`、`zod`（驗證）
2. 實作 `AuthController` — register / login / logout / me
3. 實作 JWT middleware（`authenticateToken`）
4. 密碼使用 bcrypt hash 儲存
5. 回傳標準化錯誤格式（`{ error: string, code: string }`）
6. 撰寫 API 測試（使用 supertest）

**Relevant Context：**
- `apps/backend/src/controllers/auth.controller.ts`
- `apps/backend/src/middleware/auth.middleware.ts`
- JWT secret 從環境變數 `JWT_SECRET` 讀取

**Status：** [ ] pending

---

## Sub-Task 4：後端 API — 食材管理

**Intent：** 實作用戶食材的 CRUD 操作，讓用戶可以新增、編輯、刪除手邊的剩餘食材清單。

**Expected Outcomes：**
- `GET /api/ingredients` — 取得用戶食材清單
- `POST /api/ingredients` — 新增食材
- `PUT /api/ingredients/:id` — 更新食材
- `DELETE /api/ingredients/:id` — 刪除食材
- `GET /api/ingredients/expiring-soon` — 取得即將到期食材（3天內）

**Todo List：**
1. 實作 `IngredientsController` 完整 CRUD
2. 加入食材分類（蔬菜、肉類、海鮮、穀物、調味料、其他）
3. 到期日提醒邏輯（expiring_soon 篩選）
4. 所有端點加入 JWT 驗證保護
5. 輸入資料用 Zod schema 驗證

**Relevant Context：**
- `apps/backend/src/controllers/ingredients.controller.ts`
- 食材分類常數放在 `packages/shared/src/constants/ingredient-categories.ts`

**Status：** [ ] pending

---

## Sub-Task 5：後端 API — AI 食譜生成（核心功能）

**Intent：** 串接 OpenAI GPT-4o 與 Google Gemini API，根據用戶提供的食材清單，生成零廢棄、創意翻新的食譜，包含步驟、食材用量、節省碳排估算。

**Expected Outcomes：**
- `POST /api/recipes/generate` — 輸入食材，AI 生成食譜
- `GET /api/recipes/:id` — 取得特定食譜詳情
- `GET /api/recipes/history` — 用戶歷史生成紀錄
- `POST /api/recipes/:id/favorite` — 收藏/取消收藏食譜
- `GET /api/recipes/favorites` — 取得收藏清單
- 支援切換 AI 提供者（`provider: 'openai' | 'gemini'`）

**Todo List：**
1. 安裝 `openai`、`@google/generative-ai` SDK
2. 設計 AI Prompt 模板（繁中/英雙語），要求回傳結構化 JSON 格式
3. 實作 `AIService` 抽象層，統一 OpenAI 與 Gemini 的呼叫介面
4. Prompt 設計要求 AI 輸出：標題、描述、食材用量、步驟、節省食物重量估算
5. 實作 `RecipesController` 處理生成、儲存、查詢
6. 生成結果儲存至 `recipes` 與 `user_recipes` 表
7. 加入 rate limiting（每用戶每小時最多 20 次生成）
8. 加入錯誤處理（API 失敗時自動 fallback 到另一個 AI 提供者）

**Relevant Context：**
- `apps/backend/src/services/ai.service.ts` — 核心 AI 服務
- `apps/backend/src/services/openai.service.ts`
- `apps/backend/src/services/gemini.service.ts`
- Prompt 設計參考：`packages/shared/src/prompts/`
- 環境變數：`OPENAI_API_KEY`、`GEMINI_API_KEY`

**Status：** [ ] pending

---

## Sub-Task 6：後端 API — 碳足跡計算與統計

**Intent：** 根據每次料理利用的食材重量，計算節省的 CO₂ 排放量，並累計用戶總環保貢獻，提供個人環保成就感。

**Expected Outcomes：**
- `POST /api/carbon/record` — 記錄一次料理的碳足跡節省
- `GET /api/carbon/stats` — 取得用戶累計碳足跡統計
- `GET /api/carbon/leaderboard` — 全球/社群排行榜（可選）
- 碳足跡計算邏輯正確且可維護

**Todo List：**
1. 實作碳足跡計算公式：`食材重量(kg) × 食材類型碳排係數(kgCO₂e/kg)`
2. 建立各類食材碳排係數表（肉類 > 乳製品 > 蔬菜等）
3. 實作 `CarbonService` 計算與儲存邏輯
4. 實作 `CarbonController` 提供統計 API
5. 設計成就徽章觸發條件（累計節省 1kg / 10kg / 100kg CO₂）

**Relevant Context：**
- `apps/backend/src/services/carbon.service.ts`
- 碳排係數資料來源：Our World in Data / IPCC 報告
- `packages/shared/src/constants/carbon-factors.ts`

**Status：** [ ] pending

---

## Sub-Task 7：前端 — 基礎架構與路由

**Intent：** 建立 React 前端的基礎架構，包含路由設定、全域狀態管理、API 客戶端、i18n 多語言設定，為後續頁面開發打好基礎。

**Expected Outcomes：**
- React Router 路由結構完整設定
- Zustand 全域狀態管理（用戶、食材、語言）
- Axios API 客戶端（自動附帶 JWT token）
- i18next 繁中/英文切換正常運作
- TailwindCSS 樣式系統設定完成
- 環保綠色主題的設計系統（色彩、字體）

**Todo List：**
1. 安裝並設定 `react-router-dom`、`zustand`、`axios`
2. 安裝並設定 `i18next`、`react-i18next`（繁中 + 英文）
3. 安裝並設定 `tailwindcss`
4. 設計環保主題色彩系統（主色：森林綠 #2D6A4F，輔色：暖橙 #F4845F）
5. 建立 `ProtectedRoute` 元件（未登入重導向登入頁）
6. 建立路由結構：`/`、`/login`、`/register`、`/dashboard`、`/ingredients`、`/recipes`、`/history`、`/stats`
7. 建立 Axios interceptor（自動處理 401 錯誤、token 附加）
8. 建立翻譯文字檔 `locales/zh-TW/` 與 `locales/en/`

**Relevant Context：**
- `apps/frontend/src/router/`
- `apps/frontend/src/store/`
- `apps/frontend/src/lib/api.ts`
- `apps/frontend/src/i18n/`

**Status：** [ ] pending

---

## Sub-Task 8：前端 — 用戶認證頁面

**Intent：** 實作登入、註冊頁面，提供流暢的用戶入門體驗，符合環保主題視覺設計。

**Expected Outcomes：**
- `/login` 登入頁面（email + 密碼）
- `/register` 註冊頁面（名稱、email、密碼）
- 表單驗證（使用 react-hook-form + zod）
- 登入成功後導向 `/dashboard`
- 雙語切換正常

**Todo List：**
1. 安裝 `react-hook-form`、`zod`、`@hookform/resolvers`
2. 設計登入/註冊頁面 UI（環保主題、葉片裝飾元素）
3. 實作表單驗證邏輯
4. 串接後端 auth API
5. JWT token 儲存至 localStorage（並在 Zustand store 中維護登入狀態）
6. 實作語言切換按鈕（右上角 ZH/EN）

**Relevant Context：**
- `apps/frontend/src/pages/Login.tsx`
- `apps/frontend/src/pages/Register.tsx`
- `apps/frontend/src/store/auth.store.ts`

**Status：** [ ] pending

---

## Sub-Task 9：前端 — 食材管理頁面

**Intent：** 讓用戶可以輸入、管理手邊的剩餘食材，是 AI 食譜推薦的核心輸入來源。

**Expected Outcomes：**
- `/ingredients` 食材清單頁面
- 新增食材（名稱、分類、數量、到期日）
- 到期食材醒目標示（紅色/橘色警示）
- 快速勾選食材加入「準備料理」清單
- 支援食材搜尋與篩選

**Todo List：**
1. 設計食材卡片元件（`IngredientCard`）
2. 實作新增/編輯食材 Modal
3. 到期日顏色邏輯（>3天：綠色；1-3天：橘色；已過期：紅色）
4. 「全選 / 選擇要用的食材」功能
5. 「一鍵生成食譜」按鈕（將選中食材帶入食譜生成）
6. 串接後端食材 API

**Relevant Context：**
- `apps/frontend/src/pages/Ingredients.tsx`
- `apps/frontend/src/components/IngredientCard.tsx`
- `apps/frontend/src/store/ingredients.store.ts`

**Status：** [ ] pending

---

## Sub-Task 10：前端 — AI 食譜生成與展示頁面（核心功能）

**Intent：** 實作最核心的 AI 食譜生成頁面，用戶輸入食材後 AI 即時回傳創意食譜，呈現步驟、環保說明與碳足跡節省量。

**Expected Outcomes：**
- `/recipes` 食譜生成頁面
- AI 生成中的載入動畫（有環保主題趣味性）
- 食譜結果展示：標題、描述、食材用量、步驟、CO₂ 節省量
- AI 提供者切換按鈕（OpenAI / Gemini）
- 收藏食譜按鈕
- 「我完成了這道料理！」按鈕（觸發碳足跡記錄）

**Todo List：**
1. 設計食譜生成表單（食材輸入 + AI 選擇 + 語言選擇）
2. 實作 AI 串流回應動畫（打字機效果）
3. 設計食譜卡片展示元件（`RecipeCard`）
4. CO₂ 節省量視覺化（小圖示 + 數字）
5. 「完成料理」互動（愛心動畫 + 碳足跡紀錄 API 呼叫）
6. 收藏/取消收藏功能
7. 串接後端食譜生成 API

**Relevant Context：**
- `apps/frontend/src/pages/Recipes.tsx`
- `apps/frontend/src/components/RecipeCard.tsx`
- `apps/frontend/src/components/AIProviderToggle.tsx`

**Status：** [ ] pending

---

## Sub-Task 11：前端 — 個人儀表板與碳足跡統計

**Intent：** 提供用戶個人環保成就感，展示累計碳足跡節省量、料理次數、收藏食譜，強化持續使用動機。

**Expected Outcomes：**
- `/dashboard` 首頁儀表板
- 累計 CO₂ 節省量（大數字 + 等同於種了幾棵樹）
- 本週料理次數與食材利用率圖表
- 最近收藏的食譜快速入口
- 環保成就徽章展示

**Todo List：**
1. 安裝 `recharts` 或 `chart.js` 做圖表
2. 設計儀表板 Layout（左側統計、右側最近食譜）
3. CO₂ 換算顯示（1棵樹 = 約21kg CO₂/年）
4. 成就徽章元件（`AchievementBadge`）
5. 串接後端碳足跡統計 API
6. 添加激勵性文案（「你已經救了 X 公斤食物！」）

**Relevant Context：**
- `apps/frontend/src/pages/Dashboard.tsx`
- `apps/frontend/src/components/CarbonStats.tsx`
- `apps/frontend/src/components/AchievementBadge.tsx`

**Status：** [ ] pending

---

## Sub-Task 12：整合測試、README 與部署準備

**Intent：** 確保前後端整合正常運作，完成完整的文件撰寫，並準備好部署設定（Docker Compose），讓專案可以在任何環境快速啟動。

**Expected Outcomes：**
- Docker Compose 可一鍵啟動整個專案（前端、後端、PostgreSQL）
- 完整的 `README.md`（繁中 + 英文）
- `.env.example` 涵蓋所有環境變數
- 基本的 E2E 流程可走通（註冊→新增食材→生成食譜→記錄碳足跡）

**Todo List：**
1. 撰寫 `docker-compose.yml`（postgres + backend + frontend）
2. 撰寫各服務的 `Dockerfile`
3. 更新 `README.md`（專案介紹、快速啟動、環境變數說明）
4. 確認所有 API 端點與前端串接正確
5. 測試雙語切換正常
6. 測試 OpenAI / Gemini 切換正常

**Relevant Context：**
- 根目錄 `docker-compose.yml`
- `apps/backend/Dockerfile`
- `apps/frontend/Dockerfile`

**Status：** [ ] pending
