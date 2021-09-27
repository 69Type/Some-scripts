
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// !                                                                                                                            ! //
// ! Note                                                                                                                       ! //
// ! This is my first JS script. When I started I didn't know anything about this language at all.                              ! //
// ! So if someone comes here who understands something about this, then do not be surprised by such a terrible code :)         ! //
// !                                                                                                                            ! //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.gg = {};

class MyWebSocket extends WebSocket {
    constructor(...args) {
        super(...args);
        window.gg.WS = this;
        window.initWebSocket()
    };
    send(...args) {
        return super.send(window.editSending(...args))
    }
};
WebSocket = MyWebSocket;

const origXMLHttpRequest = XMLHttpRequest;
class MyXMLHttpRequest {
    constructor(...args) {
        const xhr = new origXMLHttpRequest(...args);
        window.initXhr(xhr);
        return xhr
    }
};
XMLHttpRequest = MyXMLHttpRequest;

// window.addEventListener("load", ()=>{
//     for (let i in window.__BUILD_MANIFEST["/start"]){
//         if (window.__BUILD_MANIFEST["/start"][i].indexOf("start") != -1){
//             getScriptText( window.__BUILD_MANIFEST["/start"][i], i );
//             break;
//         }
//     }
// });


// async function getScriptText(path, i){
//     const url = "https://garticphone.com/_next/" + path,
//           response = await fetch( url );
//     if ( response.ok ) {
//         inject(edit( await response.text()));
//         window.__BUILD_MANIFEST["/start"][i] = "";
//     } else {
//         alert(`Something goes wrong: ${response.status}\nPLEASE RELOAD THE PAGE.\n`);
//     }
// }

// function edit( text ){
//     const r = text.match(/\w(?==\w\+100)/)[0];
//     text = text.replace(/(?<=var\s\w=!1;)(?=return\s\w\.reduced\?)/, `window.gg.currentRoundTime=${r};`);
//     return text;
// }

// function inject( text ) {
//     let s = document.createElement("script");
//     s.type="text/javascript";
//     s.innerText = text;
//     document.head.appendChild(s);
//     console.log("+injected+");
// }





const VERSION = "4.0 BETA";


/*
format: 42[2,{command},{id}/{JSON}]

26 - команда смены режима       id - 1 - 12
 5 - команда запуска игры       id - any but actually only 1 is returning
11 - команда (only return)      JSON - JSON 42[2,11,{"turnNum":0,"screen":5,"previous":null}]  // срабатывает при входе в раунд turnNum - номер хода, screen - экран хода, previous - заданная история
27 - команда открытия настроек  id - 1 - 2;
15 - показатель готовности      JSON - JSON 42[2,15,{"user":1,"ready":true}]
24 - неизвестная комманда       id - отсутствует
20 - новый ход                  id - отсутствует
 3 - игрок вышел                id - id игрока
14 - комманда кика              id - id игрока
21 - игрок вышел во время игры  id - id игрока
22 - игрок перезашёл            id - id игрока
*/


/*
window.send = function (...args) {
    window.ws.send(...args);
}

const origXMLHttpRequest = XMLHttpRequest;


class MyXMLHttpRequest {
    constructor(...args) {
        const xhr = new origXMLHttpRequest(...args);
        xhr.addEventListener('load', (e)=>{
            console.log(xhr.response);
             if (xhr.response.indexOf('{') != -1) { window.usersList = JSON.parse(xhr.response.substring(xhr.response.indexOf("{"), xhr.response.lastIndexOf("}") + 1)).users };
        })
        return xhr;
    }
}

XMLHttpRequest = MyXMLHttpRequest;


function myFuncForNewWs (ws) {
    window.ws = ws;
    ws.addEventListener('message', (e) => {
        console.log(e.data.match(/{.*}/) ? ("command: ", e.data.match(/(?<=,)\d\d?(?=,)/), JSON.parse(e.data.match(/{.*}/)[0])) : (e.data.match(/(?<=,)\d\d?(?=,)/) ? e.data.match(/(?<=,)\d\d?(?=,)/)[0] : e.data));
    });
}


const origWebSocket = WebSocket

class MyWebSocket {
    constructor(...args) {
        console.log("created");
        const wsInstance = new origWebSocket(...args);
        myFuncForNewWs(wsInstance);
        return wsInstance;
    }
}

WebSocket = MyWebSocket;
*/

