import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StForm, StHeader, StIconSearch, StIconCancel, StList, StLogo, StWrap, StModalBg } from "../ui/StyledHeader";
import HeaderSearchModal from "../features/HeaderSearchModal";
import HeaderUserModal, { LightTooltip } from "../features/HeaderUserModal";
import Gravatar from "react-gravatar";
import LOGO_WHITE from "../../images/LOGO_WHITE.png";
import LOGO_RED from "../../images/LOGO_RED.png";
import { BLACK, WHITE } from "../../utils/colorPalette";
/////////////////////////////////////////////////////////////////
//아이콘 임포트
import { HiOutlineSearch } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
/////////////////////////////////////////////////////////////////
import Button from "@mui/material/Button";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); //검색어 관리 State
  const [openSearch, setOpenSearch] = useState(false); //검색창 on/off 관리 State
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [isScroll]);

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
      // alert("검색어가 없습니다. 검색어를 입력하세요."); //값이 비어있다면 alert창
      window.location.assign("/search");
    } else {
      window.location.assign(`/search?keyword=${search}`); //검색값을 쿼리스트링으로 넘기고 해당 페이지로 이동
    }
  };

  return (
    <>
      <StHeader isScroll={isScroll}>
        <StWrap>
          <StLogo src={isScroll ? LOGO_RED : LOGO_WHITE} onClick={() => window.location.assign("/")} />

          <StIconSearch isScroll={isScroll} style={{ right: openSearch ? "810px" : "380px" }} onClick={openSearch ? onSearchHandler : openSearchHandler}>
            <HiOutlineSearch />
          </StIconSearch>

          {openSearch ? (
            <>
              <StForm isScroll={isScroll} onSubmit={onSearchHandler}>
                <input type="text" autoFocus value={search} onChange={onChangeHandler} placeholder="지역, 키워드(최대 2개까지 입력 가능)" />
              </StForm>

              <StIconCancel isScroll={isScroll} onClick={openSearchHandler}>
                <MdClose />
              </StIconCancel>

              <HeaderSearchModal />

              <StModalBg onClick={openSearchHandler} />
            </>
          ) : (
            <StList isScroll={isScroll}>
              <li>내주변</li>
              <li>예약내역</li>
              <li>더보기</li>
              {localStorage.token ? (
                <li>
                  <LightTooltip title={<HeaderUserModal />}>
                    <Button>
                      <Gravatar onClick={() => navigate("/mypage")} style={{ borderRadius: "50%" }} email="a-email@example.com" size={29} default="mp" />
                      <IoMdArrowDropdown style={{ marginLeft: "5px", color: isScroll ? BLACK : WHITE }} />
                    </Button>
                  </LightTooltip>
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
