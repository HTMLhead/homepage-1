import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
// Typography
import { MBody, MDisplay } from "typography";
// Components
import { InfoItem } from "./InfoItem";
// Assets
import header from "assets/img/illusts/header";
import icons from "assets/img/icons";
import { TITLE } from "assets/static/phrases";
// Lib
import { strainMdxInfo } from "lib/utils";

const Masthead: React.FC = () => {
  const { title, description, targets, trainingDuration, cost } = strainMdxInfo(
    useStaticQuery(MastheadQuery)
  );

  return (
    <MastheadWrapper>
      <TitleWrapper>
        <MDisplay>{title}</MDisplay>
        <MBody style={{ whiteSpace: "pre-line" }}>{description}</MBody>
      </TitleWrapper>
      <CourseInfoWrapper>
        <TargetWrapper>
          <TargetTitle>
            <img src={icons.member} style={{ marginRight: ".8rem" }} />
            <MBody bold>{TITLE.EDUCATION_TARGET}</MBody>
          </TargetTitle>
          {targets.map((target: string) => (
            <TargetItem key={target}>
              <MBody>{target}</MBody>
            </TargetItem>
          ))}
        </TargetWrapper>
        <InfoItemWrapper>
          <InfoItem
            src={icons.calander}
            label={TITLE.EDUCATION_PERIOD}
            content={trainingDuration}
          />
          <InfoItem src={icons.coin} label={TITLE.COST} content={cost} />
        </InfoItemWrapper>
      </CourseInfoWrapper>
    </MastheadWrapper>
  );
};

const MastheadWrapper = styled.div`
  width: 100%;
  min-width: 144rem;
  padding: 16rem 0 7.2rem 0;
  display: flex;
  align-items: center;
  background-color: ${({ theme: { color } }) => color.primary.green4};
  background-image: ${`url(${header.mastersCourse})`};
  background-repeat: no-repeat;
  background-position: center;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  min-width: 106.2rem;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 2.4rem;
  }
  & > *:last-child {
    width: 50%;
  }
`;

const CourseInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 106.2rem;
  margin-top: 4rem;
`;

const TargetTitle = styled.h4`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;
const TargetWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  list-style: disc;
`;
const TargetItem = styled.li`
  &:before {
    unicode-bidi: isolate;
    font-variant-numeric: tabular-nums;
    text-transform: none;
    text-indent: 0px !important;
    text-align: start !important;
    text-align-last: start !important;
  }
  margin-top: 0.8rem;
  margin-left: 2.4rem;
`;

const InfoItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: "wrap";
`;

const MastheadQuery = graphql`
  query MastheadQuery {
    mdx(frontmatter: { templateKey: { eq: "masters_masthead" } }) {
      frontmatter {
        title
        description
        targets
        trainingDuration
        cost
      }
    }
  }
`;

export default Masthead;
