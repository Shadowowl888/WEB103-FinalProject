import React, {useState, useEffect} from "react";
import "../App.css";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";
import RecipesAPI from "../services/RecipesAPI";
import {useParams} from "react-router-dom"

/* 
WAITING FOR THE ENDPOINTS TO PASTE THESE BACK IN
      <h2>Recipe Type</h2>
      <select name="mealType" onChange={handleChange}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="dessert"> Dessert</option>
        <option value="snack">Snack</option>
        <option value="coffee">Coffee</option>
        <option value="cocktail">Cocktail</option>
        <option value="smoothie">Smoothies</option>
      </select>
      <h2>Suitable For Any Of These Diets?</h2>
      <details className="multi">
        <summary>Select</summary>
        <ul>
          <li>
            <label htmlFor="halal">Halal</label>
            <input
              type="checkbox"
              name="diets"
              value="halal"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="kosher">Kosher</label>
            <input
              type="checkbox"
              name="diets"
              value="kosher"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="diabetes">Diabetes</label>
            <input
              type="checkbox"
              name="diets"
              value="diabetes"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="vegan">Vegan</label>
            <input
              type="checkbox"
              name="diets"
              value="vegan"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="vegetarian">Vegetarian</label>
            <input
              type="checkbox"
              name="diets"
              value="vegetarian"
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <label htmlFor="pescatarian">Pescatarian</label>
            <input
              type="checkbox"
              name="diets"
              value="pescatarian"
              onChange={handleCheckboxChange}
            />
          </li>
        </ul>
      </details>
      <h2>Which culture is this dish from/ inspired from?</h2>
      <input type="text" name="mealCountry" onChange={handleChange} />

            <h2>Add Ingredients</h2>
      {recipe.ingredients.map((ingredient, index) => (
        <div>
        <input
          key={index}
          name="ingredients"
          type="text"
          onChange={(event) => handleChangeForMultipleInputs(event, index)}
        />
        <br />
        </div>
      ))}
      <br />
      <br />{" "}
      <button name="ingredients" onClick={addInputBox}>
        Add More
      </button>

*/

const EditRecipe = () => {

  const {id} = useParams();


  const [recipe, setRecipe] = useState({
    name: "Recipe",
    mealType: "",
    img_url: "",
    diets: [],
    mealCountry: "",
    ingredients: ["", "", "", "", ""],
    instructions: "",
  });

  const [oldRecipe, setOldRecipe] = useState({
    name: "",
    mealType: "",
    img_url: "",
    diets: [],
    mealCountry: "",
    ingredients: ["", "", "", "", ""],
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
    console.log("Checked?", checked);
    console.log("Name", name);
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
      const updatedInputs = [...prevRecipe[name]];
      updatedInputs[index] = value;

      return {
        ...prevRecipe,
        [name]: updatedInputs,
      };
    });
  };

  const addInputBox = (event) => {
    const { name } = event.target;
    setRecipe((prevRecipe) => {
      const newArray = [...prevRecipe[name]];
      newArray.push("")
      return {
        ...prevRecipe,
        [name]: newArray,
      };
    });
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

      <h2>Picture of Dish?</h2>
      <input type="text" name="img_url" onChange={handleChange} defaultValue={oldRecipe.img_url} />

      <h2>Steps to Prepare</h2>
      <textarea name="instructions" onChange={handleChange} defaultValue={oldRecipe.instructions}></textarea>
      <br /> <br />
      <button onClick={() => handleSubmit()}>Submit!</button>
    </div>
  );
};

export default EditRecipe;
