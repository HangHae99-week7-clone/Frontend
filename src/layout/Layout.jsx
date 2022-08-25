import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

export default Layout;

const StLayout = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 0 30px;
`;
