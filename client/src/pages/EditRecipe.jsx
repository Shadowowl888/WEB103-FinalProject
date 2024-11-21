import React, {useState, useEffect} from "react";
import "../App.css";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";
import RecipesAPI from "../services/RecipesAPI";
import {useParams} from "react-router-dom"

const EditRecipe = () => {

  const {id} = useParams();


  const [recipe, setRecipe] = useState({
    name: "Recipe",
    mealTypes: [],
    img_url: "https://images.pexels.com/photos/1907642/pexels-photo-1907642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    dietaryRestrictions: [],
    cuisines: [],
    ingredients: [
      {
        name: "",
        quantity: 0,
        unit: "items",
      }
    ],
    instructions: "",
  });

  const [oldRecipe, setOldRecipe] = useState({
    name: "",
    mealTypes: [],
    img_url: "",
    dietaryRestrictions: [],
    cuisines: [],
    ingredients: [
      {
        name: "",
        quantity: 0,
        unit: "items",
      }
    ],
    instructions: "",
  });


  useEffect(() => {
    (async() => {
      try {
        const recipeData = await RecipesAPI.getRecipeById(id);
        setOldRecipe(recipeData)
        setRecipe(recipeData)
      } catch (error){
        throw error
      }
    })();
  }, [])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {

    const { name, value, checked } = event.target;
    console.log("Name:", name, "Value:", value, "Checked:", checked);  // Debugging output
    console.log("recipe currently is", recipe)
    if (checked) {
      //Add the newly checked item to the array
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: [...prevRecipe[name], value],
      }));
    } else {
      //Need to remove the unchecked thing
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: [...prevRecipe[name].filter((item) => item !== value)],
      }));
    }
  };

  const handleChangeForMultipleInputs = (event, index) => {
    //Need to add the newest input to the list
    //Need to set the index of the line to be the new input
    const { name, value } = event.target;
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [name]: value,
      };

      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };

  const addInputBox = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, { name: "", quantity: 0, unit: "items" }],
    }));
  };


  const handleSubmit = async(event) => {
    console.log("Recipe is", recipe);
    //Todo: need to push to database
    try{
      //Also need to call the API for the other services 
      await RecipesAPI.updateRecipe(id, recipe);
      window.location = "../discover"

    } catch (error){
      console.error("Error pushing to database", error)
    }
  };
  return (
    <div id="newRecipes" className="regularPage">
      <h1>Edit Recipe</h1>
      <h2>Recipe Name</h2>
      <input type="text" name="name" onChange={handleChange} defaultValue={oldRecipe.name} />
      <h2>Recipe Type</h2>
      <details className="multi">
        <summary>Meal Types</summary>
        <ul>
          <li>
            <label htmlFor="breakfast">Breakfast</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="breakfast"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="lunch">Lunch</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="lunch"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="dinner">Dinner</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="dinner"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="dessert">Dessert</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="dessert"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="snack">Snack</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="snack"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="coffee">Coffee</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="coffee"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="cocktail">Cocktail</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="cocktail"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="smoothie">Smoothie</label>
            <input
              type="checkbox"
              name="mealTypes"
              value="smoothie"
              onChange={handleCheckboxChange}
            />
          </li>
        </ul>
      </details>
      <h2>Suitable For Any Of These Diets?</h2>
      <details className="multi">
        <summary>Select</summary>
        <ul>
          <li>
            <label htmlFor="halal">Halal</label>
            <input
              type="checkbox"
              name="dietaryRestrictions"
              value="halal"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="kosher">Kosher</label>
            <input
              type="checkbox"
              name="dietaryRestrictions"
              value="kosher"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="diabetes">Diabetes</label>
            <input
              type="checkbox"
              name="dietaryRestrictions"
              value="diabetes"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="vegan">Vegan</label>
            <input
              type="checkbox"
              name="dietaryRestrictions"
              value="vegan"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="vegetarian">Vegetarian</label>
            <input
              type="checkbox"
              name="dietaryRestrictions"
              value="vegetarian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="pescatarian">Pescatarian</label>
            <input
              type="checkbox"
              name="dietaryRestrictions"
              value="pescatarian"
              onChange={handleCheckboxChange}
            />
          </li>
        </ul>
      </details>
      <h2>Cusine Styles</h2>
      <details className="multi">
        <summary>Cuisines</summary>
        <ul>
          <li>
            <label htmlFor="argentinian">Argentinian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="argentinian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="australian">Australian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="australian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="brazilian">Brazilian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="brazilian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="canadian">Canadian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="canadian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="chinese">Chinese</label>
            <input
              type="checkbox"
              name="cuisines"
              value="chinese"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="egyptian">Egyptian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="egyptian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="french">French</label>
            <input
              type="checkbox"
              name="cuisines"
              value="french"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="german">German</label>
            <input
              type="checkbox"
              name="cuisines"
              value="german"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="greek">Greek</label>
            <input
              type="checkbox"
              name="cuisines"
              value="greek"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="indian">Indian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="indian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="indonesian">Indonesian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="indonesian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="italian">Italian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="italian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="japanese">Japanese</label>
            <input
              type="checkbox"
              name="cuisines"
              value="japanese"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="korean">Korean</label>
            <input
              type="checkbox"
              name="cuisines"
              value="korean"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="mexican">Mexican</label>
            <input
              type="checkbox"
              name="cuisines"
              value="mexican"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="moroccan">Moroccan</label>
            <input
              type="checkbox"
              name="cuisines"
              value="moroccan"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="nigerian">Nigerian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="nigerian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="pakistani">Pakistani</label>
            <input
              type="checkbox"
              name="cuisines"
              value="pakistani"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="peruvian">Peruvian</label>
            <input
              type="checkbox"
              name="cuisines"
              value="peruvian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="spanish">Spanish</label>
            <input
              type="checkbox"
              name="cuisines"
              value="spanish"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="swedish">Swedish</label>
            <input
              type="checkbox"
              name="cuisines"
              value="swedish"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="thai">Thai</label>
            <input
              type="checkbox"
              name="cuisines"
              value="thai"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="turkish">Turkish</label>
            <input
              type="checkbox"
              name="cuisines"
              value="turkish"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="vietnamese">Vietnamese</label>
            <input
              type="checkbox"
              name="cuisines"
              value="vietnamese"
              onChange={handleCheckboxChange}
            />
          </li>
        </ul>
      </details>

      <h2>Picture of Dish?</h2>
      <input type="text" name="img_url" onChange={handleChange} defaultValue={oldRecipe.img_url} />
      <h2>Add Ingredients</h2>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index}>
          <p>Ingredient Quantity</p>
          <input
            name="quantity"
            type="number"
            onChange={(event) => handleChangeForMultipleInputs(event, index)}
          />
          <p>Unit</p>
          <input
            name="unit"
            type="text"
            onChange={(event) => handleChangeForMultipleInputs(event, index)}
          />
          <p>Ingredient Name</p>
          <input
            name="name"
            type="text"
            onChange={(event) => handleChangeForMultipleInputs(event, index)}
          />
          <p></p>
          <br />
        </div>
      ))}
      <br />
      <br />{" "}
      <button name="ingredients" onClick={addInputBox}>
        Add More
      </button>
      <h2>Steps to Prepare</h2>
      <textarea name="instructions" onChange={handleChange} defaultValue={oldRecipe.instructions}></textarea>
      <br /> <br />
      <button onClick={() => handleSubmit()}>Submit!</button>
    </div>
  );
};

export default EditRecipe;
