let news = [];
const API_KEY = "Wn6iDfamh_CCZ-HEb7hI0e9fl3TrWF6ZdDB6uk_Z1AE"

const getLatestNews = async () => {
  let url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=5"
  );
  let header = new Headers({
    "x-api-key": API_KEY,
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  render();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news.map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src=${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}/>
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
      <div>${item.rights || "no source"} / ${moment(item.published_date).fromNow()}</div>
    </div>
  </div>`;
    })
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

// 카테고리별 클릭
const topics = document.querySelectorAll(".menus button");
topics.forEach((menu) => menu.addEventListener("click", async (event) => {
    let topic = event.target.textContent.toLowerCase(); 
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=5`)
    let header = new Headers({
      "x-api-key": API_KEY,
    })
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    render();
  })
)

// 사이드 카테고리별 클릭
const sideTopics = document.querySelectorAll(".side-menu-list button");
sideTopics.forEach((menu) => menu.addEventListener("click", async (event) => {
  let sideTopic = event.target.textContent.toLowerCase();
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${sideTopic}&page_size=5`)
    let header = new Headers({
      "x-api-key": API_KEY,
    })
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    render();
}))


// search button 키워드 검색
const keywordSearch = async() => {
  let keyword = searchInput.value;  
  let url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  let header = new Headers({
    "x-api-key": "Wn6iDfamh_CCZ-HEb7hI0e9fl3TrWF6ZdDB6uk_Z1AE",
  });

  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  render();
}


goBtn.addEventListener("click", keywordSearch);

