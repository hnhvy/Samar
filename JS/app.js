var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

var testimonialThumbs = new Swiper(".testimonial-thumbs", {
  spaceBetween: 10,
  slidesPerView: 3,
  centeredSlides: true,
  freeMode: true,
  autoplay: true,
  loop: true,
  speed: 3000,
});
var testimonialContent = new Swiper(".testimonial-comment", {
  spaceBetween: 10,
  autoplay: true,
  loop: true,
  speed: 3000,
  thumbs: {
    swiper: testimonialThumbs,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// owl 1
var owl = $(".blog__carousel .owl-carousel");
owl.owlCarousel({
  items: 3,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
});
// owl 2
var owl2 = $(".owl-carousel2 .owl-carousel");
owl2.owlCarousel({
  items: 6,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
});

(function () {
  var backTop = document.getElementsByClassName("js-back-to-top")[0];
  if (backTop) {
    var dataElement = backTop.getAttribute("data-element");
    var scrollElement = dataElement
      ? document.querySelector(dataElement)
      : window;
    var scrollDuration = parseInt(backTop.getAttribute("data-duration")) || 300,
      scrollOffsetInit =
        parseInt(backTop.getAttribute("data-offset-in")) ||
        parseInt(backTop.getAttribute("data-offset")) ||
        0,
      scrollOffsetOutInit =
        parseInt(backTop.getAttribute("data-offset-out")) || 0,
      scrollOffset = 0,
      scrollOffsetOut = 0,
      scrolling = false;

    var targetIn = backTop.getAttribute("data-target-in")
        ? document.querySelector(backTop.getAttribute("data-target-in"))
        : false,
      targetOut = backTop.getAttribute("data-target-out")
        ? document.querySelector(backTop.getAttribute("data-target-out"))
        : false;

    updateOffsets();

    //detect click on back-to-top link
    backTop.addEventListener("click", function (event) {
      event.preventDefault();
      if (!window.requestAnimationFrame) {
        scrollElement.scrollTo(0, 0);
      } else {
        dataElement
          ? Util.scrollTo(0, scrollDuration, false, scrollElement)
          : Util.scrollTo(0, scrollDuration);
      }
      //move the focus to the #top-element - don't break keyboard navigation
      Util.moveFocus(
        document.getElementById(backTop.getAttribute("href").replace("#", ""))
      );
    });

    //listen to the window scroll and update back-to-top visibility
    checkBackToTop();
    if (scrollOffset > 0 || scrollOffsetOut > 0) {
      scrollElement.addEventListener("scroll", function (event) {
        if (!scrolling) {
          scrolling = true;
          !window.requestAnimationFrame
            ? setTimeout(function () {
                checkBackToTop();
              }, 250)
            : window.requestAnimationFrame(checkBackToTop);
        }
      });
    }

    function checkBackToTop() {
      updateOffsets();
      var windowTop =
        scrollElement.scrollTop || document.documentElement.scrollTop;
      if (!dataElement)
        windowTop = window.scrollY || document.documentElement.scrollTop;
      var condition = windowTop >= scrollOffset;
      if (scrollOffsetOut > 0) {
        condition =
          windowTop >= scrollOffset &&
          window.innerHeight + windowTop < scrollOffsetOut;
      }
      Util.toggleClass(backTop, "back-to-top--is-visible", condition);
      scrolling = false;
    }

    function updateOffsets() {
      scrollOffset = getOffset(targetIn, scrollOffsetInit, true);
      scrollOffsetOut = getOffset(targetOut, scrollOffsetOutInit);
    }

    function getOffset(target, startOffset, bool) {
      var offset = 0;
      if (target) {
        var windowTop =
          scrollElement.scrollTop || document.documentElement.scrollTop;
        if (!dataElement)
          windowTop = window.scrollY || document.documentElement.scrollTop;
        var boundingClientRect = target.getBoundingClientRect();
        offset = bool ? boundingClientRect.bottom : boundingClientRect.top;
        offset = offset + windowTop;
      }
      if (startOffset && startOffset) {
        offset = offset + parseInt(startOffset);
      }
      return offset;
    }
  }
})();
