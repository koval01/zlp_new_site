var global_theme_ = "light";
var mode = window.localStorage.getItem("mode");
const root = document.getElementsByTagName("html")[0];

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

null !== mode && "dark" === mode
        ? (root.classList.add("dark-mode"),
            document.querySelector(
                'meta[name="theme-color"]').setAttribute("content", "#0e0e10"),
            (global_theme_ = "dark")
        )
        : (root.classList.remove("dark-mode"),
            (global_theme_ = "light"),
            document.querySelector(
                'meta[name="theme-color"]').setAttribute("content", "#f7f7f8")
        ),
    (mode = darkThemeMq.matches ? "dark" : null);
