# 剩食料理推薦系統 — 計畫文件

## 概覽

建立一個純 Python 命令列程式，讓使用者輸入現有食材與烹調偏好，透過 IBM Watsonx（ibm/granite 系列模型）動態生成料理建議，目標是減少食物浪費。

**範圍：**
- 互動式命令列問答流程（食材 → 偏好 → 建議）
- 使用原生 `requests` 套件直接呼叫 Watsonx REST API（不使用 ibm-watsonx-ai SDK）
- 呼叫 Watsonx API 生成料理名稱、步驟說明與小技巧
- 支援連續推薦（詢問是否繼續）
- 放置於 `AI/` 資料夾並推送至 GitHub

**非目標：**
- 不做 Web UI 或資料庫
- 不做食材庫存管理
- API 金鑰暫時直接寫在程式碼（測試用）
- 不使用 `ibm-watsonx-ai` SDK

---

## 子任務

---

### 子任務 1：建立 Watsonx API 連線模組

**Intent**
封裝呼叫 Watsonx API 的邏輯，讓主程式只需傳入 prompt 即可取得回應，避免主流程混雜 API 細節。

**Expected Outcomes**
- `watsonx_client.py` 能成功呼叫 Watsonx text generation API
- 傳入 prompt 字串，回傳模型生成的文字

**Todo List**
1. 建立 `AI/watsonx_client.py`，包含：
   - `API_KEY`、`PROJECT_ID`、`MODEL_ID`（`ibm/granite-3-8b-instruct`）等設定常數
   - `get_iam_token(api_key) -> str` 函式：呼叫 IBM IAM REST API 取得 Bearer Token
   - `generate(prompt: str) -> str` 函式：用 `requests.post` 呼叫 Watsonx text generation REST API，帶入 Bearer Token，回傳生成文字
2. 設定合理的 `max_new_tokens`（建議 512）與 `temperature`（建議 0.7）

**Relevant Context**
- IAM token endpoint：`https://iam.cloud.ibm.com/identity/token`
- Watsonx text generation endpoint：`https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`
- 模型：`ibm/granite-3-8b-instruct`
- 只需內建 `requests` 套件（Python 標準環境通常已有，或 `pip install requests`）

**Status:** `[ ] pending`

---

### 子任務 2：設計互動式問答主流程

**Intent**
建立主程式 `main.py`，引導使用者逐步輸入食材與偏好，組合成結構化的 prompt 送給 Watsonx。

**Expected Outcomes**
- 執行 `python main.py` 後，依序詢問：
  1. 現有食材（逗號分隔）
  2. 口味偏好（如：清淡、重口味、酸辣等）
  3. 烹調方式偏好（如：快炒、燉煮、涼拌等）
- 組合 prompt 並呼叫 `watsonx_client.generate()`
- 顯示 AI 回傳的料理建議

**Todo List**
1. 清空原本測試用的 `AI/main.py` 內容
2. 實作 `ask_ingredients()`：提示使用者輸入食材，回傳食材列表字串
3. 實作 `ask_preferences()`：提示使用者輸入口味與烹調偏好
4. 實作 `build_prompt(ingredients, flavor, method) -> str`：組合中文 prompt，要求 AI 給出料理名稱、詳細步驟與小技巧
5. 主迴圈：顯示結果後詢問是否繼續推薦，輸入 `q` 或 `n` 則結束

**Relevant Context**
- 呼叫 `watsonx_client.generate()` 取得回應
- prompt 範例格式：「我有以下食材：{食材}。口味偏好：{口味}。烹調方式：{方式}。請推薦一道料理，包含料理名稱、詳細步驟說明與烹調小技巧。」

**Status:** `[ ] pending`

---

### 子任務 3：建立 requirements.txt 並驗證執行

**Intent**
確保任何人 clone 這個 repo 後都能用 `pip install -r requirements.txt` 安裝依賴並執行程式。

**Expected Outcomes**
- `AI/requirements.txt` 列出所有必要套件
- 本地執行 `python main.py` 可完整跑完一次問答流程並取得 AI 料理建議

**Todo List**
1. 建立 `AI/requirements.txt`，加入 `requests`（唯一外部依賴）
2. 在本地執行程式測試一次完整流程
3. 確認輸出包含：料理名稱、步驟說明、小技巧

**Relevant Context**
- 執行目錄：`AI/`
- Python 版本建議：3.9+

**Status:** `[ ] pending`

---

### 子任務 4：推送至 GitHub

**Intent**
將完成的程式碼上傳到 `https://github.com/ha9808037-max/AI.git`。

**Expected Outcomes**
- GitHub repo 包含：`main.py`、`watsonx_client.py`、`requirements.txt`
- commit 訊息清楚描述功能

**Todo List**
1. `git add .`
2. `git commit -m "add leftover recipe recommender using Watsonx"`
3. `git push`

**Relevant Context**
- remote origin 已設定為 `https://github.com/ha9808037-max/AI.git`

**Status:** `[ ] pending`
