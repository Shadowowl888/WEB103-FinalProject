import React from "react";
import "../App.css";
import FilterBar from "../components/FilterBar";

const NewRecipe = () => {
  return (
    <div id="newRecipes" className="regularPage">
      <h1>New Recipe</h1>

      <form>
        <h2>Recipe Name</h2>
        <input type="text" />
        <h2>Recipe Type</h2>
        <details className="multi">
          <summary>Choose</summary>
          <ul>
            <li>
              <label for="breakfast">Breakfast</label>
              <input type="checkbox" name="meals[]" value="breakfast" />
            </li>
            <li>
              <label for="lunch">Lunch</label>
              <input type="checkbox" name="meals[]" value="lunch" />
            </li>
            <li>
              <label for="dinner">Dinner</label>
              <input type="checkbox" name="meals[]" value="dinner" />
            </li>
            <li>
              <label for="dessert">Dessert</label>
              <input type="checkbox" name="meals[]" value="dessert" />
            </li>
            <li>
              <label for="snacks">Snacks</label>
              <input type="checkbox" name="meals[]" value="snacks" />
            </li>
            <li>
              <label for="coffee">Coffee</label>
              <input type="checkbox" name="meals[]" value="coffee" />
            </li>
            <li>
              <label for="cocktails">Cocktails</label>
              <input type="checkbox" name="meals[]" value="cocktails" />
            </li>
            <li>
              <label for="smoothies">Smoothies</label>
              <input type="checkbox" name="meals[]" value="smoothies" />
            </li>
          </ul>
        </details>
        <h2>Suitable For Any Of These Diets?</h2>
        <details className="multi">
          <summary>Select</summary>
          <ul>
            <li>
              <label for="halal">Halal</label>
              <input type="checkbox" name="diets[]" value="halal" />
            </li>
            <li>
              <label for="kosher">Kosher</label>
              <input type="checkbox" name="diets[]" value="kosher" />
            </li>
            <li>
              <label for="diabetes">Diabetes</label>
              <input type="checkbox" name="diets[]" value="diabetes" />
            </li>
            <li>
              <label for="vegan">Vegan</label>
              <input type="checkbox" name="diets[]" value="vegan" />
            </li>
            <li>
              <label for="vegetarian">Vegetarian</label>
              <input type="checkbox" name="diets[]" value="vegetarian" />
            </li>
            <li>
              <label for="pescatarian">Pescatarian</label>
              <input type="checkbox" name="diets[]" value="pescatarian" />
            </li>
          </ul>
        </details>
        <h2>Which culture is this dish from/ inspired from?</h2>
        <input type="text" />
        <h2>Recipe Description</h2>
        <textarea>

        </textarea>
        <h2>Picture of Dish?</h2>
        <input type="text" />

        <h2>Add Ingredients</h2>
        <input type="text" /> <br />
        <input type="text" /> <br />
        <input type="text" /> <br />
        <input type="text" /> <br />
        <input type="text" /> <br />
        <br /> <button>Add More</button>

        <h2>Steps to Prepare</h2>
        <input type="text" /> <br />
        <input type="text" /> <br />
        <input type="text" /> <br />
        <input type="text" /> <br />
        <input type="text" /> <br />
        <br /> <button>Add More</button>

        <br /> <br /><button>
            Submit!
        </button>
      </form>
    </div>
  );
};

export default NewRecipe;
