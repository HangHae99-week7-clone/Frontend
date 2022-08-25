import React from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";
import { GRAY_10, GRAY_6, PINK, WHITE } from "./colorPalette";

const Slider = () => {
  const Track = (props, state) => <StTrack {...props} index={state.index} />;
  const Thumb = (props, state) => (
    <StThumb {...props}>
      <div></div>
    </StThumb>
  );

  return (
    <>
      <StSlider min={1} max={30} defaultValue={[1, 30]} renderTrack={Track} renderThumb={Thumb}></StSlider>
      <StCost>
        <span>1만원</span>
        <span>30만원</span>
      </StCost>
    </>
  );
};

export default Slider;

const StSlider = styled(ReactSlider)`
  width: 100%;
  height: 4px;
  display: flex;
  align-items: center;
`;

const StTrack = styled.div`
  margin-top: 15px;
  top: 0;
  bottom: 0;
  height: ${(props) => (props.index === 2 ? "2px" : props.index === 1 ? "4px" : "2px")};
  background-color: ${(props) => (props.index === 2 ? GRAY_6 : props.index === 1 ? PINK : GRAY_6)};
`;

const StThumb = styled.div`
  margin-top: 30px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${WHITE};
  background-color: ${PINK};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:focus {
    outline: none;
  }

  div {
    background-color: ${WHITE};
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }
`;

const StCost = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2px;

  span {
    margin-top: 30px;
    font-size: 14px;
    color: ${GRAY_10};
  }
`;
