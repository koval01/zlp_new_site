"use strict";

const development_hosts = ["zalupa.world", "localhost"];
const site_domains = {"prod": "zalupa.online", "dev": development_hosts[0], "test": development_hosts[1]};
const cart_cookie = "cart_box";
const channels = 2;
const links_lt = [
    {
        name: "twitch",
        link: "https://www.twitch.tv/bratishkinoff"
    },
    {
        name: "youtube",
        link: "https://www.youtube.com/channel/UCg2uAOEoY-la2d-95uMmLuQ"
    },
    {
        name: "telegram",
        link: "https://t.me/zalupaonline"
    },
    {
        name: "discord",
        link: "https://discord.gg/qEqbVbMeEx"
    }
];
const lock_of = true;
var donate_services_array = [];
var notify_hidden = true;
var glob_players = [];
var timer_notify;
var payment_url_global;
var checked_coupon = "";
var failed_coupon = "";
var backend_host = "https://backend.zalupa.world";
var re_token = "6LfoCqYhAAAAAOLwNkJt45YPE-cCGCZ9ZSqI5Na_";
var work_domain_v = "zalupa.online";

if (!development_hosts.includes(window.location.hostname)) {
    backend_host = "https://api.zalupa.online";
    re_token = ""
}

function init_host_() {
    const keys = Object.keys(site_domains);
    for (let i = 0; i < keys.length; i++) {
        if (site_domains[keys[i]] === window.location.hostname) {
            work_domain_v = site_domains[keys[i]]
        }
    }
}

function linkHash() {
    return window.location.hash.substring(1)
}

function getHash(link) {
    let hash = window.location.hash.substr(1);
    return Object.keys(hash.split('&').reduce(function (result, item) {
        let parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {}))[0]
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }

    return array;
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
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
        error_box.style.marginBottom = 0;
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

function url_builder_(base_url, submit_data_) {
    let url = new URL(base_url);

    for (let i = 0; i < submit_data_.length; i++) {
        url.searchParams.set(submit_data_[i].name, submit_data_[i].value);
    }

    return url.href;
}

function countProperties(obj) {
    return Object.keys(obj).length;
}

function getNoun(number, one = "игрок", two = "игрока", five = "игроков") {
    let n = Math.abs(number);
    n %= 100;

    if (n >= 5 && n <= 20) {
        return five;
    }

    n %= 10;

    if (n === 1) {
        return one;
    }

    if (n >= 2 && n <= 4) {
        return two;
    }

    return five;
}

function get_last_tg_post_id(callback, source) {
    request_call(
        function (r) {
            if (r.success) {
                return callback(r.last_post);
            }
        },
        `${backend_host}/channel?choice=${source}`,
        "GET",
        true
    );
}

function append_posts() {
    for (let i = 0; i < channels; i++) {
        get_last_tg_post_id(function (identifer) {
            let sl = document.querySelector(".telegram_frames");
            let script = document.createElement("script");
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
                    sl.parentNode.removeChild(sl);
                } catch (_) {
                }
            }, 100);
        }, i);
    }
}

function get_game_server_data(callback) {
    const _data_error = function (ok = false) {
        let string_ = "";

        if (ok) {
            string_ = "";
        } else {
            string_ = "Не удается обновить информацию о сервере...";
        }

        document.getElementById("error_get_server_status").innerText = string_;
    };

    request_call(
        function (r) {
            if (r.success) {
                callback(r.body);
            }
        },
        `${backend_host}/server`,
        "GET",
        true
    );
}

function monitoring_game_server_update() {
    get_game_server_data(function (data) {
        document.getElementById(
            "server_online_status"
        ).innerHTML = `Сейчас играет <span class="text-primary fw-semibold">${
            data.online
        }</span> ${getNoun(data.online)}`;
    });
}

function game_server_updater() {
    monitoring_game_server_update();
    setInterval(monitoring_game_server_update, 5000);
}

function get_donate_services(callback) {
    grecaptcha.ready(function () {
        grecaptcha
            .execute(re_token, {
                action: "submit"
            })
            .then(function (token_update) {
                request_call(
                    function (r) {
                        if (r.success) {
                            callback(r.services);
                        }
                    },
                    `${backend_host}/donate/services`,
                    "POST",
                    true, {
                        token: token_update
                    }
                );
            });
    });
}

function create_payment(callback, customer, products, email = "", coupon = "") {
    grecaptcha.ready(function () {
        grecaptcha
            .execute(re_token, {
                action: "submit"
            })
            .then(function (token_update) {
                request_call(
                    function (r) {
                        if (r.success) {
                            callback(r.payment);
                        } else {
                            callback(null);
                        }
                    },
                    `${backend_host}/donate/payment/create`,
                    "POST",
                    true, {
                        customer: customer,
                        products: products,
                        email: email,
                        coupon: coupon,
                        token: token_update,
                        success_url: `https://${work_domain_v}/#success_pay_i_ok`
                    }
                );
            });
    });
}

function check_coupon(callback, coupon) {
    grecaptcha.ready(function () {
        grecaptcha
            .execute(re_token, {
                action: "submit"
            })
            .then(function (token_update) {
                request_call(
                    function (r) {
                        if (r.success) {
                            callback(r.coupon);
                        } else {
                            callback(null);
                        }
                    },
                    `${backend_host}/donate/coupon`,
                    "POST",
                    true, {
                        code: coupon,
                        token: token_update
                    }
                );
            });
    });
}

function check_payment(callback, payment_id) {
    grecaptcha.ready(function () {
        grecaptcha
            .execute(re_token, {
                action: "submit"
            })
            .then(function (token_update) {
                request_call(
                    function (r) {
                        if (r.success) {
                            callback(r.payment);
                        } else {
                            callback(null);
                        }
                    },
                    `${backend_host}/donate/payment_get`,
                    "POST",
                    true, {
                        payment_id: payment_id,
                        token: token_update
                    }
                );
            });
    });
}

function append_services() {
    get_donate_services(function (services) {
        donate_services_array = services;
        const size_classes = ["row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4"];
        let sl = document.getElementById("donate_items_list");

        if (!services.length) {
            sl.innerHTML =
                '<span class="text-center">Не удалось получить список товаров.</span>';
        } else {
            for (let i = 0; i < services.length; i++) {
                let click_data = {
                    name: services[i].name,
                    price: services[i].price,
                    count: services[i].number,
                    description: services[i].description,
                    type: services[i].type,
                    service_id: services[i].id
                };

                if (i && size_classes.length >= i) {
                    sl.classList.add(size_classes[i - 1]);
                }

                sl.innerHTML =
                    sl.innerHTML +
                    `
                    <div class="col" id="donate_item_${services[i].id}">
                        <div class="card border-0 bg-transparent" 
                            onClick='donate_element_click(${JSON.stringify(
                        click_data
                    )})'>
                          <div class="position-relative">
                            <div class="parent-image-shadow donate_item_hover" 
                                id="donate_item_hover_${services[i].id}">
                                <div class="imageContainer">
                                    <img src="${services[i].image}"
                                     class="rounded-3 foregroundImg" alt="${
                        services[i].name
                    }" 
                                     style="display: block; margin: auto; width: 100px" loading="lazy">
                                    <img src="${services[i].image}"
                                     class="rounded-3 backgroundImg" alt="${
                        services[i].name
                    }" 
                                     style="display: block; margin: auto; width: 100px" loading="lazy">
                                 </div>
                            </div>
                            <div class="card-img-overlay d-flex flex-column align-items-center 
                                        justify-content-center rounded-3" 
                                 style="margin: auto">
                            </div>
                          </div>
                          <div class="card-body text-center p-3">
                                <h3 class="fs-lg fw-semibold pt-1 mb-2">${
                        services[i].name
                    }</h3>
                                <p class="mb-0">
                                    ${services[i].price} 
                                    ${getNoun(
                        services[i].price,
                        "рубль",
                        "рубля",
                        "рублей"
                    )} 
                                    = 
                                    ${services[i].number} 
                                    ${getNoun(
                        services[i].number,
                        "единица",
                        "единицы",
                        "единиц"
                    )}
                                </p>
                                <p class="fs-sm mb-0">${
                        services[i].description
                    }</p>
                          </div>
                        </div>
                    </div>
                `;
            }
        }

        setTimeout(function () {
            const elem = document.getElementById("donate_block_load");
            const ids = [
                "donate_items_list", "donate-title-desc",
                "donate-test-mode-enb", "donate-cart-container"
            ];

            try {
                elem.parentNode.removeChild(elem);
            } catch (_) {
            }

            for (let i = 0; i < ids.length; i++) {
                try {
                    document.getElementById(ids[i]).style.display = ""
                } catch (e) {
                    console.log(`Donate block loader error. Details: ${e}`)
                }
            }
        }, 100);
    });
}

function redirect_(url) {
    return window.location.replace(url);
}

function modal_close_() {
    document.body.classList.remove("modal-open");
    let modal = document.getElementById("donate_item_modal");
    modal.style.opacity = 0;
    setTimeout(function () {
        modal.style.display = "none";
    }, 350);
}

function modal_open_() {
    document.body.classList.add("modal-open");
    let modal = document.getElementById("donate_item_modal");
    modal.style.display = "block";
    setTimeout(function () {
        modal.style.opacity = 1;
    }, 50);

    window.onclick = function (event) {
        if (event.target === modal) {
            modal_close_();
        }
    };
}

function switch_modal_containers(mode = "service") {
    const span = document.getElementsByClassName("close_b")[0];
    const info = document.getElementById("modal-info-container-c");
    const service = document.getElementById("modal-donate-container-c");
    const success = document.getElementById("modal-donate-success-container");
    const finish_donate = document.getElementById(
        "modal-donate-finish-container-c"
    );
    const title = document.querySelector(".modal-title");
    const _array = [
        {
            name: "service",
            selector: service,
            title: "Товар"
        },
        {
            name: "info",
            selector: info,
            title: "Сообщение"
        },
        {
            name: "success",
            selector: success,
            title: "Чек"
        },
        {
            name: "donate_finish",
            selector: finish_donate,
            title: "Корзина"
        }
    ];

    for (let i = 0; i < _array.length; i++) {
        let _mode = "none";

        if (mode === _array[i].name) {
            _mode = "block";
            title.innerText = _array[i].title;
        }

        _array[i].selector.style.display = _mode;
    }

    span.onclick = function () {
        modal_close_();
    };
}

function discount_calculate(price, discount) {
    discount = discount / 100;
    return (price * discount).toFixed();
}

function get_cookie_cart() {
    let cookie_cart = {};

    try {
        cookie_cart = JSON.parse(Cookies.get(cart_cookie));
    } catch (_) {
    }

    return cookie_cart;
}

function update_cart_count() {
    document.getElementById("count_cart_items_dn").innerText = countProperties(
        get_cookie_cart()
    );
}

function group_already_in_cart(user_cart) {
    let cart = Object.keys(user_cart);

    for (let i = 0; i < donate_services_array.length; i++) {
        if (donate_services_array[i].type === "group") {
            if (cart.includes(donate_services_array[i].id.toString())) {
                return true;
            }
        }
    }

    return false;
}

function comments_init() {
    let array_ = document.getElementById("comment_swipe_array");

    const create_swiper = function () {
        new Swiper("#comment_swipe_container", {
            spaceBetween: 12,
            loop: true,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 6000
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                prevEl: "#prev_comment",
                nextEl: "#next_comment"
            }
        });
    };

    request_call(
        function (r) {
            let comment = r;
            shuffle(comment);

            for (let i = 0; i < comment.length; i++) {
                array_.innerHTML =
                    array_.innerHTML +
                    `
                <div class="swiper-slide h-auto px-2">
                    <figure class="card h-100 position-relative border-0 shadow-sm py-3 p-0 p-xxl-4 my-0">
                        <span class="btn btn-primary btn-lg shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4 ms-xxl-5 zlp-comment-icon">
                          <i class="bx bxs-quote-left"></i>
                          Залупный комментарий
                        </span>
                        <blockquote class="card-body mt-2 mb-2">
                            <p class="fs-lg mb-0" style="font-family: sans-serif">&#171;${comment[i].text}&#187;</p>
                        </blockquote>
                        <figcaption class="card-footer d-flex align-items-center border-0 pt-0 mt-n2 mt-lg-0">
                            <div>
                                <h6 class="fw-semibold lh-base mb-0">${comment[i].name}</h6>
                                <span class="fs-sm text-muted">${comment[i].sign}</span>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            `;
            }

            create_swiper();
        },
        "assets/data/comments.json",
        "GET",
        true
    );
}

function build_players_swiper() {
    let array_ = document.getElementById("players-swiper-array");

    const create_swiper = function () {
        new Swiper("#players_swipe_container", {
            slidesPerView: 2,
            spaceBetween: 24,
            autoplay: {
                delay: 3000
            },
            loop: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: ".swiper-pagination",
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
        });
    };

    request_call(
        function (r) {
            let player = r;
            shuffle(player);

            for (let i = 0; i < player.length; i++) {
                glob_players.push(player[i].name);
                array_.innerHTML =
                    array_.innerHTML +
                    `
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
            `;
            }

            create_swiper();
        },
        "assets/data/players.json",
        "GET",
        true
    );
}

function donate_element_click(product_data) {
    switch_modal_containers("service");
    const exclude_types = ["group"];
    let desc = document.getElementById("donate_item_select_text");
    let text_template =
        `Товар <span class="text-primary fw-semibold">${product_data.name}</span>,` +
        `цена ${product_data.count} ${getNoun(
            product_data.count,
            "единицы",
            "единиц",
            "единиц"
        )} ` +
        `<span class="text-primary fw-semibold">${product_data.price} ` +
        `${getNoun(product_data.price, "рубль", "рубля", "рублей")}</span>.`;
    let items_count_donate = document.getElementById("items_count_donate");
    let count_hint = document.getElementById("donate_count_text_hint");
    let add_to_cart = document.getElementById("donate_button_add_to_cart");
    const cookie_cart = get_cookie_cart();
    let switch_ = false;

    let _update_count = function () {
        add_to_cart.setAttribute(
            "onClick",
            `donate_cart(${product_data.service_id}, ${items_count_donate.value})`
        );
    };

    items_count_donate.value = 1;

    _update_count();

    const product_in_cart = cookie_cart.hasOwnProperty(
        product_data.service_id.toString()
    );

    if (
        (exclude_types.includes(product_data.type) ||
            product_data.type === "group") &&
        group_already_in_cart(cookie_cart)
    ) {
        switch_modal_containers("info");
        switch_ = true;
        let group_error = "";

        if (product_data.type === "group") {
            group_error =
                "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую.";
        } else if (product_in_cart) {
            group_error =
                `Ошибка, вы можете добавить товар ` +
                `<span class="text-primary fw-semibold">${product_data.name}</span> ` +
                `только один раз.`;
        } else {
            group_error =
                "Мы не знаем почему, но эта ошибка вызвана по неизвестным причинам.";
        }

        document.getElementById("donate_info_block_text").innerHTML = group_error;
    }

    let count_state = "block";

    if (exclude_types.includes(product_data.type)) {
        count_state = "none";
    }

    items_count_donate.style.display = count_state;
    count_hint.style.display = count_state;

    const only_dig = function () {
        let value = items_count_donate.value;
        items_count_donate.value = value.replace(/\D+/g, "");
    };

    const _calculate_price = function () {
        only_dig();

        if (!exclude_types.includes(product_data.type)) {
            let _price = parseInt(items_count_donate.value) * product_data.price;

            let currenct_in_cart = cookie_cart[product_data.service_id];
            let template_counter_i = "";

            if (isNaN(_price) || 1 > Math.sign(_price)) {
                _price = 0;
            }

            if (currenct_in_cart) {
                template_counter_i =
                    `Уже в корзине -  <span class="text-primary fw-semibold">` +
                    `${currenct_in_cart}</span>`;
            }

            desc.innerHTML =
                `${text_template}<br/>Стоимость - ` +
                `<span class="text-primary fw-semibold">${_price} ` +
                `${getNoun(_price, "рубль", "рубля", "рублей")}</span>` +
                `<br/>${template_counter_i}`;

            _update_count();
        }
    };

    desc.innerHTML = text_template;

    _calculate_price();

    items_count_donate.addEventListener("input", function (_) {
        _calculate_price();
    });
    modal_open_();
}

function donate_get_service_by_id(id) {
    for (let i = 0; i < donate_services_array.length; i++) {
        if (donate_services_array[i].id === parseInt(id)) {
            return donate_services_array[i];
        }
    }

    return null;
}

function donate_reset_payment_state(repeat = false) {
    const button = document.getElementById("payment-button-donate");
    button.setAttribute("onClick", "generate_payment_link()");
    button.removeAttribute("disabled");
    button.innerText = repeat ? "Повторить" : "Дальше";
}

function donate_cart(product, count, remove = false) {
    let cart = Cookies.get(cart_cookie);
    let cart_parsed = get_cookie_cart();
    let product_count_in_cart = 0;
    let max_item_count = 15000;
    const local_prm = '<span style="color: #a4a6ff">';

    try {
        let p = cart_parsed[product];

        if (Number.isInteger(p)) {
            product_count_in_cart = +p;
        }
    } catch (_) {
    }

    if (!Number.isInteger(product) || !Number.isInteger(count)) {
        console.log("Error data donate_cart");
        return;
    }

    if (1 > Math.sign(count)) {
        notify("Количество не может быть равно нулю или меньше");
        return;
    }

    if (product_count_in_cart + count > max_item_count) {
        notify(`Максимальное количество - ${local_prm}${max_item_count}</span>`);
        return;
    }

    if (!cart) {
        Cookies.set(cart_cookie, JSON.stringify({}));
    }

    const els_ = JSON.parse(Cookies.get(cart_cookie));
    const product_data = donate_get_service_by_id(product);

    if (remove) {
        delete els_[product];
        notify(`Товар ${local_prm} ${product_data.name}</span> убран из корзины`);
    } else {
        if (els_[product]) {
            els_[product] = els_[product] + count;
            notify(
                `В корзину добавлено ${local_prm} ${count} </span>` +
                `${getNoun(count, "единица", "единицы", "единиц")}` +
                `товара ${local_prm} ${product_data.name} </span>`
            );
        } else {
            els_[product] = count;
            notify(
                `Товар ${local_prm} ${product_data.name}</span> добавлен в корзину`
            );
        }
    }

    Cookies.set(cart_cookie, JSON.stringify(els_));
    modal_close_();
    donate_init();
    update_cart_count();
    donate_reset_payment_state();
}

function donate_cart_button(els = {}) {
    const selector_ = document.querySelectorAll(".donate-cart-button-cn");

    for (let i = 0; i < selector_.length; i++) {
        let sl = selector_[i].style;

        if (countProperties(els)) {
            sl.display = "flex";
            setTimeout(function () {
                sl.opacity = 1;
                sl.marginTop = "15px";
                selector_[i].removeAttribute("disabled");
            }, 50);
        } else {
            selector_[i].setAttribute("disabled", "");
            sl.opacity = 0;
            sl.marginTop = "-50px";
            setTimeout(function () {
                sl.display = "none";
            }, 350);
        }
    }
}

function donate_flush_cart() {
    Cookies.remove(cart_cookie);
    donate_cart_button({});
    notify("Корзина очищена");
}

function coupon_check() {
    const input = document.getElementById("coupon-input");
    const button = document.getElementById("coupon-button");
    let code = "";

    try {
        code = input.value.trim()
    } catch (_) {
    }

    const coupon_notfd = function () {
        notify(
            `Купон <span class="text-primary fw-semibold">${failed_coupon}</span> не найден`
        )
    }

    if (!code.length) {
        notify("Вы не указали купон");
        return;
    } else if (code.length > 20) {
        notify("Купон слишком длинный");
        return;
    } else if (!/^[A-z\d_]+$/.test(code)) {
        notify("Купон указан неверно");
        return;
    } else if (checked_coupon === code) {
        notify("Этот купон уже используется");
        return;
    } else if (failed_coupon === code) {
        coupon_notfd();
        return;
    }

    const input_lock = function (lock = false) {
        if (lock) {
            input.setAttribute("disabled", "");
            button.setAttribute("disabled", "");
            button.innerText = "Проверяем";
        } else {
            input.removeAttribute("disabled");
            button.removeAttribute("disabled");
            button.innerText = "Проверить";
        }
    };

    input_lock(true);
    check_coupon(function (r) {
        if (r) {
            checked_coupon = code;
            notify(
                `Купон <span class="text-primary fw-semibold">${code}</span> действительный`
            );
            donate_cart_call(code, false);
        } else {
            failed_coupon = code;
            coupon_notfd()
        }

        input_lock();
    }, code);
}

function donate_enable_coupon(enabled = true) {
    const input = document.getElementById("coupon-input");
    const button = document.getElementById("coupon-button");

    if (enabled) {
        input.setAttribute("placeholder", "BRFF");
        button.setAttribute("onClick", "coupon_check()");
        input.removeAttribute("disabled");
        button.removeAttribute("disabled");
    } else {
        input.setAttribute("disabled", "");
        input.setAttribute("placeholder", "Сейчас недоступно");
        button.setAttribute("disabled", "");
    }
}

function generate_payment_link() {
    const button = document.getElementById("payment-button-donate");
    const customer = document.getElementById("donate_customer").value.trim();
    let email = document.getElementById("donate_email").value.trim();
    let coupon = "";

    try {
        coupon = checked_coupon.trim()
    } catch (_) {
    }
    ;

    if (!customer.length) {
        notify("Введите пожалуйста ваш никнейм");
        return;
    } else if (customer.length > 40) {
        notify("Ваш никнейм слишком длинный");
        return;
    } else if (!/^[A-z\d_]+$/.test(customer)) {
        notify("Никнейм не соотвествует формату");
    }

    if (!email.length) {
        email = null;
    } else if (!validateEmail(email)) {
        notify("Ошибка, адрес почты недействительный");
        return;
    }

    if (!coupon) {
        coupon = null;
    }

    button.setAttribute("disabled", "");
    button.innerText = "Проверяем данные...";
    create_payment(
        function (callback_data) {
            if (callback_data) {
                button.removeAttribute("disabled");
                button.innerText = "Оплатить";
                payment_url_global = callback_data.url;
                button.setAttribute("onClick", "payment_action_bt()");
            } else {
                notify("Ошибка, не удалось сформировать чек для оплаты");
                donate_reset_payment_state(true);
            }
        },
        customer,
        get_cookie_cart(),
        email,
        coupon
    );
}

function payment_action_bt() {
    window.open(payment_url_global, "_blank");
}

function donate_check_services_cart() {
    const services_cookie = Object.keys(get_cookie_cart());
    get_donate_services(function (services_origin) {
        let services = [];

        for (let i = 0; i < services_origin.length; i++) {
            services.push(services_origin[i].id);
        }

        for (let i = 0; i < services_cookie.length; i++) {
            if (!services.includes(parseInt(services_cookie[i]))) {
                let cart = JSON.parse(Cookies.get(cart_cookie));
                delete cart[parseInt(services_cookie[i])];
                Cookies.set(cart_cookie, JSON.stringify(cart));
                console.log(`Remove ${services_cookie[i]} from cart`);
            }
        }
    });
}

function donate_init() {
    let els = {};

    try {
        els = JSON.parse(Cookies.get(cart_cookie));
    } catch (_) {
    }

    donate_cart_button(els);
    donate_check_services_cart();
    donate_enable_coupon(true);
}

function donate_cart_call(coupon = null, nickname_update = true) {
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
        selectors_payment[i].addEventListener("input", function (_) {
            donate_reset_payment_state();
        });
    }

    for (let i = 0; i < cart_keys.length; i++) {
        let item = donate_get_service_by_id(cart_keys[i]);
        let price = item.price * cart[item.id];
        sum_price += price;
        cart_dom.innerHTML =
            cart_dom.innerHTML +
            `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0 text-start">
                        <span class="text-primary fw-semibold">
                            x${item.number}</span> 
                        ${item.name}
                    </h6>
                    <small class="text-muted text-start cart-desc-td">${
                item.description
            }</small>
                </div>
                <span class="text-muted text-end" style="width: 30%">
                    ${price} ${getNoun(price, "рубль", "рубля", "рублей")}
                    <br/>x${cart[item.id]}</span>
            </li>
        `;
    }

    const coupon_container = function () {
        cart_dom.innerHTML =
            cart_dom.innerHTML +
            `<li class="list-group-item d-flex justify-content-between bg-light">` +
            `<div class="text-primary">` +
            `<h6 class="my-0 text-start">Купон</h6>` +
            `<small class="text-start font-monospace" style="float: left">${coupon}</small>` +
            `</div>` + // `<span class="text-primary">−0 рублей</span>` +
            `</li>`;
    };

    const sum_container = function () {
        cart_dom.innerHTML =
            cart_dom.innerHTML +
            `<li class="list-group-item d-flex justify-content-between">` +
            `<span>Сумма</span>` +
            `<strong>${sum_price} ${getNoun(
                sum_price,
                "рубль",
                "рубля",
                "рублей"
            )}</strong>` +
            `</li>`;
    };

    if (coupon) {
        coupon_container();
    }

    sum_container();

    if (nickname_update) {
        shuffle(glob_players);
        document
            .querySelector("input#donate_customer")
            .setAttribute("placeholder", glob_players[0]);
    }
}

function links_set_(selector_, fisrt_el_mrg = false) {
    let sl = document.getElementById(selector_);
    let mrg = "margin-left: 0 !important";

    for (let i = 0; i < links_lt.length; i++) {
        if (!fisrt_el_mrg || i) {
            mrg = "";
        }

        sl.innerHTML =
            sl.innerHTML +
            `<a href="${links_lt[i].link}" target="_blank" style="${mrg}"` +
            `class="btn btn-icon btn-secondary btn-${links_lt[i].name} mx-2">` +
            `<i class="bx bxl-${links_lt[i].name}"></i></a>`;
    }
}

function discord_init() {
    let src = "https://discordapp.com/widget?id=259124796971941890&theme=dark";
    let container = document.getElementById("discord-embed");
    container.innerHTML =
        `<iframe ` +
        `src="${src}" width="100%" height="300px" allowTransparency="true" frameBorder="0" ` +
        `loading="lazy" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"` +
        `></iframe>`;
}

function landing_init() {
    if (development_hosts.includes(window.location.hostname) && lock_of) {
        document.getElementById("landing_description_gb").innerText =
            "Этот сайт - development-версия!";
        document.getElementById("donate-test-mode-enb").innerText =
            "Этот блок работает в демонстративном режиме и не является функциональным.";
    }

    links_set_("landing-links-tp", true);
    links_set_("links-block-footer-v");
    discord_init();
}

function finish_load() {
    document.querySelector("main").setAttribute("style", "");
    document.querySelector("footer").setAttribute("style", "");
    let heart = "&#10084;&#65039;";
    document.getElementById(
        "footer-text-blc"
    ).innerHTML = `Made with ${heart} by KovalYRS for Zalupa.Online`;
    if (grecaptcha) {
        document.getElementById("re-badge-text").innerText =
            "This site uses Google ReCaptcha technology"
    }
}

function call_sucess_pay_modal(payment_id = 0, only_ok = false) {
    const cart_dom = document.getElementById("donate-cart-list-success");
    const succ_text = document.getElementById("success-pay-text-js");

    const build_payment = function (payment) {
        if (only_ok) {
            succ_text.innerText =
                "Оплата прошла успешно, спасибо за поддержку."
        } else {
            if (!payment.email.length) {
                payment.email = "Ну указано"
            }
            cart_dom.innerHTML = `
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 class="my-0 text-start">
                            Номер чека
                        </h6>
                    </div>
                    <span>${payment.id}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 class="my-0 text-start">
                            Никнейм
                        </h6>
                    </div>
                    <span>${payment.customer}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 class="my-0 text-start">
                            Почта
                        </h6>
                    </div>
                    <span>${payment.email}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Сумма</span>
                    <strong>${payment.enrolled} ${getNoun(
                    payment.enrolled,
                    "рубль",
                    "рубля",
                    "рублей"
                )}</strong>
                    </li>
            `
        }
    }

    const enable_modal = function (payment, only_ok = false) {
        build_payment(payment);
        switch_modal_containers("success");
        modal_open_()
        if (only_ok) {
            document.querySelector(".modal-title").innerText = "Успех"
        }
    }

    if (!only_ok) {
        check_payment(function (payment) {
            if (payment) {
                enable_modal(payment)
            } else if (!only_ok) {
                notify("Ошибка, чек не найден или EasyDonate вернул недействительный ответ")
            }
        }, payment_id)
    } else {
        enable_modal(0, true)
    }
}

function success_pay(data = "", load_init = false) {
    let parsed = "";
    try {
        parsed = parseInt(data.match(/^(success_pay_i)+([\d]+)$/)[2])
    } catch (_) {
    }
    if ((load_init && /^(success_pay_i)+[\d]+$/.test(linkHash())) || data.length) {
        call_sucess_pay_modal(parsed, data === "success_pay_i_ok")
    } else {
        console.log("error call success_pay")
    }
}

document.addEventListener("DOMContentLoaded", function () {
    init_host_();
    landing_init();
    build_players_swiper();
    append_posts();
    comments_init();
    append_services();
    update_cart_count();
    game_server_updater();
    donate_init();
    finish_load();
    success_pay(linkHash(), true);

    let elem = document.getElementById("dark-perm-set-bv");
    elem.parentNode.removeChild(elem);

    addEventListener('hashchange', (event) => {
    });
    onhashchange = (event) => {
        success_pay(getHash(event.newURL))
    };

    window.onload = function () {
        const preloader = document.querySelector(".page-loading");
        preloader.classList.remove("active");
        setTimeout(function () {
            preloader.remove();
        }, 600);
    };
});