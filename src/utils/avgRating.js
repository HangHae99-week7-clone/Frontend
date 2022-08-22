//게시물의 리뷰 점수의 평균을 리턴하는 함수
export const avgRating = (value) => {
  if (value.length) {
    const rating = value.map((item) => item.rating);
    return rating.reduce((a, b) => a + b, 0) / value.length;
  } else {
    return 0;
  }
};

//리뷰 점수에 따른 문구를 리턴하는 함수
export const avgRatingWord = (value) => {
  if (value >= 4 && value <= 5) {
    return "최고에요";
  } else if (value >= 3 && value < 4) {
    return "추천해요";
  } else if (value >= 1 && value < 3) {
    return "만족해요";
  } else if (value > 0 && value < 1) {
    return "아쉬워요";
  } else if (value === 0) {
    return null;
  }
};
