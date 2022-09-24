"use strict";

const site_domains = {
    "prod": domain_site,
    "dev": development_hosts[0],
    "test": development_hosts[1]
};
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
const coins_sell_mode = true;
var donate_services_array = [];
var notify_hidden = true;
var glob_players = [];
var timer_notify;
var swiper_comments;
var payment_url_global;
var checked_coupon = "";
var failed_coupon = "";
var events_page_state = "news";
var donate_displayed = false;
var work_domain_v = "zalupa.online";

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

function getImageLightness(imageSrc, callback) {
    let img = document.createElement("img");
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.style.display = "none";
    document.body.appendChild(img);

    let colorSum = 0;

    img.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let data = imageData.data;
        let r,g,b,avg;

        for(let x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        let brightness = Math.floor(colorSum / (this.width*this.height));
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

function get_events_(callback) {
    request_call(
        function (r) {
            return callback(r.events)
        },
        `${backend_host}/events`,
        "GET",
        true
    );
}

function get_news_(callback, source) {
    request_call(
        function (r) {
            return callback(r.messages)
        },
        `${backend_host}/channel_parse?choice=${source}`,
        "GET",
        true
    );
}

function append_posts_news() {
    let array_ = document.getElementById("news_swipe_array");

    const create_swiper = function () {
        new Swiper("#news_swipe_container", {
            spaceBetween: 12,
            loop: true,
            observer: true,
            observeParents: true,
            preventClicks: false,
            preventClicksPropagation: false,
            autoplay: {
                delay: 1000 * 10
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
    };

    get_news_(function (posts) {
        posts = posts.reverse();
        for (let i = 0; i < posts.length; i++) {
            const text = posts[i].text;
            const text_array = text.split('<br>');
            const datetime = new Date(posts[i].datetime_utc);
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
            const selector_bg = document.getElementById(`background-news-${i}`);
            const selector_text = document.getElementById(`news_text_${i}`);
            selector_bg.style.backgroundImage = `url(${posts[i].cover})`;
            selector_text.classList.add("text-light");
            const text_len = selector_text.innerText.length;
            const text_split = selector_text.innerText.split(" ");
            const font_size = ((text_len - -8) * .4) / 100;
            selector_text.style.fontSize = `calc(${
                parseFloat(1.8-font_size)
            }vw + ${
                parseFloat(1.8-font_size)
            }vh + ${
                parseFloat(1.6-font_size)
            }vmin)`;
            getImageLightness(posts[i].cover,function(brightness){
                const style_ = `#000000${
                    (((parseFloat(brightness) / 255.0) * 100.0).toFixed() + 16).toString(16).slice(0, 2)
                }`;
                document.getElementById(`news-overlay-${i}`).style.background = style_
            })
        }
        const loading_done = function() {setTimeout(function () {
            const sl = document.getElementById("telegram_block_load");
            const container_news = document.getElementById("news_zlp_buttons");

            try {
                sl.parentNode.removeChild(sl);
                container_news.style.display = ""
            } catch (_) {
            }
        }, 150)}
        if (posts) {
            create_swiper();
            loading_done();
        }
    }, 1)
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
            callback(r.body)
        },
        `${backend_host}/server`,
        "GET",
        true
    );
}

function monitoring_game_server_update() {
    get_game_server_data(function (data) {
        if (data.online) {
            let selector = document.getElementById("server_online_status");
            selector.classList.remove("loading-dots");
            selector.innerHTML = `Сейчас играет <span class="text-primary fw-semibold">${
                data.online
            }</span>
            <i class="emoji male-emoji" style="margin-left: -.35rem!important;background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            ${getNoun(data.online)}
            <i class="emoji male-emoji" style="background-image:url('assets/images/emoji/male.png')"><b>♂</b></i>
            `;
        }
    });
}

function game_server_updater() {
    monitoring_game_server_update();
    setInterval(monitoring_game_server_update, 2000);
}

function init_events_list() {
    let row_container = document.getElementById("events-row-container");
    let loader_ = document.getElementById("events_block_load");
    let switch_button_ = document.getElementById("events-c-button");
    let row_class = [
        "row-cols-md-2",
        "row-cols-lg-3",
        "row-cols-xl-4"
    ];

    get_events_(function(data) {
        if (data && data.length) {
            events_block_load.remove();

            data.sort(function(a, b) {
                var keyA = new Date(a.date_start),
                    keyB = new Date(b.date_start);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            })

            for (let i = 0; i < data.length; i++) {
                switch_button_.removeAttribute("disabled");
                if (3 > i > 0) {
                    row_container.classList.add(row_class[i])
                }
                let st_date = new Date(data[i].date_start);
                let end_date = new Date(data[i].date_end);
                let time_in_moscow = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}))
                let badge = "";
                if (st_date > time_in_moscow) {
                    badge = "Скоро"
                } else if (time_in_moscow > end_date) {
                    badge = "Завершено"
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
                row_container.innerHTML = row_container.innerHTML + template_
            }
        }
    })
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
                        callback(r.services)
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
                        callback(r.payment)
                    },
                    `${backend_host}/donate/payment/create`,
                    "POST",
                    true, {
                        customer: customer,
                        products: products,
                        email: email,
                        coupon: coupon,
                        token: token_update,
                        success_url: `https://${work_domain_v}`
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
                        if (r.coupon) {
                            callback(r.coupon)
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
                        callback(r.payment);
                    },
                    `${backend_host}/donate/payment_get`,
                    "POST",
                    true, {
                        payment_id: parseInt(payment_id),
                        token: token_update,
                        tokens_send: coins_sell_mode
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
            donate_check_services_cart();

            for (let i = 0; i < services.length; i++) {
                let click_data = {
                    name: services[i].name,
                    price: services[i].price,
                    count: services[i].number,
                    description: services[i].description,
                    type: services[i].type,
                    service_id: services[i].id
                };
                let _name = "";
                let _desc = "";
                let padding_desc = "p-3";
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

                if (i && size_classes.length >= i) {
                    sl.classList.add(size_classes[i - 1]);
                }

                let click_template = `onClick="donate_element_click(${JSON.stringify(
                    click_data
                )})"`

                if (!coins_sell_mode) {
                    _name = services[i].name
                } else {
                    _name = `${services[i].price} ${getNoun(
                        services[i].price, "рубль", "рубля", "рублей"
                    )} = ${services[i].number} ${getNoun(
                        services[i].number, "токен", "токена", "токенов"
                    )}`;
                    padding_desc = "p-0";
                    desc_template = `
                        <p class="mb-0 token-description-dnt">
                            Деньги не возвращаем. Даже не пробуй жаловаться v0kky.
                        </p>`;

                    click_template = ""
                }

                sl.innerHTML =
                    sl.innerHTML +
                    `
                    <div class="col" id="donate_item_${services[i].id}">
                        <div class="card border-0 bg-transparent" ${click_template}>
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
                          <div class="card-body text-center ${padding_desc}">
                                <h3 class="fs-lg fw-semibold pt-1 mb-2">${_name}</h3>
                                ${desc_template}
                          </div>
                        </div>
                    </div>
                `;
            }

            setTimeout(function () {
                const elem = document.getElementById("donate_block_load");
                const butt = document.getElementById("donate-button-container")
                const ids = [
                    "donate_items_list", "donate-title-desc",
                    "donate-test-mode-enb", "donate-cart-container"
                ];

                try {
                    elem.parentNode.removeChild(elem);
                } catch (_) {
                }

                if (coins_sell_mode) {
                    butt.style.display = ""
                }

                for (let i = 0; i < ids.length; i++) {
                    try {
                        document.getElementById(ids[i]).style.display = ""
                    } catch (e) {
                        console.log(`Donate block loader error. Details: ${e}`)
                    }
                }
            }, 100);
        }
    });
}

