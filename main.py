import watsonx_client


def ask_ingredients() -> str:
    """詢問使用者現有食材。"""
    print("\n🥦 請輸入你現有的食材（用逗號分隔，例如：雞蛋, 番茄, 洋蔥）：", end=" ")
    return input().strip()


def ask_flavor() -> str:
    """詢問口味偏好。"""
    print("🌶  口味偏好（例如：清淡、重口味、酸辣、甜鹹）：", end=" ")
    return input().strip() or "無特別偏好"


def ask_method() -> str:
    """詢問烹調方式偏好。"""
    print("🍳 烹調方式（例如：快炒、燉煮、涼拌、蒸、烤）：", end=" ")
    return input().strip() or "無特別偏好"


def build_prompt(ingredients: str, flavor: str, method: str) -> str:
    """組合送給 Watsonx 的繁體中文 prompt。"""
    return (
        f"我現在有以下食材：{ingredients}。\n"
        f"口味偏好：{flavor}。\n"
        f"烹調方式偏好：{method}。\n\n"
        "請根據以上條件推薦一道能減少食物浪費的料理，並以繁體中文回答，"
        "格式如下：\n"
        "【料理名稱】\n"
        "【食材用量】\n"
        "【詳細步驟】（請逐步說明）\n"
        "【烹調小技巧】"
    )


def main():
    print("=" * 50)
    print("   🍽  剩食料理推薦系統（Powered by Watsonx）")
    print("=" * 50)

    while True:
        ingredients = ask_ingredients()
        if not ingredients:
            print("⚠️  請至少輸入一項食材。")
            continue

        flavor = ask_flavor()
        method = ask_method()

        prompt = build_prompt(ingredients, flavor, method)

        print("\n⏳ 正在為你生成料理建議，請稍候...\n")
        try:
            result = watsonx_client.generate(prompt)
            print("-" * 50)
            print(result.strip())
            print("-" * 50)
        except Exception as e:
            print(f"❌ 呼叫 Watsonx API 發生錯誤：{e}")

        print("\n繼續推薦新料理嗎？（按 Enter 繼續 / 輸入 q 結束）：", end=" ")
        choice = input().strip().lower()
        if choice == "q":
            print("\n感謝使用！祝用餐愉快 🍴")
            break


if __name__ == "__main__":
    main()
