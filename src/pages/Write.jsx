import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { StLayout, StSubmit, StTable } from "../components/ui/StyledWrite";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import instance from "../app/module/instance";
/////////////////////////////////////////////////////////////////
//MUI 관련 임포트
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
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
  const selectCategory = ["모텔", "호텔", "펜션", "캠핑"];
  const selectLocation = ["서울", "경기", "강원", "충남", "충북", "전남", "전북", "경남", "경북", "제주"];
  const selectKeyword = ["오션뷰", "파티룸", "야외수영장", "애견동반", "조식", "호캉스"];

  const initialState = {
    images: "",
    placename: "",
    category: "",
    location: "",
    keyword: "",
    message: "",
    content: "",
    roomtitle: "",
    roomcharge: "",
    roomimage: "",
  };
  const [contents, setContents] = useState(initialState);
  const [roomImage, setRoomImage] = useState([]);
  const keyword1Ref = useRef();
  const keyword2Ref = useRef();
  const keyword3Ref = useRef();
  const editorRef = useRef();
  const roomtitle1Ref = useRef();
  const roomtitle2Ref = useRef();
  const roomcharge1Ref = useRef();
  const roomcharge2Ref = useRef();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setContents({ ...contents, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const value = {
      ...contents,
      content: editorRef.current?.getInstance().getHTML(),
      keyword: `${keyword1Ref.current?.value},${keyword2Ref.current?.value},${keyword3Ref.current?.value}`,
      roomtitle: `${roomtitle1Ref.current?.value},${roomtitle2Ref.current?.value}`,
      roomcharge: `${roomcharge1Ref.current?.value},${roomcharge2Ref.current?.value}`,
      roomimage: roomImage.join(","),
    };
    await instance.post("/post", value);
  };

  useEffect(() => {
    //에디터에 이미지 Drag&Drop 방지
    editorRef.current.getInstance().removeHook("addImageBlobHook");
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
    const name = event.target.name;
    const newFileName = uuidv4(); //파일 이름 랜덤으로 바꿔주는 패키지
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        if (name === "image") {
          setContents({ ...contents, images: data.location });
        } else {
          setRoomImage([...roomImage, data.location]);
        }
      })
      .catch((err) => console.log(err));
  };
  /////////////////////////////////////////////////////////////////

  return (
    <>
      <Header />

      <StLayout>
        <StTable>
          <tbody>
            <tr>
              <th scope="row">숙소 이미지(1장)</th>
              <td>
                <IconButton color="error" aria-label="upload picture" component="label">
                  <input hidden type="file" name="image" accept="image/*" onChange={(event) => handleFileInput(event)} />
                  <PhotoCamera />
                </IconButton>
              </td>
            </tr>

            <tr>
              <th scope="row">상호명</th>
              <td>
                <TextField type="text" label="상호명" name="placename" value={contents.placename} onChange={onChangeHandler} size="small" fullWidth />
              </td>
            </tr>

            <tr>
              <th scope="row">숙소 종류</th>
              <td>
                <FormControl fullWidth size="small">
                  <InputLabel>카테고리</InputLabel>
                  <Select name="category" value={contents.category} label="카테고리" onChange={onChangeHandler}>
                    {selectCategory.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </td>
            </tr>

            <tr>
              <th scope="row">숙소 위치</th>
              <td>
                <TextField type="text" label="위치" name="location" value={contents.location} onChange={onChangeHandler} size="small" fullWidth />
              </td>
            </tr>

            <tr>
              <th scope="row">숙소 키워드</th>
              <td style={{ display: "flex", gap: "10px" }}>
                <FormControl fullWidth size="small">
                  <InputLabel>키워드1</InputLabel>
                  <Select inputRef={keyword1Ref} label="키워드1">
                    {selectLocation.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel>키워드2</InputLabel>
                  <Select inputRef={keyword2Ref} label="키워드2">
                    {selectKeyword.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel>키워드3</InputLabel>
                  <Select inputRef={keyword3Ref} label="키워드3">
                    {selectKeyword.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </td>
            </tr>

            <tr>
              <th scope="row">사장님 한마디</th>
              <td>
                <TextField type="text" label="사장님 한마디" name="message" value={contents.message} onChange={onChangeHandler} size="small" fullWidth />
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
              <th rowSpan={2} scope="row">
                객실 정보
              </th>
              <td style={{ display: "flex", gap: "10px" }}>
                <IconButton color="error" aria-label="upload picture" component="label">
                  <input hidden type="file" name="roomimage1" accept="image/*" onChange={(event) => handleFileInput(event)} />
                  <PhotoCamera />
                </IconButton>
                <TextField type="text" label="객실명" inputRef={roomtitle1Ref} size="small" fullWidth />
                <TextField type="text" label="객실가격" inputRef={roomcharge1Ref} size="small" fullWidth />
              </td>
            </tr>
            <tr>
              <td style={{ display: "flex", gap: "10px" }}>
                <IconButton color="error" aria-label="upload picture" component="label">
                  <input hidden type="file" name="roomimage2" accept="image/*" onChange={(event) => handleFileInput(event)} />
                  <PhotoCamera />
                </IconButton>
                <TextField type="text" label="객실명" inputRef={roomtitle2Ref} size="small" fullWidth />
                <TextField type="text" label="객실가격" inputRef={roomcharge2Ref} size="small" fullWidth />
              </td>
            </tr>
          </tbody>
        </StTable>

        <StSubmit onClick={onSubmitHandler}>숙소 등록</StSubmit>
      </StLayout>

      <Footer />
    </>
  );
};

export default Write;
