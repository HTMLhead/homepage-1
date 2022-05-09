import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
// Assets
import companyLogo from "assets/images/logos/TeamSignature.svg";
// Static
import { LINK } from "assets/static/phrases";
import { INTERNAL } from "assets/static/urls";
// Utils
import { getCurrentPath } from "lib/utils";
// Libs
import { useScrollPosition } from "lib/hooks";

const TeamGlobalNavigationBar: React.FC = () => {
  const currentPath = getCurrentPath();
  const links = [
    {
      title: LINK.TEAM_CULTURE,
      path: INTERNAL.TEAM_CULTURE,
    },
    {
      title: LINK.RECRUIT,
      path: INTERNAL.RECRUIT,
    },
  ];

  const scrollPosition = useScrollPosition();

  return (
    <TeamGlobalNavigationBarWrapper {...{ scrollPosition }}>
      <ContentWrapper>
        <Link to="/">
          <TeamSigniture src={companyLogo} alt="company-logo" />
        </Link>
        <ButtonList>
          {links.map(({ title, path }: any) => (
            <li key={title}>
              <LinkButton selected={currentPath === path} to={path}>
                {title}
              </LinkButton>
            </li>
          ))}
        </ButtonList>
      </ContentWrapper>
    </TeamGlobalNavigationBarWrapper>
  );
};

const TeamGlobalNavigationBarWrapper = styled.header<{ scrollPosition: boolean }>`
  width: 100%;
  min-width: 144rem;
  min-height: 8rem;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 10;
  background-color: red;
  background-color: ${({ scrollPosition, theme: { color } }) =>
    scrollPosition ? color.greyScale.white : "transparent"};
  transition: background-color 0.15s linear;
`;

const ContentWrapper = styled.nav`
  min-width: 126rem;
  min-height: 8rem;
  padding: 0 8rem;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamSigniture = styled.img`
  min-width: 20.2rem;
  min-height: 3rem;
`;

const ButtonList = styled.ul`
  min-width: 12.5rem;
  min-height: 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkButton = styled(Link)<{ selected?: boolean }>`
  color: ${({ theme: { color } }) => color.greyScale.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.body.sm};
  font-weight: ${({ selected, theme: { fontWeight } }) =>
    selected ? fontWeight.medium : fontWeight.regular};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.body.sm};
  letter-spacing: ${({ theme: { letterSpacing } }) => letterSpacing};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default TeamGlobalNavigationBar;
