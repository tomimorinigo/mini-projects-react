import { Link } from "../components/Link";

function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Esta es un apagina de ejemlpo para crear un react router desde cero</p>
      <Link to='/about'>Ir a ABOUT</Link>
    </>
  );
}

export default Home;