function initXhr(xhr){
    window.gg.xhr = xhr;
    xhr.addEventListener('load', (e)=>{
        if (xhr.response.indexOf("users") != -1){
            var dict = JSON.parse(xhr.response.match(/\[.+/)[0])[1];
            console.log(dict);
            window.gg.users={};
            window.gg.users.left = {};
            window.gg.users.ready = {};
            window.gg.users.active = (()=>{let d = {}; dict.users.forEach((item)=>{d[item.id]=item}); return d})();
            if (!window.gg.users) {alert("what"); window.location.replace("https://garticphone.com/")}
            window.gg.mode = dict.configs.mode;
            window.gg.link = `https://garticphone.com/${navigator.language}/?c=${dict.code}`;
            window.gg.ownID = dict.user.id;
            window.gg.user = dict.user;
            window.gg.dict = dict;
        }
    });
}
window.initXhr = initXhr;

window.editSending = function(a) {
    return a;
}

function initWebSocket(){
    window.gg.WS.addEventListener('message', (e)=>{
        console.log(e.data);
        if (e.data.indexOf("42") == -1) return;
        console.log("message:",e.data);
        var command = JSON.parse(e.data.slice(2))[1];
        //console.log("command:",command);
        switch (command){
            case 2: {
                let info = JSON.parse(e.data.slice(2))[2];
                window.gg.users.active[info.id] = info;
                break;
            }
            case 3: {
                let id = JSON.parse(e.data.slice(2))[2].userLeft;
                window.gg.users.left[id] = window.gg.users.active[id];
                delete window.gg.users.active[id];
                delete window.gg.users.ready[id];
                if (window.gg.users.ready[id]){
                    window.gg.users.wasReady[id] = window.gg.users.ready[id];
                    delete window.gg.users.ready[id];
                }
                break;
            }
            case 22: {
                let id = JSON.parse(e.data.slice(2))[2];
                window.gg.users.active[id] = window.gg.users.left[id];
                if (window.gg.users.wasReady[id]) {
                    window.gg.users.ready[id] = window.gg.users.wasReady[id];
                    delete window.gg.users.wasReady[id];
                }
                delete window.gg.users.left[id];
                break;
            }
            case 11: {
                window.gg.user.ready = false;
                window.gg.users.ready = {};
                window.gg.users.wasReady = {};
                window.gg.turnSet = JSON.parse(e.data.slice(2))[2];
                if (window.gg.turnSet.screen == 5){
                } else {
                }

                break;
            }
            case 5: {
                blackList = [];
                window.gg.users.countAtGameStart = window.gg.users.active.length;
                break;
            }
            case 26: {
                window.gg.mode = JSON.parse(e.data.slice(2))[2];
                break;
            }
            case 18: {
                window.gg.speed = JSON.parse(e.data.slice(2))[2].speed;
                break;
            }
            case 15: {
                let info = JSON.parse(e.data.slice(2))[2];
                if (info.ready) {
                    if (info.user == window.gg.ownID) window.gg.user.ready = true;
                    window.gg.users.ready[info.user] = window.gg.users.active[info];
                } else {
                    if (info.user == window.gg.ownID) window.gg.user.ready = false;
                    delete window.gg.users.ready[info.user];
                }
                break;
            }
            case 24: {
                window.gg.user.ready = false;
                window.gg.users.wasReady = {};
                window.gg.users.ready = {};
                break;
            }
            case 23: {
                window.gg.bookStarted = true;
                break;
            }
            case 20: {
                window.gg.bookStarted = false;
            }
        }
    })
}

window.initWebSocket=initWebSocket;


var blackList = [];

const setMutationListener = function(){
    const observerConfig = {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    };
    let observer = new MutationObserver(mutationRecords => {
        mutationRecords.forEach( function( item, index, array ){
            if ( item.addedNodes ){
                item.addedNodes.forEach( function( item, index, array ){
                    if ( item.tagName == 'DIV' && item.classList.contains( 'screen' ) ) {
                        let loaded = item.firstChild.classList[1];
                        onWindowChange ( loaded );
                    }
                    if (document.URL.indexOf("book") != -1 && item.tagName == 'DIV'){
                        bookDivWorking(item);
                    }
                });
            }
        });
    });
    observer.observe(document, observerConfig);
};

/* First Time Script Load */
(function firstTimePreload () {
    //supportTest();
    changeManifest ();
    removeBanner ();
    addStyles ();
    addTopMenuInterval ();
    firstIntervalStyleUpdate ();
    addResizeEvent();
    /* Window loaded */
    window.addEventListener( 'load' , firstTimeLoaded );
} )();

/* First time onload */
function firstTimeLoaded () {
    var f = document.createElement("div");
    f.id = "current";
    f.style = "position:absolute; top: 0px; left: 0px; color: red; font-family: 'Black'; font-size: 25px; margin: 5px;";
    document.querySelector("html").style.overflow="hidden";

    var styles = document.createElement("style");
    styles.type = 'text/css'
    styles.innerText = ".context-option:hover{background-color:#92ebff}.tool.smooth::before{display: none !important; content:'';}.tool.smooth{font-family:'Black';font-size:30px;color:#ff8eaf99}.tool.smooth:active{color:#fff}.thickness-input{font-family:'Black';font-size:25px;border-radius:6px;appearance:none;border:none;width:50px;margin:0 0 0 5px;height:30px;text-align:center;}";
    document.head.appendChild(styles);

    document.body.appendChild(f);
    setMutationListener ();
    addMainMenuKeys ();
}


function onWindowChange ( _case ) {
    console.log( _case );
    setTimeout( ()=>{
        let t = window.gg?.turnSet?.previous?.user?.nick ? window.gg.turnSet.previous.user.nick : window.gg.dict.previous?.user?.nick;
        if (t) {document.querySelector("#current").innerText=t};
    }, 2E3);
    freeStyleUpdate ();
    switch ( _case ){
            /* main or link */
        case 'start':
            break;
            /* lobby */
        case 'lobby':
            setTimeout(()=>{
                if (!window.gg.xhr || !window.gg.WS) { if (confirm("Websocket or XHR is not initialized. RELOAD? (YES)")){window.location.replace("https://garticphone.com/")}}
            }, 2000);
            break;
            /* first write */
        case 'first':
            break;
            /* book */
        case 'book':
            setTimeout(onBookSensorFunction, 200);
            break;
            /* draw */
        case 'draw':
            setTimeout(onDrawing,200);
            mainDrawFunction();
            break;
            /* rank */
        case 'write':
            onMemorySensor();
            break;
        case 'memory':
            onMemorySensor();
            break;
        case 'result':
            break;
            /* terms */
        case 'terms':
            break;
            /* privacy */
        case 'privacy':
            break;
            /* assets */
        case 'assets':
            break;
            /* thanks */
        case 'thanks':
            break;
            /* mirror */
        case 'mirror':
            break;
            /* 404 */
        case '404':
            break;
    }
}


/* Добавление верхнего меню */
function addTopMenu(){
    var topMenu = document.createElement("div");
    topMenu.classList.add("top-menu");
    document.querySelector("#content").appendChild(topMenu);

    document.querySelector("#content").style.justifyContent = "center";
    var screen = document.getElementsByClassName( "screen" )[0];
    topMenu.style.transform = `scale(${getScale()})`;

    var settingsTitle = document.createElement("div");
    settingsTitle.classList.value="topmenusbtn settings-title";
    settingsTitle.onclick=createSettings;
    var shesterenka = document.createElement("div");
    shesterenka.classList.add("inner-shesterenka");
    shesterenka.innerText="⚙";
    settingsTitle.appendChild(shesterenka);
    var settingInnerTitle = document.createElement("div");
    settingInnerTitle.classList.add("inner-setting-title");
    settingInnerTitle.innerText="Settings";
    settingsTitle.appendChild(settingInnerTitle);
    topMenu.appendChild(settingsTitle);

    var telegramTitle = document.createElement("div");
    telegramTitle.classList.value="topmenusbtn telegram-title";
    telegramTitle.title="Contact me!";
    telegramTitle.innerText=`Telegram`;
    telegramTitle.onclick=()=>{ window.open("https://t.me/DoctorDeathDDracula", '_blank') };
    topMenu.appendChild(telegramTitle);

    var title = document.createElement("div");
    title.classList.value="top-title topmenusbtn";
    title.title="Instruction";
    title.innerText=`GarticMod By Doctor Death D. Dracula V${VERSION}`;
    title.onclick=()=>{ if (document.URL.indexOf("ru") != -1) window.open("https://telegra.ph/Gartic-Mode---Mod-dlya-igry-garticphone-07-16", '_blank'); else window.open("https://telegra.ph/Gartic-Mod--Mod-for-the-garticphone-game-07-21", '_blank')};
    topMenu.appendChild(title);

    var discordTitle = document.createElement("div");
    discordTitle.classList.value="topmenusbtn discord-title";
    discordTitle.innerText=`Discord`;
    discordTitle.title="My Discord Server";
    discordTitle.onclick=()=>{ window.open("https://discord.gg/eSZyC9JeAF", '_blank'); };
    topMenu.appendChild(discordTitle);

    var donateTitle = document.createElement("div");
    donateTitle.classList.value="topmenusbtn donate-title";
    donateTitle.innerText=`Donate`;
    donateTitle.title="Support my project";
    donateTitle.onclick=()=>{ window.open("http://bit.ly/DoctorDonation", '_blank'); };
    topMenu.appendChild(donateTitle);
}

function addTopMenuInterval () {
    const topMenuId = setInterval (function () {
        if ( !document.getElementsByClassName("top-menu").length && document.querySelector("#content") ) {
            addTopMenu ();
        }
        if ( document.readyState == 'complete' ) {
            clearInterval ( topMenuId );
        }
    }, 0);
}

function resizeEvent () {
    let scale = `scale(${getScale()})`,
        topMenu = document.getElementsByClassName("top-menu")[0],
        settings = document.getElementsByClassName("settings-menu")[0]
    //document.;
    topMenu ? topMenu.style.transform = scale : 0;
    settings ? settings.style.transform = scale : 0;
}


function unblurSettingsBackground () {
    if ( background.state != "onclose" ) {
        background.style.opacity = 1;
    };
}

/* settings */
var background,
    currentSetting,
    currentSettingData;
function createSettings(){
    background = document.createElement("div");
    background.state = "ready";
    background.classList.add("background-menu");
    background.onmouseup = unblurSettingsBackground;
    background.onmouseenter = unblurSettingsBackground;
    background.onmouseleave = unblurSettingsBackground;
    setTimeout(()=>{background.style.opacity="1";}, 10);
    document.querySelector("#__next").appendChild(background);

    background.close = closeBackground;

    var settingsWindow = document.createElement("div");
    settingsWindow.classList.add("settings-menu");
    var screen = document.getElementsByClassName("screen")[0];
    settingsWindow.style.transform=screen.style.transform;
    background.appendChild(settingsWindow);

    var settingsTitle = document.createElement("h2");
    settingsTitle.classList.add("inner-settings-title");
    settingsTitle.innerText="SETTINGS";
    settingsWindow.appendChild(settingsTitle);

    var closeButton = document.createElement("h2");
    closeButton.classList.add("close-settings");
    closeButton.innerText="";
    closeButton.onclick=closeBackground;
    settingsWindow.appendChild(closeButton);

    var eyeButton = document.createElement("h2");
    eyeButton.classList.add("hide-it-eye");
    eyeButton.innerText="";
    eyeButton.onmousedown = ( e ) => { if ( e.which == 1 ){ background.state = "onblur" ; background.style.opacity = 0 }};
    settingsWindow.appendChild(eyeButton);

    var settings = document.createElement("div");
    settings.classList.add("inner-settings-box");
    settingsWindow.appendChild(settings);

    var tabs = document.createElement("div");
    tabs.classList.add("settings-tabs");
    tabs.onclick=(e)=>{onSettingsChange(e.target)};
    settings.appendChild(tabs);

    var mainTab = document.createElement("span");
    mainTab.classList.add("setting-tab");
    mainTab.k=1;
    mainTab.innerText="MAIN";
    tabs.appendChild(mainTab);

    var styleTab = document.createElement("span");
    styleTab.classList.add("setting-tab");
    styleTab.k=2;
    styleTab.innerText="STYLES";
    tabs.appendChild(styleTab);

    var drawTab = document.createElement("span");
    drawTab.classList.add("setting-tab");
    drawTab.k=3;
    drawTab.innerText="DRAWING";
    tabs.appendChild(drawTab);

    var otherSettings = document.createElement("span");
    otherSettings.classList.add("setting-tab");
    otherSettings.k=4;
    otherSettings.innerText="OTHER";
    tabs.appendChild(otherSettings);

    var streamerTab = document.createElement("span");
    streamerTab.classList.add("setting-tab");
    streamerTab.k=5
    streamerTab.innerText="STREAMERS  MOD";
    tabs.appendChild(streamerTab);

    var data = document.createElement("div");
    data.classList.add("settings-data");
    settings.appendChild(data);

    var bottomSettingsSpace = document.createElement("div");
    bottomSettingsSpace.classList.add("bottom-settings-space");
    settings.appendChild(bottomSettingsSpace);

    //     var defaultSettingsButton = document.createElement("button");
    //     defaultSettingsButton.classList.add("my-button");
    //     defaultSettingsButton.innerText="DEFAULT";
    //     defaultSettingsButton.onclick=setDefaultSettings;
    //     bottomSettingsSpace.appendChild(defaultSettingsButton);

    currentSettingData=data;
    onSettingsChange(mainTab);
    currentSetting=mainTab;
}

function closeBackground(){
    background.state = "onclose";
    if ( background && background.parentNode ){
        background.style.opacity = 0;
        setTimeout( () => { background.parentNode.removeChild( background ); background.state = "closed" }, 500 );
    }
}

function onSettingsChange(e){
    if (!e.classList.contains("selected")){
        currentSetting ? currentSetting.classList.remove("selected") : 0;
        currentSetting = e;
        changeSettingsData(e.k);
        e.classList.add("selected");
    }
}

function changeSettingsData(_case){
    clearSettingData();
    switch (_case) {
        case 1: {
            createMainSettingData();
            break;
        }
        case 2: {
            createStylesSettingData();
            break;
        }
        case 3: {
            createDrawingSettingData();
            break;
        }
        case 4: {
            createOtherSettingData();
            break;
        }
        case 5: {
            createStreamerSettingData();
            break;
        }
    }
}

function clearSettingData () {
    currentSettingData.textContent = '';
}

function createMainSettingData(){
    var mainSettingFrame = document.createElement("div");
    mainSettingFrame.style.width="100%";
    mainSettingFrame.style.height="100%";
    //mainSettingFrame.style.backgroundImage="url(https://media.discordapp.net/attachments/827569141782282272/865036624819912704/videofun.gif)";
    mainSettingFrame.style.backgroundImage="url(https://media.discordapp.net/attachments/844629306113916938/890684110710931496/doctor.png?width=466&height=660)";
    mainSettingFrame.style.backgroundRepeat="no-repeat";
    mainSettingFrame.style.backgroundPosition="155px 0px";
    currentSettingData.appendChild(mainSettingFrame);
}


/* Создание отдела настроек стиля */
const styleDefault = {
    "mainBG":{
        "section": "none",
        "gradi": {
            "rotate": "45",
            "color1": "#000000",
            "color2": "#ffffff",
            "size1": "33",
            "size2": "66",
        },
        "image": {
            "url": "",
        },
        "color": {
            "color": "#000000",
        }
    },
    "blockBG": {
        "section": "none",
        "gradi": {
            "rotate": "45",
            "color1": "#000000",
            "color2": "#ffffff",
            "size1": "33",
            "size2": "66",
        },
        "image": {
            "url": "",
        },
        "color": {
            "color": "#000000",
        }
    },
    "filters": {
        "section": "none",
        "customizable": {
            "contrast": "0.05",
            "brightness": "0.2",
            "hue-rotate": "0",
            "saturate": "0"
        }
    }
};

var otherSections,
    mainBgSections,
    blockBgSections,
    currentStyleSet,
    styleDefaultStyleButton;
function createStylesSettingData(){
    currentStyleSet = localStorage.getItem("styleJSON") ? JSON.parse(localStorage.getItem("styleJSON")) : styleDefault;
    localStorage.setItem("styleJSON", JSON.stringify(currentStyleSet));
    var styleSettingFrame = document.createElement("div");
    styleSettingFrame.classList.add("style-setting-frame");
    currentSettingData.appendChild(styleSettingFrame);

    var backgroundSettings = document.createElement("div");
    backgroundSettings.classList.add("background-setting");
    styleSettingFrame.appendChild(backgroundSettings);

    var bgTitle = document.createElement("h2");
    bgTitle.classList.add("s-title");
    bgTitle.innerText="background settings";
    backgroundSettings.appendChild(bgTitle);

    var scrollMaxPX = 1050;
    var firstBg = document.createElement("div");
    firstBg.classList.add("background-settings-box");
    firstBg.classList.add("scroll-bottom");
    firstBg.onwheel=(e)=>{
        var b,
            c = parseInt(backgroundScrollElements.style.top);
        if (e.wheelDelta>0 && c+50>=0){b=0;}
        else if (e.wheelDelta<0 && c-50<=-scrollMaxPX){b=-scrollMaxPX}
        else if (e.wheelDelta>0){b=c+50}
        else {b=c-50}
        backgroundScrollElements.style.top= b + "px";

        c = -parseInt(backgroundScrollElements.style.top);
        if (c==0){
            firstBg.classList.remove("scroll-top");
            firstBg.classList.add("scroll-top-hidden");
        }
        else if (c==scrollMaxPX){
            firstBg.classList.remove("scroll-bottom");
            firstBg.classList.add("scroll-bottom-hidden");
        }
        else {
            firstBg.classList.remove("scroll-top-hidden");
            firstBg.classList.remove("scroll-bottom-hidden");
            firstBg.classList.add("scroll-bottom");
            firstBg.classList.add("scroll-top");
        }
        scrollTrack.style.top= c / 50 *( constantM / 21 ) + "px";
    }

    backgroundSettings.appendChild(firstBg);

    var backgroundScrollElements = document.createElement("div");
    backgroundScrollElements.classList.add("scroll-elem");
    backgroundScrollElements.style.top="0px";
    firstBg.appendChild(backgroundScrollElements);


    var scrollBar = document.createElement("div");
    scrollBar.style.height="100%";
    scrollBar.style.width="4px";
    scrollBar.style.borderRadius="10px";
    scrollBar.style.margin="0px 3px 0px 0px";
    firstBg.appendChild(scrollBar);

    var scrollTrack = document.createElement("div");
    scrollTrack.classList.add( 'scroll-track' );
    scrollTrack.style.top="0px";
    scrollBar.appendChild(scrollTrack);
    var offsetY;
    scrollTrack.onmousedown=(e)=>{
        offsetY=e.offsetY;
        document.addEventListener("pointerup", l);
        document.addEventListener("pointermove", f);
    }

    const constantM = 374;
    function f(e){
        e.stopPropagation();
        let rect = scrollBar.getBoundingClientRect();
        if (e.clientY-offsetY<rect.y){scrollTrack.style.top="0px"}
        else if (e.clientY-offsetY>(rect.y+rect.height)) {scrollTrack.style.top=constantM + "px"}
        else if ((e.clientY-offsetY-rect.y)/getScale()>constantM) {scrollTrack.style.top=constantM + "px"}
        else if ((e.clientY-offsetY-rect.y)/getScale()<0) {scrollTrack.style.top="0px"}
        else {scrollTrack.style.top=(e.clientY-offsetY-rect.y)/getScale()+"px";}
        backgroundScrollElements.style.top=-parseInt(scrollTrack.style.top)*1050/constantM+"px";
        var c = parseInt(backgroundScrollElements.style.top);
        c = -parseInt(backgroundScrollElements.style.top);
        if (c==0){
            firstBg.classList.remove("scroll-top");
            firstBg.classList.add("scroll-top-hidden");
        }
        else if (c==scrollMaxPX){
            firstBg.classList.remove("scroll-bottom");
            firstBg.classList.add("scroll-bottom-hidden");
        }
        else {
            firstBg.classList.remove("scroll-top-hidden");
            firstBg.classList.remove("scroll-bottom-hidden");
            firstBg.classList.add("scroll-bottom");
            firstBg.classList.add("scroll-top");
        }
    }

    function l(e){
        e.stopPropagation();
        document.removeEventListener("pointerup", l);
        document.removeEventListener("pointermove", f);
    }

    styleDefaultStyleButton = document.createElement("button");
    checkStyleDefaultStyleButton();
    styleDefaultStyleButton.innerText="default";
    styleDefaultStyleButton.classList.add("default-button");
    styleDefaultStyleButton.onclick=setStyleDefaultStyle;
    currentSettingData.appendChild(styleDefaultStyleButton);

    var firstBgTitle = document.createElement("h2");
    firstBgTitle.classList.add("s-title");
    firstBgTitle.innerText="main background";
    backgroundScrollElements.appendChild(firstBgTitle);

    var mainNoneSection = document.createElement("div");
    mainNoneSection.classList.add("style-section");
    backgroundScrollElements.appendChild(mainNoneSection);

    var box422 = document.createElement("div");
    box422.classList.add("box1");
    mainNoneSection.appendChild(box422);

    var mainblockNoneCheckBox = document.createElement("div");
    mainblockNoneCheckBox.classList.add("my-check-box");
    mainblockNoneCheckBox.innerText="";
    mainblockNoneCheckBox.onclick=()=>{
    };
    box422.appendChild(mainblockNoneCheckBox);

    var noneTitle2 = document.createElement("h2");
    noneTitle2.classList.add("m-title");
    noneTitle2.innerText="none";
    box422.appendChild(noneTitle2);

    var mainGradientSection = document.createElement("div");
    mainGradientSection.classList.add("style-section");
    backgroundScrollElements.appendChild(mainGradientSection);

    var box1 = document.createElement("div");
    box1.classList.add("box1");
    mainGradientSection.appendChild(box1);

    var mainGradCheckBox = document.createElement("div");
    mainGradCheckBox.classList.add("my-check-box");
    mainGradCheckBox.innerText="";
    box1.appendChild(mainGradCheckBox);

    var gradientTitle = document.createElement("h2");
    gradientTitle.classList.value="m-title";
    gradientTitle.innerText="gradient";
    box1.appendChild(gradientTitle);

    var rotateGradTitle = document.createElement("h2");
    rotateGradTitle.classList.value="mini-title";
    rotateGradTitle.innerText="gradien rotation";
    mainGradientSection.appendChild(rotateGradTitle);

    var rotateGradInput = document.createElement("input");
    rotateGradInput.classList.value="my-range";
    rotateGradInput.type = "range";
    rotateGradInput.min=0;
    rotateGradInput.max=360;
    rotateGradInput.step=1;
    rotateGradInput.onmousedown = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    rotateGradInput.oninput=saveAllResaults;
    mainGradientSection.appendChild(rotateGradInput);

    var firstColorGradTitle = document.createElement("h2");
    firstColorGradTitle.classList.value="mini-title";
    firstColorGradTitle.innerText="first color";
    mainGradientSection.appendChild(firstColorGradTitle);

    var colorBox1 = document.createElement("div");
    colorBox1.classList.value="color-box";
    mainGradientSection.appendChild(colorBox1);

    var firstGradColorInput = document.createElement("input");
    firstGradColorInput.classList.value="color-input";
    firstGradColorInput.type = "color";
    firstGradColorInput.value="#000000";
    firstGradColorInput.onclick = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    firstGradColorInput.onchange = ( e ) => {
        colorBox1.style.backgroundColor=firstGradColorInput.value;
    };
    colorBox1.appendChild(firstGradColorInput);

    var firstSizeGradTitle = document.createElement("h2");
    firstSizeGradTitle.classList.value="mini-title";
    firstSizeGradTitle.innerText="first color size";
    mainGradientSection.appendChild(firstSizeGradTitle);

    var firstGradColorSize = document.createElement("input");
    firstGradColorSize.classList.value = "my-range";
    firstGradColorSize.type = "range";
    firstGradColorSize.min=0;
    firstGradColorSize.max=100;
    firstGradColorSize.step=1;
    firstGradColorSize.onmousedown = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    mainGradientSection.appendChild(firstGradColorSize);

    var secondColorGradTitle = document.createElement("h2");
    secondColorGradTitle.classList.value="mini-title";
    secondColorGradTitle.innerText="second color";
    mainGradientSection.appendChild(secondColorGradTitle);

    var colorBox2 = document.createElement("div");
    colorBox2.classList.value="color-box";
    mainGradientSection.appendChild(colorBox2);

    var secondGradColorInput = document.createElement("input");
    secondGradColorInput.classList.value = "color-input";
    secondGradColorInput.type = "color";
    secondGradColorInput.value="#000000";
    secondGradColorInput.onclick = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    secondGradColorInput.onchange = ( e ) => {
        colorBox2.style.backgroundColor=secondGradColorInput.value;
    };
    colorBox2.appendChild(secondGradColorInput);

    var secondSizeGradTitle = document.createElement("h2");
    secondSizeGradTitle.classList.value = "mini-title";
    secondSizeGradTitle.innerText="second color size";
    mainGradientSection.appendChild(secondSizeGradTitle);

    var secondGradColorSize = document.createElement("input");
    secondGradColorSize.classList.value="my-range";
    secondGradColorSize.type = "range";
    secondGradColorSize.min=0;
    secondGradColorSize.max=100;
    secondGradColorSize.step=1;
    secondGradColorSize.onmousedown = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    mainGradientSection.appendChild(secondGradColorSize);

    var randomGradButton = document.createElement("button");
    randomGradButton.innerText="random";
    randomGradButton.classList.value="random-button";
    randomGradButton.onclick=(e)=>{
        if (e.which == 1){ background.style.opacity=0};
        for (let i=0; i<mainBgSections.gradi.inputs.length; i++){
            inputRandomaise(mainBgSections.gradi.inputs[i]);
        };
        realBgStyleUpdate();
        saveAllResaults();
    };
    randomGradButton.onmouseleave = function () { background.style.opacity=1 };
    mainGradientSection.appendChild(randomGradButton);


    var mainImageSection = document.createElement("div");
    mainImageSection.classList.add("style-section");
    backgroundScrollElements.appendChild(mainImageSection);

    var box2 = document.createElement("div");
    box2.classList.add("box1");
    mainImageSection.appendChild(box2);

    var mainImageCheckBox = document.createElement("div");
    mainImageCheckBox.classList.add("my-check-box");
    mainImageCheckBox.k = false;
    mainImageCheckBox.innerText="";
    box2.appendChild(mainImageCheckBox);

    var imageTitle = document.createElement("h2");
    imageTitle.classList.value="m-title";
    imageTitle.innerText="image";
    box2.appendChild(imageTitle);

    var urlTitle = document.createElement("h2");
    urlTitle.classList.value="mini-title";
    urlTitle.innerText="background image link";
    mainImageSection.appendChild(urlTitle);

    var linkInput1 = document.createElement('input');
    linkInput1.classList.value="my-text-input";
    linkInput1.placeholder="URL";
    mainImageSection.appendChild(linkInput1);

    var mainColorSection = document.createElement("div");
    mainColorSection.classList.add("style-section");
    backgroundScrollElements.appendChild(mainColorSection);

    var box3 = document.createElement("div");
    box3.classList.add("box1");
    mainColorSection.appendChild(box3);

    var mainColorCheckBox = document.createElement("div");
    mainColorCheckBox.classList.add("my-check-box");
    box3.appendChild(mainColorCheckBox);

    var colorTitle = document.createElement("h2");
    colorTitle.classList.value="m-title";
    colorTitle.innerText="color";
    box3.appendChild(colorTitle);

    var colorInputTitle = document.createElement("h2");
    colorInputTitle.classList.value="mini-title";
    colorInputTitle.innerText="background color";
    mainColorSection.appendChild(colorInputTitle);

    var colorBox3 = document.createElement("div");
    colorBox3.classList.value="color-box";
    mainColorSection.appendChild(colorBox3);

    var colorColorInput = document.createElement("input");
    colorColorInput.classList.add("color-input");
    colorColorInput.type = "color";
    colorColorInput.value="#000000";
    colorColorInput.onclick = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    colorColorInput.onchange = ( e ) => {
        colorBox3.style.backgroundColor = colorColorInput.value;
    };
    colorBox3.appendChild( colorColorInput );


    mainBgSections = {
        "none": {"key": false, "class": "color-1", "section": mainNoneSection, "checkbox": mainblockNoneCheckBox, "active" : Array.from(mainNoneSection.getElementsByTagName("*")).slice(2), "type": "mainBG", "inputs":  Array.from(mainNoneSection.getElementsByTagName("input"))},
        "gradi": {"key": false, "class": "gradi-1", "section": mainGradientSection,"checkbox": mainGradCheckBox, "active" : Array.from(mainGradientSection.getElementsByTagName("*")).slice(2), "type": "mainBG", "inputs":  Array.from(mainGradientSection.getElementsByTagName("input"))},
        "image": {"key": false, "class": "image-1", "section": mainImageSection, "checkbox": mainImageCheckBox, "active" : Array.from(mainImageSection.getElementsByTagName("*")).slice(2), "type": "mainBG", "inputs": Array.from(mainImageSection.getElementsByTagName("input"))},
        "color": {"key": false, "class": "color-1", "section": mainColorSection, "checkbox": mainColorCheckBox, "active" : Array.from(mainColorSection.getElementsByTagName("*")).slice(2), "type": "mainBG", "inputs": Array.from(mainColorSection.getElementsByTagName("input"))},
    };

    /*///////////////////////////////////////////////////////////////////*/

    var helpBox = document.createElement("div");
    helpBox.classList.add("help-box");
    backgroundScrollElements.appendChild(helpBox);

    var secondBgTitle = document.createElement("h2");
    secondBgTitle.classList.add("s-title");
    secondBgTitle.innerText="block background";
    backgroundScrollElements.appendChild(secondBgTitle);

    var blockNoneSection = document.createElement("div");
    blockNoneSection.classList.add("style-section");
    backgroundScrollElements.appendChild(blockNoneSection);

    var box42 = document.createElement("div");
    box42.classList.add("box1");
    blockNoneSection.appendChild(box42);

    var blockNoneCheckBox = document.createElement("div");
    blockNoneCheckBox.classList.add("my-check-box");
    blockNoneCheckBox.innerText="";
    blockNoneCheckBox.onclick=()=>{
    };
    box42.appendChild(blockNoneCheckBox);

    var noneTitle = document.createElement("h2");
    noneTitle.classList.add("m-title");
    noneTitle.innerText="none";
    box42.appendChild(noneTitle);

    var blockGradientSection = document.createElement("div");
    blockGradientSection.classList.add("style-section");
    backgroundScrollElements.appendChild(blockGradientSection);

    var box12 = document.createElement("div");
    box12.classList.add("box1");
    blockGradientSection.appendChild(box12);

    var blockGradCheckBox = document.createElement("div");
    blockGradCheckBox.classList.add("my-check-box");
    blockGradCheckBox.innerText="";
    blockGradCheckBox.onclick=()=>{
    };
    box12.appendChild(blockGradCheckBox);

    var gradientTitle2 = document.createElement("h2");
    gradientTitle2.classList.add("m-title");
    gradientTitle2.innerText="gradient";
    box12.appendChild(gradientTitle2);

    var rotateGradTitle2 = document.createElement("h2");
    rotateGradTitle2.classList.add("mini-title");
    rotateGradTitle2.innerText="gradien rotation";
    blockGradientSection.appendChild(rotateGradTitle2);

    var rotateGradInput2 = document.createElement("input");
    rotateGradInput2.classList.add("my-range");
    rotateGradInput2.type = "range";
    rotateGradInput2.min=0;
    rotateGradInput2.step=1;
    rotateGradInput2.max=360;
    rotateGradInput2.onmousedown = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    blockGradientSection.appendChild(rotateGradInput2);

    var firstColorGradTitle2 = document.createElement("h2");
    firstColorGradTitle2.classList.add("mini-title");
    firstColorGradTitle2.innerText="first color";
    blockGradientSection.appendChild(firstColorGradTitle2);

    var colorBox12 = document.createElement("div");
    colorBox12.style.height="30px";
    colorBox12.style.width="auto";
    colorBox12.style.borderRadius="5px";
    colorBox12.style.backgroundColor="black";
    colorBox12.style.border="2px solid rgb(79, 22, 58)";
    blockGradientSection.appendChild(colorBox12);

    var firstGradColorInput2 = document.createElement("input");
    firstGradColorInput2.classList.add("color-input");
    firstGradColorInput2.type = "color";
    firstGradColorInput2.value="#000000";
    firstGradColorInput2.onclick = ( e ) => { if ( e.which == 1 ) { background.style.opacity = 0 }};
    firstGradColorInput2.onchange = ( e ) => {
        colorBox12.style.backgroundColor=firstGradColorInput2.value;
    };
    colorBox12.appendChild(firstGradColorInput2);

    var firstSizeGradTitle2 = document.createElement("h2");
    firstSizeGradTitle2.classList.add("mini-title");
    firstSizeGradTitle2.innerText="first color size";
    blockGradientSection.appendChild(firstSizeGradTitle2);

    var firstGradColorSize2 = document.createElement("input");
    firstGradColorSize2.classList.add("my-range");
    firstGradColorSize2.type = "range";
    firstGradColorSize2.min=0;
    firstGradColorSize2.step=1;
    firstGradColorSize2.max=100;
    firstGradColorSize2.onmousedown = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    blockGradientSection.appendChild(firstGradColorSize2);

    var secondColorGradTitle2 = document.createElement("h2");
    secondColorGradTitle2.classList.add("mini-title");
    secondColorGradTitle2.innerText="second color";
    blockGradientSection.appendChild(secondColorGradTitle2);

    var colorBox22 = document.createElement("div");
    colorBox22.style.height="30px";
    colorBox22.style.width="auto";
    colorBox22.style.borderRadius="5px";
    colorBox22.style.backgroundColor="black";
    colorBox22.style.border="2px solid rgb(79, 22, 58)";
    blockGradientSection.appendChild(colorBox22);

    var secondGradColorInput2 = document.createElement("input");
    secondGradColorInput2.classList.add("color-input");
    secondGradColorInput2.type = "color";
    secondGradColorInput2.value="#000000";
    secondGradColorInput2.onclick = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    secondGradColorInput2.onchange = ( e ) => {
        colorBox22.style.backgroundColor=secondGradColorInput2.value;
    }
    colorBox22.appendChild(secondGradColorInput2);

    var secondSizeGradTitle2 = document.createElement("h2");
    secondSizeGradTitle2.classList.add("mini-title");
    secondSizeGradTitle2.innerText="second color size";
    blockGradientSection.appendChild(secondSizeGradTitle2);

    var secondGradColorSize2 = document.createElement("input");
    secondGradColorSize2.classList.add("my-range");
    secondGradColorSize2.type = "range";
    secondGradColorSize2.min=0;
    secondGradColorSize2.step=1;
    secondGradColorSize2.max=100;
    secondGradColorSize2.onmousedown = ( e ) => { if ( e.which == 1 ){ background.style.opacity = 0 }};
    blockGradientSection.appendChild(secondGradColorSize2);

    var randomGradButton2 = document.createElement( "button" );
    randomGradButton2.innerText = "random";
    randomGradButton2.classList.add( "random-button" );
    randomGradButton2.onclick = ( e ) => {
        if ( e.which == 1 ){ background.style.opacity = 0 };
        for ( let i = 0; i < blockBgSections.gradi.inputs.length; i++ ){
            inputRandomaise( blockBgSections.gradi.inputs[i] );
        };
        realBgStyleUpdate ();
        saveAllResaults ();
    };
    randomGradButton2.onmouseleave = function () { background.style.opacity = 1 };
    blockGradientSection.appendChild( randomGradButton2 );


    var blockImageSection = document.createElement("div");
    blockImageSection.classList.add("style-section");
    backgroundScrollElements.appendChild(blockImageSection);

    var box22 = document.createElement("div");
    box22.classList.add("box1");
    blockImageSection.appendChild(box22);

    var blockImageCheckBox = document.createElement("div");
    blockImageCheckBox.classList.add("my-check-box");
    blockImageCheckBox.k = false;
    blockImageCheckBox.innerText="";
    blockImageCheckBox.onclick=()=>{
    };
    box22.appendChild(blockImageCheckBox);

    var imageTitle2 = document.createElement("h2");
    imageTitle2.classList.add("m-title");
    imageTitle2.innerText="image";
    box22.appendChild(imageTitle2);

    var urlTitle2 = document.createElement("h2");
    urlTitle2.classList.add("mini-title");
    urlTitle2.innerText="background image link";
    blockImageSection.appendChild(urlTitle2);

    var linkInput12 = document.createElement('input');
    linkInput12.classList.add("my-text-input");
    linkInput12.placeholder="URL";
    blockImageSection.appendChild(linkInput12);

    var blockColorSection = document.createElement("div");
    blockColorSection.classList.add("style-section");
    backgroundScrollElements.appendChild(blockColorSection);

    var box32 = document.createElement("div");
    box32.classList.add("box1");
    blockColorSection.appendChild(box32);

    var blockColorCheckBox = document.createElement("div");
    blockColorCheckBox.classList.add("my-check-box");
    blockColorCheckBox.k=false;
    blockColorCheckBox.onclick=()=>{
    };
    box32.appendChild(blockColorCheckBox);

    var colorTitle2 = document.createElement("h2");
    colorTitle2.classList.add("m-title");
    colorTitle2.innerText="color";
    box32.appendChild(colorTitle2);

    var colorInputTitle2 = document.createElement("h2");
    colorInputTitle2.classList.add("mini-title");
    colorInputTitle2.innerText="background color";
    blockColorSection.appendChild(colorInputTitle2);

    var colorBox32 = document.createElement("div");
    colorBox32.style.height="30px";
    colorBox32.style.width="auto";
    colorBox32.style.borderRadius="5px";
    colorBox32.style.backgroundColor="black";
    colorBox32.style.border="2px solid rgb(79, 22, 58)";
    blockColorSection.appendChild(colorBox32);

    var colorColorInput2 = document.createElement("input");
    colorColorInput2.classList.add("color-input");
    colorColorInput2.type = "color";
    colorColorInput2.value="#000000";
    colorColorInput2.onclick = ( e ) => { if ( e.which == 1 ) { background.style.opacity = 0 }};
    colorColorInput2.onchange = ( e ) => {
        colorBox32.style.backgroundColor=colorColorInput2.value;
    };
    colorColorInput2.style.width="100%";
    colorColorInput2.style.height="100%";
    colorColorInput2.style.cursor="pointer";
    colorColorInput2.style.opacity=0;
    colorBox32.appendChild(colorColorInput2);

    blockBgSections = {
        "none": {"key": false, "class": "color-1", "section": blockNoneSection, "checkbox": blockNoneCheckBox, "active" : Array.from(blockNoneSection.getElementsByTagName("*")).slice(2), "type": "blockBG", "inputs":  Array.from(blockNoneSection.getElementsByTagName("input"))},
        "gradi": {"key": false, "class": "gradi-1", "section": blockGradientSection,"checkbox": blockGradCheckBox, "active" : Array.from(blockGradientSection.getElementsByTagName("*")).slice(2), "type": "blockBG", "inputs":  Array.from(blockGradientSection.getElementsByTagName("input"))},
        "image": {"key": false, "class": "image-1", "section": blockImageSection, "checkbox": blockImageCheckBox, "active" : Array.from(blockImageSection.getElementsByTagName("*")).slice(2), "type": "blockBG", "inputs": Array.from(blockImageSection.getElementsByTagName("input"))},
        "color": {"key": false, "class": "color-1", "section": blockColorSection, "checkbox": blockColorCheckBox, "active" : Array.from(blockColorSection.getElementsByTagName("*")).slice(2), "type": "blockBG", "inputs": Array.from(blockColorSection.getElementsByTagName("input"))},
    };

    /*///////////////////////////////////////////////////////////////////*/

    var backgroundSettings2 = document.createElement("div");
    backgroundSettings2.style.padding="10px";
    //backgroundSettings2.style.border="4px solid #c7c7c7";
    backgroundSettings2.style.borderRadius="10px";
    backgroundSettings2.style.flex="1 1 20%";
    backgroundSettings2.style.display="flex";
    backgroundSettings2.style.flexDirection="column";
    styleSettingFrame.appendChild(backgroundSettings2);

    var otherTitle = document.createElement("h2");
    otherTitle.classList.add("s-title");
    otherTitle.innerText="other styles";
    backgroundSettings2.appendChild(otherTitle);

    var newBox = document.createElement("div");
    newBox.style.border="4px solid #fff";
    newBox.style.borderRadius="10px";
    newBox.style.padding="10px";
    newBox.style.height="100%";
    newBox.style.padding="10px";
    backgroundSettings2.appendChild(newBox);

    var scrollElem = document.createElement("div");
    scrollElem.style.height="auto";
    newBox.appendChild(scrollElem);

    var filersTitle = document.createElement("h2");
    filersTitle.classList.add("s-title");
    filersTitle.innerText="filters";
    scrollElem.appendChild(filersTitle);

    var undexrFilterBox = document.createElement( 'div' );
    undexrFilterBox.style.display = 'flex';
    undexrFilterBox.style.flexDirection = 'column';
    scrollElem.appendChild(undexrFilterBox);

    var other1Box = document.createElement("div");
    other1Box.style.display="flex";
    other1Box.style.flexDirection="row";
    other1Box.style.width="100%";
    other1Box.style.margin="10px 0px 10px 0px";
    undexrFilterBox.appendChild(other1Box);

    var otherNoneBox = document.createElement("div");
    otherNoneBox.classList.add("box1");
    other1Box.appendChild(otherNoneBox);

    var otherNoneCheckBox = document.createElement("div");
    otherNoneCheckBox.classList.add("my-check-box");
    otherNoneBox.appendChild(otherNoneCheckBox);

    var otherNoneTitle = document.createElement("h2");
    otherNoneTitle.classList.add("m-title");
    otherNoneTitle.innerText="none";
    otherNoneBox.appendChild(otherNoneTitle);

    var otherGrayScaleBox = document.createElement("div");
    otherGrayScaleBox.classList.add("box1");
    other1Box.appendChild(otherGrayScaleBox);

    var otherGrayScaleCheckBox = document.createElement("div");
    otherGrayScaleCheckBox.classList.add("my-check-box");
    otherGrayScaleBox.appendChild(otherGrayScaleCheckBox);


    var otherGrayScaleTitle = document.createElement("h2");
    otherGrayScaleTitle.classList.add("m-title");
    otherGrayScaleTitle.innerText="grayscale";
    otherGrayScaleBox.appendChild(otherGrayScaleTitle);

    var other2Box = document.createElement("div");
    other2Box.style.display="flex";
    other2Box.style.flexDirection="row";
    other2Box.style.width="100%";
    other2Box.style.margin="10px 0px 10px 0px";
    undexrFilterBox.appendChild(other2Box);

    var otherRevertBox = document.createElement("div");
    otherRevertBox.classList.add("box1");
    other2Box.appendChild(otherRevertBox);

    var otherRevertCheckBox = document.createElement("div");
    otherRevertCheckBox.classList.add("my-check-box");
    otherRevertBox.appendChild(otherRevertCheckBox);

    var otherRevertTitle = document.createElement("h2");
    otherRevertTitle.classList.add("m-title");
    otherRevertTitle.innerText="revert★";
    otherRevertBox.appendChild(otherRevertTitle);

    var otherSepiaBox = document.createElement("div");
    otherSepiaBox.classList.add("box1");
    other2Box.appendChild(otherSepiaBox);

    var otherSepiaCheckBox = document.createElement("div");
    otherSepiaCheckBox.classList.add("my-check-box");
    otherSepiaBox.appendChild(otherSepiaCheckBox);

    var otherSepiaTitle = document.createElement("h2");
    otherSepiaTitle.classList.add("m-title");
    otherSepiaTitle.innerText="sepia";
    otherSepiaBox.appendChild(otherSepiaTitle);

    var other3Box = document.createElement("div");
    other3Box.style.display="flex";
    other3Box.style.flexDirection="row";
    other3Box.style.width="100%";
    other3Box.style.margin="10px 0px 10px 0px";
    undexrFilterBox.appendChild(other3Box);

    var contrastBox = document.createElement("div");
    contrastBox.classList.add("box1");
    contrastBox.style.flexDirection = 'column';
    contrastBox.style.padding = '0px 10px 0px 10px';
    other3Box.appendChild(contrastBox);

    var contrastTitle = document.createElement("h2");
    contrastTitle.classList.value="mini-title";
    contrastTitle.innerText="contrast";
    contrastBox.appendChild(contrastTitle);

    var contrstInput = document.createElement("input");
    contrstInput.classList.value="my-range";
    contrstInput.id = "con";
    contrstInput.type = "range";
    contrstInput.min=0.05;
    contrstInput.max=3;
    contrstInput.step=0.01;
    contrstInput.onmousedown = e => { if ( e.which == 1 ) { background.style.opacity = 0 } };
    contrstInput.oninput = () => { document.querySelector("html").style.filter = `contrast(${contrstInput.value})` }
    contrastBox.appendChild ( contrstInput );

    var brightnessBox = document.createElement("div");
    brightnessBox.classList.add("box1");
    brightnessBox.style.flexDirection = 'column';
    brightnessBox.style.padding = '0px 10px 0px 10px';
    other3Box.appendChild(brightnessBox);

    var brightnessTitle = document.createElement("h2");
    brightnessTitle.classList.value="mini-title";
    brightnessTitle.innerText="brightness";
    brightnessBox.appendChild( brightnessTitle );

    var brightnessInput = document.createElement("input");
    brightnessInput.classList.value="my-range";
    brightnessInput.id = "bri";
    brightnessInput.type = "range";
    brightnessInput.min=0.2;
    brightnessInput.max=8;
    brightnessInput.step=0.1;
    brightnessInput.onmousedown = e => { if ( e.which == 1 ){ background.style.opacity = 0 } };
    brightnessInput.oninput = () => { document.querySelector("html").style.filter = `brightness(${brightnessInput.value})` }
    brightnessBox.appendChild ( brightnessInput );

    var other4Box = document.createElement("div");
    other4Box.style.display="flex";
    other4Box.style.flexDirection="row";
    other4Box.style.width="100%";
    other4Box.style.margin="10px 0px 10px 0px";
    undexrFilterBox.appendChild(other4Box);

    var hueBox = document.createElement("div");
    hueBox.classList.add("box1");
    hueBox.style.flexDirection = 'column';
    hueBox.style.padding = '0px 10px 0px 10px';
    other4Box.appendChild(hueBox);

    var hueTitle = document.createElement("h2");
    hueTitle.classList.value="mini-title";
    hueTitle.innerText="hue-rotate";
    hueBox.appendChild( hueTitle );

    var hueInput = document.createElement("input");
    hueInput.id = "hue";
    hueInput.classList.value="my-range";
    hueInput.type = "range";
    hueInput.min=0;
    hueInput.max=360;
    hueInput.step=1;
    hueInput.onmousedown=(e)=>{if (e.which == 1){ background.style.opacity = 0 }};
    hueInput.oninput = () => { document.querySelector("html").style.filter = `hue-rotate(${hueInput.value}deg)` }
    hueBox.appendChild ( hueInput );

    var saturateBox = document.createElement("div");
    saturateBox.classList.add("box1");
    saturateBox.style.flexDirection = 'column';
    saturateBox.style.padding = '0px 10px 0px 10px';
    other4Box.appendChild( saturateBox );

    var saturateTitle = document.createElement("h2");
    saturateTitle.classList.value="mini-title";
    saturateTitle.innerText="saturate";
    saturateBox.appendChild( saturateTitle );

    var saturateInput = document.createElement("input");
    saturateInput.classList.value="my-range";
    saturateInput.id = "sat"
    saturateInput.type = "range";
    saturateInput.min=0;
    saturateInput.max=80;
    saturateInput.step=0.1;
    saturateInput.onmousedown = e => { if (e.which == 1){ background.style.opacity = 0 }};
    saturateInput.oninput = () => { document.querySelector("html").style.filter = `saturate(${saturateInput.value})` }
    saturateBox.appendChild ( saturateInput );

    otherSections = {
        "none": {"key": false, "class": "", "section": otherNoneBox, "checkbox": otherNoneCheckBox, "active" : Array.from(otherNoneBox.getElementsByTagName("*")).slice(1), "type": "filters"},
        "gray": {"key": false, "class": "", "section": otherGrayScaleBox,"checkbox": otherGrayScaleCheckBox, "active" : Array.from(otherGrayScaleBox.getElementsByTagName("*")).slice(1), "type": "filters"},
        "revt": {"key": false, "class": "", "section": otherRevertBox, "checkbox": otherRevertCheckBox, "active" : Array.from(otherRevertBox.getElementsByTagName("*")).slice(1), "type": "filters"},
        "sepi": {"key": false, "class": "", "section": otherSepiaBox, "checkbox": otherSepiaCheckBox, "active" : Array.from(otherSepiaBox.getElementsByTagName("*")).slice(1), "type": "filters"},
    };

    document.querySelector("#con").addEventListener("input", onFilterInput);
    document.querySelector("#bri").addEventListener("input", onFilterInput);
    document.querySelector("#hue").addEventListener("input", onFilterInput)
    document.querySelector("#sat").addEventListener("input", onFilterInput);

    setBgStyleInputs(currentStyleSet);

    globalSelectSection(mainBgSections, currentStyleSet.mainBG.section);
    addOnClick(mainBgSections);
    addOnchange(mainBgSections);
    addOnInputStyleUpdate(mainBgSections);

    globalSelectSection(blockBgSections, currentStyleSet.blockBG.section);
    addOnClick(blockBgSections);
    addOnchange(blockBgSections);
    addOnInputStyleUpdate(blockBgSections);

    globalSelectSection( otherSections, currentStyleSet.filters.section);
    addOnClick (otherSections, false);
    addOnchange(otherSections);
    addOnInputStyleUpdate(otherSections);

    realBgStyleUpdate();

};

window.g = function (){console.log(currentStyleSet)}

function globalSelectSection( selection, section, a=true ){
    if (!a){filteInputDefaultAll();}
    clearCausesOfFilers();
    clearCausesOfBgStyle();
    disableAll( selection );
    removeAllCheckBoxes( selection );
    hideAllSections( selection );
    selectSection( selection, section );
    selectCheckBox( selection, section );
    unhidesection( selection, section );
    onstyleChange( selection, section );
    saveAllResaults ();
    realBgStyleUpdate ();
    checkStyleDefaultStyleButton ();
};


function onFilterInput(){
    filteInputDefault(this);
    globalSelectSection( otherSections, "none");
    realBgStyleUpdate();
    saveAllResaults();
    checkStyleDefaultStyleButton();
}

function filteInputDefault(t){
    if (t.id != "con") document.querySelector("#con").value = styleDefault.filters.customizable.contrast;
    if (t.id != "bri") document.querySelector("#bri").value = styleDefault.filters.customizable.brightness;
    if (t.id != "hue") document.querySelector("#hue").value = styleDefault.filters.customizable["hue-rotate"];
    if (t.id != "sat") document.querySelector("#sat").value = styleDefault.filters.customizable.saturate;
}

function filteInputDefaultAll(){
    document.querySelector("#con").value = styleDefault.filters.customizable.contrast;
    document.querySelector("#bri").value = styleDefault.filters.customizable.brightness;
    document.querySelector("#hue").value = styleDefault.filters.customizable["hue-rotate"];
    document.querySelector("#sat").value = styleDefault.filters.customizable.saturate;
}

function clearCausesOfFilers(){
    document.querySelector("html").style.filter = "";
}

function addOnInputStyleUpdate(selection){
    var o = Object.entries(selection);
    for (let i=0; i<o.length; i++){
        o[i][1].section.oninput=realBgStyleUpdate;
    };
}

function setStyleDefaultStyle(){
    currentStyleSet = styleDefault;
    clearCausesOfFilers();
    setBgStyleInputs( currentStyleSet );
    console.log(currentStyleSet.filters.customizable);

    globalSelectSection(mainBgSections, "none");
    globalSelectSection(blockBgSections, "none");
    globalSelectSection(otherSections, "none");
}

function setBgStyleInputs(paremetrs){
    var arr = [];
    var o = Object.entries(mainBgSections);
    for (let i=0; i<o.length; i++){
        for (let k=0; k<o[i][1].inputs.length; k++){
            arr.push(o[i][1].inputs[k]);
        }
    }
    var a = Object.entries(blockBgSections);
    for (let i=0; i<a.length; i++){
        for (let k=0; k<a[i][1].inputs.length; k++){
            arr.push(a[i][1].inputs[k]);
        }
    }

    arr[0].value=paremetrs.mainBG.gradi.rotate;
    arr[1].value=paremetrs.mainBG.gradi.color1;
    arr[2].value=paremetrs.mainBG.gradi.size1;
    arr[3].value=paremetrs.mainBG.gradi.color2;
    arr[4].value=paremetrs.mainBG.gradi.size2;
    arr[5].value=paremetrs.mainBG.image.url;
    arr[6].value=paremetrs.mainBG.color.color;
    arr[7].value=paremetrs.blockBG.gradi.rotate;
    arr[8].value=paremetrs.blockBG.gradi.color1;
    arr[9].value=paremetrs.blockBG.gradi.size1;
    arr[10].value=paremetrs.blockBG.gradi.color2;
    arr[11].value=paremetrs.blockBG.gradi.size2;
    arr[12].value=paremetrs.blockBG.image.url;
    arr[13].value=paremetrs.blockBG.color.color;
    document.querySelector("#con").value=paremetrs.filters.customizable.contrast;
    document.querySelector("#bri").value=paremetrs.filters.customizable.brightness;
    document.querySelector("#hue").value=paremetrs.filters.customizable["hue-rotate"];
    document.querySelector("#sat").value=paremetrs.filters.customizable.saturate;
}

function saveAllResaults(){
    var arr = [];
    var o = Object.entries(mainBgSections);
    for (let i=0; i<o.length; i++){
        for (let k=0; k<o[i][1].inputs.length; k++){
            arr.push(o[i][1].inputs[k]);
        }
    }
    var a = Object.entries(blockBgSections);
    for (let i=0; i<a.length; i++){
        for (let k=0; k<a[i][1].inputs.length; k++){
            arr.push(a[i][1].inputs[k]);
        }
    }
    var b = Object.entries(otherSections);
    for (let i=0; i<a.length; i++){
        for (let k=0; k<a[i][1].inputs.length; k++){
            arr.push(a[i][1].inputs[k]);
        }
    }
    currentStyleSet = {
        "mainBG":{
            "section": currentStyleSet.mainBG.section,
            "gradi": {
                "rotate": arr[0].value,
                "color1": arr[1].value,
                "color2": arr[3].value,
                "size1": arr[2].value,
                "size2": arr[4].value
            },
            "image": {
                "url": arr[5].value,
            },
            "color": {
                "color": arr[6].value,
            }
        },
        "blockBG": {
            "section": currentStyleSet.blockBG.section,
            "gradi": {
                "rotate": arr[7].value,
                "color1": arr[8].value,
                "color2": arr[10].value,
                "size1": arr[9].value,
                "size2": arr[11].value
            },
            "image": {
                "url": arr[12].value,
            },
            "color": {
                "color": arr[13].value,
            }
        },
        "filters": {
            "section": currentStyleSet.filters.section,
            "customizable": {
                "contrast": document.querySelector("#con").value,
                "brightness": document.querySelector("#bri").value,
                "hue-rotate": document.querySelector("#hue").value,
                "saturate": document.querySelector("#sat").value
            }
        }
    };

    localStorage.setItem("styleJSON", JSON.stringify(currentStyleSet));
}

/*---main---*/
window.f = freeStyleUpdate;
function freeStyleUpdate(){
    currentStyleSet = localStorage.getItem("styleJSON") ? JSON.parse(localStorage.getItem("styleJSON")) : styleDefault;

    switch(currentStyleSet.mainBG.section){
        case "gradi": {
            document.querySelector("#__next").style.backgroundImage=`linear-gradient(${currentStyleSet.mainBG.gradi.rotate}deg,${currentStyleSet.mainBG.gradi.color1} ${currentStyleSet.mainBG.gradi.size1}%, ${currentStyleSet.mainBG.gradi.color2} ${currentStyleSet.mainBG.gradi.size2}%)`;
            break;
        }
        case "image": {
            document.querySelector("#__next").style.backgroundImage=`url(${currentStyleSet.mainBG.image.url})`;
            break;
        }
        case "color": {
            document.querySelector("#__next").style.backgroundColor=`${currentStyleSet.mainBG.color.color}`;
            break;
        }
        case "none" :{
        }
    };

    switch(currentStyleSet.blockBG.section){
        case "gradi": {
            document.querySelector("#content").firstChild.style.backgroundImage=`linear-gradient(${currentStyleSet.blockBG.gradi.rotate}deg, ${currentStyleSet.blockBG.gradi.color1} ${currentStyleSet.blockBG.gradi.size1}%, ${currentStyleSet.blockBG.gradi.color2} ${currentStyleSet.blockBG.gradi.size2}%)`;
            break;
        }
        case "image": {
            document.querySelector("#content").firstChild.style.backgroundImage=`url(${currentStyleSet.blockBG.image.url})`;
            break;
        }
        case "color": {
            document.querySelector("#content").firstChild.style.backgroundColor=`${currentStyleSet.blockBG.color.color}`;
            break;
        }
        case "none" :{
        }
    };

    switch(currentStyleSet.filters.section){
        case "none": {
            if (currentStyleSet.filters.customizable.contrast != "0.05") document.querySelector("html").style.filter = `contrast(${currentStyleSet.filters.customizable.contrast})`;
            else if (currentStyleSet.filters.customizable.brightness != "0.2") document.querySelector("html").style.filter = `brightness(${currentStyleSet.filters.customizable.brightness})`;
            else if (currentStyleSet.filters.customizable["hue-rotate"] != "0") document.querySelector("html").style.filter = `hue-rotate(${currentStyleSet.filters.customizable["hue-rotate"]}deg`;
            else if (currentStyleSet.filters.customizable.saturate != "0") document.querySelector("html").style.filter = `saturate(${currentStyleSet.filters.customizable.saturate})`;
            //document.querySelector("html").style.filter = "";
            break;
        }
        case "gray": {
            document.querySelector("html").style.filter = "grayscale(1)";
            break;
        }
        case "revt": {
            document.querySelector("html").style.filter = "invert(1)";
            break;
        }
        case "sepi" :{
            document.querySelector("html").style.filter = "sepia(1)";
        }
    };


};


function realBgStyleUpdate(){
    var arr = [];
    var o = Object.entries(mainBgSections);
    for (let i=0; i<o.length; i++){
        for (let k=0; k<o[i][1].inputs.length; k++){
            arr.push(o[i][1].inputs[k]);
        }
    };
    var a = Object.entries(blockBgSections);
    for (let i=0; i<a.length; i++){
        for (let k=0; k<a[i][1].inputs.length; k++){
            arr.push(a[i][1].inputs[k]);
        }
    };


    arr[1].parentNode.style.backgroundColor=arr[1].value;
    arr[3].parentNode.style.backgroundColor=arr[3].value;
    arr[6].parentNode.style.backgroundColor=arr[6].value;
    arr[8].parentNode.style.backgroundColor=arr[8].value;
    arr[10].parentNode.style.backgroundColor=arr[10].value;
    arr[13].parentNode.style.backgroundColor=arr[13].value;


    switch(currentStyleSet.mainBG.section){
        case "gradi": {
            document.querySelector("#__next").style.backgroundImage=`linear-gradient(${arr[0].value}deg, ${arr[1].value} ${arr[2].value}%, ${arr[3].value} ${arr[4].value}%)`;
            break;
        }
        case "image": {
            document.querySelector("#__next").style.backgroundImage=`url(${arr[5].value})`;
            break;
        }
        case "color": {
            document.querySelector("#__next").style.backgroundColor=`${arr[6].value}`;
            break;
        }
        case "none" :{
        }
    };

    switch(currentStyleSet.blockBG.section){
        case "gradi": {
            document.querySelector("#content").firstChild.style.backgroundImage=`linear-gradient(${arr[7].value}deg, ${arr[8].value} ${arr[9].value}%, ${arr[10].value} ${arr[11].value}%)`;
            break;
        }
        case "image": {
            document.querySelector("#content").firstChild.style.backgroundImage=`url(${arr[12].value})`;
            break;
        }
        case "color": {
            document.querySelector("#content").firstChild.style.backgroundColor=`${arr[13].value}`;
            break;
        }
        case "none" :{
        }
    };

    switch(currentStyleSet.filters.section){
        case "none": {
            if (currentStyleSet.filters.customizable.contrast != "0.05") document.querySelector("html").style.filter = `contrast(${currentStyleSet.filters.customizable.contrast})`;
            else if (currentStyleSet.filters.customizable.brightness != "0.2") document.querySelector("html").style.filter = `brightness(${currentStyleSet.filters.customizable.brightness})`;
            else if (currentStyleSet.filters.customizable["hue-rotate"] != "0") document.querySelector("html").style.filter = `hue-rotate(${currentStyleSet.filters.customizable["hue-rotate"]}deg`;
            else if (currentStyleSet.filters.customizable.saturate != "0") document.querySelector("html").style.filter = `saturate(${currentStyleSet.filters.customizable.saturate})`;
            break;
        }
        case "gray": {
            document.querySelector("html").style.filter = "grayscale(1)";
            break;
        }
        case "revt": {
            document.querySelector("html").style.filter = "invert(1)";
            break;
        }
        case "sepi" :{
            document.querySelector("html").style.filter = "sepia(1)";
        }
    };
}


function inputRandomaise(input){
    switch (input.type) {
        case "color" : {
            randomColor(input);
            break;
        }
        case "range" : {
            randomRange(input);
            break;
        }
    }
};

function randomRange(input){
    input.value = getRandomInt(Number(input.min), Number(input.max));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(input){
    var r = '#'+Math.random().toString(16).substr(2,6);
    input.value = r;
    input.parentNode.style.backgroundColor=r;
};

function checkStyleDefaultStyleButton() {
    if ( JSON.stringify ( styleDefault ) == JSON.stringify ( currentStyleSet ) ){
        styleDefaultStyleButton.disabled=true;
        styleDefaultStyleButton.classList.add("disabled");
        styleDefaultStyleButton.classList.add("low-opacity");
    } else {
        styleDefaultStyleButton.disabled=false;
        styleDefaultStyleButton.classList.remove("disabled");
        styleDefaultStyleButton.classList.remove("low-opacity");
    }
};

function onstyleChange(selection, section){
    currentStyleSet[selection[section].type].section=section;
    localStorage.setItem("styleJSON", JSON.stringify( currentStyleSet ));
};

function unhidesection(selection, section){
    for (let i=0; i<selection[section].active.length; i++){
        selection[section].active[i].classList.remove("low-opacity");
        selection[section].active[i].classList.remove("disabled");
        selection[section].active[i].disabled=false;
    }
};

function selectCheckBox(selection, section){
    selection[section].checkbox.innerText="";
};

function selectSection(selection, section){
    selection[section].key=true;
};


function disableAll(selection){
    var o = Object.entries(selection);
    for (let i=0; i<o.length; i++){
        o[i][1].key=false;
    };
};


function removeAllCheckBoxes(selection){
    var o = Object.entries(selection);
    for (let i=0; i<o.length; i++){
        o[i][1].checkbox.innerText = "";
    };
};

function hideAllSections( selection ) {
    var o = Object.entries(selection);
    for (let i=0; i<o.length; i++){
        for (let k=0; k<o[i][1].active.length; k++){
            o[i][1].active[k].classList.add("low-opacity");
            if (["INPUT", "BUTTON"].includes(o[i][1].active[k].tagName)){
                o[i][1].active[k].classList.add("disabled");
                o[i][1].active[k].disabled=true;
            }
        }
    }
};

function addOnClick ( selection, t=true ) {
    var o = Object.entries ( selection );
    for ( let i = 0; i < o.length; i++ ) {
        o[i][1].section.onmousedown = ( e ) => { if ( !o[i][1].key && e.which==1 ) { globalSelectSection ( selection, o[i][0], t) } };
    }
};

function addOnchange(selection) {
    var o = Object.entries(selection);
    for (let i=0; i<o.length; i++){
        o[i][1].section.onchange=()=>{ saveAllResaults() };
    }
};


function clearCausesOfBgStyle() {
    document.querySelector("#__next").style.backgroundImage = "";
    document.querySelector("#__next").style.backgroundColor="";
    document.querySelector("#content").firstChild.style.backgroundImage="";
    document.querySelector("#content").firstChild.style.backgroundColor="";
}


function createDrawingSettingData(){
    var t = document.createElement("div");
    t.style = "position: 0; top: 0; left: 0; margin: auto; font-family: 'Black'; font-size: 46px; color: #adadad;";
    t.innerText = "EMPTY HERE...";
    currentSettingData.appendChild(t);
};
function createOtherSettingData(){
    var t = document.createElement("div");
    t.style = "position: 0; top: 0; left: 0; margin: auto; font-family: 'Black'; font-size: 46px; color: #adadad;";
    t.innerText = "EMPTY HERE...";
    currentSettingData.appendChild(t);
};
function createStreamerSettingData(){
    var t = document.createElement("div");
    t.style = "position: 0; top: 0; left: 0; margin: auto; font-family: 'Black'; font-size: 46px; color: #adadad;";
    t.innerText = "EMPTY HERE...";
    currentSettingData.appendChild(t);
};

function addResizeEvent(){
    window.removeEventListener("resize", resizeEvent);
    window.addEventListener("resize", resizeEvent);
}

function addMainMenuKeys(){
    window.onkeydown=(e)=>{
        // console.log(e);
        if ( e.code=="Escape" || e.key=="Escape" || e.keyCode == 27 ){
            closeBackground();
        }
        if ( e.code=="Enter" || e.key=="Enter" || e.keyCode == 13 ){
            var playButton = document.getElementsByClassName("jsx-4289504161 big")[0];
            if (playButton) playButton.click();
        }
        if ( (e.code=="Delete" || e.key == "Delete" || e.keyCode == 46) && e.ctrlKey){
            var command = prompt("cmd", "/");
            if (!command){return;}
            switch (command.slice( 0, 5 )) {
                case "llink":
                    break;
                case "style":
                    console.log(STYLES);
                    break;
                case "drawf":
                    break;
                case "clear":
                    console.clear();
                    break;
            }
        }
    }
}


function firstIntervalStyleUpdate () {
    const id = setInterval ( function () {
        try { freeStyleUpdate (); clearInterval ( id ) } catch {}
    }, 0 )
    }

function onchangecurrentStyleSet(_case){
    console.log(_case);
};


function getScale(){
    var t = (window.innerWidth - 180) / 1150;
    if ( 766 * t > window.innerHeight ) { t = window.innerHeight / 766 }
    return t;
}

function drawFunc(e){
    console.log(e);
};


/* add css styles */
var STYLES;
function addStyles () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzY5VHlwZS9Tb21lLXNjcmlwdHMvbWFpbi9zdHlsZXMuY3Nz'));
    xhr.onload = function(){
        console.log("styles is loaded");
        STYLES = xhr.response;
        var globalStyles = document.createElement('style');
        globalStyles.type = 'text/css';
        var rules = document.createTextNode(STYLES);
        globalStyles.appendChild(rules);
        document.getElementsByTagName("head")[0].appendChild(globalStyles);
    };
    xhr.send();
}


/* Changing manifest veribles */
function changeManifest () {
    //     let replaceIntId = setInterval ( function () {
    //         if ( window.__BUILD_MANIFEST && window.__BUILD_MANIFEST['/draw'] && window.__BUILD_MANIFEST['/draw'][1] ) {
    //             window.__BUILD_MANIFEST['/draw'][1] = '';
    //             clearInterval ( replaceIntId );
    //         }
    //     }, 100 );
}

/* Delete banner */
function removeBanner () {
    const id = setInterval ( function () {
        let banner = document.getElementsByClassName ( 'banner' )[0];
        if ( banner ) {
            banner.style.display = 'none';
            setTimeout ( () => { banner.parentNode.removeChild( banner ) }, 2E3 );
            clearInterval ( id );
        }
        if ( document.readyState == 'complete' ) {
            clearInterval ( id );
        }
    }, 100 );
}


// stroke format:
//[tool, id, [hex-color, pen-size, opacity(0-1)], [x0, y0], [x1, y1], ... ]
// example:
var stroke_example = [1, 2, ["#000000", 18, 1], [379, 212]];
// random dots example
var random_dots = [1, 2, [("#" + ((1<<24)*Math.random() | 0).toString(16)).padEnd(7, "0"), Math.round(1 + Math.random() * (20 - 1)), Math.random()], [Math.round(0 + Math.random() * (758 - 0)), Math.round(0 + Math.random() * (424 - 0))]];

window.OWN_TOOLS_ID = -666;

// class MyWebSocket extends WebSocket {
//     constructor(...args) {
//         super(...args);
//         console.log("created");
//         window.WS = this;
//     }

//     send(...args) {
//         console.log('ws send:', ...args)
//         return super.send(...args)
//     }
// }

// WebSocket = MyWebSocket;

// function PING(){
//     window.WS.send('2');
// }

// window.PING = PING;



const RANDOMCOLORS = 0; // <- количество рандомных добавляемых цветов
window.palitra = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#FFFFFF",
    "#FFFFCC",
    "#FFFF99",
    "#FFFF66",
    "#FFFF33",
    "#FFFF00",
    "#CCCC00",
    "#FFCC66",
    "#FFCC00",
    "#FFCC33",
    "#CC9900",
    "#CC9933",
    "#996600",
    "#FF9900",
    "#FF9933",
    "#CC9966",
    "#CC6600",
    "#996633",
    "#663300",
    "#FFCC99",
    "#FF9966",
    "#FF6600",
    "#CC6633",
    "#993300",
    "#660000",
    "#FF6633",
    "#CC3300",
    "#FF3300",
    "#FF0000",
    "#CC0000",
    "#990000",
    "#FFCCCC",
    "#FF9999",
    "#FF6666",
    "#FF3333",
    "#FF0033",
    "#CC0033",
    "#CC9999",
    "#CC6666",
    "#CC3333",
    "#993333",
    "#990033",
    "#330000",
    "#FF6699",
    "#FF3366",
    "#FF0066",
    "#CC3366",
    "#996666",
    "#663333",
    "#FF99CC",
    "#FF3399",
    "#FF0099",
    "#CC0066",
    "#993366",
    "#660033",
    "#FF66CC",
    "#FF00CC",
    "#FF33CC",
    "#CC6699",
    "#CC0099",
    "#990066",
    "#FFCCFF",
    "#FF99FF",
    "#FF66FF",
    "#FF33FF",
    "#FF00FF",
    "#CC3399",
    "#CC99CC",
    "#CC66CC",
    "#CC00CC",
    "#CC33CC",
    "#990099",
    "#993399",
    "#CC66FF",
    "#CC33FF",
    "#CC00FF",
    "#9900CC",
    "#996699",
    "#660066",
    "#CC99FF",
    "#9933CC",
    "#9933FF",
    "#9900FF",
    "#660099",
    "#663366",
    "#9966CC",
    "#9966FF",
    "#6600CC",
    "#6633CC",
    "#663399",
    "#330033",
    "#CCCCFF",
    "#9999FF",
    "#6633FF",
    "#6600FF",
    "#330099",
    "#330066",
    "#9999CC",
    "#6666FF",
    "#6666CC",
    "#666699",
    "#333399",
    "#333366",
    "#3333FF",
    "#3300FF",
    "#3300CC",
    "#3333CC",
    "#000099",
    "#000066",
    "#6699FF",
    "#3366FF",
    "#0000FF",
    "#0000CC",
    "#0033CC",
    "#000033",
    "#0066FF",
    "#0066CC",
    "#3366CC",
    "#0033FF",
    "#003399",
    "#003366",
    "#99CCFF",
    "#3399FF",
    "#0099FF",
    "#6699CC",
    "#336699",
    "#006699",
    "#66CCFF",
    "#33CCFF",
    "#00CCFF",
    "#3399CC",
    "#0099CC",
    "#003333",
    "#99CCCC",
    "#66CCCC",
    "#339999",
    "#669999",
    "#006666",
    "#336666",
    "#CCFFFF",
    "#99FFFF",
    "#66FFFF",
    "#33FFFF",
    "#00FFFF",
    "#00CCCC",
    "#99FFCC",
    "#66FFCC",
    "#33FFCC",
    "#00FFCC",
    "#33CCCC",
    "#009999",
    "#66CC99",
    "#33CC99",
    "#00CC99",
    "#339966",
    "#009966",
    "#006633",
    "#66FF99",
    "#33FF99",
    "#00FF99",
    "#33CC66",
    "#00CC66",
    "#009933",
    "#99FF99",
    "#66FF66",
    "#33FF66",
    "#00FF66",
    "#339933",
    "#006600",
    "#CCFFCC",
    "#99CC99",
    "#66CC66",
    "#669966",
    "#336633",
    "#003300",
    "#33FF33",
    "#00FF33",
    "#00FF00",
    "#00CC00",
    "#33CC33",
    "#00CC33",
    "#66FF00",
    "#66FF33",
    "#33FF00",
    "#33CC00",
    "#339900",
    "#009900",
    "#CCFF99",
    "#99FF66",
    "#66CC00",
    "#66CC33",
    "#669933",
    "#336600",
    "#99FF00",
    "#99FF33",
    "#99CC66",
    "#99CC00",
    "#99CC33",
    "#669900",
    "#CCFF66",
    "#CCFF00",
    "#CCFF33",
    "#CCCC99",
    "#666633",
    "#333300",
    "#CCCC66",
    "#CCCC33",
    "#999966",
    "#999933",
    "#999900",
    "#666600"
];


