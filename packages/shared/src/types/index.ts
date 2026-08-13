// ===== 用戶相關型別 =====
export interface User {
  id: string;
  email: string;
  displayName: string;
  language: 'zh-TW' | 'en';
  createdAt: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}

// ===== 食材相關型別 =====
export type IngredientCategory =
  | 'vegetable'
  | 'fruit'
  | 'meat'
  | 'seafood'
  | 'grain'
  | 'dairy'
  | 'condiment'
  | 'other';

export interface Ingredient {
  id: string;
  userId: string;
  name: string;
  category: IngredientCategory;
  quantity: number;
  unit: string;
  expiryDate?: string;
  createdAt: string;
}

export interface CreateIngredientDto {
  name: string;
  category: IngredientCategory;
  quantity: number;
  unit: string;
  expiryDate?: string;
}

// ===== 食譜相關型別 =====
export type AIProvider = 'openai' | 'gemini';

export interface RecipeIngredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  steps: string[];
  ingredientsUsed: RecipeIngredient[];
  wasteReductionTips: string[];
  estimatedFoodSavedGrams: number;
  estimatedCo2SavedGrams: number;
  aiProvider: AIProvider;
  language: 'zh-TW' | 'en';
  createdAt: string;
}

export interface GenerateRecipeDto {
  ingredients: string[];
  language?: 'zh-TW' | 'en';
  provider?: AIProvider;
}

export interface UserRecipe {
  id: string;
  userId: string;
  recipeId: string;
  isFavorite: boolean;
  isCooked: boolean;
  createdAt: string;
  recipe?: Recipe;
}

// ===== 碳足跡相關型別 =====
export interface CarbonRecord {
  id: string;
  userId: string;
  recipeId: string;
  co2SavedGrams: number;
  foodSavedGrams: number;
  createdAt: string;
}

export interface UserCarbonStats {
  totalCo2SavedGrams: number;
  totalFoodSavedGrams: number;
  totalRecipesCooked: number;
  totalFavoriteRecipes: number;
  treesEquivalent: number; // 換算為種樹數量
}

// ===== API 回應型別 =====
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
