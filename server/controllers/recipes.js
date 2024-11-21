import { pool } from '../config/database.js'

// Create a new recipe
const createRecipe = async (req, res) => {
    const { name, instructions, img_url, mealTypes, cuisines, ingredients, dietaryRestrictions } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const recipeResult = await client.query(
            'INSERT INTO recipes (name, instructions, img_url) VALUES ($1, $2, $3) RETURNING *',
            [name, instructions, img_url]
        );
        const recipeId = recipeResult.rows[0].id;

        if (mealTypes && mealTypes.length > 0) {
            for (const mealType of mealTypes) {
                let mealTypeResult = await client.query(
                    'SELECT id FROM meal_type WHERE LOWER(meal_type) = $1',
                    [mealType.toLowerCase()]
                );
                if (mealTypeResult.rows.length === 0) {
                    mealTypeResult = await client.query(
                        'INSERT INTO meal_type (meal_type) VALUES ($1) RETURNING id',
                        [mealType]
                    );
                }
                const mealTypeId = mealTypeResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_meal_type (recipe_id, meal_type_id) VALUES ($1, $2)',
                    [recipeId, mealTypeId]
                );
            }
        }

        if (cuisines && cuisines.length > 0) {
            for (const cuisine of cuisines) {
                let cuisineResult = await client.query(
                    'SELECT id FROM cuisines WHERE LOWER(cuisine) = $1',
                    [cuisine.toLowerCase()]
                );
                if (cuisineResult.rows.length === 0) {
                    cuisineResult = await client.query(
                        'INSERT INTO cuisines (cuisine) VALUES ($1) RETURNING id',
                        [cuisine]
                    );
                }
                const cuisineId = cuisineResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_cuisine (recipe_id, cuisine_id) VALUES ($1, $2)',
                    [recipeId, cuisineId]
                );
            }
        }

       if (ingredients && ingredients.length > 0) {
            for (const ingredient of ingredients) {
                const { name, quantity, unit } = ingredient;
                let ingredientResult = await client.query(
                    'SELECT id FROM ingredients WHERE LOWER(name) = $1',
                    [name.toLowerCase()]
                );
                if (ingredientResult.rows.length === 0) {
                    ingredientResult = await client.query(
                        'INSERT INTO ingredients (name) VALUES ($1) RETURNING id',
                        [name]
                    );
                }
                const ingredientId = ingredientResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4)',
                    [recipeId, ingredientId, quantity, unit]
                );
            }
        }  

        if (dietaryRestrictions && dietaryRestrictions.length > 0) {
            for (const restriction of dietaryRestrictions) {
                let restrictionResult = await client.query(
                    'SELECT id FROM dietary_restrictions WHERE LOWER(restriction) = $1',
                    [restriction.toLowerCase()]
                );
                if (restrictionResult.rows.length === 0) {
                    restrictionResult = await client.query(
                        'INSERT INTO dietary_restrictions (restriction) VALUES ($1) RETURNING id',
                        [restriction]
                    );
                }
                const restrictionId = restrictionResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_dietary_restrictions (recipe_id, dietary_id) VALUES ($1, $2)',
                    [recipeId, restrictionId]
                );
            }
        }

        await client.query('COMMIT');
        res.status(201).json(recipeResult.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
};