function switch_events_pages(button_name) {
    let news_page = document.getElementById("news-c-container");
    let events_page = document.getElementById("events-c-container");

    let news_button = document.getElementById("news-c-button");
    let events_button = document.getElementById("events-c-button");

    if (button_name !== events_page_state) {
        if (button_name === "events") {
            news_page.style.display = "none";
            events_page.style.display = "block";

            news_button.removeAttribute("disabled");
            events_button.setAttribute("disabled", "");

            events_page.style.top = "0";
            news_page.style.top = "-2rem";

            events_page_state = "events"
        } else if (button_name === "news") {
            news_page.style.display = "block";
            events_page.style.display = "none";
            
            news_button.setAttribute("disabled", "");
            events_button.removeAttribute("disabled");

            events_page.style.top = "-2rem";
            news_page.style.top = "0";

            events_page_state = "news"
        }
    }
}

function redirect_(url) {
    return window.location.replace(url);
}

function modal_close_() {
    document.body.classList.remove("modal-open");
    document.getElementById("scroll_butt_container").style.display = "";
    let modal = document.getElementById("donate_item_modal");
    modal.style.opacity = 0;
    setTimeout(function () {
        modal.style.display = "none";
    }, 350);
}

function modal_open_() {
    document.body.classList.add("modal-open");
    document.getElementById("scroll_butt_container").style.display = "none";
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
    const service_coins = document.getElementById("modal-donate-finish-container-b");
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
            name: "service_coins",
            selector: service_coins,
            title: "Оплата пожертвования"
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

function comment_show_action(id, close= false) {
    const comment_text = document.getElementById(`comment_text_${id}`);
    const comment_show = document.getElementById(`comment_show_${id}`);

    swiper_comments.on('slideChange', function () {
        comment_show_action(id, true)
    });

    if (close || comment_text.getAttribute("fullShowComment") === "1") {
        comment_text.style.height = "100px";
        comment_text.setAttribute("fullShowComment", "0");
        comment_show.innerText = "Раскрыть"
    } else {
        comment_text.style.height = "100%";
        comment_text.setAttribute("fullShowComment", "1");
        comment_show.innerText = "Скрыть"
    }
}

function comments_init() {
    let array_ = document.getElementById("comment_swipe_array");

    const create_swiper = function () {
        swiper_comments = new Swiper("#comment_swipe_container", {
            spaceBetween: 12,
            loop: true,
            observer: true,
            observeParents: true,
            preventClicks: false,
            preventClicksPropagation: false,
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
                                    <span class="frame_badge_adaptive">${comment[i].sign}</span>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                `;

                const comment_text = document.getElementById(`comment_text_${i}`);
                const comment_show = document.getElementById(`comment_show_${i}`);

                comment_show.style.fontWeight = "400";
                comment_text.style.transition = "height 0.8s cubic-bezier(1, -0.3, 0, 1.21) 0s";
                comment_text.setAttribute("fullShowComment", "0");
                const correction_height = 12;

                if (comment_text.clientHeight > (100 + correction_height)) {
                    comment_text.style.height = "100px";
                    comment_text.style.overflow = "hidden";
                } else {
                    comment_show.style.display = "none"
                }
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
            preventClicks: false,
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
                let ult_template = "";
                if (player[i].badge) {
                    ult_template =
                        `<h6 class="fs-lg fw-semibold pt-1 mb-2 frame_badge_adaptive player_badge">
                            ${player[i].badge.toUpperCase()}
                        </h6>`
                }
                glob_players.push(player[i].name);
                array_.innerHTML =
                    array_.innerHTML +
                    `
                <div class="swiper-slide text-center">
                    <span class="d-block py-3">
                        <img src="${player[i].head}" class="d-block mx-auto" width="154"
                           alt="${player[i].name}" loading="lazy"
                        <div class="card-body p-3">
                            <h3 class="fs-lg fw-semibold pt-1 mb-2">${player[i].name}</h3>
                            ${ult_template}
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
                `Ошибка, вы можете добавить товар 
                <span class="text-primary fw-semibold">${product_data.name}</span> 
                только один раз.`;
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
                template_counter_i =  `
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
    let sl = "_c";
    let vl = document.getElementById("donate_sum").value.trim();
    if (!coins_sell_mode) {
        sl = "";
        vl = "";
    }
    const button = document.getElementById("payment-button-donate" + sl);
    button.setAttribute("onClick", `generate_payment_link(${vl})`);
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
    } else if (1 > Math.sign(count)) {
        notify("Количество не может быть равно нулю или меньше");
        return;
    } else if (product_count_in_cart + count > max_item_count) {
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

    Cookies.set(cart_cookie, JSON.stringify(els_));
    modal_close_();
    init_donate();
    update_cart_count();
    donate_reset_payment_state();
}

function donate_cart_button(els = {}) {
    const selector_ = document.querySelectorAll(".donate-cart-button-cn");

    if (coins_sell_mode) {
        return;
    }

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

function coupon_check(coins=false) {
    let selector_c = "";
    if (coins_sell_mode) { selector_c = "-c" }

    const input = document.getElementById("coupon-input"+selector_c);
    const button = document.getElementById("coupon-button"+selector_c);
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

    const check_coupon_coins = function (products) {
        if (products) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === donate_services_array[0].id) {
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
            const call = function () {
                checked_coupon = code;
                notify(
                    `Купон <span class="text-primary fw-semibold">${code}</span> действительный`
                );
            }
            if (!coins_sell_mode) {
                call();
                donate_cart_call(code, false)
            } else if (check_coupon_coins(r.products)) {
                call();
                let sl = document.getElementById("donate-coins-payment");
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
                notify("Этот купон недействительный")
            }
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

function generate_payment_link(sum= 0) {
    let selector_c = "";
    if (coins_sell_mode) { selector_c = "_c" }
    const button = document.getElementById("payment-button-donate" + selector_c);
    const customer = document.getElementById("donate_customer" + selector_c).value.trim();
    let email = document.getElementById("donate_email" + selector_c).value.trim();
    let coupon = "";
    const max_sum = 15000;
    const local_prm = '<span style="color: #a4a6ff">';

    try {
        coupon = checked_coupon.trim()
    } catch (_) {
    }
    ;

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
        products = JSON.parse(`{"${donate_services_array[0].id}": ${sum}}`)
    } else {
        products = get_cookie_cart()
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
        products,
        email,
        coupon
    );
}

function payment_action_bt() {
    window.open(payment_url_global, "_blank");

    const cart_dom = document.getElementById("donate-cart-list-success");
    const succ_text = document.getElementById("success-pay-text-js");
    const cont_ok = document.getElementById("only-ok-payment");
    const title = document.querySelector(".modal-title");

    const build_modal_wind = function () {
        cart_dom.innerHTML = "";
        title.innerText = "";
        succ_text.innerText =
            "Давай, плати. Шеф ждёт...";
        cont_ok.style.display = "";
        document.querySelector("img.payment-sucess-vova").setAttribute(
            "src", "assets/images/vova-gay.webp")
    }

    const flush_inputs_donate = function () {
        const inputs = [
            "donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c"
        ];
        for (let i = 0; i < inputs.length; i++) {
            document.getElementById(inputs[i]).value = ""
        }
    }

    const enable_modal = function () {
        switch_modal_containers("success");
        modal_open_();
        build_modal_wind();
        donate_reset_payment_state();
        flush_inputs_donate()
    }

    enable_modal();
}

function donate_check_services_cart() {
    const services_cookie = Object.keys(get_cookie_cart());
    const services_origin = donate_services_array;
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

function init_donate() {
    let els = {};

    try {
        els = JSON.parse(Cookies.get(cart_cookie));
    } catch (_) {
    }

    donate_cart_button(els);
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
            `<li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-primary">
                    <h6 class="my-0 text-start">Купон</h6>
                    <small class="text-start" style="float: left">${coupon}</small>
                </div>
            </li>`;
    };

    const sum_container = function () {
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
            .querySelector("input#donate_customer")
            .setAttribute("placeholder", glob_players[0]);
    }
}

function donate_coins_pay() {
    const button = document.getElementById("payment-button-donate_c");
    let sum = document.getElementById("donate_sum");

    if (!/^[\d]+$/.test(sum.value)) {
        sum = 0
    } else { sum = sum.value }

    button.setAttribute("onClick", `generate_payment_link(${sum})`)
}

function donate_modal_call(nickname_update= true) {
    const sum = document.getElementById("donate_sum");
    const selectors_payment = [
        document.getElementById("donate_sum"),
        document.getElementById("donate_customer_c"),
        document.getElementById("donate_email_c"),
        document.getElementById("coupon-input-c"),
    ];

    for (let i = 0; i < selectors_payment.length; i++) {
        selectors_payment[i].addEventListener("input", function (_) {
            donate_reset_payment_state()
        })
    };

    switch_modal_containers("service_coins");
    modal_open_();

    if (nickname_update) {
        shuffle(glob_players);
        document
            .querySelector("input#donate_customer_c")
            .setAttribute("placeholder", glob_players[0]);
    }

    sum.addEventListener("input", function (_) {
        donate_coins_pay()
    });
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
            `<a href="${links_lt[i].link}" 
                target="_blank" style="${mrg}"
                class="btn btn-icon btn-secondary btn-${links_lt[i].name} mx-2">
                    <i class="bx bxl-${links_lt[i].name}"></i>
            </a>`;
    }
}

function discord_init() {
    let src = "https://discordapp.com/widget?id=259124796971941890&theme=dark";
    let container = document.getElementById("discord-embed");
    container.innerHTML =
        `<iframe 
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            src="${src}" width="100%" height="300px" id="discord-iframe" 
            allowTransparency="true" frameBorder="0" loading="lazy" 
        ></iframe>`;
}

function init_landing() {
    if (development_hosts.includes(window.location.hostname) && lock_of) {
        document.getElementById("landing_description_gb").innerText =
            "Этот сайт - preview-версия!";
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
    let heart = "<i class=\"emoji\" style=\"background-image:url('assets/images/emoji/red-heart.png');font-size: 0.95rem\"><b>🤫</b></i>";
    document.getElementById(
        "footer-text-blc"
    ).innerHTML = `Создал KovalYRS с ${heart}, специально для ZALUPA ONLINE`;
    if (grecaptcha) {
        document.getElementById("re-badge-text").innerText =
            "This site uses Google ReCaptcha technology"
    }
}

function call_sucess_pay_modal(payment_id = 0) {
    const cart_dom = document.getElementById("donate-cart-list-success");
    const succ_text = document.getElementById("success-pay-text-js");
    const cont_ok = document.getElementById("only-ok-payment");
    const title = document.querySelector(".modal-title");

    const build_payment = function (payment) {
        if (payment.status && (payment_id == parseInt(payment.id))) {
            succ_text.innerText =
                "Оплата прошла успешно, Шеф доволен, спасибо тебе.";
            cont_ok.style.display = "";

            let system_template = `
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 class="my-0 text-start">
                            Система
                        </h6>
                    </div>
                    <span>${payment.payment_system}</span>
                </li>
            `

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
            `

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

            if (!payment.enrolled || payment.enrolled < 1) {
                sum_template = ""
            }
            if (!payment.email.length || payment.email.match("undefined")) {
                payment.email = "Ну указано"
            };
            if (!payment.payment_system || payment.payment_system.match("undefined")) {
                system_template = ""
            };
            if (!payment.created_at || !payment.created_at.length) {
                payment.created_at = "Неизвестно"
            } else {
                const parsed_time = new Date(payment.created_at);
                payment.created_at = `${parsed_time.toLocaleDateString()} ${parsed_time.toLocaleTimeString()}`
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
            `
        } else {
            succ_text.innerText =
                "Чек неоплачен, Шеф недоволен.";
            document.querySelector("img.payment-sucess-vova").setAttribute(
                "src", "assets/images/vova-fail.webp")
        }
    }

    const enable_modal = function (payment) {
        build_payment(payment);
        switch_modal_containers("success");
        modal_open_()
    }

    check_payment(function (payment) {
        if (typeof payment.status !== 'undefined') {
            enable_modal(payment);
            title.innerText = `Чек #${payment.id}`
        } else {
            notify("Ошибка, чек не найден или EasyDonate вернул недействительный ответ")
        }
    }, payment_id)
}

function success_pay() {
    let url = new URL(window.location.href).searchParams;
    let payment_id = url.get("pg_order_id");

    if (payment_id) {
        call_sucess_pay_modal(payment_id);
    }
}

const init_core = function () {
    init_host_();
    init_landing();
    build_players_swiper();
    append_posts_news();
    comments_init();
    append_services();
    update_cart_count();
    game_server_updater();
    init_donate();
    init_events_list();
    finish_load();
    success_pay();

    let elem = document.getElementById("dark-perm-set-bv");
    elem.parentNode.removeChild(elem);

    window.onload = function () {
        let preloader = document.querySelector(".page-loading");
        let wait = 500;
        let move_wait = 100;
        setTimeout(function () {
            preloader.classList.remove("active");
        }, wait);
        setTimeout(function () {
            preloader.remove();
        }, wait + move_wait);
    }
};

script_core.onload = function () {
    init_core()
}
