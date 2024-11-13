import "../App.css";
import "../css/RecipeCard.css";
import { Outlet, Link } from "react-router-dom";

const RecipeCard = (props) => {
  return (
    <div className="card">
      <h2>{props.name}</h2>

      <img src={props.picUrl} />
      <p>Meal Type: {props.mealType}</p>
      <p>{props.mealCountry}</p>

      <p>Suitable For: {props.diets} </p>
      <Link to={`/viewRecipe/${props.id}`}>
        <button>View</button>
      </Link>
      <Link to={`/editRecipe/${props.id}`}>
        <button>Edit</button>
      </Link>
        <button>Delete</button>
    </div>
  );
};
export default RecipeCard;
