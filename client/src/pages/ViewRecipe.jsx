import "../App.css";
import CommentCard from "../components/CommentCard";
const ViewRecipe = () => {
  return (
    <div className="regularPage">
      <h1>French Toast</h1>
      <p>By: breakfastenthusiast123</p>
      <p>Meal Type: Breakfast</p>
      <p>American</p>
      <p>Suitable For: Halal, Vegetarian</p>
      <img src="https://www.mccormick.com/-/media/project/oneweb/mccormick-us/mccormick/recipe-images/quick_and_easy_french_toast_new_800x800.webp?rev=ee6ad2bb4e784ae3b47792fe1567e606&vd=20240606T181333Z&extension=webp&hash=239069BA7916AD55FF124E6E65F4C335" />
      <p>Long yapping description about the meal</p>
      <h2>Ingredients</h2>
      <ul>
        <li>2 eggs</li>
        <li>1 cup milk</li>
        <li>cinnamon</li>
        <li>fruit</li>
        <li>bread</li>
      </ul>
      <h2>Steps to Prepare</h2>
      <ol>
        <li>Mix eggs with milk</li>
        <li>Soak eggs in mixture</li>
        <li>Cook</li>
        <li>Add toppings and serve</li>
      </ol>
      <h2>Reviews</h2>
      <div id="reviewsContainer">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <h2>Write Your Own Review!</h2>
      <div className="commentCard">
      <form>
        <h3>Review Title</h3> 
        <input type="text" /> 
        <h3> Select How Many Stars </h3> 
        <h3>Give your feedback!</h3>
        <textarea></textarea>
        <br />
        <button>Submit Review</button>
      </form>
      </div>
      </div>

    </div>
  );
};
export default ViewRecipe;
