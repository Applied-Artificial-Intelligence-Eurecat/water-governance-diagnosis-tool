import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/auto-console-group/dist/index.js
var $ = "font-weight: normal;";
var F = "font-weight: bold;";
var H = "font-style: italic;";
var U = $ + H;
var N = "color: #135CD2;";
var S = "color: #A9C7FB;";
var k = "color: #1F1F1F;";
var j = "color: #E3E3E3;";
var f = "default";
var Q = "error";
var C = "log";
var _ = Object.freeze({
  assert: true,
  error: true,
  warn: true
});
var L = {
  expand: false,
  defaultEvent: void 0,
  event: void 0,
  label: "AutoConsoleGroup",
  showTime: true
};
var q = {
  profile: 0,
  profileEnd: 0,
  timeStamp: 0,
  trace: 0
};
var P = (o) => {
  const t = o.event || o.defaultEvent;
  return t ? `${t}` : "";
};
var u = Object.assign(console);
function V() {
  const o = /* @__PURE__ */ new Date(), t = (l2, d2) => o[l2]().toString().padStart(d2, "0"), s2 = t("getHours", 2), c2 = t("getMinutes", 2), r = t("getSeconds", 2), i2 = t("getMilliseconds", 3);
  return `@ ${s2}:${c2}:${r}.${i2}`;
}
var {
  fromEntries: W,
  keys: b
} = Object;
var z = (o) => [o, u[o]];
var K = (o) => (t) => [t, function(s2) {
  o[t] = s2;
}];
var h = (o, t) => W(b(o).map(t));
function X(o = {}) {
  const t = {}, s2 = {}, c2 = [], r = __spreadValues(__spreadProps(__spreadValues({}, L), {
    // @ts-expect-error: backwards compatibility
    expand: !o.collapsed || L.expanded
  }), o);
  let i2 = "";
  function l2() {
    c2.length = 0, i2 = "";
  }
  function d2() {
    delete r.event, l2();
  }
  const v2 = () => c2.some(([e]) => e in _), O2 = () => v2() ? true : !!r.expand, A2 = () => r.showTime ? i2 : "";
  function g2() {
    if (c2.length === 0) {
      d2();
      return;
    }
    u[O2() ? "group" : "groupCollapsed"](`%c${r.label}%c ${P(r)} %c${A2()}`, $, F, U);
    for (const [e, ...n] of c2) u.assert(e in u, `Unknown console method: ${e}`), e in u && u[e](...n);
    u.groupEnd(), d2();
  }
  function p2() {
    i2 === "" && (i2 = V(), queueMicrotask(() => queueMicrotask(g2)));
  }
  function G2(e) {
    p2(), r.event = e;
  }
  function a(e, ...n) {
    c2.length === 0 && p2(), c2.push([e, ...n]);
  }
  const D2 = (e) => (...n) => {
    let m2;
    try {
      m2 = e(...n);
    } catch (E2) {
      if (!Error.prototype.isPrototypeOf(E2)) throw E2;
      a(Q, E2), g2();
    }
    return m2;
  };
  function M2(e, ...n) {
    e !== true && a("assert", e, ...n);
  }
  function I2(e = f) {
    s2[e] ? s2[e] += 1 : s2[e] = 1, a(C, `${e}: ${s2[e]}`);
  }
  function R2(e = f) {
    delete s2[e];
  }
  function x2(e = f) {
    p2(), t[e] = performance.now();
  }
  function w2(e = f, ...n) {
    if (!t[e]) {
      a("timeLog", e, ...n);
      return;
    }
    const m2 = performance.now() - t[e];
    a(C, `${e}: ${m2} ms`, ...n);
  }
  function y2(e = f) {
    w2(e), delete t[e];
  }
  const B2 = (e) => [e, (...n) => a(e, ...n)];
  return __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, h(r, K(r))), h(console, B2)), h(q, z)), {
    assert: M2,
    count: I2,
    countReset: R2,
    endAutoGroup: g2,
    errorBoundary: D2,
    event: G2,
    purge: l2,
    time: x2,
    timeEnd: y2,
    timeLog: w2,
    touch: p2
  });
}
var T = typeof window > "u" || typeof window.matchMedia != "function" ? false : window.matchMedia("(prefers-color-scheme: dark)").matches;
var J = T ? S : N;
var Y = T ? j : k;

