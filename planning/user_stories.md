# User Stories

Reference the Writing User Stories final project guide in the course portal for more information about how to complete each of the sections below.

## Outline User Roles

* User: Someone who wants to view and share recipes on PlatePal.
* Home Chef: Someone who wants to create new recipes for the PlatePal community.
* Developer: The person responsible for building and maintaining the platform.

## Draft User Stories

### User-Facing Features

User Registration and Authentication
1. As a user, I want to be able to sign up for an account using my email and password, so I can save and manage my recipes.
2. As a user, I want to log in to my account, so I can access my saved recipes and personal information.

Create a New Recipe

3. As a user, I want to be able to create a new recipe by entering the recipe name, ingredients, instructions, and optional images, so I can add it to my recipe collection.

View Recipes

4. As a user, I want to click on a recipe to view its details, so I can see the ingredients and instructions.

Edit a Recipe

5. As a user, I want to edit a recipe I’ve previously created, so I can update the ingredients or instructions as needed.

Delete a Recipe

6. As a user, I want to delete a recipe from my collection, so I can remove recipes I no longer want.

Search for Recipes

7. As a user, I want to be able to search for a recipe by its name or ingredients, so I can quickly find what I need.

Filter Recipes by Category

8. As a user, I want to filter recipes by categories like “breakfast,” “dinner,” or “dessert,” so I can find a recipe for a specific meal type.

Like or Favorite a Recipe

9. As a user, I want to be able to favorite or like a recipe, so I can mark it as one of my preferred dishes.

Share a Recipe

10. As a user, I want to share a recipe link with friends or on social media, so I can recommend dishes to others.
11. As a home chef, I want to publish recipes, so that I can share my yummy recipes with others.
12. As a home chef, I want to be able to edit recipes, so that I can make them even more yummy or fix errors I might’ve made
13. As a home chef, I want to be able to delete recipes so that I can delete recipes that my family did not give me permission to publish
14. As a home chef, I want to be able to view all recipes, so that I can discover something yummy to try to make
15. As a home chef, I want to be able to view recipes with dietary needs, so that I can find meals that accommodate my dietary restrictions. 
16. As a home chef, I want to be able to view recipes by meal type, so that I am able to find the perfect breakfast/lunch/dinner. 
17. As a home chef, I want to be able to view recipes by culture, so that I can try a new cultural cuisine
18. As a home chef, I want to be able to view an individual recipe, so that I can copy a recipe at home with ease
19. As a home chef, I want to be able to leave a review on a recipe, so that I can share my experience making this meal as well as how yummy it was/ hard it was to make. 
20. As a home chef, I want to be able to bookmark a recipe, so that it is easy for me to find my favorite recipes. 

### Development-Focused Features

#### React Frontend
1. Frontend Setup with React: As a developer, I want to set up a React frontend using Create React App, so I have a base structure for my project.
2. Create Recipe Feed Component: As a developer, I want to create a recipe feed component in React, so I can display all recipes on the homepage.
3. Create Recipe Detail Component: As a developer, I want to create a detailed view component in React, so users can see the full recipe details when clicking on a recipe.
4. Setup Routing: As a developer, I want to implement React Router to navigate between different pages (e.g., home, recipe details, new recipe form), so users can interact with multiple sections of the app.
5. Form for Adding/Editing a Recipe: As a developer, I want to create a form component for adding and editing recipes, so users can easily input and update their recipes.
6. Setup State Management with Redux: As a developer, I want to set up Redux for state management, so I can handle user authentication and recipe data across different components.
7. Home Page: As a new user, I want to see a welcome message and a brief introduction to the app, so I understand the app's purpose.
8. Home Page: As a returning user, I want to see a personalized feed of recipes that match my preferences, so I can easily find recipes I’m interested in.
9. Login/Signup Page - User Authentication: As a new user, I want to sign up with my email and password, so I can create an account and start saving recipes.
10. Login/Signup Page - User Authentication: As a returning user, I want to log in using my email and password, so I can access my saved recipes and personal data.
11. Add/Edit Recipe Page: As a logged-in user, I want to add a new recipe by filling out a form with the name, ingredients, instructions, and images, so I can contribute my own recipes.
12. Add/Edit Recipe Page: As a logged-in user, I want to edit an existing recipe I created, so I can update or improve the instructions or ingredients.

#### Express Backend
1. Backend Setup with Express: As a developer, I want to set up an Express backend to handle API requests, so I can serve recipe data to the frontend.
2. Create API Endpoint for Recipe List: As a developer, I want to create an API endpoint (GET /recipes) to fetch all recipes from the database, so the frontend can display the list of recipes.
3. Create API Endpoint for Recipe Details: As a developer, I want to create an API endpoint (GET /recipes/:id) to fetch the details of a specific recipe, so users can view recipe details.
4. Create API Endpoint for Adding Recipes: As a developer, I want to create an API endpoint (POST /recipes) to allow users to add new recipes, so they can create their own recipes.
5. Create API Endpoint for Editing Recipes: As a developer, I want to create an API endpoint (PUT /recipes/:id) to update a specific recipe, so users can edit their previously created recipes.
6. Create API Endpoint for Deleting Recipes: As a developer, I want to create an API endpoint (DELETE /recipes/:id) to allow users to delete recipes from the database.

#### PostgreSQL Database Setup
1. Database Setup: As a developer, I want to set up a PostgreSQL database instance on Railway, so I can store user information, recipes, and reviews in a structured and efficient way.
