const _body = $("body")

const cart_cookie = "cart_box"
const channels = 2
const backend_host = "https://backend.zalupa.world"
var donate_services_array = []
var notify_hidden = true
var timer_notify = null

function shuffle(array) {
    let currentIndex = array.length, randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
    return array
}

function notify(text) {
    const error_box = $(".error_box_cst")
    const error_text = $(".error_text_cst")
    const scroll_top = $(".btn-scroll-top")

    let notify_hide = function () {
        error_box.css("margin-bottom", "-150px")
        scroll_top.attr("style", "")
        notify_hidden = true
    }

    let notify_display = function () {
        notify_hidden = false
        error_text.html(text)
        scroll_top.css("bottom", `calc(
            ${document.getElementById("error_box_cst_id").offsetHeight}px + 1em
        )`)
        error_box.css("margin-bottom", "0")
    }

    if (notify_hidden) {
        notify_display()
    } else {
        notify_hide()
        setTimeout(notify_display, 200)
    }

    clearTimeout(timer_notify)
    timer_notify = setTimeout(notify_hide, 2500)
}

function url_builder_(base_url, submit_data_) {
    let url = new URL(base_url)
    for (let i = 0; i < submit_data_.length; i++) {
        url.searchParams.set(submit_data_[i].name, submit_data_[i].value)
    }
    return url.href
}

function countProperties(obj) {
    return Object.keys(obj).length;
}

function getNoun(number, one = "игрок", two = "игрока", five = "игроков") {
    let n = Math.abs(number)
    n %= 100
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
    return five
}

function get_last_tg_post_id(callback, source) {
    $.ajax({
        url: `${backend_host}/channel?choice=${source}`,
        type: "GET",
        success: function (r) {
            if (r.success) {
                return callback(r.last_post)
            } else {
                console.log("Error data check (get_last_tg_post_id)")
            }
        },
        error: function () {
            console.log("Error get last post id for Telegram")
        }
    })
}

function append_posts() {
    for (let i = 0; i < channels; i++) {
        get_last_tg_post_id(function (identifer) {
            $(".telegram_frames").append(
                `<script async src="https://telegram.org/js/telegram-widget.js?19"
                    data-telegram-post="${identifer}"
                    data-width="100%" data-userpic="true" data-dark="1"><\/script>`
            )
            setTimeout(function () {
                $("#telegram_block_load").remove()
            }, 100)
        }, i)
    }
}

function get_game_server_data(callback) {
    const _data_error = function (ok = false) {
        let string_ = ""
        if (ok) {
            string_ = ""
        } else {
            string_ = "Не удается обновить информацию о сервере..."
        }
        $("#error_get_server_status").text(string_)
    }

    $.ajax({
        url: `${backend_host}/server`,
        type: "GET",
        success: function (r) {
            if (r.success) {
                callback(r.body)
                _data_error(ok = true)
            } else {
                console.log("Error data check (get_game_server_data)")
                _data_error()
            }
        },
        error: function () {
            console.log("Error get info for game server")
            _data_error()
        }
    })
}

function monitoring_game_server_update() {
    get_game_server_data(function (data) {
        $("#server_online_status").html(
            `Сейчас играет <span class="text-primary fw-semibold">
                ${data.online}</span> ${getNoun(data.online)}`
        )
    })
}

function game_server_updater() {
    monitoring_game_server_update()
    setInterval(monitoring_game_server_update, 3000)
}

function get_donate_services(callback) {
    $.ajax({
        url: `${backend_host}/donate/services`,
        type: "GET",
        success: function (r) {
            if (r.success) {
                return callback(r.services)
            } else {
                console.log("Error data check (get_donate_services)")
            }
        },
        error: function () {
            console.log("Error get donate services list")
        }
    })
}

function create_payment(callback, customer, products, email = null, coupon = null) {
    $.ajax({
        url: `${backend_host}/donate/payment/create`,
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({
            "customer": customer,
            "products": products,
            "email": email,
            "coupon": coupon
        }),
        dataType: 'json',
        success: function (r) {
            if (r.success) {
                return callback(r.payment)
            } else {
                console.log("Error data check (get_donate_services)")
            }
        },
        error: function () {
            console.log("Error get donate services list")
        }
    })
}

