/**
 * @suppress {uselessCode}
 */

"use strict";

var _this = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var site_domains = {
  prod: domain_site,
  dev: development_hosts[0],
  test: development_hosts[1]
};
var cart_cookie = "cart_box";
var channels = 2;
var links_lt = [{
  name: "twitch",
  link: "https://www.twitch.tv/bratishkinoff"
}, {
  name: "youtube",
  link: "https://www.youtube.com/channel/UC_-kIftWIXsTrVXZy0lJdXQ"
}, {
  name: "telegram",
  link: "https://t.me/zalupaonline"
}, {
  name: "discord",
  link: "https://discord.gg/qEqbVbMeEx"
}, {
  name: "tiktok",
  link: "https://www.tiktok.com/@nebratishkin"
}];
var launcher_platforms = {
  mac: "dmg",
  linux: "deb",
  windows: "msi"
};
var gitOwner = "Zalupa-Online";
var gitLauncherRepo = "launcher-releases";
var lock_of = true;
var coins_sell_mode = true;
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
  response: null
};
var telegram_social_bot = "https://t.me/ZalupaScBot";
var debug_lock_init = false;
var telegram_auth_enabled = true;
var feedback_module_enabled = false;
var feedback_tg_auth_skip = true;
var tokens_system_enabled = true;
var initHost = function initHost() {
  var keys = Object.keys(site_domains);
  for (var i = 0; i < keys.length; i++) {
    if (site_domains[keys[i]] === window.location.hostname) {
      work_domain_v = site_domains[keys[i]];
    }
  }
};
var linkHash = function linkHash() {
  return window.location.hash.substring(1);
};
var prepare_img_link = function prepare_img_link(img_link) {
  return img_link.replace("https://", "//").replaceAll(/\//g, "\\/");
};
var time_correction = function time_correction(date) {
  var userTimezoneOffset = -date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};
var time_in_moscow_get = function time_in_moscow_get() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!date) {
    date = new Date();
  }
  return new Date(date.toLocaleString("en-US", {
    timeZone: "Europe/Moscow"
  }));
};
var getOffset = function getOffset(date, timezone) {
  try {
    -new Date(date).toLocaleString([], {
      timeZone: timezone,
      timeZoneName: 'shortOffset'
    }).match(/(?:GMT|UTC).+/)[0] * 60;
  } catch (e) {
    console.error("getOffset : ".concat(e));
    return 0;
  }
};
var formatDate = function formatDate(date) {
  var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var diff = new Date() - date;
  if (now) {
    diff = now - date;
  }
  if (diff < 1000) {
    return 'прямо сейчас';
  }
  var sec = Math.floor(diff / 1000);
  if (sec < 60) {
    return sec + " ".concat(getNoun(sec, "секунду", "секунды", "секунд"), " \u043D\u0430\u0437\u0430\u0434");
  }
  var min = Math.floor(diff / (1000 * 60));
  if (min < 60) {
    return min + " ".concat(getNoun(min, "минуту", "минуты", "минут"), " \u043D\u0430\u0437\u0430\u0434");
  }
  var hour = Math.floor(diff / (1000 * 60 * 60));
  if (hour < 24) {
    return hour + " ".concat(getNoun(hour, "час", "часа", "часов"), " \u043D\u0430\u0437\u0430\u0434");
  }
  var d = date;
  d = ['0' + d.getDate(), '0' + (d.getMonth() + 1), '' + d.getFullYear(), '0' + d.getHours(), '0' + d.getMinutes()].map(function (component) {
    return component.slice(-2);
  });
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
};
var utf8_to_b64 = function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
};
var b64_to_utf8 = function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
};
var randDiaps = function randDiaps() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  return Math.floor(Math.random() * max) + 1;
};
var getPlatform = function getPlatform() {
  if (navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone") {
    return "mac";
  }
  if (navigator.platform.indexOf("Linux") === 0) {
    return "linux";
  }
  return "windows";
};
var isChrome = function isChrome() {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
};
var downloadLauncher = function downloadLauncher() {
  getGitLauncherReleases(function (links_) {
    var link = links_[getPlatform()];
    window.location = link;
    console.debug("Init downloading file from url : ".concat(link));
    if (!isChrome()) {
      notify("\u0421\u0435\u0439\u0447\u0430\u0441 \u0442\u0435\u0431\u0435 \u0441\u043A\u0430\u0447\u0430\u0435\u043C \u0444\u0430\u0439\u043B <span class=\"text-gradient-primary\">".concat(link.split("/").slice(-1)[0], "</span>"));
    }
  });
};
var generateRandomHex = function generateRandomHex(size) {
  return _toConsumableArray(Array(size)).map(function () {
    return Math.floor(Math.random() * 16).toString(16);
  }).join('');
};
var getAvatarColorIDforTG = function getAvatarColorIDforTG(user_id) {
  var result = 0;
  var base = 1;
  while (user_id > 0) {
    result += user_id % 7 * base;
    base *= 10;
    user_id = Math.floor(user_id / 7);
  }
  return parseInt(result.toString().slice(-1));
};
var getHash = function getHash(link) {
  var hash = window.location.hash.substr(1);
  return Object.keys(hash.split("&").reduce(function (result, item) {
    var parts = item.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {}))[0];
};
var re_check = function re_check(callback) {
  grecaptcha.ready(function () {
    grecaptcha.execute(re_token, {
      action: "submit"
    }).then(function (token_update) {
      callback(token_update);
    });
  });
};
var shuffle = function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    var _ref = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref[0];
    array[randomIndex] = _ref[1];
  }
  return array;
};
var alternateSort = function alternateSort(list) {
  var minIndex = 0;
  var minVal = 0;
  for (var i = 0; i < list.length; i++) {
    minIndex = i;
    minVal = list[i];
    for (var j = i + 1; j < list.length; j++) {
      if (list[j] < minVal) {
        minVal = list[j];
        minIndex = j;
      }
    }
    if (minVal < list[i]) {
      var temp = list[i];
      list[i] = list[minIndex];
      list[minIndex] = temp;
    }
  }
};
var getImageLightness = function getImageLightness(imageSrc, callback) {
  var calculate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var img = document.createElement("img");
  img.src = imageSrc;
  img.crossOrigin = "Anonymous";
  img.style.display = "none";
  document.body.appendChild(img);
  var colorSum = 0;
  if (calculate) {
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = _this.width;
      canvas.height = _this.height;
      var ctx = canvas.getContext("2d");
      try {
        ctx.drawImage(_this, 0, 0);
        var _imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } catch (_) {
        callback(null);
        return;
      }
      var data = imageData.data;
      var r, g, b, avg;
      for (var x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];
        avg = Math.floor((r + g + b) / 3);
        colorSum += avg;
      }
      var brightness = Math.floor(colorSum / (_this.width * _this.height));
      callback(brightness);
      img.remove();
    };
  }
};
var is_apple_platform = function is_apple_platform() {
  var mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  if (mac) {
    return true;
  }
};
var validateEmail = function validateEmail(email) {
  return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
var url_builder_ = function url_builder_(base_url, submit_data_) {
  var url = new URL(base_url);
  for (var i = 0; i < submit_data_.length; i++) {
    url.searchParams.set(submit_data_[i].name, submit_data_[i].value);
  }
  return url.href;
};
var countProperties = function countProperties(obj) {
  return Object.keys(obj).length;
};
var getNoun = function getNoun(number) {
  var one = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "игрок";
  var two = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "игрока";
  var five = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "игроков";
  var n = Math.abs(number);
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
};
var getCrypto = function getCrypto(callback) {
  re_check(function (token_update) {
    requestCall(function (r) {
      if (r.success) {
        callback(r.token);
      } else {
        callback("");
      }
    }, "".concat(backend_host, "/crypto"), "POST", true, {
      token: token_update
    });
  });
};
var get_events_ = function get_events_(callback) {
  re_check(function (token_update) {
    requestCall(function (r) {
      callback(r.events);
    }, "".concat(backend_host, "/events"), "POST", true, {
      token: token_update
    });
  });
};
var get_yt_video_ = function get_yt_video_(callback, video_id) {
  var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!skip) {
    re_check(function (token_update) {
      requestCall(function (r) {
        callback(r.body);
      }, "".concat(backend_host, "/youtube_get"), "POST", true, {
        token: token_update,
        video_id: video_id
      });
    });
  } else {
    callback(null);
  }
};
var get_news_ = function get_news_(callback, source) {
  re_check(function (token_update) {
    requestCall(function (r) {
      callback(r.messages);
    }, "".concat(backend_host, "/channel_parse?choice=").concat(source), "POST", true, {
      token: token_update
    });
  });
};
var get_rules_private_server = function get_rules_private_server(callback) {
  requestCall(function (r) {
    callback(r);
  }, "assets/data/private_server_rules.json", "GET", true);
};
var appendPostsNews = function appendPostsNews() {
  var iframe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var loading_done = function loading_done() {
    setTimeout(function () {
      var sl = document.getElementById("telegram_block_load");
      var container_news = document.getElementById("news_zlp_buttons");
      try {
        sl.parentNode.removeChild(sl);
        container_news.style.display = "";
      } catch (_) {}
    }, 150);
  };
  if (iframe) {
    var template = "\n        <div class=\"shadow-vertical-overlay vertical-top-shadow\" style=\"width:100vw!important\"></div>\n        <div class=\"shadow-vertical-overlay vertical-bottom-shadow\" style=\"width:100vw!important\"></div>\n        <iframe \n            style=\"min-height:450px;width:100vw\" \n            id=\"tg-iframe-view\"\n            src=\"https://telegram-worker.zalupa.online/zalupaonline\" \n            onload=\"try{document.getElementById('telegram_block_load').remove()} catch {}\">\n        </iframe>";
    var c = document.getElementById("news-c-container");
    c.innerHTML = template + c.innerHTML;
    loading_done();
    document.getElementById("theme-mode").addEventListener('change', function () {
      var frame = document.getElementById("tg-iframe-view");
      var url_ob = new URL(frame.src);
      if (this.checked) {
        url_ob.hash = "#dark";
      } else {
        url_ob.hash = "#light";
      }
      frame.src = url_ob.href;
    });
  } else {
    var createSwiper = function createSwiper() {
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
    var text_modify_enable = true;
    var text_size_static = true;
    var add_news_in_array = function add_news_in_array(posts) {
      var adaptive_news_text = true;
      var array_ = document.getElementById("news_swipe_array");
      posts = posts.reverse();
      var _loop = function _loop(i) {
        var text = posts[i].text;
        var text_els = text.split(" ");
        var datetime = new Date(posts[i].datetime_utc);
        if (!posts[i].cover) {
          posts[i].cover = "assets/images/spawn.webp";
        }
        array_.innerHTML = array_.innerHTML + "\n                    <div class=\"swiper-slide h-auto px-2\" style=\"max-height: 40vh !important;display: ".concat(text_els.length >= 5 ? 'block' : 'none', "\">\n                        <figure class=\"card h-100 position-relative border-0 news-figure\" id=\"news_figure_").concat(i, "\">\n                            <div class=\"background-news\" id=\"background-news-").concat(i, "\">\n                                <div class=\"background-news-overlay\" id=\"news-overlay-").concat(i, "\">\n                                    <div class=\"background-news-overlay-dark-mode\">\n                                        <div \n                                        style=\"z-index:6;top:35.1%;height:65%\"\n                                        class=\"shadow-vertical-overlay shadow-vertical-overlay-news vertical-bottom-shadow\"\n                                        ></div>\n                                        <blockquote class=\"card-body mt-2 mb-3 news-text-container\">\n                                            <p class=\"fs-md mb-0 news-text h6\" id=\"news_text_").concat(i, "\" style=\"font-family:sans-serif\">\n                                                    ").concat(text, "</p>\n                                            <div class=\"news-bottom-container\" style=\"z-index:8\">\n                                                <a class=\"btn btn-primary shadow-primary btn-lg news-button-view\"\n                                                   href=\"").concat(posts[i].link, "\" target=\"_blank\">\n                                                        \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</a>\n                                            </div>\n                                        </blockquote>\n                                    </div>\n                                </div> \n                            </div>\n                        </figure>\n                        <span class=\"news-date-text\">\n                            ").concat(datetime.toLocaleDateString(), " \n                            ").concat(datetime.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit"
        }), "\n                        </span>\n                    </div>\n                ");
        var selector_bg = document.getElementById("background-news-".concat(i));
        selector_bg.style.backgroundImage = "url(".concat(posts[i].cover, ")");
        if (text_modify_enable) {
          var selector_text = document.getElementById("news_text_".concat(i));
          selector_text.style.width = "100%";
          selector_text.classList.add("text-light");
          if (text_size_static) {
            selector_text.style.fontSize = 'calc(1.35vw + .75vh)';
          } else {
            var text_len = selector_text.innerText.length;
            var text_split = selector_text.innerText.split(" ");
            var font_size = (text_len - -8) * .4 / 100;
            var fix_float_fs = function fix_float_fs(_float, font_size) {
              var correction_float = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : .55;
              var correction_font = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : .26;
              var max_val = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : .94;
              _float = _float < correction_float ? correction_float * (font_size / correction_font) : _float;
              return max_val ? _float < max_val ? _float : max_val : _float;
            };
            selector_text.style.fontSize = "calc(".concat(fix_float_fs(parseFloat(1.96 - font_size), font_size), "vw + ").concat(fix_float_fs(parseFloat(2.16 - font_size), font_size), "vh + ").concat(fix_float_fs(parseFloat(2 - font_size), font_size), "vmin)");
            selector_text.style.padding = "".concat(fix_float_fs(parseFloat(1.45 - font_size), font_size, .22, 1.05), "rem");
            var calculate_text_position = function calculate_text_position() {
              if (!adaptive_news_text) {
                return;
              }
              // local init var
              var identifier_sl = "news_text_".concat(i);
              var switch_val = 10;
              var selector_text = document.getElementById(identifier_sl);
              var font_size = parseFloat(window.getComputedStyle(selector_text, null).getPropertyValue('font-size').replace("px", ""));
              selector_text.style.maxHeight = "32vh";
              if (font_size > switch_val) {
                selector_text.style.position = "absolute";
                selector_text.style.display = "inline-block";
                selector_text.style.paddingBottom = "5rem";
                selector_text.style.paddingRight = "3rem";
              } else {
                selector_text.style.position = "";
                selector_text.style.display = "";
                selector_text.style.paddingBottom = "";
                selector_text.style.paddingRight = "";
              }
            };
            addEventListener('resize', function (event) {
              return calculate_text_position();
            });
            setInterval(calculate_text_position, 50);
          }
        }
        getImageLightness(posts[i].cover, function (brightness) {
          var style_ = "#000000".concat(((parseFloat(brightness) / 255.0 * 100.0).toFixed() + 64).toString(16).slice(0, 2));
          document.getElementById("news-overlay-".concat(i)).style.background = style_;
        });
      };
      for (var i = 0; i < posts.length; i++) {
        _loop(i);
      }
      if (posts) {
        createSwiper();
        loading_done();
      }
    };
    get_news_(function (posts) {
      add_news_in_array(posts);
    }, 1);
  }
};
var closeButtonDonateAdaptive = function closeButtonDonateAdaptive() {
  if (!is_apple_platform()) {
    document.getElementById("exit-button-container-donate").style.minHeight = "100%";
  }
};
var donateSwitchContainer = function donateSwitchContainer(display) {
  var container = document.querySelector(".donate-global-container");
  var style_sticker = document.getElementById("super-klassniy-sticker-0").style;
  var style_main = document.querySelector("main").style;
  style_sticker.opacity = 0;
  var update_zIndex = function update_zIndex(variable) {
    setTimeout(function () {
      container.style.zIndex = variable;
    }, 850);
  };
  if (!donate_displayed || display) {
    var button = document.getElementById("donateButtonLandingTop");
    button.setAttribute("disabled", "");
    notify("Переходим к донату...");
    closeButtonDonateAdaptive();
    checkTelegramAuthData(function (tg_success) {
      button.removeAttribute("disabled");
      if (tg_success) {
        document.body.style.overflowY = "hidden";
        window.scrollTo({
          top: 0,
          behavior: "smooth"
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
};
var get_game_server_data = function get_game_server_data(callback) {
  var _data_error = function _data_error() {
    var ok = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var string_ = "";
    if (ok) {
      string_ = "";
    } else {
      string_ = "Не удается обновить информацию о сервере...";
    }
    document.getElementById("error_get_server_status").innerText = string_;
  };
  if (crypto_token) {
    requestCall(function (r) {
      setTimeout(function () {
        freeze_monitoring = false;
      }, 800);
      if (r.success) {
        callback(r.body);
      } else {
        crypto_token = "";
      }
    }, "".concat(backend_host, "/server"), "POST", true, {
      crypto_token: crypto_token
    });
  } else {
    initCrypto();
    freeze_monitoring = false;
  }
};
var monitoring_game_server_update = function monitoring_game_server_update() {
  if (!freeze_monitoring) {
    freeze_monitoring = true;
    get_game_server_data(function (data) {
      if (data.online) {
        if (typeof gameServerUpdater_setter !== "undefined") {
          clearInterval(gameServerUpdater_setter);
        }
        var selector = document.getElementById("server_online_status");
        selector.classList.remove("loading-dots");
        selector.innerHTML = "\u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0433\u0440\u0430\u0435\u0442 <span class=\"text-primary fw-semibold\">".concat(data.online, "</span>\n            <i class=\"emoji male-emoji\" style=\"margin-left: -.35rem!important;background-image:url('assets/images/emoji/male.png')\"><b>\u2642</b></i>\n            ").concat(getNoun(data.online), "\n            <i class=\"emoji male-emoji\" style=\"background-image:url('assets/images/emoji/male.png')\"><b>\u2642</b></i>\n            ");
      }
    });
  }
};
var gameServerUpdater = function gameServerUpdater() {
  monitoring_game_server_update();
  gameServerUpdater_setter = setInterval(monitoring_game_server_update, 300);
  setInterval(monitoring_game_server_update, 5000);
};
var initEventsList = function initEventsList() {
  var row_container = document.getElementById("events-row-container");
  var loader_ = document.getElementById("events_block_load");
  var switch_button_ = document.getElementById("events-c-button");
  var row_class = ["row-cols-md-2", "row-cols-lg-2", "row-cols-xl-3"];
  get_events_(function (data) {
    switch_button_.removeAttribute("disabled");
    if (data && data.length) {
      glob_events_status = true;
      events_block_load.remove();
      data.sort(function (a, b) {
        var keyA = new Date(a.date_start),
          keyB = new Date(b.date_start);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      for (var i = 0; i < data.length; i++) {
        if (3 > i > 0) {
          row_container.classList.add(row_class[i]);
        }
        var st_date = time_correction(new Date(data[i].date_start));
        var end_date = time_correction(new Date(data[i].date_end));
        var time_in_moscow = time_in_moscow_get();
        var badge = "";
        if (st_date > time_in_moscow) {
          badge = "Скоро";
        } else if (time_in_moscow > end_date) {
          badge = "Завершено";
        }
        var template_ = "\n                    <div class=\"col\">\n                        <div class=\"object-block-col\">\n                            <h1>".concat(data[i].title, "</h1>\n                            <h4 class=\"text-primary\" style=\"margin-top: -1.2rem\">").concat(badge, "</h4>\n                            <h6 style=\"margin-top: -1rem\">\u0421 <span class=\"text-primary\">\n                                ").concat(st_date.toLocaleDateString("ru-RU"), " ").concat(("0" + st_date.getHours()).slice(-2), ":").concat(("0" + st_date.getMinutes()).slice(-2), "\n                                </span> \u043F\u043E <span class=\"text-primary\">\n                                ").concat(end_date.toLocaleDateString("ru-RU"), " ").concat(("0" + end_date.getHours()).slice(-2), ":").concat(("0" + end_date.getMinutes()).slice(-2), "\n                                </span></h6>\n                            <p>").concat(data[i].text, "</p>\n                        </div>\n                    </div>\n                ");
        row_container.innerHTML = row_container.innerHTML + template_;
      }
    }
  });
};
var get_donate_services = function get_donate_services(callback) {
  re_check(function (token_update) {
    requestCall(function (r) {
      callback(r.services);
    }, "".concat(backend_host, "/donate/services"), "POST", true, {
      token: token_update
    });
  });
};
var create_payment = function create_payment(callback, customer, products, server_id) {
  var email = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var coupon = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
  re_check(function (token_update) {
    requestCall(function (r) {
      callback(r.payment);
    }, "".concat(backend_host, "/donate/payment/create"), "POST", true, {
      customer: customer,
      products: products,
      email: email,
      coupon: donatePayMethodSelector() !== 2 ? coupon : null,
      token: token_update,
      server_id: server_id,
      pay_method: donatePayMethodSelector(),
      success_url: "https://".concat(work_domain_v),
      tg_auth_data: getTelegramAuth(true)
    });
  });
};
var generateGiftLink = function generateGiftLink(callback, payment_id) {
  getCrypto(function (crypto_token) {
    callback("".concat(backend_host, "/gift/private_server?") + "payment_id=".concat(payment_id, "&") + "crypto_token=".concat(encodeURIComponent(crypto_token), "&") + "sign=".concat(generateRandomHex(24)));
  });
};
var check_coupon = function check_coupon(callback, coupon) {
  re_check(function (token_update) {
    requestCall(function (r) {
      if (r.coupon && r.success) {
        callback(r.coupon);
      } else {
        callback(null);
      }
    }, "".concat(backend_host, "/donate/coupon"), "POST", true, {
      code: coupon,
      token: token_update,
      pay_method: donatePayMethodSelector()
    });
  });
};
var testImage = function testImage(url) {
  var tester = new Image();
  // tester.addEventListener('load', TSimageFound);
  tester.addEventListener('error', reInitTelegramAuth);
  tester.src = url;
};
var loadPlayerAvatar = function loadPlayerAvatar(avatar) {
  var def_selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "telegram-auth-avatar";
  var url_generator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var back = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var exec_ = function exec_() {
    var avatar_selector = null;
    var avatar_style = null;
    if (!url_generator) {
      try {
        avatar_selector = document.getElementById(def_selector);
        avatar_selector.style;
      } catch (_unused) {}
      console.debug("Load avatar : ".concat(avatar));
      document.getElementById("tg-user-avatar-text").innerText = "";
    }
    for (var i = 0; i < 10; i++) {
      if (!crypto_token && back) {
        initCrypto();
      } else {
        var raw_link = "";
        if (back) {
          raw_link = "".concat(backend_host, "/profile/avatar/?texture_hash=").concat(avatar, "&crypto_token=").concat(encodeURIComponent(crypto_token), "&tg_auth=").concat(encodeURIComponent(getTelegramAuth(true)));
        } else {
          raw_link = "//communication.zalupa.online/tiles/faces/32x32/".concat(avatar, ".png");
        }
        var link = prepare_img_link(raw_link);
        testImage(raw_link);
        if (!url_generator) {
          avatar_selector.setAttribute("style", "background-image: url(\"".concat(link, "\");border-radius:.").concat(def_selector.includes("card-avatar") ? 35 : 15, "rem;"));
        } else {
          return link;
        }
        return;
      }
    }
  };
  exec_();
};
var reInitTelegramAuth = function reInitTelegramAuth() {
  checkTelegramAuthData(function (_) {});
};
var checkTelegramAuthData = function checkTelegramAuthData(callback) {
  var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var skip_cache = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var auth_data = getTelegramAuth(true);
  if (auth_data) {
    if (telegram_glob_session.auth_data === auth_data && !skip_cache) {
      callback(telegram_glob_session.response.success);
      return;
    }
    console.debug("skip pos : ".concat(skip));
    if (!skip) {
      re_check(function (token_update) {
        requestCall(function (r) {
          if (r) {
            console.debug(r);
            if (!r.success) {
              // location.href = telegram_social_bot;
              // console.log("Redirect to " + telegram_social_bot);
              openLoginHint();
              callback(false);
            } else {
              var avatar = document.getElementById("telegram-auth-avatar");
              /*
                  data-bs-toggle="tooltip" data-bs-placement="bottom"
                  title="TITLE_TEXT"
              */
              glob_auth_player_data = r.player_data;
              console.debug(r);
              // const orderedData = getTelegramAuth();
              if (r.player_data) {
                var player = r.player_data;
                var skin = player.NICKNAME;
                var avatar_init = function avatar_init() {
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
                }, 150);
                allow_display_login_hint = false;
              }
              telegram_glob_session = {
                auth_data: auth_data,
                response: r
              };
              callback(raw ? r : r.success);
            }
          } else {
            callback(false);
          }
        }, "".concat(backend_host, "/telegram/auth/check"), "POST", true, {
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
};
var getIPClient = function getIPClient(callback) {
  // getIPClient(function () {});
  requestCall(function (r) {
    if (r && r.success) {
      client_ip = r.ip;
      callback(r.ip);
    } else {
      callback(null);
    }
  }, "".concat(backend_host, "/ip"), "GET", true);
};
var cloudflareTraceJSON = function cloudflareTraceJSON(text) {
  var keys = text.split("\n");
  var dict = {};
  var _iterator = _createForOfIteratorHelper(keys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var k = _step.value;
      p = k.split("=");
      dict[p[0]] = p[1];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  console.debug(dict);
  return dict;
};
var cloudflareTrace = function cloudflareTrace(callback) {
  requestCall(function (r) {
    if (r) {
      callback(cloudflareTraceJSON(r));
    } else {
      callback(null);
    }
  }, "https://cloudflare.com/cdn-cgi/trace", "GET", false);
};
var getGitLauncherReleases = function getGitLauncherReleases(callback) {
  requestCall(function (r) {
    if (r && r.id && r.target_commitish === "main" && r.author.login === "hevav" && !r.draft && r.assets.length) {
      var links = {};
      for (var _i = 0, _Object$keys = Object.keys(launcher_platforms); _i < _Object$keys.length; _i++) {
        var _p = _Object$keys[_i];
        var _iterator2 = _createForOfIteratorHelper(r.assets),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var a = _step2.value;
            if (a.name.split(".").slice(-1)[0] === launcher_platforms[_p]) {
              links[_p] = a.browser_download_url;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      callback(links);
    } else {
      callback([]);
    }
  }, "https://api.github.com/repos/".concat(gitOwner, "/").concat(gitLauncherRepo, "/releases/latest"), "GET", true);
};
var setLauncherLinks = function setLauncherLinks() {
  var button_template = function button_template(link, name) {
    return "\n        <a href=\"".concat(link, "\" style=\"text-transform:capitalize\"\n           class=\"btn btn-primary shadow-primary mt-3 m-1\" download=\"\">\n        ").concat(name.toLowerCase(), "</a>\n    ");
  };
  var selector = document.getElementById("zalupa-launcher-links");
  getGitLauncherReleases(function (d_links) {
    var keys = Object.keys(d_links);
    for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
      var k = _keys[_i2];
      selector.innerHTML = selector.innerHTML + button_template(d_links[k], k);
    }
  });
};
var checkFeedbackStatus = function checkFeedbackStatus(callback) {
  var auth_data = getTelegramAuth(true);
  if (auth_data) {
    re_check(function (token_update) {
      requestCall(function (r) {
        if (r) {
          callback(r.success);
        } else {
          callback(false);
        }
      }, "".concat(backend_host, "/feedback/check"), "POST", true, {
        token: token_update,
        tg_auth_data: auth_data
      });
    });
  }
};
var sendFeedback = function sendFeedback(callback, text) {
  var auth_data = getTelegramAuth(true);
  if (auth_data) {
    re_check(function (token_update) {
      requestCall(function (r) {
        if (r) {
          callback(r.success);
        } else {
          callback(false);
        }
      }, "".concat(backend_host, "/feedback/send"), "POST", true, {
        text: text,
        token: token_update,
        tg_auth_data: auth_data
      });
    });
  }
};
var sendFeedbackAction = function sendFeedbackAction() {
  var button = document.getElementById("send-feedback-button");
  var textarea = document.getElementById("admin-message");
  var text = textarea.value;
  if (text.length < 20) {
    notify("Сообщение очень короткое!");
    return;
  }
  var button_lock = function button_lock() {
    var lock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (lock) {
      button.setAttribute("disabled", "");
    } else {
      button.removeAttribute("disabled");
    }
    button.innerText = lock ? "Ожидайте..." : "Отправить";
  };
  button_lock();
  checkFeedbackStatus(function (check_data) {
    if (check_data) {
      sendFeedback(function (send_data) {
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
};
var checkPayment = function checkPayment(callback, payment_id) {
  re_check(function (token_update) {
    requestCall(function (r) {
      callback(r.payment);
    }, "".concat(backend_host, "/donate/payment_get"), "POST", true, {
      payment_id: parseInt(payment_id),
      token: token_update,
      tokens_send: coins_sell_mode
    });
  });
};
var getPaymentHistory = function getPaymentHistory(callback) {
  re_check(function (token_update) {
    requestCall(function (r) {
      try {
        callback(r.payment);
      } catch (_) {
        callback(null);
        return;
      }
    }, "".concat(backend_host, "/donate/payment_history"), "POST", true, {
      token: token_update
    });
  });
};
var getPlayersSkins = function getPlayersSkins(callback, players) {
  var enabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!enabled) {
    callback(null);
    return;
  }
  re_check(function (token_update) {
    requestCall(function (r) {
      callback(r.skins);
    }, "".concat(backend_host, "/profile/skins/get"), "POST", true, {
      token: token_update,
      players: players
    });
  });
};
var appendServices = function appendServices() {
  get_donate_services(function (services) {
    donate_services_array = services;
    var size_classes = ["row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4"];
    var sl = document.getElementById("donate_items_list");
    var get_product_type = function get_product_type(name, type) {
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
    if (!services.length) {
      sl.innerHTML = '<span class="text-center">Не удалось получить список товаров.</span>';
    } else {
      donate_check_services_cart();
      for (var i = 0; i < services.length; i++) {
        var click_data = {
          name: services[i].name,
          price: services[i].price,
          count: services[i].number,
          description: services[i].description,
          type: services[i].type,
          service_id: services[i].id,
          server_id: services[i].server_id
        };
        products_by_serverid.push(services[i]);
        var _name = "";
        // const _desc = "";
        var padding_desc = "p-3";
        var desc_template = "\n                    <p class=\"mb-0\">\n                        ".concat(services[i].price, " \n                        ").concat(getNoun(services[i].price, "рубль", "рубля", "рублей"), " \n                        = \n                        ").concat(services[i].number, " \n                        ").concat(getNoun(services[i].number, "единица", "единицы", "единиц"), "\n                    </p>\n                    <p class=\"fs-sm mb-0\">").concat(services[i].description, "</p>\n                ");
        var item_butt_template = '';
        if (i && size_classes.length >= i) {
          sl.classList.add(size_classes[i - 1]);
        }
        var click_template = "onClick=\"donate_element_click(".concat(JSON.stringify(click_data), ")\"");
        if (!coins_sell_mode) {
          _name = services[i].name;
        } else {
          var button_title = "Приобрести";
          var description_other = "Товар без описания.";
          if (services[i].description) {
            description_other = services[i].description;
          }
          if (services[i].name.toLowerCase().includes("токен")) {
            _name = "".concat(services[i].price, " ").concat(getNoun(services[i].price, "рубль", "рубля", "рублей"), " = <span class=\"text-primary\">").concat(services[i].number, " ").concat(getNoun(services[i].number, "токен", "токена", "токенов"), "</span>");
            padding_desc = "p-0";
            desc_template = "\n                        <p class=\"mb-0 token-description-dnt\">\n                            \u0418\u0433\u0440\u043E\u0432\u0430\u044F \u0432\u0430\u043B\u044E\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u0430\u043A \u0432 \u0438\u0433\u0440\u0435, \u0442\u0430\u043A \u0438 \u0437\u0430 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443 \u043F\u0440\u043E\u0435\u043A\u0442\u0430.\n                        </p>";
            click_template = "";
          } else if (services[i].name.toLowerCase().includes("слот")) {
            _name = "".concat(services[i].price, " ").concat(getNoun(services[i].price, "рубль", "рубля", "рублей"), " = <span class=\"text-primary\">").concat(services[i].number, " ").concat(getNoun(services[i].number, "слот", "слота", "слотов"), "</span>");
            padding_desc = "p-0";
            desc_template = "\n                        <p class=\"mb-0 token-description-dnt\">\n                            ".concat(description_other, "\n                        </p>");
            click_template = "";
          } else if (services[i].type = "other") {
            _name = "\n                        <span class=\"text-primary\">".concat(services[i].name, "</span>,\n                        ").concat(services[i].price, " ").concat(getNoun(services[i].price, "рубль", "рубля", "рублей"));
            padding_desc = "p-0";
            desc_template = "\n                        <p class=\"mb-0 token-description-dnt\">\n                            ".concat(description_other, "\n                        </p>");
            click_template = "";
          }
          item_butt_template = "\n                        <button class=\"btn btn-primary shadow-primary btn-shadow-hide btn-lg min-w-zl donate-item-butt-bottom\" \n                            onclick=\"donateModalCall(\n                                ".concat(get_product_type(click_data.name, click_data.type), ", ").concat(click_data.service_id, "\n                            )\">\n                            ").concat(button_title, "\n                        </button>");
        }
        services[i].image = prepare_img_link(services[i].image);
        sl.innerHTML = sl.innerHTML + "\n                    <div class=\"col\" id=\"donate_item_".concat(services[i].id, "\">\n                        <div class=\"card border-0 bg-transparent\" ").concat(click_template, ">\n                          <div class=\"position-relative container-item-donate-n\">\n                            <div class=\"parent-image-shadow donate_item_hover\" \n                                id=\"donate_item_hover_").concat(services[i].id, "\">\n                                <div class=\"imageContainer item-levitaion-dec\">\n                                    <div \n                                    class=\"foregroundImg\" \n                                    style=\"background-image: url(").concat(services[i].image, ")\"\n                                    ></div>\n                                    <div \n                                    class=\"backgroundImg\" \n                                    style=\"background-image: url(").concat(services[i].image, ")\"\n                                    ></div>                               \n                                 </div>\n                            </div>\n                            <div class=\"card-img-overlay d-flex flex-column align-items-center \n                                        justify-content-center rounded-3\" \n                                 style=\"margin: auto\">\n                            </div>\n                          </div>\n                          <div class=\"card-body text-center ").concat(padding_desc, "\">\n                                <h3 class=\"fs-lg fw-semibold pt-1 mb-2\">").concat(_name, "</h3>\n                                ").concat(desc_template, "\n                                ").concat(item_butt_template, "\n                          </div>\n                        </div>\n                    </div>\n                ");
      }
      checkPrivateServerBuy();
      setTimeout(function () {
        var elem = document.getElementById("donate_block_load");
        var ids = ["donate_items_list", "donate-header-container", "donate-test-mode-enb", "donate-cart-container"];
        try {
          elem.parentNode.removeChild(elem);
        } catch (_) {}
        for (var _i3 = 0; _i3 < ids.length; _i3++) {
          try {
            document.getElementById(ids[_i3]).style.display = "";
          } catch (e) {
            console.log("Donate block loader error. Details: ".concat(e));
          }
        }
      }, 100);
    }
  });
};
var switchEventsPages = function switchEventsPages(button_name) {
  var news_page = document.getElementById("news-c-container");
  var events_page = document.getElementById("events-c-container");
  var news_button = document.getElementById("news-c-button");
  var events_button = document.getElementById("events-c-button");
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
};
var redirect_ = function redirect_(url) {
  return window.location.replace(url);
};
var ytVideoSetter = function ytVideoSetter() {
  var skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var only_iframe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var load_iframe = function load_iframe(el, video_id, params) {
    el.innerHTML = "\n            <iframe src=\"https://www.youtube.com/embed/".concat(video_id, "\" title=\"YouTube video player\"\n                frameborder=\"0\" class=\"video-container-yt\" id=\"ytframe_").concat(video_id, "\"\n                allow=\"accelerometer; ").concat(params.autoplay != null ? "autoplay" : "", "; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n                allowfullscreen=\"\" loading=\"lazy\"></iframe>\n        ");
  };
  var set_video = function set_video(el, video_id, params) {
    if (only_iframe) {
      load_iframe(el, video_id, params);
    } else {
      var video = get_yt_video_(function (data) {
        if (data && data.video.x720.url && !skip) {
          el.innerHTML = "\n                    <video class=\"video-container\" ".concat(params.autoplay != null ? 'autoplay=""' : "", " ").concat(params.muted != null ? 'muted=""' : "", " ").concat(params.loop != null ? 'loop=""' : "", " ").concat(params.controls != null ? 'controls=""' : "", " style=\"object-fit: contain\">\n                        <source src=\"").concat(data.video.x720.url, "\" type=\"video/mp4\">\n                    </video>\n                ");
        } else {
          load_iframe(el, video_id, params);
        }
      }, video_id, skip);
    }
  };
  for (var _i4 = 0, _Array$from = Array.from(document.getElementsByClassName("ytVideoSetter")); _i4 < _Array$from.length; _i4++) {
    var el = _Array$from[_i4];
    var video_id = el.getAttribute("video_id");
    if (video_id && video_id.length && video_id.length < 20) {
      set_video(el, video_id, {
        autoplay: el.getAttribute("autoplay"),
        muted: el.getAttribute("muted"),
        loop: el.getAttribute("loop"),
        controls: el.getAttribute("controls")
      });
      if (el.getAttribute("bottomzero")) {
        document.getElementById("ytframe_".concat(video_id)).style.marginBottom = "0";
      }
    }
  }
};
var modal_close_ = function modal_close_() {
  if (modal_displayed) {
    document.body.classList.remove("modal-open");
    document.getElementById("scroll_butt_container").style.display = "";
    document.getElementsByTagName("html")[0].style.overflowY = "";
    var cont = document.querySelector(".modal-content");
    cont.classList.remove("emoji-pay-back");
    cont.style.marginTop = "2em";
    var modal = document.getElementById("donate_item_modal");
    modal.style.opacity = 0;
    setTimeout(function () {
      modal.style.display = "none";
    }, 350);
    modal_displayed = false;
  }
};
var modal_open_ = function modal_open_() {
  var onclick_lock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  modal_displayed = true;
  document.body.classList.add("modal-open");
  document.getElementById("scroll_butt_container").style.display = "none";
  document.getElementsByTagName("html")[0].style.overflowY = "hidden";
  try {
    document.getElementById("private_gift_button_modal").remove();
  } catch (_) {}
  var modal = document.getElementById("donate_item_modal");
  modal.style.display = "block";
  setTimeout(function () {
    modal.style.opacity = 1;
    document.querySelector(".modal-content").style.marginTop = 0;
  }, 50);
  if (!onclick_lock) {
    window.onclick = function (event) {
      if (event.target === modal) {
        modal_close_();
      }
    };
  }
};
var switch_modal_containers = function switch_modal_containers() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "service";
  var info_params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var span = document.getElementsByClassName("close_b")[0];
  var info = document.getElementById("modal-info-container-c");
  var service = document.getElementById("modal-donate-container-c");
  var service_coins = document.getElementById("modal-donate-finish-container-b");
  var success = document.getElementById("modal-donate-success-container");
  var finish_donate = document.getElementById("modal-donate-finish-container-c");
  var title = document.querySelector(".modal-title");
  var _array = [{
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
  for (var i = 0; i < _array.length; i++) {
    var _mode = "none";
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
  span.onclick = function () {
    modal_close_();
  };
};
var discount_calculate = function discount_calculate(price, discount) {
  discount = discount / 100;
  return (price * discount).toFixed();
};
var get_cookie_cart = function get_cookie_cart() {
  var cookie_cart = {};
  try {
    cookie_cart = JSON.parse(Cookies.get(cart_cookie));
  } catch (_) {}
  return cookie_cart;
};
var updateCartCount = function updateCartCount() {
  document.getElementById("count_cart_items_dn").innerText = countProperties(get_cookie_cart());
};
var groupAlreadyInCart = function groupAlreadyInCart(user_cart) {
  var cart = Object.keys(user_cart);
  for (var i = 0; i < donate_services_array.length; i++) {
    if (donate_services_array[i].type === "group") {
      if (cart.includes(donate_services_array[i].id.toString())) {
        return true;
      }
    }
  }
  return false;
};
var donatePayMethodSelector = function donatePayMethodSelector() {
  var choice = parseInt(document.getElementById("donate-pay-method").value);
  var balance = document.getElementById("tokens-balance-choice-dnt-container");
  if (choice == 2) {
    balance.style.marginTop = "1em";
    balance.style.opacity = 1;
    document.getElementById("donate-coins-payment").innerHTML = "";
    checked_coupon = "";
    failed_coupon = "";
  } else {
    balance.style.marginTop = "-1.8em";
    balance.style.opacity = 0;
  }
  return choice;
};
var displayTokens = function displayTokens() {
  var v2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var balance = glob_auth_player_data["BALANCE"];
  if (!tokens_system_enabled) {
    return;
  }
  document.querySelector(".zalupa-card-container").style.display = "";
  if (Number.isInteger(balance)) {
    if (!v2) {
      var base_selector = document.querySelector(".balance-container");
      var balance_value = document.querySelector(".balance-value");
      base_selector.style.display = "";
      balance_value.innerText = balance;
    } else {
      var container_number = document.getElementById("numberZalupaCard");
      if (!document.querySelector(".ZalupaCardInput")) {
        container_number.innerHTML = container_number.innerHTML + "\n                    <input class=\"ZalupaCardInput\" style=\"display:none\" value=\"".concat(glob_auth_player_data["UUID"], "\">\n                ");
      }
      var balance_number = document.querySelector(".number-card-zalupa");
      var card_holder = document.querySelector(".card-holder-zalupa");
      var balance_value_card = document.querySelector(".balance-value-card");
      var balance_choice = document.getElementById("tokens-balance-choice-dnt");
      var cardSelector = "input.ZalupaCardInput";
      var template_tokens = "<span class=\"text-primary\">".concat(balance, "</span> ").concat(getNoun(balance, "токен", "токена", "токенов"));
      balance_choice.innerHTML = "\u0423 \u0442\u0435\u0431\u044F ".concat(template_tokens);
      balance_number.setAttribute("onclick", "clipboardFunc(\n                    \"".concat(cardSelector, "\", \n                    \"\u041D\u043E\u043C\u0435\u0440 \u0442\u0432\u043E\u0435\u0439 <span class=\\\"text-primary\\\" style=\\\"font-weight:800\\\">ZalupaCard</span> \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430.\"\n                )"));
      document.querySelector(cardSelector).value = glob_auth_player_data["UUID"];
      balance_number.innerText = glob_auth_player_data["UUID"];
      card_holder.innerText = glob_auth_player_data["NICKNAME"];
      balance_value_card.innerHTML = template_tokens;
      document.getElementById("card-zalupa").style.backgroundImage = "url(\"".concat(select_card_skin(balance), "\")");
    }
  }
};
var select_card_skin = function select_card_skin(balance) {
  var skins = {
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
    15000: "netherite"
  };
  var keys = Object.keys(skins);
  keys = keys.reverse();
  var path = "./assets/images/card_skins";
  for (var i = 0; i < keys.length; i++) {
    var selector = skins[keys[i]];
    if (balance >= parseInt(keys[i])) {
      if (selector_card_skin_displayed !== selector) {
        console.debug(selector);
        selector_card_skin_displayed = selector;
      }
      return prepare_img_link("".concat(path, "/").concat(selector, ".png"));
    }
  }
  return prepare_img_link("".concat(path, "/clay.png"));
};
var sendTokensModalOpen = function sendTokensModalOpen() {
  notify("Э брат, не завезли пока. Кнопочку не трож");
};
var comment_show_action = function comment_show_action(id) {
  var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var comment_text = document.getElementById("comment_text_".concat(id));
  var comment_show = document.getElementById("comment_show_".concat(id));
  swiper_comments.on("slideChange", function () {
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
};
var checkPrivateServerBuy = function checkPrivateServerBuy() {
  var checkFunction = function checkFunction() {
    var stop_key = "Проходка";
    var _iterator3 = _createForOfIteratorHelper(donate_services_array),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var item = _step3.value;
        // console.debug(`checkPrivateServerBuy : item = ${item.name} / id = ${item.id}`);
        if (item.name === stop_key && glob_auth_player_data.PRIVATE_SERVER) {
          var selector_button = document.querySelector("#donate_item_".concat(item.id, ">div>div.card-body>button"));
          selector_button.innerText = "Куплено";
          selector_button.setAttribute("disabled", "");
          selector_button.removeAttribute("onclick");
          // открывать чек об оплате (если есть)
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  };
  checkFunction();
  setInterval(checkFunction, 300);
};
var initComments = function initComments() {
  var array_ = document.getElementById("comment_swipe_array");
  var createSwiper = function createSwiper() {
    swiper_comments = new Swiper("#comment_swipe_container", {
      spaceBetween: 12,
      loop: true,
      observer: true,
      observeParents: true,
      preventClicks: false,
      preventClicksPropagation: false,
      autoplay: {
        delay: 3000
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
  var playersGet = function playersGet(callback) {
    requestCall(function (r) {
      callback(r);
    }, "assets/data/players.json", "GET", true);
  };
  var searchPlayer = function searchPlayer(players, name) {
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === name) {
        return players[i];
      }
    }
  };
  requestCall(function (r) {
    var comment = r;
    shuffle(comment);
    playersGet(function (players) {
      for (var i = 0; i < comment.length; i++) {
        var player = searchPlayer(players, comment[i].name);
        array_.innerHTML = array_.innerHTML + "\n                        <div class=\"swiper-slide h-auto px-2\">\n                            <figure class=\"card h-100 position-relative border-0 shadow-sm py-3 p-0 p-xxl-4 my-0\">\n                                <span class=\"btn btn-primary btn-lg shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4 ms-xxl-5 zlp-comment-icon\">\n                                  <i class=\"bx bxs-quote-left\"></i>\n                                  \u0417\u0430\u043B\u0443\u043F\u043D\u044B\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439\n                                </span>\n                                <blockquote id=\"comment_block_".concat(i, "\" class=\"card-body mt-2 mb-2\" \n                                            style=\"transition: .8s height\">\n                                    <p id=\"comment_text_").concat(i, "\" class=\"fs-md mb-0\">\n                                            \xAB").concat(comment[i].text, "\xBB</p>\n                                    <span id=\"comment_show_").concat(i, "\" onclick=\"comment_show_action(").concat(i, ")\" \n                                          class=\"pt-1 comment-show-button\">\n                                            \u0420\u0430\u0441\u043A\u0440\u044B\u0442\u044C</span>\n                                </blockquote>\n                                <figcaption class=\"card-footer d-flex align-items-center border-0 pt-0 mt-n2 mt-lg-0\">\n                                    <div>\n                                        <h6 class=\"fw-semibold lh-base mb-0\">").concat(comment[i].name, "</h6>\n                                        <!-- ").concat(player ? "<span class=\"frame_badge_adaptive\">".concat(player.desc, "</span>") : "", " -->\n                                    </div>\n                                </figcaption>\n                            </figure>\n                        </div>\n                    ");
        var comment_text = document.getElementById("comment_text_".concat(i));
        var comment_show = document.getElementById("comment_show_".concat(i));
        comment_show.style.fontWeight = "400";
        comment_text.style.transition = "height .8s cubic-bezier(1, -.3, 0, 1.21) 0s";
        comment_text.setAttribute("fullShowComment", "0");
        var correction_height = 12;
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
};
var buildPlayersSwiper = function buildPlayersSwiper() {
  var array_ = document.getElementById("players-swiper-array");
  var createSwiper = function createSwiper() {
    try {
      document.getElementById("players_block_load").remove();
    } catch (_) {}
    new Swiper("#players_swipe_container", {
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
        },
        2000: {
          slidesPerView: 6
        }
      }
    });
  };
  var badges_get = function badges_get(callback) {
    requestCall(function (r) {
      callback(r);
    }, "assets/data/badges.json", "GET", true);
  };
  try {
    // preload
    loadPlayerAvatar(generateRandomHex(32), "", true);
  } catch (_unused2) {}
  badges_get(function (badges_paste) {
    requestCall(function (r) {
      var player = r;
      shuffle(player);
      var players_array = [];
      var _iterator4 = _createForOfIteratorHelper(player),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var player_in = _step4.value;
          players_array.push(player_in.name);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var selectSkin = function selectSkin(player, skins) {
        if (skins.length < players_array.length) {
          for (var i = 0; i < players_array.length - skins.length; i++) {
            skins.push({
              Nick: "",
              Value: ""
            });
          }
        }
        for (var _i5 = 0; _i5 < skins.length; _i5++) {
          if (player.toLowerCase() === skins[_i5].Nick.toLowerCase()) {
            return skins[_i5].Value;
          }
        }
        return "11228873ae0acb8c1abb9f2ed92b7ef29b7e03a534e4d67ad7435ee759e4cf54";
      };
      getPlayersSkins(function (skins) {
        var _loop2 = function _loop2(i) {
          var getBadges = function getBadges() {
            var result = "";
            player[i].badges.sort();
            for (var s = 0; s < player[i].badges.length; s++) {
              var badge_local = player[i].badges[s];
              if (badge_local && badge_local.length && badge_local !== "verified" && !badge_local.includes("clan-")) {
                result = result + "\n                                        <div class=\"player_badge\" \n                                            style=\"background-image: url(./assets/images/emoji/".concat(badges_paste[badge_local].item, ".png)\"\n                                            data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" \n                                            title=\"").concat(badges_paste[badge_local].title, "\">\n                                        </div>\n                                    ");
              }
            }
            return result;
          };
          var getClan = function getClan() {
            for (var s = 0; s < player[i].badges.length; s++) {
              if (player[i].badges[s].includes("clan-")) {
                return player[i].badges[s].replace("clan-", "");
              }
            }
          };
          glob_players.push(player[i].name);

          // const player_badges_ = getBadges();
          // const player_clan = getClan();
          var player_badges_ = "";
          var player_clan = "";
          player[i].head = prepare_img_link(player[i].head);
          //loadPlayerAvatar(selectSkin(player[i].name, skins), "", true)

          array_.innerHTML = array_.innerHTML + "\n                        <div class=\"swiper-slide text-center\">\n                            <span class=\"d-block py-5\">\n                                <div class=\"player_head_container\">\n                                    <div \n                                        class=\"player-head d-block mx-auto\" \n                                        style=\"background-image: url(".concat(player[i].head, ");border-radius:.75em\"\n                                    ></div>\n                                </div>\n                                <div class=\"card-body p-3\">\n                                    <h3 class=\"fs-lg fw-semibold pt-1 mb-2\">\n                                        ").concat(player[i].name, "\n                                    </h3>\n                                    <!-- <div class=\"player_badge_container\" style=\"").concat(!player_badges_.length ? "display:none" : "", "\">\n                                        ").concat(player_badges_, "\n                                    </div> -->\n                                    <p class=\"fs-sm mb-0\" style=\"text-align:center\">").concat(player[i].desc, "</p>\n                                </div>\n                            </span>\n                        </div>\n                    ");
          // ${player_clan ? `<div
          //                     class="player_clan_badge"
          //                     data-bs-toggle="tooltip" data-bs-placement="top"
          //                     title="${player_clan}"
          // ></div>` : ""}

          // ${player[i].badges.includes("verified") ? `
          //     <i class="verified-icon"
          //     data-bs-toggle="tooltip" data-bs-placement="top"
          //     title="Подтвержденный"> ✔</i>
          // ` : ""}
        };
        // console.log(skins);
        for (var i = 0; i < player.length; i++) {
          _loop2(i);
        }
        createSwiper();
      }, players_array, false);
    }, "assets/data/players.json", "GET", true);
  });
};
var buildDonateHistorySwiper = function buildDonateHistorySwiper() {
  var array_ = document.getElementById("payments-history-swiper-array");
  var createSwiper = function createSwiper() {
    new Swiper("#payments_history_container", {
      slidesPerView: 1,
      spaceBetween: 24,
      autoplay: {
        delay: 1500
      },
      loop: true,
      observer: true,
      observeParents: true,
      preventClicks: false,
      pagination: {
        el: ".payments-history-pagination",
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        },
        920: {
          slidesPerView: 4
        },
        1200: {
          slidesPerView: 5
        },
        1600: {
          slidesPerView: 6
        },
        1900: {
          slidesPerView: 7
        },
        2100: {
          slidesPerView: 8
        },
        2500: {
          slidesPerView: 9
        }
      }
    });
  };
  var updateDonateTime = function updateDonateTime() {
    var selectors = document.querySelectorAll("#item-donate-history-desc>time");
    for (var i = 0; i < selectors.length; i++) {
      var select = selectors[i];
      var time_ = select.getAttribute("datetime");
      select.innerHTML = formatDate(new Date(time_), time_in_moscow_get());
    }
  };
  getPaymentHistory(function (data) {
    if (!data || !data.length) {
      return;
    }
    for (var i = 0; i < data.length; i++) {
      var date = new Date(data[i].updated_at);
      data[i].product.image = prepare_img_link(data[i].product.image);
      array_.innerHTML = array_.innerHTML + "\n                    <!-- use player template for donate history swiper -->\n                    <div class=\"swiper-slide text-center\">\n                        <span class=\"d-block py-3\">\n                            <div class=\"player_head_container\">\n                                <div \n                                    class=\"player-head d-block mx-auto\" \n                                    style=\"background-image: url(".concat(data[i].product.image, ");height:65px!important\"\n                                ></div>\n                            </div>\n                            <div class=\"card-body p-3\">\n                                <h5 class=\"h5 fs-6 fw-semibold pt-1 mb-2\">\n                                    ").concat(data[i].product.name, "\n                                </h5>\n                                <p class=\"fs-sm mb-0\" id=\"item-donate-history-desc\">\n                                    <span class=\"text-gradient-primary fw-bold\">").concat(data[i].customer, "</span>\n                                    <br/>\n                                    <time datetime=\"").concat(date.toString(), "\"></time>\n                                </p>\n                            </div>\n                        </span>\n                    </div>\n                ");
    }
    document.getElementById("last_donate_block_load").remove();
    createSwiper();
    setInterval(updateDonateTime, 1000);
  });
};
var donate_bg_preload = function donate_bg_preload() {
  var bg_ls = ["emoji-background-donate-light", "emoji-background-donate"];
  for (var i = 0; i <= bg_ls; i++) {
    getImageLightness("assets/images/".concat(i, ".png"), undefined, false);
  }
};
var setSticker = function setSticker() {
  var stickers_count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var custom_path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var path = "assets/images/stickers/sticker".concat(randDiaps(stickers_count), ".webp");
  if (custom_path) {
    path = custom_path;
  } else if (lock_sticker_switch) {
    return;
  }
  var link = prepare_img_link(path);
  document.getElementById("super-klassniy-sticker-".concat(id)).style.backgroundImage = "url(".concat(link, ")");
};
var setRandomStickerLand = function setRandomStickerLand() {
  var stickers_count = 32;
  var selector = document.getElementById("super-klassniy-sticker-0");
  for (var i = 0; i <= stickers_count; i++) {
    getImageLightness("assets/images/stickers/sticker".concat(i, ".webp"), undefined, false);
  }
  setInterval(function () {
    if (window.pageYOffset > 1600 || donate_displayed) {
      selector.style.opacity = 0;
    } else if (!donate_displayed && window.pageYOffset <= 1600) {
      setTimeout(function () {
        selector.style.opacity = .4;
      }, 800);
    } else {
      selector.style.opacity = .4;
    }
  }, 30);
  var updateStickerPosition = function updateStickerPosition() {
    if (window.innerWidth >= 992) {
      selector.style.top = "".concat(randDiaps(85), "%");
      selector.style.left = "".concat(randDiaps(85), "%");
    } else {
      selector.style.top = "".concat(randDiaps(100), "%");
      selector.style.left = "".concat(randDiaps(75), "%");
    }
  };
  setSticker(stickers_count);
  setInterval(setSticker, 6000, stickers_count);
  updateStickerPosition();
  setInterval(updateStickerPosition, 3000);
};
var donate_element_click = function donate_element_click(product_data) {
  switch_modal_containers("service");
  var exclude_types = ["group"];
  var desc = document.getElementById("donate_item_select_text");
  var text_template = "\u0422\u043E\u0432\u0430\u0440 <span class=\"text-primary fw-semibold\">".concat(product_data.name, "</span>,\n            \u0446\u0435\u043D\u0430 ").concat(product_data.count, " ").concat(getNoun(product_data.count, "единицы", "единиц", "единиц"), "\n        <span class=\"text-primary fw-semibold\">\n            ").concat(product_data.price, "\n            ").concat(getNoun(product_data.price, "рубль", "рубля", "рублей"), "\n        </span>.\n    ");
  var items_count_donate = document.getElementById("items_count_donate");
  var count_hint = document.getElementById("donate_count_text_hint");
  var add_to_cart = document.getElementById("donate_button_add_to_cart");
  var cookie_cart = get_cookie_cart();
  var switch_ = false;
  var _update_count = function _update_count() {
    add_to_cart.setAttribute("onClick", "donate_cart(".concat(product_data.service_id, ", ").concat(items_count_donate.value, ")"));
  };
  items_count_donate.value = 1;
  _update_count();
  var product_in_cart = cookie_cart.hasOwnProperty(product_data.service_id.toString());
  if ((exclude_types.includes(product_data.type) || product_data.type === "group") && groupAlreadyInCart(cookie_cart)) {
    switch_modal_containers("info");
    switch_ = true;
    var group_error = "";
    if (product_data.type === "group") {
      group_error = "Вы уже выбрали привилегию. Удалите её из корзины, если хотите выбрать другую.";
    } else if (product_in_cart) {
      group_error = "\u041E\u0448\u0438\u0431\u043A\u0430, \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \n                <span class=\"text-primary fw-semibold\">".concat(product_data.name, "</span> \n                \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0434\u0438\u043D \u0440\u0430\u0437.");
    } else {
      group_error = "Мы не знаем почему, но эта ошибка вызвана по неизвестным причинам.";
    }
    document.getElementById("donate_info_block_text").innerHTML = group_error;
  }
  var count_state = "block";
  if (exclude_types.includes(product_data.type)) {
    count_state = "none";
  }
  items_count_donate.style.display = count_state;
  count_hint.style.display = count_state;
  var only_dig = function only_dig() {
    var value = items_count_donate.value;
    items_count_donate.value = value.replace(/\D+/g, "");
  };
  var _calculate_price = function _calculate_price() {
    only_dig();
    if (!exclude_types.includes(product_data.type)) {
      var _price = parseInt(items_count_donate.value) * product_data.price;
      var currenct_in_cart = cookie_cart[product_data.service_id];
      var template_counter_i = "";
      if (isNaN(_price) || 1 > Math.sign(_price)) {
        _price = 0;
      }
      if (currenct_in_cart) {
        template_counter_i = "\n                    \u0423\u0436\u0435 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 - \n                        <span class=\"text-primary fw-semibold\">\n                            ".concat(currenct_in_cart, "\n                        </span>\n                ");
      }
      desc.innerHTML = "".concat(text_template, "\n                    <br/>\n                    \u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C - \n                        <span class=\"text-primary fw-semibold\">\n                            ").concat(_price, " \n                            ").concat(getNoun(_price, "рубль", "рубля", "рублей"), "\n                        </span>\n                    <br/>\n                    ").concat(template_counter_i, "\n                ");
      _update_count();
    }
  };
  desc.innerHTML = text_template;
  _calculate_price();
  items_count_donate.addEventListener("input", function (_) {
    _calculate_price();
  });
  modal_open_();
};
var donate_get_service_by_id = function donate_get_service_by_id(id) {
  for (var i = 0; i < donate_services_array.length; i++) {
    if (donate_services_array[i].id === parseInt(id)) {
      return donate_services_array[i];
    }
  }
  return null;
};
var donateResetPaymentState = function donateResetPaymentState() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var repeat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var coupon_reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var coupon_sl = document.getElementById("donate-coins-payment");
  var inputs = ["donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c", "donate-pay-method"];
  var sl = "_c";
  var vl = document.getElementById("donate_sum").value.trim();
  if (!coins_sell_mode) {
    sl = "";
    vl = 0;
  }
  var button = document.getElementById("payment-button-donate" + sl);
  var update_inputs = function update_inputs() {
    for (var i = 0; i < inputs.length; i++) {
      var _sl = document.getElementById(inputs[i]);
      if (inputs[i].includes("coupon") && !coupon_reset) {
        // pass
      } else if (inputs[i].includes("method")) {
        _sl.value = 1;
      } else {
        _sl.value = "";
      }
    }
  };
  if (coupon_reset) {
    coupon_sl.innerHTML = "";
    update_inputs();
    checked_coupon = "";
    failed_coupon = "";
  }
  button.setAttribute("onClick", "generatePaymentLink(".concat(type, ", ").concat(type === 2 ? 1 : vl, ")"));
  button.removeAttribute("disabled");
  button.innerText = repeat ? "Повторить" : "Дальше";
};
var donate_cart = function donate_cart(product, count) {
  var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cart = Cookies.get(cart_cookie);
  var cart_parsed = get_cookie_cart();
  var product_count_in_cart = 0;
  var max_item_count = 30000;
  var local_prm = '<span style="color: #a4a6ff">';
  try {
    var _p2 = cart_parsed[product];
    if (Number.isInteger(_p2)) {
      product_count_in_cart = +_p2;
    }
  } catch (_) {}
  if (!Number.isInteger(product) || !Number.isInteger(count)) {
    return;
  } else if (1 > Math.sign(count)) {
    notify("Количество не может быть равно нулю или меньше");
    return;
  } else if (product_count_in_cart + count > max_item_count) {
    notify("\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E - ".concat(local_prm).concat(max_item_count, "</span>"));
    return;
  }
  if (!cart) {
    Cookies.set(cart_cookie, JSON.stringify({}));
  }
  var els_ = JSON.parse(Cookies.get(cart_cookie));
  var product_data = donate_get_service_by_id(product);
  if (remove) {
    delete els_[product];
    notify("\u0422\u043E\u0432\u0430\u0440 ".concat(local_prm, " ").concat(product_data.name, "</span> \u0443\u0431\u0440\u0430\u043D \u0438\u0437 \u043A\u043E\u0440\u0437\u0438\u043D\u044B"));
  } else {
    if (els_[product]) {
      els_[product] = els_[product] + count;
      notify("\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ".concat(local_prm, " ").concat(count, " \n                    </span>\n                    ").concat(getNoun(count, "единица", "единицы", "единиц"), " \n                    \u0442\u043E\u0432\u0430\u0440\u0430 ").concat(local_prm, " ").concat(product_data.name, " \n                    </span>"));
    } else {
      els_[product] = count;
      notify("\u0422\u043E\u0432\u0430\u0440 ".concat(local_prm, " ").concat(product_data.name, "</span> \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443"));
    }
  }
  Cookies.set(cart_cookie, JSON.stringify(els_));
  modal_close_();
  initDonate();
  updateCartCount();
  donateResetPaymentState();
};
var donate_cart_button = function donate_cart_button() {
  var els = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var selector_ = document.querySelectorAll(".donate-cart-button-cn");
  if (coins_sell_mode) {
    return;
  }
  var _loop3 = function _loop3(i) {
    var sl = selector_[i].style;
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
  };
  for (var i = 0; i < selector_.length; i++) {
    _loop3(i);
  }
};
var donateFlushCart = function donateFlushCart() {
  Cookies.remove(cart_cookie);
  donate_cart_button({});
  notify("Корзина очищена");
};
var setAvatar = function setAvatar(user) {
  var photoTG = false;
  var selector = document.getElementById("telegram-auth-avatar").style;
  if (user.photo_url && photoTG) {
    selector.backgroundImage = "url(".concat(user.photo_url, ")");
  } else {
    selector.background = "linear-gradient(343deg, var(--telegram-bgcolor".concat(getAvatarColorIDforTG(user.id), "-top) 0%, var(--telegram-bgcolor").concat(getAvatarColorIDforTG(user.id), "-bottom) 100%)");
    var avatarSelector = document.getElementById("tg-user-avatar-text");
    try {
      avatarSelector.innerText = "".concat(user.first_name.slice(0, 1)).concat(user.last_name ? user.last_name.slice(0, 1) : "").toUpperCase();
    } catch (_) {
      avatarSelector.innerHTML = "N/A";
    }
  }
};
var checkAuthAndDisplayDonate = function checkAuthAndDisplayDonate() {
  checkTelegramAuthData(function (response) {
    if (response.player_data.NICKNAME) {
      donateSwitchContainer();
    }
  }, false, true);
};
var onTelegramAuth = function onTelegramAuth(user) {
  Cookies.set(telegram_cookie_token, utf8_to_b64(JSON.stringify(user)));
  modal_close_();
  notify("\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u043A\u0430\u043A <span class=\"text-gradient-primary\">".concat(user.first_name, " ").concat(user.last_name ? user.last_name : "", "</span>"));
  autoAuthTelegramObserver();
  // checkAuthAndDisplayDonate();
};

var debugWriteTelegramAuth = function debugWriteTelegramAuth(data) {
  Cookies.set(telegram_cookie_token, data);
};
var getTelegramAuth = function getTelegramAuth() {
  var raw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var cookie_field = Cookies.get(telegram_cookie_token);
  if (cookie_field) {
    if (raw) {
      return cookie_field;
    } else if (cookie_field) {
      return JSON.parse(b64_to_utf8(cookie_field));
    }
  }
};
var couponCheck = function couponCheck() {
  var coins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var selector_c = "";
  if (coins_sell_mode) {
    selector_c = "-c";
  }
  var input = document.getElementById("coupon-input" + selector_c);
  var button = document.getElementById("coupon-button" + selector_c);
  var code = "";
  try {
    code = input.value.trim().toUpperCase();
  } catch (_) {}
  var coupon_notfd = function coupon_notfd() {
    notify("\u041A\u0443\u043F\u043E\u043D <span class=\"text-primary fw-semibold\">".concat(failed_coupon, "</span> \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"));
  };
  var check_coupon_valid = function check_coupon_valid(products, product) {
    if (products) {
      for (var i = 0; i < products.length; i++) {
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
  var input_lock = function input_lock() {
    var lock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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
  if (donatePayMethodSelector() !== 2) {
    check_coupon(function (r) {
      // console.log(`check_coupon = ${typeof r}`);
      if (r) {
        var call = function call() {
          checked_coupon = code;
          notify("\u041A\u0443\u043F\u043E\u043D <span class=\"text-primary fw-semibold\">".concat(code, "</span> \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439"));
        };
        if (!coins_sell_mode) {
          call();
          donateCartCall(code, false);
        } else if (check_coupon_valid(r.products, current_c_item)) {
          call();
          var sl = document.getElementById("donate-coins-payment");
          sl.innerHTML = "<li class=\"list-group-item d-flex justify-content-between bg-light\">\n                        <div class=\"text-primary\">\n                            <h6 class=\"my-0 text-start\">\u041A\u0443\u043F\u043E\u043D</h6>\n                            <small class=\"text-start\" style=\"float: left\">".concat(code, "</small>\n                        </div>\n                        <span class=\"text-muted text-end\" style=\"width: 30%\">\n                            ").concat(r.discount, "%</span>\n                    </li>");
        } else {
          notify("Этот купон недействительный");
        }
      } else {
        failed_coupon = code;
        coupon_notfd();
      }
      input_lock();
    }, code);
  } else {
    notify("Купон недоступен для Zalupa Pay");
    input_lock();
  }
};
var donate_enable_coupon = function donate_enable_coupon() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var input = document.getElementById("coupon-input");
  var button = document.getElementById("coupon-button");
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
};
var get_data_service = function get_data_service(service_id) {
  for (var i = 0; i < products_by_serverid.length; i++) {
    if (parseInt(products_by_serverid[i].id) === parseInt(service_id)) {
      return products_by_serverid[i];
    }
  }
};
var generatePaymentLink = function generatePaymentLink() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var selector_c = "";
  if (coins_sell_mode) {
    selector_c = "_c";
  }
  var button = document.getElementById("payment-button-donate" + selector_c);
  var customer = document.getElementById("donate_customer" + selector_c).value.trim();
  var email = document.getElementById("donate_email" + selector_c).value.trim();
  var coupon = "";
  customer = glob_auth_player_data.NICKNAME;
  var max_sum = 30000;
  var local_prm = '<span style="color: #a4a6ff">';
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
      notify("\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0443\u043C\u043C\u0430 - ".concat(local_prm).concat(max_sum, "</span>"));
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
    products = JSON.parse("{\"".concat(current_c_item, "\": ").concat(sum, "}"));
  } else {
    products = get_cookie_cart();
  }
  button.setAttribute("disabled", "");
  button.innerText = "Проверяем данные...";
  var _d_service = get_data_service(current_c_item);
  create_payment(function (callback_data) {
    if (callback_data) {
      button.removeAttribute("disabled");
      button.innerText = "Оплатить";
      if (callback_data.zalupa_pay) {
        zalupa_pay_finish_modal();
      } else {
        payment_url_global = callback_data.url;
        button.setAttribute("onClick", "payment_action_bt()");
      }
    } else {
      notify("Ошибка, не удалось сформировать чек для оплаты");
      donateResetPaymentState(type, repeat = true);
    }
  }, customer, products, _d_service.server_id, email, coupon);
};
var zalupa_pay_finish_modal = function zalupa_pay_finish_modal() {
  var container = document.getElementById("only-ok-payment");
  container.innerHTML = "\n    <div style=\"\n        background: rgb(28 28 28 / 15%);\n        padding: 1.15em;\n        border-radius: 0.72em;\n        backdrop-filter: blur(1.35em);\n        -webkit-backdrop-filter: blur(1.35em);\n    \">\n            <p style=\"\n                font-weight: 800;\n                margin-bottom: 0;\n            \">\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0447\u0442\u043E \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438\u0441\u044C ZalupaPay!</p>                \n    </div>\n    ";
  enable_modal_result_sc();
  checkTelegramAuthData(function (_) {}, false, false, true);
  document.querySelector(".modal-title").innerText = "";
  document.querySelector(".modal-content").classList.add("emoji-pay-back");
};
var enable_modal_result_sc = function enable_modal_result_sc() {
  switch_modal_containers("success");
  modal_open_();
  donateResetPaymentState();
};
var payment_action_bt = function payment_action_bt() {
  window.open(payment_url_global, "_blank");
  var cart_dom = document.getElementById("donate-cart-list-success");
  var succ_text = document.getElementById("success-pay-text-js");
  var cont_ok = document.getElementById("only-ok-payment");
  var title = document.querySelector(".modal-title");
  var build_modal_wind = function build_modal_wind() {
    cart_dom.innerHTML = "";
    title.innerText = "";
    succ_text.innerText = "Давай, плати. Шеф ждёт...";
    cont_ok.style.display = "";
    document.querySelector("img.payment-sucess-vova").setAttribute("src", "assets/images/vova-gay.webp");
  };
  var flush_inputs_donate = function flush_inputs_donate() {
    var inputs = ["donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c"];
    for (var i = 0; i < inputs.length; i++) {
      document.getElementById(inputs[i]).value = "";
    }
  };
  enable_modal_result_sc();
  flush_inputs_donate();
  build_modal_wind();
};
var donate_check_services_cart = function donate_check_services_cart() {
  var services_cookie = Object.keys(get_cookie_cart());
  var services_origin = donate_services_array;
  var services = [];
  for (var i = 0; i < services_origin.length; i++) {
    services.push(services_origin[i].id);
  }
  for (var _i6 = 0; _i6 < services_cookie.length; _i6++) {
    if (!services.includes(parseInt(services_cookie[_i6]))) {
      var cart = JSON.parse(Cookies.get(cart_cookie));
      delete cart[parseInt(services_cookie[_i6])];
      Cookies.set(cart_cookie, JSON.stringify(cart));
      console.log("Remove ".concat(services_cookie[_i6], " from cart"));
    }
  }
};
var initDonate = function initDonate() {
  var els = {};
  try {
    els = JSON.parse(Cookies.get(cart_cookie));
  } catch (_) {}
  donate_cart_button(els);
  donate_enable_coupon(true);
};
var donateCartCall = function donateCartCall() {
  var coupon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var nickname_update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var cart = get_cookie_cart();
  var cart_keys = Object.keys(cart);
  var cart_dom = document.getElementById("donate-cart-list");
  var selectors_payment = [document.getElementById("donate_customer"), document.getElementById("donate_email"), document.getElementById("coupon-input")];
  switch_modal_containers("donate_finish");
  modal_open_();
  cart_dom.innerHTML = "";
  var sum_price = 0;
  for (var i = 0; i < selectors_payment.length; i++) {
    selectors_payment[i].addEventListener("input", function (_) {
      donateResetPaymentState();
    });
  }
  for (var _i7 = 0; _i7 < cart_keys.length; _i7++) {
    var item = donate_get_service_by_id(cart_keys[_i7]);
    var price = item.price * cart[item.id];
    sum_price += price;
    cart_dom.innerHTML = cart_dom.innerHTML + "\n            <li class=\"list-group-item d-flex justify-content-between lh-sm\">\n                <div>\n                    <h6 class=\"my-0 text-start\">\n                        <span class=\"text-primary fw-semibold\">\n                            x".concat(item.number, "</span> \n                        ").concat(item.name, "\n                    </h6>\n                    <small class=\"text-muted text-start cart-desc-td\">").concat(item.description, "</small>\n                </div>\n                <span class=\"text-muted text-end\" style=\"width: 30%\">\n                    ").concat(price, " ").concat(getNoun(price, "рубль", "рубля", "рублей"), "\n                    <br/>x").concat(cart[item.id], "</span>\n            </li>\n        ");
  }
  var coupon_container = function coupon_container() {
    cart_dom.innerHTML = cart_dom.innerHTML + "<li class=\"list-group-item d-flex justify-content-between bg-light\">\n                <div class=\"text-primary\">\n                    <h6 class=\"my-0 text-start\">\u041A\u0443\u043F\u043E\u043D</h6>\n                    <small class=\"text-start\" style=\"float: left\">".concat(coupon, "</small>\n                </div>\n            </li>");
  };
  var sum_container = function sum_container() {
    cart_dom.innerHTML = cart_dom.innerHTML + "<li class=\"list-group-item d-flex justify-content-between\">\n                <span>\u0421\u0443\u043C\u043C\u0430</span>\n                <strong>".concat(sum_price, " ").concat(getNoun(sum_price, "рубль", "рубля", "рублей"), "</strong>\n            </li>");
  };
  if (coupon) {
    coupon_container();
  }
  sum_container();
  if (nickname_update) {
    shuffle(glob_players);
    document.querySelector("input#donate_customer").setAttribute("placeholder", glob_players[0]);
  }
};
var donateCoinsPay = function donateCoinsPay() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var button = document.getElementById("payment-button-donate_c");
  var sum = document.getElementById("donate_sum");
  if (!sum.value && !/^[\d]+$/.test(sum.value)) {
    sum = 0;
  } else {
    sum = sum.value;
  }
  button.setAttribute("onClick", "generatePaymentLink(".concat(type, ", ").concat(type === 2 ? 1 : sum, ")"));
};
var donateModalCall = function donateModalCall(type_item, item_id) {
  var nickname_update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  current_item_type = type_item;
  var sum = document.getElementById("donate_sum");
  var customer_field = document.getElementById("donate_customer_c");
  var sum_container = document.getElementById("sum-tokens-container");
  var email_container_classL = document.getElementById("customer-email-tokens-container").classList;
  var modal_payment_text = document.getElementById("donate-text-span");
  var selector_method_pay = document.getElementById("donate-pay-method");
  var payment_text_form;
  var selectors_payment = [document.getElementById("donate_sum"), document.getElementById("donate_customer_c"), document.getElementById("donate_email_c"), document.getElementById("coupon-input-c")];
  var title = document.querySelector(".modal-title");
  var item_name;
  var update_title = function update_title(descriptor) {
    title.innerText = title.innerText.replace(/\([\s\S]*?\)/).trim();
    title.innerText = "".concat(title.innerText, " (").concat(descriptor, ")");
  };
  current_c_item = item_id;
  current_c_item_name = get_data_service(item_id).name;
  selector_method_pay.value = 1;
  donatePayMethodSelector();
  if (type_item === 1 || type_item === 3) {
    selector_method_pay.setAttribute("disabled", "");
    sum_container.style.display = "";
    email_container_classL.remove("col-sm-6");
    email_container_classL.add("col-12");
    var donate_sum_title = document.getElementById("donate-sum-title");
    if (type_item === 1) {
      payment_text_form = "\n                \u0412\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0432\u0448\u0438\u0441\u044C \u044D\u0442\u043E\u0439 \u0444\u043E\u0440\u043C\u043E\u0439, \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E.\n                \u0417\u0430 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0432\u043E\u0437\u043D\u0430\u0433\u0440\u0430\u0436\u0434\u0435\u043D\u0438\u0435 \u2013 \u0437\u0430 \u043A\u0430\u0436\u0434\u044B\u0439 \u0440\u0443\u0431\u043B\u044C \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0438\u0433\u0440\u043E\u0432\u043E\u043C\u0443 \u0442\u043E\u043A\u0435\u043D\u0443.\n            ";
      item_name = "Токены";
      donate_sum_title.innerText = "Сумма";
      // except
      sum.addEventListener("input", function (_) {
        donateCoinsPay();
      });
    } else if (type_item === 3) {
      payment_text_form = "\n                \u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442 +1 \u0441\u043B\u043E\u0442 \u0432 \u043A\u043B\u0430\u043D. \u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0432\u0430\u0448 \u043A\u043B\u0430\u043D \u043F\u043E \u043D\u0438\u043A\u043D\u0435\u0439\u043C\u0443, \n                \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0431\u0443\u0434\u044C\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u044B \u043F\u0435\u0440\u0435\u0434 \u043E\u043F\u043B\u0430\u0442\u043E\u0439. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432 \u043A\u0430\u043A\u043E\u043C \u043A\u043B\u0430\u043D\u0435 \u0432\u044B \u0441\u043E\u0441\u0442\u043E\u0438\u0442\u0435.\n            ";
      item_name = "Слоты";
      donate_sum_title.innerText = "Количество";
      customer_field.addEventListener("input", function (_) {
        donateCoinsPay(type_item);
      });
    }
  } else if (type_item === 2) {
    selector_method_pay.removeAttribute("disabled");
    sum_container.style.display = "none";
    email_container_classL.remove("col-12");
    email_container_classL.add("col-sm-6");
    desc_get = get_data_service(current_c_item).description;
    if (!desc_get) {
      desc_get = "";
    }
    payment_text_form = "\n            \u0424\u043E\u0440\u043C\u0430 \u043E\u043F\u043B\u0430\u0442\u044B \u043F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0438\u0433\u0440\u043E\u0432\u043E\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430 Zalupa.Online\n            <br/>\n            <span class=\"text-primary\">\n                ".concat(desc_get, "\n            </span>\n        ");
    item_name = current_c_item_name;
    customer_field.addEventListener("input", function (_) {
      donateCoinsPay(type_item);
    });
  }
  modal_payment_text.innerHTML = payment_text_form.replaceAll("\n", "");
  for (var i = 0; i < selectors_payment.length; i++) {
    selectors_payment[i].addEventListener("input", function (_) {
      donateResetPaymentState(type_item);
    });
  }
  switch_modal_containers("service_coins");
  modal_open_();
  if (nickname_update) {
    var randomNick = false;
    var fldSelect = document.querySelector("input#donate_customer_c");
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
};
var linksSet = function linksSet(selector_) {
  var fisrt_el_mrg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var sl = document.getElementById(selector_);
  var mrg = "margin-left: 0 !important";
  for (var i = 0; i < links_lt.length; i++) {
    if (!fisrt_el_mrg || i) {
      mrg = "";
    }
    sl.innerHTML = sl.innerHTML + "<a href=\"".concat(links_lt[i].link, "\" \n                target=\"_blank\" style=\"").concat(mrg, "\"\n                class=\"btn btn-icon btn-secondary btn-").concat(links_lt[i].name, " mx-2\">\n                    <i class=\"bx bxl-").concat(links_lt[i].name, "\"></i>\n            </a>");
  }
};
var initCrypto = function initCrypto() {
  if (!freeze_crypto) {
    freeze_crypto = true;
    crypto_token = "";
    getCrypto(function (token_) {
      crypto_token = token_;
      freeze_crypto = false;
    });
  }
};
var initLanding = function initLanding() {
  if (development_hosts.includes(window.location.hostname) && lock_of) {
    document.getElementById("landing_description_gb").innerText = "Этот сайт - preview-версия!";
    document.getElementById("donate-test-mode-enb").innerText = "Этот блок работает в демонстративном режиме и не является функциональным.";
  }
  linksSet("landing-links-tp", true);
  linksSet("links-block-footer-v");
};
var finishLoad = function finishLoad() {
  document.querySelector("main").setAttribute("style", "");
  document.querySelector("footer").setAttribute("style", "");
  var heart = "<i class=\"emoji\" style=\"background-image:url('assets/images/emoji/red-heart.png');" + "font-size: .7rem;bottom:-1px\"><b>\u2764\uFE0F</b></i>";
  document.getElementById("footer-text-blc").innerHTML = "\u0421\u043E\u0437\u0434\u0430\u043B KovalYRS \u0441 ".concat(heart, ", \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E \u0434\u043B\u044F ZALUPA.ONLINE");
  if (grecaptcha) {
    document.getElementById("re-badge-text").innerText = "This site uses Google ReCaptcha technology";
  }
};
var observerSystemTheme = function observerSystemTheme() {
  var mode_list = ["dark", "light"];
  var theme_switch = document.querySelector('[data-bs-toggle="mode"]').querySelector(".form-check-input");
  var updateTheme = function updateTheme(mode) {
    if (mode === "dark") {
      root.classList.add("dark-mode");
      theme_switch.checked = true;
    } else {
      root.classList.remove("dark-mode");
      theme_switch.checked = false;
    }
  };
  var _loop4 = function _loop4(i) {
    var observer = window.matchMedia("(prefers-color-scheme: ".concat(mode_list[i], ")"));
    observer.addEventListener("change", function (e) {
      return e.matches && updateTheme(mode_list[i]);
    });
  };
  for (var i = 0; i < mode_list.length; i++) {
    _loop4(i);
  }
};
var callSucessPayModal = function callSucessPayModal() {
  var payment_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var glob_func_payment_data;
  var item_nm_payment_result = false;
  var cart_dom = document.getElementById("donate-cart-list-success");
  var succ_text = document.getElementById("success-pay-text-js");
  var cont_ok = document.getElementById("only-ok-payment");
  var title = document.querySelector(".modal-title");
  donateSwitchContainer(true);
  var item_type_ = function item_type_(product_name) {
    var t = product_name.toLowerCase();
    if (t.includes("токен")) {
      return 1;
    } else {
      return 2;
    }
  };
  var update_pm_desc = function update_pm_desc() {
    var img_product = glob_func_payment_data.product.image;
    var name_product = glob_func_payment_data.product.name;
    if (img_product && img_product.length) {
      document.querySelector(".payment-sucess-vova").src = img_product;
      var name_selector = document.querySelector(".item-name-payment-result");
      if (item_nm_payment_result) {
        name_selector.innerText = name_product;
      } else {
        name_selector.style.marginBottom = "4vh";
      }
    }
  };
  var buildPayment = function buildPayment(payment) {
    if (payment.status && payment_id == parseInt(payment.id)) {
      glob_func_payment_data = payment;
      succ_text.innerText = "Оплата прошла успешно, Шеф доволен, спасибо тебе.";
      cont_ok.style.display = "";
      var private_gift_button = document.createElement("button");
      private_gift_button.id = "private_gift_button_modal";
      private_gift_button.setAttribute("class", "btn btn-primary shadow-primary btn-lg mb-2 btn-shadow-hide");
      private_gift_button.innerText = "button::init";
      var item_type = item_type_(payment.product.name);
      var system_template = "\n                <li class=\"list-group-item d-flex justify-content-between lh-sm\">\n                    <div>\n                        <h6 class=\"my-0 text-start\">\n                            \u0421\u0438\u0441\u0442\u0435\u043C\u0430\n                        </h6>\n                    </div>\n                    <span>".concat(payment.payment_system, "</span>\n                </li>\n            ");
      var sum_template = "\n                <li class=\"list-group-item d-flex justify-content-between\">\n                    <span>\u0421\u0443\u043C\u043C\u0430 \u0437\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F</span>\n                    <strong class=\"bottom-line-set bottom-line-set-zlp color-set-zlp\">".concat(payment.enrolled, " ").concat(getNoun(payment.enrolled, "рубль", "рубля", "рублей"), "</strong>\n                </li>\n            ");
      if (coins_sell_mode) {
        if (item_type === 1) {
          sum_template = "\n                        <li class=\"list-group-item d-flex justify-content-between\">\n                            <span>\u0421\u0443\u043C\u043C\u0430</span>\n                            <strong class=\"bottom-line-set bottom-line-set-zlp color-set-zlp\">".concat(payment.enrolled, " ").concat(getNoun(payment.enrolled, "токен", "токена", "токенов"), "</strong>\n                        </li>\n                    ");
        } else if (item_type === 2) {
          sum_template = "\n                        <li class=\"list-group-item d-flex justify-content-between\">\n                            <span>\u0421\u0443\u043C\u043C\u0430</span>\n                            <strong class=\"bottom-line-set bottom-line-set-zlp color-set-zlp\">".concat(payment.product.price, " ").concat(getNoun(payment.enrolled, "рубль", "рубля", "рублей"), "</strong>\n                        </li>\n                    ");
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
        var parsed_time = new Date(payment.created_at);
        payment.created_at = "".concat(parsed_time.toLocaleDateString(), " ").concat(parsed_time.toLocaleTimeString());
      }
      var template_invite_link = "";
      if (payment.private_invite) {
        template_invite_link = "\n                    <li class=\"list-group-item d-flex justify-content-between lh-sm mb-2 mb-lg-3 mt-4 mt-lg-5\">\n                        <a href=\"".concat(payment.private_invite, "\" id=\"private-chat-button\" target=\"_blank\" style=\"margin:auto\"\n                                   class=\"btn btn-primary shadow-primary btn-lg btn-shadow-hide\">\n                                \u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u0432 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0439 \u0447\u0430\u0442 <i class=\"ms-1 bx bxl-telegram\"></i></a>\n                    </li>\n                ");
      }
      cart_dom.innerHTML = "\n                <li class=\"list-group-item d-flex justify-content-between lh-sm\">\n                    <div>\n                        <h6 class=\"my-0 text-start\">\n                            \u041D\u0438\u043A\u043D\u0435\u0439\u043C\n                        </h6>\n                    </div>\n                    <span>".concat(payment.customer, "</span>\n                </li>\n                <li class=\"list-group-item d-flex justify-content-between lh-sm\">\n                    <div>\n                        <h6 class=\"my-0 text-start\">\n                            \u041F\u043E\u0447\u0442\u0430\n                        </h6>\n                    </div>\n                    <span>").concat(payment.email, "</span>\n                </li>\n                ").concat(system_template, "\n                <li class=\"list-group-item d-flex justify-content-between lh-sm\">\n                    <div>\n                        <h6 class=\"my-0 text-start\">\n                            \u0412\u0440\u0435\u043C\u044F\n                        </h6>\n                    </div>\n                    <span>").concat(payment.created_at, "</span>\n                </li>\n                ").concat(sum_template, "\n                ").concat(template_invite_link, "\n            ");
    } else {
      succ_text.innerText = "Чек неоплачен, Шеф недоволен.";
      document.querySelector("img.payment-sucess-vova").setAttribute("src", "assets/images/vova-fail.webp");
    }
  };
  var enable_modal = function enable_modal(payment) {
    buildPayment(payment);
    switch_modal_containers("success");
    modal_open_();

    // updaters
    update_pm_desc();
  };
  checkPayment(function (payment) {
    if (typeof payment.status !== "undefined") {
      enable_modal(payment);
      title.innerText = "\u0427\u0435\u043A #".concat(payment.id);
    } else {
      notify("Ошибка, чек не найден или EasyDonate вернул недействительный ответ");
    }
  }, payment_id);
};
var successPay = function successPay() {
  var url = new URL(window.location.href).searchParams;
  var payment_id = url.get("pg_order_id");
  if (payment_id) {
    callSucessPayModal(payment_id);
  }
};
var displayPromotion = function displayPromotion() {
  var selector = document.querySelector("div.promotion-header");
  var main = document.querySelector("main");
  requestCall(function (promotion) {
    if (promotion.active) {
      var text = promotion.text;
      selector.style.minHeight = "40px";
      selector.style.height = "100%";
      selector.setAttribute("onclick", "clipboardFunc(\"input.promotionInput\", \"\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 <span class=\\\"text-primary\\\" style=\\\"font-weight:800\\\">".concat(promotion["var"], "</span> \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430.\")"));
      selector.innerHTML = "\n                <p class=\"text-center\" style=\"color:#fff!important;line-height:200%\">".concat(text, "</p>\n                <input class=\"promotionInput\" value=\"").concat(promotion["var"], "\" style=\"display:none\">\n            ");
      var s_text = document.querySelector("div.promotion-header>p").style;
      s_text.marginBottom = "0";
      s_text.paddingRight = "1.25rem";
      s_text.paddingLeft = "1.25rem";
      s_text.paddingTop = ".18rem";

      // main.style.paddingTop = "50px";
    }
  }, "assets/data/promotion.json", "GET", true);
};
var adaptiveDisplayLand = function adaptiveDisplayLand() {
  var updater = function updater() {
    var header_height = document.querySelector("header").offsetHeight;
    // const d_h = header_height / 2;
    var container = document.getElementById("head-container");
    var vova_pc_version = document.querySelector("div.vova-bg-landing");
    var vova_pc_version_mask = document.querySelector("div.vova-bg-landing-mask");
    if (first_init_head_adapt === 0 && first_init_head_adapt_vova === 0) {
      first_init_head_adapt = container.offsetHeight;
      first_init_head_adapt_vova = vova_pc_version.offsetHeight;
    }
    container.style.height = "".concat(first_init_head_adapt - header_height, "px");
    vova_pc_version.style.height = "".concat(first_init_head_adapt_vova - header_height, "px");
    vova_pc_version_mask.style.height = "".concat(first_init_head_adapt_vova - header_height, "px");
    container.style.marginTop = "".concat(header_height, "px");
  };
  updater();
  setInterval(updater, 100);
};
var clipboardFunc = function clipboardFunc(field_selector, notify_text) {
  var copyText = document.querySelector(field_selector);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  notify(notify_text);
  return copyText.value;
};
var spClownLoad = function spClownLoad() {
  var buttons = document.getElementById("zlp_land_buttons");
  var button_template = "\n        <button onclick=\"spClownShow()\" \n                class=\"col btn btn-primary shadow-primary btn-lg me-sm-3 me-xl-4 mb-3 btn-shadow-hide\">\n            \u042F \u043B\u044E\u0431\u043B\u044E \u0421\u041F\n        </button>\n    ";
  getImageLightness("assets/images/Clown-Face.gif", undefined, false);
  buttons.innerHTML = buttons.innerHTML + button_template;
};
var spClownShow = function spClownShow() {
  lock_sticker_switch = true;
  setTimeout(function () {
    lock_sticker_switch = false;
  }, 3500);
  setSticker(0, 0, "assets/images/emoji/clown-face.png");
  notify("На хуй отсюда иди тогда");
};
var donateContainerHash = function donateContainerHash() {
  observerContainerHash(["donate", "donate_block"], function () {
    donate_displayed = true;
    donateSwitchContainer(donate_displayed);
  });
};
var rulesModalOpen = function rulesModalOpen() {
  var content = "";
  get_rules_private_server(function (rules) {
    for (var i = 0; i < rules.length; i++) {
      content += "\n                    <li class=\"list-group-item d-flex justify-content-between lh-sm\">\n                        <div>\n                            <h6 class=\"my-0 text-start\">\n                                ".concat(i + 1, "\n                            </h6>\n                        </div>\n                        <span class=\"ps-2 pe-2 text-start\">").concat(rules[i].text, "</span>\n                    </li>\n                ");
    }
    switch_modal_containers("info", {
      title: "Правила приватного сервера",
      content: "\n                <ul class=\"list-group mb-4 mb-lg-5\">\n                    ".concat(content, "\n                </ul>\n            ")
    });
    modal_open_();
  });
};
var rulesPrivateContainerHash = function rulesPrivateContainerHash() {
  observerContainerHash(["private_rules"], function () {
    rulesModalOpen();
  });
};
var openAdminContact = function openAdminContact() {
  checkTelegramAuthData(function (data) {
    if (data || feedback_tg_auth_skip) {
      if (!glob_players.length) {
        glob_players = ["Player"];
      }
      shuffle(glob_players);
      switch_modal_containers("info", {
        title: "Обратная связь",
        content: "\n                        <p class=\"mb-2 mb-lg-3 mb-xl-4 text-start\">\n                            \u042D\u0442\u043E \u0444\u043E\u0440\u043C\u0430 \u0434\u043B\u044F \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0438 \u0436\u0430\u043B\u043E\u0431, \u043E\u043F\u0438\u0448\u0438\u0442\u0435 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u043A\u0440\u0430\u0442\u043A\u043E \u0438 \n                            \u044F\u0441\u043D\u043E \u0441\u0432\u043E\u044E \u0438\u0434\u0435\u044E \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0431\u0435\u0437 \u0432\u043E\u0434\u044B.\n                        </p>\n                        <div class=\"row mb-3\">\n                            <div id=\"customer-tokens-container\" class=\"col-md-6\">\n                                <label for=\"feedback_nickname_init\" class=\"form-label\">\u041D\u0438\u043A\u043D\u0435\u0439\u043C</label>\n                                <input type=\"text\" class=\"form-control\" id=\"feedback_nickname_init\" placeholder=\"".concat(glob_players[0], "\" value=\"\" required=\"\">\n                            </div>\n                            <div id=\"customer-tokens-container\" class=\"col-md-6\">\n                                <label for=\"feedback_reason_init\" class=\"form-label\">\u041F\u0440\u0438\u0447\u0438\u043D\u0430</label>\n                                <select name=\"feedback_reason_init\" class=\"form-control\" id=\"feedback_reason_init\" value=\"game_question\" required=\"\">\n                                    <option value=\"tech_problem\">\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B</option>\n                                    <option value=\"game_question\">\u0412\u043E\u043F\u0440\u043E\u0441 \u043F\u043E \u0438\u0433\u0440\u0435</option>\n                                    <option value=\"player_report\">\u0416\u0430\u043B\u043E\u0431\u0430 \u043D\u0430 \u0438\u0433\u0440\u043E\u043A\u0430</option>\n                                    <option value=\"offer\">\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div id=\"contant-input-container\">\n                            <label for=\"admin-message\">0/0</label>\n                            <textarea id=\"admin-message\" name=\"admin-message\" class=\"form-control\" maxlength=\"0\">\n                            </textarea>\n                        </div>\n                        <button onclick=\"sendFeedbackAction()\" class=\"w-100 btn btn-primary btn-lg btn-shadow-hide mt-3 mt-lg-4\" id=\"send-feedback-button\" type=\"button\">\n                            \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C\n                        </button>\n                    ")
      });
      var max_len = 3000;
      var textarea = document.getElementById("admin-message");
      var label = document.querySelector('label[for="admin-message"]');
      var space = " ";
      if (textarea.value.includes(space.repeat(3))) {
        textarea.value = textarea.value.trim();
      }
      textarea.maxLength = max_len;
      var update_len_counter = function update_len_counter() {
        label.innerText = "".concat(textarea.value.length, "/").concat(max_len);
      };
      update_len_counter();
      addEventListener("keydown", function (_) {
        return update_len_counter();
      });
      addEventListener("keyup", function (_) {
        return update_len_counter();
      });
      modal_open_(onclick_lock = true);
    } else {
      console.log("Error check Telegram auth");
      openTelegramAuthModal();
      notify("Вам необходимо авторизоватся для этой функции");
    }
  });
};
var initSOptimizeGA = function initSOptimizeGA() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-VGRQSK1J7M');
};
var adminsContactContainerHash = function adminsContactContainerHash() {
  observerContainerHash(["contact", "support", "bug", "report"], function () {
    openAdminContact();
  });
};
var observerContainerHash = function observerContainerHash(hash_array, action) {
  var updater = function updater() {
    if (hash_array.includes(linkHash())) {
      action();
    }
  };
  updater();
  addEventListener('hashchange', function (_) {
    return updater();
  });
};
var openTelegramAuthModal = function openTelegramAuthModal() {
  var skip_check = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  checkTelegramAuthData(function (tg_success) {
    if (!tg_success) {
      console.log("Telegram auth preparing...");
      // modal_close_();
      var script_telegram_widget = document.createElement('script');
      script_telegram_widget.src = "https://telegram.org/js/telegram-widget.js?21";
      script_telegram_widget.setAttribute("async", "");
      script_telegram_widget.setAttribute("data-telegram-login", telegram_bot_username);
      script_telegram_widget.setAttribute("data-size", "large");
      script_telegram_widget.setAttribute("data-radius", "8");
      script_telegram_widget.setAttribute("data-onauth", "onTelegramAuth(user)");
      script_telegram_widget.setAttribute("data-request-access", "write");
      script_telegram_widget.onload = function () {
        switch_modal_containers("info", {
          title: "",
          content: ""
        });
        modal_open_();
      };
      var content = document.getElementById("info-content-modal");
      var container = document.createElement("div");
      var text = document.createElement("p");
      content.innerHTML = "";
      content.appendChild(container);
      content.appendChild(text);
      text.innerHTML = "\n                \u0414\u043B\u044F \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0444\u0443\u043D\u043A\u0446\u0438\u0439 \u043D\u0430 \u044D\u0442\u043E\u043C \u0441\u0430\u0439\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F. \n                \u041C\u044B \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043C \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u0432\u0430\u0441, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \n                \u0432\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0438\u043B\u0438 \u043B\u043E\u043A\u0430\u0446\u0438\u044E, \u044D\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0442\u043E\u0433\u043E, \u0447\u0442\u043E\u0431\u044B Telegram \n                \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u043B, \u0447\u0442\u043E \u0432\u044B \u044F\u0432\u043B\u044F\u0435\u0442\u0435\u0441\u044C \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0435\u043C \u0441\u0432\u043E\u0435\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430. \u0422\u0430\u043A\u0436\u0435 \n                \u043D\u0435 \u0437\u0430\u0431\u0443\u0434\u044C\u0442\u0435 \u0441\u0432\u044F\u0437\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 Telegram \u0441 \u0438\u0433\u0440\u043E\u0432\u044B\u043C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C \n                \u0432 <a href=\"".concat(telegram_social_bot, "\" target=\"_blank\" class=\"text-primary\">\u043D\u0430\u0448\u0435\u043C \u0431\u043E\u0442\u0435</a>.\n            ");
      text.setAttribute("class", "text-start px-3 pt-1 pt-lg-2");
      container.id = "telegram-auth-container";
      container.appendChild(script_telegram_widget);
    }
  }, skip_check);
};
var openLoginHint = function openLoginHint() {
  if (!allow_display_login_hint) {
    return;
  }
  var content = document.getElementById("info-content-modal");
  var container = document.createElement("div");
  var text = document.createElement("p");
  content.innerHTML = "";
  content.appendChild(container);
  content.appendChild(text);
  text.innerHTML = "\n                \u041F\u043E\u0445\u043E\u0436\u0435 \u0447\u0442\u043E \u0442\u044B \u043D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B \u0442\u0435\u043A\u0441\u0442 \u0432 \u043F\u0435\u0440\u0432\u043E\u043C \u043E\u043A\u043D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438,\n                \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u043C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443. \u0427\u0442\u043E\u0431\u044B \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 - \u0442\u0435\u0431\u0435 \u043D\u0443\u0436\u043D\u043E \n                \u0441\u0432\u044F\u0437\u0430\u0442\u044C \u0441\u0432\u043E\u0439 Telegram \u0441 \u0441\u0432\u043E\u0438\u043C \u0438\u0433\u0440\u043E\u0432\u044B\u043C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C \u0432&nbsp;\n                <a href=\"".concat(telegram_social_bot, "\" target=\"_blank\" class=\"text-primary\">\u043D\u0430\u0448\u0435\u043C \u0431\u043E\u0442\u0435</a>.\n            ");
  text.setAttribute("class", "text-start px-3 pt-1 pt-lg-2");
  container.id = "telegram-auth-hint";
  notify("Прочитай внимательно инструкцию!");
  switch_modal_containers("info", {
    title: "Помощь авторизации",
    content: ""
  });
  modal_open_();
};
var initJarallax = function initJarallax() {
  jarallax(document.querySelectorAll('.jarallax'), {
    speed: .15,
    type: "scale-opacity"
  });
};
var initTooltip = function initTooltip() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    tooltip_instance = new bootstrap.Tooltip(tooltipTriggerEl, {
      template: "\n                                <div class=\"tooltip\" role=\"tooltip\">\n                                    <div class=\"tooltip-inner\"></div>\n                                </div>\n                            "
    });
  });
  if (tooltip_instance) {
    setInterval(function () {
      tooltip_instance.update();
    }, 1000);
  }
};
var initSmoothScrollObserver = function initSmoothScrollObserver() {
  var scrollerObject = new SmoothScroll("section");
  var callScroller = function callScroller() {
    var identifier = linkHash().toLowerCase();
    if (!(identifier && identifier.length) || ["private_rules"].includes(identifier)) {
      return;
    }
    try {
      scrollerObject.animateScroll(document.querySelector("section[id=\"".concat(identifier, "\"]")), null, {
        offset: 50
      });
    } catch (_) {
      return;
    }
  };
  callScroller();
  window.onhashchange = callScroller;
};
var privateServerModuleInit = function privateServerModuleInit() {
  var desc = document.getElementById("private-server-hub-description");
  desc.innerHTML = "\n        \u041F\u0440\u043E\u0435\u043A\u0442 Zalupa.Online \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434 \u0441\u0432\u043E\u0435\u0433\u043E \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u044F \u043E\u0442 \u0435\u0434\u0438\u043D\u043E\u0433\u043E \u0441\u0435\u0440\u0432\u0435\u0440\u0430\n        \u0410\u043D\u0430\u0440\u0445\u0438\u0438 \u043F\u0435\u0440\u0435\u0440\u043E\u0441 \u0432 \u043F\u0440\u043E\u0435\u043A\u0442 \u0441 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C\u0438 \u0440\u0435\u0436\u0438\u043C\u0430\u043C\u0438, \u043E\u0434\u0438\u043D \u0438\u0437 \u0442\u0430\u043A\u0438\u0445 \u2013 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0439\n        \u0441\u0435\u0440\u0432\u0435\u0440 \u0441 \u0432\u0430\u043D\u0438\u043B\u044C\u043D\u044B\u043C \u0432\u044B\u0436\u0438\u0432\u0430\u043D\u0438\u0435\u043C. \u041E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u044D\u0442\u043E\u0433\u043E \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u0447\u0442\u043E \u0442\u0443\u0434\u0430 \u043F\u043E\u043F\u0430\u0434\u0430\u044E\u0442\n        \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0435, \u043A\u0442\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043B \u0441\u0435\u0440\u0432\u0435\u0440 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E. \u0422\u0430\u043A\u0436\u0435 \u0435\u0434\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C, \u0433\u0434\u0435 \u0432\u044B\n        \u043C\u043E\u0436\u0435\u0442\u0435 \u0431\u044B\u0442\u044C \u043D\u0430 \u0443\u0440\u043E\u0432\u043D\u0435 \u0441 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439, \u0432\u0435\u0434\u044C \u0437\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u0438\u0433\u0440\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0441\n        \u043F\u0440\u0430\u0432\u0430\u043C\u0438 \u043E\u0431\u044B\u0447\u043D\u043E\u0433\u043E \u0438\u0433\u0440\u043E\u043A\u0430, \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u0438\u0432\u0438\u043B\u0435\u0433\u0438\u0439. \u0422\u0430\u043A\u0436\u0435 \u043D\u0435 \u0437\u0430\u0431\u0443\u0434\u044C\n        <a class=\"text-gradient-primary\" href=\"https://www.notion.so/zaluparules/zalupa-online-1e6269506d084d6ba9549cbb7d40e3a4\">\n            \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u0430</a>.\n    ";
};
var tonyComeBack = function tonyComeBack() {
  var selector = document.getElementById("AppleTony_comeback_days");
  var update_days = function update_days(days_count) {
    selector.innerText = "".concat(days_count, " ").concat(getNoun(days_count, "день", "дня", "дней"));
  };
  var date1 = new Date();
  var date2 = new Date("11/30/2023");
  var differenceInTime = date2.getTime() - date1.getTime();
  var differenceInDays = parseInt(differenceInTime / (1000 * 3600 * 24));
  update_days(differenceInDays);
  setInterval(function () {
    update_days(differenceInDays);
  }, 9999);
};
var autoAuthTelegramObserver = function autoAuthTelegramObserver() {
  if (telegram_auth_enabled) {
    document.getElementById("telegram-auth-avatar").style.display = "";
  }
  checkTelegramAuthData(function (success) {
    console.debug("Telegram auth check status : ".concat(success));
    if (success) {
      var button_contact_land = document.getElementById("contact-button-land");
      var button_auth = document.querySelector(".avatar-container");
      var telegram_auth_avatar = document.getElementById("telegram-auth-avatar");
      button_auth.removeAttribute("onclick");
      if (feedback_module_enabled) {
        button_contact_land.style.display = "";
      }
      telegram_auth_avatar.style.display = "";
      setAvatar(getTelegramAuth());
    }
  });
  setInterval(displayTokens, 300);
};
var initCore = function initCore() {
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
  displayPromotion();
  adaptiveDisplayLand();
  setLauncherLinks();
  donate_bg_preload();
  var elem = document.getElementById("dark-perm-set-bv");
  elem.parentNode.removeChild(elem);
  window.onload = function () {
    if (!debug_lock_init) {
      var preloader = document.querySelector(".page-loading");
      var wait = 1500;
      var move_wait = 100;
      setTimeout(function () {
        preloader.classList.remove("active");
        if (!donate_displayed) {
          document.body.style.overflowY = "";
        }
        window.scrollTo({
          top: 0
        });
      }, wait);
      setTimeout(function () {
        preloader.remove();

        // after tasks
        initTooltip();
        initSmoothScrollObserver();
      }, wait + move_wait);
      setInterval(function () {
        checkTelegramAuthData(function (_) {}, false, false, true);
      }, 10 * 1000);
    }
  };
};
script_core.onload = function () {
  initCore();
};
//# sourceMappingURL=core.js.map