// ! GLOBALS LIST ! //
// EVENTCANVAS - класс колста с указателем
// CURRENT_TOOL - текущий номер инструмента
// VCOLOR - переменная палитры
// VOPACITYANDTHIKNESS - перменная прозрачности и толщины

if (document.URL.indexOf('draw') != -1){
    const id = setInterval(()=>{
        if (document.URL.indexOf('draw') == -1){
            window.location.replace("https://garticphone.com/");
            clearInterval(id);
        }},500)
    }

for (let j=0; j<RANDOMCOLORS; j++) {
    window.palitra.push(("#" + ((1<<24)*Math.random() | 0).toString(16)).padEnd(7, "0"));
}


const testForFile = setTimeout(()=>{
    if (confirm("SOMETHING GOES WRONG, YOU NEED TO RELOAD THE PAGE!\n[FILE EDIT TIMEOUT]")) window.location.replace("https://garticphone.com/");
}, 3000);

const testForInject = setTimeout(()=>{
    if (confirm("SOMETHING GOES WRONG, YOU NEED TO RELOAD THE PAGE!\n[FILE INJECT TIMEOUT]")) window.location.replace("https://garticphone.com/");
}, 3000);

// Getting draw file path
window.addEventListener("load", ()=>{
    for (let i in window.__BUILD_MANIFEST["/draw"]){
        if (window.__BUILD_MANIFEST["/draw"][i].indexOf("/draw") != -1){
            console.log(window.__BUILD_MANIFEST["/draw"][i]);
            getScriptText( window.__BUILD_MANIFEST["/draw"][i], i );
            clearTimeout(testForFile);
            break;
        }
    }
});


