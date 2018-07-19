!function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i)
                    return i(g, !0);
                if (f)
                    return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND",
                j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
        e(d[g]);
    return e
}({
    1: [function(a, b, c) {
        !function(a) {
            function d() {
                this._events = {},
                this._conf && e.call(this, this._conf)
            }
            function e(b) {
                b ? (this._conf = b,
                b.delimiter && (this.delimiter = b.delimiter),
                this._events.maxListeners = b.maxListeners !== a ? b.maxListeners : k,
                b.wildcard && (this.wildcard = b.wildcard),
                b.newListener && (this.newListener = b.newListener),
                b.verboseMemoryLeak && (this.verboseMemoryLeak = b.verboseMemoryLeak),
                this.wildcard && (this.listenerTree = {})) : this._events.maxListeners = k
            }
            function f(a, b) {
                var c = "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.";
                this.verboseMemoryLeak ? (c += " Event name: %s.",
                console.error(c, a, b)) : console.error(c, a),
                console.trace && console.trace()
            }
            function g(a) {
                this._events = {},
                this.newListener = !1,
                this.verboseMemoryLeak = !1,
                e.call(this, a)
            }
            function h(a, b, c, d) {
                if (!c)
                    return [];
                var e, f, g, i, j, k, l, m = [], n = b.length, o = b[d], p = b[d + 1];
                if (d === n && c._listeners) {
                    if ("function" == typeof c._listeners)
                        return a && a.push(c._listeners),
                        [c];
                    for (e = 0,
                    f = c._listeners.length; e < f; e++)
                        a && a.push(c._listeners[e]);
                    return [c]
                }
                if ("*" === o || "**" === o || c[o]) {
                    if ("*" === o) {
                        for (g in c)
                            "_listeners" !== g && c.hasOwnProperty(g) && (m = m.concat(h(a, b, c[g], d + 1)));
                        return m
                    }
                    if ("**" === o) {
                        l = d + 1 === n || d + 2 === n && "*" === p,
                        l && c._listeners && (m = m.concat(h(a, b, c, n)));
                        for (g in c)
                            "_listeners" !== g && c.hasOwnProperty(g) && ("*" === g || "**" === g ? (c[g]._listeners && !l && (m = m.concat(h(a, b, c[g], n))),
                            m = m.concat(h(a, b, c[g], d))) : m = g === p ? m.concat(h(a, b, c[g], d + 2)) : m.concat(h(a, b, c[g], d)));
                        return m
                    }
                    m = m.concat(h(a, b, c[o], d + 1))
                }
                if (i = c["*"],
                i && h(a, b, i, d + 1),
                j = c["**"])
                    if (d < n) {
                        j._listeners && h(a, b, j, n);
                        for (g in j)
                            "_listeners" !== g && j.hasOwnProperty(g) && (g === p ? h(a, b, j[g], d + 2) : g === o ? h(a, b, j[g], d + 1) : (k = {},
                            k[g] = j[g],
                            h(a, b, {
                                "**": k
                            }, d + 1)))
                    } else
                        j._listeners ? h(a, b, j, n) : j["*"] && j["*"]._listeners && h(a, b, j["*"], n);
                return m
            }
            function i(b, c) {
                b = "string" == typeof b ? b.split(this.delimiter) : b.slice();
                for (var d = 0, e = b.length; d + 1 < e; d++)
                    if ("**" === b[d] && "**" === b[d + 1])
                        return;
                for (var g = this.listenerTree, h = b.shift(); h !== a; ) {
                    if (g[h] || (g[h] = {}),
                    g = g[h],
                    0 === b.length)
                        return g._listeners ? ("function" == typeof g._listeners && (g._listeners = [g._listeners]),
                        g._listeners.push(c),
                        !g._listeners.warned && this._events.maxListeners > 0 && g._listeners.length > this._events.maxListeners && (g._listeners.warned = !0,
                        f.call(this, g._listeners.length, h))) : g._listeners = c,
                        !0;
                    h = b.shift()
                }
                return !0
            }
            var j = Array.isArray ? Array.isArray : function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }
              , k = 10;
            g.EventEmitter2 = g,
            g.prototype.delimiter = ".",
            g.prototype.setMaxListeners = function(b) {
                b !== a && (this._events || d.call(this),
                this._events.maxListeners = b,
                this._conf || (this._conf = {}),
                this._conf.maxListeners = b)
            }
            ,
            g.prototype.event = "",
            g.prototype.once = function(a, b) {
                return this.many(a, 1, b),
                this
            }
            ,
            g.prototype.many = function(a, b, c) {
                function d() {
                    0 === --b && e.off(a, d),
                    c.apply(this, arguments)
                }
                var e = this;
                if ("function" != typeof c)
                    throw new Error("many only accepts instances of Function");
                return d._origin = c,
                this.on(a, d),
                e
            }
            ,
            g.prototype.emit = function() {
                this._events || d.call(this);
                var a = arguments[0];
                if ("newListener" === a && !this.newListener && !this._events.newListener)
                    return !1;
                var b, c, e, f, g, i = arguments.length;
                if (this._all && this._all.length) {
                    if (g = this._all.slice(),
                    i > 3)
                        for (b = new Array(i),
                        f = 0; f < i; f++)
                            b[f] = arguments[f];
                    for (e = 0,
                    c = g.length; e < c; e++)
                        switch (this.event = a,
                        i) {
                        case 1:
                            g[e].call(this, a);
                            break;
                        case 2:
                            g[e].call(this, a, arguments[1]);
                            break;
                        case 3:
                            g[e].call(this, a, arguments[1], arguments[2]);
                            break;
                        default:
                            g[e].apply(this, b)
                        }
                }
                if (this.wildcard) {
                    g = [];
                    var j = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                    h.call(this, g, j, this.listenerTree, 0)
                } else {
                    if (g = this._events[a],
                    "function" == typeof g) {
                        switch (this.event = a,
                        i) {
                        case 1:
                            g.call(this);
                            break;
                        case 2:
                            g.call(this, arguments[1]);
                            break;
                        case 3:
                            g.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            for (b = new Array(i - 1),
                            f = 1; f < i; f++)
                                b[f - 1] = arguments[f];
                            g.apply(this, b)
                        }
                        return !0
                    }
                    g && (g = g.slice())
                }
                if (g && g.length) {
                    if (i > 3)
                        for (b = new Array(i - 1),
                        f = 1; f < i; f++)
                            b[f - 1] = arguments[f];
                    for (e = 0,
                    c = g.length; e < c; e++)
                        switch (this.event = a,
                        i) {
                        case 1:
                            g[e].call(this);
                            break;
                        case 2:
                            g[e].call(this, arguments[1]);
                            break;
                        case 3:
                            g[e].call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            g[e].apply(this, b)
                        }
                    return !0
                }
                if (!this._all && "error" === a)
                    throw arguments[1]instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
                return !!this._all
            }
            ,
            g.prototype.emitAsync = function() {
                this._events || d.call(this);
                var a = arguments[0];
                if ("newListener" === a && !this.newListener && !this._events.newListener)
                    return Promise.resolve([!1]);
                var b, c, e, f, g, i = [], j = arguments.length;
                if (this._all) {
                    if (j > 3)
                        for (b = new Array(j),
                        f = 1; f < j; f++)
                            b[f] = arguments[f];
                    for (e = 0,
                    c = this._all.length; e < c; e++)
                        switch (this.event = a,
                        j) {
                        case 1:
                            i.push(this._all[e].call(this, a));
                            break;
                        case 2:
                            i.push(this._all[e].call(this, a, arguments[1]));
                            break;
                        case 3:
                            i.push(this._all[e].call(this, a, arguments[1], arguments[2]));
                            break;
                        default:
                            i.push(this._all[e].apply(this, b))
                        }
                }
                if (this.wildcard) {
                    g = [];
                    var k = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                    h.call(this, g, k, this.listenerTree, 0)
                } else
                    g = this._events[a];
                if ("function" == typeof g)
                    switch (this.event = a,
                    j) {
                    case 1:
                        i.push(g.call(this));
                        break;
                    case 2:
                        i.push(g.call(this, arguments[1]));
                        break;
                    case 3:
                        i.push(g.call(this, arguments[1], arguments[2]));
                        break;
                    default:
                        for (b = new Array(j - 1),
                        f = 1; f < j; f++)
                            b[f - 1] = arguments[f];
                        i.push(g.apply(this, b))
                    }
                else if (g && g.length) {
                    if (j > 3)
                        for (b = new Array(j - 1),
                        f = 1; f < j; f++)
                            b[f - 1] = arguments[f];
                    for (e = 0,
                    c = g.length; e < c; e++)
                        switch (this.event = a,
                        j) {
                        case 1:
                            i.push(g[e].call(this));
                            break;
                        case 2:
                            i.push(g[e].call(this, arguments[1]));
                            break;
                        case 3:
                            i.push(g[e].call(this, arguments[1], arguments[2]));
                            break;
                        default:
                            i.push(g[e].apply(this, b))
                        }
                } else if (!this._all && "error" === a)
                    return arguments[1]instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
                return Promise.all(i)
            }
            ,
            g.prototype.on = function(a, b) {
                if ("function" == typeof a)
                    return this.onAny(a),
                    this;
                if ("function" != typeof b)
                    throw new Error("on only accepts instances of Function");
                return this._events || d.call(this),
                this.emit("newListener", a, b),
                this.wildcard ? (i.call(this, a, b),
                this) : (this._events[a] ? ("function" == typeof this._events[a] && (this._events[a] = [this._events[a]]),
                this._events[a].push(b),
                !this._events[a].warned && this._events.maxListeners > 0 && this._events[a].length > this._events.maxListeners && (this._events[a].warned = !0,
                f.call(this, this._events[a].length, a))) : this._events[a] = b,
                this)
            }
            ,
            g.prototype.onAny = function(a) {
                if ("function" != typeof a)
                    throw new Error("onAny only accepts instances of Function");
                return this._all || (this._all = []),
                this._all.push(a),
                this
            }
            ,
            g.prototype.addListener = g.prototype.on,
            g.prototype.off = function(b, c) {
                function d(b) {
                    if (b !== a) {
                        var c = Object.keys(b);
                        for (var e in c) {
                            var f = c[e]
                              , g = b[f];
                            g instanceof Function || "object" != typeof g || null === g || (Object.keys(g).length > 0 && d(b[f]),
                            0 === Object.keys(g).length && delete b[f])
                        }
                    }
                }
                if ("function" != typeof c)
                    throw new Error("removeListener only takes instances of Function");
                var e, f = [];
                if (this.wildcard) {
                    var g = "string" == typeof b ? b.split(this.delimiter) : b.slice();
                    f = h.call(this, null, g, this.listenerTree, 0)
                } else {
                    if (!this._events[b])
                        return this;
                    e = this._events[b],
                    f.push({
                        _listeners: e
                    })
                }
                for (var i = 0; i < f.length; i++) {
                    var k = f[i];
                    if (e = k._listeners,
                    j(e)) {
                        for (var l = -1, m = 0, n = e.length; m < n; m++)
                            if (e[m] === c || e[m].listener && e[m].listener === c || e[m]._origin && e[m]._origin === c) {
                                l = m;
                                break
                            }
                        if (l < 0)
                            continue;
                        return this.wildcard ? k._listeners.splice(l, 1) : this._events[b].splice(l, 1),
                        0 === e.length && (this.wildcard ? delete k._listeners : delete this._events[b]),
                        this.emit("removeListener", b, c),
                        this
                    }
                    (e === c || e.listener && e.listener === c || e._origin && e._origin === c) && (this.wildcard ? delete k._listeners : delete this._events[b],
                    this.emit("removeListener", b, c))
                }
                return d(this.listenerTree),
                this
            }
            ,
            g.prototype.offAny = function(a) {
                var b, c = 0, d = 0;
                if (a && this._all && this._all.length > 0) {
                    for (b = this._all,
                    c = 0,
                    d = b.length; c < d; c++)
                        if (a === b[c])
                            return b.splice(c, 1),
                            this.emit("removeListenerAny", a),
                            this
                } else {
                    for (b = this._all,
                    c = 0,
                    d = b.length; c < d; c++)
                        this.emit("removeListenerAny", b[c]);
                    this._all = []
                }
                return this
            }
            ,
            g.prototype.removeListener = g.prototype.off,
            g.prototype.removeAllListeners = function(a) {
                if (0 === arguments.length)
                    return !this._events || d.call(this),
                    this;
                if (this.wildcard)
                    for (var b = "string" == typeof a ? a.split(this.delimiter) : a.slice(), c = h.call(this, null, b, this.listenerTree, 0), e = 0; e < c.length; e++) {
                        var f = c[e];
                        f._listeners = null
                    }
                else
                    this._events && (this._events[a] = null);
                return this
            }
            ,
            g.prototype.listeners = function(a) {
                if (this.wildcard) {
                    var b = []
                      , c = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                    return h.call(this, b, c, this.listenerTree, 0),
                    b
                }
                return this._events || d.call(this),
                this._events[a] || (this._events[a] = []),
                j(this._events[a]) || (this._events[a] = [this._events[a]]),
                this._events[a]
            }
            ,
            g.prototype.listenerCount = function(a) {
                return this.listeners(a).length
            }
            ,
            g.prototype.listenersAny = function() {
                return this._all ? this._all : []
            }
            ,
            "function" == typeof define && define.amd ? define(function() {
                return g
            }) : "object" == typeof c ? b.exports = g : window.EventEmitter2 = g
        }()
    }
    , {}],
    2: [function(a, b, c) {
        "use strict";
        function d(a) {
            if (null === a || void 0 === a)
                throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(a)
        }
        function e() {
            try {
                if (!Object.assign)
                    return !1;
                var a = new String("abc");
                if (a[5] = "de",
                "5" === Object.getOwnPropertyNames(a)[0])
                    return !1;
                for (var b = {}, c = 0; c < 10; c++)
                    b["_" + String.fromCharCode(c)] = c;
                var d = Object.getOwnPropertyNames(b).map(function(a) {
                    return b[a]
                });
                if ("0123456789" !== d.join(""))
                    return !1;
                var e = {};
                return "abcdefghijklmnopqrst".split("").forEach(function(a) {
                    e[a] = a
                }),
                "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, e)).join("")
            } catch (f) {
                return !1
            }
        }
        var f = Object.getOwnPropertySymbols
          , g = Object.prototype.hasOwnProperty
          , h = Object.prototype.propertyIsEnumerable;
        b.exports = e() ? Object.assign : function(a, b) {
            for (var c, e, i = d(a), j = 1; j < arguments.length; j++) {
                c = Object(arguments[j]);
                for (var k in c)
                    g.call(c, k) && (i[k] = c[k]);
                if (f) {
                    e = f(c);
                    for (var l = 0; l < e.length; l++)
                        h.call(c, e[l]) && (i[e[l]] = c[e[l]])
                }
            }
            return i
        }
    }
    , {}],
    3: [function(a, b, c) {
        var d = this.ROSLIB || {
            REVISION: "0.20.0"
        }
          , e = a("object-assign");
        e(d, a("./core")),
        e(d, a("./actionlib")),
        e(d, a("./math")),
        e(d, a("./tf")),
        e(d, a("./urdf")),
        b.exports = d
    }
    , {
        "./actionlib": 9,
        "./core": 18,
        "./math": 23,
        "./tf": 26,
        "./urdf": 38,
        "object-assign": 2
    }],
    4: [function(a, b, c) {
        (function(b) {
            b.ROSLIB = a("./RosLib")
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "./RosLib": 3
    }],
    5: [function(a, b, c) {
        function d(a) {
            var b = this;
            a = a || {},
            this.ros = a.ros,
            this.serverName = a.serverName,
            this.actionName = a.actionName,
            this.timeout = a.timeout,
            this.omitFeedback = a.omitFeedback,
            this.omitStatus = a.omitStatus,
            this.omitResult = a.omitResult,
            this.goals = {};
            var c = !1;
            this.feedbackListener = new e({
                ros: this.ros,
                name: this.serverName + "/feedback",
                messageType: this.actionName + "Feedback"
            }),
            this.statusListener = new e({
                ros: this.ros,
                name: this.serverName + "/status",
                messageType: "actionlib_msgs/GoalStatusArray"
            }),
            this.resultListener = new e({
                ros: this.ros,
                name: this.serverName + "/result",
                messageType: this.actionName + "Result"
            }),
            this.goalTopic = new e({
                ros: this.ros,
                name: this.serverName + "/goal",
                messageType: this.actionName + "Goal"
            }),
            this.cancelTopic = new e({
                ros: this.ros,
                name: this.serverName + "/cancel",
                messageType: "actionlib_msgs/GoalID"
            }),
            this.goalTopic.advertise(),
            this.cancelTopic.advertise(),
            this.omitStatus || this.statusListener.subscribe(function(a) {
                c = !0,
                a.status_list.forEach(function(a) {
                    var c = b.goals[a.goal_id.id];
                    c && c.emit("status", a)
                })
            }),
            this.omitFeedback || this.feedbackListener.subscribe(function(a) {
                var c = b.goals[a.status.goal_id.id];
                c && (c.emit("status", a.status),
                c.emit("feedback", a.feedback))
            }),
            this.omitResult || this.resultListener.subscribe(function(a) {
                var c = b.goals[a.status.goal_id.id];
                c && (c.emit("status", a.status),
                c.emit("result", a.result))
            }),
            this.timeout && setTimeout(function() {
                c || b.emit("timeout")
            }, this.timeout)
        }
        var e = a("../core/Topic")
          , f = a("../core/Message")
          , g = a("eventemitter2").EventEmitter2;
        d.prototype.__proto__ = g.prototype,
        d.prototype.cancel = function() {
            var a = new f;
            this.cancelTopic.publish(a)
        }
        ,
        d.prototype.dispose = function() {
            this.goalTopic.unadvertise(),
            this.cancelTopic.unadvertise(),
            this.omitStatus || this.statusListener.unsubscribe(),
            this.omitFeedback || this.feedbackListener.unsubscribe(),
            this.omitResult || this.resultListener.unsubscribe()
        }
        ,
        b.exports = d
    }
    , {
        "../core/Message": 10,
        "../core/Topic": 17,
        eventemitter2: 1
    }],
    6: [function(a, b, c) {
        function d(a) {
            var b = this;
            a = a || {},
            this.ros = a.ros,
            this.serverName = a.serverName,
            this.actionName = a.actionName,
            this.timeout = a.timeout,
            this.omitFeedback = a.omitFeedback,
            this.omitStatus = a.omitStatus,
            this.omitResult = a.omitResult;
            var c = new e({
                ros: this.ros,
                name: this.serverName + "/goal",
                messageType: this.actionName + "Goal"
            })
              , d = new e({
                ros: this.ros,
                name: this.serverName + "/feedback",
                messageType: this.actionName + "Feedback"
            })
              , f = new e({
                ros: this.ros,
                name: this.serverName + "/status",
                messageType: "actionlib_msgs/GoalStatusArray"
            })
              , g = new e({
                ros: this.ros,
                name: this.serverName + "/result",
                messageType: this.actionName + "Result"
            });
            c.subscribe(function(a) {
                b.emit("goal", a)
            }),
            f.subscribe(function(a) {
                a.status_list.forEach(function(a) {
                    b.emit("status", a)
                })
            }),
            d.subscribe(function(a) {
                b.emit("status", a.status),
                b.emit("feedback", a.feedback)
            }),
            g.subscribe(function(a) {
                b.emit("status", a.status),
                b.emit("result", a.result)
            })
        }
        var e = a("../core/Topic")
          , f = (a("../core/Message"),
        a("eventemitter2").EventEmitter2);
        d.prototype.__proto__ = f.prototype,
        b.exports = d
    }
    , {
        "../core/Message": 10,
        "../core/Topic": 17,
        eventemitter2: 1
    }],
    7: [function(a, b, c) {
        function d(a) {
            var b = this;
            this.actionClient = a.actionClient,
            this.goalMessage = a.goalMessage,
            this.isFinished = !1;
            var c = new Date;
            this.goalID = "goal_" + Math.random() + "_" + c.getTime(),
            this.goalMessage = new e({
                goal_id: {
                    stamp: {
                        secs: 0,
                        nsecs: 0
                    },
                    id: this.goalID
                },
                goal: this.goalMessage
            }),
            this.on("status", function(a) {
                b.status = a
            }),
            this.on("result", function(a) {
                b.isFinished = !0,
                b.result = a
            }),
            this.on("feedback", function(a) {
                b.feedback = a
            }),
            this.actionClient.goals[this.goalID] = this
        }
        var e = a("../core/Message")
          , f = a("eventemitter2").EventEmitter2;
        d.prototype.__proto__ = f.prototype,
        d.prototype.send = function(a) {
            var b = this;
            b.actionClient.goalTopic.publish(b.goalMessage),
            a && setTimeout(function() {
                b.isFinished || b.emit("timeout")
            }, a)
        }
        ,
        d.prototype.cancel = function() {
            var a = new e({
                id: this.goalID
            });
            this.actionClient.cancelTopic.publish(a)
        }
        ,
        b.exports = d
    }
    , {
        "../core/Message": 10,
        eventemitter2: 1
    }],
    8: [function(a, b, c) {
        function d(a) {
            var b = this;
            a = a || {},
            this.ros = a.ros,
            this.serverName = a.serverName,
            this.actionName = a.actionName,
            this.feedbackPublisher = new e({
                ros: this.ros,
                name: this.serverName + "/feedback",
                messageType: this.actionName + "Feedback"
            }),
            this.feedbackPublisher.advertise();
            var c = new e({
                ros: this.ros,
                name: this.serverName + "/status",
                messageType: "actionlib_msgs/GoalStatusArray"
            });
            c.advertise(),
            this.resultPublisher = new e({
                ros: this.ros,
                name: this.serverName + "/result",
                messageType: this.actionName + "Result"
            }),
            this.resultPublisher.advertise();
            var d = new e({
                ros: this.ros,
                name: this.serverName + "/goal",
                messageType: this.actionName + "Goal"
            })
              , g = new e({
                ros: this.ros,
                name: this.serverName + "/cancel",
                messageType: "actionlib_msgs/GoalID"
            });
            this.statusMessage = new f({
                header: {
                    stamp: {
                        secs: 0,
                        nsecs: 100
                    },
                    frame_id: ""
                },
                status_list: []
            }),
            this.currentGoal = null,
            this.nextGoal = null,
            d.subscribe(function(a) {
                b.currentGoal ? (b.nextGoal = a,
                b.emit("cancel")) : (b.statusMessage.status_list = [{
                    goal_id: a.goal_id,
                    status: 1
                }],
                b.currentGoal = a,
                b.emit("goal", a.goal))
            });
            var h = function(a, b) {
                return !(a.secs > b.secs) && (a.secs < b.secs || a.nsecs < b.nsecs)
            };
            g.subscribe(function(a) {
                0 === a.stamp.secs && 0 === a.stamp.secs && "" === a.id ? (b.nextGoal = null,
                b.currentGoal && b.emit("cancel")) : (b.currentGoal && a.id === b.currentGoal.goal_id.id ? b.emit("cancel") : b.nextGoal && a.id === b.nextGoal.goal_id.id && (b.nextGoal = null),
                b.nextGoal && h(b.nextGoal.goal_id.stamp, a.stamp) && (b.nextGoal = null),
                b.currentGoal && h(b.currentGoal.goal_id.stamp, a.stamp) && b.emit("cancel"))
            });
            setInterval(function() {
                var a = new Date
                  , d = Math.floor(a.getTime() / 1e3)
                  , e = Math.round(1e9 * (a.getTime() / 1e3 - d));
                b.statusMessage.header.stamp.secs = d,
                b.statusMessage.header.stamp.nsecs = e,
                c.publish(b.statusMessage)
            }, 500)
        }
        var e = a("../core/Topic")
          , f = a("../core/Message")
          , g = a("eventemitter2").EventEmitter2;
        d.prototype.__proto__ = g.prototype,
        d.prototype.setSucceeded = function(a) {
            var b = new f({
                status: {
                    goal_id: this.currentGoal.goal_id,
                    status: 3
                },
                result: a
            });
            this.resultPublisher.publish(b),
            this.statusMessage.status_list = [],
            this.nextGoal ? (this.currentGoal = this.nextGoal,
            this.nextGoal = null,
            this.emit("goal", this.currentGoal.goal)) : this.currentGoal = null
        }
        ,
        d.prototype.sendFeedback = function(a) {
            var b = new f({
                status: {
                    goal_id: this.currentGoal.goal_id,
                    status: 1
                },
                feedback: a
            });
            this.feedbackPublisher.publish(b)
        }
        ,
        d.prototype.setPreempted = function() {
            this.statusMessage.status_list = [];
            var a = new f({
                status: {
                    goal_id: this.currentGoal.goal_id,
                    status: 2
                }
            });
            this.resultPublisher.publish(a),
            this.nextGoal ? (this.currentGoal = this.nextGoal,
            this.nextGoal = null,
            this.emit("goal", this.currentGoal.goal)) : this.currentGoal = null
        }
        ,
        b.exports = d
    }
    , {
        "../core/Message": 10,
        "../core/Topic": 17,
        eventemitter2: 1
    }],
    9: [function(a, b, c) {
        var d = a("../core/Ros")
          , e = a("../mixin")
          , f = b.exports = {
            ActionClient: a("./ActionClient"),
            ActionListener: a("./ActionListener"),
            Goal: a("./Goal"),
            SimpleActionServer: a("./SimpleActionServer")
        };
        e(d, ["ActionClient", "SimpleActionServer"], f)
    }
    , {
        "../core/Ros": 12,
        "../mixin": 24,
        "./ActionClient": 5,
        "./ActionListener": 6,
        "./Goal": 7,
        "./SimpleActionServer": 8
    }],
    10: [function(a, b, c) {
        function d(a) {
            e(this, a)
        }
        var e = a("object-assign");
        b.exports = d
    }
    , {
        "object-assign": 2
    }],
    11: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.ros = a.ros,
            this.name = a.name
        }
        var e = a("./Service")
          , f = a("./ServiceRequest");
        d.prototype.get = function(a) {
            var b = new e({
                ros: this.ros,
                name: "/rosapi/get_param",
                serviceType: "rosapi/GetParam"
            })
              , c = new f({
                name: this.name
            });
            b.callService(c, function(b) {
                var c = JSON.parse(b.value);
                a(c)
            })
        }
        ,
        d.prototype.set = function(a, b) {
            var c = new e({
                ros: this.ros,
                name: "/rosapi/set_param",
                serviceType: "rosapi/SetParam"
            })
              , d = new f({
                name: this.name,
                value: JSON.stringify(a)
            });
            c.callService(d, b)
        }
        ,
        d.prototype["delete"] = function(a) {
            var b = new e({
                ros: this.ros,
                name: "/rosapi/delete_param",
                serviceType: "rosapi/DeleteParam"
            })
              , c = new f({
                name: this.name
            });
            b.callService(c, a)
        }
        ,
        b.exports = d
    }
    , {
        "./Service": 13,
        "./ServiceRequest": 14
    }],
    12: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.socket = null,
            this.idCounter = 0,
            this.isConnected = !1,
            this.transportLibrary = a.transportLibrary || "websocket",
            this.transportOptions = a.transportOptions || {},
            "undefined" == typeof a.groovyCompatibility ? this.groovyCompatibility = !0 : this.groovyCompatibility = a.groovyCompatibility,
            this.setMaxListeners(0),
            a.url && this.connect(a.url)
        }
        var e = a("ws")
          , f = a("./SocketAdapter.js")
          , g = a("./Service")
          , h = a("./ServiceRequest")
          , i = a("object-assign")
          , j = a("eventemitter2").EventEmitter2;
        d.prototype.__proto__ = j.prototype,
        d.prototype.connect = function(a) {
            "socket.io" === this.transportLibrary ? (this.socket = i(io(a, {
                "force new connection": !0
            }), f(this)),
            this.socket.on("connect", this.socket.onopen),
            this.socket.on("data", this.socket.onmessage),
            this.socket.on("close", this.socket.onclose),
            this.socket.on("error", this.socket.onerror)) : "RTCPeerConnection" === this.transportLibrary.constructor.name ? this.socket = i(this.transportLibrary.createDataChannel(a, this.transportOptions), f(this)) : this.socket = i(new e(a), f(this))
        }
        ,
        d.prototype.close = function() {
            this.socket && this.socket.close()
        }
        ,
        d.prototype.authenticate = function(a, b, c, d, e, f, g) {
            var h = {
                op: "auth",
                mac: a,
                client: b,
                dest: c,
                rand: d,
                t: e,
                level: f,
                end: g
            };
            this.callOnConnection(h)
        }
        ,
        d.prototype.callOnConnection = function(a) {
            var b = this
              , c = JSON.stringify(a)
              , d = null;
            d = "socket.io" === this.transportLibrary ? function(a) {
                b.socket.emit("operation", a)
            }
            : function(a) {
                b.socket.send(a)
            }
            ,
            this.isConnected ? d(c) : b.once("connection", function() {
                d(c)
            })
        }
        ,
        d.prototype.setStatusLevel = function(a, b) {
            var c = {
                op: "set_level",
                level: a,
                id: b
            };
            this.callOnConnection(c)
        }
        ,
        d.prototype.getActionServers = function(a, b) {
            var c = new g({
                ros: this,
                name: "/rosapi/action_servers",
                serviceType: "rosapi/GetActionServers"
            })
              , d = new h({});
            "function" == typeof b ? c.callService(d, function(b) {
                a(b.action_servers)
            }, function(a) {
                b(a)
            }) : c.callService(d, function(b) {
                a(b.action_servers)
            })
        }
        ,
        d.prototype.getTopics = function(a, b) {
            var c = new g({
                ros: this,
                name: "/rosapi/topics",
                serviceType: "rosapi/Topics"
            })
              , d = new h;
            "function" == typeof b ? c.callService(d, function(b) {
                a(b)
            }, function(a) {
                b(a)
            }) : c.callService(d, function(b) {
                a(b)
            })
        }
        ,
        d.prototype.getTopicsForType = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/topics_for_type",
                serviceType: "rosapi/TopicsForType"
            })
              , e = new h({
                type: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a.topics)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a.topics)
            })
        }
        ,
        d.prototype.getServices = function(a, b) {
            var c = new g({
                ros: this,
                name: "/rosapi/services",
                serviceType: "rosapi/Services"
            })
              , d = new h;
            "function" == typeof b ? c.callService(d, function(b) {
                a(b.services)
            }, function(a) {
                b(a)
            }) : c.callService(d, function(b) {
                a(b.services)
            })
        }
        ,
        d.prototype.getServicesForType = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/services_for_type",
                serviceType: "rosapi/ServicesForType"
            })
              , e = new h({
                type: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a.services)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a.services)
            })
        }
        ,
        d.prototype.getServiceRequestDetails = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/service_request_details",
                serviceType: "rosapi/ServiceRequestDetails"
            })
              , e = new h({
                type: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a)
            })
        }
        ,
        d.prototype.getServiceResponseDetails = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/service_response_details",
                serviceType: "rosapi/ServiceResponseDetails"
            })
              , e = new h({
                type: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a)
            })
        }
        ,
        d.prototype.getNodes = function(a, b) {
            var c = new g({
                ros: this,
                name: "/rosapi/nodes",
                serviceType: "rosapi/Nodes"
            })
              , d = new h;
            "function" == typeof b ? c.callService(d, function(b) {
                a(b.nodes)
            }, function(a) {
                b(a)
            }) : c.callService(d, function(b) {
                a(b.nodes)
            })
        }
        ,
        d.prototype.getNodeDetails = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/node_details",
                serviceType: "rosapi/NodeDetails"
            })
              , e = new h({
                node: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a.subscribing, a.publishing, a.services)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a)
            })
        }
        ,
        d.prototype.getParams = function(a, b) {
            var c = new g({
                ros: this,
                name: "/rosapi/get_param_names",
                serviceType: "rosapi/GetParamNames"
            })
              , d = new h;
            "function" == typeof b ? c.callService(d, function(b) {
                a(b.names)
            }, function(a) {
                b(a)
            }) : c.callService(d, function(b) {
                a(b.names)
            })
        }
        ,
        d.prototype.getTopicType = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/topic_type",
                serviceType: "rosapi/TopicType"
            })
              , e = new h({
                topic: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a.type)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a.type)
            })
        }
        ,
        d.prototype.getServiceType = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/service_type",
                serviceType: "rosapi/ServiceType"
            })
              , e = new h({
                service: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a.type)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a.type)
            })
        }
        ,
        d.prototype.getMessageDetails = function(a, b, c) {
            var d = new g({
                ros: this,
                name: "/rosapi/message_details",
                serviceType: "rosapi/MessageDetails"
            })
              , e = new h({
                type: a
            });
            "function" == typeof c ? d.callService(e, function(a) {
                b(a.typedefs)
            }, function(a) {
                c(a)
            }) : d.callService(e, function(a) {
                b(a.typedefs)
            })
        }
        ,
        d.prototype.decodeTypeDefs = function(a) {
            var b = this
              , c = function(a, d) {
                for (var e = {}, f = 0; f < a.fieldnames.length; f++) {
                    var g = a.fieldarraylen[f]
                      , h = a.fieldnames[f]
                      , i = a.fieldtypes[f];
                    if (i.indexOf("/") === -1)
                        g === -1 ? e[h] = i : e[h] = [i];
                    else {
                        for (var j = !1, k = 0; k < d.length; k++)
                            if (d[k].type.toString() === i.toString()) {
                                j = d[k];
                                break
                            }
                        if (j) {
                            var l = c(j, d);
                            g === -1 || (e[h] = [l])
                        } else
                            b.emit("error", "Cannot find " + i + " in decodeTypeDefs")
                    }
                }
                return e
            };
            return c(a[0], a)
        }
        ,
        b.exports = d
    }
    , {
        "./Service": 13,
        "./ServiceRequest": 14,
        "./SocketAdapter.js": 16,
        eventemitter2: 1,
        "object-assign": 2,
        ws: 39
    }],
    13: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.ros = a.ros,
            this.name = a.name,
            this.serviceType = a.serviceType,
            this.isAdvertised = !1,
            this._serviceCallback = null
        }
        var e = a("./ServiceResponse")
          , f = (a("./ServiceRequest"),
        a("eventemitter2").EventEmitter2);
        d.prototype.__proto__ = f.prototype,
        d.prototype.callService = function(a, b, c) {
            if (!this.isAdvertised) {
                var d = "call_service:" + this.name + ":" + ++this.ros.idCounter;
                (b || c) && this.ros.once(d, function(a) {
                    void 0 !== a.result && a.result === !1 ? "function" == typeof c && c(a.values) : "function" == typeof b && b(new e(a.values))
                });
                var f = {
                    op: "call_service",
                    id: d,
                    service: this.name,
                    args: a
                };
                this.ros.callOnConnection(f)
            }
        }
        ,
        d.prototype.advertise = function(a) {
            this.isAdvertised || "function" != typeof a || (this._serviceCallback = a,
            this.ros.on(this.name, this._serviceResponse.bind(this)),
            this.ros.callOnConnection({
                op: "advertise_service",
                type: this.serviceType,
                service: this.name
            }),
            this.isAdvertised = !0)
        }
        ,
        d.prototype.unadvertise = function() {
            this.isAdvertised && (this.ros.callOnConnection({
                op: "unadvertise_service",
                service: this.name
            }),
            this.isAdvertised = !1)
        }
        ,
        d.prototype._serviceResponse = function(a) {
            var b = {}
              , c = this._serviceCallback(a.args, b)
              , d = {
                op: "service_response",
                service: this.name,
                values: new e(b),
                result: c
            };
            a.id && (d.id = a.id),
            this.ros.callOnConnection(d)
        }
        ,
        b.exports = d
    }
    , {
        "./ServiceRequest": 14,
        "./ServiceResponse": 15,
        eventemitter2: 1
    }],
    14: [function(a, b, c) {
        function d(a) {
            e(this, a)
        }
        var e = a("object-assign");
        b.exports = d
    }
    , {
        "object-assign": 2
    }],
    15: [function(a, b, c) {
        function d(a) {
            e(this, a)
        }
        var e = a("object-assign");
        b.exports = d
    }
    , {
        "object-assign": 2
    }],
    16: [function(a, b, c) {
        "use strict";
        function d(a) {
            function b(b) {
                "publish" === b.op ? a.emit(b.topic, b.msg) : "service_response" === b.op ? a.emit(b.id, b) : "call_service" === b.op ? a.emit(b.service, b) : "status" === b.op && (b.id ? a.emit("status:" + b.id, b) : a.emit("status", b))
            }
            function c(a, b) {
                "png" === a.op ? e(a.data, b) : b(a)
            }
            function d(a, b) {
                if (!f)
                    throw "Cannot process BSON encoded message without BSON header.";
                var c = new FileReader;
                c.onload = function() {
                    var a = new Uint8Array(this.result)
                      , c = f.deserialize(a);
                    b(c)
                }
                ,
                c.readAsArrayBuffer(a)
            }
            return {
                onopen: function(b) {
                    a.isConnected = !0,
                    a.emit("connection", b)
                },
                onclose: function(b) {
                    a.isConnected = !1,
                    a.emit("close", b)
                },
                onerror: function(b) {
                    a.emit("error", b)
                },
                onmessage: function(a) {
                    if ("undefined" != typeof Blob && a.data instanceof Blob)
                        d(a.data, function(a) {
                            c(a, b)
                        });
                    else {
                        var e = JSON.parse("string" == typeof a ? a : a.data);
                        c(e, b)
                    }
                }
            }
        }
        var e = a("../util/decompressPng")
          , f = (a("ws"),
        null);
        "undefined" != typeof bson && (f = bson().BSON),
        b.exports = d
    }
    , {
        "../util/decompressPng": 41,
        ws: 39
    }],
    17: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.ros = a.ros,
            this.name = a.name,
            this.messageType = a.messageType,
            this.isAdvertised = !1,
            this.compression = a.compression || "none",
            this.throttle_rate = a.throttle_rate || 0,
            this.latch = a.latch || !1,
            this.queue_size = a.queue_size || 100,
            this.queue_length = a.queue_length || 0,
            this.reconnect_on_close = a.reconnect_on_close || !0,
            this.compression && "png" !== this.compression && "none" !== this.compression && this.emit("warning", this.compression + " compression is not supported. No compression will be used."),
            this.throttle_rate < 0 && (this.emit("warning", this.throttle_rate + " is not allowed. Set to 0"),
            this.throttle_rate = 0);
            var b = this;
            this.reconnect_on_close ? this.callForSubscribeAndAdvertise = function(a) {
                b.ros.callOnConnection(a),
                b.waitForReconnect = !1,
                b.reconnectFunc = function() {
                    b.waitForReconnect || (b.waitForReconnect = !0,
                    b.ros.callOnConnection(a),
                    b.ros.once("connection", function() {
                        b.waitForReconnect = !1
                    }))
                }
                ,
                b.ros.on("close", b.reconnectFunc)
            }
            : this.callForSubscribeAndAdvertise = this.ros.callOnConnection,
            this._messageCallback = function(a) {
                b.emit("message", new f(a))
            }
        }
        var e = a("eventemitter2").EventEmitter2
          , f = a("./Message");
        d.prototype.__proto__ = e.prototype,
        d.prototype.subscribe = function(a) {
            "function" == typeof a && this.on("message", a),
            this.subscribeId || (this.ros.on(this.name, this._messageCallback),
            this.subscribeId = "subscribe:" + this.name + ":" + ++this.ros.idCounter,
            this.callForSubscribeAndAdvertise({
                op: "subscribe",
                id: this.subscribeId,
                type: this.messageType,
                topic: this.name,
                compression: this.compression,
                throttle_rate: this.throttle_rate,
                queue_length: this.queue_length
            }))
        }
        ,
        d.prototype.unsubscribe = function(a) {
            a && (this.off("message", a),
            this.listeners("message").length) || this.subscribeId && (this.ros.off(this.name, this._messageCallback),
            this.reconnect_on_close && this.ros.off("close", this.reconnectFunc),
            this.emit("unsubscribe"),
            this.ros.callOnConnection({
                op: "unsubscribe",
                id: this.subscribeId,
                topic: this.name
            }),
            this.subscribeId = null)
        }
        ,
        d.prototype.advertise = function() {
            if (!this.isAdvertised && (this.advertiseId = "advertise:" + this.name + ":" + ++this.ros.idCounter,
            this.callForSubscribeAndAdvertise({
                op: "advertise",
                id: this.advertiseId,
                type: this.messageType,
                topic: this.name,
                latch: this.latch,
                queue_size: this.queue_size
            }),
            this.isAdvertised = !0,
            !this.reconnect_on_close)) {
                var a = this;
                this.ros.on("close", function() {
                    a.isAdvertised = !1
                })
            }
        }
        ,
        d.prototype.unadvertise = function() {
            this.isAdvertised && (this.reconnect_on_close && this.ros.off("close", this.reconnectFunc),
            this.emit("unadvertise"),
            this.ros.callOnConnection({
                op: "unadvertise",
                id: this.advertiseId,
                topic: this.name
            }),
            this.isAdvertised = !1)
        }
        ,
        d.prototype.publish = function(a) {
            this.isAdvertised || this.advertise(),
            this.ros.idCounter++;
            var b = {
                op: "publish",
                id: "publish:" + this.name + ":" + this.ros.idCounter,
                topic: this.name,
                msg: a,
                latch: this.latch
            };
            this.ros.callOnConnection(b)
        }
        ,
        b.exports = d
    }
    , {
        "./Message": 10,
        eventemitter2: 1
    }],
    18: [function(a, b, c) {
        var d = a("../mixin")
          , e = b.exports = {
            Ros: a("./Ros"),
            Topic: a("./Topic"),
            Message: a("./Message"),
            Param: a("./Param"),
            Service: a("./Service"),
            ServiceRequest: a("./ServiceRequest"),
            ServiceResponse: a("./ServiceResponse")
        };
        d(e.Ros, ["Param", "Service", "Topic"], e)
    }
    , {
        "../mixin": 24,
        "./Message": 10,
        "./Param": 11,
        "./Ros": 12,
        "./Service": 13,
        "./ServiceRequest": 14,
        "./ServiceResponse": 15,
        "./Topic": 17
    }],
    19: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.position = new e(a.position),
            this.orientation = new f(a.orientation)
        }
        var e = a("./Vector3")
          , f = a("./Quaternion");
        d.prototype.applyTransform = function(a) {
            this.position.multiplyQuaternion(a.rotation),
            this.position.add(a.translation);
            var b = a.rotation.clone();
            b.multiply(this.orientation),
            this.orientation = b
        }
        ,
        d.prototype.clone = function() {
            return new d(this)
        }
        ,
        b.exports = d
    }
    , {
        "./Quaternion": 20,
        "./Vector3": 22
    }],
    20: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.x = a.x || 0,
            this.y = a.y || 0,
            this.z = a.z || 0,
            this.w = "number" == typeof a.w ? a.w : 1
        }
        d.prototype.conjugate = function() {
            this.x *= -1,
            this.y *= -1,
            this.z *= -1
        }
        ,
        d.prototype.norm = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        }
        ,
        d.prototype.normalize = function() {
            var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            0 === a ? (this.x = 0,
            this.y = 0,
            this.z = 0,
            this.w = 1) : (a = 1 / a,
            this.x = this.x * a,
            this.y = this.y * a,
            this.z = this.z * a,
            this.w = this.w * a)
        }
        ,
        d.prototype.invert = function() {
            this.conjugate(),
            this.normalize()
        }
        ,
        d.prototype.multiply = function(a) {
            var b = this.x * a.w + this.y * a.z - this.z * a.y + this.w * a.x
              , c = -this.x * a.z + this.y * a.w + this.z * a.x + this.w * a.y
              , d = this.x * a.y - this.y * a.x + this.z * a.w + this.w * a.z
              , e = -this.x * a.x - this.y * a.y - this.z * a.z + this.w * a.w;
            this.x = b,
            this.y = c,
            this.z = d,
            this.w = e
        }
        ,
        d.prototype.clone = function() {
            return new d(this)
        }
        ,
        b.exports = d
    }
    , {}],
    21: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.translation = new e(a.translation),
            this.rotation = new f(a.rotation)
        }
        var e = a("./Vector3")
          , f = a("./Quaternion");
        d.prototype.clone = function() {
            return new d(this)
        }
        ,
        b.exports = d
    }
    , {
        "./Quaternion": 20,
        "./Vector3": 22
    }],
    22: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.x = a.x || 0,
            this.y = a.y || 0,
            this.z = a.z || 0
        }
        d.prototype.add = function(a) {
            this.x += a.x,
            this.y += a.y,
            this.z += a.z
        }
        ,
        d.prototype.subtract = function(a) {
            this.x -= a.x,
            this.y -= a.y,
            this.z -= a.z
        }
        ,
        d.prototype.multiplyQuaternion = function(a) {
            var b = a.w * this.x + a.y * this.z - a.z * this.y
              , c = a.w * this.y + a.z * this.x - a.x * this.z
              , d = a.w * this.z + a.x * this.y - a.y * this.x
              , e = -a.x * this.x - a.y * this.y - a.z * this.z;
            this.x = b * a.w + e * -a.x + c * -a.z - d * -a.y,
            this.y = c * a.w + e * -a.y + d * -a.x - b * -a.z,
            this.z = d * a.w + e * -a.z + b * -a.y - c * -a.x
        }
        ,
        d.prototype.clone = function() {
            return new d(this);
        }
        ,
        b.exports = d
    }
    , {}],
    23: [function(a, b, c) {
        b.exports = {
            Pose: a("./Pose"),
            Quaternion: a("./Quaternion"),
            Transform: a("./Transform"),
            Vector3: a("./Vector3")
        }
    }
    , {
        "./Pose": 19,
        "./Quaternion": 20,
        "./Transform": 21,
        "./Vector3": 22
    }],
    24: [function(a, b, c) {
        b.exports = function(a, b, c) {
            b.forEach(function(b) {
                var d = c[b];
                a.prototype[b] = function(a) {
                    return a.ros = this,
                    new d(a)
                }
            })
        }
    }
    , {}],
    25: [function(a, b, c) {
        function d(a) {
            a = a || {},
            this.ros = a.ros,
            this.fixedFrame = a.fixedFrame || "/base_link",
            this.angularThres = a.angularThres || 2,
            this.transThres = a.transThres || .01,
            this.rate = a.rate || 10,
            this.updateDelay = a.updateDelay || 50;
            var b = a.topicTimeout || 2
              , c = Math.floor(b)
              , d = Math.floor(1e9 * (b - c));
            this.topicTimeout = {
                secs: c,
                nsecs: d
            },
            this.serverName = a.serverName || "/tf2_web_republisher",
            this.repubServiceName = a.repubServiceName || "/republish_tfs",
            this.currentGoal = !1,
            this.currentTopic = !1,
            this.frameInfos = {},
            this.republisherUpdateRequested = !1,
            this.actionClient = this.ros.ActionClient({
                serverName: this.serverName,
                actionName: "tf2_web_republisher/TFSubscriptionAction",
                omitStatus: !0,
                omitResult: !0
            }),
            this.serviceClient = this.ros.Service({
                name: this.repubServiceName,
                serviceType: "tf2_web_republisher/RepublishTFs"
            })
        }
        var e = (a("../actionlib/ActionClient"),
        a("../actionlib/Goal"))
          , f = (a("../core/Service.js"),
        a("../core/ServiceRequest.js"))
          , g = a("../math/Transform");
        d.prototype.processTFArray = function(a) {
            a.transforms.forEach(function(a) {
                var b = a.child_frame_id;
                "/" === b[0] && (b = b.substring(1));
                var c = this.frameInfos[b];
                c && (c.transform = new g({
                    translation: a.transform.translation,
                    rotation: a.transform.rotation
                }),
                c.cbs.forEach(function(a) {
                    a(c.transform)
                }))
            }, this)
        }
        ,
        d.prototype.updateGoal = function() {
            var a = {
                source_frames: Object.keys(this.frameInfos),
                target_frame: this.fixedFrame,
                angular_thres: this.angularThres,
                trans_thres: this.transThres,
                rate: this.rate
            };
            if (this.ros.groovyCompatibility)
                this.currentGoal && this.currentGoal.cancel(),
                this.currentGoal = new e({
                    actionClient: this.actionClient,
                    goalMessage: a
                }),
                this.currentGoal.on("feedback", this.processTFArray.bind(this)),
                this.currentGoal.send();
            else {
                a.timeout = this.topicTimeout;
                var b = new f(a);
                this.serviceClient.callService(b, this.processResponse.bind(this))
            }
            this.republisherUpdateRequested = !1
        }
        ,
        d.prototype.processResponse = function(a) {
            this.currentTopic && this.currentTopic.unsubscribe(),
            this.currentTopic = this.ros.Topic({
                name: a.topic_name,
                messageType: "tf2_web_republisher/TFArray"
            }),
            this.currentTopic.subscribe(this.processTFArray.bind(this))
        }
        ,
        d.prototype.subscribe = function(a, b) {
            "/" === a[0] && (a = a.substring(1)),
            this.frameInfos[a] ? this.frameInfos[a].transform && b(this.frameInfos[a].transform) : (this.frameInfos[a] = {
                cbs: []
            },
            this.republisherUpdateRequested || (setTimeout(this.updateGoal.bind(this), this.updateDelay),
            this.republisherUpdateRequested = !0)),
            this.frameInfos[a].cbs.push(b)
        }
        ,
        d.prototype.unsubscribe = function(a, b) {
            "/" === a[0] && (a = a.substring(1));
            for (var c = this.frameInfos[a], d = c && c.cbs || [], e = d.length; e--; )
                d[e] === b && d.splice(e, 1);
            b && 0 !== d.length || delete this.frameInfos[a]
        }
        ,
        d.prototype.dispose = function() {
            this.actionClient.dispose(),
            this.currentTopic && this.currentTopic.unsubscribe()
        }
        ,
        b.exports = d
    }
    , {
        "../actionlib/ActionClient": 5,
        "../actionlib/Goal": 7,
        "../core/Service.js": 13,
        "../core/ServiceRequest.js": 14,
        "../math/Transform": 21
    }],
    26: [function(a, b, c) {
        var d = a("../core/Ros")
          , e = a("../mixin")
          , f = b.exports = {
            TFClient: a("./TFClient")
        };
        e(d, ["TFClient"], f)
    }
    , {
        "../core/Ros": 12,
        "../mixin": 24,
        "./TFClient": 25
    }],
    27: [function(a, b, c) {
        function d(a) {
            this.dimension = null,
            this.type = f.URDF_BOX;
            var b = a.xml.getAttribute("size").split(" ");
            this.dimension = new e({
                x: parseFloat(b[0]),
                y: parseFloat(b[1]),
                z: parseFloat(b[2])
            })
        }
        var e = a("../math/Vector3")
          , f = a("./UrdfTypes");
        b.exports = d
    }
    , {
        "../math/Vector3": 22,
        "./UrdfTypes": 36
    }],
    28: [function(a, b, c) {
        function d(a) {
            var b = a.xml.getAttribute("rgba").split(" ");
            this.r = parseFloat(b[0]),
            this.g = parseFloat(b[1]),
            this.b = parseFloat(b[2]),
            this.a = parseFloat(b[3])
        }
        b.exports = d
    }
    , {}],
    29: [function(a, b, c) {
        function d(a) {
            this.type = e.URDF_CYLINDER,
            this.length = parseFloat(a.xml.getAttribute("length")),
            this.radius = parseFloat(a.xml.getAttribute("radius"))
        }
        var e = a("./UrdfTypes");
        b.exports = d
    }
    , {
        "./UrdfTypes": 36
    }],
    30: [function(a, b, c) {
        function d(a) {
            this.name = a.xml.getAttribute("name"),
            this.type = a.xml.getAttribute("type");
            var b = a.xml.getElementsByTagName("parent");
            b.length > 0 && (this.parent = b[0].getAttribute("link"));
            var c = a.xml.getElementsByTagName("child");
            c.length > 0 && (this.child = c[0].getAttribute("link"));
            var d = a.xml.getElementsByTagName("limit");
            d.length > 0 && (this.minval = parseFloat(d[0].getAttribute("lower")),
            this.maxval = parseFloat(d[0].getAttribute("upper")))
        }
        b.exports = d
    }
    , {}],
    31: [function(a, b, c) {
        function d(a) {
            this.name = a.xml.getAttribute("name"),
            this.visuals = [];
            for (var b = a.xml.getElementsByTagName("visual"), c = 0; c < b.length; c++)
                this.visuals.push(new e({
                    xml: b[c]
                }))
        }
        var e = a("./UrdfVisual");
        b.exports = d
    }
    , {
        "./UrdfVisual": 37
    }],
    32: [function(a, b, c) {
        function d(a) {
            this.textureFilename = null,
            this.color = null,
            this.name = a.xml.getAttribute("name");
            var b = a.xml.getElementsByTagName("texture");
            b.length > 0 && (this.textureFilename = b[0].getAttribute("filename"));
            var c = a.xml.getElementsByTagName("color");
            c.length > 0 && (this.color = new e({
                xml: c[0]
            }))
        }
        var e = a("./UrdfColor");
        d.prototype.isLink = function() {
            return null === this.color && null === this.textureFilename
        }
        ;
        var f = a("object-assign");
        d.prototype.assign = function(a) {
            return f(this, a)
        }
        ,
        b.exports = d
    }
    , {
        "./UrdfColor": 28,
        "object-assign": 2
    }],
    33: [function(a, b, c) {
        function d(a) {
            this.scale = null,
            this.type = f.URDF_MESH,
            this.filename = a.xml.getAttribute("filename");
            var b = a.xml.getAttribute("scale");
            if (b) {
                var c = b.split(" ");
                this.scale = new e({
                    x: parseFloat(c[0]),
                    y: parseFloat(c[1]),
                    z: parseFloat(c[2])
                })
            }
        }
        var e = a("../math/Vector3")
          , f = a("./UrdfTypes");
        b.exports = d
    }
    , {
        "../math/Vector3": 22,
        "./UrdfTypes": 36
    }],
    34: [function(a, b, c) {
        function d(a) {
            a = a || {};
            var b = a.xml
              , c = a.string;
            if (this.materials = {},
            this.links = {},
            this.joints = {},
            c) {
                var d = new h;
                b = d.parseFromString(c, "text/xml")
            }
            var i = b.documentElement;
            this.name = i.getAttribute("name");
            for (var j = i.childNodes, k = 0; k < j.length; k++) {
                var l = j[k];
                if ("material" === l.tagName) {
                    var m = new e({
                        xml: l
                    });
                    void 0 !== this.materials[m.name] ? this.materials[m.name].isLink() ? this.materials[m.name].assign(m) : console.warn("Material " + m.name + "is not unique.") : this.materials[m.name] = m
                } else if ("link" === l.tagName) {
                    var n = new f({
                        xml: l
                    });
                    if (void 0 !== this.links[n.name])
                        console.warn("Link " + n.name + " is not unique.");
                    else {
                        for (var o = 0; o < n.visuals.length; o++) {
                            var p = n.visuals[o].material;
                            null !== p && (void 0 !== this.materials[p.name] ? n.visuals[o].material = this.materials[p.name] : this.materials[p.name] = p)
                        }
                        this.links[n.name] = n
                    }
                } else if ("joint" === l.tagName) {
                    var q = new g({
                        xml: l
                    });
                    this.joints[q.name] = q
                }
            }
        }
        var e = a("./UrdfMaterial")
          , f = a("./UrdfLink")
          , g = a("./UrdfJoint")
          , h = a("xmldom").DOMParser;
        b.exports = d
    }
    , {
        "./UrdfJoint": 30,
        "./UrdfLink": 31,
        "./UrdfMaterial": 32,
        xmldom: 42
    }],
    35: [function(a, b, c) {
        function d(a) {
            this.type = e.URDF_SPHERE,
            this.radius = parseFloat(a.xml.getAttribute("radius"))
        }
        var e = a("./UrdfTypes");
        b.exports = d
    }
    , {
        "./UrdfTypes": 36
    }],
    36: [function(a, b, c) {
        b.exports = {
            URDF_SPHERE: 0,
            URDF_BOX: 1,
            URDF_CYLINDER: 2,
            URDF_MESH: 3
        }
    }
    , {}],
    37: [function(a, b, c) {
        function d(a) {
            var b = a.xml;
            this.origin = null,
            this.geometry = null,
            this.material = null;
            var c = b.getElementsByTagName("origin");
            if (0 === c.length)
                this.origin = new e;
            else {
                var d = c[0].getAttribute("xyz")
                  , m = new f;
                d && (d = d.split(" "),
                m = new f({
                    x: parseFloat(d[0]),
                    y: parseFloat(d[1]),
                    z: parseFloat(d[2])
                }));
                var n = c[0].getAttribute("rpy")
                  , o = new g;
                if (n) {
                    n = n.split(" ");
                    var p = parseFloat(n[0])
                      , q = parseFloat(n[1])
                      , r = parseFloat(n[2])
                      , s = p / 2
                      , t = q / 2
                      , u = r / 2
                      , v = Math.sin(s) * Math.cos(t) * Math.cos(u) - Math.cos(s) * Math.sin(t) * Math.sin(u)
                      , w = Math.cos(s) * Math.sin(t) * Math.cos(u) + Math.sin(s) * Math.cos(t) * Math.sin(u)
                      , x = Math.cos(s) * Math.cos(t) * Math.sin(u) - Math.sin(s) * Math.sin(t) * Math.cos(u)
                      , y = Math.cos(s) * Math.cos(t) * Math.cos(u) + Math.sin(s) * Math.sin(t) * Math.sin(u);
                    o = new g({
                        x: v,
                        y: w,
                        z: x,
                        w: y
                    }),
                    o.normalize()
                }
                this.origin = new e({
                    position: m,
                    orientation: o
                })
            }
            var z = b.getElementsByTagName("geometry");
            if (z.length > 0) {
                for (var A = z[0], B = null, C = 0; C < A.childNodes.length; C++) {
                    var D = A.childNodes[C];
                    if (1 === D.nodeType) {
                        B = D;
                        break
                    }
                }
                var E = B.nodeName;
                "sphere" === E ? this.geometry = new l({
                    xml: B
                }) : "box" === E ? this.geometry = new i({
                    xml: B
                }) : "cylinder" === E ? this.geometry = new h({
                    xml: B
                }) : "mesh" === E ? this.geometry = new k({
                    xml: B
                }) : console.warn("Unknown geometry type " + E)
            }
            var F = b.getElementsByTagName("material");
            F.length > 0 && (this.material = new j({
                xml: F[0]
            }))
        }
        var e = a("../math/Pose")
          , f = a("../math/Vector3")
          , g = a("../math/Quaternion")
          , h = a("./UrdfCylinder")
          , i = a("./UrdfBox")
          , j = a("./UrdfMaterial")
          , k = a("./UrdfMesh")
          , l = a("./UrdfSphere");
        b.exports = d
    }
    , {
        "../math/Pose": 19,
        "../math/Quaternion": 20,
        "../math/Vector3": 22,
        "./UrdfBox": 27,
        "./UrdfCylinder": 29,
        "./UrdfMaterial": 32,
        "./UrdfMesh": 33,
        "./UrdfSphere": 35
    }],
    38: [function(a, b, c) {
        b.exports = a("object-assign")({
            UrdfBox: a("./UrdfBox"),
            UrdfColor: a("./UrdfColor"),
            UrdfCylinder: a("./UrdfCylinder"),
            UrdfLink: a("./UrdfLink"),
            UrdfMaterial: a("./UrdfMaterial"),
            UrdfMesh: a("./UrdfMesh"),
            UrdfModel: a("./UrdfModel"),
            UrdfSphere: a("./UrdfSphere"),
            UrdfVisual: a("./UrdfVisual")
        }, a("./UrdfTypes"))
    }
    , {
        "./UrdfBox": 27,
        "./UrdfColor": 28,
        "./UrdfCylinder": 29,
        "./UrdfLink": 31,
        "./UrdfMaterial": 32,
        "./UrdfMesh": 33,
        "./UrdfModel": 34,
        "./UrdfSphere": 35,
        "./UrdfTypes": 36,
        "./UrdfVisual": 37,
        "object-assign": 2
    }],
    39: [function(a, b, c) {
        (function(a) {
            b.exports = a.WebSocket
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    40: [function(a, b, c) {
        b.exports = function() {
            return document.createElement("canvas")
        }
    }
    , {}],
    41: [function(a, b, c) {
        (function(c) {
            "use strict";
            function d(a, b) {
                var c = new f;
                c.onload = function() {
                    var a = new e
                      , d = a.getContext("2d");
                    a.width = c.width,
                    a.height = c.height,
                    d.imageSmoothingEnabled = !1,
                    d.webkitImageSmoothingEnabled = !1,
                    d.mozImageSmoothingEnabled = !1,
                    d.drawImage(c, 0, 0);
                    for (var f = d.getImageData(0, 0, c.width, c.height).data, g = "", h = 0; h < f.length; h += 4)
                        g += String.fromCharCode(f[h], f[h + 1], f[h + 2]);
                    b(JSON.parse(g))
                }
                ,
                c.src = "data:image/png;base64," + a
            }
            var e = a("canvas")
              , f = e.Image || c.Image;
            b.exports = d
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        canvas: 40
    }],
    42: [function(a, b, c) {
        (function(a) {
            c.DOMImplementation = a.DOMImplementation,
            c.XMLSerializer = a.XMLSerializer,
            c.DOMParser = a.DOMParser
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}]
}, {}, [4]);
