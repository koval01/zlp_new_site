const _body = $("body")

const cart_cookie = "cart_box"
const channels = 2
const backend_host = "https://zlp-api.herokuapp.com"

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
    function _data_error(ok = false) {
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
            `Сейчас играет <span class="text-primary fw-semibold">${data.online}</span> ${getNoun(data.online)}`
        )
    })
}

function game_server_updater() {
    setInterval(monitoring_game_server_update, 1500)
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

function create_payment(callback, customer, products, email=null, coupon=null) {
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
                        <div class="parent-image-shadow donate_item_hover" id="donate_item_hover_${services[i].id}">
                            <div class="imageContainer">
                                <img src="${services[i].image}"
                                 class="rounded-3 foregroundImg" alt="${services[i].name}" style="display: block; margin: auto; width: 35%">
                                <img src="${services[i].image}"
                                 class="rounded-3 backgroundImg" alt="${services[i].name}" style="display: block; margin: auto; width: 35%">
                             </div>
                        </div>
                        <div class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3" 
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

function switch_modal_containers(mode="service") {
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

    let switch_ = false
    let cookie_cart = {}
    try { cookie_cart = JSON.parse(Cookies.get(cart_cookie)) } catch (_) {}

    let _update_count = function () {
        add_to_cart.attr(
            "onClick", `donate_cart(${product_data.service_id}, ${items_count_donate.val()})`
        )
    }

    items_count_donate.val("1")
    _update_count()

    if (
        cookie_cart.hasOwnProperty(product_data.service_id.toString()) &&
        exclude_types.includes(product_data.type) &&
        product_data.type === "group"
    ) {
        switch_modal_containers("info")
        switch_ = true
        let group_error = ""
        if (product_data.type === "group") {
            group_error = "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую."
        }
        $("#donate_info_block_text").html(
            `Ошибка, вы можете добавить товар 
            <span class="text-primary fw-semibold">${product_data.name}</span> 
            только один раз.<br/>${group_error}`)
    }

    let count_state = "block"
    if (exclude_types.includes(product_data.type)) { count_state = "none" }

    items_count_donate.css("display", count_state)
    count_hint.css("display", count_state)

    function _calculate_price() {
        if (!exclude_types.includes(product_data.type)) {
            let _price = parseInt(items_count_donate.val()) * product_data.count * product_data.price
            if (isNaN(_price)) {
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
            _exit()
        }
    }
}

function donate_cart(product, count, remove=false) {
    if (!Number.isInteger(product) || !Number.isInteger(count)) {
        console.log("Error data donate_cart")
        return
    }
    let cart = Cookies.get(cart_cookie)
    if (!cart) { Cookies.set(cart_cookie, JSON.stringify({})) }
    let els_ = JSON.parse(Cookies.get(cart_cookie))
    if (remove) {
        delete els_[product]
    } else {
        if (els_[product]) {
            els_[product] = els_[product] + count
        } else {
            els_[product] = count
        }
    }
    Cookies.set(cart_cookie, JSON.stringify(els_))
    modal_close_()
    donate_init()
}

function donate_cart_button(els={}) {
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
}

function donate_init() {
    const els = JSON.parse(Cookies.get(cart_cookie))
    const count_els = countProperties(els)
    donate_cart_button(els)
}

$(document).ready(function () {
    append_posts()
    append_services()
    game_server_updater()
    donate_init()
})