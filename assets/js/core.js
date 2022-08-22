const cart_cookie = "cart_box";
const channels = 2;
const backend_host = "https://backend.zalupa.world";
const development_hosts = ["localhost", "zalupa.world"];
const links_lt = [
    {"name": "twitch", "link": "https://www.twitch.tv/bratishkinoff"},
    {"name": "youtube", "link": "https://www.youtube.com/channel/UCg2uAOEoY-la2d-95uMmLuQ"},
    {"name": "telegram", "link": "https://t.me/zalupaonline"},
    {"name": "discord", "link": "https://discord.gg/qEqbVbMeEx"}
];
var donate_services_array = [];
var notify_hidden = true;
var glob_players = [];
var timer_notify;
var payment_url_global;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    ;
    return array;
};

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
};

function request_call(callback, url, method, json = false, json_body = null) {
    let request = new XMLHttpRequest();
    let json_body_local = {};
    request.open(method, url, true);

    if (method.toUpperCase() === "POST") {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        json_body_local = JSON.stringify(json_body)
    }
    ;

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            if (json) {
                callback(JSON.parse(request.responseText))
            } else {
                callback(request.responseText)
            }
        } else {
            console.log(`Request status code is ${request.status}`)
        }
    };

    request.onerror = function (error) {
        console.log(`Error make request! Details: ${error}`)
    };

    request.send(json_body_local)
};

function notify(text) {
    const error_box = document.querySelector(".error_box_cst");
    const error_text = document.querySelector(".error_text_cst");
    const scroll_top = document.querySelector(".btn-scroll-top");

    let notify_hide = function () {
        error_box.style.marginBottom = "-150px";
        scroll_top.setAttribute("style", "");
        notify_hidden = true
    };

    let notify_display = function () {
        notify_hidden = false;
        error_text.innerHTML = text;
        scroll_top.style.marginBottom =
            `calc(${document.getElementById("error_box_cst_id").offsetHeight}px)`;
        error_box.style.marginBottom = 0
    };

    if (notify_hidden) {
        notify_display()
    } else {
        notify_hide();
        setTimeout(notify_display, 200)
    }
    ;

    clearTimeout(timer_notify);
    timer_notify = setTimeout(notify_hide, 2500)
};

function url_builder_(base_url, submit_data_) {
    let url = new URL(base_url);
    for (let i = 0; i < submit_data_.length; i++) {
        url.searchParams.set(submit_data_[i].name, submit_data_[i].value)
    }
    ;
    return url.href
};

function countProperties(obj) {
    return Object.keys(obj).length
};

function getNoun(number, one = "игрок", two = "игрока", five = "игроков") {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five
    }
    ;
    n %= 10;
    if (n === 1) {
        return one
    }
    ;
    if (n >= 2 && n <= 4) {
        return two
    }
    ;
    return five
};

function get_last_tg_post_id(callback, source) {
    request_call(function (r) {
        if (r.success) {
            return callback(r.last_post)
        }
    }, `${backend_host}/channel?choice=${source}`, "GET", json = true)
};

function append_posts() {
    for (let i = 0; i < channels; i++) {
        get_last_tg_post_id(function (identifer) {
            let sl = document.querySelector(".telegram_frames");
            let script = document.createElement('script');
            script.src = "https://telegram.org/js/telegram-widget.js?19";
            script.setAttribute("async", "");
            script.setAttribute("data-telegram-post", identifer);
            script.setAttribute("data-width", "100%");
            script.setAttribute("data-userpic", "true");
            script.setAttribute("data-dark", "1");
            sl.appendChild(script);
            setTimeout(function () {
                let sl = document.getElementById("telegram_block_load");
                try {
                    sl.parentNode.removeChild(sl)
                } catch (_) {
                }
            }, 100)
        }, i)
    }
};

function get_game_server_data(callback) {
    const _data_error = function (ok = false) {
        let string_ = "";
        if (ok) {
            string_ = ""
        } else {
            string_ = "Не удается обновить информацию о сервере..."
        }
        ;
        document.getElementById("error_get_server_status").innerText = string_
    };
    request_call(function (r) {
        if (r.success) {
            callback(r.body)
        }
    }, `${backend_host}/server`, "GET", json = true)
};

function monitoring_game_server_update() {
    get_game_server_data(function (data) {
        document.getElementById("server_online_status").innerHTML =
            `Сейчас играет <span class="text-primary fw-semibold">${data.online}</span> ${getNoun(data.online)}`
    })
};

function game_server_updater() {
    monitoring_game_server_update();
    setInterval(monitoring_game_server_update, 5000)
};

function get_donate_services(callback) {
    request_call(function (r) {
        if (r.success) {
            callback(r.services)
        }
    }, `${backend_host}/donate/services`, "GET", json = true)
};

function create_payment(callback, customer, products, email = null, coupon = null) {
    request_call(function (r) {
        if (r.success) {
            callback(r.payment)
        } else {
            callback(null)
        }
    }, `${backend_host}/donate/payment/create`, "POST", json = true, json_body = {
        "customer": customer,
        "products": products,
        "email": email,
        "coupon": coupon
    })
};

function append_services() {
    get_donate_services(function (services) {
        donate_services_array = services;
        const size_classes = [
            "row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4"
        ];
        let sl = document.getElementById("donate_items_list");
        if (!services.length) {
            sl.innerHTML = "<span class=\"text-center\">Не удалось получить список товаров.</span>"
        } else {
            for (let i = 0; i < services.length; i++) {
                let click_data = {
                    "name": services[i].name,
                    "price": services[i].price,
                    "count": services[i].number,
                    "description": services[i].description,
                    "type": services[i].type,
                    "service_id": services[i].id
                };
                if (i && size_classes.length >= i) {
                    sl.classList.add(size_classes[i - 1])
                }
                ;
                sl.innerHTML = sl.innerHTML + `
                    <div class="col" id="donate_item_${services[i].id}">
                        <div class="card card-hover border-0 bg-transparent" 
                            onClick='donate_element_click(${JSON.stringify(click_data)})'>
                          <div class="position-relative">
                            <div class="parent-image-shadow donate_item_hover" 
                                id="donate_item_hover_${services[i].id}">
                                <div class="imageContainer">
                                    <img src="${services[i].image}"
                                     class="rounded-3 foregroundImg" alt="${services[i].name}" 
                                     style="display: block; margin: auto; width: 100px" loading="lazy">
                                    <img src="${services[i].image}"
                                     class="rounded-3 backgroundImg" alt="${services[i].name}" 
                                     style="display: block; margin: auto; width: 100px" loading="lazy">
                                 </div>
                            </div>
                            <div class="card-img-overlay d-flex flex-column align-items-center 
                                        justify-content-center rounded-3" 
                                 style="margin: auto">
                            </div>
                          </div>
                          <div class="card-body text-center p-3">
                                <h3 class="fs-lg fw-semibold pt-1 mb-2">${services[i].name}</h3>
                                <p class="mb-0">
                                    ${services[i].price} 
                                    ${getNoun(services[i].price, "рубль", "рубля", "рублей")} 
                                    = 
                                    ${services[i].number} 
                                    ${getNoun(services[i].number, "единица", "единицы", "единиц")}
                                </p>
                                <p class="fs-sm mb-0">${services[i].description}</p>
                          </div>
                        </div>
                    </div>
                `
            }
        }
        ;

        setTimeout(function () {
            let elem = document.getElementById('donate_block_load');
            try {
                elem.parentNode.removeChild(elem)
            } catch (_) {
            }
            ;
            document.getElementById("donate_items_list").style.display = "";
            document.getElementById("donate-title-desc").style.display = "";
            document.getElementById("donate-test-mode-enb").style.display = ""
        }, 100)
    })
};

function redirect_(url) {
    return window.location.replace(url)
};

function modal_close_() {
    document.body.classList.remove("modal-open");
    let modal = document.getElementById("donate_item_modal");
    modal.style.opacity = 0;
    setTimeout(function () {
        modal.style.display = "none"
    }, 350);
};

