import express from 'express';
import { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../controllers/recipes.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);
router.delete('/:id', deleteRecipe);
router.patch('/:id', updateRecipe);

export default router;