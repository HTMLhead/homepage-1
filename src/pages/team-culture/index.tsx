import React from "react";
// Theme
import GlobalTheme from "lib/context/GlobalTheme";
import GlobalHeader from "lib/context/GlobalHeader";
// Components
import { Footer, TeamGlobalNavigationBar } from "components";
import {
  TeamIntroduce,
  TeamCulture,
  TeamInterview,
  Welfare,
  RecruitLink,
} from "pageComponents/team-culture";

const TeamCulturePage: React.FC = () => {
  return (
    <GlobalTheme>
      <GlobalHeader />
      <main style={{ overflowX: "hidden" }}>
        <TeamGlobalNavigationBar />
        <TeamIntroduce />
        <TeamCulture />
        <TeamInterview />
        <Welfare />
        <RecruitLink />
        <Footer />
      </main>
    </GlobalTheme>
  );
};

export default TeamCulturePage;
