const development_hosts = ["zalupa.world", "localhost"];
const container_dev_splash = document.querySelector(".is-dev-site-splash");
const test_local = false;

function notify(text) {
    const error_box = document.querySelector(".error_box_cst");
    const error_text = document.querySelector(".error_text_cst");
    const scroll_top = document.querySelector(".btn-scroll-top");

    let notify_hide = function () {
        error_box.style.marginBottom = "-150px";
        scroll_top.setAttribute("style", "");
        notify_hidden = true;
    };

    let notify_display = function () {
        notify_hidden = false;
        error_text.innerHTML = text;
        scroll_top.style.marginBottom = `calc(${
            document.getElementById("error_box_cst_id").offsetHeight
        }px)`;
        error_box.style.marginBottom = "0";
    };

    if (notify_hidden) {
        notify_display();
    } else {
        notify_hide();
        setTimeout(notify_display, 200);
    }

    clearTimeout(timer_notify);
    timer_notify = setTimeout(notify_hide, 2500);
}

function request_call(callback, url, method, json = false, json_body = null) {
    let request = new XMLHttpRequest();
    let json_body_local = {};
    request.open(method, url, true);

    if (method.toUpperCase() === "POST") {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        json_body_local = JSON.stringify(json_body);
    }

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            if (json) {
                callback(JSON.parse(request.responseText));
            } else {
                callback(request.responseText);
            }
        } else {
            console.log(`Request status code is ${request.status}`);
        }
    };

    request.onerror = function (error) {
        console.log(`Error make request! Details: ${error}`);
        callback(null)
    };

    request.onreadystatechange = () => {
        if (request.status >= 400) {
            if (json) {
                callback({
                    success: false
                });
            } else {
                callback(null);
            }
        }
    };

    request.send(json_body_local);
}

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
    if (window.location.hostname === "localhost" && test_local) {
        backend_host = "http://127.0.0.1:8000"
    } else {
        backend_host = "https://backend.zalupa.world"
    }
    if (window.location.hostname !== "localhost") {
        is_development_splash()
    }
}

let script_re = document.createElement('script');
var script_core = document.createElement('script');
script_re.onload = function () {
    script_core.src = "assets/js/core.min.js";
    document.body.appendChild(script_core);
}

script_re.src = `https://www.google.com/recaptcha/api.js?render=${re_token}`;
document.body.appendChild(script_re)