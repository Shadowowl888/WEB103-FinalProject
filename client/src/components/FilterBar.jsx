import "../css/FilterBar.css";
import { useState, useContext } from "react";
import { FilterContext } from "../context/FilterContext.jsx";
const FilterBar = ({onChange}) => {
  const { selectedFilters, setSelectedFilters } = useContext(FilterContext);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSelectedFilters((prevFilters) => {
      const filterCategory = name.replace("[]", "");

      const updatedCategory = checked
        ? [...prevFilters[filterCategory], value]
        : prevFilters[filterCategory].filter((item) => item !== value);

      const newFilters =  { ...prevFilters, [filterCategory]: updatedCategory };
        
      onChange(newFilters)

      console.log("Updated filters (we are in the filterbar)", newFilters)
      return newFilters;
    
    });
  };
  return (
    <ul id="filter-bar">
      <li>
        <details className="multi">
          <summary>Meal Types</summary>
          <ul>
            <li>
              <label htmlFor="breakfast">Breakfast</label>
              <input
                type="checkbox"
                name="meals[]"
                value="breakfast"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="lunch">Lunch</label>
              <input
                type="checkbox"
                name="meals[]"
                value="lunch"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="dinner">Dinner</label>
              <input
                type="checkbox"
                name="meals[]"
                value="dinner"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="dessert">Dessert</label>
              <input
                type="checkbox"
                name="meals[]"
                value="dessert"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="snacks">Snacks</label>
              <input
                type="checkbox"
                name="meals[]"
                value="snacks"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="coffee">Coffee</label>
              <input
                type="checkbox"
                name="meals[]"
                value="coffee"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="cocktails">Cocktails</label>
              <input
                type="checkbox"
                name="meals[]"
                value="cocktails"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="smoothies">Smoothies</label>
              <input
                type="checkbox"
                name="meals[]"
                value="smoothies"
                onChange={handleChange}
              />
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details className="multi">
          <summary>Include These Ingredients</summary>
          <ul>
            <li>
              <label htmlFor="fruit">Fruit</label>
              <input
                type="checkbox"
                name="ingredients[]"
                value="fruit"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="beef">Beef</label>
              <input
                type="checkbox"
                name="ingredients[]"
                value="beef"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="sugar">Sugar</label>
              <input
                type="checkbox"
                name="ingredients[]"
                value="sugar"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="chicken">Chicken</label>
              <input
                type="checkbox"
                name="ingredients[]"
                value="chicken"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="pork">Pork</label>
              <input
                type="checkbox"
                name="ingredients[]"
                value="pork"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="fruit">Fruit</label>
              <input
                type="checkbox"
                name="ingredients[]"
                value="fruit"
                onChange={handleChange}
              />
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details className="multi">
          <summary>Don't Show Me Recipes With</summary>
          <ul>
            <li>
              <label htmlFor="fruit">Fruit</label>
              <input
                type="checkbox"
                name="excludedIngredients[]"
                value="fruit"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="beef">Beef</label>
              <input
                type="checkbox"
                name="excludedIngredients[]"
                value="beef"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="sugar">Sugar</label>
              <input
                type="checkbox"
                name="excludedIngredients[]"
                value="sugar"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="chicken">Chicken</label>
              <input
                type="checkbox"
                name="excludedIngredients[]"
                value="chicken"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="pork">Pork</label>
              <input
                type="checkbox"
                name="excludedIngredients[]"
                value="pork"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="fruit">Fruit</label>
              <input
                type="checkbox"
                name="excludedIngredients[]"
                value="fruit"
                onChange={handleChange}
              />
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details className="multi">
          <summary>Dietary Restrictions</summary>
          <ul>
            <li>
              <label htmlFor="halal">Halal</label>
              <input
                type="checkbox"
                name="diets[]"
                value="halal"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="kosher">Kosher</label>
              <input
                type="checkbox"
                name="diets[]"
                value="kosher"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="diabetes">Diabetes</label>
              <input
                type="checkbox"
                name="diets[]"
                value="diabetes"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="vegan">Vegan</label>
              <input
                type="checkbox"
                name="diets[]"
                value="vegan"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="vegetarian">Vegetarian</label>
              <input
                type="checkbox"
                name="diets[]"
                value="vegetarian"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="pescatarian">Pescatarian</label>
              <input
                type="checkbox"
                name="diets[]"
                value="pescatarian"
                onChange={handleChange}
              />
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details className="multi">
          <summary>Cultural Cuisines</summary>
          <ul>
            <li>
              <label htmlFor="argentinian">Argentinian</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="argentinian"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="chinese">Chinese</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="chinese"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="french">French</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="french"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="greek">Greek</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="greek"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="indian">Indian</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="indian"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="italian">Italian</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="italian"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="korean">Korean</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="korean"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="mexican">Mexican</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="mexican"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="moroccan">Moroccan</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="moroccan"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="Peruvian">Peruvian</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="peruvian"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="thai">Thai</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="thai"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="vietnamese">Vietnamese</label>
              <input
                type="checkbox"
                name="cuisines[]"
                value="vietnamese"
                onChange={handleChange}
              />
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};
export default FilterBar;