function append_services() {
    get_donate_services(function (services) {
        donate_services_array = services
        for (let i = 0; i < services.length; i++) {
            let click_data = {
                "name": services[i].name,
                "price": services[i].price,
                "count": services[i].number,
                "description": services[i].description,
                "type": services[i].type,
                "service_id": services[i].id
            }
            $("#donate_items_list").append(`
                <div class="col" id="donate_item_${services[i].id}">
                    <div class="card card-hover border-0 bg-transparent" 
                        onClick='donate_element_click(${JSON.stringify(click_data)})'>
                      <div class="position-relative">
                        <div class="parent-image-shadow donate_item_hover" 
                            id="donate_item_hover_${services[i].id}">
                            <div class="imageContainer">
                                <img src="${services[i].image}"
                                 class="rounded-3 foregroundImg" alt="${services[i].name}" 
                                 style="display: block; margin: auto; width: 35%" loading="lazy">
                                <img src="${services[i].image}"
                                 class="rounded-3 backgroundImg" alt="${services[i].name}" 
                                 style="display: block; margin: auto; width: 35%" loading="lazy">
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
            `)
        }

        setTimeout(function () {
            $("#donate_block_load").remove()
            $("#donate_items_list").css("display", "")
        }, 100)
    })
}

function redirect_(url) {
    return window.location.replace(url)
}

function modal_close_() {
    _body.removeClass("modal-open")
    document.getElementById("donate_item_modal").style.display = "none"
}

function switch_modal_containers(mode = "service") {
    const span = document.getElementsByClassName("close_b")
    const info = $("#modal-info-container-c")
    const service = $("#modal-donate-container-c")
    const finish_donate = $("#modal-donate-finish-container-c")
    const _array = [
        {"name": "service", "selector": service},
        {"name": "info", "selector": info},
        {"name": "donate_finish", "selector": finish_donate}
    ]
    for (let i = 0; i < _array.length; i++) {
        let _mode = "none"
        if (mode === _array[i].name) {
            _mode = "block"
            span[i].onclick = function () {
                modal_close_()
            }
        }
        _array[i].selector.css("display", _mode)
    }
}

function get_cookie_cart() {
    let cookie_cart = {}
    try {
        cookie_cart = JSON.parse(Cookies.get(cart_cookie))
    } catch (_) {
    }
    return cookie_cart
}

function update_cart_count() {
    $("#count_cart_items_dn").text(countProperties(get_cookie_cart()))
}

function group_already_in_cart(user_cart) {
    let cart = Object.keys(user_cart)
    for (let i = 0; i < donate_services_array.length; i++) {
        if (donate_services_array[i].type === "group") {
            if (cart.includes(donate_services_array[i].id.toString())) {
                return true
            }
        }
    }
    return false
}

