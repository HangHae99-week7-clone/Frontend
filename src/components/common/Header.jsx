import React, { useState } from "react";
import Gravatar from "react-gravatar";
import LOGO_WHITE from "../../images/LOGO_WHITE.png";
import { HiOutlineSearch } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { StForm, StHeader, StIconSearch, StIconCancel, StList, StLogo, StWrap, StModalBg } from "../ui/StyledHeader";
import { useDispatch } from "react-redux";
import HeaderSearchModal from "../features/HeaderSearchModal";
import { useNavigate } from "react-router-dom";
import HeaderUserModal from "../features/HeaderUserModal";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [userModal, setUserModal] = useState(false);

  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    // dispatch();
  };

  const openSearchHandler = () => {
    setOpenSearch((prev) => !prev);
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
              {false ? (
                <li onClick={() => navigate("/login")}>로그인</li>
              ) : (
                <li onMouseOver={() => setUserModal(true)} onMouseOut={() => setUserModal(false)}>
                  <Gravatar onClick={() => navigate("/mypage")} style={{ borderRadius: "50%" }} email="a-email@example.com" size={29} default="mp" />
                  <IoMdArrowDropdown />
                </li>
              )}
            </StList>
          )}
        </StWrap>
      </StHeader>
    </>
  );
};

export default Header;
