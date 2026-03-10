import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Articles } from "./pages/Articles";
import { Podcast } from "./pages/Podcast";
import { About } from "./pages/About";
import { LearnContent } from "./pages/LearnContent";
import { StartHere } from "./pages/StartHere";
import { Backlog } from "./pages/Backlog";
import { Dashboard } from "./pages/Dashboard";
import { Tools } from "./pages/Tools";
import { FreedomCalculator } from "./pages/FreedomCalculator";
import { PurchaseReviewer } from "./pages/PurchaseReviewer";
import { IntranetLayout } from "./pages/intranet/IntranetLayout";
import { IntranetHub } from "./pages/intranet/IntranetHub";
import { IntranetDesignSystem } from "./pages/intranet/IntranetDesignSystem";
import { IntranetArchitecture } from "./pages/intranet/IntranetArchitecture";
import { IntranetRoadmap } from "./pages/intranet/IntranetRoadmap";
import { IntranetPodcastScripts } from "./pages/intranet/IntranetPodcastScripts";
import { IntranetGuidelines } from "./pages/intranet/IntranetGuidelines";
import { IntranetCalculatorMath } from "./pages/intranet/IntranetCalculatorMath";
import { IntranetProductStrategy } from "./pages/intranet/IntranetProductStrategy";
import { IntranetEcosystem } from "./pages/intranet/IntranetEcosystem";
import { ForEarlyCareer } from "./pages/ForEarlyCareer";
import { ForHighEarners } from "./pages/ForHighEarners";
import { ForSpreadsheet } from "./pages/ForSpreadsheet";
import { ForLateBoomers } from "./pages/ForLateBoomers";
import { ForHighWealth } from "./pages/ForHighWealth";
import { ForInvestorPitch } from "./pages/ForInvestorPitch";
import { ForAccelerator } from "./pages/ForAccelerator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "articles", Component: Articles },
      { path: "podcast", Component: Podcast },
      { path: "about", Component: About },
      { path: "learn/:slug", Component: LearnContent },
      { path: "backlog", Component: Backlog },
      { path: "tools", Component: Tools },
      { path: "tools/freedom-calculator", Component: FreedomCalculator },
      { path: "tools/purchase-reviewer", Component: PurchaseReviewer },
      { path: "for/early-career", Component: ForEarlyCareer },
      { path: "for/high-earners", Component: ForHighEarners },
      { path: "for/spreadsheet", Component: ForSpreadsheet },
      { path: "for/late-boomers", Component: ForLateBoomers },
      { path: "for/accelerator", Component: ForAccelerator },
      { path: "for/high-wealth", Component: ForHighWealth },
      { path: "for/investor", Component: ForInvestorPitch },
    ],
  },
  {
    path: "/start",
    Component: StartHere,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/intranet",
    Component: IntranetLayout,
    children: [
      { index: true, Component: IntranetHub },
      { path: "design-system", Component: IntranetDesignSystem },
      { path: "architecture", Component: IntranetArchitecture },
      { path: "roadmap", Component: IntranetRoadmap },
      { path: "podcast-scripts", Component: IntranetPodcastScripts },
      { path: "guidelines", Component: IntranetGuidelines },
      { path: "calculator-math", Component: IntranetCalculatorMath },
      { path: "product-strategy", Component: IntranetProductStrategy },
      { path: "ecosystem", Component: IntranetEcosystem },
    ],
  },
]);