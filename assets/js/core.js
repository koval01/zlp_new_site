"use strict";

const site_domains = {
    prod: domain_site,
    dev: development_hosts[0],
    test: development_hosts[1],
};
const cart_cookie = "cart_box";
const channels = 2;
const links_lt = [{
    name: "twitch",
    link: "https://www.twitch.tv/bratishkinoff",
}, {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCg2uAOEoY-la2d-95uMmLuQ",
}, {
    name: "telegram",
    link: "https://t.me/zalupaonline",
}, {
    name: "discord",
    link: "https://discord.gg/qEqbVbMeEx",
}, ];
const lock_of = true;
const coins_sell_mode = true;
var donate_services_array = [];
var notify_hidden = true;
var glob_players = [];
var timer_notify;
var swiper_comments;
var payment_url_global;
var checked_coupon = "";
var failed_coupon = "";
var crypto_token = "";
var tooltip_instance;
var events_page_state = "news";
var donate_displayed = false;
var modal_displayed = false;
var freeze_crypto = false;
var debug_lock_init = false;
var freeze_monitoring = false;
var gameServerUpdater_setter;
var work_domain_v = "zalupa.online";
var products_by_serverid = [];
var current_c_item = 0;
var telegram_cookie_token = "telegram_auth"

function initHost() {
    let keys = Object.keys(site_domains);
    for (let i = 0; i < keys.length; i++) {
        if (site_domains[keys[i]] === window.location.hostname) {
            work_domain_v = site_domains[keys[i]];
        }
    }
}

function linkHash() {
    return window.location.hash
        .substring(1);
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function getAvatarColorIDforTG(user_id) {
    var result = 0;
    var base = 1;
    while (user_id > 0) {
        result += (user_id % 7) * base;
        base *= 10;
        user_id = Math.floor(user_id / 7);
    }
    return parseInt(result.toString().slice(-1));
}

function getHash(link) {
    let hash = window.location.hash
        .substr(1);
    return Object.keys(hash.split("&")
        .reduce(function(result, item) {
            let parts = item
                .split("=");
            result[parts[0]] = parts[1];
            return result;
        }, {}))[0];
}

function re_check(callback) {
    grecaptcha.ready(function() {
        grecaptcha
            .execute(re_token, {
                action: "submit",
            })
            .then(function(token_update) {
                callback(token_update);
            });
    });
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math
            .random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex], ];
    }

    return array;
}

