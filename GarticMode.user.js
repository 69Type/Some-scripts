var VERSION = "2.9.null";

function c(tag, options={}, parent=false){
        var children = options.children || [];
        delete options.children;
        var el = Object.assign(document.createElement(tag), options);
        children.forEach(child => el.appendChild(child));
        if (parent !== false && parent?.nodeType !== Node.ELEMENT_NODE) console.warn('Parent does not exists');
        return parent?.nodeType === Node.ELEMENT_NODE ? parent.appendChild(el) : el;
    }

c("div", {
    innerText: "garticphone mod was closed",
    style: "position: absolute;color:#fff;left:0px;top:0px;text-transform:uppercase;font-size:14px;font-family:'Black';margin:5px;text-transform:uppercase;",
    id: "mod",
}, document.body);

c("style", {
    textContent:'.side{display:none !important;}'
}, document.head);
