import React from "react";
// Theme
import GlobalTheme from "lib/context/GlobalTheme";
import GlobalHeader from "lib/context/GlobalHeader";
// Components
import { HomeGlobalNavigationBar, Footer } from "components/";
import { Masthead, Feature, StudyFeature, Course } from "pageComponents/code-together";

const CodeTogetherPage: React.FC = () => {
  return (
    <GlobalTheme>
      <GlobalHeader />
      <main style={{ overflowX: "hidden" }}>
        <HomeGlobalNavigationBar />
        <Masthead />
        <Feature />
        <StudyFeature />
        <Course />
        <Footer />
      </main>
    </GlobalTheme>
  );
};

export default CodeTogetherPage;
