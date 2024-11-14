//Here, make the calls to the backend to push to the server

/* 
get all recipes: http://localhost:3001/api/recipes
get recipe by id: http://localhost:3001/api/recipes/:id
create recipe: http://localhost:3001/api/recipes
delete recipe: http://localhost:3001/api/recipes/:id
update recipe: http://localhost:3001/api/recipes/:id

*/

const getAllRecipes = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/recipes");
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching recipes", error);
  }
};

const createRecipe = async (recipe) => {
  try {
    //try this, if not gotta hardcode for now
    const response = await fetch("http://localhost:3001/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create recipe ${errorData.error}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating a new recipe", error.message);
  }
};

const updateRecipe = async (id, recipe) => {
  try {
    const response = await fetch(`http://localhost:3001/api/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update recipe ${errorData.error}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error updating recipe", error.message);
  }
};

const getRecipeById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/api/recipes/${id}`);
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error("Error fetching recipe", error);
      }
}
const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/recipes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete recipe ${errorData.error}`);
    }
    //might need to add stuff

    return {};
  } catch (error) {
    console.error("Error deleting recipe", error.message);
  }
};

export default { createRecipe, updateRecipe, getAllRecipes, deleteRecipe, getRecipeById};
