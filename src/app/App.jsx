import React from "react";
import { Routes, Route } from "react-router-dom";
import AmericanGuardianLanding from "./AmericanGuardianLanding";
import Apply from "../pages/Apply";
import Onboarding from "../pages/Onboarding";
import Medical from "../pages/Medical";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AmericanGuardianLanding />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/medical" element={<Medical />} />
    </Routes>
  );
}

