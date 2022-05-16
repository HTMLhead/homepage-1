import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
// Type
import { RefundPolicyType } from "@type/RefundPolicy";
// Typography
import { LDisplay, MBody } from "typography";
// Assets
import { DESCRIPTION, TITLE } from "assets/static/phrases";

const RefundPolicy: React.FC = () => {
  const data = useStaticQuery(RefundPolicyQuery);
  const { mdx } = data;
  const { frontmatter } = mdx;
  const { policies }: { policies: RefundPolicyType[] } = frontmatter;
  const { updated }: { updated: string } = frontmatter;

  return (
    <RefundPolicyWrapper>
      <LDisplay style={{ paddingTop: "16rem" }}>{TITLE.REFUND_POLICY}</LDisplay>
      <PolicySpecificationWrapper>
        <MBody style={{ paddingBottom: "4rem" }}>{updated}</MBody>
        <div style={{ paddingBottom: "1.6rem" }}>
          <RefundPolicyTable>
            <thead>
              <tr>
                <RefundPolicyTableHeader>{TITLE.REFUND_REASON}</RefundPolicyTableHeader>
                <RefundPolicyTableHeader>{TITLE.REFUND_STANDARD}</RefundPolicyTableHeader>
              </tr>
            </thead>
            <tbody>
              {policies.map(({ reason, standard }) => (
                <tr key={reason}>
                  <RefundPolicyTableData>{reason}</RefundPolicyTableData>
                  <RefundPolicyTableData>{standard}</RefundPolicyTableData>
                </tr>
              ))}
            </tbody>
          </RefundPolicyTable>
        </div>
        <MBody style={{ width: "fit-content", paddingBottom: "0.4rem" }}>
          {DESCRIPTION.REFUND}
        </MBody>
      </PolicySpecificationWrapper>
    </RefundPolicyWrapper>
  );
};

const RefundPolicyWrapper = styled.div`
  width: 106.2rem;
  padding: 0 18.9rem;
  padding-bottom: 16rem;
  color: ${({ theme: { color } }) => color.greyScale.black};
  background-color: ${({ theme: { color } }) => color.greyScale.offWhite};
  white-space: pre-line;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  text-align: start;
`;

const PolicySpecificationWrapper = styled.div`
  padding: 4.8rem;
  border: 0.1rem solid ${({ theme: { color } }) => color.greyScale.grey3};
  background-color: ${({ theme: { color } }) => color.greyScale.white};
`;

const RefundPolicyTable = styled.table`
  width: 48rem;
  border: 0.1rem solid ${({ theme: { color } }) => color.greyScale.grey3};
  border-collapse: collapse;
  background-color: ${({ theme: { color } }) => color.greyScale.white};
  font-size: 1.4rem;
  line-height: 2.4rem;
`;

const RefundPolicyTableHeader = styled.th`
  width: 24rem;
  height: 4rem;
  padding: 0 1rem;
  border: 0.1rem solid ${({ theme: { color } }) => color.greyScale.grey3};
  border-collapse: collapse;
  background-color: ${({ theme: { color } }) => color.greyScale.offWhite};
  vertical-align: middle;
  text-align: start;
`;

const RefundPolicyTableData = styled.td`
  width: 24rem;
  height: 4rem;
  padding: 0 1rem;
  border: 0.1rem solid ${({ theme: { color } }) => color.greyScale.grey3};
  border-collapse: collapse;
  vertical-align: middle;
  text-align: start;
`;

const RefundPolicyQuery = graphql`
  query RefundPolicyQuery {
    mdx(frontmatter: { templateKey: { eq: "refund_policies" } }) {
      frontmatter {
        updated
        policies {
          reason
          standard
        }
      }
    }
  }
`;

export default RefundPolicy;
