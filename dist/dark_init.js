"use strict";

var global_theme_ = "light";
var mode = window.localStorage.getItem("mode");
var root = document.getElementsByTagName("html")[0];
var darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
mode = darkThemeMq.matches ? "dark" : null, null !== mode && "dark" === mode ? (root.classList.add("dark-mode"), global_theme_ = "dark", document.querySelector('meta[name="theme-color"]').setAttribute("content", "#0e0e10")) : (root.classList.remove("dark-mode"), global_theme_ = "light", document.querySelector('meta[name="theme-color"]').setAttribute("content", "#f7f7f8"));
//# sourceMappingURL=dark_init.js.map