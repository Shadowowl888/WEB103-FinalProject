import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url);
const dataFilePath = path.join(dirname(currentPath), '../config/data/data.json');
const mockData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

async function createUsersTable() {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
        );
    `;

    try {
        const res = await pool.query(createUsersTableQuery);
        console.log('🎉 users table created successfully');
    } catch (error) {
        console.error('⚠️ error creating users table', error);
    }
}

async function createRecipesTable() {
    const createRecipesTableQuery = `
        CREATE TABLE IF NOT EXISTS recipes (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            instructions VARCHAR(255),
            img_url VARCHAR(255)
        );
    `;

    try {
        const res = await pool.query(createRecipesTableQuery);
        console.log('🎉 recipes table created successfully');
    } catch (error) {
        console.error('⚠️ error creating recipes table', error);
    }
}

async function createIngredientsTable() {
    const createIngredientsTableQuery = `
        CREATE TABLE IF NOT EXISTS ingredients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)
        );
    `;

    try {
        const res = await pool.query(createIngredientsTableQuery);
        console.log('🎉 ingredients table created successfully');
    } catch (error) {
        console.error('⚠️ error creating ingredients table', error);
    }
}

async function createDietaryRestrictionsTable() {
    const createDietaryRestrictionsTableQuery = `
        CREATE TABLE IF NOT EXISTS dietary_restrictions (
            id SERIAL PRIMARY KEY,
            restriction VARCHAR(255)
        );
    `;

    try {
        const res = await pool.query(createDietaryRestrictionsTableQuery);
        console.log('🎉 dietary_restrictions table created successfully');
    } catch (error) {
        console.error('⚠️ error creating dietary_restrictions table', error);
    }
}

async function createCuisinesTable() {
    const createCuisinesTableQuery = `
        CREATE TABLE IF NOT EXISTS cuisines (
            id SERIAL PRIMARY KEY,
            cuisine VARCHAR(255)
        );
    `;

    try {
        const res = await pool.query(createCuisinesTableQuery);
        console.log('🎉 cuisines table created successfully');
    } catch (error) {
        console.error('⚠️ error creating cuisines table', error);
    }
}

async function createMealTypeTable() {
    const createMealTypeTableQuery = `
        CREATE TABLE IF NOT EXISTS meal_type (
            id SERIAL PRIMARY KEY,
            meal_type VARCHAR(255)
        );
    `;

    try {
        const res = await pool.query(createMealTypeTableQuery);
        console.log('🎉 meal_type table created successfully');
    } catch (error) {
        console.error('⚠️ error creating meal_type table', error);
    }
}

async function createUserRecipesTable() {
    const createUserRecipesTableQuery = `
        CREATE TABLE IF NOT EXISTS user_recipes (
            user_id INT REFERENCES users(id),
            recipe_id INT REFERENCES recipes(id),
            PRIMARY KEY (user_id, recipe_id)
        );
    `;

    try {
        const res = await pool.query(createUserRecipesTableQuery);
        console.log('🎉 user_recipes table created successfully');
    } catch (error) {
        console.error('⚠️ error creating user_recipes table', error);
    }
}

async function createSavedRecipesTable() {
    const createSavedRecipesTableQuery = `
        CREATE TABLE IF NOT EXISTS saved_recipes (
            user_id INT REFERENCES users(id),
            recipe_id INT REFERENCES recipes(id),
            PRIMARY KEY (user_id, recipe_id)
        );
    `;

    try {
        const res = await pool.query(createSavedRecipesTableQuery);
        console.log('🎉 saved_recipes table created successfully');
    } catch (error) {
        console.error('⚠️ error creating saved_recipes table', error);
    }
}

async function createFavoritedRecipeTable() {
    const createFavoritedRecipeTableQuery = `
        CREATE TABLE IF NOT EXISTS favorited_recipe (
            user_id INT REFERENCES users(id),
            recipe_id INT REFERENCES recipes(id),
            PRIMARY KEY (user_id, recipe_id)
        );
    `;

    try {
        const res = await pool.query(createFavoritedRecipeTableQuery);
        console.log('🎉 favorited_recipe table created successfully');
    } catch (error) {
        console.error('⚠️ error creating favorited_recipe table', error);
    }
}

async function createRecipeReviewsTable() {
    const createRecipeReviewsTableQuery = `
        CREATE TABLE IF NOT EXISTS recipe_reviews (
            id SERIAL PRIMARY KEY,
            recipe_id INT REFERENCES recipes(id),
            user_id INT REFERENCES users(id),
            rating INT,
            comment TEXT,
            created_at TIMESTAMP
        );
    `;

    try {
        const res = await pool.query(createRecipeReviewsTableQuery);
        console.log('🎉 recipe_reviews table created successfully');
    } catch (error) {
        console.error('⚠️ error creating recipe_reviews table', error);
    }
}

async function createRecipeIngredientsTable() {
    const createRecipeIngredientsTableQuery = `
        CREATE TABLE IF NOT EXISTS recipe_ingredients (
            recipe_id INT REFERENCES recipes(id),
            ingredient_id INT REFERENCES ingredients(id),
            quantity NUMERIC,
            unit VARCHAR(255),
            PRIMARY KEY (recipe_id, ingredient_id)
        );
    `;

    try {
        const res = await pool.query(createRecipeIngredientsTableQuery);
        console.log('🎉 recipe_ingredients table created successfully');
    } catch (error) {
        console.error('⚠️ error creating recipe_ingredients table', error);
    }
}

async function createRecipeDietaryRestrictionsTable() {
    const createRecipeDietaryRestrictionsTableQuery = `
        CREATE TABLE IF NOT EXISTS recipe_dietary_restrictions (
            recipe_id INT REFERENCES recipes(id),
            dietary_id INT REFERENCES dietary_restrictions(id),
            PRIMARY KEY (recipe_id, dietary_id)
        );
    `;

    try {
        const res = await pool.query(createRecipeDietaryRestrictionsTableQuery);
        console.log('🎉 recipe_dietary_restrictions table created successfully');
    } catch (error) {
        console.error('⚠️ error creating recipe_dietary_restrictions table', error);
    }
}

async function createRecipeCuisineTable() {
    const createRecipeCuisineTableQuery = `
        CREATE TABLE IF NOT EXISTS recipe_cuisine (
            recipe_id INT REFERENCES recipes(id),
            cuisine_id INT REFERENCES cuisines(id),
            PRIMARY KEY (recipe_id, cuisine_id)
        );
    `;

    try {
        const res = await pool.query(createRecipeCuisineTableQuery);
        console.log('🎉 recipe_cuisine table created successfully');
    } catch (error) {
        console.error('⚠️ error creating recipe_cuisine table', error);
    }
}

async function createRecipeMealTypeTable() {
    const createRecipeMealTypeTableQuery = `
        CREATE TABLE IF NOT EXISTS recipe_meal_type (
            recipe_id INT REFERENCES recipes(id),
            meal_type_id INT REFERENCES meal_type(id),
            PRIMARY KEY (recipe_id, meal_type_id)
        );
    `;

    try {
        const res = await pool.query(createRecipeMealTypeTableQuery);
        console.log('🎉 recipe_meal_type table created successfully');
    } catch (error) {
        console.error('⚠️ error creating recipe_meal_type table', error);
    }
}

async function resetSequences() {
    const tables = ['users', 'recipes', 'ingredients', 'dietary_restrictions', 'cuisines', 'meal_type', 'recipe_reviews'];
    try {
        for (const table of tables) {
            const result = await pool.query(`SELECT COALESCE(MAX(id), 0) AS max_id FROM ${table}`);
            const maxId = result.rows[0].max_id;
            // unccoment the line below to see the max id for each table
            // console.log(`Max id for ${table}: ${maxId}`);
            await pool.query(`SELECT setval(pg_get_serial_sequence('${table}', 'id'), ${maxId + 1}, false)`);
        }
        console.log('🎉 Sequences reset successfully');
    } catch (error) {
        console.error('⚠️ Error resetting sequences', error);
    }
}

async function seedDatabase() {
    try {
        // Clear the tables before seeding
        await pool.query('TRUNCATE TABLE users, recipes, ingredients, dietary_restrictions, cuisines, meal_type, user_recipes, saved_recipes, favorited_recipe, recipe_reviews, recipe_ingredients, recipe_dietary_restrictions, recipe_cuisine, recipe_meal_type RESTART IDENTITY CASCADE');

        for (const user of mockData.users) {
            await pool.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [user.id, user.name, user.email, user.password]);
        }
        for (const recipe of mockData.recipes) {
            await pool.query('INSERT INTO recipes (id, name, instructions, img_url) VALUES ($1, $2, $3, $4)', [recipe.id, recipe.name, recipe.instructions, recipe.img_url]);
        }
        for (const ingredient of mockData.ingredients) {
            await pool.query('INSERT INTO ingredients (id, name) VALUES ($1, $2)', [ingredient.id, ingredient.name]);
        }
        for (const restriction of mockData.dietary_restrictions) {
            await pool.query('INSERT INTO dietary_restrictions (id, restriction) VALUES ($1, $2)', [restriction.id, restriction.restriction]);
        }
        for (const cuisine of mockData.cuisines) {
            await pool.query('INSERT INTO cuisines (id, cuisine) VALUES ($1, $2)', [cuisine.id, cuisine.cuisine]);
        }
        for (const mealType of mockData.meal_type) {
            await pool.query('INSERT INTO meal_type (id, meal_type) VALUES ($1, $2)', [mealType.id, mealType.meal_type]);
        }
        for (const userRecipe of mockData.user_recipes) {
            await pool.query('INSERT INTO user_recipes (user_id, recipe_id) VALUES ($1, $2)', [userRecipe.user_id, userRecipe.recipe_id]);
        }
        for (const savedRecipe of mockData.saved_recipes) {
            await pool.query('INSERT INTO saved_recipes (user_id, recipe_id) VALUES ($1, $2)', [savedRecipe.user_id, savedRecipe.recipe_id]);
        }
        for (const favoritedRecipe of mockData.favorited_recipe) {
            await pool.query('INSERT INTO favorited_recipe (user_id, recipe_id) VALUES ($1, $2)', [favoritedRecipe.user_id, favoritedRecipe.recipe_id]);
        }
        for (const review of mockData.recipe_reviews) {
            await pool.query('INSERT INTO recipe_reviews (id, recipe_id, user_id, rating, comment, created_at) VALUES ($1, $2, $3, $4, $5, $6)', [review.id, review.recipe_id, review.user_id, review.rating, review.comment, review.created_at]);
        }
        for (const recipeIngredient of mockData.recipe_ingredients) {
            await pool.query('INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4)', [recipeIngredient.recipe_id, recipeIngredient.ingredient_id, recipeIngredient.quantity, recipeIngredient.unit]);
        }
        for (const recipeDietaryRestriction of mockData.recipe_dietary_restrictions) {
            await pool.query('INSERT INTO recipe_dietary_restrictions (recipe_id, dietary_id) VALUES ($1, $2)', [recipeDietaryRestriction.recipe_id, recipeDietaryRestriction.dietary_id]);
        }
        for (const recipeCuisine of mockData.recipe_cuisine) {
            await pool.query('INSERT INTO recipe_cuisine (recipe_id, cuisine_id) VALUES ($1, $2)', [recipeCuisine.recipe_id, recipeCuisine.cuisine_id]);
        }
        for (const recipeMealType of mockData.recipe_meal_type) {
            await pool.query('INSERT INTO recipe_meal_type (recipe_id, meal_type_id) VALUES ($1, $2)', [recipeMealType.recipe_id, recipeMealType.meal_type_id]);
        }

        // Reset the sequence after seeding
        await resetSequences();

        console.log('🎉 Database seeded successfully');
    } catch (error) {
        console.error('⚠️ Error seeding database', error);
    } finally {
        pool.end();
    }
}

// Call the functions to create the tables
createUsersTable();
createRecipesTable();
createIngredientsTable();
createDietaryRestrictionsTable();
createCuisinesTable();
createMealTypeTable();
createUserRecipesTable();
createSavedRecipesTable();
createFavoritedRecipeTable();
createRecipeReviewsTable();
createRecipeIngredientsTable();
createRecipeDietaryRestrictionsTable();
createRecipeCuisineTable();
createRecipeMealTypeTable();

// Call the seed function
seedDatabase();