// node_modules/@iframe-resizer/child/index.esm.js
var i = "5.5.8";
var s = "iframeResizer";
var c = ":";
var l = "init";
var d = "message";
var u2 = "pageHide";
var m = "pageInfo";
var f2 = "parentInfo";
var p = "scrollToOffset";
var h2 = "title";
var y = 10;
var g = "data-iframe-size";
var b2 = "data-iframe-overflowed";
var v = "data-iframe-ignore";
var z2 = "height";
var w = "width";
var $2 = "offset";
var S2 = "offsetSize";
var O = "string";
var E = "number";
var M = "object";
var j2 = "function";
var k2 = "auto";
var x = "readystatechange";
var T2 = "bottom";
var I = "right";
var N2 = "autoResizeEnabled";
var C2 = Symbol("sizeChanged");
var P2 = "manualResize";
var A = "parentResize";
var R = {
  [P2]: 1,
  [A]: 1
};
var B = "setOffsetSize";
var L2 = "resizeObserver";
var q2 = "overflowObserver";
var D = "mutationObserver";
var W2 = "visibilityObserver";
var F2 = "[iFrameSizer]";
var V2 = /* @__PURE__ */ new Set(["head", "body", "meta", "base", "title", "script", "link", "style", "map", "area", "option", "optgroup", "template", "track", "wbr", "nobr"]);
var H2 = (e) => {
  if (!e) return "";
  let t = -559038744, n = 1103547984;
  for (let o, r = 0; r < e.length; r++) o = e.codePointAt(r), t = Math.imul(t ^ o, 2246822519), n = Math.imul(n ^ o, 3266489917);
  return t ^= Math.imul(t ^ n >>> 15, 1935289751), n ^= Math.imul(n ^ t >>> 15, 3405138345), t ^= n >>> 16, n ^= t >>> 16, (2097152 * (n >>> 0) + (t >>> 11)).toString(36);
};
var U2 = (e) => e.replace(/[A-Za-z]/g, (e2) => String.fromCodePoint((e2 <= "Z" ? 90 : 122) >= (e2 = e2.codePointAt(0) + 19) ? e2 : e2 - 26));
var Z = ["spjluzl", "rlf", "clyzpvu"];
var J2 = ["<yi>Puchspk Spjluzl Rlf</><iy><iy>", "<yi>Tpzzpun Spjluzl Rlf</><iy><iy>", "Aopz spiyhyf pz hchpshisl dpao ivao Jvttlyjphs huk Vwlu-Zvbyjl spjluzlz.<iy><iy><i>Jvttlyjphs Spjluzl</><iy>Mvy jvttlyjphs bzl, <p>pmyhtl-ylzpgly</> ylxbpylz h svd jvza vul aptl spjluzl mll. Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.<iy><iy><i>Vwlu Zvbyjl Spjluzl</><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-jvttlyjphs vwlu zvbyjl wyvqlja aolu fvb jhu bzl pa mvy myll bukly aol alytz vm aol NWS C3 Spjluzl. Av jvumpyt fvb hjjlwa aolzl alytz, wslhzl zla aol <i>spjluzl</> rlf pu <p>pmyhtl-ylzpgly</> vwapvuz av <i>NWSc3</>.<iy><iy>Mvy tvyl pumvythapvu wslhzl zll: <b>oaawz://pmyhtl-ylzpgly.jvt/nws</>", "<i>NWSc3 Spjluzl Clyzpvu</><iy><iy>Aopz clyzpvu vm <p>pmyhtl-ylzpgly</> pz ilpun bzlk bukly aol alytz vm aol <i>NWS C3</> spjluzl. Aopz spjluzl hssvdz fvb av bzl <p>pmyhtl-ylzpgly</> pu Vwlu Zvbyjl wyvqljaz, iba pa ylxbpylz fvby wyvqlja av il wbispj, wyvcpkl haaypibapvu huk il spjluzlk bukly clyzpvu 3 vy shaly vm aol NUB Nlulyhs Wbispj Spjluzl.<iy><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-vwlu zvbyjl wyvqlja vy dlizpal, fvb dpss ullk av wbyjohzl h svd jvza vul aptl jvttlyjphs spjluzl.<iy><iy>Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.", "<iy><yi>Zvsv spjluzl kvlz uva zbwwvya jyvzz-kvthpu</><iy><iy>Av bzl <p>pmyhtl-ylzpgly</> dpao jyvzz kvthpu pmyhtlz fvb ullk lpaoly aol Wyvmlzzpvuhs vy Ibzpulzz spjluzlz. Mvy klahpsz vu bwnyhkl wypjpun wslhzl jvuahja pumv@pmyhtl-ylzpgly.jvt.", "Pu whnl spurpun ylxbpylz h Wyvmlzzpvuhs vy Ibzpulzz spjluzl. Wslhzl zll <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</> mvy tvyl klahpsz."];
var _2 = ["NWSc3", "zvsv", "wyv", "ibzpulzz", "vlt"];
var Q2 = Object.fromEntries(["2cgs7fdf4xb", "1c9ctcccr4z", "1q2pc4eebgb", "ueokt0969w", "w2zxchhgqz", "1umuxblj2e5"].map((e, t) => [e, Math.max(0, t - 1)]));
var Y2 = (e) => U2(J2[e]);
var G = (e) => {
  const t = e[U2(Z[0])] || e[U2(Z[1])] || e[U2(Z[2])];
  if (!t) return -1;
  const n = t.split("-");
  let o = function(e2 = "") {
    let t2 = -2;
    const n2 = H2(U2(e2));
    return n2 in Q2 && (t2 = Q2[n2]), t2;
  }(n[0]);
  return 0 === o || ((e2) => e2[2] === H2(e2[0] + e2[1]))(n) || (o = -2), o;
};
var X2 = (e, ...t) => setTimeout(() => e(...t), 0);
var K2 = (e) => {
  let t = false;
  return function() {
    return t ? void 0 : (t = true, Reflect.apply(e, this, arguments));
  };
};
var ee = (e) => e;
var te = (e) => Math.round(1e3 * e) / 1e3;
var ne = (e) => e.charAt(0).toUpperCase() + e.slice(1);
var oe = (e) => "" != `${e}` && void 0 !== e;
var re = (e) => e();
var ae = (e, t, n) => {
  if (typeof e !== t) throw new TypeError(`${n} is not a ${ne(t)}`);
};
var ie = {
  br: "\n",
  rb: "\x1B[31;1m",
  bb: "\x1B[34;1m",
  b: "\x1B[1m",
  i: "\x1B[3m",
  u: "\x1B[4m",
  "/": "\x1B[m"
};
var se = Object.keys(ie);
var ce = new RegExp(`<(${se.join("|")})>`, "gi");
var le = (e, t) => ie[t] ?? "";
var de = true;
var ue = s;
var me;
var fe = (me = X, me?.__esModule ? me.default : me)({
  label: `${s}(child)`,
  expand: false
});
var pe;
var he = (pe = "log", (...e) => !de || fe[pe](...e));
var {
  assert: ye,
  endAutoGroup: ge,
  error: be,
  errorBoundary: ve,
  event: ze,
  label: we,
  purge: $e,
  warn: Se
} = fe;
var Oe = (Ee = ee, (e) => Ee(typeof e === O ? window.chrome ? e.replace(ce, le) : ((e2) => e2.replaceAll("<br>", "\n").replaceAll(/<\/?[^>]+>/gi, ""))(e) : e));
var Ee;
var Me = (...e) => fe.warn(...e.map(Oe));
var je = /* @__PURE__ */ ((e) => (t, n = "renamed to") => (o, r, a = "", i2 = "") => e(i2, `<rb>Deprecated ${t}(${o.replace("()", "")})</>

The <b>${o}</> ${t.toLowerCase()} has been ${n} <b>${r}</>. ${a}Use of the old ${t.toLowerCase()} will be removed in a future version of <i>iframe-resizer</>.`))((e, t) => Me(t));
var ke = je("Method");
var xe = je("Method", "replaced with");
var Te = je("Option");
var Ie = ["min-height", "min-width", "max-height", "max-width"];
var Ne = /* @__PURE__ */ new Set();
var Ce = (e, t) => window.getComputedStyle(e).getPropertyValue(t);
var Pe = (e, t) => {
  return (n = Ce(e, t)) && "0px" !== n && n !== k2 && "none" !== n;
  var n;
};
function Ae({
  href: e
}) {
  Ne.has(e) || Ne.add(e);
}
var Re = (e, t) => function(e2, t2) {
  const n = e2.style[t2];
  return n ? {
    source: "an inline style attribute",
    value: n
  } : null;
}(e, t) || function(e2, t2) {
  for (const n of document.styleSheets) try {
    for (const o of n.cssRules || []) if (o.selectorText && e2.matches(o.selectorText)) {
      const e3 = o.style[t2];
      if (e3) return {
        source: "STYLE" === n.ownerNode.tagName ? "an inline <style> block" : `stylesheet (${n.href})`,
        value: e3
      };
    }
  } catch (e3) {
    Ae(n);
  }
  return {
    source: "cross-origin stylesheet",
    value: Ce(e2, t2)
  };
}(e, t);
var Be = (e, t) => {
  const {
    source: n,
    value: o
  } = Re(e, t), r = ((e2) => e2.tagName ? e2.tagName.toLowerCase() : "unknown")(e);
  Me(`The <b>${t}</> CSS property is set to <b>${o}</> on the <b><${r}></> element via ${n}. This may cause issues with the correct operation of <i>iframe-resizer</>.

If you wish to restrict the size of the iframe, then you should set this property on the iframe element itself, not the content inside it.`);
};
function Le() {
  for (const e of [document.documentElement, document.body]) for (const t of Ie) Pe(e, t) && Be(e, t);
}
var qe = (e) => (t) => void 0 === t ? void 0 : e(t);
var De = qe((e) => "true" === e);
var We = qe(Number);
var Fe = [];
var Ve = (e, t, n, o) => {
  e.removeEventListener(t, n, o);
};
var He = (e, t, n, o = false) => {
  e.addEventListener(t, n, o), Fe.push(() => Ve(e, t, n, o));
};
var Ue = (e) => (e2) => {
  e2.size;
};
var Ze = /* @__PURE__ */ ((e = "") => (t) => (n) => {
  n.size > 0 && be(`${t}Observer ${e}:`, ...Array.from(n).flatMap((e2) => ["\n", e2]));
})("already attached");
var Je = (e) => (e2) => {
  e2.size;
};
var _e = (e, o = true) => (r) => {
  r > 0 && he(`${o ? "At" : "De"}tached %c${e}Observer%c ${o ? "to" : "from"} %c${r}%c element${1 === r ? "" : "s"}`, J, $, J, $);
};
var Qe = (e, t, n, o) => {
  const r = Je(e);
  return (e2) => {
    const a = /* @__PURE__ */ new Set();
    let i2 = 0;
    for (const o2 of e2) n.has(o2) && (t.unobserve(o2), n.delete(o2), a.add(o2), i2 += 1);
    r(a), o(i2), a.clear();
  };
};
var Ye = /* @__PURE__ */ new Set();
var Ge = /* @__PURE__ */ new Set();
var Xe = /* @__PURE__ */ new Set();
var Ke = [];
var et = {
  attributes: true,
  attributeFilter: [v, g],
  attributeOldValue: false,
  characterData: false,
  characterDataOldValue: false,
  childList: true,
  subtree: true
};
var tt;
var nt = 1;
var ot = false;
var rt = 0;
var at = (e) => {
  e.size;
};
var it = (e) => {
  e.size;
};
var st = (e) => {
  e.size;
};
var ct = (e) => e.nodeType !== Node.ELEMENT_NODE || V2.has(e.tagName.toLowerCase());
function lt(e) {
  const t = e.addedNodes;
  for (const e2 of t) ct(e2) || Ye.add(e2);
}
function dt(e) {
  const t = e.removedNodes;
  for (const e2 of t) ct(e2) || (Ye.has(e2) ? (Ye.delete(e2), Xe.add(e2)) : Ge.add(e2));
}
var ut = (e) => {
  he("Mutations:", e);
  for (const t of e) lt(t), dt(t);
  at(Ye), it(Ge), st(Xe), Xe.clear();
};
var mt = (e) => () => {
  const t = performance.now(), r = t - rt, a = 16 * nt++ + 2;
  if (r > a && r < 200) return ze("mutationThrottled"), he("Update delayed due to heavy workload on the callStack"), he(`EventLoop busy time: %c${te(r)}ms %c> Max wait: %c${a - 2}ms`, J, Y, J), setTimeout(tt, 16 * nt), void (rt = t);
  nt = 1, Ke.forEach(ut), Ke.length = 0, ot = false, Ge.size, Ye.size, e({
    addedNodes: Ye,
    removedNodes: Ge
  }), Ye.clear(), Ge.clear();
};
function ft(e) {
  Ke.push(e), ot || (rt = performance.now(), ot = true, requestAnimationFrame(tt));
}
function pt(e) {
  const t = new window.MutationObserver(ft), r = document.body || document.documentElement;
  return tt = mt(e), t.observe(r, et), he("Attached%c MutationObserver%c to body", J, Y), __spreadProps(__spreadValues({}, t), {
    disconnect: () => {
      Ye.clear(), Ge.clear(), Ke.length = 0, t.disconnect(), he("Detached%c MutationObserver", J);
    }
  });
}
var ht = "Overflow";
var yt = _e(ht);
var gt = _e(ht, false);
var bt = Ue(ht);
var vt = Ze(ht);
var zt = (e) => e.hidden || null === e.offsetParent || "none" === e.style.display;
var wt = (e, t) => {
  const o = t.side, r = {
    root: t.root,
    rootMargin: "0px",
    threshold: 1
  }, a = window?.requestAnimationFrame || ee, i2 = (t2 = false) => e(t2), s2 = (e2, t2) => 0 === e2 || e2 > t2[o], c2 = (e2, t2) => e2.toggleAttribute(b2, t2);
  const l2 = new IntersectionObserver(function(e2) {
    for (const t2 of e2) {
      const {
        boundingClientRect: e3,
        rootBounds: n,
        target: r2
      } = t2;
      if (!n) continue;
      const a2 = e3[o], i3 = s2(a2, n) && !zt(r2);
      c2(r2, i3);
    }
    a(i2);
  }, r), d2 = /* @__PURE__ */ new WeakSet();
  return {
    attachObservers: function(e2) {
      const t2 = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
      let o2 = 0;
      for (const r2 of e2) r2.nodeType === Node.ELEMENT_NODE && (d2.has(r2) ? t2.add(r2) : (l2.observe(r2), d2.add(r2), n.add(r2), o2 += 1));
      vt(t2), bt(n), yt(o2), n.clear(), t2.clear();
    },
    detachObservers: Qe(ht, l2, d2, gt),
    disconnect: () => {
      l2.disconnect(), he("Detached%c OverflowObserver", J);
    }
  };
};
var $t = "--ifr-start";
var St = "--ifr-end";
var Ot = "--ifr-measure";
var Et = [];
var Mt;
var jt = {};
var kt = 0;
function xt() {
  try {
    performance.clearMarks($t), performance.clearMarks(St), performance.clearMeasures(Ot);
  } catch {
  }
}
function Tt(e) {
  e.getEntries().forEach((e2) => {
    if (e2.name === St) try {
      const {
        duration: t
      } = performance.measure(Ot, $t, St);
      jt = e2.detail, Et.push(t), Et.length > 100 && Et.shift();
    } catch {
    }
  });
}
function It() {
  he("Attached%c PerformanceObserver%c to page", J, Y);
  const e = new PerformanceObserver(Tt);
  return e.observe({
    entryTypes: ["mark"]
  }), Mt = setInterval(() => {
    if (Et.length < 10) return;
    if (jt.hasTags && jt.len < 25) return;
    Et.sort();
    const e2 = Math.min(Et.reduce((e3, t2) => e3 + t2, 0) / Et.length, Et[Math.floor(Et.length / 2)]), t = te(e2);
    t > kt && (kt = t, ze("performanceObserver")), xt(), e2 <= 4 || (clearInterval(Mt), Me(`<rb>Performance Warning</>

Calculating the page size is taking an excessive amount of time (${te(e2)}ms).

To improve performance add the <b>data-iframe-size</> attribute to the ${jt.Side.toLowerCase()} most element on the page. For more details see: <u>https://iframe-resizer.com/perf</>.`));
  }, 5e3), {
    disconnect: () => {
      xt(), clearInterval(Mt), e.disconnect(), he("Detached%c PerformanceObserver", J);
    }
  };
}
var Nt = "Resize";
var Ct = _e(Nt);
var Pt = _e(Nt, false);
var At = Ue(Nt);
var Rt = Ze(Nt);
var Bt = /* @__PURE__ */ new WeakSet();
var Lt = /* @__PURE__ */ new Set();
var qt = /* @__PURE__ */ new Set();
var Dt;
function Wt(e) {
  let t = 0;
  for (const n of e) {
    if (n.nodeType !== Node.ELEMENT_NODE) continue;
    const e2 = getComputedStyle(n)?.position;
    "" !== e2 && "static" !== e2 && (Bt.has(n) ? Lt.add(n) : (Dt.observe(n), Bt.add(n), qt.add(n), t += 1));
  }
  Rt(Lt), At(qt), Ct(t), qt.clear(), Lt.clear();
}
function Ft(e) {
  const t = new IntersectionObserver((t2) => e(t2.at(-1).isIntersecting), {
    threshold: 0
  }), r = document.documentElement;
  return t.observe(r), he("Attached%c VisibilityObserver%c to page", J, Y), {
    disconnect: () => {
      t.disconnect(), he("Detached%c VisibilityObserver", J);
    }
  };
}
var Vt = (e) => (t, n) => {
  if (n in t) {
    if (typeof t[n] === e) return t[n];
    throw new TypeError(`${n} is not a ${e}.`);
  }
};
var Ht = Vt(j2);
var Ut = Vt(E);
var Zt = Vt(O);
"undefined" != typeof window && function() {
  const e = {
    height: () => (Se("Custom height calculation function not defined"), Cn.auto()),
    width: () => (Se("Custom width calculation function not defined"), Pn.auto())
  }, H3 = {
    bodyOffset: 1,
    bodyScroll: 1,
    offset: 1,
    documentElementOffset: 1,
    documentElementScroll: 1,
    boundingClientRect: 1,
    max: 1,
    min: 1,
    grow: 1,
    lowestElement: 1
  }, J3 = {}, Q3 = k2, te2 = "scroll";
  let ie2, se2, ce2, le2, me2, pe2, Oe2, Ee2 = true, je2 = "", Ie2 = 0, Ne2 = "", Ce2 = "", Pe2 = false, Ae2 = true, Re2 = false, Be2 = true, qe2 = false, Ue2 = false, Ze2 = true, Je2 = false, _e2 = 1, Ye2 = Q3, Ge2 = "", Xe2 = true, Ke2 = {}, et2 = false, tt2 = false, nt2 = false, ot2 = 0, rt2 = false, at2 = 0, it2 = 0, st2 = /* @__PURE__ */ new Set(), ct2 = "", lt2 = "child", dt2 = false, ut2 = "", mt2 = [], ft2 = window.parent, ht2 = "*", yt2 = 0, gt2 = false, bt2 = 1, vt2 = te2, zt2 = window, Ot2 = () => {
    Se("onMessage function not defined");
  }, Et2 = () => {
  }, Mt2 = null, jt2 = null;
  function kt2(t) {
    var o;
    !function(e2) {
      ct2 = e2[0] ?? ct2, Ie2 = We(e2[1]) ?? Ie2, Re2 = De(e2[2]) ?? Re2, nt2 = De(e2[3]) ?? nt2, Ee2 = De(e2[6]) ?? Ee2, Ne2 = e2[7] ?? Ne2, Ye2 = e2[8] ?? Ye2, je2 = e2[9] ?? je2, Ce2 = e2[10] ?? Ce2, yt2 = We(e2[11]) ?? yt2, Ke2.enable = De(e2[12]) ?? false, lt2 = e2[13] ?? lt2, vt2 = e2[14] ?? vt2, rt2 = De(e2[15]) ?? rt2, at2 = We(e2[16]) ?? at2, it2 = We(e2[17]) ?? it2, Ae2 = De(e2[18]) ?? Ae2, ie2 = e2[19] ?? ie2, pe2 = e2[20] ?? pe2, ot2 = We(e2[21]) ?? ot2, tt2 = De(e2[23]) ?? tt2;
    }(t), ue = (o = {
      id: ct2,
      enabled: nt2,
      expand: tt2
    }).id || s, fe.label(`${ue}`), fe.expand(o.expand), de = o.enabled, ze("initReceived"), function() {
      function t2(e2) {
        Oe2 = Ht(e2, "onBeforeResize") ?? Oe2, Ot2 = Ht(e2, "onMessage") ?? Ot2, Et2 = Ht(e2, "onReady") ?? Et2, typeof e2?.offset === E && (Te($2, S2), Ae2 && (at2 = Ut(e2, $2) ?? at2), Re2 && (it2 = Ut(e2, $2) ?? it2)), typeof e2?.offsetSize === E && (Ae2 && (at2 = Ut(e2, S2) ?? at2), Re2 && (it2 = Ut(e2, S2) ?? it2)), se2 = Zt(e2, U2(Z[0])) ?? se2, Ge2 = Zt(e2, "ignoreSelector") ?? Ge2, ut2 = Zt(e2, "sizeSelector") ?? ut2, ht2 = Zt(e2, "targetOrigin") ?? ht2, Ye2 = e2?.heightCalculationMethod || Ye2, vt2 = e2?.widthCalculationMethod || vt2;
      }
      function o2(t3, n) {
        return typeof t3 === j2 && (Me(`<rb>Deprecated Option(${n}CalculationMethod)</>

The use of <b>${n}CalculationMethod</> as a function is deprecated and will be removed in a future version of <i>iframe-resizer</>. Please use the new <b>onBeforeResize</> event handler instead.

See <u>https://iframe-resizer.com/api/child</> for more details.`), e[n] = t3, t3 = "custom"), t3;
      }
      if (1 === ot2) return;
      const r = window.iframeResizer || window.iFrameResizer;
      typeof r === M && (t2(r), Ye2 = o2(Ye2, z2), vt2 = o2(vt2, w), he(`Set targetOrigin for parent: %c${ht2}`, J));
    }(), [Jt, Qt, sn, qt2, _t, rn, an, nn, Vt2, Rt2, Pe2 ? ee : Le, Kt, () => Yt("background", je2), () => Yt("padding", Ce2), Pe2 ? ee : en, ln, Xt, On, dn, cn, un, Tt2, mn].forEach((e2) => {
      try {
        e2();
      } catch (e3) {
        if (ot2 < 0) throw e3;
        Me("<rb>Error in setup function</>\n<i>iframe-resizer</> detected an error during setup.\n\nPlease report the following error message at <u>https://github.com/davidjbradshaw/iframe-resizer/issues</>"), be(e3);
      }
    }), At2(K2(Et2)), ge(), Wn(l, "Init message from host page", void 0, void 0, `${i}:${ot2}`), document.title && "" !== document.title && Hn(0, 0, h2, document.title);
  }
  function xt2({
    persisted: e2
  }) {
    e2 || Hn(0, 0, "beforeUnload"), ze(u2), he("Page persisted:", e2), e2 || Fe.forEach(re);
  }
  const Tt2 = () => He(window, u2.toLowerCase(), xt2);
  let Ct2 = false;
  function At2(e2) {
    "complete" === document.readyState ? X2(e2) : Ct2 || He(document, x, () => At2(e2)), Ct2 = true;
  }
  function Rt2() {
    mt2 = document.querySelectorAll(`[${g}]`), Je2 = mt2.length > 0;
  }
  let Lt2 = 0;
  function qt2() {
    const e2 = document.querySelectorAll(`*[${v}]`);
    return qe2 = e2.length > 0, qe2 && e2.length !== Lt2 && (function(e3) {
      const n = 1 === e3.length ? "" : "s";
      Se(`%c[${v}]%c found on %c${e3.length}%c element${n}`, F, $, F, $);
    }(e2), Lt2 = e2.length), qe2;
  }
  function Vt2() {
    "BackCompat" === document.compatMode && Me("<rb>Quirks Mode Detected</>\n\nThis iframe is running in the browser's legacy <b>Quirks Mode</>, this may cause issues with the correct operation of <i>iframe-resizer</>. It is recommended that you switch to the modern <b>Standards Mode</>.\n\nFor more information see <u>https://iframe-resizer.com/quirks-mode</>.\n");
  }
  function Jt() {
    pe2 && "" !== pe2 && "false" !== pe2 ? pe2 !== i && Me(`<b>Version mismatch</>

The parent and child pages are running different versions of <i>iframe resizer</>.

Parent page: ${pe2} - Child page: ${i}.
`) : Me("<rb>Legacy version detected on parent page</>\n\nDetected legacy version of parent page script. It is recommended to update the parent page to use <b>@iframe-resizer/parent</>.\n\nSee <u>https://iframe-resizer.com/setup/</> for more details.\n");
  }
  function _t() {
    try {
      dt2 = 1 === ot2 || "iframeParentListener" in window.parent;
    } catch (e2) {
    }
  }
  function Qt() {
    Re2 === Ae2 && (Pe2 = true);
  }
  function Yt(e2, t) {
    void 0 !== t && "" !== t && "null" !== t && (document.body.style.setProperty(e2, t), he(`Set body ${e2}: %c${t}`, J));
  }
  function Gt(e2, t, n) {
    if ("" !== n) for (const e3 of document.querySelectorAll(n)) e3.toggleAttribute(t, true);
  }
  function Xt() {
    Gt(0, g, ut2), Gt(0, v, Ge2);
  }
  function Kt() {
    var e2, t;
    void 0 === Ne2 && (Ne2 = `${Ie2}px`), Yt("margin", (e2 = "margin", (t = Ne2).includes("-") && (Se(`Negative CSS value ignored for ${e2}`), t = ""), t));
  }
  function en() {
    const e2 = (e3) => e3.style.setProperty(z2, k2, "important");
    e2(document.documentElement), e2(document.body);
  }
  function tn(e2) {
    ({
      add(t) {
        function n() {
          Wn(e2.eventName, e2.eventType);
        }
        J3[t] = n, He(window, t, n, {
          passive: true
        });
      },
      remove(e3) {
        const t = J3[e3];
        delete J3[e3], Ve(window, e3, t);
      }
    })[e2.method](e2.eventName);
  }
  function nn() {
    let e2 = false;
    const t = (t2) => document.querySelectorAll(`[${t2}]`).forEach((n) => {
      e2 = true, n.removeAttribute(t2), n.toggleAttribute(g, true);
    });
    t("data-iframe-height"), t("data-iframe-width"), e2 && Me("<rb>Deprecated Attributes</>\n\nThe <b>data-iframe-height</> and <b>data-iframe-width</> attributes have been deprecated and replaced with the single <b>data-iframe-size</> attribute. Use of the old attributes will be removed in a future version of <i>iframe-resizer</>.");
  }
  function on(e2, t, n) {
    const {
      label: o
    } = n;
    return t !== e2 && (e2 in n || (Se(`${e2} is not a valid option for ${o}CalculationMethod.`), e2 = t), e2 in H3) && Me(`<rb>Deprecated ${o}CalculationMethod (${e2})</>

This version of <i>iframe-resizer</> can auto detect the most suitable ${o} calculation method. It is recommended that you ${pe2 ? "remove this option." : `set this option to <b>'auto'</> when using an older version of <i>iframe-resizer</> on the parent page. This can be done on the child page by adding the following code:

window.iframeResizer = {
  license: 'xxxx',
  ${o}CalculationMethod: '${k2}',
}
`}
`), e2;
  }
  function rn() {
    Ye2 = on(Ye2, Q3, Cn);
  }
  function an() {
    vt2 = on(vt2, te2, Pn);
  }
  function sn() {
    const e2 = ot2, n = G({
      key: ie2
    }), o = G({
      key: se2
    });
    if (ot2 = Math.max(n, o), ot2 < 0) {
      if (ot2 = Math.min(n, o), $e(), Me(`${Y2(ot2 + 2)}${Y2(2)}`), oe(pe2)) throw Y2(ot2 + 2).replace(/<\/?[a-z][^>]*>|<\/>/gi, "");
    } else (!oe(pe2) || e2 > -1 && ot2 > e2) && (sessionStorage.getItem("ifr") !== i && function(e3, n2) {
      console.info(`${ue} %ciframe-resizer ${e3}`, de || n2 < 1 ? "font-weight: bold;" : $);
    }(`v${i} (${((e3) => U2(_2[e3]))(ot2)})`, ot2), ot2 < 2 && Me(Y2(3)), sessionStorage.setItem("ifr", i));
  }
  function cn() {
    !function(e2) {
      tn({
        method: e2,
        eventType: "After Print",
        eventName: "afterprint"
      }), tn({
        method: e2,
        eventType: "Before Print",
        eventName: "beforeprint"
      });
    }("add");
  }
  function ln() {
    const e2 = document.createElement("div");
    e2.style.clear = "both", e2.style.display = "block", e2.style.height = "0", document.body.append(e2);
  }
  function dn() {
    function e2(e3) {
      const t2 = e3.getBoundingClientRect(), n2 = {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
      };
      return {
        x: parseInt(t2.left, y) + parseInt(n2.x, y),
        y: parseInt(t2.top, y) + parseInt(n2.y, y)
      };
    }
    function t(t2) {
      const n2 = t2.split("#")[1] || t2, o2 = decodeURIComponent(n2), r = document.getElementById(o2) || document.getElementsByName(o2)[0];
      void 0 === r ? Hn(0, 0, "inPageLink", `#${n2}`) : function(t3) {
        const n3 = e2(t3);
        Hn(n3.y, n3.x, p);
      }(r);
    }
    function n() {
      const {
        hash: e3,
        href: n2
      } = window.location;
      "" !== e3 && "#" !== e3 && t(n2);
    }
    const {
      enable: o
    } = Ke2;
    o && (1 === ot2 ? Me(Y2(5)) : (function() {
      for (const e3 of document.querySelectorAll('a[href^="#"]')) "#" !== e3.getAttribute("href") && He(e3, "click", (n2) => {
        n2.preventDefault(), t(e3.getAttribute("href"));
      });
    }(), He(window, "hashchange", n), setTimeout(n, 128))), Ke2 = __spreadProps(__spreadValues({}, Ke2), {
      findTarget: t
    });
  }
  function un() {
    function e2(e3) {
      Hn(0, 0, e3.type, `${e3.screenY}:${e3.screenX}`);
    }
    function t(t2, n) {
      He(window.document, t2, e2);
    }
    true === rt2 && (t("mouseenter"), t("mouseleave"));
  }
  function mn() {
    1 !== ot2 && (zt2.parentIframe = Object.freeze({
      autoResize: (e2) => (ae(e2, "boolean", "parentIframe.autoResize(enable) enable"), false === Re2 && false === Ae2 ? (ze(N2), Me("Auto Resize can not be changed when <b>direction</> is set to 'none'."), false) : (true === e2 && false === Ee2 ? (Ee2 = true, queueMicrotask(() => Wn(N2, "Auto Resize enabled"))) : false === e2 && true === Ee2 && (Ee2 = false), Hn(0, 0, "autoResize", JSON.stringify(Ee2)), Ee2)),
      close() {
        Hn(0, 0, "close");
      },
      getId: () => ct2,
      getOrigin: () => (ze("getOrigin"), ke("getOrigin()", "getParentOrigin()"), ce2),
      getParentOrigin: () => ce2,
      getPageInfo(e2) {
        if (typeof e2 === j2) return Mt2 = e2, Hn(0, 0, m), void xe("getPageInfo()", "getParentProps()", "See <u>https://iframe-resizer.com/upgrade</> for details. ");
        Mt2 = null, Hn(0, 0, "pageInfoStop");
      },
      getParentProps: (e2) => (ae(e2, j2, "parentIframe.getParentProps(callback) callback"), jt2 = e2, Hn(0, 0, f2), () => {
        jt2 = null, Hn(0, 0, "parentInfoStop");
      }),
      getParentProperties(e2) {
        ke("getParentProperties()", "getParentProps()"), this.getParentProps(e2);
      },
      moveToAnchor(e2) {
        ae(e2, O, "parentIframe.moveToAnchor(anchor) anchor"), Ke2.findTarget(e2);
      },
      reset() {
        !function() {
          const e2 = Ye2;
          Ye2 = Q3, gt2 || (gt2 = true, requestAnimationFrame(() => {
            gt2 = false;
          })), Fn("reset"), Ye2 = e2;
        }();
      },
      setOffsetSize(e2) {
        ae(e2, E, "parentIframe.setOffsetSize(offset) offset"), at2 = e2, it2 = e2, Wn(B, `parentIframe.setOffsetSize(${e2})`);
      },
      scrollBy(e2, t) {
        ae(e2, E, "parentIframe.scrollBy(x, y) x"), ae(t, E, "parentIframe.scrollBy(x, y) y"), Hn(t, e2, "scrollBy");
      },
      scrollTo(e2, t) {
        ae(e2, E, "parentIframe.scrollTo(x, y) x"), ae(t, E, "parentIframe.scrollTo(x, y) y"), Hn(t, e2, "scrollTo");
      },
      scrollToOffset(e2, t) {
        ae(e2, E, "parentIframe.scrollToOffset(x, y) x"), ae(t, E, "parentIframe.scrollToOffset(x, y) y"), Hn(t, e2, p);
      },
      sendMessage(e2, t) {
        t && ae(t, O, "parentIframe.sendMessage(msg, targetOrigin) targetOrigin"), Hn(0, 0, d, JSON.stringify(e2), t);
      },
      setHeightCalculationMethod(e2) {
        Ye2 = e2, rn();
      },
      setWidthCalculationMethod(e2) {
        vt2 = e2, an();
      },
      setTargetOrigin(e2) {
        ae(e2, O, "parentIframe.setTargetOrigin(targetOrigin) targetOrigin"), ht2 = e2;
      },
      resize(e2, t) {
        void 0 !== e2 && ae(e2, E, "parentIframe.resize(customHeight, customWidth) customHeight"), void 0 !== t && ae(t, E, "parentIframe.resize(customHeight, customWidth) customWidth"), Wn(P2, `parentIframe.resize(${e2 || ""}${t ? `,${t}` : ""})`, e2, t);
      },
      size(e2, t) {
        ke("size()", "resize()"), this.resize(e2, t);
      }
    }), zt2.parentIFrame = zt2.parentIframe);
  }
  let fn = /* @__PURE__ */ new Set();
  function pn() {
    const e2 = document.querySelectorAll(`[${b2}]`);
    st2 = function(e3) {
      const t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
      for (const o of e3) o.closest(`[${v}]`) ? n.add(o) : t.add(o);
      return n.size > 0 && queueMicrotask(() => {
        ze("overflowIgnored"), he("Ignoring elements with [data-iframe-ignore] > *:\n", n), ge();
      }), t;
    }(e2), Ue2 = st2.size > 0, typeof Set.prototype.symmetricDifference === j2 && (Ze2 = st2.symmetricDifference(fn).size > 0), fn = st2;
  }
  function hn() {
    switch (pn(), true) {
      case !Ze2:
        return;
      case st2.size > 1:
        he("Overflowed Elements:", st2);
        break;
      case Ue2:
        break;
      default:
        he("No overflow detected");
    }
    Wn(q2, "Overflow updated");
  }
  function yn(e2) {
    const t = {
      root: document.documentElement,
      side: Ae2 ? T2 : I
    };
    return le2 = wt(hn, t), le2.attachObservers(e2), le2;
  }
  function gn(e2) {
    if (!Array.isArray(e2) || 0 === e2.length) return;
    const t = e2[0].target;
    Wn(L2, `Element resized <${function(e3) {
      switch (true) {
        case !oe(e3):
          return "";
        case oe(e3.id):
          return `${e3.nodeName}#${e3.id}`;
        case oe(e3.name):
          return `${e3.nodeName} (${e3.name}`;
        case oe(e3.className):
          return `${e3.nodeName}.${e3.className}`;
        default:
          return e3.nodeName;
      }
    }(t)}>`);
  }
  function bn(e2) {
    return Dt = new ResizeObserver(gn), Dt.observe(document.body), Bt.add(document.body), he("Attached%c ResizeObserver%c to body", J, Y), me2 = {
      attachObserverToNonStaticElements: Wt,
      detachObservers: Qe(Nt, Dt, Bt, Pt),
      disconnect: () => {
        Dt.disconnect(), he("Detached%c ResizeObserver", J);
      }
    }, me2.attachObserverToNonStaticElements(e2), me2;
  }
  function vn(e2) {
    et2 = !e2, Wn(W2, "Visibility changed");
  }
  const zn = (e2) => {
    const t = /* @__PURE__ */ new Set();
    for (const n of e2) {
      t.add(n);
      for (const e3 of kn(n)) t.add(e3);
    }
    return he("Inspecting:\n", t), t;
  }, wn = (e2) => {
    if (0 === e2.size) return;
    ze("addObservers");
    const t = zn(e2);
    le2.attachObservers(t), me2.attachObserverToNonStaticElements(t), ge();
  }, $n = (e2) => {
    if (0 === e2.size) return;
    ze("removeObservers");
    const t = zn(e2);
    le2.detachObservers(t), me2.detachObservers(t), ge();
  };
  function Sn(e2) {
    !function({
      addedNodes: e3,
      removedNodes: t
    }) {
      ze("contentMutated"), Xt(), Rt2(), pn(), ge(), $n(t), wn(e3);
    }(e2), Wn(D, "Mutation Observed");
  }
  function On() {
    const e2 = kn(document.documentElement);
    var t;
    t = [pt(Sn), yn(e2), It(), bn(e2), Ft(vn)], Fe.push(...t.map((e3) => e3.disconnect));
  }
  function En(e2) {
    performance.mark($t);
    const t = ne(e2);
    let r = 1, a = document.documentElement, i2 = Je2 ? 0 : document.documentElement.getBoundingClientRect().bottom;
    const s2 = Je2 ? mt2 : Ue2 ? Array.from(st2) : kn(document.documentElement);
    for (const t2 of s2) r = t2.getBoundingClientRect()[e2] + parseFloat(getComputedStyle(t2).getPropertyValue(`margin-${e2}`)), r > i2 && (i2 = r, a = t2);
    return he(`${t} position calculated from:`, a), he(`Checked %c${s2.length}%c elements`, J, Y), performance.mark(St, {
      detail: {
        hasTags: Je2,
        len: s2.length,
        logging: nt2,
        Side: t
      }
    }), i2;
  }
  const Mn = (e2) => [e2.bodyOffset(), e2.bodyScroll(), e2.documentElementOffset(), e2.documentElementScroll(), e2.boundingClientRect()], jn = `* ${Array.from(V2).map((e2) => `:not(${e2})`).join("")}`, kn = (e2) => e2.querySelectorAll(jn), xn = {
    height: 0,
    width: 0
  }, Tn = {
    height: 0,
    width: 0
  }, In = [J, Y, J];
  function Nn(e2) {
    function t() {
      return Tn[r] = a, xn[r] = c2, Math.max(a, 1);
    }
    const o = e2 === Cn, r = e2.label, a = e2.boundingClientRect(), i2 = Math.ceil(a), s2 = Math.floor(a), c2 = ((e3) => e3.documentElementScroll() + Math.max(0, e3.getOffset()))(e2), l2 = `HTML: %c${a}px %cPage: %c${c2}px`;
    let d2 = 1;
    switch (true) {
      case !e2.enabled():
        return Math.max(c2, 1);
      case Je2:
        he("Found element with data-iframe-size attribute"), d2 = e2.taggedElement();
        break;
      case (!Ue2 && Be2 && 0 === Tn[r] && 0 === xn[r]):
        he(`Initial page size values: ${l2}`, ...In), d2 = t();
        break;
      case (gt2 && a === Tn[r] && c2 === xn[r]):
        he(`Size unchanged: ${l2}`, ...In), d2 = Math.max(a, c2);
        break;
      case (0 === a && 0 !== c2):
        he(`Page is hidden: ${l2}`, ...In), d2 = c2;
        break;
      case (!Ue2 && a !== Tn[r] && c2 <= xn[r]):
        he(`New <html> size: ${l2} `, ...In), he(`Previous <html> size: %c${Tn[r]}px`, J), d2 = t();
        break;
      case !o:
        d2 = e2.taggedElement();
        break;
      case (!Ue2 && a < Tn[r]):
        he(`<html> size decreased: ${l2}`, ...In), d2 = t();
        break;
      case (c2 === s2 || c2 === i2):
        he(`<html> size equals page size: ${l2}`, ...In), d2 = t();
        break;
      case a > c2:
        he(`Page size < <html> size: ${l2}`, ...In), d2 = t();
        break;
      case Ue2:
        he("Found elements possibly overflowing <html> "), d2 = e2.taggedElement();
        break;
      default:
        he(`Using <html> size: ${l2}`, ...In), d2 = t();
    }
    return he(`Content ${r}: %c${d2}px`, J), d2 += function(e3) {
      const t2 = e3.getOffset();
      return 0 !== t2 && he(`Page offsetSize: %c${t2}px`, J), t2;
    }(e2), Math.max(d2, 1);
  }
  const Cn = {
    label: z2,
    enabled: () => Ae2,
    getOffset: () => at2,
    auto: () => Nn(Cn),
    bodyOffset: () => {
      const {
        body: e2
      } = document, t = getComputedStyle(e2);
      return e2.offsetHeight + parseInt(t.marginTop, y) + parseInt(t.marginBottom, y);
    },
    bodyScroll: () => document.body.scrollHeight,
    offset: () => Cn.bodyOffset(),
    custom: () => e.height(),
    documentElementOffset: () => document.documentElement.offsetHeight,
    documentElementScroll: () => document.documentElement.scrollHeight,
    boundingClientRect: () => Math.max(document.documentElement.getBoundingClientRect().bottom, document.body.getBoundingClientRect().bottom),
    max: () => Math.max(...Mn(Cn)),
    min: () => Math.min(...Mn(Cn)),
    grow: () => Cn.max(),
    lowestElement: () => En(T2),
    taggedElement: () => En(T2)
  }, Pn = {
    label: w,
    enabled: () => Re2,
    getOffset: () => it2,
    auto: () => Nn(Pn),
    bodyScroll: () => document.body.scrollWidth,
    bodyOffset: () => document.body.offsetWidth,
    custom: () => e.width(),
    documentElementScroll: () => document.documentElement.scrollWidth,
    documentElementOffset: () => document.documentElement.offsetWidth,
    boundingClientRect: () => Math.max(document.documentElement.getBoundingClientRect().right, document.body.getBoundingClientRect().right),
    max: () => Math.max(...Mn(Pn)),
    min: () => Math.min(...Mn(Pn)),
    rightMostElement: () => En(I),
    scroll: () => Math.max(Pn.bodyScroll(), Pn.documentElementScroll()),
    taggedElement: () => En(I)
  }, An = (e2, t) => !(Math.abs(e2 - t) <= yt2);
  function Rn(e2, t) {
    const n = e2[t](), o = e2.enabled() && void 0 !== Oe2 ? function(e3) {
      const t2 = Oe2(e3);
      if (void 0 === t2) throw new TypeError("No value returned from onBeforeResize(), expected a numeric value");
      if (Number.isNaN(t2)) throw new TypeError(`Invalid value returned from onBeforeResize(): ${t2}, expected Number`);
      if (t2 < 1) throw new RangeError(`Out of range value returned from onBeforeResize(): ${t2}, must be at least 1`);
      return t2;
    }(n) : n;
    return ye(o >= 1, `New iframe ${e2.label} is too small: ${o}, must be at least 1`), o;
  }
  let Bn = false;
  const Ln = K2(() => Me(Y2(4)));
  let qn, Dn = false;
  const Wn = ve((e2, t, n, o, r) => {
    switch (ze(e2), true) {
      case true === et2:
        if (true === Dn) break;
        Dn = true, Bn = false, cancelAnimationFrame(qn);
        break;
      case (true === Bn && e2 !== q2):
        $e();
        break;
      case (!Ee2 && !(e2 in R)):
        he("Resizing disabled");
        break;
      default:
        Dn = false, Bn = true, performance.now(), qn || (qn = requestAnimationFrame(() => {
          Bn = false, qn = null, ze("requestAnimationFrame");
        })), function(e3, t2, n2, o2, r2) {
          const a = n2 ?? Rn(Cn, Ye2), i2 = o2 ?? Rn(Pn, vt2);
          switch (Ae2 && An(_e2, a) || Re2 && An(bt2, i2) ? C2 : e3) {
            case l:
            case N2:
            case C2:
              _e2 = a, bt2 = i2;
            case B:
              Vn(_e2, bt2, e3, r2);
              break;
            case q2:
            case D:
            case L2:
            case W2:
              $e();
              break;
            default:
              $e(), he("No change in content size detected");
          }
        }(e2, 0, n, o, r);
    }
    ge();
  });
  function Fn(e2) {
    _e2 = Cn[Ye2](), bt2 = Pn[vt2](), Hn(_e2, bt2, e2);
  }
  function Vn(e2, t, o, a, i2) {
    ot2 < -1 || (void 0 !== i2 || (i2 = ht2), function() {
      const s2 = `${ct2}:${e2}:${t}:${o}${void 0 === a ? "" : `:${a}`}`;
      if (dt2) try {
        window.parent.iframeParentListener(F2 + s2);
      } catch (e3) {
        if (1 !== ot2) throw e3;
        return void Ln();
      }
      else ft2.postMessage(F2 + s2, i2);
      he(`Sending message to parent page via ${dt2 ? "sameOrigin" : "postMessage"}: %c%c${s2}`, H, J);
    }());
  }
  const Hn = ve((e2, t, n, o, r) => {
    ze(n), Vn(e2, t, n, o, r), ge();
  }), Un = ve(function(e2) {
    ze("onMessage");
    const {
      freeze: t
    } = Object, {
      parse: n
    } = JSON, o = (e3) => Hn(0, 0, `${e3}Stop`), r = {
      init: function() {
        if ("loading" === document.readyState) return;
        const t2 = e2.data.slice(13).split(c);
        ft2 = e2.source, ce2 = e2.origin, kt2(t2), Be2 = false, setTimeout(() => {
          Xe2 = false;
        }, 128);
      },
      reset() {
        Xe2 || Fn("resetPage");
      },
      resize() {
        Wn(A, "Parent window requested size check");
      },
      moveToAnchor() {
        Ke2.findTarget(i2());
      },
      inPageLink() {
        this.moveToAnchor();
      },
      pageInfo() {
        const e3 = i2();
        Mt2 ? X2(Mt2, n(e3)) : o(m);
      },
      parentInfo() {
        const e3 = (r2 = i2(), t(n(r2)));
        var r2;
        jt2 ? X2(jt2, e3) : o(f2);
      },
      message() {
        const e3 = i2();
        X2(Ot2, n(e3));
      }
    }, a = () => e2.data.split("]")[1].split(c)[0], i2 = () => e2.data.slice(e2.data.indexOf(c) + 1), s2 = () => e2.data.split(c)[2] in {
      true: 1,
      false: 1
    };
    function d2() {
      const t2 = a();
      ze(t2), t2 in r ? r[t2]() : "iframeResize" in window || void 0 !== window.jQuery && "" in window.jQuery.prototype || s2() || Se(`Unexpected message (${e2.data})`);
    }
    F2 === `${e2.data}`.slice(0, 13) && function() {
      if (false !== Be2) return s2() ? (we(a()), ze(l), void r.init()) : void 0;
      d2();
    }();
  });
  let Zn = false;
  const Jn = (e2) => e2.postMessage("[iFrameResizerChild]Ready", window?.iframeResizer?.targetOrigin || "*");
  function _n() {
    if ("loading" === document.readyState || !Be2 || Zn) return;
    const {
      parent: e2,
      top: t
    } = window;
    ze("ready"), Jn(e2), e2 !== t && Jn(t), Zn = true;
  }
  "iframeChildListener" in window ? Se("Already setup") : (window.iframeChildListener = (e2) => setTimeout(() => Un({
    data: e2,
    sameOrigin: true
  })), ze("listen"), He(window, d, Un), He(document, x, _n), _n());
}();
/*! Bundled license information:

auto-console-group/dist/index.js:
  (*!
   *  @module      auto-console-group v1.3.0
   *
   *  @description Automagically group console logs in the browser console.
   *
   *  @author      David J. Bradshaw <info@iframe-resizer.com>
   *  @see         {@link https://github.com/davidjbradshaw/auto-console-group#readme}
   *  @license     MIT
   *
   *  @copyright  (c) 2025, David J. Bradshaw. All rights reserved.
   *)

@iframe-resizer/child/index.esm.js:
  (*!
   *  @preserve
   *  
   *  @module      iframe-resizer/child 5.5.8 (esm) - 2026-01-26
   *
   *  @license     GPL-3.0 for non-commercial use only.
   *               For commercial use, you must purchase a license from
   *               https://iframe-resizer.com/pricing
   * 
   *  @description Keep same and cross domain iFrames sized to their content 
   *
   *  @author      David J. Bradshaw <info@iframe-resizer.com>
   * 
   *  @see         {@link https://iframe-resizer.com}
   * 
   *  @copyright  (c) 2013 - 2026, David J. Bradshaw. All rights reserved.
   *)
*/
//# sourceMappingURL=@iframe-resizer_child.js.map
