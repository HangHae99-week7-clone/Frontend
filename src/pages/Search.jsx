import React from "react";
import styled from "styled-components";
import { GRAY_9 } from "../utils/colorPalette";

const Search = () => {
  return (
    <div>
      <StKeywordDiv>'오션뷰'</StKeywordDiv>
      <StLayout></StLayout>
    </div>
  );
};

export default Search;

const StLayout = styled.div`
  width: 1024px;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

const StKeywordDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  background-color: ${GRAY_9};
  margin-top: 80px;
  font-size: 38px;
`;
