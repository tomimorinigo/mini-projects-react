/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


// Create a context to hold the filters
export const FiltersContext = createContext();

export function FiltersProvider({children}){
    const [filters, setFilters] = useState({
        category: "all",
        minPrice: 0
    });

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    );
}
