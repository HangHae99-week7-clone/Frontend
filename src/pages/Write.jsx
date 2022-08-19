import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GRAY_7, GRAY_8, RED, WHITE } from "../utils/colorPalette";
import S3 from "react-aws-s3";
import { v4 as uuidv4 } from "uuid";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Write = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#EBEBEB";

    return () => {
      document.body.style.backgroundColor = "null";
    };
  }, []);

  const initialState = {
    placename: "",
    location: "",
    category: "",
    message: "",
    image: "",
  };
  const [contents, setContents] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setContents({ ...contents, [name]: value });
  };

  /////////////////////////////////////////////////////////////////
  // S3 이미지 업로드 후 contents State에 이미지 URL 넣는 로직
  const config = {
    bucketName: "howabouthere-clone",
    region: "ap-northeast-2",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    const newFileName = uuidv4(); //파일 이름 랜덤으로 바꿔주는 패키지
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        setContents({ ...contents, image: data.location });
      })
      .catch((err) => console.log(err));
  };
  /////////////////////////////////////////////////////////////////

  return (
    <StLayout>
      <StTable>
        <tbody>
          <tr>
            <th scope="row">숙소 이미지(1장)</th>
            <td>
              <input type="file" name="image" accept="image/*" onChange={(event) => handleFileInput(event)} />
            </td>
          </tr>
          <tr>
            <th scope="row">상호명</th>
            <td>
              <input type="text" name="placename" value={contents.placename} onChange={onChangeHandler} />
            </td>
          </tr>
          <tr>
            <th scope="row">숙소 종류</th>
            <td>
              <select name="category" value={contents.category} onChange={onChangeHandler}>
                <option value="선택">선택</option>
                <option value="모텔">모텔</option>
                <option value="호텔">호텔</option>
                <option value="펜션">펜션</option>
                <option value="캠핑">캠핑</option>
              </select>
            </td>
          </tr>
          <tr>
            <th scope="row">숙소 위치</th>
            <td>
              <input type="text" name="location" value={contents.location} onChange={onChangeHandler} />
            </td>
          </tr>
          <tr>
            <th scope="row">사장님 한마디</th>
            <td>
              <input type="text" name="message" value={contents.message} onChange={onChangeHandler} />
            </td>
          </tr>
        </tbody>
      </StTable>
      <StSubmit>저장 후 다음 단계</StSubmit>
    </StLayout>
  );
};

export default Write;

const StLayout = styled.div`
  width: 964px;
  height: 100%;
  margin: 100px auto 50px auto;
  border: 1px solid ${GRAY_8};
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  padding: 25px;
  background-color: ${WHITE};
`;

const StTable = styled.table`
  width: 100%;

  tr {
    height: 100%;
  }

  th {
    background-color: ${GRAY_7};
    border: 1px solid ${GRAY_8};
    width: 135px;
    font-size: 15px;
    font-weight: 400;
  }

  td {
    border: 1px solid ${GRAY_8};
    padding: 10px;

    input {
      width: 100%;
      border: 1px solid ${GRAY_8};
      border-radius: 5px;
      height: 40px;
      padding: 0 10px;
    }
  }
`;

const StSubmit = styled.button`
  margin-top: 25px;
  width: 170px;
  height: 45px;
  background-color: ${RED};

  border: none;
  border-radius: 5px;

  font-size: 17px;
  color: ${WHITE};
`;
