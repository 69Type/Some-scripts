
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// !                                                                                                                            ! //
// ! Note                                                                                                                       ! //
// ! This is my first JS script. When I started I didn't know anything about this language at all.                              ! //
// ! So if someone comes here who understands something about this, then do not be surprised by such a terrible code :)         ! //
// !                                                                                                                            ! //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VERSION = "2.9.0.2";


const UNDO = "tool undo";
const REDO = "tool redo";
const TOOL = "jsx-902724348";
const UDC = "core";
const TBAR = "jsx-902724348";
const UPPER = "header";
const CORE = "core";
const DCANV = "jsx-1116305971";
const CCANV = "";
const PCANV = "jsx-187140558";
const MINP = "jsx-46098086";
const SLL = "scrollElements";
const NICK = "nick";
const PALIT = "jsx-2181691688";
const COLOR = "jsx-2181691688 color"

function Q(s){
    return document.getElementsByClassName(s);
}

alert("Мод заморожен на неопределенный срок.\nОбратная связь: t.me\\DoctorDeathDDracula");
document.isTrusted = false;

// var s1 = document.createElement("script");
// s1.async = !0;
// var xhr2 = new XMLHttpRequest();
// xhr2.open('GET', 'https://raw.githubusercontent.com/69Type/Some-scripts/main/drawfunc.js');
// xhr2.onload = function(){
//     console.log("draw is loaded");
//     s1.text=xhr2.response;
// }
// xhr2.send();
// document.querySelector("body").appendChild(s1);

( function changeManifest () {
    let replaceIntId = setInterval ( function () {
        if ( window.__BUILD_MANIFEST?.['/draw']?.[2] && window.__BUILD_MANIFEST?.['/draw']?.[2] != '' ) {
            getScriptText ( window.__BUILD_MANIFEST['/draw'][2] );
            window.__BUILD_MANIFEST['/draw'][2] = '';
       }
    }, 0 );
} ) ();

function getScriptText ( inputPath ) {
    var scriptPath = 'https://garticphone.com/_next/' + inputPath;
    console.log ( scriptPath );
    var scriptText = '';
    var xhr = new XMLHttpRequest();
    xhr.onload = function () { drawAutoEdit ( xhr.response ) };
    xhr.onerror = e => { console.log ( e ) };
    xhr.open ( "GET", scriptPath, true ) ;
    xhr.send ();
}

function drawAutoEdit ( text ) {
    // Изменение палитры
    text = text.replace ( /\[\"\#[^\]]+\]/, '["#000000", "#FFFFFF", "#FF0000"]');

    // Удаление ватермарка
    text = text.replaceAll ( '/images/bgcanvas.svg', '' );

    // Изменение функции обработки рисования
    //const eventVarible = text.match ( /(?<=function\s.\().(?=,.,.\)\{var\s.=[^\}]*\})/ );
    //const pointerEventsHandler =
//           `var event = ${eventVarible},` +
//           `d = arguments[4] ? 1 : 2,` +
//           `z = document.getElementsByClassName( window.EVENTCANVAS )[0].getBoundingClientRect();` +
//           `if (${eventVarible}.touches) { event = ${eventVarible}.touches[0] }`+
//           `return [Math.round(1516/z.width * (event.clientX-z.x) / d), Math.round(848/z.height * (event.clientY-z.y) / d)];`;
    //text = text.replace ( /(?<=function\s.\(.,.,.\)\{)var\s.=[^\}]*(?=\})/, pointerEventsHandler );

    // Изменение функция указателя
    //const pointerGetVarible = text.match ( /(?<=function .\(.,.\)\{var ).(?=\=.+density;)/ );
    //const pointerDrawFunction = `${pointerGetVarible}[0]*=2;${pointerGetVarible}[1]*=2;`;
    //text = text.replace ( /(?<=function .\(.,.\)\{var .=.+density;)/, pointerDrawFunction );

    // Изменение функции заливки
    //const fillDrawHandlerCall = `(()=>{ var cords = D(e, n, a / R.f, s); cords[0]*=2; cords[1]*=2; return cords })()`
    //text = text.replace ( /.\(.,.,.\/.\..,.\)/, fillDrawHandlerCall );

    // Фикс заливки, поедающий тонкие линии, но а так вроде ничего
    const fillReturningVerible = text.match ( /(?<=.\[.\]\[.\]=!0;return )./ );
    const newFillCode = `${fillReturningVerible}[0]-=2;${fillReturningVerible}[1]-=2;${fillReturningVerible}[2]+=4;${fillReturningVerible}[3]+=4;`
    text = text.replace ( /(?<=.\[.\]\[.\]=!0;).{0}(?=return .)/, newFillCode );

    // GET VERIBLES SECTION //
    // Класс евентовго холста
    const dinamicEventCanvasClass = text.match( /(?<=className:).\..\.dynamic[^\]]+\]\]\]\)(?=\})/ );
    const makeEventCanvasClassGlobal = `( function () { var canvasClass = ${dinamicEventCanvasClass}; window.EVENTCANVAS = canvasClass; return canvasClass } ) ()`;
    text = text.replace ( /(?<=className:).\..\.dynamic[^\]]+\]\]\]\)(?=\})/, makeEventCanvasClassGlobal );

//     console.log(text);
//     //e
//     const e = text.match ( /(?<=18\]\;var\s\w\w\=function\().(?=\)\{return)/ )[0];
//     //ne
//     const ne = text.match(/..(?=\(\)\(\"options\"\,\{disabled\:.\.disabled,)/)[0];
//     //n
//     const n = text.match(/(?<=18\]\;var\s..\=function\(.\)\{return\sObject\()./)[0];
//     // Новая толщина кисти
//     text = text.replace(/(?<=\,children\:)..\.map.+\|\|\"\"\)\}\,.\)\}\)\)/, `window.NEW_THICKNESS(${e},${n},${ne})`);
//     // Стиль инпута
//     text = text.replace (/(?<=\[)(?="\.options\.)/, `".thickness-input {width: 50px;margin: 0px 0px 0px 10px;appearance: none;outline: none;border: none;border-radius: 5px;font-size: 20px;font-family: 'Black';color: #301A6B;text-align: center;}",`);
//     //text = text.
    runScript ( text );
}

window.NEW_THICKNESS = function (e, n, ne){
    return [[2, 6, 10, 14, 18].map((function(t) {
        return Object(n.jsx)("div", {
            onClick: e.disabled ? null : function() {
                return e.onChangeThickness(t)
            },
            className: "jsx-340028725 " + (ne()("thickness", {
                sel: e.thickness == t
            }) || "")
        }, t)
    })), Object(n.jsx)("input", {
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
                e.onChangeThickness("1")
            }
        }
    })]
}

function runScript ( text ) {
    eval (text);
}

//////////////////////////////////////////////////////style///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var cssAnimation = document.createElement('style');
cssAnimation.type = 'text/css';
var rules = document.createTextNode('@keyframes rainbow {'+
                                    '100%, 0% { color: rgb(255, 0, 0); opacity: 1;}'+
                                    '8% { color: rgb(255, 127, 0);}'+
                                    '16% { color: rgb(255, 255, 0);}'+
                                    '25% { color: rgb(127, 255, 0);}'+
                                    '33% { color: rgb(0, 255, 0);}'+
                                    '41% { color: rgb(0, 255, 127);}'+
                                    '50% { color: rgb(0, 255, 255);}'+
                                    '58% { color: rgb(0, 127, 255);}'+
                                    '66% { color: rgb(0, 0, 255);}'+
                                    '75% { color: rgb(127, 0, 255);}'+
                                    '83% { color: rgb(255, 0, 255);}'+
                                    '91% { color: rgb(255, 0, 127);}'
                                    +'}');
