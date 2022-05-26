let news = []; // 가져온 데이터 배열에 정리
let page = 1;
let totalPages = 0;
let url = new URL( // 기본 url
  "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10"
);
const API_KEY = "Wn6iDfamh_CCZ-HEb7hI0e9fl3TrWF6ZdDB6uk_Z1AE";

// news url 부르기
// 헤더 부르기
// 데이터 가져오기 (response fetch)
// 데이터 보여주기 (response.json)
const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": API_KEY,
    });
    url.searchParams.set("page", page);
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    console.log(data);

    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error(data.status);
      }
      news = data.articles;
      totalPages = data.total_pages;
      page = data.page;
      render();
      pagination();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

// news UI
const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src=${
        item.media ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
      }/>
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${
        item.summary == null || item.summary == ""
          ? "내용없음"
          : item.summary.length > 200
          ? item.summary.substring(0, 200) + "..."
          : item.summary
      }</p>
      <div>${item.rights || "no source"} / ${moment(
        item.published_date
      ).fromNow()}</div>
    </div>
  </div>`;
    })
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};
// 에러시 ui에 에러메세지 보여주기
const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

// 기본 상태
const getLatestNews = () => {
  url;
  getNews();
};

getLatestNews();

// 카테고리별 클릭
const topics = document.querySelectorAll(".menus button");
topics.forEach((menu) =>
  menu.addEventListener("click", async (event) => {
    let topic = event.target.textContent.toLowerCase();
    url = new URL(
      `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`
    );
    getNews();
  })
);

// 사이드 카테고리별 클릭
const sideTopics = document.querySelectorAll(".side-menu-list button");
sideTopics.forEach((menu) =>
  menu.addEventListener("click", async (event) => {
    let sideTopic = event.target.textContent.toLowerCase();
    url = new URL(
      `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${sideTopic}&page_size=10`
    );
    getNews();
  })
);

// search button 키워드 검색
const keywordSearch = async () => {
  let keyword = searchInput.value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
};

// side search button 키워드 검색
const sideKeywordSearch = async () => {
  let sideKeyword = sideSearchInput.value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${sideKeyword}&page_size=10`
  );
  getNews();
};

// search button 엔터키 반응
function EnterKey(event) {
  if (event.keyCode == 13) {
    if (true) {
      keywordSearch();
    } else {
      event.preventDefault();
    }
  }
}

// side search button 엔터키 반응
function sideEnterKey(event) {
  if (event.keyCode == 13) {
    if (true) {
      sideKeywordSearch();
    } else {
      event.preventDefault();
    }
  }
}

sideGoBtn.addEventListener("click", sideKeywordSearch);
goBtn.addEventListener("click", keywordSearch);
searchInput.addEventListener("keyup", EnterKey);
sideSearchInput.addEventListener("keyup", sideEnterKey);

// pagination
const pagination = () => {
  let pageHTML = "";
  // page_group
  // first page
  // last page
  // first~last page print
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  if (last > totalPages) {
    // totalpage가 13이라고 했을때 last는 15가 되므로 초과했을 경우
    last = totalPages; // last를 totalpage로 맞춘다
  }
  let first = last - 4 <= 0 ? 1 : last - 4;
  // let first = last - 4;
  let prev = first - 1;
  let next = last + 1;
  for (let i = first; i <= last; i++) {
    pageHTML += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link" href="#" onclick="movePage(${i})">${i}</a></li>`;
  }

  let pageListHTML = `<li class="page-item ${first < 6 ? "hidden" : ""}">
  <a class="page-link" href="#" aria-label="Previous" onclick="movePage(1)">
    <span aria-hidden="true">&laquo;</span>
  </a>
</li><li class="page-item ${page < 6 ? "hidden" : ""}">
  <a class="page-link" href="#" aria-label="Previous" onclick="movePage(${prev})">
    <span aria-hidden="true">Previous</span>
  </a>
</li>${pageHTML}<li class="page-item ${last < totalPages ? "hidden" : ""}">
<a class="page-link" href="#" aria-label="Next" onclick="movePage(${next})">
  <span aria-hidden="true">&#8250;</span>
</a>
</li><li class="page-item ${last == totalPages ? "hidden" : ""}">
<a class="page-link" href="#" aria-label="Next" onclick="movePage(${totalPages})">
  <span aria-hidden="true">&raquo;</span>
</a>
</li>`;
  document.querySelector(".pagination").innerHTML = pageListHTML;
};

// pagination 안에 클릭이벤트
const movePage = (pageNumber) => {
  page = pageNumber;
  console.log(page);
  getNews();
};
