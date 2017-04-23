export interface Ingredient {
    id: number;
    ingredient_group: string;
    ingredient_type: string;
}

export interface Recipe {
    recipe_cook_time: string;
    recipe_id: number;
    recipe_image_url: string;
    recipe_name: string;
    recipe_url: string;
}