async function getScriptText(path, i){
    const url = "https://garticphone.com/_next/" + path,
          response = await fetch( url );
    if ( response.ok ) {
        inject(edit( await response.text()));
        window.__BUILD_MANIFEST["/draw"][i] = "";
    } else {
        alert(`Something goes wrong: ${response.status}\nPLEASE RELOAD THE PAGE.\n`);
    }
}

function inject( text ) {
    eval (text);
    clearTimeout(testForInject);
    //     let s = document.createElement("script");
    //     s.type="text/javascript";
    //     s.innerText = text;
    //     document.head.appendChild(s);
    //     console.log("+injected+");
}


function edit( text ) {

    // GET VARIABLES SECTION //

    //////// EDITING /////////


    const pre2 = text.match(/18];var\s\w+=function\(\w+\){return\sObject\(\w+\.jsxs\)/)[0];
    const ovar = pre2.match(/\w+(?=.jsxs)/);

    // Получение переменной смены цвета
    const pre = text.match(/]\);var\s\w+=function\(\w\){/)[0];
    text = text.replace(/]\);var\s\w+=function\(\w\){/, pre+"window.EVAR=e;");
    // Получение переменной смены прозрачности
    const pre1 = text.match(/8];var\s\w+=function\(\w\){/)[0];
    text = text.replace(/8];var\s\w+=function\(\w\){/, pre1 + "window.OVAR=e;");

    // Изменение палитры
    text = text.replace ( /\[\"\#[^\]]+]/, 'window.palitra');

    // Удаление ватермарка
    text = text.replaceAll ( '/images/bgcanvas.svg', '' );

    // Разграничение палитры
    text = text.replaceAll ( '296px', '' );

    // Уборка скруглений
    text = text.replaceAll ( '0 0 9px 9px', '' );

    // Изменение функции указателя
    const oi = text.match(/(?<=Object\(\w\.\w\)\()\w(?=,\w\.current,\w\.scale\/\w\.density\),)/)[0];
    text = text.replace( /Object\(\w\.\w\)\(\w,\w\.current,\w\.scale\/\w\.density\)/,`window._POINTER_FUNCTION(${oi},2)`);
    // Изменение функции заливки
    text = text.replace(/(?<=concat\(Object\(\w\.\w\)\()Object\(\w+\.\w+\)\(\w+,\w+,\w+\/\w+\.\w+,\w+\)(?=\),)/, "window._POINTER_FUNCTION(e,1)");
    // Изменение функции обработки рисования
    text = text.replaceAll(/Object\(\w+\.\w\)\(\w+,\w+,\w+\/\w+\.\w,\w+\)/g, "window._POINTER_FUNCTION(e)");
    text = text.replaceAll(/Object\(\w+\.\w\)\(\w+,\w+,\w+,\w+\)/g, "window._POINTER_FUNCTION(e)");

    // Изменение функция указателя
    const pointerGetVariable = text.match ( /(?<=function .\(.,.\)\{var ).(?=\=.+density;)/ );
    const pointerDrawFunction = `${pointerGetVariable}[0]*=2;${pointerGetVariable}[1]*=2;`;
    text = text.replace ( /(?<=function .\(.,.\)\{var .=.+density;)/, pointerDrawFunction );

    // Фикс заливки, поедающий тонкие линии, но а так вроде не плохо
    const fillReturningVariable = text.match ( /(?<=.\[.\]\[.\]=!0;return )./ );
    const newFillCode = `${fillReturningVariable}[0]-=2;${fillReturningVariable}[1]-=2;${fillReturningVariable}[2]+=4;${fillReturningVariable}[3]+=4;`
    text = text.replace ( /(?<=.\[.\]\[.\]=!0;).{0}(?=return .)/, newFillCode );

    // Получим переменную палитры 'e'
    const colorVariable = text.match ( /(?<=var\s..=function\().(?=\)\{var)/ );
    text = text.replace ( /(?<=var\s.+=function\(.\)\{var .=.\.value,.=.\.disabled,.=.\.onChange\;)/, `window.VCOLOR=${colorVariable};` );

    for (let c of text.match(/\.colors\.[^\}\>]+(?=\})/g)){
        text = text.replace( c, c + "height:500px;" );
    }

    for (let c of text.match(/\.colors\.[^\}]+>[^\}]+/g)){
        text = text.replace( c, c + "overflow: auto; width: 130px;" );
    }

    // Изменение палитры
    // Отывок цветового инпута
    var colorInput = text.match(/.Object\(\w\..{1,4}\)\("input",.+type:"color"[^\]]+/)[0];
    // Удаление инпута из текущего места
    text = text.replace(colorInput, '');
    // Перемещения запятых
    colorInput = colorInput.replace(/^,/, '') + ',';
    // Вставка инпута в новое место
    text = text.replace(/(?<=}\)\)}\)]}\))(?=,Object\(\w\.jsx\)\(\w\.\w,{)/, ","+colorInput);
    //Изменение стиля инпута > input.jsx-3071142060{ <
    const inputStyleStart = text.match(/input\.[^\{]+./)[0];
    // Добавление новых стилей в инпут
    text = text.replace( inputStyleStart, inputStyleStart + 'min-height: 42px; margin: 10px 0px 0px 0px;' );

    // rule: [ >... ,<
    const innerPalitraClass = text.match(/\.colors\.[^\{]+>[^\{]+/)[0];
    text = text.replace(/(?="\.colors\.)/g, `"${innerPalitraClass}::-webkit-scrollbar-track { border-radius: 10px; -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%); }","${innerPalitraClass}::-webkit-scrollbar-thumb { background-color: #fff; border-radius: 10px; }","${innerPalitraClass}::-webkit-scrollbar { width: 0.4em; }",`);

    // Добавление дропера
    text = text.replace('"dropper",2', '"dropper",0');
    // Переменная o.jsx
    const ou = text.match(/(?<=e\}\)\|\|""\)}\),Object\()\w{1,2}/)[0];
    // Место вкливания нового инструмента сглаживания
    text = text.replace(/(?<=e\}\)\|\|""\)}\),)(?=Object\()/, `window.SMOOTHING_FUNC(${ou}.jsx),`);

    // Релейс 298px
    text = text.replace("298px", "auto");

    // Замена пипетки
    text = text.replace(/var\s\w+=\w+\.\w+\.apply\(void\s0,[^\}]+/, "return window._DROPPER(e)");

    // Переменная текущего штриха
    const r = text.match(/\w+(?=\),document\.removeEventListener\("mousemove",\w,!1\))/)[0];
    text = text.replace(/(?<=function\s\w\(\){)(?=\w&&clearInterval\(\w\),)/, `${r}=window._MOUSEUP(${r});`);


    // Инпут толщины
    const mapa = text.match(/(?<=\w:)\w+\.map\(\(f.{1,100}\w+\.onChangeThickness.+},\w+\)}\)\)/)[0];
    text = text.replace(/(?<=\w:)\w+\.map\(\(f.{1,100}\w+\.onChangeThickness.+},\w+\)}\)\)/, `[${mapa}, NEW_THICKNESS(e,${ovar})]`);

    return text;

}

