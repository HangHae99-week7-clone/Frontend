import React from "react";
import styled from "styled-components";
import { GRAY_6, GRAY_7, GRAY_9 } from "../../utils/colorPalette";
import Layout from "../../layout/Layout";

const Footer = () => {
  return (
    <StFooter>
      <Layout>
        <div>
          <span>회사소개</span>
          <StVerticalBar>|</StVerticalBar>
          <span>이용약관</span>
          <StVerticalBar>|</StVerticalBar>
          <span>개인정보처리방침</span>
          <StVerticalBar>|</StVerticalBar>
          <span>소비자 분쟁해결 기준</span>
          <StVerticalBar>|</StVerticalBar>
          <span>사업자 정보확인</span>
        </div>
        <div>
          <span>
            <strong>고객행복센터 1670-6250</strong> 오전 9시 - 새벽 3시
          </span>
        </div>
        <div>
          <p>(주) 여기어때컴퍼니</p>
          <p>Copyright GC COMPANY Corp. All rights reserved.</p>
        </div>
      </Layout>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.div`
  width: 100%;
  background-color: ${GRAY_9};
  border-top: 1.5px solid ${GRAY_7};
  margin-top: 70px;
  transform: translateY(115px);
  padding: 40px 0;

  div {
    margin-bottom: 20px;
  }

  span,
  p {
    font-size: 13px;
    color: ${GRAY_6};
    cursor: pointer;
  }
`;

const StVerticalBar = styled.span`
  margin: 0 10px;
`;
