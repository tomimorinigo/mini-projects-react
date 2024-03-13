import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Page404 from "./pages/404";
import Router from "./components/Router";
import Route from "./components/Route";

function App() {
  return(
    <main>
      <Router defaultComponent={Page404}>
        <Route path='/' Component={Home} />
        <Route path='/about' Component={About} />
      </Router>
    </main>
  );
}

export default App;
