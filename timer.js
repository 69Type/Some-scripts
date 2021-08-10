console.log("LOADED");
(window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
	[6], {
		"3niX": function(e, t, i) {
			"use strict";
			t.__esModule = !0, t.flush = function() {
				var e = s.cssRules();
				return s.flush(), e
			}, t.default = void 0;
			var n, r = i("q1tI");
			var s = new(((n = i("SevZ")) && n.__esModule ? n : {
					default: n
				}).default),
				o = function(e) {
					var t, i;

					function n(t) {
						var i;
						return (i = e.call(this, t) || this).prevProps = {}, i
					}
					i = e, (t = n).prototype = Object.create(i.prototype), t.prototype.constructor = t, t.__proto__ = i, n.dynamic = function(e) {
						return e.map((function(e) {
							var t = e[0],
								i = e[1];
							return s.computeId(t, i)
						})).join(" ")
					};
					var r = n.prototype;
					return r.shouldComponentUpdate = function(e) {
						return this.props.id !== e.id || String(this.props.dynamic) !== String(e.dynamic)
					}, r.componentWillUnmount = function() {
						s.remove(this.props)
					}, r.render = function() {
						return this.shouldComponentUpdate(this.prevProps) && (this.prevProps.id && s.remove(this.prevProps), s.add(this.props), this.prevProps = this.props), null
					}, n
				}(r.Component);
			t.default = o
		},
		"6VPp": function(e, t, i) {
			"use strict";
			var n = i("nKUr"),
				r = i("MX0m"),
				s = i.n(r),
				o = i("q1tI"),
				a = i("Ya7B"),
				c = i("kOrG"),
				l = i("YSmr"),
				u = "#FFF";
			t.a = Object(a.c)((function(e) {
				var t = Object(o.useRef)();
				return Object(o.useEffect)((function() {
					var i = t.current.getContext("2d");
					i.strokeStyle = u, i.lineWidth = 8;
					var n = 60;
					if (e.timeStarted) {
						var r, s, o = performance.now() - e.elapsedTime,
							a = 0;
						if (e.speed != l.zb) s = e.speed == l.wb ? .5 * e.value : e.speed == l.Ab ? 2 * e.value : e.value, e.reduced && (s /= 4);
						else {
							var h = .2 * e.value,
								d = 2 * e.value - h,
								p = Math.pow(d / 100, 1 / e.turnMax);
							s = h + 100 * Math.pow(p, e.turnMax - e.turnNum)
						}
						var f = !1;
						return e.reduced ? c.a.play("timeout", !1, .9) : o / s < .8 && (f = setTimeout((function() {
								c.a.play("timeout", !1, .9)
							}), .8 * s - o)), r = requestAnimationFrame((function t(o) {
								var c = (o - e.elapsedTime) / s,
									l = c >= 1;
								if ((c - a > .001 || l) && (a = c, i.clearRect(0, 0, 120, 120), i.beginPath(), i.arc(n, n, 56, 0, 2 * Math.PI), i.stroke(), !l)) {
									i.fillStyle = c <= .8 && !e.reduced ? u : "#F7B500", i.beginPath(), i.moveTo(n, n), i.arc(n, n, 44, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * c, !0), i.lineTo(n, n), i.fill()
								}
								l || (r = requestAnimationFrame(t))
							})),
							function() {
								c.a.pause("timeout"), f && clearTimeout(f), cancelAnimationFrame(r)
							}
					}
					i.beginPath(), i.arc(n, n, 56, 0, 2 * Math.PI), i.stroke()
				}), [e.timeStarted]), Object(n.jsxs)(n.Fragment, {
					children: [Object(n.jsx)("canvas", {
						ref: t,
						width: 120,
						height: 120,
						// className: "jsx-241293408 time"
					}), Object(n.jsx)(s.a, {
						id: "2409927210",
						children: ["canvas.jsx-241293408{position:absolute;width:60px;height:60px;top:20px;right:20px;font-family:Ubuntu;font-weight:500;font-size:36px;color:rgba(255,255,255,.69);}", "@media (max-width:640px){canvas.jsx-241293408{z-index:5;width:40px;height:40px;top:12px;right:10px;}}"]
					}), Object(n.jsx)(s.a, {
						id: "2667873027",
						children: [".ar .time{left:20px;right:initial;}", "@media (max-width:640px){.ar .time{left:10px;}}"]
					})]
				})
			}), (function(e) {
                console.log(e);
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
		"9kyW": function(e, t, i) {
			"use strict";
			e.exports = function(e) {
				for (var t = 5381, i = e.length; i;) t = 33 * t ^ e.charCodeAt(--i);
				return t >>> 0
			}
		},
		"H+61": function(e, t, i) {
			"use strict";

			function n(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			i.d(t, "a", (function() {
				return n
			}))
		},
		MX0m: function(e, t, i) {
			e.exports = i("3niX")
		},
		SevZ: function(e, t, i) {
			"use strict";
			t.__esModule = !0, t.default = void 0;
			var n = s(i("9kyW")),
				r = s(i("bVZc"));

			function s(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var o = function() {
				function e(e) {
					var t = void 0 === e ? {} : e,
						i = t.styleSheet,
						n = void 0 === i ? null : i,
						s = t.optimizeForSpeed,
						o = void 0 !== s && s,
						a = t.isBrowser,
						c = void 0 === a ? "undefined" !== typeof window : a;
					this._sheet = n || new r.default({
						name: "styled-jsx",
						optimizeForSpeed: o
					}), this._sheet.inject(), n && "boolean" === typeof o && (this._sheet.setOptimizeForSpeed(o), this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()), this._isBrowser = c, this._fromServer = void 0, this._indices = {}, this._instancesCounts = {}, this.computeId = this.createComputeId(), this.computeSelector = this.createComputeSelector()
				}
				var t = e.prototype;
				return t.add = function(e) {
					var t = this;
					void 0 === this._optimizeForSpeed && (this._optimizeForSpeed = Array.isArray(e.children), this._sheet.setOptimizeForSpeed(this._optimizeForSpeed), this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()), this._isBrowser && !this._fromServer && (this._fromServer = this.selectFromServer(), this._instancesCounts = Object.keys(this._fromServer).reduce((function(e, t) {
						return e[t] = 0, e
					}), {}));
					var i = this.getIdAndRules(e),
						n = i.styleId,
						r = i.rules;
					if (n in this._instancesCounts) this._instancesCounts[n] += 1;
					else {
						var s = r.map((function(e) {
							return t._sheet.insertRule(e)
						})).filter((function(e) {
							return -1 !== e
						}));
						this._indices[n] = s, this._instancesCounts[n] = 1
					}
				}, t.remove = function(e) {
					var t = this,
						i = this.getIdAndRules(e).styleId;
					if (function(e, t) {
							if (!e) throw new Error("StyleSheetRegistry: " + t + ".")
						}(i in this._instancesCounts, "styleId: `" + i + "` not found"), this._instancesCounts[i] -= 1, this._instancesCounts[i] < 1) {
						var n = this._fromServer && this._fromServer[i];
						n ? (n.parentNode.removeChild(n), delete this._fromServer[i]) : (this._indices[i].forEach((function(e) {
							return t._sheet.deleteRule(e)
						})), delete this._indices[i]), delete this._instancesCounts[i]
					}
				}, t.update = function(e, t) {
					this.add(t), this.remove(e)
				}, t.flush = function() {
					this._sheet.flush(), this._sheet.inject(), this._fromServer = void 0, this._indices = {}, this._instancesCounts = {}, this.computeId = this.createComputeId(), this.computeSelector = this.createComputeSelector()
				}, t.cssRules = function() {
					var e = this,
						t = this._fromServer ? Object.keys(this._fromServer).map((function(t) {
							return [t, e._fromServer[t]]
						})) : [],
						i = this._sheet.cssRules();
					return t.concat(Object.keys(this._indices).map((function(t) {
						return [t, e._indices[t].map((function(e) {
							return i[e].cssText
						})).join(e._optimizeForSpeed ? "" : "\n")]
					})).filter((function(e) {
						return Boolean(e[1])
					})))
				}, t.createComputeId = function() {
					var e = {};
					return function(t, i) {
						if (!i) return "jsx-" + t;
						var r = String(i),
							s = t + r;
						return e[s] || (e[s] = "jsx-" + (0, n.default)(t + "-" + r)), e[s]
					}
				}, t.createComputeSelector = function(e) {
					void 0 === e && (e = /__jsx-style-dynamic-selector/g);
					var t = {};
					return function(i, n) {
						this._isBrowser || (n = n.replace(/\/style/gi, "\\/style"));
						var r = i + n;
						return t[r] || (t[r] = n.replace(e, i)), t[r]
					}
				}, t.getIdAndRules = function(e) {
					var t = this,
						i = e.children,
						n = e.dynamic,
						r = e.id;
					if (n) {
						var s = this.computeId(r, n);
						return {
							styleId: s,
							rules: Array.isArray(i) ? i.map((function(e) {
								return t.computeSelector(s, e)
							})) : [this.computeSelector(s, i)]
						}
					}
					return {
						styleId: this.computeId(r),
						rules: Array.isArray(i) ? i : [i]
					}
				}, t.selectFromServer = function() {
					return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce((function(e, t) {
						return e[t.id.slice(2)] = t, e
					}), {})
				}, e
			}();
			t.default = o
		},
		UlJF: function(e, t, i) {
			"use strict";

			function n(e, t) {
				for (var i = 0; i < t.length; i++) {
					var n = t[i];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}

			function r(e, t, i) {
				return t && n(e.prototype, t), i && n(e, i), e
			}
			i.d(t, "a", (function() {
				return r
			}))
		},
		bVZc: function(e, t, i) {
			"use strict";
			(function(e) {
				function i(e, t) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
					}
				}
				t.__esModule = !0, t.default = void 0;
				var n = "undefined" !== typeof e && e.env && !0,
					r = function(e) {
						return "[object String]" === Object.prototype.toString.call(e)
					},
					s = function() {
						function e(e) {
							var t = void 0 === e ? {} : e,
								i = t.name,
								s = void 0 === i ? "stylesheet" : i,
								a = t.optimizeForSpeed,
								c = void 0 === a ? n : a,
								l = t.isBrowser,
								u = void 0 === l ? "undefined" !== typeof window : l;
							o(r(s), "`name` must be a string"), this._name = s, this._deletedRulePlaceholder = "#" + s + "-deleted-rule____{}", o("boolean" === typeof c, "`optimizeForSpeed` must be a boolean"), this._optimizeForSpeed = c, this._isBrowser = u, this._serverSheet = void 0, this._tags = [], this._injected = !1, this._rulesCount = 0;
							var h = this._isBrowser && document.querySelector('meta[property="csp-nonce"]');
							this._nonce = h ? h.getAttribute("content") : null
						}
						var t, s, a, c = e.prototype;
						return c.setOptimizeForSpeed = function(e) {
							o("boolean" === typeof e, "`setOptimizeForSpeed` accepts a boolean"), o(0 === this._rulesCount, "optimizeForSpeed cannot be when rules have already been inserted"), this.flush(), this._optimizeForSpeed = e, this.inject()
						}, c.isOptimizeForSpeed = function() {
							return this._optimizeForSpeed
						}, c.inject = function() {
							var e = this;
							if (o(!this._injected, "sheet already injected"), this._injected = !0, this._isBrowser && this._optimizeForSpeed) return this._tags[0] = this.makeStyleTag(this._name), this._optimizeForSpeed = "insertRule" in this.getSheet(), void(this._optimizeForSpeed || (n || console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."), this.flush(), this._injected = !0));
							this._serverSheet = {
								cssRules: [],
								insertRule: function(t, i) {
									return "number" === typeof i ? e._serverSheet.cssRules[i] = {
										cssText: t
									} : e._serverSheet.cssRules.push({
										cssText: t
									}), i
								},
								deleteRule: function(t) {
									e._serverSheet.cssRules[t] = null
								}
							}
						}, c.getSheetForTag = function(e) {
							if (e.sheet) return e.sheet;
							for (var t = 0; t < document.styleSheets.length; t++)
								if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t]
						}, c.getSheet = function() {
							return this.getSheetForTag(this._tags[this._tags.length - 1])
						}, c.insertRule = function(e, t) {
							if (o(r(e), "`insertRule` accepts only strings"), !this._isBrowser) return "number" !== typeof t && (t = this._serverSheet.cssRules.length), this._serverSheet.insertRule(e, t), this._rulesCount++;
							if (this._optimizeForSpeed) {
								var i = this.getSheet();
								"number" !== typeof t && (t = i.cssRules.length);
								try {
									i.insertRule(e, t)
								} catch (a) {
									return n || console.warn("StyleSheet: illegal rule: \n\n" + e + "\n\nSee https://stackoverflow.com/q/20007992 for more info"), -1
								}
							} else {
								var s = this._tags[t];
								this._tags.push(this.makeStyleTag(this._name, e, s))
							}
							return this._rulesCount++
						}, c.replaceRule = function(e, t) {
							if (this._optimizeForSpeed || !this._isBrowser) {
								var i = this._isBrowser ? this.getSheet() : this._serverSheet;
								if (t.trim() || (t = this._deletedRulePlaceholder), !i.cssRules[e]) return e;
								i.deleteRule(e);
								try {
									i.insertRule(t, e)
								} catch (s) {
									n || console.warn("StyleSheet: illegal rule: \n\n" + t + "\n\nSee https://stackoverflow.com/q/20007992 for more info"), i.insertRule(this._deletedRulePlaceholder, e)
								}
							} else {
								var r = this._tags[e];
								o(r, "old rule at index `" + e + "` not found"), r.textContent = t
							}
							return e
						}, c.deleteRule = function(e) {
							if (this._isBrowser)
								if (this._optimizeForSpeed) this.replaceRule(e, "");
								else {
									var t = this._tags[e];
									o(t, "rule at index `" + e + "` not found"), t.parentNode.removeChild(t), this._tags[e] = null
								}
							else this._serverSheet.deleteRule(e)
						}, c.flush = function() {
							this._injected = !1, this._rulesCount = 0, this._isBrowser ? (this._tags.forEach((function(e) {
								return e && e.parentNode.removeChild(e)
							})), this._tags = []) : this._serverSheet.cssRules = []
						}, c.cssRules = function() {
							var e = this;
							return this._isBrowser ? this._tags.reduce((function(t, i) {
								return i ? t = t.concat(Array.prototype.map.call(e.getSheetForTag(i).cssRules, (function(t) {
									return t.cssText === e._deletedRulePlaceholder ? null : t
								}))) : t.push(null), t
							}), []) : this._serverSheet.cssRules
						}, c.makeStyleTag = function(e, t, i) {
							t && o(r(t), "makeStyleTag acceps only strings as second parameter");
							var n = document.createElement("style");
							this._nonce && n.setAttribute("nonce", this._nonce), n.type = "text/css", n.setAttribute("data-" + e, ""), t && n.appendChild(document.createTextNode(t));
							var s = document.head || document.getElementsByTagName("head")[0];
							return i ? s.insertBefore(n, i) : s.appendChild(n), n
						}, t = e, (s = [{
							key: "length",
							get: function() {
								return this._rulesCount
							}
						}]) && i(t.prototype, s), a && i(t, a), e
					}();

				function o(e, t) {
					if (!e) throw new Error("StyleSheet: " + t + ".")
				}
				t.default = s
			}).call(this, i("8oxB"))
		},
		cXB8: function(e, t, i) {
			"use strict";
			var n = i("nKUr"),
				r = i("MX0m"),
				s = i.n(r),
				o = i("q1tI"),
				a = i("Ya7B"),
				c = i("CBA4");
			var l = Object(a.c)((function(e) {
				var t = Object(o.useRef)(e.turnNum),
					i = Object(o.useState)(e.count),
					r = i[0],
					a = i[1],
					c = Object(o.useState)(e.players),
					l = c[0],
					u = c[1];
				return Object(o.useEffect)((function() {
					t.current == e.turnNum && a(e.count)
				}), [e.count]), Object(o.useEffect)((function() {
					t.current == e.turnNum && u(e.players)
				}), [e.players]), 0 == r ? null : Object(n.jsxs)("div", {
					className: s.a.dynamic([
						["3786506340", [e.color, e.color]]
					]) + " check",
					children: [Object(n.jsx)("i", {
						className: s.a.dynamic([
							["3786506340", [e.color, e.color]]
						])
					}), Object(n.jsx)("p", {
						className: s.a.dynamic([
							["3786506340", [e.color, e.color]]
						]),
						children: e.reverse ? l + "/" + r : r + "/" + l
					}), Object(n.jsx)(s.a, {
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
				var t = Object(o.useState)(e.turnNum)[0],
					i = Object(o.useState)(e.turnMax)[0],
					r = Object(o.useState)(e.color)[0],
					a = Object(c.a)();
				return Object(n.jsxs)("div", {
					className: "jsx-2120888168 step",
					children: [a ? i + "/" + (t + 1) : t + 1 + "/" + i, Object(n.jsx)(l, {
						color: r,
						reverse: a
					}), Object(n.jsx)(s.a, {
						id: "646283104",
						children: ['div.jsx-2120888168{min-width:86px;position:absolute;top:20px;left:20px;font-family:"Black";font-size:41px;line-height:41px;color:#FFFFFF;-webkit-letter-spacing:0;-moz-letter-spacing:0;-ms-letter-spacing:0;letter-spacing:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}', "@media (max-width:640px){div.jsx-2120888168{min-height:45px;min-width:49px;top:10px;left:10px;font-size:23px;line-height:23px;z-index:5;}}"]
					}), Object(n.jsx)(s.a, {
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
		jT3O: function(e, t, i) {
			"use strict";

			function n(e, t) {
				return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
					raw: {
						value: Object.freeze(t)
					}
				}))
			}
			i.d(t, "a", (function() {
				return n
			}))
		},
		kOrG: function(e, t, i) {
			"use strict";
			var n = i("H+61"),
				r = i("UlJF"),
				s = function() {
					function e() {
						Object(n.a)(this, e), this._baseURL = "", this._active = !0, this._cache = [], this._list = [], this._audioTag, this._extension, this._volume = 1;
						try {
							(new Audio).canPlayType("audio/mpeg") && (this._extension = ".mp3"), this._audioTag = !0
						} catch (t) {
							this._audioTag = !1, this._active = !1
						}
					}
					return Object(r.a)(e, [{
						key: "_pauseAll",
						value: function() {
							for (var e in this._list) this._list[e] && this.pause(e)
						}
					}, {
						key: "activate",
						value: function(e) {
							if (e) {
								if (this._audioTag) {
									this._active = !0;
									var t, i = [];
									for (t in this._list) this._list[t] && i.push(t);
									this._pauseAll();
									for (var n = 0; n < i.length; n++) this.play(i[n], !1, !0)
								}
							} else this._pauseAll(), this._active = !1
						}
					}, {
						key: "load",
						value: function(e) {
							var t = this;
							return new Promise((function(i, n) {
								if (t._audioTag) {
									var r = 0,
										s = function() {
											++r == e.length && i()
										};
									for (var o in e) {
										var a = e[o];
										if (!t._cache[a]) {
											var c = new Audio;
											c.onload = s(), c.onerror = s(), c.src = t._baseURL + a + t._extension, c.load(), t._cache[a] = c
										}
									}
								}
							}))
						}
					}, {
						key: "pause",
						value: function(e) {
							var t = this._cache[e];
							t && (t.pause(), this._list[e] = !1)
						}
					}, {
						key: "play",
						value: function(e) {
							var t = this,
								i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
								n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
								r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
								s = this._cache[e];
							if (s && this._active) {
								s.currentTime = r, s.loop = i, s.volume = n * this._volume, this._list[e] = !0, s.setAttribute("som", e), s.onpause = function() {
									o(this.getAttribute("som"))
								};
								var o = function(e) {
									t._list[e] = !1
								};
								s.play()
							}
						}
					}, {
						key: "active",
						get: function() {
							return this._active
						}
					}, {
						key: "baseURL",
						set: function(e) {
							this._baseURL = e
						}
					}, {
						key: "volume",
						set: function(e) {
							for (var t in this._list)
								if (this._list[t]) {
									var i = this._cache[t];
									i.volume = i.volume / this._volume * e
								}
							this._volume = e
						}
					}]), e
				}();
			t.a = new s
		}
	}
]);
