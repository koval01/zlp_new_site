/**
 * @suppress {uselessCode}
 */

"use strict";
const site_domains = {
    prod: domain_site,
    dev: development_hosts[0],
    test: development_hosts[1],
};
const channels = 2;
const links_lt = [
    {
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
        link: "https://discord.com/invite/89squad",
    },
    {
        name: "tiktok",
        link: "https://www.tiktok.com/@nebratishkin",
    },
];
const launcher_platforms = {
    mac: "dmg",
    linux: "deb",
    windows: "msi",
};
const gitOwner = "Zalupa-Online";
const gitLauncherRepo = "launcher-releases";
const lock_of = true;
const coins_sell_mode = true;

var selector_card_skin_displayed = "";
var donate_services_array = [];
var notify_hidden = true;
var glob_players = [];
var glob_events_status = false;
var allow_display_login_hint = true;
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
var first_init_head_adapt = 0;
var first_init_head_adapt_vova = 0;
var current_item_type = 0;
var client_ip = "";
var avatar_loaded = false;
var telegram_glob_session = {
    auth_data: null,
    response: null,
};
const telegram_social_bot = "https://t.me/ZalupaScBot",
    debug_lock_init = false,
    telegram_auth_enabled = true,
    feedback_module_enabled = false,
    feedback_tg_auth_skip = true,
    tokens_system_enabled = true,
    initHost = () => {
        const keys = Object.keys(site_domains);
        for (let i = 0; i < keys.length; i++) {
            if (site_domains[keys[i]] === window.location.hostname) {
                work_domain_v = site_domains[keys[i]];
            }
        }
    },
    linkHash = () => {
        return window.location.hash.substring(1);
    },
    prepare_img_link = (img_link) => {
        return img_link.replace("https://", "//").replaceAll(/\//g, "\\/");
    },
    time_correction = (date) => {
        const userTimezoneOffset = -date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - userTimezoneOffset);
    },
    time_in_moscow_get = (date = null) => {
        if (!date) {
            date = new Date();
        }
        return new Date(
            date.toLocaleString("en-US", {
                timeZone: "Europe/Moscow",
            })
        );
    },
    getOffset = (date, timezone) => {
        try {
            -new Date(date)
                .toLocaleString([], {
                    timeZone: timezone,
                    timeZoneName: "shortOffset",
                })
                .match(/(?:GMT|UTC).+/)[0] * 60;
        } catch (e) {
            return 0;
        }
    },
    formatDate = (date, now = null) => {
        let diff = new Date() - date;
        if (now) {
            diff = now - date;
        }

        if (diff < 1000) {
            return "прямо сейчас";
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
        d = ["0" + d.getDate(), "0" + (d.getMonth() + 1), "" + d.getFullYear(), "0" + d.getHours(), "0" + d.getMinutes()].map((component) => component.slice(-2));

        return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
    },
    utf8_to_b64 = (str) => {
        return window.btoa(unescape(encodeURIComponent(str)));
    },
    b64_to_utf8 = (str) => {
        return decodeURIComponent(escape(window.atob(str)));
    },
    randDiaps = (max = 10) => {
        return Math.floor(Math.random() * max) + 1;
    },
    getPlatform = () => {
        if (navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone") {
            return "mac";
        }
        if (navigator.platform.indexOf("Linux") === 0) {
            return "linux";
        }
        return "windows";
    },
    isChrome = () => {
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    },
    downloadLauncher = () => {
        getGitLauncherReleases(function (links_) {
            const link = links_[getPlatform()];
            window.location = link;

            if (!isChrome()) {
                notify(`Сейчас тебе скачаем файл <span class="text-gradient-primary">${link.split("/").slice(-1)[0]}</span>`);
            }
        });
    },
    generateRandomHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join(""),
    getAvatarColorIDforTG = (user_id) => {
        var result = 0;
        var base = 1;
        while (user_id > 0) {
            result += (user_id % 7) * base;
            base *= 10;
            user_id = Math.floor(user_id / 7);
        }
        return parseInt(result.toString().slice(-1));
    },
    getHash = (link) => {
        const hash = window.location.hash.substr(1);
        return Object.keys(
            hash.split("&").reduce((result, item) => {
                const parts = item.split("=");
                result[parts[0]] = parts[1];
                return result;
            }, {})
        )[0];
    },
    re_check = (callback) => {
        try {
            grecaptcha.ready(() => {
                grecaptcha
                    .execute(re_token, {
                        action: "submit",
                    })
                    .then((token_update) => {
                        callback(token_update);
                    });
            });
        } catch (_) {}
    },
    shuffle = (array) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    },
    alternateSort = (list) => {
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
    },
    getImageLightness = (imageSrc, callback, calculate = true) => {
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
                try {
                    ctx.drawImage(this, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                } catch (_) {
                    callback(null);
                    return;
                }
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
    },
    is_apple_platform = () => {
        const mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
        if (mac) {
            return true;
        }
    },
    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    },
    url_builder_ = (base_url, submit_data_) => {
        const url = new URL(base_url);
        for (let i = 0; i < submit_data_.length; i++) {
            url.searchParams.set(submit_data_[i].name, submit_data_[i].value);
        }
        return url.href;
    },
    countProperties = (obj) => {
        return Object.keys(obj).length;
    },
    getNoun = (number, one = "игрок", two = "игрока", five = "игроков") => {
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
    },
    getCrypto = (callback) => {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    if (r.success) {
                        callback(r.token);
                    } else {
                        callback(crypto_token);
                    }
                },
                `${backend_host}/crypto`,
                "POST",
                true,
                {
                    token: token_update,
                }
            );
        });
    },
    get_events_ = (callback) => {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    callback(r.events);
                },
                `${backend_host}/events`,
                "POST",
                true,
                {
                    token: token_update,
                }
            );
        });
    },
    appendPostsNews = (iframe = true) => {
        const loading_done = () => {
            setTimeout(() => {
                const sl = document.getElementById("telegram_block_load");
                const container_news = document.getElementById("news_zlp_buttons");
                try {
                    sl.parentNode.removeChild(sl);
                    container_news.style.display = "";
                } catch (_) {}
            }, 150);
        };
        const template = `<div class="shadow-vertical-overlay vertical-top-shadow" style="width:100vw!important"></div><div class="shadow-vertical-overlay vertical-bottom-shadow" style="width:100vw!important"></div><iframe style="min-height:450px;width:100vw" id="tg-iframe-view" src="https://telegram-worker.zalupa.online/zalupaonline" onload="try{document.getElementById('telegram_block_load').remove();tg_frame_theme_update()} catch (_) {}"></iframe>`;
        const c = document.getElementById("news-c-container");
        c.innerHTML = template + c.innerHTML;
        loading_done();
        document.getElementById("theme-mode").addEventListener("change", function () {
            tg_frame_theme_update();
        });
    },
    closeButtonDonateAdaptive = () => {
        if (!is_apple_platform()) {
            document.getElementById("exit-button-container-donate").style.minHeight = "100%";
        }
    },
    donateSwitchContainer = (display) => {
        const container = document.querySelector(".donate-global-container");
        const style_sticker = document.getElementById("super-klassniy-sticker-0").style;
        const style_main = document.querySelector("main").style;
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

            closeButtonDonateAdaptive();

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
                    style_main.paddingTop = "50px";
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
            style_main.paddingTop = "0";
        }
    },
    get_game_server_data = (callback) => {
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
            requestCall(
                (r) => {
                    setTimeout(() => {
                        freeze_monitoring = false;
                    }, 800);
                    if (r.success) {
                        callback(r.body);
                    } else {
                        freeze_crypto = false;
                        initCrypto();
                    }
                },
                `${backend_host}/server`,
                "POST",
                true,
                {
                    crypto_token: crypto_token,
                }
            );
        } else {
            freeze_monitoring = false;
        }
    },
    monitoring_game_server_update = () => {
        if (!freeze_monitoring) {
            freeze_monitoring = true;
            get_game_server_data((data) => {
                if (data.online) {
                    if (typeof gameServerUpdater_setter !== "undefined") {
                        clearInterval(gameServerUpdater_setter);
                    }
                    const selector = document.getElementById("server_online_status");
                    selector.classList.remove("loading-dots");
                    selector.innerHTML =
                        `Сейчас играет <span class="text-primary fw-semibold">${data.online}</span> ${getNoun(data.online)}`;
                }
            });
        }
    },
    gameServerUpdater = () => {
        monitoring_game_server_update();
        gameServerUpdater_setter = setInterval(monitoring_game_server_update, 800);
        setInterval(monitoring_game_server_update, 8000);
    },
    initEventsList = () => {
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
                    const template_ = `<div class="col"><div class="object-block-col"><h1>${
                        data[i].title
                    }</h1><h4 class="text-primary" style="margin-top: -1.2rem">${badge}</h4><h6 style="margin-top: -1rem">С <span class="text-primary">${st_date.toLocaleDateString("ru-RU")} ${("0" + st_date.getHours()).slice(-2)}:${(
                        "0" + st_date.getMinutes()
                    ).slice(-2)}</span> по <span class="text-primary">${end_date.toLocaleDateString("ru-RU")} ${("0" + end_date.getHours()).slice(-2)}:${("0" + end_date.getMinutes()).slice(-2)}</span></h6><p>${
                        data[i].text
                    }</p></div></div>`;
                    row_container.innerHTML = row_container.innerHTML + template_;
                }
            }
        });
    },
    get_donate_services = (callback) => {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    callback(r.services);
                },
                `${backend_host}/donate/services`,
                "POST",
                true,
                {
                    token: token_update,
                }
            );
        });
    },
    create_payment = (callback, customer, products, server_id, email = "", coupon = "") => {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    callback(r.payment);
                },
                `${backend_host}/donate/payment/create`,
                "POST",
                true,
                {
                    customer: customer,
                    products: products,
                    email: email,
                    coupon: coupon,
                    token: token_update,
                    server_id: server_id,
                    success_url: `https://${work_domain_v}`,
                    tg_auth_data: getTelegramAuth(true),
                }
            );
        });
    },
    check_coupon = (callback, coupon) => {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    if (r.coupon && r.success) {
                        callback(r.coupon);
                    } else {
                        callback(null);
                    }
                },
                `${backend_host}/donate/coupon`,
                "POST",
                true,
                {
                    code: coupon,
                    token: token_update
                }
            );
        });
    },
    testImage = (url) => {
        const tester = new Image();
        tester.addEventListener("error", reInitTelegramAuth);
        tester.src = url;
    },
    loadPlayerAvatar = (avatar, def_selector = "telegram-auth-avatar", url_generator = false, back = false) => {
        const exec_ = () => {
            let avatar_selector = null;
            let avatar_style = null;

            if (!url_generator) {
                try {
                    avatar_selector = document.getElementById(def_selector);
                    avatar_selector.style;
                } catch {}
                document.getElementById("tg-user-avatar-text").innerText = "";
            }

            for (let i = 0; i < 10; i++) {
                if (!crypto_token && back) {
                    initCrypto();
                } else {
                    let raw_link = "";
                    if (back) {
                        raw_link = `${backend_host}/profile/avatar/?texture_hash=${avatar}&crypto_token=${encodeURIComponent(crypto_token)}&tg_auth=${encodeURIComponent(getTelegramAuth(true))}`;
                    } else {
                        raw_link = `//communication.zalupa.online/tiles/faces/32x32/${avatar}.png`;
                    }

                    const link = prepare_img_link(raw_link);

                    testImage(raw_link);

                    if (!url_generator) {
                        avatar_selector.setAttribute("style", `background-image: url("${link}");border-radius:.${def_selector.includes("card-avatar") ? 35 : 15}rem;`);
                    } else {
                        return link;
                    }

                    return;
                }
            }
        };

        exec_();
    },
    reInitTelegramAuth = () => {
        checkTelegramAuthData(function (_) {});
    },
    checkTelegramAuthData = (callback, skip = false, raw = false, skip_cache = false) => {
        const auth_data = getTelegramAuth(true);
        if (auth_data) {
            if (telegram_glob_session.auth_data === auth_data && !skip_cache) {
                callback(telegram_glob_session.response.success);
                return;
            }
            if (!skip) {
                re_check((token_update) => {
                    requestCall(
                        (r) => {
                            if (r) {
                                if (!r.success) {
                                    openLoginHint();
                                    callback(false);
                                } else {
                                    const avatar = document.getElementById("telegram-auth-avatar");
                                    glob_auth_player_data = r.player_data;
                                    if (r.player_data) {
                                        const player = r.player_data;
                                        const skin = player.NICKNAME;
                                        const avatar_init = () => {
                                            if (!avatar.style.backgroundImage || avatar.style.backgroundImage.length < 1) {
                                                loadPlayerAvatar(skin);
                                                loadPlayerAvatar(skin, "card-avatar-object");
                                                avatar_loaded = true;
                                            }
                                        };

                                        avatar_init();
                                        avatar.setAttribute("data-bs-toggle", "tooltip");
                                        avatar.setAttribute("data-bs-placement", "bottom");
                                        avatar.setAttribute("title", player["NICKNAME"]);

                                        setInterval(function () {
                                            avatar_init();
                                        }, 500);

                                        allow_display_login_hint = false;
                                    }
                                    telegram_glob_session = {
                                        auth_data: auth_data,
                                        response: r,
                                    };
                                    callback(raw ? r : r.success);
                                }
                            } else {
                                callback(false);
                            }
                        },
                        `${backend_host}/telegram/auth/check`,
                        "POST",
                        true,
                        {
                            token: token_update,
                            tg_auth_data: auth_data,
                        }
                    );
                });
            } else {
                callback(true);
            }
        } else {
            callback(false);
        }
    },
    cloudflareTraceJSON = (text) => {
        const keys = text.split("\n");
        let dict = {};
        for (const k of keys) {
            p = k.split("=");
            dict[p[0]] = p[1];
        }
        return dict;
    },
    cloudflareTrace = (callback) => {
        requestCall(
            (r) => {
                if (r) {
                    callback(cloudflareTraceJSON(r));
                } else {
                    callback(null);
                }
            },
            `https://cloudflare.com/cdn-cgi/trace`,
            "GET",
            false
        );
    },
    getGitLauncherReleases = (callback) => {
        requestCall(
            (r) => {
                if (r && r.id && r.target_commitish === "main" && r.author.login === "hevav" && !r.draft && r.assets.length) {
                    let links = {};
                    for (let p of Object.keys(launcher_platforms)) {
                        for (let a of r.assets) {
                            if (a.name.split(".").slice(-1)[0] === launcher_platforms[p]) {
                                links[p] = a.browser_download_url;
                            }
                        }
                    }
                    callback(links);
                } else {
                    callback([]);
                }
            },
            `https://api.github.com/repos/${gitOwner}/${gitLauncherRepo}/releases/latest`,
            "GET",
            true
        );
    },
    setLauncherLinks = () => {
        const button_template = (link, name) => {
            return `<a href="${link}" style="text-transform:capitalize" class="btn btn-primary shadow-primary mt-3 m-1" download="">${name.toLowerCase()}</a>`;
        };
        const selector = document.getElementById("zalupa-launcher-links");

        getGitLauncherReleases(function (d_links) {
            const keys = Object.keys(d_links);
            for (let k of keys) {
                selector.innerHTML = selector.innerHTML + button_template(d_links[k], k);
            }
        });
    },
    checkPayment = (callback, payment_id) => {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    callback(r.payment);
                },
                `${backend_host}/donate/payment_get`,
                "POST",
                true,
                {
                    payment_id: parseInt(payment_id),
                    token: token_update,
                    tokens_send: coins_sell_mode,
                }
            );
        });
    },
    getPaymentHistory = (callback) => {
        re_check((token_update) => {
            requestCall(
                (r) => {
                    try {
                        callback(r.payment);
                    } catch (_) {
                        callback(null);
                        return;
                    }
                },
                `${backend_host}/donate/payment_history`,
                "POST",
                true,
                {
                    token: token_update,
                }
            );
        });
    },
    appendServices = () => {
        get_donate_services((services) => {
            donate_services_array = services;
            const size_classes = ["row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4"];
            const sl = document.getElementById("donate_items_list");
            const get_product_type = (name, type) => {
                name = name.toLowerCase();
                type = type.toLowerCase();
                /*
                    1 - токены
                    2 - проходка
                    3 - слоты
                */
                if (name.includes("токен") && type === "currency") {
                    return 1;
                } else if (name.includes("слот") && type === "currency") {
                    return 3;
                } else if (name.includes("проходка") && type === "other") {
                    return 2;
                }
            };
            if (!services || !services.length) {
                sl.innerHTML = '<span class="text-center">Не удалось получить список товаров.</span>';
            } else {
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
                    let padding_desc = "p-3";
                    let desc_template = `<p class="mb-0">${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")} = ${services[i].number} ${getNoun(
                        services[i].number,
                        "единица",
                        "единицы",
                        "единиц"
                    )}</p><p class="fs-sm mb-0">${services[i].description}</p>`;
                    let item_butt_template = "";
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
                            description_other = services[i].description;
                        }
                        if (services[i].name.toLowerCase().includes("токен")) {
                            _name = `${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")} = <span class="text-primary">${services[i].number} ${getNoun(services[i].number, "токен", "токена", "токенов")}</span>`;
                            padding_desc = "p-0";
                            desc_template = `<p class="mb-0 token-description-dnt">Игровая валюта, которую можно получить как в игре, так и за поддержку проекта.</p>`;
                            click_template = "";
                        } else if (services[i].name.toLowerCase().includes("слот")) {
                            _name = `${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")} = <span class="text-primary">${services[i].number} ${getNoun(services[i].number, "слот", "слота", "слотов")}</span>`;
                            padding_desc = "p-0";
                            desc_template = `<p class="mb-0 token-description-dnt">${description_other}</p>`;
                            click_template = "";
                        } else if ((services[i].type = "other")) {
                            _name = `<span class="text-primary">${services[i].name}</span>, ${services[i].price} ${getNoun(services[i].price, "рубль", "рубля", "рублей")}`;
                            padding_desc = "p-0";
                            desc_template = `<p class="mb-0 token-description-dnt">${description_other}</p>`;
                            click_template = "";
                        }
                        item_butt_template = `<button class="btn btn-primary shadow-primary btn-shadow-hide btn-lg min-w-zl donate-item-butt-bottom" onclick="donateModalCall(${get_product_type(click_data.name, click_data.type)}, ${
                            click_data.service_id
                        })">${button_title}</button>`;
                    }
                    services[i].image = prepare_img_link(services[i].image);
                    sl.innerHTML =
                        sl.innerHTML +
                        `<div class="col" id="donate_item_${services[i].id}"><div class="card border-0 bg-transparent" ${click_template}><div class="position-relative container-item-donate-n"><div class="parent-image-shadow donate_item_hover" id="donate_item_hover_${services[i].id}"><div class="imageContainer item-levitaion-dec"><div class="foregroundImg" style="background-image: url(${services[i].image})"></div><div class="backgroundImg" style="background-image: url(${services[i].image})"></div></div></div><div class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3" style="margin: auto"></div></div><div class="card-body text-center ${padding_desc}"><h3 class="fs-lg fw-semibold pt-1 mb-2">${_name}</h3>${desc_template}${item_butt_template}</div></div></div>`;
                }
                checkPrivateServerBuy();
                setTimeout(() => {
                    const elem = document.getElementById("donate_block_load");
                    const ids = ["donate_items_list", "donate-header-container", "donate-test-mode-enb", "donate-cart-container"];
                    try {
                        elem.parentNode.removeChild(elem);
                    } catch (_) {}
                    for (let i = 0; i < ids.length; i++) {
                        try {
                            document.getElementById(ids[i]).style.display = "";
                        } catch (_) {}
                    }
                }, 100);
            }
        });
    },
    switchEventsPages = (button_name) => {
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
                    notify("Сейчас ивентов нет...");
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
    },
    redirect_ = (url) => {
        return window.location.replace(url);
    },
    ytVideoSetter = (skip = false, only_iframe = false, local_load = true) => {
        const load_iframe = (el, video_id, params) => {
            el.innerHTML = `<iframe src="https://www.youtube.com/embed/${video_id}" title="YouTube video player" frameborder="0" class="video-container-yt" id="ytframe_${video_id}" allow="accelerometer; ${
                params.autoplay != null ? "autoplay" : ""
            }; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" loading="lazy"></iframe>`;
        };
        const get_link = (el, video_id, url, params) => {
            el.innerHTML = `<video class="video-container" preload="none" id="ytframe_${video_id}" poster="/assets/images/videos/${video_id}.webp" ${params.autoplay != null ? 'autoplay=""' : ""} ${params.muted != null ? 'muted=""' : ""} ${
                params.loop != null ? 'loop=""' : ""
            } ${params.controls != null ? 'controls=""' : ""} style="object-fit: contain"><source src="${url}" type="video/mp4"></video>`;
        };
        const set_video = (el, video_id, params) => {
            if (local_load) {
                get_link(el, video_id, `//files.zalupa.online/videos/${video_id}.mp4`, params);
            } else {
                load_iframe(el, video_id, params);
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
    },
    check_modal_ = () => {
        const close_r = () => {
            if (!modal_displayed) {
                modal_close_();
            }
        };
        setInterval(close_r, 350);
    },
    modal_close_ = () => {
        if (modal_displayed) {
            document.body.classList.remove("modal-open");
            document.getElementById("scroll_butt_container").style.display = "";
            document.getElementsByTagName("html")[0].style.overflowY = "";
            const cont = document.querySelector(".modal-content");
            cont.classList.remove("emoji-pay-back");
            cont.style.marginTop = "2em";
            const modal = document.getElementById("donate_item_modal");
            modal.style.opacity = 0;
            setTimeout(() => {
                modal.style.display = "none";
            }, 350);
            modal_displayed = false;
        }
    },
    modal_open_ = (onclick_lock = false) => {
        modal_displayed = true;
        document.body.classList.add("modal-open");
        document.getElementById("scroll_butt_container").style.display = "none";
        document.getElementsByTagName("html")[0].style.overflowY = "hidden";
        try {
            document.getElementById("private_gift_button_modal").remove();
        } catch (_) {}
        const modal = document.getElementById("donate_item_modal");
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.opacity = 1;
            document.querySelector(".modal-content").style.marginTop = 0;
        }, 50);
        if (!onclick_lock) {
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal_close_();
                }
            };
        }
    },
    switch_modal_containers = (mode = "service", info_params = {}) => {
        const span = document.getElementsByClassName("close_b")[0];
        const info = document.getElementById("modal-info-container-c");
        const service = document.getElementById("modal-donate-container-c");
        const service_coins = document.getElementById("modal-donate-finish-container-b");
        const success = document.getElementById("modal-donate-success-container");
        const finish_donate = document.getElementById("modal-donate-finish-container-c");
        const title = document.querySelector(".modal-title");
        const _array = [
            {
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
    },
    discount_calculate = (price, discount) => {
        discount = discount / 100;
        return (price * discount).toFixed();
    },
    displayTokens = (v2 = true) => {
        const balance = glob_auth_player_data["BALANCE"];

        if (!tokens_system_enabled) {
            return;
        }
        document.querySelector(".zalupa-card-container").style.display = "";

        if (Number.isInteger(balance)) {
            if (!v2) {
                const base_selector = document.querySelector(".balance-container");
                const balance_value = document.querySelector(".balance-value");

                base_selector.style.display = "";
                balance_value.innerText = balance;
            } else {
                const container_number = document.getElementById("numberZalupaCard");

                if (!document.querySelector(".ZalupaCardInput")) {
                    container_number.innerHTML = container_number.innerHTML + `<input class="ZalupaCardInput" style="display:none" value="${glob_auth_player_data["UUID"]}">`;
                }

                const balance_number = document.querySelector(".number-card-zalupa");
                const card_holder = document.querySelector(".card-holder-zalupa");
                const balance_value_card = document.querySelector(".balance-value-card");
                const cardSelector = "input.ZalupaCardInput";

                const template_tokens = `<span class="text-primary">${balance}</span> ${getNoun(balance, "токен", "токена", "токенов")}`;

                balance_number.setAttribute(
                    "onclick",
                    `clipboardFunc(
                    "${cardSelector}", 
                    "Номер твоей <span class=\\"text-primary\\" style=\\"font-weight:800\\">ZalupaCard</span> скопирован в буфер обмена."
                )`
                );

                document.querySelector(cardSelector).value = glob_auth_player_data["UUID"];
                balance_number.innerText = glob_auth_player_data["UUID"];
                card_holder.innerText = glob_auth_player_data["NICKNAME"];
                balance_value_card.innerHTML = template_tokens;

                document.getElementById("card-zalupa").style.backgroundImage = `url("${select_card_skin(balance)}")`;
            }
        }
    },
    select_card_skin = (balance) => {
        const skins = {
            0: "clay",
            50: "red_mashroom",
            100: "tube_coral",
            150: "gray_glazed_terracotta",
            200: "bee_nest",
            350: "bamboo",
            500: "gilded_blackstone",
            750: "raw_gold",
            1000: "nether_wart",
            1500: "sculk_crystal",
            2000: "rainforced_deepslate",
            3000: "tinted_glass",
            4000: "chiseled_quartz",
            5000: "tnt",
            6500: "warped_stem",
            8000: "respawn_anchor",
            10000: "dark_prismarine",
            12000: "nether",
            15000: "netherite",
        };
        let keys = Object.keys(skins);
        keys = keys.reverse();
        const path = "./assets/images/card_skins";
        for (let i = 0; i < keys.length; i++) {
            const selector = skins[keys[i]];
            if (balance >= parseInt(keys[i])) {
                if (selector_card_skin_displayed !== selector) {
                    selector_card_skin_displayed = selector;
                }
                return prepare_img_link(`${path}/${selector}.png`);
            }
        }
        return prepare_img_link(`${path}/clay.png`);
    },
    sendTokensModalOpen = () => {
        notify("Э брат, не завезли пока. Кнопочку не трож");
    },
    comment_show_action = (id, close = false) => {
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
    },
    checkPrivateServerBuy = () => {
        const checkFunction = () => {
            const stop_key = "Проходка";

            for (let item of donate_services_array) {
                if (item.name === stop_key && glob_auth_player_data.PRIVATE_SERVER) {
                    const selector_button = document.querySelector(`#donate_item_${item.id}>div>div.card-body>button`);

                    selector_button.innerText = "Куплено";
                    selector_button.setAttribute("disabled", "");
                    selector_button.removeAttribute("onclick");
                }
            }
        };

        checkFunction();
        setInterval(checkFunction, 600);
    },
    initComments = () => {
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
            requestCall(
                (r) => {
                    callback(r);
                },
                "assets/data/players.json",
                "GET",
                true
            );
        };
        const searchPlayer = (players, name) => {
            for (let i = 0; i < players.length; i++) {
                if (players[i].name === name) {
                    return players[i];
                }
            }
        };
        requestCall(
            (r) => {
                const comment = r;
                shuffle(comment);
                playersGet((players) => {
                    for (let i = 0; i < comment.length; i++) {
                        const player = searchPlayer(players, comment[i].name);
                        array_.innerHTML =
                            array_.innerHTML +
                            `<div class="swiper-slide h-auto px-2"><figure class="card h-100 position-relative border-0 shadow-sm py-3 p-0 p-xxl-4 my-0"><span class="btn btn-primary btn-lg shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4 ms-xxl-5 zlp-comment-icon"><i class="bx bxs-quote-left"></i>Залупный комментарий</span><blockquote id="comment_block_${i}" class="card-body mt-2 mb-2" style="transition: .8s height"><p id="comment_text_${i}" class="fs-md mb-0">«${comment[i].text}»</p><span id="comment_show_${i}" onclick="comment_show_action(${i})" class="pt-1 comment-show-button">Раскрыть</span></blockquote><figcaption class="card-footer d-flex align-items-center border-0 pt-0 mt-n2 mt-lg-0"><div><b class="fw-semibold lh-base mb-0">${comment[i].name}</b></div></figcaption></figure></div>`;

                        const comment_text = document.getElementById(`comment_text_${i}`);
                        const comment_show = document.getElementById(`comment_show_${i}`);

                        comment_show.style.fontWeight = "400";
                        comment_text.style.transition = "height .8s cubic-bezier(1, -.3, 0, 1.21) 0s";
                        comment_text.setAttribute("fullShowComment", "0");
                        const correction_height = 12;

                        if (comment_text.clientHeight > 100 + correction_height) {
                            comment_text.style.height = "100px";
                            comment_text.style.overflow = "hidden";
                        } else {
                            comment_show.style.display = "none";
                        }
                    }
                });

                createSwiper();
            },
            "assets/data/comments.json",
            "GET",
            true
        );
    },
    buildPlayersSwiper = () => {
        const array_ = document.getElementById("players-swiper-array");

        const createSwiper = () => {
            try {
                document.getElementById("players_block_load").remove();
            } catch (_) {}
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
                    2000: {
                        slidesPerView: 6,
                    },
                },
            });
        };

        requestCall(
            (r) => {
                const player = r;
                shuffle(player);

                let players_array = [];
                for (let player_in of player) {
                    players_array.push(player_in.name);
                }

                const selectSkin = (player, skins) => {
                    if (skins.length < players_array.length) {
                        for (let i = 0; i < players_array.length - skins.length; i++) {
                            skins.push({ Nick: "", Value: "" });
                        }
                    }
                    for (let i = 0; i < skins.length; i++) {
                        if (player.toLowerCase() === skins[i].Nick.toLowerCase()) {
                            return skins[i].Value;
                        }
                    }
                    return "11228873ae0acb8c1abb9f2ed92b7ef29b7e03a534e4d67ad7435ee759e4cf54";
                };

                for (let i = 0; i < player.length; i++) {
                    const getBadges = () => {
                        let result = "";
                        player[i].badges.sort();
                        for (let s = 0; s < player[i].badges.length; s++) {
                            const badge_local = player[i].badges[s];
                            if (badge_local && badge_local.length && badge_local !== "verified" && !badge_local.includes("clan-")) {
                                result =
                                    result +
                                    `<div class="player_badge" style="background-image: url(./assets/images/emoji/${badges_paste[badge_local].item}.png)" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${badges_paste[badge_local].title}"></div>`;
                            }
                        }
                        return result;
                    };

                    const getClan = () => {
                        for (let s = 0; s < player[i].badges.length; s++) {
                            if (player[i].badges[s].includes("clan-")) {
                                return player[i].badges[s].replace("clan-", "");
                            }
                        }
                    };

                    glob_players.push(player[i].name);

                    const player_badges_ = "";
                    const player_clan = "";

                    player[i].head = prepare_img_link(`https://communication.zalupa.online/tiles/faces/32x32/${player[i].name}.png`);

                    array_.innerHTML =
                        array_.innerHTML +
                        `<div class="swiper-slide text-center"><span class="d-block py-5"><div class="player_head_container"><div class="player-head d-block mx-auto" style="background-image: url(${player[i].head});border-radius:.75em"></div></div><div class="card-body p-3"><h3 class="fs-lg fw-semibold pt-1 mb-2">${player[i].name}</h3><p class="fs-sm mb-0" style="text-align:center">${player[i].desc}</p></div></span></div>`;
                }

                createSwiper();
            },
            "assets/data/players.json",
            "GET",
            true
        );
    },
    buildDonateHistorySwiper = () => {
        const array_ = document.getElementById("payments-history-swiper-array");

        const createSwiper = () => {
            new Swiper("#payments_history_container", {
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
        };

        getPaymentHistory(function (data) {
            if (!data || !data.length) {
                return;
            }
            for (let i = 0; i < data.length; i++) {
                const date = new Date(data[i].updated_at);
                data[i].product.image = prepare_img_link(data[i].product.image);
                array_.innerHTML =
                    array_.innerHTML +
                    `<div class="swiper-slide text-center"><span class="d-block py-3"><div class="player_head_container"><div class="player-head d-block mx-auto" style="background-image: url(${
                        data[i].product.image
                    });height:65px!important"></div></div><div class="card-body p-3"><h5 class="h5 fs-6 fw-semibold pt-1 mb-2">${
                        data[i].product.name
                    }</h5><p class="fs-sm mb-0" id="item-donate-history-desc"><span class="text-gradient-primary fw-bold">${data[i].customer}</span><br/><time datetime="${date.toString()}"></time></p></div></span></div>`;
            }
            document.getElementById("last_donate_block_load").remove();
            createSwiper();
            setInterval(updateDonateTime, 1000);
        });
    },
    donate_bg_preload = () => {
        const bg_ls = ["emoji-background-donate-light", "emoji-background-donate"];
        for (let i = 0; i <= bg_ls; i++) {
            getImageLightness(`assets/images/${i}.png`, undefined, false);
        }
    },
    setSticker = (stickers_count = 0, id = 0, custom_path = null) => {
        let path = `assets/images/stickers/sticker${randDiaps(stickers_count)}.webp`;
        if (custom_path) {
            path = custom_path;
        } else if (lock_sticker_switch) {
            return;
        }
        const link = prepare_img_link(path);
        document.getElementById(`super-klassniy-sticker-${id}`).style.backgroundImage = `url(${link})`;
    },
    setRandomStickerLand = () => {
        const stickers_count = 32;
        const selector = document.getElementById("super-klassniy-sticker-0");

        for (let i = 0; i <= stickers_count; i++) {
            getImageLightness(`assets/images/stickers/sticker${i}.webp`, undefined, false);
        }

        setInterval(function () {
            if (window.pageYOffset > 1600 || donate_displayed) {
                selector.style.opacity = 0;
            } else if (!donate_displayed && window.pageYOffset <= 1600) {
                setTimeout(function () {
                    selector.style.opacity = 0.4;
                }, 800);
            } else {
                selector.style.opacity = 0.4;
            }
        }, 100);

        const updateStickerPosition = () => {
            if (window.innerWidth >= 992) {
                selector.style.top = `${randDiaps(85)}%`;
                selector.style.left = `${randDiaps(85)}%`;
            } else {
                selector.style.top = `${randDiaps(100)}%`;
                selector.style.left = `${randDiaps(75)}%`;
            }
        };

        setSticker(stickers_count);
        setInterval(setSticker, 6000, stickers_count);

        updateStickerPosition();
        setInterval(updateStickerPosition, 3000);
    },
    donate_get_service_by_id = (id) => {
        for (let i = 0; i < donate_services_array.length; i++) {
            if (donate_services_array[i].id === parseInt(id)) {
                return donate_services_array[i];
            }
        }

        return null;
    },
    donateResetPaymentState = (type = 1, repeat = false, coupon_reset = false) => {
        const coupon_sl = document.getElementById("donate-coins-payment");
        const inputs = ["donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c"];
        let sl = "_c";
        let vl = document.getElementById("donate_sum").value.trim();
        if (!coins_sell_mode) {
            sl = "";
            vl = 0;
        }
        const button = document.getElementById("payment-button-donate" + sl);
        const update_inputs = () => {
            for (let i = 0; i < inputs.length; i++) {
                const sl = document.getElementById(inputs[i]);
                if (inputs[i].includes("coupon") && !coupon_reset) {
                } else if (inputs[i].includes("method")) {
                    sl.value = 1;
                } else {
                    sl.value = "";
                }
            }
        };
        if (coupon_reset) {
            coupon_sl.innerHTML = "";
            update_inputs();
            checked_coupon = "";
            failed_coupon = "";
        }
        button.setAttribute("onClick", `generatePaymentLink(${type}, ${type === 2 ? 1 : vl})`);
        button.removeAttribute("disabled");
        button.innerText = repeat ? "Повторить" : "Дальше";
    },
    setAvatar = (user) => {
        const photoTG = false;
        const selector = document.getElementById("telegram-auth-avatar").style;
        if (user.photo_url && photoTG) {
            selector.backgroundImage = `url(${user.photo_url})`;
        } else {
            selector.background = `linear-gradient(343deg, var(--telegram-bgcolor${getAvatarColorIDforTG(user.id)}-top) 0%, var(--telegram-bgcolor${getAvatarColorIDforTG(user.id)}-bottom) 100%)`;
            const avatarSelector = document.getElementById("tg-user-avatar-text");
            try {
                avatarSelector.innerText = `${user.first_name.slice(0, 1)}${user.last_name ? user.last_name.slice(0, 1) : ""}`.toUpperCase();
            } catch (_) {
                avatarSelector.innerHTML = "N/A";
            }
        }
    },
    checkAuthAndDisplayDonate = () => {
        checkTelegramAuthData(
            function (response) {
                if (response.player_data.NICKNAME) {
                    donateSwitchContainer();
                }
            },
            false,
            true
        );
    },
    onTelegramAuth = (user) => {
        Cookies.set(telegram_cookie_token, utf8_to_b64(JSON.stringify(user)));
        modal_close_();
        notify(`Вы успешно авторизовались как <span class="text-gradient-primary">${user.first_name} ${user.last_name ? user.last_name : ""}</span>`);

        autoAuthTelegramObserver();
    },
    debugWriteTelegramAuth = (data) => {
        Cookies.set(telegram_cookie_token, data);
    },
    getTelegramAuth = (raw = false) => {
        const cookie_field = Cookies.get(telegram_cookie_token);
        if (cookie_field) {
            if (raw) {
                return cookie_field;
            } else if (cookie_field) {
                return JSON.parse(b64_to_utf8(cookie_field));
            }
        }
    },
    couponCheck = (coins = false) => {
        let selector_c = "";
        if (coins_sell_mode) {
            selector_c = "-c";
        }

        const input = document.getElementById("coupon-input" + selector_c);
        const button = document.getElementById("coupon-button" + selector_c);
        let code = "";

        try {
            code = input.value.trim().toUpperCase();
        } catch (_) {}

        const coupon_notfd = () => {
            notify(`Купон <span class="text-primary fw-semibold">${failed_coupon}</span> не найден`);
        };

        const check_coupon_valid = (products, product) => {
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

        const input_lock = (lock = false) => {
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
        check_coupon((r) => {
            if (r) {
                const call = () => {
                    checked_coupon = code;
                    notify(`Купон <span class="text-primary fw-semibold">${code}</span> действительный`);
                };
                if (!coins_sell_mode) {
                    call();
                } else if (check_coupon_valid(r.products, current_c_item)) {
                    call();
                    const sl = document.getElementById("donate-coins-payment");
                    sl.innerHTML = `<li class="list-group-item d-flex justify-content-between bg-light"><div class="text-primary"><h6 class="my-0 text-start">Купон</h6><small class="text-start" style="float: left">${code}</small></div><span class="text-muted text-end" style="width: 30%">${r.discount}%</span></li>`;
                } else {
                    notify("Этот купон недействительный");
                }
            } else {
                failed_coupon = code;
                coupon_notfd();
            }

            input_lock();
        }, code);
    },
    donate_enable_coupon = (enabled = true) => {
        const input = document.getElementById("coupon-input");
        const button = document.getElementById("coupon-button");

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
    },
    get_data_service = (service_id) => {
        for (let i = 0; i < products_by_serverid.length; i++) {
            if (parseInt(products_by_serverid[i].id) === parseInt(service_id)) {
                return products_by_serverid[i];
            }
        }
    },
    generatePaymentLink = (type = 1, sum = 0) => {
        let selector_c = "";
        if (coins_sell_mode) {
            selector_c = "_c";
        }
        const button = document.getElementById("payment-button-donate" + selector_c);
        let customer = document.getElementById("donate_customer" + selector_c).value.trim();
        let email = document.getElementById("donate_email" + selector_c).value.trim();
        let coupon = "";
        customer = glob_auth_player_data.NICKNAME;
        const max_sum = 30000;
        const local_prm = '<span style="color: #a4a6ff">';

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
        } else if (customer.length < 3) {
            notify("Ваш никнейм слишком короткий");
            return;
        } else if (!/^[A-z\d_]+$/.test(customer)) {
            notify("Никнейм не соотвествует формату");
            return;
        }

        if (!email.length) {
            notify("Введите пожалуйста ваш email");
            return;
        } else if (!validateEmail(email)) {
            notify("Ошибка, адрес почты недействительный");
            return;
        }

        if (!coupon) {
            coupon = "";
        }
        if (coins_sell_mode) {
            products = JSON.parse(`{"${current_c_item}": ${sum}}`);
        }

        button.setAttribute("disabled", "");
        button.innerText = "Проверяем данные...";

        const _d_service = get_data_service(current_c_item);
        create_payment(
            (callback_data) => {
                if (callback_data) {
                    button.removeAttribute("disabled");
                    button.innerText = "Оплатить";
                    payment_url_global = callback_data.url;
                    button.setAttribute("onClick", "payment_action_bt()");
                } else {
                    notify("Ошибка, не удалось сформировать чек для оплаты");
                    donateResetPaymentState(type, (repeat = true));
                }
            },
            customer,
            products,
            _d_service.server_id,
            email,
            coupon
        );
    },
    zalupa_pay_finish_modal = () => {
        const container = document.getElementById("only-ok-payment");

        container.innerHTML = `<div style="background: rgb(28 28 28 / 15%);padding: 1.15em;border-radius: 0.72em;backdrop-filter: blur(1.35em);-webkit-backdrop-filter: blur(1.35em)"><p style="font-weight:800;margin-bottom:0">Спасибо что воспользовались ZalupaPay!</p></div>`;

        enable_modal_result_sc();
        checkTelegramAuthData(function (_) {}, false, false, true);
        document.querySelector(".modal-title").innerText = "";
        document.querySelector(".modal-content").classList.add("emoji-pay-back");
    },
    enable_modal_result_sc = () => {
        switch_modal_containers("success");
        modal_open_();
        donateResetPaymentState();
    },
    payment_action_bt = () => {
        window.open(payment_url_global, "_blank");

        const cart_dom = document.getElementById("donate-cart-list-success");
        const succ_text = document.getElementById("success-pay-text-js");
        const cont_ok = document.getElementById("only-ok-payment");
        const title = document.querySelector(".modal-title");

        const build_modal_wind = () => {
            cart_dom.innerHTML = "";
            title.innerText = "";
            succ_text.innerText = "Давай, плати. Шеф ждёт...";
            cont_ok.style.display = "";
            document.querySelector("img.payment-sucess-vova").setAttribute("src", "assets/images/vova-gay.webp");
        };

        const flush_inputs_donate = () => {
            const inputs = ["donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c"];
            for (let i = 0; i < inputs.length; i++) {
                document.getElementById(inputs[i]).value = "";
            }
        };

        enable_modal_result_sc();
        flush_inputs_donate();
        build_modal_wind();
    },
    initDonate = () => {
        donate_enable_coupon(true);
    },
    donateCoinsPay = (type = 1) => {
        const button = document.getElementById("payment-button-donate_c");
        let sum = document.getElementById("donate_sum");

        if (!sum.value && !/^[\d]+$/.test(sum.value)) {
            sum = 0;
        } else {
            sum = sum.value;
        }

        button.setAttribute("onClick", `generatePaymentLink(${type}, ${type === 2 ? 1 : sum})`);
    },
    donateModalCall = (type_item, item_id, nickname_update = true) => {
        current_item_type = type_item;

        const sum = document.getElementById("donate_sum");
        const customer_field = document.getElementById("donate_customer_c");
        const sum_container = document.getElementById("sum-tokens-container");
        const email_container_classL = document.getElementById("customer-email-tokens-container").classList;
        const modal_payment_text = document.getElementById("donate-text-span");
        let payment_text_form;
        const selectors_payment = [document.getElementById("donate_sum"), document.getElementById("donate_customer_c"), document.getElementById("donate_email_c"), document.getElementById("coupon-input-c")];
        const title = document.querySelector(".modal-title");
        let item_name;

        const update_title = (descriptor) => {
            title.innerText = title.innerText.replace(/\([\s\S]*?\)/).trim();
            title.innerText = `${title.innerText} (${descriptor})`;
        };

        current_c_item = item_id;
        current_c_item_name = get_data_service(item_id).name;

        if (type_item === 1 || type_item === 3) {
            sum_container.style.display = "";
            email_container_classL.remove("col-sm-6");
            email_container_classL.add("col-12");
            const donate_sum_title = document.getElementById("donate-sum-title");
            if (type_item === 1) {
                payment_text_form = `Воспользовавшись этой формой, вы можете поддержать проект финансово. За поддержку вы получите вознаграждение – за каждый рубль по одному игровому токену.`;
                item_name = "Токены";
                donate_sum_title.innerText = "Сумма";
                sum.addEventListener("input", (_) => {
                    donateCoinsPay();
                });
            } else if (type_item === 3) {
                payment_text_form = `Добавляет +1 слот в клан. Система автоматически определяет ваш клан по никнейму, поэтому будьте внимательны перед оплатой. Проверьте в каком клане вы состоите.`;
                item_name = "Слоты";
                donate_sum_title.innerText = "Количество";
                customer_field.addEventListener("input", (_) => {
                    donateCoinsPay(type_item);
                });
            }
        } else if (type_item === 2) {
            sum_container.style.display = "none";
            email_container_classL.remove("col-12");
            email_container_classL.add("col-sm-6");
            desc_get = get_data_service(current_c_item).description;
            if (!desc_get) {
                desc_get = "";
            }

            payment_text_form = `Форма оплаты пожертвования для игрового проекта Zalupa.Online<br/><span class="text-muted">${desc_get}</span>`;
            item_name = current_c_item_name;
            customer_field.addEventListener("input", (_) => {
                donateCoinsPay(type_item);
            });
        }
        modal_payment_text.innerHTML = payment_text_form.replaceAll("\n", "");

        for (let i = 0; i < selectors_payment.length; i++) {
            selectors_payment[i].addEventListener("input", (_) => {
                donateResetPaymentState(type_item);
            });
        }

        switch_modal_containers("service_coins");
        modal_open_();

        if (nickname_update) {
            const randomNick = false;
            const fldSelect = document.querySelector("input#donate_customer_c");
            if (randomNick) {
                shuffle(glob_players);
                fldSelect.setAttribute("placeholder", glob_players[0]);
            } else {
                fldSelect.setAttribute("placeholder", glob_auth_player_data.NICKNAME);
                fldSelect.value = glob_auth_player_data.NICKNAME;
                fldSelect.setAttribute("disabled", "");
            }
        }

        donateResetPaymentState(type_item, false, true);
        update_title(item_name);
    },
    linksSet = (selector_, fisrt_el_mrg = false) => {
        const sl = document.getElementById(selector_);
        let mrg = "margin-left: 0 !important";

        for (let i = 0; i < links_lt.length; i++) {
            if (!fisrt_el_mrg || i) {
                mrg = "";
            }

            sl.innerHTML = sl.innerHTML + `<a href="${links_lt[i].link}" target="_blank" style="${mrg}" class="btn btn-icon btn-secondary btn-${links_lt[i].name} mx-2"><i class="bx bxl-${links_lt[i].name}"></i></a>`;
        }
    },
    initCrypto = () => {
        if (!freeze_crypto) {
            freeze_crypto = true;
            getCrypto((token_) => {
                crypto_token = token_;
            });
        }
    },
    initLanding = () => {
        if (development_hosts.includes(window.location.hostname) && lock_of) {
            document.getElementById("landing_description_gb").innerText = "Этот сайт - preview-версия!";
            document.getElementById("donate-test-mode-enb").innerText = "Этот блок работает в демонстративном режиме и не является функциональным.";
        }

        linksSet("landing-links-tp", true);
        linksSet("links-block-footer-v");
    },
    finishLoad = () => {
        document.querySelector("main").setAttribute("style", "");
        document.querySelector("footer").setAttribute("style", "");
        const heart = `<i class="emoji" style="background-image:url(\'assets/images/emoji/red-heart.png\');` + `font-size: .7rem;bottom:-1px"><b>❤️</b></i>`;
        document.getElementById("footer-text-blc").innerHTML = `Создал KovalYRS с ${heart}, специально для ZALUPA.ONLINE`;
        if (grecaptcha) {
            document.getElementById("re-badge-text").innerText = "This site uses Google ReCaptcha technology";
        }
    },
    observerSystemTheme = () => {
        const mode_list = ["dark", "light"];
        const theme_switch = document.querySelector('[data-bs-toggle="mode"]').querySelector(".form-check-input");

        const updateTheme = (mode) => {
            if (mode === "dark") {
                root.classList.add("dark-mode");
                theme_switch.checked = true;
            } else {
                root.classList.remove("dark-mode");
                theme_switch.checked = false;
            }
        };

        for (let i = 0; i < mode_list.length; i++) {
            const observer = window.matchMedia(`(prefers-color-scheme: ${mode_list[i]})`);
            observer.addEventListener("change", (e) => e.matches && updateTheme(mode_list[i]));
        }
    },
    callSucessPayModal = (payment_id = 0) => {
        let glob_func_payment_data;
        const item_nm_payment_result = false;

        const cart_dom = document.getElementById("donate-cart-list-success");
        const succ_text = document.getElementById("success-pay-text-js");
        const cont_ok = document.getElementById("only-ok-payment");
        const title = document.querySelector(".modal-title");

        donateSwitchContainer(true);

        const item_type_ = (product_name) => {
            const t = product_name.toLowerCase();

            if (t.includes("токен")) {
                return 1;
            } else {
                return 2;
            }
        };

        const update_pm_desc = () => {
            const img_product = glob_func_payment_data.product.image;
            const name_product = glob_func_payment_data.product.name;

            if (img_product && img_product.length) {
                document.querySelector(".payment-sucess-vova").src = img_product;
                const name_selector = document.querySelector(".item-name-payment-result");
                if (item_nm_payment_result) {
                    name_selector.innerText = name_product;
                } else {
                    name_selector.style.marginBottom = "4vh";
                }
            }
        };

        const buildPayment = (payment) => {
            if (payment.status && payment_id == parseInt(payment.id)) {
                glob_func_payment_data = payment;
                succ_text.innerText = "Оплата прошла успешно, Шеф доволен, спасибо тебе.";
                cont_ok.style.display = "";

                const private_gift_button = document.createElement("button");
                private_gift_button.id = "private_gift_button_modal";
                private_gift_button.setAttribute("class", "btn btn-primary shadow-primary btn-lg mb-2 btn-shadow-hide");
                private_gift_button.innerText = "button::init";

                const item_type = item_type_(payment.product.name);

                let system_template = `<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Система</h6></div><span>${payment.payment_system}</span></li>`;
                let sum_template = `<li class="list-group-item d-flex justify-content-between"><span>Сумма зачисления</span><strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${payment.enrolled} ${getNoun(
                    payment.enrolled,
                    "рубль",
                    "рубля",
                    "рублей"
                )}</strong></li>`;

                if (coins_sell_mode) {
                    if (item_type === 1) {
                        sum_template = `<li class="list-group-item d-flex justify-content-between"><span>Сумма</span><strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${payment.enrolled} ${getNoun(
                            payment.enrolled,
                            "токен",
                            "токена",
                            "токенов"
                        )}</strong></li>`;
                    } else if (item_type === 2) {
                        sum_template = `<li class="list-group-item d-flex justify-content-between"><span>Сумма</span><strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${payment.product.price} ${getNoun(
                            payment.enrolled,
                            "рубль",
                            "рубля",
                            "рублей"
                        )}</strong></li>`;
                        document.querySelector("div.modal-footer").prepend(private_gift_button);
                    }
                }

                if (!payment.enrolled || payment.enrolled < 1) {
                    sum_template = "";
                }
                if (!payment.email.length || payment.email.match("undefined")) {
                    payment.email = "Ну указано";
                }
                if (!payment.payment_system || payment.payment_system.match("undefined")) {
                    system_template = "";
                }
                if (!payment.created_at || !payment.created_at.length) {
                    payment.created_at = "Неизвестно";
                } else {
                    const parsed_time = new Date(payment.created_at);
                    payment.created_at = `${parsed_time.toLocaleDateString()} ${parsed_time.toLocaleTimeString()}`;
                }

                let template_invite_link = "";
                if (payment.private_invite) {
                    template_invite_link = `<li class="list-group-item d-flex justify-content-between lh-sm mb-2 mb-lg-3 mt-4 mt-lg-5"><a href="${payment.private_invite}" id="private-chat-button" target="_blank" style="margin:auto"class="btn btn-primary shadow-primary btn-lg btn-shadow-hide">Приглашение в приватный чат <i class="ms-1 bx bxl-telegram"></i></a></li>`;
                }

                cart_dom.innerHTML = `<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Никнейм</h6></div><span>${payment.customer}</span></li><li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Почта</h6></div><span>${payment.email}</span></li>${system_template}<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Время</h6></div><span>${payment.created_at}</span></li>${sum_template}${template_invite_link}`;
            } else {
                succ_text.innerText = "Чек неоплачен, Шеф недоволен.";
                document.querySelector("img.payment-sucess-vova").setAttribute("src", "assets/images/vova-fail.webp");
            }
        };

        const enable_modal = (payment) => {
            buildPayment(payment);
            switch_modal_containers("success");
            modal_open_();
            update_pm_desc();
        };

        checkPayment((payment) => {
            if (typeof payment.status !== "undefined") {
                enable_modal(payment);
                title.innerText = `Чек #${payment.id}`;
            } else {
                notify("Ошибка, чек не найден или EasyDonate вернул недействительный ответ");
            }
        }, payment_id);
    },
    successPay = () => {
        const url = new URL(window.location.href).searchParams;
        const payment_id = url.get("pg_order_id");

        if (payment_id) {
            callSucessPayModal(payment_id);
        }
    },
    displayPromotion = () => {
        const selector = document.querySelector("div.promotion-header");
        const main = document.querySelector("main");

        requestCall(
            (promotion) => {
                if (promotion.active) {
                    const text = promotion.text;

                    selector.style.minHeight = "40px";
                    selector.style.height = "100%";
                    selector.setAttribute("onclick", `clipboardFunc("input.promotionInput", "Промокод <span class=\\"text-primary\\" style=\\"font-weight:800\\">${promotion.var}</span> скопирован в буфер обмена.")`);
                    selector.innerHTML = `<p class="text-center" style="color:#fff!important;line-height:200%">${text}</p><input class="promotionInput" value="${promotion.var}" style="display:none">`;

                    const s_text = document.querySelector("div.promotion-header>p").style;
                    s_text.marginBottom = "0";
                    s_text.paddingRight = "1.25rem";
                    s_text.paddingLeft = "1.25rem";
                    s_text.paddingTop = ".18rem";
                }
            },
            "assets/data/promotion.json",
            "GET",
            true
        );
    },
    adaptiveDisplayLand = () => {
        const updater = () => {
            const header_height = document.querySelector("header").offsetHeight;
            const container = document.getElementById("head-container");

            const vova_pc_version = document.querySelector("div.vova-bg-landing");
            const vova_pc_version_mask = document.querySelector("div.vova-bg-landing-mask");

            if (first_init_head_adapt === 0 && first_init_head_adapt_vova === 0) {
                first_init_head_adapt = container.offsetHeight;
                first_init_head_adapt_vova = vova_pc_version.offsetHeight;
            }

            container.style.height = `${first_init_head_adapt - header_height}px`;
            vova_pc_version.style.height = `${first_init_head_adapt_vova - header_height}px`;
            vova_pc_version_mask.style.height = `${first_init_head_adapt_vova - header_height}px`;
            container.style.marginTop = `${header_height}px`;
        };

        updater();
        setInterval(updater, 350);
    },
    clipboardFunc = (field_selector, notify_text) => {
        const copyText = document.querySelector(field_selector);

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(copyText.value);

        notify(notify_text);
        return copyText.value;
    },
    donateContainerHash = () => {
        observerContainerHash(["donate", "donate_block"], () => {
            donate_displayed = true;
            donateSwitchContainer(donate_displayed);
        });
    },
    observerContainerHash = (hash_array, action) => {
        const updater = () => {
            if (hash_array.includes(linkHash())) {
                action();
            }
        };

        updater();
        addEventListener("hashchange", (_) => updater());
    },
    openTelegramAuthModal = (skip_check = false) => {
        checkTelegramAuthData(function (tg_success) {
            if (!tg_success) {
                const script_telegram_widget = document.createElement("script");

                script_telegram_widget.src = "https://telegram.org/js/telegram-widget.js?21";
                script_telegram_widget.setAttribute("async", "");
                script_telegram_widget.setAttribute("data-telegram-login", telegram_bot_username);
                script_telegram_widget.setAttribute("data-size", "large");
                script_telegram_widget.setAttribute("data-radius", "8");
                script_telegram_widget.setAttribute("data-onauth", "onTelegramAuth(user)");
                script_telegram_widget.setAttribute("data-request-access", "write");

                script_telegram_widget.onload = () => {
                    switch_modal_containers("info", {
                        title: "",
                        content: "",
                    });
                    modal_open_();
                };

                const content = document.getElementById("info-content-modal");
                const container = document.createElement("div");
                const text = document.createElement("p");

                content.innerHTML = "";
                content.appendChild(container);
                content.appendChild(text);
                text.innerHTML = `Для некоторых функций на этом сайте необходимо авторизироваться. Мы не получим никаких конфиденциальных данных о вас, например, ваш номер или локацию, это нужно только для того, чтобы Telegram подтвердил, что вы являетесь владельцем своего аккаунта. Также не забудьте связать свой аккаунт Telegram с игровым аккаунтом в <a href="${telegram_social_bot}" target="_blank" class="text-primary">нашем боте</a>.`;

                text.setAttribute("class", "text-start px-3 pt-1 pt-lg-2");
                container.id = "telegram-auth-container";
                container.appendChild(script_telegram_widget);
            }
        }, skip_check);
    },
    openLoginHint = () => {
        if (!allow_display_login_hint) {
            return;
        }

        const content = document.getElementById("info-content-modal");
        const container = document.createElement("div");
        const text = document.createElement("p");

        content.innerHTML = "";
        content.appendChild(container);
        content.appendChild(text);
        text.innerHTML = `Похоже что ты не прочитал текст в первом окне авторизации, повторим процедуру. Чтобы завершить авторизацию на сайте - тебе нужно связать свой Telegram с своим игровым аккаунтом в&nbsp; <a href="${telegram_social_bot}" target="_blank" class="text-primary">нашем боте</a>.`;

        text.setAttribute("class", "text-start px-3 pt-1 pt-lg-2");
        container.id = "telegram-auth-hint";

        notify("Прочитай внимательно инструкцию!");

        switch_modal_containers("info", {
            title: "Помощь авторизации",
            content: "",
        });
        modal_open_();
    },
    initJarallax = () => {
        jarallax(document.querySelectorAll(".jarallax"), {
            speed: 0.15,
            type: "scale-opacity",
        });
    },
    initTooltip = () => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
            tooltip_instance = new bootstrap.Tooltip(tooltipTriggerEl, {
                template: `<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>`,
            });
        });

        if (tooltip_instance) {
            setInterval(() => {
                tooltip_instance.update();
            }, 1500);
        }
    },
    initSmoothScrollObserver = () => {
        const scrollerObject = new SmoothScroll("section");

        const callScroller = () => {
            const identifier = linkHash().toLowerCase();

            if (!(identifier && identifier.length) || ["private_rules"].includes(identifier)) {
                return;
            }

            try {
                scrollerObject.animateScroll(document.querySelector(`section[id="${identifier}"]`), null, { offset: 50 });
            } catch (_) {
                return;
            }
        };

        callScroller();
        window.onhashchange = callScroller;
    },
    privateServerModuleInit = () => {
        const desc = document.getElementById("private-server-hub-description");

        desc.innerHTML = `Проект Zalupa.Online за период своего существования от единого сервера Анархии перерос в проект с несколькими режимами, один из таких – приватный сервер с ванильным выживанием. Особенность этого сервера, что туда попадают только те, кто поддержал сервер финансово. Также единственный режим, где вы можете быть на уровне с администрацией, ведь здесь можно играть только с правами обычного игрока, никаких привилегий. Также не забудь <a class="text-gradient-primary" href="https://www.notion.so/zaluparules/zalupa-online-1e6269506d084d6ba9549cbb7d40e3a4">прочитать правила</a>.`;
    },
    tonyComeBack = () => {
        const selector = document.getElementById("AppleTony_comeback_days");

        const update_days = (days_count) => {
            selector.innerText = `${days_count} ${getNoun(days_count, "день", "дня", "дней")}`;
        };

        const date1 = new Date();
        const date2 = new Date("11/30/2023");

        const differenceInTime = date2.getTime() - date1.getTime();
        const differenceInDays = parseInt(differenceInTime / (1000 * 3600 * 24));

        update_days(differenceInDays);
        setInterval(function () {
            update_days(differenceInDays);
        }, 9999);
    },
    autoAuthTelegramObserver = () => {
        if (telegram_auth_enabled) {
            document.getElementById("telegram-auth-avatar").style.display = "";
        }
        checkTelegramAuthData((success) => {
            if (success) {
                const button_contact_land = document.getElementById("contact-button-land");
                const button_auth = document.querySelector(".avatar-container");
                const telegram_auth_avatar = document.getElementById("telegram-auth-avatar");

                button_auth.removeAttribute("onclick");
                if (feedback_module_enabled) {
                    button_contact_land.style.display = "";
                }
                telegram_auth_avatar.style.display = "";
                setAvatar(getTelegramAuth());
            }
        });
        setInterval(displayTokens, 1500);
    },
    initCore = () => {
        initHost();
        initCrypto();
        initLanding();
        observerSystemTheme();
        buildPlayersSwiper();
        appendPostsNews();
        initComments();
        appendServices();
        gameServerUpdater();
        initDonate();
        initEventsList();
        initJarallax();
        finishLoad();
        successPay();
        ytVideoSetter();
        setRandomStickerLand();

        donateContainerHash();

        privateServerModuleInit();

        autoAuthTelegramObserver();

        tonyComeBack();
        displayPromotion();
        adaptiveDisplayLand();

        setLauncherLinks();
        donate_bg_preload();

        check_modal_();

        const elem = document.getElementById("dark-perm-set-bv");
        elem.parentNode.removeChild(elem);

        window.onload = () => {
            if (!debug_lock_init) {
                const preloader = document.querySelector(".page-loading");
                const wait = 1500;
                const move_wait = 100;
                setTimeout(() => {
                    preloader.classList.remove("active");
                    if (!donate_displayed) {
                        document.body.style.overflowY = "";
                    }
                    window.scrollTo({ top: 0 });
                }, wait);
                setTimeout(() => {
                    preloader.remove();

                    // after tasks
                    initTooltip();
                    initSmoothScrollObserver();
                }, wait + move_wait);
                setInterval(() => {
                    checkTelegramAuthData(function (_) {}, false, false, true);
                }, 12 * 1000);
            }
        };
    };

script_core.onload = () => {
    initCore();
};