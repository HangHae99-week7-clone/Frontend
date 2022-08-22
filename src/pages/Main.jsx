import React from "react";
import styled from "styled-components";
import { GRAY_7 } from "../utils/colorPalette";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../layout/Layout";
import newsImage from "../images/news.png";
/////////////////////////////////////////////////////////////////
//이미지 슬라이더 패키지(swiper 관련) 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
/////////////////////////////////////////////////////////////////

const Main = () => {
  return (
    <>
      <Header />

      <StMainImage />

      <Layout>
        <StContentBox>
          <StContentTitle>여기어때 소식</StContentTitle>
          <img alt="newimage1" src={newsImage} />
        </StContentBox>

        <StContentBox>
          <StContentTitle>이벤트</StContentTitle>

          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
          >
            <SwiperSlide>
              <img alt="slideimage1" src="https://image.goodchoice.kr/images/cms/home_img/3c13f7bf4ea5ef67729fa285aca7896f.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img alt="slideimage2" src="https://image.goodchoice.kr/images/cms/home_img/fbaabc9a7da7a4f20e1b43c44da60b34.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img alt="slideimage3" src="https://image.goodchoice.kr/images/cms/home_img/67223336700c3b16456fe8279cac2bcc.png" />
            </SwiperSlide>
          </Swiper>
        </StContentBox>

        <StDisplayBox>
          <img alt="boximage1" src="https://image.goodchoice.kr/images/web_v3/ad_01_171013.png" />
          <img alt="boximage2" onClick={() => window.location.assign("/write")} src="https://image.goodchoice.kr/images/web_v3/ad_02_171013.png" />
        </StDisplayBox>
      </Layout>

      <Footer />
    </>
  );
};

export default Main;

const StMainImage = styled.div`
  margin-top: 130px;
  margin-bottom: 50px;
  background-image: url("https://image.goodchoice.kr/images/web_v3/mainspot_220531.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 100%;
  height: 450px;
`;

const StContentTitle = styled.h2`
  font-size: 24px;
  font-family: "Pretendard-Bold";
  margin-bottom: 30px;
`;

const StContentBox = styled.div`
  padding: 40px 0;
`;

const StDisplayBox = styled(StContentBox)`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 0 5px;

  img {
    cursor: pointer;
    width: 50%;
    border: 0.5px solid ${GRAY_7};
  }
`;
