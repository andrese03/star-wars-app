import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// const a = React.lazy(() => import('./pages/Home').then(({ Home }) => ({default: Home}))

const Home = React.lazy(() => import("./pages/Home"));
const People = React.lazy(() => import("./pages/People"));
const Person = React.lazy(() => import("./pages/Person"));
const Films = React.lazy(() => import("./pages/Films"));
const Film = React.lazy(() => import("./pages/Film"));
const Planets = React.lazy(() => import("./pages/Planets"));
const Planet = React.lazy(() => import("./pages/Planet"));

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<Person />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<Film />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:id" element={<Planet />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
