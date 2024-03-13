/* eslint-disable react/prop-types */
import { Children, useEffect, useState } from "react";
import { EVENTS } from "../utils/consts.js";
import { match } from "path-to-regexp";

export default function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const url = window.location.pathname;
  const [currentPath, setCurrentPath] = useState(url);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  const routesFromChildren = Children.map(children, ({ props, type}) => {
    if (type.name !== "Route") return null;

    return props;
  });

  const routesToUse = routes.concat(routesFromChildren);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherURL = match(path, { decode: decodeURIComponent });
    const result = matcherURL(currentPath);

    if(!result) return false;

    routeParams = result.params;
    return true;
  })?.component;

  return Page ? <Page routeParams={routeParams}/> : <DefaultComponent routeParams={routeParams}/>;
}
