import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Navigation from "./components/Navigation";
import "./App.css";
import DiscoverRecipes from "./pages/DiscoverRecipes";
import NewRecipe from "./pages/NewRecipe";
import ViewProfile from "./pages/ViewProfile";
import ViewRecipe from "./pages/ViewRecipe";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EditRecipe from "./pages/EditRecipe";
import { FilterProvider } from "./context/FilterContext.jsx";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useRoutes,
} from "react-router-dom";

function App() {
  //once i make all the pages fix the routes
  return (
    <FilterProvider>
      <Router>
        <div className="app">
          <Navigation />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/discover" element={<DiscoverRecipes />} />
            <Route path="/view" element={<LandingPage />} />
            <Route path="/me" element={<ViewProfile />} />
            <Route path="/new" element={<NewRecipe />} />
            <Route path="/viewRecipe/:id" element={<ViewRecipe />} />
            <Route path="/editRecipe/:id" element={<EditRecipe
            />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </FilterProvider>
  );
}

export default App;
