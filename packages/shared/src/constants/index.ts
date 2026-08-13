// 食材分類常數
export const INGREDIENT_CATEGORIES = {
  vegetable: { zh: '蔬菜', en: 'Vegetable', icon: '🥦' },
  fruit: { zh: '水果', en: 'Fruit', icon: '🍎' },
  meat: { zh: '肉類', en: 'Meat', icon: '🥩' },
  seafood: { zh: '海鮮', en: 'Seafood', icon: '🐟' },
  grain: { zh: '穀物', en: 'Grain', icon: '🌾' },
  dairy: { zh: '乳製品', en: 'Dairy', icon: '🧀' },
  condiment: { zh: '調味料', en: 'Condiment', icon: '🧂' },
  other: { zh: '其他', en: 'Other', icon: '📦' },
} as const;

// 碳排放係數 (kgCO₂e / kg 食物)
// 資料來源: Our World in Data / IPCC
export const CARBON_FACTORS: Record<string, number> = {
  meat: 27.0,        // 牛肉平均
  seafood: 6.1,      // 魚類平均
  dairy: 3.2,        // 乳製品平均
  grain: 1.4,        // 穀物平均
  vegetable: 0.4,    // 蔬菜平均
  fruit: 0.5,        // 水果平均
  condiment: 1.0,    // 調味料平均
  other: 1.0,        // 其他
};

// 一棵樹一年吸收的 CO₂（kg）
export const CO2_PER_TREE_PER_YEAR_KG = 21;

// 成就徽章門檻（節省的 CO₂，單位：克）
export const ACHIEVEMENT_THRESHOLDS = {
  seedling: 100,        // 🌱 種子：節省 100g CO₂
  sprout: 1000,         // 🌿 嫩芽：節省 1kg CO₂
  tree: 10000,          // 🌳 大樹：節省 10kg CO₂
  forest: 100000,       // 🌲 森林：節省 100kg CO₂
  earthGuardian: 1000000, // 🌍 地球守護者：節省 1000kg CO₂
} as const;
