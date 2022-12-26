/**
 * @suppress {uselessCode}
 */

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
},
    {
        name: "youtube",
        link: "https://www.youtube.com/channel/UC_-kIftWIXsTrVXZy0lJdXQ",
    },
    {
        name: "telegram",
        link: "https://t.me/zalupaonline",
    },
    {
        name: "discord",
        link: "https://discord.gg/qEqbVbMeEx",
    },
    {
        name: "tiktok",
        link: "https://www.tiktok.com/@nebratishkin"
    }
];
const lock_of = true;
const coins_sell_mode = true;
var donate_services_array = [];
var notify_hidden = true;
var glob_players = [];
var glob_events_status = false;
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
var freeze_monitoring = false;
var lock_sticker_switch = false;
var gameServerUpdater_setter;
var work_domain_v = "zalupa.online";
var products_by_serverid = [];
var glob_auth_player_data = [];
var current_c_item = 0;
var current_c_item_name = "";
var telegram_cookie_token = "telegram_auth";
const telegram_social_bot = "https://t.me/ZalupaSocialBot";
const debug_lock_init = false;
const telegram_auth_enabled = true;
const feedback_module_enabled = false;
const feedback_tg_auth_skip = true;
const initHost = () => {
    const keys = Object.keys(site_domains);
    for (let i = 0; i < keys.length; i++) {
        if (site_domains[keys[i]] === window.location.hostname) {
            work_domain_v = site_domains[keys[i]];
        }
    }
}
const linkHash = () => {
    return window.location.hash.substring(1);
}
const prepare_img_link = (img_link) => {
    return img_link.replace("https://", "//").replaceAll(/\//g, "\\/");
}
const time_correction = (date) => {
    const userTimezoneOffset = -date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
}
const time_in_moscow_get = (date = null) => {
    if (!date) {
        date = new Date();
    }
    return new Date(date.toLocaleString("en-US", {
        timeZone: "Europe/Moscow",
    }));
}
const getOffset = (date, timezone) => {
    try {
        -new Date(date).toLocaleString([], {
            timeZone: timezone,
            timeZoneName: 'shortOffset'
        }).match(/(?:GMT|UTC).+/)[0] * 60;
    } catch (e) {
        console.error(`getOffset : ${e}`);
        return 0;
    }
}
const formatDate = (date, now = null) => {
    let diff = new Date() - date;
    if (now) {
        diff = now - date;
    }

    if (diff < 1000) {
        return 'прямо сейчас';
    }

    let sec = Math.floor(diff / 1000);

    if (sec < 60) {
        return sec + ` ${getNoun(sec, "секунду", "секунды", "секунд")} назад`;
    }

    let min = Math.floor(diff / (1000 * 60));
    if (min < 60) {
        return min + ` ${getNoun(min, "минуту", "минуты", "минут")} назад`;
    }

    let hour = Math.floor(diff / (1000 * 60 * 60));
    if (hour < 24) {
        return hour + ` ${getNoun(hour, "час", "часа", "часов")} назад`;
    }

    let d = date;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2));

    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
