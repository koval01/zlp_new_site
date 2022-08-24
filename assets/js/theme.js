!(function () {
    "use strict";
    var b, a, d, c, e, f;
    null !== (a = document.querySelector('[data-bs-toggle="mode"]')) &&
    ((b = a.querySelector(".form-check-input")),
        "dark" === mode ? (root.classList.add("dark-mode"), (b.checked = !0)) : (root.classList.remove("dark-mode"), (b.checked = !1)),
        a.addEventListener("click", function (a) {
            b.checked ? (root.classList.add("dark-mode"), window.localStorage.setItem("mode", "dark")) : (root.classList.remove("dark-mode"), window.localStorage.setItem("mode", "light"));
        })),
    null != (c = document.querySelector(".navbar-sticky")) &&
    ((a = c.classList),
        (d = c.offsetHeight),
        a.contains("position-absolute")
            ? window.addEventListener("scroll", function (a) {
                500 < a.currentTarget.pageYOffset ? c.classList.add("navbar-stuck") : c.classList.remove("navbar-stuck");
            })
            : window.addEventListener("scroll", function (a) {
                500 < a.currentTarget.pageYOffset ? ((document.body.style.paddingTop = d + "px"), c.classList.add("navbar-stuck")) : ((document.body.style.paddingTop = ""), c.classList.remove("navbar-stuck"));
            })),
        new SmoothScroll("[data-scroll]", {
            speed: 800,
            speedAsDuration: !0,
            offset: function (b, a) {
                return a.dataset.scrollOffset || 40;
            },
            header: "[data-scroll-header]",
            updateURL: !1,
        }),
    null != (f = document.querySelector(".btn-scroll-top")) &&
    ((e = parseInt(600, 10)),
        window.addEventListener("scroll", function (a) {
            a.currentTarget.pageYOffset > e ? f.classList.add("show") : f.classList.remove("show");
        })),
        (function () {
            for (var b = document.querySelectorAll(".password-toggle"), a = 0; a < b.length; a++)
                !(function (a) {
                    var c = b[a].querySelector(".form-control");
                    b[a].querySelector(".password-toggle-btn").addEventListener(
                        "click",
                        function (a) {
                            "checkbox" === a.target.type && (a.target.checked ? (c.type = "text") : (c.type = "password"));
                        },
                        !1
                    );
                })(a);
        })(),
    null !== document.querySelector(".rellax") && new Rellax(".rellax", { horizontal: !0 }),
        (function () {
            for (var b = document.querySelectorAll(".parallax"), a = 0; a < b.length; a++) new Parallax(b[a]);
        })(),
        (function (b, c, d) {
            for (var a = 0; a < b.length; a++) c.call(void 0, a, b[a]);
        })(document.querySelectorAll(".swiper"), function (d, b) {
            (c = null != b.dataset.swiperOptions ? JSON.parse(b.dataset.swiperOptions) : c).pager &&
            (a = {
                pagination: {
                    el: ".pagination .list-unstyled",
                    clickable: !0,
                    bulletActiveClass: "active",
                    bulletClass: "page-item",
                    renderBullet: function (a, b) {
                        return '<li class="' + b + '"><a href="#" class="page-link btn-icon btn-sm">' + (a + 1) + "</a></li>";
                    },
                },
            });
            var c,
                a = _objectSpread(_objectSpread({}, c), a),
                a = new Swiper(b, a);
            c.tabs &&
            a.on("activeIndexChange", function (a) {
                var b = document.querySelector(a.slides[a.activeIndex].dataset.swiperTab);
                document.querySelector(a.slides[a.previousIndex].dataset.swiperTab).classList.remove("active"), b.classList.add("active");
            });
        }),
        window.addEventListener(
            "load",
            function () {
                var a = document.getElementsByClassName("needs-validation");
                Array.prototype.filter.call(a, function (a) {
                    a.addEventListener(
                        "submit",
                        function (b) {
                            !1 === a.checkValidity() && (b.preventDefault(), b.stopPropagation()), a.classList.add("was-validated");
                        },
                        !1
                    );
                });
            },
            !1
        ),
        (function () {
            var a = document.querySelectorAll(".price-switch-wrapper");
            if (!(a.length <= 0))
                for (var b = 0; b < a.length; b++)
                    a[b].querySelector('[data-bs-toggle="price"]').addEventListener("change", function (d) {
                        for (
                            var e = d.currentTarget.querySelector('input[type="checkbox"]'),
                                a = d.currentTarget.closest(".price-switch-wrapper").querySelectorAll("[data-monthly-price]"),
                                f = d.currentTarget.closest(".price-switch-wrapper").querySelectorAll("[data-annual-price]"),
                                b = 0;
                            b < a.length;
                            b++
                        )
                            1 == e.checked ? a[b].classList.add("d-none") : a[b].classList.remove("d-none");
                        for (var c = 0; c < a.length; c++) 1 == e.checked ? f[c].classList.remove("d-none") : f[c].classList.add("d-none");
                    });
        })(),
        (function () {
            var d,
                b = document.querySelectorAll(".masonry-grid");
            if (null !== b)
                for (var a = 0; a < b.length; a++) {
                    var c = (function (a) {
                        (d = new Shuffle(b[a], {
                            itemSelector: ".masonry-grid-item",
                            sizer: ".masonry-grid-item",
                        })),
                            imagesLoaded(b[a]).on("progress", function () {
                                d.layout();
                            });
                        var e = b[a].closest(".masonry-filterable");
                        if (null === e) return { v: void 0 };
                        for (var f = e.querySelectorAll(".masonry-filters [data-group]"), c = 0; c < f.length; c++)
                            f[c].addEventListener("click", function (b) {
                                var a = e.querySelector(".masonry-filters .active"),
                                    c = this.dataset.group;
                                null !== a && a.classList.remove("active"), this.classList.add("active"), d.filter(c), b.preventDefault();
                            });
                    })(a);
                    if ("object" === _typeof(c)) return c.v;
                }
        })();
})();