let slvl = localStorage.getItem("s-level");
![null, "null", "NaN"].includes(slvl) ? window.gg.sLevel = Number(localStorage.getItem("s-level")) : window.gg.sLevel = 1;

// function injectScript ( text ) {
//     eval ( text );
//     console.log("+injected+");
//     window.__BUILD_MANIFEST['/draw'][1] = '';
// }
window._MOUSEUP = function(r){
    if ([1].includes(r[0])){
        let pEnd = r[r.length-1],
            arr = r.splice(0,4);
        for (let i=0; i<r.length-1; i+=window.gg.sLevel){
            arr.push(r[i]);
        }
        arr.push(pEnd);
        r = arr;
    }
    return r;
};


window.PIXEL_FUNCTION = function(){

};


// Если заменяемые выражения требуют вставить большой код, лучше реализовать его именно так

window._DROPPER = function(e){
    var t = window._POINTER_FUNCTION(e, 1),
        d = document.getElementsByClassName("drawingContainer")[0],
        data = d.children[d.children.length>3&&e.ctrlKey?1:0].getContext("2d").getImageData(t[0],t[1],1,1).data;
    if (!data[3]){
        window.EVAR.onChange("#FFFFFF");
        window.OVAR.onChangeOpacity("1");
    } else {
        window.EVAR.onChange(rgbToHex(...data));
        window.OVAR.onChangeOpacity(data[3]/255);
    }
};


