import requests

# ── 設定區（請填入你的金鑰與 Project ID）──────────────────────────
API_KEY    = "your_ibm_api_key_here"
PROJECT_ID = "your_project_id_here"
MODEL_ID   = "ibm/granite-3-8b-instruct"

IAM_TOKEN_URL = "https://iam.cloud.ibm.com/identity/token"
WATSONX_URL   = (
    "https://us-south.ml.cloud.ibm.com"
    "/ml/v1/text/generation?version=2023-05-29"
)
# ─────────────────────────────────────────────────────────────────────


def get_iam_token(api_key: str) -> str:
    """用 API Key 向 IBM IAM 換取 Bearer Token。"""
    response = requests.post(
        IAM_TOKEN_URL,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": api_key,
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()["access_token"]


def generate(prompt: str) -> str:
    """送出 prompt 至 Watsonx，回傳模型生成的文字。"""
    token = get_iam_token(API_KEY)

    payload = {
        "model_id": MODEL_ID,
        "project_id": PROJECT_ID,
        "input": prompt,
        "parameters": {
            "max_new_tokens": 512,
            "temperature": 0.7,
        },
    }

    response = requests.post(
        WATSONX_URL,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        json=payload,
        timeout=60,
    )
    response.raise_for_status()
    return response.json()["results"][0]["generated_text"]
