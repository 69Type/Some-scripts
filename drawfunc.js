// ==UserScript==
// @name         Draw
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://garticphone.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
	[16], {
		"20a2": function(e, t, r) {
			e.exports = r("nOHt")
		},
		"6VPp": function(e, t, r) {
			"use strict";
			var o = r("nKUr"),
				n = r("MX0m"),
				i = r.n(n),
				s = r("q1tI"),
				a = r("Ya7B"),
				c = r("kOrG"),
				l = r("YSmr"),
				x = "#FFF";
			t.a = Object(a.c)((function(e) {
				var t = Object(s.useRef)();
				return Object(s.useEffect)((function() {
					var r = t.current.getContext("2d");
					r.strokeStyle = x, r.lineWidth = 8;
					var o = 60;
					if (e.timeStarted) {
						var n, i, s = performance.now() - e.elapsedTime,
							a = 0;
						if (e.speed != l.zb) i = e.speed == l.wb ? .5 * e.value : e.speed == l.Ab ? 2 * e.value : e.value, e.reduced && (i /= 4);
						else {
							var p = .2 * e.value,
								d = 2 * e.value - p,
								b = Math.pow(d / 100, 1 / e.turnMax);
							i = p + 100 * Math.pow(b, e.turnMax - e.turnNum)
						}
						var u = !1;
						return e.reduced ? c.a.play("timeout", !1, .9) : s / i < .8 && (u = setTimeout((function() {
								c.a.play("timeout", !1, .9)
							}), .8 * i - s)), n = requestAnimationFrame((function t(s) {
								var c = (s - e.elapsedTime) / i,
									l = c >= 1;
								if ((c - a > .001 || l) && (a = c, r.clearRect(0, 0, 120, 120), r.beginPath(), r.arc(o, o, 56, 0, 2 * Math.PI), r.stroke(), !l)) {
									r.fillStyle = c <= .8 && !e.reduced ? x : "#F7B500", r.beginPath(), r.moveTo(o, o), r.arc(o, o, 44, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * c, !0), r.lineTo(o, o), r.fill()
								}
								l || (n = requestAnimationFrame(t))
							})),
							function() {
								c.a.pause("timeout"), u && clearTimeout(u), cancelAnimationFrame(n)
							}
					}
					r.beginPath(), r.arc(o, o, 56, 0, 2 * Math.PI), r.stroke()
				}), [e.timeStarted]), Object(o.jsxs)(o.Fragment, {
					children: [Object(o.jsx)("canvas", {
						ref: t,
						width: 120,
						height: 120,
						className: "jsx-241293408 time"
					}), Object(o.jsx)(i.a, {
						id: "2409927210",
						children: ["canvas.jsx-241293408{position:absolute;width:60px;height:60px;top:20px;right:20px;font-family:Ubuntu;font-weight:500;font-size:36px;color:rgba(255,255,255,.69);}", "@media (max-width:640px){canvas.jsx-241293408{z-index:5;width:40px;height:40px;top:12px;right:10px;}}"]
					}), Object(o.jsx)(i.a, {
						id: "2667873027",
						children: [".ar .time{left:20px;right:initial;}", "@media (max-width:640px){.ar .time{left:10px;}}"]
					})]
				})
			}), (function(e) {
				return {
					reduced: [l.vb, l.yb].includes(e.data.configs.speed),
					speed: e.data.configs.speed,
					elapsedTime: e.data.elapsedTime,
					timeStarted: e.data.timeStarted,
					turnNum: e.data.turnNum,
					turnMax: e.data.turnMax
				}
			}))
		},
		HF4s: function(e, t, r) {
			"use strict";
			r.r(t), r.d(t, "__N_SSG", (function() {
				return je
			}));
			var o = r("nKUr"),
				n = r("jT3O"),
				i = r("z7pX"),
				s = r("MX0m"),
				a = r.n(s),
				c = r("CBA4"),
				l = r("q1tI"),
				x = r.n(l),
				p = r("20a2"),
				d = "undefined" !== typeof navigator && navigator.userAgent.toLowerCase().indexOf("firefox") > 0;

			function b(e, t, r) {
				e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on".concat(t), (function() {
					r(window.event)
				}))
			}

			function u(e, t) {
				for (var r = t.slice(0, t.length - 1), o = 0; o < r.length; o++) r[o] = e[r[o].toLowerCase()];
				return r
			}

			function f(e) {
				"string" !== typeof e && (e = "");
				for (var t = (e = e.replace(/\s/g, "")).split(","), r = t.lastIndexOf(""); r >= 0;) t[r - 1] += ",", t.splice(r, 1), r = t.lastIndexOf("");
				return t
			}
			for (var h = {
					backspace: 8,
					tab: 9,
					clear: 12,
					enter: 13,
					return: 13,
					esc: 27,
					escape: 27,
					space: 32,
					left: 37,
					up: 38,
					right: 39,
					down: 40,
					del: 46,
					delete: 46,
					ins: 45,
					insert: 45,
					home: 36,
					end: 35,
					pageup: 33,
					pagedown: 34,
					capslock: 20,
					"\u21ea": 20,
					",": 188,
					".": 190,
					"/": 191,
					"`": 192,
					"-": d ? 173 : 189,
					"=": d ? 61 : 187,
					";": d ? 59 : 186,
					"'": 222,
					"[": 219,
					"]": 221,
					"\\": 220
				}, m = {
					"\u21e7": 16,
					shift: 16,
					"\u2325": 18,
					alt: 18,
					option: 18,
					"\u2303": 17,
					ctrl: 17,
					control: 17,
					"\u2318": 91,
					cmd: 91,
					command: 91
				}, g = {
					16: "shiftKey",
					18: "altKey",
					17: "ctrlKey",
					91: "metaKey",
					shiftKey: 16,
					ctrlKey: 17,
					altKey: 18,
					metaKey: 91
				}, j = {
					16: !1,
					18: !1,
					17: !1,
					91: !1
				}, w = {}, k = 1; k < 20; k++) h["f".concat(k)] = 111 + k;
			var y = [],
				v = "all",
				_ = [],
				O = function(e) {
					return h[e.toLowerCase()] || m[e.toLowerCase()] || e.toUpperCase().charCodeAt(0)
				};

			function C(e) {
				v = e || "all"
			}

			function F() {
				return v || "all"
			}
			var E = function(e) {
				var t = e.key,
					r = e.scope,
					o = e.method,
					n = e.splitKey,
					i = void 0 === n ? "+" : n;
				f(t).forEach((function(e) {
					var t = e.split(i),
						n = t.length,
						s = t[n - 1],
						a = "*" === s ? "*" : O(s);
					if (w[a]) {
						r || (r = F());
						var c = n > 1 ? u(m, t) : [];
						w[a] = w[a].map((function(e) {
							return (!o || e.method === o) && e.scope === r && function(e, t) {
								for (var r = e.length >= t.length ? e : t, o = e.length >= t.length ? t : e, n = !0, i = 0; i < r.length; i++) - 1 === o.indexOf(r[i]) && (n = !1);
								return n
							}(e.mods, c) ? {} : e
						}))
					}
				}))
			};

			function N(e, t, r) {
				var o;
				if (t.scope === r || "all" === t.scope) {
					for (var n in o = t.mods.length > 0, j) Object.prototype.hasOwnProperty.call(j, n) && (!j[n] && t.mods.indexOf(+n) > -1 || j[n] && -1 === t.mods.indexOf(+n)) && (o = !1);
					(0 !== t.mods.length || j[16] || j[18] || j[17] || j[91]) && !o && "*" !== t.shortcut || !1 === t.method(e, t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0))
				}
			}

			function z(e) {
				var t = w["*"],
					r = e.keyCode || e.which || e.charCode;
				if (L.filter.call(this, e)) {
					if (93 !== r && 224 !== r || (r = 91), -1 === y.indexOf(r) && 229 !== r && y.push(r), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach((function(t) {
							var r = g[t];
							e[t] && -1 === y.indexOf(r) ? y.push(r) : !e[t] && y.indexOf(r) > -1 ? y.splice(y.indexOf(r), 1) : "metaKey" === t && e[t] && 3 === y.length && (e.ctrlKey || e.shiftKey || e.altKey || (y = y.slice(y.indexOf(r))))
						})), r in j) {
						for (var o in j[r] = !0, m) m[o] === r && (L[o] = !0);
						if (!t) return
					}
					for (var n in j) Object.prototype.hasOwnProperty.call(j, n) && (j[n] = e[g[n]]);
					e.getModifierState && (!e.altKey || e.ctrlKey) && e.getModifierState("AltGraph") && (-1 === y.indexOf(17) && y.push(17), -1 === y.indexOf(18) && y.push(18), j[17] = !0, j[18] = !0);
					var i = F();
					if (t)
						for (var s = 0; s < t.length; s++) t[s].scope === i && ("keydown" === e.type && t[s].keydown || "keyup" === e.type && t[s].keyup) && N(e, t[s], i);
					if (r in w)
						for (var a = 0; a < w[r].length; a++)
							if (("keydown" === e.type && w[r][a].keydown || "keyup" === e.type && w[r][a].keyup) && w[r][a].key) {
								for (var c = w[r][a], l = c.splitKey, x = c.key.split(l), p = [], d = 0; d < x.length; d++) p.push(O(x[d]));
								p.sort().join("") === y.sort().join("") && N(e, c, i)
							}
				}
			}

			function L(e, t, r) {
				y = [];
				var o = f(e),
					n = [],
					i = "all",
					s = document,
					a = 0,
					c = !1,
					l = !0,
					x = "+";
				for (void 0 === r && "function" === typeof t && (r = t), "[object Object]" === Object.prototype.toString.call(t) && (t.scope && (i = t.scope), t.element && (s = t.element), t.keyup && (c = t.keyup), void 0 !== t.keydown && (l = t.keydown), "string" === typeof t.splitKey && (x = t.splitKey)), "string" === typeof t && (i = t); a < o.length; a++) n = [], (e = o[a].split(x)).length > 1 && (n = u(m, e)), (e = "*" === (e = e[e.length - 1]) ? "*" : O(e)) in w || (w[e] = []), w[e].push({
					keyup: c,
					keydown: l,
					scope: i,
					mods: n,
					shortcut: o[a],
					method: r,
					key: o[a],
					splitKey: x
				});
				"undefined" !== typeof s && ! function(e) {
					return _.indexOf(e) > -1
				}(s) && window && (_.push(s), b(s, "keydown", (function(e) {
					z(e)
				})), b(window, "focus", (function() {
					y = []
				})), b(s, "keyup", (function(e) {
					z(e),
						function(e) {
							var t = e.keyCode || e.which || e.charCode,
								r = y.indexOf(t);
							if (r >= 0 && y.splice(r, 1), e.key && "meta" === e.key.toLowerCase() && y.splice(0, y.length), 93 !== t && 224 !== t || (t = 91), t in j)
								for (var o in j[t] = !1, m) m[o] === t && (L[o] = !1)
						}(e)
				})))
			}
			var T = {
				setScope: C,
				getScope: F,
				deleteScope: function(e, t) {
					var r, o;
					for (var n in e || (e = F()), w)
						if (Object.prototype.hasOwnProperty.call(w, n))
							for (r = w[n], o = 0; o < r.length;) r[o].scope === e ? r.splice(o, 1) : o++;
					F() === e && C(t || "all")
				},
				getPressedKeyCodes: function() {
					return y.slice(0)
				},
				isPressed: function(e) {
					return "string" === typeof e && (e = O(e)), -1 !== y.indexOf(e)
				},
				filter: function(e) {
					var t = e.target || e.srcElement,
						r = t.tagName,
						o = !0;
					return !t.isContentEditable && ("INPUT" !== r && "TEXTAREA" !== r && "SELECT" !== r || t.readOnly) || (o = !1), o
				},
				unbind: function(e) {
					if (e) {
						if (Array.isArray(e)) e.forEach((function(e) {
							e.key && E(e)
						}));
						else if ("object" === typeof e) e.key && E(e);
						else if ("string" === typeof e) {
							for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
							var n = r[0],
								i = r[1];
							"function" === typeof n && (i = n, n = ""), E({
								key: e,
								scope: n,
								method: i,
								splitKey: "+"
							})
						}
					} else Object.keys(w).forEach((function(e) {
						return delete w[e]
					}))
				}
			};
			for (var S in T) Object.prototype.hasOwnProperty.call(T, S) && (L[S] = T[S]);
			if ("undefined" !== typeof window) {
				var M = window.hotkeys;
				L.noConflict = function(e) {
					return e && window.hotkeys === L && (window.hotkeys = M), L
				}, window.hotkeys = L
			}
			var P = L;

			function B(e, t, r, o) {
				r instanceof Array && (o = r, r = void 0);
				var n = r || {},
					i = n.enableOnTags,
					s = n.filter,
					a = Object(l.useRef)(null),
					c = Object(l.useCallback)((function(e, r) {
						return (null === a.current || document.activeElement === a.current) && (t(e, r), !0)
					}), o ? [a].concat(o) : [a]);
				return Object(l.useEffect)((function() {
					return r && r.enableOnTags && (P.filter = function(e) {
							var t = e.target,
								r = e.srcElement,
								o = t && t.tagName || r && r.tagName;
							return Boolean(o && i && i.includes(o))
						}), s && (P.filter = s), P(e, r || {}, c),
						function() {
							return P.unbind(e, c)
						}
				}), [c, r, i, s, e]), a
			}
			var A = r("Ya7B");

			function D(e, t, r) {
				var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
					n = t.getBoundingClientRect(),
					i = e.touches ? [e.touches[0].clientX, e.touches[0].clientY] : [e.clientX, e.clientY];
				return [Math.round((i[0] - n.left + o) / r), Math.round((i[1] - n.top) / r)]
			}

			function K(e, t, r, o, n, s) {
				var a = function(e, t, r) {
						var o = t,
							n = r;
						if (p(t, r, e)) {
							for (; p(o + 1, n, e);) o++;
							var i = o;
							do {
								for (o = t - 1, n++; p(o + 1, n, e) && o + 1 <= i;) o++
							} while (o == i);
							return {
								x: t,
								y: r,
								w: i - t,
								h: --n - r
							}
						}
						return {
							w: -1,
							h: -1
						}
					},
					c = function(e, t, r) {
						var o = t,
							n = r;
						if (p(t, r, e)) {
							for (; p(o - 1, n, e);) o--;
							var i = o;
							do {
								for (o = t + 1, n--; p(o - 1, n, e) && o - 1 >= i;) o--
							} while (o == i);
							return {
								x: i,
								y: ++n,
								w: t - i,
								h: r - n
							}
						}
						return {
							w: -1,
							h: -1
						}
					},
					l = function(e, t, r) {
						var o = t,
							n = r;
						if (p(t, r, e)) {
							for (; p(o, n + 1, e);) n++;
							var i = n;
							do {
								for (n = r - 1, o--; p(o, n + 1, e) && n + 1 <= i;) n++
							} while (n == i);
							return {
								x: ++o,
								y: r,
								w: t - o,
								h: i - r
							}
						}
						return {
							w: -1,
							h: -1
						}
					},
					x = function(e, t, r) {
						var o = t,
							n = r;
						if (p(t, r, e)) {
							for (; p(o, n - 1, e);) n--;
							var i = n;
							do {
								for (n = r + 1, o++; p(o, n - 1, e) && n - 1 >= i;) n--
							} while (n == i);
							return {
								x: t,
								y: i,
								w: --o - t,
								h: r - i
							}
						}
						return {
							w: -1,
							h: -1
						}
					},
					p = function(e, t, r) {
						if (b[e][t]) return !1;
						var o = 4 * (e + t * n),
							i = g.slice(o, o + 4),
							s = Math.abs(r[0] - i[0]),
							a = Math.abs(r[1] - i[1]),
							c = Math.abs(r[2] - i[2]),
							l = Math.abs(r[3] - i[3]);
						return s < 20 && a < 20 && c < 20 && l < 20 || 0 == i[3] && 255 == r[0] && 255 == r[1] && 255 == r[2] || 0 == r[3] && 255 == i[0] && 255 == i[1] && 255 == i[2]
					},
					d = function(e) {
						for (var t = e[0], r = e[1], o = t + e[2], n = r + e[3], i = t; i < o; i++)
							for (var s = r; s < n; s++) b[i][s] = !0;
                        e[0]-=2; e[1]-=2; e[2]+=2; e[3]+=2;
						return e
					};
				t = Math.round(t), r = Math.round(r);
				var b, u = parseInt(o.replace("#", "0x")),
					f = u % 256,
					h = (u = Math.floor(u / 256)) % 256,
					m = u = Math.floor(u / 256);
				! function() {
					b = [];
					for (var e = -1; e <= n; e++) b[e] = [];
					b[-1] = [], b[n] = [];
					for (var t = -1; t <= s; t++) b[-1][t] = 1, b[n][t] = 1;
					for (var r = 0; r < n; r++) b[r][-1] = 1, b[r][s] = 1
				}();
				for (var g = e.getImageData(0, 0, n, s).data, j = 4 * (t + r * n), w = [g[j], g[j + 1], g[j + 2], g[j + 3]], k = [], y = 0; y <= n; y++) k[y] = [];
				if (p(t, r, [m, h, f, 255])) return [];
				for (; p(t - 1, r, w);) t--;
				for (; p(t, r - 1, w);) r--;
				var v, _, O = a(w, t, r),
					C = {
						x: t,
						y: r,
						w: O.w,
						h: O.h,
						ref: 0,
						andada: 0
					},
					F = O.w,
					E = d([O.x, O.y, O.w + 1, O.h + 1]);
				do {
					for (v = 0, 2 == C.ref && (v += C.andada); v <= C.h;) - 1 != (_ = (O = x(w, C.x + C.w + 1, C.y + C.h - v)).h) ? (k[_].push({
						x: O.x,
						y: O.y,
						w: O.w,
						h: O.h,
						ref: 1,
						andada: C.h + 1 - v
					}), E.push.apply(E, Object(i.a)(d([O.x, O.y, O.w + 1, O.h + 1]))), _ > F && (F = _), v += _) : v++;
					for (v = 0, 1 == C.ref && (v += C.andada); v <= C.h;) - 1 != (_ = (O = l(w, C.x - 1, C.y + v)).h) ? (k[_].push({
						x: O.x,
						y: O.y,
						w: O.w,
						h: O.h,
						ref: 2,
						andada: C.h + 1 - v
					}), E.push.apply(E, Object(i.a)(d([O.x, O.y, O.w + 1, O.h + 1]))), _ > F && (F = _), v += _) : v++;
					for (v = 0, 4 == C.ref && (v += C.andada); v <= C.w;) - 1 != (_ = (O = a(w, C.x + v, C.y + C.h + 1)).w) ? (k[_].push({
						x: O.x,
						y: O.y,
						w: O.w,
						h: O.h,
						ref: 3,
						andada: C.w + 1 - v
					}), E.push.apply(E, Object(i.a)(d([O.x, O.y, O.w + 1, O.h + 1]))), _ > F && (F = _), v += _) : v++;
					for (v = 0, 3 == C.ref && (v += C.andada); v <= C.w;) - 1 != (_ = (O = c(w, C.x + C.w - v, C.y - 1)).w) ? (k[_].push({
						x: O.x,
						y: O.y,
						w: O.w,
						h: O.h,
						ref: 4,
						andada: C.w + 1 - v
					}), E.push.apply(E, Object(i.a)(d([O.x, O.y, O.w + 1, O.h + 1]))), _ > F && (F = _), v += _) : v++;
					for (C = k[F].pop(); null == C && F > 0;) C = k[--F].pop()
				} while (null != C);
				return E
			}
			var R = r("YSmr"),
				G = r("kOrG"),
				Y = r("QW0y");
			var I = Object(A.c)((function(e) {
					var t = Object(l.useRef)(),
						r = Object(l.useRef)();

					function n(o, n) {
						var s = D(n, r.current, e.scale / e.density),
							a = e.thickness * e.density;
						o.clearRect(0, 0, e.width * e.density, e.height * e.density), o.fillStyle = "#FFF", o.strokeStyle = "#FFF", o.lineWidth = 2 * e.density, o.beginPath(), o.arc.apply(o, Object(i.a)(s).concat([a / 2 + 1, 0, 2 * Math.PI])), t.current ? o.fill() : o.stroke(), o.beginPath(), o.moveTo(s[0], s[1] - a / 2 - 2.5 * e.density), o.lineTo(s[0], s[1] - a / 2 - 10.5 * e.density), o.stroke(), o.beginPath(), o.moveTo(s[0], s[1] + a / 2 + 2.5 * e.density), o.lineTo(s[0], s[1] + a / 2 + 10.5 * e.density), o.stroke(), o.beginPath(), o.moveTo(s[0] - a / 2 - 2.5 * e.density, s[1]), o.lineTo(s[0] - a / 2 - 10.5 * e.density, s[1]), o.stroke(), o.beginPath(), o.moveTo(s[0] + a / 2 + 2.5 * e.density, s[1]), o.lineTo(s[0] + a / 2 + 10.5 * e.density, s[1]), o.stroke(), o.strokeStyle = "#000", o.lineWidth = 1 * e.density, o.beginPath(), o.arc.apply(o, Object(i.a)(s).concat([a / 2, 0, 2 * Math.PI])), o.stroke(), o.beginPath(), o.moveTo(s[0], s[1] - a / 2 - 3 * e.density), o.lineTo(s[0], s[1] - a / 2 - 10 * e.density), o.stroke(), o.beginPath(), o.moveTo(s[0], s[1] + a / 2 + 3 * e.density), o.lineTo(s[0], s[1] + a / 2 + 10 * e.density), o.stroke(), o.beginPath(), o.moveTo(s[0] - a / 2 - 3 * e.density, s[1]), o.lineTo(s[0] - a / 2 - 10 * e.density, s[1]), o.stroke(), o.beginPath(), o.moveTo(s[0] + a / 2 + 3 * e.density, s[1]), o.lineTo(s[0] + a / 2 + 10 * e.density, s[1]), o.stroke()
					}
					return Object(l.useEffect)((function() {
						t.current = !1;
						var o = r.current.getContext("2d");

						function i(e) {
							t.current = !0, n(o, e)
						}

						function s(e) {
							t.current = !1, n(o, e)
						}

						function a(e) {
							n(o, e)
						}
						return document.addEventListener("mousemove", a, !1), document.addEventListener("touchmove", a, !1), e.hidden && (r.current.addEventListener("mousedown", i, !1), r.current.addEventListener("touchstart", i, !1), document.addEventListener("mouseup", s, !1), document.addEventListener("mousecancel", s, !1), document.addEventListener("touchend", s, !1), document.addEventListener("touchcancel", s, !1)),
							function() {
								document.removeEventListener("mousemove", a, !1), document.removeEventListener("touchmove", a, !1), e.hidden && (document.removeEventListener("mouseup", s, !1), document.removeEventListener("mousecancel", s, !1), document.removeEventListener("touchend", s, !1), document.removeEventListener("touchcancel", s, !1))
							}
					}), [e.thickness, e.scale]), Object(o.jsxs)(o.Fragment, {
						children: [Object(o.jsx)("canvas", {
							ref: r,
							width: e.width * e.density,
							height: e.height * e.density,
							className: a.a.dynamic([
								["3457905390", [e.width, e.height]]
							])
						}), Object(o.jsx)(a.a, {
							id: "3457905390",
							dynamic: [e.width, e.height],
							children: ["canvas.__jsx-style-dynamic-selector{position:absolute;top:0;left:0;cursor:none;width:".concat(e.width, "px;height:").concat(e.height, "px;}")]
						})]
					})
				}), (function(e) {
					return {
						scale: e.scale
					}
				})),
				X = r("xvhg"),
				q = r("H+61"),
				U = r("UlJF");

			function Q(e) {
				if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return e
			}

			function W(e, t) {
				return (W = Object.setPrototypeOf || function(e, t) {
					return e.__proto__ = t, e
				})(e, t)
			}

			function H(e) {
				return (H = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}

			function Z(e, t) {
				return !t || "object" !== H(t) && "function" !== typeof t ? Q(e) : t
			}

			function V(e) {
				return (V = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
					return e.__proto__ || Object.getPrototypeOf(e)
				})(e)
			}
			var J = r("cpVT");

			function $(e) {
				var t = function() {
					if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
					if (Reflect.construct.sham) return !1;
					if ("function" === typeof Proxy) return !0;
					try {
						return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
					} catch (e) {
						return !1
					}
				}();
				return function() {
					var r, o = V(e);
					if (t) {
						var n = V(this).constructor;
						r = Reflect.construct(o, arguments, n)
					} else r = o.apply(this, arguments);
					return Z(this, r)
				}
			}
			var ee = function(e) {
				! function(e, t) {
					if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							writable: !0,
							configurable: !0
						}
					}), t && W(e, t)
				}(r, e);
				var t = $(r);

				function r(e) {
					var o;
					return Object(q.a)(this, r), o = t.call(this, e), Object(J.a)(Q(o), "_unblock", (function(e) {
						o._blocked = !1;
						var t = D(e, o._ref.current, o.props.scale / o._zoom),
							r = Object(X.a)(t, 2),
							n = r[0],
							i = r[1];
						o._coord = {
							x: n * o.props.density,
							y: i * o.props.density,
							new: !0
						}, [R.Kb, R.Lb, R.Ob, R.Qb, R.Rb].includes(o.props.tool) && o._pathsGeo.push({
							nivel: 6,
							tool: o.props.tool
						})
					})), Object(J.a)(Q(o), "_block", (function(e) {
						if (o._blocked = !0, o._pathsGeo.length) {
							var t = o._pathsGeo.length - 1;
							o._pathsGeo[t].pos ? 6 == o._pathsGeo[t].nivel && (o._pathsGeo[t].nivel = 5) : o._pathsGeo.splice(t, 1)
						}
					})), Object(J.a)(Q(o), "_move", (function(e) {
						if (o._active && !o._blocked) {
							var t = D(e, o._ref.current, o.props.scale / o._zoom),
								r = Object(X.a)(t, 2),
								n = r[0],
								i = r[1];
							n *= o.props.density, i *= o.props.density, o._coord && ([R.Pb, R.Mb].includes(o.props.tool) ? (o._paths.push({
								pos: [o._coord.x, o._coord.y, n, i],
								nivel: 5,
								new: o._coord.new
							}), o._coord = {
								x: n,
								y: i
							}) : o._pathsGeo.length > 0 && [R.Kb, R.Lb, R.Ob, R.Qb, R.Rb].includes(o.props.tool) && (o._pathsGeo[o._pathsGeo.length - 1].pos = [o._coord.x, o._coord.y, n, i]))
						}
					})), Object(J.a)(Q(o), "_animate", (function() {
						if (o._active) {
							var e, t, r, n, i = Date.now(),
								s = -1;
							o._ctx.clearRect(0, 0, o.props.width * o.props.density, o.props.height * o.props.density), o._ctx.lineWidth = o.props.thickness * o.props.density;
							for (var a = 0; a < o._paths.length; a++) {
								if (s != (r = o._paths[a]).nivel || r.new) {
									if (-1 != s && (o._ctx.lineTo(t.pos[2], t.pos[3]), o._ctx.stroke()), r.new) {
										s = -1;
										continue
									}
									o._ctx.beginPath(), o._ctx.moveTo(r.pos[0], r.pos[1]), n = o._opacities - 500 * (5 - r.nivel)
								}
								if (t = r, e = i - n, 4 == (n = Math.ceil((2500 - e) / 2500 * 1e3) + "").length) o._ctx.strokeStyle = "rgb(".concat(o._color, ")");
								else {
									for (var c = 0; c < 3 - n.length; c++) n = "0" + n;
									o._ctx.strokeStyle = "rgba(".concat(o._color + ",." + n, ")")
								}
								o._ctx.quadraticCurveTo(t.pos[0], t.pos[1], t.pos[0] + (t.pos[2] - t.pos[0]) / 2, t.pos[1] + (t.pos[3] - t.pos[1]) / 2), s = t.nivel
							} - 1 != s && (o._ctx.lineTo(t.pos[2], t.pos[3]), o._ctx.stroke());
							for (var l = 0; l < o._pathsGeo.length; l++)
								if ((r = o._pathsGeo[l]).pos) {
									if (6 == r.nivel) o._ctx.strokeStyle = "rgb(".concat(o._color, ")");
									else if (e = i - (n = o._opacities - 500 * (5 - r.nivel)), 4 == (n = Math.ceil((2500 - e) / 2500 * 1e3) + "").length) o._ctx.strokeStyle = "rgb(".concat(o._color, ")");
									else {
										for (var x = 0; x < 3 - n.length; x++) n = "0" + n;
										o._ctx.strokeStyle = "rgba(".concat(o._color + ",." + n, ")")
									}
									switch (o._ctx.fillStyle = o._ctx.strokeStyle, r.tool) {
										case R.Ob:
											o._ctx.beginPath(), o._ctx.moveTo(r.pos[0], r.pos[1]), o._ctx.lineTo(r.pos[2], r.pos[3]), o._ctx.stroke();
											break;
										case R.Rb:
											o._ctx.beginPath(), o._ctx.rect(r.pos[0], r.pos[1], r.pos[2] - r.pos[0], r.pos[3] - r.pos[1]), o._ctx.stroke();
											break;
										case R.Qb:
											o._ctx.beginPath(), o._ctx.rect(r.pos[0], r.pos[1], r.pos[2] - r.pos[0], r.pos[3] - r.pos[1]), o._ctx.fill();
											break;
										case R.Lb:
											var p = (r.pos[2] - r.pos[0]) / 2,
												d = (r.pos[3] - r.pos[1]) / 2,
												b = Math.round(r.pos[0] + p),
												u = Math.round(r.pos[1] + d),
												f = (Math.sqrt(2) - 1) / 3 * 4;
											o._ctx.beginPath(), o._ctx.moveTo(b, u - d), o._ctx.bezierCurveTo(b + f * p, u - d, b + p, u - f * d, b + p, u), o._ctx.bezierCurveTo(b + p, u + f * d, b + f * p, u + d, b, u + d), o._ctx.bezierCurveTo(b - f * p, u + d, b - p, u + f * d, b - p, u), o._ctx.bezierCurveTo(b - p, u - f * d, b - f * p, u - d, b, u - d), o._ctx.stroke();
											break;
										case R.Kb:
											var h = (r.pos[2] - r.pos[0]) / 2,
												m = (r.pos[3] - r.pos[1]) / 2,
												g = Math.round(r.pos[0] + h),
												j = Math.round(r.pos[1] + m),
												w = (Math.sqrt(2) - 1) / 3 * 4;
											o._ctx.beginPath(), o._ctx.moveTo(g, j - m), o._ctx.bezierCurveTo(g + w * h, j - m, g + h, j - w * m, g + h, j), o._ctx.bezierCurveTo(g + h, j + w * m, g + w * h, j + m, g, j + m), o._ctx.bezierCurveTo(g - w * h, j + m, g - h, j + w * m, g - h, j), o._ctx.bezierCurveTo(g - h, j - w * m, g - w * h, j - m, g, j - m), o._ctx.fill()
									}
								}
							window.requestAnimationFrame(o._animate)
						}
					})), o._ctx = null, o._paths = [], o._pathsGeo = [], o._coord = null, o._opacities = Date.now(), o._ref = x.a.createRef(), o._timer = !1, o._active = !1, o._color = "50,50,50", o._blocked = !0, o._widthChange = 0, o._zoom = 1, o
				}
				return Object(U.a)(r, [{
					key: "componentDidMount",
					value: function() {
						this.start(), this.props.mobile && (this._zoom = R.d / this._ref.current.offsetHeight, this._widthChange = (R.e / this._zoom - window.innerWidth) / 2), document.addEventListener("mousedown", this._unblock, !1), document.addEventListener("mouseup", this._block, !1), document.addEventListener("mousecancel", this._block, !1), document.addEventListener("touchstart", this._unblock, !1), document.addEventListener("touchend", this._block, !1), document.addEventListener("touchcancel", this._block, !1)
					}
				}, {
					key: "componentWillUnmount",
					value: function() {
						this.stop(), document.removeEventListener("mousedown", this._unblock, !1), document.removeEventListener("mouseup", this._block, !1), document.removeEventListener("mousecancel", this._block, !1), document.removeEventListener("touchstart", this._unblock, !1), document.removeEventListener("touchend", this._block, !1), document.removeEventListener("touchcancel", this._block, !1)
					}
				}, {
					key: "start",
					value: function() {
						var e = this;
						if (!this._active) {
							var t = this._ref.current;
							this._paths = [], this._coord = null, this._opacities = Date.now(), this._ctx = t.getContext("2d"), this._ctx.strokeStyle = "rgb(".concat(this._color, ")"), this._ctx.lineCap = "round", window.requestAnimationFrame(this._animate), document.addEventListener("mousemove", this._move, !0), document.addEventListener("touchmove", this._move, !0), this._timer = setInterval((function() {
								for (var t, r = 0; r < e._paths.length; r++)(t = e._paths[r]).nivel--, 0 === t.nivel && e._paths.splice(r--, 1);
								for (var o = 0; o < e._pathsGeo.length; o++) 6 != (t = e._pathsGeo[o]).nivel && (t.nivel--, 0 === t.nivel && e._pathsGeo.splice(o--, 1));
								e._opacities = Date.now()
							}), 500), this._active = !0
						}
					}
				}, {
					key: "stop",
					value: function() {
						this._active && (this._active = !1, document.removeEventListener("mousemove", this._move, !0), document.removeEventListener("touchmove", this._move, !0), this._timer && clearInterval(this._timer))
					}
				}, {
					key: "render",
					value: function() {
						return Object(o.jsxs)(o.Fragment, {
							children: [Object(o.jsx)("canvas", {
								ref: this._ref,
								width: this.props.width * this.props.density,
								height: this.props.height * this.props.density,
								className: a.a.dynamic([
									["3798211712", [this.props.width, this.props.height]]
								])
							}), Object(o.jsx)(a.a, {
								id: "3798211712",
								dynamic: [this.props.width, this.props.height],
								children: ["canvas.__jsx-style-dynamic-selector{position:absolute;cursor:none;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:".concat(this.props.width, "px;height:").concat(this.props.height, "px;}")]
							})]
						})
					}
				}]), r
			}(x.a.Component);
			var te = Object(A.c)(ee, (function(e) {
					return {
						scale: e.scale,
						mobile: e.mobile
					}
				})),
				re = r("TSYQ"),
				oe = r.n(re),
				ne = [
					[R.Pb, "pen"],
					[R.Mb, "ers"],
					[R.Rb, "reb"],
					[R.Lb, "ellb"],
					[R.Qb, "rec"],
					[R.Kb, "ell"],
					[R.Ob, "lin"],
					[R.Nb, "fil"]
				];
			var ie = function(e) {
					return Object(o.jsxs)("div", {
						className: "jsx-4206980828 " + (oe()("tools", {
							disabled: e.disabled,
							submenu: e.submenu
						}) || ""),
						children: [Object(o.jsxs)("div", {
							className: "jsx-4206980828",
							children: [ne.map((function(t) {
								var r = Object(X.a)(t, 2),
									n = r[0],
									i = r[1];
								return e.fillBlock && [R.Nb, R.Qb, R.Kb].includes(n) && !e.disabled ? Object(o.jsx)("div", {
									className: "jsx-4206980828 " + (oe()("tool", "block", i, {
										sel: n == e.value
									}) || "")
								}, n) : Object(o.jsx)("div", {
									onClick: e.disabled ? null : function() {
										return e.onChange(n)
									},
									className: "jsx-4206980828 " + (oe()("tool", i, {
										sel: n == e.value
									}) || "")
								}, n)
							})), Object(o.jsx)("div", {
								onClick: function() {
									return e.onUndo()
								},
								className: "jsx-4206980828 tool undo"
							}), Object(o.jsx)("div", {
								onClick: function() {
									return e.onRedo()
								},
								className: "jsx-4206980828 tool redo"
							})]
						}), Object(o.jsx)(a.a, {
							id: "2569901839",
							children: [".tools.jsx-4206980828{-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}", ".tools.jsx-4206980828>div.jsx-4206980828{padding:8px;width:106px;height:298px;border-radius:9px;border:2px rgba(255,142,175,.0) solid;background-color:rgba(94,25,51,.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;}", ".tool.jsx-4206980828{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:relative;cursor:pointer;width:46px;height:50px;border:2px rgba(255,142,175,0.6) solid;border-radius:5px;margin:0 0 7px;}", ".tool.jsx-4206980828:hover{border-color:rgba(255,142,175,1);}", ".tool.jsx-4206980828:hover.jsx-4206980828:after{color:rgba(255,142,175,1);}", ".tool.jsx-4206980828:hover.jsx-4206980828:before{background-color:rgba(216,216,216,.15);}", ".tool.jsx-4206980828:before{content:'';margin:2px;-webkit-flex:1;-ms-flex:1;flex:1;border-radius:3px;-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;}", ".tool.block.jsx-4206980828{opacity:.5;}", ".tool.sel.jsx-4206980828,.tool.jsx-4206980828:active{border-color:#FFF;}", ".sel.jsx-4206980828:before,.sel.jsx-4206980828:hover.jsx-4206980828:before,.tool.jsx-4206980828:active.jsx-4206980828:before{background-color:rgba(216,216,216,.5);}", ".tool.sel.jsx-4206980828:after,.tool.sel.jsx-4206980828:hover.jsx-4206980828:after,.tool.jsx-4206980828:active.jsx-4206980828:after{color:#FFF;}", ".tool.jsx-4206980828:after{position:absolute;font-family:ico;font-size:25px;color:rgba(255,142,175,0.6);}", ".undo.jsx-4206980828,.redo.jsx-4206980828{margin:0;}", ".pen.jsx-4206980828:after{font-size:29px;content:'\\e905';}", ".ers.jsx-4206980828:after{font-size:30px;content:'\\e903';}", ".lin.jsx-4206980828:after{font-size:30px;content:'\\e902';}", ".reb.jsx-4206980828:after{content:'\\e90a';}", ".ellb.jsx-4206980828:after{content:'\\e90c';}", ".rec.jsx-4206980828:after{content:'\\e909';}", ".ell.jsx-4206980828:after{content:'\\e90b';}", ".fil.jsx-4206980828:after{font-size:29px;content:'\\e904';}", ".undo.jsx-4206980828:after{content:'\\e901';}", ".redo.jsx-4206980828:after{content:'\\e900';}", ".disabled.jsx-4206980828>div.jsx-4206980828{background-color:rgba(94,25,51,.4);border-color:rgba(255,142,175,.3);}", ".disabled.jsx-4206980828 .tool.jsx-4206980828,.disabled.jsx-4206980828 .tool.jsx-4206980828:hover{border-color:rgba(255,142,175,.3);background-color:rgba(255,142,175,.1) !important;cursor:initial;}", ".disabled.jsx-4206980828 .tool.jsx-4206980828:after,.disabled.jsx-4206980828 .tool.jsx-4206980828:hover.jsx-4206980828:after{color:rgba(255,142,175,.3);}", ".disabled.jsx-4206980828 .tool.sel.jsx-4206980828:before,.disabled.jsx-4206980828 .tool.jsx-4206980828:active.jsx-4206980828:before,.disabled.jsx-4206980828 .tool.jsx-4206980828:hover.jsx-4206980828:before{display:none;}", "@media (max-width:640px){.tools.jsx-4206980828{position:absolute;bottom:85px;left:0;display:none;}.tools.submenu.jsx-4206980828{display:inherit;}.tools.jsx-4206980828>div.jsx-4206980828{padding:5px;width:96px;height:254px;border-width:0;background:transparent;}.tool.jsx-4206980828{width:42px;height:44px;border:2px #9C81CB solid;border-radius:4px;margin:0 0 3px;}.tool.jsx-4206980828:before{margin:1px;background-color:rgba(255,255,255,.75);}.tool.jsx-4206980828:after{color:#9C81CB;}.tool.jsx-4206980828:hover{border-color:#9C81CB;}.tool.jsx-4206980828:hover.jsx-4206980828:after{color:#FFF;}.tool.jsx-4206980828:hover.jsx-4206980828:before{background-color:rgba(156,129,203,.8);}.tool.sel.jsx-4206980828,.tool.jsx-4206980828:active{border-color:#9C81CB;}.sel.jsx-4206980828:before,.sel.jsx-4206980828:hover.jsx-4206980828:before,.tool.jsx-4206980828:active.jsx-4206980828:before{background-color:rgba(156,129,203,.8);}.tool.sel.jsx-4206980828:after,.tool.sel.jsx-4206980828:hover.jsx-4206980828:after,.tool.jsx-4206980828:active.jsx-4206980828:after{color:#FFF;}}"]
						}), Object(o.jsx)(a.a, {
							id: "3185328314",
							children: ["@media (max-width:640px){.ar .tools{left:initial;right:0;}}"]
						})]
					})
				},
				se = ["#000000", "#666666", "#0050CD", "#FFFFFF", "#AAAAAA", "#26C9FF", "#017420", "#691506", "#964112", "#11B03C", "#FF0013", "#FF7829", "#B0701C", "#99004E", "#CB5A57", "#FFC126", "#FF008F", "#FEAFA8"];
			var ae = function(e) {
					var t = e.value,
						r = e.disabled,
						n = e.onChange;
					return Object(o.jsxs)("div", {
						className: "jsx-3071142060 " + (oe()("colors", {
							disabled: r
						}) || ""),
						children: [Object(o.jsxs)("div", {
							className: "jsx-3071142060",
							children: [se.map((function(e) {
								return Object(o.jsx)("div", {
									style: {
										backgroundColor: e
									},
									onClick: r ? null : function() {
										return n(e)
									},
									className: "jsx-3071142060 " + (oe()("color", {
										sel: e == t
									}) || "")
								}, e)
							})), Object(o.jsx)("input", {
								disabled: r,
								type: "color",
								value: r ? "#AF3B4E" : t,
								onChange: function(e) {
									return n(e.target.value)
								},
								className: "jsx-3071142060"
							})]
						}), Object(o.jsx)(a.a, {
							id: "3071142060",
							children: [".colors.jsx-3071142060{-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}", ".colors.jsx-3071142060>div.jsx-3071142060{padding:10px 8px;width:106px;height:296px;border-radius:9px;background-color:rgba(94,25,51,.5);border:2px rgba(94,25,51,0) solid;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;}", ".color.jsx-3071142060{border:2px solid #4F163A;width:28px;height:29px;border-radius:4px;cursor:pointer;margin:0 0 7px;}", "input.jsx-3071142060{border:2px solid #4F163A;border-radius:5px;width:102px;height:52px;padding:0;-webkit-appearance:none;cursor:pointer;background:none;}", 'input[type="color"].jsx-3071142060::-webkit-color-swatch-wrapper{padding:0;border-radius:4px;}', 'input[type="color"].jsx-3071142060::-webkit-color-swatch{border:none;border-radius:4px;}', ".disabled.jsx-3071142060>div.jsx-3071142060{background-color:rgba(94,25,51,.4);border-color:rgba(255,142,175,.3);}", ".disabled.jsx-3071142060 .color.jsx-3071142060{border-color:rgba(255,142,175,.3);background-color:rgba(255,142,175,.1) !important;cursor:initial;}", "input.jsx-3071142060:disabled{cursor:initial;border-color:rgba(255,142,175,.3);}", "@media (max-width:640px){input.jsx-3071142060{display:none;}.colors.jsx-3071142060{overflow:scroll;margin:0 5px;width:124px;height:52px;border-radius:4px;background-color:rgba(94,25,51,.5);border:2px rgba(94,25,51,0) solid;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;}.disabled.jsx-3071142060{background-color:rgba(94,25,51,.4);border-color:rgba(255,142,175,.3);}.disabled.jsx-3071142060>div.jsx-3071142060{background-color:transparent;border-color:transparent;}.colors.jsx-3071142060>div.jsx-3071142060{width:217px;height:auto;background-color:transparent;padding:0;border-radius:0;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;}.color.jsx-3071142060{border:1px solid #4F163A;width:18px;height:18px;border-radius:2px;margin:2px;}.sel.jsx-3071142060{box-shadow:0 0 0 1px rgba(255,255,255,.6);}.disabled.jsx-3071142060>div.jsx-3071142060 .sel.jsx-3071142060{box-shadow:none;}}"]
						})]
					})
				},
				ce = [2, 6, 10, 14, 18];
			var le = function(e) {
					return Object(o.jsxs)("div", {
						className: "jsx-340028725 " + (oe()("options", {
							disabled: e.disabled,
							submenu: e.submenu
						}) || ""),
						children: [Object(o.jsx)("div", {
							className: "jsx-340028725",
							children: [ce.map((function(t) {
								return Object(o.jsx)("div", {
									onClick: e.disabled ? null : function() {
                                        document.getElementsByClassName("thikness-input")[0].value=t;
										return e.onChangeThickness(t)
									},
									className: "jsx-340028725 " + (oe()("thickness", {
										sel: e.thickness == t
									}) || "")
								}, t)
							})), Object(o.jsx)("input", {
                                maxLength: 3,
                                type: "text",
                                onChange: function(t) {
                                    if (t.target.value>500){t.target.value=500;}
                                    if (t.target.value=="00" || t.target.value=="000"){t.target.value=0;}
                                    t.target.value = t.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
                                    return e.onChangeThickness(t.target.value);
                                },
                                className: "thikness-input"
                            })]
						}), Object(o.jsxs)("div", {
							className: "jsx-340028725 bxopacity",
							children: [Object(o.jsx)("span", {
								className: "jsx-340028725"
							}), Object(o.jsx)("input", {
								disabled: e.disabled,
								type: "range",
								value: e.opacity,
								min: "0.1",
								max: "1",
								step: "0.1",
								onChange: function(t) {
									return e.onChangeOpacity(t.target.value)
								},
								className: "jsx-340028725"
							}), Object(o.jsx)("span", {
								className: "jsx-340028725"
							})]
						}), Object(o.jsx)(a.a, {
							id: "2464861888",
							children: [".options.jsx-340028725{width:560px;height:54px;padding:3px;border-radius:9px;background-color:rgba(94,25,51,.5);border:2px rgba(94,25,51,0) solid;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}", ".options.jsx-340028725>div.jsx-340028725{padding:0 15px;-webkit-flex:1;-ms-flex:1;flex:1;border:2px rgba(255,142,175,.6) solid;border-radius:9px;margin:4px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}", ".thickness.jsx-340028725{cursor:pointer;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:2px rgba(255,142,175,0.6) solid;width:28px;height:28px;border-radius:100%;}", ".thickness.jsx-340028725:hover{border-color:rgba(255,142,175,1);}", ".thickness.jsx-340028725:hover.jsx-340028725:before{background-color:rgba(255,142,175,1);}", ".thickness.jsx-340028725:hover.jsx-340028725:after{background-color:rgba(216,216,216,.15);}", ".thickness.jsx-340028725:before{position:absolute;content:'';background-color:rgba(255,142,175,0.6);border-radius:100%;}", ".thickness.jsx-340028725:after{content:'';margin:2px;-webkit-flex:1;-ms-flex:1;flex:1;border-radius:3px;-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;border-radius:50%;}", ".thickness.sel.jsx-340028725,.thickness.sel.jsx-340028725:hover{border-color:#FFF;}", ".thickness.sel.jsx-340028725:before,.thickness.sel.jsx-340028725:hover.jsx-340028725:before{background-color:#FFF;}", ".thickness.sel.jsx-340028725:after,.thickness.sel.jsx-340028725:hover.jsx-340028725:after{background-color:rgba(216,216,216,.5);}", ".thickness.jsx-340028725:nth-child(1):before{width:2px;height:2px;}", ".thickness.jsx-340028725:nth-child(2):before{width:6px;height:6px;}", ".thickness.jsx-340028725:nth-child(3):before{width:10px;height:10px;}", ".thickness.jsx-340028725:nth-child(4):before{width:14px;height:14px;}", ".thickness.jsx-340028725:nth-child(5):before{width:18px;height:18px;}", ".bxopacity.jsx-340028725 span.jsx-340028725{width:18px;height:18px;border:2px #FFF solid;border-radius:50%;}", ".bxopacity.jsx-340028725 span.jsx-340028725:nth-of-type(1){background-color:rgba(255,255,255,.34);}", ".bxopacity.jsx-340028725 span.jsx-340028725:nth-of-type(2){background-color:#FFF;}", "input[type=range].jsx-340028725{background:none;-webkit-appearance:none;width:170px;}", "input[type=range].jsx-340028725:focus{outline:none;}", "input[type=range].jsx-340028725::-webkit-slider-runnable-track{width:100%;height:5px;cursor:pointer;-webkit-animate:0.2s-jsx-340028725;animate:0.2s-jsx-340028725;box-shadow:0px 0px 0px #000000;background:#4F163A;border-radius:5px;border:0px solid #000000;}", "input[type=range].jsx-340028725:disabled.jsx-340028725::-webkit-slider-runnable-track{background:rgba(255,142,175,.3);}", "input[type=range].jsx-340028725::-webkit-slider-thumb{border:none;height:20px;width:20px;border-radius:50px;background:#E16D8F;cursor:pointer;-webkit-appearance:none;margin-top:-8px;}", "input[type=range].jsx-340028725:hover.jsx-340028725::-webkit-slider-thumb{background:#F8A8BF;}", "input[type=range].jsx-340028725:disabled.jsx-340028725::-webkit-slider-thumb{display:none;}", "input[type=range].jsx-340028725:focus.jsx-340028725::-webkit-slider-runnable-track{background:#4F163A;}", "input[type=range].jsx-340028725::-moz-range-track{width:100%;height:5px;cursor:pointer;-webkit-animate:0.2s-jsx-340028725;animate:0.2s-jsx-340028725;box-shadow:0px 0px 0px #000000;background:#4F163A;border-radius:5px;border:0px solid #000000;}", "input[type=range].jsx-340028725:disabled.jsx-340028725::-moz-range-track{background:rgba(255,142,175,.3);}", "input[type=range].jsx-340028725::-moz-range-thumb{border:none;height:20px;width:20px;border-radius:50px;background:#E16D8F;cursor:pointer;}", "input[type=range].jsx-340028725:hover.jsx-340028725::-moz-range-thumb{background:#F8A8BF;}", "input[type=range].jsx-340028725:disabled.jsx-340028725::-moz-range-thumb{display:none;}", "input[type=range].jsx-340028725::-ms-track{width:100%;height:5px;cursor:pointer;-webkit-animate:0.2s-jsx-340028725;animate:0.2s-jsx-340028725;background:transparent;border-color:transparent;color:transparent;}", "input[type=range].jsx-340028725::-ms-fill-lower{background:#4F163A;border:0px solid #000000;border-radius:10px;box-shadow:0px 0px 0px #000000;}", "input[type=range].jsx-340028725:disabled.jsx-340028725::-ms-fill-lower{background:rgba(255,142,175,.3);}", "input[type=range].jsx-340028725::-ms-fill-upper{background:#4F163A;border:0px solid #000000;border-radius:10px;box-shadow:0px 0px 0px #000000;}", "input[type=range].jsx-340028725::-ms-thumb{border:none;height:20px;width:20px;border-radius:50px;background:#E16D8F;cursor:pointer;}", "input[type=range].jsx-340028725:hover.jsx-340028725::-ms-thumb{background:#F8A8BF;}", "input[type=range].jsx-340028725:disabled.jsx-340028725::-ms-thumb{display:none;}", "input[type=range].jsx-340028725:focus.jsx-340028725::-ms-fill-lower{background:#4F163A;}", "input[type=range].jsx-340028725:focus.jsx-340028725::-ms-fill-upper{background:#4F163A;}", ".disabled.jsx-340028725{background-color:rgba(94,25,51,.4);border-color:rgba(255,142,175,.3);}", ".disabled.jsx-340028725>div.jsx-340028725,.disabled.jsx-340028725 .thickness.jsx-340028725,.disabled.jsx-340028725 .thickness.jsx-340028725:hover{cursor:initial;border-color:rgba(255,142,175,.3);}", ".disabled.jsx-340028725 .thickness.sel.jsx-340028725:after,.disabled.jsx-340028725 .thickness.sel.jsx-340028725:hover.jsx-340028725:after,.disabled.jsx-340028725 .thickness.jsx-340028725:hover.jsx-340028725:after{display:none;}", ".disabled.jsx-340028725 .thickness.jsx-340028725:before,.disabled.jsx-340028725 .thickness.jsx-340028725:hover.jsx-340028725:before{background-color:rgba(255,142,175,.3);}", ".disabled.jsx-340028725 .bxopacity.jsx-340028725 span.jsx-340028725{border-color:rgba(255,142,175,0);background-color:rgba(255,142,175,.3);}", ".disabled.jsx-340028725 .bxopacity.jsx-340028725 span.jsx-340028725:nth-of-type(1){border-color:rgba(255,142,175,.3);background-color:rgba(255,142,175,0);}", "@media (max-width:640px){.options.jsx-340028725{width:90px;height:197px;border-radius:0;border-width:0;background:transparent;display:none;}.options.submenu.jsx-340028725{display:inherit;}.options.jsx-340028725>div.jsx-340028725{background-color:rgba(255,255,255,.75);padding:5px;border-color:#9C81CB;border-radius:5px;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:calc(100% - 10px);margin:0 4px;}.thickness.jsx-340028725{border-color:#9C81CB;width:26px;height:26px;}.thickness.jsx-340028725:before{background-color:#9C81CB;}.thickness.jsx-340028725:hover{border-color:#9C81CB;}.thickness.jsx-340028725:hover.jsx-340028725:before{background-color:#9C81CB;}.thickness.jsx-340028725:hover.jsx-340028725:after{background-color:rgba(156,129,203,.7);}.thickness.sel.jsx-340028725,.thickness.sel.jsx-340028725:hover{border-color:#9C81CB;}.thickness.sel.jsx-340028725:before,.thickness.sel.jsx-340028725:hover.jsx-340028725:before{background-color:#9C81CB;}.thickness.sel.jsx-340028725:after,.thickness.sel.jsx-340028725:hover.jsx-340028725:after{background-color:rgba(156,129,203,.7);}.bxopacity.jsx-340028725{width:30px;}.bxopacity.jsx-340028725 span.jsx-340028725{border-color:#9C81CB;}.bxopacity.jsx-340028725 span.jsx-340028725:nth-of-type(1){background-color:#9C81CB;}.bxopacity.jsx-340028725 span.jsx-340028725:nth-of-type(2){background-color:transparent;}input[type=range].jsx-340028725{width:120px;-webkit-transform:rotateZ(-90deg);-ms-transform:rotateZ(-90deg);transform:rotateZ(-90deg);}input[type=range].jsx-340028725::-webkit-slider-runnable-track{background:#9C81CB;}input[type=range].jsx-340028725::-webkit-slider-thumb{border:2px #9C81CB solid;background:#FFF;}input[type=range].jsx-340028725:hover.jsx-340028725::-webkit-slider-thumb{background:#9C81CB;}}"]
						}), Object(o.jsx)(a.a, {
							id: "4060568284",
							children: ["@media (max-width:640px){.ar .options .bxopacity span:nth-of-type(1){background-color:transparent;}.ar .options .bxopacity span:nth-of-type(2){background-color:#9C81CB;}}"]
						})]
					})
				},
				xe = r("cXB8"),
				pe = r("6VPp"),
				de = r("umcP"),
				be = r("WZCv");
			var ue = function(e) {
				return Object(o.jsxs)("div", {
					className: "jsx-1759433088 toolsmobile",
					children: [Object(o.jsx)("button", {
						onClick: function() {
							return e.onChange(R.Eb)
						},
						disabled: e.disabled,
						className: "jsx-1759433088 " + ("tool " + ["pen", "ers", "lin", "reb", "ellb", "rec", "ell", "fil"][e.value - 1] || !1)
					}), Object(o.jsx)("button", {
						onClick: function() {
							return e.onChange(R.Db)
						},
						disabled: e.disabled,
						className: "jsx-1759433088 opacity"
					}), e.children, Object(o.jsx)(a.a, {
						id: "241478012",
						children: [".toolsmobile.jsx-1759433088{-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;padding:10px 5px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}", "button.jsx-1759433088{margin:0 0 0 5px;width:50px;height:52px;border-radius:3px;background:#FFFFFF;border:none;box-shadow:0 3px 0 #CBC6D8;color:#481D92;}", "button.jsx-1759433088:active{-webkit-transform:translateY(2px);-ms-transform:translateY(2px);transform:translateY(2px);background-color:#C2AEE3;box-shadow:0 1px 0 #CBC6D8;}", "button.jsx-1759433088:disabled{opacity:.47;cursor:none;}", "button.jsx-1759433088:nth-of-type(1){margin:0;}", ".toolsmobile.jsx-1759433088>.small{width:50px;height:52px;border-radius:3px;background:#FFFFFF;border:none;box-shadow:0 3px 0 #CBC6D8;padding:0;}", ".toolsmobile.jsx-1759433088>.small:active{margin:0;-webkit-transform:translateY(2px);-ms-transform:translateY(2px);transform:translateY(2px);background-color:#C2AEE3;box-shadow:0 1px 0 #CBC6D8;}", ".toolsmobile.jsx-1759433088>.small strong{display:none;}", ".toolsmobile.jsx-1759433088>.small .pencil{width:27px;height:28px;background-image:url(/images/edit_m.svg);}", ".toolsmobile.jsx-1759433088>.small .ready{width:27px;height:22px;background-image:url(/images/check_m.svg);}", ".opacity.jsx-1759433088:before{content:'\\e913';font-family:ico;font-size:30px;}", ".tool.jsx-1759433088:after{font-family:ico;font-size:25px;}", ".pen.jsx-1759433088:after{font-size:29px;content:'\\e905';}", ".ers.jsx-1759433088:after{font-size:30px;content:'\\e903';}", ".lin.jsx-1759433088:after{font-size:30px;content:'\\e902';}", ".reb.jsx-1759433088:after{content:'\\e90a';}", ".ellb.jsx-1759433088:after{content:'\\e90c';}", ".rec.jsx-1759433088:after{content:'\\e909';}", ".ell.jsx-1759433088:after{content:'\\e90b';}", ".fil.jsx-1759433088:after{font-size:29px;content:'\\e904';}"]
					}), Object(o.jsx)(a.a, {
						id: "3760199605",
						children: [".ar .toolsmobile button{margin:0;}", ".ar .toolsmobile button:nth-of-type(2){margin-right:5px;}"]
					})]
				})
			};

			function fe() {
				var e = Object(n.a)(["drawtxt4"]);
				return fe = function() {
					return e
				}, e
			}

			function he() {
				var e = Object(n.a)(["drawtxt3"]);
				return he = function() {
					return e
				}, e
			}

			function me() {
				var e = Object(n.a)(["drawtxt2"]);
				return me = function() {
					return e
				}, e
			}

			function ge() {
				var e = Object(n.a)(["drawtxt1"]);
				return ge = function() {
					return e
				}, e
			}
			var je = !0;
			t.default = Object(A.c)((function(e) {
				var t = Object(c.d)(),
					r = Object(p.useRouter)(),
					n = Object(l.useState)(e.turnNum)[0],
					s = Object(l.useState)(e.previous)[0],
					x = Object(l.useState)(e.lastDraw)[0],
					d = Object(l.useState)(e.draw),
					b = d[0],
					u = d[1],
					f = Object(l.useState)([]),
					h = f[0],
					m = f[1],
					g = Object(l.useState)(1),
					j = g[0],
					w = g[1],
					k = Object(l.useState)("#000000"),
					y = k[0],
					v = k[1],
					_ = Object(l.useState)(1),
					O = _[0],
					C = _[1],
					F = Object(l.useState)(6),
					E = F[0],
					N = F[1],
					z = Object(l.useState)(e.mirror),
					L = z[0],
					T = z[1],
					S = Object(l.useState)(R.Cb),
					M = S[0],
					P = S[1],
					A = Object(l.useRef)(),
					X = Object(l.useRef)(),
					q = Object(l.useRef)();

				function U(e) {
					v(e), P(R.Cb)
				}

				function Q() {
					if (!L) {
						var t = b.slice();
						t.length && A.current.push(t.pop()), e.setData({
							draw: !1
						}), P(R.Cb), Z(!1)
					}
				}

				function W() {
					if (!L && A.current.length) {
						var t = A.current.pop();
						e.setData({
							draw: t
						}), P(R.Cb), Z(t)
					}
				}

				function H(e) {
					T(e), P(R.Cb)
				}

				function Z(t) {
					n == e.turnNum && e.emit(R.Q, {
						t: n,
						v: t
					})
				}
				Object(l.useEffect)((function() {
					document.body.style.backgroundImage = "linear-gradient(215deg, rgba(153,16,80,1) 0%, rgba(231,77,78,1) 85%)", e.socket ? (r.prefetch("/write"), r.prefetch("/memory"), r.prefetch("/book"), A.current = [], e.previous && e.previous.type == R.Xb || G.a.play("yourTurn", !1, .7)) : r.replace("/")
				}), []), Object(l.useEffect)((function() {
					e.turnNum == n && u(e.draw)
				}), [e.draw]), Object(l.useEffect)((function() {
					if (!L) {
						var t = [],
							r = X.current;
						r.addEventListener("mousedown", a, !1), r.addEventListener("touchstart", a, !1);
						var o = 1,
							n = 0;
						e.mobile && (o = R.d / r.offsetHeight, n = (R.e / o - window.innerWidth) / 2);
						var s = e.scale / o;
						return function() {
							r.removeEventListener("mousedown", a, !1), r.removeEventListener("touchstart", a, !1)
						}
					}

					function a(o) {
						o.preventDefault(), P(R.Cb), j == R.Nb ? (Z(t = [j, [y, O]].concat(Object(i.a)(K.apply(void 0, [q.current.getContext("2d")].concat(Object(i.a)(D(o, r, s / R.f, n)), [y, R.e * R.f, R.d * R.f])).map((function(e) {
							return Math.round(e / R.f)
						}))))), e.setData({
							draw: t
						})) : (t = j != R.Mb ? [j, [y, E, O], D(o, r, s, n)] : [j, 2 * E, D(o, r, s, n)], document.addEventListener("mousemove", c, !1), document.addEventListener("touchmove", c, !1), document.addEventListener("mouseup", l, !1), document.addEventListener("mousecancel", l, !1), document.addEventListener("touchend", l, !1), document.addEventListener("touchcancel", l, !1), m([t])), A.current.splice(0)
					}

					function c(e) {
						e.stopPropagation(), j == R.Pb || j == R.Mb ? t.push(D(e, r, s, n)) : t[3] = D(e, r, s, n), m([t])
					}

					function l() {
						Z(t), document.removeEventListener("mousemove", c, !1), document.removeEventListener("touchmove", c, !1), document.removeEventListener("mouseup", l, !1), document.removeEventListener("mousecancel", l, !1), document.removeEventListener("touchend", l, !1), document.removeEventListener("touchcancel", l, !1), e.setData({
							draw: t
						}), m([])
					}
				}), [e.scale, y, E, O, b, j, L, e.mobile]), B("ctrl+z, command+z", Q, [L, b]), B("ctrl+shift+z, command+shift+z", W, [L, b]);
				var V = s && s.type == R.Yb;
				return Object(o.jsxs)("div", {
					className: "jsx-1562482592 draw",
					children: [Object(o.jsx)(xe.a, {
						color: e.mobile ? "#481D92" : "#C02F4E"
					}), Object(o.jsx)(pe.a, {
						value: R.Hb
					}), !e.mobile && Object(o.jsx)(ae, {
						disabled: L,
						onChange: U,
						value: y
					}), Object(o.jsxs)("div", {
						className: "jsx-1562482592 center",
						children: [Object(o.jsx)(be.a, {
							draw: !V,
							subtitle: !e.animate || V ? t(V ? ge() : me()) : t(0 == n ? he() : fe()),
							title: V ? s.data : "",
							dark: e.hidden,
							mirror: e.mirror,
							watermark: !x,
							children: Object(o.jsxs)("div", {
								ref: X,
								className: "jsx-1562482592 drawingContainer",
								children: [x && Object(o.jsx)(Y.a, {
									data: x,
									width: R.e,
									height: R.d,
									density: R.f,
									opacity: .25
								}), Object(o.jsx)(Y.a, {
									ref: q,
									data: b,
									width: R.e,
									height: R.d,
									density: R.f,
									hidden: e.hidden
								}), !e.hidden && Object(o.jsx)(Y.a, {
									data: h,
									width: R.e,
									height: R.d,
									density: R.f
								}), e.hidden && Object(o.jsx)(te, {
									width: R.e,
									height: R.d,
									density: R.f,
									tool: j,
									thickness: E
								}), !L && !e.mobile && Object(o.jsx)(I, {
									width: R.e,
									height: R.d,
									thickness: [R.Nb, R.Qb, R.Kb].includes(j) ? 2 : j != R.Mb ? E : 2 * E,
									density: R.f,
									hidden: e.hidden
								})]
							})
						}), Object(o.jsxs)("div", {
							className: "jsx-1562482592 bottom",
							children: [Object(o.jsx)(le, {
								disabled: L,
								onChangeThickness: function(e) {
									N(e), P(R.Cb)
								},
								onChangeOpacity: function(e) {
									return C(e)
								},
								thickness: E,
								opacity: O,
								submenu: M == R.Db
							}), !e.mobile && Object(o.jsx)(de.a, {
								disabled: e.mirror || !b.length,
								onChange: H
							})]
						})]
					}), e.mobile && Object(o.jsxs)(ue, {
						disabled: L,
						value: j,
						onChange: function(e) {
							L || P((function(t) {
								return t == e ? R.Cb : e
							}))
						},
						children: [Object(o.jsx)(ae, {
							disabled: L,
							onChange: U,
							value: y
						}), Object(o.jsx)(de.a, {
							disabled: e.mirror || !b.length,
							onChange: H
						})]
					}), Object(o.jsx)(ie, {
						disabled: L,
						onChange: function(e) {
							w(e), P(R.Cb)
						},
						value: j,
						onUndo: Q,
						onRedo: W,
						submenu: M == R.Eb,
						fillBlock: e.animate
					}), Object(o.jsx)(a.a, {
						id: "2448119299",
						children: [".draw.jsx-1562482592{position:relative;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}", ".center.jsx-1562482592{padding:35px 0 25px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}", ".drawingContainer.jsx-1562482592{position:relative;}", ".bottom.jsx-1562482592{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:60px;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}", "@media (max-width:640px){.draw.jsx-1562482592{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;position:relative;}.center.jsx-1562482592{-webkit-flex:1;-ms-flex:1;flex:1;padding:0;}.draw.jsx-1562482592>.step,.draw.jsx-1562482592>.time{top:10px;}.draw.jsx-1562482592 .center.jsx-1562482592>.book{border-radius:0;-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;width:auto;height:auto;-webkit-flex:1;-ms-flex:1;flex:1;box-shadow:0px -2px 0px 0px #6E46D5,0px 2px 0px 0px #011946,0 4px 2px 0 rgba(0,0,0,0.50);}.draw.jsx-1562482592 .center.jsx-1562482592>.book:before{display:none;}.draw.jsx-1562482592 .center.jsx-1562482592>.book .header{height:65px;}.draw.jsx-1562482592 .center.jsx-1562482592>.book .header h3{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:10px;padding:0 68px;}.draw.jsx-1562482592 .center.jsx-1562482592>.book .core{margin:0 0 10px;border-radius:0;box-shadow:0px 1px 0px 0px #C4C4C4,0px 2px 0px 0px #FFF,0px 3px 0px 0px #C4C4C4,0px 4px 0px 0px #FFF,0px 5px 0px 0px #C4C4C4,0px 6px 0px 0px #FFF;}.draw.jsx-1562482592 .center.jsx-1562482592>.dark .core{margin:0 0 10px;border-radius:0;box-shadow:0px 1px 0px 0px #343434,0px 2px 0px 0px #000000,0px 3px 0px 0px #343434,0px 4px 0px 0px #000000,0px 5px 0px 0px #343434,0px 6px 0px 0px #000000;}.bottom.jsx-1562482592{position:absolute;left:0;bottom:93px;height:auto;width:auto;}.drawingContainer.jsx-1562482592{-webkit-flex:1;-ms-flex:1;flex:1;}.drawingContainer.jsx-1562482592 canvas{height:100% !important;width:auto;left:50%;-webkit-transform:translate(-50%,0);-ms-transform:translate(-50%,0);transform:translate(-50%,0);}}"]
					}), Object(o.jsx)(a.a, {
						id: "273907530",
						children: [".ar .draw .book .core{direction:initial;}", "@media (max-width:640px){.ar .draw .bottom{left:initial;right:0px;}}"]
					})]
				})
			}), (function(e) {
				return {
					socket: e.socket,
					previous: e.data.previous,
					lastDraw: e.data.lastDraw,
					emit: e.emit,
					mobile: e.mobile,
					scale: e.scale,
					hidden: e.data.configs.visible == R.Zb,
					animate: e.data.configs.animate == R.b,
					turnNum: e.data.turnNum,
					draw: e.data.draw,
					setData: e.setData,
					mirror: e.data.mirror
				}
			}))
		},
		TSYQ: function(e, t, r) {
			var o;
			! function() {
				"use strict";
				var r = {}.hasOwnProperty;

				function n() {
					for (var e = [], t = 0; t < arguments.length; t++) {
						var o = arguments[t];
						if (o) {
							var i = typeof o;
							if ("string" === i || "number" === i) e.push(o);
							else if (Array.isArray(o) && o.length) {
								var s = n.apply(null, o);
								s && e.push(s)
							} else if ("object" === i)
								for (var a in o) r.call(o, a) && o[a] && e.push(a)
						}
					}
					return e.join(" ")
				}
				e.exports ? (n.default = n, e.exports = n) : void 0 === (o = function() {
					return n
				}.apply(t, [])) || (e.exports = o)
			}()
		},
		WZCv: function(e, t, r) {
			"use strict";
			var o = r("nKUr"),
				n = r("MX0m"),
				i = r.n(n),
				s = r("TSYQ"),
				a = r.n(s),
				c = r("f5HD");
			t.a = function(e) {
				var t = e.draw,
					r = e.subtitle,
					n = e.title,
					s = e.children,
					l = e.dark,
					x = e.mirror,
					p = e.watermark;
				return Object(o.jsxs)("div", {
					className: "jsx-979771310 " + (a()("book", {
						dark: l,
						mirror: x
					}) || ""),
					children: [Object(o.jsxs)("div", {
						className: "jsx-979771310 header",
						children: [Object(o.jsx)(c.a, {}), Object(o.jsx)("div", {
							className: "jsx-979771310 logo",
							children: Object(o.jsx)("figure", {
								className: "jsx-979771310"
							})
						}), Object(o.jsx)("h4", {
							className: "jsx-979771310 " + (t ? "drawing" : ""),
							children: r
						}), Object(o.jsx)("h3", {
							className: "jsx-979771310",
							children: x ? "x".repeat(n.length) : n
						})]
					}), Object(o.jsx)("div", {
						className: "jsx-979771310 " + (a()("core", {
							watermark: p
						}) || ""),
						children: s
					}), Object(o.jsx)(i.a, {
						id: "979771310",
						children: [".book.jsx-979771310{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:770px;height:562px;background-color:#301A6B;border-radius:9px;box-shadow:0px -3px 0px 0px #6E46D5,0px 2px 0px 0px #011946,0 8px 4px 0 rgba(0,0,0,0.50);}", ".book.jsx-979771310:before{content:'';width:518px;height:59px;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);top:-20px;position:absolute;background-image:url(/images/argolas.png);background-repeat:no-repeat;z-index:4;}", ".header.jsx-979771310{background-color:#481D92;height:102px;border-radius:9px 9px 0 0;box-shadow:inset 0px -2px 0px 0px #6E46D5;border-bottom:6px #160839 solid;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative;z-index:2;}", ".logo.jsx-979771310{margin:-3px 0 6px;width:178px;height:44px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;background-image:url(/images/bx_logo.png);}", ".logo.jsx-979771310 figure.jsx-979771310{width:92px;height:25px;background-size:cover;background-image:url(/images/logo.svg);background-repeat:no-repeat;}", 'h4.jsx-979771310{font-family:"Black";font-size:16px;color:#43DE99;-webkit-letter-spacing:1.6px;-moz-letter-spacing:1.6px;-ms-letter-spacing:1.6px;letter-spacing:1.6px;text-align:center;margin:0 0 2px;}', ".drawing.jsx-979771310{font-size:22px;margin:14px 0 0 0;}", 'h3.jsx-979771310{font-family:"Black";font-size:27px;color:#FFFFFF;text-align:center;line-height:29px;text-transform:uppercase;text-shadow:rgb(23,5,87) 4px 0px 0px,rgb(23,5,87) 3.87565px 0.989616px 0px,rgb(23,5,87) 3.51033px 1.9177px 0px,rgb(23,5,87) 2.92676px 2.72656px 0px,rgb(23,5,87) 2.16121px 3.36588px 0px,rgb(23,5,87) 1.26129px 3.79594px 0px,rgb(23,5,87) 0.282949px 3.98998px 0px,rgb(23,5,87) -0.712984px 3.93594px 0px,rgb(23,5,87) -1.66459px 3.63719px 0px,rgb(23,5,87) -2.51269px 3.11229px 0px,rgb(23,5,87) -3.20457px 2.39389px 0px,rgb(23,5,87) -3.69721px 1.52664px 0px,rgb(23,5,87) -3.95997px 0.56448px 0px,rgb(23,5,87) -3.97652px -0.432781px 0px,rgb(23,5,87) -3.74583px -1.40313px 0px,rgb(23,5,87) -3.28224px -2.28625px 0px,rgb(23,5,87) -2.61457px -3.02721px 0px,rgb(23,5,87) -1.78435px -3.57996px 0px,rgb(23,5,87) -0.843183px -3.91012px 0px,rgb(23,5,87) 0.150409px -3.99717px 0px,rgb(23,5,87) 1.13465px -3.8357px 0px,rgb(23,5,87) 2.04834px -3.43574px 0px,rgb(23,5,87) 2.83468px -2.82216px 0px,rgb(23,5,87) 3.44477px -2.03312px 0px,rgb(23,5,87) 3.84068px -1.11766px 0px,rgb(23,5,87) 3.9978px -0.132717px 0px;}', '.mirror.jsx-979771310 h3.jsx-979771310{font-family:"dotsfont";font-size:13px;}', ".core.jsx-979771310{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex:1;-ms-flex:1;flex:1;margin:0 6px 30px;background-color:#FFF;background-repeat:no-repeat;background-position:center;border-radius:0 0 9px 9px;box-shadow:0px 2px 0px 0px #C4C4C4,0px 4px 0px 0px #FFF,0px 6px 0px 0px #C4C4C4,0px 8px 0px 0px #FFF,0px 10px 0px 0px #C4C4C4,0px 12px 0px 0px #FFF,0px 14px 0px 0px #C4C4C4,0px 16px 0px 0px #FFF,0px 18px 0px 0px #160C30;overflow:hidden;}", ".core.watermark.jsx-979771310{background-image:url(/images/bgcanvas.svg);}", ".dark.jsx-979771310 .core.jsx-979771310{background-color:#000000;background-image:url(/images/bgcanvas_dark.svg);box-shadow:0px 2px 0px 0px #343434,0px 4px 0px 0px #000000,0px 6px 0px 0px #343434,0px 8px 0px 0px #000000,0px 10px 0px 0px #343434,0px 12px 0px 0px #000000,0px 14px 0px 0px #343434,0px 16px 0px 0px #000000,0px 18px 0px 0px #160C30;}", ".dark.jsx-979771310 .core.watermark.jsx-979771310{background-image:url(/images/bgcanvas_dark.svg);}", "@media (max-width:640px){.book.jsx-979771310{width:312px;height:240px;border-radius:5px;box-shadow:0px -2px 0px 0px #6E46D5,0px 2px 0px 0px #011946,0 8px 4px 0 rgba(0,0,0,0.50);}.book.jsx-979771310:before{content:'';width:219px;height:25px;top:-10px;background-size:cover;}.header.jsx-979771310{height:45px;border-radius:6px 6px 0 0;box-shadow:inset 0px -1px 0px 0px #6E46D5;border-bottom:2px #160839 solid;}.header.jsx-979771310>.sound{display:none;}.logo.jsx-979771310{display:none;}h4.jsx-979771310{margin:8px 0 5px;font-size:10px;-webkit-letter-spacing:1px;-moz-letter-spacing:1px;-ms-letter-spacing:1px;letter-spacing:1px;}.drawing.jsx-979771310{font-size:13px;margin:20px 70px 0;}h3.jsx-979771310{font-size:14px;line-height:14px;text-shadow:rgb(23,5,87) 2px 0px 0px,rgb(23,5,87) 1.75517px 0.958851px 0px,rgb(23,5,87) 1.0806px 1.68294px 0px,rgb(23,5,87) 0.141474px 1.99499px 0px,rgb(23,5,87) -0.832294px 1.81859px 0px,rgb(23,5,87) -1.60229px 1.19694px 0px,rgb(23,5,87) -1.97998px 0.28224px 0px,rgb(23,5,87) -1.87291px -0.701566px 0px,rgb(23,5,87) -1.30729px -1.5136px 0px,rgb(23,5,87) -0.421592px -1.95506px 0px,rgb(23,5,87) 0.567324px -1.91785px 0px,rgb(23,5,87) 1.41734px -1.41108px 0px,rgb(23,5,87) 1.92034px -0.558831px 0px;}.core.jsx-979771310{margin:0 6px 25px;background-color:#FFF;background-size:500px 900px;border-radius:0 0 5px 5px;}.core.watermark.jsx-979771310{background-image:url(/images/bgcanvas_mobile.svg);}.dark.jsx-979771310 .core.watermark.jsx-979771310{background-image:url(/images/bgcanvas_mobile_dark.svg);}}"]
					})]
				})
			}
		},
		cXB8: function(e, t, r) {
			"use strict";
			var o = r("nKUr"),
				n = r("MX0m"),
				i = r.n(n),
				s = r("q1tI"),
				a = r("Ya7B"),
				c = r("CBA4");
			var l = Object(a.c)((function(e) {
				var t = Object(s.useRef)(e.turnNum),
					r = Object(s.useState)(e.count),
					n = r[0],
					a = r[1],
					c = Object(s.useState)(e.players),
					l = c[0],
					x = c[1];
				return Object(s.useEffect)((function() {
					t.current == e.turnNum && a(e.count)
				}), [e.count]), Object(s.useEffect)((function() {
					t.current == e.turnNum && x(e.players)
				}), [e.players]), 0 == n ? null : Object(o.jsxs)("div", {
					className: i.a.dynamic([
						["3786506340", [e.color, e.color]]
					]) + " check",
					children: [Object(o.jsx)("i", {
						className: i.a.dynamic([
							["3786506340", [e.color, e.color]]
						])
					}), Object(o.jsx)("p", {
						className: i.a.dynamic([
							["3786506340", [e.color, e.color]]
						]),
						children: e.reverse ? l + "/" + n : n + "/" + l
					}), Object(o.jsx)(i.a, {
						id: "3786506340",
						dynamic: [e.color, e.color],
						children: [".check.__jsx-style-dynamic-selector{margin:10px 0 0;width:18px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;background-color:#FFF;padding:3px;border-radius:20px;line-height:1;overflow:hidden;-webkit-animation-name:width-__jsx-style-dynamic-selector;animation-name:width-__jsx-style-dynamic-selector;-webkit-animation-duration:250ms;animation-duration:250ms;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;}", "i.__jsx-style-dynamic-selector{width:18px;min-width:18px;height:18px;border-radius:50%;background-color:".concat(e.color, ";display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}"), "i.__jsx-style-dynamic-selector:before{margin:1px 0 0;content:'\\e910';font-family:ico;color:#FFF;font-size:8px;line-height:10px;}", 'p.__jsx-style-dynamic-selector{margin:1px 5px 0;-webkit-flex:1;-ms-flex:1;flex:1;font-family:"Black";font-size:16px;color:'.concat(e.color, ";-webkit-letter-spacing:0;-moz-letter-spacing:0;-ms-letter-spacing:0;letter-spacing:0;text-align:center;}"), "@-webkit-keyframes width-__jsx-style-dynamic-selector{from{width:18px;opacity:0;}to{width:80px;opacity:1;}}", "@keyframes width-__jsx-style-dynamic-selector{from{width:18px;opacity:0;}to{width:80px;opacity:1;}}", "@-webkit-keyframes widthMobile-__jsx-style-dynamic-selector{from{width:18px;opacity:0;}to{width:45px;opacity:1;}}", "@keyframes widthMobile-__jsx-style-dynamic-selector{from{width:18px;opacity:0;}to{width:45px;opacity:1;}}", "@media (max-width:640px){.check.__jsx-style-dynamic-selector{margin:5px 0 0;width:13px;padding:2px;border-radius:20px;-webkit-animation-name:widthMobile-__jsx-style-dynamic-selector;animation-name:widthMobile-__jsx-style-dynamic-selector;}i.__jsx-style-dynamic-selector{width:13px;min-width:13px;height:13px;}i.__jsx-style-dynamic-selector:before{font-size:6px;line-height:8px;}p.__jsx-style-dynamic-selector{margin:2px 3px 0;font-size:9px;}}"]
					})]
				})
			}), (function(e) {
				var t = e.data.users.filter((function(e) {
					return !e.viewer && !e.away
				}));
				return {
					players: t.length,
					count: t.filter((function(e) {
						return e.ready
					})).length,
					turnNum: e.data.turnNum
				}
			}));
			t.a = Object(a.c)((function(e) {
				var t = Object(s.useState)(e.turnNum)[0],
					r = Object(s.useState)(e.turnMax)[0],
					n = Object(s.useState)(e.color)[0],
					a = Object(c.a)();
				return Object(o.jsxs)("div", {
					className: "jsx-2120888168 step",
					children: [a ? r + "/" + (t + 1) : t + 1 + "/" + r, Object(o.jsx)(l, {
						color: n,
						reverse: a
					}), Object(o.jsx)(i.a, {
						id: "646283104",
						children: ['div.jsx-2120888168{min-width:86px;position:absolute;top:20px;left:20px;font-family:"Black";font-size:41px;line-height:41px;color:#FFFFFF;-webkit-letter-spacing:0;-moz-letter-spacing:0;-ms-letter-spacing:0;letter-spacing:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}', "@media (max-width:640px){div.jsx-2120888168{min-height:45px;min-width:49px;top:10px;left:10px;font-size:23px;line-height:23px;z-index:5;}}"]
					}), Object(o.jsx)(i.a, {
						id: "2555919105",
						children: [".ar .step{left:initial;right:20px;}", "@media (max-width:640px){.ar .step{left:initial;right:10px;}}"]
					})]
				})
			}), (function(e) {
				return {
					turnNum: e.data.turnNum,
					turnMax: e.data.turnMax
				}
			}))
		},
		s8YG: function(e, t, r) {
			(window.__NEXT_P = window.__NEXT_P || []).push(["/draw", function() {
				return r("HF4s")
			}])
		},
		umcP: function(e, t, r) {
			"use strict";
			var o = r("nKUr"),
				n = r("jT3O"),
				i = r("CBA4"),
				s = r("q1tI"),
				a = r("Ya7B"),
				c = r("YSmr"),
				l = r("4qaV"),
				x = r("atwx");

			function p() {
				var e = Object(n.a)(["edit"]);
				return p = function() {
					return e
				}, e
			}

			function d() {
				var e = Object(n.a)(["ready"]);
				return d = function() {
					return e
				}, e
			}
			t.a = Object(a.c)((function(e) {
				var t = e.disabled,
					r = e.onChange,
					n = e.emit,
					a = Object(i.d)(),
					b = Object(s.useState)(!1),
					u = b[0],
					f = b[1];
				return Object(o.jsx)(l.a, {
					type: "small",
					disabled: t && !u,
					selected: u,
					onClick: function() {
						f((function(e) {
							var t = !e;
							return n(c.Z, t), r && r(t), t
						}))
					},
					children: u ? Object(o.jsxs)(o.Fragment, {
						children: [Object(o.jsx)(x.a, {
							icon: "pencil"
						}), Object(o.jsx)("strong", {
							children: a(p())
						})]
					}) : Object(o.jsxs)(o.Fragment, {
						children: [Object(o.jsx)(x.a, {
							icon: "ready"
						}), Object(o.jsx)("strong", {
							children: a(d())
						})]
					})
				})
			}), (function(e) {
				return {
					emit: e.emit
				}
			}))
		}
	},
	[
		["s8YG", 0, 1, 3, 2, 4, 8]
	]
]);