const utf8_to_b64 = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
}
const b64_to_utf8 = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
}
const randDiaps = (max = 10) => {
    return Math.floor(Math.random() * max) + 1;
}
const generateRandomHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
const getAvatarColorIDforTG = (user_id) => {
    var result = 0;
    var base = 1;
    while (user_id > 0) {
        result += (user_id % 7) * base;
        base *= 10;
        user_id = Math.floor(user_id / 7);
    }
    return parseInt(result.toString().slice(-1));
}
const getHash = (link) => {
    const hash = window.location.hash.substr(1);
    return Object.keys(hash.split("&").reduce((result, item) => {
        const parts = item.split("=");
        result[parts[0]] = parts[1];
        return result;
    }, {}))[0];
}
const re_check = (callback) => {
    grecaptcha.ready(() => {
        grecaptcha.execute(re_token, {
            action: "submit",
        }).then((token_update) => {
            callback(token_update);
        });
    });
}
const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex], ];
    }
    return array;
}
const alternateSort = (list) => {
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
            const temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
    }
}
const getImageLightness = (imageSrc, callback, calculate = true) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.style.display = "none";
    document.body.appendChild(img);
    let colorSum = 0;
    if (calculate) {
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let r, g, b, avg;
            for (let x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];
                avg = Math.floor((r + g + b) / 3);
                colorSum += avg;
            }
            const brightness = Math.floor(colorSum / (this.width * this.height));
            callback(brightness);
            img.remove();
        };
    }
}
const is_apple_platform = () => {
    const mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    if (mac) {
        return true;
    }
}
const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
const url_builder_ = (base_url, submit_data_) => {
    const url = new URL(base_url);
    for (let i = 0; i < submit_data_.length; i++) {
        url.searchParams.set(submit_data_[i].name, submit_data_[i].value);
    }
    return url.href;
}
const countProperties = (obj) => {
    return Object.keys(obj).length;
}
const getNoun = (number, one = "игрок", two = "игрока", five = "игроков") => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five
    }
    n %= 10;
    if (n === 1) {
        return one
    }
    if (n >= 2 && n <= 4) {
        return two
    }
    return five;
}
const getCrypto = (callback) => {
    re_check((token_update) => {
        requestCall((r) => {
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
const get_events_ = (callback) => {
    re_check((token_update) => {
        requestCall((r) => {
            callback(r.events);
        }, `${backend_host}/events`, "POST", true, {
            token: token_update,
        });
    });
}
const get_yt_video_ = (callback, video_id, skip = false) => {
    if (!skip) {
        re_check((token_update) => {
            requestCall(
                (r) => {
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
const get_news_ = (callback, source) => {
    re_check((token_update) => {
        requestCall((r) => {
            callback(r.messages);
        }, `${backend_host}/channel_parse?choice=${source}`, "POST", true, {
            token: token_update,
        });
    });
}
const get_rules_private_server = (callback) => {
    requestCall((r) => {
        callback(r);
    }, "assets/data/private_server_rules.json", "GET", true);
}
const appendPostsNews = () => {
    const createSwiper = () => {
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
    const text_modify_enable = true;
    const add_news_in_array = (posts) => {
        const array_ = document.getElementById("news_swipe_array");
        posts = posts.reverse();
        for (let i = 0; i < posts.length; i++) {
            const text = posts[i].text;
            const datetime = new Date(posts[i].datetime_utc);
            if (!posts[i].cover) {
                posts[i].cover = "assets/images/spawn.webp";
            }
            array_.innerHTML = array_.innerHTML + `
                <div class="swiper-slide h-auto px-2">
                    <figure class="card h-100 position-relative border-0 news-figure" id="news_figure_${i}">
                        <div class="background-news" id="background-news-${i}">
                            <div class="background-news-overlay" id="news-overlay-${i}">
                                <div class="background-news-overlay-dark-mode">
                                    <div 
                                    style="z-index:6;top:35.1%;height:65%"
                                    class="shadow-vertical-overlay shadow-vertical-overlay-news vertical-bottom-shadow"
                                    ></div>
                                    <blockquote class="card-body mt-2 mb-3 news-text-container">
                                        <p class="fs-md mb-0 news-text h6" id="news_text_${i}" style="font-family:sans-serif">
                                                ${text}</p>
                                        <div class="news-bottom-container" style="z-index:8">
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
            const selector_bg = document.getElementById(`background-news-${i}`);
            selector_bg.style.backgroundImage = `url(${posts[i].cover})`;
            if (text_modify_enable) {
                const selector_text = document.getElementById(`news_text_${i}`);
                selector_text.style.width = "100%";
                selector_text.classList.add("text-light");
                const text_len = selector_text.innerText.length;
                const text_split = selector_text.innerText.split(" ");
                const font_size = ((text_len - -8) * .4) / 100;
                const fix_float_fs = (float, font_size, correction_float = .32, correction_font = .26, max_val = .9) => {
                    float = float < correction_float ? correction_float * (font_size / correction_font) : float
                    return max_val ? (float < max_val ? float : max_val) : float
                }
                selector_text.style.fontSize = `calc(${
                    fix_float_fs(parseFloat(1.8 - font_size), font_size)
                }vw + ${
                    fix_float_fs(parseFloat(1.8 - font_size), font_size)
                }vh + ${
                    fix_float_fs(parseFloat(1.9 - font_size), font_size)
                }vmin)`;
                selector_text.style.padding = `${
                    fix_float_fs(parseFloat(
                        1.3 - font_size
                    ), font_size, .22, 1.05)
                }rem`;
                const calculate_text_position = () => {
                    // local init var
                    const selector_text = document.getElementById(`news_text_${i}`);
                    const font_size = parseFloat(window.getComputedStyle(selector_text, null).getPropertyValue('font-size').replace("px", ""));
                    selector_text.style.maxHeight = "32vh";
                    if (font_size > 12) {
                        selector_text.style.position = "absolute";
                        selector_text.style.textAlign = "center";
                        selector_text.style.alignItems = "center";
                        // selector_text.style.height = "";
                        selector_text.style.display = "inline-block";
                        selector_text.style.paddingBottom = "5rem";
                        selector_text.style.paddingRight = "3rem";
                    } else {
                        selector_text.style.position = "";
                        selector_text.style.textAlign = "";
                        selector_text.style.alignItems = "";
                        // selector_text.style.height = "";
                        selector_text.style.display = "";
                        selector_text.style.paddingBottom = "";
                        selector_text.style.paddingRight = "";
                    }
                }
                addEventListener('resize', (event) => calculate_text_position());
                setInterval(calculate_text_position, 50);
            }
            getImageLightness(posts[i].cover, (brightness) => {
                const style_ = `#000000${
                    (((parseFloat(brightness) / 255.0) * 100.0)
                        .toFixed() + 64)
                        .toString(16)
                        .slice(0, 2)
                }`;
                document.getElementById(`news-overlay-${i}`).style.background = style_;
            });
        }
        const loading_done = () => {
            setTimeout(
                () => {
                    const sl = document.getElementById("telegram_block_load");
                    const container_news = document.getElementById("news_zlp_buttons");
                    try {
                        sl.parentNode.removeChild(sl);
                        container_news.style.display = "";
                    } catch (_) {}
                }, 150);
        };
        if (posts) {
            createSwiper();
            loading_done();
        }
    };
    get_news_((posts) => {
        add_news_in_array(posts);
    }, 1);
}
const donateSwitchContainer = (display) => {
    const container = document.querySelector(".donate-global-container");
    const style_sticker = document.getElementById("super-klassniy-sticker-0").style;
    style_sticker.opacity = 0;
    const update_zIndex = (variable) => {
        setTimeout(() => {
            container.style.zIndex = variable;
        }, 850);
    };
    if (!donate_displayed || display) {
        const button = document.getElementById("donateButtonLandingTop");
        button.setAttribute("disabled", "");
        notify("Переходим к донату...");

        checkTelegramAuthData(function (tg_success) {
            button.removeAttribute("disabled");
            if (tg_success) {
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
                openTelegramAuthModal(true);
            }
        });
    } else {
        container.style.minHeight = "0";
        container.style.zIndex = "-1";
        document.body.style.overflowY = "";
        donate_displayed = false;
        location.hash = "#";
    }
}
const get_game_server_data = (callback) => {
    const _data_error = (ok = false) => {
        let string_ = "";
        if (ok) {
            string_ = "";
        } else {
            string_ = "Не удается обновить информацию о сервере...";
        }
        document.getElementById("error_get_server_status").innerText = string_;
    };
    if (crypto_token) {
        requestCall((r) => {
            setTimeout(
                () => {
                    freeze_monitoring = false;
                }, 800);
            if (r.success) {
                callback(r.body);
            } else {
                crypto_token = "";
            }
        }, `${backend_host}/server`, "POST", true, {
            crypto_token: crypto_token
        });
    } else {
        initCrypto();
        freeze_monitoring = false;
    }
}
const monitoring_game_server_update = () => {
    if (!freeze_monitoring) {
        freeze_monitoring = true;
        get_game_server_data((data) => {
            if (data.online) {
                if (typeof gameServerUpdater_setter !== "undefined") {
                    clearInterval(gameServerUpdater_setter);
                }
                const selector = document.getElementById("server_online_status");
                selector.classList.remove("loading-dots");
                selector.innerHTML = `Сейчас играет <span class="text-primary fw-semibold">${data.online}</span>
            <i class="emoji male-emoji" style="margin-left: -.35rem!important;background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            ${getNoun(data.online)}
            <i class="emoji male-emoji" style="background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            `;
            }
        });
    }
}
const gameServerUpdater = () => {
    monitoring_game_server_update();
    gameServerUpdater_setter = setInterval(monitoring_game_server_update, 300);
    setInterval(monitoring_game_server_update, 6000);
}
const initEventsList = () => {
    const row_container = document.getElementById("events-row-container");
    const loader_ = document.getElementById("events_block_load");
    const switch_button_ = document.getElementById("events-c-button");
    const row_class = ["row-cols-md-2", "row-cols-lg-2", "row-cols-xl-3"];

    get_events_((data) => {
        switch_button_.removeAttribute("disabled");
        if (data && data.length) {
            glob_events_status = true;
            events_block_load.remove();
            data.sort((a, b) => {
                const keyA = new Date(a.date_start),
                    keyB = new Date(b.date_start);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            for (let i = 0; i < data.length; i++) {
                if (3 > i > 0) {
                    row_container.classList.add(row_class[i]);
                }
                const st_date = time_correction(new Date(data[i].date_start));
                const end_date = time_correction(new Date(data[i].date_end));
                const time_in_moscow = time_in_moscow_get();
                let badge = "";
                if (st_date > time_in_moscow) {
                    badge = "Скоро";
                } else if (time_in_moscow > end_date) {
                    badge = "Завершено";
                }
                const template_ = `
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
const get_donate_services = (callback) => {
    re_check((token_update) => {
        requestCall((r) => {
            callback(r.services);
        }, `${backend_host}/donate/services`, "POST", true, {
            token: token_update,
        });
    });
}
const create_payment = (callback, customer, products, server_id, email = "", coupon = "") => {
    re_check((token_update) => {
        requestCall((r) => {
            callback(r.payment);
        }, `${backend_host}/donate/payment/create`, "POST", true, {
            customer: customer,
            products: products,
            email: email,
            coupon: coupon,
            token: token_update,
            server_id: server_id,
            success_url: `https://${work_domain_v}`,
            tg_auth_data: getTelegramAuth(true)
        });
    });
}
const generateGiftLink = (callback, payment_id) => {
    getCrypto((crypto_token) => {
        callback(`${backend_host}/gift/private_server?` + `payment_id=${payment_id}&` + `crypto_token=${encodeURIComponent(crypto_token)}&` + `sign=${generateRandomHex(24)}`)
    })
}
const check_coupon = (callback, coupon) => {
    re_check((token_update) => {
        requestCall((r) => {
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
const testImage = (url) => {
    const tester = new Image();
    // tester.addEventListener('load', TSimageFound);
    tester.addEventListener('error', reInitTelegramAuth);
    tester.src = url;
}
const loadPlayerAvatar = (avatar) => {
    console.log(`Load avatar : ${avatar}`);
    document.getElementById("tg-user-avatar-text").innerText = "";

    const avatar_selector = document.getElementById("telegram-auth-avatar");
    const avatar_style = avatar_selector.style;

    const raw_link = `${
        backend_host
    }/profile/avatar/?texture_hash=${
        avatar
    }&crypto_token=${
        encodeURIComponent(crypto_token)
    }&tg_auth=${
        encodeURIComponent(getTelegramAuth(true))
    }`;
    const link = prepare_img_link(raw_link);

    // avatar_style.transition = "all .4s";
    // avatar_style.backgroundPosition = "center";
    // avatar_style.borderRadius = ".35em";
    // avatar_style.backgroundImage = `url(${link})`;

    testImage(raw_link);
    avatar_selector.setAttribute("style",`background-image: url("${link}");border-radius:.3rem;`);
}
const reInitTelegramAuth = () => {
    checkTelegramAuthData(function (_) {});
}
const checkTelegramAuthData = (callback, skip=false, raw=false) => {
    const auth_data = getTelegramAuth(true);
    if (auth_data) {
        if (!skip) {
            re_check((token_update) => {
                requestCall((r) => {
                    if (r) {
                        if (!r.success) {
                            // location.href = telegram_social_bot;
                            // console.log("Redirect to " + telegram_social_bot);
                            openLoginHint();
                            callback(false);
                        } else {
                            const avatar = document.getElementById("telegram-auth-avatar");
                            /*
                                data-bs-toggle="tooltip" data-bs-placement="bottom"
                                title="TITLE_TEXT"
                            */
                            glob_auth_player_data = r.player_data;
                            // const orderedData = getTelegramAuth();
                            if (r.player_data) {
                                const player = r.player_data;
                                const skin = player.SKIN;
                                loadPlayerAvatar(skin);

                                avatar.setAttribute("data-bs-toggle", "tooltip");
                                avatar.setAttribute("data-bs-placement", "bottom");
                                avatar.setAttribute("title", player["NICKNAME"]);

                                setInterval(function () {
                                    if (!avatar.style.backgroundImage || avatar.style.backgroundImage.length < 1) {
                                        loadPlayerAvatar(skin);
                                    }
                                }, 150);
                            }
                            callback(raw ? r : r.success);
                        }
                    } else {
                        callback(false);
                    }
                }, `${backend_host}/telegram/auth/check`, "POST", true, {
                    token: token_update,
                    tg_auth_data: auth_data
                });
            });
        } else {
            callback(true);
        }
    } else {
        callback(false);
    }
}
const checkFeedbackStatus = (callback) => {
    const auth_data = getTelegramAuth(true);
    if (auth_data) {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    if (r) {
                        callback(r.success);
                    } else {
                        callback(false);
                    }
                }, `${backend_host}/feedback/check`, "POST", true, {
                    token: token_update,
                    tg_auth_data: auth_data
                });
        });
    }
}
const sendFeedback = (callback, text) => {
    const auth_data = getTelegramAuth(true);
    if (auth_data) {
        re_check((token_update) => {
            requestCall(
                (r) => {
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
const sendFeedbackAction = () => {
    const button = document.getElementById("send-feedback-button");
    const textarea = document.getElementById("admin-message");
    const text = textarea.value;
    if (text.length < 20) {
        notify("Сообщение очень короткое!");
        return;
    }
    const button_lock = (lock = true) => {
        if (lock) {
            button.setAttribute("disabled", "");
        } else {
            button.removeAttribute("disabled");
        }
        button.innerText = lock ? "Ожидайте..." : "Отправить";
    }
    button_lock();
    checkFeedbackStatus((check_data) => {
        if (check_data) {
            sendFeedback(
                (send_data) => {
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
const checkPayment = (callback, payment_id) => {
    re_check((token_update) => {
        requestCall((r) => {
            callback(r.payment);
        }, `${backend_host}/donate/payment_get`, "POST", true, {
            payment_id: parseInt(payment_id),
            token: token_update,
            tokens_send: coins_sell_mode,
        });
    });
}
const getPaymentHistory = (callback) => {
    re_check((token_update) => {
        requestCall((r) => {
            callback(r.payment);
        }, `${backend_host}/donate/payment_history`, "POST", true, {
            token: token_update
        });
    });
}
const getPlayersSkins = (callback, players) => {
    re_check((token_update) => {
        requestCall((r) => {
            callback(r.skins);
        }, `${backend_host}/profile/skins/get`, "POST", true, {
            token: token_update,
            players: players
        });
    });
}
const appendServices = () => {
    get_donate_services((services) => {
        donate_services_array = services;
        const size_classes = ["row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4"];
        const sl = document.getElementById("donate_items_list");
        const get_product_type = (name, type) => {
            name = name.toLowerCase();
            type = type.toLowerCase();
            if (name.includes("токен") && type === "currency") {
                return 1;
            } else if (name.includes("проходка") && type === "other") {
                return 2;
            }
        }
        if (!services.length) {
            sl.innerHTML = '<span class="text-center">Не удалось получить список товаров.</span>';
        } else {
            donate_check_services_cart();
            for (let i = 0; i < services.length; i++) {
                const click_data = {
                    name: services[i].name,
                    price: services[i].price,
                    count: services[i].number,
                    description: services[i].description,
                    type: services[i].type,
                    service_id: services[i].id,
                    server_id: services[i].server_id,
                };
                products_by_serverid.push(services[i]);
                let _name = "";
                // const _desc = "";
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
                    sl.classList.add(size_classes[i - 1]);
                }
                let click_template = `onClick="donate_element_click(${JSON.stringify(click_data)})"`;
                if (!coins_sell_mode) {
                    _name = services[i].name;
                } else {
                    let button_title = "Приобрести";
                    let description_other = "Товар без описания.";
                    if (services[i].description) {
                        description_other = services[i].description
                    }
                    if (services[i].name.toLowerCase().includes("токен")) {
                        _name = `${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")} = ${services[i].number} ${getNoun(services[i].number, "токен", "токена", "токенов")}`;
                        padding_desc = "p-0";
                        desc_template = `
                        <p class="mb-0 token-description-dnt">
                            Игровая валюта, которую можно получить как в игре, так и за поддержку проекта.
                        </p>`;
                        click_template = "";
                    } else if (services[i].type = "other") {
                        _name = `
                        <span class="text-primary">${services[i].name}</span>,
                        ${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")}`;
                        padding_desc = "p-0";
                        desc_template = `
                        <p class="mb-0 token-description-dnt">
                            ${description_other}
                        </p>`;
                        click_template = "";
                    }
                    item_butt_template = `
                        <button class="btn btn-primary shadow-primary btn-shadow-hide btn-lg min-w-zl donate-item-butt-bottom" 
                            onclick="donateModalCall(${get_product_type(click_data.name, click_data.type)}, ${click_data.service_id})">
                            ${button_title}
                        </button>`;
                }
                services[i].image = prepare_img_link(services[i].image);
                sl.innerHTML = sl.innerHTML + `
                    <div class="col" id="donate_item_${services[i].id}">
                        <div class="card border-0 bg-transparent" ${click_template}>
                          <div class="position-relative container-item-donate-n">
                            <div class="parent-image-shadow donate_item_hover" 
                                id="donate_item_hover_${services[i].id}">
                                <div class="imageContainer item-levitaion-dec">
                                    <div 
                                    class="foregroundImg" 
                                    style="background-image: url(${services[i].image})"
                                    ></div>
                                    <div 
                                    class="backgroundImg" 
                                    style="background-image: url(${services[i].image})"
                                    ></div>                               
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
            setTimeout(
                () => {
                    const elem = document.getElementById("donate_block_load");
                    const ids = ["donate_items_list", "donate-header-container", "donate-test-mode-enb", "donate-cart-container", ];
                    try {
                        elem.parentNode.removeChild(elem);
                    } catch (_) {}
                    for (let i = 0; i < ids.length; i++) {
                        try {
                            document.getElementById(ids[i]).style.display = "";
                        } catch (e) {
                            console.log(`Donate block loader error. Details: ${e}`);
                        }
                    }
                }, 100);
        }
    });
}
const switchEventsPages = (button_name) => {
    const news_page = document.getElementById("news-c-container");
    const events_page = document.getElementById("events-c-container");
    const news_button = document.getElementById("news-c-button");
    const events_button = document.getElementById("events-c-button");
    if (button_name !== events_page_state) {
        if (button_name === "events") {
            if (glob_events_status) {
                news_page.style.display = "none";
                events_page.style.display = "block";
                news_button.removeAttribute("disabled");
                events_button.setAttribute("disabled", "");
                events_page.style.top = "0";
                news_page.style.top = "-2rem";
                events_page_state = "events";
            } else {
                notify("Сейчас ивентов нет, Марин отдыхает")
            }
        } else if (button_name === "news") {
            news_page.style.display = "block";
            events_page.style.display = "none";
            news_button.setAttribute("disabled", "");
            events_button.removeAttribute("disabled");
            events_page.style.top = "-2rem";
            news_page.style.top = "0";
            events_page_state = "news";
        }
    }
}
const redirect_ = (url) => {
    return window.location.replace(url);
}
const ytVideoSetter = (skip = false, only_iframe = true) => {
    const load_iframe = (el, video_id, params) => {
        el.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${video_id}" title="YouTube video player"
                frameborder="0" class="video-container-yt" id="ytframe_${video_id}"
                allow="accelerometer; ${params.autoplay != null ? "autoplay" : ""}; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="" loading="lazy"></iframe>
        `;
    }
    const set_video = (el, video_id, params) => {
        if (only_iframe) {
            load_iframe(el, video_id, params);
        } else {
            const video = get_yt_video_(
                (data) => {
                    if (data && data.video.x720.url && !skip) {
                        el.innerHTML = `
                    <video class="video-container" ${params.autoplay != null ? 'autoplay=""' : ""} ${params.muted != null ? 'muted=""' : ""} ${params.loop != null ? 'loop=""' : ""} ${params.controls != null ? 'controls=""' : ""} style="object-fit: contain">
                        <source src="${data.video.x720.url}" type="video/mp4">
                    </video>
                `;
                    } else {
                        load_iframe(el, video_id, params);
                    }
                }, video_id, skip);
        }
    };
    for (let el of Array.from(document.getElementsByClassName("ytVideoSetter"))) {
        const video_id = el.getAttribute("video_id");
        if (video_id && video_id.length && video_id.length < 20) {
            set_video(el, video_id, {
                autoplay: el.getAttribute("autoplay"),
                muted: el.getAttribute("muted"),
                loop: el.getAttribute("loop"),
                controls: el.getAttribute("controls"),
            });
            if (el.getAttribute("bottomzero")) {
                document.getElementById(`ytframe_${video_id}`).style.marginBottom = "0";
            }
        }
    }
}
const modal_close_ = () => {
    if (modal_displayed) {
        document.body.classList.remove("modal-open");
        document.getElementById("scroll_butt_container").style.display = "";
        document.getElementsByTagName("html")[0].style.overflowY = ""
        const modal = document.getElementById("donate_item_modal");
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = "none";
        }, 350);
        modal_displayed = false;
    }
}
const modal_open_ = (onclick_lock = false) => {
    modal_displayed = true;
    document.body.classList.add("modal-open");
    document.getElementById("scroll_butt_container").style.display = "none";
    document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    try {
        document.getElementById("private_gift_button_modal").remove()
    } catch (_) {}
    const modal = document.getElementById("donate_item_modal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.opacity = 1;
    }, 50);
    if (!onclick_lock) {
        window.onclick = (event) => {
            if (event.target === modal) {
                modal_close_();
            }
        }
    }
}
const switch_modal_containers = (mode = "service", info_params = {}) => {
    const span = document.getElementsByClassName("close_b")[0];
    const info = document.getElementById("modal-info-container-c");
    const service = document.getElementById("modal-donate-container-c");
    const service_coins = document.getElementById("modal-donate-finish-container-b");
    const success = document.getElementById("modal-donate-success-container");
    const finish_donate = document.getElementById("modal-donate-finish-container-c");
    const title = document.querySelector(".modal-title");
    const _array = [{
        name: "service",
        selector: service,
        title: "Товар",
    },
        {
            name: "service_coins",
            selector: service_coins,
            title: "Оплата пожертвования",
        },
        {
            name: "info",
            selector: info,
            title: "Сообщение",
        },
        {
            name: "success",
            selector: success,
            title: "Чек",
        },
        {
            name: "donate_finish",
            selector: finish_donate,
            title: "Корзина",
        },
    ];
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
    span.onclick = () => {
        modal_close_();
    };
}
const discount_calculate = (price, discount) => {
    discount = discount / 100;
    return (price * discount).toFixed();
}
const get_cookie_cart = () => {
    let cookie_cart = {};
    try {
        cookie_cart = JSON.parse(Cookies.get(cart_cookie));
    } catch (_) {}
    return cookie_cart;
}
const updateCartCount = () => {
    document.getElementById("count_cart_items_dn").innerText = countProperties(get_cookie_cart());
}
const groupAlreadyInCart = (user_cart) => {
    const cart = Object.keys(user_cart);
    for (let i = 0; i < donate_services_array.length; i++) {
        if (donate_services_array[i].type === "group") {
            if (cart.includes(donate_services_array[i].id.toString())) {
                return true;
            }
        }
    }
    return false;
}
const comment_show_action = (id, close = false) => {
    const comment_text = document.getElementById(`comment_text_${id}`);
    const comment_show = document.getElementById(`comment_show_${id}`);
    swiper_comments.on("slideChange", () => {
        comment_show_action(id, true);
    });
    if (close || comment_text.getAttribute("fullShowComment") === "1") {
        comment_text.style.height = "100px";
        comment_text.setAttribute("fullShowComment", "0");
        comment_show.innerText = "Раскрыть";
    } else {
        comment_text.style.height = "100%";
        comment_text.setAttribute("fullShowComment", "1");
        comment_show.innerText = "Скрыть";
    }
}
const initComments = () => {
    const array_ = document.getElementById("comment_swipe_array");
    const createSwiper = () => {
        swiper_comments = new Swiper("#comment_swipe_container", {
            spaceBetween: 12,
            loop: true,
            observer: true,
            observeParents: true,
            preventClicks: false,
            preventClicksPropagation: false,
            autoplay: {
                delay: 3000,
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
    const playersGet = (callback) => {
        requestCall((r) => {
            callback(r);
        }, "assets/data/players.json", "GET", true);
    };
    const searchPlayer = (players, name) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].name === name) {
                return players[i];
            }
        }
    };
    requestCall((r) => {
            const comment = r;
            shuffle(comment);
            playersGet((players) => {
                for (let i = 0; i < comment.length; i++) {
                    const player = searchPlayer(players, comment[i].name);
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
                                            «${comment[i].text}»</p>
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

                    const
                        comment_text =
                            document
                                .getElementById(
                                    `comment_text_${i}`
                                );
                    const
                        comment_show =
                            document
                                .getElementById(
                                    `comment_show_${i}`
                                );

                    comment_show
                        .style
                        .fontWeight =
                        "400";
                    comment_text
                        .style
                        .transition =
                        "height .8s cubic-bezier(1, -.3, 0, 1.21) 0s";
                    comment_text
                        .setAttribute(
                            "fullShowComment",
                            "0"
                        );
                    const
                        correction_height =
                            12;

                    if (comment_text
                            .clientHeight >
                        100 +
                        correction_height
                    ) {
                        comment_text
                            .style
                            .height =
                            "100px";
                        comment_text
                            .style
                            .overflow =
                            "hidden";
                    } else {
                        comment_show
                            .style
                            .display =
                            "none";
                    }
                }
            });

            createSwiper();
        },
        "assets/data/comments.json",
        "GET", true);
}

const buildPlayersSwiper = () => {
    const array_ = document
        .getElementById(
            "players-swiper-array");

    const createSwiper = () => {
        new Swiper(
            "#players_swipe_container", {
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
                    2000: {
                        slidesPerView: 6,
                    }
                },
            });
    };

    const badges_get = (
        callback) => {
        requestCall((r) => {
                callback(r);
            },
            "assets/data/badges.json",
            "GET", true);
    };

    badges_get((badges_paste) => {
        requestCall((
                r) => {
                const
                    player =
                        r;
                shuffle(
                    player
                );

                let players_array = [];
                for (let player_in of player) {
                    players_array.push(player_in.name);
                }

                getPlayersSkins(function (skins) {
                    for (let i =
                        0; i <
                         player
                             .length; i++
                    ) {
                        // const ult_template = "";

                        // for (let player_skin of skins) {
                        //     if (player[i].name.toLowerCase() === player_skin["Nick"].toLowerCase()) {
                        //         player[i].head = `https:${backend_host}/profile/head/?texture_hash=${
                        //             player_skin["Value"]}&crypto_token=${
                        //             encodeURIComponent(crypto_token)}`;
                        //     }
                        // }

                        const
                            getBadges =
                                () => {
                                    let result =
                                        "";
                                    player
                                        [i]
                                        .badges
                                        .sort();
                                    for (
                                        let s =
                                            0; s <
                                        player[
                                            i
                                            ]
                                            .badges
                                            .length; s++
                                    ) {
                                        const
                                            badge_local =
                                                player[
                                                    i
                                                    ]
                                                    .badges[
                                                    s
                                                    ];
                                        if (badge_local &&
                                            badge_local
                                                .length &&
                                            badge_local !==
                                            "verified" &&
                                            !
                                                badge_local
                                                    .includes(
                                                        "clan-"
                                                    )
                                        ) {
                                            result
                                                =
                                                result + `
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

                        const
                            getClan =
                                () => {
                                    for (
                                        let s =
                                            0; s <
                                        player[
                                            i
                                            ]
                                            .badges
                                            .length; s++
                                    ) {
                                        if (player[
                                            i
                                            ]
                                            .badges[
                                            s
                                            ]
                                            .includes(
                                                "clan-"
                                            )
                                        ) {
                                            return player[
                                                i
                                                ]
                                                .badges[
                                                s
                                                ]
                                                .replace(
                                                    "clan-",
                                                    ""
                                                );
                                        }
                                    }
                                }

                        glob_players
                            .push(
                                player[
                                    i
                                    ]
                                    .name
                            );
                        const
                            player_badges_ =
                                getBadges();
                        const
                            player_clan =
                                getClan();
                        player[i].head = prepare_img_link(player[i].head);
                        array_
                            .innerHTML =
                            array_
                                .innerHTML + `
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
                                    <!-- <div class="player_badge_container" style="${!player_badges_.length ? "display:none" : ""}">
                                        ${player_badges_}
                                    </div> -->
                                    <p class="fs-sm mb-0">${player[i].desc}</p>
                                </div>
                            </span>
                        </div>
                    `;
                    }

                    createSwiper();
                }, players_array);
            },
            "assets/data/players.json",
            "GET", true);
    });
}

const buildDonateHistorySwiper = () => {
    const array_ = document
        .getElementById(
            "payments-history-swiper-array");

    const createSwiper = () => {
        new Swiper(
            "#payments_history_container", {
                slidesPerView: 1,
                spaceBetween: 24,
                autoplay: {
                    delay: 1500,
                },
                loop: true,
                observer: true,
                observeParents: true,
                preventClicks: false,
                pagination: {
                    el: ".payments-history-pagination",
                    clickable: true,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    920: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                    1600: {
                        slidesPerView: 6,
                    },
                    1900: {
                        slidesPerView: 7,
                    },
                    2100: {
                        slidesPerView: 8,
                    },
                    2500: {
                        slidesPerView: 9,
                    },
                },
            });
    };

    const updateDonateTime = () => {
        const selectors = document.querySelectorAll("#item-donate-history-desc>time");
        for (let i = 0; i < selectors.length; i++) {
            const select = selectors[i];
            const time_ = select.getAttribute("datetime");

            select.innerHTML = formatDate(new Date(time_), time_in_moscow_get());
        }
    }

    getPaymentHistory(function(data) {
        // console.log(data.length);
        for (let i = 0; i <
        data
            .length; i++) {
            const date = new Date(data[i].updated_at);
            data[i].product.image = prepare_img_link(data[i].product.image);
            array_
                .innerHTML =
                array_
                    .innerHTML + `
                    <!-- use player template for donate history swiper -->
                    <div class="swiper-slide text-center">
                        <span class="d-block py-3">
                            <div class="player_head_container">
                                <div 
                                    class="player-head d-block mx-auto" 
                                    style="background-image: url(${data[i].product.image});height:65px!important"
                                ></div>
                            </div>
                            <div class="card-body p-3">
                                <h5 class="h5 fs-6 fw-semibold pt-1 mb-2">
                                    ${data[i].product.name}
                                </h5>
                                <p class="fs-sm mb-0" id="item-donate-history-desc">
                                    <span class="text-gradient-primary fw-bold">${data[i].customer}</span>
                                    <br/>
                                    <time datetime="${
                    date.toString()
                }"></time>
                                </p>
                            </div>
                        </span>
                    </div>
                `;
        }
        createSwiper();
        setInterval(updateDonateTime, 1000);
    });
}

const setSticker = (stickers_count=0, id=0, custom_path=null) => {
    let path = `assets/images/stickers/sticker${randDiaps(stickers_count)}.webp`;
    if (custom_path) {
        path = custom_path;
    } else if (lock_sticker_switch) {
        return;
    }
    const link = prepare_img_link(path);
    document.getElementById(`super-klassniy-sticker-${id}`).style.backgroundImage = `url(${link})`;
}
const setRandomStickerLand = () => {
    const stickers_count = 32;
    const selector = document.getElementById("super-klassniy-sticker-0");

    for (let i = 0; i <= stickers_count; i++) {
        getImageLightness(`assets/images/stickers/sticker${i}.webp`, undefined, false);
    }

    setInterval(function() {
        if (window.pageYOffset > 1600 || donate_displayed) {
            selector.style.opacity = 0;
        } else if (!donate_displayed && window.pageYOffset <= 1600) {
            setTimeout(function() {
                selector.style.opacity = .4;
            }, 800);
        } else {
            selector.style.opacity = .4;
        }
    }, 30);

    const updateStickerPosition = () => {
        if (window.innerWidth >= 992) {
            selector.style.top = `${randDiaps(85)}%`;
            selector.style.left = `${randDiaps(85)}%`;
        } else {
            selector.style.top = `${randDiaps(50)}%`;
            selector.style.left = `${randDiaps(75)}%`;
        }
    }

    setSticker(stickers_count);
    setInterval(setSticker, 6000);

    updateStickerPosition();
    setInterval(updateStickerPosition, 3000);

    spClownLoad();
}
const donate_element_click = (
    product_data) => {
    switch_modal_containers(
        "service");
    const exclude_types = ["group"];
    const desc = document
        .getElementById(
            "donate_item_select_text"
        );
    const text_template = `Товар <span class="text-primary fw-semibold">${product_data.name}</span>,
            цена ${product_data.count} ${getNoun(product_data.count, "единицы", "единиц", "единиц")}
        <span class="text-primary fw-semibold">
            ${product_data.price}
            ${getNoun(product_data.price, "рубль", "рубля", "рублей")}
        </span>.
    `;
    const items_count_donate =
        document
            .getElementById(
                "items_count_donate");
    const count_hint = document
        .getElementById(
            "donate_count_text_hint"
        );
    const add_to_cart = document
        .getElementById(
            "donate_button_add_to_cart"
        );
    const cookie_cart =
        get_cookie_cart();
    let switch_ = false;

    const _update_count = () => {
        add_to_cart
            .setAttribute(
                "onClick",
                `donate_cart(${product_data.service_id}, ${items_count_donate.value})`
            );
    };

    items_count_donate.value = 1;

    _update_count();

    const product_in_cart =
        cookie_cart
            .hasOwnProperty(product_data
                .service_id
                .toString());

    if ((exclude_types.includes(
                product_data.type
            ) ||
            product_data.type ===
            "group") &&
        groupAlreadyInCart(
            cookie_cart)
    ) {
        switch_modal_containers(
            "info");
        switch_ = true;
        let group_error = "";

        if (product_data.type ===
            "group") {
            group_error =
                "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую.";
        } else if (
            product_in_cart) {
            group_error = `Ошибка, вы можете добавить товар 
                <span class="text-primary fw-semibold">${product_data.name}</span> 
                только один раз.`;
        } else {
            group_error =
                "Мы не знаем почему, но эта ошибка вызвана по неизвестным причинам.";
        }

        document.getElementById(
            "donate_info_block_text"
        )
            .innerHTML =
            group_error;
    }

    let count_state = "block";

    if (exclude_types.includes(
        product_data.type)) {
        count_state = "none";
    }

    items_count_donate.style
        .display =
        count_state;
    count_hint.style.display =
        count_state;

    const only_dig = () => {
        const value =
            items_count_donate
                .value;
        items_count_donate
            .value =
            value.replace(
                /\D+/g,
                "");
    };

    const _calculate_price =
        () => {
            only_dig();

            if (!exclude_types
                .includes(
                    product_data
                        .type
                )) {
                let _price =
                    parseInt(
                        items_count_donate
                            .value) *
                    product_data
                        .price;

                const
                    currenct_in_cart =
                        cookie_cart[
                            product_data
                                .service_id
                            ];
                let template_counter_i =
                    "";

                if (isNaN(_price) ||
                    1 >
                    Math.sign(
                        _price)) {
                    _price = 0;
                }

                if (
                    currenct_in_cart) {
                    template_counter_i
                        = `
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

    items_count_donate
        .addEventListener(
            "input",
            (_) => {
                _calculate_price();
            });
    modal_open_();
}

const donate_get_service_by_id = (
    id) => {
    for (let i = 0; i <
    donate_services_array
        .length; i++) {
        if (donate_services_array[i]
            .id === parseInt(id)) {
            return donate_services_array[
                i];
        }
    }

    return null;
}

const donateResetPaymentState = (type =
                                     1, repeat = false,
                                 coupon_reset =
                                     false) => {
    const coupon_sl = document
        .getElementById(
            "donate-coins-payment");
    const inputs = [
        "donate_sum",
        "donate_customer_c",
        "donate_email_c",
        "coupon-input-c"
    ]
    let sl = "_c";
    let vl = document
        .getElementById(
            "donate_sum")
        .value.trim();
    if (!coins_sell_mode) {
        sl = "";
        vl = 0;
    }
    const button = document
        .getElementById(
            "payment-button-donate" +
            sl
        );
    const update_inputs = () => {
        for (let i = 0; i <
        inputs
            .length; i++) {
            if (inputs[i]
                    .includes(
                        "coupon") &&
                !
                    coupon_reset) {
                // pass
            } else {
                document
                    .getElementById(
                        inputs[
                            i])
                    .value = "";
            }
        }
    }
    if (coupon_reset) {
        coupon_sl.innerHTML = "";
        update_inputs();
        checked_coupon = "";
        failed_coupon = "";
    }
    button.setAttribute("onClick",
        `generatePaymentLink(${type}, ${(type === 2) ? 1 : vl})`
    );
    button.removeAttribute(
        "disabled");
    button.innerText = repeat ?
        "Повторить" : "Дальше";
}

const donate_cart = (product, count,
                     remove = false) => {
    const cart = Cookies.get(
        cart_cookie);
    const cart_parsed =
        get_cookie_cart();
    let product_count_in_cart = 0;
    const max_item_count = 30000;
    const local_prm =
        '<span style="color: #a4a6ff">';

    try {
        const p = cart_parsed[
            product];

        if (Number.isInteger(p)) {
            product_count_in_cart
                = +p;
        }
    } catch (_) {}

    if (!Number.isInteger(
        product) || !
        Number.isInteger(count)) {
        return;
    } else if (1 > Math.sign(
        count)) {
        notify(
            "Количество не может быть равно нулю или меньше"
        );
        return;
    } else if (
        product_count_in_cart +
        count > max_item_count) {
        notify(
            `Максимальное количество - ${local_prm}${max_item_count}</span>`
        );
        return;
    }

    if (!cart) {
        Cookies.set(cart_cookie,
            JSON
                .stringify({}));
    }

    const els_ = JSON.parse(Cookies
        .get(
            cart_cookie));
    const product_data =
        donate_get_service_by_id(
            product);

    if (remove) {
        delete els_[product];
        notify(
            `Товар ${local_prm} ${product_data.name}</span> убран из корзины`
        );
    } else {
        if (els_[product]) {
            els_[product] = els_[
                product] + count;
            notify(`В корзину добавлено ${local_prm} ${count} 
                    </span>
                    ${getNoun(count, "единица", "единицы", "единиц")} 
                    товара ${local_prm} ${product_data.name} 
                    </span>`);
        } else {
            els_[product] = count;
            notify(
                `Товар ${local_prm} ${product_data.name}</span> добавлен в корзину`
            );
        }
    }

    Cookies.set(cart_cookie, JSON
        .stringify(els_));
    modal_close_();
    initDonate();
    updateCartCount();
    donateResetPaymentState();
}

const donate_cart_button = (
    els = {}) => {
    const selector_ = document
        .querySelectorAll(
            ".donate-cart-button-cn"
        );

    if (coins_sell_mode) {
        return;
    }

    for (let i = 0; i < selector_
        .length; i++) {
        const sl = selector_[i]
            .style;

        if (countProperties(els)) {
            sl.display = "flex";
            setTimeout(() => {
                sl.opacity =
                    1;
                sl.marginTop =
                    "15px";
                selector_[i]
                    .removeAttribute(
                        "disabled"
                    );
            }, 50);
        } else {
            selector_[i]
                .setAttribute(
                    "disabled", "");
            sl.opacity = 0;
            sl.marginTop = "-50px";
            setTimeout(() => {
                sl.display =
                    "none";
            }, 350);
        }
    }
}

const donateFlushCart = () => {
    Cookies.remove(cart_cookie);
    donate_cart_button({});
    notify("Корзина очищена");
}

const setAvatar = (user) => {
    const photoTG = false;
    const selector = document.getElementById("telegram-auth-avatar")
        .style
    if (user.photo_url && photoTG) {
        selector.backgroundImage = `url(${user.photo_url})`
    } else {
        selector.background =
            `linear-gradient(343deg, var(--telegram-bgcolor${
                getAvatarColorIDforTG(user.id)
            }-top) 0%, var(--telegram-bgcolor${
                getAvatarColorIDforTG(user.id)
            }-bottom) 100%)`
        document.getElementById("tg-user-avatar-text").innerText =
            `${user.first_name.slice(0, 1)}${user.last_name.slice(0, 1)}`.toUpperCase()
    }
}

const onTelegramAuth = (user) => {
    Cookies.set(
        telegram_cookie_token,
        utf8_to_b64(JSON
            .stringify(
                user)));
    modal_close_();
    notify(
        `Вы успешно авторизовались как <span class="text-gradient-primary">${user.first_name} ${user.last_name}</span>`
    );
    autoAuthTelegramObserver();
}

const getTelegramAuth = (raw =
                             false) => {
    const cookie_field = Cookies
        .get(
            telegram_cookie_token);
    if (cookie_field) {
        if (raw) {
            return cookie_field;
        } else if (cookie_field) {
            return JSON.parse(
                b64_to_utf8(
                    cookie_field
                ));
        }
    }
}

const couponCheck = (coins = false) => {
    let selector_c = "";
    if (coins_sell_mode) {
        selector_c = "-c";
    }

    const input = document
        .getElementById(
            "coupon-input" +
            selector_c);
    const button = document
        .getElementById(
            "coupon-button" +
            selector_c
        );
    let code = "";

    try {
        code = input.value.trim()
            .toUpperCase();
    } catch (_) {}

    const coupon_notfd = () => {
        notify(
            `Купон <span class="text-primary fw-semibold">${failed_coupon}</span> не найден`
        );
    };

    const check_coupon_valid =
        (products, product) => {
            if (products) {
                for (let i = 0; i <
                products
                    .length; i++
                ) {
                    if (products[i]
                            .id ===
                        current_c_item
                    ) {
                        return true;
                    }
                }
            }
            return false;
        };

    if (!code.length) {
        notify(
            "Вы не указали купон");
        return;
    } else if (code.length > 20) {
        notify(
            "Купон слишком длинный");
        return;
    } else if (!/^[A-z\d_]+$/.test(
        code)) {
        notify(
            "Купон указан неверно");
        return;
    } else if (checked_coupon ===
        code) {
        notify(
            "Этот купон уже используется"
        );
        return;
    } else if (failed_coupon ===
        code) {
        coupon_notfd();
        return;
    }

    const input_lock = (lock =
                            false) => {
        if (lock) {
            input.setAttribute(
                "disabled",
                "");
            button.setAttribute(
                "disabled",
                "");
            button.innerText =
                "Проверяем";
        } else {
            input
                .removeAttribute(
                    "disabled");
            button
                .removeAttribute(
                    "disabled");
            button.innerText =
                "Проверить";
        }
    };

    input_lock(true);
    check_coupon((r) => {
        // console.log(`check_coupon = ${typeof r}`);
        if (r) {
            const call =
                () => {
                    checked_coupon
                        =
                        code;
                    notify(
                        `Купон <span class="text-primary fw-semibold">${code}</span> действительный`
                    );
                };
            if (!
                coins_sell_mode
            ) {
                call();
                donateCartCall
                (
                    code,
                    false
                );
            } else if (
                check_coupon_valid(
                    r
                        .products,
                    current_c_item
                )) {
                call();
                const sl =
                    document
                        .getElementById(
                            "donate-coins-payment"
                        );
                sl.innerHTML = `<li class="list-group-item d-flex justify-content-between bg-light">
                        <div class="text-primary">
                            <h6 class="my-0 text-start">Купон</h6>
                            <small class="text-start" style="float: left">${code}</small>
                        </div>
                        <span class="text-muted text-end" style="width: 30%">
                            ${r.discount}%</span>
                    </li>`;
            } else {
                notify(
                    "Этот купон недействительный"
                );
            }
        } else {
            failed_coupon =
                code;
            coupon_notfd();
        }

        input_lock();
    }, code);
}

const donate_enable_coupon = (enabled =
                                  true) => {
    const input = document
        .getElementById(
            "coupon-input");
    const button = document
        .getElementById(
            "coupon-button");

    if (enabled) {
        input.setAttribute(
            "placeholder",
            "BRFF");
        button.setAttribute(
            "onClick",
            "couponCheck()");
        input.removeAttribute(
            "disabled");
        button.removeAttribute(
            "disabled");
    } else {
        input.setAttribute(
            "disabled",
            "");
        input.setAttribute(
            "placeholder",
            "Сейчас недоступно");
        button.setAttribute(
            "disabled",
            "");
    }
}

const get_data_service = (
    service_id) => {
    for (let i = 0; i <
    products_by_serverid
        .length; i++) {
        if (parseInt(
                products_by_serverid[
                    i].id
            ) ===
            parseInt(
                service_id)
        ) {
            return products_by_serverid[
                i];
        }
    }
}

const generatePaymentLink = (type = 1,
                             sum = 0) => {
    let selector_c = "";
    if (coins_sell_mode) {
        selector_c = "_c";
    }
    const button = document
        .getElementById(
            "payment-button-donate" +
            selector_c);
    let customer = document
        .getElementById(
            "donate_customer" +
            selector_c)
        .value.trim();
    let email = document
        .getElementById(
            "donate_email" +
            selector_c)
        .value.trim();
    let coupon = "";
    customer = glob_auth_player_data.NICKNAME;
    const max_sum = 30000;
    const local_prm =
        '<span style="color: #a4a6ff">';

    try {
        coupon = checked_coupon
            .trim();
    } catch (_) {}

    if (type === 1) {
        if (!Number.isInteger(
            sum) || !
            Number.isInteger(sum)) {
            notify(
                "Ошибка проверки суммы"
            );
            return;
        } else if (1 > Math.sign(
            sum)) {
            notify(
                "Сумма не может равняться нулю или меньше"
            );
            return;
        } else if (sum > max_sum) {
            notify(
                `Максимальная сумма - ${local_prm}${max_sum}</span>`
            );
            return;
        }
    }

    if (!customer.length) {
        notify(
            "Введите пожалуйста ваш никнейм"
        );
        return;
    } else if (customer.length >
        40) {
        notify(
            "Ваш никнейм слишком длинный"
        );
        return;
    } else if (customer.length < 3) {
        notify(
            "Ваш никнейм слишком короткий"
        );
        return;
    } else if (!/^[A-z\d_]+$/.test(
        customer)) {
        notify(
            "Никнейм не соотвествует формату"
        );
        return;
    }

    if (!email.length) {
        notify(
            "Введите пожалуйста ваш email"
        );
        return;
    } else if (!validateEmail(
        email)) {
        notify(
            "Ошибка, адрес почты недействительный"
        );
        return;
    }

    if (!coupon) {
        coupon = "";
    }
    if (coins_sell_mode) {
        // products = JSON.parse(
        //     `{"${donate_services_array[type - 1].id}": ${sum}}`
        // );
        products = JSON.parse(
            `{"${current_c_item}": ${sum}}`
        );
    } else {
        products =
            get_cookie_cart();
    }

    button.setAttribute("disabled",
        "");
    button.innerText =
        "Проверяем данные...";

    const _d_service =
        get_data_service(
            current_c_item);
    create_payment((
            callback_data) => {
            if (callback_data) {
                button
                    .removeAttribute(
                        "disabled"
                    );
                button
                    .innerText =
                    "Оплатить";
                payment_url_global
                    =
                    callback_data
                        .url;
                button
                    .setAttribute(
                        "onClick",
                        "payment_action_bt()"
                    );
            } else {
                notify(
                    "Ошибка, не удалось сформировать чек для оплаты"
                );
                donateResetPaymentState
                (type,
                    repeat =
                        true);
            }
        }, customer, products,
        _d_service.server_id,
        email,
        coupon);
}

const payment_action_bt = () => {
    window.open(payment_url_global,
        "_blank");

    const cart_dom = document
        .getElementById(
            "donate-cart-list-success"
        );
    const succ_text = document
        .getElementById(
            "success-pay-text-js");
    const cont_ok = document
        .getElementById(
            "only-ok-payment");
    const title = document
        .querySelector(
            ".modal-title");

    const build_modal_wind =
        () => {
            cart_dom.innerHTML = "";
            title.innerText = "";
            succ_text.innerText =
                "Давай, плати. Шеф ждёт...";
            cont_ok.style.display =
                "";
            document
                .querySelector(
                    "img.payment-sucess-vova"
                )
                .setAttribute("src",
                    "assets/images/vova-gay.webp"
                );
        };

    const flush_inputs_donate =
        () => {
            const inputs = [
                "donate_sum",
                "donate_customer_c",
                "donate_email_c",
                "coupon-input-c",
            ];
            for (let i = 0; i <
            inputs
                .length; i++) {
                document
                    .getElementById(
                        inputs[i])
                    .value = "";
            }
        };

    const enable_modal = () => {
        switch_modal_containers(
            "success");
        modal_open_();
        build_modal_wind();
        donateResetPaymentState
        ();
        flush_inputs_donate();
    };

    enable_modal();
}

const donate_check_services_cart =
    () => {
        const services_cookie = Object
            .keys(
                get_cookie_cart());
        const services_origin =
            donate_services_array;
        const services = [];

        for (let i = 0; i <
        services_origin
            .length; i++) {
            services.push(
                services_origin[i]
                    .id);
        }

        for (let i = 0; i <
        services_cookie
            .length; i++) {
            if (!services.includes(
                parseInt(
                    services_cookie[
                        i]))) {
                const cart = JSON.parse(
                    Cookies.get(
                        cart_cookie)
                );
                delete cart[parseInt(
                    services_cookie[
                        i])];
                Cookies.set(cart_cookie,
                    JSON.stringify(
                        cart)
                );
                console.log(
                    `Remove ${services_cookie[i]} from cart`
                );
            }
        }
    }

const initDonate = () => {
    let els = {};

    try {
        els = JSON.parse(Cookies
            .get(
                cart_cookie));
    } catch (_) {}

    donate_cart_button(els);
    donate_enable_coupon(true);
}

const donateCartCall = (coupon = null,
                        nickname_update = true) => {
    const cart = get_cookie_cart();
    const cart_keys = Object.keys(
        cart);
    const cart_dom = document
        .getElementById(
            "donate-cart-list");
    const selectors_payment = [
        document
            .getElementById(
                "donate_customer"),
        document.getElementById(
            "donate_email"),
        document.getElementById(
            "coupon-input"),
    ];
    switch_modal_containers(
        "donate_finish");
    modal_open_();
    cart_dom.innerHTML = "";
    let sum_price = 0;

    for (let i = 0; i <
    selectors_payment
        .length; i++) {
        selectors_payment[i]
            .addEventListener(
                "input",
                (_) => {
                    donateResetPaymentState
                    ();
                });
    }

    for (let i = 0; i < cart_keys
        .length; i++) {
        const item =
            donate_get_service_by_id(
                cart_keys[i]);
        const price = item.price *
            cart[
                item.id];
        sum_price += price;
        cart_dom.innerHTML =
            cart_dom
                .innerHTML + `
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

    const coupon_container =
        () => {
            cart_dom.innerHTML =
                cart_dom.innerHTML + `<li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-primary">
                    <h6 class="my-0 text-start">Купон</h6>
                    <small class="text-start" style="float: left">${coupon}</small>
                </div>
            </li>`;
        };

    const sum_container = () => {
        cart_dom.innerHTML =
            cart_dom.innerHTML + `<li class="list-group-item d-flex justify-content-between">
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
            .querySelector(
                "input#donate_customer"
            )
            .setAttribute(
                "placeholder",
                glob_players[0]);
    }
}

const donateCoinsPay = (type = 1) => {
    const button = document
        .getElementById(
            "payment-button-donate_c"
        );
    let sum = document
        .getElementById(
            "donate_sum");

    if (!sum.value && !/^[\d]+$/
        .test(
            sum.value)) {
        sum = 0;
    } else {
        sum = sum.value;
    }

    button.setAttribute("onClick",
        `generatePaymentLink(${type}, ${(type === 2) ? 1 : sum})`
    );
}

const donateModalCall = (type_item,
                         item_id, nickname_update = true
) => {
    const sum = document
        .getElementById(
            "donate_sum");
    const customer_field = document
        .getElementById(
            "donate_customer_c");
    const sum_container = document
        .getElementById(
            "sum-tokens-container");
    const email_container_classL =
        document.getElementById(
            "customer-email-tokens-container"
        )
            .classList;
    const modal_payment_text =
        document
            .getElementById(
                "donate-text-span");
    let payment_text_form;
    const selectors_payment = [
        document
            .getElementById(
                "donate_sum"),
        document
            .getElementById(
                "donate_customer_c"
            ),
        document.getElementById(
            "donate_email_c"),
        document.getElementById(
            "coupon-input-c"),
    ];
    const title = document
        .querySelector(
            ".modal-title");
    let item_name;

    const update_title = (
        descriptor) => {
        title.innerText = title
            .innerText.replace(
                /\([\s\S]*?\)/)
            .trim();
        title.innerText =
            `${title.innerText} (${descriptor})`;
    }

    current_c_item = item_id;
    current_c_item_name = get_data_service(item_id).name;

    if (type_item === 1) {
        sum_container.style
            .display =
            "";
        email_container_classL
            .remove(
                "col-sm-6");
        email_container_classL.add(
            "col-12");
        payment_text_form = `
            Воспользовавшись этой формой, вы можете поддержать проект финансово.
            За поддержку вы получите вознаграждение – за каждый рубль по одному игровому токену.
        `;
        item_name = "Токены";
        sum.addEventListener(
            "input",
            (_) => {
                donateCoinsPay
                ();
            });
    } else if (type_item === 2) {
        sum_container.style
            .display =
            "none";
        email_container_classL
            .remove(
                "col-12");
        email_container_classL.add(
            "col-sm-6");
        desc_get = get_data_service(current_c_item).description;
        if (!desc_get) {
            desc_get = ""
        }

        payment_text_form = `
            Форма оплаты пожертвования для игрового проекта Zalupa.Online
            <br/>
            <span class="text-gradient-primary">
                ${desc_get}
            </span>
        `;
        item_name = current_c_item_name;
        customer_field
            .addEventListener(
                "input",
                (_) => {
                    donateCoinsPay(
                        type_item
                    );
                });
    }
    modal_payment_text.innerHTML =
        payment_text_form
            .replaceAll(
                "\n", "");

    for (let i = 0; i <
    selectors_payment
        .length; i++) {
        selectors_payment[i]
            .addEventListener(
                "input",
                (_) => {
                    donateResetPaymentState
                    (type_item);
                });
    }

    switch_modal_containers(
        "service_coins");
    modal_open_();

    if (nickname_update) {
        const randomNick = false;
        const fldSelect = document.querySelector("input#donate_customer_c");
        if (randomNick) {
            shuffle(glob_players);
            fldSelect
                .setAttribute(
                    "placeholder",
                    glob_players[0]
                );
        } else {
            fldSelect
                .setAttribute(
                    "placeholder",
                    glob_auth_player_data.NICKNAME
                );
            fldSelect.value = glob_auth_player_data.NICKNAME;
            fldSelect
                .setAttribute("disabled", "");
        }
    }

    donateResetPaymentState(
        type_item,
        false, true);
    update_title(item_name);
}

const linksSet = (selector_,
                  fisrt_el_mrg = false) => {
    const sl = document
        .getElementById(
            selector_);
    let mrg =
        "margin-left: 0 !important";

    for (let i = 0; i < links_lt
        .length; i++) {
        if (!fisrt_el_mrg || i) {
            mrg = "";
        }

        sl.innerHTML = sl
            .innerHTML + `<a href="${links_lt[i].link}" 
                target="_blank" style="${mrg}"
                class="btn btn-icon btn-secondary btn-${links_lt[i].name} mx-2">
                    <i class="bx bxl-${links_lt[i].name}"></i>
            </a>`;
    }
}

const initCrypto = () => {
    if (!freeze_crypto) {
        freeze_crypto = true;
        crypto_token = "";
        getCrypto((token_) => {
            crypto_token =
                token_;
            freeze_crypto =
                false;
        });
    }
}

const initLanding = () => {
    if (development_hosts.includes(
            window.location.hostname
        ) &&
        lock_of) {
        document.getElementById(
            "landing_description_gb"
        )
            .innerText =
            "Этот сайт - preview-версия!";
        document.getElementById(
            "donate-test-mode-enb"
        )
            .innerText =
            "Этот блок работает в демонстративном режиме и не является функциональным.";
    }

    linksSet("landing-links-tp",
        true);
    linksSet(
        "links-block-footer-v");
}

const finishLoad = () => {
    document.querySelector("main")
        .setAttribute("style", "");
    document.querySelector("footer")
        .setAttribute("style", "");
    const heart =
        '<i class="emoji" style="background-image:url(\'assets/images/emoji/red-heart.png\');font-size: .7rem;bottom:-1px"><b>❤️</b></i>';
    document.getElementById(
        "footer-text-blc")
        .innerHTML =
        `Создал KovalYRS с ${heart}, специально для ZALUPA.ONLINE`;
    if (grecaptcha) {
        document.getElementById(
            "re-badge-text")
            .innerText =
            "This site uses Google ReCaptcha technology";
    }
}

const observerSystemTheme = () => {
    const mode_list = ["dark",
        "light"
    ];
    const theme_switch = document
        .querySelector(
            '[data-bs-toggle="mode"]'
        )
        .querySelector(
            ".form-check-input");

    const updateTheme = (mode) => {
        if (mode === "dark") {
            root.classList.add(
                "dark-mode");
            theme_switch
                .checked =
                true;
        } else {
            root.classList
                .remove(
                    "dark-mode"
                );
            theme_switch
                .checked =
                false;
        }
    };

    for (let i = 0; i < mode_list
        .length; i++) {
        const observer = window
            .matchMedia(
                `(prefers-color-scheme: ${mode_list[i]})`
            );
        observer.addEventListener(
            "change", (e) => e
                    .matches &&
                updateTheme(
                    mode_list[i]));
    }
}

const callSucessPayModal = (payment_id =
                                0) => {
    let glob_func_payment_data;
    const item_nm_payment_result =
        false;

    const cart_dom = document
        .getElementById(
            "donate-cart-list-success"
        );
    const succ_text = document
        .getElementById(
            "success-pay-text-js");
    const cont_ok = document
        .getElementById(
            "only-ok-payment");
    const title = document
        .querySelector(
            ".modal-title");

    donateSwitchContainer(true);

    const item_type_ = (
        product_name) => {
        const t = (product_name)
            .toLowerCase();

        if (t.includes(
            "токен")) {
            return 1;
        } else {
            return 2;
        }
    }

    const update_pm_desc = () => {
        const img_product =
            glob_func_payment_data
                .product.image;
        const name_product =
            glob_func_payment_data
                .product.name;

        if (img_product &&
            img_product.length
        ) {
            document
                .querySelector(
                    ".payment-sucess-vova"
                )
                .src =
                img_product;
            const
                name_selector =
                    document
                        .querySelector(
                            ".item-name-payment-result"
                        );
            if (
                item_nm_payment_result
            ) {
                name_selector
                    .innerText =
                    name_product;
            } else {
                name_selector
                    .style
                    .marginBottom =
                    "4vh";
            }
        }
    }

    const buildPayment = (
        payment) => {
        if (payment.status &&
            payment_id ==
            parseInt(
                payment.id)) {
            glob_func_payment_data
                =
                payment;
            succ_text
                .innerText =
                "Оплата прошла успешно, Шеф доволен, спасибо тебе.";
            cont_ok.style
                .display =
                "";

            const private_gift_button = document.createElement("button");
            private_gift_button.id = "private_gift_button_modal";
            private_gift_button.setAttribute("class", "btn btn-primary shadow-primary btn-lg mb-2 btn-shadow-hide");
            private_gift_button.innerText = "button::init";

            const item_type =
                item_type_(
                    payment
                        .product
                        .name);

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
                    <strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${payment.enrolled} ${getNoun(payment.enrolled, "рубль", "рубля", "рублей")}</strong>
                </li>
            `;

            if (
                coins_sell_mode) {
                if (item_type ===
                    1) {
                    sum_template
                        = `
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Сумма</span>
                            <strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${payment.enrolled} ${getNoun(payment.enrolled, "токен", "токена", "токенов")}</strong>
                        </li>
                    `;
                } else if (
                    item_type ===
                    2
                ) {
                    sum_template
                        = `
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Сумма</span>
                            <strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${payment.product.price} ${getNoun(payment.enrolled, "рубль", "рубля", "рублей")}</strong>
                        </li>
                    `;
                    document.querySelector("div.modal-footer").prepend(private_gift_button);
                }
            }

            if (!payment
                    .enrolled ||
                payment
                    .enrolled < 1
            ) {
                sum_template =
                    "";
            }
            if (!payment.email
                    .length ||
                payment
                    .email.match(
                    "undefined")
            ) {
                payment.email =
                    "Ну указано";
            }
            if (!payment
                    .payment_system ||
                payment
                    .payment_system
                    .match(
                        "undefined")
            ) {
                system_template
                    =
                    "";
            }
            if (!payment
                .created_at || !
                payment
                    .created_at
                    .length) {
                payment
                    .created_at =
                    "Неизвестно";
            } else {
                const
                    parsed_time =
                        new Date(
                            payment
                                .created_at
                        );
                payment
                    .created_at =
                    `${parsed_time.toLocaleDateString()} ${parsed_time.toLocaleTimeString()}`;
            }

            let template_invite_link = "";
            if (payment.private_invite) {
                template_invite_link = `
                    <li class="list-group-item d-flex justify-content-between lh-sm mb-2 mb-lg-3 mt-4 mt-lg-5">
                        <a href="${payment.private_invite}" id="private-chat-button" target="_blank" style="margin:auto"
                                   class="btn btn-primary shadow-primary btn-lg btn-shadow-hide">
                                Приглашение в приватный чат <i class="ms-1 bx bxl-telegram"></i></a>
                    </li>
                `;
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
                ${template_invite_link}
            `;
        } else {
            succ_text
                .innerText =
                "Чек неоплачен, Шеф недоволен.";
            document
                .querySelector(
                    "img.payment-sucess-vova"
                )
                .setAttribute(
                    "src",
                    "assets/images/vova-fail.webp"
                );
        }
    };

    const enable_modal = (
        payment) => {
        buildPayment(payment);
        switch_modal_containers(
            "success");
        modal_open_();

        // updaters
        update_pm_desc();
    };

    checkPayment((payment) => {
        if (typeof payment
                .status !==
            "undefined") {
            enable_modal(
                payment);
            title
                .innerText =
                `Чек #${payment.id}`;
        } else {
            notify(
                "Ошибка, чек не найден или EasyDonate вернул недействительный ответ"
            );
        }
    }, payment_id);
}

const successPay = () => {
    const url = new URL(window
        .location
        .href)
        .searchParams;
    const payment_id = url.get(
        "pg_order_id");

    if (payment_id) {
        callSucessPayModal(
            payment_id);
    }
}

const spClownLoad = () => {
    const buttons = document.getElementById("zlp_land_buttons");
    const button_template = `
        <button onclick="spClownShow()" 
                class="col btn btn-primary shadow-primary btn-lg me-sm-3 me-xl-4 mb-3 btn-shadow-hide">
            Я люблю СП
        </button>
    `;

    getImageLightness("assets/images/Clown-Face.gif", undefined, false);
    buttons.innerHTML = buttons.innerHTML + button_template;
}

const spClownShow = () => {
    lock_sticker_switch = true;
    setTimeout(function () { lock_sticker_switch = false }, 3500);

    setSticker(0, 0, "assets/images/emoji/clown-face.png");
    notify("На хуй отсюда иди тогда");
}

const donateContainerHash = () => {
    observerContainerHash(["donate",
            "donate_block"
        ],
        () => {
            donate_displayed =
                true;
            donateSwitchContainer
            (
                donate_displayed
            );
        });
}

const rulesModalOpen = () => {
    let content = "";
    get_rules_private_server((
        rules) => {
        for (let i = 0; i <
        rules
            .length; i++) {
            content += `
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 class="my-0 text-start">
                                ${i + 1}
                            </h6>
                        </div>
                        <span class="ps-2 pe-2 text-start">${rules[i].text}</span>
                    </li>
                `;
        }
        switch_modal_containers
        (
            "info", {
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

const rulesPrivateContainerHash =
    () => {
        observerContainerHash([
                "private_rules"
            ],
            () => {
                rulesModalOpen();
            });
    }

const openAdminContact = () => {
    checkTelegramAuthData((
        data) => {
        if (data || feedback_tg_auth_skip) {
            if (!glob_players.length) {
                glob_players = ["Player"];
            }
            shuffle(glob_players);
            switch_modal_containers
            ("info", {
                title: "Обратная связь",
                content: `
                        <p class="mb-2 mb-lg-3 mb-xl-4 text-start">
                            Это форма для предложений и жалоб, опишите пожалуйста кратко и 
                            ясно свою идею или предложение без воды.
                        </p>
                        <div class="row mb-3">
                            <div id="customer-tokens-container" class="col-md-6">
                                <label for="feedback_nickname_init" class="form-label">Никнейм</label>
                                <input type="text" class="form-control" id="feedback_nickname_init" placeholder="${glob_players[0]}" value="" required="">
                            </div>
                            <div id="customer-tokens-container" class="col-md-6">
                                <label for="feedback_reason_init" class="form-label">Причина</label>
                                <select name="feedback_reason_init" class="form-control" id="feedback_reason_init" value="game_question" required="">
                                    <option value="tech_problem">Технические проблемы</option>
                                    <option value="game_question">Вопрос по игре</option>
                                    <option value="player_report">Жалоба на игрока</option>
                                    <option value="offer">Предложение</option>
                                </select>
                            </div>
                        </div>
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
            const max_len =
                3000;
            const textarea =
                document
                    .getElementById(
                        "admin-message"
                    );
            const label =
                document
                    .querySelector(
                        'label[for="admin-message"]'
                    );
            const space =
                " ";
            if (textarea
                .value
                .includes(
                    space
                        .repeat(
                            3))
            ) {
                textarea
                    .value =
                    textarea
                        .value
                        .trim();
            }
            textarea
                .maxLength =
                max_len;
            const
                update_len_counter =
                    () => {
                        label
                            .innerText =
                            `${textarea.value.length}/${max_len}`;
                    }
            update_len_counter
            ();
            addEventListener
            (
                "keydown",
                (
                    _
                ) =>
                    update_len_counter()
            );
            addEventListener
            (
                "keyup",
                (
                    _
                ) =>
                    update_len_counter()
            );
            modal_open_(
                onclick_lock =
                    true);
        } else {
            console.log(
                "Error check Telegram auth"
            );
            openTelegramAuthModal
            ();
            notify(
                "Вам необходимо авторизоватся для этой функции"
            );
        }
    });
}
const initSOptimizeGA = () => {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'G-VGRQSK1J7M');
}
const adminsContactContainerHash =
    () => {
        observerContainerHash([
            "contact",
            "support", "bug",
            "report"
        ], () => {
            openAdminContact();
        });
    }

const observerContainerHash = (
    hash_array, action) => {
    const updater = () => {
        if (hash_array.includes(
            linkHash())) {
            action();
        }
    };

    updater();
    addEventListener(
        'hashchange', (_) =>
            updater());
}

const openTelegramAuthModal = (skip_check=false) => {
    checkTelegramAuthData(function (tg_success) {
        if (!tg_success) {
            console.log(
                "Telegram auth preparing..."
            );
            // modal_close_();
            const script_telegram_widget =
                document.createElement(
                    'script');

            script_telegram_widget.src =
                "https://telegram.org/js/telegram-widget.js?21";
            script_telegram_widget
                .setAttribute(
                    "async", "");
            script_telegram_widget
                .setAttribute(
                    "data-telegram-login",
                    telegram_bot_username);
            script_telegram_widget
                .setAttribute(
                    "data-size", "large");
            script_telegram_widget
                .setAttribute(
                    "data-radius", "8");
            script_telegram_widget
                .setAttribute(
                    "data-onauth",
                    "onTelegramAuth(user)");
            script_telegram_widget
                .setAttribute("data-request-access", "write");

            script_telegram_widget.onload =
                () => {
                    switch_modal_containers(
                        "info", {
                            title: "",
                            content: ""
                        });
                    modal_open_();
                }

            const content = document
                .getElementById(
                    "info-content-modal");
            const container = document
                .createElement("div");
            const text = document
                .createElement(
                    "p");

            content.innerHTML = "";
            content.appendChild(container);
            content.appendChild(text);
            text.innerHTML = `
                Для некоторых функций на этом сайте необходимо авторизироваться. 
                Мы не получим никаких конфиденциальных данных о вас, например, 
                ваш номер или локацию, это нужно только для того, чтобы Telegram 
                подтвердил, что вы являетесь владельцем своего аккаунта. Также 
                не забудьте связать свой аккаунт Telegram с игровым аккаунтом 
                в <a href="${telegram_social_bot}" target="_blank" class="text-primary">нашем боте</a>.
            `;

            text.setAttribute("class",
                "text-start px-3 pt-1 pt-lg-2"
            );
            container.id =
                "telegram-auth-container";
            container.appendChild(
                script_telegram_widget);
        }
    }, skip_check);
}

const openLoginHint = () => {
    const content = document
        .getElementById(
            "info-content-modal");
    const container = document
        .createElement("div");
    const text = document
        .createElement(
            "p");

    content.innerHTML = "";
    content.appendChild(container);
    content.appendChild(text);
    text.innerHTML = `
                Похоже что ты не прочитал текст в первом окне авторизации,
                повторим процедуру. Чтобы завершить авторизацию на сайте - тебе нужно 
                связать свой Telegram с своим игровым аккаунтом в&nbsp;
                <a href="${telegram_social_bot}" target="_blank" class="text-primary">нашем боте</a>.
            `;

    text.setAttribute("class",
        "text-start px-3 pt-1 pt-lg-2"
    );
    container.id =
        "telegram-auth-hint";

    notify(
        "Прочитай внимательно инструкцию!"
    );

    switch_modal_containers(
        "info", {
            title: "Помощь авторизации",
            content: ""
        });
    modal_open_();
}

const initJarallax = () => {
    jarallax(document
        .querySelectorAll(
            '.jarallax'), {
        speed: .15,
        type: "scale-opacity"
    });
}

const initTooltip = () => {
    const tooltipTriggerList = []
        .slice
        .call(document
            .querySelectorAll(
                '[data-bs-toggle="tooltip"]'
            ));
    const tooltipList =
        tooltipTriggerList
            .map((
                tooltipTriggerEl
            ) => {
                tooltip_instance =
                    new bootstrap
                        .Tooltip(
                            tooltipTriggerEl, {
                                template: `
                                <div class="tooltip" role="tooltip">
                                    <div class="tooltip-inner"></div>
                                </div>
                            `,
                            });
            });

    if (tooltip_instance) {
        setInterval(() => {
            tooltip_instance
                .update();
        }, 1000);
    }
}

const initSmoothScrollObserver = () => {
    const scrollerObject =
        new SmoothScroll("section");

    const callScroller = () => {
        const identifier =
            linkHash()
                .toLowerCase();

        if (!(identifier &&
            identifier
                .length
        ) || ([
            "private_rules"
        ].includes(identifier))) {
            return;
        }

        scrollerObject
            .animateScroll(
                document
                    .querySelector(
                        `section[id="${identifier}"]`
                    ), null, {
                    offset: 50
                });
    }

    callScroller();
    window.onhashchange =
        callScroller;
}

const privateServerModuleInit = () => {
    const desc = document.getElementById("private-server-hub-description");

    desc.innerHTML = `
        Проект Zalupa.Online за период своего существования от единого сервера
        Анархии перерос в проект с несколькими режимами, один из таких – приватный
        сервер с ванильным выживанием. Особенность этого сервера, что туда попадают
        только те, кто поддержал сервер финансово. Также единственный режим, где вы
        можете быть на уровне с администрацией, ведь здесь можно играть только с
        правами обычного игрока, никаких привилегий. Также не забудь
        <a class="text-gradient-primary" href="#private_rules" onclick="rulesModalOpen()">
            прочитать правила</a>.
    `;
}

const tonyComeBack = () => {
    const selector = document.getElementById("AppleTony_comeback_days");

    const update_days = (days_count) => {
        selector.innerText = `${days_count} ${getNoun(
            days_count, "день", "дня", "дней"
        )}`;
    }

    const date1 = new Date();
    const date2 = new Date("11/30/2023");

    const differenceInTime = date2.getTime() - date1.getTime();
    const differenceInDays = parseInt(differenceInTime / (1000 * 3600 * 24));

    update_days(differenceInDays);
    setInterval(function () {update_days(differenceInDays)}, 9999);
}

const autoAuthTelegramObserver = () => {
    if (telegram_auth_enabled) {
        document.getElementById("telegram-auth-avatar")
            .style.display = "";
    }
    checkTelegramAuthData((
        success) => {
        console.log(
            `Telegram auth check status : ${success}`
        );
        if (success) {
            const
                button_contact_land =
                    document
                        .getElementById(
                            "contact-button-land"
                        );
            const
                button_auth =
                    document
                        .querySelector(
                            ".avatar-container"
                        );
            const
                telegram_auth_avatar =
                    document
                        .getElementById(
                            "telegram-auth-avatar"
                        );

            button_auth
                .removeAttribute(
                    "onclick"
                );
            if (feedback_module_enabled) {
                button_contact_land
                    .style
                    .display =
                    "";
            }
            telegram_auth_avatar
                .style
                .display =
                "";
            setAvatar(getTelegramAuth());
        }
    })
}

const initCore = () => {
    initHost();
    initCrypto();
    initLanding();
    observerSystemTheme();
    buildPlayersSwiper();
    buildDonateHistorySwiper();
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
    ytVideoSetter();
    setRandomStickerLand();

    donateContainerHash();
    rulesPrivateContainerHash();
    adminsContactContainerHash();

    privateServerModuleInit();

    autoAuthTelegramObserver();

    tonyComeBack();

    const elem = document
        .getElementById(
            "dark-perm-set-bv");
    elem.parentNode.removeChild(
        elem);

    window.onload = () => {
        if (!debug_lock_init) {
            const preloader =
                document
                    .querySelector(
                        ".page-loading"
                    );
            const wait = 1500;
            const move_wait =
                100;
            setTimeout(
                () => {
                    preloader
                        .classList
                        .remove(
                            "active"
                        );
                    if (!
                        donate_displayed
                    ) {
                        document
                            .body
                            .style
                            .overflowY =
                            "";
                    }
                    window
                        .scrollTo({
                            top: 0,
                        });
                }, wait);
            setTimeout(
                () => {
                    preloader
                        .remove();

                    // after tasks
                    initTooltip
                    ();
                    initSmoothScrollObserver
                    ();
                }, wait +
                move_wait);
        }
    };
};

script_core.onload = () => {
    initCore();
};