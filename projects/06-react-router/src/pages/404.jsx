import { Link } from "../components/Link";

function Page404() {
  return (
    <>
      <div>
        <h1>This is NOT fine (404)</h1>
        <img
          src="https://midu.dev/images/this-is-fine-404.gif"
          alt="Gif del perro This is Fine"
        />
      </div>
      <Link to="/">Volver a un lugar seguro</Link>
    </>
  );
}

export default Page404;
