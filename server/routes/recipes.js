import express from 'express';
import { createRecipe, getRecipes, getRecipeById, getRecipesByMealType, getRecipesByCuisine, getRecipesByDietaryRestriction, getRecipesByIngredient, updateRecipe, deleteRecipe } from '../controllers/recipes.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.get('/mealtype/:mealTypeName', getRecipesByMealType);
router.get('/cuisine/:cuisineName', getRecipesByCuisine);
router.get('/dietary/:dietaryName', getRecipesByDietaryRestriction);
router.get('/ingredient/:ingredientName', getRecipesByIngredient);
router.post('/', createRecipe);
router.patch('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;