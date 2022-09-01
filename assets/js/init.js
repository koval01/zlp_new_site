const development_hosts = ["zalupa.world", "localhost"];
const container_dev_splash = document.querySelector(".is-dev-site-splash");

function is_development_splash() {
    document.body.classList.add("modal-open");
    container_dev_splash.style.display = ""
}

function close_dev_splash() {
    document.body.classList.remove("modal-open");
    container_dev_splash.style.marginTop = "-100vh"
    setTimeout(function () {
        container_dev_splash.style.display = "none"
    }, 600)
}

if (!development_hosts.includes(window.location.hostname)) {
    backend_host = `https://${domain_back}`
} else {
    re_token = "6LfoCqYhAAAAAOLwNkJt45YPE-cCGCZ9ZSqI5Na_";
    is_development_splash()
}

let script_re = document.createElement('script');
script_re.onload = function () {
    const scripts = ["theme", "core"];
    for (let i = 0; i < scripts.length; i++) {
        let script = document.createElement('script');
        script.src = `assets/js/${scripts[i]}.min.js`;
        document.body.appendChild(script);
    }
}

script_re.src = `https://www.google.com/recaptcha/api.js?render=${re_token}`;
document.body.appendChild(script_re)