function alternateSort(list) {
    let minIndex = 0;
    let minVal = 0;

    for (let i = 0; i < list.length; i++) {
        minIndex = i;
        minVal = list[i];

        for (let j = i + 1; j < list.length; j++) {
            if (list[j] < minVal) {
                minVal = list[j];
                minIndex = j;
            }
        }

        if (minVal < list[i]) {
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
    }
}

function getImageLightness(imageSrc, callback) {
    let img = document.createElement("img");
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.style.display = "none";
    document.body.appendChild(img);

    let colorSum = 0;

    img.onload = function() {
        let canvas = document
            .createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        let imageData = ctx
            .getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        let r, g, b, avg;

        for (let x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        let brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness);

        img.remove();
    };
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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

function getCrypto(callback, source) {
    re_check(function(token_update) {
        requestCall(function(r) {
            if (r.success) {
                callback(r.token);
            } else {
                callback("");
            }
        }, `${backend_host}/crypto`, "POST", true, {
            token: token_update,
        });
    });
}

function get_events_(callback) {
    re_check(function(token_update) {
        requestCall(function(r) {
            callback(r.events);
        }, `${backend_host}/events`, "POST", true, {
            token: token_update,
        });
    });
}

function get_yt_video_(callback, video_id, skip = false) {
    if (!skip) {
        re_check(function(token_update) {
            requestCall(function(r) {
                callback(r.body);
            }, `${backend_host}/youtube_get`, "POST", true, {
                token: token_update,
                video_id: video_id,
            });
        });
    } else {
        callback(null);
    }
}

function get_news_(callback, source) {
    re_check(function(token_update) {
        requestCall(function(r) {
            callback(r.messages);
        }, `${backend_host}/channel_parse?choice=${source}`, "POST", true, {
            token: token_update,
        });
    });
}

function get_rules_private_server(callback) {
    requestCall(function(r) {
        callback(r);
    }, "assets/data/private_server_rules.json", "GET", true);
}

function appendPostsNews() {
    let createSwiper = function() {
        new Swiper("#news_swipe_container", {
            spaceBetween: 12,
            loop: true,
            observer: true,
            observeParents: true,
            preventClicks: false,
            preventClicksPropagation: false,
            autoplay: {
                delay: 1000 * 10,
            },
            pagination: {
                el: "#news_swiper_pagination",
                clickable: true,
            },
            navigation: {
                prevEl: "#prev_news",
                nextEl: "#next_news",
            },
        });
    };

    let add_news_in_array = function(posts) {
        let array_ = document
            .getElementById("news_swipe_array");
        posts = posts.reverse();

        for (let i = 0; i < posts.length; i++) {
            let text = posts[i].text;
            let datetime = new Date(posts[i].datetime_utc);
            if (!posts[i].cover) {
                posts[i].cover = "assets/images/spawn.webp";
            }
            array_.innerHTML = array_.innerHTML + `
                <div class="swiper-slide h-auto px-2">
                    <figure class="card h-100 position-relative border-0 shadow-sm news-figure" id="news_figure_${i}">
                        <div class="background-news" id="background-news-${i}">
                            <div class="background-news-overlay" id="news-overlay-${i}">
                                <div class="background-news-overlay-dark-mode">
                                    <blockquote class="card-body mt-2 mb-3 news-text-container">
                                        <p class="fs-md mb-0 news-text h6" id="news_text_${i}" style="font-family:sans-serif">
                                                ${text}</p>
                                        <div class="news-bottom-container">
                                            <a class="btn btn-primary shadow-primary btn-lg news-button-view"
                                               href="${posts[i].link}" target="_blank">
                                                    Подробнее</a>
                                        </div>
                                    </blockquote>
                                </div>
                            </div> 
                        </div>
                    </figure>
                    <span class="news-date-text">
                        ${datetime.toLocaleDateString()} 
                        ${datetime.toLocaleTimeString("ru-RU", {
                hour: "2-digit", minute: "2-digit",
            })}
                    </span>
                </div>
            `;
            let selector_bg = document
                .getElementById(`background-news-${i}`);
            let selector_text = document
                .getElementById(`news_text_${i}`);
            selector_bg.style.backgroundImage = `url(${posts[i].cover})`;
            selector_text.style.width = "100%";
            selector_text.classList
                .add("text-light");
            let text_len = selector_text.innerText.length;
            let text_split = selector_text
                .innerText.split(" ");
            let font_size = ((text_len - -8) * 0.4) / 100;
            let fix_float_fs = (
                float, font_size,
                correction_float = 0.32,
                correction_font = 0.9,
                max_val = 0
            ) => {
                float = float < correction_float ? correction_float * (font_size / correction_font) : float
                return max_val ? (float < max_val ? float : max_val) : float
            }
            selector_text.style.fontSize = `calc(${
                fix_float_fs(parseFloat(1.3 - font_size), font_size)
            }vw + ${
                fix_float_fs(parseFloat(1.5 - font_size), font_size)
            }vh + ${
                fix_float_fs(parseFloat(1.65 - font_size), font_size)
            }vmin)`;
            selector_text.style.padding = `${fix_float_fs(parseFloat(1.3 - font_size), font_size, 0.22, 1.05)}rem`;
            getImageLightness(posts[i].cover, function(brightness) {
                let style_ = `#000000${(((parseFloat(brightness) / 255.0) * 100.0).toFixed() + 64)
                    .toString(16)
                    .slice(0, 2)}`;
                document
                    .getElementById(`news-overlay-${i}`).style.background = style_;
            });
            let calculate_text_position = () => {
                // local init var
                let selector_text = document.getElementById(`news_text_${i}`);
                let font_size = parseFloat(window.getComputedStyle(
                    selector_text, null
                ).getPropertyValue('font-size')
                    .replace("px", ""));

                if (font_size > 24) {
                    selector_text.style.position = "absolute";
                    selector_text.style.textAlign = "center";
                    selector_text.style.alignItems = "center";
                    selector_text.style.height = "100%";
                    selector_text.style.display = "inline-block";
                    selector_text.style.paddingBottom = "5rem";
                    selector_text.style.paddingRight = "3rem";
                } else {
                    selector_text.style.position = "";
                    selector_text.style.textAlign = "";
                    selector_text.style.alignItems = "";
                    selector_text.style.height = "";
                    selector_text.style.display = "";
                    selector_text.style.paddingBottom = "";
                    selector_text.style.paddingRight = "";
                }
            }
            addEventListener('resize', (event) => calculate_text_position());
            setInterval(calculate_text_position, 200);
        }
        let loading_done = function() {
            setTimeout(function() {
                let sl = document
                    .getElementById("telegram_block_load");
                let container_news = document
                    .getElementById("news_zlp_buttons");

                try {
                    sl.parentNode
                        .removeChild(sl);
                    container_news.style.display = "";
                } catch (_) {}
            }, 150);
        };
        if (posts) {
            createSwiper();
            loading_done();
        }
    };

    get_news_(function(posts) {
        add_news_in_array(posts);
    }, 1);
}

function donateSwitchContainer(display) {
    let container = document
        .querySelector(".donate-global-container");

    let update_zIndex = function(variable) {
        setTimeout(function() {
            container.style.zIndex = variable;
        }, 850);
    };

    if (!donate_displayed || display) {
        document.body.style.overflowY = "hidden";
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        container.style.minHeight = "";
        update_zIndex("");

        donate_displayed = true;
        location.hash = "#donate";
    } else {
        container.style.minHeight = "0";
        container.style.zIndex = "-1";
        document.body.style.overflowY = "";

        donate_displayed = false;
        location.hash = "#";
    }
}

function get_game_server_data(callback) {
    let _data_error = function(ok = false) {
        let string_ = "";

        if (ok) {
            string_ = "";
        } else {
            string_ = "Не удается обновить информацию о сервере...";
        }

        document.getElementById("error_get_server_status").innerText = string_;
    };
    if (crypto_token) {
        requestCall(function(r) {
            setTimeout(function() {
                freeze_monitoring = false;
            }, 800);
            if (r.success) {
                callback(r.body);
            } else {
                crypto_token = "";
            }
        }, `${backend_host}/server?crypto_token=${encodeURIComponent(crypto_token)}`, "GET", true);
    } else {
        initCrypto();
        freeze_monitoring = false;
    }
}

function monitoring_game_server_update() {
    if (!freeze_monitoring) {
        freeze_monitoring = true;

        get_game_server_data(function(data) {
            if (data.online) {
                if (typeof gameServerUpdater_setter !== "undefined") {
                    clearInterval(gameServerUpdater_setter);
                }
                let selector = document
                    .getElementById("server_online_status");
                selector
                    .classList
                    .remove("loading-dots");
                selector.innerHTML = `Сейчас играет <span class="text-primary fw-semibold">${data.online}</span>
            <i class="emoji male-emoji" style="margin-left: -.35rem!important;background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            ${getNoun(data.online)}
            <i class="emoji male-emoji" style="background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            `;
            }
        });
    }
}

function gameServerUpdater() {
    monitoring_game_server_update();
    gameServerUpdater_setter = setInterval(monitoring_game_server_update, 300);
    setInterval(monitoring_game_server_update, 6000);
}

function initEventsList() {
    let row_container = document
        .getElementById("events-row-container");
    let loader_ = document
        .getElementById("events_block_load");
    let switch_button_ = document
        .getElementById("events-c-button");
    let row_class = ["row-cols-md-2", "row-cols-lg-2", "row-cols-xl-3"];

    get_events_(function(data) {
        if (data && data.length) {
            events_block_load
                .remove();

            data.sort(function(a, b) {
                let keyA = new Date(a.date_start),
                    keyB = new Date(b.date_start);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });

            let time_correction = function(date) {
                let userTimezoneOffset = -date
                    .getTimezoneOffset() * 60000;
                return new Date(date
                    .getTime() - userTimezoneOffset);
            };

            for (let i = 0; i < data.length; i++) {
                switch_button_
                    .removeAttribute("disabled");
                if (3 > i > 0) {
                    row_container
                        .classList
                        .add(row_class[i]);
                }
                let st_date = time_correction(new Date(data[i].date_start));
                let end_date = time_correction(new Date(data[i].date_end));
                let time_in_moscow = new Date(new Date()
                    .toLocaleString("en-US", {
                        timeZone: "Europe/Moscow",
                    }));
                let badge = "";
                if (st_date > time_in_moscow) {
                    badge = "Скоро";
                } else if (time_in_moscow > end_date) {
                    badge = "Завершено";
                }
                let template_ = `
                    <div class="col">
                        <div class="object-block-col">
                            <h1>${data[i].title}</h1>
                            <h4 class="text-primary" style="margin-top: -1.2rem">${badge}</h4>
                            <h6 style="margin-top: -1rem">С <span class="text-primary">
                                ${st_date.toLocaleDateString("ru-RU")} ${("0" + st_date.getHours()).slice(-2)}:${("0" + st_date.getMinutes()).slice(-2)}
                                </span> по <span class="text-primary">
                                ${end_date.toLocaleDateString("ru-RU")} ${("0" + end_date.getHours()).slice(-2)}:${("0" + end_date.getMinutes()).slice(-2)}
                                </span></h6>
                            <p>${data[i].text}</p>
                        </div>
                    </div>
                `;
                row_container.innerHTML = row_container.innerHTML + template_;
            }
        }
    });
}

function get_donate_services(callback) {
    re_check(function(token_update) {
        requestCall(function(r) {
            callback(r.services);
        }, `${backend_host}/donate/services`, "POST", true, {
            token: token_update,
        });
    });
}

function create_payment(callback, customer, products, server_id, email = "", coupon = "") {
    re_check(function(token_update) {
        requestCall(function(r) {
            callback(r.payment);
        }, `${backend_host}/donate/payment/create`, "POST", true, {
            customer: customer,
            products: products,
            email: email,
            coupon: coupon,
            token: token_update,
            server_id: server_id,
            success_url: `https://${work_domain_v}`,
        });
    });
}

function check_coupon(callback, coupon) {
    re_check(function(token_update) {
        requestCall(function(r) {
            if (r.coupon && r.success) {
                callback(r.coupon);
            } else {
                callback(null);
            }
        }, `${backend_host}/donate/coupon`, "POST", true, {
            code: coupon,
            token: token_update
        });
    });
}

function checkTelegramAuthData(callback) {
    let auth_data = getTelegramAuth(true);
    if (auth_data) {
        requestCall(function(r) {
            if (r) {
                callback(r.success);
            } else {
                callback(false);
            }
        }, `${backend_host}/telegram/auth/check`, "POST", true, {
            tg_auth_data: auth_data
        });
    } else {
        callback(false);
    }
}

function checkFeedbackStatus(callback) {
    let auth_data = getTelegramAuth(true);
    if (auth_data) {
        re_check(function (token_update) {
            requestCall(function (r) {
                if (r) {
                    callback(r.success);
                } else {
                    callback(false);
                }
            }, `${backend_host}/feedback/check`, "POST", true, {
                token: token_update, tg_auth_data: auth_data
            });
        });
    }
}

function sendFeedback(callback, text) {
    let auth_data = getTelegramAuth(true);
    if (auth_data) {
        re_check(function (token_update) {
            requestCall(function (r) {
                if (r) {
                    callback(r.success);
                } else {
                    callback(false);
                }
            }, `${backend_host}/feedback/send`, "POST", true, {
                text: text,
                token: token_update,
                tg_auth_data: auth_data
            });
        });
    }
}

function sendFeedbackAction() {
    let button = document.getElementById("send-feedback-button");
    let textarea = document.getElementById("admin-message");
    let text = textarea.value;

    if (text.length < 20) {
        notify("Сообщение очень короткое!");
        return;
    }

    let button_lock = (lock = true) => {
        if (lock) {
            button.setAttribute("disabled", "");
        } else {
            button.removeAttribute("disabled");
        }
        button.innerText = lock ? "Ожидайте..." : "Отправить";
    }

    button_lock();
    checkFeedbackStatus(function(check_data) {
        if (check_data) {
            sendFeedback(function(send_data) {
                if (send_data) {
                    notify("Сообщение отправлено админам.");
                } else {
                    notify("Ошибка на стороне сервера, попробуйте позже.");
                }
                button_lock(false);
            }, text);
        } else {
            button_lock(false);
            notify("Не удалось пройти проверку, попробуйте позже.");
        }
    });
}

function checkPayment(callback, payment_id) {
    re_check(function(token_update) {
        requestCall(function(r) {
            callback(r.payment);
        }, `${backend_host}/donate/payment_get`, "POST", true, {
            payment_id: parseInt(payment_id),
            token: token_update,
            tokens_send: coins_sell_mode,
        });
    });
}

function appendServices() {
    get_donate_services(function(services) {
        donate_services_array = services;
        let size_classes = ["row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4"];
        let sl = document
            .getElementById("donate_items_list");

        let get_product_type = (name, type) => {
            name = name
                .toLowerCase();
            type = type
                .toLowerCase();
            if (name
                .includes("токен") && type === "currency") {
                return 1;
            } else if (name
                .includes("проходка") && type === "other") {
                return 2;
            }
        }

        if (!services.length) {
            sl.innerHTML = '<span class="text-center">Не удалось получить список товаров.</span>';
        } else {
            donate_check_services_cart();

            for (let i = 0; i < services.length; i++) {
                let click_data = {
                    name: services[i].name,
                    price: services[i].price,
                    count: services[i].number,
                    description: services[i].description,
                    type: services[i].type,
                    service_id: services[i].id,
                    server_id: services[i].server_id,
                };
                products_by_serverid
                    .push(services[i]);
                let _name = "";
                let _desc = "";
                let padding_desc = "p-3";
                let desc_template = `
                    <p class="mb-0">
                        ${services[i].price} 
                        ${getNoun(services[i].price, "рубль", "рубля", "рублей")} 
                        = 
                        ${services[i].number} 
                        ${getNoun(services[i].number, "единица", "единицы", "единиц")}
                    </p>
                    <p class="fs-sm mb-0">${services[i].description}</p>
                `;
                let item_butt_template = '';

                if (i && size_classes.length >= i) {
                    sl.classList
                        .add(size_classes[i - 1]);
                }

                let click_template = `onClick="donate_element_click(${JSON.stringify(click_data)})"`;

                if (!coins_sell_mode) {
                    _name = services[i].name;
                } else {
                    let button_title = "";
                    if (services[i]
                        .name
                        .toLowerCase()
                        .includes("токен")) {
                        _name = `${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")} = ${services[i].number} ${getNoun(services[i].number, "токен", "токена", "токенов")}`;
                        padding_desc = "p-0";
                        desc_template = `
                        <p class="mb-0 token-description-dnt">
                            Игровая валюта, которую можно получить как в игре, так и за поддержку проекта.
                        </p>`;
                        button_title = "Приобрести токены";

                        click_template = "";
                    } else if (services[i]
                        .name
                        .toLowerCase()
                        .includes("проходка")) {
                        _name = `
                        <span class="text-primary">${services[i].name}</span>,
                        ${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")}`;
                        padding_desc = "p-0";
                        desc_template = `
                        <p class="mb-0 token-description-dnt">
                            За финансовую поддержку проекта ты получишь пропуск на приватный сервер.
                        </p>`;
                        button_title = "Приобрести пропуск";

                        click_template = "";
                    }
                    item_butt_template = `
                        <button class="btn btn-primary shadow-primary btn-shadow-hide btn-lg min-w-zl donate-item-butt-bottom" 
                            onclick="donateModalCall(${get_product_type(click_data.name, click_data.type)}, ${click_data.service_id})">
                            ${button_title}
                        </button>`;
                }

                sl.innerHTML = sl.innerHTML + `
                    <div class="col" id="donate_item_${services[i].id}">
                        <div class="card border-0 bg-transparent" ${click_template}>
                          <div class="position-relative container-item-donate-n">
                            <div class="parent-image-shadow donate_item_hover" 
                                id="donate_item_hover_${services[i].id}">
                                <div class="imageContainer item-levitaion-dec">
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
                          <div class="card-body text-center ${padding_desc}">
                                <h3 class="fs-lg fw-semibold pt-1 mb-2">${_name}</h3>
                                ${desc_template}
                                ${item_butt_template}
                          </div>
                        </div>
                    </div>
                `;
            }

            setTimeout(function() {
                let elem = document
                    .getElementById("donate_block_load");
                let ids = ["donate_items_list", "donate-header-container", "donate-test-mode-enb", "donate-cart-container", ];

                try {
                    elem.parentNode
                        .removeChild(elem);
                } catch (_) {}


                for (let i = 0; i < ids.length; i++) {
                    try {
                        document
                            .getElementById(ids[i]).style.display = "";
                    } catch (e) {
                        console
                            .log(`Donate block loader error. Details: ${e}`);
                    }
                }
            }, 100);
        }
    });
}

function switchEventsPages(button_name) {
    let news_page = document
        .getElementById("news-c-container");
    let events_page = document
        .getElementById("events-c-container");

    let news_button = document
        .getElementById("news-c-button");
    let events_button = document
        .getElementById("events-c-button");

    if (button_name !== events_page_state) {
        if (button_name === "events") {
            news_page.style.display = "none";
            events_page.style.display = "block";

            news_button.removeAttribute("disabled");
            events_button.setAttribute("disabled", "");

            events_page.style.top = "0";
            news_page.style.top = "-2rem";

            events_page_state = "events";
        } else if (button_name === "news") {
            news_page.style.display = "block";
            events_page.style.display = "none";

            news_button.setAttribute("disabled", "");
            events_button
                .removeAttribute("disabled");

            events_page.style.top = "-2rem";
            news_page.style.top = "0";

            events_page_state = "news";
        }
    }
}

function redirect_(url) {
    return window.location.replace(url);
}

function ytVideoSetter(skip = false) {
    let set_video = function(el, video_id, params) {
        let video = get_yt_video_(function(data) {
            if (data && data.video.x720.url && !skip) {
                el.innerHTML = `
                    <video class="video-container" ${params.autoplay != null ? 'autoplay=""' : ""} ${params.muted != null ? 'muted=""' : ""} ${params.loop != null ? 'loop=""' : ""} ${params.controls != null ? 'controls=""' : ""} style="object-fit: contain">
                        <source src="${data.video.x720.url}" type="video/mp4">
                    </video>
                `;
            } else {
                el.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${video_id}" title="YouTube video player"
                        frameborder="0" class="video-container-yt"
                        allow="accelerometer; ${params.autoplay != null ? "autoplay" : ""}; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen="" loading="lazy"></iframe>
                `;
            }
        }, video_id, skip);
    };

    for (let el of Array.from(document
        .getElementsByClassName("ytVideoSetter"))) {
        let video_id = el.getAttribute("video_id");

        if (video_id && video_id.length && video_id.length < 20) {
            set_video(el, video_id, (params = {
                autoplay: el
                    .getAttribute("autoplay"),
                muted: el
                    .getAttribute("muted"),
                loop: el
                    .getAttribute("loop"),
                controls: el
                    .getAttribute("controls"),
            }));
        }
    }
}

function modal_close_() {
    if (modal_displayed) {
        document.body.classList.remove("modal-open");
        document.getElementById("scroll_butt_container").style.display = "";
        document.getElementsByTagName("html")[0].style.overflowY = ""
        let modal = document.getElementById("donate_item_modal");
        modal.style.opacity = 0;
        setTimeout(function() {
            modal.style.display = "none";
        }, 350);
        modal_displayed = false;
    }
}

function modal_open_(onclick_lock = false) {
    modal_displayed = true;
    document.body.classList.add("modal-open");
    document.getElementById("scroll_butt_container").style.display = "none";
    document.getElementsByTagName("html")[0].style.overflowY = "hidden"
    let modal = document.getElementById("donate_item_modal");
    modal.style.display = "block";
    setTimeout(function() {
        modal.style.opacity = 1;
    }, 50);

    if (!onclick_lock) {
        window.onclick = function(event) {
            if (event.target === modal) {
                modal_close_();
            }
        }
    }
}

function switch_modal_containers(mode = "service", info_params = {}) {
    let span = document
        .getElementsByClassName("close_b")[0];
    let info = document.getElementById("modal-info-container-c");
    let service = document
        .getElementById("modal-donate-container-c");
    let service_coins = document
        .getElementById("modal-donate-finish-container-b");
    let success = document
        .getElementById("modal-donate-success-container");
    let finish_donate = document
        .getElementById("modal-donate-finish-container-c");
    let title = document.querySelector(".modal-title");
    let _array = [{
        name: "service",
        selector: service,
        title: "Товар",
    }, {
        name: "service_coins",
        selector: service_coins,
        title: "Оплата пожертвования",
    }, {
        name: "info",
        selector: info,
        title: "Сообщение",
    }, {
        name: "success",
        selector: success,
        title: "Чек",
    }, {
        name: "donate_finish",
        selector: finish_donate,
        title: "Корзина",
    }, ];

    for (let i = 0; i < _array.length; i++) {
        let _mode = "none";

        if (mode === _array[i].name) {
            _mode = "block";
            title.innerText = _array[i].title;
        }

        _array[i].selector.style.display = _mode;
    }

    if (mode === "info") {
        title.innerText = info_params.title;
        if (info_params.content.length) {
            document.getElementById("info-content-modal").innerHTML = info_params.content;
        }
    }

    span.onclick = function() {
        modal_close_();
    };
}

function discount_calculate(price, discount) {
    discount = discount / 100;
    return (price * discount)
        .toFixed();
}

function get_cookie_cart() {
    let cookie_cart = {};

    try {
        cookie_cart = JSON.parse(Cookies
            .get(cart_cookie));
    } catch (_) {}

    return cookie_cart;
}

function updateCartCount() {
    document.getElementById("count_cart_items_dn").innerText = countProperties(get_cookie_cart());
}

function groupAlreadyInCart(user_cart) {
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

function comment_show_action(id, close = false) {
    let comment_text = document
        .getElementById(`comment_text_${id}`);
    let comment_show = document
        .getElementById(`comment_show_${id}`);

    swiper_comments.on("slideChange", function() {
        comment_show_action(id, true);
    });

    if (close || comment_text
        .getAttribute("fullShowComment") === "1") {
        comment_text.style.height = "100px";
        comment_text.setAttribute("fullShowComment", "0");
        comment_show.innerText = "Раскрыть";
    } else {
        comment_text.style.height = "100%";
        comment_text.setAttribute("fullShowComment", "1");
        comment_show.innerText = "Скрыть";
    }
}

function initComments() {
    let array_ = document
        .getElementById("comment_swipe_array");

    let createSwiper = function() {
        swiper_comments = new Swiper("#comment_swipe_container", {
            spaceBetween: 12,
            loop: true,
            observer: true,
            observeParents: true,
            preventClicks: false,
            preventClicksPropagation: false,
            autoplay: {
                delay: 8000,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                prevEl: "#prev_comment",
                nextEl: "#next_comment",
            },
        });
    };

    let playersGet = function(callback) {
        requestCall(function(r) {
            callback(r);
        }, "assets/data/players.json", "GET", true);
    };

    let searchPlayer = function(players, name) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].name === name) {
                return players[i];
            }
        }
    };

    requestCall(function(r) {
        let comment = r;
        shuffle(comment);

        playersGet(function(players) {
            for (let i = 0; i < comment.length; i++) {
                let player = searchPlayer(players, comment[i].name);

                array_.innerHTML = array_.innerHTML + `
                        <div class="swiper-slide h-auto px-2">
                            <figure class="card h-100 position-relative border-0 shadow-sm py-3 p-0 p-xxl-4 my-0">
                                <span class="btn btn-primary btn-lg shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4 ms-xxl-5 zlp-comment-icon">
                                  <i class="bx bxs-quote-left"></i>
                                  Залупный комментарий
                                </span>
                                <blockquote id="comment_block_${i}" class="card-body mt-2 mb-2" 
                                            style="transition: .8s height">
                                    <p id="comment_text_${i}" class="fs-md mb-0">
                                            &#171;${comment[i].text}&#187;</p>
                                    <span id="comment_show_${i}" onclick="comment_show_action(${i})" 
                                          class="pt-1 comment-show-button">
                                            Раскрыть</span>
                                </blockquote>
                                <figcaption class="card-footer d-flex align-items-center border-0 pt-0 mt-n2 mt-lg-0">
                                    <div>
                                        <h6 class="fw-semibold lh-base mb-0">${comment[i].name}</h6>
                                        ${player ? `<span class="frame_badge_adaptive">${player.desc}</span>` : ""}
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    `;

                let comment_text = document
                    .getElementById(`comment_text_${i}`);
                let comment_show = document
                    .getElementById(`comment_show_${i}`);

                comment_show.style.fontWeight = "400";
                comment_text.style.transition = "height 0.8s cubic-bezier(1, -0.3, 0, 1.21) 0s";
                comment_text
                    .setAttribute("fullShowComment", "0");
                let correction_height = 12;

                if (comment_text.clientHeight > 100 + correction_height) {
                    comment_text.style.height = "100px";
                    comment_text.style.overflow = "hidden";
                } else {
                    comment_show.style.display = "none";
                }
            }
        });

        createSwiper();
    }, "assets/data/comments.json", "GET", true);
}

function buildPlayersSwiper() {
    let array_ = document
        .getElementById("players-swiper-array");

    let createSwiper = function() {
        new Swiper("#players_swipe_container", {
            slidesPerView: 1,
            spaceBetween: 24,
            autoplay: {
                delay: 2000,
            },
            loop: true,
            observer: true,
            observeParents: true,
            preventClicks: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                },
                920: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
                1600: {
                    slidesPerView: 5,
                },
            },
        });
    };

    let badges_get = function(callback) {
        requestCall(function(r) {
            callback(r);
        }, "assets/data/badges.json", "GET", true);
    };

    badges_get(function(badges_paste) {
        requestCall(function(r) {
            let player = r;
            shuffle(player);

            for (let i = 0; i < player.length; i++) {
                let ult_template = "";

                function getBadges() {
                    let result = "";
                    player
                        [i]
                        .badges
                        .sort();
                    for (let s = 0; s < player[i].badges.length; s++) {
                        let badge_local = player[i].badges[s];
                        if (badge_local && badge_local.length && badge_local !== "verified" && !badge_local
                            .includes("clan-")) {
                            result = result + `
                                    <div class="player_badge" 
                                        style="background-image: url(./assets/images/emoji/${badges_paste[badge_local].item}.png)"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" 
                                        title="${badges_paste[badge_local].title}">
                                    </div>
                                `;
                        }
                    }
                    return result;
                }

                function getClan() {
                    for (let s = 0; s < player[i].badges.length; s++) {
                        if (player[i].badges[s]
                            .includes("clan-")) {
                            return player[i].badges[s]
                                .replace("clan-", "");
                        }
                    }
                }

                glob_players
                    .push(player[i].name);
                let player_badges_ = getBadges();
                let player_clan = getClan();
                array_.innerHTML = array_.innerHTML + `
                    <div class="swiper-slide text-center">
                        <span class="d-block py-3">
                            <div class="player_head_container">
                                ${player_clan ? `<div 
                                    class="player_clan_badge"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    title="${player_clan}"
                                ></div>` : ""}
                                <div 
                                    class="player-head d-block mx-auto" 
                                    style="background-image: url(${player[i].head})"
                                ></div>
                            </div>
                            <div class="card-body p-3">
                                <h3 class="fs-lg fw-semibold pt-1 mb-2">
                                    ${player[i].name}
                                    ${player[i].badges.includes("verified") ? `
                                        <i class="verified-icon"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Подтвержденный"> ✔</i>
                                    ` : ""}
                                </h3>
                                <div class="player_badge_container" style="${!player_badges_.length ? "display:none" : ""}">
                                    ${player_badges_}
                                </div>
                                <p class="fs-sm mb-0">${player[i].desc}</p>
                            </div>
                        </span>
                    </div>
                `;
            }

            createSwiper();
        }, "assets/data/players.json", "GET", true);
    });
}

function donate_element_click(product_data) {
    switch_modal_containers("service");
    let exclude_types = ["group"];
    let desc = document.getElementById("donate_item_select_text");
    let text_template = `Товар <span class="text-primary fw-semibold">${product_data.name}</span>,
            цена ${product_data.count} ${getNoun(product_data.count, "единицы", "единиц", "единиц")}
        <span class="text-primary fw-semibold">
            ${product_data.price}
            ${getNoun(product_data.price, "рубль", "рубля", "рублей")}
        </span>.
    `;
    let items_count_donate = document
        .getElementById("items_count_donate");
    let count_hint = document
        .getElementById("donate_count_text_hint");
    let add_to_cart = document
        .getElementById("donate_button_add_to_cart");
    let cookie_cart = get_cookie_cart();
    let switch_ = false;

    let _update_count = function() {
        add_to_cart.setAttribute("onClick", `donate_cart(${product_data.service_id}, ${items_count_donate.value})`);
    };

    items_count_donate.value = 1;

    _update_count();

    let product_in_cart = cookie_cart
        .hasOwnProperty(product_data.service_id
            .toString());

    if ((exclude_types.includes(product_data.type) || product_data.type === "group") && groupAlreadyInCart(cookie_cart)) {
        switch_modal_containers("info");
        switch_ = true;
        let group_error = "";

        if (product_data.type === "group") {
            group_error = "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую.";
        } else if (product_in_cart) {
            group_error = `Ошибка, вы можете добавить товар 
                <span class="text-primary fw-semibold">${product_data.name}</span> 
                только один раз.`;
        } else {
            group_error = "Мы не знаем почему, но эта ошибка вызвана по неизвестным причинам.";
        }

        document.getElementById("donate_info_block_text").innerHTML = group_error;
    }

    let count_state = "block";

    if (exclude_types.includes(product_data.type)) {
        count_state = "none";
    }

    items_count_donate.style.display = count_state;
    count_hint.style.display = count_state;

    let only_dig = function() {
        let value = items_count_donate.value;
        items_count_donate.value = value.replace(/\D+/g, "");
    };

    let _calculate_price = function() {
        only_dig();

        if (!exclude_types.includes(product_data.type)) {
            let _price = parseInt(items_count_donate.value) * product_data.price;

            let currenct_in_cart = cookie_cart[product_data.service_id];
            let template_counter_i = "";

            if (isNaN(_price) || 1 > Math.sign(_price)) {
                _price = 0;
            }

            if (currenct_in_cart) {
                template_counter_i = `
                    Уже в корзине - 
                        <span class="text-primary fw-semibold">
                            ${currenct_in_cart}
                        </span>
                `;
            }

            desc.innerHTML = `${text_template}
                    <br/>
                    Стоимость - 
                        <span class="text-primary fw-semibold">
                            ${_price} 
                            ${getNoun(_price, "рубль", "рубля", "рублей")}
                        </span>
                    <br/>
                    ${template_counter_i}
                `;

            _update_count();
        }
    };

    desc.innerHTML = text_template;

    _calculate_price();

    items_count_donate.addEventListener("input", function(_) {
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

function donateResetPaymentState(type = 1, repeat = false, coupon_reset = false) {
    let coupon_sl = document
        .getElementById("donate-coins-payment");
    let inputs = [
        "donate_sum",
        "donate_customer_c",
        "donate_email_c",
        "coupon-input-c"
    ]
    let sl = "_c";
    let vl = document.getElementById("donate_sum")
        .value.trim();
    if (!coins_sell_mode) {
        sl = "";
        vl = 0;
    }
    let button = document
        .getElementById("payment-button-donate" + sl);
    let update_inputs = () => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].includes("coupon") && !coupon_reset) {
                // pass
            } else {
                document.getElementById(inputs[i]).value = "";
            }
        }
    }
    if (coupon_reset) {
        coupon_sl.innerHTML = "";
        update_inputs();
        checked_coupon = "";
        failed_coupon = "";
    }
    button.setAttribute("onClick", `generatePaymentLink(${type}, ${(type === 2) ? 1 : vl})`);
    button.removeAttribute("disabled");
    button.innerText = repeat ? "Повторить" : "Дальше";
}

function donate_cart(product, count, remove = false) {
    let cart = Cookies.get(cart_cookie);
    let cart_parsed = get_cookie_cart();
    let product_count_in_cart = 0;
    let max_item_count = 15000;
    let local_prm = '<span style="color: #a4a6ff">';

    try {
        let p = cart_parsed[product];

        if (Number.isInteger(p)) {
            product_count_in_cart = +p;
        }
    } catch (_) {}

    if (!Number.isInteger(product) || !Number.isInteger(count)) {
        return;
    } else if (1 > Math.sign(count)) {
        notify("Количество не может быть равно нулю или меньше");
        return;
    } else if (product_count_in_cart + count > max_item_count) {
        notify(`Максимальное количество - ${local_prm}${max_item_count}</span>`);
        return;
    }

    if (!cart) {
        Cookies.set(cart_cookie, JSON
            .stringify({}));
    }

    let els_ = JSON.parse(Cookies.get(cart_cookie));
    let product_data = donate_get_service_by_id(product);

    if (remove) {
        delete els_[product];
        notify(`Товар ${local_prm} ${product_data.name}</span> убран из корзины`);
    } else {
        if (els_[product]) {
            els_[product] = els_[product] + count;
            notify(`В корзину добавлено ${local_prm} ${count} 
                    </span>
                    ${getNoun(count, "единица", "единицы", "единиц")} 
                    товара ${local_prm} ${product_data.name} 
                    </span>`);
        } else {
            els_[product] = count;
            notify(`Товар ${local_prm} ${product_data.name}</span> добавлен в корзину`);
        }
    }

    Cookies.set(cart_cookie, JSON
        .stringify(els_));
    modal_close_();
    initDonate();
    updateCartCount();
    donateResetPaymentState();
}

function donate_cart_button(els = {}) {
    let selector_ = document
        .querySelectorAll(".donate-cart-button-cn");

    if (coins_sell_mode) {
        return;
    }

    for (let i = 0; i < selector_.length; i++) {
        let sl = selector_[i].style;

        if (countProperties(els)) {
            sl.display = "flex";
            setTimeout(function() {
                sl.opacity = 1;
                sl.marginTop = "15px";
                selector_[i]
                    .removeAttribute("disabled");
            }, 50);
        } else {
            selector_[i].setAttribute("disabled", "");
            sl.opacity = 0;
            sl.marginTop = "-50px";
            setTimeout(function() {
                sl.display = "none";
            }, 350);
        }
    }
}

function donateFlushCart() {
    Cookies.remove(cart_cookie);
    donate_cart_button({});
    notify("Корзина очищена");
}

function onTelegramAuth(user) {
    Cookies.set(telegram_cookie_token, utf8_to_b64(JSON.stringify(user)));
    modal_close_();
    notify(`Вы успешно авторизовались как <span class="text-gradient-primary">${user.first_name} ${user.last_name}</span>`);
}

function getTelegramAuth(raw=false) {
    let cookie_field = Cookies.get(telegram_cookie_token);
    if (raw) {
        return cookie_field;
    } else if (cookie_field) {
        return JSON.parse(b64_to_utf8(cookie_field));
    }
}

function couponCheck(coins = false) {
    let selector_c = "";
    if (coins_sell_mode) {
        selector_c = "-c";
    }

    let input = document.getElementById("coupon-input" + selector_c);
    let button = document
        .getElementById("coupon-button" + selector_c);
    let code = "";

    try {
        code = input.value.trim().toUpperCase();
    } catch (_) {}

    let coupon_notfd = function() {
        notify(`Купон <span class="text-primary fw-semibold">${failed_coupon}</span> не найден`);
    };

    let check_coupon_valid = function(products, product) {
        if (products) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === current_c_item) {
                    return true;
                }
            }
        }
        return false;
    };

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

    let input_lock = function(lock = false) {
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
    check_coupon(function(r) {
        // console.log(`check_coupon = ${typeof r}`);
        if (r) {
            let call = function() {
                checked_coupon = code;
                notify(`Купон <span class="text-primary fw-semibold">${code}</span> действительный`);
            };
            if (!coins_sell_mode) {
                call();
                donateCartCall(code, false);
            } else if (check_coupon_valid(r.products, current_c_item)) {
                call();
                let sl = document
                    .getElementById("donate-coins-payment");
                sl.innerHTML = `<li class="list-group-item d-flex justify-content-between bg-light">
                        <div class="text-primary">
                            <h6 class="my-0 text-start">Купон</h6>
                            <small class="text-start" style="float: left">${code}</small>
                        </div>
                        <span class="text-muted text-end" style="width: 30%">
                            ${r.discount}%</span>
                    </li>`;
            } else {
                notify("Этот купон недействительный");
            }
        } else {
            failed_coupon = code;
            coupon_notfd();
        }

        input_lock();
    }, code);
}

function donate_enable_coupon(enabled = true) {
    let input = document.getElementById("coupon-input");
    let button = document
        .getElementById("coupon-button");

    if (enabled) {
        input.setAttribute("placeholder", "BRFF");
        button.setAttribute("onClick", "couponCheck()");
        input.removeAttribute("disabled");
        button.removeAttribute("disabled");
    } else {
        input.setAttribute("disabled", "");
        input.setAttribute("placeholder", "Сейчас недоступно");
        button.setAttribute("disabled", "");
    }
}

function generatePaymentLink(type = 1, sum = 0) {
    let selector_c = "";
    if (coins_sell_mode) {
        selector_c = "_c";
    }
    let button = document
        .getElementById("payment-button-donate" + selector_c);
    let customer = document
        .getElementById("donate_customer" + selector_c)
        .value.trim();
    let email = document.getElementById("donate_email" + selector_c)
        .value.trim();
    let coupon = "";
    let max_sum = 15000;
    let local_prm = '<span style="color: #a4a6ff">';

    try {
        coupon = checked_coupon.trim();
    } catch (_) {}

    if (type === 1) {
        if (!Number.isInteger(sum) || !Number.isInteger(sum)) {
            notify("Ошибка проверки суммы");
            return;
        } else if (1 > Math.sign(sum)) {
            notify("Сумма не может равняться нулю или меньше");
            return;
        } else if (sum > max_sum) {
            notify(`Максимальная сумма - ${local_prm}${max_sum}</span>`);
            return;
        }
    }

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
        email = "";
    } else if (!validateEmail(email)) {
        notify("Ошибка, адрес почты недействительный");
        return;
    }

    if (!coupon) {
        coupon = "";
    }
    if (coins_sell_mode) {
        products = JSON.parse(`{"${donate_services_array[type - 1].id}": ${sum}}`);
    } else {
        products = get_cookie_cart();
    }

    button.setAttribute("disabled", "");
    button.innerText = "Проверяем данные...";

    let get_data_service = (service_id) => {
        for (let i = 0; i < products_by_serverid.length; i++) {
            if (parseInt(products_by_serverid[i].id) === parseInt(service_id)) {
                return products_by_serverid[i];
            }
        }
    }

    let _d_service = get_data_service(current_c_item);
    create_payment(function(callback_data) {
        if (callback_data) {
            button
                .removeAttribute("disabled");
            button.innerText = "Оплатить";
            payment_url_global = callback_data.url;
            button.setAttribute("onClick", "payment_action_bt()");
        } else {
            notify("Ошибка, не удалось сформировать чек для оплаты");
            donateResetPaymentState(type, repeat = true);
        }
    }, customer, products, _d_service.server_id, email, coupon);
}

function payment_action_bt() {
    window.open(payment_url_global, "_blank");

    let cart_dom = document
        .getElementById("donate-cart-list-success");
    let succ_text = document
        .getElementById("success-pay-text-js");
    let cont_ok = document
        .getElementById("only-ok-payment");
    let title = document.querySelector(".modal-title");

    let build_modal_wind = function() {
        cart_dom.innerHTML = "";
        title.innerText = "";
        succ_text.innerText = "Давай, плати. Шеф ждёт...";
        cont_ok.style.display = "";
        document
            .querySelector("img.payment-sucess-vova")
            .setAttribute("src", "assets/images/vova-gay.webp");
    };

    let flush_inputs_donate = function() {
        let inputs = ["donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c", ];
        for (let i = 0; i < inputs.length; i++) {
            document.getElementById(inputs[i]).value = "";
        }
    };

    let enable_modal = function() {
        switch_modal_containers("success");
        modal_open_();
        build_modal_wind();
        donateResetPaymentState();
        flush_inputs_donate();
    };

    enable_modal();
}

function donate_check_services_cart() {
    let services_cookie = Object.keys(get_cookie_cart());
    let services_origin = donate_services_array;
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
}

function initDonate() {
    let els = {};

    try {
        els = JSON.parse(Cookies.get(cart_cookie));
    } catch (_) {}

    donate_cart_button(els);
    donate_enable_coupon(true);
}

function donateCartCall(coupon = null, nickname_update = true) {
    let cart = get_cookie_cart();
    let cart_keys = Object.keys(cart);
    let cart_dom = document
        .getElementById("donate-cart-list");
    let selectors_payment = [document.getElementById("donate_customer"), document.getElementById("donate_email"), document.getElementById("coupon-input"), ];
    switch_modal_containers("donate_finish");
    modal_open_();
    cart_dom.innerHTML = "";
    let sum_price = 0;

    for (let i = 0; i < selectors_payment.length; i++) {
        selectors_payment[i]
            .addEventListener("input", function(_) {
                donateResetPaymentState();
            });
    }

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
        `;
    }

    let coupon_container = function() {
        cart_dom.innerHTML = cart_dom.innerHTML + `<li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-primary">
                    <h6 class="my-0 text-start">Купон</h6>
                    <small class="text-start" style="float: left">${coupon}</small>
                </div>
            </li>`;
    };

    let sum_container = function() {
        cart_dom.innerHTML = cart_dom.innerHTML + `<li class="list-group-item d-flex justify-content-between">
                <span>Сумма</span>
                <strong>${sum_price} ${getNoun(sum_price, "рубль", "рубля", "рублей")}</strong>
            </li>`;
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

function donateCoinsPay(type = 1) {
    let button = document
        .getElementById("payment-button-donate_c");
    let sum = document.getElementById("donate_sum");

    if (!sum.value && !/^[\d]+$/.test(sum.value)) {
        sum = 0;
    } else {
        sum = sum.value;
    }

    button.setAttribute("onClick", `generatePaymentLink(${type}, ${(type === 2) ? 1 : sum})`);
}

function donateModalCall(type_item, item_id, nickname_update = true) {
    let sum = document.getElementById("donate_sum");
    let customer_field = document
        .getElementById("donate_customer_c");
    let sum_container = document
        .getElementById("sum-tokens-container");
    let email_container_classL = document.getElementById("customer-email-tokens-container").classList;
    let modal_payment_text = document
        .getElementById("donate-text-span");
    let payment_text_form;
    let selectors_payment = [document.getElementById("donate_sum"), document.getElementById("donate_customer_c"), document.getElementById("donate_email_c"), document.getElementById("coupon-input-c"), ];
    let title = document.querySelector(".modal-title");
    let item_name;

    let update_title = (descriptor) => {
        title.innerText = title
            .innerText.replace(/\([\s\S]*?\)/)
            .trim();
        title.innerText = `${title.innerText} (${descriptor})`;
    }

    current_c_item = item_id;

    if (type_item === 1) {
        sum_container.style.display = "";
        email_container_classL.remove("col-sm-6");
        email_container_classL.add("col-12");
        payment_text_form = `
            Воспользовавшись этой формой, вы можете поддержать проект финансово.
            За поддержку вы получите вознаграждение – за каждый рубль по одному игровому токену.
        `;
        item_name = "Токены";
        sum.addEventListener("input", function(_) {
            donateCoinsPay();
        });
    } else if (type_item === 2) {
        sum_container.style.display = "none";
        email_container_classL.remove("col-12");
        email_container_classL.add("col-sm-6");
        payment_text_form = `
            Вы можете совершить разовый платеж и получить пропуск на сезон к приватному серверу 
            в качестве вознаграждения за финансовую поддержку проекта.
        `;
        item_name = "Пропуск";
        customer_field.addEventListener("input", function(_) {
            donateCoinsPay(type_item);
        });
    }
    modal_payment_text.innerText = payment_text_form.replaceAll("\n", "");

    for (let i = 0; i < selectors_payment.length; i++) {
        selectors_payment[i]
            .addEventListener("input", function(_) {
                donateResetPaymentState(type_item);
            });
    }

    switch_modal_containers("service_coins");
    modal_open_();

    if (nickname_update) {
        shuffle(glob_players);
        document
            .querySelector("input#donate_customer_c")
            .setAttribute("placeholder", glob_players[0]);
    }

    donateResetPaymentState(type_item, false, true);
    update_title(item_name);
}

function linksSet(selector_, fisrt_el_mrg = false) {
    let sl = document.getElementById(selector_);
    let mrg = "margin-left: 0 !important";

    for (let i = 0; i < links_lt.length; i++) {
        if (!fisrt_el_mrg || i) {
            mrg = "";
        }

        sl.innerHTML = sl.innerHTML + `<a href="${links_lt[i].link}" 
                target="_blank" style="${mrg}"
                class="btn btn-icon btn-secondary btn-${links_lt[i].name} mx-2">
                    <i class="bx bxl-${links_lt[i].name}"></i>
            </a>`;
    }
}

function initCrypto() {
    if (!freeze_crypto) {
        freeze_crypto = true;
        crypto_token = "";
        getCrypto(function(token_) {
            crypto_token = token_;
            freeze_crypto = false;
        });
    }
}

function initLanding() {
    if (development_hosts.includes(window.location.hostname) && lock_of) {
        document.getElementById("landing_description_gb").innerText = "Этот сайт - preview-версия!";
        document.getElementById("donate-test-mode-enb").innerText = "Этот блок работает в демонстративном режиме и не является функциональным.";
    }

    linksSet("landing-links-tp", true);
    linksSet("links-block-footer-v");
}

function finishLoad() {
    document.querySelector("main")
        .setAttribute("style", "");
    document.querySelector("footer")
        .setAttribute("style", "");
    let heart = '<i class="emoji" style="background-image:url(\'assets/images/emoji/red-heart.png\');font-size: 0.7rem;bottom:-1px"><b>❤️</b></i>';
    document.getElementById("footer-text-blc").innerHTML = `Создал KovalYRS с ${heart}, специально для ZALUPA.ONLINE`;
    if (grecaptcha) {
        document.getElementById("re-badge-text").innerText = "This site uses Google ReCaptcha technology";
    }
}

function observerSystemTheme() {
    let mode_list = ["dark", "light"];
    let theme_switch = document
        .querySelector('[data-bs-toggle="mode"]')
        .querySelector(".form-check-input");

    let updateTheme = (mode) => {
        if (mode === "dark") {
            root.classList.add("dark-mode");
            theme_switch.checked = true;
        } else {
            root.classList.remove("dark-mode");
            theme_switch.checked = false;
        }
    };

    for (let i = 0; i < mode_list.length; i++) {
        let observer = window
            .matchMedia(`(prefers-color-scheme: ${mode_list[i]})`);
        observer.addEventListener("change", (e) => e.matches && updateTheme(mode_list[i]));
    }
}

function callSucessPayModal(payment_id = 0) {
    let glob_func_payment_data;
    let item_nm_payment_result = false;

    let cart_dom = document
        .getElementById("donate-cart-list-success");
    let succ_text = document
        .getElementById("success-pay-text-js");
    let cont_ok = document
        .getElementById("only-ok-payment");
    let title = document.querySelector(".modal-title");

    donateSwitchContainer(true);

    let item_type_ = (product_name) => {
        let t = (product_name).toLowerCase();

        if (t.includes("токен")) {
            return 1;
        } else if (t.includes("проходка")) {
            return 2;
        }
    }

    let update_pm_desc = () => {
        let img_product = glob_func_payment_data.product.image;
        let name_product = glob_func_payment_data.product.name;

        if (img_product && img_product.length) {
            document.querySelector(".payment-sucess-vova").src = img_product;
            let name_selector = document.querySelector(".item-name-payment-result");
            if (item_nm_payment_result) {
                name_selector.innerText = name_product;
            } else {
                name_selector.style.marginBottom = "4vh";
            }
        }
    }

    let buildPayment = function(payment) {
        if (payment.status && payment_id == parseInt(payment.id)) {
            glob_func_payment_data = payment;
            succ_text.innerText = "Оплата прошла успешно, Шеф доволен, спасибо тебе.";
            cont_ok.style.display = "";

            let item_type = item_type_(payment.product.name);

            let system_template = `
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 class="my-0 text-start">
                            Система
                        </h6>
                    </div>
                    <span>${payment.payment_system}</span>
                </li>
            `;

            let sum_template = `
                <li class="list-group-item d-flex justify-content-between">
                    <span>Сумма зачисления</span>
                    <strong class="text-primary">${payment.enrolled} ${getNoun(payment.enrolled, "рубль", "рубля", "рублей")}</strong>
                </li>
            `;

            if (coins_sell_mode) {
                if (item_type === 1) {
                    sum_template = `
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Сумма</span>
                            <strong class="text-primary">${payment.enrolled} ${getNoun(payment.enrolled, "токен", "токена", "токенов")}</strong>
                        </li>
                    `;
                } else if (item_type === 2) {
                    sum_template = `
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Сумма</span>
                            <strong class="text-primary">${payment.product.price} ${getNoun(payment.enrolled, "рубль", "рубля", "рублей")}</strong>
                        </li>
                    `;
                }
            }

            if (!payment.enrolled || payment.enrolled < 1) {
                sum_template = "";
            }
            if (!payment.email.length || payment
                .email.match("undefined")) {
                payment.email = "Ну указано";
            }
            if (!payment.payment_system || payment
                .payment_system
                .match("undefined")) {
                system_template = "";
            }
            if (!payment.created_at || !payment.created_at.length) {
                payment.created_at = "Неизвестно";
            } else {
                let parsed_time = new Date(payment.created_at);
                payment.created_at = `${parsed_time.toLocaleDateString()} ${parsed_time.toLocaleTimeString()}`;
            }

            cart_dom.innerHTML = `
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
                ${system_template}
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 class="my-0 text-start">
                            Время
                        </h6>
                    </div>
                    <span>${payment.created_at}</span>
                </li>
                ${sum_template}
            `;
        } else {
            succ_text.innerText = "Чек неоплачен, Шеф недоволен.";
            document
                .querySelector("img.payment-sucess-vova")
                .setAttribute("src", "assets/images/vova-fail.webp");
        }
    };

    let enable_modal = function(payment) {
        buildPayment(payment);
        switch_modal_containers("success");
        modal_open_();

        // updaters
        update_pm_desc();
    };

    checkPayment(function(payment) {
        if (typeof payment.status !== "undefined") {
            enable_modal(payment);
            title.innerText = `Чек #${payment.id}`;
        } else {
            notify("Ошибка, чек не найден или EasyDonate вернул недействительный ответ");
        }
    }, payment_id);
}

function successPay() {
    let url = new URL(window.location.href).searchParams;
    let payment_id = url.get("pg_order_id");

    if (payment_id) {
        callSucessPayModal(payment_id);
    }
}

function donateContainerHash() {
    observerContainerHash(["donate", "donate_block"], function() {
        donate_displayed = true;
        donateSwitchContainer(donate_displayed);
    });
}

function rulesModalOpen() {
    let content = "";
    get_rules_private_server(function(rules) {
        for (let i = 0; i < rules.length; i++) {
            content += `
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 class="my-0 text-start">
                                ${i+1}
                            </h6>
                        </div>
                        <span class="ps-2 pe-2 text-start">${rules[i].text}</span>
                    </li>
                `;
        }
        switch_modal_containers("info", {
            title: "Правила приватного сервера",
            content: `
                <ul class="list-group mb-4 mb-lg-5">
                    ${content}
                </ul>
            `
        });
        modal_open_();
    });
}

function rulesPrivateContainerHash() {
    observerContainerHash(["private_rules"], function() {
        rulesModalOpen();
    });
}

function openAdminContact() {
    checkTelegramAuthData(function (data) {
        if (data) {
            switch_modal_containers("info", {
                title: "Обратная связь",
                content: `
                        <p class="mb-2 mb-lg-3 mb-xl-4 text-start">
                            Это форма для предложений и жалоб, опишите пожалуйста кратко и 
                            ясно свою идею или предложение без воды.
                        </p>
                        <div id="contant-input-container">
                            <label for="admin-message">0/0</label>
                            <textarea id="admin-message" name="admin-message" class="form-control" maxlength="0">
                            </textarea>
                        </div>
                        <button onclick="sendFeedbackAction()" class="w-100 btn btn-primary btn-lg btn-shadow-hide mt-3 mt-lg-4" id="send-feedback-button" type="button">
                            Отправить
                        </button>
                    `
            });
            let max_len = 3000;
            let textarea = document.getElementById("admin-message");
            let label = document.querySelector('label[for="admin-message"]');
            let space = "\x20";
            if (textarea.value.includes(space.repeat(3))) {
                textarea.value = textarea.value.trim();
            }
            textarea.maxLength = max_len;
            let update_len_counter = () => {
                label.innerText = `${textarea.value.length}/${max_len}`;
            }
            update_len_counter();
            addEventListener("keydown", (_) => update_len_counter());
            addEventListener("keyup", (_) => update_len_counter());
            modal_open_(onclick_lock = true);
        } else {
            console.log("Error check Telegram auth");
            openTelegramAuthModal();
            notify("Вам необходимо авторизоватся для этой функции");
        }
    });
}

function adminsContactContainerHash() {
    observerContainerHash(["contact", "support", "bug", "report"], function() {
        openAdminContact();
    });
}

function observerContainerHash(hash_array, action) {
    let updater = function() {
        if (hash_array.includes(linkHash())) {
            action();
        }
    };

    updater();
    addEventListener(
        'hashchange', (_) => updater());
}

function openTelegramAuthModal() {
    console.log("Telegram auth preparing...");
    // modal_close_();
    let script_telegram_widget = document.createElement(
        'script');

    script_telegram_widget.src = "https://telegram.org/js/telegram-widget.js?21";
    script_telegram_widget.setAttribute("async", "");
    script_telegram_widget.setAttribute("data-telegram-login", telegram_bot_username);
    script_telegram_widget.setAttribute("data-size", "large");
    script_telegram_widget.setAttribute("data-radius", "8");
    script_telegram_widget.setAttribute("data-onauth", "onTelegramAuth(user)");

    script_telegram_widget.onload = function() {
        switch_modal_containers("info", {
            title: "",
            content: ""
        });
        modal_open_();
    }

    let content = document.getElementById("info-content-modal");
    let container = document.createElement("div");
    let text = document.createElement("p");

    content.innerHTML = "";
    content.appendChild(container);
    content.appendChild(text);
    text.innerText = `
        Для некоторых функций на этом сайте необходимо авторизироваться. 
        Мы не получим никаких конфиденциальных данных о вас, например, 
        ваш номер или локацию, это нужно только для того, чтобы Telegram 
        подтвердил, что вы являетесь владельцем своего аккаунта. Также 
        не забудьте связать свой аккаунт Telegram с игровым аккаунтом 
        в нашем боте.
    `.replaceAll("\n", "");

    text.setAttribute("class", "text-start px-3 pt-1 pt-lg-2");
    container.id = "telegram-auth-container";
    container.appendChild(script_telegram_widget);
}

function initJarallax() {
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.15,
        type: "scale-opacity"
    });
}

function initTooltip() {
    let tooltipTriggerList = [].slice
        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    let tooltipList = tooltipTriggerList
        .map(function(tooltipTriggerEl) {
            tooltip_instance = new bootstrap
                .Tooltip(tooltipTriggerEl, {
                    template: `
                                <div class="tooltip" role="tooltip">
                                    <div class="tooltip-inner"></div>
                                </div>
                            `,
                });
        });

    if (tooltip_instance) {
        setInterval(function() {
            tooltip_instance
                .update();
        }, 1000);
    }
}

function initSmoothScrollObserver() {
    let scrollerObject = new SmoothScroll("section");

    let callScroller = () => {
        let identifier = linkHash().toLowerCase();

        if (!(identifier && identifier.length) || ([
            "private_rules"
        ].includes(identifier))) {
            return;
        }

        scrollerObject.animateScroll(document.querySelector(`section[id="${identifier}"]`), null, {
            offset: 50
        });
    }

    callScroller();
    window.onhashchange = callScroller;
}

const initCore = function() {
    initHost();
    initCrypto();
    initLanding();
    observerSystemTheme();
    buildPlayersSwiper();
    appendPostsNews();
    initComments();
    appendServices();
    updateCartCount();
    gameServerUpdater();
    initDonate();
    initEventsList();
    initJarallax();
    finishLoad();
    successPay();
    ytVideoSetter(skip = true);

    donateContainerHash();
    rulesPrivateContainerHash();
    adminsContactContainerHash();

    let elem = document
        .getElementById("dark-perm-set-bv");
    elem.parentNode.removeChild(elem);

    window.onload = function() {
        if (!debug_lock_init) {
            let preloader = document
                .querySelector(".page-loading");
            let wait = 1500;
            let move_wait = 100;
            setTimeout(function() {
                preloader
                    .classList
                    .remove("active");
                if (!donate_displayed) {
                    document.body.style.overflowY = "";
                }
                window
                    .scrollTo({
                        top: 0,
                    });
            }, wait);
            setTimeout(function() {
                preloader
                    .remove();

                // after tasks
                initTooltip();
                initSmoothScrollObserver();
            }, wait + move_wait);
        }
    };
};

script_core.onload = function() {
    initCore();
};