cssAnimation.appendChild(rules);
document.getElementsByTagName("head")[0].appendChild(cssAnimation);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// var font1 = document.createElement('style');
// font1.classList.add("font1");
// font1.type='text/css';
// var rule = document.createTextNode(
//     "@font-face {font-family: 'Majestic';" +
//     "src: url(https://cdn.discordapp.com/attachments/866074580853719061/866121147383545856/EternalUiRegular-1Gap2.ttf);"+
//     +"}"
// );
// font1.appendChild(rule);
// document.getElementsByTagName("head")[0].appendChild(font1);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
var cssPlaceHolder = document.createElement('style');
cssAnimation.type = 'text/css';
var rules1 = document.createTextNode("input::placeholder { color: rgba(255, 255, 255, 0.8); opacity: 1;} ");
cssPlaceHolder.appendChild(rules1);
document.getElementsByTagName("head")[0].appendChild(cssPlaceHolder);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange2 = document.createElement('style');
styleInputRange2.type = 'text/css';
var rules2 = document.createTextNode('input[type="range"]{width: 100%;}');
styleInputRange2.appendChild(rules2);
//document.getElementsByTagName("head")[0].appendChild(styleInputRange2);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange3 = document.createElement('style');
styleInputRange3.type = 'text/css';
var rules3 = document.createTextNode('input[type=range]{-webkit-appearance: none;border-color: rgba(0,0,0,0);}');
styleInputRange3.appendChild(rules3);
document.getElementsByTagName("head")[0].appendChild(styleInputRange3);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange4 = document.createElement('style');
styleInputRange4.type = 'text/css';
var rules4 = document.createTextNode('input[type=range]::-webkit-slider-runnable-track {cursor: pointer; height: .65em; background: rgb(80, 22, 58); border: none; border-radius: 5px;border-color: rgba(0,0,0,0);}');
styleInputRange4.appendChild(rules4);
document.getElementsByTagName("head")[0].appendChild(styleInputRange4);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange5 = document.createElement('style');
styleInputRange5.type = 'text/css';
var rules5 = document.createTextNode('input[type=range]::-webkit-slider-thumb {cursor: pointer; appearance: none; -webkit-appearance: none; border: none; height: 1.4em; width: 1.4em; border-radius: 50px; background: rgba(225, 109, 143, 1); margin-top: -4px; outline: none; border-color: rgba(0,0,0,0);}');
styleInputRange5.appendChild(rules5);
document.getElementsByTagName("head")[0].appendChild(styleInputRange5);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange6 = document.createElement('style');
styleInputRange6.type = 'text/css';
var rules6 = document.createTextNode('input[type=range]:focus { outline: none; background: rgba(248, 168, 191, 1);border-color: rgba(0,0,0,0);}');
styleInputRange6.appendChild(rules6);
document.getElementsByTagName("head")[0].appendChild(styleInputRange6);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange7 = document.createElement('style');
styleInputRange7.type = 'text/css';
var rules7 = document.createTextNode('input[type="color"]::-webkit-color-swatch {border: none;}');
styleInputRange7.appendChild(rules7);
document.getElementsByTagName("head")[0].appendChild(styleInputRange7);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange8 = document.createElement('style');
styleInputRange8.type = 'text/css';
var rules8 = document.createTextNode(
    '.newtoolz {display: flex;'+
    'justify-content: center;'+
    'position: relative;'+
    'cursor: pointer;'+
    'width: 50px;'+
    'height: 54px;'+
    'border: 2px solid rgba(255, 142, 175, 0.6);'+
    'border-radius: 5px;'+
    'color: rgba(255, 142, 175, 0.6);'+
    'font-family: Black;'+
    'background-color: rgba(100, 100, 100, 0.1);}'
);
styleInputRange7.appendChild(rules8);
document.getElementsByTagName("head")[0].appendChild(styleInputRange8);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange9 = document.createElement('style');
styleInputRange9.type = 'text/css';
var rules9 = document.createTextNode('.newtoolz:hover {background-color: rgba(255, 255, 255, 0.1); color: rgba(255, 140, 175, 1);}');
styleInputRange9.appendChild(rules9);
document.getElementsByTagName("head")[0].appendChild(styleInputRange9);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange10 = document.createElement('style');
styleInputRange10.type = 'text/css';
var rules10 = document.createTextNode('.newtoolz:active {background-color: rgba(255, 255, 255, 0.4); color: rgba(255, 255, 255, 1);}');
styleInputRange10.appendChild(rules10);
document.getElementsByTagName("head")[0].appendChild(styleInputRange10);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange11 = document.createElement('style');
styleInputRange11.type = 'text/css';
var rules11 = document.createTextNode('.newtoolz.act {background-color: rgba(255, 255, 255, 0.4); color: rgba(255, 255, 255, 1);}');
styleInputRange11.appendChild(rules11);
document.getElementsByTagName("head")[0].appendChild(styleInputRange11);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Стиль лупы
var styleInputRange12 = document.createElement('style');
styleInputRange12.type = 'text/css';
var rules12 = document.createTextNode(".loopa.jsx-4206980828::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/830443858378096680/loopa_edit.svg'); background-size: 45px 45px; height: 45px; width: 45px;}");
styleInputRange12.appendChild(rules12);
document.getElementsByTagName("head")[0].appendChild(styleInputRange12);
//Активация лупы
var styleInputRange15 = document.createElement('style');
styleInputRange15.type = 'text/css';
var rules15 = document.createTextNode(".loopa.jsx-4206980828:active::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/830453942731014194/loopa_edit.svg'); background-size: 45px 45px; height: 45px; width: 45px;}");
styleInputRange15.appendChild(rules15);
document.getElementsByTagName("head")[0].appendChild(styleInputRange15);
//Активированная лупа
var styleInputRange015 = document.createElement('style');
styleInputRange015.type = 'text/css';
var rules015 = document.createTextNode(".loopa.jsx-4206980828.act1::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/830453942731014194/loopa_edit.svg'); background-size: 45px 45px; height: 45px; width: 45px;}");
styleInputRange015.appendChild(rules015);
document.getElementsByTagName("head")[0].appendChild(styleInputRange015);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Стиль пипетки
var styleInputRange16 = document.createElement('style');
styleInputRange16.type = 'text/css';
var rules16 = document.createTextNode(".pipet.jsx-4206980828::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/830469620694646784/pipet.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange16.appendChild(rules16);
document.getElementsByTagName("head")[0].appendChild(styleInputRange16);
//Активация пипетки
var styleInputRange17 = document.createElement('style');
styleInputRange17.type = 'text/css';
var rules17 = document.createTextNode(".pipet.jsx-4206980828:active::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/830476126261870652/pipet.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange17.appendChild(rules17);
document.getElementsByTagName("head")[0].appendChild(styleInputRange17);
//Активированная пипетка
var styleInputRange18 = document.createElement('style');
styleInputRange18.type = 'text/css';
var rules18 = document.createTextNode(".pipet.jsx-4206980828.act::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/830476126261870652/pipet.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange18.appendChild(rules18);
document.getElementsByTagName("head")[0].appendChild(styleInputRange18);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var styleInputRange13 = document.createElement('style');
styleInputRange13.type = 'text/css';
styleInputRange13.classList.add("imgChange");
var rules13 = document.createTextNode(".newdiv::before {content: ''; position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; z-index: -1; background: url() 0 0 no-repeat; -webkit-transform: rotate(30deg); -moz-transform: rotate(30deg); -ms-transform: rotate(30deg); -o-transform: rotate(30deg); transform: rotate(30deg); background-position: center; background-size: contain;}");
styleInputRange13.appendChild(rules13);
document.getElementsByTagName("head")[0].appendChild(styleInputRange13);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Стиль зеркала
var styleInputRange19 = document.createElement('style');
styleInputRange19.type = 'text/css';
var rules19 = document.createTextNode(".miror.jsx-4206980828::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/833347814704021564/miror.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange19.appendChild(rules19);
document.getElementsByTagName("head")[0].appendChild(styleInputRange19);
//Активация зеркала
var styleInputRange20 = document.createElement('style');
styleInputRange20.type = 'text/css';
var rules20 = document.createTextNode(".miror.jsx-4206980828:active::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/831638658050293827/miror.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange20.appendChild(rules20);
document.getElementsByTagName("head")[0].appendChild(styleInputRange20);
//Активированное зеркало
var styleInputRange21 = document.createElement('style');
styleInputRange21.type = 'text/css';
var rules21 = document.createTextNode(".miror.jsx-4206980828.act1::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/831638658050293827/miror.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange21.appendChild(rules21);
document.getElementsByTagName("head")[0].appendChild(styleInputRange21);
//Активный бэкграунд
var styleInputRange22 = document.createElement('style');
styleInputRange22.type = 'text/css';
var rules22 = document.createTextNode(".act1::before {content: ''; margin: 2px; flex: 1 1 0%; border-radius: 3px; align-self: stretch; animation: 2s linear 0s infinite normal none running pulsing}");
styleInputRange22.appendChild(rules22);
document.getElementsByTagName("head")[0].appendChild(styleInputRange22);

var cssAnimation1 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules0 = document.createTextNode("@keyframes pulsing {100%, 0% { background-color: rgba(255,255,255, 0.8); } 50% { background-color: rgba(255,255,155, 0.1); }}");
cssAnimation.appendChild(rules0);
document.getElementsByTagName("head")[0].appendChild(cssAnimation1);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Стиль сгдаживания
var styleInputRange019 = document.createElement('style');
styleInputRange019.type = 'text/css';
var rules019 = document.createTextNode(".smooth.jsx-4206980828::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/841308292033544222/gesture_black_24dp.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange019.appendChild(rules019);
document.getElementsByTagName("head")[0].appendChild(styleInputRange019);
//Активация сгдаживания
var styleInputRange020 = document.createElement('style');
styleInputRange020.type = 'text/css';
var rules020 = document.createTextNode(".smooth.jsx-4206980828:active::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/841310156754911282/gesture_black_24dp.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange020.appendChild(rules020);
document.getElementsByTagName("head")[0].appendChild(styleInputRange020);
//Активированное сгдаживание
var styleInputRange021 = document.createElement('style');
styleInputRange021.type = 'text/css';
var rules021 = document.createTextNode(".smooth.jsx-4206980828.act1::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/841310156754911282/gesture_black_24dp.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange021.appendChild(rules021);
document.getElementsByTagName("head")[0].appendChild(styleInputRange021);
//Активный бэкграунд сгдаживания
var styleInputRange022 = document.createElement('style');
styleInputRange022.type = 'text/css';
var rules022 = document.createTextNode(".act1::before {content: ''; margin: 2px; flex: 1 1 0%; border-radius: 3px; align-self: stretch; animation: 2s linear 0s infinite normal none running pulsing}");
styleInputRange022.appendChild(rules022);
document.getElementsByTagName("head")[0].appendChild(styleInputRange022);


//////////////////////////////////////////////////////////////////////////////////////////////////////////

//Стиль закрывания
var styleInputRange1019 = document.createElement('style');
styleInputRange1019.type = 'text/css';
var rules1019 = document.createTextNode(".clear.jsx-4206980828::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/841313973290926163/close_black_24dp.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange1019.appendChild(rules1019);
document.getElementsByTagName("head")[0].appendChild(styleInputRange1019);
//Активация сгдаживания
var styleInputRange1020 = document.createElement('style');
styleInputRange1020.type = 'text/css';
var rules1020 = document.createTextNode(".clear.jsx-4206980828:active::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/841315545923190784/close_black_24dp.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange1020.appendChild(rules1020);
document.getElementsByTagName("head")[0].appendChild(styleInputRange1020);

//////////////////////////////////////////////////////////////////////////////////////////////////////////


var styleInputRange14 = document.createElement('style');
styleInputRange14.type = 'text/css';
styleInputRange14.classList.add("fonot___________");
var rules14 = document.createTextNode(".material-icons-new {display: inline-block;width: 24px;height: 24px;background-repeat: no-repeat;background-size: contain;}");
styleInputRange14.appendChild(rules14);
document.getElementsByTagName("head")[0].appendChild(styleInputRange14);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var styleInputRange23 = document.createElement('style');
styleInputRange23.type = 'text/css';
var rules23 = document.createTextNode(".book.jsx-1307288772::before {opacity: 0}");
//styleInputRange23.appendChild(rules23);
//document.getElementsByTagName("head")[0].appendChild(styleInputRange23);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var cssAnimation2 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules00 = document.createTextNode("@keyframes here {100%, 0% { background-color: rgba(255, 255, 255, 0.13); } 50% { background-color: rgba(255, 255, 255, 1); }}");
cssAnimation.appendChild(rules00);
document.getElementsByTagName("head")[0].appendChild(cssAnimation2);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Стиль рандома
var styleInputRange25 = document.createElement('style');
styleInputRange25.type = 'text/css';
var rules25 = document.createTextNode(".rand.jsx-4206980828::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/833071627020926976/rand.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange25.appendChild(rules25);
document.getElementsByTagName("head")[0].appendChild(styleInputRange25);
//Активация рандома
var styleInputRange26 = document.createElement('style');
styleInputRange26.type = 'text/css';
var rules26 = document.createTextNode(".rand.jsx-4206980828:active::after {display: block; content: ' '; background-image: url('https://cdn.discordapp.com/attachments/827569141782282272/833074439582122034/rand.svg'); background-size: 35px 35px; height: 35px; width: 35px;}");
styleInputRange26.appendChild(rules26);
document.getElementsByTagName("head")[0].appendChild(styleInputRange26);
//Активация рандома
var styleInputRange27 = document.createElement('style');
styleInputRange27.type = 'text/css';
//var rules27 = document.createTextNode(".rand.tool.jsx-4206980828:hover::before {content: '';  margin: 2px; flex: 1 1 0%; border-radius: 3px; align-self: stretch; animation: 5s linear 0s infinite normal none running rainbow2;}");
//styleInputRange27.appendChild(rules27);
document.getElementsByTagName("head")[0].appendChild(styleInputRange27);
//////////////////////////////////////////////////////////////////////////////////////////////////////////


var cssAnimation3 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules000 = document.createTextNode('@keyframes rainbow2 {'+
                                       '100%, 0% { background-color: rgb(255, 0, 0);}'+
                                       '8% { background-color: rgb(255, 127, 0);}'+
                                       '16% { background-color: rgb(255, 255, 0);}'+
                                       '25% { background-color: rgb(127, 255, 0);}'+
                                       '33% { background-color: rgb(0, 255, 0);}'+
                                       '41% { background-color: rgb(0, 255, 127);}'+
                                       '50% { background-color: rgb(0, 255, 255);}'+
                                       '58% { background-color: rgb(0, 127, 255);}'+
                                       '66% { background-color: rgb(0, 0, 255);}'+
                                       '75% { background-color: rgb(127, 0, 255);}'+
                                       '83% { background-color: rgb(255, 0, 255);}'+
                                       '91% { background-color: rgb(255, 0, 127);}'
                                       +'}');
cssAnimation.appendChild(rules000);
document.getElementsByTagName("head")[0].appendChild(cssAnimation3);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Стиль радио
var styleInputRange28 = document.createElement('style');
styleInputRange28.type = 'text/css';
var rules28 = document.createTextNode(".fi.input[type='range' i] {background-color: initial; cursor: default; appearance: auto; box-sizing: border-box; margin: 3px 3px 0px 5px; padding: initial; border: initial;}");
styleInputRange28.appendChild(rules28);
document.getElementsByTagName("head")[0].appendChild(styleInputRange28);
//Выбрано
var styleInputRange29 = document.createElement('style');
styleInputRange29.type = 'text/css';
var rules29 = document.createTextNode("input.fi:checked + label {background-color: rgb(204, 191, 228); color: rgb(73, 40, 179);}");
styleInputRange29.appendChild(rules29);
document.getElementsByTagName("head")[0].appendChild(styleInputRange29);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var cssAnimation21 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules001 = document.createTextNode("@keyframes viper {100%, 0% { color: #8a2be2FF; opacity: 1; } 9% { color: #945ccaFF; } 18% {color: #9781b1FF;} 27% {color: #92a297FF;} 36% {color: #83c17aFF;} 45% {color: #67e056FF;} 54% {color: #0eff0eFF;} 63% {color: #67e056FF;} 72% {color: #83c17aFF;} 81% {color: #92a297FF;} 90% {color: #9781b1FF;}}");
cssAnimation.appendChild(rules001);
document.getElementsByTagName("head")[0].appendChild(cssAnimation21);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var cssAnimation22 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules002 = document.createTextNode("@keyframes plane {100%, 0% {background-position: center 30%;} 50% {background-position: center 45%;}}");
cssAnimation.appendChild(rules002);
document.getElementsByTagName("head")[0].appendChild(cssAnimation22);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Активация кнопки кастомного контекстного меню
var styleInputRange0201 = document.createElement('style');
styleInputRange0201.type = 'text/css';
var rules0201 = document.createTextNode(".ctxmbutton:hover {background-color: powderblue; cursor: pointer;}");
styleInputRange0201.appendChild(rules0201);
document.getElementsByTagName("head")[0].appendChild(styleInputRange0201);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var styleInputRange0202 = document.createElement('style');
styleInputRange0202.type = 'text/css';
var rules0202 = document.createTextNode(".game.jsx-2855609897:hover {background-color: rgba(255, 100, 100, 0.7);}");
styleInputRange0202.appendChild(rules0202);
document.getElementsByTagName("head")[0].appendChild(styleInputRange0202);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var cssAnimation222 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules0022 = document.createTextNode("@keyframes decay {100%, 0% {box-shadow: 0px 0px 8px -2px red;} 50% {box-shadow: 0px 0px 10px 1px red;}}");
cssAnimation.appendChild(rules0022);
document.getElementsByTagName("head")[0].appendChild(cssAnimation222);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var cssAnimation2222 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules00222 = document.createTextNode("@keyframes bit {100%, 0% {background-position: 20px -25px; background-size: 100%;} 50% {background-position: -30px -30px; background-size: 130%;}}");
cssAnimation.appendChild(rules00222);
document.getElementsByTagName("head")[0].appendChild(cssAnimation2222);

//////////////////////////////////////////////////////////////////////////////////////////////////////////



var styleInputRange02019 = document.createElement('style');
styleInputRange02019.type = 'text/css';
var rules02019 = document.createTextNode(".thikness-input {background-color: #00000000; border: none; width: 30px; font-family: 'Black'; color: rgb(67, 222, 153); font-Size: 17px; text-align: center;}");
styleInputRange02019.appendChild(rules02019);
document.getElementsByTagName("head")[0].appendChild(styleInputRange02019);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var cssAnimation4 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules04 = document.createTextNode("@keyframes wiggi {100%, 0% {background-position: 180px -10px;} 50% {background-position: 150px -10px;}}");
cssAnimation.appendChild(rules04);
document.getElementsByTagName("head")[0].appendChild(cssAnimation4);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var styleInputRange296 = document.createElement('style');
styleInputRange296.type = 'text/css';
var rules296 = document.createTextNode(".seba::before {  content: ''; animation: 5s linear 0s infinite normal none running plane; position: absolute; left: -90px; top: -5px; width: 500px; height: 80px; background-image: url('https://media.discordapp.net/attachments/827569141782282272/860901923078012928/seba-removebg-preview_2.png'); background-size: 80%; transform: rotate(1deg); background-repeat: no-repeat; background-position: center center; z-index: 0;}");
styleInputRange296.appendChild(rules296);
document.getElementsByTagName("head")[0].appendChild(styleInputRange296);

var styleInputRange297 = document.createElement('style');
styleInputRange297.type = 'text/css';
var rules297 = document.createTextNode(".seba:hover::before {  animation: 2s linear 0s infinite normal none running  planeintro, 5s linear 0s infinite normal none running plane; ");
styleInputRange297.appendChild(rules297);
document.getElementsByTagName("head")[0].appendChild(styleInputRange297);

var cssAnimation47 = document.createElement('style');
cssAnimation.type = 'text/css';
var rules047 = document.createTextNode("@keyframes planeintro {0% {background-size: 80%; } 25% {background-size: 150%; opacity: 1;} 30% {background-size: 170%; opacity: 0; z-index: 2;} 35% {background-size: 0%; opacity: 0;} 40% {background-size: 20%; opacity: 1;  z-index: 0;} 100% {background-size: 80%;}}");
cssAnimation.appendChild(rules047);
document.getElementsByTagName("head")[0].appendChild(cssAnimation47);

//////////////////////////////////////////////////////////////////////////////////////////////////////////


function createUpdateWindow(){
    if (localStorage.getItem("VERSION") == VERSION){return}
    localStorage.setItem("VERSION", VERSION);
    if (Q("shadow-window")[0]){return}
    var f = document.createElement("div");
    f.classList.add("shadow-window");
    f.style.zIndex=10;
    f.style.position="absolute";
    f.style.width="100%";
    f.style.height="100%";
    f.style.backgroundColor="#000D";
    document.querySelector("#__next").appendChild(f);
    var w = document.createElement("div");
    w.classList.add("shadow-window");
    w.style.zIndex=10;
    w.style.position="absolute";
    w.style.width="500px";
    w.style.height="500px";
    w.style.backgroundColor="#FFF";
    w.style.borderRadius="20px";
    w.style.left="50%";
    w.style.top="50%";
    w.style.margin="-250px 0px 0px -250px";
    f.appendChild(w);
    var st = document.createElement("span");
    st.innerText="SETTINGS";
    w.appendChild(st);
}


function createCanvas(height=800, width=800){
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "400px";
    canvas.style.height = "400px";
    canvas.style.position = "absolute";
    canvas.style.borderRadius = "200px";
    canvas.style.border = "2px solid";
    canvas.style.zIndex=99999;
    canvas.style.boxShadow = "0px 5px 5px 0px rgb(0 0 0 / 50)";
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
}

var canvas300;
var pos;
var left;
var top;
var width;
var height;

function clientMouseMove(x, y){
    var pointerCanvas = Q(PCANV)[0];
    var event = new Event('mousemove', { bubbles: true, cancelable: true});
    event.clientX=x;
    event.clientY=y;
    pointerCanvas.dispatchEvent(event);
}

function clientMouseDown(x, y){
    var pointerCanvas = Q(PCANV)[0];
    var event = new Event('mousedown', { bubbles: true, cancelable: true});
    event.clientX=x;
    event.clientY=y;
    pointerCanvas.dispatchEvent(event);
}

function clientMouseUp(x, y){
    var pointerCanvas = Q(PCANV)[0];
    var event = new Event('mouseup', { bubbles: true, cancelable: true});
    event.clientX=x;
    event.clientY=y;
    pointerCanvas.dispatchEvent(event);
}


function mouseDown(x, y){
    var left = pos.x;
    var top = pos.y;
    var width = pos.width;
    var height = pos.height;
    var event = new Event('mousedown', { bubbles: true, cancelable: true} );
    event.clientX=left+(x*width/1516);
    event.clientY=top+(y*height/848);
    canvas300.dispatchEvent(event);
}


function mouseMove(x, y){
    var left = pos.x;
    var top = pos.y;
    var width = pos.width;
    var height = pos.height;
    let event = new Event('mousemove', { bubbles: true, cancelable: true});
    event.clientX=left+(x*width/1516);
    event.clientY=top+(y*height/848);
    canvas300.dispatchEvent(event);
}

function mouseUp(){
    var event = new Event('mouseup', { bubbles: true, cancelable: true} );
    canvas300.dispatchEvent(event);
}


function drawSolidLine(arr){
    if (arr.length > 1){
        left = pos.x;
        top = pos.y;
        width = pos.width;
        height = pos.height;
        mouseDown(arr[0][0], arr[0][1]);
        arr.forEach(function (point){mouseMove(point[0], point[1]);});
        mouseUp();
    }
}

function convert0Dto2D(arr){
    var arr2D = [];
    for (let i=0; i<arr.length; i++){
        if (i % (1516*4) == 0){
            arr2D.push([]);
        }
        if (i % 4 == 0){
            arr2D[arr2D.length-1].push([]);
        }
        arr2D[arr2D.length-1][arr2D[arr2D.length-1].length-1].push(arr[i]);
    }
    return arr2D;
}

function isArrayEqual(arr1, arr2){
    if (arr1.length == arr2.length){
        for (let i=0; i<arr1.length; i++){
            if (arr1[i]==arr2[i]){
                //ничего неделание
            } else {return false;}
        }
    } else {return false;}
    return true;
}

function isArrayEqual2(arr1, arr2){
    if (arr1.join(',') == arr2.join(',')){
        return true;
    }
    return false;
}

function getBorderOfNew(arr){
    var cordsArr=[];
    for (let y=0; y<arr.length; y++){
        for (let x=0; x<arr[0].length; x++){
            var key1=false;
            var key2=false;
            var key3=false;
            var key4=false;
            if (y != 0){if (arr[y-1][x] == 1){key1=true}} else if (arr[y][x] == 1){cordsArr.push([x, y])}
            if (x != 0){if (arr[y][x-1] == 1){key1=true}} else if (arr[y][x] == 1){cordsArr.push([x, y])}
            if (y != arr.length-1){if (arr[y+1][x] == 1){key1=true}} else if (arr[y][x] == 1){cordsArr.push([x, y])}
            if (x != arr[0].length-1){if (arr[y][x+1] == 1){key1=true}} else if (arr[y][x] == 1){cordsArr.push([x, y])}
            if (arr[y][x] == 0 && ( key1 || key2 || key3 || key4)){
                cordsArr.push([x, y]);
            }
        }
    }
    return cordsArr;
}

function arrInArr(arr, childArr){
    for (let i=0; i<arr.length; i++){
        if (childArr[0]==arr[i][0] && childArr[1]==arr[i][1]){
            return i;
        }
    }
    return -1;
}

function sortBorderArray(arr){
    var newArr=[arr[0]];
    arr.splice(0, 1);
    var index;
    var minS;
    var realLengthOfArray = arr.length;
    for (let i=0; i< realLengthOfArray; i++){
        var c = newArr[newArr.length-1]; // последняя точка
        var lastIndex;
        minS = 10000;
        for (let k=0; k<arr.length; k++){
            let x0 = c[0];
            let y0 = c[1];
            let x1 = arr[k][0];
            let y1 = arr[k][1];
            let curS = ((x0-x1)**2+(y0-y1)**2)**0.5;
            if (curS < minS){
                minS = curS;
                lastIndex = k;
            }
        }
        if (minS>2){

        }

        newArr.push(arr[lastIndex]);
        arr.splice(lastIndex, 1);
    }

    var newNewArr = [];
    for (let index=0; index<newArr.length; index++){
        if (index % 2 == 0){
            newNewArr.push(newArr[index]);
        }
    }

    return newNewArr;
}


function drawNsort(arr){
    canvas300 = Q(DCANV)[0];
    pos = canvas300.getBoundingClientRect();
    var lastPoint=arr[0];
    mouseDown(lastPoint[0], lastPoint[1]);
    arr.splice(0, 1);
    var index;
    var minS;
    var key = false;
    var realLengthOfArray = arr.length;
    for (let i=0; i<realLengthOfArray; i++){
        var lastIndex;
        minS = 1E38;
        for (let k=0; k<arr.length; k++){
            let x0 = lastPoint[0];
            let y0 = lastPoint[1];
            let x1 = arr[k][0];
            let y1 = arr[k][1];
            let curS = ((x0-x1)**2+(y0-y1)**2)**0.5;
            if (curS < minS){
                minS = curS;
                lastIndex = k;
            }
        }
        lastPoint = arr[lastIndex];
        arr.splice(lastIndex, 1);

        if (key){
            mouseDown(lastPoint[0], lastPoint[1]);
        }

        if (minS>2){
            mouseUp();
            key = true;
        } else {mouseMove(lastPoint[0], lastPoint[1]); key=false;}
        if (i==realLengthOfArray-1){
            mouseUp();
            curThicc.click();
            Q("jsx-4206980828 tool fil")[0].click();
        }
    }
}


function drawArray(arr){
    var canvas = Q(DCANV)[0];
    var pos = canvas.getBoundingClientRect();
    var left = pos.x;
    var top = pos.y;
    var width = pos.width;
    var height = pos.height;
    for (let i=0; i<arr.length; i++){
        let event = new Event('mousedown', { bubbles: true, cancelable: true} );
        event.clientX=left+(arr[i][0]*width/1516);
        event.clientY=top+(arr[i][1]*height/848);

        canvas.dispatchEvent(event);
        event = new Event('mouseup', { bubbles: true, cancelable: true} );
        canvas.dispatchEvent(event);
    }
}


function glass(point){
    var canvas = Q(PCANV)[0];
    var rect = canvas.getBoundingClientRect();
    var x = rect.x;
    var y = rect.y;

    //Текущий размер холста
    var curWidth = rect.width;
    var curHeight = rect.height;

    //Реальный размер холста
    var realWidth = 1516;
    var realHeight = 848;

    //Реальное расположение точки
    var realPointX = Q("xmirror")[0].value;
    var realPointY = Q("ymirror")[0].value;
    //Угол
    var alpha = 180 - Q("degmirror")[0].value;

    //Коэффициент отличия
    var coefW = curWidth / realWidth;
    var coefH = curHeight / realHeight;

    //Конвертированные реальные точки
    var convPointX = realPointX * coefW;
    var convPointY = realPointY * coefH;

    //Получаемая точка
    var C = point;
    //Центарльная точка
    var A = [convPointX, convPointY];

    //Катеты основного треугольника
    var AN = (C[0] - A[0]);
    var CN = -(C[1] - A[1]);
    //Угол у центральной точки
    var beta = Math.atan(CN/AN)/(Math.PI/180);
    if (AN<0){alpha = 180 + (alpha-90)}
    //Угол BAN
    var BAN = (alpha - beta) + alpha;
    //Гипотенузы AC = AB
    var AC = Math.sqrt(AN ** 2 + CN ** 2);
    //Катет BM
    var BM = Math.sin(Math.PI/180 * BAN) * AC;
    //Катет AM
    var AM = Math.cos(Math.PI/180 * BAN) * AC;
    //Точка B
    var B = [A[0] + AM, A[1] - BM];

    /*var middleCanvas = Q("mirror-canvas")[0];
    var context = middleCanvas.getContext("2d");
    context.lineWidth = 20;
    context.beginPath();
    context.moveTo(point[0]/coefW, point[1]/coefH);
    context.lineTo(point[0]/coefW+5, point[1]/coefH+5);
    context.closePath();
    context.stroke();*/

    return B;
}


function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}

var canvas0000 = document.createElement('canvas');

function getPix(x, y, canvas){
    let ctx = canvas0000.getContext('2d').getImageData(x, y, 1, 1).data;
    return ctx
}

function draw(x1, y1){
    canvas = Q(PCANV)[0];
    var pos = canvas.getBoundingClientRect();
    let x = pos.x;
    let y = pos.y;
    let event = new Event('mousedown', { bubbles: true, cancelable: true} );
    event.clientY=y+y1;
    event.clientX=x+x1;
    canvas.dispatchEvent(event);
    event = new Event('mouseup', { bubbles: true, cancelable: true} );
    canvas.dispatchEvent(event);
}

var canvas;
function globalDraw(){
    canvas = Q(PCANV)[0];
    alert("WRONG FUNC");
    var url = document.querySelector("#content > input[type=text]:nth-child(2)").value;

    var img = new Image();
    //const img = document.createElement('img');

    img.src = url;
    img.crossOrigin = "Anonymous";

    var context = canvas.getContext('2d');

    canvas.width=192;
    canvas.height=128;

    img.onload=function(){
        alert("Loaded");
        context.drawImage(img, 0, 0, 192, 128);

        let preArr = [];
        for (let y=0; y<canvas.height; y++){
            for (let x=0; x<canvas.width; x++){
                let curPix = getPix(x, y, canvas);

                if (curPix != preArr){
                    preArr=curPix;
                    let r = curPix[0];
                    let g = curPix[1];
                    let b = curPix[2];
                    setColor(rgb2hex(r, g, b));
                }
                draw(x*2, y*2);
            }
        }
        alert("END");
    };

    img.onerror=function(){
        alert('Error to load image');
    }
}

function rgb2hex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function setColor(color) {
    const input = document.querySelector('input[type=color]');
    const value = input.value;
    input.value = color;
    input._valueTracker.setValue(value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
}


function setValue(input, value) {
    input.value = value;
    input._valueTracker.setValue();
    input.dispatchEvent(new Event('input', { bubbles: true }));
}


function setNess(n) {
    const input = document.querySelector("#content > div > div > div.jsx-1562482592.center > div.jsx-1562482592.bottom > div > div.jsx-340028725.bxopacity > input.jsx-340028725");
    const value = input.value;
    input.value = n/100;
    input._valueTracker.setValue(value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
}


window.addEventListener("mouseup", (e)=>{
    var item = Q("contextmenu")[0];
    if (typeof(item) != "undefined" && !e.target.classList.contains("ctxmbutton") && e.target.tagName != "CANVAS"){item.parentNode.removeChild(item)};
});

window.onwheel = ()=>{
    var item = Q("contextmenu")[0];
    if (item){item.parentNode.removeChild(item)};
};



var MyVar1 = 0;
var MyVar2 = 128;
var MyVar3 = 255;
var Checker1= 0;
var Checker2= 0;
var Checker3= 0;
var Key1 = false;
var globalKey=false;

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function cencFunc(u){
    if(!u || !u.classList){return}
    var d, o, q;
    if (u.classList.contains("drawing")){
        d=dict[u.children[1].firstChild.innerText.toLowerCase()];
        if (d){
            o=u.firstChild.firstChild;
            //аватар
            o.parentNode.style.border=d.avatar.border;
            o.parentNode.style.backgroundColor=d.avatar.backgroundColor;

            //аватар инсайд
            o.style.transform="scale(-1, 1)";

            o.style.backgroundImage=d.avatar.child.backgroundImage;
            o.style.backgroundSize=d.avatar.child.backgroundSize;
            o.style.backgroundPosition=d.avatar.child.backgroundPosition;
            o.style.borderRadius=d.avatar.child.borderRadius;
            o.style.margin=d.avatar.child.margin;
            o.style.width=d.avatar.child.width;
            o.style.height=d.avatar.child.height;
            o.style.minHeight=d.avatar.child.minHeight;
            o.style.animation=d.avatar.child.animation;

            q = u.children[1].firstChild;
            //стиль текста ника
            q.style.color=d.nickname.color;
            q.style.fontFamily=d.nickname.fontFamily;
            q.style.fontStyle=d.nickname.fontStyle;
            q.style.fontWeight=d.nickname.fontWeight;
            q.style.fontSize=d.nickname.fontSize;
            q.style.letterSpacing=d.nickname.letterSpacing;
            q.style.webkitTextStroke=d.nickname.webkitTextStroke;
            q.style.textShadow=d.nickname.textShadow;
            q.style.overflow=d.nickname.overflow;
            q.style.animation=d.nickname.animation;
        };
    }

    if (u.classList.contains("answer")){
        d=dict[u.parentNode.parentNode.innerText.toLowerCase()] ? dict[u.parentNode.parentNode.innerText.toLowerCase()] : dict[u.firstChild.firstChild.innerText.toLowerCase()];
        if (d){
            o=u.children[1].firstChild;
            //аватар
            o.parentNode.style.border=d.avatar.border;
            o.parentNode.style.backgroundColor=d.avatar.backgroundColor;

            //аватар инсайд
            o.style.backgroundImage=d.avatar.child.backgroundImage;
            o.style.backgroundSize=d.avatar.child.backgroundSize;
            o.style.backgroundPosition=d.avatar.child.backgroundPosition;
            o.style.borderRadius=d.avatar.child.borderRadius;
            o.style.margin=d.avatar.child.margin;
            o.style.width=d.avatar.child.width;
            o.style.height=d.avatar.child.height;
            o.style.minHeight=d.avatar.child.minHeight;
            o.style.animation=d.avatar.child.animation;

            q = u.firstChild.firstChild;
            //стиль текста ника
            q.style.color=d.nickname.color;
            q.style.fontFamily=d.nickname.fontFamily;
            q.style.fontStyle=d.nickname.fontStyle;
            q.style.fontWeight=d.nickname.fontWeight;
            q.style.fontSize=d.nickname.fontSize;
            q.style.letterSpacing=d.nickname.letterSpacing;
            q.style.webkitTextStroke=d.nickname.webkitTextStroke;
            q.style.textShadow=d.nickname.textShadow;
            q.style.overflow=d.nickname.overflow;
            q.style.animation=d.nickname.animation;
        };
    }


    if(u.classList.contains("load")){u.addEventListener("DOMNodeInserted", (e)=>{
        e.path[3].classList.remove("load");
        cencFunc(e.path[3]);
    }); return;}
    if (u.classList.contains("answer")){
        if(blackArr.indexOf(u.firstChild.firstChild.innerText.toLowerCase()) != -1 || u.k == true){
            u.k=!0;
            u.firstChild.children[1].style.backgroundColor="#000";
            u.firstChild.children[1].firstChild.style.opacity="0";
        } else {
            u.k=!1;
            u.firstChild.children[1].style.backgroundColor="";
            u.firstChild.children[1].firstChild.style.opacity="1";
        }
        u.parentNode.style.cursor="pointer";
        u.parentNode.onclick=()=>{
            if(u.k){
                u.k=!1;
                u.firstChild.children[1].style.backgroundColor="";
                u.firstChild.children[1].firstChild.style.opacity="1";
            }else{
                u.k=!0;
                u.firstChild.children[1].style.backgroundColor="#000";
                u.firstChild.children[1].firstChild.style.opacity="0";
            }
        }
    } else if (u.classList.contains("drawing")){
        if(blackArr.indexOf(u.children[1].firstChild.innerText.toLowerCase()) != -1 || u.k == true){
            u.k=!0;
            u.children[1].children[1].style.backgroundColor="#000";
            u.children[1].children[1].firstChild.style.opacity="0";
        } else {
            u.k=!1;
            u.children[1].children[1].style.backgroundColor="";
            u.children[1].children[1].firstChild.style.opacity="1";
        }
        u.parentNode.style.cursor="pointer";
        u.parentNode.onclick=()=>{
            if(u.k){
                u.k=!1;
                u.children[1].children[1].style.backgroundColor="";
                u.children[1].children[1].firstChild.style.opacity="1";
            }else{
                u.k=!0;
                u.children[1].children[1].style.backgroundColor="#000";
                u.children[1].children[1].firstChild.style.opacity="0";
            }
        }
        var canv = u.children[1].children[1].firstChild;
        var nick = u.children[1].firstChild.innerText;
        if (canv.tagName!="CANVAS"){canv = u.children[1].children[1].firstChild.firstChild;}
        canv.oncontextmenu=(e)=>{
            var item = Q("contextmenu")[0];
            if (item){item.parentNode.removeChild(item)};
            var contextmenu = document.createElement("div");
            contextmenu.classList.add("contextmenu");
            contextmenu.style.height="auto";
            contextmenu.style.width="auto";
            contextmenu.style.borderRadius="5px";
            contextmenu.style.border="2px solid black";
            contextmenu.style.backgroundColor="rgba(255, 255, 255, 0.8)";
            contextmenu.style.position="absolute";
            contextmenu.style.left=e.clientX+"px";
            contextmenu.style.top=e.clientY+"px";
            contextmenu.style.display="grid";
            contextmenu.style.padding="3px";
            contextmenu.style.transform=Q("jsx-2562723607 jsx-3712514527 screen fade-enter-done")[0].style.transform;
            contextmenu.oncontextmenu=()=>{return !1};

            var copy = document.createElement("a");
            copy.classList.add("ctxmbutton");
            copy.innerText = "Copy";
            copy.style.fontFamily = "Black";
            //copy.style.color = "white";
            copy.style.height="auto";
            copy.style.width="auto";
            copy.style.borderRadius="3px";
            copy.style.margin="0px 0px 2px 0px";
            copy.style.textAlign="left";
            copy.onclick=()=>{canv.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})])); contextmenu.parentNode.removeChild(contextmenu);};
            contextmenu.appendChild(copy);
            var save = document.createElement("a");
            save.classList.add("ctxmbutton");
            save.innerText="Download";
            save.style.fontFamily = "Black";
            //save.style.color = "white";
            save.style.height="auto";
            save.style.width="auto";
            save.style.borderRadius="3px";
            save.style.margin="0px 0px 2px 0px";
            save.style.textAlign="left";
            save.onclick=()=>{
                let link = document.createElement('a');
                link.download = `${nick}.png`;
                link.href = canv.toDataURL();
                link.click();
                contextmenu.parentNode.removeChild(contextmenu);
            };
            contextmenu.appendChild(save);
            document.querySelector("#content").appendChild(contextmenu);

            return false;
        }
    }
}


function censorListener(){
    Q("scrollElements")[1].addEventListener("DOMNodeInserted", (e)=>{
        var u = e.target.firstChild;
        cencFunc(u);
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function AddButton(){
    var btn = document.querySelector("#content > div > div > div. .colors > div > div:nth-child(4)");
    btn.onclick = function(){
        if (Key1){Key1=false;}else{Key1=true};
    }
}

function debugName(){
    var name = document.getElementsByTagName("h3")[0];
    if (name.innerText == ""){
        Q("drawing")[0].style.margin="15px 0px 10px";
    }
}


function vipOnEnter(){
    if (!dict){return}
    var i = Q(MINP)[0];
    i.oninput=vipOnEnter;
    var a = Q("avatar")[0].firstChild;
    var d = (dict[i.value.toLowerCase()] ? dict[i.value.toLowerCase()] : dict[i.placeholder.toLowerCase()]);
    if (d){
        //аватар
        a.parentNode.style.border=d.avatar.border;
        a.parentNode.style.backgroundColor=d.avatar.backgroundColor;

        //аватар инсайд
        a.style.backgroundImage=d.avatar.child.backgroundImage;
        a.style.backgroundSize=d.avatar.child.backgroundSize;
        a.style.backgroundPosition="center";//d.avatar.child.backgroundPosition;
        a.style.borderRadius="100px";//d.avatar.child.borderRadius;
        a.style.margin=d.avatar.child.margin;
        a.style.width=d.avatar.child.width;
        a.style.height=d.avatar.child.height;
        a.style.minHeight=d.avatar.child.minHeight;
        a.style.animation=d.avatar.child.animation;
    } else {
        i.style="";
        a.style="";
        a.parentNode.style="";
    }
}

var blackArr = [];
var dict;
var xhr = new XMLHttpRequest();
xhr.open('GET', window.atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzY5VHlwZS9Tb21lLXNjcmlwdHMvbWFpbi9kYXRhYmFzZS5qc29u'));
xhr.onload = function(){
    console.log("db is loaded");
    var data = xhr.response;
    dict = JSON.parse(data);
}
xhr.send();

var nameList=[];
function VIPList(q){
    if (!q){return}
    if(q.parentNode.classList.contains("empty")){return;};

    var n = q.innerText.toLowerCase();
    var d = dict[n];
    if (d){
        //защита
        if (d.code){
            if (!(d.code == window.btoa(window.window.getComputedStyle(q.parentNode.parentNode.firstChild.firstChild).backgroundImage.substring(43).split('.')[0]))){return}
        }

        //изменение текста
        if (d.innerText){q.innerText=d.innerText;}

        //музыка на входе
        if (d.musicOnJoin && nameList.indexOf(n) == -1){
            nameList.push(n);
            var m = document.createElement("audio");
            m.src=d.musicOnJoin;
            m.autoplay=!0;
            m.volume=1;
        }

        //при клике
        if (d.onclick){
            eval(d.onclick);
            q.parentNode.parentNode.onclick=()=>{func1(q, d)};
        }

        //при правом клике
        if (d.oncontextmenu){
            eval(d.oncontextmenu);
            q.parentNode.parentNode.onclick=()=>{func2(q, d)};
        }

        //на входе курсора
        if (d.onmouseenter){
            eval(d.onmouseenter);
            q.parentNode.parentNode.onmouseenter=()=>{func3(q, d)};
        }
        //на выходе курсора
        if (d.onmouseleave){
            eval(d.onmouseleave);
            q.parentNode.parentNode.onmouseleave=()=>{func4(q, d)};
        }

        //удаление третьего элемента
        if (d.thirdElem && q.parentNode.parentNode.children[2]){
            q.parentNode.parentNode.removeChild(q.parentNode.parentNode.children[2]);
        }

        //удаление i-того элемента
        if (d.iElem && q.parentNode.parentNode.firstChild.children[1]){
            q.parentNode.parentNode.firstChild.removeChild(q.parentNode.parentNode.firstChild.children[1]);
        }

        //добавление тайтла
        q.parentNode.parentNode.title=d.title;

        //стиль текста ника
        q.style.color=d.nickname.color;
        q.style.fontFamily=d.nickname.fontFamily;
        q.style.fontStyle=d.nickname.fontStyle;
        q.style.fontWeight=d.nickname.fontWeight;
        q.style.fontSize=d.nickname.fontSize;
        q.style.letterSpacing=d.nickname.letterSpacing;
        q.style.webkitTextStroke=d.nickname.webkitTextStroke;
        q.style.textShadow=d.nickname.textShadow;
        q.style.overflow=d.nickname.overflow;
        q.style.animation=d.nickname.animation;

        //стиль блока
        q.parentNode.parentNode.style.backgroundColor=d.block.backgroundColor;
        q.parentNode.parentNode.style.border=d.block.border;
        q.parentNode.parentNode.style.backgroundImage=d.block.backgroundImage;
        q.parentNode.parentNode.style.backgroundSize=d.block.backgroundSize;
        q.parentNode.parentNode.style.backgroundPosition=d.block.backgroundPosition;
        q.parentNode.parentNode.style.backgroundRepeat=d.block.backgroundRepeat;
        q.parentNode.parentNode.style.transition=d.block.transition;
        q.parentNode.parentNode.style.animation=d.block.animation;
        q.parentNode.parentNode.style.cursor=d.block.cursor;
        q.parentNode.parentNode.style.boxShadow=d.block.boxShadow;

        //аватар
        q.parentNode.parentNode.firstChild.style.border=d.avatar.border;
        q.parentNode.parentNode.firstChild.style.backgroundColor=d.avatar.backgroundColor;

        //аватар инсайд
        q.parentNode.parentNode.firstChild.firstChild.style.backgroundImage=d.avatar.child.backgroundImage;
        q.parentNode.parentNode.firstChild.firstChild.style.backgroundSize=d.avatar.child.backgroundSize;
        q.parentNode.parentNode.firstChild.firstChild.style.backgroundPosition=d.avatar.child.backgroundPosition;
        q.parentNode.parentNode.firstChild.firstChild.style.borderRadius=d.avatar.child.borderRadius;
        q.parentNode.parentNode.firstChild.firstChild.style.margin=d.avatar.child.margin;
        q.parentNode.parentNode.firstChild.firstChild.style.width=d.avatar.child.width;
        q.parentNode.parentNode.firstChild.firstChild.style.height=d.avatar.child.height;
        q.parentNode.parentNode.firstChild.firstChild.style.minHeight=d.avatar.child.minHeight;
        q.parentNode.parentNode.firstChild.firstChild.style.animation=d.avatar.child.animation;

        if (d.function){
            eval(d.function);
            f(q, d);
        }
    }

    else if (q.innerText.indexOf("#") != -1){
        q.title="Игрок";
        var text1 = q.innerText
        var index = text1.lastIndexOf("#");
        q.parentNode.parentNode.style.backgroundColor=text1.substring(index, text1.length);
        q.innerText=text1.substring(0, index);
    }
    else if (document.URL.indexOf("book") != -1 && q.innerText.toLowerCase() != "doctordeathddracula" && !q.parentNode.parentNode.classList.contains("waiting")){
        q.parentNode.parentNode.onmouseenter=()=>{if (q.banned != true){ q.parentNode.parentNode.style.boxShadow="0px 0px 10px red"} };
        q.parentNode.parentNode.onmouseleave=()=>{if (q.banned != true){ q.parentNode.parentNode.style.boxShadow=""} };
        q.parentNode.parentNode.style.cursor="pointer";
        q.parentNode.parentNode.onclick=()=>{
            var ne = Q("scrollElements")[1]
            if (!ne){return}
            ne=ne.children;
            if (q.banned){
                let popa = blackArr.indexOf(q.innerText.toLowerCase())
                q.banned=false;
                q.parentNode.parentNode.style.backgroundColor = "";
                blackArr.splice(popa, 1);
                for (let i=0; i<ne.length; i++){cencFunc(ne[i].firstChild);}
            } else {
                q.banned=true;
                blackArr.push(q.innerText.toLowerCase());
                for (let i=0; i<ne.length; i++){cencFunc(ne[i].firstChild);}
                q.parentNode.parentNode.style.backgroundColor = "red";
            };
        };
    }
}


function testForIncorporation(word, arr){
    for (let i=0; i<arr.length; i++){
        if (word.indexOf(arr[i]) != -1){return !0}
    }
    return !1
}

function addListenerToBlock(block, func){
    block.addEventListener("DOMNodeInserted", (e)=>{
        if (!e.target.children[1]){return}
        VIPList(e.target.children[1].firstChild);
    })
}

function extendTextInput() {
    var textInput = Q("jsx-46098086")[0];
    if (textInput){
        textInput.maxLength=70;
        textInput.style.webkitTextSecurity="none";
    }
    textInput = Q("jsx-46098086 ")[0];
    if(textInput){
        textInput.maxLength=70;
        textInput.style.webkitTextSecurity="none";
    }
}

var num = 1
var Key = false
var minusActive = false;
var pipetKey = false;


function addMultEventsListener(events, func, element){
    for (let i=0; i<events.length; i++){
        let event = events[i];
        element.addEventListener(event, func)
    }
}

function clearActiveelements(){
    var mirorButton = Q("jsx-4206980828 tool miror")[0];
    mirorButton.classList.remove("sel");
    clearMidCanvas();
    mirorButton.classList.remove("act1");
    Q("rightpanel")[0].style.right="-220px";
    var smoothButton = Q("jsx-4206980828 tool  smooth")[0];
    var degRangeBorder = Q("deg-range-border")[0];
    smoothButton.classList.remove("act1");
    degRangeBorder.style.display="none";
    //sLevel = 1;
    if (prevElem){
        prevElem.classList.add("sel");
        var pipetButton = Q("jsx-4206980828 tool pipet")[0];
        pipetButton.classList.remove("act");
        pipetButton.classList.remove("sel");
    }
    var loopaButton = Q("jsx-4206980828 tool loopa")[0];
    var zoomC = Q("zoomC")[0];
    loopaButton.classList.remove("act1");
    loopaButton.classList.remove("sel");
    zoomCHidden = true;
    zoomC.hidden = true;
    Q("color-gradient")[0].style.display="none";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////DRAW FUNCS/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Добавление на страницу холста зума
var zoomOffsetY = 400;
var zoomCHidden = true;
var memmoryC;
var currentC;
function addZoom(){
    function zoomUpdate(e){
        try{
            var topC = Q(PCANV)[0];
            var zoomC = Q("zoomC")[0];
            var rect = topC.getBoundingClientRect();
            var dx = e.clientX - rect.x;
            var dy = e.clientY - rect.y;
            var coefX = 1516 / rect.width;
            var coefY = 848 / rect.height;

            zoomC.style.left = e.clientX + 'px';
            zoomC.style.top = e.clientY - zoomOffsetY + 'px';
            var ctx = zoomC.getContext("2d");
            ctx.fillRect(0, 0, zoomC.width, zoomC.height);
            ctx.drawImage(memmoryC, dx * coefX - 70+3, dy * coefY - 70+3, 200, 200, 0, 0, 300, 300);
            ctx.drawImage(currentC, dx * coefX - 70+3, dy * coefY - 70+3, 200, 200, 0, 0, 300, 300);

            const centerX = zoomC.width / 2;
            const centerY = zoomC.height / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
            //ctx.fillStyle = 'red';
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#000000';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI, false);
            //ctx.fillStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFFFFF';
            ctx.stroke();
        } catch {};
    }


    if (!Q("zoomC").length && document.URL.indexOf("draw") != -1 && !Q("jsx-1307288772 book dark").length){
        var zoomC = createCanvas(200, 200);
        zoomC.classList.add("zoomC");
        zoomC.hidden = true;

        document.querySelector("#__next").addEventListener("pointermove", (e)=>{
            if (Q("jsx-4206980828 tool loopa sel")[0]){
                zoomUpdate(e);
            }
        });

        document.querySelector("#__next").addEventListener("pointerdown", (e)=>{
            setTimeout(()=>{
                zoomUpdate(e);
            }, 10);
        });

        memmoryC = Q(DCANV)[0];
        currentC = Q(DCANV)[1];

        document.querySelector("#__next").appendChild(zoomC);
    }
}

//Функция изменения дизайна
function drawStyleChange(){
    //Смещение инструментов ниже
    Q("jsx-902724348")[0].style.margin="0px 0px -70px 0px";
    //Растяжение палитры
    var palitra = Q("jsx-902724348")[1];
    palitra.style.height="auto";
    //var book = Q("jsx-1307288772 book")[0];
    //book.style.padding="0px 0px 20px 0px";
    //Изменеине в иснтрументах
    var undo = Q(UNDO)[0];
    var redo = Q(REDO)[0];
    undo.style.margin="0px 0px 7px 0px";
    redo.style.margin="0px 0px 7px 0px";
    //Очистка задней картинки
    var underDrawContainer = Q(UDC)[0];
    if (underDrawContainer){
        underDrawContainer.style.backgroundImage="url()";
        underDrawContainer.style.boxShadow="none";
    }

    var toolBar = Q(TBAR)[0].firstChild;
    toolBar.style.height="auto";
    //Надхолсьтье
    var canvasLayer = Q(CORE)[0];
    canvasLayer ? canvasLayer.style.borderRadius="0px 0px 0px 0px": 0;

    var newDiv = document.createElement("div");
    newDiv.classList.add("newdiv");
    newDiv.style.width="758px";
    newDiv.style.height="424px";
    newDiv.style.position="absolute";
    newDiv.style.zIndex="0";
    newDiv.style.overflow="hidden";
    try{
        Q(DCANV)[0].insertAdjacentElement('beforeBegin', newDiv);
    }catch{}
}

var curElementOverCursor;
//Функция изменения функционала первого уровня
function firstLevelFunctions(){
    if (!Q(PCANV)[0]){return true}
     Q("jsx-4289504161 small")[0].addEventListener("click", ()=>{setTimeout(mainDrawFunc, 100)});
    //Дизактивация текстбокса толщины
    //setTimeout(()=>{
    var t = document.getElementsByClassName("thikness-input")[0];
    if (t){
        t.parentNode.onmouseenter=()=>{t.disabled=!1;}
        t.parentNode.onmouseleave=()=>{t.disabled=!0}//}, 500);
        //Определение изначальной прозрачности
        Q("thikness-input")[0].value=4;
    }
    //Невозможность открыть контекстное меню на холсте
    if (!Q(PCANV)[0]){return}
    Q(PCANV)[0].oncontextmenu=function(){return false;};
    //Цензура текста
    var taskParent = document.getElementsByTagName("h3")[0];
    if (taskParent){
        var originalTaskName = taskParent.innerText;
        taskParent.onclick=()=>{
            if (taskParent.innerText == originalTaskName){
                taskParent.innerText = "CENSORED";
                taskParent.style.color = "red";
                blackList.push(originalTaskName); //<-Добавление в черный список
            } else {
                taskParent.innerText = originalTaskName;
                taskParent.style.color = "white";
                blackList.splice(blackList.indexOf(originalTaskName), 1)
            }
        }
    }else {console.log("task is undefined");}

    //Кнопка скачивания
    var upper = Q(UPPER)[0];
    var downloadButton = document.createElement("button");
    downloadButton.style.position="absolute";
    downloadButton.classList.add("download");
    downloadButton.style.right="714px";
    downloadButton.style.top="0px";
    downloadButton.style.width="48px";
    downloadButton.style.height="48px";
    downloadButton.style.backgroundSize="auto";
    downloadButton.style.borderWidth="initial";
    downloadButton.style.borderStyle="none";
    downloadButton.style.borderColor="initial";
    downloadButton.style.borderImage="initial";
    downloadButton.style.background="url(https://cdn.discordapp.com/attachments/827569141782282272/833098501167906846/file_download_white_48dp.svg) 0% 0% / contain no-repeat";
    downloadButton.style.cursor="pointer";
    downloadButton.onclick=function(){
        var link = document.createElement('a');
        link.download = 'filename.png';
        link.href = Q(DCANV)[0].toDataURL();
        link.click();
    };
    upper.appendChild(downloadButton);

    //Обновление элемента над которым находится курсор
    window.addEventListener("pointerover", (e)=>{curElementOverCursor=e.path[0]})

    //Доктор Стрендж
    var t1 = Q(TBAR)[0];
    var undoButton = Q("tool undo")[0];
    var redoButton = Q("tool redo")[0];
    t1.onwheel=(e)=>{
        if (e.deltaY>0){undoButton.click();} else {redoButton.click();}
    }

    //Q("jsx-4289504161 small")[0].removeEventListener("click", ()=>{setTimeout(()=>{mainDrawFunc}, 20)});
}

//Изменение палитры
function palitEdit(){
    var palitra = Q(PALIT)[1];
    var nColor = Q("  color")[0].cloneNode(true);
    var allColors = Q("  color");

    //Удаление предыдущих цветов
    while (palitra.children[1].tagName != "INPUT") {
        palitra.removeChild(palitra.firstChild);
    }

    if (Q("  color").length != 36){
        var target = Q(PALIT)[0].getElementsByTagName("input")[0];
        var colorList = [[0, 0, 0], [34, 177, 76], [47, 253, 57], [51, 51, 51], [0, 81, 36], [74, 255, 169], [125, 125, 125], [255, 255, 125], [0, 9, 168], [175, 175, 175], [255, 242, 0], [0, 0, 255], [255, 255, 255], [255, 201, 14], [79, 83, 255], [90, 7, 12], [191, 191, 0],[87, 129, 215], [171, 14, 21], [119, 92, 0], [73, 189, 218], [255, 0, 0], [255, 210, 166], [153, 217, 234], [239, 71, 80], [254, 135, 48], [180, 3, 175], [245, 80, 127], [224, 96, 1], [163, 73, 164], [244, 128, 134], [80, 43, 18], [251, 30, 245], [249, 185, 188], [54, 29, 12], [253, 162, 251]];
        if (Q("jsx-1307288772 book dark")[0] != undefined){colorList[12]==[0,0,0];}
        for (let i=0; i<colorList.length; i++){
            let newColor = nColor.cloneNode(true);
            let color = colorList[i];
            newColor.style.backgroundColor=`rgb(${color[0]},${color[1]},${color[2]})`;
            newColor.onclick=()=>{setColor(rgb2hex(color[0], color[1], color[2]));};
            target.insertAdjacentElement('beforebegin', newColor);
        }
        palitra.removeChild(palitra.firstChild);
    }
}

//Эвенты клавиатуры
function drawKeys (evt){
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt && document.URL.indexOf("draw") != -1) {
        if (evt.key === "Escape" || evt.key === "Esc" || evt.keyCode === 27) {
            if (Q("act").length != 0 || Q("act1").length != 0){
                clearActiveelements();
            } else { /*moveCanvases()*/}
        }

        if (evt.key === "L" || evt.key === "l" || evt.keyCode === 76 || evt.code === "KeyL") {
            var loopaButton = Q("loopa")[0];
            loopaButton.click();
        }

        if (evt.key === "F2" || evt.key === "f2" || evt.keyCode === 113 || evt.code === "F2") {

        }

        if ((evt.key === "0" || evt.keyCode === 48) && evt.ctrlKey){
            var url = document.querySelector("#content > div.rightpanel > div:nth-child(1) > input.urlbg").value;

            var img = new Image();
            //const img = document.createElement('img');

            img.src = url;
            img.crossOrigin = "Anonymous";

            //var canvas = document.createElement('canvas');
            var context = canvas0000.getContext('2d');
            //
            canvas0000.width=192;
            canvas0000.height=110;

            img.onload=function(){
                alert("Loaded");
                //
                context.drawImage(img, 0, 0, 192, 110);
                globalKey=true;
            }

            img.onerror=function(){
                //img.src = url;
                alert("Данную картинку нельзя загрузить");
            }
        }
    };
}

//Обработка колесика
function onDrawWheel(e){
    var zoomC = Q("zoomC")[0];
    //его тут нет, а если есть то:
    if (zoomC.hidden){
        moveCanvases();
    } else {
        var newCSize = Number(zoomC.style.width.slice(0, -2));
        zoomC.style.borderColor = 'black';
        if (e.deltaY < 0 && newCSize < 800){
            zoomC.style.width = newCSize + 20 + 'px';
            zoomC.style.height = newCSize + 20 + 'px';
            zoomC.style.borderRadius = (newCSize + 20) / 2 + 'px';
            zoomOffsetY += 20;
        }
        if (e.deltaY > 0 && newCSize > 100){
            zoomC.style.width = newCSize - 20 + 'px';
            zoomC.style.height = newCSize - 20 + 'px';
            zoomC.style.borderRadius = (newCSize - 20) / 2 + 'px';
            zoomOffsetY -= 20;
        }
        var nextCSize = Number(zoomC.style.width.slice(0, -2));
        if (nextCSize == 800 || nextCSize == 100){zoomC.style.borderColor = 'red';}

        zoomC.style.top = e.clientY - zoomOffsetY + 'px';
    }
}

//Добавление пипетки по правой кнопки мыши
function drawRMBPipet(){
    var pointerCanvas = Q(PCANV)[0];
    if (pointerCanvas){
        //ПКМ ПИПЕТКА
        var canada = Q(DCANV)[0];
        var mexico = pointerCanvas;
        mexico.addEventListener('pointerdown', (e)=>{

            if (e.which == 3 || (e.which == 1 && e.altKey)){
                var rgba = canada.getContext('2d').getImageData(e.offsetX*2, e.offsetY*2, 1, 1).data;
                let r = rgba[0];
                let g = rgba[1];
                let b = rgba[2];
                let a = rgba[3];
                if (a == 0){r=255; g=255; b=255; a=255;}
                setColor(rgb2hex(r, g, b));
                setNess(100/255*a);

                setTimeout(()=>{
                    var event = new Event ('mouseup', { bubbles: true, cancelable: true});
                    pointerCanvas.dispatchEvent(event);

                    Q(UNDO)[0].click();
                }, 5);
            }
        })
    } else {alert(">pointerCanvas is undefined<");}
}

//Добавление заливки по средней кнопке мыши
function drawMiddleBucket(){
    //Заливка
    var pointerCanvas = Q(PCANV)[0];
    if (pointerCanvas){
        pointerCanvas.addEventListener("pointerdown", function(e) {
            if (e.which === 2) {
                var curButt = Q("tool sel")[0];
                var undoButt = Q(UNDO)[0];
                Q("jsx-4206980828 tool fil")[0].click();

                setTimeout(()=>{
                    undoButt.click();

                    let event = new Event('mousedown', { bubbles: true, cancelable: true} );
                    event.clientX = e.clientX;
                    event.clientY = e.clientY;
                    pointerCanvas.dispatchEvent(event);

                    event = new Event('mouseup', { bubbles: true, cancelable: true} );
                    event.clientX = e.clientX;
                    event.clientY = e.clientY;
                    pointerCanvas.dispatchEvent(event);

                    curButt.click();
                }, 10);

            }
        });
    } else {alert(">pointerCanvas is undefined<");}
}

//Изменение настроек прозрачности
function nessEdit(){
    //трекбар прозрачности
    if (!Q("ness-text").length){
        var widthinput = Q("jsx-340028725 bxopacity")[0];
        var ness = (()=>{var items = Q("jsx-340028725"); for (let i=0; i<items.length; i++){if (items[i].tagName=="INPUT"){return items[i]}}})()
        ness.step="0.01";
        ness.min="0";
        ness.style.height="150%";
        ness.style.backgroundColor="rgba(0,0,0,0)";
        ness.style.cursor = "pointer";
        var nesstext = document.createElement("input");
        nesstext.classList.add("ness-text");
        nesstext.type="text";
        nesstext.style.fontFamily='Black';
        nesstext.style.color="rgb(67, 222, 153)";
        nesstext.value="100";
        nesstext.style.width="30px";
        nesstext.style.border="thick";
        nesstext.style.maxLength=3;
        nesstext.style.textAlign="center";
        nesstext.style.fontSize="17px"
        nesstext.style.backgroundColor="rgba(100, 100, 100, 0)";
        widthinput.appendChild(nesstext);

        //Ограничение инпута прозрачности
        nesstext.oninput = function(){
            if (this.value>100){this.value=100;}
            if (this.value=="00" || this.value=="000"){this.value=0;}
            this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
        };

        ness.addEventListener("input", function(event) {
            nesstext.value =`${Math.round(ness.value*100)}`;
        })

        nesstext.addEventListener("input", function(event) {
            if (nesstext.value==""){ness.value=0}else{
                setNess(nesstext.value);
            }
        })


        //Изменение прозрачности колесиком
        var trackBarBox = Q("jsx-340028725 bxopacity")[0];
        trackBarBox.onwheel=(e)=>{
            if (Number(nesstext.value)-e.deltaY/100>100){
            } else if (Number(nesstext.value)-e.deltaY/100<0) {
            } else {
                setNess(Number(nesstext.value)+(-e.deltaY/100));
            }
        }
    }

    document.querySelector("#content > div > div > div.jsx-1562482592.center > div.jsx-1562482592.bottom > div > div.jsx-340028725.bxopacity").style.padding="0px 10px";
    document.querySelector("#content > div > div > div.jsx-1562482592.center > div.jsx-1562482592.bottom > div > div.jsx-340028725.bxopacity > span:nth-child(1)").style.margin = "5px";
    document.querySelector("#content > div > div > div.jsx-1562482592.center > div.jsx-1562482592.bottom > div > div.jsx-340028725.bxopacity > span:nth-child(3)").style.margin = "5px";
}

//Инструменты//////////////////////////////////
function addTools(){
    var toolBar = Q(TBAR)[0].firstChild;
    var pointerCanvas = Q(PCANV)[0];

    var prevElem;

    //Добавление кнопки зеркала
    addMirrorButton();

    //Добавление пипетки
    addPipetButton();

    //Добавление инструмента сглаживания
    addSmoothingTool();

    //Добавление кнопки лупы
    addLoopaButton();

    //Добавление кнопки рандома
    randomColorButton();

    //Добавление кнопки очистки
    addClearButton();

}

///////////////////////////////////tools////////////////////////////////////////

//Функционал луппы
function addLoopaButton(){
    var pointerCanvas = Q(PCANV)[0];
    var zoomC = Q("zoomC")[0];
    var toolBar = Q(TBAR)[0].firstChild;
    if (!Q("loopa").length){
        var loopaButton = document.createElement("div");
        loopaButton.classList.add(TOOL);
        loopaButton.classList.add("tool");
        loopaButton.classList.add("loopa");
        loopaButton.style.margin="0px";
        //loopaButton.style.position="relative";
        //loopaButton.style.left="56px";
        //loopaButton.style.top="-54px";
        loopaButton.onclick = function(){
            if (Q(UDC)[0].getElementsByClassName("jsx-1562482592 drawingContainer").length && !Q("jsx-1553483530 pencil").length){
                if (!loopaButton.classList.contains("act1")){
                    loopaButton.classList.add("act1");
                    loopaButton.classList.add("sel");
                    zoomCHidden = false;
                    zoomC.hidden = false;
                } else {
                    loopaButton.classList.remove("act1");
                    loopaButton.classList.remove("sel");
                    zoomCHidden = true;
                    zoomC.hidden = true;
                }
            }
        }
        toolBar.appendChild(loopaButton);
    }
}

//Функционал иструмент сглаживания
var startPoint, endPoint;
var onWorkingKey = false;
var sLevel = localStorage.getItem("sLevel");
if (!sLevel){sLevel=1;}
var firstTimeAddWindowSmooth = true;
var mapArray = [];
function addSmoothingTool(){
    mapArray = [];
    if (!Q("jsx-4206980828 tool smooth").length){
        var toolBar = Q(TBAR)[0].firstChild;

        var smoothBorder = document.createElement("div");
        smoothBorder.width = 300;
        smoothBorder.height = 100;
        smoothBorder.style.position = "relative";
        smoothBorder.style.top = "200px;";
        smoothBorder.style.display = "flex";
        smoothBorder.style.width = "auto";
        smoothBorder.style.height = "auto";
        smoothBorder.style.right="0px"; //->210px
        toolBar.appendChild(smoothBorder);

        var degRangeBorder = document.createElement("div");
        degRangeBorder.classList.add(TOOL);
        degRangeBorder.classList.add("deg-range-border");
        degRangeBorder.style.width="230px";
        degRangeBorder.style.height="auto";
        degRangeBorder.style.border="2px solid black";
        degRangeBorder.style.borderRadius="5px";
        degRangeBorder.style.margin="0px 5px 0px 0px";
        degRangeBorder.style.backgroundColor = "rgba(94, 25, 51, 0.5)";
        degRangeBorder.style.zIndex = "10";
        degRangeBorder.style.position = "absolute";
        degRangeBorder.style.right="53px";
        degRangeBorder.style.display="none";


        degRangeBorder.onmouseleave=()=>{
            setTimeout(()=>{if ([
                smoothButton,
                sCounter,
                degRange1,
                degRangeBorder,
            ].indexOf(curElementOverCursor) != -1){
            } else {
                degRangeBorder.style.display="none";
            }
                           }, 1000)
        }

        var degRange1 = document.createElement('input');
        degRange1.classList.add("here-degrange");
        degRange1.type = "range";
        degRange1.min = 1;
        degRange1.max = 10;
        degRange1.step = 1;
        degRange1.value=String(sLevel);
        degRange1.style.margin="23px 5px";
        degRange1.style.width="190px";
        degRange1.style.height="4px";
        degRange1.style.borderRadius="10px";
        degRange1.oninput=()=>{
            sCounter.innerText = degRange1.value
            sLevel = Number(degRange1.value);
            localStorage.setItem("sLevel", sLevel);
        };

        var sCounter = document.createElement("div");
        sCounter.innerText = String(sLevel);
        sCounter.style.fontFamily="Black";
        sCounter.style.color="rgb(67, 222, 153)";
        sCounter.style.width="30px";
        sCounter.style.border="thick";
        sCounter.style.textAlign="center";
        sCounter.style.fontSize="17px";
        sCounter.style.backgroundColor="rgba(100, 100, 100, 0)";
        sCounter.style.position="absolute";
        sCounter.style.right="5px";
        sCounter.style.margin="15px 0px 0px 0px";

        degRangeBorder.appendChild(sCounter);
        degRangeBorder.appendChild(degRange1);
        smoothBorder.appendChild(degRangeBorder);

        var smoothButton = document.createElement("div");
        smoothButton.classList.add(TOOL);
        smoothButton.classList.add("tool");
        smoothButton.classList.add("smooth");
        smoothButton.style.backgroundColor="#ff000030";
        smoothButton.style.margin="0px";

        sLevel = Number(degRange1.value);

        smoothButton.onmouseenter=()=>{
            degRangeBorder.style.display="";
            Q("color-gradient")[0].style.display="none";
        }

        smoothButton.onmouseleave=()=>{
            setTimeout(()=>{if ([
                smoothButton,
                sCounter,
                degRange1,
                degRangeBorder,
            ].indexOf(curElementOverCursor) != -1){
            } else {
                degRangeBorder.style.display="none";
            }
                           }, 1000)
        }

        smoothBorder.appendChild(smoothButton);

        if (firstTimeAddWindowSmooth){
            window.addEventListener('pointerup', (e)=>{
                if (onWorkingKey){
                    onWorkingKey=false;
                    setTimeout(()=>{
                        Q(UNDO)[0].click();
                        endPoint = [e.clientX, e.clientY];
                        clientMouseDown(startPoint[0], startPoint[1]);
                        clientMouseMove(startPoint[0], startPoint[1]);
                        for (let i=0; i<mapArray.length - sLevel; i+=sLevel) {
                            let point = mapArray[i];
                            clientMouseMove(point[0], point[1]);
                        }
                        clientMouseMove(endPoint[0], endPoint[1]);
                        clientMouseUp(endPoint[0], endPoint[1]);
                        mapArray=[];
                    }, 50);
                }
            })

            window.addEventListener('pointermove', (e)=>{
                if (onWorkingKey){
                    mapArray.push([e.clientX, e.clientY]);
                }})
        }
        firstTimeAddWindowSmooth = false;
    }

    degRange1 = Q("here-degrange")[0];

    var pointerCanvas = Q(PCANV)[0];
    pointerCanvas.addEventListener('pointerdown', (e)=>{
        var pipetTool = Q("jsx-4206980828 tool pipet act sel")[0];
        var bucketTool = Q("jsx-4206980828 tool fil sel")[0];
        if (Number(degRange1.value)!=1 && !bucketTool && e.which != 2 && !onWorking && e.which != 3 && !pipetTool){
            onWorkingKey = true;
            startPoint = [e.clientX, e.clientY];
        }
    })

//     pointerCanvas.addEventListener('pointerup', (e)=>{
//         setTimeout( function(){
//         if (onWorkingKey){
//             Q(UNDO).click();
//             onWorkingKey=false;
//             endPoint = [e.clientX, e.clientY];
//             clientMouseDown(startPoint[0], startPoint[1]);
//             clientMouseMove(startPoint[0], startPoint[1]);
//             for (let i=0; i<mapArray.length; i+=sLevel) {
//                 let point = mapArray[i];
//                 clientMouseMove(point[0], point[1]);
//             }
//             clientMouseMove(endPoint[0], endPoint[1]);
//             clientMouseUp(endPoint[0], endPoint[1]);
//             mapArray=[];
//         }}, 20 );
//     })

}

//Функционал пипеточного элемента
function addTitle(){
    if (Q("pipet-title")[0]){return 0};
    var pointerCanvas = Q(PCANV)[0];
    var canada = Q(DCANV)[0];
    var curc = document.createElement("div");
    curc.style.height="10px";
    curc.style.width="10px";
    curc.style.border="1px solid black";
    var title = document.createElement("div");
    title.classList.add("pipet-title");
    title.style.fontFamily="Black";
    title.style.width="auto";
    title.style.height="auto";
    title.style.border="1px solid black";
    title.style.position="absolute";
    title.style.backgroundColor="rgb(255, 239, 181)";
    title.style.padding="1px 5px";
    title.hidden=true;
    pointerCanvas.addEventListener("pointermove", (e)=>{
        if (!title.hidden){
            var rgba = canada.getContext('2d').getImageData(e.offsetX*2, e.offsetY*2, 1, 1).data;
            title.innerText = ` ${rgba} `;
            title.style.left=e.clientX+20 + "px";
            title.style.top=e.clientY+20 + "px";
        }
    })
    pointerCanvas.addEventListener("pointerleave", (e)=>{
        title.hidden=true;
    })
    pointerCanvas.addEventListener("pointerenter", (e)=>{
        title.hidden=false;
    })
    title.appendChild(curc);
    document.querySelector("#__next").appendChild(title);
}

//Функционал пипетки
var prevElem;
function addPipetButton(){
    var toolBar = Q(TBAR)[0].firstChild;
    var pointerCanvas = Q(PCANV)[0];
    var canada = Q(DCANV)[0];

    if (Q("pipet")[0] == undefined && pointerCanvas){
        var pipetButton = document.createElement("div");
        pipetButton.classList.add(TOOL);
        pipetButton.classList.add("tool");
        pipetButton.classList.add("pipet");
        pipetButton.style.margin="0px";

        toolBar.appendChild(pipetButton);

        pipetButton.onclick = function(){
            if (!Q("jsx-1553483530 pencil").length){
                addTitle();
                prevElem = Q("tool sel")[0];
                prevElem.classList.remove("sel");
                pipetButton.classList.add("act");
                pipetButton.classList.add("sel");
            }
        };


        toolBar.addEventListener('click', (e)=>{
            if (e.target != pipetButton && Q("act").length != 0 && !e.target.classList.contains("undo")){
                document.querySelector("#__next").removeChild(Q("pipet-title")[0]);
                prevElem.classList.add("sel");
                pipetButton.classList.remove("act");
                pipetButton.classList.remove("sel");
            }
        });


    } else { console.log("PIP-button already exists or pointerCanvas is undefined") }

    pointerCanvas.addEventListener('pointerdown', (e)=>{
        if (Q("act").length != 0 && e.which == 1){
            var rgba = canada.getContext('2d').getImageData(e.offsetX*2, e.offsetY*2, 1, 1).data;
            let r = rgba[0];
            let g = rgba[1];
            let b = rgba[2];
            let a = rgba[3];
            if (a == 0){r=255; g=255; b=255; a=255;}
            setColor(rgb2hex(r, g, b));
            setNess(100/255*a);
            setTimeout(()=>{
                var event = new Event ('mouseup', { bubbles: true, cancelable: true});
                pointerCanvas.dispatchEvent(event);

                Q(UNDO)[0].click();
            }, 50)
        }
    })

}

//Кнопка рандомного цвета
var colorInput1;
var colorInput2;
var defaultButton;
var uKey = false;
function randomColorButton(){
    var toolBar = Q(TBAR)[0].firstChild;
    if (!Q("rand").length){
        var gradientButton = document.createElement("div");
        gradientButton.classList.add(TOOL);
        gradientButton.classList.add("tool");
        gradientButton.classList.add("rand");
        gradientButton.style.margin="7px 0px 0px 0px";
        toolBar.appendChild(gradientButton);

        var smoothBorder = document.createElement("div");
        smoothBorder.width = 300;
        smoothBorder.height = 100;
        smoothBorder.style.position = "relative";
        smoothBorder.style.top = "200px;";
        smoothBorder.style.display = "flex";
        smoothBorder.style.width = "auto";
        smoothBorder.style.height = "auto";
        smoothBorder.style.right="0px"; //->210px
        toolBar.appendChild(smoothBorder);

        var degRangeBorder = document.createElement("div");
        degRangeBorder.classList.add(TOOL);
        degRangeBorder.classList.add("color-gradient");
        degRangeBorder.style.width="200px";
        degRangeBorder.style.height="auto";
        degRangeBorder.style.border="2px solid black";
        degRangeBorder.style.borderRadius="5px";
        degRangeBorder.style.margin="0px 5px 0px 0px";
        degRangeBorder.style.backgroundColor = "rgba(94, 25, 51, 0.5)";
        degRangeBorder.style.zIndex = "10";
        degRangeBorder.style.position = "absolute";
        degRangeBorder.style.right="58px";
        degRangeBorder.style.display="none";
        degRangeBorder.style.top="7px";

        colorInput1 = document.createElement('input');
        colorInput1.classList.add("color-input1");
        colorInput1.type="color";
        colorInput1.value="#000000";
        colorInput1.style.border="2px solid rgba(255, 255, 255, 0.8)";
        colorInput1.style.borderRadius="5px";
        colorInput1.style.width="82px";
        colorInput1.style.height="32px";
        colorInput1.style.cursor="pointer";
        colorInput1.style.appearance="none";
        colorInput1.style.background="none";
        colorInput1.style.margin="5px";
        colorInput1.style.backgroundColor="#000000";
        colorInput1.oninput=()=>{colorInput1.style.backgroundColor=colorInput1.value;};
        degRangeBorder.appendChild(colorInput1);

        colorInput2 = document.createElement('input');
        colorInput2.classList.add("color-input1");
        colorInput2.type="color";
        colorInput2.value="#FFFFFF";
        colorInput2.style.border="2px solid rgba(255, 255, 255, 0.8)";
        colorInput2.style.borderRadius="5px";
        colorInput2.style.width="82px";
        colorInput2.style.height="32px";
        colorInput2.style.cursor="pointer";
        colorInput2.style.appearance="none";
        colorInput2.style.background="none";
        colorInput2.style.margin="5px";
        colorInput2.style.backgroundColor="#FFFFFF";
        colorInput2.oninput=()=>{colorInput2.style.backgroundColor=colorInput2.value;};
        degRangeBorder.appendChild(colorInput2);

        defaultButton = document.createElement('button');
        defaultButton.style.fontFamily="Black";
        defaultButton.style.width="190px";
        defaultButton.style.height="";
        defaultButton.innerText="print";
        defaultButton.style.fontSize="18px";
        defaultButton.style.margin="5px 5px 10px 5px";
        defaultButton.style.borderRadius="5px";
        defaultButton.style.height="40px";
        defaultButton.style.color="#301A6B";
        defaultButton.style.borderColor="rgba(0, 0, 0, 0)";
        defaultButton.style.boxShadow="0px 6px 0px 0px #301a6b";
        degRangeBorder.appendChild(defaultButton);

        defaultButton.onmouseenter=function(){
            defaultButton.style.backgroundColor="#cbb6e9";
        };
        defaultButton.onmouseleave=function(){
            defaultButton.style.backgroundColor="#ffffff";
            defaultButton.style.boxShadow="0px 6px 0px 0px";
            defaultButton.style.margin="5px 5px 10px 5px";
        };
        defaultButton.onmousedown=function(){
            defaultButton.style.boxShadow="0px 2px 0px 0px";
            defaultButton.style.margin="10px 5px 5px 5px";
        };
        defaultButton.onmouseup=function(){
            defaultButton.style.boxShadow="0px 6px 0px 0px";
            defaultButton.style.margin="5px 5px 10px 5px";
        };


        degRangeBorder.onmouseleave=()=>{
            setTimeout(()=>{if ([
                gradientButton,
                degRangeBorder,
                colorInput1,
                colorInput2,
                defaultButton
            ].indexOf(curElementOverCursor) != -1){
            } else {
                degRangeBorder.style.display="none";
            }
                           }, 1000)
        }

        smoothBorder.appendChild(degRangeBorder);

        gradientButton.onmouseenter=()=>{
            if(Q("jsx-1553483530 pencil").length){return;}
            degRangeBorder.style.display="";
            //             Q("deg-range-border")[0].style.display="none";
            //             var N = new Set(Q(DCANV)[0].getContext("2d").getImageData(0, 0, 1516, 848).data)
            //             if (N.size != 1){
            //                 defaultButton.style.cursor="no-drop";
            //                 defaultButton.title="Нельзя использовать если что-то уже нарисовано";
            //                 defaultButton.style.opacity=0.5;
            //                 uKey=true;
            //             } else {
            defaultButton.style.cursor="";
            defaultButton.title="";
            defaultButton.style.opacity=1;
            uKey=false;
            //            }
        }

        gradientButton.onmouseleave=()=>{
            setTimeout(()=>{if ([
                gradientButton,
                degRangeBorder,
                colorInput1,
                colorInput2,
                defaultButton
            ].indexOf(curElementOverCursor) != -1){
            } else {
                degRangeBorder.style.display="none";
            }
                           }, 1000)

        }


    }

    var hc = document.createElement("canvas");
    hc.width=1;
    hc.height=424;
    function changeColor2(i, c1, c2){
        var ctx=hc.getContext("2d");
        var my_gradient=ctx.createLinearGradient(0,0,1,424);
        my_gradient.addColorStop(0,c1);
        my_gradient.addColorStop(1,c2);
        ctx.fillStyle=my_gradient;
        ctx.fillRect(0,0,1,424);
        var context = hc.getContext("2d");
        var c = context.getImageData(0, i, 1, 1).data;
        setColor(rgbToHex(c[0], c[1], c[2]));
    }
    var canvas = Q(PCANV)[0];
    var rect = canvas.getBoundingClientRect();
    var x0 = rect.x;
    var x1 = rect.x+rect.width;
    var y0 = rect.y;
    var coef = rect.height/424;

    defaultButton.onclick=()=>{
        if (uKey){return;}
        Q("jsx-4206980828 tool pen")[0].click();
        for (let i=0;i<424;i++){
            setTimeout(()=>{
                changeColor2(i, colorInput1.value, colorInput2.value)
                mouseDown(x0, y0+i*coef);
                mouseMove(x0, y0+i*coef);
                mouseMove(x1, y0+i*coef);
                mouseUp();
            }, 0);
        }
    }

    function mouseDown(x, y){
        let event = new Event('mousedown', { bubbles: true, cancelable: true} );
        event.clientX=x;
        event.clientY=y;
        canvas.dispatchEvent(event);
    }

    function mouseMove(x, y){
        let event = new Event('mousemove', { bubbles: true, cancelable: true} );
        event.clientX=x;
        event.clientY=y;
        canvas.dispatchEvent(event);
    }

    function mouseUp(){
        var event = new Event('mouseup', { bubbles: true, cancelable: true} );
        canvas.dispatchEvent(event);
    }
}

/////////////////////////////////

//Функционал кнопки зеркала
function addMirrorButton(){
    var toolBar = Q(TBAR)[0].firstChild;
    if (!Q("miror").length){
        var mirorButton = document.createElement("div");
        mirorButton.classList.add(TOOL);
        mirorButton.classList.add("tool");
        mirorButton.classList.add("miror");

        mirorButton.onclick=()=>{
            if (!Q("jsx-1553483530 pencil").length){
                if (Q("miror sel").length == 0){
                    mirorButton.classList.add("sel");
                    mirorButton.classList.add("act1");
                    updateMirrorLine();
                    document.querySelector("#content > div.rightpanel > div:nth-child(2)").style.opacity = 1;
                    Q("rightpanel")[0].style.right="0px";
                    document.querySelector("#content > div.rightpanel > div:nth-child(2)").style.animation="1s linear 0s normal none running here";
                } else {
                    mirorButton.classList.remove("sel");
                    clearMidCanvas();
                    mirorButton.classList.remove("act1");
                    Q("rightpanel")[0].style.right="-220px";
                    document.querySelector("#content > div.rightpanel > div:nth-child(2)").style.opacity = 0.5;
                    document.querySelector("#content > div.rightpanel > div:nth-child(2)").style.animation="";
                }
            }
        }

        toolBar.appendChild(mirorButton);
    }
}

//Функции зеркала
var onWorking = false;
function addMirrorBase(){
    var pointerCanvas = Q(PCANV)[0];
    var mirrorCanvas = Q(DCANV)[0].cloneNode();
    mirrorCanvas.classList.remove(DCANV);
    mirrorCanvas.classList.add("mirror-canvas");
    var ctx = mirrorCanvas.getContext("2d");
    ctx.fillStyle = "rgba(255, 0, 0, 0.9)";
    mirrorCanvas.style.width="758px";
    mirrorCanvas.style.height="424px";
    mirrorCanvas.style.position="fixed";
    pointerCanvas.insertAdjacentElement('beforeBegin', mirrorCanvas);

    var evttCanvas = pointerCanvas;
    function mouseDown(x, y){
        let event = new Event('mousedown', { bubbles: true, cancelable: true} );
        event.clientX=x;
        event.clientY=y;
        evttCanvas.dispatchEvent(event);
    }

    function mouseMove(x, y){
        let event = new Event('mousemove', { bubbles: true, cancelable: true} );
        event.clientX=x;
        event.clientY=y;
        evttCanvas.dispatchEvent(event);
    }

    function mouseUp(){
        var event = new Event('mouseup', { bubbles: true, cancelable: true} );
        evttCanvas.dispatchEvent(event);
    }


    function drawHow(){
        var pX = rect.x;
        var pY = rect.y;
        mouseDown(pX+arr[0][0], pY+arr[0][1]);
        arr.forEach(function (point){
            mouseMove(pX+point[0], pY+point[1]);
        })
        mouseUp();
    }

    var key = false;
    var arr = [];
    var centerL;
    var okey;
    var rect;
    var againCanvas = Q("mirror-canvas")[0];
    var kotik = againCanvas.getContext("2d");

    evttCanvas.addEventListener('pointerdown', (e)=>{
        var smoothingTool = Q("jsx-4206980828 tool smooth act1")[0];
        if (!onWorking && Q("miror sel").length != 0 && !Q("jsx-4206980828 tool pipet act sel").length && e.which == 1){
            rect = evttCanvas.getBoundingClientRect();
            let relX = e.clientX - rect.x;
            let relY = e.clientY - rect.y;
            arr.splice(0, 0, glass([relX, relY])); // Запись точек относительно холста
            key = true;
        }
    })

    Q("screen")[0].addEventListener('pointermove', (e)=>{
        if (key){
            let relX = e.clientX - rect.x;
            let relY = e.clientY - rect.y;
            arr.splice(0, 0, glass([relX, relY]));
        }
    })


    window.addEventListener('pointerup', (e)=>{
        setTimeout(()=>{
            if (key && Q("miror sel").length != 0){
                if (sLevel != 1){
                    var p1 = arr[0];
                    var p2 = arr[arr.length - 1];
                    var newArray = [p1];
                    for (let i=0; i<arr.length; i+=sLevel){
                        newArray.push(arr[i]);
                    }
                    newArray.push(p2);
                    arr=newArray;
                };
                onWorking=true;
                key = false;
                drawHow();
                ///mouseMove();
                arr = [];
                onWorking=false;
                clientMouseMove(e.clientX, e.clientY);
            }
        }, 10);
    })
}

////////////////////////////////

//Функционал кнопки очистки
var clearButton;
function addClearButton(){
    var toolBar = Q(TBAR)[0].firstChild;
    if (!Q("clear").length){
        clearButton = document.createElement("div");
        clearButton.classList.add(TOOL);
        clearButton.classList.add("tool");
        clearButton.classList.add("clear");
        clearButton.style.margin="7px 0px 0px";
        toolBar.appendChild(clearButton);
    }
    clearButton.onclick=()=>{
        var pointerCanvas = Q(PCANV)[0];
        var rect = pointerCanvas.getBoundingClientRect();
        var x0 = rect.x;
        var y0 = rect.y;
        var x1 = rect.x + rect.width;
        var y1 = rect.y + rect.height;
        var beforeColor = (()=>{var items = Q(PALIT); for (let i=0; i<items.length; i++){if (items[i].tagName=="INPUT"){return items[i]}}})().value;
        var beforeElement = Q("tool sel")[0];
        var rectButton = Q("jsx-4206980828 tool rec")[0];
        rectButton.click();
        setColor("#ffffff");
        clientMouseDown(x0, y0);
        clientMouseMove(x1, y1);
        clientMouseUp(x1, y1);
        setColor(beforeColor);
        beforeElement.click();
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var blackList = [];
var alreadyKey = false;
var loopaKey = false;


function mainDrawFunc(){
    console.log("draw");
    //Дебаг
    if (document.URL.indexOf("draw") == -1){return};
    //Добавление боковой панели
    createSizePull();
    //Добавление зума
    addZoom(); //Вызывается через unhide элемента класса zoomC
    //Изменение дизайна
    drawStyleChange();
    //Изменение функционала первого уровня
    if (firstLevelFunctions()){return};
    //Изменение палитры
    palitEdit();
    //Блок зума
    //var scale = document.querySelector("#content > div.jsx-2562723607.jsx-3822683434.screen.fade-enter-done").style.transform;
    //globalScale=Number(scale.split("(")[1].slice(0, -1));
    //let supScale;
    //let curScale;
    ///////////////////VIPER/////////////////////
    //Q("jsx-340028725 thickness")[0].click();
    /////////////////////////////////////////////
    //Обработка клавиатуры
    document.onkeydown = drawKeys;
    //Вилинговое увеличение экрана
    var pointerCanvas = Q(PCANV)[0];// <- самый верхний холст
    pointerCanvas.onwheel=onDrawWheel;
    //Изменение настроек прозрачности
    nessEdit();
    //ПКМ Пипетка
    drawRMBPipet();
    //СКМ Заливка
    drawMiddleBucket();
    //Добавление инструментов;
    addTools();
    //Добавление блоков функционала инструментов
    //Блок функционала зеркала
    addMirrorBase();
    //Активация сглаживания
    debugName();
}

function waitVideo(){
    document.querySelector("#content > div.jsx-2562723607.jsx-3712514527.screen.fade-enter-done > div > div.jsx-1671937317.center > p").innerText="ЖДЕМ ОКОНЧАНИЯ ИГРЫ, А ПОКА ЧТО МОЖЕТЕ НАСЛАДИТЬСЯ ПРИЯТНОЙ МУЗЫКОЙ";

    var del = document.querySelector("#content > div.jsx-2562723607.jsx-3822683434.screen.fade-enter-done > div > div.jsx-1671937317.center > div");

    var video = document.createElement("iframe");
    video.width="634";
    video.height="358";

    Q("jsx-1671937317 lottie")[0].parentNode.removeChild(Q("jsx-1671937317 lottie")[0]);

    var videoLink = "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1";

    video.src=videoLink;

    video.title="YouTube video player";
    video.frameborder="0";
    video.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

    document.querySelector("#content > div.jsx-2562723607.jsx-3712514527.screen.fade-enter-done > div > div.jsx-1671937317.center > h3").insertAdjacentElement('beforeBegin', video);

    video.style.border="20px";
    video.style.borderRadius="10px";
    video.style.boxShadow="inset 0px 10px 0px 0px rgb(0 0 0 / 50%), 0px 20px 20px 0px rgb(0 0 0 / 55%)";
}

var globalX=0;
var globalY=0;


function asyncDraw(){
    if (globalY < 128 && globalKey){
        if (globalX < 192){
            globalX++;
            let curPix = getPix(globalX, globalY, canvas0000);
            let r = curPix[0];
            let g = curPix[1];
            let b = curPix[2];
            setColor(rgb2hex(r, g, b));
            draw(globalX*5, globalY*5)
        }else{globalY++; globalX=0;}
    }else{globalX=0; globalY=0; globalKey=false;}
}

function getCookieDict(){
    var dict = {};
    var c = document.cookie;
    var arr = c.split(';');

    for ( let item=0; item<arr.length; item++ ) {
        let newArr = arr[item].split('=');
        dict[newArr[0].replace(' ','')]=newArr[1];
    }
    return dict
}

function debagDrawinfContainerOnExit(){
    try{
        Q("jsx-1562482592 drawingContainer")[0].parentNode.removeChild(Q("jsx-1562482592 drawingContainer")[0]);
        Q("class100")[0].parentNode.removeChild(Q("class100")[0]);
    } catch{};
}

function moveCanvases(){
    var nWindow = document.querySelector("#content");
    var nnWindow = Q(UDC)[0];
    var drawContainer = Q("jsx-1562482592 drawingContainer")[0];
    var contCanvases = drawContainer.children;
    if (Q(UDC)[0].children.length > 0){
        drawContainer.parentNode.removeChild(drawContainer);
        drawContainer.style.position="absolute";
        drawContainer.style.left="0px";
        for (let i=0; i<contCanvases.length; i++){
            contCanvases[i].style.width=`${window.innerWidth}px`;
            contCanvases[i].style.height=`${window.innerHeight}px`;
            contCanvases[i].style.zIndex=2;
        }
        var whiteZone=document.createElement("div");
        whiteZone.classList.add("class100");
        whiteZone.style.backgroundColor="white";
        whiteZone.style.width=`${window.innerWidth}px`;
        whiteZone.style.height=`${window.innerHeight}px`;
        whiteZone.style.position="absolute";
        whiteZone.style.zIndex=1;
        whiteZone.style.backgroundImage=Q(UDC)[0].style.backgroundImage;
        nWindow.appendChild(whiteZone);
        nWindow.appendChild(drawContainer);
    } else {
        drawContainer.style.left="";
        for (let i=0; i<contCanvases.length; i++){
            contCanvases[i].style.width=`758px`;
            contCanvases[i].style.height=`424px`;
            contCanvases[i].style.zIndex="";
        }
        Q("class100")[0].parentNode.removeChild(Q("class100")[0]);
        nWindow.removeChild(drawContainer);
        nnWindow.appendChild(drawContainer);
    }
}

//window.oncontextmenu=()=>{
//    moveCanvases();
//}

//Я и так знаю что делает эта функция, а значит это читает кто-то другой
window.addEventListener('resize', function(event){
    /*
    var drawContainer = Q("jsx-1562482592 drawingContainer")[0];
    if (drawContainer){
        var anCanvases = drawContainer.children;
        var newArray = [].slice.call(anCanvases);
        newArray.push(Q("class100")[0]);

        if (Q(UDC)[0].getElementsByClassName("jsx-1562482592 drawingContainer").length == 0){
            for (let i=0; i<newArray.length; i++){
                newArray[i].style.width=`${window.innerWidth}px`;
                newArray[i].style.height=`${window.innerHeight}px`;
            }
        }
    }*/
})


function deletBanner(){
    var banner = document.querySelector("#__next > div.jsx-4127328682.banner");
    if (banner != null){banner.parentNode.removeChild(banner)};
}

function dialogWindow(title, text, funcYes, funcNo=()=>{}){
    var d=document.createElement('div');
    d.style.position="absolute";
    d.style.display="flex";
    d.style.inset="0px";
    d.style.backgroundColor="rgba(0, 0, 0, .8)";
    d.style.justifyContent="center";
    d.style.alignItems="center";
    document.querySelector("body").appendChild(d);

    var al=document.createElement('div');
    al.style.position="relative";
    al.style.display="flex";
    al.style.flexDirection="column";
    al.style.alignItems="center";
    al.style.webkitBoxAlign="center";
    al.style.backgroundColor="rgb(255, 255, 255)";
    al.style.padding="25px 30px";
    al.style.borderRadius="12px";
    d.appendChild(al);

    var titleEl = document.createElement('div');
    titleEl.style.fontFamily="Black";
    titleEl.style.fontSize="24px";
    titleEl.style.color="rgb(48, 26, 107)";
    titleEl.style.textAlign="center";
    titleEl.style.lineHeight="29px";
    titleEl.style.textTransform="uppercase";
    titleEl.innerText=title;
    al.appendChild(titleEl);

    var warnigIcon = document.createElement('figure');
    warnigIcon.style.width="111px";
    warnigIcon.style.height="105px";
    warnigIcon.style.margin="20px 0px";
    warnigIcon.style.backgroundImage='url("/images/ic_alert.svg")';
    warnigIcon.style.backgroundPosition="center center";
    al.appendChild(warnigIcon);

    var nText = document.createElement('p');
    nText.style.width="260px";
    nText.style.fontFamily="Bold";
    nText.style.fontSize="17px";
    nText.style.color="rgb(68, 68, 68)";
    nText.style.letterSpacing="1px";
    nText.style.textAlign="center";
    nText.style.lineHeight="16px";
    nText.innerText=text;
    al.appendChild(nText);

    var buttonBox = document.createElement('span');
    buttonBox.style.margin="20px 0px 0px";
    al.appendChild(buttonBox);

    var yesButton = document.createElement('button');
    yesButton.style.margin="0px 8px";
    yesButton.style.cursor="pointer";
    yesButton.style.border="none";
    yesButton.style.backgroundColor="rgb(86, 53, 220)";
    yesButton.style.borderRadius="7px";
    yesButton.style.width="160px";
    yesButton.style.height="42px";
    yesButton.style.fontFamily="Black";
    yesButton.style.fontSize="17px";
    yesButton.style.color="rgb(255, 255, 255)";
    yesButton.style.textAlign="center";
    yesButton.style.textTransform="uppercase";
    yesButton.innerText="Yes";
    yesButton.onmouseenter=function(){yesButton.style.backgroundColor="rgb(64, 49, 194)";};
    yesButton.onmouseleave=function(){yesButton.style.backgroundColor="rgb(86, 53, 220)";};
    yesButton.onclick=function(){
        d.parentNode.removeChild(d);
        funcYes();
    };
    buttonBox.appendChild(yesButton);

    var noButton = document.createElement('button');
    noButton.style.margin="0px 8px";
    noButton.style.cursor="pointer";
    noButton.style.border="none";
    noButton.style.backgroundColor="rgb(86, 53, 220)";
    noButton.style.borderRadius="7px";
    noButton.style.width="160px";
    noButton.style.height="42px";
    noButton.style.fontFamily="Black";
    noButton.style.fontSize="17px";
    noButton.style.color="rgb(255, 255, 255)";
    noButton.style.textAlign="center";
    noButton.style.textTransform="uppercase";
    noButton.innerText="No";
    noButton.onmouseenter=function(){noButton.style.backgroundColor="rgb(64, 49, 194)";};
    noButton.onmouseleave=function(){noButton.style.backgroundColor="rgb(86, 53, 220)";};
    noButton.onclick=function(){
        d.parentNode.removeChild(d);
        funcNo();
    };
    buttonBox.appendChild(noButton);
}

function decToHex(n){return Number(n).toString(16);}

function mainMenuTitle(){
    if (!Q("top-menu").length){
        var topMenu = document.createElement("div");
        topMenu.classList.add("top-menu");
        topMenu.style.width="auto";
        topMenu.style.height="fit-content";
        topMenu.style.display="inline-flex";
        topMenu.style.blockSize="max-content";
        topMenu.style.transformOrigin="top";
        topMenu.style.transform=Q("screen")[0].style.transform;
        window.addEventListener("resize", ()=>{
            topMenu.style.transform=Q("screen")[0].style.transform;
        })
        document.querySelector("#content").appendChild(topMenu);
        document.querySelector("#content").style.justifyContent="center";

        var settingTitle = document.createElement("div");
        settingTitle.innerText=`Settings`;
        settingTitle.style.backgroundColor="rgba(0,0,0, 0.5)";
        settingTitle.style.borderRadius="0px 0px 5px 5px";
        settingTitle.style.color="white";
        settingTitle.style.right="0px";
        settingTitle.style.fontSize="100%";
        settingTitle.style.height="15px";
        settingTitle.style.width="auto";
        settingTitle.style.fontFamily="Black";
        settingTitle.style.padding="5px 10px 3px";
        settingTitle.onclick=()=>{alert("Секция в разработке");};
        settingTitle.style.cursor="pointer";
        settingTitle.style.opacity=0.3;

        topMenu.appendChild(settingTitle);

        var telegramTitle = document.createElement("div");
        telegramTitle.title="свяжитесь со мной!"
        telegramTitle.innerText=`Telegram`;
        telegramTitle.style.backgroundColor="#17bde2";
        telegramTitle.style.borderRadius="0px 0px 5px 5px";
        telegramTitle.style.color="white";
        telegramTitle.style.right="0px";
        telegramTitle.style.fontSize="100%";
        telegramTitle.style.height="14px";
        telegramTitle.style.width="auto";
        telegramTitle.style.fontFamily="Black";
        telegramTitle.style.padding="5px 10px 3px";
        telegramTitle.onclick=()=>{ window.open("https://t.me/DoctorDeathDDracula", '_blank'); };
        telegramTitle.style.cursor="pointer";
        telegramTitle.style.margin="0px 0px 0px 7px";

        topMenu.appendChild(telegramTitle);

        var title = document.createElement("div");
        title.classList.add("title");
        title.title="Инструкция";
        title.innerText=`GarticMode By Doctor Death D. Drac v${VERSION}`;
        title.style.backgroundColor="rgba(0,0,0, 0.5)";
        title.style.borderRadius="0px 0px 5px 5px";
        title.style.color="white";
        title.style.right="0px";
        title.style.fontSize="100%";
        title.style.height="15px";
        title.style.width="auto";
        title.style.fontFamily="Black";
        title.style.padding="5px 10px 3px";
        title.style.margin="0px 7px";
        title.onclick=()=>{ if (document.URL.indexOf("ru") != -1) window.open("https://telegra.ph/Gartic-Mode---Mod-dlya-igry-garticphone-07-16", '_blank'); else window.open("https://telegra.ph/Gartic-Mod--Mod-for-the-garticphone-game-07-21", '_blank')};
        title.style.cursor="pointer";
        topMenu.appendChild(title);

        var discordTitle = document.createElement("div");
        discordTitle.title="Присоединяйтесь к русскому сообществу в дискорде!"
        discordTitle.innerText=`Discord`;
        discordTitle.style.backgroundColor="#9163ff";
        discordTitle.style.borderRadius="0px 0px 5px 5px";
        discordTitle.style.color="white";
        discordTitle.style.right="0px";
        discordTitle.style.fontSize="100%";
        discordTitle.style.height="15px";
        discordTitle.style.width="auto";
        discordTitle.style.fontFamily="Black";
        discordTitle.style.padding="5px 10px 3px";
        discordTitle.onclick=()=>{ window.open("https://bit.ly/3uZqiG7", '_blank'); };
        discordTitle.style.cursor="pointer";
        discordTitle.style.margin="0px 7px 0px 0px";
        topMenu.appendChild(discordTitle);

        var donateTitle = document.createElement("div");
        donateTitle.innerText=`Donate`;
        donateTitle.title="Поддержите мой проект";
        donateTitle.style.backgroundColor="skyblue";
        donateTitle.style.borderRadius="0px 0px 5px 5px";
        donateTitle.style.color="white";
        donateTitle.style.right="0px";
        donateTitle.style.fontSize="100%";
        donateTitle.style.height="15px";
        donateTitle.style.width="auto";
        donateTitle.style.fontFamily="Black";
        donateTitle.style.padding="5px 10px 3px";
        donateTitle.onclick=()=>{ window.open("http://bit.ly/DoctorDonation", '_blank'); };
        donateTitle.style.cursor="pointer";
        donateTitle.style.transformOrigin="top";
        donateTitle.style.margin="0px 7px 0px 0px";
        topMenu.appendChild(donateTitle);

        var hideButton = document.createElement("div");
        hideButton.k = !1;
        hideButton.innerText="_";
        hideButton.style.color="#FFF";
        hideButton.style.backgroundColor="rgba(0, 0, 0, 0.5)";
        hideButton.style.height="15px";
        hideButton.style.width="auto";
        hideButton.style.borderRadius="0px 0px 5px 5px";
        hideButton.style.fontFamily="Black";
        hideButton.style.padding="5px 10px 3px";
        hideButton.style.cursor="pointer";
        hideButton.onclick=()=>{
            if (hideButton.k){
                settingTitle.style.opacity=1;
                donateTitle.style.opacity=1;
                title.style.opacity=1;
                telegramTitle.style.opacity=1;
                discordTitle.style.opacity=1;
                hideButton.k = !1;
            } else {
                settingTitle.style.opacity=0;
                donateTitle.style.opacity=0;
                title.style.opacity=0;
                telegramTitle.style.opacity=0;
                discordTitle.style.opacity=0;
                hideButton.k = !0;
            }
        }

        topMenu.appendChild(hideButton);
    }
}

var globalScale;

document.querySelector("body").style.overflow="hidden";

function backgroundUpdate(){
    let inputLink = Q("urlbg")[0];
    let degInput = Q("deginput")[0];
    let sizeInput = Q("sizeinput")[0];
    let xInput = Q("xinput")[0];
    let yInput = Q("yinput")[0];;
    let curBgStyle = Q("imgChange")[0];
    curBgStyle.innerText = `.newdiv::before {content: ''; position: absolute; width: 200%; height: 200%; top: ${yInput.value}%; left: ${xInput.value}%; z-index: -1; background: url(${inputLink.value}) 0 0 no-repeat; -webkit-transform: rotate(${degInput.value}deg); -moz-transform: rotate(${degInput.value}deg); -ms-transform: rotate(${degInput.value}deg); -o-transform: rotate(${degInput.value}deg); transform: rotate(${degInput.value}deg); background-position: center; background-size: ${sizeInput.value}%;}`;
}

function updateMirrorLine(){
    var xInput = Q("xmirror")[0];
    var yInput = Q("ymirror")[0];
    var degInput = Q("degmirror")[0];
    var middleCanvas = Q("mirror-canvas")[0];
    var context = middleCanvas.getContext("2d");

    var x0 = Number(xInput.value);
    var y0 = Number(yInput.value);
    var alpha = Number(degInput.value);

    var a = Math.cos(Math.PI/180*alpha)*2000;
    var b = Math.sin(Math.PI/180*alpha)*2000;

    var x1 = x0 + a;
    var y1 = y0 + b;
    var x2 = x0 - a;
    var y2 = y0 - b;

    context.strokeStyle = 'green';
    context.lineWidth = 2;
    context.setLineDash([30, 0]);
    context.beginPath();
    context.moveTo(x0-2000, y0);
    context.lineTo(x0+2000, y0);
    context.stroke();

    context.strokeStyle = 'red';
    context.lineWidth = 4;
    context.setLineDash([30, 10]);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function clearMidCanvas(){
    var middleCanvas = Q("mirror-canvas")[0];
    var context = middleCanvas.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, middleCanvas.width, middleCanvas.height);
    context.restore();
}

function lobbyEdit(){

}

function createSizePull(){
    if (Q("rightpanel").length != 0){return}
    var backgroundMenuKey = false;

    var rightPannel=document.createElement('div');
    rightPannel.classList.add("rightpanel");
    rightPannel.style.width='270px';
    rightPannel.style.height='auto';
    rightPannel.style.position="absolute";
    rightPannel.style.right="-220px";
    //leftPannel.style.opacity=0;
    rightPannel.style.top="50%";
    rightPannel.style.transform="translate(0px, -50%)";
    rightPannel.style.transition="all 0.5s ease-in-out 0s";
    document.querySelector("#content").appendChild(rightPannel);

    rightPannel.onmouseenter=function(){
        backgroundMenuKey=true;
        linkInput.disabled=false;
        rightPannel.style.right="0px";
    }

    rightPannel.onmouseleave=function(){
        backgroundMenuKey=false;
        setTimeout(()=>{
            if (!backgroundMenuKey && Q("miror sel").length == 0){
                linkInput.disabled=true;
                rightPannel.style.right="-220px";
            }
        }, 2000);
    }

    var mainBackImage = document.createElement('div');
    mainBackImage.style.width='200px';
    mainBackImage.style.height='auto';
    mainBackImage.style.background='rgba(255, 255, 255, 0.13)';
    mainBackImage.style.borderRadius="10px";
    //textWindow.style.position="absolute";
    //textWindow2.style.transform="translateY(-134%)";
    //textWindow.style.position="fixed";
    mainBackImage.style.border="3px rgba(255,255,255, 0.5) solid";
    mainBackImage.style.color="#ffffff";
    mainBackImage.style.fontFamily="Black";
    mainBackImage.style.textAlign="center";
    mainBackImage.style.margin="0px 10px 10px 50px";
    mainBackImage.style.letterSpacing="1px";
    mainBackImage.style.size="18px";
    mainBackImage.style.lineHeight="15px";
    rightPannel.appendChild(mainBackImage);

    var linkTitleTextInput = document.createElement('div');
    linkTitleTextInput.innerText="Фон холста";
    linkTitleTextInput.style.fontFamily='Black';
    linkTitleTextInput.style.color="rgb(255, 255, 255)";
    linkTitleTextInput.style.fontSize="15px";
    linkTitleTextInput.style.margin="5px";
    linkTitleTextInput.style.textAlign="left";
    mainBackImage.appendChild(linkTitleTextInput);

    var linkInput = document.createElement('input');
    linkInput.classList.add("urlbg");
    linkInput.type="text";
    linkInput.value='';
    linkInput.placeholder="URL";
    linkInput.style.color="white";
    linkInput.style.fontSize="20px";
    linkInput.style.backgroundColor="rgba(255, 255, 255, 0.3)";
    linkInput.style.borderRadius="5px";
    linkInput.style.border="2px solid rgba(255, 255, 255, 0.8)";
    linkInput.style.width="166px";
    linkInput.style.height="30px";
    linkInput.style.margin="5px";
    linkInput.style.fontFamily='Black';
    linkInput.style.padding="0px 10px";
    linkInput.disabled=true;
    linkInput.oninput=()=>{backgroundUpdate();};
    mainBackImage.appendChild(linkInput);

    var degInputTitle = document.createElement('div');
    degInputTitle.innerText="Угол поворота";
    degInputTitle.style.fontFamily='Black';
    degInputTitle.style.color="rgb(255, 255, 255)";
    degInputTitle.style.fontSize="15px";
    degInputTitle.style.margin="5px";
    degInputTitle.style.textAlign="left";
    mainBackImage.appendChild(degInputTitle);

    var degRange1 = document.createElement('input');
    degRange1.classList.add("deginput");
    degRange1.type = "range";
    degRange1.min = 0;
    degRange1.max = 360;
    degRange1.step = 1;
    //degRange1.value = 200;
    degRange1.value="0";
    degRange1.style.margin="10px 5px";
    degRange1.style.width="190px";
    degRange1.style.height="4px";
    //degRange1.style.heigt="15px";
    degRange1.style.borderRadius="10px";
    degRange1.oninput=()=>{backgroundUpdate();};
    mainBackImage.appendChild(degRange1);

    var sizeInputTitle = document.createElement('div');
    sizeInputTitle.innerText="Размер фона";
    sizeInputTitle.style.fontFamily='Black';
    sizeInputTitle.style.color="rgb(255, 255, 255)";
    sizeInputTitle.style.fontSize="15px";
    sizeInputTitle.style.margin="5px";
    sizeInputTitle.style.textAlign="left";
    mainBackImage.appendChild(sizeInputTitle);

    var sizeRange = document.createElement('input');
    sizeRange.classList.add("sizeinput");
    sizeRange.type = "range";
    sizeRange.min = 0;
    sizeRange.max = 200;
    sizeRange.step = 1;
    sizeRange.value = 100;
    sizeRange.style.margin="10px 5px";
    sizeRange.style.width="190px";
    sizeRange.style.height="4px";
    //degRange1.style.heigt="15px";
    sizeRange.style.borderRadius="10px";
    sizeRange.oninput=()=>{backgroundUpdate();};
    mainBackImage.appendChild(sizeRange);

    var XposInputTitle = document.createElement('div');
    XposInputTitle.innerText="Смещение по X";
    XposInputTitle.style.fontFamily='Black';
    XposInputTitle.style.color="rgb(255, 255, 255)";
    XposInputTitle.style.fontSize="15px";
    XposInputTitle.style.margin="5px";
    XposInputTitle.style.textAlign="left";
    mainBackImage.appendChild(XposInputTitle);

    var posXRange = document.createElement('input');
    posXRange.classList.add("xinput");
    posXRange.type = "range";
    posXRange.min = -150;
    posXRange.max = 50;
    posXRange.step = 1;
    posXRange.value = -50;
    posXRange.style.margin="10px 5px";
    posXRange.style.width="190px";
    posXRange.style.height="4px";
    //degRange1.style.heigt="15px";
    posXRange.style.borderRadius="10px";
    posXRange.oninput=()=>{backgroundUpdate();};
    mainBackImage.appendChild(posXRange);

    var YposInputTitle = document.createElement('div');
    YposInputTitle.innerText="Смещение по Y";
    YposInputTitle.style.fontFamily='Black';
    YposInputTitle.style.color="rgb(255, 255, 255)";
    YposInputTitle.style.fontSize="15px";
    YposInputTitle.style.margin="5px";
    YposInputTitle.style.textAlign="left";
    mainBackImage.appendChild(YposInputTitle);

    var posYRange = document.createElement('input');
    posYRange.classList.add("yinput");
    posYRange.type = "range";
    posYRange.min = -150;
    posYRange.max = 50;
    posYRange.step = 1;
    posYRange.value = -50;
    posYRange.style.margin="10px 10px 20px 5px";
    posYRange.style.width="190px";
    posYRange.style.height="4px";
    //degRange1.style.heigt="15px";
    posYRange.style.borderRadius="10px";
    posYRange.oninput=()=>{backgroundUpdate();};
    mainBackImage.appendChild(posYRange);

    var printButton = document.createElement('button');
    printButton.style.fontFamily="Black";
    printButton.style.width="190px";
    printButton.style.height="";
    printButton.innerText="print";
    printButton.style.fontSize="18px";
    printButton.style.cursor="not-allowed";
    printButton.style.margin="5px 5px 10px 5px";
    printButton.style.borderRadius="5px";
    printButton.style.height="40px";
    printButton.style.color="rgb(48 26 107 / 50%)";
    printButton.style.borderColor="rgba(0, 0, 0, 0)";
    printButton.style.boxShadow="rgb(48 26 107 / 50%) 0px 6px 0px 0px";
    printButton.style.backgroundColor="rgb(255, 255, 255)";
    mainBackImage.appendChild(printButton);

    var mirrorWindow = document.createElement('div');
    mirrorWindow.style.width='200px';
    mirrorWindow.style.height='auto';
    mirrorWindow.style.border="3px solid rgba(255, 255, 255, 0.5)";
    mirrorWindow.style.color="white";
    mirrorWindow.style.fontFamily="Black";
    mirrorWindow.style.textAlign="center";
    mirrorWindow.style.margin="10px 10px 10px 50px";
    mirrorWindow.style.letterSpacing="1px";
    mirrorWindow.style.size="18px";
    mirrorWindow.style.lineHeight="15px";
    mirrorWindow.style.padding="0px 0px";
    mirrorWindow.style.backgroundColor='rgba(255, 255, 255, 0.13)';
    mirrorWindow.style.borderRadius="10px";
    mirrorWindow.style.opacity=0.5;
    mirrorWindow.style.transition="all 0.5s ease 0s";

    mirrorWindow.onclick=()=>{
        if (Q("miror sel act1").length == 0){
            Q("miror")[0].click();
        }
    }

    rightPannel.appendChild(mirrorWindow);

    var mirrorTitle = document.createElement('div');
    mirrorTitle.innerText="Настрока зеркала";
    mirrorTitle.style.fontFamily='Black';
    mirrorTitle.style.color="rgb(255, 255, 255)";
    mirrorTitle.style.fontSize="15px";
    mirrorTitle.style.margin="5px 5px 15px 5px";
    mirrorTitle.style.textAlign="left";
    mirrorWindow.appendChild(mirrorTitle);

    var xTitle = document.createElement('div');
    xTitle.innerText="Смещение по X";
    xTitle.style.fontFamily='Black';
    xTitle.style.color="rgb(255, 255, 255)";
    xTitle.style.fontSize="15px";
    xTitle.style.margin="5px";
    xTitle.style.textAlign="left";
    mirrorWindow.appendChild(xTitle);

    var xInput = document.createElement('input');
    xInput.classList.add("xmirror");
    xInput.type = "range";
    xInput.min = 0;
    xInput.max = 1516;
    xInput.step = 1;
    xInput.value = 758;
    xInput.style.margin="10px 10px 20px 5px";
    xInput.style.width="190px";
    xInput.style.height="4px";
    xInput.style.borderRadius="10px";
    xInput.oninput=()=>{
        clearMidCanvas();
        updateMirrorLine();
    };
    mirrorWindow.appendChild(xInput);

    var yTitle = document.createElement('div');
    yTitle.innerText="Смещение по Y";
    yTitle.style.fontFamily='Black';
    yTitle.style.color="rgb(255, 255, 255)";
    yTitle.style.fontSize="15px";
    yTitle.style.margin="5px";
    yTitle.style.textAlign="left";
    mirrorWindow.appendChild(yTitle);

    var yInput = document.createElement('input');
    yInput.classList.add("ymirror");
    yInput.type = "range";
    yInput.min = 0;
    yInput.max = 848;
    yInput.step = 1;
    yInput.value = 424;
    yInput.style.margin="10px 10px 20px 5px";
    yInput.style.width="190px";
    yInput.style.height="4px";
    yInput.style.borderRadius="10px";
    yInput.oninput=()=>{
        clearMidCanvas();
        updateMirrorLine();
    };
    mirrorWindow.appendChild(yInput);

    var degTitle = document.createElement('div');
    degTitle.innerText="Наклон";
    degTitle.style.fontFamily='Black';
    degTitle.style.color="rgb(255, 255, 255)";
    degTitle.style.fontSize="15px";
    degTitle.style.margin="5px";
    degTitle.style.textAlign="left";
    mirrorWindow.appendChild(degTitle);

    var degInput = document.createElement('input');
    degInput.classList.add("degmirror");
    degInput.type = "range";
    degInput.min = 0;
    degInput.max = 180;
    degInput.step = 1;
    degInput.value = 90;
    degInput.style.margin="10px 10px 20px 5px";
    degInput.style.width="190px";
    degInput.style.height="4px";
    degInput.style.borderRadius="10px";
    degInput.oninput=()=>{
        clearMidCanvas();
        updateMirrorLine();
    };
    mirrorWindow.appendChild(degInput);

    var defaultButton = document.createElement('button');
    defaultButton.style.fontFamily="Black";
    defaultButton.style.width="190px";
    defaultButton.style.height="";
    defaultButton.innerText="default";
    defaultButton.style.fontSize="18px";
    defaultButton.style.margin="5px 5px 10px 5px";
    defaultButton.style.borderRadius="5px";
    defaultButton.style.height="40px";
    defaultButton.style.color="#301A6B";
    defaultButton.style.borderColor="rgba(0, 0, 0, 0)";
    defaultButton.style.boxShadow="0px 6px 0px 0px #301a6b";
    defaultButton.onmouseenter=function(){
        defaultButton.style.backgroundColor="#cbb6e9";
    };
    defaultButton.onmouseleave=function(){
        defaultButton.style.backgroundColor="#ffffff";
        defaultButton.style.boxShadow="0px 6px 0px 0px";
        defaultButton.style.margin="5px 5px 10px 5px";
    };
    defaultButton.onmousedown=function(){
        defaultButton.style.boxShadow="0px 2px 0px 0px";
        defaultButton.style.margin="10px 5px 5px 5px";
    };
    defaultButton.onmouseup=function(){
        defaultButton.style.boxShadow="0px 6px 0px 0px";
        defaultButton.style.margin="5px 5px 10px 5px";
    };

    defaultButton.onclick=function(){
        degInput.value=90;
        xInput.value=758;
        yInput.value=424;
        clearMidCanvas();
        updateMirrorLine();
    };

    mirrorWindow.appendChild(defaultButton);

}

function createColorPull(){
    if (Q("leftpanel")[0] == undefined && document.isTrusted){

        var cookieDict = getCookieDict();

        if (document.querySelectorAll("#content").length>1){
            var parent = document.querySelectorAll("#content")[1];
        } else {parent = document.querySelectorAll("#content")[0];}

        var leftPannel=document.createElement('div');
        leftPannel.classList.add("leftpanel");
        leftPannel.style.width='270px';
        leftPannel.style.position="absolute";
        leftPannel.style.left="-220px";
        //leftPannel.style.opacity=0;
        leftPannel.style.top="50%";
        leftPannel.style.transform = "translate(0px, -50%)";
        leftPannel.style.transition = "all 0.5s ease-in-out 0s";

        var styleMenuKey=false;

        parent.appendChild(leftPannel);

        leftPannel.onmouseenter=function(){
            linkInput2.disabled=false;
            linkInput1.disabled=false;
            styleMenuKey=true;
            leftPannel.style.left="0px";
        }

        leftPannel.onmouseleave=function(){
            styleMenuKey=false;
            setTimeout(()=>{
                if (!styleMenuKey){
                    linkInput1.disabled=true;
                    linkInput2.disabled=true;
                    leftPannel.style.left="-220px";
                }
            }, 2000);
        }

        var minimaseButton = document.createElement('button');
        minimaseButton.innerText="_";
        minimaseButton.hidden=true;
        leftPannel.appendChild(minimaseButton);

        var textWindow2 = document.createElement('div');
        textWindow2.style.width='200px';
        textWindow2.style.height="fit-content";
        textWindow2.style.padding="5px 0px 19px";
        textWindow2.style.background='rgba(255, 255, 255, 0.13)';
        textWindow2.style.borderRadius="10px";
        //textWindow.style.position="absolute";
        //textWindow2.style.transform="translateY(-134%)";
        //textWindow.style.position="fixed";
        textWindow2.style.border="3px rgba(255,255,255, 0.5) solid";
        textWindow2.style.color="#ffffff";
        textWindow2.style.fontFamily="Black";
        textWindow2.style.textAlign="center";
        textWindow2.innerText="Можете и мой дискорд глянуть!)\n\n";
        textWindow2.style.margin="0px 10px 10px 10px";
        textWindow2.style.letterSpacing="1px";
        textWindow2.style.size="18px";
        textWindow2.style.lineHeight="18px";
        leftPannel.appendChild(textWindow2);

        var dsLink = document.createElement('a');
        dsLink.innerText="Doctor's Server";
        dsLink.href="https://discord.gg/eSZyC9JeAF";
        dsLink.style.opacity=1;
        dsLink.style.fontSize="20px"
        dsLink.style.textDecoration="none";
        dsLink.onclick=()=>{ window.open("https://discord.gg/eSZyC9JeAF", '_blank'); }
        dsLink.style.border="2px solid";
        dsLink.style.padding="6px 6px";
        dsLink.style.borderRadius="5px";
        dsLink.style.backgroundColor="rgb(138, 155, 213)";
        dsLink.style.color="white";
        textWindow2.appendChild(dsLink);

        var d=document.createElement('div');
        d.style.width='200px';
        d.style.height='auto';
        d.style.background='rgba(255, 255, 255, 0.13)';
        d.style.borderRadius="10px";
        d.style.border="3px rgba(255,255,255, 0.5) solid";
        d.style.opacity=1;
        d.style.margin="10px";
        leftPannel.appendChild(d);

        var title1 = document.createElement('div');
        title1.innerText="Настрока градиента";
        title1.style.fontFamily='Black';
        title1.style.color="rgb(255, 255, 255)";
        title1.style.fontSize="15px";
        title1.style.margin="5px";
        d.appendChild(title1);

        var colorInput1 = document.createElement('input');
        colorInput1.classList.add("color-input1");
        colorInput1.type="color";
        colorInput1.style.border="2px solid rgba(255, 255, 255, 0.8)";
        colorInput1.style.borderRadius="5px";
        colorInput1.style.width="82px";
        colorInput1.style.height="32px";
        colorInput1.style.cursor="pointer";
        colorInput1.style.appearance="none";
        colorInput1.style.background="none";
        colorInput1.style.margin="5px";
        if(!localStorage.getItem("gc1")){localStorage.setItem("gc1", "#5c1ea6")}
        colorInput1.value=localStorage.getItem("gc1");
        colorInput1.style.backgroundColor=localStorage.getItem("gc1");
        colorInput1.oninput=function(){
            localStorage.setItem("gc1", colorInput1.value);
            colorInput1.style.backgroundColor=colorInput1.value;
            document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;}
        d.appendChild(colorInput1);

        var colorInput2 = document.createElement('input');
        colorInput2.classList.add("color-input2");
        colorInput2.type="color";
        colorInput2.style.border="2px solid rgba(255, 255, 255, 0.8)";
        colorInput2.style.borderRadius="5px";
        colorInput2.style.width="82px";
        colorInput2.style.height="32px";
        colorInput2.style.cursor="pointer";
        colorInput2.style.appearance="none";
        colorInput2.style.background="none";
        colorInput2.style.margin="5px";
        if(!localStorage.getItem("gc2")){localStorage.setItem("gc2", "#c8435e")}
        colorInput2.style.backgroundColor=localStorage.getItem("gc2");
        colorInput2.value=localStorage.getItem("gc2");
        colorInput2.oninput=function(){
            localStorage.setItem("gc2", colorInput2.value);
            colorInput2.style.backgroundColor=colorInput2.value;
            document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;}
        d.appendChild(colorInput2);

        var degRange1 = document.createElement('input');
        degRange1.classList.add("deg-input");
        degRange1.type = "range";
        degRange1.min = 0;
        degRange1.max = 360;
        degRange1.step = 1;
        degRange1.style.margin="10px 5px";
        degRange1.style.width="190px";
        degRange1.style.height="4px";
        degRange1.style.borderRadius="10px";
        if(!localStorage.getItem("gd")){localStorage.setItem("gd", "200")}
        degRange1.style.backgroundColor=localStorage.getItem("gd");
        degRange1.value=localStorage.getItem("gd");
        degRange1.oninput=function(){
            localStorage.setItem("gd", degRange1.value);
            document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;}
        d.appendChild(degRange1);

        var percentRange = document.createElement('input');
        percentRange.classList.add("prec-input1");
        percentRange.type = "range";
        percentRange.min = 0;
        percentRange.max = 100;
        percentRange.step = 1;
        percentRange.style.width="190px";
        percentRange.style.borderRadius="10px";
        percentRange.style.margin="10px 5px";
        percentRange.style.height="4px";
        if(!localStorage.getItem("pc1")){localStorage.setItem("pc1", "0")}
        percentRange.style.backgroundColor=localStorage.getItem("pc1");
        percentRange.value=localStorage.getItem("pc1");
        percentRange.oninput=function(){
            localStorage.setItem("pc1", percentRange.value);
            document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;}
        d.appendChild(percentRange);

        var percentRange1 = document.createElement('input');
        percentRange1.classList.add("prec-input2");
        percentRange1.type = "range";
        percentRange1.min = 0;
        percentRange1.max = 100;
        percentRange1.step = 1;
        percentRange1.style.margin="10px 5px";
        percentRange1.style.width="190px";
        percentRange1.style.borderRadius="10px";
        percentRange1.style.height="4px";
        if(!localStorage.getItem("pc2")){localStorage.setItem("pc2", "85")}
        percentRange1.style.backgroundColor=localStorage.getItem("pc2");
        percentRange1.value=localStorage.getItem("pc2");
        percentRange1.oninput=function(){
            localStorage.setItem("pc2", percentRange1.value);
            document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;
        }
        d.appendChild(percentRange1);

        var title2 = document.createElement('div');
        title2.innerText="Цвета блоков";
        title2.style.fontFamily='Black';
        title2.style.color="rgb(255, 255, 255)";
        title2.style.fontSize="15px";
        title2.style.margin="5px";
        d.appendChild(title2);

        var colorInput3 = document.createElement('input');
        colorInput3.classList.add("color-input3");
        colorInput3.type="color";
        colorInput3.style.border="2px solid rgba(255, 255, 255, 0.8)";
        colorInput3.style.borderRadius="5px";
        colorInput3.style.width="182px";
        colorInput3.style.height="32px";
        colorInput3.style.cursor="pointer";
        colorInput3.style.appearance="none";
        colorInput3.style.background="none";
        colorInput3.style.margin="5px";
        if(!localStorage.getItem("sc3")){
            localStorage.setItem("sc3", "#000000");
            localStorage.setItem("sc3o", "00");
        }
        colorInput3.style.backgroundColor=localStorage.getItem("sc3");
        colorInput3.value=localStorage.getItem("sc3");
        colorInput3.oninput=function(){
            localStorage.setItem("sc3", colorInput3.value);
            colorInput3.style.backgroundColor=colorInput3.value;
            document.querySelector("#content").style.backgroundColor=colorInput3.value + localStorage.getItem("sc3o");
        }
        d.appendChild(colorInput3);

        var opacity1 = document.createElement('input');
        opacity1.classList.add("opacity1");
        opacity1.type = "range";
        opacity1.min = 0;
        opacity1.max = 255;
        opacity1.step = 1;
        opacity1.style.margin="10px 5px";
        opacity1.style.width="190px";
        opacity1.style.borderRadius="10px";
        opacity1.style.height="4px";
        opacity1.value=parseInt(localStorage.getItem("sc3o"), 16);
        document.querySelector("#content").style.backgroundColor=localStorage.getItem("sc3") + localStorage.getItem("sc3o");
        opacity1.oninput=()=>{
            var v = Number(opacity1.value).toString(16);
            if (v.length==1){v="0"+v};
            localStorage.setItem("sc3o", v);
            document.querySelector("#content").style.backgroundColor=localStorage.getItem("sc3") + localStorage.getItem("sc3o");
        };
        d.appendChild(opacity1);

        var colorInput4 = document.createElement('input');
        colorInput4.classList.add("color-input4");
        colorInput4.type="color";
        colorInput4.style.border="2px solid rgba(255, 255, 255, 0.8)";
        colorInput4.style.borderRadius="5px";
        colorInput4.style.width="182px";
        colorInput4.style.height="32px";
        colorInput4.style.cursor="pointer";
        colorInput4.style.appearance="none";
        colorInput4.style.background="none";
        colorInput4.style.margin="5px";
        Q("jsx-2562723607")[1].style.backgroundBlendMode="color-burn";
        if(!localStorage.getItem("sc4")){
            localStorage.setItem("sc4", "#000000");
            localStorage.setItem("sc4o", "00");
        }
        colorInput4.style.backgroundColor=localStorage.getItem("sc4");
        colorInput4.value=localStorage.getItem("sc4");
        colorInput4.oninput=function(){
            localStorage.setItem("sc4", colorInput4.value);
            colorInput4.style.backgroundColor=colorInput4.value;
            Q("jsx-2562723607")[1].style.backgroundColor=colorInput4.value + localStorage.getItem("sc4o");
        }
        d.appendChild(colorInput4);

        var opacity2 = document.createElement('input');
        opacity2.classList.add("opacity2");
        opacity2.type = "range";
        opacity2.min = 0;
        opacity2.max = 255;
        opacity2.step = 1;
        opacity2.value = `${cookieDict.opacity2}`;
        opacity2.style.margin="10px 5px";
        opacity2.style.width="190px";
        opacity2.style.borderRadius="10px";
        opacity2.style.height="4px";
        opacity2.value=parseInt(localStorage.getItem("sc4o"), 16);
        Q("jsx-2562723607")[1].style.backgroundColor=localStorage.getItem("sc4") + localStorage.getItem("sc4o");
        opacity2.oninput=()=>{
            var v = Number(opacity2.value).toString(16);
            if (v.length==1){v="0"+v};
            localStorage.setItem("sc4o", v);
            Q("jsx-2562723607")[1].style.backgroundColor=localStorage.getItem("sc4") + localStorage.getItem("sc4o");
        };
        d.appendChild(opacity2);

        var linkTitle = document.createElement('div');
        linkTitle.innerText="Задний фон";
        linkTitle.style.fontFamily='Black';
        linkTitle.style.color="rgb(255, 255, 255)";
        linkTitle.style.fontSize="15px";
        linkTitle.style.margin="5px";

        var linkInput1 = document.createElement('input');
        linkInput1.classList.add("link-input");
        linkInput1.type="text";
        if(!localStorage.getItem("sl1")){localStorage.setItem("sl1", "")}
        linkInput1.value=localStorage.getItem("sl1");
        if (linkInput1.value != ""){
            document.querySelector("#__next").style.backgroundImage=`url(${linkInput1.value})`;
        } else {
            document.querySelector("#__next").style.backgroundImage=`url(https://garticphone.com/images/textura.png)`;
        }
        linkInput1.placeholder="URL";
        linkInput1.style.color="white";
        linkInput1.style.fontSize="20px";
        linkInput1.style.backgroundColor="rgba(255, 255, 255, 0.3)";
        linkInput1.style.borderRadius="5px";
        linkInput1.style.border="2px solid rgba(255, 255, 255, 0.8)";
        linkInput1.style.width="166px";
        linkInput1.style.height="30px";
        linkInput1.style.margin="5px";
        linkInput1.style.fontFamily='Black';
        linkInput1.style.padding="0px 10px";
        linkInput1.oninput=()=>{
            localStorage.setItem("sl1", linkInput1.value);
            if (linkInput1.value != ""){
                document.querySelector("#__next").style.backgroundImage=`url(${linkInput1.value})`;
            } else {
                document.querySelector("#__next").style.backgroundImage=`url(https://garticphone.com/images/textura.png)`;
            }
        };
        linkInput1.disabled=true;

        var linkTitle2 = document.createElement('div');
        linkTitle2.innerText="Задний фон блока";
        linkTitle2.style.fontFamily='Black';
        linkTitle2.style.color="rgb(255, 255, 255)";
        linkTitle2.style.fontSize="15px";
        linkTitle2.style.margin="5px";

        var linkInput2 = document.createElement('input');
        linkInput2.classList.add("link-input-2");
        linkInput2.type="text";
        if(!localStorage.getItem("sl2")){localStorage.setItem("sl2", "")}
        linkInput2.value=localStorage.getItem("sl2");
        if (linkInput2.value != ""){
            Q("jsx-2562723607")[1].style.backgroundImage=`url(${linkInput2.value})`;
        }
        linkInput2.placeholder="URL";
        linkInput2.style.color="white";
        linkInput2.style.fontSize="20px";
        linkInput2.style.backgroundColor="rgba(255, 255, 255, 0.3)";
        linkInput2.style.borderRadius="5px";
        linkInput2.style.border="2px solid rgba(255, 255, 255, 0.8)";
        linkInput2.style.width="166px";
        linkInput2.style.height="30px";
        linkInput2.style.margin="5px";
        linkInput2.style.fontFamily='Black';
        linkInput2.style.padding="0px 10px";
        linkInput2.oninput=()=>{
            localStorage.setItem("sl2", linkInput2.value);
            if (linkInput2.value != ""){
                Q("jsx-2562723607")[1].style.backgroundImage=`url(${linkInput2.value})`;
            } else {
                Q("jsx-2562723607")[1].style.backgroundImage=`none`;
            }
        };
        linkInput2.disabled=true;
        Q("jsx-2562723607")[1].style.backgroundSize="cover";
        Q("jsx-2562723607")[1].style.backgroundPosition="center";
        Q("jsx-2562723607")[1].style.backgroundRepeat="no-repeat";


        d.appendChild(linkTitle);
        d.appendChild(linkInput1);
        d.appendChild(linkTitle2);
        d.appendChild(linkInput2);

        var gradientButton = document.createElement('button');
        gradientButton.style.fontFamily="Black";
        gradientButton.style.width="190px";
        gradientButton.style.height="";
        gradientButton.innerText="random";
        gradientButton.style.fontSize="18px";
        gradientButton.style.margin="5px 5px 10px 5px";
        gradientButton.style.borderRadius="5px";
        gradientButton.style.height="40px";
        gradientButton.style.color="#301A6B";
        gradientButton.style.borderColor="rgba(0, 0, 0, 0)";
        gradientButton.style.boxShadow="0px 6px 0px 0px #301a6b";
        gradientButton.onmouseenter=function(){
            gradientButton.style.backgroundColor="#cbb6e9";
        };
        gradientButton.onmouseleave=function(){
            gradientButton.style.backgroundColor="#ffffff";
            gradientButton.style.boxShadow="0px 6px 0px 0px";
            gradientButton.style.margin="5px 5px 10px 5px";
        };
        gradientButton.onmousedown=function(){
            gradientButton.style.boxShadow="0px 2px 0px 0px";
            gradientButton.style.margin="10px 5px 5px 5px";
        };
        gradientButton.onmouseup=function(){
            gradientButton.style.boxShadow="0px 6px 0px 0px";
            gradientButton.style.margin="5px 5px 10px 5px";
        };

        gradientButton.onclick=()=>{
            colorInput1.value=rgb2hex(getRandomInt(255), getRandomInt(255), getRandomInt(255));
            colorInput1.style.backgroundColor=colorInput1.value;
            colorInput2.value=rgb2hex(getRandomInt(255), getRandomInt(255), getRandomInt(255));
            colorInput2.style.backgroundColor=colorInput2.value;
            degRange1.value=getRandomInt(360);
            percentRange.value=getRandomInt(100);
            percentRange1.value=getRandomInt(100);
            localStorage.setItem("gc1", colorInput1.value);
            localStorage.setItem("gc2", colorInput2.value);
            localStorage.setItem("gd", degRange1.value);
            localStorage.setItem("pc1", percentRange.value);
            localStorage.setItem("pc2", percentRange1.value);
            document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;
        }

        d.appendChild(gradientButton);


        var defaultButton = document.createElement('button');
        defaultButton.style.fontFamily="Black";
        defaultButton.style.width="190px";
        defaultButton.style.height="";
        defaultButton.innerText="default";
        defaultButton.style.fontSize="18px";
        defaultButton.style.margin="5px 5px 10px 5px";
        defaultButton.style.borderRadius="5px";
        defaultButton.style.height="40px";
        defaultButton.style.color="#301A6B";
        defaultButton.style.borderColor="rgba(0, 0, 0, 0)";
        defaultButton.style.boxShadow="0px 6px 0px 0px #301a6b";
        defaultButton.onmouseenter=function(){
            defaultButton.style.backgroundColor="#cbb6e9";
        };
        defaultButton.onmouseleave=function(){
            defaultButton.style.backgroundColor="#ffffff";
            defaultButton.style.boxShadow="0px 6px 0px 0px";
            defaultButton.style.margin="5px 5px 10px 5px";
        };
        defaultButton.onmousedown=function(){
            defaultButton.style.boxShadow="0px 2px 0px 0px";
            defaultButton.style.margin="10px 5px 5px 5px";
        };
        defaultButton.onmouseup=function(){
            defaultButton.style.boxShadow="0px 6px 0px 0px";
            defaultButton.style.margin="5px 5px 5px 5px";
        };
        defaultButton.onclick=function(){
            linkInput1.disabled=true;
            linkInput2.disabled=true;
            leftPannel.style.left="-220px";
            dialogWindow('reset all style settings?', 'All style settings will be reset to the default settings without the possibility of recovery', ()=>{
                let colorInput1 = Q("color-input1")[0];
                let colorInput2 = Q("color-input2")[0];
                let colorInput3 = Q("color-input3")[0];
                let colorInput4 = Q("color-input4")[0];
                let degRange1 = Q("deg-input")[0];
                let percentRange1 = Q("prec-input1")[0];
                let percentRange2 = Q("prec-input2")[0];
                let linkInput1 = Q("link-input")[0];
                let linkInput2 = Q("link-input-2")[0];
                let opacity1 = Q("opacity1")[0];
                let opacity2 = Q("opacity2")[0];

                colorInput1.value="#7213e7";
                colorInput2.value="#c8435e";
                colorInput3.value="#000000";
                colorInput4.value="#000000";
                degRange1.value=200;
                percentRange1.value=0;
                percentRange2.value=100;
                linkInput1.value="";
                linkInput2.value="";
                opacity1.value=0;
                opacity2.value=0;

                localStorage.setItem("gc1", colorInput1.value);
                colorInput1.style.backgroundColor=colorInput1.value;
                localStorage.setItem("gc2", colorInput2.value);
                colorInput2.style.backgroundColor=colorInput2.value;
                localStorage.setItem("gd", degRange1.value);
                localStorage.setItem("pc1", percentRange1.value);
                localStorage.setItem("pc2", percentRange2.value);
                localStorage.setItem("sl1", linkInput1.value);
                localStorage.setItem("sl2", linkInput2.value);
                localStorage.setItem("sc3", colorInput3.value);
                localStorage.setItem("sc3o", "00");
                colorInput3.style.backgroundColor=colorInput3.value;
                localStorage.setItem("sc4", colorInput4.value);
                localStorage.setItem("sc4o", "00");
                colorInput4.style.backgroundColor=colorInput4.value;

                Q("jsx-2562723607")[1].style.backgroundColor="#00000000";
                document.querySelector("#content").style.backgroundColor="#00000000";
                document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;
                document.querySelector("#__next").style.backgroundImage="";
                document.getElementsByClassName("jsx-2562723607")[1].style.backgroundImage="";
            }, ()=>{
                linkInput1.disabled=false;
                linkInput2.disabled=false;
                leftPannel.style.left="0px";
            })
        };

        d.appendChild(defaultButton);
        styleUpdate();
    }
}

function styleUpdate(){
    Q("jsx-2562723607")[1].style.backgroundBlendMode="color-dodge";
    Q("jsx-2562723607")[1].style.backgroundSize="cover";
    Q("jsx-2562723607")[1].style.backgroundPosition="center";
    Q("jsx-2562723607")[1].style.backgroundRepeat="no-repeat";
    Q("jsx-2562723607")[1].style.backgroundColor=localStorage.getItem("sc4") + localStorage.getItem("sc4o");
    document.querySelector("#content").style.backgroundColor=localStorage.getItem("sc3") + localStorage.getItem("sc3o");
    if(localStorage.getItem("sl1") != ""){document.querySelector("#__next").style.backgroundImage=`url(${localStorage.getItem("sl1")})`;}
    Q("jsx-2562723607")[1].style.backgroundImage=`url(${localStorage.getItem("sl2")})`;
    document.querySelector("body").style.backgroundImage=`linear-gradient(${localStorage.getItem("gd")}deg, ${localStorage.getItem("gc1")} ${localStorage.getItem("pc1")}%, ${localStorage.getItem("gc2")} ${localStorage.getItem("pc2")}%)`;
}


if (document.isTrusted){
    exec();
}

var lobbyKey = false;
var menuKey = false;
var menuLinkKey = false;
var drawKey = false;
var bookKey = false;
var startKey = false;
var writeKey = false;
var memoryKey = false;
var waitingKey = false;

window.onkeydown=(e)=>{
    if (e.key === "Enter" || e.key === "Ent" || e.keyCode === 13) {
        var t = Q("jsx-4289504161 big")[0];
        if(t){t.click()};
    }
    var input = Q(MINP)[0];
    if ((e.code == "Delete" || e.key == "Delete" || e.keyCode == 46) && e.ctrlKey){
        var p = prompt("Введите команду:", "100") ;
        if (p == "0"){
        } else if (p == "123"){
            setValue(input, "DoctorDeathDDracula ");
        } else if (p == "100"){
            var r = localStorage.getItem("room");
            if (!r){alert("Ошибка"); return;}
            localStorage.setItem("uuid", "" + Math.random());
            document.location.replace(r);
        } else {alert("Такой команды не существует");}
    }
    if ((e.key=="=" || e.code=="Equal" || e.keyCode=="187") && e.altKey){
        localStorage.setItem("uuid", "" + Math.random());
        window.open(localStorage.getItem("room"), '_blank');
    }
}


function flagsOff(){
    localStorage.setItem("pre-url", "");

    if (drawKey && Q("jsx-1553483530 pencil")[0]){
        Q("jsx-1553483530 pencil")[0].parentNode.removeChild(Q("jsx-1553483530 pencil")[0]);
    }

    if (Q("bm")[0]){
        Q("bm")[0].pause();
        Q("bm")[0].currentTime = 0;
    }

    lobbyKey = false;
    menuKey = false;
    menuLinkKey = false;
    drawKey = false;
    bookKey = false;
    startKey = false;
    writeKey = false;
    memoryKey = false;
    waitingKey = false;
}


function memoryFunc(){
    if (document.URL.indexOf("draw") != -1){return}
    var smth = Q(UDC)[0];
    var mCanvas = Q("jsx-1116305971")[0];
    smth.style.backgroundImage="url()";
    smth.style.cursor="pointer";
    smth.onclick = ()=>{
        if (mCanvas.style.opacity == "" || mCanvas.style.opacity == "1"){
            mCanvas.style.opacity = 0;
            //smth.style.backgroundImage="url(https://images-ext-1.discordapp.net/external/4j6MAS7dlRdJgi1KciurS5q6zKYnF3KbhUzq9YP1xFs/https/static-prod.weplay.tv/2018-12-19/f2e481db44650925f3f5bb8a840181ab_large_cover.jpeg?width=1202&height=676)";
            smth.style.backgroundColor="black";
            smth.style.backgroundSize="100%";
            smth.style.border="4px solid red";
            smth.style.zIndex=10;
        } else {
            mCanvas.style.opacity = 1;
            //smth.style.backgroundImage="url()";
            smth.style.backgroundColor="";
            smth.style.border="";
        }
    }

}


function offBgMenu(){
    var panel = Q("rightpanel");
    if (panel.length != 0){
        panel[0].parentNode.removeChild(panel[0]);
    }
}

var cur = "";
function main(){
    if (document.URL.indexOf("book") == -1){delete blackArr};

    if ((document.URL.indexOf("https://garticphone.com/") != -1 && document.URL.length == 26) && !menuKey){
        //createUpdateWindow();
        window.onload=()=>{
            createColorPull();
        }
        setTimeout(vipOnEnter, 500);
        setTimeout(styleUpdate, 10);
        setTimeout(deletBanner, 10);
        setTimeout(createColorPull, 10);
        setTimeout(mainMenuTitle, 10);
        flagsOff();
        menuKey=true;

    }
    else if (document.URL.indexOf("?c=") != -1 && !menuLinkKey){
        setTimeout(vipOnEnter, 10);
        localStorage.setItem("room", document.URL);
        //Блок главного меню при входе по ссылке
        //alert("menuLinkKey");
        //window.onload=()=>{
        //deletBanner();
        //createColorPull();
        //styleUpdate();
        //}
        //setTimeout(blackListFunc, 10);
        setTimeout(deletBanner, 10);
        setTimeout(createColorPull, 10);
        setTimeout(styleUpdate, 10);
        setTimeout(mainMenuTitle, 10);
        //setTimeout(console.clear, 2000);
        flagsOff();
        menuLinkKey=true;
    }
    else if (document.URL.indexOf("redirect") != -1 && !menuLinkKey){
        setTimeout(vipOnEnter, 10);
        localStorage.setItem("room", document.URL);
        //Блок главного меню при входе по ссылке
        //alert("menuLinkKey");
        //window.onload=()=>{
        //deletBanner();
        //createColorPull();
        //styleUpdate();
        //}
        //setTimeout(blackListFunc, 10);
        setTimeout(deletBanner, 10);
        setTimeout(createColorPull, 10);
        setTimeout(styleUpdate, 10);
        setTimeout(mainMenuTitle, 10);
        //setTimeout(console.clear, 2000);
        flagsOff();
        menuLinkKey=true;
    }
    else if (document.URL.indexOf("draw") != -1 && (!drawKey || cur != document.URL)){
        cur = document.URL;
        setTimeout(styleUpdate, 10);
        setTimeout(mainDrawFunc, 500);
        var inv = setInterval(()=>{
            if (document.getElementsByClassName("mirror-canvas").length != 0 && Q(PALIT)[1].children.length > 30 && Q("pipet").length != 0 && Q("download")[0]){clearInterval(inv); return}
            setTimeout(styleUpdate, 10);
            setTimeout(mainDrawFunc, 500);;
        }, 600);
        if (document.getElementsByClassName("mirror-canvas").length != 0 && Q(PALIT)[1].children.length > 30 && Q("pipet").length != 0){clearInterval(inv)};
        flagsOff();
        localStorage.setItem("pre-url", "draw");
        drawKey=true;
    }
    else if (document.URL.indexOf("lobby") != -1 && !lobbyKey){
        var v = Q(NICK);
        for (let i=0; i<v.length; i++){VIPList(v[i]);}
        addListenerToBlock(Q(SLL)[0]);
        setTimeout(lobbyEdit, 300);
        setTimeout(styleUpdate, 10);
        flagsOff();
        lobbyKey=true;
    }
    else if (document.URL.indexOf("book") != -1 ){ // && !bookKey
        var w = Q("scrollElements")[1];
        if (!w){
            Q("timeline")[0].addEventListener("DOMNodeInserted", (e)=>{
                setTimeout(()=>{
                    if (!e.target.classList || !e){return}
                    if (e.target.classList.contains("scroll")){
                        var w = Q("scrollElements")[1].children;
                        censorListener();
                        for(var k=0; k<w.length; k++){cencFunc(w[k].firstChild)}
                    }
                }, 20);
            });
        } else {
            setTimeout(()=>{
                w = Q("scrollElements")[1].children;
                censorListener();
                for(var k=0; k<w.length; k++){cencFunc(w[k].firstChild)}
            }, 100);
        }

        debagDrawinfContainerOnExit();

        if (Q("zoomC").length){
            Q("zoomC")[0].parentNode.removeChild(Q("zoomC")[0]);
        }

        v = Q("jsx-1594390208 nick");
        for (let i=0; i<v.length; i++){VIPList(v[i]);}
        addListenerToBlock(Q("jsx-3158565948 scrollElements")[0]);
        setTimeout(styleUpdate, 10);
        offBgMenu();
        flagsOff();
        bookKey=true;
    }
    else if (document.URL.indexOf("start") != -1 && !startKey){
        setTimeout(styleUpdate, 10);
        setTimeout(extendTextInput , 1000);
        flagsOff();
        startKey=true;
    }
    else if (document.URL.indexOf("write") != -1){
        debagDrawinfContainerOnExit();
        //Блок названия картинки
        offBgMenu();
        setTimeout(extendTextInput, 1000);
        if (Q("zoomC").length){
            Q("zoomC")[0].parentNode.removeChild(Q("zoomC")[0]);
        }
        setTimeout(styleUpdate, 10);
        flagsOff();
        writeKey=true;
        setTimeout(memoryFunc, 500);
    }
    else if (document.URL.indexOf("memory") != -1){
        //Блок перерисовки картинки
        debagDrawinfContainerOnExit();
        var t = setInterval(()=>{
            var o = Q("rightpanel")[0];
            if (o){
                o.parentNode.removeChild(o);
            } else {clearInterval(t)}
        }, 0);
        setTimeout(styleUpdate, 10);
        if (Q("zoomC").length){
            Q("zoomC")[0].parentNode.removeChild(Q("zoomC")[0]);
        }
        flagsOff();
        memoryKey=true;
        setTimeout(memoryFunc, 500);
    }
    else if (document.URL.indexOf("waiting") != -1 && !waitingKey){
        //alert("IN");

        //window.onload=()=>{
        //    styleUpdate();
        //    waitVideo();
        //}

        setTimeout(styleUpdate, 10);
        //waitVideo();

        //setTimeout(styleUpdate, 500);
        //setTimeout(console.clear, 2000);
        setTimeout(waitVideo, 1000);
        flagsOff();
        waitingKey=true;
    }
    else{
        //Непромодулированная комната
        //flagsOff();
    }
}


function exec() {
    document.querySelector("#content").addEventListener("DOMNodeInserted", main);
    setTimeout(main, 100);
}

if (document.URL.indexOf("draw") != -1) { setTimeout( ()=>{window.location.reload()}, 500) }

