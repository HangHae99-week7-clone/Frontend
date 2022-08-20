import styled from "styled-components";
import { GRAY_9, RED, WHITE } from "../../utils/colorPalette";

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${RED};
  z-index: 9999;
`;

const StWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 1024px;
  height: 100%;
`;

const StLogo = styled.img`
  position: absolute;
  left: 30px;
  width: 96px;
`;

const StForm = styled.form`
  position: absolute;
  left: 230px;

  input {
    background-color: transparent;
    border: none;
    width: 400px;
    height: 40px;
    font-size: 18px;
    color: ${WHITE};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${GRAY_9};
    }
  }
`;

const StIconSearch = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  left: 200px;
  color: ${GRAY_9};
`;

const StIconCancel = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  left: 630px;
  font-size: 24px;
  color: ${GRAY_9};
`;

const StList = styled.ul`
  position: absolute;
  right: 30px;
  cursor: pointer;
  display: flex;
  gap: 40px;
  font-size: 18px;
  color: ${GRAY_9};

  li:hover {
    color: ${WHITE};
  }
`;

export { StForm, StHeader, StIconSearch, StIconCancel, StList, StLogo, StWrap };
