const time = document.querySelector(".time");
const week = new Array(
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일"
);

let today = new Date();

let year = today.getFullYear(); // 연도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일

time.innerHTML = `${year}년 ${month}월 ${date}일 ${week[day]}`;
