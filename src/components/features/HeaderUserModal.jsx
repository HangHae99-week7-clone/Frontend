import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GRAY_8, WHITE } from "../../utils/colorPalette";
import { styled as muistyled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const LightTooltip = muistyled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
  },
}));

const HeaderUserModal = () => {
  const navigate = useNavigate();
  const userNickname = localStorage.getItem("nickname");

  const onLogoutHandler = () => {
    window.localStorage.clear();
    window.location.assign("/");
  };

  return (
    <StUserModal>
      <h1>{userNickname}</h1>
      <hr />
      <ul>
        <li onClick={() => navigate("/mypage")}>내정보</li>
        <li>포인트</li>
        <li>쿠폰함</li>
        <li>예약내역</li>
        <li>알림설정</li>
        <li onClick={onLogoutHandler}>로그아웃</li>
      </ul>
    </StUserModal>
  );
};

export default HeaderUserModal;

//유저 모달 박스
const StUserModal = styled.div`
  width: 200px;
  padding: 25px;
  font-size: 16px;
  z-index: 9999;

  //유저 닉네임
  h1 {
    font-family: "Pretendard-Bold";
  }

  //구분선
  hr {
    margin: 20px 0;
    border: 0;
    height: 1px;
    background-color: ${GRAY_8};
  }

  //유저 모달 리스트
  ul {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