// Get all recipes with meal type, cuisine, dietary restrictions, and ingredients
const getRecipes = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, 
                   mt.meal_type, 
                   c.cuisine, 
                   array_agg(DISTINCT jsonb_build_object('restriction', dr.restriction)) AS dietary_restrictions,
                   array_agg(DISTINCT jsonb_build_object('name', i.name, 'quantity', ri.quantity, 'unit', ri.unit)) AS ingredients
            FROM recipes r
            LEFT JOIN recipe_meal_type rmt ON r.id = rmt.recipe_id
            LEFT JOIN meal_type mt ON rmt.meal_type_id = mt.id
            LEFT JOIN recipe_cuisine rc ON r.id = rc.recipe_id
            LEFT JOIN cuisines c ON rc.cuisine_id = c.id
            LEFT JOIN recipe_dietary_restrictions rdr ON r.id = rdr.recipe_id
            LEFT JOIN dietary_restrictions dr ON rdr.dietary_id = dr.id
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            GROUP BY r.id, mt.meal_type, c.cuisine
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single recipe by ID with meal type, cuisine, dietary restrictions, and ingredients
const getRecipeById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await pool.query(`
            SELECT r.*, 
                   mt.meal_type, 
                   c.cuisine, 
                   array_agg(DISTINCT jsonb_build_object('restriction', dr.restriction)) AS dietary_restrictions,
                   array_agg(DISTINCT jsonb_build_object('name', i.name, 'quantity', ri.quantity, 'unit', ri.unit)) AS ingredients
            FROM recipes r
            LEFT JOIN recipe_meal_type rmt ON r.id = rmt.recipe_id
            LEFT JOIN meal_type mt ON rmt.meal_type_id = mt.id
            LEFT JOIN recipe_cuisine rc ON r.id = rc.recipe_id
            LEFT JOIN cuisines c ON rc.cuisine_id = c.id
            LEFT JOIN recipe_dietary_restrictions rdr ON r.id = rdr.recipe_id
            LEFT JOIN dietary_restrictions dr ON rdr.dietary_id = dr.id
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE r.id = $1
            GROUP BY r.id, mt.meal_type, c.cuisine
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error getting recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get recipes by meal type name with meal type, cuisine, dietary restrictions, and ingredients
const getRecipesByMealType = async (req, res) => {
    const mealTypeName = req.params.mealTypeName.toLowerCase().replace(/-/g, ' ');

    try {
        const result = await pool.query(`
            SELECT r.*, 
                   mt.meal_type, 
                   c.cuisine, 
                   array_agg(DISTINCT jsonb_build_object('restriction', dr.restriction)) AS dietary_restrictions,
                   array_agg(DISTINCT jsonb_build_object('name', i.name, 'quantity', ri.quantity, 'unit', ri.unit)) AS ingredients
            FROM recipes r
            LEFT JOIN recipe_meal_type rmt ON r.id = rmt.recipe_id
            LEFT JOIN meal_type mt ON rmt.meal_type_id = mt.id
            LEFT JOIN recipe_cuisine rc ON r.id = rc.recipe_id
            LEFT JOIN cuisines c ON rc.cuisine_id = c.id
            LEFT JOIN recipe_dietary_restrictions rdr ON r.id = rdr.recipe_id
            LEFT JOIN dietary_restrictions dr ON rdr.dietary_id = dr.id
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE LOWER(mt.meal_type) = $1
            GROUP BY r.id, mt.meal_type, c.cuisine
        `, [mealTypeName]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No recipes found for this meal type' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting recipes by meal type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get recipes by cuisine name with meal type, cuisine, dietary restrictions, and ingredients
const getRecipesByCuisine = async (req, res) => {
    const cuisineName = req.params.cuisineName.toLowerCase().replace(/-/g, ' ');

    try {
        const result = await pool.query(`
            SELECT r.*, 
                   mt.meal_type, 
                   c.cuisine, 
                   array_agg(DISTINCT jsonb_build_object('restriction', dr.restriction)) AS dietary_restrictions,
                   array_agg(DISTINCT jsonb_build_object('name', i.name, 'quantity', ri.quantity, 'unit', ri.unit)) AS ingredients
            FROM recipes r
            LEFT JOIN recipe_meal_type rmt ON r.id = rmt.recipe_id
            LEFT JOIN meal_type mt ON rmt.meal_type_id = mt.id
            LEFT JOIN recipe_cuisine rc ON r.id = rc.recipe_id
            LEFT JOIN cuisines c ON rc.cuisine_id = c.id
            LEFT JOIN recipe_dietary_restrictions rdr ON r.id = rdr.recipe_id
            LEFT JOIN dietary_restrictions dr ON rdr.dietary_id = dr.id
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE LOWER(c.cuisine) = $1
            GROUP BY r.id, mt.meal_type, c.cuisine
        `, [cuisineName]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No recipes found for this cuisine' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting recipes by cuisine:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get recipes by dietary restriction name with meal type, cuisine, dietary restrictions, and ingredients
const getRecipesByDietaryRestriction = async (req, res) => {
    const dietaryName = req.params.dietaryName.toLowerCase();

    try {
        const result = await pool.query(`
            SELECT r.*, 
                   mt.meal_type, 
                   c.cuisine, 
                   array_agg(DISTINCT jsonb_build_object('restriction', dr.restriction)) AS dietary_restrictions,
                   array_agg(DISTINCT jsonb_build_object('name', i.name, 'quantity', ri.quantity, 'unit', ri.unit)) AS ingredients
            FROM recipes r
            LEFT JOIN recipe_meal_type rmt ON r.id = rmt.recipe_id
            LEFT JOIN meal_type mt ON rmt.meal_type_id = mt.id
            LEFT JOIN recipe_cuisine rc ON r.id = rc.recipe_id
            LEFT JOIN cuisines c ON rc.cuisine_id = c.id
            LEFT JOIN recipe_dietary_restrictions rdr ON r.id = rdr.recipe_id
            LEFT JOIN dietary_restrictions dr ON rdr.dietary_id = dr.id
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE LOWER(dr.restriction) = $1
            GROUP BY r.id, mt.meal_type, c.cuisine
        `, [dietaryName]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No recipes found for this dietary restriction' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting recipes by dietary restriction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get recipes by ingredient name with meal type, cuisine, dietary restrictions, and ingredients
const getRecipesByIngredient = async (req, res) => {
    const ingredientName = req.params.ingredientName.toLowerCase().replace(/-/g, ' ');

    try {
        const result = await pool.query(`
            SELECT r.*, 
                   mt.meal_type, 
                   c.cuisine, 
                   array_agg(DISTINCT jsonb_build_object('restriction', dr.restriction)) AS dietary_restrictions,
                   array_agg(DISTINCT jsonb_build_object('name', i.name, 'quantity', ri.quantity, 'unit', ri.unit)) AS ingredients
            FROM recipes r
            LEFT JOIN recipe_meal_type rmt ON r.id = rmt.recipe_id
            LEFT JOIN meal_type mt ON rmt.meal_type_id = mt.id
            LEFT JOIN recipe_cuisine rc ON r.id = rc.recipe_id
            LEFT JOIN cuisines c ON rc.cuisine_id = c.id
            LEFT JOIN recipe_dietary_restrictions rdr ON r.id = rdr.recipe_id
            LEFT JOIN dietary_restrictions dr ON rdr.dietary_id = dr.id
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE LOWER(i.name) = $1
            GROUP BY r.id, mt.meal_type, c.cuisine
        `, [ingredientName]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No recipes found for this ingredient' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting recipes by ingredient:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a recipe
const updateRecipe = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, instructions, img_url, mealTypes, cuisines, ingredients, dietaryRestrictions } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const result = await client.query(
            'UPDATE recipes SET name = $1, instructions = $2, img_url = $3 WHERE id = $4 RETURNING *',
            [name, instructions, img_url, id]
        );

        // Clear existing associations
        await client.query('DELETE FROM recipe_meal_type WHERE recipe_id = $1', [id]);
        await client.query('DELETE FROM recipe_cuisine WHERE recipe_id = $1', [id]);
        await client.query('DELETE FROM recipe_ingredients WHERE recipe_id = $1', [id]);
        await client.query('DELETE FROM recipe_dietary_restrictions WHERE recipe_id = $1', [id]);

        // Insert new meal types
        if (mealTypes && mealTypes.length > 0) {
            for (const mealType of mealTypes) {
                let mealTypeResult = await client.query(
                    'SELECT id FROM meal_type WHERE LOWER(meal_type) = $1',
                    [mealType.toLowerCase()]
                );
                if (mealTypeResult.rows.length === 0) {
                    mealTypeResult = await client.query(
                        'INSERT INTO meal_type (meal_type) VALUES ($1) RETURNING id',
                        [mealType]
                    );
                }
                const mealTypeId = mealTypeResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_meal_type (recipe_id, meal_type_id) VALUES ($1, $2)',
                    [id, mealTypeId]
                );
            }
        }

        // Insert new cuisines
        if (cuisines && cuisines.length > 0) {
            for (const cuisine of cuisines) {
                let cuisineResult = await client.query(
                    'SELECT id FROM cuisines WHERE LOWER(cuisine) = $1',
                    [cuisine.toLowerCase()]
                );
                if (cuisineResult.rows.length === 0) {
                    cuisineResult = await client.query(
                        'INSERT INTO cuisines (cuisine) VALUES ($1) RETURNING id',
                        [cuisine]
                    );
                }
                const cuisineId = cuisineResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_cuisine (recipe_id, cuisine_id) VALUES ($1, $2)',
                    [id, cuisineId]
                );
            }
        }

        // Insert new ingredients
        if (ingredients && ingredients.length > 0) {
            for (const ingredient of ingredients) {
                const { name, quantity, unit } = ingredient;
                let ingredientResult = await client.query(
                    'SELECT id FROM ingredients WHERE LOWER(name) = $1',
                    [name.toLowerCase()]
                );
                if (ingredientResult.rows.length === 0) {
                    ingredientResult = await client.query(
                        'INSERT INTO ingredients (name) VALUES ($1) RETURNING id',
                        [name]
                    );
                }
                const ingredientId = ingredientResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4)',
                    [id, ingredientId, quantity, unit]
                );
            }
        }

        // Insert new dietary restrictions
        if (dietaryRestrictions && dietaryRestrictions.length > 0) {
            for (const restriction of dietaryRestrictions) {
                let restrictionResult = await client.query(
                    'SELECT id FROM dietary_restrictions WHERE LOWER(restriction) = $1',
                    [restriction.toLowerCase()]
                );
                if (restrictionResult.rows.length === 0) {
                    restrictionResult = await client.query(
                        'INSERT INTO dietary_restrictions (restriction) VALUES ($1) RETURNING id',
                        [restriction]
                    );
                }
                const restrictionId = restrictionResult.rows[0].id;
                await client.query(
                    'INSERT INTO recipe_dietary_restrictions (recipe_id, dietary_id) VALUES ($1, $2)',
                    [id, restrictionId]
                );
            }
        }

        await client.query('COMMIT');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const id = parseInt(req.params.id);

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Delete associations
        await client.query('DELETE FROM recipe_meal_type WHERE recipe_id = $1', [id]);
        await client.query('DELETE FROM recipe_cuisine WHERE recipe_id = $1', [id]);
        await client.query('DELETE FROM recipe_ingredients WHERE recipe_id = $1', [id]);
        await client.query('DELETE FROM recipe_dietary_restrictions WHERE recipe_id = $1', [id]);

        // Delete the recipe
        await client.query('DELETE FROM recipes WHERE id = $1', [id]);

        await client.query('COMMIT');
        res.status(204).send();
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
};

export { createRecipe, getRecipes, getRecipeById, getRecipesByMealType, getRecipesByCuisine, getRecipesByDietaryRestriction, getRecipesByIngredient, updateRecipe, deleteRecipe };