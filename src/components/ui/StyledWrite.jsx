import styled from "styled-components";
import { GRAY_7, GRAY_8, RED, WHITE } from "../../utils/colorPalette";

const StLayout = styled.div`
  width: 964px;
  height: 100%;
  margin: 110px auto 100px auto;
  border: 1px solid ${GRAY_8};
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  padding: 25px;
  background-color: ${WHITE};
`;

const StTable = styled.table`
  width: 100%;

  tr {
    height: 100%;
  }

  th {
    background-color: ${GRAY_7};
    border: 1px solid ${GRAY_8};
    width: 135px;
    font-size: 15px;
    font-family: "Pretendard-Bold";
  }

  td {
    border: 0.5px solid ${GRAY_8};
    padding: 10px;
  }
`;

const StSubmit = styled.button`
  cursor: pointer;
  margin-top: 25px;
  width: 170px;
  height: 45px;
  background-color: ${RED};

  border: none;
  border-radius: 5px;

  font-size: 17px;
  color: ${WHITE};
`;

const StImagePreview = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    height: 200px;
    border: 1px solid ${GRAY_8};
  }
`;

export { StLayout, StSubmit, StTable, StImagePreview };
