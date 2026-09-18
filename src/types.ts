export type MealMode = 'morning' | 'noon' | 'night';

export type FoodCategory = 'grain' | 'meat' | 'drink' | 'veggie' | 'dessert';

export interface FoodItem {
  id: string;
  name: string;
  chineseName: string;
  category: FoodCategory;
  recommendedFor: MealMode[];
  color: string;
  svgType: string;
  calories?: string;
}

export interface ModeInfo {
  mode: MealMode;
  timeStr: string;
  periodLabel: string;
  hour: number;
  minute: number;
  isPM: boolean;
  mealName: string;
  mealChinese: string;
  sentence: string;
  sentenceChinese: string;
  words: { text: string; clean: string }[];
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
}
