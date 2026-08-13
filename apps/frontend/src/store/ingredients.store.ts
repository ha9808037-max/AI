import { create } from 'zustand';
import type { Ingredient } from '@zero-waste/shared';

interface IngredientsState {
  ingredients: Ingredient[];
  selectedIds: string[];
  setIngredients: (ingredients: Ingredient[]) => void;
  addIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => void;
  removeIngredient: (id: string) => void;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
}

export const useIngredientsStore = create<IngredientsState>((set) => ({
  ingredients: [],
  selectedIds: [],
  setIngredients: (ingredients) => set({ ingredients }),
  addIngredient: (ingredient) =>
    set((state) => ({ ingredients: [...state.ingredients, ingredient] })),
  updateIngredient: (id, updates) =>
    set((state) => ({
      ingredients: state.ingredients.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),
  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i.id !== id),
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    })),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    })),
  selectAll: () => set((state) => ({ selectedIds: state.ingredients.map((i) => i.id) })),
  clearSelection: () => set({ selectedIds: [] }),
}));
