const cart_cookie="cart_box",channels=2,backend_host="https://backend.zalupa.world";var timer_notify,payment_url_global,donate_services_array=[],notify_hidden=!0,glob_players=[];function shuffle(a){var b=Math.floor;for(let c,d=a.length;0!==d;)c=b(Math.random()*d),d--,[a[d],a[c]]=[a[c],a[d]];return a}function validateEmail(a){return(a+"").toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}function request_call(a,b,c,d=!1,e=null){let f=new XMLHttpRequest,g={};f.open(c,b,!0),"POST"===c.toUpperCase()&&(f.setRequestHeader("Content-Type","application/json;charset=UTF-8"),g=JSON.stringify(e));f.onload=function(){200<=f.status&&400>f.status?d?a(JSON.parse(f.responseText)):a(f.responseText):console.log(`Request status code is ${f.status}`)},f.onerror=function(a){console.log(`Error make request! Details: ${a}`)},f.send(g)}function notify(a){const b=document.querySelector(".error_box_cst"),c=document.querySelector(".error_text_cst"),d=document.querySelector(".btn-scroll-top");let e=function(){b.style.marginBottom="-150px",d.setAttribute("style",""),notify_hidden=!0},f=function(){notify_hidden=!1,c.innerHTML=a,d.style.marginBottom=`calc(${document.getElementById("error_box_cst_id").offsetHeight}px)`,b.style.marginBottom=0};notify_hidden?f():(e(),setTimeout(f,200));clearTimeout(timer_notify),timer_notify=setTimeout(e,2500)}function url_builder_(a,b){let c=new URL(a);for(let d=0;d<b.length;d++)c.searchParams.set(b[d].name,b[d].value);return c.href}function countProperties(a){return Object.keys(a).length}function getNoun(a,b="\u0438\u0433\u0440\u043E\u043A",c="\u0438\u0433\u0440\u043E\u043A\u0430",d="\u0438\u0433\u0440\u043E\u043A\u043E\u0432"){var e=Math.abs;let f=e(a);return(f%=100,5<=f&&20>=f)?d:(f%=10,1===f)?b:2<=f&&4>=f?c:d}function get_last_tg_post_id(a,b){request_call(function(b){if(b.success)return a(b.last_post)},`${backend_host}/channel?choice=${b}`,"GET",json=!0)}function append_posts(){for(let a=0;a<channels;a++)get_last_tg_post_id(function(a){let b=document.querySelector(".telegram_frames"),c=document.createElement("script");c.src="https://telegram.org/js/telegram-widget.js?19",c.setAttribute("data-telegram-post",a),c.setAttribute("data-width","100%"),c.setAttribute("data-userpic","true"),c.setAttribute("data-dark","1"),b.appendChild(c),setTimeout(function(){let a=document.getElementById("telegram_block_load");try{a.parentNode.removeChild(a)}catch(a){}},100)},a)}function get_game_server_data(a){request_call(function(b){b.success&&a(b.body)},`${backend_host}/server`,"GET",json=!0)}function monitoring_game_server_update(){get_game_server_data(function(a){document.getElementById("server_online_status").innerHTML=`Сейчас играет <span class="text-primary fw-semibold">${a.online}</span> ${getNoun(a.online)}`})}function game_server_updater(){monitoring_game_server_update(),setInterval(monitoring_game_server_update,5e3)}function get_donate_services(a){request_call(function(b){b.success&&a(b.services)},`${backend_host}/donate/services`,"GET",json=!0)}function create_payment(a,b,c,d=null,e=null){request_call(function(b){b.success&&a(b.payment)},`${backend_host}/donate/payment/create`,"POST",json=!0,json_body={customer:b,products:c,email:d,coupon:e})}function append_services(){get_donate_services(function(a){donate_services_array=a;const b=["row-cols-sm-2","row-cols-md-3","row-cols-lg-4"];let c=document.getElementById("donate_items_list");if(!a.length)c.innerHTML="<span class=\"text-center\">\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0442\u043E\u0432\u0430\u0440\u043E\u0432.</span>";else for(let d,e=0;e<a.length;e++)d={name:a[e].name,price:a[e].price,count:a[e].number,description:a[e].description,type:a[e].type,service_id:a[e].id},e&&b.length>=e&&c.classList.add(b[e-1]),c.innerHTML+=`
                    <div class="col" id="donate_item_${a[e].id}">
                        <div class="card card-hover border-0 bg-transparent" 
                            onClick='donate_element_click(${JSON.stringify(d)})'>
                          <div class="position-relative">
                            <div class="parent-image-shadow donate_item_hover" 
                                id="donate_item_hover_${a[e].id}">
                                <div class="imageContainer">
                                    <img src="${a[e].image}"
                                     class="rounded-3 foregroundImg" alt="${a[e].name}" 
                                     style="display: block; margin: auto; width: 100px" loading="lazy">
                                    <img src="${a[e].image}"
                                     class="rounded-3 backgroundImg" alt="${a[e].name}" 
                                     style="display: block; margin: auto; width: 100px" loading="lazy">
                                 </div>
                            </div>
                            <div class="card-img-overlay d-flex flex-column align-items-center 
                                        justify-content-center rounded-3" 
                                 style="margin: auto">
                            </div>
                          </div>
                          <div class="card-body text-center p-3">
                                <h3 class="fs-lg fw-semibold pt-1 mb-2">${a[e].name}</h3>
                                <p class="mb-0">
                                    ${a[e].price} 
                                    ${getNoun(a[e].price,"\u0440\u0443\u0431\u043B\u044C","\u0440\u0443\u0431\u043B\u044F","\u0440\u0443\u0431\u043B\u0435\u0439")} 
                                    = 
                                    ${a[e].number} 
                                    ${getNoun(a[e].number,"\u0435\u0434\u0438\u043D\u0438\u0446\u0430","\u0435\u0434\u0438\u043D\u0438\u0446\u044B","\u0435\u0434\u0438\u043D\u0438\u0446")}
                                </p>
                                <p class="fs-sm mb-0">${a[e].description}</p>
                          </div>
                        </div>
                    </div>
                `;setTimeout(function(){let a=document.getElementById("donate_block_load");try{a.parentNode.removeChild(a)}catch(a){}document.getElementById("donate_items_list").style.display="",document.getElementById("donate-title-desc").style.display="",document.getElementById("donate-test-mode-enb").style.display=""},100)})}function redirect_(a){return window.location.replace(a)}function modal_close_(){document.body.classList.remove("modal-open");let a=document.getElementById("donate_item_modal");a.style.opacity=0,setTimeout(function(){a.style.display="none"},350)}function modal_open_(){document.body.classList.add("modal-open");let a=document.getElementById("donate_item_modal");a.style.display="block",setTimeout(function(){a.style.opacity=1},50),window.onclick=function(b){b.target===a&&modal_close_()}}function switch_modal_containers(a="service"){const b=document.getElementsByClassName("close_b")[0],c=document.getElementById("modal-info-container-c"),d=document.getElementById("modal-donate-container-c"),e=document.getElementById("modal-donate-finish-container-c"),f=document.querySelector(".modal-title"),g=[{name:"service",selector:d,title:"\u0422\u043E\u0432\u0430\u0440"},{name:"info",selector:c,title:"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"},{name:"donate_finish",selector:e,title:"\u041A\u043E\u0440\u0437\u0438\u043D\u0430"}];for(let b,c=0;c<g.length;c++)b="none",a===g[c].name&&(b="block",f.innerText=g[c].title),g[c].selector.style.display=b;b.onclick=function(){modal_close_()}}function get_cookie_cart(){let a={};try{a=JSON.parse(Cookies.get(cart_cookie))}catch(a){}return a}function update_cart_count(){document.getElementById("count_cart_items_dn").innerText=countProperties(get_cookie_cart())}function group_already_in_cart(a){let b=Object.keys(a);for(let c=0;c<donate_services_array.length;c++)if("group"===donate_services_array[c].type&&b.includes(donate_services_array[c].id.toString()))return!0;return!1}function comments_init(){new Swiper("#comment_swipe_container",{spaceBetween:12,loop:!0,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination-comments",clickable:!0},navigation:{prevEl:"#prev_comment",nextEl:"#next_comment"}})}function build_players_swiper(){let a=document.getElementById("players-swiper-array");const b=function(){new Swiper("#players_swipe_container",{slidesPerView:2,spaceBetween:24,autoplay:{delay:3e3},loop:!0,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination-players",clickable:!0},breakpoints:{500:{slidesPerView:3},650:{slidesPerView:4},900:{slidesPerView:5},1100:{slidesPerView:6}}})};request_call(function(c){let d=c;shuffle(d);for(let b=0;b<d.length;b++)glob_players.push(d[b].name),a.innerHTML+=`
                <div class="swiper-slide">
                    <span class="d-block py-3">
                        <img src="${d[b].head}" class="d-block mx-auto" width="154"
                           alt="${d[b].name}" loading="lazy"
                        <div class="card-body text-center p-3">
                            <h3 class="fs-lg fw-semibold pt-1 mb-2">${d[b].name}</h3>
                            <p class="fs-sm mb-0">${d[b].desc}</p>
                        </div>
                    </span>
                </div>
            `;b()},"assets/data/players.json","GET",json=!0)}function donate_element_click(a){var b=Math.sign;switch_modal_containers("service");const c=["group"];let d=document.getElementById("donate_item_select_text"),e=`Товар <span class="text-primary fw-semibold">${a.name}</span>, 
        цена ${a.count} ${getNoun(a.count,"\u0435\u0434\u0438\u043D\u0438\u0446\u044B","\u0435\u0434\u0438\u043D\u0438\u0446","\u0435\u0434\u0438\u043D\u0438\u0446")} 
        <span class="text-primary fw-semibold">${a.price} 
        ${getNoun(a.price,"\u0440\u0443\u0431\u043B\u044C","\u0440\u0443\u0431\u043B\u044F","\u0440\u0443\u0431\u043B\u0435\u0439")}</span>.`,f=document.getElementById("items_count_donate"),g=document.getElementById("donate_count_text_hint"),h=document.getElementById("donate_button_add_to_cart");const i=get_cookie_cart();let j=!1,k=function(){h.setAttribute("onClick",`donate_cart(${a.service_id}, ${f.value})`)};f.value=1,k();const l=i.hasOwnProperty(a.service_id.toString());if((c.includes(a.type)||"group"===a.type)&&group_already_in_cart(i)){switch_modal_containers("info"),j=!0;let b="";b="group"===a.type?"\u0412\u044B \u0443\u0436\u0435 \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u043F\u0440\u0438\u0432\u0438\u043B\u0435\u0433\u0438\u044E. \u0423\u0434\u0430\u043B\u0438\u0442\u0435 \u0435\u0451 \u0438\u0437 \u043A\u043E\u0440\u0437\u0438\u043D\u044B, \u0435\u0441\u043B\u0438 \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0443\u044E.":l?`Ошибка, вы можете добавить товар 
            <span class="text-primary fw-semibold">${a.name}</span> 
            только один раз.`:"\u041C\u044B \u043D\u0435 \u0437\u043D\u0430\u0435\u043C \u043F\u043E\u0447\u0435\u043C\u0443, \u043D\u043E \u044D\u0442\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0437\u0432\u0430\u043D\u0430 \u043F\u043E \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C.";document.getElementById("donate_info_block_text").innerHTML=b}let m="block";c.includes(a.type)&&(m="none");f.style.display=m,g.style.display=m;const n=function(){let a=f.value;f.value=a.replace(/\D+/g,"")},o=function(){if(n(),!c.includes(a.type)){let c=parseInt(f.value)*a.price;(isNaN(c)||1>b(c))&&(c=0),d.innerHTML=`${e}<br/>Стоимость - 
            <span class="text-primary fw-semibold">${c} 
            ${getNoun(c,"\u0440\u0443\u0431\u043B\u044C","\u0440\u0443\u0431\u043B\u044F","\u0440\u0443\u0431\u043B\u0435\u0439")}</span>`,k()}};d.innerHTML=e,o(),f.addEventListener("input",function(){o()}),modal_open_()}function donate_get_service_by_id(a){for(let b=0;b<donate_services_array.length;b++)if(donate_services_array[b].id===parseInt(a))return donate_services_array[b];return null}function donate_cart(a,b,c=!1){var d=Number.isInteger,e=Math.sign;if(!d(a)||!d(b))return void console.log("Error data donate_cart");if(1>e(b))return void notify("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u043D\u043E \u043D\u0443\u043B\u044E \u0438\u043B\u0438 \u043C\u0435\u043D\u044C\u0448\u0435");let f=Cookies.get(cart_cookie);f||Cookies.set(cart_cookie,JSON.stringify({}));const g=JSON.parse(Cookies.get(cart_cookie)),h=donate_get_service_by_id(a),i="<span style=\"color: #a4a6ff !important\">";c?(delete g[a],notify(`Товар ${i} ${h.name}</span> убран из корзины`)):g[a]?(g[a]+=b,notify(`В корзину добавлено ${i} ${b} </span> 
                        ${getNoun(b,"\u0435\u0434\u0438\u043D\u0438\u0446\u0430","\u0435\u0434\u0438\u043D\u0438\u0446\u044B","\u0435\u0434\u0438\u043D\u0438\u0446")} 
                        товара ${i} ${h.name} </span>`)):(g[a]=b,notify(`Товар ${i} ${h.name}</span> добавлен в корзину`));Cookies.set(cart_cookie,JSON.stringify(g)),modal_close_(),donate_init(),update_cart_count()}function donate_cart_button(a={}){const b=document.querySelectorAll(".donate-cart-button-cn");for(let c,d=0;d<b.length;d++)c=b[d].style,countProperties(a)?(c.opacity=1,c.marginTop="15px"):(c.opacity=0,c.marginTop="-50px")}function donate_flush_cart(){Cookies.remove(cart_cookie),donate_cart_button({}),notify("\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043E\u0447\u0438\u0449\u0435\u043D\u0430")}function donate_enable_coupon(a=!0){const b=document.getElementById("coupon-input"),c=document.getElementById("coupon-button");a?(b.setAttribute("placeholder","BRFF"),b.removeAttribute("disabled"),c.removeAttribute("disabled")):(b.setAttribute("disabled",null),b.setAttribute("placeholder","\u0421\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E"),c.setAttribute("disabled",null))}function generate_payment_link(){const a=document.getElementById("payment-button-donate"),b=document.getElementById("donate_customer").value.trim();let c=document.getElementById("donate_email").value.trim(),d=document.getElementById("coupon-input").value.trim();if(!b.length)return void notify("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0432\u0430\u0448 \u043D\u0438\u043A\u043D\u0435\u0439\u043C");if(40<b.length)return void notify("\u0412\u0430\u0448 \u043D\u0438\u043A\u043D\u0435\u0439\u043C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u044B\u0439");if(b.match(/[A-z\d_\S]/i)||notify("\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0444\u043E\u0440\u043C\u0430\u0442\u0443"),!c.length)c=null;else if(!validateEmail(c))return void notify("\u041E\u0448\u0438\u0431\u043A\u0430, \u0430\u0434\u0440\u0435\u0441 \u043F\u043E\u0447\u0442\u044B \u043D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439");d||(d=null),a.setAttribute("disabled",null),a.innerText="\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0434\u0430\u043D\u043D\u044B\u0435...",create_payment(function(b){b?(a.removeAttribute("disabled"),a.innerText="\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u044C",payment_url_global=b.url,a.setAttribute("onClick","payment_action_bt()")):a.innerText="\u041E\u0448\u0438\u0431\u043A\u0430..."},b,get_cookie_cart(),c,d)}function payment_action_bt(){window.open(payment_url_global,"_blank")}function donate_check_services_cart(){const a=Object.keys(get_cookie_cart());get_donate_services(function(b){let c=[];for(let a=0;a<b.length;a++)c.push(b[a].id);for(let d=0;d<a.length;d++)if(!c.includes(parseInt(a[d]))){let b=JSON.parse(Cookies.get(cart_cookie));delete b[parseInt(a[d])],Cookies.set(cart_cookie,JSON.stringify(b)),console.log(`Remove ${a[d]} from cart`)}})}function donate_init(){let a={};try{a=JSON.parse(Cookies.get(cart_cookie))}catch(a){}donate_cart_button(a),donate_check_services_cart(),donate_enable_coupon(enabled=!1)}function donate_reset_payment_state(){const a=document.getElementById("payment-button-donate");a.setAttribute("onClick","generate_payment_link()"),a.innerText="\u0414\u0430\u043B\u044C\u0448\u0435"}function donate_cart_call(a=null){const b=get_cookie_cart(),c=Object.keys(b),d=document.getElementById("donate-cart-list"),e=[document.getElementById("donate_customer"),document.getElementById("donate_email"),document.getElementById("coupon-input")];switch_modal_containers("donate_finish"),modal_open_(),d.innerHTML="";let f=0;for(let b=0;b<e.length;b++)e[b].addEventListener("input",function(){donate_reset_payment_state()});for(let e=0;e<c.length;e++){let a=donate_get_service_by_id(c[e]),g=a.price*b[a.id];f+=g,d.innerHTML+=`
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0 text-start">
                        <span class="text-primary fw-semibold">
                            x${a.number}</span> 
                        ${a.name}
                    </h6>
                    <small class="text-muted text-start cart-desc-td">${a.description}</small>
                </div>
                <span class="text-muted text-end" style="width: 30%">
                    ${g} ${getNoun(g,"\u0440\u0443\u0431\u043B\u044C","\u0440\u0443\u0431\u043B\u044F","\u0440\u0443\u0431\u043B\u0435\u0439")}
                    <br/>x${b[a.id]}</span>
            </li>
        `}a&&(d.innerHTML+=`
            <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                    <h6 class="my-0 text-start">Купон</h6>
                    <small>${a}</small>
                </div>
                <span class="text-success">−0 рублей</span>
            </li>
        `);d.innerHTML+=`
        <li class="list-group-item d-flex justify-content-between">
            <span>Сумма</span>
            <strong>${f} ${getNoun(f,"\u0440\u0443\u0431\u043B\u044C","\u0440\u0443\u0431\u043B\u044F","\u0440\u0443\u0431\u043B\u0435\u0439")}</strong>
        </li>
    `,shuffle(glob_players),document.querySelector("input#donate_customer").setAttribute("placeholder",glob_players[0])}function landing_init(){["localhost","zalupa.world"].includes(window.location.hostname)&&(document.getElementById("landing_description_gb").innerText="\u042D\u0442\u043E\u0442 \u0441\u0430\u0439\u0442 - development-\u0432\u0435\u0440\u0441\u0438\u044F!",document.getElementById("donate-test-mode-enb").innerText="\u042D\u0442\u043E\u0442 \u0431\u043B\u043E\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0432 \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 \u0438 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u043C.")}function finish_load(){document.querySelector("main").setAttribute("style",""),document.querySelector("footer").setAttribute("style","")}document.addEventListener("DOMContentLoaded",function(){landing_init(),build_players_swiper(),append_posts(),comments_init(),append_services(),update_cart_count(),game_server_updater(),donate_init(),finish_load();let a=document.getElementById("dark-perm-set-bv");a.parentNode.removeChild(a),window.matchMedia("(prefers-color-scheme: dark)").addListener()});