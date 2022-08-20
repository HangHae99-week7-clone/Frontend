import React from "react";
import styled from "styled-components";
import newsImage from "../images/news.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { GRAY_7 } from "../utils/colorPalette";

const Main = () => {
  return (
    <>
      <StMainImage />
      <StLayout>
        <StContentBox>
          <StH2>여기어때 소식</StH2>
          <img src={newsImage} />
        </StContentBox>
        <StContentBox>
          <StH2>이벤트</StH2>
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
              <img src="https://image.goodchoice.kr/images/cms/home_img/3c13f7bf4ea5ef67729fa285aca7896f.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://image.goodchoice.kr/images/cms/home_img/fbaabc9a7da7a4f20e1b43c44da60b34.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://image.goodchoice.kr/images/cms/home_img/67223336700c3b16456fe8279cac2bcc.png" />
            </SwiperSlide>
          </Swiper>
        </StContentBox>
        <StDisplayBox>
          <img src="https://image.goodchoice.kr/images/web_v3/ad_01_171013.png" />
          <img src="https://image.goodchoice.kr/images/web_v3/ad_02_171013.png" />
        </StDisplayBox>
      </StLayout>
    </>
  );
};

export default Main;

const StMainImage = styled.div`
  margin-top: 130px;
  background-image: url("https://image.goodchoice.kr/images/web_v3/mainspot_220531.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 100%;
  height: 500px;
  margin-bottom: 50px;
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
    width: 50%;
    border: 0.5px solid ${GRAY_7};
    cursor: pointer;
  }
`;

const StLayout = styled.div`
  width: 1024px;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

const StH2 = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
`;
