import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GRAY_8, WHITE } from "../../utils/colorPalette";

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
  position: absolute;
  top: 60px;
  right: -45px;
  width: 220px;
  padding: 30px;
  border-radius: 5px;
  background-color: ${WHITE};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
  }
`;
