import React, { Suspense, useEffect, useState } from "react";

import { data as details } from "./data";
import UseStructure from "./hooks/useStructure";
import { Route, Routes } from "react-router-dom";
import "./styles.scss";
const FixtureList = React.lazy(() => import("./components/FixtureList"));
const LeagueTable = React.lazy(() => import("./components/LeagueTable"));

export default function App() {
  const { res } = UseStructure(details);
  console.log("res", res);

  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<LeagueTable data={res} />} />
          <Route
            path="/fixtures"
            element={<FixtureList data={res} details={details} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}
