import { pool } from '../config/database.js'

// Create a new recipe
const createRecipe = async (req, res) => {
    const { name, instructions, img_url } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO recipes (name, instructions, img_url) VALUES ($1, $2, $3) RETURNING *',
            [name, instructions, img_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all recipes
const getRecipes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single recipe by ID
const getRecipeById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error getting recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a recipe
const updateRecipe = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, instructions, img_url } = req.body;

    try {
        const result = await pool.query(
            'UPDATE recipes SET name = $1, instructions = $2, img_url = $3 WHERE id = $4 RETURNING *',
            [name, instructions, img_url, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };