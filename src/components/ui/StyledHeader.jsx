import styled from "styled-components";
import { BLACK, GRAY_8, GRAY_9, RED, WHITE } from "../../utils/colorPalette";

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${(props) => (props.isScroll ? WHITE : RED)};
  z-index: 999;
  box-shadow: ${(props) => (props.isScroll ? "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px" : "none")};
  transition-duration: 0.3s;
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
    color: ${(props) => (props.isScroll ? BLACK : WHITE)};

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
  color: ${(props) => (props.isScroll ? BLACK : GRAY_8)};
  font-size: 21px;
`;

const StIconCancel = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  right: 30px;
  font-size: 24px;
  color: ${(props) => (props.isScroll ? BLACK : GRAY_9)};
`;

const StList = styled.ul`
  cursor: pointer;
  position: absolute;
  display: flex;
  right: 30px;
  align-items: center;
  gap: 32px;
  font-size: 18px;
  color: ${(props) => (props.isScroll ? BLACK : GRAY_8)};

  li {
    display: flex;
    align-items: center;

    &:hover {
      color: ${(props) => (props.isScroll ? BLACK : WHITE)};
    }

    button {
      padding: 0;
      margin-left: -20px;
      transform: translateX(10px);

      &:hover {
        background-color: transparent;
      }
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
