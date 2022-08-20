import React, { useEffect, useState, useRef } from "react";
import { StLayout, StSubmit, StTable } from "../components/ui/StyledWrite";
/////////////////////////////////////////////////////////////////
//Amazon S3 이미지 관련 임포트
import S3 from "react-aws-s3";
import { v4 as uuidv4 } from "uuid";
/////////////////////////////////////////////////////////////////
//토스트 UI 텍스트 에디터 관련 임포트
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
/////////////////////////////////////////////////////////////////

window.Buffer = window.Buffer || require("buffer").Buffer;

const Write = () => {
  const initialState = {
    image: "",
    placename: "",
    location: "",
    keyword: [],
    category: "",
    message: "",
    room1title: "",
    room1charge: "",
    room2title: "",
    room2charge: "",
    content: "",
  };
  const [contents, setContents] = useState(initialState);
  const editorRef = useRef();
  const selectCategory = ["선택", "모텔", "호텔", "펜션", "캠핑"];
  const selectLocation = ["선택", "서울", "경기", "강원", "충남", "충북", "전남", "전북", "경남", "경북", "제주"];
  const selectKeyword = ["선택", "오션뷰", "파티룸", "야외수영장", "애견동반"];

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setContents({ ...contents, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setContents({ ...contents, content: editorRef.current?.getInstance().getHTML() });
  };

  const onKeywordHandler = (event) => {
    const { value } = event.target;
    console.log(value);
    setContents({ ...contents, keyword: [value] });
  };

  useEffect(() => {
    //에디터에 이미지 Drag&Drop 방지
    editorRef.current.getInstance().removeHook("addImageBlobHook");
    document.body.style.backgroundColor = "#EBEBEB";

    return () => {
      document.body.style.backgroundColor = "null";
    };
  }, []);

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

  console.log(contents);

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
                {selectCategory.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
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
            <th scope="row">숙소 키워드</th>
            <td>
              <select onChange={onKeywordHandler}>
                {selectLocation.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select onChange={onKeywordHandler}>
                {selectKeyword.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <th scope="row">사장님 한마디</th>
            <td>
              <input type="text" name="message" value={contents.message} onChange={onChangeHandler} />
            </td>
          </tr>
          <tr>
            <th scope="row">숙소 정보</th>
            <td>
              <Editor
                ref={editorRef}
                placeholder="내용을 입력해주세요."
                previewStyle="vertical" //미리보기 스타일 지정
                height="500px" //에디터 창 높이
                initialEditType="wysiwyg" //초기 입력모드 설정(디폴트 markdown)
                plugins={[[colorSyntax, { preset: ["#000", "#ff0000"] }]]} //text color 플러그인
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                ]}
              ></Editor>
            </td>
          </tr>
          <tr>
            <th scope="row">객실 정보</th>
            <td>
              <div>객실 1</div>
              <input type="text" placeholder="객실명" name="room1title" value={contents.room1title} onChange={onChangeHandler} />
              <input type="text" placeholder="객실가격" name="room1charge" value={contents.room1charge} onChange={onChangeHandler} />
              <div>객실 2</div>
              <input type="text" placeholder="객실명" name="room2title" value={contents.room2title} onChange={onChangeHandler} />
              <input type="text" placeholder="객실가격" name="room2charge" value={contents.room2charge} onChange={onChangeHandler} />
            </td>
          </tr>
        </tbody>
      </StTable>
      <StSubmit onClick={onSubmitHandler}>숙소 등록</StSubmit>
    </StLayout>
  );
};

export default Write;
