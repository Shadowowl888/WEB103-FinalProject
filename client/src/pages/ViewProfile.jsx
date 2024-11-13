import "../App.css";
import RecipeCard from "../components/RecipeCard";

const ViewProfile = () => {
  return (
    <div className="regularPage">
      <h1>My Profile</h1>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
      <p>user123</p>
      <h3>My Recipes</h3>
      <div className="recipeContainer">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
      <h3>Saved Recipes</h3>
      <div className="recipeContainer">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />

      </div>
    </div>
  );
};
export default ViewProfile;
