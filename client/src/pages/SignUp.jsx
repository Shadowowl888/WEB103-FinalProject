import "../App.css";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="regularPage">
      <h1>Sign Up</h1>
      <Link to="/discover">
        <button>Sign In With GitHub</button>
      </Link>
    </div>
  );
};
export default SignUp;
