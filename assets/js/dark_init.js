let global_theme_ = 'light';
let mode = window.localStorage.getItem('mode'),
    root = document.getElementsByTagName('html')[0]
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
if (darkThemeMq.matches) {
    mode = 'dark'
} else {
    mode = null
}
if (mode !== null && mode === 'dark') {
    root.classList.add('dark-mode')
    global_theme_ = 'dark'
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0b0f19')
} else {
    root.classList.remove('dark-mode')
    global_theme_ = 'light'
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff')
}