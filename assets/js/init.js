const development_hosts = [
    "koval01.github.io", "localhost"],
    test_local = false,
    // start context
init_logo_splash = () => {
        let logo_selector = document.getElementById("logo-spalsh-sb");
        logo_selector.style.scale = "1";
        logo_selector.style.bottom = "5vh";
}, tg_frame_theme_update = () => {
    try {
        const frame = document.getElementById("tg-iframe-view");
        const url_ob = new URL(frame.src);
        const radio_ = document
            .querySelector('[data-bs-toggle="mode"]')
            .querySelector(".form-check-input");

        if (radio_.checked) {
            url_ob.hash = "#dark";
        } else {
            url_ob.hash = "#light";
        }
        frame.src = url_ob.href;
    } catch (_) {}
}, theme_get = () => {
    let cookie_saved_theme = {};
    try {
        cookie_saved_theme = JSON.parse(Cookies.get("c_saved_theme"));
    } catch (_) {}
    return cookie_saved_theme;
}, notify = (text) => {
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
        scroll_top.style.marginBottom = `calc(${document.getElementById("error_box_cst_id").offsetHeight}px)`;
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
}, requestCall = (callback, url, method, json = false, json_body = null) => {
    let request = new XMLHttpRequest();
    let json_body_local = {};
    request.open(method, url, true);

    if (method.toUpperCase() === "POST") {
        request.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8"
        );
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
                callback({success: false});
            } else {
                callback(null);
            }
        }
    };

    request.send(json_body_local);
};


if (!development_hosts.includes(window.location.hostname)) {
    backend_host = `https://${domain_back}`;
} else {
    // skip

    // re_token = "6LdXKSMlAAAAABS0gPaoKaoeWlSJBc-vfV4e5Pib";
    // telegram_bot_username = "zalupa_feedback_bot";
    // if (window.location.hostname === "localhost" && test_local) {
    //     backend_host = "http://127.0.0.1:8000";
    // } else {
    //     backend_host = "https://api.zalupa.online";
    // }
}

init_logo_splash();

let script_re = document.createElement('script');
const script_core = document.createElement('script');
script_re.onload = function () {
    script_core.src = "assets/js/core.min.js";
    document.body.appendChild(script_core);
}

script_re.src = `https://www.google.com/recaptcha/api.js?render=${re_token}`;
document.body.appendChild(script_re);
