import React, { lazy } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const ItemsPage = lazy(() => import("./pages/itemsPage/ItemsPage"));
const Categories = lazy(() => import("./pages/categoriesPage/Categories"));
const Articles = lazy(() => import("./pages/articlesPage/Articles"));
const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {/* <Sidebar /> */}
                <Categories />
              </React.Suspense>
            }
          />
          <Route
            path="/categories"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Categories />
              </React.Suspense>
            }
          />

          <Route
            path="/articles"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Articles />
              </React.Suspense>
            }
          />

          <Route
            path="/items"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ItemsPage />
              </React.Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
