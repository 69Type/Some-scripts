const VERSION = "2.9.null";

const dynamElem = (tag, options) => Object.assign(document.createElement(tag), options);

var title = dynamElem("div", {
    innerText: "Gartic Mod is offline. Discord: https://discord.gg/sHj5UauJZ4, Telegram: t.me/DoctorDeathDDracula",
    style: "position: absolute; color: #fff; left: 0px; top: 0px; text-transform: uppercase; font-size: 14px; font-family: 'Black'; margin: 5px;",
    id: "mod",
    contentEditable: "true"
});

document.body.appendChild(title);
console.log(title)
