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
  const [modal, setModal] = useState(false);

  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch();
  };

  const onClickModalHandler = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <StHeader>
        <StWrap>
          <StLogo src={LOGO_WHITE} />
          <StIconSearch onClick={onClickModalHandler}>
            <FaSearch />
          </StIconSearch>
          <StForm onSubmit={onSearchHandler}>
            <input type="text" autoFocus value={search} onChange={onChangeHandler} placeholder="지역, 숙소명" />
          </StForm>
          <StIconCancel>
            <MdClose />
          </StIconCancel>
          <StList>
            <li>내주변</li>
            <li>예약내역</li>
            <li>더보기</li>
            <li>로그인</li>
          </StList>
        </StWrap>
      </StHeader>
      {modal ? <HeaderSearchModal /> : null}
    </>
  );
};

export default Header;
