import React from "react";
// Libs
import { MESSAGE } from "assets/static/phrases";
import styled from "styled-components";
import { Link } from "gatsby";
import { Typography } from "typography";
import { EXTERNAL } from "assets/static/urls";
import { getCurrentPath } from "lib/utils";

const MobileNavigationList: React.FC<{
  links: { title: string; path: string }[];
  open: boolean;
}> = ({ links, open }) => {
  const currentPath = getCurrentPath();

  return (
    <NavigationListWrapper {...{ open }}>
      <ButtonList>
        {links.map(({ title, path }) => {
          const currentFirstPath = currentPath.split("/")[1];
          const firstPath = path.split("/")[1];

          return (
            <li key={title}>
              <LinkButton
                selected={currentPath === path || currentFirstPath === firstPath}
                to={path}
              >
                {title}
              </LinkButton>
            </li>
          );
        })}
      </ButtonList>
      <CompanyInfoWrapper>
        <Typography type="SBody">{MESSAGE.COPYRIGHT}</Typography>
        <div>
          <Typography type="SBody">{MESSAGE.COMPANY_EMAIL}</Typography>
          <ExternalLink
            href={`mailto:${EXTERNAL.EMAIL}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            underline
          >
            {MESSAGE.COMPANY_EMAIL_ADDRESS}
          </ExternalLink>
        </div>
        <Typography type="SBody">{MESSAGE.COMPANY_TEL_NUMBER}</Typography>
        <Typography type="SBody">{MESSAGE.COMPANY_ADDRESS}</Typography>
      </CompanyInfoWrapper>
    </NavigationListWrapper>
  );
};

const NavigationListWrapper = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  z-index: 10;
  width: 100vw;
  height: ${({ open }) => (open ? "calc(100vh - 6.2rem)" : "0")};
  overflow: hidden;
  position: fixed;
  top: 6.2rem;
  right: 0;
  background-color: ${({ theme: { color } }) => color.white};
`;

const ButtonList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 8rem 0 18.9rem 0;
  padding: 0 2.4rem;
  & > *:not(:last-child) {
    margin-bottom: 2.4rem;
  }
`;

const ExternalLink = styled.a<{ underline?: boolean }>`
  color: ${({ theme: { color } }) => color.greyScale.grey3};
  text-decoration: none;
  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
  &:hover {
    text-decoration: underline;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme: { fontSize } }) => fontSize.body.sm};
  }
  @media ${({ theme }) => theme.device.desktop} {
    color: ${({ theme: { color } }) => color.white};
    font-size: ${({ theme: { fontSize } }) => fontSize.body.xs};
  }
`;

const LinkButton = styled(Link)<{ selected?: boolean }>`
  color: ${({ theme: { color } }) => color.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.bold.xl};
  font-weight: ${({ selected, theme: { fontWeight } }) =>
    selected ? fontWeight.medium : fontWeight.regular};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.body.sm};
  letter-spacing: ${({ theme: { letterSpacing } }) => letterSpacing};
  text-decoration: ${({ selected }) => (selected ? "underline" : "none")};
  &:hover {
    text-decoration: underline;
  }
`;

const CompanyInfoWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export default MobileNavigationList;
