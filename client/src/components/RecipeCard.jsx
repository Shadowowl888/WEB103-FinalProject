import "../App.css";
import "../css/RecipeCard.css";
import { Outlet, Link } from "react-router-dom";

const RecipeCard = (props) => {

  /* 
    PASTE BACK THESE ELEMENTS ONCE I GET THE OTHER ENDPOINTS
      <p>Meal Type: {props.mealType}</p>
      <p>{props.mealCountry}</p>
      <p>Suitable For: {props.diets} </p>


  
  */
  return (
    <div className="card">
      <h2>{props.name}</h2>

      <img src={props.img_url} />

      <p>{props.instructions}</p>

      <Link to={`/viewRecipe/${props.id}`}>
        <button>View</button>
      </Link>
      <Link to={`/editRecipe/${props.id}`}>
        <button>Edit</button>
      </Link>
        <button onClick={props.deleteRecipe}>Delete</button>
    </div>
  );
};
export default RecipeCard;
