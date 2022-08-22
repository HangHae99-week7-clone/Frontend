import React, { useState } from "react";
import LOGO_WHITE from "../../images/LOGO_WHITE.png";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { StForm, StHeader, StIconSearch, StIconCancel, StList, StLogo, StWrap } from "../ui/StyledHeader";
import { useDispatch } from "react-redux";
import HeaderSearchModal from "../features/HeaderSearchModal";

const Header = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch();
  };

  const openSearchHandler = () => {
    setOpenSearch((prev) => !prev);
  };

  return (
    <>
      <StHeader>
        <StWrap>
          <StLogo src={LOGO_WHITE} />
          <StIconSearch style={{ right: openSearch ? "810px" : "400px" }} onClick={openSearch ? onSearchHandler : openSearchHandler}>
            <FaSearch />
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
            </>
          ) : (
            <StList>
              <li>내주변</li>
              <li>예약내역</li>
              <li>더보기</li>
              <li>로그인</li>
            </StList>
          )}
        </StWrap>
      </StHeader>
    </>
  );
};

export default Header;
