import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    meals: [],
    ingredients: [],
    excludedingredients: [],
    diets: [],
    cuisines: [],
  });

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