function modal_open_() {
    document.body.classList.add("modal-open");
    let modal = document.getElementById("donate_item_modal");
    modal.style.display = "block";
    setTimeout(function () {
        modal.style.opacity = 1
    }, 50);

    window.onclick = function (event) {
        if (event.target === modal) {
            modal_close_()
        }
    }
};

function switch_modal_containers(mode = "service") {
    const span = document.getElementsByClassName("close_b")[0];
    const info = document.getElementById("modal-info-container-c");
    const service = document.getElementById("modal-donate-container-c");
    const finish_donate = document.getElementById("modal-donate-finish-container-c");
    const title = document.querySelector(".modal-title");
    const _array = [
        {"name": "service", "selector": service, "title": "Товар"},
        {"name": "info", "selector": info, "title": "Сообщение"},
        {"name": "donate_finish", "selector": finish_donate, "title": "Корзина"}
    ];
    for (let i = 0; i < _array.length; i++) {
        let _mode = "none";
        if (mode === _array[i].name) {
            _mode = "block";
            title.innerText = _array[i].title
        }
        ;
        _array[i].selector.style.display = _mode
    }
    ;
    span.onclick = function () {
        modal_close_()
    }
};

function get_cookie_cart() {
    let cookie_cart = {};
    try {
        cookie_cart = JSON.parse(Cookies.get(cart_cookie))
    } catch (_) {
    }
    ;
    return cookie_cart
};

function update_cart_count() {
    document.getElementById("count_cart_items_dn").innerText = countProperties(get_cookie_cart())
};

function group_already_in_cart(user_cart) {
    let cart = Object.keys(user_cart);
    for (let i = 0; i < donate_services_array.length; i++) {
        if (donate_services_array[i].type === "group") {
            if (cart.includes(donate_services_array[i].id.toString())) {
                return true
            }
        }
    }
    ;
    return false
};

function comments_init() {
    const swiper_comments = new Swiper('#comment_swipe_container', {
        spaceBetween: 12,
        loop: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".swiper-pagination-comments",
            clickable: true
        },
        navigation: {
            prevEl: "#prev_comment",
            nextEl: "#next_comment"
        }
    })
};

function build_players_swiper() {
    let array_ = document.getElementById("players-swiper-array");
    const create_swiper = function () {
        new Swiper('#players_swipe_container', {
            slidesPerView: 2,
            spaceBetween: 24,
            autoplay: {
                delay: 3000,
            },
            loop: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: ".swiper-pagination-players",
                clickable: true
            },
            breakpoints: {
                500: {
                    slidesPerView: 3
                },
                650: {
                    slidesPerView: 4
                },
                900: {
                    slidesPerView: 5
                },
                1100: {
                    slidesPerView: 6
                }
            }
        })
    };
    request_call(function (r) {
        let player = r;
        shuffle(player);
        for (let i = 0; i < player.length; i++) {
            glob_players.push(player[i].name);
            array_.innerHTML = array_.innerHTML + `
                <div class="swiper-slide">
                    <span class="d-block py-3">
                        <img src="${player[i].head}" class="d-block mx-auto" width="154"
                           alt="${player[i].name}" loading="lazy"
                        <div class="card-body text-center p-3">
                            <h3 class="fs-lg fw-semibold pt-1 mb-2">${player[i].name}</h3>
                            <p class="fs-sm mb-0">${player[i].desc}</p>
                        </div>
                    </span>
                </div>
            `
        }
        ;
        create_swiper()
    }, "assets/data/players.json", "GET", json = true)
};

function donate_element_click(product_data) {
    switch_modal_containers("service");

    const exclude_types = ["group"];
    let desc = document.getElementById("donate_item_select_text");
    let text_template = `Товар <span class="text-primary fw-semibold">${product_data.name}</span>,` +
        `цена ${product_data.count} ${getNoun(product_data.count, "единицы", "единиц", "единиц")} ` +
        `<span class="text-primary fw-semibold">${product_data.price} ` +
        `${getNoun(product_data.price, "рубль", "рубля", "рублей")}</span>.`;
    let items_count_donate = document.getElementById("items_count_donate");
    let count_hint = document.getElementById("donate_count_text_hint");
    let add_to_cart = document.getElementById("donate_button_add_to_cart");
    const cookie_cart = get_cookie_cart();

    let switch_ = false;

    let _update_count = function () {
        add_to_cart.setAttribute(
            "onClick", `donate_cart(${product_data.service_id}, ${items_count_donate.value})`
        )
    };

    items_count_donate.value = 1;
    _update_count();

    const product_in_cart = cookie_cart.hasOwnProperty(product_data.service_id.toString());
    if (
        (exclude_types.includes(product_data.type) ||
            product_data.type === "group") && group_already_in_cart(cookie_cart)
    ) {
        switch_modal_containers("info");
        switch_ = true;
        let group_error = "";
        if (product_data.type === "group") {
            group_error = "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую."
        } else if (product_in_cart) {
            group_error = `Ошибка, вы можете добавить товар ` +
                `<span class="text-primary fw-semibold">${product_data.name}</span> ` +
                `только один раз.`
        } else {
            group_error = "Мы не знаем почему, но эта ошибка вызвана по неизвестным причинам."
        }
        ;
        document.getElementById("donate_info_block_text").innerHTML = group_error
    }
    ;

    let count_state = "block";
    if (exclude_types.includes(product_data.type)) {
        count_state = "none"
    }
    ;

    items_count_donate.style.display = count_state;
    count_hint.style.display = count_state;

    const only_dig = function () {
        let value = items_count_donate.value;
        items_count_donate.value = value.replace(/\D+/g, '')
    };

    const _calculate_price = function () {
        only_dig();
        if (!exclude_types.includes(product_data.type)) {
            let _price = parseInt(items_count_donate.value) * product_data.price;
            if (isNaN(_price) || 1 > Math.sign(_price)) {
                _price = 0
            }
            ;
            desc.innerHTML = `${text_template}<br/>Стоимость - ` +
                `<span class="text-primary fw-semibold">${_price} ` +
                `${getNoun(_price, "рубль", "рубля", "рублей")}</span>`;
            _update_count()
        }
    };

    desc.innerHTML = text_template;

    _calculate_price();
    items_count_donate.addEventListener('input', function (_) {
        _calculate_price()
    });

    modal_open_()
};

function donate_get_service_by_id(id) {
    for (let i = 0; i < donate_services_array.length; i++) {
        if (donate_services_array[i].id === parseInt(id)) {
            return donate_services_array[i]
        }
    }
    ;
    return null
};

function donate_reset_payment_state(repeat = false) {
    const button = document.getElementById("payment-button-donate");
    button.setAttribute("onClick", "generate_payment_link()");
    button.removeAttribute("disabled");
    button.innerText = repeat ? "Повторить" : "Дальше"
};

function donate_cart(product, count, remove = false) {
    if (!Number.isInteger(product) || !Number.isInteger(count)) {
        console.log("Error data donate_cart");
        return
    }
    ;
    if (1 > Math.sign(count)) {
        notify("Количество не может быть равно нулю или меньше");
        return
    }
    ;
    let cart = Cookies.get(cart_cookie);
    if (!cart) {
        Cookies.set(cart_cookie, JSON.stringify({}))
    }
    ;
    const els_ = JSON.parse(Cookies.get(cart_cookie));
    const product_data = donate_get_service_by_id(product);
    const local_prm = "<span style=\"color: #a4a6ff !important\">";
    if (remove) {
        delete els_[product];
        notify(`Товар ${local_prm} ${product_data.name}</span> убран из корзины`)
    } else {
        if (els_[product]) {
            els_[product] = els_[product] + count;
            notify(`В корзину добавлено ${local_prm} ${count} </span>` +
                `${getNoun(count, "единица", "единицы", "единиц")}` +
                `товара ${local_prm} ${product_data.name} </span>`)
        } else {
            els_[product] = count;
            notify(`Товар ${local_prm} ${product_data.name}</span> добавлен в корзину`)
        }
    }
    ;

    Cookies.set(cart_cookie, JSON.stringify(els_));
    modal_close_();
    donate_init();
    update_cart_count();
    donate_reset_payment_state()
};

