"use strict";

const site_domains = {
    "prod": domain_site,
    "dev": development_hosts[0],
    "test": development_hosts[1]
};
const cart_cookie = "cart_box";
const channels = 2;
const links_lt = [{
    name: "twitch",
    link: "https://www.twitch.tv/bratishkinoff"
}, {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCg2uAOEoY-la2d-95uMmLuQ"
}, {
    name: "telegram",
    link: "https://t.me/zalupaonline"
}, {
    name: "discord",
    link: "https://discord.gg/qEqbVbMeEx"
}];
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
var freeze_crypto = false;
var freeze_monitoring = false;
var gameServerUpdater_setter;
var work_domain_v = "zalupa.online";

function initHost() {
    let keys = Object.keys(
        site_domains);
    for (let i = 0; i < keys
        .length; i++) {
        if (site_domains[keys[i]] ===
            window.location.hostname) {
            work_domain_v =
                site_domains[keys[i]]
        }
    }
}

function linkHash() {
    return window.location.hash
        .substring(1)
}

function getHash(link) {
    let hash = window.location.hash
        .substr(1);
    return Object.keys(hash.split('&')
        .reduce(function (result,
                          item) {
            let parts = item
                .split('=');
            result[parts[0]] =
                parts[1];
            return result;
        }, {}))[0]
}

function re_check(callback) {
    grecaptcha.ready(function () {
        grecaptcha
            .execute(re_token, {
                action: "submit"
            })
            .then(function (
                token_update
            ) {
                callback(
                    token_update
                )
            })
    })
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math
            .random() * currentIndex
        );
        currentIndex--;
        [array[currentIndex], array[
            randomIndex]] = [
            array[randomIndex], array[
                currentIndex]
        ];
    }

    return array;
}

