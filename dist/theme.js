"use strict";

!function () {
  "use strict";

  var b, a, d, c, e, f;
  null !== (a = document.querySelector('[data-bs-toggle="mode"]')) && (b = a.querySelector(".form-check-input"), "dark" === mode ? (root.classList.add("dark-mode"), b.checked = !0) : (root.classList.remove("dark-mode"), b.checked = !1), a.addEventListener("click", function (a) {
    b.checked ? (root.classList.add("dark-mode"), window.localStorage.setItem("mode", "dark")) : (root.classList.remove("dark-mode"), window.localStorage.setItem("mode", "light"));
  })), null != (c = document.querySelector(".navbar-sticky")) && (a = c.classList, d = c.offsetHeight, a.contains("position-absolute") ? window.addEventListener("scroll", function (a) {
    500 < a.currentTarget.pageYOffset ? c.classList.add("navbar-stuck") : c.classList.remove("navbar-stuck");
  }) : window.addEventListener("scroll", function (a) {
    500 < a.currentTarget.pageYOffset ? (document.body.style.paddingTop = d + "px", c.classList.add("navbar-stuck")) : (document.body.style.paddingTop = "", c.classList.remove("navbar-stuck"));
  })), new SmoothScroll("[data-scroll]", {
    speed: 800,
    speedAsDuration: !0,
    offset: function offset(b, a) {
      return a.dataset.scrollOffset || 40;
    },
    header: "[data-scroll-header]",
    updateURL: !1
  }), null != (f = document.querySelector(".btn-scroll-top")) && (e = parseInt(600, 10), window.addEventListener("scroll", function (a) {
    a.currentTarget.pageYOffset > e ? f.classList.add("show") : f.classList.remove("show");
  }));
}();
//# sourceMappingURL=theme.js.map