function donate_cart_button(els = {}) {
    const selector_ = document.querySelectorAll('.donate-cart-button-cn');
    for (let i = 0; i < selector_.length; i++) {
        let sl = selector_[i].style;
        if (countProperties(els)) {
            sl.opacity = 1;
            sl.marginTop = "15px"
        } else {
            sl.opacity = 0;
            sl.marginTop = "-50px"
        }
    }
};

function donate_flush_cart() {
    Cookies.remove(cart_cookie);
    donate_cart_button({});
    notify("Корзина очищена")
};

function donate_enable_coupon(enabled = true) {
    const input = document.getElementById("coupon-input");
    const button = document.getElementById("coupon-button");

    if (enabled) {
        input.setAttribute("placeholder", "BRFF");
        input.removeAttribute("disabled");
        button.removeAttribute("disabled")
    } else {
        input.setAttribute("disabled", null);
        input.setAttribute("placeholder", "Сейчас недоступно");
        button.setAttribute("disabled", null)
    }
};

function generate_payment_link() {
    const button = document.getElementById("payment-button-donate");

    const customer = document.getElementById("donate_customer").value.trim();
    let email = document.getElementById("donate_email").value.trim();
    let coupon = document.getElementById("coupon-input").value.trim();

    if (!customer.length) {
        notify("Введите пожалуйста ваш никнейм");
        return
    } else if (customer.length > 40) {
        notify("Ваш никнейм слишком длинный");
        return
    } else if (!customer.match(/[A-z\d_\S]/i)) {
        notify("Никнейм не соотвествует формату")
    }
    ;
    if (!email.length) {
        email = null
    } else if (!validateEmail(email)) {
        notify("Ошибка, адрес почты недействительный");
        return
    }
    ;
    if (!coupon) {
        coupon = null
    }
    ;

    button.setAttribute("disabled", null);
    button.innerText = "Проверяем данные...";

    create_payment(function (callback_data) {
        if (callback_data) {
            button.removeAttribute("disabled");
            button.innerText = "Оплатить";
            payment_url_global = callback_data.url;
            button.setAttribute("onClick", "payment_action_bt()")
        } else {
            notify("Ошибка, не удалось сформировать чек для оплаты");
            donate_reset_payment_state(repeat = true)
        }
    }, customer, get_cookie_cart(), email, coupon)
};

function payment_action_bt() {
    window.open(payment_url_global, '_blank')
};

function donate_check_services_cart() {
    const services_cookie = Object.keys(get_cookie_cart());
    get_donate_services(function (services_origin) {
        let services = [];
        for (let i = 0; i < services_origin.length; i++) {
            services.push(services_origin[i].id)
        }
        ;
        for (let i = 0; i < services_cookie.length; i++) {
            if (!services.includes(parseInt(services_cookie[i]))) {
                let cart = JSON.parse(Cookies.get(cart_cookie));
                delete cart[parseInt(services_cookie[i])];
                Cookies.set(cart_cookie, JSON.stringify(cart));
                console.log(`Remove ${services_cookie[i]} from cart`)
            }
        }
    })
};

function donate_init() {
    let els = {};
    try {
        els = JSON.parse(Cookies.get(cart_cookie))
    } catch (_) {
    }
    ;
    donate_cart_button(els);
    donate_check_services_cart();
    donate_enable_coupon(enabled = false)
};

