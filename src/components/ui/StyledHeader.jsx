import styled from "styled-components";
import { GRAY_8, GRAY_9, RED, WHITE } from "../../utils/colorPalette";

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${RED};
  z-index: 999;
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
  cursor: pointer;
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
      color: ${GRAY_8};
    }
  }
`;

const StIconSearch = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  color: ${GRAY_8};
  font-size: 21px;
  transition-duration: 0.5s;
`;

const StIconCancel = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  right: 30px;
  font-size: 24px;
  color: ${GRAY_9};
`;

const StList = styled.ul`
  cursor: pointer;
  position: absolute;
  display: flex;
  right: 30px;
  align-items: center;
  gap: 40px;
  font-size: 18px;
  color: ${GRAY_8};

  li {
    display: flex;
    align-items: center;

    &:hover {
      color: ${WHITE};
    }
  }
`;

//모달 클릭시 검은 배경
const StModalBg = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { StForm, StHeader, StIconSearch, StIconCancel, StList, StLogo, StWrap, StModalBg };
