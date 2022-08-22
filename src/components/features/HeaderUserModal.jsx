import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GRAY_8, WHITE } from "../../utils/colorPalette";

const HeaderUserModal = () => {
  const navigate = useNavigate();
  return (
    <StUserModal>
      <div>닉네임</div>
      <hr />
      <ul>
        <li onClick={() => navigate("/mapage")}>내정보</li>
        <li>포인트</li>
        <li>쿠폰함</li>
        <li>예약내역</li>
        <li>알림설정</li>
        <li>로그아웃</li>
      </ul>
    </StUserModal>
  );
};

export default HeaderUserModal;

const StUserModal = styled.div`
  position: absolute;
  top: 60px;
  right: -45px;
  width: 220px;
  border-radius: 5px;

  background-color: ${WHITE};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  padding: 30px;
  z-index: 9999;

  hr {
    margin: 20px 0;
    border: 0;
    height: 1px;
    background-color: ${GRAY_8};
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
