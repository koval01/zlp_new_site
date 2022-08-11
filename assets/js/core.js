const channels = 2
const backend_host = "https://zlp-api.herokuapp.com"
const donate_token = "c40359bf1f64ce933e" // test token

function getNounPlayer(number, one = "игрок", two = "игрока", five = "игроков") {
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
            $(".telegram_frames").append(`<script async src="https://telegram.org/js/telegram-widget.js?19" data-telegram-post="${identifer}" data-width="100%" data-userpic="true" data-dark="1"><\/script>`)
            setTimeout(function () {
                $("#telegram_block_load").remove()
            }, 150)
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
        $("#server_online_status").html(`Сейчас играет <span class="text-primary fw-semibold">${data.players.online}</span> ${getNounPlayer(data.players.online)}`)
    })
}

function game_server_updater() {
    setInterval(monitoring_game_server_update, 500)
}

function get_donate_services(callback) {
    $.ajax({
        url: `${backend_host}/donate/services?token=${donate_token}`,
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

function donate_url(account, service, count = null) {
    var submit_data_ = [
        {"name": "account", "value": account},
        {"name": "good", "value": service},
        {"name": "sum", "value": count}
    ]
    var url = new URL(`https://gamesdonate.com/pay/${donate_token}`)
    for (let i = 0; i < submit_data_.length; i++) {
        url.searchParams.set(submit_data_[i].name, submit_data_[i].value)
    }
    return url.href
}

function redirect_(url) {
    return window.location.replace(url)
}

$(document).ready(function () {
    append_posts()
    game_server_updater()
})