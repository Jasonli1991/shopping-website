function slideshow() {
  var slideshow = document.getElementById("slideshow");
  var imgs = slideshow.getElementsByTagName("img"); 
  var pages = slideshow.querySelectorAll('input[type="radio"]'); 
  var current = 0

  function slideOff() {
    imgs[current].className = ""; 
    pages[current].className = "";
  }

  function slideOn() {
    imgs[current].className = "active"; 
    pages[current].className = "active";
  }

  function activatePage() {
    // 設定當前頁面的 label 樣式為 "active"
    pages[current].className = "active";
  }

  function changeSlide() {
    // 切换图片的函数
    slideOff();
    current++; // 自增1
    if (current >= 4) current = 0;
    slideOn();
    activatePage(); // 切換圖片時同時變更 label 樣式
  }

  // 每5s调用changeSlide函数进行图片轮播
  var slideon = setInterval(changeSlide, 5000);

  slideshow.onmouseover = function() {
    clearInterval(slideon); //当鼠标移入时清除轮播事件
  };
  slideshow.onmouseout = function() {
    slideon = setInterval(changeSlide, 5000); //当鼠标移出时重新开始轮播事件
  };

  for (var i = 0; i < pages.length; i++) {
    pages[i].addEventListener("click", function() {
      slideOff(); // 暫時先移除輪播
      current = this.id.slice(-1) - 1; // 取得當前選中的頁面
      slideOn(); // 顯示當前選中的頁面
      activatePage(); // 切換圖片時同時變更 label 樣式
    });
  }

  activatePage(); // 初始化時設定初始 label 樣式
}

slideshow();
