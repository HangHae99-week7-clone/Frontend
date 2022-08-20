import styled from "styled-components"

export const CommonInput = styled.input`
  background: ${props => props.background};

  font-family: "Pretendard-Regular";
  font-size: ${props=>props.fontSize || "20px"};

  border: ${props => props.border || "1px solid #bdbdbd"};
  border-radius: 6px;
  outline:none;
  padding:${props=> props.padding || "0 0 0 30px"};
  margin:${props=> props.margin || "0 0 8px 0"};

  
  width: ${props => props.width || "auto"};
  height:${props => props.height || "48px"};

  &::placeholder {
    margin:10px;
    color: #bdbdbd;
    font-size: ${props=>props.placeholderSize || "20px"};
  }

  &:focus {
    border:${props => props.activeBorder || "1px solid #757575" }
  }
`

export const CommonBtn = styled.button`
  background: ${props => props.background};

  color:${props => props.fontColor || "#ffffff"};
  font-size:${props => props.fontSize || "18px"};
  font-family: "Pretendard-Regular";
  font-weight: 500;

  border:${props => props.border || "none"};
  border-radius: 5px;
  outline:none;
  padding:${props=> props.padding || "1rem 0"};
  margin:${props=> props.margin || "0 0 8px 0"};

  height:${props=> props.height || "56px"};
  cursor: pointer;

`

export const ErrorText = styled.div`
  display:${props => props.display};
  color: ${props => props.color || "#fb0552"};
  font-size: 16px;

  padding-left: 0.1rem;

  margin-bottom: 8px;
`

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;
`

export const LogoImage = styled.img`
  width: 140px;
  height: 28px;

  cursor: pointer;
`

export const CommonRowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};

  padding: ${props => props.padding};
  margin: ${props => props.margin};
  `

export const CommonForm = styled.form`
  display: flex;
  flex-direction: column;

  padding: ${props => props.padding};
  margin: ${props => props.margin};
`

export const CommonBorder = styled.div`
  background: ${props=> props.background || "#000000"};

  display: block;

  padding: ${props => props.padding};
  margin: ${props => props.margin};

  height: 1px;

  width: ${props => props.width};
`

export const CommonText = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-weight: 500;
  color: ${props=>props.color || "#000000"};

  padding: ${props => props.padding};
  margin: ${props => props.margin};
`

export const InfoTitle = styled.h2`

  font-family: "Jalnan", sans-serif;
  font-weight: 500;
  font-size:24px;
  text-align:center;

  span {
    color:#eb4242;
  }
`