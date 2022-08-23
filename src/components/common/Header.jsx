import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StForm, StHeader, StIconSearch, StIconCancel, StList, StLogo, StWrap, StModalBg } from "../ui/StyledHeader";
import HeaderSearchModal from "../features/HeaderSearchModal";
import HeaderUserModal from "../features/HeaderUserModal";
import Gravatar from "react-gravatar";
import LOGO_WHITE from "../../images/LOGO_WHITE.png";
/////////////////////////////////////////////////////////////////
//아이콘 임포트
import { HiOutlineSearch } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
/////////////////////////////////////////////////////////////////

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); //검색어 관리 State
  const [openSearch, setOpenSearch] = useState(false); //검색창 on/off 관리 State
  const [userModal, setUserModal] = useState(false); //유저모달 on/off 관리 State

  //검색창 on/off 토글 함수
  const openSearchHandler = () => {
    setOpenSearch((prev) => !prev); //이전 값과 반대로 바꿔준다
  };

  //검색어 onChange 함수
  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  //검색 눌렀을때 동작하는 함수
  const onSearchHandler = (event) => {
    event.preventDefault();
    if (search.trim().length === 0) {
      alert("검색어가 없습니다. 검색어를 입력하세요."); //값이 비어있다면 alert창
    } else {
      window.location.assign(`/search?keyword=${search}`); //검색값을 쿼리스트링으로 넘기고 해당 페이지로 이동
    }
  };

  return (
    <>
      <StHeader>
        <StWrap>
          {userModal ? <HeaderUserModal /> : null}

          <StLogo src={LOGO_WHITE} onClick={() => window.location.assign("/")} />

          <StIconSearch style={{ right: openSearch ? "810px" : "400px" }} onClick={openSearch ? onSearchHandler : openSearchHandler}>
            <HiOutlineSearch />
          </StIconSearch>

          {openSearch ? (
            <>
              <StForm onSubmit={onSearchHandler}>
                <input type="text" autoFocus value={search} onChange={onChangeHandler} placeholder="지역, 키워드" />
              </StForm>

              <StIconCancel onClick={openSearchHandler}>
                <MdClose />
              </StIconCancel>

              <HeaderSearchModal />

              <StModalBg onClick={openSearchHandler} />
            </>
          ) : (
            <StList>
              <li>내주변</li>
              <li>예약내역</li>
              <li>더보기</li>
              {localStorage.token ? (
                <li onMouseOver={() => setUserModal(true)} onMouseOut={() => setUserModal(false)}>
                  <Gravatar onClick={() => navigate("/mypage")} style={{ borderRadius: "50%" }} email="a-email@example.com" size={29} default="mp" />

                  <IoMdArrowDropdown />
                </li>
              ) : (
                <li onClick={() => navigate("/login")}>로그인</li>
              )}
            </StList>
          )}
        </StWrap>
      </StHeader>
    </>
  );
};

export default Header;