function alternateSort(list) {
    let minIndex = 0;
    let minVal = 0;

    for (let i = 0; i < list
        .length; i++) {
        minIndex = i;
        minVal = list[i];

        for (let j = i + 1; j < list
            .length; j++) {
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

function getImageLightness(imageSrc,
                           callback) {
    let img = document.createElement(
        "img");
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.style.display = "none";
    document.body.appendChild(img);

    let colorSum = 0;

    img.onload = function () {
        let canvas = document
            .createElement(
                "canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        let ctx = canvas.getContext(
            "2d");
        ctx.drawImage(this, 0, 0);

        let imageData = ctx
            .getImageData(0, 0,
                canvas.width,
                canvas
                    .height);
        let data = imageData.data;
        let r, g, b, avg;

        for (let x = 0, len = data
            .length; x <
             len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r +
                g + b) / 3);
            colorSum += avg;
        }

        let brightness = Math.floor(
            colorSum / (this
                .width * this
                .height));
        callback(brightness);

        img.remove()
    }
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function url_builder_(base_url,
                      submit_data_) {
    let url = new URL(base_url);

    for (let i = 0; i < submit_data_
        .length; i++) {
        url.searchParams.set(
            submit_data_[i].name,
            submit_data_[i].value);
    }

    return url.href;
}

function countProperties(obj) {
    return Object.keys(obj).length;
}

function getNoun(number, one = "игрок",
                 two = "игрока", five = "игроков"
) {
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
    re_check(function (token_update) {
        requestCall(
            function (r) {
                if (r
                    .success
                ) {
                    callback
                    (r
                        .token
                    )
                } else {
                    callback
                    ("")
                }
            },
            `${backend_host}/crypto`,
            "POST", true, {
                token: token_update
            }
        )
    })
}

function get_events_(callback) {
    re_check(function (token_update) {
        requestCall(
            function (r) {
                callback(r
                    .events
                )
            },
            `${backend_host}/events`,
            "POST", true, {
                token: token_update
            }
        )
    })
}

function get_yt_video_(callback,
                       video_id, skip = false) {
    if (!skip) {
        re_check(function (
            token_update) {
            requestCall(
                function (
                    r) {
                    callback
                    (r
                        .body
                    )
                },
                `${backend_host}/youtube_get`,
                "POST",
                true, {
                    token: token_update,
                    video_id: video_id
                }
            )
        })
    } else {
        callback(null)
    }
}

function get_news_(callback, source) {
    re_check(function (token_update) {
        requestCall(
            function (r) {
                callback(r
                    .messages
                )
            },
            `${backend_host}/channel_parse?choice=${source}`,
            "POST", true, {
                token: token_update
            }
        )
    })
}

function appendPostsNews() {
    let createSwiper = function () {
        new Swiper(
            "#news_swipe_container", {
                spaceBetween: 12,
                loop: true,
                observer: true,
                observeParents: true,
                preventClicks: false,
                preventClicksPropagation: false,
                autoplay: {
                    delay: 1000 *
                        10
                },
                pagination: {
                    el: "#news_swiper_pagination",
                    clickable: true
                },
                navigation: {
                    prevEl: "#prev_news",
                    nextEl: "#next_news"
                }
            });
    }

    let add_news_in_array = function (
        posts, source) {
        let array_ = document
            .getElementById(
                "news_swipe_array");
        posts = posts.reverse();

        for (let i = 0; i < posts
            .length; i++) {
            let text = posts[i]
                .text;
            let text_array = text
                .split('<br>');
            let datetime = new Date(
                posts[i]
                    .datetime_utc);
            if (!posts[i].cover) {
                posts[i].cover =
                    "assets/images/spawn.webp";
            }
            array_.innerHTML =
                array_.innerHTML + `
                <div class="swiper-slide h-auto px-2">
                    <figure class="card h-100 position-relative border-0 shadow-sm news-figure" id="news_figure_${i}">
                        <div class="background-news" id="background-news-${i}">
                            <div class="background-news-overlay" id="news-overlay-${i}">
                                <div class="background-news-overlay-dark-mode">
                                    <blockquote class="card-body mt-2 mb-3 news-text-container">
                                        <p class="fs-md mb-0 news-text h6" id="news_text_${i}" style="font-family: sans-serif">
                                                ${text_array[0]}</p>
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
                        ${datetime.toLocaleTimeString(
                    "ru-RU", { hour: '2-digit', minute: '2-digit' }
                )}
                    </span>
                </div>
            `;
            let selector_bg =
                document
                    .getElementById(
                        `background-news-${i}`
                    );
            let selector_text =
                document
                    .getElementById(
                        `news_text_${i}`
                    );
            selector_bg.style
                .backgroundImage =
                `url(${posts[i].cover})`;
            selector_text.classList
                .add("text-light");
            let text_len =
                selector_text
                    .innerText.length;
            let text_split =
                selector_text
                    .innerText.split(
                    " ");
            let font_size = ((
                text_len - -
                    8) * .4) / 100;
            selector_text.style
                .fontSize = `calc(${
                parseFloat(1.8-font_size)
            }vw + ${
                parseFloat(1.8-font_size)
            }vh + ${
                parseFloat(1.6-font_size)
            }vmin)`;
            getImageLightness(posts[
                    i].cover,
                function (
                    brightness
                ) {
                    let style_ = `#000000${
                        (((parseFloat(brightness) / 255.0) * 100.0).toFixed() + 64).toString(16).slice(0, 2)
                    }`;
                    document
                        .getElementById(
                            `news-overlay-${i}`
                        )
                        .style
                        .background =
                        style_
                })
        }
        let loading_done =
            function () {
                setTimeout(
                    function () {
                        let sl =
                            document
                                .getElementById(
                                    "telegram_block_load"
                                );
                        let container_news =
                            document
                                .getElementById(
                                    "news_zlp_buttons"
                                );

                        try {
                            sl.parentNode
                                .removeChild(
                                    sl
                                );
                            container_news
                                .style
                                .display =
                                ""
                        } catch (
                            _
                            ) {}
                    }, 150)
            }
        if (posts) {
            createSwiper();
            loading_done();
        }
    }

    let posts_source =
        1; // zalupaonline
    get_news_(function (posts) {
        add_news_in_array(posts,
            posts_source)
    }, posts_source)
}

function donateSwitchContainer(
    display) {
    let container = document
        .querySelector(
            ".donate-global-container");

    let update_zIndex = function (
        variable) {
        setTimeout(function () {
            container.style
                .zIndex =
                variable
        }, 850)
    }

    if (!donate_displayed || display) {
        document.body.style.overflowY =
            "hidden";
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        container.style.minHeight = "";
        update_zIndex("");

        donate_displayed = true
    } else {
        container.style.minHeight = "0";
        container.style.zIndex = "-1";
        document.body.style.overflowY =
            "";

        donate_displayed = false
    }
}

function get_game_server_data(
    callback) {
    let _data_error = function (ok =
                                    false) {
        let string_ = "";

        if (ok) {
            string_ = "";
        } else {
            string_ =
                "Не удается обновить информацию о сервере...";
        }

        document.getElementById(
            "error_get_server_status"
        ).innerText =
            string_;
    };
    if (crypto_token) {
        requestCall(
            function (r) {
                setTimeout(
                    function () {
                        freeze_monitoring
                            =
                            false
                    }, 800);
                if (r.success) {
                    callback(r.body)
                } else {
                    crypto_token =
                        ""
                }
            },
            `${backend_host}/server`,
            "POST", true, {
                crypto_token: crypto_token
            }
        )
    } else {
        initCrypto();
        freeze_monitoring = false
    }
}

function monitoring_game_server_update() {
    if (!freeze_monitoring) {
        freeze_monitoring = true;

        get_game_server_data(function (
            data) {
            if (data.online) {
                if (typeof gameServerUpdater_setter !==
                    'undefined'
                ) {
                    clearInterval
                    (
                        gameServerUpdater_setter
                    )
                }
                let selector =
                    document
                        .getElementById(
                            "server_online_status"
                        );
                selector
                    .classList
                    .remove(
                        "loading-dots"
                    );
                selector
                    .innerHTML = `Сейчас играет <span class="text-primary fw-semibold">${
                    data.online
                }</span>
            <i class="emoji male-emoji" style="margin-left: -.35rem!important;background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            ${getNoun(data.online)}
            <i class="emoji male-emoji" style="background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            `
            }
        })
    }
}

function gameServerUpdater() {
    monitoring_game_server_update();
    gameServerUpdater_setter =
        setInterval(
            monitoring_game_server_update,
            300);
    setInterval(
        monitoring_game_server_update,
        6000);
}

function initEventsList() {
    let row_container = document
        .getElementById(
            "events-row-container");
    let loader_ = document
        .getElementById(
            "events_block_load");
    let switch_button_ = document
        .getElementById(
            "events-c-button");
    let row_class = [
        "row-cols-md-2",
        "row-cols-lg-2",
        "row-cols-xl-3"
    ];

    get_events_(function (data) {
        if (data && data
            .length) {
            events_block_load
                .remove();

            data.sort(function (
                a, b) {
                let keyA =
                        new Date(
                            a
                                .date_start
                        ),
                    keyB =
                        new Date(
                            b
                                .date_start
                        );
                if (keyA <
                    keyB
                )
                    return -
                        1;
                if (keyA >
                    keyB
                )
                    return 1;
                return 0;
            })

            let time_correction =
                function (
                    date) {
                    let userTimezoneOffset = -
                            date
                                .getTimezoneOffset() *
                        60000
                    return new Date(
                        date
                            .getTime() -
                        userTimezoneOffset
                    )
                }

            for (let i = 0; i <
            data.length; i++
            ) {
                switch_button_
                    .removeAttribute(
                        "disabled"
                    );
                if (3 > i > 0) {
                    row_container
                        .classList
                        .add(
                            row_class[
                                i
                                ]
                        )
                }
                let st_date =
                    time_correction(
                        new Date(
                            data[
                                i
                                ]
                                .date_start
                        ));
                let end_date =
                    time_correction(
                        new Date(
                            data[
                                i
                                ]
                                .date_end
                        ));
                let time_in_moscow =
                    new Date(
                        new Date()
                            .toLocaleString(
                                "en-US", {
                                    timeZone: "Europe/Moscow"
                                }))
                let badge = "";
                if (st_date >
                    time_in_moscow
                ) {
                    badge =
                        "Скоро"
                } else if (
                    time_in_moscow >
                    end_date) {
                    badge =
                        "Завершено"
                }
                let template_ = `
                    <div class="col">
                        <div class="object-block-col">
                            <h1>${data[i].title}</h1>
                            <h4 class="text-primary" style="margin-top: -1.2rem">${badge}</h4>
                            <h6 style="margin-top: -1rem">С <span class="text-primary">
                                ${st_date.toLocaleDateString("ru-RU")} ${("0" + st_date.getHours()).slice(-2)}:${("0" + st_date.getMinutes()).slice(-2)}
                                </span> по <span class="text-primary">
                                ${st_date.toLocaleDateString("ru-RU")} ${("0" + end_date.getHours()).slice(-2)}:${("0" + end_date.getMinutes()).slice(-2)}
                                </span></h6>
                            <p>${data[i].text}</p>
                        </div>
                    </div>
                `;
                row_container
                    .innerHTML =
                    row_container
                        .innerHTML +
                    template_
            }
        }
    })
}

function get_donate_services(callback) {
    re_check(function (token_update) {
        requestCall(
            function (r) {
                callback(r
                    .services
                )
            },
            `${backend_host}/donate/services`,
            "POST", true, {
                token: token_update
            }
        )
    })
}

function create_payment(callback,
                        customer, products, email = "",
                        coupon = "") {
    re_check(function (token_update) {
        requestCall(
            function (r) {
                callback(r
                    .payment
                )
            },
            `${backend_host}/donate/payment/create`,
            "POST", true, {
                customer: customer,
                products: products,
                email: email,
                coupon: coupon,
                token: token_update,
                success_url: `https://${work_domain_v}`
            }
        )
    })
}

function check_coupon(callback,
                      coupon) {
    re_check(function (token_update) {
        requestCall(
            function (r) {
                if (r
                    .coupon
                ) {
                    callback
                    (r
                        .coupon
                    )
                }
            },
            `${backend_host}/donate/coupon`,
            "POST", true, {
                code: coupon,
                token: token_update
            }
        )
    })
}

function checkPayment(callback,
                      payment_id) {
    re_check(function (token_update) {
        requestCall(
            function (r) {
                callback(r
                    .payment
                );
            },
            `${backend_host}/donate/payment_get`,
            "POST", true, {
                payment_id: parseInt(
                    payment_id
                ),
                token: token_update,
                tokens_send: coins_sell_mode
            }
        )
    })
}

function appendServices() {
    get_donate_services(function (
        services) {
        donate_services_array =
            services;
        let size_classes = [
            "row-cols-sm-2",
            "row-cols-md-3",
            "row-cols-lg-4"
        ];
        let sl = document
            .getElementById(
                "donate_items_list"
            );

        if (!services.length) {
            sl.innerHTML =
                '<span class="text-center">Не удалось получить список товаров.</span>';
        } else {
            donate_check_services_cart
            ();

            for (let i = 0; i <
            services
                .length; i++) {
                let click_data = {
                    name: services[
                        i
                        ]
                        .name,
                    price: services[
                        i
                        ]
                        .price,
                    count: services[
                        i
                        ]
                        .number,
                    description: services[
                        i
                        ]
                        .description,
                    type: services[
                        i
                        ]
                        .type,
                    service_id: services[
                        i
                        ]
                        .id
                };
                let _name = "";
                let _desc = "";
                let padding_desc =
                    "p-3";
                let desc_template = `
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
                    <p class="fs-sm mb-0">${services[i].description}</p>
                `;

                if (i &&
                    size_classes
                        .length >= i
                ) {
                    sl.classList
                        .add(
                            size_classes[
                            i -
                            1
                                ]
                        );
                }

                let click_template = `onClick="donate_element_click(${JSON.stringify(
                    click_data
                )})"`

                if (!
                    coins_sell_mode
                ) {
                    _name =
                        services[
                            i]
                            .name
                } else {
                    _name = `${services[i].price} ${getNoun(
                        services[i].price, "рубль", "рубля", "рублей"
                    )} = ${services[i].number} ${getNoun(
                        services[i].number, "токен", "токена", "токенов"
                    )}`;
                    padding_desc
                        = "p-0";
                    desc_template
                        = `
                        <p class="mb-0 token-description-dnt">
                            Деньги не возвращаем. Даже не пробуй жаловаться v0kky.
                        </p>`;

                    click_template
                        = ""
                }

                sl.innerHTML =
                    sl
                        .innerHTML +
                    `
                    <div class="col" id="donate_item_${services[i].id}">
                        <div class="card border-0 bg-transparent" ${click_template}>
                          <div class="position-relative container-item-donate-n">
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
                          <div class="card-body text-center ${padding_desc}">
                                <h3 class="fs-lg fw-semibold pt-1 mb-2">${_name}</h3>
                                ${desc_template}
                          </div>
                        </div>
                    </div>
                `;
            }

            setTimeout(
                function () {
                    let elem =
                        document
                            .getElementById(
                                "donate_block_load"
                            );
                    let butt =
                        document
                            .getElementById(
                                "donate-button-container"
                            )
                    let ids = [
                        "donate_items_list",
                        "donate-title-desc",
                        "donate-test-mode-enb",
                        "donate-cart-container"
                    ];

                    try {
                        elem.parentNode
                            .removeChild(
                                elem
                            );
                    } catch (
                        _
                        ) {}

                    if (
                        coins_sell_mode
                    ) {
                        butt.style
                            .display =
                            ""
                    }

                    for (let i =
                        0; i <
                         ids
                             .length; i++
                    ) {
                        try {
                            document
                                .getElementById(
                                    ids[
                                        i
                                        ]
                                )
                                .style
                                .display =
                                ""
                        } catch (
                            e
                            ) {
                            console
                                .log(
                                    `Donate block loader error. Details: ${e}`
                                )
                        }
                    }
                }, 100);
        }
    });
}

function switchEventsPages(
    button_name) {
    let news_page = document
        .getElementById(
            "news-c-container");
    let events_page = document
        .getElementById(
            "events-c-container");

    let news_button = document
        .getElementById(
            "news-c-button");
    let events_button = document
        .getElementById(
            "events-c-button");

    if (button_name !==
        events_page_state) {
        if (button_name === "events") {
            news_page.style.display =
                "none";
            events_page.style.display =
                "block";

            news_button.removeAttribute(
                "disabled");
            events_button.setAttribute(
                "disabled", "");

            events_page.style.top = "0";
            news_page.style.top =
                "-2rem";

            events_page_state = "events"
        } else if (button_name ===
            "news") {
            news_page.style.display =
                "block";
            events_page.style.display =
                "none";

            news_button.setAttribute(
                "disabled", "");
            events_button
                .removeAttribute(
                    "disabled");

            events_page.style.top =
                "-2rem";
            news_page.style.top = "0";

            events_page_state = "news"
        }
    }
}

function redirect_(url) {
    return window.location.replace(url);
}

function ytVideoSetter(skip = false) {
    let set_video = function (el,
                              video_id, params) {
        let video = get_yt_video_(
            function (data) {
                if (data && data
                    .video.x720
                    .url && !
                    skip) {
                    el.innerHTML = `
                    <video class="video-container-yt" ${params.autoplay != null ? 'autoplay=""' : ""} ${params.muted != null ? 'muted=""' : ""} ${params.loop != null ? 'loop=""' : ""} ${params.controls != null ? 'controls=""' : ""} style="object-fit: contain">
                        <source src="${data.video.x720.url}" type="video/mp4">
                    </video>
                `
                } else {
                    el.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${video_id}" title="YouTube video player"
                        frameborder="0" class="video-container-yt"
                        allow="accelerometer; ${params.autoplay != null ? 'autoplay' : ""}; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen="" loading="lazy"></iframe>
                `
                }
            }, video_id, skip)
    }

    for (let el of Array.from(document
        .getElementsByClassName(
            "ytVideoSetter"))) {
        let video_id = el.getAttribute(
            "video_id");

        if (video_id && video_id
                .length && video_id.length <
            20) {
            set_video(el, video_id,
                params = {
                    autoplay: el
                        .getAttribute(
                            "autoplay"
                        ),
                    muted: el
                        .getAttribute(
                            "muted"
                        ),
                    loop: el
                        .getAttribute(
                            "loop"),
                    controls: el
                        .getAttribute(
                            "controls"
                        )
                })
        }
    }
}

function modal_close_() {
    document.body.classList.remove(
        "modal-open");
    document.getElementById(
        "scroll_butt_container")
        .style.display = "";
    let modal = document.getElementById(
        "donate_item_modal");
    modal.style.opacity = 0;
    setTimeout(function () {
        modal.style.display =
            "none";
    }, 350);
}

function modal_open_() {
    document.body.classList.add(
        "modal-open");
    document.getElementById(
        "scroll_butt_container")
        .style.display = "none";
    let modal = document.getElementById(
        "donate_item_modal");
    modal.style.display = "block";
    setTimeout(function () {
        modal.style.opacity = 1;
    }, 50);

    window.onclick = function (event) {
        if (event.target ===
            modal) {
            modal_close_();
        }
    };
}

function switch_modal_containers(mode =
                                     "service") {
    let span = document
        .getElementsByClassName(
            "close_b")[0];
    let info = document.getElementById(
        "modal-info-container-c");
    let service = document
        .getElementById(
            "modal-donate-container-c");
    let service_coins = document
        .getElementById(
            "modal-donate-finish-container-b"
        );
    let success = document
        .getElementById(
            "modal-donate-success-container"
        );
    let finish_donate = document
        .getElementById(
            "modal-donate-finish-container-c"
        );
    let title = document.querySelector(
        ".modal-title");
    let _array = [{
        name: "service",
        selector: service,
        title: "Товар"
    }, {
        name: "service_coins",
        selector: service_coins,
        title: "Оплата пожертвования"
    }, {
        name: "info",
        selector: info,
        title: "Сообщение"
    }, {
        name: "success",
        selector: success,
        title: "Чек"
    }, {
        name: "donate_finish",
        selector: finish_donate,
        title: "Корзина"
    }];

    for (let i = 0; i < _array
        .length; i++) {
        let _mode = "none";

        if (mode === _array[i].name) {
            _mode = "block";
            title.innerText = _array[i]
                .title;
        }

        _array[i].selector.style
            .display = _mode;
    }

    span.onclick = function () {
        modal_close_();
    };
}

function discount_calculate(price,
                            discount) {
    discount = discount / 100;
    return (price * discount).toFixed();
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
    document.getElementById(
        "count_cart_items_dn")
        .innerText = countProperties(
        get_cookie_cart()
    );
}

function groupAlreadyInCart(
    user_cart) {
    let cart = Object.keys(user_cart);

    for (let i = 0; i <
    donate_services_array
        .length; i++) {
        if (donate_services_array[i]
            .type === "group") {
            if (cart.includes(
                donate_services_array[
                    i].id.toString()
            )) {
                return true;
            }
        }
    }

    return false;
}

function comment_show_action(id, close =
    false) {
    let comment_text = document
        .getElementById(
            `comment_text_${id}`);
    let comment_show = document
        .getElementById(
            `comment_show_${id}`);

    swiper_comments.on('slideChange',
        function () {
            comment_show_action(id,
                true)
        });

    if (close || comment_text
        .getAttribute(
            "fullShowComment") === "1"
    ) {
        comment_text.style.height =
            "100px";
        comment_text.setAttribute(
            "fullShowComment", "0");
        comment_show.innerText =
            "Раскрыть"
    } else {
        comment_text.style.height =
            "100%";
        comment_text.setAttribute(
            "fullShowComment", "1");
        comment_show.innerText =
            "Скрыть"
    }
}

function initComments() {
    let array_ = document
        .getElementById(
            "comment_swipe_array");

    let createSwiper = function () {
        swiper_comments =
            new Swiper(
                "#comment_swipe_container", {
                    spaceBetween: 12,
                    loop: true,
                    observer: true,
                    observeParents: true,
                    preventClicks: false,
                    preventClicksPropagation: false,
                    autoplay: {
                        delay: 8000
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    },
                    navigation: {
                        prevEl: "#prev_comment",
                        nextEl: "#next_comment"
                    }
                })
    }

    let playersGet = function (
        callback) {
        requestCall(
            function (r) {
                callback(r)
            },
            "assets/data/players.json",
            "GET", true
        )
    }

    let searchPlayer = function (
        players, name) {
        for (let i = 0; i < players
            .length; i++) {
            if (players[i].name ===
                name) {
                return players[i]
            }
        }
    }

    requestCall(
        function (r) {
            let comment = r;
            shuffle(comment);

            playersGet(function (
                players) {
                for (let i =
                    0; i <
                     comment
                         .length; i++
                ) {
                    let player =
                        searchPlayer(
                            players,
                            comment[
                                i
                                ]
                                .name
                        );

                    array_
                        .innerHTML =
                        array_
                            .innerHTML +
                        `
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

                    let comment_text =
                        document
                            .getElementById(
                                `comment_text_${i}`
                            );
                    let comment_show =
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
                        "height 0.8s cubic-bezier(1, -0.3, 0, 1.21) 0s";
                    comment_text
                        .setAttribute(
                            "fullShowComment",
                            "0"
                        );
                    let correction_height =
                        12;

                    if (comment_text
                            .clientHeight >
                        (100 +
                            correction_height
                        )
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
                            "none"
                    }
                }
            });

            createSwiper();
        },
        "assets/data/comments.json",
        "GET", true
    )
}

function buildPlayersSwiper() {
    let array_ = document
        .getElementById(
            "players-swiper-array");

    let createSwiper = function () {
        new Swiper(
            "#players_swipe_container", {
                slidesPerView: 1,
                spaceBetween: 24,
                autoplay: {
                    delay: 2000
                },
                loop: true,
                observer: true,
                observeParents: true,
                preventClicks: false,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                breakpoints: {
                    600: {
                        slidesPerView: 2
                    },
                    920: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 4
                    },
                    1600: {
                        slidesPerView: 5
                    }
                }
            });
    };

    let badges_get = function (
        callback) {
        requestCall(
            function (r) {
                callback(r)
            },
            "assets/data/badges.json",
            "GET", true
        )
    }

    let badges_paste;
    badges_get(function (badges) {
        badges_paste = badges
    });

    requestCall(
        function (r) {
            let player = r;
            shuffle(player);

            for (let i = 0; i <
            player.length; i++
            ) {
                let ult_template =
                    "";

                function getBadges() {
                    let result = "";
                    for (let s =
                        0; s <
                         player[i]
                             .badges
                             .length; s++
                    ) {
                        let badge_local =
                            player[
                                i]
                                .badges[
                                s];
                        if (badge_local &&
                            badge_local
                                .length &&
                            badge_local !==
                            "verified"
                        ) {
                            alternateSort
                            (
                                badge_local
                            );
                            result =
                                result + `
                                <div class="player_badge" 
                                    style="background-image: url(./assets/images/items/${badges_paste[badge_local].item}.webp)"
                                    data-bs-toggle="tooltip" data-bs-placement="bottom" 
                                    title="${badges_paste[badge_local].title}">
                                </div>
                            `;
                        }
                    }
                    return result
                }

                glob_players.push(
                    player[i]
                        .name);
                let player_badges_ =
                    getBadges();
                array_.innerHTML =
                    array_
                        .innerHTML +
                    `
                <div class="swiper-slide text-center">
                    <span class="d-block py-3">
                        <img src="${player[i].head}" class="d-block mx-auto" width="154"
                           alt="${player[i].name}" loading="lazy"
                        <div class="card-body p-3">
                            <h3 class="fs-lg fw-semibold pt-1 mb-2">
                                ${player[i].name}
                                ${player[i].badges.includes("verified") ? `
                                    <i class="verified-icon"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    title="Подтвержденный"> ✔</i>
                                ` : ""}
                            </h3>
                            <div class="player_badge_container" style="${!player_badges_.length ? 'display:none' : ''}">
                                ${player_badges_}
                            </div>
                            <p class="fs-sm mb-0">${player[i].desc}</p>
                        </div>
                    </span>
                </div>
            `;
            }

            createSwiper();
        },
        "assets/data/players.json",
        "GET", true
    )
}

