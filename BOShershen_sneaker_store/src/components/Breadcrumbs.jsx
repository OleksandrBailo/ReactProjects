import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const isProductPage =
    pathnames.length === 2 && /^[0-9a-fA-F-]{6,}$/.test(pathnames[1]); // наприклад: /nike/123abc

  const isBrandPage = pathnames.length === 1;

  return (
    <nav>
      <ul className="breadcrumbsUL">
        <li>
          <Link to="/">Home</Link>
        </li>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const name = decodeURIComponent(value);

          if (isProductPage && isLast) return null;

          if (isBrandPage && isLast) {
            return <li key={to}> / {name}</li>;
          }

          return (
            <li key={to}>
              / <Link to={to}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
