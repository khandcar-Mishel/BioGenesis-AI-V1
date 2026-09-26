/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RFdiffusionPage from "./pages/RFdiffusionPage";
import ScreeningPage from "./pages/ScreeningPage";
import MDSimulationPage from "./pages/MDSimulationPage";
import AboutPage from "./pages/AboutPage";
import RFdiffusionWorkspacePage from "./pages/RFdiffusionWorkspacePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rfdiffusion" element={<RFdiffusionPage />} />
        <Route path="/rfdiffusion/workspace" element={<RFdiffusionWorkspacePage />} />
        <Route path="/screening" element={<ScreeningPage />} />
        <Route path="/md-simulation" element={<MDSimulationPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
