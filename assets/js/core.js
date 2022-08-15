const channels = 2
const backend_host = "https://zlp-api.herokuapp.com"

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
                `<script async src="https://telegram.org/js/telegram-widget.js?19" data-telegram-post="${identifer}" data-width="100%" data-userpic="true" data-dark="1"><\/script>`
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

function append_services() {
    get_donate_services(function (services) {
        for (let i = 0; i < services.length; i++) {

            $("#donate_items_list").append(`
                <div class="swiper-slide">
                  <span class="d-block py-3" id="${services[i].id}">
                    <img src="${services[i].image}" class="d-block mx-auto" width="154"
                         alt="${services[i].name}">
                    <div class="card-body text-center p-3">
                      <h3 class="fs-lg fw-semibold pt-1 mb-2">${services[i].name}</h3>
                      <p class="mb-0">
                        ${services[i].price} 
                        ${getNoun(services[i].price, "рубль","рубля", "рублей")} 
                        = 
                        ${services[i].number} 
                        ${getNoun(services[i].number, "единица", "единицы", "единиц")}
                      </p>
                      <p class="fs-sm mb-0">${services[i].description}</p>
                    </div>
                  </span>
                </div>
            `)
        }
        let swiper = new Swiper('#donate_items_container', {
            slidesPerView: 2,
            spaceBetween: 24,
            loop: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: ".swiper-pagination-donate",
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
        setTimeout(function () {
            $("#donate_block_load").remove()
            $("#donate_items_container").css("display", "")
            swiper.update()
        }, 100)
        $(window).resize(function(){
          swiper.update()
        })
    })
}

function redirect_(url) {
    return window.location.replace(url)
}

$(document).ready(function () {
    append_posts()
    append_services()
    game_server_updater()
})