function donate_element_click(
    product_data) {
    switch_modal_containers("service");
    let exclude_types = ["group"];
    let desc = document.getElementById(
        "donate_item_select_text");
    let text_template =
        `Товар <span class="text-primary fw-semibold">${product_data.name}</span>,
            цена ${product_data.count} ${getNoun(
            product_data.count,
            "единицы",
            "единиц",
            "единиц"
        )}
        <span class="text-primary fw-semibold">
            ${product_data.price}
            ${getNoun(product_data.price, "рубль", "рубля", "рублей")}
        </span>.
    `;
    let items_count_donate = document
        .getElementById(
            "items_count_donate");
    let count_hint = document
        .getElementById(
            "donate_count_text_hint");
    let add_to_cart = document
        .getElementById(
            "donate_button_add_to_cart"
        );
    let cookie_cart = get_cookie_cart();
    let switch_ = false;

    let _update_count = function () {
        add_to_cart.setAttribute(
            "onClick",
            `donate_cart(${product_data.service_id}, ${items_count_donate.value})`
        );
    };

    items_count_donate.value = 1;

    _update_count();

    let product_in_cart = cookie_cart
        .hasOwnProperty(
            product_data.service_id
                .toString()
        );

    if (
        (exclude_types.includes(
                product_data.type) ||
            product_data.type ===
            "group") &&
        groupAlreadyInCart(
            cookie_cart)
    ) {
        switch_modal_containers("info");
        switch_ = true;
        let group_error = "";

        if (product_data.type ===
            "group") {
            group_error =
                "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую.";
        } else if (product_in_cart) {
            group_error =
                `Ошибка, вы можете добавить товар 
                <span class="text-primary fw-semibold">${product_data.name}</span> 
                только один раз.`;
        } else {
            group_error =
                "Мы не знаем почему, но эта ошибка вызвана по неизвестным причинам.";
        }

        document.getElementById(
            "donate_info_block_text"
        ).innerHTML =
            group_error;
    }

    let count_state = "block";

    if (exclude_types.includes(
        product_data.type)) {
        count_state = "none";
    }

    items_count_donate.style.display =
        count_state;
    count_hint.style.display =
        count_state;

    let only_dig = function () {
        let value =
            items_count_donate
                .value;
        items_count_donate.value =
            value.replace(/\D+/g,
                "");
    };

    let _calculate_price = function () {
        only_dig();

        if (!exclude_types.includes(
            product_data.type
        )) {
            let _price = parseInt(
                    items_count_donate
                        .value) *
                product_data.price;

            let currenct_in_cart =
                cookie_cart[
                    product_data
                        .service_id];
            let template_counter_i =
                "";

            if (isNaN(_price) || 1 >
                Math.sign(_price)) {
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

            desc.innerHTML =
                `${text_template}
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

    items_count_donate.addEventListener(
        "input",
        function (_) {
            _calculate_price();
        });
    modal_open_();
}

function donate_get_service_by_id(id) {
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

function donateResetPaymentState(
    repeat = false) {
    let sl = "_c";
    let vl = document.getElementById(
        "donate_sum").value.trim();
    if (!coins_sell_mode) {
        sl = "";
        vl = "";
    }
    let button = document
        .getElementById(
            "payment-button-donate" + sl
        );
    button.setAttribute("onClick",
        `generatePaymentLink(${vl})`
    );
    button.removeAttribute("disabled");
    button.innerText = repeat ?
        "Повторить" : "Дальше";
}

function donate_cart(product, count,
                     remove = false) {
    let cart = Cookies.get(cart_cookie);
    let cart_parsed = get_cookie_cart();
    let product_count_in_cart = 0;
    let max_item_count = 15000;
    let local_prm =
        '<span style="color: #a4a6ff">';

    try {
        let p = cart_parsed[product];

        if (Number.isInteger(p)) {
            product_count_in_cart = +p;
        }
    } catch (_) {}

    if (!Number.isInteger(product) || !
        Number.isInteger(count)) {
        console.log(
            "Error data donate_cart"
        );
        return;
    } else if (1 > Math.sign(count)) {
        notify(
            "Количество не может быть равно нулю или меньше"
        );
        return;
    } else if (product_count_in_cart +
        count > max_item_count) {
        notify(
            `Максимальное количество - ${local_prm}${max_item_count}</span>`
        );
        return;
    }

    if (!cart) {
        Cookies.set(cart_cookie, JSON
            .stringify({}));
    }

    let els_ = JSON.parse(Cookies.get(
        cart_cookie));
    let product_data =
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
            notify(
                `В корзину добавлено ${local_prm} ${count} 
                    </span>
                    ${getNoun(count, "единица", "единицы", "единиц")} 
                    товара ${local_prm} ${product_data.name} 
                    </span>`
            );
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

function donate_cart_button(els = {}) {
    let selector_ = document
        .querySelectorAll(
            ".donate-cart-button-cn");

    if (coins_sell_mode) {
        return;
    }

    for (let i = 0; i < selector_
        .length; i++) {
        let sl = selector_[i].style;

        if (countProperties(els)) {
            sl.display = "flex";
            setTimeout(function () {
                sl.opacity = 1;
                sl.marginTop =
                    "15px";
                selector_[i]
                    .removeAttribute(
                        "disabled"
                    );
            }, 50);
        } else {
            selector_[i].setAttribute(
                "disabled", "");
            sl.opacity = 0;
            sl.marginTop = "-50px";
            setTimeout(function () {
                sl.display =
                    "none";
            }, 350);
        }
    }
}

function donateFlushCart() {
    Cookies.remove(cart_cookie);
    donate_cart_button({});
    notify("Корзина очищена");
}

function couponCheck(coins = false) {
    let selector_c = "";
    if (coins_sell_mode) {
        selector_c = "-c"
    }

    let input = document.getElementById(
        "coupon-input" + selector_c);
    let button = document
        .getElementById(
            "coupon-button" + selector_c
        );
    let code = "";

    try {
        code = input.value.trim()
    } catch (_) {}

    let coupon_notfd = function () {
        notify(
            `Купон <span class="text-primary fw-semibold">${failed_coupon}</span> не найден`
        )
    }

    let check_coupon_coins = function (
        products) {
        if (products) {
            for (let i = 0; i <
            products.length; i++
            ) {
                if (products[i]
                        .id ===
                    donate_services_array[
                        0].id) {
                    return true
                }
            }
        }
        return false
    }

    if (!code.length) {
        notify("Вы не указали купон");
        return;
    } else if (code.length > 20) {
        notify("Купон слишком длинный");
        return;
    } else if (!/^[A-z\d_]+$/.test(
        code)) {
        notify("Купон указан неверно");
        return;
    } else if (checked_coupon ===
        code) {
        notify(
            "Этот купон уже используется"
        );
        return;
    } else if (failed_coupon === code) {
        coupon_notfd();
        return;
    }

    let input_lock = function (lock =
                                   false) {
        if (lock) {
            input.setAttribute(
                "disabled", "");
            button.setAttribute(
                "disabled", "");
            button.innerText =
                "Проверяем";
        } else {
            input.removeAttribute(
                "disabled");
            button.removeAttribute(
                "disabled");
            button.innerText =
                "Проверить";
        }
    };

    input_lock(true);
    check_coupon(function (r) {
        if (r) {
            let call =
                function () {
                    checked_coupon
                        = code;
                    notify(
                        `Купон <span class="text-primary fw-semibold">${code}</span> действительный`
                    );
                }
            if (!
                coins_sell_mode
            ) {
                call();
                donateCartCall
                (code,
                    false)
            } else if (
                check_coupon_coins(
                    r.products)
            ) {
                call();
                let sl =
                    document
                        .getElementById(
                            "donate-coins-payment"
                        );
                sl.innerHTML =
                    `<li class="list-group-item d-flex justify-content-between bg-light">
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
                )
            }
        } else {
            failed_coupon =
                code;
            coupon_notfd()
        }

        input_lock();
    }, code);
}