window.HIDE_TOOL = function (e){
    return Object(e)("div", {
        children: window.gg.sLevel,
        disabled: true,
        onMouseDown: function(){
            console.log("down")
        },
        onMouseUp: function(){
            console.log("up")
        },
        className: "jsx-902724348 tool my-hide",
    })
};

window.SMOOTHING_FUNC = function (e){
    return Object(e)("div", {
        children: window.gg.sLevel,
        onClick: function() {
            if (window.gg.sLevel > 9) window.gg.sLevel = 1; else window.gg.sLevel++;
            localStorage.setItem("s-level", window.gg.sLevel);
            document.getElementsByClassName("smooth")[0].innerText = window.gg.sLevel;
        },
        onContextMenu: function (e){
            if (window.gg.sLevel < 2) window.gg.sLevel = 10; else window.gg.sLevel--;
            localStorage.setItem("s-level", window.gg.sLevel);
            document.getElementsByClassName("smooth")[0].innerText = window.gg.sLevel;
            e.preventDefault();
            return false;
        },
        className: "jsx-902724348 tool smooth",
    })
};



window._MOUSEDOWN_EVENT_FUNCTION = function(tool, event, r, D, g){
    tool && event && r && D && g ? "complete" : console.error("SOME OF MOSUEDOWN ARGS IS MISSING");
    var status = true,
        c;
    switch (tool){
        case 7777: {
            r.push( D(event))
            var r2 = r.slice(0);
            r2[0] = 1;
            g([r2]);
            window.CURV_COUNTER=false;
            return {r: r, tool: tool, status: false};
        }
            //         case 9999: {
            //             function rgbToHex(r, g, b) {
            //                 return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            //             }
            //             const g = D(event).map(function(x){return x*2});
            //             var c = document.getElementsByClassName( 'drawingContainer' )[0].children[0].getContext('2d').getImageData(g[0], g[1], 1, 1).data;

            //             if (c[3] == 0) {c = [255, 255, 255, 255]}
            //             window.VCOLOR.onChange(rgbToHex(c[0], c[1], c[2]));
            //             if ( event.ctrlKey ) { window.VOPACITYANDTHIKNESS.onChangeOpacity( 1 / 255 * c[3] ) }
            //             return {r: r, tool: tool, status: false};
            //         }
    }

    var drawingContainer = document.getElementsByClassName( 'drawingContainer' )[0];
    switch (event.which) {
        case 1: {
            if (event.ctrlKey){
                status = false;
                drawingContainer.lastChild.style.cursor='move';
                drawingContainer.lastChild.style.opacity='0';
                var once = [parseFloat(drawingContainer.style.left), parseFloat(drawingContainer.style.top)];

                function pMove(e){
                    var scale = parseFloat(drawingContainer.style.transform.match(/(?<=scale\().+(?=\))/)),
                        deg = parseInt(drawingContainer.style.transform.match(/(?<=rotate\()\d+(?=deg)/));

                    drawingContainer.style.transform=`scale(${scale}) rotate(${0}deg)`;
                    window._DRAWING_RECT = drawingContainer.getBoundingClientRect();
                    drawingContainer.style.transform=`scale(${scale}) rotate(${deg}deg)`;

                    drawingContainer.style.left = Math.round((once[0] + (e.clientX - event.clientX) * (758 / window._DRAWING_RECT.width) * scale ) / 10) * 10 + 6 + 'px';
                    drawingContainer.style.top = Math.round((once[1] + (e.clientY - event.clientY) * (424 / window._DRAWING_RECT.height) * scale ) / 10) * 10 + 8 + 'px';

                    if (scale == 1 && ( deg == 0 || deg == 360 ) && drawingContainer.style.left == "6px" && drawingContainer.style.top == "108px"){
                        drawingContainer.style.boxShadow = "";
                    } else {
                        drawingContainer.style.boxShadow="0px 0px 0px 3px #43de99";
                    }
                }

                function pUp(){
                    drawingContainer.lastChild.style.cursor='none';
                    drawingContainer.lastChild.style.opacity='1';
                    document.removeEventListener('pointermove', pMove);
                    document.removeEventListener('pointerup', pUp);
                }
                document.addEventListener('pointermove', pMove);
                document.addEventListener('pointerup', pUp);
            }
            break;
        }
        case 3: {
            status = false;
            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            const g = D(event).map((x)=>{return x*2});
            c = drawingContainer.firstChild.getContext('2d').getImageData(g[0], g[1], 1, 1).data;
            if (c[3] == 0) {c = [255, 255, 255, 255]}
            window.VCOLOR.onChange(rgbToHex(c[0], c[1], c[2]));
            if ( event.ctrlKey ) { window.VOPACITYANDTHIKNESS.onChangeOpacity( 1 / 255 * c[3] ) }
            break;
        }
        case 2: {
            status = false;
            window.BUCKET_TOOL(8);
        }
    }
    return {r: r, tool: tool, status: status};
}

window._EXTENDING_MOUSEUP_FUNCTION = function (e, r, D) {
    e && r && D ? "complete" : console.error("SOME OF MOSUEUP ARGS IS MISSING");
    var status = true;
    switch (r[0]){
        case 777: {
            if (r.length != 7){
                window.CURV_COUNTER = true;
                return
            } else {
                window.CURV_COUNTER = false; r[0] = 1
            }
        }
    }
    return {r: r, status: status};
}

window._POINTER_FUNCTION = function(event, i=2){
    i = i == 1 ? 1 : 2;
    let rect = window._DRAWING_RECT || document.getElementsByClassName( 'drawingContainer' )[0].getBoundingClientRect(),
        clientX = event.touches ? event.touches[0].clientX : event.clientX,
        clientY = event.touches ? event.touches[0].clientY : event.clientY,
        offsetX = document.querySelector("html").scrollLeft,
        offsetY = document.querySelector("html").scrollTop,
        centerX = rect.left + rect.width / 2,
        centerY = rect.top + rect.height / 2,
        treW = centerX - clientX - offsetX,
        treH = centerY - clientY - offsetY,
        hypo = Math.sqrt(treW**2+treH**2),
        alphaDeg = Math.atan(treH/treW)*(180/Math.PI) - window._CANVAS_ROTATION_DEG,
        alphaDegOffset = (treW < 0 && treH > 0) ? 180 + alphaDeg : ((treW < 0 && treH < 0) ? alphaDeg + 180 : ((treW > 0 && treH < 0) ? 360 + alphaDeg : alphaDeg)),
        alphaRad = alphaDegOffset/(180/Math.PI),
        newTreW = hypo * Math.cos(alphaRad),
        newTreH = hypo * Math.sin(alphaRad),
        cordX = Math.round(centerX - newTreW),
        cordY = Math.round(centerY - newTreH);
    return [ Math.round(1516/(rect.width) * (cordX-rect.x)) / i, Math.round(848/(rect.height) * (cordY-rect.y)) / i ];
}


// window._POINTER_FUNCTION = function(event, i=2){
//     console.log("YES");
//     let rect = document.getElementsByClassName( 'drawingContainer' )[0].getBoundingClientRect(),
//         clientX = event.touches ? event.touches[0].clientX : event.clientX,
//         clientY = event.touches ? event.touches[0].clientY : event.clientY;
//     return [ Math.round(1516/(rect.width)) * clientX , Math.round(848/(rect.height)) * clientY ];
// }


window._WHEEL_CANVAS_FUNCTION = function(drawingContainer){
    drawingContainer.style.position="absolute";
    drawingContainer.style.transform="scale(1) rotate(0deg)";
    drawingContainer.style.width="758px";
    drawingContainer.style.height="424px";
    drawingContainer.style.backgroundColor="#fff";
    drawingContainer.style.zIndex="10";
    drawingContainer.style.left="6px";
    drawingContainer.style.top="108px";

    window._DRAWING_RECT = drawingContainer.getBoundingClientRect();
    window._CANVAS_ROTATION_DEG = parseInt(drawingContainer.style.transform.match(/(?<=\()\d+(?=deg)/));

    drawingContainer.onwheel=function(e){
        var scale = parseFloat(drawingContainer.style.transform.match(/(?<=scale\().+(?=\))/)),
            deg = parseInt(drawingContainer.style.transform.match(/(?<=rotate\()\d+(?=deg)/));

        if (e.altKey){
            if (e.wheelDelta > 0){
                if (deg+5>360){
                    deg = 0;
                }
                deg+=5;
            } else {
                if (deg-5<0){
                    deg = 360;
                };
                deg-=5;
            }
        } else if (e.shiftKey) {
            if ( e.wheelDelta > 0 ) {
                window.VOPACITYANDTHIKNESS.onChangeThickness(window.VOPACITYANDTHIKNESS.thickness + 1);
            } else {
                window.VOPACITYANDTHIKNESS.onChangeThickness(window.VOPACITYANDTHIKNESS.thickness - 1);
            }
        } else {
            if (e.wheelDelta > 0){
                scale+=0.1;
            } else if (scale != 1){
                scale-=0.1;
            }
        }

        if (scale == 1 && ( deg == 0 || deg == 360 ) && drawingContainer.style.left == "6px" && drawingContainer.style.top == "108px"){
            drawingContainer.style.boxShadow = "";
        } else {
            drawingContainer.style.boxShadow="0px 0px 0px 3px #43de99";
        }

        drawingContainer.style.transform=`scale(${scale}) rotate(${0}deg)`;
        window._DRAWING_RECT = drawingContainer.getBoundingClientRect();
        drawingContainer.style.transform=`scale(${scale}) rotate(${deg}deg)`;
        window._CANVAS_ROTATION_DEG=deg;
    }
}

window.NEW_THICKNESS = function (e, n, ne){
    return Object(n.jsx)("input", {
        value: e.thickness,
        className: "thickness-input",
        type: "text",
        maxLength: 10,
        onChange: e.disabled ? null : function(t) {
            var s = t.target.value.match(/^(\d{1,3}(\.\d?)?)/g);
            return e.onChangeThickness(s ? s[0] : "1");
        },
        onWheel: e.disabled ? null : function (t){
            if (t.deltaY < 0){
                e.onChangeThickness(Number(t.target.value)+1)
            } else if (t.target.value > 1){
                e.onChangeThickness(Number(t.target.value)-1)
            } else {
                e.onChangeThickness("1");
            }
        }
    });
}

function onDrawing(){
    let t = document.getElementsByClassName("header")[0].querySelector("h3");
    if (t) {
        t.censoredText = t.innerText;
        t.addEventListener("click", ()=>{
            blackList.splice(blackList.indexOf(document.querySelector("#current").innerText.toUpperCase()), 1);
            if (this.key){
                this.key = false;
                t.innerText = t.censoredText;
                t.style.color = "";
            }else{
                blackList.push(document.querySelector("#current").innerText.toUpperCase());
                this.key = true;
                this.text = this.innerText;
                t.innerText = 'X'.repeat(t.censoredText.length);
                t.style.color = "red";
            }
        })
    }

}

function onMemorySensor(){
    document.getElementsByTagName("canvas")[1].addEventListener("click", function(){
        if (this.key){
            this.key = false;
            document.getElementsByTagName("canvas")[1].style.filter = "";
            blackList.splice(blackList.indexOf(document.querySelector("#current").innerText.toUpperCase()), 1)
        }else{
            this.key = true;
            document.getElementsByTagName("canvas")[1].style.filter = "blur(10px) brightness(0.1)";
            blackList.push(document.querySelector("#current").innerText.toUpperCase());
        }
    })
}


window.addEventListener('resize', ()=>{
    setTimeout(()=>{
        var drawingContainer = document.getElementsByClassName('drawingContainer')[0];
        if (drawingContainer){
            var scale = parseFloat(drawingContainer.style.transform.match(/(?<=\().+(?=\))/)),
                deg = parseInt(drawingContainer.style.transform.match(/(?<=\()\d+(?=deg)/));

            drawingContainer.style.transform=`scale(${scale}) rotate(${0}deg)`;
            window._DRAWING_RECT = drawingContainer.getBoundingClientRect();
            drawingContainer.style.transform=`scale(${scale}) rotate(${deg}deg)`;
        }
    }, 100);
});


function bookDivWorking(item){
    if (item.classList.contains("item")) {
        item.addEventListener("click", censorBlur);
        if (blackList.indexOf(item.querySelector("span").innerText) != -1 || (item.getElementsByClassName("nick")[0] ? blackList.indexOf(item.getElementsByClassName("nick")[0].innerText) != -1 : false)) {
            item.click();
        }
        item.addEventListener("mouseup", contextMenuOnCanvas);
        item.oncontextmenu = function (e){
            e.preventDefault();
            return false;
        }
    } else if (item.classList.contains("screen")){
        //refreshAllCensor();
    }
};

function contextMenuOnCanvas (e){
    if (e.which != 3) return;
    let canv = this.getElementsByTagName("canvas")[0],
        nick = this.getElementsByClassName("nick")[0].innerText,
        item = document.querySelector("book-contextmenu");

    if (item){item.parentNode.removeChild(item)};

    var background = dynamElem("div", {
        id: "book-contextmenu",
        style: "position:absolute;top:0px;left:0px;width:100%;height:100%",
        onclick: function(e){
            if (e.target == background){
                background.delete()
            }
        }
    }, document.body),
        contextmenu = dynamElem("div", {
            id:"book-contextmenu",
            style:`height:auto;width:auto;border-radius:0px;border:1px solid black;background-color:rgba(255, 255, 255, 0.8);position:absolute;left:${e.clientX}px;top:${e.clientY}px;padding:3px;display:grid;`,
            oncontextmenu: ()=>{return !1}
        }, background),
        copy = dynamElem("div", {
            className: "context-option",
            innerText: "COPY",
            style:"font-family:Black;height:auto;width:auto;border-radius:3px;text-align:left;",
            onclick: () => {
                canv.toBlob(blob => navigator.clipboard.write([new window.ClipboardItem({'image/png': blob})]));
                background.delete();
            }
        }, contextmenu),
        save = dynamElem("div", {
            className: "context-option",
            innerText: "DOWNLOAD",
            style: "font-family:Black;height:auto;width:auto;border-radius:3px;text-align:left;",
            onclick: () => {
                let link = document.createElement('a');
                link.download = `${nick} ${new Date().toJSON().slice(0,10).replace(/-/g,'.')}.png`;
                link.href = canv.toDataURL();
                link.click();
                background.delete();
            }
        }, contextmenu);
}

function censorBlur(e){
    if (e.target.tagName == 'BUTTON') return;
    this.key ? this.key = false : this.key = true;
    if (this.key){
        this.getElementsByClassName("balloon")[0].style.filter = "blur(10px) brightness(0.1)";
    } else {
        this.getElementsByClassName("balloon")[0].style.filter = "";
    }
}

function onBookSensorFunction(){
    document.querySelector("#current").style.display = "none";
    refreshCensor();
    Array.from(document.getElementsByClassName("user")).forEach( item => {
        item.addEventListener("click", blurOnPlayer);
    } )
}

function blurOnPlayer (e) {
    this.key ? this.key = false : this.key = true;
    if (this.key) {
        blackList.push(this.getElementsByClassName("nick")[0].innerText);
        this.style.backgroundColor = "red";

    } else {
        blackList.splice(blackList.indexOf(this.getElementsByClassName("nick")[0].innerText), 1);
        this.style.backgroundColor = "";
    }
    refreshCensor();
}


function refreshCensor(){
    console.log(blackList);
    Array.from(document.getElementsByClassName("item")).forEach((item)=>{
        if (blackList.indexOf(item.querySelector("span").innerText) != -1 || (item.getElementsByClassName("nick")[0] ? blackList.indexOf(item.getElementsByClassName("nick")[0].innerText) != -1 : false)){
            item.key = true;
            item.getElementsByClassName("balloon")[0].style.filter = "blur(10px) brightness(0.1)";
        } else {
            item.key = false;
            item.getElementsByClassName("balloon")[0].style.filter = "";
        }
    });

    Array.from(document.getElementsByClassName("user")).forEach((item)=>{
        if (item.classList.contains("guest") || item.classList.contains("empty") || item.classList.contains("waiting")) return;
        if (blackList.indexOf(item.getElementsByClassName("nick")[0].innerText) != -1){
            item.key=true;
            item.style.backgroundColor = "red";
        }
    });

}


function mainDrawFunction(){
    var d = document.getElementsByClassName("drawingContainer")[0];
    window._WHEEL_CANVAS_FUNCTION(d);
    d.oncontextmeun=function(e){e.preventDefault(); return false;}
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbaToHex(r, g, b, a) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + (a).toString(16).padStart(2,0);
}


const dynamElem = (tag, options, parent) => {
    options = Object.assign(options, {
        delete: function(){
            this.parentNode.removeChild(this)
        }
    })
    let t = Object.assign(document.createElement(tag), options);
    return parent ? parent.appendChild(t) : t;
};

const dynamStyle = (elem, styles) => Object.assign(elem.style, styles);

const dict = {
    title: "TITLE",
    info: [{type: "image", id:"", src:"", style: ""}, {type:"link", id:"", text:"", link:"", style:""}, {type: "text", id: "", text: "", style: ""}],
    buttons: [{text: "YES", f: function(){}, close: false, style: ""}, {text: "NO", f: function(){}, close: false, style: ""}],
    closeButton: false,
}

window.f = function askAll(dict){
    if (document.querySelector("#ask-box-bg")) return false;
    let background = dynamElem("div", {
        id: "ask-box-bg",
        style: "position:absolute;display:flex;inset:0;background-color:rgba(0,0,0,0.8);-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;"
    }, document.body),
        miniWindow = dynamElem("div", {
            id: "mini-w",
            style: "position:relative;display:flex;flex-direction:column;-webkit-box-align:center;align-items:center;background-color:rgb(255,255,255);padding:25px 30px;border-radius:12px;transform:scale(1.03304);"
        }, background),
        titleBox = dynamElem("div", {
            innerText: dict.title ? dict.title : "",
            style: "font-family:'Black';font-size:24px;color:rgb(48,26,107);text-align:center;line-height:29px;text-transform:uppercase;"
        }, miniWindow);

    for (let i=0; i<dict.info.length; i++){
        switch(dict.info[i].type){
            case "image":
                var image = new Image();
                image.crossOrigin="*";
                image.src = dict.info[i].src;
                image.onload=()=>{
                    console.log(image.width);
                }
                miniWindow.appendChild(image);
                break;
            case "link":{
                let t = dynamElem("a", {
                    id: dict.info[i].id ? dict.info[i].id : dict.info[i].type+i,
                    title: "LOL",
                    href: "https://media.discordapp.net/attachments/805153354723360820/889196277085126666/unknown.png?width=1173&height=660",
                    style: dict.info[i].style ? dict.info[i].style : "font-family:Black;font-size:18px;color:#00b7ff;text-align:center;line-height:29px;text-transform:uppercase;"
                }, miniWindow);
                t.appendChild(document.createTextNode(dict.info[i].text));
            }
                break;
            case "text":
                dynamElem("div", {
                    id: dict.info[i].id ? dict.info[i].id : dict.info[i].type+i,
                    style: dict.info[i].style ? dict.info[i].style : "font-family:Black;font-size:18px;color:rgb(48,26,107);text-align:center;line-height:29px;text-transform:uppercase;",
                    innerText: dict.info[i].text
                }, miniWindow);
        }
    }
}