function donate_cart_call(coupon = null) {
    const cart = get_cookie_cart();
    const cart_keys = Object.keys(cart);
    const cart_dom = document.getElementById("donate-cart-list");

    const selectors_payment = [
        document.getElementById("donate_customer"),
        document.getElementById("donate_email"),
        document.getElementById("coupon-input")
    ];

    switch_modal_containers("donate_finish");
    modal_open_();
    cart_dom.innerHTML = "";
    let sum_price = 0;

    for (let i = 0; i < selectors_payment.length; i++) {
        selectors_payment[i].addEventListener('input', function (_) {
            donate_reset_payment_state()
        })
    }
    ;

    for (let i = 0; i < cart_keys.length; i++) {
        let item = donate_get_service_by_id(cart_keys[i]);
        let price = item.price * cart[item.id];
        sum_price += price;
        cart_dom.innerHTML = cart_dom.innerHTML + `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0 text-start">
                        <span class="text-primary fw-semibold">
                            x${item.number}</span> 
                        ${item.name}
                    </h6>
                    <small class="text-muted text-start cart-desc-td">${item.description}</small>
                </div>
                <span class="text-muted text-end" style="width: 30%">
                    ${price} ${getNoun(price, "рубль", "рубля", "рублей")}
                    <br/>x${cart[item.id]}</span>
            </li>
        `
    }
    ;

    const coupon_container = function () {
        cart_dom.innerHTML = cart_dom.innerHTML +
            `<li class="list-group-item d-flex justify-content-between bg-light">` +
                `<div class="text-primary">` +
                    `<h6 class="my-0 text-start">Купон</h6>` +
                    `<small class="text-start font-monospace" style="float: left">${coupon}</small>` +
                `</div>` +
                `<span class="text-primary">−0 рублей</span>` +
            `</li>`
    };

    const sum_container = function () {
        cart_dom.innerHTML = cart_dom.innerHTML +
            `<li class="list-group-item d-flex justify-content-between">` +
                `<span>Сумма</span>` +
                `<strong>${sum_price} ${getNoun(sum_price, "рубль", "рубля", "рублей")}</strong>` +
            `</li>`
    };

    if (coupon || true) {
        coupon_container()
    }
    ;
    sum_container();

    shuffle(glob_players);
    document.querySelector("input#donate_customer").setAttribute("placeholder", glob_players[0])
};

function links_set_() {
    let sl = document.getElementById("links-block-footer-v");
    for (let i = 0; i < links_lt.length; i++) {
        sl.innerHTML = sl.innerHTML +
            `<a href="${links_lt[i].link}" target="_blank" ` +
            `class="btn btn-icon btn-secondary btn-${links_lt[i].name} mx-2">` +
            `<i class="bx bxl-${links_lt[i].name}"></i></a>`
    }
};

function discord_init() {
    let src = "https://discordapp.com/widget?id=259124796971941890&theme=dark"
    let container = document.getElementById("discord-embed");

    container.innerHTML =
        `<iframe ` +
        `src="${src}" width="100%" height="300px" allowTransparency="true" frameBorder="0" ` +
        `loading="lazy" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"` +
        `></iframe>`
};

function landing_init() {
    if (development_hosts.includes(window.location.hostname)) {
        document.getElementById("landing_description_gb").innerText =
            "Этот сайт - development-версия!";
        document.getElementById("donate-test-mode-enb").innerText =
            "Этот блок работает в демонстративном режиме и не является функциональным."
    }
    ;
    links_set_();
    discord_init()
};

function finish_load() {
    document.querySelector("main").setAttribute("style", "");
    document.querySelector("footer").setAttribute("style", "");

    let heart = "&#10084;&#65039;";
    document.getElementById("footer-text-blc").innerHTML = `Made with ${heart} by KovalYRS for Zalupa.Online`
};

document.addEventListener("DOMContentLoaded", function () {
    landing_init();
    build_players_swiper();
    append_posts();
    comments_init();
    append_services();
    update_cart_count();
    game_server_updater();
    donate_init();
    finish_load();

    let elem = document.getElementById('dark-perm-set-bv');
    elem.parentNode.removeChild(elem);

    window.matchMedia("(prefers-color-scheme: dark)").addListener(
        console.log("dark now")
    )
})