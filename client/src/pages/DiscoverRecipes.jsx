import { useState, useEffect, useContext } from "react";
import "../App.css";
import FilterBar from "../components/FilterBar";
import RecipeCard from "../components/RecipeCard";
import { FilterContext } from "../context/FilterContext";
import RecipesAPI from "../services/RecipesAPI";

const DiscoverRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { selectedFilters, setSelectedFilters } = useContext(FilterContext);

  useEffect(() => {
    (async () => {
      try {
        const recipeData = await RecipesAPI.getAllRecipes();
        setRecipes(recipeData);
        setFilteredRecipes(recipeData);
      } catch (error) {
        throw error;
      }
    })();
  }, [refresh]);

  useEffect(() => {
    if (allFiltersDefault()) {
      setFilteredRecipes(recipes);
    } else {
      const newlyFilteredRecipes = applyFilters(recipes, selectedFilters);
      setFilteredRecipes(newlyFilteredRecipes);
    }
  }, [recipes, selectedFilters]);

  const allFiltersDefault = () => {
    return Object.values(selectedFilters).every(
      (filterArray) => filterArray.length === 0
    );
  };

  const handleFilterBarChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const applyFilters = (recipes, filters) => {
    console.log("The recipes before the filter", recipes);
    console.log("The filters we are applying", filters);
    const newrep = recipes.filter((recipe) => {
      //Filter by meal type
      /*if (filters.mealTypes && filters.mealTypes.length > 0) {
        if (!filters.mealTypes.includes(recipe.mealType)) {
          return false;
        }
      }*/

      if (filters.mealTypes && filters.mealTypes.length > 0) {
        const recipeMealsLower = recipe.mealTypes.map((meal) =>
          meal.toLowerCase()
        );
        const desiredMeals = filters.mealTypes.map((meal) =>
          meal.toLowerCase()
        );
        if (!recipeMealsLower.some((meal) => desiredMeals.includes(meal))) {
          return false;
        }
      }

      //Diets filter
      if (
        filters.dietaryRestrictions &&
        filters.dietaryRestrictions.length > 0
      ) {
        const recipeDietsLower = recipe.dietaryRestrictions.map((diet) =>
          diet.toLowerCase()
        );
        const desiredDietsLower = filters.dietaryRestrictions.map((diet) =>
          diet.toLowerCase()
        );
        if (
          !recipeDietsLower.some((diet) => desiredDietsLower.includes(diet))
        ) {
          return false;
        }
      }
      //Country filter
      /*if (filters.cuisines && filters.cuisines.length > 0) {
        if (!filters.cuisines.includes(recipe.mealCountry)) {
          return false;
        }

      } */

      if (filters.cuisines && filters.cuisines.length > 0) {
        const cuisines = recipe.dietaryRestrictions.map((c) => c.toLowerCase());
        const desired = filters.dietaryRestrictions.map((d) => d.toLowerCase());
        if (!cuisines.some((c) => desired.includes(c))) {
          return false;
        }
      }

      //Has these ingredients
      /*  if (filters.ingredients && filters.ingredients.length > 0) {
        if (
          !filters.ingredients.every((ingredient) =>
            recipe.ingredients.includes(ingredient)
          )
        ) {
          return false;
        }
      } */

      //Excluded Ingredients
      /*if (
        filters.excludedingredients &&
        filters.excludedingredients.length > 0
      ) {
        if (
          filters.excludedingredients.some((ingredient) =>
            recipe.ingredients.some((i) => i.ingredient == ingredient)
          )
        ) {
          return false;
        }
      } */

      // Has these ingredients
      if (filters.ingredients && filters.ingredients.length > 0) {
        if (
          !filters.ingredients.every(
            (ingredient) =>
              recipe.ingredients.some(
                (i) => i.name.toLowerCase() === ingredient.toLowerCase()
              ) // Case-insensitive comparison
          )
        ) {
          return false;
        }
      }

      // Excluded Ingredients
      if (
        filters.excludedIngredients &&
        filters.excludedIngredients.length > 0
      ) {
        if (
          filters.excludedIngredients.some(
            (ingredient) =>
              recipe.ingredients.some(
                (i) => i.name.toLowerCase() === ingredient.toLowerCase()
              ) // Case-insensitive comparison
          )
        ) {
          return false;
        }
      }

      return true;
    });
    console.log("Newly filtered recipes (in the filter function)", newrep);
    return newrep;
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await RecipesAPI.deleteRecipe(id);
      setRefresh(!refresh);
    } catch (error) {
      console.log("error deleting recipe");
    }
  };
  return (
    <div id="discoverRecipes" className="regularPage">
      <h1>Discover Recipes</h1>
      <FilterBar onChange={handleFilterBarChange} />

      <div className="cardContainer">
        {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              name={recipe.name}
              id={recipe.id}
              img_url={recipe.img_url}
              instructions={recipe.instructions}
              deleteRecipe={() => deleteRecipe(recipe.id)}
            />
          ))
        ) : (
          <h2>No Recipes Published Yet!</h2>
        )}
      </div>
    </div>
  );
};

export default DiscoverRecipes;
