import { useContext, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer";
import { FiltersContext } from "./context/filters";

function useFilters() {
  
  const {filters, setFilters} = useContext(FiltersContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        (filters.category === "all" || product.category === filters.category) &&
        product.price >= filters.minPrice
      );
    });
  };

  return { filters, filterProducts, setFilters };
}

function App() {
  const [products, setProducts] = useState([]);
  const {filters, filterProducts, setFilters } = useFilters();
  const filteredProducts = filterProducts(products);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <>
      <Header changeFilters={setFilters}/>
      <Products products={filteredProducts} />
      <Footer filters={filters}/>
    </>
  );
}

export default App;
