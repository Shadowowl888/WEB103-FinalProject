import { useState, useEffect, useContext } from "react";
import "../App.css";
import FilterBar from "../components/FilterBar";
import RecipeCard from "../components/RecipeCard";
import recipeData from "../../dummyRecipes";
import { FilterContext } from "../context/FilterContext";

const DiscoverRecipes = (props) => {
  const { data: recipes } = recipeData;
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { selectedFilters, setSelectedFilters } = useContext(FilterContext);

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
      if (filters.meals && filters.meals.length > 0) {
        if (!filters.meals.includes(recipe.mealType)) {
          return false;
        }
      }

      //Diets filter
      if (filters.diets && filters.diets.length > 0) {
        const recipeDietsLower = recipe.diets.map((diet) => diet.toLowerCase());
        const desiredDietsLower = filters.diets.map((diet) =>
          diet.toLowerCase()
        );
        if (
          !recipeDietsLower.some((diet) => desiredDietsLower.includes(diet))
        ) {
          return false;
        }
      }
      //Country filter
      if (filters.cuisines && filters.cuisines.length > 0) {
        if (!filters.cuisines.includes(recipe.mealCountry)) {
          return false;
        }
      }
      //Has these ingredients
      if (filters.ingredients && filters.ingredients.length > 0) {
        if (
          !filters.ingredients.every((ingredient) =>
            recipe.ingredients.includes(ingredient)
          )
        ) {
          return false;
        }
      }

      //Excluded Ingredients
      if (
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
      }

      return true;
    });
    console.log("Newly filtered recipes (in the filter function)", newrep);
    return newrep;
  };

  useEffect(() => {
    if (allFiltersDefault()) {
      setFilteredRecipes(recipeData);
    } else {
      const newlyFilteredRecipes = applyFilters(recipeData, selectedFilters);
      setFilteredRecipes(newlyFilteredRecipes);
    }
  }, [recipes, selectedFilters]);

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
              rating={recipe.rating}
              picUrl={recipe.picUrl}
              mealType={recipe.mealType}
              mealCountry={recipe.mealCountry}
              ingredients={recipe.ingredients}
              diets={recipe.diets}
              preparationSteps={recipe.preparationSteps}
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