function donate_enable_coupon(enabled =
                                  true) {
    let input = document.getElementById(
        "coupon-input");
    let button = document
        .getElementById(
            "coupon-button");

    if (enabled) {
        input.setAttribute(
            "placeholder", "BRFF");
        button.setAttribute("onClick",
            "couponCheck()");
        input.removeAttribute(
            "disabled");
        button.removeAttribute(
            "disabled");
    } else {
        input.setAttribute("disabled",
            "");
        input.setAttribute(
            "placeholder",
            "Сейчас недоступно");
        button.setAttribute("disabled",
            "");
    }
}

function generatePaymentLink(sum =
                                 0) {
    let selector_c = "";
    if (coins_sell_mode) {
        selector_c = "_c"
    }
    let button = document
        .getElementById(
            "payment-button-donate" +
            selector_c);
    let customer = document
        .getElementById(
            "donate_customer" +
            selector_c).value.trim();
    let email = document.getElementById(
        "donate_email" + selector_c)
        .value.trim();
    let coupon = "";
    let max_sum = 15000;
    let local_prm =
        '<span style="color: #a4a6ff">';

    try {
        coupon = checked_coupon.trim()
    } catch (_) {};

    if (!Number.isInteger(sum) || !
        Number.isInteger(sum)) {
        notify("Ошибка проверки суммы");
        return;
    } else if (1 > Math.sign(sum)) {
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

    if (!customer.length) {
        notify(
            "Введите пожалуйста ваш никнейм"
        );
        return;
    } else if (customer.length > 40) {
        notify(
            "Ваш никнейм слишком длинный"
        );
        return;
    } else if (!/^[A-z\d_]+$/.test(
        customer)) {
        notify(
            "Никнейм не соотвествует формату"
        );
    }

    if (!email.length) {
        email = "";
    } else if (!validateEmail(email)) {
        notify(
            "Ошибка, адрес почты недействительный"
        );
        return;
    }

    if (!coupon) {
        coupon = "";
    }

    if (coins_sell_mode) {
        products = JSON.parse(
            `{"${donate_services_array[0].id}": ${sum}}`
        )
    } else {
        products = get_cookie_cart()
    }

    button.setAttribute("disabled", "");
    button.innerText =
        "Проверяем данные...";
    create_payment(
        function (callback_data) {
            if (callback_data) {
                button
                    .removeAttribute(
                        "disabled");
                button.innerText =
                    "Оплатить";
                payment_url_global =
                    callback_data
                        .url;
                button.setAttribute(
                    "onClick",
                    "payment_action_bt()"
                );
            } else {
                notify(
                    "Ошибка, не удалось сформировать чек для оплаты"
                );
                donateResetPaymentState
                (true);
            }
        }, customer, products,
        email, coupon
    );
}

function payment_action_bt() {
    window.open(payment_url_global,
        "_blank");

    let cart_dom = document
        .getElementById(
            "donate-cart-list-success");
    let succ_text = document
        .getElementById(
            "success-pay-text-js");
    let cont_ok = document
        .getElementById(
            "only-ok-payment");
    let title = document.querySelector(
        ".modal-title");

    let build_modal_wind = function () {
        cart_dom.innerHTML = "";
        title.innerText = "";
        succ_text.innerText =
            "Давай, плати. Шеф ждёт...";
        cont_ok.style.display = "";
        document.querySelector(
            "img.payment-sucess-vova"
        ).setAttribute(
            "src",
            "assets/images/vova-gay.webp"
        )
    }

    let flush_inputs_donate =
        function () {
            let inputs = [
                "donate_sum",
                "donate_customer_c",
                "donate_email_c",
                "coupon-input-c"
            ];
            for (let i = 0; i < inputs
                .length; i++) {
                document.getElementById(
                    inputs[i])
                    .value = ""
            }
        }

    let enable_modal = function () {
        switch_modal_containers(
            "success");
        modal_open_();
        build_modal_wind();
        donateResetPaymentState
        ();
        flush_inputs_donate()
    }

    enable_modal();
}

function donate_check_services_cart() {
    let services_cookie = Object.keys(
        get_cookie_cart());
    let services_origin =
        donate_services_array;
    let services = [];

    for (let i = 0; i < services_origin
        .length; i++) {
        services.push(services_origin[i]
            .id);
    }

    for (let i = 0; i < services_cookie
        .length; i++) {
        if (!services.includes(parseInt(
            services_cookie[i]))) {
            let cart = JSON.parse(
                Cookies.get(
                    cart_cookie));
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

function initDonate() {
    let els = {};

    try {
        els = JSON.parse(Cookies.get(
            cart_cookie));
    } catch (_) {}

    donate_cart_button(els);
    donate_enable_coupon(true);
}

function donateCartCall(coupon = null,
                        nickname_update = true) {
    let cart = get_cookie_cart();
    let cart_keys = Object.keys(cart);
    let cart_dom = document
        .getElementById(
            "donate-cart-list");
    let selectors_payment = [
        document.getElementById(
            "donate_customer"),
        document.getElementById(
            "donate_email"),
        document.getElementById(
            "coupon-input")
    ];
    switch_modal_containers(
        "donate_finish");
    modal_open_();
    cart_dom.innerHTML = "";
    let sum_price = 0;

    for (let i = 0; i <
    selectors_payment.length; i++) {
        selectors_payment[i]
            .addEventListener("input",
                function (_) {
                    donateResetPaymentState
                    ();
                });
    }

    for (let i = 0; i < cart_keys
        .length; i++) {
        let item =
            donate_get_service_by_id(
                cart_keys[i]);
        let price = item.price * cart[
            item.id];
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

    let coupon_container = function () {
        cart_dom.innerHTML =
            cart_dom.innerHTML +
            `<li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-primary">
                    <h6 class="my-0 text-start">Купон</h6>
                    <small class="text-start" style="float: left">${coupon}</small>
                </div>
            </li>`;
    };

    let sum_container = function () {
        cart_dom.innerHTML =
            cart_dom.innerHTML +
            `<li class="list-group-item d-flex justify-content-between">
                <span>Сумма</span>
                <strong>${sum_price} ${getNoun(
                sum_price,
                "рубль",
                "рубля",
                "рублей"
            )}</strong>
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
                "input#donate_customer")
            .setAttribute("placeholder",
                glob_players[0]);
    }
}

function donateCoinsPay() {
    let button = document
        .getElementById(
            "payment-button-donate_c");
    let sum = document.getElementById(
        "donate_sum");

    if (!/^[\d]+$/.test(sum.value)) {
        sum = 0
    } else {
        sum = sum.value
    }

    button.setAttribute("onClick",
        `generatePaymentLink(${sum})`
    )
}

function donateModalCall(
    nickname_update = true) {
    let sum = document.getElementById(
        "donate_sum");
    let selectors_payment = [
        document.getElementById(
            "donate_sum"), document
            .getElementById(
                "donate_customer_c"),
        document.getElementById(
            "donate_email_c"),
        document.getElementById(
            "coupon-input-c"),
    ];

    for (let i = 0; i <
    selectors_payment.length; i++) {
        selectors_payment[i]
            .addEventListener("input",
                function (_) {
                    donateResetPaymentState
                    ()
                })
    };

    switch_modal_containers(
        "service_coins");
    modal_open_();

    if (nickname_update) {
        shuffle(glob_players);
        document
            .querySelector(
                "input#donate_customer_c"
            )
            .setAttribute("placeholder",
                glob_players[0]);
    }

    sum.addEventListener("input",
        function (_) {
            donateCoinsPay()
        });
}

function linksSet(selector_,
                  fisrt_el_mrg = false) {
    let sl = document.getElementById(
        selector_);
    let mrg =
        "margin-left: 0 !important";

    for (let i = 0; i < links_lt
        .length; i++) {
        if (!fisrt_el_mrg || i) {
            mrg = "";
        }

        sl.innerHTML =
            sl.innerHTML +
            `<a href="${links_lt[i].link}" 
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
        getCrypto(function (token_) {
            crypto_token =
                token_;
            freeze_crypto =
                false;
        })
    }
}

function initLanding() {
    if (development_hosts.includes(
            window.location.hostname) &&
        lock_of) {
        document.getElementById(
            "landing_description_gb"
        ).innerText =
            "Этот сайт - preview-версия!";
        document.getElementById(
            "donate-test-mode-enb")
            .innerText =
            "Этот блок работает в демонстративном режиме и не является функциональным.";
    }

    linksSet("landing-links-tp",
        true);
    linksSet("links-block-footer-v")
}

function finishLoad() {
    document.querySelector("main")
        .setAttribute("style", "");
    document.querySelector("footer")
        .setAttribute("style", "");
    let heart =
        "<i class=\"emoji\" style=\"background-image:url('assets/images/emoji/red-heart.png');font-size: 0.95rem\"><b>❤️</b></i>";
    document.getElementById(
        "footer-text-blc"
    ).innerHTML =
        `Создал KovalYRS с ${heart}, специально для ZALUPA.ONLINE`;
    if (grecaptcha) {
        document.getElementById(
            "re-badge-text")
            .innerText =
            "This site uses Google ReCaptcha technology"
    }
}

function observerSystemTheme() {
    let mode_list = ["dark", "light"];
    let theme_switch = document
        .querySelector(
            '[data-bs-toggle="mode"]'
        ).querySelector(
            ".form-check-input"
        );

    let updateTheme = (mode) => {
        if (mode === "dark") {
            root.classList.add(
                "dark-mode");
            theme_switch.checked =
                true;
        } else {
            root.classList.remove(
                "dark-mode");
            theme_switch.checked =
                false;
        }
    }

    for (let i = 0; i < mode_list
        .length; i++) {
        let observer = window
            .matchMedia(
                `(prefers-color-scheme: ${mode_list[i]})`
            );
        observer.addEventListener(
            "change",
            e => e.matches &&
                updateTheme(mode_list[
                    i])
        );
    }
}

function callSucessPayModal(
    payment_id = 0) {
    let cart_dom = document
        .getElementById(
            "donate-cart-list-success");
    let succ_text = document
        .getElementById(
            "success-pay-text-js");
    let cont_ok = document
        .getElementById(
            "only-ok-payment");
    let title = document.querySelector(
        ".modal-title");

    donateSwitchContainer(display =
        true);

    let buildPayment = function (
        payment) {
        if (payment.status && (
            payment_id ==
            parseInt(payment.id)
        )) {
            succ_text.innerText =
                "Оплата прошла успешно, Шеф доволен, спасибо тебе.";
            cont_ok.style.display =
                "";

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
                    <strong class="text-primary">${payment.enrolled} ${getNoun(
                payment.enrolled,
                "рубль",
                "рубля",
                "рублей"
            )}</strong>
                </li>
            `;

            if (coins_sell_mode) {
                sum_template = `
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Сумма</span>
                        <strong class="text-primary">${payment.enrolled} ${getNoun(
                    payment.enrolled,
                    "токен",
                    "токена",
                    "токенов"
                )}</strong>
                    </li>
                `
            }

            if (!payment.enrolled ||
                payment.enrolled < 1
            ) {
                sum_template = "";
            }
            if (!payment.email
                .length || payment
                .email.match(
                    "undefined")) {
                payment.email =
                    "Ну указано"
            };
            if (!payment
                    .payment_system ||
                payment
                    .payment_system
                    .match("undefined")
            ) {
                system_template =
                    "";
            };
            if (!payment
                .created_at || !
                payment.created_at
                    .length) {
                payment.created_at =
                    "Неизвестно"
            } else {
                let parsed_time =
                    new Date(payment
                        .created_at
                    );
                payment.created_at =
                    `${parsed_time.toLocaleDateString()} ${parsed_time.toLocaleTimeString()}`
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
            succ_text.innerText =
                "Чек неоплачен, Шеф недоволен.";
            document.querySelector(
                "img.payment-sucess-vova"
            ).setAttribute(
                "src",
                "assets/images/vova-fail.webp"
            );
        }
    }

    let enable_modal = function (
        payment) {
        buildPayment(payment);
        switch_modal_containers(
            "success");
        modal_open_();
    }

    checkPayment(function (payment) {
        if (typeof payment
                .status !==
            'undefined') {
            enable_modal(
                payment);
            title.innerText =
                `Чек #${payment.id}`;
        } else {
            notify(
                "Ошибка, чек не найден или EasyDonate вернул недействительный ответ"
            );
        }
    }, payment_id);
}

function successPay() {
    let url = new URL(window.location
        .href).searchParams;
    let payment_id = url.get(
        "pg_order_id");

    if (payment_id) {
        callSucessPayModal(
            payment_id);
    }
}

function donateContainerHash() {
    let updater = function () {
        if (linkHash() ==
            "donate") {
            donate_displayed = true;
            donateSwitchContainer(
                display = true);
        }
    }

    updater();
    window.onhashchange = updater;
}

function initTooltip() {
    let tooltipTriggerList = [].slice
        .call(document.querySelectorAll(
            '[data-bs-toggle="tooltip"]'
        ));
    let tooltipList = tooltipTriggerList
        .map(function (
            tooltipTriggerEl) {
            tooltip_instance =
                new bootstrap
                    .Tooltip(
                        tooltipTriggerEl, {
                            template: `
                                <div class="tooltip" role="tooltip">
                                    <div class="tooltip-inner"></div>
                                </div>
                            `,
                            delay: { show: 0, hide: 0 }
                        });
        });

    if (tooltip_instance) {
        setInterval(function () {
            tooltip_instance
                .update();
        }, 1000);
    }
}

const initCore = function () {
    initHost();
    initCrypto();
    initLanding();
    observerSystemTheme();
    donateContainerHash();
    buildPlayersSwiper();
    appendPostsNews();
    initComments();
    appendServices();
    updateCartCount();
    gameServerUpdater();
    initDonate();
    initEventsList();
    finishLoad();
    successPay();
    ytVideoSetter(skip = true);

    let elem = document
        .getElementById(
            "dark-perm-set-bv");
    elem.parentNode.removeChild(
        elem);

    window.onload = function () {
        let preloader = document
            .querySelector(
                ".page-loading"
            );
        let wait = 800;
        let move_wait = 100;
        setTimeout(function () {
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
                    ""
            }
            window
                .scrollTo({
                    top: 0
                })
        }, wait);
        setTimeout(function () {
            preloader
                .remove();

            // after tasks
            initTooltip
            ();
        }, wait +
            move_wait);
    }
}

script_core.onload = function () {
    initCore();
}