function build_players_swiper() {
    let array_ = $("#players-swiper-array")
    const create_swiper = function () {
        new Swiper('#players_swipe_container', {
            slidesPerView: 2,
            spaceBetween: 24,
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
    }
    $.getJSON("assets/data/players.json", function (players) {
        shuffle(players)
        for (let i = 0; i < players.length; i++) {
            array_.append(`
                <div class="swiper-slide">
                    <span class="d-block py-3">
                        <img src="${players[i].head}" class="d-block mx-auto" width="154"
                           alt="${players[i].name}" loading="lazy"
                        <div class="card-body text-center p-3">
                            <h3 class="fs-lg fw-semibold pt-1 mb-2">${players[i].name}</h3>
                            <p class="fs-sm mb-0">${players[i].desc}</p>
                        </div>
                    </span>
                </div>
            `)
        }
        create_swiper()
    })
}

function donate_element_click(product_data) {
    switch_modal_containers("service")

    const exclude_types = ["group"]
    let modal = document.getElementById("donate_item_modal")
    let desc = $("#donate_item_select_text")
    let text_template = `Вы выбрали товар <span class="text-primary fw-semibold">${product_data.name}</span>, 
        цена ${product_data.count} ${getNoun(product_data.count, "единицы", "единиц", "единиц")} 
        <span class="text-primary fw-semibold">${product_data.price} 
        ${getNoun(product_data.price, "рубль", "рубля", "рублей")}</span>.`
    let items_count_donate = $("#items_count_donate")
    let count_hint = $("#donate_count_text_hint")
    let add_to_cart = $("#donate_button_add_to_cart")
    const cookie_cart = get_cookie_cart()

    let switch_ = false

    let _update_count = function () {
        add_to_cart.attr(
            "onClick", `donate_cart(${product_data.service_id}, ${items_count_donate.val()})`
        )
    }

    items_count_donate.val("1"); _update_count()

    const product_in_cart = cookie_cart.hasOwnProperty(product_data.service_id.toString())
    if (
        (exclude_types.includes(product_data.type) ||
            product_data.type === "group") && group_already_in_cart(cookie_cart)
    ) {
        switch_modal_containers("info")
        switch_ = true
        let group_error = ""
        if (product_data.type === "group") {
            group_error = "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую."
        } else if (product_in_cart) {
            group_error = `Ошибка, вы можете добавить товар 
            <span class="text-primary fw-semibold">${product_data.name}</span> 
            только один раз.`
        } else {
            group_error = "Мы не знаем почему, но эта ошибка вызвана по неизвестным причинам."
        }
        $("#donate_info_block_text").html(group_error)
    }

    let count_state = "block"
    if (exclude_types.includes(product_data.type)) {
        count_state = "none"
    }

    items_count_donate.css("display", count_state)
    count_hint.css("display", count_state)

    const only_dig = function () {
        let value = items_count_donate.val()
        items_count_donate.val(
            value.replace(/\D+/g, ''))
    }

    const _calculate_price = function () {
        only_dig()
        if (!exclude_types.includes(product_data.type)) {
            let _price = parseInt(items_count_donate.val()) * product_data.count * product_data.price
            if (isNaN(_price) || 1 > Math.sign(_price)) {
                _price = 0
            }
            desc.html(`${text_template}<br/>Стоимость выбранного количества - 
            <span class="text-primary fw-semibold">${_price} 
            ${getNoun(_price, "рубль", "рубля", "рублей")}</span>`)
            _update_count()
        }
    }

    desc.html(text_template)

    _calculate_price()
    items_count_donate.keyup(_calculate_price)

    _body.addClass("modal-open")
    modal.style.display = "block"

    window.onclick = function (event) {
        if (event.target === modal) {
            modal_close_()
        }
    }
}

function donate_get_service_by_id(id) {
    for (let i = 0; i < donate_services_array.length; i++) {
        if (donate_services_array[i].id === parseInt(id)) {
            return donate_services_array[i]
        }
    }
    return null
}

function donate_cart(product, count, remove = false) {
    if (!Number.isInteger(product) || !Number.isInteger(count)) {
        console.log("Error data donate_cart")
        return
    }
    if (1 > Math.sign(count)) {
        notify("Количество не может быть равно нулю или меньше")
        return
    }
    let cart = Cookies.get(cart_cookie)
    if (!cart) {
        Cookies.set(cart_cookie, JSON.stringify({}))
    }
    const els_ = JSON.parse(Cookies.get(cart_cookie))
    const product_data = donate_get_service_by_id(product)
    const local_prm = "<span style=\"color: #a4a6ff !important\">"
    if (remove) {
        delete els_[product]
        notify(`Товар ${local_prm} ${product_data.name}</span> убран из корзины`)
    } else {
        if (els_[product]) {
            els_[product] = els_[product] + count
            notify(`В корзину добавлено ${local_prm} ${count} </span> 
                        единиц товара ${local_prm} ${product_data.name} </span>`)
        } else {
            els_[product] = count
            notify(`Товар ${local_prm} ${product_data.name}</span> добавлен в корзину`)
        }
    }

    Cookies.set(cart_cookie, JSON.stringify(els_));
    modal_close_(); donate_init(); update_cart_count()
}

function donate_cart_button(els = {}) {
    const selector_ = $(".donate-cart-button-cn")
    if (!jQuery.isEmptyObject(els)) {
        selector_.css("opacity", 1)
        selector_.css("margin-top", "15px")
    } else {
        selector_.css("opacity", 0)
        selector_.css("margin-top", "-50px")
    }
}

function donate_flush_cart() {
    Cookies.remove(cart_cookie)
    donate_cart_button({})
    notify("Корзина очищена")
}

function donate_init() {
    let els = {};
    try {
        els = JSON.parse(Cookies.get(cart_cookie))
    } catch (_) {
    };
    donate_cart_button(els)
}

function landing_init() {
    const dev_hostnames = [
        "localhost", "zalupa.world"
    ];
    let land_desc = $("#landing_description_gb");
    if (dev_hostnames.includes(window.location.hostname)) {
        land_desc.text("This is development version!")
    }
}

function finish_load() {
    $("main").attr("style", "");
    $("footer").attr("style", "")
}

$(document).ready(function () {
    landing_init(); build_players_swiper(); append_posts(); append_services();
    update_cart_count(); game_server_updater(); donate_init(); finish_load();

    $("#dark-perm-set-bv").remove()
})