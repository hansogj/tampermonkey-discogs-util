// ==UserScript==
// @name         discogs-util
// @namespace    @hansogj
// @version      6.21.10
// @description  https://github.com/hansogj/tampermonkey-discogs-util.  Adds a sticky panel to Discogs with grading, location, "In collection" filter, and "Unique items" filter, with dark theme. Now with dynamic loading of all custom fields via API token.
// @updateURL    https://raw.githubusercontent.com/hansogj/tampermonkey-discogs-util/main/dist/discogs-util.user.js
// @downloadURL  https://raw.githubusercontent.com/hansogj/tampermonkey-discogs-util/main/dist/discogs-util.user.js
// @author       hansogj@gmail.com
// @license      MIT - https://opensource.org/licenses/MIT
// @match        https://www.discogs.com/*
// @exclude      https://www.discogs.com/service/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';
  function _d(i) {
    return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, 'default') ? i.default : i;
  }
  var Pn = { exports: {} },
    Na = {};
  var Bf;
  function Cd() {
    if (Bf) return Na;
    Bf = 1;
    var i = Symbol.for('react.transitional.element'),
      f = Symbol.for('react.fragment');
    function r(o, b, T) {
      var D = null;
      if ((T !== void 0 && (D = '' + T), b.key !== void 0 && (D = '' + b.key), 'key' in b)) {
        T = {};
        for (var M in b) M !== 'key' && (T[M] = b[M]);
      } else T = b;
      return (b = T.ref), { $$typeof: i, type: o, key: D, ref: b !== void 0 ? b : null, props: T };
    }
    return (Na.Fragment = f), (Na.jsx = r), (Na.jsxs = r), Na;
  }
  var Gf;
  function Dd() {
    return Gf || ((Gf = 1), (Pn.exports = Cd())), Pn.exports;
  }
  var G = Dd(),
    ti = { exports: {} },
    qa = {},
    ei = { exports: {} },
    li = {};
  var Yf;
  function Rd() {
    return (
      Yf ||
        ((Yf = 1),
        (function (i) {
          function f(O, H) {
            var X = O.length;
            O.push(H);
            t: for (; 0 < X; ) {
              var ht = (X - 1) >>> 1,
                gt = O[ht];
              if (0 < b(gt, H)) (O[ht] = H), (O[X] = gt), (X = ht);
              else break t;
            }
          }
          function r(O) {
            return O.length === 0 ? null : O[0];
          }
          function o(O) {
            if (O.length === 0) return null;
            var H = O[0],
              X = O.pop();
            if (X !== H) {
              O[0] = X;
              t: for (var ht = 0, gt = O.length, y = gt >>> 1; ht < y; ) {
                var C = 2 * (ht + 1) - 1,
                  N = O[C],
                  Q = C + 1,
                  w = O[Q];
                if (0 > b(N, X))
                  Q < gt && 0 > b(w, N)
                    ? ((O[ht] = w), (O[Q] = X), (ht = Q))
                    : ((O[ht] = N), (O[C] = X), (ht = C));
                else if (Q < gt && 0 > b(w, X)) (O[ht] = w), (O[Q] = X), (ht = Q);
                else break t;
              }
            }
            return H;
          }
          function b(O, H) {
            var X = O.sortIndex - H.sortIndex;
            return X !== 0 ? X : O.id - H.id;
          }
          if (
            ((i.unstable_now = void 0),
            typeof performance == 'object' && typeof performance.now == 'function')
          ) {
            var T = performance;
            i.unstable_now = function () {
              return T.now();
            };
          } else {
            var D = Date,
              M = D.now();
            i.unstable_now = function () {
              return D.now() - M;
            };
          }
          var R = [],
            g = [],
            x = 1,
            U = null,
            q = 3,
            ft = !1,
            tt = !1,
            Z = !1,
            at = !1,
            rt = typeof setTimeout == 'function' ? setTimeout : null,
            Ct = typeof clearTimeout == 'function' ? clearTimeout : null,
            St = typeof setImmediate < 'u' ? setImmediate : null;
          function Dt(O) {
            for (var H = r(g); H !== null; ) {
              if (H.callback === null) o(g);
              else if (H.startTime <= O) o(g), (H.sortIndex = H.expirationTime), f(R, H);
              else break;
              H = r(g);
            }
          }
          function jt(O) {
            if (((Z = !1), Dt(O), !tt))
              if (r(R) !== null) (tt = !0), Qt || ((Qt = !0), $t());
              else {
                var H = r(g);
                H !== null && _e(jt, H.startTime - O);
              }
          }
          var Qt = !1,
            V = -1,
            vt = 5,
            Jt = -1;
          function ne() {
            return at ? !0 : !(i.unstable_now() - Jt < vt);
          }
          function Ft() {
            if (((at = !1), Qt)) {
              var O = i.unstable_now();
              Jt = O;
              var H = !0;
              try {
                t: {
                  (tt = !1), Z && ((Z = !1), Ct(V), (V = -1)), (ft = !0);
                  var X = q;
                  try {
                    e: {
                      for (Dt(O), U = r(R); U !== null && !(U.expirationTime > O && ne()); ) {
                        var ht = U.callback;
                        if (typeof ht == 'function') {
                          (U.callback = null), (q = U.priorityLevel);
                          var gt = ht(U.expirationTime <= O);
                          if (((O = i.unstable_now()), typeof gt == 'function')) {
                            (U.callback = gt), Dt(O), (H = !0);
                            break e;
                          }
                          U === r(R) && o(R), Dt(O);
                        } else o(R);
                        U = r(R);
                      }
                      if (U !== null) H = !0;
                      else {
                        var y = r(g);
                        y !== null && _e(jt, y.startTime - O), (H = !1);
                      }
                    }
                    break t;
                  } finally {
                    (U = null), (q = X), (ft = !1);
                  }
                  H = void 0;
                }
              } finally {
                H ? $t() : (Qt = !1);
              }
            }
          }
          var $t;
          if (typeof St == 'function')
            $t = function () {
              St(Ft);
            };
          else if (typeof MessageChannel < 'u') {
            var Dl = new MessageChannel(),
              qe = Dl.port2;
            (Dl.port1.onmessage = Ft),
              ($t = function () {
                qe.postMessage(null);
              });
          } else
            $t = function () {
              rt(Ft, 0);
            };
          function _e(O, H) {
            V = rt(function () {
              O(i.unstable_now());
            }, H);
          }
          (i.unstable_IdlePriority = 5),
            (i.unstable_ImmediatePriority = 1),
            (i.unstable_LowPriority = 4),
            (i.unstable_NormalPriority = 3),
            (i.unstable_Profiling = null),
            (i.unstable_UserBlockingPriority = 2),
            (i.unstable_cancelCallback = function (O) {
              O.callback = null;
            }),
            (i.unstable_forceFrameRate = function (O) {
              0 > O || 125 < O
                ? console.error(
                    'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                  )
                : (vt = 0 < O ? Math.floor(1e3 / O) : 5);
            }),
            (i.unstable_getCurrentPriorityLevel = function () {
              return q;
            }),
            (i.unstable_next = function (O) {
              switch (q) {
                case 1:
                case 2:
                case 3:
                  var H = 3;
                  break;
                default:
                  H = q;
              }
              var X = q;
              q = H;
              try {
                return O();
              } finally {
                q = X;
              }
            }),
            (i.unstable_requestPaint = function () {
              at = !0;
            }),
            (i.unstable_runWithPriority = function (O, H) {
              switch (O) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                  break;
                default:
                  O = 3;
              }
              var X = q;
              q = O;
              try {
                return H();
              } finally {
                q = X;
              }
            }),
            (i.unstable_scheduleCallback = function (O, H, X) {
              var ht = i.unstable_now();
              switch (
                (typeof X == 'object' && X !== null
                  ? ((X = X.delay), (X = typeof X == 'number' && 0 < X ? ht + X : ht))
                  : (X = ht),
                O)
              ) {
                case 1:
                  var gt = -1;
                  break;
                case 2:
                  gt = 250;
                  break;
                case 5:
                  gt = 1073741823;
                  break;
                case 4:
                  gt = 1e4;
                  break;
                default:
                  gt = 5e3;
              }
              return (
                (gt = X + gt),
                (O = {
                  id: x++,
                  callback: H,
                  priorityLevel: O,
                  startTime: X,
                  expirationTime: gt,
                  sortIndex: -1,
                }),
                X > ht
                  ? ((O.sortIndex = X),
                    f(g, O),
                    r(R) === null &&
                      O === r(g) &&
                      (Z ? (Ct(V), (V = -1)) : (Z = !0), _e(jt, X - ht)))
                  : ((O.sortIndex = gt), f(R, O), tt || ft || ((tt = !0), Qt || ((Qt = !0), $t()))),
                O
              );
            }),
            (i.unstable_shouldYield = ne),
            (i.unstable_wrapCallback = function (O) {
              var H = q;
              return function () {
                var X = q;
                q = H;
                try {
                  return O.apply(this, arguments);
                } finally {
                  q = X;
                }
              };
            });
        })(li)),
      li
    );
  }
  var Lf;
  function Ud() {
    return Lf || ((Lf = 1), (ei.exports = Rd())), ei.exports;
  }
  var ai = { exports: {} },
    K = {};
  var Xf;
  function xd() {
    if (Xf) return K;
    Xf = 1;
    var i = Symbol.for('react.transitional.element'),
      f = Symbol.for('react.portal'),
      r = Symbol.for('react.fragment'),
      o = Symbol.for('react.strict_mode'),
      b = Symbol.for('react.profiler'),
      T = Symbol.for('react.consumer'),
      D = Symbol.for('react.context'),
      M = Symbol.for('react.forward_ref'),
      R = Symbol.for('react.suspense'),
      g = Symbol.for('react.memo'),
      x = Symbol.for('react.lazy'),
      U = Symbol.for('react.activity'),
      q = Symbol.iterator;
    function ft(y) {
      return y === null || typeof y != 'object'
        ? null
        : ((y = (q && y[q]) || y['@@iterator']), typeof y == 'function' ? y : null);
    }
    var tt = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      Z = Object.assign,
      at = {};
    function rt(y, C, N) {
      (this.props = y), (this.context = C), (this.refs = at), (this.updater = N || tt);
    }
    (rt.prototype.isReactComponent = {}),
      (rt.prototype.setState = function (y, C) {
        if (typeof y != 'object' && typeof y != 'function' && y != null)
          throw Error(
            'takes an object of state variables to update or a function which returns an object of state variables.',
          );
        this.updater.enqueueSetState(this, y, C, 'setState');
      }),
      (rt.prototype.forceUpdate = function (y) {
        this.updater.enqueueForceUpdate(this, y, 'forceUpdate');
      });
    function Ct() {}
    Ct.prototype = rt.prototype;
    function St(y, C, N) {
      (this.props = y), (this.context = C), (this.refs = at), (this.updater = N || tt);
    }
    var Dt = (St.prototype = new Ct());
    (Dt.constructor = St), Z(Dt, rt.prototype), (Dt.isPureReactComponent = !0);
    var jt = Array.isArray;
    function Qt() {}
    var V = { H: null, A: null, T: null, S: null },
      vt = Object.prototype.hasOwnProperty;
    function Jt(y, C, N) {
      var Q = N.ref;
      return { $$typeof: i, type: y, key: C, ref: Q !== void 0 ? Q : null, props: N };
    }
    function ne(y, C) {
      return Jt(y.type, C, y.props);
    }
    function Ft(y) {
      return typeof y == 'object' && y !== null && y.$$typeof === i;
    }
    function $t(y) {
      var C = { '=': '=0', ':': '=2' };
      return (
        '$' +
        y.replace(/[=:]/g, function (N) {
          return C[N];
        })
      );
    }
    var Dl = /\/+/g;
    function qe(y, C) {
      return typeof y == 'object' && y !== null && y.key != null ? $t('' + y.key) : C.toString(36);
    }
    function _e(y) {
      switch (y.status) {
        case 'fulfilled':
          return y.value;
        case 'rejected':
          throw y.reason;
        default:
          switch (
            (typeof y.status == 'string'
              ? y.then(Qt, Qt)
              : ((y.status = 'pending'),
                y.then(
                  function (C) {
                    y.status === 'pending' && ((y.status = 'fulfilled'), (y.value = C));
                  },
                  function (C) {
                    y.status === 'pending' && ((y.status = 'rejected'), (y.reason = C));
                  },
                )),
            y.status)
          ) {
            case 'fulfilled':
              return y.value;
            case 'rejected':
              throw y.reason;
          }
      }
      throw y;
    }
    function O(y, C, N, Q, w) {
      var W = typeof y;
      (W === 'undefined' || W === 'boolean') && (y = null);
      var ct = !1;
      if (y === null) ct = !0;
      else
        switch (W) {
          case 'bigint':
          case 'string':
          case 'number':
            ct = !0;
            break;
          case 'object':
            switch (y.$$typeof) {
              case i:
              case f:
                ct = !0;
                break;
              case x:
                return (ct = y._init), O(ct(y._payload), C, N, Q, w);
            }
        }
      if (ct)
        return (
          (w = w(y)),
          (ct = Q === '' ? '.' + qe(y, 0) : Q),
          jt(w)
            ? ((N = ''),
              ct != null && (N = ct.replace(Dl, '$&/') + '/'),
              O(w, C, N, '', function (Qa) {
                return Qa;
              }))
            : w != null &&
              (Ft(w) &&
                (w = ne(
                  w,
                  N +
                    (w.key == null || (y && y.key === w.key)
                      ? ''
                      : ('' + w.key).replace(Dl, '$&/') + '/') +
                    ct,
                )),
              C.push(w)),
          1
        );
      ct = 0;
      var Wt = Q === '' ? '.' : Q + ':';
      if (jt(y))
        for (var zt = 0; zt < y.length; zt++)
          (Q = y[zt]), (W = Wt + qe(Q, zt)), (ct += O(Q, C, N, W, w));
      else if (((zt = ft(y)), typeof zt == 'function'))
        for (y = zt.call(y), zt = 0; !(Q = y.next()).done; )
          (Q = Q.value), (W = Wt + qe(Q, zt++)), (ct += O(Q, C, N, W, w));
      else if (W === 'object') {
        if (typeof y.then == 'function') return O(_e(y), C, N, Q, w);
        throw (
          ((C = String(y)),
          Error(
            'Objects are not valid as a React child (found: ' +
              (C === '[object Object]'
                ? 'object with keys {' + Object.keys(y).join(', ') + '}'
                : C) +
              '). If you meant to render a collection of children, use an array instead.',
          ))
        );
      }
      return ct;
    }
    function H(y, C, N) {
      if (y == null) return y;
      var Q = [],
        w = 0;
      return (
        O(y, Q, '', '', function (W) {
          return C.call(N, W, w++);
        }),
        Q
      );
    }
    function X(y) {
      if (y._status === -1) {
        var C = y._result;
        (C = C()),
          C.then(
            function (N) {
              (y._status === 0 || y._status === -1) && ((y._status = 1), (y._result = N));
            },
            function (N) {
              (y._status === 0 || y._status === -1) && ((y._status = 2), (y._result = N));
            },
          ),
          y._status === -1 && ((y._status = 0), (y._result = C));
      }
      if (y._status === 1) return y._result.default;
      throw y._result;
    }
    var ht =
        typeof reportError == 'function'
          ? reportError
          : function (y) {
              if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
                var C = new window.ErrorEvent('error', {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof y == 'object' && y !== null && typeof y.message == 'string'
                      ? String(y.message)
                      : String(y),
                  error: y,
                });
                if (!window.dispatchEvent(C)) return;
              } else if (typeof process == 'object' && typeof process.emit == 'function') {
                process.emit('uncaughtException', y);
                return;
              }
              console.error(y);
            },
      gt = {
        map: H,
        forEach: function (y, C, N) {
          H(
            y,
            function () {
              C.apply(this, arguments);
            },
            N,
          );
        },
        count: function (y) {
          var C = 0;
          return (
            H(y, function () {
              C++;
            }),
            C
          );
        },
        toArray: function (y) {
          return (
            H(y, function (C) {
              return C;
            }) || []
          );
        },
        only: function (y) {
          if (!Ft(y))
            throw Error('React.Children.only expected to receive a single React element child.');
          return y;
        },
      };
    return (
      (K.Activity = U),
      (K.Children = gt),
      (K.Component = rt),
      (K.Fragment = r),
      (K.Profiler = b),
      (K.PureComponent = St),
      (K.StrictMode = o),
      (K.Suspense = R),
      (K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V),
      (K.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (y) {
          return V.H.useMemoCache(y);
        },
      }),
      (K.cache = function (y) {
        return function () {
          return y.apply(null, arguments);
        };
      }),
      (K.cacheSignal = function () {
        return null;
      }),
      (K.cloneElement = function (y, C, N) {
        if (y == null)
          throw Error('The argument must be a React element, but you passed ' + y + '.');
        var Q = Z({}, y.props),
          w = y.key;
        if (C != null)
          for (W in (C.key !== void 0 && (w = '' + C.key), C))
            !vt.call(C, W) ||
              W === 'key' ||
              W === '__self' ||
              W === '__source' ||
              (W === 'ref' && C.ref === void 0) ||
              (Q[W] = C[W]);
        var W = arguments.length - 2;
        if (W === 1) Q.children = N;
        else if (1 < W) {
          for (var ct = Array(W), Wt = 0; Wt < W; Wt++) ct[Wt] = arguments[Wt + 2];
          Q.children = ct;
        }
        return Jt(y.type, w, Q);
      }),
      (K.createContext = function (y) {
        return (
          (y = {
            $$typeof: D,
            _currentValue: y,
            _currentValue2: y,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (y.Provider = y),
          (y.Consumer = { $$typeof: T, _context: y }),
          y
        );
      }),
      (K.createElement = function (y, C, N) {
        var Q,
          w = {},
          W = null;
        if (C != null)
          for (Q in (C.key !== void 0 && (W = '' + C.key), C))
            vt.call(C, Q) && Q !== 'key' && Q !== '__self' && Q !== '__source' && (w[Q] = C[Q]);
        var ct = arguments.length - 2;
        if (ct === 1) w.children = N;
        else if (1 < ct) {
          for (var Wt = Array(ct), zt = 0; zt < ct; zt++) Wt[zt] = arguments[zt + 2];
          w.children = Wt;
        }
        if (y && y.defaultProps)
          for (Q in ((ct = y.defaultProps), ct)) w[Q] === void 0 && (w[Q] = ct[Q]);
        return Jt(y, W, w);
      }),
      (K.createRef = function () {
        return { current: null };
      }),
      (K.forwardRef = function (y) {
        return { $$typeof: M, render: y };
      }),
      (K.isValidElement = Ft),
      (K.lazy = function (y) {
        return { $$typeof: x, _payload: { _status: -1, _result: y }, _init: X };
      }),
      (K.memo = function (y, C) {
        return { $$typeof: g, type: y, compare: C === void 0 ? null : C };
      }),
      (K.startTransition = function (y) {
        var C = V.T,
          N = {};
        V.T = N;
        try {
          var Q = y(),
            w = V.S;
          w !== null && w(N, Q),
            typeof Q == 'object' && Q !== null && typeof Q.then == 'function' && Q.then(Qt, ht);
        } catch (W) {
          ht(W);
        } finally {
          C !== null && N.types !== null && (C.types = N.types), (V.T = C);
        }
      }),
      (K.unstable_useCacheRefresh = function () {
        return V.H.useCacheRefresh();
      }),
      (K.use = function (y) {
        return V.H.use(y);
      }),
      (K.useActionState = function (y, C, N) {
        return V.H.useActionState(y, C, N);
      }),
      (K.useCallback = function (y, C) {
        return V.H.useCallback(y, C);
      }),
      (K.useContext = function (y) {
        return V.H.useContext(y);
      }),
      (K.useDebugValue = function () {}),
      (K.useDeferredValue = function (y, C) {
        return V.H.useDeferredValue(y, C);
      }),
      (K.useEffect = function (y, C) {
        return V.H.useEffect(y, C);
      }),
      (K.useEffectEvent = function (y) {
        return V.H.useEffectEvent(y);
      }),
      (K.useId = function () {
        return V.H.useId();
      }),
      (K.useImperativeHandle = function (y, C, N) {
        return V.H.useImperativeHandle(y, C, N);
      }),
      (K.useInsertionEffect = function (y, C) {
        return V.H.useInsertionEffect(y, C);
      }),
      (K.useLayoutEffect = function (y, C) {
        return V.H.useLayoutEffect(y, C);
      }),
      (K.useMemo = function (y, C) {
        return V.H.useMemo(y, C);
      }),
      (K.useOptimistic = function (y, C) {
        return V.H.useOptimistic(y, C);
      }),
      (K.useReducer = function (y, C, N) {
        return V.H.useReducer(y, C, N);
      }),
      (K.useRef = function (y) {
        return V.H.useRef(y);
      }),
      (K.useState = function (y) {
        return V.H.useState(y);
      }),
      (K.useSyncExternalStore = function (y, C, N) {
        return V.H.useSyncExternalStore(y, C, N);
      }),
      (K.useTransition = function () {
        return V.H.useTransition();
      }),
      (K.version = '19.2.1'),
      K
    );
  }
  var Zf;
  function ui() {
    return Zf || ((Zf = 1), (ai.exports = xd())), ai.exports;
  }
  var ni = { exports: {} },
    Kt = {};
  var Vf;
  function Hd() {
    if (Vf) return Kt;
    Vf = 1;
    var i = ui();
    function f(R) {
      var g = 'https://react.dev/errors/' + R;
      if (1 < arguments.length) {
        g += '?args[]=' + encodeURIComponent(arguments[1]);
        for (var x = 2; x < arguments.length; x++)
          g += '&args[]=' + encodeURIComponent(arguments[x]);
      }
      return (
        'Minified React error #' +
        R +
        '; visit ' +
        g +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    function r() {}
    var o = {
        d: {
          f: r,
          r: function () {
            throw Error(f(522));
          },
          D: r,
          C: r,
          L: r,
          m: r,
          X: r,
          S: r,
          M: r,
        },
        p: 0,
        findDOMNode: null,
      },
      b = Symbol.for('react.portal');
    function T(R, g, x) {
      var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: b,
        key: U == null ? null : '' + U,
        children: R,
        containerInfo: g,
        implementation: x,
      };
    }
    var D = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function M(R, g) {
      if (R === 'font') return '';
      if (typeof g == 'string') return g === 'use-credentials' ? g : '';
    }
    return (
      (Kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
      (Kt.createPortal = function (R, g) {
        var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(f(299));
        return T(R, g, null, x);
      }),
      (Kt.flushSync = function (R) {
        var g = D.T,
          x = o.p;
        try {
          if (((D.T = null), (o.p = 2), R)) return R();
        } finally {
          (D.T = g), (o.p = x), o.d.f();
        }
      }),
      (Kt.preconnect = function (R, g) {
        typeof R == 'string' &&
          (g
            ? ((g = g.crossOrigin),
              (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
            : (g = null),
          o.d.C(R, g));
      }),
      (Kt.prefetchDNS = function (R) {
        typeof R == 'string' && o.d.D(R);
      }),
      (Kt.preinit = function (R, g) {
        if (typeof R == 'string' && g && typeof g.as == 'string') {
          var x = g.as,
            U = M(x, g.crossOrigin),
            q = typeof g.integrity == 'string' ? g.integrity : void 0,
            ft = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
          x === 'style'
            ? o.d.S(R, typeof g.precedence == 'string' ? g.precedence : void 0, {
                crossOrigin: U,
                integrity: q,
                fetchPriority: ft,
              })
            : x === 'script' &&
              o.d.X(R, {
                crossOrigin: U,
                integrity: q,
                fetchPriority: ft,
                nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
              });
        }
      }),
      (Kt.preinitModule = function (R, g) {
        if (typeof R == 'string')
          if (typeof g == 'object' && g !== null) {
            if (g.as == null || g.as === 'script') {
              var x = M(g.as, g.crossOrigin);
              o.d.M(R, {
                crossOrigin: x,
                integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
                nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
              });
            }
          } else g == null && o.d.M(R);
      }),
      (Kt.preload = function (R, g) {
        if (typeof R == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
          var x = g.as,
            U = M(x, g.crossOrigin);
          o.d.L(R, x, {
            crossOrigin: U,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
            nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            type: typeof g.type == 'string' ? g.type : void 0,
            fetchPriority: typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0,
            referrerPolicy: typeof g.referrerPolicy == 'string' ? g.referrerPolicy : void 0,
            imageSrcSet: typeof g.imageSrcSet == 'string' ? g.imageSrcSet : void 0,
            imageSizes: typeof g.imageSizes == 'string' ? g.imageSizes : void 0,
            media: typeof g.media == 'string' ? g.media : void 0,
          });
        }
      }),
      (Kt.preloadModule = function (R, g) {
        if (typeof R == 'string')
          if (g) {
            var x = M(g.as, g.crossOrigin);
            o.d.m(R, {
              as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
              crossOrigin: x,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
            });
          } else o.d.m(R);
      }),
      (Kt.requestFormReset = function (R) {
        o.d.r(R);
      }),
      (Kt.unstable_batchedUpdates = function (R, g) {
        return R(g);
      }),
      (Kt.useFormState = function (R, g, x) {
        return D.H.useFormState(R, g, x);
      }),
      (Kt.useFormStatus = function () {
        return D.H.useHostTransitionStatus();
      }),
      (Kt.version = '19.2.1'),
      Kt
    );
  }
  var Kf;
  function Nd() {
    if (Kf) return ni.exports;
    Kf = 1;
    function i() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
        } catch (f) {
          console.error(f);
        }
    }
    return i(), (ni.exports = Hd()), ni.exports;
  }
  var wf;
  function qd() {
    if (wf) return qa;
    wf = 1;
    var i = Ud(),
      f = ui(),
      r = Nd();
    function o(t) {
      var e = 'https://react.dev/errors/' + t;
      if (1 < arguments.length) {
        e += '?args[]=' + encodeURIComponent(arguments[1]);
        for (var l = 2; l < arguments.length; l++)
          e += '&args[]=' + encodeURIComponent(arguments[l]);
      }
      return (
        'Minified React error #' +
        t +
        '; visit ' +
        e +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    function b(t) {
      return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
    }
    function T(t) {
      var e = t,
        l = t;
      if (t.alternate) for (; e.return; ) e = e.return;
      else {
        t = e;
        do (e = t), (e.flags & 4098) !== 0 && (l = e.return), (t = e.return);
        while (t);
      }
      return e.tag === 3 ? l : null;
    }
    function D(t) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
          return e.dehydrated;
      }
      return null;
    }
    function M(t) {
      if (t.tag === 31) {
        var e = t.memoizedState;
        if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
          return e.dehydrated;
      }
      return null;
    }
    function R(t) {
      if (T(t) !== t) throw Error(o(188));
    }
    function g(t) {
      var e = t.alternate;
      if (!e) {
        if (((e = T(t)), e === null)) throw Error(o(188));
        return e !== t ? null : t;
      }
      for (var l = t, a = e; ; ) {
        var u = l.return;
        if (u === null) break;
        var n = u.alternate;
        if (n === null) {
          if (((a = u.return), a !== null)) {
            l = a;
            continue;
          }
          break;
        }
        if (u.child === n.child) {
          for (n = u.child; n; ) {
            if (n === l) return R(u), t;
            if (n === a) return R(u), e;
            n = n.sibling;
          }
          throw Error(o(188));
        }
        if (l.return !== a.return) (l = u), (a = n);
        else {
          for (var c = !1, s = u.child; s; ) {
            if (s === l) {
              (c = !0), (l = u), (a = n);
              break;
            }
            if (s === a) {
              (c = !0), (a = u), (l = n);
              break;
            }
            s = s.sibling;
          }
          if (!c) {
            for (s = n.child; s; ) {
              if (s === l) {
                (c = !0), (l = n), (a = u);
                break;
              }
              if (s === a) {
                (c = !0), (a = n), (l = u);
                break;
              }
              s = s.sibling;
            }
            if (!c) throw Error(o(189));
          }
        }
        if (l.alternate !== a) throw Error(o(190));
      }
      if (l.tag !== 3) throw Error(o(188));
      return l.stateNode.current === l ? t : e;
    }
    function x(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t;
      for (t = t.child; t !== null; ) {
        if (((e = x(t)), e !== null)) return e;
        t = t.sibling;
      }
      return null;
    }
    var U = Object.assign,
      q = Symbol.for('react.element'),
      ft = Symbol.for('react.transitional.element'),
      tt = Symbol.for('react.portal'),
      Z = Symbol.for('react.fragment'),
      at = Symbol.for('react.strict_mode'),
      rt = Symbol.for('react.profiler'),
      Ct = Symbol.for('react.consumer'),
      St = Symbol.for('react.context'),
      Dt = Symbol.for('react.forward_ref'),
      jt = Symbol.for('react.suspense'),
      Qt = Symbol.for('react.suspense_list'),
      V = Symbol.for('react.memo'),
      vt = Symbol.for('react.lazy'),
      Jt = Symbol.for('react.activity'),
      ne = Symbol.for('react.memo_cache_sentinel'),
      Ft = Symbol.iterator;
    function $t(t) {
      return t === null || typeof t != 'object'
        ? null
        : ((t = (Ft && t[Ft]) || t['@@iterator']), typeof t == 'function' ? t : null);
    }
    var Dl = Symbol.for('react.client.reference');
    function qe(t) {
      if (t == null) return null;
      if (typeof t == 'function') return t.$$typeof === Dl ? null : t.displayName || t.name || null;
      if (typeof t == 'string') return t;
      switch (t) {
        case Z:
          return 'Fragment';
        case rt:
          return 'Profiler';
        case at:
          return 'StrictMode';
        case jt:
          return 'Suspense';
        case Qt:
          return 'SuspenseList';
        case Jt:
          return 'Activity';
      }
      if (typeof t == 'object')
        switch (t.$$typeof) {
          case tt:
            return 'Portal';
          case St:
            return t.displayName || 'Context';
          case Ct:
            return (t._context.displayName || 'Context') + '.Consumer';
          case Dt:
            var e = t.render;
            return (
              (t = t.displayName),
              t ||
                ((t = e.displayName || e.name || ''),
                (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
              t
            );
          case V:
            return (e = t.displayName || null), e !== null ? e : qe(t.type) || 'Memo';
          case vt:
            (e = t._payload), (t = t._init);
            try {
              return qe(t(e));
            } catch {}
        }
      return null;
    }
    var _e = Array.isArray,
      O = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      H = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      X = { pending: !1, data: null, method: null, action: null },
      ht = [],
      gt = -1;
    function y(t) {
      return { current: t };
    }
    function C(t) {
      0 > gt || ((t.current = ht[gt]), (ht[gt] = null), gt--);
    }
    function N(t, e) {
      gt++, (ht[gt] = t.current), (t.current = e);
    }
    var Q = y(null),
      w = y(null),
      W = y(null),
      ct = y(null);
    function Wt(t, e) {
      switch ((N(W, e), N(w, t), N(Q, null), e.nodeType)) {
        case 9:
        case 11:
          t = (t = e.documentElement) && (t = t.namespaceURI) ? kh(t) : 0;
          break;
        default:
          if (((t = e.tagName), (e = e.namespaceURI))) (e = kh(e)), (t = $h(e, t));
          else
            switch (t) {
              case 'svg':
                t = 1;
                break;
              case 'math':
                t = 2;
                break;
              default:
                t = 0;
            }
      }
      C(Q), N(Q, t);
    }
    function zt() {
      C(Q), C(w), C(W);
    }
    function Qa(t) {
      t.memoizedState !== null && N(ct, t);
      var e = Q.current,
        l = $h(e, t.type);
      e !== l && (N(w, t), N(Q, l));
    }
    function Nu(t) {
      w.current === t && (C(Q), C(w)), ct.current === t && (C(ct), (Mu._currentValue = X));
    }
    var Si, zs;
    function Rl(t) {
      if (Si === void 0)
        try {
          throw Error();
        } catch (l) {
          var e = l.stack.trim().match(/\n( *(at )?)/);
          (Si = (e && e[1]) || ''),
            (zs =
              -1 <
              l.stack.indexOf(`
    at`)
                ? ' (<anonymous>)'
                : -1 < l.stack.indexOf('@')
                ? '@unknown:0:0'
                : '');
        }
      return (
        `
` +
        Si +
        t +
        zs
      );
    }
    var bi = !1;
    function Ei(t, e) {
      if (!t || bi) return '';
      bi = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var a = {
          DetermineComponentFrameRoot: function () {
            try {
              if (e) {
                var _ = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(_.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == 'object' && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(_, []);
                  } catch (E) {
                    var S = E;
                  }
                  Reflect.construct(t, [], _);
                } else {
                  try {
                    _.call();
                  } catch (E) {
                    S = E;
                  }
                  t.call(_.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (E) {
                  S = E;
                }
                (_ = t()) && typeof _.catch == 'function' && _.catch(function () {});
              }
            } catch (E) {
              if (E && S && typeof E.stack == 'string') return [E.stack, S.stack];
            }
            return [null, null];
          },
        };
        a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
        var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
        u &&
          u.configurable &&
          Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
            value: 'DetermineComponentFrameRoot',
          });
        var n = a.DetermineComponentFrameRoot(),
          c = n[0],
          s = n[1];
        if (c && s) {
          var h = c.split(`
`),
            p = s.split(`
`);
          for (u = a = 0; a < h.length && !h[a].includes('DetermineComponentFrameRoot'); ) a++;
          for (; u < p.length && !p[u].includes('DetermineComponentFrameRoot'); ) u++;
          if (a === h.length || u === p.length)
            for (a = h.length - 1, u = p.length - 1; 1 <= a && 0 <= u && h[a] !== p[u]; ) u--;
          for (; 1 <= a && 0 <= u; a--, u--)
            if (h[a] !== p[u]) {
              if (a !== 1 || u !== 1)
                do
                  if ((a--, u--, 0 > u || h[a] !== p[u])) {
                    var A =
                      `
` + h[a].replace(' at new ', ' at ');
                    return (
                      t.displayName &&
                        A.includes('<anonymous>') &&
                        (A = A.replace('<anonymous>', t.displayName)),
                      A
                    );
                  }
                while (1 <= a && 0 <= u);
              break;
            }
        }
      } finally {
        (bi = !1), (Error.prepareStackTrace = l);
      }
      return (l = t ? t.displayName || t.name : '') ? Rl(l) : '';
    }
    function c0(t, e) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return Rl(t.type);
        case 16:
          return Rl('Lazy');
        case 13:
          return t.child !== e && e !== null ? Rl('Suspense Fallback') : Rl('Suspense');
        case 19:
          return Rl('SuspenseList');
        case 0:
        case 15:
          return Ei(t.type, !1);
        case 11:
          return Ei(t.type.render, !1);
        case 1:
          return Ei(t.type, !0);
        case 31:
          return Rl('Activity');
        default:
          return '';
      }
    }
    function Ms(t) {
      try {
        var e = '',
          l = null;
        do (e += c0(t, l)), (l = t), (t = t.return);
        while (t);
        return e;
      } catch (a) {
        return (
          `
Error generating stack: ` +
          a.message +
          `
` +
          a.stack
        );
      }
    }
    var Ti = Object.prototype.hasOwnProperty,
      Ai = i.unstable_scheduleCallback,
      Oi = i.unstable_cancelCallback,
      f0 = i.unstable_shouldYield,
      s0 = i.unstable_requestPaint,
      ie = i.unstable_now,
      o0 = i.unstable_getCurrentPriorityLevel,
      _s = i.unstable_ImmediatePriority,
      Cs = i.unstable_UserBlockingPriority,
      qu = i.unstable_NormalPriority,
      r0 = i.unstable_LowPriority,
      Ds = i.unstable_IdlePriority,
      h0 = i.log,
      d0 = i.unstable_setDisableYieldValue,
      Ba = null,
      ce = null;
    function el(t) {
      if ((typeof h0 == 'function' && d0(t), ce && typeof ce.setStrictMode == 'function'))
        try {
          ce.setStrictMode(Ba, t);
        } catch {}
    }
    var fe = Math.clz32 ? Math.clz32 : v0,
      y0 = Math.log,
      m0 = Math.LN2;
    function v0(t) {
      return (t >>>= 0), t === 0 ? 32 : (31 - ((y0(t) / m0) | 0)) | 0;
    }
    var ju = 256,
      Qu = 262144,
      Bu = 4194304;
    function Ul(t) {
      var e = t & 42;
      if (e !== 0) return e;
      switch (t & -t) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return t & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return t & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return t;
      }
    }
    function Gu(t, e, l) {
      var a = t.pendingLanes;
      if (a === 0) return 0;
      var u = 0,
        n = t.suspendedLanes,
        c = t.pingedLanes;
      t = t.warmLanes;
      var s = a & 134217727;
      return (
        s !== 0
          ? ((a = s & ~n),
            a !== 0
              ? (u = Ul(a))
              : ((c &= s), c !== 0 ? (u = Ul(c)) : l || ((l = s & ~t), l !== 0 && (u = Ul(l)))))
          : ((s = a & ~n),
            s !== 0
              ? (u = Ul(s))
              : c !== 0
              ? (u = Ul(c))
              : l || ((l = a & ~t), l !== 0 && (u = Ul(l)))),
        u === 0
          ? 0
          : e !== 0 &&
            e !== u &&
            (e & n) === 0 &&
            ((n = u & -u), (l = e & -e), n >= l || (n === 32 && (l & 4194048) !== 0))
          ? e
          : u
      );
    }
    function Ga(t, e) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
    }
    function g0(t, e) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return e + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Rs() {
      var t = Bu;
      return (Bu <<= 1), (Bu & 62914560) === 0 && (Bu = 4194304), t;
    }
    function zi(t) {
      for (var e = [], l = 0; 31 > l; l++) e.push(t);
      return e;
    }
    function Ya(t, e) {
      (t.pendingLanes |= e),
        e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
    }
    function p0(t, e, l, a, u, n) {
      var c = t.pendingLanes;
      (t.pendingLanes = l),
        (t.suspendedLanes = 0),
        (t.pingedLanes = 0),
        (t.warmLanes = 0),
        (t.expiredLanes &= l),
        (t.entangledLanes &= l),
        (t.errorRecoveryDisabledLanes &= l),
        (t.shellSuspendCounter = 0);
      var s = t.entanglements,
        h = t.expirationTimes,
        p = t.hiddenUpdates;
      for (l = c & ~l; 0 < l; ) {
        var A = 31 - fe(l),
          _ = 1 << A;
        (s[A] = 0), (h[A] = -1);
        var S = p[A];
        if (S !== null)
          for (p[A] = null, A = 0; A < S.length; A++) {
            var E = S[A];
            E !== null && (E.lane &= -536870913);
          }
        l &= ~_;
      }
      a !== 0 && Us(t, a, 0),
        n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(c & ~e));
    }
    function Us(t, e, l) {
      (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
      var a = 31 - fe(e);
      (t.entangledLanes |= e),
        (t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 261930));
    }
    function xs(t, e) {
      var l = (t.entangledLanes |= e);
      for (t = t.entanglements; l; ) {
        var a = 31 - fe(l),
          u = 1 << a;
        (u & e) | (t[a] & e) && (t[a] |= e), (l &= ~u);
      }
    }
    function Hs(t, e) {
      var l = e & -e;
      return (l = (l & 42) !== 0 ? 1 : Mi(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
    }
    function Mi(t) {
      switch (t) {
        case 2:
          t = 1;
          break;
        case 8:
          t = 4;
          break;
        case 32:
          t = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          t = 128;
          break;
        case 268435456:
          t = 134217728;
          break;
        default:
          t = 0;
      }
      return t;
    }
    function _i(t) {
      return (t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2;
    }
    function Ns() {
      var t = H.p;
      return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : bd(t.type));
    }
    function qs(t, e) {
      var l = H.p;
      try {
        return (H.p = t), e();
      } finally {
        H.p = l;
      }
    }
    var ll = Math.random().toString(36).slice(2),
      Yt = '__reactFiber$' + ll,
      It = '__reactProps$' + ll,
      kl = '__reactContainer$' + ll,
      Ci = '__reactEvents$' + ll,
      S0 = '__reactListeners$' + ll,
      b0 = '__reactHandles$' + ll,
      js = '__reactResources$' + ll,
      La = '__reactMarker$' + ll;
    function Di(t) {
      delete t[Yt], delete t[It], delete t[Ci], delete t[S0], delete t[b0];
    }
    function $l(t) {
      var e = t[Yt];
      if (e) return e;
      for (var l = t.parentNode; l; ) {
        if ((e = l[kl] || l[Yt])) {
          if (((l = e.alternate), e.child !== null || (l !== null && l.child !== null)))
            for (t = ud(t); t !== null; ) {
              if ((l = t[Yt])) return l;
              t = ud(t);
            }
          return e;
        }
        (t = l), (l = t.parentNode);
      }
      return null;
    }
    function Il(t) {
      if ((t = t[Yt] || t[kl])) {
        var e = t.tag;
        if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
      }
      return null;
    }
    function Xa(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
      throw Error(o(33));
    }
    function Pl(t) {
      var e = t[js];
      return e || (e = t[js] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e;
    }
    function Bt(t) {
      t[La] = !0;
    }
    var Qs = new Set(),
      Bs = {};
    function xl(t, e) {
      ta(t, e), ta(t + 'Capture', e);
    }
    function ta(t, e) {
      for (Bs[t] = e, t = 0; t < e.length; t++) Qs.add(e[t]);
    }
    var E0 = RegExp(
        '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$',
      ),
      Gs = {},
      Ys = {};
    function T0(t) {
      return Ti.call(Ys, t)
        ? !0
        : Ti.call(Gs, t)
        ? !1
        : E0.test(t)
        ? (Ys[t] = !0)
        : ((Gs[t] = !0), !1);
    }
    function Yu(t, e, l) {
      if (T0(e))
        if (l === null) t.removeAttribute(e);
        else {
          switch (typeof l) {
            case 'undefined':
            case 'function':
            case 'symbol':
              t.removeAttribute(e);
              return;
            case 'boolean':
              var a = e.toLowerCase().slice(0, 5);
              if (a !== 'data-' && a !== 'aria-') {
                t.removeAttribute(e);
                return;
              }
          }
          t.setAttribute(e, '' + l);
        }
    }
    function Lu(t, e, l) {
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
          case 'boolean':
            t.removeAttribute(e);
            return;
        }
        t.setAttribute(e, '' + l);
      }
    }
    function je(t, e, l, a) {
      if (a === null) t.removeAttribute(l);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
          case 'boolean':
            t.removeAttribute(l);
            return;
        }
        t.setAttributeNS(e, l, '' + a);
      }
    }
    function ge(t) {
      switch (typeof t) {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
          return t;
        case 'object':
          return t;
        default:
          return '';
      }
    }
    function Ls(t) {
      var e = t.type;
      return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
    }
    function A0(t, e, l) {
      var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
      if (
        !t.hasOwnProperty(e) &&
        typeof a < 'u' &&
        typeof a.get == 'function' &&
        typeof a.set == 'function'
      ) {
        var u = a.get,
          n = a.set;
        return (
          Object.defineProperty(t, e, {
            configurable: !0,
            get: function () {
              return u.call(this);
            },
            set: function (c) {
              (l = '' + c), n.call(this, c);
            },
          }),
          Object.defineProperty(t, e, { enumerable: a.enumerable }),
          {
            getValue: function () {
              return l;
            },
            setValue: function (c) {
              l = '' + c;
            },
            stopTracking: function () {
              (t._valueTracker = null), delete t[e];
            },
          }
        );
      }
    }
    function Ri(t) {
      if (!t._valueTracker) {
        var e = Ls(t) ? 'checked' : 'value';
        t._valueTracker = A0(t, e, '' + t[e]);
      }
    }
    function Xs(t) {
      if (!t) return !1;
      var e = t._valueTracker;
      if (!e) return !0;
      var l = e.getValue(),
        a = '';
      return (
        t && (a = Ls(t) ? (t.checked ? 'true' : 'false') : t.value),
        (t = a),
        t !== l ? (e.setValue(t), !0) : !1
      );
    }
    function Xu(t) {
      if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    var O0 = /[\n"\\]/g;
    function pe(t) {
      return t.replace(O0, function (e) {
        return '\\' + e.charCodeAt(0).toString(16) + ' ';
      });
    }
    function Ui(t, e, l, a, u, n, c, s) {
      (t.name = ''),
        c != null && typeof c != 'function' && typeof c != 'symbol' && typeof c != 'boolean'
          ? (t.type = c)
          : t.removeAttribute('type'),
        e != null
          ? c === 'number'
            ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + ge(e))
            : t.value !== '' + ge(e) && (t.value = '' + ge(e))
          : (c !== 'submit' && c !== 'reset') || t.removeAttribute('value'),
        e != null
          ? xi(t, c, ge(e))
          : l != null
          ? xi(t, c, ge(l))
          : a != null && t.removeAttribute('value'),
        u == null && n != null && (t.defaultChecked = !!n),
        u != null && (t.checked = u && typeof u != 'function' && typeof u != 'symbol'),
        s != null && typeof s != 'function' && typeof s != 'symbol' && typeof s != 'boolean'
          ? (t.name = '' + ge(s))
          : t.removeAttribute('name');
    }
    function Zs(t, e, l, a, u, n, c, s) {
      if (
        (n != null &&
          typeof n != 'function' &&
          typeof n != 'symbol' &&
          typeof n != 'boolean' &&
          (t.type = n),
        e != null || l != null)
      ) {
        if (!((n !== 'submit' && n !== 'reset') || e != null)) {
          Ri(t);
          return;
        }
        (l = l != null ? '' + ge(l) : ''),
          (e = e != null ? '' + ge(e) : l),
          s || e === t.value || (t.value = e),
          (t.defaultValue = e);
      }
      (a = a ?? u),
        (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
        (t.checked = s ? t.checked : !!a),
        (t.defaultChecked = !!a),
        c != null &&
          typeof c != 'function' &&
          typeof c != 'symbol' &&
          typeof c != 'boolean' &&
          (t.name = c),
        Ri(t);
    }
    function xi(t, e, l) {
      (e === 'number' && Xu(t.ownerDocument) === t) ||
        t.defaultValue === '' + l ||
        (t.defaultValue = '' + l);
    }
    function ea(t, e, l, a) {
      if (((t = t.options), e)) {
        e = {};
        for (var u = 0; u < l.length; u++) e['$' + l[u]] = !0;
        for (l = 0; l < t.length; l++)
          (u = e.hasOwnProperty('$' + t[l].value)),
            t[l].selected !== u && (t[l].selected = u),
            u && a && (t[l].defaultSelected = !0);
      } else {
        for (l = '' + ge(l), e = null, u = 0; u < t.length; u++) {
          if (t[u].value === l) {
            (t[u].selected = !0), a && (t[u].defaultSelected = !0);
            return;
          }
          e !== null || t[u].disabled || (e = t[u]);
        }
        e !== null && (e.selected = !0);
      }
    }
    function Vs(t, e, l) {
      if (e != null && ((e = '' + ge(e)), e !== t.value && (t.value = e), l == null)) {
        t.defaultValue !== e && (t.defaultValue = e);
        return;
      }
      t.defaultValue = l != null ? '' + ge(l) : '';
    }
    function Ks(t, e, l, a) {
      if (e == null) {
        if (a != null) {
          if (l != null) throw Error(o(92));
          if (_e(a)) {
            if (1 < a.length) throw Error(o(93));
            a = a[0];
          }
          l = a;
        }
        l == null && (l = ''), (e = l);
      }
      (l = ge(e)),
        (t.defaultValue = l),
        (a = t.textContent),
        a === l && a !== '' && a !== null && (t.value = a),
        Ri(t);
    }
    function la(t, e) {
      if (e) {
        var l = t.firstChild;
        if (l && l === t.lastChild && l.nodeType === 3) {
          l.nodeValue = e;
          return;
        }
      }
      t.textContent = e;
    }
    var z0 = new Set(
      'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
        ' ',
      ),
    );
    function ws(t, e, l) {
      var a = e.indexOf('--') === 0;
      l == null || typeof l == 'boolean' || l === ''
        ? a
          ? t.setProperty(e, '')
          : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
        : a
        ? t.setProperty(e, l)
        : typeof l != 'number' || l === 0 || z0.has(e)
        ? e === 'float'
          ? (t.cssFloat = l)
          : (t[e] = ('' + l).trim())
        : (t[e] = l + 'px');
    }
    function Js(t, e, l) {
      if (e != null && typeof e != 'object') throw Error(o(62));
      if (((t = t.style), l != null)) {
        for (var a in l)
          !l.hasOwnProperty(a) ||
            (e != null && e.hasOwnProperty(a)) ||
            (a.indexOf('--') === 0
              ? t.setProperty(a, '')
              : a === 'float'
              ? (t.cssFloat = '')
              : (t[a] = ''));
        for (var u in e) (a = e[u]), e.hasOwnProperty(u) && l[u] !== a && ws(t, u, a);
      } else for (var n in e) e.hasOwnProperty(n) && ws(t, n, e[n]);
    }
    function Hi(t) {
      if (t.indexOf('-') === -1) return !1;
      switch (t) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return !1;
        default:
          return !0;
      }
    }
    var M0 = new Map([
        ['acceptCharset', 'accept-charset'],
        ['htmlFor', 'for'],
        ['httpEquiv', 'http-equiv'],
        ['crossOrigin', 'crossorigin'],
        ['accentHeight', 'accent-height'],
        ['alignmentBaseline', 'alignment-baseline'],
        ['arabicForm', 'arabic-form'],
        ['baselineShift', 'baseline-shift'],
        ['capHeight', 'cap-height'],
        ['clipPath', 'clip-path'],
        ['clipRule', 'clip-rule'],
        ['colorInterpolation', 'color-interpolation'],
        ['colorInterpolationFilters', 'color-interpolation-filters'],
        ['colorProfile', 'color-profile'],
        ['colorRendering', 'color-rendering'],
        ['dominantBaseline', 'dominant-baseline'],
        ['enableBackground', 'enable-background'],
        ['fillOpacity', 'fill-opacity'],
        ['fillRule', 'fill-rule'],
        ['floodColor', 'flood-color'],
        ['floodOpacity', 'flood-opacity'],
        ['fontFamily', 'font-family'],
        ['fontSize', 'font-size'],
        ['fontSizeAdjust', 'font-size-adjust'],
        ['fontStretch', 'font-stretch'],
        ['fontStyle', 'font-style'],
        ['fontVariant', 'font-variant'],
        ['fontWeight', 'font-weight'],
        ['glyphName', 'glyph-name'],
        ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
        ['glyphOrientationVertical', 'glyph-orientation-vertical'],
        ['horizAdvX', 'horiz-adv-x'],
        ['horizOriginX', 'horiz-origin-x'],
        ['imageRendering', 'image-rendering'],
        ['letterSpacing', 'letter-spacing'],
        ['lightingColor', 'lighting-color'],
        ['markerEnd', 'marker-end'],
        ['markerMid', 'marker-mid'],
        ['markerStart', 'marker-start'],
        ['overlinePosition', 'overline-position'],
        ['overlineThickness', 'overline-thickness'],
        ['paintOrder', 'paint-order'],
        ['panose-1', 'panose-1'],
        ['pointerEvents', 'pointer-events'],
        ['renderingIntent', 'rendering-intent'],
        ['shapeRendering', 'shape-rendering'],
        ['stopColor', 'stop-color'],
        ['stopOpacity', 'stop-opacity'],
        ['strikethroughPosition', 'strikethrough-position'],
        ['strikethroughThickness', 'strikethrough-thickness'],
        ['strokeDasharray', 'stroke-dasharray'],
        ['strokeDashoffset', 'stroke-dashoffset'],
        ['strokeLinecap', 'stroke-linecap'],
        ['strokeLinejoin', 'stroke-linejoin'],
        ['strokeMiterlimit', 'stroke-miterlimit'],
        ['strokeOpacity', 'stroke-opacity'],
        ['strokeWidth', 'stroke-width'],
        ['textAnchor', 'text-anchor'],
        ['textDecoration', 'text-decoration'],
        ['textRendering', 'text-rendering'],
        ['transformOrigin', 'transform-origin'],
        ['underlinePosition', 'underline-position'],
        ['underlineThickness', 'underline-thickness'],
        ['unicodeBidi', 'unicode-bidi'],
        ['unicodeRange', 'unicode-range'],
        ['unitsPerEm', 'units-per-em'],
        ['vAlphabetic', 'v-alphabetic'],
        ['vHanging', 'v-hanging'],
        ['vIdeographic', 'v-ideographic'],
        ['vMathematical', 'v-mathematical'],
        ['vectorEffect', 'vector-effect'],
        ['vertAdvY', 'vert-adv-y'],
        ['vertOriginX', 'vert-origin-x'],
        ['vertOriginY', 'vert-origin-y'],
        ['wordSpacing', 'word-spacing'],
        ['writingMode', 'writing-mode'],
        ['xmlnsXlink', 'xmlns:xlink'],
        ['xHeight', 'x-height'],
      ]),
      _0 =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Zu(t) {
      return _0.test('' + t)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : t;
    }
    function Qe() {}
    var Ni = null;
    function qi(t) {
      return (
        (t = t.target || t.srcElement || window),
        t.correspondingUseElement && (t = t.correspondingUseElement),
        t.nodeType === 3 ? t.parentNode : t
      );
    }
    var aa = null,
      ua = null;
    function Fs(t) {
      var e = Il(t);
      if (e && (t = e.stateNode)) {
        var l = t[It] || null;
        t: switch (((t = e.stateNode), e.type)) {
          case 'input':
            if (
              (Ui(
                t,
                l.value,
                l.defaultValue,
                l.defaultValue,
                l.checked,
                l.defaultChecked,
                l.type,
                l.name,
              ),
              (e = l.name),
              l.type === 'radio' && e != null)
            ) {
              for (l = t; l.parentNode; ) l = l.parentNode;
              for (
                l = l.querySelectorAll('input[name="' + pe('' + e) + '"][type="radio"]'), e = 0;
                e < l.length;
                e++
              ) {
                var a = l[e];
                if (a !== t && a.form === t.form) {
                  var u = a[It] || null;
                  if (!u) throw Error(o(90));
                  Ui(
                    a,
                    u.value,
                    u.defaultValue,
                    u.defaultValue,
                    u.checked,
                    u.defaultChecked,
                    u.type,
                    u.name,
                  );
                }
              }
              for (e = 0; e < l.length; e++) (a = l[e]), a.form === t.form && Xs(a);
            }
            break t;
          case 'textarea':
            Vs(t, l.value, l.defaultValue);
            break t;
          case 'select':
            (e = l.value), e != null && ea(t, !!l.multiple, e, !1);
        }
      }
    }
    var ji = !1;
    function Ws(t, e, l) {
      if (ji) return t(e, l);
      ji = !0;
      try {
        var a = t(e);
        return a;
      } finally {
        if (
          ((ji = !1),
          (aa !== null || ua !== null) &&
            (Un(), aa && ((e = aa), (t = ua), (ua = aa = null), Fs(e), t)))
        )
          for (e = 0; e < t.length; e++) Fs(t[e]);
      }
    }
    function Za(t, e) {
      var l = t.stateNode;
      if (l === null) return null;
      var a = l[It] || null;
      if (a === null) return null;
      l = a[e];
      t: switch (e) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
          (a = !a.disabled) ||
            ((t = t.type),
            (a = !(t === 'button' || t === 'input' || t === 'select' || t === 'textarea'))),
            (t = !a);
          break t;
        default:
          t = !1;
      }
      if (t) return null;
      if (l && typeof l != 'function') throw Error(o(231, e, typeof l));
      return l;
    }
    var Be = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
      ),
      Qi = !1;
    if (Be)
      try {
        var Va = {};
        Object.defineProperty(Va, 'passive', {
          get: function () {
            Qi = !0;
          },
        }),
          window.addEventListener('test', Va, Va),
          window.removeEventListener('test', Va, Va);
      } catch {
        Qi = !1;
      }
    var al = null,
      Bi = null,
      Vu = null;
    function ks() {
      if (Vu) return Vu;
      var t,
        e = Bi,
        l = e.length,
        a,
        u = 'value' in al ? al.value : al.textContent,
        n = u.length;
      for (t = 0; t < l && e[t] === u[t]; t++);
      var c = l - t;
      for (a = 1; a <= c && e[l - a] === u[n - a]; a++);
      return (Vu = u.slice(t, 1 < a ? 1 - a : void 0));
    }
    function Ku(t) {
      var e = t.keyCode;
      return (
        'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
        t === 10 && (t = 13),
        32 <= t || t === 13 ? t : 0
      );
    }
    function wu() {
      return !0;
    }
    function $s() {
      return !1;
    }
    function Pt(t) {
      function e(l, a, u, n, c) {
        (this._reactName = l),
          (this._targetInst = u),
          (this.type = a),
          (this.nativeEvent = n),
          (this.target = c),
          (this.currentTarget = null);
        for (var s in t) t.hasOwnProperty(s) && ((l = t[s]), (this[s] = l ? l(n) : n[s]));
        return (
          (this.isDefaultPrevented = (
            n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
          )
            ? wu
            : $s),
          (this.isPropagationStopped = $s),
          this
        );
      }
      return (
        U(e.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var l = this.nativeEvent;
            l &&
              (l.preventDefault
                ? l.preventDefault()
                : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
              (this.isDefaultPrevented = wu));
          },
          stopPropagation: function () {
            var l = this.nativeEvent;
            l &&
              (l.stopPropagation
                ? l.stopPropagation()
                : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
              (this.isPropagationStopped = wu));
          },
          persist: function () {},
          isPersistent: wu,
        }),
        e
      );
    }
    var Hl = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (t) {
          return t.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Ju = Pt(Hl),
      Ka = U({}, Hl, { view: 0, detail: 0 }),
      C0 = Pt(Ka),
      Gi,
      Yi,
      wa,
      Fu = U({}, Ka, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Xi,
        button: 0,
        buttons: 0,
        relatedTarget: function (t) {
          return t.relatedTarget === void 0
            ? t.fromElement === t.srcElement
              ? t.toElement
              : t.fromElement
            : t.relatedTarget;
        },
        movementX: function (t) {
          return 'movementX' in t
            ? t.movementX
            : (t !== wa &&
                (wa && t.type === 'mousemove'
                  ? ((Gi = t.screenX - wa.screenX), (Yi = t.screenY - wa.screenY))
                  : (Yi = Gi = 0),
                (wa = t)),
              Gi);
        },
        movementY: function (t) {
          return 'movementY' in t ? t.movementY : Yi;
        },
      }),
      Is = Pt(Fu),
      D0 = U({}, Fu, { dataTransfer: 0 }),
      R0 = Pt(D0),
      U0 = U({}, Ka, { relatedTarget: 0 }),
      Li = Pt(U0),
      x0 = U({}, Hl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      H0 = Pt(x0),
      N0 = U({}, Hl, {
        clipboardData: function (t) {
          return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
        },
      }),
      q0 = Pt(N0),
      j0 = U({}, Hl, { data: 0 }),
      Ps = Pt(j0),
      Q0 = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
      },
      B0 = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
      },
      G0 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
    function Y0(t) {
      var e = this.nativeEvent;
      return e.getModifierState ? e.getModifierState(t) : (t = G0[t]) ? !!e[t] : !1;
    }
    function Xi() {
      return Y0;
    }
    var L0 = U({}, Ka, {
        key: function (t) {
          if (t.key) {
            var e = Q0[t.key] || t.key;
            if (e !== 'Unidentified') return e;
          }
          return t.type === 'keypress'
            ? ((t = Ku(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
            : t.type === 'keydown' || t.type === 'keyup'
            ? B0[t.keyCode] || 'Unidentified'
            : '';
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Xi,
        charCode: function (t) {
          return t.type === 'keypress' ? Ku(t) : 0;
        },
        keyCode: function (t) {
          return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
        },
        which: function (t) {
          return t.type === 'keypress'
            ? Ku(t)
            : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
        },
      }),
      X0 = Pt(L0),
      Z0 = U({}, Fu, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      to = Pt(Z0),
      V0 = U({}, Ka, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Xi,
      }),
      K0 = Pt(V0),
      w0 = U({}, Hl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      J0 = Pt(w0),
      F0 = U({}, Fu, {
        deltaX: function (t) {
          return 'deltaX' in t ? t.deltaX : 'wheelDeltaX' in t ? -t.wheelDeltaX : 0;
        },
        deltaY: function (t) {
          return 'deltaY' in t
            ? t.deltaY
            : 'wheelDeltaY' in t
            ? -t.wheelDeltaY
            : 'wheelDelta' in t
            ? -t.wheelDelta
            : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      W0 = Pt(F0),
      k0 = U({}, Hl, { newState: 0, oldState: 0 }),
      $0 = Pt(k0),
      I0 = [9, 13, 27, 32],
      Zi = Be && 'CompositionEvent' in window,
      Ja = null;
    Be && 'documentMode' in document && (Ja = document.documentMode);
    var P0 = Be && 'TextEvent' in window && !Ja,
      eo = Be && (!Zi || (Ja && 8 < Ja && 11 >= Ja)),
      lo = ' ',
      ao = !1;
    function uo(t, e) {
      switch (t) {
        case 'keyup':
          return I0.indexOf(e.keyCode) !== -1;
        case 'keydown':
          return e.keyCode !== 229;
        case 'keypress':
        case 'mousedown':
        case 'focusout':
          return !0;
        default:
          return !1;
      }
    }
    function no(t) {
      return (t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null;
    }
    var na = !1;
    function tm(t, e) {
      switch (t) {
        case 'compositionend':
          return no(e);
        case 'keypress':
          return e.which !== 32 ? null : ((ao = !0), lo);
        case 'textInput':
          return (t = e.data), t === lo && ao ? null : t;
        default:
          return null;
      }
    }
    function em(t, e) {
      if (na)
        return t === 'compositionend' || (!Zi && uo(t, e))
          ? ((t = ks()), (Vu = Bi = al = null), (na = !1), t)
          : null;
      switch (t) {
        case 'paste':
          return null;
        case 'keypress':
          if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
            if (e.char && 1 < e.char.length) return e.char;
            if (e.which) return String.fromCharCode(e.which);
          }
          return null;
        case 'compositionend':
          return eo && e.locale !== 'ko' ? null : e.data;
        default:
          return null;
      }
    }
    var lm = {
      color: !0,
      date: !0,
      datetime: !0,
      'datetime-local': !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function io(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e === 'input' ? !!lm[t.type] : e === 'textarea';
    }
    function co(t, e, l, a) {
      aa ? (ua ? ua.push(a) : (ua = [a])) : (aa = a),
        (e = Bn(e, 'onChange')),
        0 < e.length &&
          ((l = new Ju('onChange', 'change', null, l, a)), t.push({ event: l, listeners: e }));
    }
    var Fa = null,
      Wa = null;
    function am(t) {
      Vh(t, 0);
    }
    function Wu(t) {
      var e = Xa(t);
      if (Xs(e)) return t;
    }
    function fo(t, e) {
      if (t === 'change') return e;
    }
    var so = !1;
    if (Be) {
      var Vi;
      if (Be) {
        var Ki = 'oninput' in document;
        if (!Ki) {
          var oo = document.createElement('div');
          oo.setAttribute('oninput', 'return;'), (Ki = typeof oo.oninput == 'function');
        }
        Vi = Ki;
      } else Vi = !1;
      so = Vi && (!document.documentMode || 9 < document.documentMode);
    }
    function ro() {
      Fa && (Fa.detachEvent('onpropertychange', ho), (Wa = Fa = null));
    }
    function ho(t) {
      if (t.propertyName === 'value' && Wu(Wa)) {
        var e = [];
        co(e, Wa, t, qi(t)), Ws(am, e);
      }
    }
    function um(t, e, l) {
      t === 'focusin'
        ? (ro(), (Fa = e), (Wa = l), Fa.attachEvent('onpropertychange', ho))
        : t === 'focusout' && ro();
    }
    function nm(t) {
      if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Wu(Wa);
    }
    function im(t, e) {
      if (t === 'click') return Wu(e);
    }
    function cm(t, e) {
      if (t === 'input' || t === 'change') return Wu(e);
    }
    function fm(t, e) {
      return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
    }
    var se = typeof Object.is == 'function' ? Object.is : fm;
    function ka(t, e) {
      if (se(t, e)) return !0;
      if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
      var l = Object.keys(t),
        a = Object.keys(e);
      if (l.length !== a.length) return !1;
      for (a = 0; a < l.length; a++) {
        var u = l[a];
        if (!Ti.call(e, u) || !se(t[u], e[u])) return !1;
      }
      return !0;
    }
    function yo(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function mo(t, e) {
      var l = yo(t);
      t = 0;
      for (var a; l; ) {
        if (l.nodeType === 3) {
          if (((a = t + l.textContent.length), t <= e && a >= e)) return { node: l, offset: e - t };
          t = a;
        }
        t: {
          for (; l; ) {
            if (l.nextSibling) {
              l = l.nextSibling;
              break t;
            }
            l = l.parentNode;
          }
          l = void 0;
        }
        l = yo(l);
      }
    }
    function vo(t, e) {
      return t && e
        ? t === e
          ? !0
          : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
          ? vo(t, e.parentNode)
          : 'contains' in t
          ? t.contains(e)
          : t.compareDocumentPosition
          ? !!(t.compareDocumentPosition(e) & 16)
          : !1
        : !1;
    }
    function go(t) {
      t =
        t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
          ? t.ownerDocument.defaultView
          : window;
      for (var e = Xu(t.document); e instanceof t.HTMLIFrameElement; ) {
        try {
          var l = typeof e.contentWindow.location.href == 'string';
        } catch {
          l = !1;
        }
        if (l) t = e.contentWindow;
        else break;
        e = Xu(t.document);
      }
      return e;
    }
    function wi(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return (
        e &&
        ((e === 'input' &&
          (t.type === 'text' ||
            t.type === 'search' ||
            t.type === 'tel' ||
            t.type === 'url' ||
            t.type === 'password')) ||
          e === 'textarea' ||
          t.contentEditable === 'true')
      );
    }
    var sm = Be && 'documentMode' in document && 11 >= document.documentMode,
      ia = null,
      Ji = null,
      $a = null,
      Fi = !1;
    function po(t, e, l) {
      var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
      Fi ||
        ia == null ||
        ia !== Xu(a) ||
        ((a = ia),
        'selectionStart' in a && wi(a)
          ? (a = { start: a.selectionStart, end: a.selectionEnd })
          : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
            (a = {
              anchorNode: a.anchorNode,
              anchorOffset: a.anchorOffset,
              focusNode: a.focusNode,
              focusOffset: a.focusOffset,
            })),
        ($a && ka($a, a)) ||
          (($a = a),
          (a = Bn(Ji, 'onSelect')),
          0 < a.length &&
            ((e = new Ju('onSelect', 'select', null, e, l)),
            t.push({ event: e, listeners: a }),
            (e.target = ia))));
    }
    function Nl(t, e) {
      var l = {};
      return (
        (l[t.toLowerCase()] = e.toLowerCase()),
        (l['Webkit' + t] = 'webkit' + e),
        (l['Moz' + t] = 'moz' + e),
        l
      );
    }
    var ca = {
        animationend: Nl('Animation', 'AnimationEnd'),
        animationiteration: Nl('Animation', 'AnimationIteration'),
        animationstart: Nl('Animation', 'AnimationStart'),
        transitionrun: Nl('Transition', 'TransitionRun'),
        transitionstart: Nl('Transition', 'TransitionStart'),
        transitioncancel: Nl('Transition', 'TransitionCancel'),
        transitionend: Nl('Transition', 'TransitionEnd'),
      },
      Wi = {},
      So = {};
    Be &&
      ((So = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete ca.animationend.animation,
        delete ca.animationiteration.animation,
        delete ca.animationstart.animation),
      'TransitionEvent' in window || delete ca.transitionend.transition);
    function ql(t) {
      if (Wi[t]) return Wi[t];
      if (!ca[t]) return t;
      var e = ca[t],
        l;
      for (l in e) if (e.hasOwnProperty(l) && l in So) return (Wi[t] = e[l]);
      return t;
    }
    var bo = ql('animationend'),
      Eo = ql('animationiteration'),
      To = ql('animationstart'),
      om = ql('transitionrun'),
      rm = ql('transitionstart'),
      hm = ql('transitioncancel'),
      Ao = ql('transitionend'),
      Oo = new Map(),
      ki =
        'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
          ' ',
        );
    ki.push('scrollEnd');
    function Ce(t, e) {
      Oo.set(t, e), xl(e, [t]);
    }
    var ku =
        typeof reportError == 'function'
          ? reportError
          : function (t) {
              if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
                var e = new window.ErrorEvent('error', {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof t == 'object' && t !== null && typeof t.message == 'string'
                      ? String(t.message)
                      : String(t),
                  error: t,
                });
                if (!window.dispatchEvent(e)) return;
              } else if (typeof process == 'object' && typeof process.emit == 'function') {
                process.emit('uncaughtException', t);
                return;
              }
              console.error(t);
            },
      Se = [],
      fa = 0,
      $i = 0;
    function $u() {
      for (var t = fa, e = ($i = fa = 0); e < t; ) {
        var l = Se[e];
        Se[e++] = null;
        var a = Se[e];
        Se[e++] = null;
        var u = Se[e];
        Se[e++] = null;
        var n = Se[e];
        if (((Se[e++] = null), a !== null && u !== null)) {
          var c = a.pending;
          c === null ? (u.next = u) : ((u.next = c.next), (c.next = u)), (a.pending = u);
        }
        n !== 0 && zo(l, u, n);
      }
    }
    function Iu(t, e, l, a) {
      (Se[fa++] = t),
        (Se[fa++] = e),
        (Se[fa++] = l),
        (Se[fa++] = a),
        ($i |= a),
        (t.lanes |= a),
        (t = t.alternate),
        t !== null && (t.lanes |= a);
    }
    function Ii(t, e, l, a) {
      return Iu(t, e, l, a), Pu(t);
    }
    function jl(t, e) {
      return Iu(t, null, null, e), Pu(t);
    }
    function zo(t, e, l) {
      t.lanes |= l;
      var a = t.alternate;
      a !== null && (a.lanes |= l);
      for (var u = !1, n = t.return; n !== null; )
        (n.childLanes |= l),
          (a = n.alternate),
          a !== null && (a.childLanes |= l),
          n.tag === 22 && ((t = n.stateNode), t === null || t._visibility & 1 || (u = !0)),
          (t = n),
          (n = n.return);
      return t.tag === 3
        ? ((n = t.stateNode),
          u &&
            e !== null &&
            ((u = 31 - fe(l)),
            (t = n.hiddenUpdates),
            (a = t[u]),
            a === null ? (t[u] = [e]) : a.push(e),
            (e.lane = l | 536870912)),
          n)
        : null;
    }
    function Pu(t) {
      if (50 < Su) throw ((Su = 0), (ff = null), Error(o(185)));
      for (var e = t.return; e !== null; ) (t = e), (e = t.return);
      return t.tag === 3 ? t.stateNode : null;
    }
    var sa = {};
    function dm(t, e, l, a) {
      (this.tag = t),
        (this.key = l),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = e),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = a),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function oe(t, e, l, a) {
      return new dm(t, e, l, a);
    }
    function Pi(t) {
      return (t = t.prototype), !(!t || !t.isReactComponent);
    }
    function Ge(t, e) {
      var l = t.alternate;
      return (
        l === null
          ? ((l = oe(t.tag, e, t.key, t.mode)),
            (l.elementType = t.elementType),
            (l.type = t.type),
            (l.stateNode = t.stateNode),
            (l.alternate = t),
            (t.alternate = l))
          : ((l.pendingProps = e),
            (l.type = t.type),
            (l.flags = 0),
            (l.subtreeFlags = 0),
            (l.deletions = null)),
        (l.flags = t.flags & 65011712),
        (l.childLanes = t.childLanes),
        (l.lanes = t.lanes),
        (l.child = t.child),
        (l.memoizedProps = t.memoizedProps),
        (l.memoizedState = t.memoizedState),
        (l.updateQueue = t.updateQueue),
        (e = t.dependencies),
        (l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
        (l.sibling = t.sibling),
        (l.index = t.index),
        (l.ref = t.ref),
        (l.refCleanup = t.refCleanup),
        l
      );
    }
    function Mo(t, e) {
      t.flags &= 65011714;
      var l = t.alternate;
      return (
        l === null
          ? ((t.childLanes = 0),
            (t.lanes = e),
            (t.child = null),
            (t.subtreeFlags = 0),
            (t.memoizedProps = null),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.dependencies = null),
            (t.stateNode = null))
          : ((t.childLanes = l.childLanes),
            (t.lanes = l.lanes),
            (t.child = l.child),
            (t.subtreeFlags = 0),
            (t.deletions = null),
            (t.memoizedProps = l.memoizedProps),
            (t.memoizedState = l.memoizedState),
            (t.updateQueue = l.updateQueue),
            (t.type = l.type),
            (e = l.dependencies),
            (t.dependencies =
              e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
        t
      );
    }
    function tn(t, e, l, a, u, n) {
      var c = 0;
      if (((a = t), typeof t == 'function')) Pi(t) && (c = 1);
      else if (typeof t == 'string')
        c = pv(t, l, Q.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
      else
        t: switch (t) {
          case Jt:
            return (t = oe(31, l, e, u)), (t.elementType = Jt), (t.lanes = n), t;
          case Z:
            return Ql(l.children, u, n, e);
          case at:
            (c = 8), (u |= 24);
            break;
          case rt:
            return (t = oe(12, l, e, u | 2)), (t.elementType = rt), (t.lanes = n), t;
          case jt:
            return (t = oe(13, l, e, u)), (t.elementType = jt), (t.lanes = n), t;
          case Qt:
            return (t = oe(19, l, e, u)), (t.elementType = Qt), (t.lanes = n), t;
          default:
            if (typeof t == 'object' && t !== null)
              switch (t.$$typeof) {
                case St:
                  c = 10;
                  break t;
                case Ct:
                  c = 9;
                  break t;
                case Dt:
                  c = 11;
                  break t;
                case V:
                  c = 14;
                  break t;
                case vt:
                  (c = 16), (a = null);
                  break t;
              }
            (c = 29), (l = Error(o(130, t === null ? 'null' : typeof t, ''))), (a = null);
        }
      return (e = oe(c, l, e, u)), (e.elementType = t), (e.type = a), (e.lanes = n), e;
    }
    function Ql(t, e, l, a) {
      return (t = oe(7, t, a, e)), (t.lanes = l), t;
    }
    function tc(t, e, l) {
      return (t = oe(6, t, null, e)), (t.lanes = l), t;
    }
    function _o(t) {
      var e = oe(18, null, null, 0);
      return (e.stateNode = t), e;
    }
    function ec(t, e, l) {
      return (
        (e = oe(4, t.children !== null ? t.children : [], t.key, e)),
        (e.lanes = l),
        (e.stateNode = {
          containerInfo: t.containerInfo,
          pendingChildren: null,
          implementation: t.implementation,
        }),
        e
      );
    }
    var Co = new WeakMap();
    function be(t, e) {
      if (typeof t == 'object' && t !== null) {
        var l = Co.get(t);
        return l !== void 0 ? l : ((e = { value: t, source: e, stack: Ms(e) }), Co.set(t, e), e);
      }
      return { value: t, source: e, stack: Ms(e) };
    }
    var oa = [],
      ra = 0,
      en = null,
      Ia = 0,
      Ee = [],
      Te = 0,
      ul = null,
      Ue = 1,
      xe = '';
    function Ye(t, e) {
      (oa[ra++] = Ia), (oa[ra++] = en), (en = t), (Ia = e);
    }
    function Do(t, e, l) {
      (Ee[Te++] = Ue), (Ee[Te++] = xe), (Ee[Te++] = ul), (ul = t);
      var a = Ue;
      t = xe;
      var u = 32 - fe(a) - 1;
      (a &= ~(1 << u)), (l += 1);
      var n = 32 - fe(e) + u;
      if (30 < n) {
        var c = u - (u % 5);
        (n = (a & ((1 << c) - 1)).toString(32)),
          (a >>= c),
          (u -= c),
          (Ue = (1 << (32 - fe(e) + u)) | (l << u) | a),
          (xe = n + t);
      } else (Ue = (1 << n) | (l << u) | a), (xe = t);
    }
    function lc(t) {
      t.return !== null && (Ye(t, 1), Do(t, 1, 0));
    }
    function ac(t) {
      for (; t === en; ) (en = oa[--ra]), (oa[ra] = null), (Ia = oa[--ra]), (oa[ra] = null);
      for (; t === ul; )
        (ul = Ee[--Te]),
          (Ee[Te] = null),
          (xe = Ee[--Te]),
          (Ee[Te] = null),
          (Ue = Ee[--Te]),
          (Ee[Te] = null);
    }
    function Ro(t, e) {
      (Ee[Te++] = Ue), (Ee[Te++] = xe), (Ee[Te++] = ul), (Ue = e.id), (xe = e.overflow), (ul = t);
    }
    var Lt = null,
      bt = null,
      et = !1,
      nl = null,
      Ae = !1,
      uc = Error(o(519));
    function il(t) {
      var e = Error(
        o(
          418,
          1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML',
          '',
        ),
      );
      throw (Pa(be(e, t)), uc);
    }
    function Uo(t) {
      var e = t.stateNode,
        l = t.type,
        a = t.memoizedProps;
      switch (((e[Yt] = t), (e[It] = a), l)) {
        case 'dialog':
          $('cancel', e), $('close', e);
          break;
        case 'iframe':
        case 'object':
        case 'embed':
          $('load', e);
          break;
        case 'video':
        case 'audio':
          for (l = 0; l < Eu.length; l++) $(Eu[l], e);
          break;
        case 'source':
          $('error', e);
          break;
        case 'img':
        case 'image':
        case 'link':
          $('error', e), $('load', e);
          break;
        case 'details':
          $('toggle', e);
          break;
        case 'input':
          $('invalid', e),
            Zs(e, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0);
          break;
        case 'select':
          $('invalid', e);
          break;
        case 'textarea':
          $('invalid', e), Ks(e, a.value, a.defaultValue, a.children);
      }
      (l = a.children),
        (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
        e.textContent === '' + l ||
        a.suppressHydrationWarning === !0 ||
        Fh(e.textContent, l)
          ? (a.popover != null && ($('beforetoggle', e), $('toggle', e)),
            a.onScroll != null && $('scroll', e),
            a.onScrollEnd != null && $('scrollend', e),
            a.onClick != null && (e.onclick = Qe),
            (e = !0))
          : (e = !1),
        e || il(t, !0);
    }
    function xo(t) {
      for (Lt = t.return; Lt; )
        switch (Lt.tag) {
          case 5:
          case 31:
          case 13:
            Ae = !1;
            return;
          case 27:
          case 3:
            Ae = !0;
            return;
          default:
            Lt = Lt.return;
        }
    }
    function ha(t) {
      if (t !== Lt) return !1;
      if (!et) return xo(t), (et = !0), !1;
      var e = t.tag,
        l;
      if (
        ((l = e !== 3 && e !== 27) &&
          ((l = e === 5) &&
            ((l = t.type), (l = !(l !== 'form' && l !== 'button') || Af(t.type, t.memoizedProps))),
          (l = !l)),
        l && bt && il(t),
        xo(t),
        e === 13)
      ) {
        if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
          throw Error(o(317));
        bt = ad(t);
      } else if (e === 31) {
        if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
          throw Error(o(317));
        bt = ad(t);
      } else
        e === 27
          ? ((e = bt), bl(t.type) ? ((t = Cf), (Cf = null), (bt = t)) : (bt = e))
          : (bt = Lt ? ze(t.stateNode.nextSibling) : null);
      return !0;
    }
    function Bl() {
      (bt = Lt = null), (et = !1);
    }
    function nc() {
      var t = nl;
      return t !== null && (ae === null ? (ae = t) : ae.push.apply(ae, t), (nl = null)), t;
    }
    function Pa(t) {
      nl === null ? (nl = [t]) : nl.push(t);
    }
    var ic = y(null),
      Gl = null,
      Le = null;
    function cl(t, e, l) {
      N(ic, e._currentValue), (e._currentValue = l);
    }
    function Xe(t) {
      (t._currentValue = ic.current), C(ic);
    }
    function cc(t, e, l) {
      for (; t !== null; ) {
        var a = t.alternate;
        if (
          ((t.childLanes & e) !== e
            ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
            : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
          t === l)
        )
          break;
        t = t.return;
      }
    }
    function fc(t, e, l, a) {
      var u = t.child;
      for (u !== null && (u.return = t); u !== null; ) {
        var n = u.dependencies;
        if (n !== null) {
          var c = u.child;
          n = n.firstContext;
          t: for (; n !== null; ) {
            var s = n;
            n = u;
            for (var h = 0; h < e.length; h++)
              if (s.context === e[h]) {
                (n.lanes |= l),
                  (s = n.alternate),
                  s !== null && (s.lanes |= l),
                  cc(n.return, l, t),
                  a || (c = null);
                break t;
              }
            n = s.next;
          }
        } else if (u.tag === 18) {
          if (((c = u.return), c === null)) throw Error(o(341));
          (c.lanes |= l), (n = c.alternate), n !== null && (n.lanes |= l), cc(c, l, t), (c = null);
        } else c = u.child;
        if (c !== null) c.return = u;
        else
          for (c = u; c !== null; ) {
            if (c === t) {
              c = null;
              break;
            }
            if (((u = c.sibling), u !== null)) {
              (u.return = c.return), (c = u);
              break;
            }
            c = c.return;
          }
        u = c;
      }
    }
    function da(t, e, l, a) {
      t = null;
      for (var u = e, n = !1; u !== null; ) {
        if (!n) {
          if ((u.flags & 524288) !== 0) n = !0;
          else if ((u.flags & 262144) !== 0) break;
        }
        if (u.tag === 10) {
          var c = u.alternate;
          if (c === null) throw Error(o(387));
          if (((c = c.memoizedProps), c !== null)) {
            var s = u.type;
            se(u.pendingProps.value, c.value) || (t !== null ? t.push(s) : (t = [s]));
          }
        } else if (u === ct.current) {
          if (((c = u.alternate), c === null)) throw Error(o(387));
          c.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
            (t !== null ? t.push(Mu) : (t = [Mu]));
        }
        u = u.return;
      }
      t !== null && fc(e, t, l, a), (e.flags |= 262144);
    }
    function ln(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!se(t.context._currentValue, t.memoizedValue)) return !0;
        t = t.next;
      }
      return !1;
    }
    function Yl(t) {
      (Gl = t), (Le = null), (t = t.dependencies), t !== null && (t.firstContext = null);
    }
    function Xt(t) {
      return Ho(Gl, t);
    }
    function an(t, e) {
      return Gl === null && Yl(t), Ho(t, e);
    }
    function Ho(t, e) {
      var l = e._currentValue;
      if (((e = { context: e, memoizedValue: l, next: null }), Le === null)) {
        if (t === null) throw Error(o(308));
        (Le = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288);
      } else Le = Le.next = e;
      return l;
    }
    var ym =
        typeof AbortController < 'u'
          ? AbortController
          : function () {
              var t = [],
                e = (this.signal = {
                  aborted: !1,
                  addEventListener: function (l, a) {
                    t.push(a);
                  },
                });
              this.abort = function () {
                (e.aborted = !0),
                  t.forEach(function (l) {
                    return l();
                  });
              };
            },
      mm = i.unstable_scheduleCallback,
      vm = i.unstable_NormalPriority,
      Rt = {
        $$typeof: St,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function sc() {
      return { controller: new ym(), data: new Map(), refCount: 0 };
    }
    function tu(t) {
      t.refCount--,
        t.refCount === 0 &&
          mm(vm, function () {
            t.controller.abort();
          });
    }
    var eu = null,
      oc = 0,
      ya = 0,
      ma = null;
    function gm(t, e) {
      if (eu === null) {
        var l = (eu = []);
        (oc = 0),
          (ya = yf()),
          (ma = {
            status: 'pending',
            value: void 0,
            then: function (a) {
              l.push(a);
            },
          });
      }
      return oc++, e.then(No, No), e;
    }
    function No() {
      if (--oc === 0 && eu !== null) {
        ma !== null && (ma.status = 'fulfilled');
        var t = eu;
        (eu = null), (ya = 0), (ma = null);
        for (var e = 0; e < t.length; e++) (0, t[e])();
      }
    }
    function pm(t, e) {
      var l = [],
        a = {
          status: 'pending',
          value: null,
          reason: null,
          then: function (u) {
            l.push(u);
          },
        };
      return (
        t.then(
          function () {
            (a.status = 'fulfilled'), (a.value = e);
            for (var u = 0; u < l.length; u++) (0, l[u])(e);
          },
          function (u) {
            for (a.status = 'rejected', a.reason = u, u = 0; u < l.length; u++) (0, l[u])(void 0);
          },
        ),
        a
      );
    }
    var qo = O.S;
    O.S = function (t, e) {
      (ph = ie()),
        typeof e == 'object' && e !== null && typeof e.then == 'function' && gm(t, e),
        qo !== null && qo(t, e);
    };
    var Ll = y(null);
    function rc() {
      var t = Ll.current;
      return t !== null ? t : pt.pooledCache;
    }
    function un(t, e) {
      e === null ? N(Ll, Ll.current) : N(Ll, e.pool);
    }
    function jo() {
      var t = rc();
      return t === null ? null : { parent: Rt._currentValue, pool: t };
    }
    var va = Error(o(460)),
      hc = Error(o(474)),
      nn = Error(o(542)),
      cn = { then: function () {} };
    function Qo(t) {
      return (t = t.status), t === 'fulfilled' || t === 'rejected';
    }
    function Bo(t, e, l) {
      switch (
        ((l = t[l]), l === void 0 ? t.push(e) : l !== e && (e.then(Qe, Qe), (e = l)), e.status)
      ) {
        case 'fulfilled':
          return e.value;
        case 'rejected':
          throw ((t = e.reason), Yo(t), t);
        default:
          if (typeof e.status == 'string') e.then(Qe, Qe);
          else {
            if (((t = pt), t !== null && 100 < t.shellSuspendCounter)) throw Error(o(482));
            (t = e),
              (t.status = 'pending'),
              t.then(
                function (a) {
                  if (e.status === 'pending') {
                    var u = e;
                    (u.status = 'fulfilled'), (u.value = a);
                  }
                },
                function (a) {
                  if (e.status === 'pending') {
                    var u = e;
                    (u.status = 'rejected'), (u.reason = a);
                  }
                },
              );
          }
          switch (e.status) {
            case 'fulfilled':
              return e.value;
            case 'rejected':
              throw ((t = e.reason), Yo(t), t);
          }
          throw ((Zl = e), va);
      }
    }
    function Xl(t) {
      try {
        var e = t._init;
        return e(t._payload);
      } catch (l) {
        throw l !== null && typeof l == 'object' && typeof l.then == 'function'
          ? ((Zl = l), va)
          : l;
      }
    }
    var Zl = null;
    function Go() {
      if (Zl === null) throw Error(o(459));
      var t = Zl;
      return (Zl = null), t;
    }
    function Yo(t) {
      if (t === va || t === nn) throw Error(o(483));
    }
    var ga = null,
      lu = 0;
    function fn(t) {
      var e = lu;
      return (lu += 1), ga === null && (ga = []), Bo(ga, t, e);
    }
    function au(t, e) {
      (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
    }
    function sn(t, e) {
      throw e.$$typeof === q
        ? Error(o(525))
        : ((t = Object.prototype.toString.call(e)),
          Error(
            o(
              31,
              t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t,
            ),
          ));
    }
    function Lo(t) {
      function e(m, d) {
        if (t) {
          var v = m.deletions;
          v === null ? ((m.deletions = [d]), (m.flags |= 16)) : v.push(d);
        }
      }
      function l(m, d) {
        if (!t) return null;
        for (; d !== null; ) e(m, d), (d = d.sibling);
        return null;
      }
      function a(m) {
        for (var d = new Map(); m !== null; )
          m.key !== null ? d.set(m.key, m) : d.set(m.index, m), (m = m.sibling);
        return d;
      }
      function u(m, d) {
        return (m = Ge(m, d)), (m.index = 0), (m.sibling = null), m;
      }
      function n(m, d, v) {
        return (
          (m.index = v),
          t
            ? ((v = m.alternate),
              v !== null
                ? ((v = v.index), v < d ? ((m.flags |= 67108866), d) : v)
                : ((m.flags |= 67108866), d))
            : ((m.flags |= 1048576), d)
        );
      }
      function c(m) {
        return t && m.alternate === null && (m.flags |= 67108866), m;
      }
      function s(m, d, v, z) {
        return d === null || d.tag !== 6
          ? ((d = tc(v, m.mode, z)), (d.return = m), d)
          : ((d = u(d, v)), (d.return = m), d);
      }
      function h(m, d, v, z) {
        var Y = v.type;
        return Y === Z
          ? A(m, d, v.props.children, z, v.key)
          : d !== null &&
            (d.elementType === Y ||
              (typeof Y == 'object' && Y !== null && Y.$$typeof === vt && Xl(Y) === d.type))
          ? ((d = u(d, v.props)), au(d, v), (d.return = m), d)
          : ((d = tn(v.type, v.key, v.props, null, m.mode, z)), au(d, v), (d.return = m), d);
      }
      function p(m, d, v, z) {
        return d === null ||
          d.tag !== 4 ||
          d.stateNode.containerInfo !== v.containerInfo ||
          d.stateNode.implementation !== v.implementation
          ? ((d = ec(v, m.mode, z)), (d.return = m), d)
          : ((d = u(d, v.children || [])), (d.return = m), d);
      }
      function A(m, d, v, z, Y) {
        return d === null || d.tag !== 7
          ? ((d = Ql(v, m.mode, z, Y)), (d.return = m), d)
          : ((d = u(d, v)), (d.return = m), d);
      }
      function _(m, d, v) {
        if ((typeof d == 'string' && d !== '') || typeof d == 'number' || typeof d == 'bigint')
          return (d = tc('' + d, m.mode, v)), (d.return = m), d;
        if (typeof d == 'object' && d !== null) {
          switch (d.$$typeof) {
            case ft:
              return (v = tn(d.type, d.key, d.props, null, m.mode, v)), au(v, d), (v.return = m), v;
            case tt:
              return (d = ec(d, m.mode, v)), (d.return = m), d;
            case vt:
              return (d = Xl(d)), _(m, d, v);
          }
          if (_e(d) || $t(d)) return (d = Ql(d, m.mode, v, null)), (d.return = m), d;
          if (typeof d.then == 'function') return _(m, fn(d), v);
          if (d.$$typeof === St) return _(m, an(m, d), v);
          sn(m, d);
        }
        return null;
      }
      function S(m, d, v, z) {
        var Y = d !== null ? d.key : null;
        if ((typeof v == 'string' && v !== '') || typeof v == 'number' || typeof v == 'bigint')
          return Y !== null ? null : s(m, d, '' + v, z);
        if (typeof v == 'object' && v !== null) {
          switch (v.$$typeof) {
            case ft:
              return v.key === Y ? h(m, d, v, z) : null;
            case tt:
              return v.key === Y ? p(m, d, v, z) : null;
            case vt:
              return (v = Xl(v)), S(m, d, v, z);
          }
          if (_e(v) || $t(v)) return Y !== null ? null : A(m, d, v, z, null);
          if (typeof v.then == 'function') return S(m, d, fn(v), z);
          if (v.$$typeof === St) return S(m, d, an(m, v), z);
          sn(m, v);
        }
        return null;
      }
      function E(m, d, v, z, Y) {
        if ((typeof z == 'string' && z !== '') || typeof z == 'number' || typeof z == 'bigint')
          return (m = m.get(v) || null), s(d, m, '' + z, Y);
        if (typeof z == 'object' && z !== null) {
          switch (z.$$typeof) {
            case ft:
              return (m = m.get(z.key === null ? v : z.key) || null), h(d, m, z, Y);
            case tt:
              return (m = m.get(z.key === null ? v : z.key) || null), p(d, m, z, Y);
            case vt:
              return (z = Xl(z)), E(m, d, v, z, Y);
          }
          if (_e(z) || $t(z)) return (m = m.get(v) || null), A(d, m, z, Y, null);
          if (typeof z.then == 'function') return E(m, d, v, fn(z), Y);
          if (z.$$typeof === St) return E(m, d, v, an(d, z), Y);
          sn(d, z);
        }
        return null;
      }
      function j(m, d, v, z) {
        for (
          var Y = null, ut = null, B = d, F = (d = 0), P = null;
          B !== null && F < v.length;
          F++
        ) {
          B.index > F ? ((P = B), (B = null)) : (P = B.sibling);
          var nt = S(m, B, v[F], z);
          if (nt === null) {
            B === null && (B = P);
            break;
          }
          t && B && nt.alternate === null && e(m, B),
            (d = n(nt, d, F)),
            ut === null ? (Y = nt) : (ut.sibling = nt),
            (ut = nt),
            (B = P);
        }
        if (F === v.length) return l(m, B), et && Ye(m, F), Y;
        if (B === null) {
          for (; F < v.length; F++)
            (B = _(m, v[F], z)),
              B !== null && ((d = n(B, d, F)), ut === null ? (Y = B) : (ut.sibling = B), (ut = B));
          return et && Ye(m, F), Y;
        }
        for (B = a(B); F < v.length; F++)
          (P = E(B, m, F, v[F], z)),
            P !== null &&
              (t && P.alternate !== null && B.delete(P.key === null ? F : P.key),
              (d = n(P, d, F)),
              ut === null ? (Y = P) : (ut.sibling = P),
              (ut = P));
        return (
          t &&
            B.forEach(function (zl) {
              return e(m, zl);
            }),
          et && Ye(m, F),
          Y
        );
      }
      function L(m, d, v, z) {
        if (v == null) throw Error(o(151));
        for (
          var Y = null, ut = null, B = d, F = (d = 0), P = null, nt = v.next();
          B !== null && !nt.done;
          F++, nt = v.next()
        ) {
          B.index > F ? ((P = B), (B = null)) : (P = B.sibling);
          var zl = S(m, B, nt.value, z);
          if (zl === null) {
            B === null && (B = P);
            break;
          }
          t && B && zl.alternate === null && e(m, B),
            (d = n(zl, d, F)),
            ut === null ? (Y = zl) : (ut.sibling = zl),
            (ut = zl),
            (B = P);
        }
        if (nt.done) return l(m, B), et && Ye(m, F), Y;
        if (B === null) {
          for (; !nt.done; F++, nt = v.next())
            (nt = _(m, nt.value, z)),
              nt !== null &&
                ((d = n(nt, d, F)), ut === null ? (Y = nt) : (ut.sibling = nt), (ut = nt));
          return et && Ye(m, F), Y;
        }
        for (B = a(B); !nt.done; F++, nt = v.next())
          (nt = E(B, m, F, nt.value, z)),
            nt !== null &&
              (t && nt.alternate !== null && B.delete(nt.key === null ? F : nt.key),
              (d = n(nt, d, F)),
              ut === null ? (Y = nt) : (ut.sibling = nt),
              (ut = nt));
        return (
          t &&
            B.forEach(function (Dv) {
              return e(m, Dv);
            }),
          et && Ye(m, F),
          Y
        );
      }
      function mt(m, d, v, z) {
        if (
          (typeof v == 'object' &&
            v !== null &&
            v.type === Z &&
            v.key === null &&
            (v = v.props.children),
          typeof v == 'object' && v !== null)
        ) {
          switch (v.$$typeof) {
            case ft:
              t: {
                for (var Y = v.key; d !== null; ) {
                  if (d.key === Y) {
                    if (((Y = v.type), Y === Z)) {
                      if (d.tag === 7) {
                        l(m, d.sibling), (z = u(d, v.props.children)), (z.return = m), (m = z);
                        break t;
                      }
                    } else if (
                      d.elementType === Y ||
                      (typeof Y == 'object' && Y !== null && Y.$$typeof === vt && Xl(Y) === d.type)
                    ) {
                      l(m, d.sibling), (z = u(d, v.props)), au(z, v), (z.return = m), (m = z);
                      break t;
                    }
                    l(m, d);
                    break;
                  } else e(m, d);
                  d = d.sibling;
                }
                v.type === Z
                  ? ((z = Ql(v.props.children, m.mode, z, v.key)), (z.return = m), (m = z))
                  : ((z = tn(v.type, v.key, v.props, null, m.mode, z)),
                    au(z, v),
                    (z.return = m),
                    (m = z));
              }
              return c(m);
            case tt:
              t: {
                for (Y = v.key; d !== null; ) {
                  if (d.key === Y)
                    if (
                      d.tag === 4 &&
                      d.stateNode.containerInfo === v.containerInfo &&
                      d.stateNode.implementation === v.implementation
                    ) {
                      l(m, d.sibling), (z = u(d, v.children || [])), (z.return = m), (m = z);
                      break t;
                    } else {
                      l(m, d);
                      break;
                    }
                  else e(m, d);
                  d = d.sibling;
                }
                (z = ec(v, m.mode, z)), (z.return = m), (m = z);
              }
              return c(m);
            case vt:
              return (v = Xl(v)), mt(m, d, v, z);
          }
          if (_e(v)) return j(m, d, v, z);
          if ($t(v)) {
            if (((Y = $t(v)), typeof Y != 'function')) throw Error(o(150));
            return (v = Y.call(v)), L(m, d, v, z);
          }
          if (typeof v.then == 'function') return mt(m, d, fn(v), z);
          if (v.$$typeof === St) return mt(m, d, an(m, v), z);
          sn(m, v);
        }
        return (typeof v == 'string' && v !== '') || typeof v == 'number' || typeof v == 'bigint'
          ? ((v = '' + v),
            d !== null && d.tag === 6
              ? (l(m, d.sibling), (z = u(d, v)), (z.return = m), (m = z))
              : (l(m, d), (z = tc(v, m.mode, z)), (z.return = m), (m = z)),
            c(m))
          : l(m, d);
      }
      return function (m, d, v, z) {
        try {
          lu = 0;
          var Y = mt(m, d, v, z);
          return (ga = null), Y;
        } catch (B) {
          if (B === va || B === nn) throw B;
          var ut = oe(29, B, null, m.mode);
          return (ut.lanes = z), (ut.return = m), ut;
        } finally {
        }
      };
    }
    var Vl = Lo(!0),
      Xo = Lo(!1),
      fl = !1;
    function dc(t) {
      t.updateQueue = {
        baseState: t.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function yc(t, e) {
      (t = t.updateQueue),
        e.updateQueue === t &&
          (e.updateQueue = {
            baseState: t.baseState,
            firstBaseUpdate: t.firstBaseUpdate,
            lastBaseUpdate: t.lastBaseUpdate,
            shared: t.shared,
            callbacks: null,
          });
    }
    function sl(t) {
      return { lane: t, tag: 0, payload: null, callback: null, next: null };
    }
    function ol(t, e, l) {
      var a = t.updateQueue;
      if (a === null) return null;
      if (((a = a.shared), (it & 2) !== 0)) {
        var u = a.pending;
        return (
          u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
          (a.pending = e),
          (e = Pu(t)),
          zo(t, null, l),
          e
        );
      }
      return Iu(t, a, e, l), Pu(t);
    }
    function uu(t, e, l) {
      if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
        var a = e.lanes;
        (a &= t.pendingLanes), (l |= a), (e.lanes = l), xs(t, l);
      }
    }
    function mc(t, e) {
      var l = t.updateQueue,
        a = t.alternate;
      if (a !== null && ((a = a.updateQueue), l === a)) {
        var u = null,
          n = null;
        if (((l = l.firstBaseUpdate), l !== null)) {
          do {
            var c = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
            n === null ? (u = n = c) : (n = n.next = c), (l = l.next);
          } while (l !== null);
          n === null ? (u = n = e) : (n = n.next = e);
        } else u = n = e;
        (l = {
          baseState: a.baseState,
          firstBaseUpdate: u,
          lastBaseUpdate: n,
          shared: a.shared,
          callbacks: a.callbacks,
        }),
          (t.updateQueue = l);
        return;
      }
      (t = l.lastBaseUpdate),
        t === null ? (l.firstBaseUpdate = e) : (t.next = e),
        (l.lastBaseUpdate = e);
    }
    var vc = !1;
    function nu() {
      if (vc) {
        var t = ma;
        if (t !== null) throw t;
      }
    }
    function iu(t, e, l, a) {
      vc = !1;
      var u = t.updateQueue;
      fl = !1;
      var n = u.firstBaseUpdate,
        c = u.lastBaseUpdate,
        s = u.shared.pending;
      if (s !== null) {
        u.shared.pending = null;
        var h = s,
          p = h.next;
        (h.next = null), c === null ? (n = p) : (c.next = p), (c = h);
        var A = t.alternate;
        A !== null &&
          ((A = A.updateQueue),
          (s = A.lastBaseUpdate),
          s !== c && (s === null ? (A.firstBaseUpdate = p) : (s.next = p), (A.lastBaseUpdate = h)));
      }
      if (n !== null) {
        var _ = u.baseState;
        (c = 0), (A = p = h = null), (s = n);
        do {
          var S = s.lane & -536870913,
            E = S !== s.lane;
          if (E ? (I & S) === S : (a & S) === S) {
            S !== 0 && S === ya && (vc = !0),
              A !== null &&
                (A = A.next =
                  { lane: 0, tag: s.tag, payload: s.payload, callback: null, next: null });
            t: {
              var j = t,
                L = s;
              S = e;
              var mt = l;
              switch (L.tag) {
                case 1:
                  if (((j = L.payload), typeof j == 'function')) {
                    _ = j.call(mt, _, S);
                    break t;
                  }
                  _ = j;
                  break t;
                case 3:
                  j.flags = (j.flags & -65537) | 128;
                case 0:
                  if (
                    ((j = L.payload),
                    (S = typeof j == 'function' ? j.call(mt, _, S) : j),
                    S == null)
                  )
                    break t;
                  _ = U({}, _, S);
                  break t;
                case 2:
                  fl = !0;
              }
            }
            (S = s.callback),
              S !== null &&
                ((t.flags |= 64),
                E && (t.flags |= 8192),
                (E = u.callbacks),
                E === null ? (u.callbacks = [S]) : E.push(S));
          } else
            (E = { lane: S, tag: s.tag, payload: s.payload, callback: s.callback, next: null }),
              A === null ? ((p = A = E), (h = _)) : (A = A.next = E),
              (c |= S);
          if (((s = s.next), s === null)) {
            if (((s = u.shared.pending), s === null)) break;
            (E = s),
              (s = E.next),
              (E.next = null),
              (u.lastBaseUpdate = E),
              (u.shared.pending = null);
          }
        } while (!0);
        A === null && (h = _),
          (u.baseState = h),
          (u.firstBaseUpdate = p),
          (u.lastBaseUpdate = A),
          n === null && (u.shared.lanes = 0),
          (ml |= c),
          (t.lanes = c),
          (t.memoizedState = _);
      }
    }
    function Zo(t, e) {
      if (typeof t != 'function') throw Error(o(191, t));
      t.call(e);
    }
    function Vo(t, e) {
      var l = t.callbacks;
      if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) Zo(l[t], e);
    }
    var pa = y(null),
      on = y(0);
    function Ko(t, e) {
      (t = $e), N(on, t), N(pa, e), ($e = t | e.baseLanes);
    }
    function gc() {
      N(on, $e), N(pa, pa.current);
    }
    function pc() {
      ($e = on.current), C(pa), C(on);
    }
    var re = y(null),
      Oe = null;
    function rl(t) {
      var e = t.alternate;
      N(Mt, Mt.current & 1),
        N(re, t),
        Oe === null && (e === null || pa.current !== null || e.memoizedState !== null) && (Oe = t);
    }
    function Sc(t) {
      N(Mt, Mt.current), N(re, t), Oe === null && (Oe = t);
    }
    function wo(t) {
      t.tag === 22 ? (N(Mt, Mt.current), N(re, t), Oe === null && (Oe = t)) : hl();
    }
    function hl() {
      N(Mt, Mt.current), N(re, re.current);
    }
    function he(t) {
      C(re), Oe === t && (Oe = null), C(Mt);
    }
    var Mt = y(0);
    function rn(t) {
      for (var e = t; e !== null; ) {
        if (e.tag === 13) {
          var l = e.memoizedState;
          if (l !== null && ((l = l.dehydrated), l === null || Mf(l) || _f(l))) return e;
        } else if (
          e.tag === 19 &&
          (e.memoizedProps.revealOrder === 'forwards' ||
            e.memoizedProps.revealOrder === 'backwards' ||
            e.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
            e.memoizedProps.revealOrder === 'together')
        ) {
          if ((e.flags & 128) !== 0) return e;
        } else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return null;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
      return null;
    }
    var Ze = 0,
      J = null,
      dt = null,
      Ut = null,
      hn = !1,
      Sa = !1,
      Kl = !1,
      dn = 0,
      cu = 0,
      ba = null,
      Sm = 0;
    function At() {
      throw Error(o(321));
    }
    function bc(t, e) {
      if (e === null) return !1;
      for (var l = 0; l < e.length && l < t.length; l++) if (!se(t[l], e[l])) return !1;
      return !0;
    }
    function Ec(t, e, l, a, u, n) {
      return (
        (Ze = n),
        (J = e),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.lanes = 0),
        (O.H = t === null || t.memoizedState === null ? Dr : jc),
        (Kl = !1),
        (n = l(a, u)),
        (Kl = !1),
        Sa && (n = Fo(e, l, a, u)),
        Jo(t),
        n
      );
    }
    function Jo(t) {
      O.H = ou;
      var e = dt !== null && dt.next !== null;
      if (((Ze = 0), (Ut = dt = J = null), (hn = !1), (cu = 0), (ba = null), e))
        throw Error(o(300));
      t === null || xt || ((t = t.dependencies), t !== null && ln(t) && (xt = !0));
    }
    function Fo(t, e, l, a) {
      J = t;
      var u = 0;
      do {
        if ((Sa && (ba = null), (cu = 0), (Sa = !1), 25 <= u)) throw Error(o(301));
        if (((u += 1), (Ut = dt = null), t.updateQueue != null)) {
          var n = t.updateQueue;
          (n.lastEffect = null),
            (n.events = null),
            (n.stores = null),
            n.memoCache != null && (n.memoCache.index = 0);
        }
        (O.H = Rr), (n = e(l, a));
      } while (Sa);
      return n;
    }
    function bm() {
      var t = O.H,
        e = t.useState()[0];
      return (
        (e = typeof e.then == 'function' ? fu(e) : e),
        (t = t.useState()[0]),
        (dt !== null ? dt.memoizedState : null) !== t && (J.flags |= 1024),
        e
      );
    }
    function Tc() {
      var t = dn !== 0;
      return (dn = 0), t;
    }
    function Ac(t, e, l) {
      (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l);
    }
    function Oc(t) {
      if (hn) {
        for (t = t.memoizedState; t !== null; ) {
          var e = t.queue;
          e !== null && (e.pending = null), (t = t.next);
        }
        hn = !1;
      }
      (Ze = 0), (Ut = dt = J = null), (Sa = !1), (cu = dn = 0), (ba = null);
    }
    function kt() {
      var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      return Ut === null ? (J.memoizedState = Ut = t) : (Ut = Ut.next = t), Ut;
    }
    function _t() {
      if (dt === null) {
        var t = J.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = dt.next;
      var e = Ut === null ? J.memoizedState : Ut.next;
      if (e !== null) (Ut = e), (dt = t);
      else {
        if (t === null) throw J.alternate === null ? Error(o(467)) : Error(o(310));
        (dt = t),
          (t = {
            memoizedState: dt.memoizedState,
            baseState: dt.baseState,
            baseQueue: dt.baseQueue,
            queue: dt.queue,
            next: null,
          }),
          Ut === null ? (J.memoizedState = Ut = t) : (Ut = Ut.next = t);
      }
      return Ut;
    }
    function yn() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function fu(t) {
      var e = cu;
      return (
        (cu += 1),
        ba === null && (ba = []),
        (t = Bo(ba, t, e)),
        (e = J),
        (Ut === null ? e.memoizedState : Ut.next) === null &&
          ((e = e.alternate), (O.H = e === null || e.memoizedState === null ? Dr : jc)),
        t
      );
    }
    function mn(t) {
      if (t !== null && typeof t == 'object') {
        if (typeof t.then == 'function') return fu(t);
        if (t.$$typeof === St) return Xt(t);
      }
      throw Error(o(438, String(t)));
    }
    function zc(t) {
      var e = null,
        l = J.updateQueue;
      if ((l !== null && (e = l.memoCache), e == null)) {
        var a = J.alternate;
        a !== null &&
          ((a = a.updateQueue),
          a !== null &&
            ((a = a.memoCache),
            a != null &&
              (e = {
                data: a.data.map(function (u) {
                  return u.slice();
                }),
                index: 0,
              })));
      }
      if (
        (e == null && (e = { data: [], index: 0 }),
        l === null && ((l = yn()), (J.updateQueue = l)),
        (l.memoCache = e),
        (l = e.data[e.index]),
        l === void 0)
      )
        for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = ne;
      return e.index++, l;
    }
    function Ve(t, e) {
      return typeof e == 'function' ? e(t) : e;
    }
    function vn(t) {
      var e = _t();
      return Mc(e, dt, t);
    }
    function Mc(t, e, l) {
      var a = t.queue;
      if (a === null) throw Error(o(311));
      a.lastRenderedReducer = l;
      var u = t.baseQueue,
        n = a.pending;
      if (n !== null) {
        if (u !== null) {
          var c = u.next;
          (u.next = n.next), (n.next = c);
        }
        (e.baseQueue = u = n), (a.pending = null);
      }
      if (((n = t.baseState), u === null)) t.memoizedState = n;
      else {
        e = u.next;
        var s = (c = null),
          h = null,
          p = e,
          A = !1;
        do {
          var _ = p.lane & -536870913;
          if (_ !== p.lane ? (I & _) === _ : (Ze & _) === _) {
            var S = p.revertLane;
            if (S === 0)
              h !== null &&
                (h = h.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: p.action,
                    hasEagerState: p.hasEagerState,
                    eagerState: p.eagerState,
                    next: null,
                  }),
                _ === ya && (A = !0);
            else if ((Ze & S) === S) {
              (p = p.next), S === ya && (A = !0);
              continue;
            } else
              (_ = {
                lane: 0,
                revertLane: p.revertLane,
                gesture: null,
                action: p.action,
                hasEagerState: p.hasEagerState,
                eagerState: p.eagerState,
                next: null,
              }),
                h === null ? ((s = h = _), (c = n)) : (h = h.next = _),
                (J.lanes |= S),
                (ml |= S);
            (_ = p.action), Kl && l(n, _), (n = p.hasEagerState ? p.eagerState : l(n, _));
          } else
            (S = {
              lane: _,
              revertLane: p.revertLane,
              gesture: p.gesture,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null,
            }),
              h === null ? ((s = h = S), (c = n)) : (h = h.next = S),
              (J.lanes |= _),
              (ml |= _);
          p = p.next;
        } while (p !== null && p !== e);
        if (
          (h === null ? (c = n) : (h.next = s),
          !se(n, t.memoizedState) && ((xt = !0), A && ((l = ma), l !== null)))
        )
          throw l;
        (t.memoizedState = n), (t.baseState = c), (t.baseQueue = h), (a.lastRenderedState = n);
      }
      return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
    }
    function _c(t) {
      var e = _t(),
        l = e.queue;
      if (l === null) throw Error(o(311));
      l.lastRenderedReducer = t;
      var a = l.dispatch,
        u = l.pending,
        n = e.memoizedState;
      if (u !== null) {
        l.pending = null;
        var c = (u = u.next);
        do (n = t(n, c.action)), (c = c.next);
        while (c !== u);
        se(n, e.memoizedState) || (xt = !0),
          (e.memoizedState = n),
          e.baseQueue === null && (e.baseState = n),
          (l.lastRenderedState = n);
      }
      return [n, a];
    }
    function Wo(t, e, l) {
      var a = J,
        u = _t(),
        n = et;
      if (n) {
        if (l === void 0) throw Error(o(407));
        l = l();
      } else l = e();
      var c = !se((dt || u).memoizedState, l);
      if (
        (c && ((u.memoizedState = l), (xt = !0)),
        (u = u.queue),
        Rc(Io.bind(null, a, u, t), [t]),
        u.getSnapshot !== e || c || (Ut !== null && Ut.memoizedState.tag & 1))
      ) {
        if (
          ((a.flags |= 2048),
          Ea(9, { destroy: void 0 }, $o.bind(null, a, u, l, e), null),
          pt === null)
        )
          throw Error(o(349));
        n || (Ze & 127) !== 0 || ko(a, e, l);
      }
      return l;
    }
    function ko(t, e, l) {
      (t.flags |= 16384),
        (t = { getSnapshot: e, value: l }),
        (e = J.updateQueue),
        e === null
          ? ((e = yn()), (J.updateQueue = e), (e.stores = [t]))
          : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t));
    }
    function $o(t, e, l, a) {
      (e.value = l), (e.getSnapshot = a), Po(e) && tr(t);
    }
    function Io(t, e, l) {
      return l(function () {
        Po(e) && tr(t);
      });
    }
    function Po(t) {
      var e = t.getSnapshot;
      t = t.value;
      try {
        var l = e();
        return !se(t, l);
      } catch {
        return !0;
      }
    }
    function tr(t) {
      var e = jl(t, 2);
      e !== null && ue(e, t, 2);
    }
    function Cc(t) {
      var e = kt();
      if (typeof t == 'function') {
        var l = t;
        if (((t = l()), Kl)) {
          el(!0);
          try {
            l();
          } finally {
            el(!1);
          }
        }
      }
      return (
        (e.memoizedState = e.baseState = t),
        (e.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ve,
          lastRenderedState: t,
        }),
        e
      );
    }
    function er(t, e, l, a) {
      return (t.baseState = l), Mc(t, dt, typeof a == 'function' ? a : Ve);
    }
    function Em(t, e, l, a, u) {
      if (Sn(t)) throw Error(o(485));
      if (((t = e.action), t !== null)) {
        var n = {
          payload: u,
          action: t,
          next: null,
          isTransition: !0,
          status: 'pending',
          value: null,
          reason: null,
          listeners: [],
          then: function (c) {
            n.listeners.push(c);
          },
        };
        O.T !== null ? l(!0) : (n.isTransition = !1),
          a(n),
          (l = e.pending),
          l === null
            ? ((n.next = e.pending = n), lr(e, n))
            : ((n.next = l.next), (e.pending = l.next = n));
      }
    }
    function lr(t, e) {
      var l = e.action,
        a = e.payload,
        u = t.state;
      if (e.isTransition) {
        var n = O.T,
          c = {};
        O.T = c;
        try {
          var s = l(u, a),
            h = O.S;
          h !== null && h(c, s), ar(t, e, s);
        } catch (p) {
          Dc(t, e, p);
        } finally {
          n !== null && c.types !== null && (n.types = c.types), (O.T = n);
        }
      } else
        try {
          (n = l(u, a)), ar(t, e, n);
        } catch (p) {
          Dc(t, e, p);
        }
    }
    function ar(t, e, l) {
      l !== null && typeof l == 'object' && typeof l.then == 'function'
        ? l.then(
            function (a) {
              ur(t, e, a);
            },
            function (a) {
              return Dc(t, e, a);
            },
          )
        : ur(t, e, l);
    }
    function ur(t, e, l) {
      (e.status = 'fulfilled'),
        (e.value = l),
        nr(e),
        (t.state = l),
        (e = t.pending),
        e !== null &&
          ((l = e.next), l === e ? (t.pending = null) : ((l = l.next), (e.next = l), lr(t, l)));
    }
    function Dc(t, e, l) {
      var a = t.pending;
      if (((t.pending = null), a !== null)) {
        a = a.next;
        do (e.status = 'rejected'), (e.reason = l), nr(e), (e = e.next);
        while (e !== a);
      }
      t.action = null;
    }
    function nr(t) {
      t = t.listeners;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
    function ir(t, e) {
      return e;
    }
    function cr(t, e) {
      if (et) {
        var l = pt.formState;
        if (l !== null) {
          t: {
            var a = J;
            if (et) {
              if (bt) {
                e: {
                  for (var u = bt, n = Ae; u.nodeType !== 8; ) {
                    if (!n) {
                      u = null;
                      break e;
                    }
                    if (((u = ze(u.nextSibling)), u === null)) {
                      u = null;
                      break e;
                    }
                  }
                  (n = u.data), (u = n === 'F!' || n === 'F' ? u : null);
                }
                if (u) {
                  (bt = ze(u.nextSibling)), (a = u.data === 'F!');
                  break t;
                }
              }
              il(a);
            }
            a = !1;
          }
          a && (e = l[0]);
        }
      }
      return (
        (l = kt()),
        (l.memoizedState = l.baseState = e),
        (a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ir,
          lastRenderedState: e,
        }),
        (l.queue = a),
        (l = Mr.bind(null, J, a)),
        (a.dispatch = l),
        (a = Cc(!1)),
        (n = qc.bind(null, J, !1, a.queue)),
        (a = kt()),
        (u = { state: e, dispatch: null, action: t, pending: null }),
        (a.queue = u),
        (l = Em.bind(null, J, u, n, l)),
        (u.dispatch = l),
        (a.memoizedState = t),
        [e, l, !1]
      );
    }
    function fr(t) {
      var e = _t();
      return sr(e, dt, t);
    }
    function sr(t, e, l) {
      if (
        ((e = Mc(t, e, ir)[0]),
        (t = vn(Ve)[0]),
        typeof e == 'object' && e !== null && typeof e.then == 'function')
      )
        try {
          var a = fu(e);
        } catch (c) {
          throw c === va ? nn : c;
        }
      else a = e;
      e = _t();
      var u = e.queue,
        n = u.dispatch;
      return (
        l !== e.memoizedState &&
          ((J.flags |= 2048), Ea(9, { destroy: void 0 }, Tm.bind(null, u, l), null)),
        [a, n, t]
      );
    }
    function Tm(t, e) {
      t.action = e;
    }
    function or(t) {
      var e = _t(),
        l = dt;
      if (l !== null) return sr(e, l, t);
      _t(), (e = e.memoizedState), (l = _t());
      var a = l.queue.dispatch;
      return (l.memoizedState = t), [e, a, !1];
    }
    function Ea(t, e, l, a) {
      return (
        (t = { tag: t, create: l, deps: a, inst: e, next: null }),
        (e = J.updateQueue),
        e === null && ((e = yn()), (J.updateQueue = e)),
        (l = e.lastEffect),
        l === null
          ? (e.lastEffect = t.next = t)
          : ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
        t
      );
    }
    function rr() {
      return _t().memoizedState;
    }
    function gn(t, e, l, a) {
      var u = kt();
      (J.flags |= t),
        (u.memoizedState = Ea(1 | e, { destroy: void 0 }, l, a === void 0 ? null : a));
    }
    function pn(t, e, l, a) {
      var u = _t();
      a = a === void 0 ? null : a;
      var n = u.memoizedState.inst;
      dt !== null && a !== null && bc(a, dt.memoizedState.deps)
        ? (u.memoizedState = Ea(e, n, l, a))
        : ((J.flags |= t), (u.memoizedState = Ea(1 | e, n, l, a)));
    }
    function hr(t, e) {
      gn(8390656, 8, t, e);
    }
    function Rc(t, e) {
      pn(2048, 8, t, e);
    }
    function Am(t) {
      J.flags |= 4;
      var e = J.updateQueue;
      if (e === null) (e = yn()), (J.updateQueue = e), (e.events = [t]);
      else {
        var l = e.events;
        l === null ? (e.events = [t]) : l.push(t);
      }
    }
    function dr(t) {
      var e = _t().memoizedState;
      return (
        Am({ ref: e, nextImpl: t }),
        function () {
          if ((it & 2) !== 0) throw Error(o(440));
          return e.impl.apply(void 0, arguments);
        }
      );
    }
    function yr(t, e) {
      return pn(4, 2, t, e);
    }
    function mr(t, e) {
      return pn(4, 4, t, e);
    }
    function vr(t, e) {
      if (typeof e == 'function') {
        t = t();
        var l = e(t);
        return function () {
          typeof l == 'function' ? l() : e(null);
        };
      }
      if (e != null)
        return (
          (t = t()),
          (e.current = t),
          function () {
            e.current = null;
          }
        );
    }
    function gr(t, e, l) {
      (l = l != null ? l.concat([t]) : null), pn(4, 4, vr.bind(null, e, t), l);
    }
    function Uc() {}
    function pr(t, e) {
      var l = _t();
      e = e === void 0 ? null : e;
      var a = l.memoizedState;
      return e !== null && bc(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
    }
    function Sr(t, e) {
      var l = _t();
      e = e === void 0 ? null : e;
      var a = l.memoizedState;
      if (e !== null && bc(e, a[1])) return a[0];
      if (((a = t()), Kl)) {
        el(!0);
        try {
          t();
        } finally {
          el(!1);
        }
      }
      return (l.memoizedState = [a, e]), a;
    }
    function xc(t, e, l) {
      return l === void 0 || ((Ze & 1073741824) !== 0 && (I & 261930) === 0)
        ? (t.memoizedState = e)
        : ((t.memoizedState = l), (t = bh()), (J.lanes |= t), (ml |= t), l);
    }
    function br(t, e, l, a) {
      return se(l, e)
        ? l
        : pa.current !== null
        ? ((t = xc(t, l, a)), se(t, e) || (xt = !0), t)
        : (Ze & 42) === 0 || ((Ze & 1073741824) !== 0 && (I & 261930) === 0)
        ? ((xt = !0), (t.memoizedState = l))
        : ((t = bh()), (J.lanes |= t), (ml |= t), e);
    }
    function Er(t, e, l, a, u) {
      var n = H.p;
      H.p = n !== 0 && 8 > n ? n : 8;
      var c = O.T,
        s = {};
      (O.T = s), qc(t, !1, e, l);
      try {
        var h = u(),
          p = O.S;
        if (
          (p !== null && p(s, h), h !== null && typeof h == 'object' && typeof h.then == 'function')
        ) {
          var A = pm(h, a);
          su(t, e, A, me(t));
        } else su(t, e, a, me(t));
      } catch (_) {
        su(t, e, { then: function () {}, status: 'rejected', reason: _ }, me());
      } finally {
        (H.p = n), c !== null && s.types !== null && (c.types = s.types), (O.T = c);
      }
    }
    function Om() {}
    function Hc(t, e, l, a) {
      if (t.tag !== 5) throw Error(o(476));
      var u = Tr(t).queue;
      Er(
        t,
        u,
        e,
        X,
        l === null
          ? Om
          : function () {
              return Ar(t), l(a);
            },
      );
    }
    function Tr(t) {
      var e = t.memoizedState;
      if (e !== null) return e;
      e = {
        memoizedState: X,
        baseState: X,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ve,
          lastRenderedState: X,
        },
        next: null,
      };
      var l = {};
      return (
        (e.next = {
          memoizedState: l,
          baseState: l,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Ve,
            lastRenderedState: l,
          },
          next: null,
        }),
        (t.memoizedState = e),
        (t = t.alternate),
        t !== null && (t.memoizedState = e),
        e
      );
    }
    function Ar(t) {
      var e = Tr(t);
      e.next === null && (e = t.alternate.memoizedState), su(t, e.next.queue, {}, me());
    }
    function Nc() {
      return Xt(Mu);
    }
    function Or() {
      return _t().memoizedState;
    }
    function zr() {
      return _t().memoizedState;
    }
    function zm(t) {
      for (var e = t.return; e !== null; ) {
        switch (e.tag) {
          case 24:
          case 3:
            var l = me();
            t = sl(l);
            var a = ol(e, t, l);
            a !== null && (ue(a, e, l), uu(a, e, l)), (e = { cache: sc() }), (t.payload = e);
            return;
        }
        e = e.return;
      }
    }
    function Mm(t, e, l) {
      var a = me();
      (l = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        Sn(t) ? _r(e, l) : ((l = Ii(t, e, l, a)), l !== null && (ue(l, t, a), Cr(l, e, a)));
    }
    function Mr(t, e, l) {
      var a = me();
      su(t, e, l, a);
    }
    function su(t, e, l, a) {
      var u = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (Sn(t)) _r(e, u);
      else {
        var n = t.alternate;
        if (
          t.lanes === 0 &&
          (n === null || n.lanes === 0) &&
          ((n = e.lastRenderedReducer), n !== null)
        )
          try {
            var c = e.lastRenderedState,
              s = n(c, l);
            if (((u.hasEagerState = !0), (u.eagerState = s), se(s, c)))
              return Iu(t, e, u, 0), pt === null && $u(), !1;
          } catch {
          } finally {
          }
        if (((l = Ii(t, e, u, a)), l !== null)) return ue(l, t, a), Cr(l, e, a), !0;
      }
      return !1;
    }
    function qc(t, e, l, a) {
      if (
        ((a = {
          lane: 2,
          revertLane: yf(),
          gesture: null,
          action: a,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Sn(t))
      ) {
        if (e) throw Error(o(479));
      } else (e = Ii(t, l, a, 2)), e !== null && ue(e, t, 2);
    }
    function Sn(t) {
      var e = t.alternate;
      return t === J || (e !== null && e === J);
    }
    function _r(t, e) {
      Sa = hn = !0;
      var l = t.pending;
      l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e);
    }
    function Cr(t, e, l) {
      if ((l & 4194048) !== 0) {
        var a = e.lanes;
        (a &= t.pendingLanes), (l |= a), (e.lanes = l), xs(t, l);
      }
    }
    var ou = {
      readContext: Xt,
      use: mn,
      useCallback: At,
      useContext: At,
      useEffect: At,
      useImperativeHandle: At,
      useLayoutEffect: At,
      useInsertionEffect: At,
      useMemo: At,
      useReducer: At,
      useRef: At,
      useState: At,
      useDebugValue: At,
      useDeferredValue: At,
      useTransition: At,
      useSyncExternalStore: At,
      useId: At,
      useHostTransitionStatus: At,
      useFormState: At,
      useActionState: At,
      useOptimistic: At,
      useMemoCache: At,
      useCacheRefresh: At,
    };
    ou.useEffectEvent = At;
    var Dr = {
        readContext: Xt,
        use: mn,
        useCallback: function (t, e) {
          return (kt().memoizedState = [t, e === void 0 ? null : e]), t;
        },
        useContext: Xt,
        useEffect: hr,
        useImperativeHandle: function (t, e, l) {
          (l = l != null ? l.concat([t]) : null), gn(4194308, 4, vr.bind(null, e, t), l);
        },
        useLayoutEffect: function (t, e) {
          return gn(4194308, 4, t, e);
        },
        useInsertionEffect: function (t, e) {
          gn(4, 2, t, e);
        },
        useMemo: function (t, e) {
          var l = kt();
          e = e === void 0 ? null : e;
          var a = t();
          if (Kl) {
            el(!0);
            try {
              t();
            } finally {
              el(!1);
            }
          }
          return (l.memoizedState = [a, e]), a;
        },
        useReducer: function (t, e, l) {
          var a = kt();
          if (l !== void 0) {
            var u = l(e);
            if (Kl) {
              el(!0);
              try {
                l(e);
              } finally {
                el(!1);
              }
            }
          } else u = e;
          return (
            (a.memoizedState = a.baseState = u),
            (t = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: t,
              lastRenderedState: u,
            }),
            (a.queue = t),
            (t = t.dispatch = Mm.bind(null, J, t)),
            [a.memoizedState, t]
          );
        },
        useRef: function (t) {
          var e = kt();
          return (t = { current: t }), (e.memoizedState = t);
        },
        useState: function (t) {
          t = Cc(t);
          var e = t.queue,
            l = Mr.bind(null, J, e);
          return (e.dispatch = l), [t.memoizedState, l];
        },
        useDebugValue: Uc,
        useDeferredValue: function (t, e) {
          var l = kt();
          return xc(l, t, e);
        },
        useTransition: function () {
          var t = Cc(!1);
          return (t = Er.bind(null, J, t.queue, !0, !1)), (kt().memoizedState = t), [!1, t];
        },
        useSyncExternalStore: function (t, e, l) {
          var a = J,
            u = kt();
          if (et) {
            if (l === void 0) throw Error(o(407));
            l = l();
          } else {
            if (((l = e()), pt === null)) throw Error(o(349));
            (I & 127) !== 0 || ko(a, e, l);
          }
          u.memoizedState = l;
          var n = { value: l, getSnapshot: e };
          return (
            (u.queue = n),
            hr(Io.bind(null, a, n, t), [t]),
            (a.flags |= 2048),
            Ea(9, { destroy: void 0 }, $o.bind(null, a, n, l, e), null),
            l
          );
        },
        useId: function () {
          var t = kt(),
            e = pt.identifierPrefix;
          if (et) {
            var l = xe,
              a = Ue;
            (l = (a & ~(1 << (32 - fe(a) - 1))).toString(32) + l),
              (e = '_' + e + 'R_' + l),
              (l = dn++),
              0 < l && (e += 'H' + l.toString(32)),
              (e += '_');
          } else (l = Sm++), (e = '_' + e + 'r_' + l.toString(32) + '_');
          return (t.memoizedState = e);
        },
        useHostTransitionStatus: Nc,
        useFormState: cr,
        useActionState: cr,
        useOptimistic: function (t) {
          var e = kt();
          e.memoizedState = e.baseState = t;
          var l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (e.queue = l), (e = qc.bind(null, J, !0, l)), (l.dispatch = e), [t, e];
        },
        useMemoCache: zc,
        useCacheRefresh: function () {
          return (kt().memoizedState = zm.bind(null, J));
        },
        useEffectEvent: function (t) {
          var e = kt(),
            l = { impl: t };
          return (
            (e.memoizedState = l),
            function () {
              if ((it & 2) !== 0) throw Error(o(440));
              return l.impl.apply(void 0, arguments);
            }
          );
        },
      },
      jc = {
        readContext: Xt,
        use: mn,
        useCallback: pr,
        useContext: Xt,
        useEffect: Rc,
        useImperativeHandle: gr,
        useInsertionEffect: yr,
        useLayoutEffect: mr,
        useMemo: Sr,
        useReducer: vn,
        useRef: rr,
        useState: function () {
          return vn(Ve);
        },
        useDebugValue: Uc,
        useDeferredValue: function (t, e) {
          var l = _t();
          return br(l, dt.memoizedState, t, e);
        },
        useTransition: function () {
          var t = vn(Ve)[0],
            e = _t().memoizedState;
          return [typeof t == 'boolean' ? t : fu(t), e];
        },
        useSyncExternalStore: Wo,
        useId: Or,
        useHostTransitionStatus: Nc,
        useFormState: fr,
        useActionState: fr,
        useOptimistic: function (t, e) {
          var l = _t();
          return er(l, dt, t, e);
        },
        useMemoCache: zc,
        useCacheRefresh: zr,
      };
    jc.useEffectEvent = dr;
    var Rr = {
      readContext: Xt,
      use: mn,
      useCallback: pr,
      useContext: Xt,
      useEffect: Rc,
      useImperativeHandle: gr,
      useInsertionEffect: yr,
      useLayoutEffect: mr,
      useMemo: Sr,
      useReducer: _c,
      useRef: rr,
      useState: function () {
        return _c(Ve);
      },
      useDebugValue: Uc,
      useDeferredValue: function (t, e) {
        var l = _t();
        return dt === null ? xc(l, t, e) : br(l, dt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = _c(Ve)[0],
          e = _t().memoizedState;
        return [typeof t == 'boolean' ? t : fu(t), e];
      },
      useSyncExternalStore: Wo,
      useId: Or,
      useHostTransitionStatus: Nc,
      useFormState: or,
      useActionState: or,
      useOptimistic: function (t, e) {
        var l = _t();
        return dt !== null ? er(l, dt, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
      },
      useMemoCache: zc,
      useCacheRefresh: zr,
    };
    Rr.useEffectEvent = dr;
    function Qc(t, e, l, a) {
      (e = t.memoizedState),
        (l = l(a, e)),
        (l = l == null ? e : U({}, e, l)),
        (t.memoizedState = l),
        t.lanes === 0 && (t.updateQueue.baseState = l);
    }
    var Bc = {
      enqueueSetState: function (t, e, l) {
        t = t._reactInternals;
        var a = me(),
          u = sl(a);
        (u.payload = e),
          l != null && (u.callback = l),
          (e = ol(t, u, a)),
          e !== null && (ue(e, t, a), uu(e, t, a));
      },
      enqueueReplaceState: function (t, e, l) {
        t = t._reactInternals;
        var a = me(),
          u = sl(a);
        (u.tag = 1),
          (u.payload = e),
          l != null && (u.callback = l),
          (e = ol(t, u, a)),
          e !== null && (ue(e, t, a), uu(e, t, a));
      },
      enqueueForceUpdate: function (t, e) {
        t = t._reactInternals;
        var l = me(),
          a = sl(l);
        (a.tag = 2),
          e != null && (a.callback = e),
          (e = ol(t, a, l)),
          e !== null && (ue(e, t, l), uu(e, t, l));
      },
    };
    function Ur(t, e, l, a, u, n, c) {
      return (
        (t = t.stateNode),
        typeof t.shouldComponentUpdate == 'function'
          ? t.shouldComponentUpdate(a, n, c)
          : e.prototype && e.prototype.isPureReactComponent
          ? !ka(l, a) || !ka(u, n)
          : !0
      );
    }
    function xr(t, e, l, a) {
      (t = e.state),
        typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(l, a),
        typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
          e.UNSAFE_componentWillReceiveProps(l, a),
        e.state !== t && Bc.enqueueReplaceState(e, e.state, null);
    }
    function wl(t, e) {
      var l = e;
      if ('ref' in e) {
        l = {};
        for (var a in e) a !== 'ref' && (l[a] = e[a]);
      }
      if ((t = t.defaultProps)) {
        l === e && (l = U({}, l));
        for (var u in t) l[u] === void 0 && (l[u] = t[u]);
      }
      return l;
    }
    function Hr(t) {
      ku(t);
    }
    function Nr(t) {
      console.error(t);
    }
    function qr(t) {
      ku(t);
    }
    function bn(t, e) {
      try {
        var l = t.onUncaughtError;
        l(e.value, { componentStack: e.stack });
      } catch (a) {
        setTimeout(function () {
          throw a;
        });
      }
    }
    function jr(t, e, l) {
      try {
        var a = t.onCaughtError;
        a(l.value, { componentStack: l.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
      } catch (u) {
        setTimeout(function () {
          throw u;
        });
      }
    }
    function Gc(t, e, l) {
      return (
        (l = sl(l)),
        (l.tag = 3),
        (l.payload = { element: null }),
        (l.callback = function () {
          bn(t, e);
        }),
        l
      );
    }
    function Qr(t) {
      return (t = sl(t)), (t.tag = 3), t;
    }
    function Br(t, e, l, a) {
      var u = l.type.getDerivedStateFromError;
      if (typeof u == 'function') {
        var n = a.value;
        (t.payload = function () {
          return u(n);
        }),
          (t.callback = function () {
            jr(e, l, a);
          });
      }
      var c = l.stateNode;
      c !== null &&
        typeof c.componentDidCatch == 'function' &&
        (t.callback = function () {
          jr(e, l, a),
            typeof u != 'function' && (vl === null ? (vl = new Set([this])) : vl.add(this));
          var s = a.stack;
          this.componentDidCatch(a.value, { componentStack: s !== null ? s : '' });
        });
    }
    function _m(t, e, l, a, u) {
      if (((l.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
        if (((e = l.alternate), e !== null && da(e, l, u, !0), (l = re.current), l !== null)) {
          switch (l.tag) {
            case 31:
            case 13:
              return (
                Oe === null ? xn() : l.alternate === null && Ot === 0 && (Ot = 3),
                (l.flags &= -257),
                (l.flags |= 65536),
                (l.lanes = u),
                a === cn
                  ? (l.flags |= 16384)
                  : ((e = l.updateQueue),
                    e === null ? (l.updateQueue = new Set([a])) : e.add(a),
                    rf(t, a, u)),
                !1
              );
            case 22:
              return (
                (l.flags |= 65536),
                a === cn
                  ? (l.flags |= 16384)
                  : ((e = l.updateQueue),
                    e === null
                      ? ((e = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([a]),
                        }),
                        (l.updateQueue = e))
                      : ((l = e.retryQueue), l === null ? (e.retryQueue = new Set([a])) : l.add(a)),
                    rf(t, a, u)),
                !1
              );
          }
          throw Error(o(435, l.tag));
        }
        return rf(t, a, u), xn(), !1;
      }
      if (et)
        return (
          (e = re.current),
          e !== null
            ? ((e.flags & 65536) === 0 && (e.flags |= 256),
              (e.flags |= 65536),
              (e.lanes = u),
              a !== uc && ((t = Error(o(422), { cause: a })), Pa(be(t, l))))
            : (a !== uc && ((e = Error(o(423), { cause: a })), Pa(be(e, l))),
              (t = t.current.alternate),
              (t.flags |= 65536),
              (u &= -u),
              (t.lanes |= u),
              (a = be(a, l)),
              (u = Gc(t.stateNode, a, u)),
              mc(t, u),
              Ot !== 4 && (Ot = 2)),
          !1
        );
      var n = Error(o(520), { cause: a });
      if (((n = be(n, l)), pu === null ? (pu = [n]) : pu.push(n), Ot !== 4 && (Ot = 2), e === null))
        return !0;
      (a = be(a, l)), (l = e);
      do {
        switch (l.tag) {
          case 3:
            return (
              (l.flags |= 65536),
              (t = u & -u),
              (l.lanes |= t),
              (t = Gc(l.stateNode, a, t)),
              mc(l, t),
              !1
            );
          case 1:
            if (
              ((e = l.type),
              (n = l.stateNode),
              (l.flags & 128) === 0 &&
                (typeof e.getDerivedStateFromError == 'function' ||
                  (n !== null &&
                    typeof n.componentDidCatch == 'function' &&
                    (vl === null || !vl.has(n)))))
            )
              return (
                (l.flags |= 65536),
                (u &= -u),
                (l.lanes |= u),
                (u = Qr(u)),
                Br(u, t, l, a),
                mc(l, u),
                !1
              );
        }
        l = l.return;
      } while (l !== null);
      return !1;
    }
    var Yc = Error(o(461)),
      xt = !1;
    function Zt(t, e, l, a) {
      e.child = t === null ? Xo(e, null, l, a) : Vl(e, t.child, l, a);
    }
    function Gr(t, e, l, a, u) {
      l = l.render;
      var n = e.ref;
      if ('ref' in a) {
        var c = {};
        for (var s in a) s !== 'ref' && (c[s] = a[s]);
      } else c = a;
      return (
        Yl(e),
        (a = Ec(t, e, l, c, n, u)),
        (s = Tc()),
        t !== null && !xt
          ? (Ac(t, e, u), Ke(t, e, u))
          : (et && s && lc(e), (e.flags |= 1), Zt(t, e, a, u), e.child)
      );
    }
    function Yr(t, e, l, a, u) {
      if (t === null) {
        var n = l.type;
        return typeof n == 'function' && !Pi(n) && n.defaultProps === void 0 && l.compare === null
          ? ((e.tag = 15), (e.type = n), Lr(t, e, n, a, u))
          : ((t = tn(l.type, null, a, e, e.mode, u)),
            (t.ref = e.ref),
            (t.return = e),
            (e.child = t));
      }
      if (((n = t.child), !Fc(t, u))) {
        var c = n.memoizedProps;
        if (((l = l.compare), (l = l !== null ? l : ka), l(c, a) && t.ref === e.ref))
          return Ke(t, e, u);
      }
      return (e.flags |= 1), (t = Ge(n, a)), (t.ref = e.ref), (t.return = e), (e.child = t);
    }
    function Lr(t, e, l, a, u) {
      if (t !== null) {
        var n = t.memoizedProps;
        if (ka(n, a) && t.ref === e.ref)
          if (((xt = !1), (e.pendingProps = a = n), Fc(t, u)))
            (t.flags & 131072) !== 0 && (xt = !0);
          else return (e.lanes = t.lanes), Ke(t, e, u);
      }
      return Lc(t, e, l, a, u);
    }
    function Xr(t, e, l, a) {
      var u = a.children,
        n = t !== null ? t.memoizedState : null;
      if (
        (t === null &&
          e.stateNode === null &&
          (e.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        a.mode === 'hidden')
      ) {
        if ((e.flags & 128) !== 0) {
          if (((n = n !== null ? n.baseLanes | l : l), t !== null)) {
            for (a = e.child = t.child, u = 0; a !== null; )
              (u = u | a.lanes | a.childLanes), (a = a.sibling);
            a = u & ~n;
          } else (a = 0), (e.child = null);
          return Zr(t, e, n, l, a);
        }
        if ((l & 536870912) !== 0)
          (e.memoizedState = { baseLanes: 0, cachePool: null }),
            t !== null && un(e, n !== null ? n.cachePool : null),
            n !== null ? Ko(e, n) : gc(),
            wo(e);
        else return (a = e.lanes = 536870912), Zr(t, e, n !== null ? n.baseLanes | l : l, l, a);
      } else
        n !== null
          ? (un(e, n.cachePool), Ko(e, n), hl(), (e.memoizedState = null))
          : (t !== null && un(e, null), gc(), hl());
      return Zt(t, e, u, l), e.child;
    }
    function ru(t, e) {
      return (
        (t !== null && t.tag === 22) ||
          e.stateNode !== null ||
          (e.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        e.sibling
      );
    }
    function Zr(t, e, l, a, u) {
      var n = rc();
      return (
        (n = n === null ? null : { parent: Rt._currentValue, pool: n }),
        (e.memoizedState = { baseLanes: l, cachePool: n }),
        t !== null && un(e, null),
        gc(),
        wo(e),
        t !== null && da(t, e, a, !0),
        (e.childLanes = u),
        null
      );
    }
    function En(t, e) {
      return (
        (e = An({ mode: e.mode, children: e.children }, t.mode)),
        (e.ref = t.ref),
        (t.child = e),
        (e.return = t),
        e
      );
    }
    function Vr(t, e, l) {
      return (
        Vl(e, t.child, null, l),
        (t = En(e, e.pendingProps)),
        (t.flags |= 2),
        he(e),
        (e.memoizedState = null),
        t
      );
    }
    function Cm(t, e, l) {
      var a = e.pendingProps,
        u = (e.flags & 128) !== 0;
      if (((e.flags &= -129), t === null)) {
        if (et) {
          if (a.mode === 'hidden') return (t = En(e, a)), (e.lanes = 536870912), ru(null, t);
          if (
            (Sc(e),
            (t = bt)
              ? ((t = ld(t, Ae)),
                (t = t !== null && t.data === '&' ? t : null),
                t !== null &&
                  ((e.memoizedState = {
                    dehydrated: t,
                    treeContext: ul !== null ? { id: Ue, overflow: xe } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (l = _o(t)),
                  (l.return = e),
                  (e.child = l),
                  (Lt = e),
                  (bt = null)))
              : (t = null),
            t === null)
          )
            throw il(e);
          return (e.lanes = 536870912), null;
        }
        return En(e, a);
      }
      var n = t.memoizedState;
      if (n !== null) {
        var c = n.dehydrated;
        if ((Sc(e), u))
          if (e.flags & 256) (e.flags &= -257), (e = Vr(t, e, l));
          else if (e.memoizedState !== null) (e.child = t.child), (e.flags |= 128), (e = null);
          else throw Error(o(558));
        else if ((xt || da(t, e, l, !1), (u = (l & t.childLanes) !== 0), xt || u)) {
          if (((a = pt), a !== null && ((c = Hs(a, l)), c !== 0 && c !== n.retryLane)))
            throw ((n.retryLane = c), jl(t, c), ue(a, t, c), Yc);
          xn(), (e = Vr(t, e, l));
        } else
          (t = n.treeContext),
            (bt = ze(c.nextSibling)),
            (Lt = e),
            (et = !0),
            (nl = null),
            (Ae = !1),
            t !== null && Ro(e, t),
            (e = En(e, a)),
            (e.flags |= 4096);
        return e;
      }
      return (
        (t = Ge(t.child, { mode: a.mode, children: a.children })),
        (t.ref = e.ref),
        (e.child = t),
        (t.return = e),
        t
      );
    }
    function Tn(t, e) {
      var l = e.ref;
      if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
      else {
        if (typeof l != 'function' && typeof l != 'object') throw Error(o(284));
        (t === null || t.ref !== l) && (e.flags |= 4194816);
      }
    }
    function Lc(t, e, l, a, u) {
      return (
        Yl(e),
        (l = Ec(t, e, l, a, void 0, u)),
        (a = Tc()),
        t !== null && !xt
          ? (Ac(t, e, u), Ke(t, e, u))
          : (et && a && lc(e), (e.flags |= 1), Zt(t, e, l, u), e.child)
      );
    }
    function Kr(t, e, l, a, u, n) {
      return (
        Yl(e),
        (e.updateQueue = null),
        (l = Fo(e, a, l, u)),
        Jo(t),
        (a = Tc()),
        t !== null && !xt
          ? (Ac(t, e, n), Ke(t, e, n))
          : (et && a && lc(e), (e.flags |= 1), Zt(t, e, l, n), e.child)
      );
    }
    function wr(t, e, l, a, u) {
      if ((Yl(e), e.stateNode === null)) {
        var n = sa,
          c = l.contextType;
        typeof c == 'object' && c !== null && (n = Xt(c)),
          (n = new l(a, n)),
          (e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
          (n.updater = Bc),
          (e.stateNode = n),
          (n._reactInternals = e),
          (n = e.stateNode),
          (n.props = a),
          (n.state = e.memoizedState),
          (n.refs = {}),
          dc(e),
          (c = l.contextType),
          (n.context = typeof c == 'object' && c !== null ? Xt(c) : sa),
          (n.state = e.memoizedState),
          (c = l.getDerivedStateFromProps),
          typeof c == 'function' && (Qc(e, l, c, a), (n.state = e.memoizedState)),
          typeof l.getDerivedStateFromProps == 'function' ||
            typeof n.getSnapshotBeforeUpdate == 'function' ||
            (typeof n.UNSAFE_componentWillMount != 'function' &&
              typeof n.componentWillMount != 'function') ||
            ((c = n.state),
            typeof n.componentWillMount == 'function' && n.componentWillMount(),
            typeof n.UNSAFE_componentWillMount == 'function' && n.UNSAFE_componentWillMount(),
            c !== n.state && Bc.enqueueReplaceState(n, n.state, null),
            iu(e, a, n, u),
            nu(),
            (n.state = e.memoizedState)),
          typeof n.componentDidMount == 'function' && (e.flags |= 4194308),
          (a = !0);
      } else if (t === null) {
        n = e.stateNode;
        var s = e.memoizedProps,
          h = wl(l, s);
        n.props = h;
        var p = n.context,
          A = l.contextType;
        (c = sa), typeof A == 'object' && A !== null && (c = Xt(A));
        var _ = l.getDerivedStateFromProps;
        (A = typeof _ == 'function' || typeof n.getSnapshotBeforeUpdate == 'function'),
          (s = e.pendingProps !== s),
          A ||
            (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
              typeof n.componentWillReceiveProps != 'function') ||
            ((s || p !== c) && xr(e, n, a, c)),
          (fl = !1);
        var S = e.memoizedState;
        (n.state = S),
          iu(e, a, n, u),
          nu(),
          (p = e.memoizedState),
          s || S !== p || fl
            ? (typeof _ == 'function' && (Qc(e, l, _, a), (p = e.memoizedState)),
              (h = fl || Ur(e, l, h, a, S, p, c))
                ? (A ||
                    (typeof n.UNSAFE_componentWillMount != 'function' &&
                      typeof n.componentWillMount != 'function') ||
                    (typeof n.componentWillMount == 'function' && n.componentWillMount(),
                    typeof n.UNSAFE_componentWillMount == 'function' &&
                      n.UNSAFE_componentWillMount()),
                  typeof n.componentDidMount == 'function' && (e.flags |= 4194308))
                : (typeof n.componentDidMount == 'function' && (e.flags |= 4194308),
                  (e.memoizedProps = a),
                  (e.memoizedState = p)),
              (n.props = a),
              (n.state = p),
              (n.context = c),
              (a = h))
            : (typeof n.componentDidMount == 'function' && (e.flags |= 4194308), (a = !1));
      } else {
        (n = e.stateNode),
          yc(t, e),
          (c = e.memoizedProps),
          (A = wl(l, c)),
          (n.props = A),
          (_ = e.pendingProps),
          (S = n.context),
          (p = l.contextType),
          (h = sa),
          typeof p == 'object' && p !== null && (h = Xt(p)),
          (s = l.getDerivedStateFromProps),
          (p = typeof s == 'function' || typeof n.getSnapshotBeforeUpdate == 'function') ||
            (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
              typeof n.componentWillReceiveProps != 'function') ||
            ((c !== _ || S !== h) && xr(e, n, a, h)),
          (fl = !1),
          (S = e.memoizedState),
          (n.state = S),
          iu(e, a, n, u),
          nu();
        var E = e.memoizedState;
        c !== _ || S !== E || fl || (t !== null && t.dependencies !== null && ln(t.dependencies))
          ? (typeof s == 'function' && (Qc(e, l, s, a), (E = e.memoizedState)),
            (A =
              fl ||
              Ur(e, l, A, a, S, E, h) ||
              (t !== null && t.dependencies !== null && ln(t.dependencies)))
              ? (p ||
                  (typeof n.UNSAFE_componentWillUpdate != 'function' &&
                    typeof n.componentWillUpdate != 'function') ||
                  (typeof n.componentWillUpdate == 'function' && n.componentWillUpdate(a, E, h),
                  typeof n.UNSAFE_componentWillUpdate == 'function' &&
                    n.UNSAFE_componentWillUpdate(a, E, h)),
                typeof n.componentDidUpdate == 'function' && (e.flags |= 4),
                typeof n.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
              : (typeof n.componentDidUpdate != 'function' ||
                  (c === t.memoizedProps && S === t.memoizedState) ||
                  (e.flags |= 4),
                typeof n.getSnapshotBeforeUpdate != 'function' ||
                  (c === t.memoizedProps && S === t.memoizedState) ||
                  (e.flags |= 1024),
                (e.memoizedProps = a),
                (e.memoizedState = E)),
            (n.props = a),
            (n.state = E),
            (n.context = h),
            (a = A))
          : (typeof n.componentDidUpdate != 'function' ||
              (c === t.memoizedProps && S === t.memoizedState) ||
              (e.flags |= 4),
            typeof n.getSnapshotBeforeUpdate != 'function' ||
              (c === t.memoizedProps && S === t.memoizedState) ||
              (e.flags |= 1024),
            (a = !1));
      }
      return (
        (n = a),
        Tn(t, e),
        (a = (e.flags & 128) !== 0),
        n || a
          ? ((n = e.stateNode),
            (l = a && typeof l.getDerivedStateFromError != 'function' ? null : n.render()),
            (e.flags |= 1),
            t !== null && a
              ? ((e.child = Vl(e, t.child, null, u)), (e.child = Vl(e, null, l, u)))
              : Zt(t, e, l, u),
            (e.memoizedState = n.state),
            (t = e.child))
          : (t = Ke(t, e, u)),
        t
      );
    }
    function Jr(t, e, l, a) {
      return Bl(), (e.flags |= 256), Zt(t, e, l, a), e.child;
    }
    var Xc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
    function Zc(t) {
      return { baseLanes: t, cachePool: jo() };
    }
    function Vc(t, e, l) {
      return (t = t !== null ? t.childLanes & ~l : 0), e && (t |= ye), t;
    }
    function Fr(t, e, l) {
      var a = e.pendingProps,
        u = !1,
        n = (e.flags & 128) !== 0,
        c;
      if (
        ((c = n) || (c = t !== null && t.memoizedState === null ? !1 : (Mt.current & 2) !== 0),
        c && ((u = !0), (e.flags &= -129)),
        (c = (e.flags & 32) !== 0),
        (e.flags &= -33),
        t === null)
      ) {
        if (et) {
          if (
            (u ? rl(e) : hl(),
            (t = bt)
              ? ((t = ld(t, Ae)),
                (t = t !== null && t.data !== '&' ? t : null),
                t !== null &&
                  ((e.memoizedState = {
                    dehydrated: t,
                    treeContext: ul !== null ? { id: Ue, overflow: xe } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (l = _o(t)),
                  (l.return = e),
                  (e.child = l),
                  (Lt = e),
                  (bt = null)))
              : (t = null),
            t === null)
          )
            throw il(e);
          return _f(t) ? (e.lanes = 32) : (e.lanes = 536870912), null;
        }
        var s = a.children;
        return (
          (a = a.fallback),
          u
            ? (hl(),
              (u = e.mode),
              (s = An({ mode: 'hidden', children: s }, u)),
              (a = Ql(a, u, l, null)),
              (s.return = e),
              (a.return = e),
              (s.sibling = a),
              (e.child = s),
              (a = e.child),
              (a.memoizedState = Zc(l)),
              (a.childLanes = Vc(t, c, l)),
              (e.memoizedState = Xc),
              ru(null, a))
            : (rl(e), Kc(e, s))
        );
      }
      var h = t.memoizedState;
      if (h !== null && ((s = h.dehydrated), s !== null)) {
        if (n)
          e.flags & 256
            ? (rl(e), (e.flags &= -257), (e = wc(t, e, l)))
            : e.memoizedState !== null
            ? (hl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (hl(),
              (s = a.fallback),
              (u = e.mode),
              (a = An({ mode: 'visible', children: a.children }, u)),
              (s = Ql(s, u, l, null)),
              (s.flags |= 2),
              (a.return = e),
              (s.return = e),
              (a.sibling = s),
              (e.child = a),
              Vl(e, t.child, null, l),
              (a = e.child),
              (a.memoizedState = Zc(l)),
              (a.childLanes = Vc(t, c, l)),
              (e.memoizedState = Xc),
              (e = ru(null, a)));
        else if ((rl(e), _f(s))) {
          if (((c = s.nextSibling && s.nextSibling.dataset), c)) var p = c.dgst;
          (c = p),
            (a = Error(o(419))),
            (a.stack = ''),
            (a.digest = c),
            Pa({ value: a, source: null, stack: null }),
            (e = wc(t, e, l));
        } else if ((xt || da(t, e, l, !1), (c = (l & t.childLanes) !== 0), xt || c)) {
          if (((c = pt), c !== null && ((a = Hs(c, l)), a !== 0 && a !== h.retryLane)))
            throw ((h.retryLane = a), jl(t, a), ue(c, t, a), Yc);
          Mf(s) || xn(), (e = wc(t, e, l));
        } else
          Mf(s)
            ? ((e.flags |= 192), (e.child = t.child), (e = null))
            : ((t = h.treeContext),
              (bt = ze(s.nextSibling)),
              (Lt = e),
              (et = !0),
              (nl = null),
              (Ae = !1),
              t !== null && Ro(e, t),
              (e = Kc(e, a.children)),
              (e.flags |= 4096));
        return e;
      }
      return u
        ? (hl(),
          (s = a.fallback),
          (u = e.mode),
          (h = t.child),
          (p = h.sibling),
          (a = Ge(h, { mode: 'hidden', children: a.children })),
          (a.subtreeFlags = h.subtreeFlags & 65011712),
          p !== null ? (s = Ge(p, s)) : ((s = Ql(s, u, l, null)), (s.flags |= 2)),
          (s.return = e),
          (a.return = e),
          (a.sibling = s),
          (e.child = a),
          ru(null, a),
          (a = e.child),
          (s = t.child.memoizedState),
          s === null
            ? (s = Zc(l))
            : ((u = s.cachePool),
              u !== null
                ? ((h = Rt._currentValue), (u = u.parent !== h ? { parent: h, pool: h } : u))
                : (u = jo()),
              (s = { baseLanes: s.baseLanes | l, cachePool: u })),
          (a.memoizedState = s),
          (a.childLanes = Vc(t, c, l)),
          (e.memoizedState = Xc),
          ru(t.child, a))
        : (rl(e),
          (l = t.child),
          (t = l.sibling),
          (l = Ge(l, { mode: 'visible', children: a.children })),
          (l.return = e),
          (l.sibling = null),
          t !== null &&
            ((c = e.deletions), c === null ? ((e.deletions = [t]), (e.flags |= 16)) : c.push(t)),
          (e.child = l),
          (e.memoizedState = null),
          l);
    }
    function Kc(t, e) {
      return (e = An({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e);
    }
    function An(t, e) {
      return (t = oe(22, t, null, e)), (t.lanes = 0), t;
    }
    function wc(t, e, l) {
      return (
        Vl(e, t.child, null, l),
        (t = Kc(e, e.pendingProps.children)),
        (t.flags |= 2),
        (e.memoizedState = null),
        t
      );
    }
    function Wr(t, e, l) {
      t.lanes |= e;
      var a = t.alternate;
      a !== null && (a.lanes |= e), cc(t.return, e, l);
    }
    function Jc(t, e, l, a, u, n) {
      var c = t.memoizedState;
      c === null
        ? (t.memoizedState = {
            isBackwards: e,
            rendering: null,
            renderingStartTime: 0,
            last: a,
            tail: l,
            tailMode: u,
            treeForkCount: n,
          })
        : ((c.isBackwards = e),
          (c.rendering = null),
          (c.renderingStartTime = 0),
          (c.last = a),
          (c.tail = l),
          (c.tailMode = u),
          (c.treeForkCount = n));
    }
    function kr(t, e, l) {
      var a = e.pendingProps,
        u = a.revealOrder,
        n = a.tail;
      a = a.children;
      var c = Mt.current,
        s = (c & 2) !== 0;
      if (
        (s ? ((c = (c & 1) | 2), (e.flags |= 128)) : (c &= 1),
        N(Mt, c),
        Zt(t, e, a, l),
        (a = et ? Ia : 0),
        !s && t !== null && (t.flags & 128) !== 0)
      )
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && Wr(t, l, e);
          else if (t.tag === 19) Wr(t, l, e);
          else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === e) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break t;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      switch (u) {
        case 'forwards':
          for (l = e.child, u = null; l !== null; )
            (t = l.alternate), t !== null && rn(t) === null && (u = l), (l = l.sibling);
          (l = u),
            l === null ? ((u = e.child), (e.child = null)) : ((u = l.sibling), (l.sibling = null)),
            Jc(e, !1, u, l, n, a);
          break;
        case 'backwards':
        case 'unstable_legacy-backwards':
          for (l = null, u = e.child, e.child = null; u !== null; ) {
            if (((t = u.alternate), t !== null && rn(t) === null)) {
              e.child = u;
              break;
            }
            (t = u.sibling), (u.sibling = l), (l = u), (u = t);
          }
          Jc(e, !0, l, null, n, a);
          break;
        case 'together':
          Jc(e, !1, null, null, void 0, a);
          break;
        default:
          e.memoizedState = null;
      }
      return e.child;
    }
    function Ke(t, e, l) {
      if (
        (t !== null && (e.dependencies = t.dependencies), (ml |= e.lanes), (l & e.childLanes) === 0)
      )
        if (t !== null) {
          if ((da(t, e, l, !1), (l & e.childLanes) === 0)) return null;
        } else return null;
      if (t !== null && e.child !== t.child) throw Error(o(153));
      if (e.child !== null) {
        for (
          t = e.child, l = Ge(t, t.pendingProps), e.child = l, l.return = e;
          t.sibling !== null;

        )
          (t = t.sibling), (l = l.sibling = Ge(t, t.pendingProps)), (l.return = e);
        l.sibling = null;
      }
      return e.child;
    }
    function Fc(t, e) {
      return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && ln(t)));
    }
    function Dm(t, e, l) {
      switch (e.tag) {
        case 3:
          Wt(e, e.stateNode.containerInfo), cl(e, Rt, t.memoizedState.cache), Bl();
          break;
        case 27:
        case 5:
          Qa(e);
          break;
        case 4:
          Wt(e, e.stateNode.containerInfo);
          break;
        case 10:
          cl(e, e.type, e.memoizedProps.value);
          break;
        case 31:
          if (e.memoizedState !== null) return (e.flags |= 128), Sc(e), null;
          break;
        case 13:
          var a = e.memoizedState;
          if (a !== null)
            return a.dehydrated !== null
              ? (rl(e), (e.flags |= 128), null)
              : (l & e.child.childLanes) !== 0
              ? Fr(t, e, l)
              : (rl(e), (t = Ke(t, e, l)), t !== null ? t.sibling : null);
          rl(e);
          break;
        case 19:
          var u = (t.flags & 128) !== 0;
          if (
            ((a = (l & e.childLanes) !== 0),
            a || (da(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
            u)
          ) {
            if (a) return kr(t, e, l);
            e.flags |= 128;
          }
          if (
            ((u = e.memoizedState),
            u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
            N(Mt, Mt.current),
            a)
          )
            break;
          return null;
        case 22:
          return (e.lanes = 0), Xr(t, e, l, e.pendingProps);
        case 24:
          cl(e, Rt, t.memoizedState.cache);
      }
      return Ke(t, e, l);
    }
    function $r(t, e, l) {
      if (t !== null)
        if (t.memoizedProps !== e.pendingProps) xt = !0;
        else {
          if (!Fc(t, l) && (e.flags & 128) === 0) return (xt = !1), Dm(t, e, l);
          xt = (t.flags & 131072) !== 0;
        }
      else (xt = !1), et && (e.flags & 1048576) !== 0 && Do(e, Ia, e.index);
      switch (((e.lanes = 0), e.tag)) {
        case 16:
          t: {
            var a = e.pendingProps;
            if (((t = Xl(e.elementType)), (e.type = t), typeof t == 'function'))
              Pi(t)
                ? ((a = wl(t, a)), (e.tag = 1), (e = wr(null, e, t, a, l)))
                : ((e.tag = 0), (e = Lc(null, e, t, a, l)));
            else {
              if (t != null) {
                var u = t.$$typeof;
                if (u === Dt) {
                  (e.tag = 11), (e = Gr(null, e, t, a, l));
                  break t;
                } else if (u === V) {
                  (e.tag = 14), (e = Yr(null, e, t, a, l));
                  break t;
                }
              }
              throw ((e = qe(t) || t), Error(o(306, e, '')));
            }
          }
          return e;
        case 0:
          return Lc(t, e, e.type, e.pendingProps, l);
        case 1:
          return (a = e.type), (u = wl(a, e.pendingProps)), wr(t, e, a, u, l);
        case 3:
          t: {
            if ((Wt(e, e.stateNode.containerInfo), t === null)) throw Error(o(387));
            a = e.pendingProps;
            var n = e.memoizedState;
            (u = n.element), yc(t, e), iu(e, a, null, l);
            var c = e.memoizedState;
            if (
              ((a = c.cache),
              cl(e, Rt, a),
              a !== n.cache && fc(e, [Rt], l, !0),
              nu(),
              (a = c.element),
              n.isDehydrated)
            )
              if (
                ((n = { element: a, isDehydrated: !1, cache: c.cache }),
                (e.updateQueue.baseState = n),
                (e.memoizedState = n),
                e.flags & 256)
              ) {
                e = Jr(t, e, a, l);
                break t;
              } else if (a !== u) {
                (u = be(Error(o(424)), e)), Pa(u), (e = Jr(t, e, a, l));
                break t;
              } else {
                switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                  case 9:
                    t = t.body;
                    break;
                  default:
                    t = t.nodeName === 'HTML' ? t.ownerDocument.body : t;
                }
                for (
                  bt = ze(t.firstChild),
                    Lt = e,
                    et = !0,
                    nl = null,
                    Ae = !0,
                    l = Xo(e, null, a, l),
                    e.child = l;
                  l;

                )
                  (l.flags = (l.flags & -3) | 4096), (l = l.sibling);
              }
            else {
              if ((Bl(), a === u)) {
                e = Ke(t, e, l);
                break t;
              }
              Zt(t, e, a, l);
            }
            e = e.child;
          }
          return e;
        case 26:
          return (
            Tn(t, e),
            t === null
              ? (l = fd(e.type, null, e.pendingProps, null))
                ? (e.memoizedState = l)
                : et ||
                  ((l = e.type),
                  (t = e.pendingProps),
                  (a = Gn(W.current).createElement(l)),
                  (a[Yt] = e),
                  (a[It] = t),
                  Vt(a, l, t),
                  Bt(a),
                  (e.stateNode = a))
              : (e.memoizedState = fd(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
            null
          );
        case 27:
          return (
            Qa(e),
            t === null &&
              et &&
              ((a = e.stateNode = nd(e.type, e.pendingProps, W.current)),
              (Lt = e),
              (Ae = !0),
              (u = bt),
              bl(e.type) ? ((Cf = u), (bt = ze(a.firstChild))) : (bt = u)),
            Zt(t, e, e.pendingProps.children, l),
            Tn(t, e),
            t === null && (e.flags |= 4194304),
            e.child
          );
        case 5:
          return (
            t === null &&
              et &&
              ((u = a = bt) &&
                ((a = nv(a, e.type, e.pendingProps, Ae)),
                a !== null
                  ? ((e.stateNode = a), (Lt = e), (bt = ze(a.firstChild)), (Ae = !1), (u = !0))
                  : (u = !1)),
              u || il(e)),
            Qa(e),
            (u = e.type),
            (n = e.pendingProps),
            (c = t !== null ? t.memoizedProps : null),
            (a = n.children),
            Af(u, n) ? (a = null) : c !== null && Af(u, c) && (e.flags |= 32),
            e.memoizedState !== null && ((u = Ec(t, e, bm, null, null, l)), (Mu._currentValue = u)),
            Tn(t, e),
            Zt(t, e, a, l),
            e.child
          );
        case 6:
          return (
            t === null &&
              et &&
              ((t = l = bt) &&
                ((l = iv(l, e.pendingProps, Ae)),
                l !== null ? ((e.stateNode = l), (Lt = e), (bt = null), (t = !0)) : (t = !1)),
              t || il(e)),
            null
          );
        case 13:
          return Fr(t, e, l);
        case 4:
          return (
            Wt(e, e.stateNode.containerInfo),
            (a = e.pendingProps),
            t === null ? (e.child = Vl(e, null, a, l)) : Zt(t, e, a, l),
            e.child
          );
        case 11:
          return Gr(t, e, e.type, e.pendingProps, l);
        case 7:
          return Zt(t, e, e.pendingProps, l), e.child;
        case 8:
          return Zt(t, e, e.pendingProps.children, l), e.child;
        case 12:
          return Zt(t, e, e.pendingProps.children, l), e.child;
        case 10:
          return (a = e.pendingProps), cl(e, e.type, a.value), Zt(t, e, a.children, l), e.child;
        case 9:
          return (
            (u = e.type._context),
            (a = e.pendingProps.children),
            Yl(e),
            (u = Xt(u)),
            (a = a(u)),
            (e.flags |= 1),
            Zt(t, e, a, l),
            e.child
          );
        case 14:
          return Yr(t, e, e.type, e.pendingProps, l);
        case 15:
          return Lr(t, e, e.type, e.pendingProps, l);
        case 19:
          return kr(t, e, l);
        case 31:
          return Cm(t, e, l);
        case 22:
          return Xr(t, e, l, e.pendingProps);
        case 24:
          return (
            Yl(e),
            (a = Xt(Rt)),
            t === null
              ? ((u = rc()),
                u === null &&
                  ((u = pt),
                  (n = sc()),
                  (u.pooledCache = n),
                  n.refCount++,
                  n !== null && (u.pooledCacheLanes |= l),
                  (u = n)),
                (e.memoizedState = { parent: a, cache: u }),
                dc(e),
                cl(e, Rt, u))
              : ((t.lanes & l) !== 0 && (yc(t, e), iu(e, null, null, l), nu()),
                (u = t.memoizedState),
                (n = e.memoizedState),
                u.parent !== a
                  ? ((u = { parent: a, cache: a }),
                    (e.memoizedState = u),
                    e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u),
                    cl(e, Rt, a))
                  : ((a = n.cache), cl(e, Rt, a), a !== u.cache && fc(e, [Rt], l, !0))),
            Zt(t, e, e.pendingProps.children, l),
            e.child
          );
        case 29:
          throw e.pendingProps;
      }
      throw Error(o(156, e.tag));
    }
    function we(t) {
      t.flags |= 4;
    }
    function Wc(t, e, l, a, u) {
      if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
        if (((t.flags |= 16777216), (u & 335544128) === u))
          if (t.stateNode.complete) t.flags |= 8192;
          else if (Oh()) t.flags |= 8192;
          else throw ((Zl = cn), hc);
      } else t.flags &= -16777217;
    }
    function Ir(t, e) {
      if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
      else if (((t.flags |= 16777216), !dd(e)))
        if (Oh()) t.flags |= 8192;
        else throw ((Zl = cn), hc);
    }
    function On(t, e) {
      e !== null && (t.flags |= 4),
        t.flags & 16384 && ((e = t.tag !== 22 ? Rs() : 536870912), (t.lanes |= e), (za |= e));
    }
    function hu(t, e) {
      if (!et)
        switch (t.tailMode) {
          case 'hidden':
            e = t.tail;
            for (var l = null; e !== null; ) e.alternate !== null && (l = e), (e = e.sibling);
            l === null ? (t.tail = null) : (l.sibling = null);
            break;
          case 'collapsed':
            l = t.tail;
            for (var a = null; l !== null; ) l.alternate !== null && (a = l), (l = l.sibling);
            a === null
              ? e || t.tail === null
                ? (t.tail = null)
                : (t.tail.sibling = null)
              : (a.sibling = null);
        }
    }
    function Et(t) {
      var e = t.alternate !== null && t.alternate.child === t.child,
        l = 0,
        a = 0;
      if (e)
        for (var u = t.child; u !== null; )
          (l |= u.lanes | u.childLanes),
            (a |= u.subtreeFlags & 65011712),
            (a |= u.flags & 65011712),
            (u.return = t),
            (u = u.sibling);
      else
        for (u = t.child; u !== null; )
          (l |= u.lanes | u.childLanes),
            (a |= u.subtreeFlags),
            (a |= u.flags),
            (u.return = t),
            (u = u.sibling);
      return (t.subtreeFlags |= a), (t.childLanes = l), e;
    }
    function Rm(t, e, l) {
      var a = e.pendingProps;
      switch ((ac(e), e.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Et(e), null;
        case 1:
          return Et(e), null;
        case 3:
          return (
            (l = e.stateNode),
            (a = null),
            t !== null && (a = t.memoizedState.cache),
            e.memoizedState.cache !== a && (e.flags |= 2048),
            Xe(Rt),
            zt(),
            l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
            (t === null || t.child === null) &&
              (ha(e)
                ? we(e)
                : t === null ||
                  (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                  ((e.flags |= 1024), nc())),
            Et(e),
            null
          );
        case 26:
          var u = e.type,
            n = e.memoizedState;
          return (
            t === null
              ? (we(e), n !== null ? (Et(e), Ir(e, n)) : (Et(e), Wc(e, u, null, a, l)))
              : n
              ? n !== t.memoizedState
                ? (we(e), Et(e), Ir(e, n))
                : (Et(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== a && we(e), Et(e), Wc(e, u, t, a, l)),
            null
          );
        case 27:
          if ((Nu(e), (l = W.current), (u = e.type), t !== null && e.stateNode != null))
            t.memoizedProps !== a && we(e);
          else {
            if (!a) {
              if (e.stateNode === null) throw Error(o(166));
              return Et(e), null;
            }
            (t = Q.current), ha(e) ? Uo(e) : ((t = nd(u, a, l)), (e.stateNode = t), we(e));
          }
          return Et(e), null;
        case 5:
          if ((Nu(e), (u = e.type), t !== null && e.stateNode != null))
            t.memoizedProps !== a && we(e);
          else {
            if (!a) {
              if (e.stateNode === null) throw Error(o(166));
              return Et(e), null;
            }
            if (((n = Q.current), ha(e))) Uo(e);
            else {
              var c = Gn(W.current);
              switch (n) {
                case 1:
                  n = c.createElementNS('http://www.w3.org/2000/svg', u);
                  break;
                case 2:
                  n = c.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                  break;
                default:
                  switch (u) {
                    case 'svg':
                      n = c.createElementNS('http://www.w3.org/2000/svg', u);
                      break;
                    case 'math':
                      n = c.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                      break;
                    case 'script':
                      (n = c.createElement('div')),
                        (n.innerHTML = '<script></script>'),
                        (n = n.removeChild(n.firstChild));
                      break;
                    case 'select':
                      (n =
                        typeof a.is == 'string'
                          ? c.createElement('select', { is: a.is })
                          : c.createElement('select')),
                        a.multiple ? (n.multiple = !0) : a.size && (n.size = a.size);
                      break;
                    default:
                      n =
                        typeof a.is == 'string'
                          ? c.createElement(u, { is: a.is })
                          : c.createElement(u);
                  }
              }
              (n[Yt] = e), (n[It] = a);
              t: for (c = e.child; c !== null; ) {
                if (c.tag === 5 || c.tag === 6) n.appendChild(c.stateNode);
                else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                  (c.child.return = c), (c = c.child);
                  continue;
                }
                if (c === e) break t;
                for (; c.sibling === null; ) {
                  if (c.return === null || c.return === e) break t;
                  c = c.return;
                }
                (c.sibling.return = c.return), (c = c.sibling);
              }
              e.stateNode = n;
              t: switch ((Vt(n, u, a), u)) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  a = !!a.autoFocus;
                  break t;
                case 'img':
                  a = !0;
                  break t;
                default:
                  a = !1;
              }
              a && we(e);
            }
          }
          return Et(e), Wc(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null;
        case 6:
          if (t && e.stateNode != null) t.memoizedProps !== a && we(e);
          else {
            if (typeof a != 'string' && e.stateNode === null) throw Error(o(166));
            if (((t = W.current), ha(e))) {
              if (((t = e.stateNode), (l = e.memoizedProps), (a = null), (u = Lt), u !== null))
                switch (u.tag) {
                  case 27:
                  case 5:
                    a = u.memoizedProps;
                }
              (t[Yt] = e),
                (t = !!(
                  t.nodeValue === l ||
                  (a !== null && a.suppressHydrationWarning === !0) ||
                  Fh(t.nodeValue, l)
                )),
                t || il(e, !0);
            } else (t = Gn(t).createTextNode(a)), (t[Yt] = e), (e.stateNode = t);
          }
          return Et(e), null;
        case 31:
          if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
            if (((a = ha(e)), l !== null)) {
              if (t === null) {
                if (!a) throw Error(o(318));
                if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                  throw Error(o(557));
                t[Yt] = e;
              } else Bl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4);
              Et(e), (t = !1);
            } else
              (l = nc()),
                t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
                (t = !0);
            if (!t) return e.flags & 256 ? (he(e), e) : (he(e), null);
            if ((e.flags & 128) !== 0) throw Error(o(558));
          }
          return Et(e), null;
        case 13:
          if (
            ((a = e.memoizedState),
            t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
          ) {
            if (((u = ha(e)), a !== null && a.dehydrated !== null)) {
              if (t === null) {
                if (!u) throw Error(o(318));
                if (((u = e.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                  throw Error(o(317));
                u[Yt] = e;
              } else Bl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4);
              Et(e), (u = !1);
            } else
              (u = nc()),
                t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
                (u = !0);
            if (!u) return e.flags & 256 ? (he(e), e) : (he(e), null);
          }
          return (
            he(e),
            (e.flags & 128) !== 0
              ? ((e.lanes = l), e)
              : ((l = a !== null),
                (t = t !== null && t.memoizedState !== null),
                l &&
                  ((a = e.child),
                  (u = null),
                  a.alternate !== null &&
                    a.alternate.memoizedState !== null &&
                    a.alternate.memoizedState.cachePool !== null &&
                    (u = a.alternate.memoizedState.cachePool.pool),
                  (n = null),
                  a.memoizedState !== null &&
                    a.memoizedState.cachePool !== null &&
                    (n = a.memoizedState.cachePool.pool),
                  n !== u && (a.flags |= 2048)),
                l !== t && l && (e.child.flags |= 8192),
                On(e, e.updateQueue),
                Et(e),
                null)
          );
        case 4:
          return zt(), t === null && pf(e.stateNode.containerInfo), Et(e), null;
        case 10:
          return Xe(e.type), Et(e), null;
        case 19:
          if ((C(Mt), (a = e.memoizedState), a === null)) return Et(e), null;
          if (((u = (e.flags & 128) !== 0), (n = a.rendering), n === null))
            if (u) hu(a, !1);
            else {
              if (Ot !== 0 || (t !== null && (t.flags & 128) !== 0))
                for (t = e.child; t !== null; ) {
                  if (((n = rn(t)), n !== null)) {
                    for (
                      e.flags |= 128,
                        hu(a, !1),
                        t = n.updateQueue,
                        e.updateQueue = t,
                        On(e, t),
                        e.subtreeFlags = 0,
                        t = l,
                        l = e.child;
                      l !== null;

                    )
                      Mo(l, t), (l = l.sibling);
                    return N(Mt, (Mt.current & 1) | 2), et && Ye(e, a.treeForkCount), e.child;
                  }
                  t = t.sibling;
                }
              a.tail !== null &&
                ie() > Dn &&
                ((e.flags |= 128), (u = !0), hu(a, !1), (e.lanes = 4194304));
            }
          else {
            if (!u)
              if (((t = rn(n)), t !== null)) {
                if (
                  ((e.flags |= 128),
                  (u = !0),
                  (t = t.updateQueue),
                  (e.updateQueue = t),
                  On(e, t),
                  hu(a, !0),
                  a.tail === null && a.tailMode === 'hidden' && !n.alternate && !et)
                )
                  return Et(e), null;
              } else
                2 * ie() - a.renderingStartTime > Dn &&
                  l !== 536870912 &&
                  ((e.flags |= 128), (u = !0), hu(a, !1), (e.lanes = 4194304));
            a.isBackwards
              ? ((n.sibling = e.child), (e.child = n))
              : ((t = a.last), t !== null ? (t.sibling = n) : (e.child = n), (a.last = n));
          }
          return a.tail !== null
            ? ((t = a.tail),
              (a.rendering = t),
              (a.tail = t.sibling),
              (a.renderingStartTime = ie()),
              (t.sibling = null),
              (l = Mt.current),
              N(Mt, u ? (l & 1) | 2 : l & 1),
              et && Ye(e, a.treeForkCount),
              t)
            : (Et(e), null);
        case 22:
        case 23:
          return (
            he(e),
            pc(),
            (a = e.memoizedState !== null),
            t !== null
              ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
              : a && (e.flags |= 8192),
            a
              ? (l & 536870912) !== 0 &&
                (e.flags & 128) === 0 &&
                (Et(e), e.subtreeFlags & 6 && (e.flags |= 8192))
              : Et(e),
            (l = e.updateQueue),
            l !== null && On(e, l.retryQueue),
            (l = null),
            t !== null &&
              t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (l = t.memoizedState.cachePool.pool),
            (a = null),
            e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (a = e.memoizedState.cachePool.pool),
            a !== l && (e.flags |= 2048),
            t !== null && C(Ll),
            null
          );
        case 24:
          return (
            (l = null),
            t !== null && (l = t.memoizedState.cache),
            e.memoizedState.cache !== l && (e.flags |= 2048),
            Xe(Rt),
            Et(e),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(o(156, e.tag));
    }
    function Um(t, e) {
      switch ((ac(e), e.tag)) {
        case 1:
          return (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null;
        case 3:
          return (
            Xe(Rt),
            zt(),
            (t = e.flags),
            (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 26:
        case 27:
        case 5:
          return Nu(e), null;
        case 31:
          if (e.memoizedState !== null) {
            if ((he(e), e.alternate === null)) throw Error(o(340));
            Bl();
          }
          return (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null;
        case 13:
          if ((he(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
            if (e.alternate === null) throw Error(o(340));
            Bl();
          }
          return (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null;
        case 19:
          return C(Mt), null;
        case 4:
          return zt(), null;
        case 10:
          return Xe(e.type), null;
        case 22:
        case 23:
          return (
            he(e),
            pc(),
            t !== null && C(Ll),
            (t = e.flags),
            t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 24:
          return Xe(Rt), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Pr(t, e) {
      switch ((ac(e), e.tag)) {
        case 3:
          Xe(Rt), zt();
          break;
        case 26:
        case 27:
        case 5:
          Nu(e);
          break;
        case 4:
          zt();
          break;
        case 31:
          e.memoizedState !== null && he(e);
          break;
        case 13:
          he(e);
          break;
        case 19:
          C(Mt);
          break;
        case 10:
          Xe(e.type);
          break;
        case 22:
        case 23:
          he(e), pc(), t !== null && C(Ll);
          break;
        case 24:
          Xe(Rt);
      }
    }
    function du(t, e) {
      try {
        var l = e.updateQueue,
          a = l !== null ? l.lastEffect : null;
        if (a !== null) {
          var u = a.next;
          l = u;
          do {
            if ((l.tag & t) === t) {
              a = void 0;
              var n = l.create,
                c = l.inst;
              (a = n()), (c.destroy = a);
            }
            l = l.next;
          } while (l !== u);
        }
      } catch (s) {
        ot(e, e.return, s);
      }
    }
    function dl(t, e, l) {
      try {
        var a = e.updateQueue,
          u = a !== null ? a.lastEffect : null;
        if (u !== null) {
          var n = u.next;
          a = n;
          do {
            if ((a.tag & t) === t) {
              var c = a.inst,
                s = c.destroy;
              if (s !== void 0) {
                (c.destroy = void 0), (u = e);
                var h = l,
                  p = s;
                try {
                  p();
                } catch (A) {
                  ot(u, h, A);
                }
              }
            }
            a = a.next;
          } while (a !== n);
        }
      } catch (A) {
        ot(e, e.return, A);
      }
    }
    function th(t) {
      var e = t.updateQueue;
      if (e !== null) {
        var l = t.stateNode;
        try {
          Vo(e, l);
        } catch (a) {
          ot(t, t.return, a);
        }
      }
    }
    function eh(t, e, l) {
      (l.props = wl(t.type, t.memoizedProps)), (l.state = t.memoizedState);
      try {
        l.componentWillUnmount();
      } catch (a) {
        ot(t, e, a);
      }
    }
    function yu(t, e) {
      try {
        var l = t.ref;
        if (l !== null) {
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              var a = t.stateNode;
              break;
            case 30:
              a = t.stateNode;
              break;
            default:
              a = t.stateNode;
          }
          typeof l == 'function' ? (t.refCleanup = l(a)) : (l.current = a);
        }
      } catch (u) {
        ot(t, e, u);
      }
    }
    function He(t, e) {
      var l = t.ref,
        a = t.refCleanup;
      if (l !== null)
        if (typeof a == 'function')
          try {
            a();
          } catch (u) {
            ot(t, e, u);
          } finally {
            (t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null);
          }
        else if (typeof l == 'function')
          try {
            l(null);
          } catch (u) {
            ot(t, e, u);
          }
        else l.current = null;
    }
    function lh(t) {
      var e = t.type,
        l = t.memoizedProps,
        a = t.stateNode;
      try {
        t: switch (e) {
          case 'button':
          case 'input':
          case 'select':
          case 'textarea':
            l.autoFocus && a.focus();
            break t;
          case 'img':
            l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
        }
      } catch (u) {
        ot(t, t.return, u);
      }
    }
    function kc(t, e, l) {
      try {
        var a = t.stateNode;
        Pm(a, t.type, l, e), (a[It] = e);
      } catch (u) {
        ot(t, t.return, u);
      }
    }
    function ah(t) {
      return (
        t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && bl(t.type)) || t.tag === 4
      );
    }
    function $c(t) {
      t: for (;;) {
        for (; t.sibling === null; ) {
          if (t.return === null || ah(t.return)) return null;
          t = t.return;
        }
        for (
          t.sibling.return = t.return, t = t.sibling;
          t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

        ) {
          if ((t.tag === 27 && bl(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
            continue t;
          (t.child.return = t), (t = t.child);
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function Ic(t, e, l) {
      var a = t.tag;
      if (a === 5 || a === 6)
        (t = t.stateNode),
          e
            ? (l.nodeType === 9
                ? l.body
                : l.nodeName === 'HTML'
                ? l.ownerDocument.body
                : l
              ).insertBefore(t, e)
            : ((e = l.nodeType === 9 ? l.body : l.nodeName === 'HTML' ? l.ownerDocument.body : l),
              e.appendChild(t),
              (l = l._reactRootContainer),
              l != null || e.onclick !== null || (e.onclick = Qe));
      else if (
        a !== 4 &&
        (a === 27 && bl(t.type) && ((l = t.stateNode), (e = null)), (t = t.child), t !== null)
      )
        for (Ic(t, e, l), t = t.sibling; t !== null; ) Ic(t, e, l), (t = t.sibling);
    }
    function zn(t, e, l) {
      var a = t.tag;
      if (a === 5 || a === 6) (t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t);
      else if (a !== 4 && (a === 27 && bl(t.type) && (l = t.stateNode), (t = t.child), t !== null))
        for (zn(t, e, l), t = t.sibling; t !== null; ) zn(t, e, l), (t = t.sibling);
    }
    function uh(t) {
      var e = t.stateNode,
        l = t.memoizedProps;
      try {
        for (var a = t.type, u = e.attributes; u.length; ) e.removeAttributeNode(u[0]);
        Vt(e, a, l), (e[Yt] = t), (e[It] = l);
      } catch (n) {
        ot(t, t.return, n);
      }
    }
    var Je = !1,
      Ht = !1,
      Pc = !1,
      nh = typeof WeakSet == 'function' ? WeakSet : Set,
      Gt = null;
    function xm(t, e) {
      if (((t = t.containerInfo), (Ef = wn), (t = go(t)), wi(t))) {
        if ('selectionStart' in t) var l = { start: t.selectionStart, end: t.selectionEnd };
        else
          t: {
            l = ((l = t.ownerDocument) && l.defaultView) || window;
            var a = l.getSelection && l.getSelection();
            if (a && a.rangeCount !== 0) {
              l = a.anchorNode;
              var u = a.anchorOffset,
                n = a.focusNode;
              a = a.focusOffset;
              try {
                l.nodeType, n.nodeType;
              } catch {
                l = null;
                break t;
              }
              var c = 0,
                s = -1,
                h = -1,
                p = 0,
                A = 0,
                _ = t,
                S = null;
              e: for (;;) {
                for (
                  var E;
                  _ !== l || (u !== 0 && _.nodeType !== 3) || (s = c + u),
                    _ !== n || (a !== 0 && _.nodeType !== 3) || (h = c + a),
                    _.nodeType === 3 && (c += _.nodeValue.length),
                    (E = _.firstChild) !== null;

                )
                  (S = _), (_ = E);
                for (;;) {
                  if (_ === t) break e;
                  if (
                    (S === l && ++p === u && (s = c),
                    S === n && ++A === a && (h = c),
                    (E = _.nextSibling) !== null)
                  )
                    break;
                  (_ = S), (S = _.parentNode);
                }
                _ = E;
              }
              l = s === -1 || h === -1 ? null : { start: s, end: h };
            } else l = null;
          }
        l = l || { start: 0, end: 0 };
      } else l = null;
      for (Tf = { focusedElem: t, selectionRange: l }, wn = !1, Gt = e; Gt !== null; )
        if (((e = Gt), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
          (t.return = e), (Gt = t);
        else
          for (; Gt !== null; ) {
            switch (((e = Gt), (n = e.alternate), (t = e.flags), e.tag)) {
              case 0:
                if (
                  (t & 4) !== 0 &&
                  ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
                )
                  for (l = 0; l < t.length; l++) (u = t[l]), (u.ref.impl = u.nextImpl);
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((t & 1024) !== 0 && n !== null) {
                  (t = void 0),
                    (l = e),
                    (u = n.memoizedProps),
                    (n = n.memoizedState),
                    (a = l.stateNode);
                  try {
                    var j = wl(l.type, u);
                    (t = a.getSnapshotBeforeUpdate(j, n)),
                      (a.__reactInternalSnapshotBeforeUpdate = t);
                  } catch (L) {
                    ot(l, l.return, L);
                  }
                }
                break;
              case 3:
                if ((t & 1024) !== 0) {
                  if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)) zf(t);
                  else if (l === 1)
                    switch (t.nodeName) {
                      case 'HEAD':
                      case 'HTML':
                      case 'BODY':
                        zf(t);
                        break;
                      default:
                        t.textContent = '';
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((t & 1024) !== 0) throw Error(o(163));
            }
            if (((t = e.sibling), t !== null)) {
              (t.return = e.return), (Gt = t);
              break;
            }
            Gt = e.return;
          }
    }
    function ih(t, e, l) {
      var a = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          We(t, l), a & 4 && du(5, l);
          break;
        case 1:
          if ((We(t, l), a & 4))
            if (((t = l.stateNode), e === null))
              try {
                t.componentDidMount();
              } catch (c) {
                ot(l, l.return, c);
              }
            else {
              var u = wl(l.type, e.memoizedProps);
              e = e.memoizedState;
              try {
                t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
              } catch (c) {
                ot(l, l.return, c);
              }
            }
          a & 64 && th(l), a & 512 && yu(l, l.return);
          break;
        case 3:
          if ((We(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
            if (((e = null), l.child !== null))
              switch (l.child.tag) {
                case 27:
                case 5:
                  e = l.child.stateNode;
                  break;
                case 1:
                  e = l.child.stateNode;
              }
            try {
              Vo(t, e);
            } catch (c) {
              ot(l, l.return, c);
            }
          }
          break;
        case 27:
          e === null && a & 4 && uh(l);
        case 26:
        case 5:
          We(t, l), e === null && a & 4 && lh(l), a & 512 && yu(l, l.return);
          break;
        case 12:
          We(t, l);
          break;
        case 31:
          We(t, l), a & 4 && sh(t, l);
          break;
        case 13:
          We(t, l),
            a & 4 && oh(t, l),
            a & 64 &&
              ((t = l.memoizedState),
              t !== null && ((t = t.dehydrated), t !== null && ((l = Lm.bind(null, l)), cv(t, l))));
          break;
        case 22:
          if (((a = l.memoizedState !== null || Je), !a)) {
            (e = (e !== null && e.memoizedState !== null) || Ht), (u = Je);
            var n = Ht;
            (Je = a),
              (Ht = e) && !n ? ke(t, l, (l.subtreeFlags & 8772) !== 0) : We(t, l),
              (Je = u),
              (Ht = n);
          }
          break;
        case 30:
          break;
        default:
          We(t, l);
      }
    }
    function ch(t) {
      var e = t.alternate;
      e !== null && ((t.alternate = null), ch(e)),
        (t.child = null),
        (t.deletions = null),
        (t.sibling = null),
        t.tag === 5 && ((e = t.stateNode), e !== null && Di(e)),
        (t.stateNode = null),
        (t.return = null),
        (t.dependencies = null),
        (t.memoizedProps = null),
        (t.memoizedState = null),
        (t.pendingProps = null),
        (t.stateNode = null),
        (t.updateQueue = null);
    }
    var Tt = null,
      te = !1;
    function Fe(t, e, l) {
      for (l = l.child; l !== null; ) fh(t, e, l), (l = l.sibling);
    }
    function fh(t, e, l) {
      if (ce && typeof ce.onCommitFiberUnmount == 'function')
        try {
          ce.onCommitFiberUnmount(Ba, l);
        } catch {}
      switch (l.tag) {
        case 26:
          Ht || He(l, e),
            Fe(t, e, l),
            l.memoizedState
              ? l.memoizedState.count--
              : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l));
          break;
        case 27:
          Ht || He(l, e);
          var a = Tt,
            u = te;
          bl(l.type) && ((Tt = l.stateNode), (te = !1)),
            Fe(t, e, l),
            Au(l.stateNode),
            (Tt = a),
            (te = u);
          break;
        case 5:
          Ht || He(l, e);
        case 6:
          if (((a = Tt), (u = te), (Tt = null), Fe(t, e, l), (Tt = a), (te = u), Tt !== null))
            if (te)
              try {
                (Tt.nodeType === 9
                  ? Tt.body
                  : Tt.nodeName === 'HTML'
                  ? Tt.ownerDocument.body
                  : Tt
                ).removeChild(l.stateNode);
              } catch (n) {
                ot(l, e, n);
              }
            else
              try {
                Tt.removeChild(l.stateNode);
              } catch (n) {
                ot(l, e, n);
              }
          break;
        case 18:
          Tt !== null &&
            (te
              ? ((t = Tt),
                td(
                  t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                  l.stateNode,
                ),
                Ha(t))
              : td(Tt, l.stateNode));
          break;
        case 4:
          (a = Tt),
            (u = te),
            (Tt = l.stateNode.containerInfo),
            (te = !0),
            Fe(t, e, l),
            (Tt = a),
            (te = u);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          dl(2, l, e), Ht || dl(4, l, e), Fe(t, e, l);
          break;
        case 1:
          Ht ||
            (He(l, e),
            (a = l.stateNode),
            typeof a.componentWillUnmount == 'function' && eh(l, e, a)),
            Fe(t, e, l);
          break;
        case 21:
          Fe(t, e, l);
          break;
        case 22:
          (Ht = (a = Ht) || l.memoizedState !== null), Fe(t, e, l), (Ht = a);
          break;
        default:
          Fe(t, e, l);
      }
    }
    function sh(t, e) {
      if (
        e.memoizedState === null &&
        ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
      ) {
        t = t.dehydrated;
        try {
          Ha(t);
        } catch (l) {
          ot(e, e.return, l);
        }
      }
    }
    function oh(t, e) {
      if (
        e.memoizedState === null &&
        ((t = e.alternate),
        t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
      )
        try {
          Ha(t);
        } catch (l) {
          ot(e, e.return, l);
        }
    }
    function Hm(t) {
      switch (t.tag) {
        case 31:
        case 13:
        case 19:
          var e = t.stateNode;
          return e === null && (e = t.stateNode = new nh()), e;
        case 22:
          return (
            (t = t.stateNode), (e = t._retryCache), e === null && (e = t._retryCache = new nh()), e
          );
        default:
          throw Error(o(435, t.tag));
      }
    }
    function Mn(t, e) {
      var l = Hm(t);
      e.forEach(function (a) {
        if (!l.has(a)) {
          l.add(a);
          var u = Xm.bind(null, t, a);
          a.then(u, u);
        }
      });
    }
    function ee(t, e) {
      var l = e.deletions;
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var u = l[a],
            n = t,
            c = e,
            s = c;
          t: for (; s !== null; ) {
            switch (s.tag) {
              case 27:
                if (bl(s.type)) {
                  (Tt = s.stateNode), (te = !1);
                  break t;
                }
                break;
              case 5:
                (Tt = s.stateNode), (te = !1);
                break t;
              case 3:
              case 4:
                (Tt = s.stateNode.containerInfo), (te = !0);
                break t;
            }
            s = s.return;
          }
          if (Tt === null) throw Error(o(160));
          fh(n, c, u),
            (Tt = null),
            (te = !1),
            (n = u.alternate),
            n !== null && (n.return = null),
            (u.return = null);
        }
      if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) rh(e, t), (e = e.sibling);
    }
    var De = null;
    function rh(t, e) {
      var l = t.alternate,
        a = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ee(e, t), le(t), a & 4 && (dl(3, t, t.return), du(3, t), dl(5, t, t.return));
          break;
        case 1:
          ee(e, t),
            le(t),
            a & 512 && (Ht || l === null || He(l, l.return)),
            a & 64 &&
              Je &&
              ((t = t.updateQueue),
              t !== null &&
                ((a = t.callbacks),
                a !== null &&
                  ((l = t.shared.hiddenCallbacks),
                  (t.shared.hiddenCallbacks = l === null ? a : l.concat(a)))));
          break;
        case 26:
          var u = De;
          if ((ee(e, t), le(t), a & 512 && (Ht || l === null || He(l, l.return)), a & 4)) {
            var n = l !== null ? l.memoizedState : null;
            if (((a = t.memoizedState), l === null))
              if (a === null)
                if (t.stateNode === null) {
                  t: {
                    (a = t.type), (l = t.memoizedProps), (u = u.ownerDocument || u);
                    e: switch (a) {
                      case 'title':
                        (n = u.getElementsByTagName('title')[0]),
                          (!n ||
                            n[La] ||
                            n[Yt] ||
                            n.namespaceURI === 'http://www.w3.org/2000/svg' ||
                            n.hasAttribute('itemprop')) &&
                            ((n = u.createElement(a)),
                            u.head.insertBefore(n, u.querySelector('head > title'))),
                          Vt(n, a, l),
                          (n[Yt] = t),
                          Bt(n),
                          (a = n);
                        break t;
                      case 'link':
                        var c = rd('link', 'href', u).get(a + (l.href || ''));
                        if (c) {
                          for (var s = 0; s < c.length; s++)
                            if (
                              ((n = c[s]),
                              n.getAttribute('href') ===
                                (l.href == null || l.href === '' ? null : l.href) &&
                                n.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                                n.getAttribute('title') === (l.title == null ? null : l.title) &&
                                n.getAttribute('crossorigin') ===
                                  (l.crossOrigin == null ? null : l.crossOrigin))
                            ) {
                              c.splice(s, 1);
                              break e;
                            }
                        }
                        (n = u.createElement(a)), Vt(n, a, l), u.head.appendChild(n);
                        break;
                      case 'meta':
                        if ((c = rd('meta', 'content', u).get(a + (l.content || '')))) {
                          for (s = 0; s < c.length; s++)
                            if (
                              ((n = c[s]),
                              n.getAttribute('content') ===
                                (l.content == null ? null : '' + l.content) &&
                                n.getAttribute('name') === (l.name == null ? null : l.name) &&
                                n.getAttribute('property') ===
                                  (l.property == null ? null : l.property) &&
                                n.getAttribute('http-equiv') ===
                                  (l.httpEquiv == null ? null : l.httpEquiv) &&
                                n.getAttribute('charset') ===
                                  (l.charSet == null ? null : l.charSet))
                            ) {
                              c.splice(s, 1);
                              break e;
                            }
                        }
                        (n = u.createElement(a)), Vt(n, a, l), u.head.appendChild(n);
                        break;
                      default:
                        throw Error(o(468, a));
                    }
                    (n[Yt] = t), Bt(n), (a = n);
                  }
                  t.stateNode = a;
                } else hd(u, t.type, t.stateNode);
              else t.stateNode = od(u, a, t.memoizedProps);
            else
              n !== a
                ? (n === null
                    ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                    : n.count--,
                  a === null ? hd(u, t.type, t.stateNode) : od(u, a, t.memoizedProps))
                : a === null && t.stateNode !== null && kc(t, t.memoizedProps, l.memoizedProps);
          }
          break;
        case 27:
          ee(e, t),
            le(t),
            a & 512 && (Ht || l === null || He(l, l.return)),
            l !== null && a & 4 && kc(t, t.memoizedProps, l.memoizedProps);
          break;
        case 5:
          if ((ee(e, t), le(t), a & 512 && (Ht || l === null || He(l, l.return)), t.flags & 32)) {
            u = t.stateNode;
            try {
              la(u, '');
            } catch (j) {
              ot(t, t.return, j);
            }
          }
          a & 4 &&
            t.stateNode != null &&
            ((u = t.memoizedProps), kc(t, u, l !== null ? l.memoizedProps : u)),
            a & 1024 && (Pc = !0);
          break;
        case 6:
          if ((ee(e, t), le(t), a & 4)) {
            if (t.stateNode === null) throw Error(o(162));
            (a = t.memoizedProps), (l = t.stateNode);
            try {
              l.nodeValue = a;
            } catch (j) {
              ot(t, t.return, j);
            }
          }
          break;
        case 3:
          if (
            ((Xn = null),
            (u = De),
            (De = Yn(e.containerInfo)),
            ee(e, t),
            (De = u),
            le(t),
            a & 4 && l !== null && l.memoizedState.isDehydrated)
          )
            try {
              Ha(e.containerInfo);
            } catch (j) {
              ot(t, t.return, j);
            }
          Pc && ((Pc = !1), hh(t));
          break;
        case 4:
          (a = De), (De = Yn(t.stateNode.containerInfo)), ee(e, t), le(t), (De = a);
          break;
        case 12:
          ee(e, t), le(t);
          break;
        case 31:
          ee(e, t),
            le(t),
            a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), Mn(t, a)));
          break;
        case 13:
          ee(e, t),
            le(t),
            t.child.flags & 8192 &&
              (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
              (Cn = ie()),
            a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), Mn(t, a)));
          break;
        case 22:
          u = t.memoizedState !== null;
          var h = l !== null && l.memoizedState !== null,
            p = Je,
            A = Ht;
          if (((Je = p || u), (Ht = A || h), ee(e, t), (Ht = A), (Je = p), le(t), a & 8192))
            t: for (
              e = t.stateNode,
                e._visibility = u ? e._visibility & -2 : e._visibility | 1,
                u && (l === null || h || Je || Ht || Jl(t)),
                l = null,
                e = t;
              ;

            ) {
              if (e.tag === 5 || e.tag === 26) {
                if (l === null) {
                  h = l = e;
                  try {
                    if (((n = h.stateNode), u))
                      (c = n.style),
                        typeof c.setProperty == 'function'
                          ? c.setProperty('display', 'none', 'important')
                          : (c.display = 'none');
                    else {
                      s = h.stateNode;
                      var _ = h.memoizedProps.style,
                        S = _ != null && _.hasOwnProperty('display') ? _.display : null;
                      s.style.display = S == null || typeof S == 'boolean' ? '' : ('' + S).trim();
                    }
                  } catch (j) {
                    ot(h, h.return, j);
                  }
                }
              } else if (e.tag === 6) {
                if (l === null) {
                  h = e;
                  try {
                    h.stateNode.nodeValue = u ? '' : h.memoizedProps;
                  } catch (j) {
                    ot(h, h.return, j);
                  }
                }
              } else if (e.tag === 18) {
                if (l === null) {
                  h = e;
                  try {
                    var E = h.stateNode;
                    u ? ed(E, !0) : ed(h.stateNode, !1);
                  } catch (j) {
                    ot(h, h.return, j);
                  }
                }
              } else if (
                ((e.tag !== 22 && e.tag !== 23) || e.memoizedState === null || e === t) &&
                e.child !== null
              ) {
                (e.child.return = e), (e = e.child);
                continue;
              }
              if (e === t) break t;
              for (; e.sibling === null; ) {
                if (e.return === null || e.return === t) break t;
                l === e && (l = null), (e = e.return);
              }
              l === e && (l = null), (e.sibling.return = e.return), (e = e.sibling);
            }
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((l = a.retryQueue), l !== null && ((a.retryQueue = null), Mn(t, l))));
          break;
        case 19:
          ee(e, t),
            le(t),
            a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), Mn(t, a)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          ee(e, t), le(t);
      }
    }
    function le(t) {
      var e = t.flags;
      if (e & 2) {
        try {
          for (var l, a = t.return; a !== null; ) {
            if (ah(a)) {
              l = a;
              break;
            }
            a = a.return;
          }
          if (l == null) throw Error(o(160));
          switch (l.tag) {
            case 27:
              var u = l.stateNode,
                n = $c(t);
              zn(t, n, u);
              break;
            case 5:
              var c = l.stateNode;
              l.flags & 32 && (la(c, ''), (l.flags &= -33));
              var s = $c(t);
              zn(t, s, c);
              break;
            case 3:
            case 4:
              var h = l.stateNode.containerInfo,
                p = $c(t);
              Ic(t, p, h);
              break;
            default:
              throw Error(o(161));
          }
        } catch (A) {
          ot(t, t.return, A);
        }
        t.flags &= -3;
      }
      e & 4096 && (t.flags &= -4097);
    }
    function hh(t) {
      if (t.subtreeFlags & 1024)
        for (t = t.child; t !== null; ) {
          var e = t;
          hh(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling);
        }
    }
    function We(t, e) {
      if (e.subtreeFlags & 8772)
        for (e = e.child; e !== null; ) ih(t, e.alternate, e), (e = e.sibling);
    }
    function Jl(t) {
      for (t = t.child; t !== null; ) {
        var e = t;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            dl(4, e, e.return), Jl(e);
            break;
          case 1:
            He(e, e.return);
            var l = e.stateNode;
            typeof l.componentWillUnmount == 'function' && eh(e, e.return, l), Jl(e);
            break;
          case 27:
            Au(e.stateNode);
          case 26:
          case 5:
            He(e, e.return), Jl(e);
            break;
          case 22:
            e.memoizedState === null && Jl(e);
            break;
          case 30:
            Jl(e);
            break;
          default:
            Jl(e);
        }
        t = t.sibling;
      }
    }
    function ke(t, e, l) {
      for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
        var a = e.alternate,
          u = t,
          n = e,
          c = n.flags;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            ke(u, n, l), du(4, n);
            break;
          case 1:
            if ((ke(u, n, l), (a = n), (u = a.stateNode), typeof u.componentDidMount == 'function'))
              try {
                u.componentDidMount();
              } catch (p) {
                ot(a, a.return, p);
              }
            if (((a = n), (u = a.updateQueue), u !== null)) {
              var s = a.stateNode;
              try {
                var h = u.shared.hiddenCallbacks;
                if (h !== null)
                  for (u.shared.hiddenCallbacks = null, u = 0; u < h.length; u++) Zo(h[u], s);
              } catch (p) {
                ot(a, a.return, p);
              }
            }
            l && c & 64 && th(n), yu(n, n.return);
            break;
          case 27:
            uh(n);
          case 26:
          case 5:
            ke(u, n, l), l && a === null && c & 4 && lh(n), yu(n, n.return);
            break;
          case 12:
            ke(u, n, l);
            break;
          case 31:
            ke(u, n, l), l && c & 4 && sh(u, n);
            break;
          case 13:
            ke(u, n, l), l && c & 4 && oh(u, n);
            break;
          case 22:
            n.memoizedState === null && ke(u, n, l), yu(n, n.return);
            break;
          case 30:
            break;
          default:
            ke(u, n, l);
        }
        e = e.sibling;
      }
    }
    function tf(t, e) {
      var l = null;
      t !== null &&
        t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
        (t = null),
        e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (t = e.memoizedState.cachePool.pool),
        t !== l && (t != null && t.refCount++, l != null && tu(l));
    }
    function ef(t, e) {
      (t = null),
        e.alternate !== null && (t = e.alternate.memoizedState.cache),
        (e = e.memoizedState.cache),
        e !== t && (e.refCount++, t != null && tu(t));
    }
    function Re(t, e, l, a) {
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) dh(t, e, l, a), (e = e.sibling);
    }
    function dh(t, e, l, a) {
      var u = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Re(t, e, l, a), u & 2048 && du(9, e);
          break;
        case 1:
          Re(t, e, l, a);
          break;
        case 3:
          Re(t, e, l, a),
            u & 2048 &&
              ((t = null),
              e.alternate !== null && (t = e.alternate.memoizedState.cache),
              (e = e.memoizedState.cache),
              e !== t && (e.refCount++, t != null && tu(t)));
          break;
        case 12:
          if (u & 2048) {
            Re(t, e, l, a), (t = e.stateNode);
            try {
              var n = e.memoizedProps,
                c = n.id,
                s = n.onPostCommit;
              typeof s == 'function' &&
                s(c, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
            } catch (h) {
              ot(e, e.return, h);
            }
          } else Re(t, e, l, a);
          break;
        case 31:
          Re(t, e, l, a);
          break;
        case 13:
          Re(t, e, l, a);
          break;
        case 23:
          break;
        case 22:
          (n = e.stateNode),
            (c = e.alternate),
            e.memoizedState !== null
              ? n._visibility & 2
                ? Re(t, e, l, a)
                : mu(t, e)
              : n._visibility & 2
              ? Re(t, e, l, a)
              : ((n._visibility |= 2), Ta(t, e, l, a, (e.subtreeFlags & 10256) !== 0 || !1)),
            u & 2048 && tf(c, e);
          break;
        case 24:
          Re(t, e, l, a), u & 2048 && ef(e.alternate, e);
          break;
        default:
          Re(t, e, l, a);
      }
    }
    function Ta(t, e, l, a, u) {
      for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
        var n = t,
          c = e,
          s = l,
          h = a,
          p = c.flags;
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
            Ta(n, c, s, h, u), du(8, c);
            break;
          case 23:
            break;
          case 22:
            var A = c.stateNode;
            c.memoizedState !== null
              ? A._visibility & 2
                ? Ta(n, c, s, h, u)
                : mu(n, c)
              : ((A._visibility |= 2), Ta(n, c, s, h, u)),
              u && p & 2048 && tf(c.alternate, c);
            break;
          case 24:
            Ta(n, c, s, h, u), u && p & 2048 && ef(c.alternate, c);
            break;
          default:
            Ta(n, c, s, h, u);
        }
        e = e.sibling;
      }
    }
    function mu(t, e) {
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) {
          var l = t,
            a = e,
            u = a.flags;
          switch (a.tag) {
            case 22:
              mu(l, a), u & 2048 && tf(a.alternate, a);
              break;
            case 24:
              mu(l, a), u & 2048 && ef(a.alternate, a);
              break;
            default:
              mu(l, a);
          }
          e = e.sibling;
        }
    }
    var vu = 8192;
    function Aa(t, e, l) {
      if (t.subtreeFlags & vu) for (t = t.child; t !== null; ) yh(t, e, l), (t = t.sibling);
    }
    function yh(t, e, l) {
      switch (t.tag) {
        case 26:
          Aa(t, e, l),
            t.flags & vu && t.memoizedState !== null && Sv(l, De, t.memoizedState, t.memoizedProps);
          break;
        case 5:
          Aa(t, e, l);
          break;
        case 3:
        case 4:
          var a = De;
          (De = Yn(t.stateNode.containerInfo)), Aa(t, e, l), (De = a);
          break;
        case 22:
          t.memoizedState === null &&
            ((a = t.alternate),
            a !== null && a.memoizedState !== null
              ? ((a = vu), (vu = 16777216), Aa(t, e, l), (vu = a))
              : Aa(t, e, l));
          break;
        default:
          Aa(t, e, l);
      }
    }
    function mh(t) {
      var e = t.alternate;
      if (e !== null && ((t = e.child), t !== null)) {
        e.child = null;
        do (e = t.sibling), (t.sibling = null), (t = e);
        while (t !== null);
      }
    }
    function gu(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var l = 0; l < e.length; l++) {
            var a = e[l];
            (Gt = a), gh(a, t);
          }
        mh(t);
      }
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) vh(t), (t = t.sibling);
    }
    function vh(t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          gu(t), t.flags & 2048 && dl(9, t, t.return);
          break;
        case 3:
          gu(t);
          break;
        case 12:
          gu(t);
          break;
        case 22:
          var e = t.stateNode;
          t.memoizedState !== null &&
          e._visibility & 2 &&
          (t.return === null || t.return.tag !== 13)
            ? ((e._visibility &= -3), _n(t))
            : gu(t);
          break;
        default:
          gu(t);
      }
    }
    function _n(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var l = 0; l < e.length; l++) {
            var a = e[l];
            (Gt = a), gh(a, t);
          }
        mh(t);
      }
      for (t = t.child; t !== null; ) {
        switch (((e = t), e.tag)) {
          case 0:
          case 11:
          case 15:
            dl(8, e, e.return), _n(e);
            break;
          case 22:
            (l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), _n(e));
            break;
          default:
            _n(e);
        }
        t = t.sibling;
      }
    }
    function gh(t, e) {
      for (; Gt !== null; ) {
        var l = Gt;
        switch (l.tag) {
          case 0:
          case 11:
          case 15:
            dl(8, l, e);
            break;
          case 23:
          case 22:
            if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
              var a = l.memoizedState.cachePool.pool;
              a != null && a.refCount++;
            }
            break;
          case 24:
            tu(l.memoizedState.cache);
        }
        if (((a = l.child), a !== null)) (a.return = l), (Gt = a);
        else
          t: for (l = t; Gt !== null; ) {
            a = Gt;
            var u = a.sibling,
              n = a.return;
            if ((ch(a), a === l)) {
              Gt = null;
              break t;
            }
            if (u !== null) {
              (u.return = n), (Gt = u);
              break t;
            }
            Gt = n;
          }
      }
    }
    var Nm = {
        getCacheForType: function (t) {
          var e = Xt(Rt),
            l = e.data.get(t);
          return l === void 0 && ((l = t()), e.data.set(t, l)), l;
        },
        cacheSignal: function () {
          return Xt(Rt).controller.signal;
        },
      },
      qm = typeof WeakMap == 'function' ? WeakMap : Map,
      it = 0,
      pt = null,
      k = null,
      I = 0,
      st = 0,
      de = null,
      yl = !1,
      Oa = !1,
      lf = !1,
      $e = 0,
      Ot = 0,
      ml = 0,
      Fl = 0,
      af = 0,
      ye = 0,
      za = 0,
      pu = null,
      ae = null,
      uf = !1,
      Cn = 0,
      ph = 0,
      Dn = 1 / 0,
      Rn = null,
      vl = null,
      qt = 0,
      gl = null,
      Ma = null,
      Ie = 0,
      nf = 0,
      cf = null,
      Sh = null,
      Su = 0,
      ff = null;
    function me() {
      return (it & 2) !== 0 && I !== 0 ? I & -I : O.T !== null ? yf() : Ns();
    }
    function bh() {
      if (ye === 0)
        if ((I & 536870912) === 0 || et) {
          var t = Qu;
          (Qu <<= 1), (Qu & 3932160) === 0 && (Qu = 262144), (ye = t);
        } else ye = 536870912;
      return (t = re.current), t !== null && (t.flags |= 32), ye;
    }
    function ue(t, e, l) {
      ((t === pt && (st === 2 || st === 9)) || t.cancelPendingCommit !== null) &&
        (_a(t, 0), pl(t, I, ye, !1)),
        Ya(t, l),
        ((it & 2) === 0 || t !== pt) &&
          (t === pt && ((it & 2) === 0 && (Fl |= l), Ot === 4 && pl(t, I, ye, !1)), Ne(t));
    }
    function Eh(t, e, l) {
      if ((it & 6) !== 0) throw Error(o(327));
      var a = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Ga(t, e),
        u = a ? Bm(t, e) : of(t, e, !0),
        n = a;
      do {
        if (u === 0) {
          Oa && !a && pl(t, e, 0, !1);
          break;
        } else {
          if (((l = t.current.alternate), n && !jm(l))) {
            (u = of(t, e, !1)), (n = !1);
            continue;
          }
          if (u === 2) {
            if (((n = e), t.errorRecoveryDisabledLanes & n)) var c = 0;
            else
              (c = t.pendingLanes & -536870913), (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0);
            if (c !== 0) {
              e = c;
              t: {
                var s = t;
                u = pu;
                var h = s.current.memoizedState.isDehydrated;
                if ((h && (_a(s, c).flags |= 256), (c = of(s, c, !1)), c !== 2)) {
                  if (lf && !h) {
                    (s.errorRecoveryDisabledLanes |= n), (Fl |= n), (u = 4);
                    break t;
                  }
                  (n = ae), (ae = u), n !== null && (ae === null ? (ae = n) : ae.push.apply(ae, n));
                }
                u = c;
              }
              if (((n = !1), u !== 2)) continue;
            }
          }
          if (u === 1) {
            _a(t, 0), pl(t, e, 0, !0);
            break;
          }
          t: {
            switch (((a = t), (n = u), n)) {
              case 0:
              case 1:
                throw Error(o(345));
              case 4:
                if ((e & 4194048) !== e) break;
              case 6:
                pl(a, e, ye, !yl);
                break t;
              case 2:
                ae = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(o(329));
            }
            if ((e & 62914560) === e && ((u = Cn + 300 - ie()), 10 < u)) {
              if ((pl(a, e, ye, !yl), Gu(a, 0, !0) !== 0)) break t;
              (Ie = e),
                (a.timeoutHandle = Ih(
                  Th.bind(null, a, l, ae, Rn, uf, e, ye, Fl, za, yl, n, 'Throttled', -0, 0),
                  u,
                ));
              break t;
            }
            Th(a, l, ae, Rn, uf, e, ye, Fl, za, yl, n, null, -0, 0);
          }
        }
        break;
      } while (!0);
      Ne(t);
    }
    function Th(t, e, l, a, u, n, c, s, h, p, A, _, S, E) {
      if (((t.timeoutHandle = -1), (_ = e.subtreeFlags), _ & 8192 || (_ & 16785408) === 16785408)) {
        (_ = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: Qe,
        }),
          yh(e, n, _);
        var j = (n & 62914560) === n ? Cn - ie() : (n & 4194048) === n ? ph - ie() : 0;
        if (((j = bv(_, j)), j !== null)) {
          (Ie = n),
            (t.cancelPendingCommit = j(Rh.bind(null, t, e, n, l, a, u, c, s, h, A, _, null, S, E))),
            pl(t, n, c, !p);
          return;
        }
      }
      Rh(t, e, n, l, a, u, c, s, h);
    }
    function jm(t) {
      for (var e = t; ; ) {
        var l = e.tag;
        if (
          (l === 0 || l === 11 || l === 15) &&
          e.flags & 16384 &&
          ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
        )
          for (var a = 0; a < l.length; a++) {
            var u = l[a],
              n = u.getSnapshot;
            u = u.value;
            try {
              if (!se(n(), u)) return !1;
            } catch {
              return !1;
            }
          }
        if (((l = e.child), e.subtreeFlags & 16384 && l !== null)) (l.return = e), (e = l);
        else {
          if (e === t) break;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) return !0;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      }
      return !0;
    }
    function pl(t, e, l, a) {
      (e &= ~af),
        (e &= ~Fl),
        (t.suspendedLanes |= e),
        (t.pingedLanes &= ~e),
        a && (t.warmLanes |= e),
        (a = t.expirationTimes);
      for (var u = e; 0 < u; ) {
        var n = 31 - fe(u),
          c = 1 << n;
        (a[n] = -1), (u &= ~c);
      }
      l !== 0 && Us(t, l, e);
    }
    function Un() {
      return (it & 6) === 0 ? (bu(0), !1) : !0;
    }
    function sf() {
      if (k !== null) {
        if (st === 0) var t = k.return;
        else (t = k), (Le = Gl = null), Oc(t), (ga = null), (lu = 0), (t = k);
        for (; t !== null; ) Pr(t.alternate, t), (t = t.return);
        k = null;
      }
    }
    function _a(t, e) {
      var l = t.timeoutHandle;
      l !== -1 && ((t.timeoutHandle = -1), lv(l)),
        (l = t.cancelPendingCommit),
        l !== null && ((t.cancelPendingCommit = null), l()),
        (Ie = 0),
        sf(),
        (pt = t),
        (k = l = Ge(t.current, null)),
        (I = e),
        (st = 0),
        (de = null),
        (yl = !1),
        (Oa = Ga(t, e)),
        (lf = !1),
        (za = ye = af = Fl = ml = Ot = 0),
        (ae = pu = null),
        (uf = !1),
        (e & 8) !== 0 && (e |= e & 32);
      var a = t.entangledLanes;
      if (a !== 0)
        for (t = t.entanglements, a &= e; 0 < a; ) {
          var u = 31 - fe(a),
            n = 1 << u;
          (e |= t[u]), (a &= ~n);
        }
      return ($e = e), $u(), l;
    }
    function Ah(t, e) {
      (J = null),
        (O.H = ou),
        e === va || e === nn
          ? ((e = Go()), (st = 3))
          : e === hc
          ? ((e = Go()), (st = 4))
          : (st =
              e === Yc
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                ? 6
                : 1),
        (de = e),
        k === null && ((Ot = 1), bn(t, be(e, t.current)));
    }
    function Oh() {
      var t = re.current;
      return t === null
        ? !0
        : (I & 4194048) === I
        ? Oe === null
        : (I & 62914560) === I || (I & 536870912) !== 0
        ? t === Oe
        : !1;
    }
    function zh() {
      var t = O.H;
      return (O.H = ou), t === null ? ou : t;
    }
    function Mh() {
      var t = O.A;
      return (O.A = Nm), t;
    }
    function xn() {
      (Ot = 4),
        yl || ((I & 4194048) !== I && re.current !== null) || (Oa = !0),
        ((ml & 134217727) === 0 && (Fl & 134217727) === 0) || pt === null || pl(pt, I, ye, !1);
    }
    function of(t, e, l) {
      var a = it;
      it |= 2;
      var u = zh(),
        n = Mh();
      (pt !== t || I !== e) && ((Rn = null), _a(t, e)), (e = !1);
      var c = Ot;
      t: do
        try {
          if (st !== 0 && k !== null) {
            var s = k,
              h = de;
            switch (st) {
              case 8:
                sf(), (c = 6);
                break t;
              case 3:
              case 2:
              case 9:
              case 6:
                re.current === null && (e = !0);
                var p = st;
                if (((st = 0), (de = null), Ca(t, s, h, p), l && Oa)) {
                  c = 0;
                  break t;
                }
                break;
              default:
                (p = st), (st = 0), (de = null), Ca(t, s, h, p);
            }
          }
          Qm(), (c = Ot);
          break;
        } catch (A) {
          Ah(t, A);
        }
      while (!0);
      return (
        e && t.shellSuspendCounter++,
        (Le = Gl = null),
        (it = a),
        (O.H = u),
        (O.A = n),
        k === null && ((pt = null), (I = 0), $u()),
        c
      );
    }
    function Qm() {
      for (; k !== null; ) _h(k);
    }
    function Bm(t, e) {
      var l = it;
      it |= 2;
      var a = zh(),
        u = Mh();
      pt !== t || I !== e ? ((Rn = null), (Dn = ie() + 500), _a(t, e)) : (Oa = Ga(t, e));
      t: do
        try {
          if (st !== 0 && k !== null) {
            e = k;
            var n = de;
            e: switch (st) {
              case 1:
                (st = 0), (de = null), Ca(t, e, n, 1);
                break;
              case 2:
              case 9:
                if (Qo(n)) {
                  (st = 0), (de = null), Ch(e);
                  break;
                }
                (e = function () {
                  (st !== 2 && st !== 9) || pt !== t || (st = 7), Ne(t);
                }),
                  n.then(e, e);
                break t;
              case 3:
                st = 7;
                break t;
              case 4:
                st = 5;
                break t;
              case 7:
                Qo(n) ? ((st = 0), (de = null), Ch(e)) : ((st = 0), (de = null), Ca(t, e, n, 7));
                break;
              case 5:
                var c = null;
                switch (k.tag) {
                  case 26:
                    c = k.memoizedState;
                  case 5:
                  case 27:
                    var s = k;
                    if (c ? dd(c) : s.stateNode.complete) {
                      (st = 0), (de = null);
                      var h = s.sibling;
                      if (h !== null) k = h;
                      else {
                        var p = s.return;
                        p !== null ? ((k = p), Hn(p)) : (k = null);
                      }
                      break e;
                    }
                }
                (st = 0), (de = null), Ca(t, e, n, 5);
                break;
              case 6:
                (st = 0), (de = null), Ca(t, e, n, 6);
                break;
              case 8:
                sf(), (Ot = 6);
                break t;
              default:
                throw Error(o(462));
            }
          }
          Gm();
          break;
        } catch (A) {
          Ah(t, A);
        }
      while (!0);
      return (
        (Le = Gl = null),
        (O.H = a),
        (O.A = u),
        (it = l),
        k !== null ? 0 : ((pt = null), (I = 0), $u(), Ot)
      );
    }
    function Gm() {
      for (; k !== null && !f0(); ) _h(k);
    }
    function _h(t) {
      var e = $r(t.alternate, t, $e);
      (t.memoizedProps = t.pendingProps), e === null ? Hn(t) : (k = e);
    }
    function Ch(t) {
      var e = t,
        l = e.alternate;
      switch (e.tag) {
        case 15:
        case 0:
          e = Kr(l, e, e.pendingProps, e.type, void 0, I);
          break;
        case 11:
          e = Kr(l, e, e.pendingProps, e.type.render, e.ref, I);
          break;
        case 5:
          Oc(e);
        default:
          Pr(l, e), (e = k = Mo(e, $e)), (e = $r(l, e, $e));
      }
      (t.memoizedProps = t.pendingProps), e === null ? Hn(t) : (k = e);
    }
    function Ca(t, e, l, a) {
      (Le = Gl = null), Oc(e), (ga = null), (lu = 0);
      var u = e.return;
      try {
        if (_m(t, u, e, l, I)) {
          (Ot = 1), bn(t, be(l, t.current)), (k = null);
          return;
        }
      } catch (n) {
        if (u !== null) throw ((k = u), n);
        (Ot = 1), bn(t, be(l, t.current)), (k = null);
        return;
      }
      e.flags & 32768
        ? (et || a === 1
            ? (t = !0)
            : Oa || (I & 536870912) !== 0
            ? (t = !1)
            : ((yl = t = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = re.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
          Dh(e, t))
        : Hn(e);
    }
    function Hn(t) {
      var e = t;
      do {
        if ((e.flags & 32768) !== 0) {
          Dh(e, yl);
          return;
        }
        t = e.return;
        var l = Rm(e.alternate, e, $e);
        if (l !== null) {
          k = l;
          return;
        }
        if (((e = e.sibling), e !== null)) {
          k = e;
          return;
        }
        k = e = t;
      } while (e !== null);
      Ot === 0 && (Ot = 5);
    }
    function Dh(t, e) {
      do {
        var l = Um(t.alternate, t);
        if (l !== null) {
          (l.flags &= 32767), (k = l);
          return;
        }
        if (
          ((l = t.return),
          l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
          !e && ((t = t.sibling), t !== null))
        ) {
          k = t;
          return;
        }
        k = t = l;
      } while (t !== null);
      (Ot = 6), (k = null);
    }
    function Rh(t, e, l, a, u, n, c, s, h) {
      t.cancelPendingCommit = null;
      do Nn();
      while (qt !== 0);
      if ((it & 6) !== 0) throw Error(o(327));
      if (e !== null) {
        if (e === t.current) throw Error(o(177));
        if (
          ((n = e.lanes | e.childLanes),
          (n |= $i),
          p0(t, l, n, c, s, h),
          t === pt && ((k = pt = null), (I = 0)),
          (Ma = e),
          (gl = t),
          (Ie = l),
          (nf = n),
          (cf = u),
          (Sh = a),
          (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
            ? ((t.callbackNode = null),
              (t.callbackPriority = 0),
              Zm(qu, function () {
                return qh(), null;
              }))
            : ((t.callbackNode = null), (t.callbackPriority = 0)),
          (a = (e.flags & 13878) !== 0),
          (e.subtreeFlags & 13878) !== 0 || a)
        ) {
          (a = O.T), (O.T = null), (u = H.p), (H.p = 2), (c = it), (it |= 4);
          try {
            xm(t, e, l);
          } finally {
            (it = c), (H.p = u), (O.T = a);
          }
        }
        (qt = 1), Uh(), xh(), Hh();
      }
    }
    function Uh() {
      if (qt === 1) {
        qt = 0;
        var t = gl,
          e = Ma,
          l = (e.flags & 13878) !== 0;
        if ((e.subtreeFlags & 13878) !== 0 || l) {
          (l = O.T), (O.T = null);
          var a = H.p;
          H.p = 2;
          var u = it;
          it |= 4;
          try {
            rh(e, t);
            var n = Tf,
              c = go(t.containerInfo),
              s = n.focusedElem,
              h = n.selectionRange;
            if (c !== s && s && s.ownerDocument && vo(s.ownerDocument.documentElement, s)) {
              if (h !== null && wi(s)) {
                var p = h.start,
                  A = h.end;
                if ((A === void 0 && (A = p), 'selectionStart' in s))
                  (s.selectionStart = p), (s.selectionEnd = Math.min(A, s.value.length));
                else {
                  var _ = s.ownerDocument || document,
                    S = (_ && _.defaultView) || window;
                  if (S.getSelection) {
                    var E = S.getSelection(),
                      j = s.textContent.length,
                      L = Math.min(h.start, j),
                      mt = h.end === void 0 ? L : Math.min(h.end, j);
                    !E.extend && L > mt && ((c = mt), (mt = L), (L = c));
                    var m = mo(s, L),
                      d = mo(s, mt);
                    if (
                      m &&
                      d &&
                      (E.rangeCount !== 1 ||
                        E.anchorNode !== m.node ||
                        E.anchorOffset !== m.offset ||
                        E.focusNode !== d.node ||
                        E.focusOffset !== d.offset)
                    ) {
                      var v = _.createRange();
                      v.setStart(m.node, m.offset),
                        E.removeAllRanges(),
                        L > mt
                          ? (E.addRange(v), E.extend(d.node, d.offset))
                          : (v.setEnd(d.node, d.offset), E.addRange(v));
                    }
                  }
                }
              }
              for (_ = [], E = s; (E = E.parentNode); )
                E.nodeType === 1 && _.push({ element: E, left: E.scrollLeft, top: E.scrollTop });
              for (typeof s.focus == 'function' && s.focus(), s = 0; s < _.length; s++) {
                var z = _[s];
                (z.element.scrollLeft = z.left), (z.element.scrollTop = z.top);
              }
            }
            (wn = !!Ef), (Tf = Ef = null);
          } finally {
            (it = u), (H.p = a), (O.T = l);
          }
        }
        (t.current = e), (qt = 2);
      }
    }
    function xh() {
      if (qt === 2) {
        qt = 0;
        var t = gl,
          e = Ma,
          l = (e.flags & 8772) !== 0;
        if ((e.subtreeFlags & 8772) !== 0 || l) {
          (l = O.T), (O.T = null);
          var a = H.p;
          H.p = 2;
          var u = it;
          it |= 4;
          try {
            ih(t, e.alternate, e);
          } finally {
            (it = u), (H.p = a), (O.T = l);
          }
        }
        qt = 3;
      }
    }
    function Hh() {
      if (qt === 4 || qt === 3) {
        (qt = 0), s0();
        var t = gl,
          e = Ma,
          l = Ie,
          a = Sh;
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? (qt = 5)
          : ((qt = 0), (Ma = gl = null), Nh(t, t.pendingLanes));
        var u = t.pendingLanes;
        if (
          (u === 0 && (vl = null),
          _i(l),
          (e = e.stateNode),
          ce && typeof ce.onCommitFiberRoot == 'function')
        )
          try {
            ce.onCommitFiberRoot(Ba, e, void 0, (e.current.flags & 128) === 128);
          } catch {}
        if (a !== null) {
          (e = O.T), (u = H.p), (H.p = 2), (O.T = null);
          try {
            for (var n = t.onRecoverableError, c = 0; c < a.length; c++) {
              var s = a[c];
              n(s.value, { componentStack: s.stack });
            }
          } finally {
            (O.T = e), (H.p = u);
          }
        }
        (Ie & 3) !== 0 && Nn(),
          Ne(t),
          (u = t.pendingLanes),
          (l & 261930) !== 0 && (u & 42) !== 0
            ? t === ff
              ? Su++
              : ((Su = 0), (ff = t))
            : (Su = 0),
          bu(0);
      }
    }
    function Nh(t, e) {
      (t.pooledCacheLanes &= e) === 0 &&
        ((e = t.pooledCache), e != null && ((t.pooledCache = null), tu(e)));
    }
    function Nn() {
      return Uh(), xh(), Hh(), qh();
    }
    function qh() {
      if (qt !== 5) return !1;
      var t = gl,
        e = nf;
      nf = 0;
      var l = _i(Ie),
        a = O.T,
        u = H.p;
      try {
        (H.p = 32 > l ? 32 : l), (O.T = null), (l = cf), (cf = null);
        var n = gl,
          c = Ie;
        if (((qt = 0), (Ma = gl = null), (Ie = 0), (it & 6) !== 0)) throw Error(o(331));
        var s = it;
        if (
          ((it |= 4),
          vh(n.current),
          dh(n, n.current, c, l),
          (it = s),
          bu(0, !1),
          ce && typeof ce.onPostCommitFiberRoot == 'function')
        )
          try {
            ce.onPostCommitFiberRoot(Ba, n);
          } catch {}
        return !0;
      } finally {
        (H.p = u), (O.T = a), Nh(t, e);
      }
    }
    function jh(t, e, l) {
      (e = be(l, e)),
        (e = Gc(t.stateNode, e, 2)),
        (t = ol(t, e, 2)),
        t !== null && (Ya(t, 2), Ne(t));
    }
    function ot(t, e, l) {
      if (t.tag === 3) jh(t, t, l);
      else
        for (; e !== null; ) {
          if (e.tag === 3) {
            jh(e, t, l);
            break;
          } else if (e.tag === 1) {
            var a = e.stateNode;
            if (
              typeof e.type.getDerivedStateFromError == 'function' ||
              (typeof a.componentDidCatch == 'function' && (vl === null || !vl.has(a)))
            ) {
              (t = be(l, t)),
                (l = Qr(2)),
                (a = ol(e, l, 2)),
                a !== null && (Br(l, a, e, t), Ya(a, 2), Ne(a));
              break;
            }
          }
          e = e.return;
        }
    }
    function rf(t, e, l) {
      var a = t.pingCache;
      if (a === null) {
        a = t.pingCache = new qm();
        var u = new Set();
        a.set(e, u);
      } else (u = a.get(e)), u === void 0 && ((u = new Set()), a.set(e, u));
      u.has(l) || ((lf = !0), u.add(l), (t = Ym.bind(null, t, e, l)), e.then(t, t));
    }
    function Ym(t, e, l) {
      var a = t.pingCache;
      a !== null && a.delete(e),
        (t.pingedLanes |= t.suspendedLanes & l),
        (t.warmLanes &= ~l),
        pt === t &&
          (I & l) === l &&
          (Ot === 4 || (Ot === 3 && (I & 62914560) === I && 300 > ie() - Cn)
            ? (it & 2) === 0 && _a(t, 0)
            : (af |= l),
          za === I && (za = 0)),
        Ne(t);
    }
    function Qh(t, e) {
      e === 0 && (e = Rs()), (t = jl(t, e)), t !== null && (Ya(t, e), Ne(t));
    }
    function Lm(t) {
      var e = t.memoizedState,
        l = 0;
      e !== null && (l = e.retryLane), Qh(t, l);
    }
    function Xm(t, e) {
      var l = 0;
      switch (t.tag) {
        case 31:
        case 13:
          var a = t.stateNode,
            u = t.memoizedState;
          u !== null && (l = u.retryLane);
          break;
        case 19:
          a = t.stateNode;
          break;
        case 22:
          a = t.stateNode._retryCache;
          break;
        default:
          throw Error(o(314));
      }
      a !== null && a.delete(e), Qh(t, l);
    }
    function Zm(t, e) {
      return Ai(t, e);
    }
    var qn = null,
      Da = null,
      hf = !1,
      jn = !1,
      df = !1,
      Sl = 0;
    function Ne(t) {
      t !== Da && t.next === null && (Da === null ? (qn = Da = t) : (Da = Da.next = t)),
        (jn = !0),
        hf || ((hf = !0), Km());
    }
    function bu(t, e) {
      if (!df && jn) {
        df = !0;
        do
          for (var l = !1, a = qn; a !== null; ) {
            if (t !== 0) {
              var u = a.pendingLanes;
              if (u === 0) var n = 0;
              else {
                var c = a.suspendedLanes,
                  s = a.pingedLanes;
                (n = (1 << (31 - fe(42 | t) + 1)) - 1),
                  (n &= u & ~(c & ~s)),
                  (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
              }
              n !== 0 && ((l = !0), Lh(a, n));
            } else
              (n = I),
                (n = Gu(
                  a,
                  a === pt ? n : 0,
                  a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
                )),
                (n & 3) === 0 || Ga(a, n) || ((l = !0), Lh(a, n));
            a = a.next;
          }
        while (l);
        df = !1;
      }
    }
    function Vm() {
      Bh();
    }
    function Bh() {
      jn = hf = !1;
      var t = 0;
      Sl !== 0 && ev() && (t = Sl);
      for (var e = ie(), l = null, a = qn; a !== null; ) {
        var u = a.next,
          n = Gh(a, e);
        n === 0
          ? ((a.next = null), l === null ? (qn = u) : (l.next = u), u === null && (Da = l))
          : ((l = a), (t !== 0 || (n & 3) !== 0) && (jn = !0)),
          (a = u);
      }
      (qt !== 0 && qt !== 5) || bu(t), Sl !== 0 && (Sl = 0);
    }
    function Gh(t, e) {
      for (
        var l = t.suspendedLanes,
          a = t.pingedLanes,
          u = t.expirationTimes,
          n = t.pendingLanes & -62914561;
        0 < n;

      ) {
        var c = 31 - fe(n),
          s = 1 << c,
          h = u[c];
        h === -1
          ? ((s & l) === 0 || (s & a) !== 0) && (u[c] = g0(s, e))
          : h <= e && (t.expiredLanes |= s),
          (n &= ~s);
      }
      if (
        ((e = pt),
        (l = I),
        (l = Gu(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
        (a = t.callbackNode),
        l === 0 || (t === e && (st === 2 || st === 9)) || t.cancelPendingCommit !== null)
      )
        return a !== null && a !== null && Oi(a), (t.callbackNode = null), (t.callbackPriority = 0);
      if ((l & 3) === 0 || Ga(t, l)) {
        if (((e = l & -l), e === t.callbackPriority)) return e;
        switch ((a !== null && Oi(a), _i(l))) {
          case 2:
          case 8:
            l = Cs;
            break;
          case 32:
            l = qu;
            break;
          case 268435456:
            l = Ds;
            break;
          default:
            l = qu;
        }
        return (
          (a = Yh.bind(null, t)), (l = Ai(l, a)), (t.callbackPriority = e), (t.callbackNode = l), e
        );
      }
      return (
        a !== null && a !== null && Oi(a), (t.callbackPriority = 2), (t.callbackNode = null), 2
      );
    }
    function Yh(t, e) {
      if (qt !== 0 && qt !== 5) return (t.callbackNode = null), (t.callbackPriority = 0), null;
      var l = t.callbackNode;
      if (Nn() && t.callbackNode !== l) return null;
      var a = I;
      return (
        (a = Gu(t, t === pt ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
        a === 0
          ? null
          : (Eh(t, a, e),
            Gh(t, ie()),
            t.callbackNode != null && t.callbackNode === l ? Yh.bind(null, t) : null)
      );
    }
    function Lh(t, e) {
      if (Nn()) return null;
      Eh(t, e, !0);
    }
    function Km() {
      av(function () {
        (it & 6) !== 0 ? Ai(_s, Vm) : Bh();
      });
    }
    function yf() {
      if (Sl === 0) {
        var t = ya;
        t === 0 && ((t = ju), (ju <<= 1), (ju & 261888) === 0 && (ju = 256)), (Sl = t);
      }
      return Sl;
    }
    function Xh(t) {
      return t == null || typeof t == 'symbol' || typeof t == 'boolean'
        ? null
        : typeof t == 'function'
        ? t
        : Zu('' + t);
    }
    function Zh(t, e) {
      var l = e.ownerDocument.createElement('input');
      return (
        (l.name = e.name),
        (l.value = e.value),
        t.id && l.setAttribute('form', t.id),
        e.parentNode.insertBefore(l, e),
        (t = new FormData(t)),
        l.parentNode.removeChild(l),
        t
      );
    }
    function wm(t, e, l, a, u) {
      if (e === 'submit' && l && l.stateNode === u) {
        var n = Xh((u[It] || null).action),
          c = a.submitter;
        c &&
          ((e = (e = c[It] || null) ? Xh(e.formAction) : c.getAttribute('formAction')),
          e !== null && ((n = e), (c = null)));
        var s = new Ju('action', 'action', null, a, u);
        t.push({
          event: s,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (a.defaultPrevented) {
                  if (Sl !== 0) {
                    var h = c ? Zh(u, c) : new FormData(u);
                    Hc(l, { pending: !0, data: h, method: u.method, action: n }, null, h);
                  }
                } else
                  typeof n == 'function' &&
                    (s.preventDefault(),
                    (h = c ? Zh(u, c) : new FormData(u)),
                    Hc(l, { pending: !0, data: h, method: u.method, action: n }, n, h));
              },
              currentTarget: u,
            },
          ],
        });
      }
    }
    for (var mf = 0; mf < ki.length; mf++) {
      var vf = ki[mf],
        Jm = vf.toLowerCase(),
        Fm = vf[0].toUpperCase() + vf.slice(1);
      Ce(Jm, 'on' + Fm);
    }
    Ce(bo, 'onAnimationEnd'),
      Ce(Eo, 'onAnimationIteration'),
      Ce(To, 'onAnimationStart'),
      Ce('dblclick', 'onDoubleClick'),
      Ce('focusin', 'onFocus'),
      Ce('focusout', 'onBlur'),
      Ce(om, 'onTransitionRun'),
      Ce(rm, 'onTransitionStart'),
      Ce(hm, 'onTransitionCancel'),
      Ce(Ao, 'onTransitionEnd'),
      ta('onMouseEnter', ['mouseout', 'mouseover']),
      ta('onMouseLeave', ['mouseout', 'mouseover']),
      ta('onPointerEnter', ['pointerout', 'pointerover']),
      ta('onPointerLeave', ['pointerout', 'pointerover']),
      xl(
        'onChange',
        'change click focusin focusout input keydown keyup selectionchange'.split(' '),
      ),
      xl(
        'onSelect',
        'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
          ' ',
        ),
      ),
      xl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
      xl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
      xl(
        'onCompositionStart',
        'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
      ),
      xl(
        'onCompositionUpdate',
        'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
      );
    var Eu =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
      Wm = new Set(
        'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Eu),
      );
    function Vh(t, e) {
      e = (e & 4) !== 0;
      for (var l = 0; l < t.length; l++) {
        var a = t[l],
          u = a.event;
        a = a.listeners;
        t: {
          var n = void 0;
          if (e)
            for (var c = a.length - 1; 0 <= c; c--) {
              var s = a[c],
                h = s.instance,
                p = s.currentTarget;
              if (((s = s.listener), h !== n && u.isPropagationStopped())) break t;
              (n = s), (u.currentTarget = p);
              try {
                n(u);
              } catch (A) {
                ku(A);
              }
              (u.currentTarget = null), (n = h);
            }
          else
            for (c = 0; c < a.length; c++) {
              if (
                ((s = a[c]),
                (h = s.instance),
                (p = s.currentTarget),
                (s = s.listener),
                h !== n && u.isPropagationStopped())
              )
                break t;
              (n = s), (u.currentTarget = p);
              try {
                n(u);
              } catch (A) {
                ku(A);
              }
              (u.currentTarget = null), (n = h);
            }
        }
      }
    }
    function $(t, e) {
      var l = e[Ci];
      l === void 0 && (l = e[Ci] = new Set());
      var a = t + '__bubble';
      l.has(a) || (Kh(e, t, 2, !1), l.add(a));
    }
    function gf(t, e, l) {
      var a = 0;
      e && (a |= 4), Kh(l, t, a, e);
    }
    var Qn = '_reactListening' + Math.random().toString(36).slice(2);
    function pf(t) {
      if (!t[Qn]) {
        (t[Qn] = !0),
          Qs.forEach(function (l) {
            l !== 'selectionchange' && (Wm.has(l) || gf(l, !1, t), gf(l, !0, t));
          });
        var e = t.nodeType === 9 ? t : t.ownerDocument;
        e === null || e[Qn] || ((e[Qn] = !0), gf('selectionchange', !1, e));
      }
    }
    function Kh(t, e, l, a) {
      switch (bd(e)) {
        case 2:
          var u = Av;
          break;
        case 8:
          u = Ov;
          break;
        default:
          u = Hf;
      }
      (l = u.bind(null, e, l, t)),
        (u = void 0),
        !Qi || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (u = !0),
        a
          ? u !== void 0
            ? t.addEventListener(e, l, { capture: !0, passive: u })
            : t.addEventListener(e, l, !0)
          : u !== void 0
          ? t.addEventListener(e, l, { passive: u })
          : t.addEventListener(e, l, !1);
    }
    function Sf(t, e, l, a, u) {
      var n = a;
      if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
        t: for (;;) {
          if (a === null) return;
          var c = a.tag;
          if (c === 3 || c === 4) {
            var s = a.stateNode.containerInfo;
            if (s === u) break;
            if (c === 4)
              for (c = a.return; c !== null; ) {
                var h = c.tag;
                if ((h === 3 || h === 4) && c.stateNode.containerInfo === u) return;
                c = c.return;
              }
            for (; s !== null; ) {
              if (((c = $l(s)), c === null)) return;
              if (((h = c.tag), h === 5 || h === 6 || h === 26 || h === 27)) {
                a = n = c;
                continue t;
              }
              s = s.parentNode;
            }
          }
          a = a.return;
        }
      Ws(function () {
        var p = n,
          A = qi(l),
          _ = [];
        t: {
          var S = Oo.get(t);
          if (S !== void 0) {
            var E = Ju,
              j = t;
            switch (t) {
              case 'keypress':
                if (Ku(l) === 0) break t;
              case 'keydown':
              case 'keyup':
                E = X0;
                break;
              case 'focusin':
                (j = 'focus'), (E = Li);
                break;
              case 'focusout':
                (j = 'blur'), (E = Li);
                break;
              case 'beforeblur':
              case 'afterblur':
                E = Li;
                break;
              case 'click':
                if (l.button === 2) break t;
              case 'auxclick':
              case 'dblclick':
              case 'mousedown':
              case 'mousemove':
              case 'mouseup':
              case 'mouseout':
              case 'mouseover':
              case 'contextmenu':
                E = Is;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                E = R0;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                E = K0;
                break;
              case bo:
              case Eo:
              case To:
                E = H0;
                break;
              case Ao:
                E = J0;
                break;
              case 'scroll':
              case 'scrollend':
                E = C0;
                break;
              case 'wheel':
                E = W0;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                E = q0;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                E = to;
                break;
              case 'toggle':
              case 'beforetoggle':
                E = $0;
            }
            var L = (e & 4) !== 0,
              mt = !L && (t === 'scroll' || t === 'scrollend'),
              m = L ? (S !== null ? S + 'Capture' : null) : S;
            L = [];
            for (var d = p, v; d !== null; ) {
              var z = d;
              if (
                ((v = z.stateNode),
                (z = z.tag),
                (z !== 5 && z !== 26 && z !== 27) ||
                  v === null ||
                  m === null ||
                  ((z = Za(d, m)), z != null && L.push(Tu(d, z, v))),
                mt)
              )
                break;
              d = d.return;
            }
            0 < L.length && ((S = new E(S, j, null, l, A)), _.push({ event: S, listeners: L }));
          }
        }
        if ((e & 7) === 0) {
          t: {
            if (
              ((S = t === 'mouseover' || t === 'pointerover'),
              (E = t === 'mouseout' || t === 'pointerout'),
              S && l !== Ni && (j = l.relatedTarget || l.fromElement) && ($l(j) || j[kl]))
            )
              break t;
            if (
              (E || S) &&
              ((S =
                A.window === A
                  ? A
                  : (S = A.ownerDocument)
                  ? S.defaultView || S.parentWindow
                  : window),
              E
                ? ((j = l.relatedTarget || l.toElement),
                  (E = p),
                  (j = j ? $l(j) : null),
                  j !== null &&
                    ((mt = T(j)), (L = j.tag), j !== mt || (L !== 5 && L !== 27 && L !== 6)) &&
                    (j = null))
                : ((E = null), (j = p)),
              E !== j)
            ) {
              if (
                ((L = Is),
                (z = 'onMouseLeave'),
                (m = 'onMouseEnter'),
                (d = 'mouse'),
                (t === 'pointerout' || t === 'pointerover') &&
                  ((L = to), (z = 'onPointerLeave'), (m = 'onPointerEnter'), (d = 'pointer')),
                (mt = E == null ? S : Xa(E)),
                (v = j == null ? S : Xa(j)),
                (S = new L(z, d + 'leave', E, l, A)),
                (S.target = mt),
                (S.relatedTarget = v),
                (z = null),
                $l(A) === p &&
                  ((L = new L(m, d + 'enter', j, l, A)),
                  (L.target = v),
                  (L.relatedTarget = mt),
                  (z = L)),
                (mt = z),
                E && j)
              )
                e: {
                  for (L = km, m = E, d = j, v = 0, z = m; z; z = L(z)) v++;
                  z = 0;
                  for (var Y = d; Y; Y = L(Y)) z++;
                  for (; 0 < v - z; ) (m = L(m)), v--;
                  for (; 0 < z - v; ) (d = L(d)), z--;
                  for (; v--; ) {
                    if (m === d || (d !== null && m === d.alternate)) {
                      L = m;
                      break e;
                    }
                    (m = L(m)), (d = L(d));
                  }
                  L = null;
                }
              else L = null;
              E !== null && wh(_, S, E, L, !1), j !== null && mt !== null && wh(_, mt, j, L, !0);
            }
          }
          t: {
            if (
              ((S = p ? Xa(p) : window),
              (E = S.nodeName && S.nodeName.toLowerCase()),
              E === 'select' || (E === 'input' && S.type === 'file'))
            )
              var ut = fo;
            else if (io(S))
              if (so) ut = cm;
              else {
                ut = nm;
                var B = um;
              }
            else
              (E = S.nodeName),
                !E || E.toLowerCase() !== 'input' || (S.type !== 'checkbox' && S.type !== 'radio')
                  ? p && Hi(p.elementType) && (ut = fo)
                  : (ut = im);
            if (ut && (ut = ut(t, p))) {
              co(_, ut, l, A);
              break t;
            }
            B && B(t, S, p),
              t === 'focusout' &&
                p &&
                S.type === 'number' &&
                p.memoizedProps.value != null &&
                xi(S, 'number', S.value);
          }
          switch (((B = p ? Xa(p) : window), t)) {
            case 'focusin':
              (io(B) || B.contentEditable === 'true') && ((ia = B), (Ji = p), ($a = null));
              break;
            case 'focusout':
              $a = Ji = ia = null;
              break;
            case 'mousedown':
              Fi = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              (Fi = !1), po(_, l, A);
              break;
            case 'selectionchange':
              if (sm) break;
            case 'keydown':
            case 'keyup':
              po(_, l, A);
          }
          var F;
          if (Zi)
            t: {
              switch (t) {
                case 'compositionstart':
                  var P = 'onCompositionStart';
                  break t;
                case 'compositionend':
                  P = 'onCompositionEnd';
                  break t;
                case 'compositionupdate':
                  P = 'onCompositionUpdate';
                  break t;
              }
              P = void 0;
            }
          else
            na
              ? uo(t, l) && (P = 'onCompositionEnd')
              : t === 'keydown' && l.keyCode === 229 && (P = 'onCompositionStart');
          P &&
            (eo &&
              l.locale !== 'ko' &&
              (na || P !== 'onCompositionStart'
                ? P === 'onCompositionEnd' && na && (F = ks())
                : ((al = A), (Bi = 'value' in al ? al.value : al.textContent), (na = !0))),
            (B = Bn(p, P)),
            0 < B.length &&
              ((P = new Ps(P, t, null, l, A)),
              _.push({ event: P, listeners: B }),
              F ? (P.data = F) : ((F = no(l)), F !== null && (P.data = F)))),
            (F = P0 ? tm(t, l) : em(t, l)) &&
              ((P = Bn(p, 'onBeforeInput')),
              0 < P.length &&
                ((B = new Ps('onBeforeInput', 'beforeinput', null, l, A)),
                _.push({ event: B, listeners: P }),
                (B.data = F))),
            wm(_, t, p, l, A);
        }
        Vh(_, e);
      });
    }
    function Tu(t, e, l) {
      return { instance: t, listener: e, currentTarget: l };
    }
    function Bn(t, e) {
      for (var l = e + 'Capture', a = []; t !== null; ) {
        var u = t,
          n = u.stateNode;
        if (
          ((u = u.tag),
          (u !== 5 && u !== 26 && u !== 27) ||
            n === null ||
            ((u = Za(t, l)),
            u != null && a.unshift(Tu(t, u, n)),
            (u = Za(t, e)),
            u != null && a.push(Tu(t, u, n))),
          t.tag === 3)
        )
          return a;
        t = t.return;
      }
      return [];
    }
    function km(t) {
      if (t === null) return null;
      do t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function wh(t, e, l, a, u) {
      for (var n = e._reactName, c = []; l !== null && l !== a; ) {
        var s = l,
          h = s.alternate,
          p = s.stateNode;
        if (((s = s.tag), h !== null && h === a)) break;
        (s !== 5 && s !== 26 && s !== 27) ||
          p === null ||
          ((h = p),
          u
            ? ((p = Za(l, n)), p != null && c.unshift(Tu(l, p, h)))
            : u || ((p = Za(l, n)), p != null && c.push(Tu(l, p, h)))),
          (l = l.return);
      }
      c.length !== 0 && t.push({ event: e, listeners: c });
    }
    var $m = /\r\n?/g,
      Im = /\u0000|\uFFFD/g;
    function Jh(t) {
      return (typeof t == 'string' ? t : '' + t)
        .replace(
          $m,
          `
`,
        )
        .replace(Im, '');
    }
    function Fh(t, e) {
      return (e = Jh(e)), Jh(t) === e;
    }
    function yt(t, e, l, a, u, n) {
      switch (l) {
        case 'children':
          typeof a == 'string'
            ? e === 'body' || (e === 'textarea' && a === '') || la(t, a)
            : (typeof a == 'number' || typeof a == 'bigint') && e !== 'body' && la(t, '' + a);
          break;
        case 'className':
          Lu(t, 'class', a);
          break;
        case 'tabIndex':
          Lu(t, 'tabindex', a);
          break;
        case 'dir':
        case 'role':
        case 'viewBox':
        case 'width':
        case 'height':
          Lu(t, l, a);
          break;
        case 'style':
          Js(t, a, n);
          break;
        case 'data':
          if (e !== 'object') {
            Lu(t, 'data', a);
            break;
          }
        case 'src':
        case 'href':
          if (a === '' && (e !== 'a' || l !== 'href')) {
            t.removeAttribute(l);
            break;
          }
          if (
            a == null ||
            typeof a == 'function' ||
            typeof a == 'symbol' ||
            typeof a == 'boolean'
          ) {
            t.removeAttribute(l);
            break;
          }
          (a = Zu('' + a)), t.setAttribute(l, a);
          break;
        case 'action':
        case 'formAction':
          if (typeof a == 'function') {
            t.setAttribute(
              l,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
            );
            break;
          } else
            typeof n == 'function' &&
              (l === 'formAction'
                ? (e !== 'input' && yt(t, e, 'name', u.name, u, null),
                  yt(t, e, 'formEncType', u.formEncType, u, null),
                  yt(t, e, 'formMethod', u.formMethod, u, null),
                  yt(t, e, 'formTarget', u.formTarget, u, null))
                : (yt(t, e, 'encType', u.encType, u, null),
                  yt(t, e, 'method', u.method, u, null),
                  yt(t, e, 'target', u.target, u, null)));
          if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
            t.removeAttribute(l);
            break;
          }
          (a = Zu('' + a)), t.setAttribute(l, a);
          break;
        case 'onClick':
          a != null && (t.onclick = Qe);
          break;
        case 'onScroll':
          a != null && $('scroll', t);
          break;
        case 'onScrollEnd':
          a != null && $('scrollend', t);
          break;
        case 'dangerouslySetInnerHTML':
          if (a != null) {
            if (typeof a != 'object' || !('__html' in a)) throw Error(o(61));
            if (((l = a.__html), l != null)) {
              if (u.children != null) throw Error(o(60));
              t.innerHTML = l;
            }
          }
          break;
        case 'multiple':
          t.multiple = a && typeof a != 'function' && typeof a != 'symbol';
          break;
        case 'muted':
          t.muted = a && typeof a != 'function' && typeof a != 'symbol';
          break;
        case 'suppressContentEditableWarning':
        case 'suppressHydrationWarning':
        case 'defaultValue':
        case 'defaultChecked':
        case 'innerHTML':
        case 'ref':
          break;
        case 'autoFocus':
          break;
        case 'xlinkHref':
          if (
            a == null ||
            typeof a == 'function' ||
            typeof a == 'boolean' ||
            typeof a == 'symbol'
          ) {
            t.removeAttribute('xlink:href');
            break;
          }
          (l = Zu('' + a)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l);
          break;
        case 'contentEditable':
        case 'spellCheck':
        case 'draggable':
        case 'value':
        case 'autoReverse':
        case 'externalResourcesRequired':
        case 'focusable':
        case 'preserveAlpha':
          a != null && typeof a != 'function' && typeof a != 'symbol'
            ? t.setAttribute(l, '' + a)
            : t.removeAttribute(l);
          break;
        case 'inert':
        case 'allowFullScreen':
        case 'async':
        case 'autoPlay':
        case 'controls':
        case 'default':
        case 'defer':
        case 'disabled':
        case 'disablePictureInPicture':
        case 'disableRemotePlayback':
        case 'formNoValidate':
        case 'hidden':
        case 'loop':
        case 'noModule':
        case 'noValidate':
        case 'open':
        case 'playsInline':
        case 'readOnly':
        case 'required':
        case 'reversed':
        case 'scoped':
        case 'seamless':
        case 'itemScope':
          a && typeof a != 'function' && typeof a != 'symbol'
            ? t.setAttribute(l, '')
            : t.removeAttribute(l);
          break;
        case 'capture':
        case 'download':
          a === !0
            ? t.setAttribute(l, '')
            : a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
            ? t.setAttribute(l, a)
            : t.removeAttribute(l);
          break;
        case 'cols':
        case 'rows':
        case 'size':
        case 'span':
          a != null && typeof a != 'function' && typeof a != 'symbol' && !isNaN(a) && 1 <= a
            ? t.setAttribute(l, a)
            : t.removeAttribute(l);
          break;
        case 'rowSpan':
        case 'start':
          a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
            ? t.removeAttribute(l)
            : t.setAttribute(l, a);
          break;
        case 'popover':
          $('beforetoggle', t), $('toggle', t), Yu(t, 'popover', a);
          break;
        case 'xlinkActuate':
          je(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
          break;
        case 'xlinkArcrole':
          je(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
          break;
        case 'xlinkRole':
          je(t, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
          break;
        case 'xlinkShow':
          je(t, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
          break;
        case 'xlinkTitle':
          je(t, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
          break;
        case 'xlinkType':
          je(t, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
          break;
        case 'xmlBase':
          je(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
          break;
        case 'xmlLang':
          je(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
          break;
        case 'xmlSpace':
          je(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
          break;
        case 'is':
          Yu(t, 'is', a);
          break;
        case 'innerText':
        case 'textContent':
          break;
        default:
          (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
            ((l = M0.get(l) || l), Yu(t, l, a));
      }
    }
    function bf(t, e, l, a, u, n) {
      switch (l) {
        case 'style':
          Js(t, a, n);
          break;
        case 'dangerouslySetInnerHTML':
          if (a != null) {
            if (typeof a != 'object' || !('__html' in a)) throw Error(o(61));
            if (((l = a.__html), l != null)) {
              if (u.children != null) throw Error(o(60));
              t.innerHTML = l;
            }
          }
          break;
        case 'children':
          typeof a == 'string'
            ? la(t, a)
            : (typeof a == 'number' || typeof a == 'bigint') && la(t, '' + a);
          break;
        case 'onScroll':
          a != null && $('scroll', t);
          break;
        case 'onScrollEnd':
          a != null && $('scrollend', t);
          break;
        case 'onClick':
          a != null && (t.onclick = Qe);
          break;
        case 'suppressContentEditableWarning':
        case 'suppressHydrationWarning':
        case 'innerHTML':
        case 'ref':
          break;
        case 'innerText':
        case 'textContent':
          break;
        default:
          if (!Bs.hasOwnProperty(l))
            t: {
              if (
                l[0] === 'o' &&
                l[1] === 'n' &&
                ((u = l.endsWith('Capture')),
                (e = l.slice(2, u ? l.length - 7 : void 0)),
                (n = t[It] || null),
                (n = n != null ? n[l] : null),
                typeof n == 'function' && t.removeEventListener(e, n, u),
                typeof a == 'function')
              ) {
                typeof n != 'function' &&
                  n !== null &&
                  (l in t ? (t[l] = null) : t.hasAttribute(l) && t.removeAttribute(l)),
                  t.addEventListener(e, a, u);
                break t;
              }
              l in t ? (t[l] = a) : a === !0 ? t.setAttribute(l, '') : Yu(t, l, a);
            }
      }
    }
    function Vt(t, e, l) {
      switch (e) {
        case 'div':
        case 'span':
        case 'svg':
        case 'path':
        case 'a':
        case 'g':
        case 'p':
        case 'li':
          break;
        case 'img':
          $('error', t), $('load', t);
          var a = !1,
            u = !1,
            n;
          for (n in l)
            if (l.hasOwnProperty(n)) {
              var c = l[n];
              if (c != null)
                switch (n) {
                  case 'src':
                    a = !0;
                    break;
                  case 'srcSet':
                    u = !0;
                    break;
                  case 'children':
                  case 'dangerouslySetInnerHTML':
                    throw Error(o(137, e));
                  default:
                    yt(t, e, n, c, l, null);
                }
            }
          u && yt(t, e, 'srcSet', l.srcSet, l, null), a && yt(t, e, 'src', l.src, l, null);
          return;
        case 'input':
          $('invalid', t);
          var s = (n = c = u = null),
            h = null,
            p = null;
          for (a in l)
            if (l.hasOwnProperty(a)) {
              var A = l[a];
              if (A != null)
                switch (a) {
                  case 'name':
                    u = A;
                    break;
                  case 'type':
                    c = A;
                    break;
                  case 'checked':
                    h = A;
                    break;
                  case 'defaultChecked':
                    p = A;
                    break;
                  case 'value':
                    n = A;
                    break;
                  case 'defaultValue':
                    s = A;
                    break;
                  case 'children':
                  case 'dangerouslySetInnerHTML':
                    if (A != null) throw Error(o(137, e));
                    break;
                  default:
                    yt(t, e, a, A, l, null);
                }
            }
          Zs(t, n, s, h, p, c, u, !1);
          return;
        case 'select':
          $('invalid', t), (a = c = n = null);
          for (u in l)
            if (l.hasOwnProperty(u) && ((s = l[u]), s != null))
              switch (u) {
                case 'value':
                  n = s;
                  break;
                case 'defaultValue':
                  c = s;
                  break;
                case 'multiple':
                  a = s;
                default:
                  yt(t, e, u, s, l, null);
              }
          (e = n),
            (l = c),
            (t.multiple = !!a),
            e != null ? ea(t, !!a, e, !1) : l != null && ea(t, !!a, l, !0);
          return;
        case 'textarea':
          $('invalid', t), (n = u = a = null);
          for (c in l)
            if (l.hasOwnProperty(c) && ((s = l[c]), s != null))
              switch (c) {
                case 'value':
                  a = s;
                  break;
                case 'defaultValue':
                  u = s;
                  break;
                case 'children':
                  n = s;
                  break;
                case 'dangerouslySetInnerHTML':
                  if (s != null) throw Error(o(91));
                  break;
                default:
                  yt(t, e, c, s, l, null);
              }
          Ks(t, a, u, n);
          return;
        case 'option':
          for (h in l)
            if (l.hasOwnProperty(h) && ((a = l[h]), a != null))
              switch (h) {
                case 'selected':
                  t.selected = a && typeof a != 'function' && typeof a != 'symbol';
                  break;
                default:
                  yt(t, e, h, a, l, null);
              }
          return;
        case 'dialog':
          $('beforetoggle', t), $('toggle', t), $('cancel', t), $('close', t);
          break;
        case 'iframe':
        case 'object':
          $('load', t);
          break;
        case 'video':
        case 'audio':
          for (a = 0; a < Eu.length; a++) $(Eu[a], t);
          break;
        case 'image':
          $('error', t), $('load', t);
          break;
        case 'details':
          $('toggle', t);
          break;
        case 'embed':
        case 'source':
        case 'link':
          $('error', t), $('load', t);
        case 'area':
        case 'base':
        case 'br':
        case 'col':
        case 'hr':
        case 'keygen':
        case 'meta':
        case 'param':
        case 'track':
        case 'wbr':
        case 'menuitem':
          for (p in l)
            if (l.hasOwnProperty(p) && ((a = l[p]), a != null))
              switch (p) {
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, e));
                default:
                  yt(t, e, p, a, l, null);
              }
          return;
        default:
          if (Hi(e)) {
            for (A in l)
              l.hasOwnProperty(A) && ((a = l[A]), a !== void 0 && bf(t, e, A, a, l, void 0));
            return;
          }
      }
      for (s in l) l.hasOwnProperty(s) && ((a = l[s]), a != null && yt(t, e, s, a, l, null));
    }
    function Pm(t, e, l, a) {
      switch (e) {
        case 'div':
        case 'span':
        case 'svg':
        case 'path':
        case 'a':
        case 'g':
        case 'p':
        case 'li':
          break;
        case 'input':
          var u = null,
            n = null,
            c = null,
            s = null,
            h = null,
            p = null,
            A = null;
          for (E in l) {
            var _ = l[E];
            if (l.hasOwnProperty(E) && _ != null)
              switch (E) {
                case 'checked':
                  break;
                case 'value':
                  break;
                case 'defaultValue':
                  h = _;
                default:
                  a.hasOwnProperty(E) || yt(t, e, E, null, a, _);
              }
          }
          for (var S in a) {
            var E = a[S];
            if (((_ = l[S]), a.hasOwnProperty(S) && (E != null || _ != null)))
              switch (S) {
                case 'type':
                  n = E;
                  break;
                case 'name':
                  u = E;
                  break;
                case 'checked':
                  p = E;
                  break;
                case 'defaultChecked':
                  A = E;
                  break;
                case 'value':
                  c = E;
                  break;
                case 'defaultValue':
                  s = E;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (E != null) throw Error(o(137, e));
                  break;
                default:
                  E !== _ && yt(t, e, S, E, a, _);
              }
          }
          Ui(t, c, s, h, p, A, n, u);
          return;
        case 'select':
          E = c = s = S = null;
          for (n in l)
            if (((h = l[n]), l.hasOwnProperty(n) && h != null))
              switch (n) {
                case 'value':
                  break;
                case 'multiple':
                  E = h;
                default:
                  a.hasOwnProperty(n) || yt(t, e, n, null, a, h);
              }
          for (u in a)
            if (((n = a[u]), (h = l[u]), a.hasOwnProperty(u) && (n != null || h != null)))
              switch (u) {
                case 'value':
                  S = n;
                  break;
                case 'defaultValue':
                  s = n;
                  break;
                case 'multiple':
                  c = n;
                default:
                  n !== h && yt(t, e, u, n, a, h);
              }
          (e = s),
            (l = c),
            (a = E),
            S != null
              ? ea(t, !!l, S, !1)
              : !!a != !!l && (e != null ? ea(t, !!l, e, !0) : ea(t, !!l, l ? [] : '', !1));
          return;
        case 'textarea':
          E = S = null;
          for (s in l)
            if (((u = l[s]), l.hasOwnProperty(s) && u != null && !a.hasOwnProperty(s)))
              switch (s) {
                case 'value':
                  break;
                case 'children':
                  break;
                default:
                  yt(t, e, s, null, a, u);
              }
          for (c in a)
            if (((u = a[c]), (n = l[c]), a.hasOwnProperty(c) && (u != null || n != null)))
              switch (c) {
                case 'value':
                  S = u;
                  break;
                case 'defaultValue':
                  E = u;
                  break;
                case 'children':
                  break;
                case 'dangerouslySetInnerHTML':
                  if (u != null) throw Error(o(91));
                  break;
                default:
                  u !== n && yt(t, e, c, u, a, n);
              }
          Vs(t, S, E);
          return;
        case 'option':
          for (var j in l)
            if (((S = l[j]), l.hasOwnProperty(j) && S != null && !a.hasOwnProperty(j)))
              switch (j) {
                case 'selected':
                  t.selected = !1;
                  break;
                default:
                  yt(t, e, j, null, a, S);
              }
          for (h in a)
            if (
              ((S = a[h]), (E = l[h]), a.hasOwnProperty(h) && S !== E && (S != null || E != null))
            )
              switch (h) {
                case 'selected':
                  t.selected = S && typeof S != 'function' && typeof S != 'symbol';
                  break;
                default:
                  yt(t, e, h, S, a, E);
              }
          return;
        case 'img':
        case 'link':
        case 'area':
        case 'base':
        case 'br':
        case 'col':
        case 'embed':
        case 'hr':
        case 'keygen':
        case 'meta':
        case 'param':
        case 'source':
        case 'track':
        case 'wbr':
        case 'menuitem':
          for (var L in l)
            (S = l[L]),
              l.hasOwnProperty(L) && S != null && !a.hasOwnProperty(L) && yt(t, e, L, null, a, S);
          for (p in a)
            if (
              ((S = a[p]), (E = l[p]), a.hasOwnProperty(p) && S !== E && (S != null || E != null))
            )
              switch (p) {
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (S != null) throw Error(o(137, e));
                  break;
                default:
                  yt(t, e, p, S, a, E);
              }
          return;
        default:
          if (Hi(e)) {
            for (var mt in l)
              (S = l[mt]),
                l.hasOwnProperty(mt) &&
                  S !== void 0 &&
                  !a.hasOwnProperty(mt) &&
                  bf(t, e, mt, void 0, a, S);
            for (A in a)
              (S = a[A]),
                (E = l[A]),
                !a.hasOwnProperty(A) ||
                  S === E ||
                  (S === void 0 && E === void 0) ||
                  bf(t, e, A, S, a, E);
            return;
          }
      }
      for (var m in l)
        (S = l[m]),
          l.hasOwnProperty(m) && S != null && !a.hasOwnProperty(m) && yt(t, e, m, null, a, S);
      for (_ in a)
        (S = a[_]),
          (E = l[_]),
          !a.hasOwnProperty(_) || S === E || (S == null && E == null) || yt(t, e, _, S, a, E);
    }
    function Wh(t) {
      switch (t) {
        case 'css':
        case 'script':
        case 'font':
        case 'img':
        case 'image':
        case 'input':
        case 'link':
          return !0;
        default:
          return !1;
      }
    }
    function tv() {
      if (typeof performance.getEntriesByType == 'function') {
        for (
          var t = 0, e = 0, l = performance.getEntriesByType('resource'), a = 0;
          a < l.length;
          a++
        ) {
          var u = l[a],
            n = u.transferSize,
            c = u.initiatorType,
            s = u.duration;
          if (n && s && Wh(c)) {
            for (c = 0, s = u.responseEnd, a += 1; a < l.length; a++) {
              var h = l[a],
                p = h.startTime;
              if (p > s) break;
              var A = h.transferSize,
                _ = h.initiatorType;
              A && Wh(_) && ((h = h.responseEnd), (c += A * (h < s ? 1 : (s - p) / (h - p))));
            }
            if ((--a, (e += (8 * (n + c)) / (u.duration / 1e3)), t++, 10 < t)) break;
          }
        }
        if (0 < t) return e / t / 1e6;
      }
      return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
        ? t
        : 5;
    }
    var Ef = null,
      Tf = null;
    function Gn(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function kh(t) {
      switch (t) {
        case 'http://www.w3.org/2000/svg':
          return 1;
        case 'http://www.w3.org/1998/Math/MathML':
          return 2;
        default:
          return 0;
      }
    }
    function $h(t, e) {
      if (t === 0)
        switch (e) {
          case 'svg':
            return 1;
          case 'math':
            return 2;
          default:
            return 0;
        }
      return t === 1 && e === 'foreignObject' ? 0 : t;
    }
    function Af(t, e) {
      return (
        t === 'textarea' ||
        t === 'noscript' ||
        typeof e.children == 'string' ||
        typeof e.children == 'number' ||
        typeof e.children == 'bigint' ||
        (typeof e.dangerouslySetInnerHTML == 'object' &&
          e.dangerouslySetInnerHTML !== null &&
          e.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Of = null;
    function ev() {
      var t = window.event;
      return t && t.type === 'popstate' ? (t === Of ? !1 : ((Of = t), !0)) : ((Of = null), !1);
    }
    var Ih = typeof setTimeout == 'function' ? setTimeout : void 0,
      lv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
      Ph = typeof Promise == 'function' ? Promise : void 0,
      av =
        typeof queueMicrotask == 'function'
          ? queueMicrotask
          : typeof Ph < 'u'
          ? function (t) {
              return Ph.resolve(null).then(t).catch(uv);
            }
          : Ih;
    function uv(t) {
      setTimeout(function () {
        throw t;
      });
    }
    function bl(t) {
      return t === 'head';
    }
    function td(t, e) {
      var l = e,
        a = 0;
      do {
        var u = l.nextSibling;
        if ((t.removeChild(l), u && u.nodeType === 8))
          if (((l = u.data), l === '/$' || l === '/&')) {
            if (a === 0) {
              t.removeChild(u), Ha(e);
              return;
            }
            a--;
          } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') a++;
          else if (l === 'html') Au(t.ownerDocument.documentElement);
          else if (l === 'head') {
            (l = t.ownerDocument.head), Au(l);
            for (var n = l.firstChild; n; ) {
              var c = n.nextSibling,
                s = n.nodeName;
              n[La] ||
                s === 'SCRIPT' ||
                s === 'STYLE' ||
                (s === 'LINK' && n.rel.toLowerCase() === 'stylesheet') ||
                l.removeChild(n),
                (n = c);
            }
          } else l === 'body' && Au(t.ownerDocument.body);
        l = u;
      } while (l);
      Ha(e);
    }
    function ed(t, e) {
      var l = t;
      t = 0;
      do {
        var a = l.nextSibling;
        if (
          (l.nodeType === 1
            ? e
              ? ((l._stashedDisplay = l.style.display), (l.style.display = 'none'))
              : ((l.style.display = l._stashedDisplay || ''),
                l.getAttribute('style') === '' && l.removeAttribute('style'))
            : l.nodeType === 3 &&
              (e
                ? ((l._stashedText = l.nodeValue), (l.nodeValue = ''))
                : (l.nodeValue = l._stashedText || '')),
          a && a.nodeType === 8)
        )
          if (((l = a.data), l === '/$')) {
            if (t === 0) break;
            t--;
          } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || t++;
        l = a;
      } while (l);
    }
    function zf(t) {
      var e = t.firstChild;
      for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
        var l = e;
        switch (((e = e.nextSibling), l.nodeName)) {
          case 'HTML':
          case 'HEAD':
          case 'BODY':
            zf(l), Di(l);
            continue;
          case 'SCRIPT':
          case 'STYLE':
            continue;
          case 'LINK':
            if (l.rel.toLowerCase() === 'stylesheet') continue;
        }
        t.removeChild(l);
      }
    }
    function nv(t, e, l, a) {
      for (; t.nodeType === 1; ) {
        var u = l;
        if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
          if (!a && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
        } else if (a) {
          if (!t[La])
            switch (e) {
              case 'meta':
                if (!t.hasAttribute('itemprop')) break;
                return t;
              case 'link':
                if (
                  ((n = t.getAttribute('rel')),
                  n === 'stylesheet' && t.hasAttribute('data-precedence'))
                )
                  break;
                if (
                  n !== u.rel ||
                  t.getAttribute('href') !== (u.href == null || u.href === '' ? null : u.href) ||
                  t.getAttribute('crossorigin') !==
                    (u.crossOrigin == null ? null : u.crossOrigin) ||
                  t.getAttribute('title') !== (u.title == null ? null : u.title)
                )
                  break;
                return t;
              case 'style':
                if (t.hasAttribute('data-precedence')) break;
                return t;
              case 'script':
                if (
                  ((n = t.getAttribute('src')),
                  (n !== (u.src == null ? null : u.src) ||
                    t.getAttribute('type') !== (u.type == null ? null : u.type) ||
                    t.getAttribute('crossorigin') !==
                      (u.crossOrigin == null ? null : u.crossOrigin)) &&
                    n &&
                    t.hasAttribute('async') &&
                    !t.hasAttribute('itemprop'))
                )
                  break;
                return t;
              default:
                return t;
            }
        } else if (e === 'input' && t.type === 'hidden') {
          var n = u.name == null ? null : '' + u.name;
          if (u.type === 'hidden' && t.getAttribute('name') === n) return t;
        } else return t;
        if (((t = ze(t.nextSibling)), t === null)) break;
      }
      return null;
    }
    function iv(t, e, l) {
      if (e === '') return null;
      for (; t.nodeType !== 3; )
        if (
          ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
          ((t = ze(t.nextSibling)), t === null)
        )
          return null;
      return t;
    }
    function ld(t, e) {
      for (; t.nodeType !== 8; )
        if (
          ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
          ((t = ze(t.nextSibling)), t === null)
        )
          return null;
      return t;
    }
    function Mf(t) {
      return t.data === '$?' || t.data === '$~';
    }
    function _f(t) {
      return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
    }
    function cv(t, e) {
      var l = t.ownerDocument;
      if (t.data === '$~') t._reactRetry = e;
      else if (t.data !== '$?' || l.readyState !== 'loading') e();
      else {
        var a = function () {
          e(), l.removeEventListener('DOMContentLoaded', a);
        };
        l.addEventListener('DOMContentLoaded', a), (t._reactRetry = a);
      }
    }
    function ze(t) {
      for (; t != null; t = t.nextSibling) {
        var e = t.nodeType;
        if (e === 1 || e === 3) break;
        if (e === 8) {
          if (
            ((e = t.data),
            e === '$' ||
              e === '$!' ||
              e === '$?' ||
              e === '$~' ||
              e === '&' ||
              e === 'F!' ||
              e === 'F')
          )
            break;
          if (e === '/$' || e === '/&') return null;
        }
      }
      return t;
    }
    var Cf = null;
    function ad(t) {
      t = t.nextSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var l = t.data;
          if (l === '/$' || l === '/&') {
            if (e === 0) return ze(t.nextSibling);
            e--;
          } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || e++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function ud(t) {
      t = t.previousSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var l = t.data;
          if (l === '$' || l === '$!' || l === '$?' || l === '$~' || l === '&') {
            if (e === 0) return t;
            e--;
          } else (l !== '/$' && l !== '/&') || e++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function nd(t, e, l) {
      switch (((e = Gn(l)), t)) {
        case 'html':
          if (((t = e.documentElement), !t)) throw Error(o(452));
          return t;
        case 'head':
          if (((t = e.head), !t)) throw Error(o(453));
          return t;
        case 'body':
          if (((t = e.body), !t)) throw Error(o(454));
          return t;
        default:
          throw Error(o(451));
      }
    }
    function Au(t) {
      for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
      Di(t);
    }
    var Me = new Map(),
      id = new Set();
    function Yn(t) {
      return typeof t.getRootNode == 'function'
        ? t.getRootNode()
        : t.nodeType === 9
        ? t
        : t.ownerDocument;
    }
    var Pe = H.d;
    H.d = { f: fv, r: sv, D: ov, C: rv, L: hv, m: dv, X: mv, S: yv, M: vv };
    function fv() {
      var t = Pe.f(),
        e = Un();
      return t || e;
    }
    function sv(t) {
      var e = Il(t);
      e !== null && e.tag === 5 && e.type === 'form' ? Ar(e) : Pe.r(t);
    }
    var Ra = typeof document > 'u' ? null : document;
    function cd(t, e, l) {
      var a = Ra;
      if (a && typeof e == 'string' && e) {
        var u = pe(e);
        (u = 'link[rel="' + t + '"][href="' + u + '"]'),
          typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
          id.has(u) ||
            (id.add(u),
            (t = { rel: t, crossOrigin: l, href: e }),
            a.querySelector(u) === null &&
              ((e = a.createElement('link')), Vt(e, 'link', t), Bt(e), a.head.appendChild(e)));
      }
    }
    function ov(t) {
      Pe.D(t), cd('dns-prefetch', t, null);
    }
    function rv(t, e) {
      Pe.C(t, e), cd('preconnect', t, e);
    }
    function hv(t, e, l) {
      Pe.L(t, e, l);
      var a = Ra;
      if (a && t && e) {
        var u = 'link[rel="preload"][as="' + pe(e) + '"]';
        e === 'image' && l && l.imageSrcSet
          ? ((u += '[imagesrcset="' + pe(l.imageSrcSet) + '"]'),
            typeof l.imageSizes == 'string' && (u += '[imagesizes="' + pe(l.imageSizes) + '"]'))
          : (u += '[href="' + pe(t) + '"]');
        var n = u;
        switch (e) {
          case 'style':
            n = Ua(t);
            break;
          case 'script':
            n = xa(t);
        }
        Me.has(n) ||
          ((t = U(
            { rel: 'preload', href: e === 'image' && l && l.imageSrcSet ? void 0 : t, as: e },
            l,
          )),
          Me.set(n, t),
          a.querySelector(u) !== null ||
            (e === 'style' && a.querySelector(Ou(n))) ||
            (e === 'script' && a.querySelector(zu(n))) ||
            ((e = a.createElement('link')), Vt(e, 'link', t), Bt(e), a.head.appendChild(e)));
      }
    }
    function dv(t, e) {
      Pe.m(t, e);
      var l = Ra;
      if (l && t) {
        var a = e && typeof e.as == 'string' ? e.as : 'script',
          u = 'link[rel="modulepreload"][as="' + pe(a) + '"][href="' + pe(t) + '"]',
          n = u;
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            n = xa(t);
        }
        if (
          !Me.has(n) &&
          ((t = U({ rel: 'modulepreload', href: t }, e)), Me.set(n, t), l.querySelector(u) === null)
        ) {
          switch (a) {
            case 'audioworklet':
            case 'paintworklet':
            case 'serviceworker':
            case 'sharedworker':
            case 'worker':
            case 'script':
              if (l.querySelector(zu(n))) return;
          }
          (a = l.createElement('link')), Vt(a, 'link', t), Bt(a), l.head.appendChild(a);
        }
      }
    }
    function yv(t, e, l) {
      Pe.S(t, e, l);
      var a = Ra;
      if (a && t) {
        var u = Pl(a).hoistableStyles,
          n = Ua(t);
        e = e || 'default';
        var c = u.get(n);
        if (!c) {
          var s = { loading: 0, preload: null };
          if ((c = a.querySelector(Ou(n)))) s.loading = 5;
          else {
            (t = U({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
              (l = Me.get(n)) && Df(t, l);
            var h = (c = a.createElement('link'));
            Bt(h),
              Vt(h, 'link', t),
              (h._p = new Promise(function (p, A) {
                (h.onload = p), (h.onerror = A);
              })),
              h.addEventListener('load', function () {
                s.loading |= 1;
              }),
              h.addEventListener('error', function () {
                s.loading |= 2;
              }),
              (s.loading |= 4),
              Ln(c, e, a);
          }
          (c = { type: 'stylesheet', instance: c, count: 1, state: s }), u.set(n, c);
        }
      }
    }
    function mv(t, e) {
      Pe.X(t, e);
      var l = Ra;
      if (l && t) {
        var a = Pl(l).hoistableScripts,
          u = xa(t),
          n = a.get(u);
        n ||
          ((n = l.querySelector(zu(u))),
          n ||
            ((t = U({ src: t, async: !0 }, e)),
            (e = Me.get(u)) && Rf(t, e),
            (n = l.createElement('script')),
            Bt(n),
            Vt(n, 'link', t),
            l.head.appendChild(n)),
          (n = { type: 'script', instance: n, count: 1, state: null }),
          a.set(u, n));
      }
    }
    function vv(t, e) {
      Pe.M(t, e);
      var l = Ra;
      if (l && t) {
        var a = Pl(l).hoistableScripts,
          u = xa(t),
          n = a.get(u);
        n ||
          ((n = l.querySelector(zu(u))),
          n ||
            ((t = U({ src: t, async: !0, type: 'module' }, e)),
            (e = Me.get(u)) && Rf(t, e),
            (n = l.createElement('script')),
            Bt(n),
            Vt(n, 'link', t),
            l.head.appendChild(n)),
          (n = { type: 'script', instance: n, count: 1, state: null }),
          a.set(u, n));
      }
    }
    function fd(t, e, l, a) {
      var u = (u = W.current) ? Yn(u) : null;
      if (!u) throw Error(o(446));
      switch (t) {
        case 'meta':
        case 'title':
          return null;
        case 'style':
          return typeof l.precedence == 'string' && typeof l.href == 'string'
            ? ((e = Ua(l.href)),
              (l = Pl(u).hoistableStyles),
              (a = l.get(e)),
              a || ((a = { type: 'style', instance: null, count: 0, state: null }), l.set(e, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null };
        case 'link':
          if (
            l.rel === 'stylesheet' &&
            typeof l.href == 'string' &&
            typeof l.precedence == 'string'
          ) {
            t = Ua(l.href);
            var n = Pl(u).hoistableStyles,
              c = n.get(t);
            if (
              (c ||
                ((u = u.ownerDocument || u),
                (c = {
                  type: 'stylesheet',
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                n.set(t, c),
                (n = u.querySelector(Ou(t))) && !n._p && ((c.instance = n), (c.state.loading = 5)),
                Me.has(t) ||
                  ((l = {
                    rel: 'preload',
                    as: 'style',
                    href: l.href,
                    crossOrigin: l.crossOrigin,
                    integrity: l.integrity,
                    media: l.media,
                    hrefLang: l.hrefLang,
                    referrerPolicy: l.referrerPolicy,
                  }),
                  Me.set(t, l),
                  n || gv(u, t, l, c.state))),
              e && a === null)
            )
              throw Error(o(528, ''));
            return c;
          }
          if (e && a !== null) throw Error(o(529, ''));
          return null;
        case 'script':
          return (
            (e = l.async),
            (l = l.src),
            typeof l == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
              ? ((e = xa(l)),
                (l = Pl(u).hoistableScripts),
                (a = l.get(e)),
                a || ((a = { type: 'script', instance: null, count: 0, state: null }), l.set(e, a)),
                a)
              : { type: 'void', instance: null, count: 0, state: null }
          );
        default:
          throw Error(o(444, t));
      }
    }
    function Ua(t) {
      return 'href="' + pe(t) + '"';
    }
    function Ou(t) {
      return 'link[rel="stylesheet"][' + t + ']';
    }
    function sd(t) {
      return U({}, t, { 'data-precedence': t.precedence, precedence: null });
    }
    function gv(t, e, l, a) {
      t.querySelector('link[rel="preload"][as="style"][' + e + ']')
        ? (a.loading = 1)
        : ((e = t.createElement('link')),
          (a.preload = e),
          e.addEventListener('load', function () {
            return (a.loading |= 1);
          }),
          e.addEventListener('error', function () {
            return (a.loading |= 2);
          }),
          Vt(e, 'link', l),
          Bt(e),
          t.head.appendChild(e));
    }
    function xa(t) {
      return '[src="' + pe(t) + '"]';
    }
    function zu(t) {
      return 'script[async]' + t;
    }
    function od(t, e, l) {
      if ((e.count++, e.instance === null))
        switch (e.type) {
          case 'style':
            var a = t.querySelector('style[data-href~="' + pe(l.href) + '"]');
            if (a) return (e.instance = a), Bt(a), a;
            var u = U({}, l, {
              'data-href': l.href,
              'data-precedence': l.precedence,
              href: null,
              precedence: null,
            });
            return (
              (a = (t.ownerDocument || t).createElement('style')),
              Bt(a),
              Vt(a, 'style', u),
              Ln(a, l.precedence, t),
              (e.instance = a)
            );
          case 'stylesheet':
            u = Ua(l.href);
            var n = t.querySelector(Ou(u));
            if (n) return (e.state.loading |= 4), (e.instance = n), Bt(n), n;
            (a = sd(l)),
              (u = Me.get(u)) && Df(a, u),
              (n = (t.ownerDocument || t).createElement('link')),
              Bt(n);
            var c = n;
            return (
              (c._p = new Promise(function (s, h) {
                (c.onload = s), (c.onerror = h);
              })),
              Vt(n, 'link', a),
              (e.state.loading |= 4),
              Ln(n, l.precedence, t),
              (e.instance = n)
            );
          case 'script':
            return (
              (n = xa(l.src)),
              (u = t.querySelector(zu(n)))
                ? ((e.instance = u), Bt(u), u)
                : ((a = l),
                  (u = Me.get(n)) && ((a = U({}, l)), Rf(a, u)),
                  (t = t.ownerDocument || t),
                  (u = t.createElement('script')),
                  Bt(u),
                  Vt(u, 'link', a),
                  t.head.appendChild(u),
                  (e.instance = u))
            );
          case 'void':
            return null;
          default:
            throw Error(o(443, e.type));
        }
      else
        e.type === 'stylesheet' &&
          (e.state.loading & 4) === 0 &&
          ((a = e.instance), (e.state.loading |= 4), Ln(a, l.precedence, t));
      return e.instance;
    }
    function Ln(t, e, l) {
      for (
        var a = l.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]',
          ),
          u = a.length ? a[a.length - 1] : null,
          n = u,
          c = 0;
        c < a.length;
        c++
      ) {
        var s = a[c];
        if (s.dataset.precedence === e) n = s;
        else if (n !== u) break;
      }
      n
        ? n.parentNode.insertBefore(t, n.nextSibling)
        : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
    }
    function Df(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
        t.title == null && (t.title = e.title);
    }
    function Rf(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
        t.integrity == null && (t.integrity = e.integrity);
    }
    var Xn = null;
    function rd(t, e, l) {
      if (Xn === null) {
        var a = new Map(),
          u = (Xn = new Map());
        u.set(l, a);
      } else (u = Xn), (a = u.get(l)), a || ((a = new Map()), u.set(l, a));
      if (a.has(t)) return a;
      for (a.set(t, null), l = l.getElementsByTagName(t), u = 0; u < l.length; u++) {
        var n = l[u];
        if (
          !(n[La] || n[Yt] || (t === 'link' && n.getAttribute('rel') === 'stylesheet')) &&
          n.namespaceURI !== 'http://www.w3.org/2000/svg'
        ) {
          var c = n.getAttribute(e) || '';
          c = t + c;
          var s = a.get(c);
          s ? s.push(n) : a.set(c, [n]);
        }
      }
      return a;
    }
    function hd(t, e, l) {
      (t = t.ownerDocument || t),
        t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null);
    }
    function pv(t, e, l) {
      if (l === 1 || e.itemProp != null) return !1;
      switch (t) {
        case 'meta':
        case 'title':
          return !0;
        case 'style':
          if (typeof e.precedence != 'string' || typeof e.href != 'string' || e.href === '') break;
          return !0;
        case 'link':
          if (
            typeof e.rel != 'string' ||
            typeof e.href != 'string' ||
            e.href === '' ||
            e.onLoad ||
            e.onError
          )
            break;
          switch (e.rel) {
            case 'stylesheet':
              return (t = e.disabled), typeof e.precedence == 'string' && t == null;
            default:
              return !0;
          }
        case 'script':
          if (
            e.async &&
            typeof e.async != 'function' &&
            typeof e.async != 'symbol' &&
            !e.onLoad &&
            !e.onError &&
            e.src &&
            typeof e.src == 'string'
          )
            return !0;
      }
      return !1;
    }
    function dd(t) {
      return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
    }
    function Sv(t, e, l, a) {
      if (
        l.type === 'stylesheet' &&
        (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
        (l.state.loading & 4) === 0
      ) {
        if (l.instance === null) {
          var u = Ua(a.href),
            n = e.querySelector(Ou(u));
          if (n) {
            (e = n._p),
              e !== null &&
                typeof e == 'object' &&
                typeof e.then == 'function' &&
                (t.count++, (t = Zn.bind(t)), e.then(t, t)),
              (l.state.loading |= 4),
              (l.instance = n),
              Bt(n);
            return;
          }
          (n = e.ownerDocument || e),
            (a = sd(a)),
            (u = Me.get(u)) && Df(a, u),
            (n = n.createElement('link')),
            Bt(n);
          var c = n;
          (c._p = new Promise(function (s, h) {
            (c.onload = s), (c.onerror = h);
          })),
            Vt(n, 'link', a),
            (l.instance = n);
        }
        t.stylesheets === null && (t.stylesheets = new Map()),
          t.stylesheets.set(l, e),
          (e = l.state.preload) &&
            (l.state.loading & 3) === 0 &&
            (t.count++,
            (l = Zn.bind(t)),
            e.addEventListener('load', l),
            e.addEventListener('error', l));
      }
    }
    var Uf = 0;
    function bv(t, e) {
      return (
        t.stylesheets && t.count === 0 && Kn(t, t.stylesheets),
        0 < t.count || 0 < t.imgCount
          ? function (l) {
              var a = setTimeout(function () {
                if ((t.stylesheets && Kn(t, t.stylesheets), t.unsuspend)) {
                  var n = t.unsuspend;
                  (t.unsuspend = null), n();
                }
              }, 6e4 + e);
              0 < t.imgBytes && Uf === 0 && (Uf = 62500 * tv());
              var u = setTimeout(function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Kn(t, t.stylesheets), t.unsuspend))
                ) {
                  var n = t.unsuspend;
                  (t.unsuspend = null), n();
                }
              }, (t.imgBytes > Uf ? 50 : 800) + e);
              return (
                (t.unsuspend = l),
                function () {
                  (t.unsuspend = null), clearTimeout(a), clearTimeout(u);
                }
              );
            }
          : null
      );
    }
    function Zn() {
      if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
        if (this.stylesheets) Kn(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          (this.unsuspend = null), t();
        }
      }
    }
    var Vn = null;
    function Kn(t, e) {
      (t.stylesheets = null),
        t.unsuspend !== null &&
          (t.count++, (Vn = new Map()), e.forEach(Ev, t), (Vn = null), Zn.call(t));
    }
    function Ev(t, e) {
      if (!(e.state.loading & 4)) {
        var l = Vn.get(t);
        if (l) var a = l.get(null);
        else {
          (l = new Map()), Vn.set(t, l);
          for (
            var u = t.querySelectorAll('link[data-precedence],style[data-precedence]'), n = 0;
            n < u.length;
            n++
          ) {
            var c = u[n];
            (c.nodeName === 'LINK' || c.getAttribute('media') !== 'not all') &&
              (l.set(c.dataset.precedence, c), (a = c));
          }
          a && l.set(null, a);
        }
        (u = e.instance),
          (c = u.getAttribute('data-precedence')),
          (n = l.get(c) || a),
          n === a && l.set(null, u),
          l.set(c, u),
          this.count++,
          (a = Zn.bind(this)),
          u.addEventListener('load', a),
          u.addEventListener('error', a),
          n
            ? n.parentNode.insertBefore(u, n.nextSibling)
            : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
          (e.state.loading |= 4);
      }
    }
    var Mu = {
      $$typeof: St,
      Provider: null,
      Consumer: null,
      _currentValue: X,
      _currentValue2: X,
      _threadCount: 0,
    };
    function Tv(t, e, l, a, u, n, c, s, h) {
      (this.tag = 1),
        (this.containerInfo = t),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = zi(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = zi(0)),
        (this.hiddenUpdates = zi(null)),
        (this.identifierPrefix = a),
        (this.onUncaughtError = u),
        (this.onCaughtError = n),
        (this.onRecoverableError = c),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = h),
        (this.incompleteTransitions = new Map());
    }
    function yd(t, e, l, a, u, n, c, s, h, p, A, _) {
      return (
        (t = new Tv(t, e, l, c, h, p, A, _, s)),
        (e = 1),
        n === !0 && (e |= 24),
        (n = oe(3, null, null, e)),
        (t.current = n),
        (n.stateNode = t),
        (e = sc()),
        e.refCount++,
        (t.pooledCache = e),
        e.refCount++,
        (n.memoizedState = { element: a, isDehydrated: l, cache: e }),
        dc(n),
        t
      );
    }
    function md(t) {
      return t ? ((t = sa), t) : sa;
    }
    function vd(t, e, l, a, u, n) {
      (u = md(u)),
        a.context === null ? (a.context = u) : (a.pendingContext = u),
        (a = sl(e)),
        (a.payload = { element: l }),
        (n = n === void 0 ? null : n),
        n !== null && (a.callback = n),
        (l = ol(t, a, e)),
        l !== null && (ue(l, t, e), uu(l, t, e));
    }
    function gd(t, e) {
      if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
        var l = t.retryLane;
        t.retryLane = l !== 0 && l < e ? l : e;
      }
    }
    function xf(t, e) {
      gd(t, e), (t = t.alternate) && gd(t, e);
    }
    function pd(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = jl(t, 67108864);
        e !== null && ue(e, t, 67108864), xf(t, 67108864);
      }
    }
    function Sd(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = me();
        e = Mi(e);
        var l = jl(t, e);
        l !== null && ue(l, t, e), xf(t, e);
      }
    }
    var wn = !0;
    function Av(t, e, l, a) {
      var u = O.T;
      O.T = null;
      var n = H.p;
      try {
        (H.p = 2), Hf(t, e, l, a);
      } finally {
        (H.p = n), (O.T = u);
      }
    }
    function Ov(t, e, l, a) {
      var u = O.T;
      O.T = null;
      var n = H.p;
      try {
        (H.p = 8), Hf(t, e, l, a);
      } finally {
        (H.p = n), (O.T = u);
      }
    }
    function Hf(t, e, l, a) {
      if (wn) {
        var u = Nf(a);
        if (u === null) Sf(t, e, a, Jn, l), Ed(t, a);
        else if (Mv(u, t, e, l, a)) a.stopPropagation();
        else if ((Ed(t, a), e & 4 && -1 < zv.indexOf(t))) {
          for (; u !== null; ) {
            var n = Il(u);
            if (n !== null)
              switch (n.tag) {
                case 3:
                  if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                    var c = Ul(n.pendingLanes);
                    if (c !== 0) {
                      var s = n;
                      for (s.pendingLanes |= 2, s.entangledLanes |= 2; c; ) {
                        var h = 1 << (31 - fe(c));
                        (s.entanglements[1] |= h), (c &= ~h);
                      }
                      Ne(n), (it & 6) === 0 && ((Dn = ie() + 500), bu(0));
                    }
                  }
                  break;
                case 31:
                case 13:
                  (s = jl(n, 2)), s !== null && ue(s, n, 2), Un(), xf(n, 2);
              }
            if (((n = Nf(a)), n === null && Sf(t, e, a, Jn, l), n === u)) break;
            u = n;
          }
          u !== null && a.stopPropagation();
        } else Sf(t, e, a, null, l);
      }
    }
    function Nf(t) {
      return (t = qi(t)), qf(t);
    }
    var Jn = null;
    function qf(t) {
      if (((Jn = null), (t = $l(t)), t !== null)) {
        var e = T(t);
        if (e === null) t = null;
        else {
          var l = e.tag;
          if (l === 13) {
            if (((t = D(e)), t !== null)) return t;
            t = null;
          } else if (l === 31) {
            if (((t = M(e)), t !== null)) return t;
            t = null;
          } else if (l === 3) {
            if (e.stateNode.current.memoizedState.isDehydrated)
              return e.tag === 3 ? e.stateNode.containerInfo : null;
            t = null;
          } else e !== t && (t = null);
        }
      }
      return (Jn = t), null;
    }
    function bd(t) {
      switch (t) {
        case 'beforetoggle':
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'auxclick':
        case 'dblclick':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'focusin':
        case 'focusout':
        case 'input':
        case 'invalid':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mousedown':
        case 'mouseup':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case 'pointerdown':
        case 'pointerup':
        case 'ratechange':
        case 'reset':
        case 'resize':
        case 'seeked':
        case 'submit':
        case 'toggle':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'volumechange':
        case 'change':
        case 'selectionchange':
        case 'textInput':
        case 'compositionstart':
        case 'compositionend':
        case 'compositionupdate':
        case 'beforeblur':
        case 'afterblur':
        case 'beforeinput':
        case 'blur':
        case 'fullscreenchange':
        case 'focus':
        case 'hashchange':
        case 'popstate':
        case 'select':
        case 'selectstart':
          return 2;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case 'dragleave':
        case 'dragover':
        case 'mousemove':
        case 'mouseout':
        case 'mouseover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'touchmove':
        case 'wheel':
        case 'mouseenter':
        case 'mouseleave':
        case 'pointerenter':
        case 'pointerleave':
          return 8;
        case 'message':
          switch (o0()) {
            case _s:
              return 2;
            case Cs:
              return 8;
            case qu:
            case r0:
              return 32;
            case Ds:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var jf = !1,
      El = null,
      Tl = null,
      Al = null,
      _u = new Map(),
      Cu = new Map(),
      Ol = [],
      zv =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
          ' ',
        );
    function Ed(t, e) {
      switch (t) {
        case 'focusin':
        case 'focusout':
          El = null;
          break;
        case 'dragenter':
        case 'dragleave':
          Tl = null;
          break;
        case 'mouseover':
        case 'mouseout':
          Al = null;
          break;
        case 'pointerover':
        case 'pointerout':
          _u.delete(e.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          Cu.delete(e.pointerId);
      }
    }
    function Du(t, e, l, a, u, n) {
      return t === null || t.nativeEvent !== n
        ? ((t = {
            blockedOn: e,
            domEventName: l,
            eventSystemFlags: a,
            nativeEvent: n,
            targetContainers: [u],
          }),
          e !== null && ((e = Il(e)), e !== null && pd(e)),
          t)
        : ((t.eventSystemFlags |= a),
          (e = t.targetContainers),
          u !== null && e.indexOf(u) === -1 && e.push(u),
          t);
    }
    function Mv(t, e, l, a, u) {
      switch (e) {
        case 'focusin':
          return (El = Du(El, t, e, l, a, u)), !0;
        case 'dragenter':
          return (Tl = Du(Tl, t, e, l, a, u)), !0;
        case 'mouseover':
          return (Al = Du(Al, t, e, l, a, u)), !0;
        case 'pointerover':
          var n = u.pointerId;
          return _u.set(n, Du(_u.get(n) || null, t, e, l, a, u)), !0;
        case 'gotpointercapture':
          return (n = u.pointerId), Cu.set(n, Du(Cu.get(n) || null, t, e, l, a, u)), !0;
      }
      return !1;
    }
    function Td(t) {
      var e = $l(t.target);
      if (e !== null) {
        var l = T(e);
        if (l !== null) {
          if (((e = l.tag), e === 13)) {
            if (((e = D(l)), e !== null)) {
              (t.blockedOn = e),
                qs(t.priority, function () {
                  Sd(l);
                });
              return;
            }
          } else if (e === 31) {
            if (((e = M(l)), e !== null)) {
              (t.blockedOn = e),
                qs(t.priority, function () {
                  Sd(l);
                });
              return;
            }
          } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
            t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function Fn(t) {
      if (t.blockedOn !== null) return !1;
      for (var e = t.targetContainers; 0 < e.length; ) {
        var l = Nf(t.nativeEvent);
        if (l === null) {
          l = t.nativeEvent;
          var a = new l.constructor(l.type, l);
          (Ni = a), l.target.dispatchEvent(a), (Ni = null);
        } else return (e = Il(l)), e !== null && pd(e), (t.blockedOn = l), !1;
        e.shift();
      }
      return !0;
    }
    function Ad(t, e, l) {
      Fn(t) && l.delete(e);
    }
    function _v() {
      (jf = !1),
        El !== null && Fn(El) && (El = null),
        Tl !== null && Fn(Tl) && (Tl = null),
        Al !== null && Fn(Al) && (Al = null),
        _u.forEach(Ad),
        Cu.forEach(Ad);
    }
    function Wn(t, e) {
      t.blockedOn === e &&
        ((t.blockedOn = null),
        jf || ((jf = !0), i.unstable_scheduleCallback(i.unstable_NormalPriority, _v)));
    }
    var kn = null;
    function Od(t) {
      kn !== t &&
        ((kn = t),
        i.unstable_scheduleCallback(i.unstable_NormalPriority, function () {
          kn === t && (kn = null);
          for (var e = 0; e < t.length; e += 3) {
            var l = t[e],
              a = t[e + 1],
              u = t[e + 2];
            if (typeof a != 'function') {
              if (qf(a || l) === null) continue;
              break;
            }
            var n = Il(l);
            n !== null &&
              (t.splice(e, 3),
              (e -= 3),
              Hc(n, { pending: !0, data: u, method: l.method, action: a }, a, u));
          }
        }));
    }
    function Ha(t) {
      function e(h) {
        return Wn(h, t);
      }
      El !== null && Wn(El, t),
        Tl !== null && Wn(Tl, t),
        Al !== null && Wn(Al, t),
        _u.forEach(e),
        Cu.forEach(e);
      for (var l = 0; l < Ol.length; l++) {
        var a = Ol[l];
        a.blockedOn === t && (a.blockedOn = null);
      }
      for (; 0 < Ol.length && ((l = Ol[0]), l.blockedOn === null); )
        Td(l), l.blockedOn === null && Ol.shift();
      if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
        for (a = 0; a < l.length; a += 3) {
          var u = l[a],
            n = l[a + 1],
            c = u[It] || null;
          if (typeof n == 'function') c || Od(l);
          else if (c) {
            var s = null;
            if (n && n.hasAttribute('formAction')) {
              if (((u = n), (c = n[It] || null))) s = c.formAction;
              else if (qf(u) !== null) continue;
            } else s = c.action;
            typeof s == 'function' ? (l[a + 1] = s) : (l.splice(a, 3), (a -= 3)), Od(l);
          }
        }
    }
    function zd() {
      function t(n) {
        n.canIntercept &&
          n.info === 'react-transition' &&
          n.intercept({
            handler: function () {
              return new Promise(function (c) {
                return (u = c);
              });
            },
            focusReset: 'manual',
            scroll: 'manual',
          });
      }
      function e() {
        u !== null && (u(), (u = null)), a || setTimeout(l, 20);
      }
      function l() {
        if (!a && !navigation.transition) {
          var n = navigation.currentEntry;
          n &&
            n.url != null &&
            navigation.navigate(n.url, {
              state: n.getState(),
              info: 'react-transition',
              history: 'replace',
            });
        }
      }
      if (typeof navigation == 'object') {
        var a = !1,
          u = null;
        return (
          navigation.addEventListener('navigate', t),
          navigation.addEventListener('navigatesuccess', e),
          navigation.addEventListener('navigateerror', e),
          setTimeout(l, 100),
          function () {
            (a = !0),
              navigation.removeEventListener('navigate', t),
              navigation.removeEventListener('navigatesuccess', e),
              navigation.removeEventListener('navigateerror', e),
              u !== null && (u(), (u = null));
          }
        );
      }
    }
    function Qf(t) {
      this._internalRoot = t;
    }
    ($n.prototype.render = Qf.prototype.render =
      function (t) {
        var e = this._internalRoot;
        if (e === null) throw Error(o(409));
        var l = e.current,
          a = me();
        vd(l, a, t, e, null, null);
      }),
      ($n.prototype.unmount = Qf.prototype.unmount =
        function () {
          var t = this._internalRoot;
          if (t !== null) {
            this._internalRoot = null;
            var e = t.containerInfo;
            vd(t.current, 2, null, t, null, null), Un(), (e[kl] = null);
          }
        });
    function $n(t) {
      this._internalRoot = t;
    }
    $n.prototype.unstable_scheduleHydration = function (t) {
      if (t) {
        var e = Ns();
        t = { blockedOn: null, target: t, priority: e };
        for (var l = 0; l < Ol.length && e !== 0 && e < Ol[l].priority; l++);
        Ol.splice(l, 0, t), l === 0 && Td(t);
      }
    };
    var Md = f.version;
    if (Md !== '19.2.1') throw Error(o(527, Md, '19.2.1'));
    H.findDOMNode = function (t) {
      var e = t._reactInternals;
      if (e === void 0)
        throw typeof t.render == 'function'
          ? Error(o(188))
          : ((t = Object.keys(t).join(',')), Error(o(268, t)));
      return (t = g(e)), (t = t !== null ? x(t) : null), (t = t === null ? null : t.stateNode), t;
    };
    var Cv = {
      bundleType: 0,
      version: '19.2.1',
      rendererPackageName: 'react-dom',
      currentDispatcherRef: O,
      reconcilerVersion: '19.2.1',
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
      var In = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!In.isDisabled && In.supportsFiber)
        try {
          (Ba = In.inject(Cv)), (ce = In);
        } catch {}
    }
    return (
      (qa.createRoot = function (t, e) {
        if (!b(t)) throw Error(o(299));
        var l = !1,
          a = '',
          u = Hr,
          n = Nr,
          c = qr;
        return (
          e != null &&
            (e.unstable_strictMode === !0 && (l = !0),
            e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
            e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
            e.onCaughtError !== void 0 && (n = e.onCaughtError),
            e.onRecoverableError !== void 0 && (c = e.onRecoverableError)),
          (e = yd(t, 1, !1, null, null, l, a, null, u, n, c, zd)),
          (t[kl] = e.current),
          pf(t),
          new Qf(e)
        );
      }),
      (qa.hydrateRoot = function (t, e, l) {
        if (!b(t)) throw Error(o(299));
        var a = !1,
          u = '',
          n = Hr,
          c = Nr,
          s = qr,
          h = null;
        return (
          l != null &&
            (l.unstable_strictMode === !0 && (a = !0),
            l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
            l.onUncaughtError !== void 0 && (n = l.onUncaughtError),
            l.onCaughtError !== void 0 && (c = l.onCaughtError),
            l.onRecoverableError !== void 0 && (s = l.onRecoverableError),
            l.formState !== void 0 && (h = l.formState)),
          (e = yd(t, 1, !0, e, l ?? null, a, u, h, n, c, s, zd)),
          (e.context = md(null)),
          (l = e.current),
          (a = me()),
          (a = Mi(a)),
          (u = sl(a)),
          (u.callback = null),
          ol(l, u, a),
          (l = a),
          (e.current.lanes = l),
          Ya(e, l),
          Ne(e),
          (t[kl] = e.current),
          pf(t),
          new $n(e)
        );
      }),
      (qa.version = '19.2.1'),
      qa
    );
  }
  var Jf;
  function jd() {
    if (Jf) return ti.exports;
    Jf = 1;
    function i() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
        } catch (f) {
          console.error(f);
        }
    }
    return i(), (ti.exports = qd()), ti.exports;
  }
  var Qd = jd();
  const Bd = _d(Qd);
  var lt = ui(),
    Wl = class {
      constructor() {
        (this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this));
      }
      subscribe(i) {
        return (
          this.listeners.add(i),
          this.onSubscribe(),
          () => {
            this.listeners.delete(i), this.onUnsubscribe();
          }
        );
      }
      hasListeners() {
        return this.listeners.size > 0;
      }
      onSubscribe() {}
      onUnsubscribe() {}
    },
    Gd = {
      setTimeout: (i, f) => setTimeout(i, f),
      clearTimeout: (i) => clearTimeout(i),
      setInterval: (i, f) => setInterval(i, f),
      clearInterval: (i) => clearInterval(i),
    },
    Yd = class {
      #t = Gd;
      #e = !1;
      setTimeoutProvider(i) {
        this.#t = i;
      }
      setTimeout(i, f) {
        return this.#t.setTimeout(i, f);
      }
      clearTimeout(i) {
        this.#t.clearTimeout(i);
      }
      setInterval(i, f) {
        return this.#t.setInterval(i, f);
      }
      clearInterval(i) {
        this.#t.clearInterval(i);
      }
    },
    Ml = new Yd();
  function Ld(i) {
    setTimeout(i, 0);
  }
  var _l = typeof window > 'u' || 'Deno' in window;
  function wt() {}
  function Xd(i, f) {
    return typeof i == 'function' ? i(f) : i;
  }
  function ii(i) {
    return typeof i == 'number' && i >= 0 && i !== 1 / 0;
  }
  function Ff(i, f) {
    return Math.max(i + (f || 0) - Date.now(), 0);
  }
  function tl(i, f) {
    return typeof i == 'function' ? i(f) : i;
  }
  function ve(i, f) {
    return typeof i == 'function' ? i(f) : i;
  }
  function Wf(i, f) {
    const { type: r = 'all', exact: o, fetchStatus: b, predicate: T, queryKey: D, stale: M } = i;
    if (D) {
      if (o) {
        if (f.queryHash !== ci(D, f.options)) return !1;
      } else if (!ja(f.queryKey, D)) return !1;
    }
    if (r !== 'all') {
      const R = f.isActive();
      if ((r === 'active' && !R) || (r === 'inactive' && R)) return !1;
    }
    return !(
      (typeof M == 'boolean' && f.isStale() !== M) ||
      (b && b !== f.state.fetchStatus) ||
      (T && !T(f))
    );
  }
  function kf(i, f) {
    const { exact: r, status: o, predicate: b, mutationKey: T } = i;
    if (T) {
      if (!f.options.mutationKey) return !1;
      if (r) {
        if (Cl(f.options.mutationKey) !== Cl(T)) return !1;
      } else if (!ja(f.options.mutationKey, T)) return !1;
    }
    return !((o && f.state.status !== o) || (b && !b(f)));
  }
  function ci(i, f) {
    return (f?.queryKeyHashFn || Cl)(i);
  }
  function Cl(i) {
    return JSON.stringify(i, (f, r) =>
      fi(r)
        ? Object.keys(r)
            .sort()
            .reduce((o, b) => ((o[b] = r[b]), o), {})
        : r,
    );
  }
  function ja(i, f) {
    return i === f
      ? !0
      : typeof i != typeof f
      ? !1
      : i && f && typeof i == 'object' && typeof f == 'object'
      ? Object.keys(f).every((r) => ja(i[r], f[r]))
      : !1;
  }
  var Zd = Object.prototype.hasOwnProperty;
  function $f(i, f) {
    if (i === f) return i;
    const r = If(i) && If(f);
    if (!r && !(fi(i) && fi(f))) return f;
    const b = (r ? i : Object.keys(i)).length,
      T = r ? f : Object.keys(f),
      D = T.length,
      M = r ? new Array(D) : {};
    let R = 0;
    for (let g = 0; g < D; g++) {
      const x = r ? g : T[g],
        U = i[x],
        q = f[x];
      if (U === q) {
        (M[x] = U), (r ? g < b : Zd.call(i, x)) && R++;
        continue;
      }
      if (U === null || q === null || typeof U != 'object' || typeof q != 'object') {
        M[x] = q;
        continue;
      }
      const ft = $f(U, q);
      (M[x] = ft), ft === U && R++;
    }
    return b === D && R === b ? i : M;
  }
  function Ru(i, f) {
    if (!f || Object.keys(i).length !== Object.keys(f).length) return !1;
    for (const r in i) if (i[r] !== f[r]) return !1;
    return !0;
  }
  function If(i) {
    return Array.isArray(i) && i.length === Object.keys(i).length;
  }
  function fi(i) {
    if (!Pf(i)) return !1;
    const f = i.constructor;
    if (f === void 0) return !0;
    const r = f.prototype;
    return !(
      !Pf(r) ||
      !r.hasOwnProperty('isPrototypeOf') ||
      Object.getPrototypeOf(i) !== Object.prototype
    );
  }
  function Pf(i) {
    return Object.prototype.toString.call(i) === '[object Object]';
  }
  function Vd(i) {
    return new Promise((f) => {
      Ml.setTimeout(f, i);
    });
  }
  function si(i, f, r) {
    return typeof r.structuralSharing == 'function'
      ? r.structuralSharing(i, f)
      : r.structuralSharing !== !1
      ? $f(i, f)
      : f;
  }
  function Kd(i, f, r = 0) {
    const o = [...i, f];
    return r && o.length > r ? o.slice(1) : o;
  }
  function wd(i, f, r = 0) {
    const o = [f, ...i];
    return r && o.length > r ? o.slice(0, -1) : o;
  }
  var oi = Symbol();
  function ts(i, f) {
    return !i.queryFn && f?.initialPromise
      ? () => f.initialPromise
      : !i.queryFn || i.queryFn === oi
      ? () => Promise.reject(new Error(`Missing queryFn: '${i.queryHash}'`))
      : i.queryFn;
  }
  function es(i, f) {
    return typeof i == 'function' ? i(...f) : !!i;
  }
  var Jd = class extends Wl {
      #t;
      #e;
      #l;
      constructor() {
        super(),
          (this.#l = (i) => {
            if (!_l && window.addEventListener) {
              const f = () => i();
              return (
                window.addEventListener('visibilitychange', f, !1),
                () => {
                  window.removeEventListener('visibilitychange', f);
                }
              );
            }
          });
      }
      onSubscribe() {
        this.#e || this.setEventListener(this.#l);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#e?.(), (this.#e = void 0));
      }
      setEventListener(i) {
        (this.#l = i),
          this.#e?.(),
          (this.#e = i((f) => {
            typeof f == 'boolean' ? this.setFocused(f) : this.onFocus();
          }));
      }
      setFocused(i) {
        this.#t !== i && ((this.#t = i), this.onFocus());
      }
      onFocus() {
        const i = this.isFocused();
        this.listeners.forEach((f) => {
          f(i);
        });
      }
      isFocused() {
        return typeof this.#t == 'boolean'
          ? this.#t
          : window.document?.visibilityState !== 'hidden';
      }
    },
    ri = new Jd();
  function hi() {
    let i, f;
    const r = new Promise((b, T) => {
      (i = b), (f = T);
    });
    (r.status = 'pending'), r.catch(() => {});
    function o(b) {
      Object.assign(r, b), delete r.resolve, delete r.reject;
    }
    return (
      (r.resolve = (b) => {
        o({ status: 'fulfilled', value: b }), i(b);
      }),
      (r.reject = (b) => {
        o({ status: 'rejected', reason: b }), f(b);
      }),
      r
    );
  }
  var Fd = Ld;
  function Wd() {
    let i = [],
      f = 0,
      r = (M) => {
        M();
      },
      o = (M) => {
        M();
      },
      b = Fd;
    const T = (M) => {
        f
          ? i.push(M)
          : b(() => {
              r(M);
            });
      },
      D = () => {
        const M = i;
        (i = []),
          M.length &&
            b(() => {
              o(() => {
                M.forEach((R) => {
                  r(R);
                });
              });
            });
      };
    return {
      batch: (M) => {
        let R;
        f++;
        try {
          R = M();
        } finally {
          f--, f || D();
        }
        return R;
      },
      batchCalls:
        (M) =>
        (...R) => {
          T(() => {
            M(...R);
          });
        },
      schedule: T,
      setNotifyFunction: (M) => {
        r = M;
      },
      setBatchNotifyFunction: (M) => {
        o = M;
      },
      setScheduler: (M) => {
        b = M;
      },
    };
  }
  var Nt = Wd(),
    kd = class extends Wl {
      #t = !0;
      #e;
      #l;
      constructor() {
        super(),
          (this.#l = (i) => {
            if (!_l && window.addEventListener) {
              const f = () => i(!0),
                r = () => i(!1);
              return (
                window.addEventListener('online', f, !1),
                window.addEventListener('offline', r, !1),
                () => {
                  window.removeEventListener('online', f), window.removeEventListener('offline', r);
                }
              );
            }
          });
      }
      onSubscribe() {
        this.#e || this.setEventListener(this.#l);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#e?.(), (this.#e = void 0));
      }
      setEventListener(i) {
        (this.#l = i), this.#e?.(), (this.#e = i(this.setOnline.bind(this)));
      }
      setOnline(i) {
        this.#t !== i &&
          ((this.#t = i),
          this.listeners.forEach((r) => {
            r(i);
          }));
      }
      isOnline() {
        return this.#t;
      }
    },
    Uu = new kd();
  function $d(i) {
    return Math.min(1e3 * 2 ** i, 3e4);
  }
  function ls(i) {
    return (i ?? 'online') === 'online' ? Uu.isOnline() : !0;
  }
  var di = class extends Error {
    constructor(i) {
      super('CancelledError'), (this.revert = i?.revert), (this.silent = i?.silent);
    }
  };
  function as(i) {
    let f = !1,
      r = 0,
      o;
    const b = hi(),
      T = () => b.status !== 'pending',
      D = (Z) => {
        if (!T()) {
          const at = new di(Z);
          q(at), i.onCancel?.(at);
        }
      },
      M = () => {
        f = !0;
      },
      R = () => {
        f = !1;
      },
      g = () => ri.isFocused() && (i.networkMode === 'always' || Uu.isOnline()) && i.canRun(),
      x = () => ls(i.networkMode) && i.canRun(),
      U = (Z) => {
        T() || (o?.(), b.resolve(Z));
      },
      q = (Z) => {
        T() || (o?.(), b.reject(Z));
      },
      ft = () =>
        new Promise((Z) => {
          (o = (at) => {
            (T() || g()) && Z(at);
          }),
            i.onPause?.();
        }).then(() => {
          (o = void 0), T() || i.onContinue?.();
        }),
      tt = () => {
        if (T()) return;
        let Z;
        const at = r === 0 ? i.initialPromise : void 0;
        try {
          Z = at ?? i.fn();
        } catch (rt) {
          Z = Promise.reject(rt);
        }
        Promise.resolve(Z)
          .then(U)
          .catch((rt) => {
            if (T()) return;
            const Ct = i.retry ?? (_l ? 0 : 3),
              St = i.retryDelay ?? $d,
              Dt = typeof St == 'function' ? St(r, rt) : St,
              jt =
                Ct === !0 ||
                (typeof Ct == 'number' && r < Ct) ||
                (typeof Ct == 'function' && Ct(r, rt));
            if (f || !jt) {
              q(rt);
              return;
            }
            r++,
              i.onFail?.(r, rt),
              Vd(Dt)
                .then(() => (g() ? void 0 : ft()))
                .then(() => {
                  f ? q(rt) : tt();
                });
          });
      };
    return {
      promise: b,
      status: () => b.status,
      cancel: D,
      continue: () => (o?.(), b),
      cancelRetry: M,
      continueRetry: R,
      canStart: x,
      start: () => (x() ? tt() : ft().then(tt), b),
    };
  }
  var us = class {
      #t;
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout(),
          ii(this.gcTime) &&
            (this.#t = Ml.setTimeout(() => {
              this.optionalRemove();
            }, this.gcTime));
      }
      updateGcTime(i) {
        this.gcTime = Math.max(this.gcTime || 0, i ?? (_l ? 1 / 0 : 300 * 1e3));
      }
      clearGcTimeout() {
        this.#t && (Ml.clearTimeout(this.#t), (this.#t = void 0));
      }
    },
    Id = class extends us {
      #t;
      #e;
      #l;
      #u;
      #a;
      #i;
      #c;
      constructor(i) {
        super(),
          (this.#c = !1),
          (this.#i = i.defaultOptions),
          this.setOptions(i.options),
          (this.observers = []),
          (this.#u = i.client),
          (this.#l = this.#u.getQueryCache()),
          (this.queryKey = i.queryKey),
          (this.queryHash = i.queryHash),
          (this.#t = cs(this.options)),
          (this.state = i.state ?? this.#t),
          this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        return this.#a?.promise;
      }
      setOptions(i) {
        if (
          ((this.options = { ...this.#i, ...i }),
          this.updateGcTime(this.options.gcTime),
          this.state && this.state.data === void 0)
        ) {
          const f = cs(this.options);
          f.data !== void 0 && (this.setState(is(f.data, f.dataUpdatedAt)), (this.#t = f));
        }
      }
      optionalRemove() {
        !this.observers.length && this.state.fetchStatus === 'idle' && this.#l.remove(this);
      }
      setData(i, f) {
        const r = si(this.state.data, i, this.options);
        return (
          this.#n({ data: r, type: 'success', dataUpdatedAt: f?.updatedAt, manual: f?.manual }), r
        );
      }
      setState(i, f) {
        this.#n({ type: 'setState', state: i, setStateOptions: f });
      }
      cancel(i) {
        const f = this.#a?.promise;
        return this.#a?.cancel(i), f ? f.then(wt).catch(wt) : Promise.resolve();
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 });
      }
      reset() {
        this.destroy(), this.setState(this.#t);
      }
      isActive() {
        return this.observers.some((i) => ve(i.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === oi ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStatic() {
        return this.getObserversCount() > 0
          ? this.observers.some((i) => tl(i.options.staleTime, this) === 'static')
          : !1;
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some((i) => i.getCurrentResult().isStale)
          : this.state.data === void 0 || this.state.isInvalidated;
      }
      isStaleByTime(i = 0) {
        return this.state.data === void 0
          ? !0
          : i === 'static'
          ? !1
          : this.state.isInvalidated
          ? !0
          : !Ff(this.state.dataUpdatedAt, i);
      }
      onFocus() {
        this.observers.find((f) => f.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }),
          this.#a?.continue();
      }
      onOnline() {
        this.observers.find((f) => f.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }),
          this.#a?.continue();
      }
      addObserver(i) {
        this.observers.includes(i) ||
          (this.observers.push(i),
          this.clearGcTimeout(),
          this.#l.notify({ type: 'observerAdded', query: this, observer: i }));
      }
      removeObserver(i) {
        this.observers.includes(i) &&
          ((this.observers = this.observers.filter((f) => f !== i)),
          this.observers.length ||
            (this.#a && (this.#c ? this.#a.cancel({ revert: !0 }) : this.#a.cancelRetry()),
            this.scheduleGc()),
          this.#l.notify({ type: 'observerRemoved', query: this, observer: i }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated || this.#n({ type: 'invalidate' });
      }
      async fetch(i, f) {
        if (this.state.fetchStatus !== 'idle' && this.#a?.status() !== 'rejected') {
          if (this.state.data !== void 0 && f?.cancelRefetch) this.cancel({ silent: !0 });
          else if (this.#a) return this.#a.continueRetry(), this.#a.promise;
        }
        if ((i && this.setOptions(i), !this.options.queryFn)) {
          const M = this.observers.find((R) => R.options.queryFn);
          M && this.setOptions(M.options);
        }
        const r = new AbortController(),
          o = (M) => {
            Object.defineProperty(M, 'signal', {
              enumerable: !0,
              get: () => ((this.#c = !0), r.signal),
            });
          },
          b = () => {
            const M = ts(this.options, f),
              g = (() => {
                const x = { client: this.#u, queryKey: this.queryKey, meta: this.meta };
                return o(x), x;
              })();
            return (
              (this.#c = !1), this.options.persister ? this.options.persister(M, g, this) : M(g)
            );
          },
          D = (() => {
            const M = {
              fetchOptions: f,
              options: this.options,
              queryKey: this.queryKey,
              client: this.#u,
              state: this.state,
              fetchFn: b,
            };
            return o(M), M;
          })();
        this.options.behavior?.onFetch(D, this),
          (this.#e = this.state),
          (this.state.fetchStatus === 'idle' || this.state.fetchMeta !== D.fetchOptions?.meta) &&
            this.#n({ type: 'fetch', meta: D.fetchOptions?.meta }),
          (this.#a = as({
            initialPromise: f?.initialPromise,
            fn: D.fetchFn,
            onCancel: (M) => {
              M instanceof di && M.revert && this.setState({ ...this.#e, fetchStatus: 'idle' }),
                r.abort();
            },
            onFail: (M, R) => {
              this.#n({ type: 'failed', failureCount: M, error: R });
            },
            onPause: () => {
              this.#n({ type: 'pause' });
            },
            onContinue: () => {
              this.#n({ type: 'continue' });
            },
            retry: D.options.retry,
            retryDelay: D.options.retryDelay,
            networkMode: D.options.networkMode,
            canRun: () => !0,
          }));
        try {
          const M = await this.#a.start();
          if (M === void 0) throw new Error(`${this.queryHash} data is undefined`);
          return (
            this.setData(M),
            this.#l.config.onSuccess?.(M, this),
            this.#l.config.onSettled?.(M, this.state.error, this),
            M
          );
        } catch (M) {
          if (M instanceof di) {
            if (M.silent) return this.#a.promise;
            if (M.revert) {
              if (this.state.data === void 0) throw M;
              return this.state.data;
            }
          }
          throw (
            (this.#n({ type: 'error', error: M }),
            this.#l.config.onError?.(M, this),
            this.#l.config.onSettled?.(this.state.data, M, this),
            M)
          );
        } finally {
          this.scheduleGc();
        }
      }
      #n(i) {
        const f = (r) => {
          switch (i.type) {
            case 'failed':
              return { ...r, fetchFailureCount: i.failureCount, fetchFailureReason: i.error };
            case 'pause':
              return { ...r, fetchStatus: 'paused' };
            case 'continue':
              return { ...r, fetchStatus: 'fetching' };
            case 'fetch':
              return { ...r, ...ns(r.data, this.options), fetchMeta: i.meta ?? null };
            case 'success':
              const o = {
                ...r,
                ...is(i.data, i.dataUpdatedAt),
                dataUpdateCount: r.dataUpdateCount + 1,
                ...(!i.manual && {
                  fetchStatus: 'idle',
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                }),
              };
              return (this.#e = i.manual ? o : void 0), o;
            case 'error':
              const b = i.error;
              return {
                ...r,
                error: b,
                errorUpdateCount: r.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: r.fetchFailureCount + 1,
                fetchFailureReason: b,
                fetchStatus: 'idle',
                status: 'error',
              };
            case 'invalidate':
              return { ...r, isInvalidated: !0 };
            case 'setState':
              return { ...r, ...i.state };
          }
        };
        (this.state = f(this.state)),
          Nt.batch(() => {
            this.observers.forEach((r) => {
              r.onQueryUpdate();
            }),
              this.#l.notify({ query: this, type: 'updated', action: i });
          });
      }
    };
  function ns(i, f) {
    return {
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: ls(f.networkMode) ? 'fetching' : 'paused',
      ...(i === void 0 && { error: null, status: 'pending' }),
    };
  }
  function is(i, f) {
    return {
      data: i,
      dataUpdatedAt: f ?? Date.now(),
      error: null,
      isInvalidated: !1,
      status: 'success',
    };
  }
  function cs(i) {
    const f = typeof i.initialData == 'function' ? i.initialData() : i.initialData,
      r = f !== void 0,
      o = r
        ? typeof i.initialDataUpdatedAt == 'function'
          ? i.initialDataUpdatedAt()
          : i.initialDataUpdatedAt
        : 0;
    return {
      data: f,
      dataUpdateCount: 0,
      dataUpdatedAt: r ? o ?? Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: !1,
      status: r ? 'success' : 'pending',
      fetchStatus: 'idle',
    };
  }
  var Pd = class extends Wl {
    constructor(i, f) {
      super(),
        (this.options = f),
        (this.#t = i),
        (this.#n = null),
        (this.#c = hi()),
        this.bindMethods(),
        this.setOptions(f);
    }
    #t;
    #e = void 0;
    #l = void 0;
    #u = void 0;
    #a;
    #i;
    #c;
    #n;
    #m;
    #h;
    #d;
    #s;
    #o;
    #f;
    #y = new Set();
    bindMethods() {
      this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
      this.listeners.size === 1 &&
        (this.#e.addObserver(this),
        fs(this.#e, this.options) ? this.#r() : this.updateResult(),
        this.#S());
    }
    onUnsubscribe() {
      this.hasListeners() || this.destroy();
    }
    shouldFetchOnReconnect() {
      return yi(this.#e, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
      return yi(this.#e, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
      (this.listeners = new Set()), this.#b(), this.#E(), this.#e.removeObserver(this);
    }
    setOptions(i) {
      const f = this.options,
        r = this.#e;
      if (
        ((this.options = this.#t.defaultQueryOptions(i)),
        this.options.enabled !== void 0 &&
          typeof this.options.enabled != 'boolean' &&
          typeof this.options.enabled != 'function' &&
          typeof ve(this.options.enabled, this.#e) != 'boolean')
      )
        throw new Error('Expected enabled to be a boolean or a callback that returns a boolean');
      this.#T(),
        this.#e.setOptions(this.options),
        f._defaulted &&
          !Ru(this.options, f) &&
          this.#t
            .getQueryCache()
            .notify({ type: 'observerOptionsUpdated', query: this.#e, observer: this });
      const o = this.hasListeners();
      o && ss(this.#e, r, this.options, f) && this.#r(),
        this.updateResult(),
        o &&
          (this.#e !== r ||
            ve(this.options.enabled, this.#e) !== ve(f.enabled, this.#e) ||
            tl(this.options.staleTime, this.#e) !== tl(f.staleTime, this.#e)) &&
          this.#v();
      const b = this.#g();
      o &&
        (this.#e !== r ||
          ve(this.options.enabled, this.#e) !== ve(f.enabled, this.#e) ||
          b !== this.#f) &&
        this.#p(b);
    }
    getOptimisticResult(i) {
      const f = this.#t.getQueryCache().build(this.#t, i),
        r = this.createResult(f, i);
      return ey(this, r) && ((this.#u = r), (this.#i = this.options), (this.#a = this.#e.state)), r;
    }
    getCurrentResult() {
      return this.#u;
    }
    trackResult(i, f) {
      return new Proxy(i, {
        get: (r, o) => (
          this.trackProp(o),
          f?.(o),
          o === 'promise' &&
            (this.trackProp('data'),
            !this.options.experimental_prefetchInRender &&
              this.#c.status === 'pending' &&
              this.#c.reject(
                new Error('experimental_prefetchInRender feature flag is not enabled'),
              )),
          Reflect.get(r, o)
        ),
      });
    }
    trackProp(i) {
      this.#y.add(i);
    }
    getCurrentQuery() {
      return this.#e;
    }
    refetch({ ...i } = {}) {
      return this.fetch({ ...i });
    }
    fetchOptimistic(i) {
      const f = this.#t.defaultQueryOptions(i),
        r = this.#t.getQueryCache().build(this.#t, f);
      return r.fetch().then(() => this.createResult(r, f));
    }
    fetch(i) {
      return this.#r({ ...i, cancelRefetch: i.cancelRefetch ?? !0 }).then(
        () => (this.updateResult(), this.#u),
      );
    }
    #r(i) {
      this.#T();
      let f = this.#e.fetch(this.options, i);
      return i?.throwOnError || (f = f.catch(wt)), f;
    }
    #v() {
      this.#b();
      const i = tl(this.options.staleTime, this.#e);
      if (_l || this.#u.isStale || !ii(i)) return;
      const r = Ff(this.#u.dataUpdatedAt, i) + 1;
      this.#s = Ml.setTimeout(() => {
        this.#u.isStale || this.updateResult();
      }, r);
    }
    #g() {
      return (
        (typeof this.options.refetchInterval == 'function'
          ? this.options.refetchInterval(this.#e)
          : this.options.refetchInterval) ?? !1
      );
    }
    #p(i) {
      this.#E(),
        (this.#f = i),
        !(_l || ve(this.options.enabled, this.#e) === !1 || !ii(this.#f) || this.#f === 0) &&
          (this.#o = Ml.setInterval(() => {
            (this.options.refetchIntervalInBackground || ri.isFocused()) && this.#r();
          }, this.#f));
    }
    #S() {
      this.#v(), this.#p(this.#g());
    }
    #b() {
      this.#s && (Ml.clearTimeout(this.#s), (this.#s = void 0));
    }
    #E() {
      this.#o && (Ml.clearInterval(this.#o), (this.#o = void 0));
    }
    createResult(i, f) {
      const r = this.#e,
        o = this.options,
        b = this.#u,
        T = this.#a,
        D = this.#i,
        R = i !== r ? i.state : this.#l,
        { state: g } = i;
      let x = { ...g },
        U = !1,
        q;
      if (f._optimisticResults) {
        const vt = this.hasListeners(),
          Jt = !vt && fs(i, f),
          ne = vt && ss(i, r, f, o);
        (Jt || ne) && (x = { ...x, ...ns(g.data, i.options) }),
          f._optimisticResults === 'isRestoring' && (x.fetchStatus = 'idle');
      }
      let { error: ft, errorUpdatedAt: tt, status: Z } = x;
      q = x.data;
      let at = !1;
      if (f.placeholderData !== void 0 && q === void 0 && Z === 'pending') {
        let vt;
        b?.isPlaceholderData && f.placeholderData === D?.placeholderData
          ? ((vt = b.data), (at = !0))
          : (vt =
              typeof f.placeholderData == 'function'
                ? f.placeholderData(this.#d?.state.data, this.#d)
                : f.placeholderData),
          vt !== void 0 && ((Z = 'success'), (q = si(b?.data, vt, f)), (U = !0));
      }
      if (f.select && q !== void 0 && !at)
        if (b && q === T?.data && f.select === this.#m) q = this.#h;
        else
          try {
            (this.#m = f.select),
              (q = f.select(q)),
              (q = si(b?.data, q, f)),
              (this.#h = q),
              (this.#n = null);
          } catch (vt) {
            this.#n = vt;
          }
      this.#n && ((ft = this.#n), (q = this.#h), (tt = Date.now()), (Z = 'error'));
      const rt = x.fetchStatus === 'fetching',
        Ct = Z === 'pending',
        St = Z === 'error',
        Dt = Ct && rt,
        jt = q !== void 0,
        V = {
          status: Z,
          fetchStatus: x.fetchStatus,
          isPending: Ct,
          isSuccess: Z === 'success',
          isError: St,
          isInitialLoading: Dt,
          isLoading: Dt,
          data: q,
          dataUpdatedAt: x.dataUpdatedAt,
          error: ft,
          errorUpdatedAt: tt,
          failureCount: x.fetchFailureCount,
          failureReason: x.fetchFailureReason,
          errorUpdateCount: x.errorUpdateCount,
          isFetched: x.dataUpdateCount > 0 || x.errorUpdateCount > 0,
          isFetchedAfterMount:
            x.dataUpdateCount > R.dataUpdateCount || x.errorUpdateCount > R.errorUpdateCount,
          isFetching: rt,
          isRefetching: rt && !Ct,
          isLoadingError: St && !jt,
          isPaused: x.fetchStatus === 'paused',
          isPlaceholderData: U,
          isRefetchError: St && jt,
          isStale: mi(i, f),
          refetch: this.refetch,
          promise: this.#c,
          isEnabled: ve(f.enabled, i) !== !1,
        };
      if (this.options.experimental_prefetchInRender) {
        const vt = (Ft) => {
            V.status === 'error' ? Ft.reject(V.error) : V.data !== void 0 && Ft.resolve(V.data);
          },
          Jt = () => {
            const Ft = (this.#c = V.promise = hi());
            vt(Ft);
          },
          ne = this.#c;
        switch (ne.status) {
          case 'pending':
            i.queryHash === r.queryHash && vt(ne);
            break;
          case 'fulfilled':
            (V.status === 'error' || V.data !== ne.value) && Jt();
            break;
          case 'rejected':
            (V.status !== 'error' || V.error !== ne.reason) && Jt();
            break;
        }
      }
      return V;
    }
    updateResult() {
      const i = this.#u,
        f = this.createResult(this.#e, this.options);
      if (
        ((this.#a = this.#e.state),
        (this.#i = this.options),
        this.#a.data !== void 0 && (this.#d = this.#e),
        Ru(f, i))
      )
        return;
      this.#u = f;
      const r = () => {
        if (!i) return !0;
        const { notifyOnChangeProps: o } = this.options,
          b = typeof o == 'function' ? o() : o;
        if (b === 'all' || (!b && !this.#y.size)) return !0;
        const T = new Set(b ?? this.#y);
        return (
          this.options.throwOnError && T.add('error'),
          Object.keys(this.#u).some((D) => {
            const M = D;
            return this.#u[M] !== i[M] && T.has(M);
          })
        );
      };
      this.#A({ listeners: r() });
    }
    #T() {
      const i = this.#t.getQueryCache().build(this.#t, this.options);
      if (i === this.#e) return;
      const f = this.#e;
      (this.#e = i),
        (this.#l = i.state),
        this.hasListeners() && (f?.removeObserver(this), i.addObserver(this));
    }
    onQueryUpdate() {
      this.updateResult(), this.hasListeners() && this.#S();
    }
    #A(i) {
      Nt.batch(() => {
        i.listeners &&
          this.listeners.forEach((f) => {
            f(this.#u);
          }),
          this.#t.getQueryCache().notify({ query: this.#e, type: 'observerResultsUpdated' });
      });
    }
  };
  function ty(i, f) {
    return (
      ve(f.enabled, i) !== !1 &&
      i.state.data === void 0 &&
      !(i.state.status === 'error' && f.retryOnMount === !1)
    );
  }
  function fs(i, f) {
    return ty(i, f) || (i.state.data !== void 0 && yi(i, f, f.refetchOnMount));
  }
  function yi(i, f, r) {
    if (ve(f.enabled, i) !== !1 && tl(f.staleTime, i) !== 'static') {
      const o = typeof r == 'function' ? r(i) : r;
      return o === 'always' || (o !== !1 && mi(i, f));
    }
    return !1;
  }
  function ss(i, f, r, o) {
    return (
      (i !== f || ve(o.enabled, i) === !1) &&
      (!r.suspense || i.state.status !== 'error') &&
      mi(i, r)
    );
  }
  function mi(i, f) {
    return ve(f.enabled, i) !== !1 && i.isStaleByTime(tl(f.staleTime, i));
  }
  function ey(i, f) {
    return !Ru(i.getCurrentResult(), f);
  }
  function os(i) {
    return {
      onFetch: (f, r) => {
        const o = f.options,
          b = f.fetchOptions?.meta?.fetchMore?.direction,
          T = f.state.data?.pages || [],
          D = f.state.data?.pageParams || [];
        let M = { pages: [], pageParams: [] },
          R = 0;
        const g = async () => {
          let x = !1;
          const U = (tt) => {
              Object.defineProperty(tt, 'signal', {
                enumerable: !0,
                get: () => (
                  f.signal.aborted
                    ? (x = !0)
                    : f.signal.addEventListener('abort', () => {
                        x = !0;
                      }),
                  f.signal
                ),
              });
            },
            q = ts(f.options, f.fetchOptions),
            ft = async (tt, Z, at) => {
              if (x) return Promise.reject();
              if (Z == null && tt.pages.length) return Promise.resolve(tt);
              const Ct = (() => {
                  const Qt = {
                    client: f.client,
                    queryKey: f.queryKey,
                    pageParam: Z,
                    direction: at ? 'backward' : 'forward',
                    meta: f.options.meta,
                  };
                  return U(Qt), Qt;
                })(),
                St = await q(Ct),
                { maxPages: Dt } = f.options,
                jt = at ? wd : Kd;
              return { pages: jt(tt.pages, St, Dt), pageParams: jt(tt.pageParams, Z, Dt) };
            };
          if (b && T.length) {
            const tt = b === 'backward',
              Z = tt ? ly : rs,
              at = { pages: T, pageParams: D },
              rt = Z(o, at);
            M = await ft(at, rt, tt);
          } else {
            const tt = i ?? T.length;
            do {
              const Z = R === 0 ? D[0] ?? o.initialPageParam : rs(o, M);
              if (R > 0 && Z == null) break;
              (M = await ft(M, Z)), R++;
            } while (R < tt);
          }
          return M;
        };
        f.options.persister
          ? (f.fetchFn = () =>
              f.options.persister?.(
                g,
                { client: f.client, queryKey: f.queryKey, meta: f.options.meta, signal: f.signal },
                r,
              ))
          : (f.fetchFn = g);
      },
    };
  }
  function rs(i, { pages: f, pageParams: r }) {
    const o = f.length - 1;
    return f.length > 0 ? i.getNextPageParam(f[o], f, r[o], r) : void 0;
  }
  function ly(i, { pages: f, pageParams: r }) {
    return f.length > 0 ? i.getPreviousPageParam?.(f[0], f, r[0], r) : void 0;
  }
  var ay = class extends us {
    #t;
    #e;
    #l;
    #u;
    constructor(i) {
      super(),
        (this.#t = i.client),
        (this.mutationId = i.mutationId),
        (this.#l = i.mutationCache),
        (this.#e = []),
        (this.state = i.state || hs()),
        this.setOptions(i.options),
        this.scheduleGc();
    }
    setOptions(i) {
      (this.options = i), this.updateGcTime(this.options.gcTime);
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(i) {
      this.#e.includes(i) ||
        (this.#e.push(i),
        this.clearGcTimeout(),
        this.#l.notify({ type: 'observerAdded', mutation: this, observer: i }));
    }
    removeObserver(i) {
      (this.#e = this.#e.filter((f) => f !== i)),
        this.scheduleGc(),
        this.#l.notify({ type: 'observerRemoved', mutation: this, observer: i });
    }
    optionalRemove() {
      this.#e.length ||
        (this.state.status === 'pending' ? this.scheduleGc() : this.#l.remove(this));
    }
    continue() {
      return this.#u?.continue() ?? this.execute(this.state.variables);
    }
    async execute(i) {
      const f = () => {
          this.#a({ type: 'continue' });
        },
        r = { client: this.#t, meta: this.options.meta, mutationKey: this.options.mutationKey };
      this.#u = as({
        fn: () =>
          this.options.mutationFn
            ? this.options.mutationFn(i, r)
            : Promise.reject(new Error('No mutationFn found')),
        onFail: (T, D) => {
          this.#a({ type: 'failed', failureCount: T, error: D });
        },
        onPause: () => {
          this.#a({ type: 'pause' });
        },
        onContinue: f,
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#l.canRun(this),
      });
      const o = this.state.status === 'pending',
        b = !this.#u.canStart();
      try {
        if (o) f();
        else {
          this.#a({ type: 'pending', variables: i, isPaused: b }),
            await this.#l.config.onMutate?.(i, this, r);
          const D = await this.options.onMutate?.(i, r);
          D !== this.state.context &&
            this.#a({ type: 'pending', context: D, variables: i, isPaused: b });
        }
        const T = await this.#u.start();
        return (
          await this.#l.config.onSuccess?.(T, i, this.state.context, this, r),
          await this.options.onSuccess?.(T, i, this.state.context, r),
          await this.#l.config.onSettled?.(
            T,
            null,
            this.state.variables,
            this.state.context,
            this,
            r,
          ),
          await this.options.onSettled?.(T, null, i, this.state.context, r),
          this.#a({ type: 'success', data: T }),
          T
        );
      } catch (T) {
        try {
          throw (
            (await this.#l.config.onError?.(T, i, this.state.context, this, r),
            await this.options.onError?.(T, i, this.state.context, r),
            await this.#l.config.onSettled?.(
              void 0,
              T,
              this.state.variables,
              this.state.context,
              this,
              r,
            ),
            await this.options.onSettled?.(void 0, T, i, this.state.context, r),
            T)
          );
        } finally {
          this.#a({ type: 'error', error: T });
        }
      } finally {
        this.#l.runNext(this);
      }
    }
    #a(i) {
      const f = (r) => {
        switch (i.type) {
          case 'failed':
            return { ...r, failureCount: i.failureCount, failureReason: i.error };
          case 'pause':
            return { ...r, isPaused: !0 };
          case 'continue':
            return { ...r, isPaused: !1 };
          case 'pending':
            return {
              ...r,
              context: i.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: i.isPaused,
              status: 'pending',
              variables: i.variables,
              submittedAt: Date.now(),
            };
          case 'success':
            return {
              ...r,
              data: i.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: 'success',
              isPaused: !1,
            };
          case 'error':
            return {
              ...r,
              data: void 0,
              error: i.error,
              failureCount: r.failureCount + 1,
              failureReason: i.error,
              isPaused: !1,
              status: 'error',
            };
        }
      };
      (this.state = f(this.state)),
        Nt.batch(() => {
          this.#e.forEach((r) => {
            r.onMutationUpdate(i);
          }),
            this.#l.notify({ mutation: this, type: 'updated', action: i });
        });
    }
  };
  function hs() {
    return {
      context: void 0,
      data: void 0,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: !1,
      status: 'idle',
      variables: void 0,
      submittedAt: 0,
    };
  }
  var uy = class extends Wl {
    constructor(i = {}) {
      super(), (this.config = i), (this.#t = new Set()), (this.#e = new Map()), (this.#l = 0);
    }
    #t;
    #e;
    #l;
    build(i, f, r) {
      const o = new ay({
        client: i,
        mutationCache: this,
        mutationId: ++this.#l,
        options: i.defaultMutationOptions(f),
        state: r,
      });
      return this.add(o), o;
    }
    add(i) {
      this.#t.add(i);
      const f = xu(i);
      if (typeof f == 'string') {
        const r = this.#e.get(f);
        r ? r.push(i) : this.#e.set(f, [i]);
      }
      this.notify({ type: 'added', mutation: i });
    }
    remove(i) {
      if (this.#t.delete(i)) {
        const f = xu(i);
        if (typeof f == 'string') {
          const r = this.#e.get(f);
          if (r)
            if (r.length > 1) {
              const o = r.indexOf(i);
              o !== -1 && r.splice(o, 1);
            } else r[0] === i && this.#e.delete(f);
        }
      }
      this.notify({ type: 'removed', mutation: i });
    }
    canRun(i) {
      const f = xu(i);
      if (typeof f == 'string') {
        const o = this.#e.get(f)?.find((b) => b.state.status === 'pending');
        return !o || o === i;
      } else return !0;
    }
    runNext(i) {
      const f = xu(i);
      return typeof f == 'string'
        ? this.#e
            .get(f)
            ?.find((o) => o !== i && o.state.isPaused)
            ?.continue() ?? Promise.resolve()
        : Promise.resolve();
    }
    clear() {
      Nt.batch(() => {
        this.#t.forEach((i) => {
          this.notify({ type: 'removed', mutation: i });
        }),
          this.#t.clear(),
          this.#e.clear();
      });
    }
    getAll() {
      return Array.from(this.#t);
    }
    find(i) {
      const f = { exact: !0, ...i };
      return this.getAll().find((r) => kf(f, r));
    }
    findAll(i = {}) {
      return this.getAll().filter((f) => kf(i, f));
    }
    notify(i) {
      Nt.batch(() => {
        this.listeners.forEach((f) => {
          f(i);
        });
      });
    }
    resumePausedMutations() {
      const i = this.getAll().filter((f) => f.state.isPaused);
      return Nt.batch(() => Promise.all(i.map((f) => f.continue().catch(wt))));
    }
  };
  function xu(i) {
    return i.options.scope?.id;
  }
  var ny = class extends Wl {
      #t;
      #e = void 0;
      #l;
      #u;
      constructor(f, r) {
        super(), (this.#t = f), this.setOptions(r), this.bindMethods(), this.#a();
      }
      bindMethods() {
        (this.mutate = this.mutate.bind(this)), (this.reset = this.reset.bind(this));
      }
      setOptions(f) {
        const r = this.options;
        (this.options = this.#t.defaultMutationOptions(f)),
          Ru(this.options, r) ||
            this.#t
              .getMutationCache()
              .notify({ type: 'observerOptionsUpdated', mutation: this.#l, observer: this }),
          r?.mutationKey &&
          this.options.mutationKey &&
          Cl(r.mutationKey) !== Cl(this.options.mutationKey)
            ? this.reset()
            : this.#l?.state.status === 'pending' && this.#l.setOptions(this.options);
      }
      onUnsubscribe() {
        this.hasListeners() || this.#l?.removeObserver(this);
      }
      onMutationUpdate(f) {
        this.#a(), this.#i(f);
      }
      getCurrentResult() {
        return this.#e;
      }
      reset() {
        this.#l?.removeObserver(this), (this.#l = void 0), this.#a(), this.#i();
      }
      mutate(f, r) {
        return (
          (this.#u = r),
          this.#l?.removeObserver(this),
          (this.#l = this.#t.getMutationCache().build(this.#t, this.options)),
          this.#l.addObserver(this),
          this.#l.execute(f)
        );
      }
      #a() {
        const f = this.#l?.state ?? hs();
        this.#e = {
          ...f,
          isPending: f.status === 'pending',
          isSuccess: f.status === 'success',
          isError: f.status === 'error',
          isIdle: f.status === 'idle',
          mutate: this.mutate,
          reset: this.reset,
        };
      }
      #i(f) {
        Nt.batch(() => {
          if (this.#u && this.hasListeners()) {
            const r = this.#e.variables,
              o = this.#e.context,
              b = {
                client: this.#t,
                meta: this.options.meta,
                mutationKey: this.options.mutationKey,
              };
            f?.type === 'success'
              ? (this.#u.onSuccess?.(f.data, r, o, b), this.#u.onSettled?.(f.data, null, r, o, b))
              : f?.type === 'error' &&
                (this.#u.onError?.(f.error, r, o, b),
                this.#u.onSettled?.(void 0, f.error, r, o, b));
          }
          this.listeners.forEach((r) => {
            r(this.#e);
          });
        });
      }
    },
    iy = class extends Wl {
      constructor(i = {}) {
        super(), (this.config = i), (this.#t = new Map());
      }
      #t;
      build(i, f, r) {
        const o = f.queryKey,
          b = f.queryHash ?? ci(o, f);
        let T = this.get(b);
        return (
          T ||
            ((T = new Id({
              client: i,
              queryKey: o,
              queryHash: b,
              options: i.defaultQueryOptions(f),
              state: r,
              defaultOptions: i.getQueryDefaults(o),
            })),
            this.add(T)),
          T
        );
      }
      add(i) {
        this.#t.has(i.queryHash) ||
          (this.#t.set(i.queryHash, i), this.notify({ type: 'added', query: i }));
      }
      remove(i) {
        const f = this.#t.get(i.queryHash);
        f &&
          (i.destroy(),
          f === i && this.#t.delete(i.queryHash),
          this.notify({ type: 'removed', query: i }));
      }
      clear() {
        Nt.batch(() => {
          this.getAll().forEach((i) => {
            this.remove(i);
          });
        });
      }
      get(i) {
        return this.#t.get(i);
      }
      getAll() {
        return [...this.#t.values()];
      }
      find(i) {
        const f = { exact: !0, ...i };
        return this.getAll().find((r) => Wf(f, r));
      }
      findAll(i = {}) {
        const f = this.getAll();
        return Object.keys(i).length > 0 ? f.filter((r) => Wf(i, r)) : f;
      }
      notify(i) {
        Nt.batch(() => {
          this.listeners.forEach((f) => {
            f(i);
          });
        });
      }
      onFocus() {
        Nt.batch(() => {
          this.getAll().forEach((i) => {
            i.onFocus();
          });
        });
      }
      onOnline() {
        Nt.batch(() => {
          this.getAll().forEach((i) => {
            i.onOnline();
          });
        });
      }
    },
    cy = class {
      #t;
      #e;
      #l;
      #u;
      #a;
      #i;
      #c;
      #n;
      constructor(i = {}) {
        (this.#t = i.queryCache || new iy()),
          (this.#e = i.mutationCache || new uy()),
          (this.#l = i.defaultOptions || {}),
          (this.#u = new Map()),
          (this.#a = new Map()),
          (this.#i = 0);
      }
      mount() {
        this.#i++,
          this.#i === 1 &&
            ((this.#c = ri.subscribe(async (i) => {
              i && (await this.resumePausedMutations(), this.#t.onFocus());
            })),
            (this.#n = Uu.subscribe(async (i) => {
              i && (await this.resumePausedMutations(), this.#t.onOnline());
            })));
      }
      unmount() {
        this.#i--,
          this.#i === 0 && (this.#c?.(), (this.#c = void 0), this.#n?.(), (this.#n = void 0));
      }
      isFetching(i) {
        return this.#t.findAll({ ...i, fetchStatus: 'fetching' }).length;
      }
      isMutating(i) {
        return this.#e.findAll({ ...i, status: 'pending' }).length;
      }
      getQueryData(i) {
        const f = this.defaultQueryOptions({ queryKey: i });
        return this.#t.get(f.queryHash)?.state.data;
      }
      ensureQueryData(i) {
        const f = this.defaultQueryOptions(i),
          r = this.#t.build(this, f),
          o = r.state.data;
        return o === void 0
          ? this.fetchQuery(i)
          : (i.revalidateIfStale && r.isStaleByTime(tl(f.staleTime, r)) && this.prefetchQuery(f),
            Promise.resolve(o));
      }
      getQueriesData(i) {
        return this.#t.findAll(i).map(({ queryKey: f, state: r }) => {
          const o = r.data;
          return [f, o];
        });
      }
      setQueryData(i, f, r) {
        const o = this.defaultQueryOptions({ queryKey: i }),
          T = this.#t.get(o.queryHash)?.state.data,
          D = Xd(f, T);
        if (D !== void 0) return this.#t.build(this, o).setData(D, { ...r, manual: !0 });
      }
      setQueriesData(i, f, r) {
        return Nt.batch(() =>
          this.#t.findAll(i).map(({ queryKey: o }) => [o, this.setQueryData(o, f, r)]),
        );
      }
      getQueryState(i) {
        const f = this.defaultQueryOptions({ queryKey: i });
        return this.#t.get(f.queryHash)?.state;
      }
      removeQueries(i) {
        const f = this.#t;
        Nt.batch(() => {
          f.findAll(i).forEach((r) => {
            f.remove(r);
          });
        });
      }
      resetQueries(i, f) {
        const r = this.#t;
        return Nt.batch(
          () => (
            r.findAll(i).forEach((o) => {
              o.reset();
            }),
            this.refetchQueries({ type: 'active', ...i }, f)
          ),
        );
      }
      cancelQueries(i, f = {}) {
        const r = { revert: !0, ...f },
          o = Nt.batch(() => this.#t.findAll(i).map((b) => b.cancel(r)));
        return Promise.all(o).then(wt).catch(wt);
      }
      invalidateQueries(i, f = {}) {
        return Nt.batch(
          () => (
            this.#t.findAll(i).forEach((r) => {
              r.invalidate();
            }),
            i?.refetchType === 'none'
              ? Promise.resolve()
              : this.refetchQueries({ ...i, type: i?.refetchType ?? i?.type ?? 'active' }, f)
          ),
        );
      }
      refetchQueries(i, f = {}) {
        const r = { ...f, cancelRefetch: f.cancelRefetch ?? !0 },
          o = Nt.batch(() =>
            this.#t
              .findAll(i)
              .filter((b) => !b.isDisabled() && !b.isStatic())
              .map((b) => {
                let T = b.fetch(void 0, r);
                return (
                  r.throwOnError || (T = T.catch(wt)),
                  b.state.fetchStatus === 'paused' ? Promise.resolve() : T
                );
              }),
          );
        return Promise.all(o).then(wt);
      }
      fetchQuery(i) {
        const f = this.defaultQueryOptions(i);
        f.retry === void 0 && (f.retry = !1);
        const r = this.#t.build(this, f);
        return r.isStaleByTime(tl(f.staleTime, r)) ? r.fetch(f) : Promise.resolve(r.state.data);
      }
      prefetchQuery(i) {
        return this.fetchQuery(i).then(wt).catch(wt);
      }
      fetchInfiniteQuery(i) {
        return (i.behavior = os(i.pages)), this.fetchQuery(i);
      }
      prefetchInfiniteQuery(i) {
        return this.fetchInfiniteQuery(i).then(wt).catch(wt);
      }
      ensureInfiniteQueryData(i) {
        return (i.behavior = os(i.pages)), this.ensureQueryData(i);
      }
      resumePausedMutations() {
        return Uu.isOnline() ? this.#e.resumePausedMutations() : Promise.resolve();
      }
      getQueryCache() {
        return this.#t;
      }
      getMutationCache() {
        return this.#e;
      }
      getDefaultOptions() {
        return this.#l;
      }
      setDefaultOptions(i) {
        this.#l = i;
      }
      setQueryDefaults(i, f) {
        this.#u.set(Cl(i), { queryKey: i, defaultOptions: f });
      }
      getQueryDefaults(i) {
        const f = [...this.#u.values()],
          r = {};
        return (
          f.forEach((o) => {
            ja(i, o.queryKey) && Object.assign(r, o.defaultOptions);
          }),
          r
        );
      }
      setMutationDefaults(i, f) {
        this.#a.set(Cl(i), { mutationKey: i, defaultOptions: f });
      }
      getMutationDefaults(i) {
        const f = [...this.#a.values()],
          r = {};
        return (
          f.forEach((o) => {
            ja(i, o.mutationKey) && Object.assign(r, o.defaultOptions);
          }),
          r
        );
      }
      defaultQueryOptions(i) {
        if (i._defaulted) return i;
        const f = {
          ...this.#l.queries,
          ...this.getQueryDefaults(i.queryKey),
          ...i,
          _defaulted: !0,
        };
        return (
          f.queryHash || (f.queryHash = ci(f.queryKey, f)),
          f.refetchOnReconnect === void 0 && (f.refetchOnReconnect = f.networkMode !== 'always'),
          f.throwOnError === void 0 && (f.throwOnError = !!f.suspense),
          !f.networkMode && f.persister && (f.networkMode = 'offlineFirst'),
          f.queryFn === oi && (f.enabled = !1),
          f
        );
      }
      defaultMutationOptions(i) {
        return i?._defaulted
          ? i
          : {
              ...this.#l.mutations,
              ...(i?.mutationKey && this.getMutationDefaults(i.mutationKey)),
              ...i,
              _defaulted: !0,
            };
      }
      clear() {
        this.#t.clear(), this.#e.clear();
      }
    },
    ds = lt.createContext(void 0),
    ys = (i) => {
      const f = lt.useContext(ds);
      if (!f) throw new Error('No QueryClient set, use QueryClientProvider to set one');
      return f;
    },
    fy = ({ client: i, children: f }) => (
      lt.useEffect(
        () => (
          i.mount(),
          () => {
            i.unmount();
          }
        ),
        [i],
      ),
      G.jsx(ds.Provider, { value: i, children: f })
    ),
    ms = lt.createContext(!1),
    sy = () => lt.useContext(ms);
  ms.Provider;
  function oy() {
    let i = !1;
    return {
      clearReset: () => {
        i = !1;
      },
      reset: () => {
        i = !0;
      },
      isReset: () => i,
    };
  }
  var ry = lt.createContext(oy()),
    hy = () => lt.useContext(ry),
    dy = (i, f) => {
      (i.suspense || i.throwOnError || i.experimental_prefetchInRender) &&
        (f.isReset() || (i.retryOnMount = !1));
    },
    yy = (i) => {
      lt.useEffect(() => {
        i.clearReset();
      }, [i]);
    },
    my = ({ result: i, errorResetBoundary: f, throwOnError: r, query: o, suspense: b }) =>
      i.isError &&
      !f.isReset() &&
      !i.isFetching &&
      o &&
      ((b && i.data === void 0) || es(r, [i.error, o])),
    vy = (i) => {
      if (i.suspense) {
        const r = (b) => (b === 'static' ? b : Math.max(b ?? 1e3, 1e3)),
          o = i.staleTime;
        (i.staleTime = typeof o == 'function' ? (...b) => r(o(...b)) : r(o)),
          typeof i.gcTime == 'number' && (i.gcTime = Math.max(i.gcTime, 1e3));
      }
    },
    gy = (i, f) => i.isLoading && i.isFetching && !f,
    py = (i, f) => i?.suspense && f.isPending,
    vs = (i, f, r) =>
      f.fetchOptimistic(i).catch(() => {
        r.clearReset();
      });
  function Sy(i, f, r) {
    const o = sy(),
      b = hy(),
      T = ys(),
      D = T.defaultQueryOptions(i);
    T.getDefaultOptions().queries?._experimental_beforeQuery?.(D),
      (D._optimisticResults = o ? 'isRestoring' : 'optimistic'),
      vy(D),
      dy(D, b),
      yy(b);
    const M = !T.getQueryCache().get(D.queryHash),
      [R] = lt.useState(() => new f(T, D)),
      g = R.getOptimisticResult(D),
      x = !o && i.subscribed !== !1;
    if (
      (lt.useSyncExternalStore(
        lt.useCallback(
          (U) => {
            const q = x ? R.subscribe(Nt.batchCalls(U)) : wt;
            return R.updateResult(), q;
          },
          [R, x],
        ),
        () => R.getCurrentResult(),
        () => R.getCurrentResult(),
      ),
      lt.useEffect(() => {
        R.setOptions(D);
      }, [D, R]),
      py(D, g))
    )
      throw vs(D, R, b);
    if (
      my({
        result: g,
        errorResetBoundary: b,
        throwOnError: D.throwOnError,
        query: T.getQueryCache().get(D.queryHash),
        suspense: D.suspense,
      })
    )
      throw g.error;
    return (
      T.getDefaultOptions().queries?._experimental_afterQuery?.(D, g),
      D.experimental_prefetchInRender &&
        !_l &&
        gy(g, o) &&
        (M ? vs(D, R, b) : T.getQueryCache().get(D.queryHash)?.promise)?.catch(wt).finally(() => {
          R.updateResult();
        }),
      D.notifyOnChangeProps ? g : R.trackResult(g)
    );
  }
  function by(i, f) {
    return Sy(i, Pd);
  }
  function Ey(i, f) {
    const r = ys(),
      [o] = lt.useState(() => new ny(r, i));
    lt.useEffect(() => {
      o.setOptions(i);
    }, [o, i]);
    const b = lt.useSyncExternalStore(
        lt.useCallback((D) => o.subscribe(Nt.batchCalls(D)), [o]),
        () => o.getCurrentResult(),
        () => o.getCurrentResult(),
      ),
      T = lt.useCallback(
        (D, M) => {
          o.mutate(D, M).catch(wt);
        },
        [o],
      );
    if (b.error && es(o.options.throwOnError, [b.error])) throw b.error;
    return { ...b, mutate: T, mutateAsync: b.mutate };
  }
  const gs = 'dhp_panel_state',
    ps = 'dhp_selections',
    vi = 'dhp_custom_highlighted_labels',
    Hu = 'dhp_api_token',
    Ss = '6.21',
    Ty = '759194518a1e8634735edc1b68d5c511b467fd1901249a7ac7d2d8387f7899db',
    Ay =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" alt="Collection"><title>Collection</title><path d="M19.5846 20.5964C18.8055 20.5964 18.1719 19.9628 18.1719 19.1837V4.41267C18.1719 3.63359 18.8055 3 19.5846 3C20.3636 3 20.9972 3.63359 20.9972 4.41267V19.1837C20.9972 19.9628 20.3636 20.5964 19.5846 20.5964Z" fill="#FEFEFE"></path><path d="M15.858 20.5964C15.0789 20.5964 14.4453 19.9628 14.4453 19.1837V4.41267C14.4453 3.63359 15.0789 3 15.858 3C16.6371 3 17.2707 3.63359 17.2707 4.41267V19.1837C17.2707 19.9628 16.6371 20.5964 15.858 20.5964Z" fill="#FEFEFE"></path><path d="M12.1236 20.5964C11.3445 20.5964 10.7109 19.9628 10.7109 19.1837V4.41267C10.7109 3.63359 11.3445 3 12.1236 3C12.9027 3 13.5363 3.63359 13.5363 4.41267V19.1837C13.5363 19.9628 12.9027 20.5964 12.1236 20.5964Z" fill="#FEFEFE"></path><path d="M3.41022 20.1624C3.25167 20.1624 3.09016 20.1369 2.93517 20.0799C2.20063 19.8168 1.82059 19.0092 2.08305 18.2747L7.06454 4.36827C7.3276 3.63373 8.13518 3.25369 8.86973 3.51616C9.60427 3.77862 9.98431 4.5868 9.72185 5.32134L4.74036 19.2278C4.53134 19.8044 3.98978 20.1618 3.41022 20.1618V20.1624Z" fill="#FEFEFE"></path></svg>',
    bs = {
      poor: [
        'Abkco',
        'Abraxas',
        'Akarma',
        'Back To Black',
        'DOL',
        'DOXY',
        'Fame',
        'Jazz Wax',
        'Music on Vinyl',
        'Simply Vinyl',
        'Skorpio',
        'Tapestry',
        'Vinyl Lovers',
        'Waxtime In Color',
        'WaxTime',
        'ZYX',
      ],
      fair: [
        'Bad Joker',
        'joe jackson recoords',
        'Lilith',
        'Get Back',
        'Hi Hat',
        'Sanctuary Records',
        'Vinyl Magic (VM - BTF)',
      ],
      good: [
        'Analogue Productions',
        'Cisco',
        'EMC',
        'Flightless',
        'Hubro',
        'Riverside Records',
        'Rune Grammofon',
        "Speaker's Corner",
      ],
      veryGood: [
        'ACT',
        'AKT',
        'Audio Fidelity',
        'Blue Note',
        'ECM',
        'ECM Records',
        'Impulse!',
        'Jazzaway',
        'Jazzland',
        'Mobile Fidelity',
        'Moserobie Music Production',
        'Seventh Records',
        'Soleil Zeuhl',
      ],
    },
    Es = { poor: '#8B0000', fair: '#FF6347', good: '#90EE90', veryGood: '#228B22' };
  async function Oy(i) {
    return new Promise((f) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://api.discogs.com/oauth/identity',
        headers: {
          'User-Agent': `DiscogsGradingHelperPanel/${Ss}`,
          Authorization: `Discogs token=${i}`,
        },
        onload: (r) => {
          if (r.status === 200) {
            const o = JSON.parse(r.responseText);
            f(o.username || null);
          } else f(null);
        },
        onerror: () => f(null),
      });
    });
  }
  async function zy() {
    const i = GM_getValue(Hu, '');
    if (!i) throw new Error('Please enter and save your token.');
    const f = await Oy(i);
    if (!f) throw new Error('Could not fetch username. Please check your token.');
    const r = `https://api.discogs.com/users/${f}/collection/fields`;
    return new Promise((o, b) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: r,
        headers: {
          'User-Agent': `DiscogsGradingHelperPanel/${Ss}`,
          Authorization: `Discogs token=${i}`,
        },
        onload: function (T) {
          if (T.status >= 200 && T.status < 300) {
            const D = JSON.parse(T.responseText);
            D.fields, o(D);
          } else b(new Error(T.responseText));
        },
        onerror: (T) => b(new Error(JSON.stringify(T))),
      });
    });
  }
  async function My(i) {
    const f = Array.from(
      document.querySelectorAll('[data-field="__check__"] input[aria-label~="row"]:checked'),
    );
    let r;
    if (
      (f.length > 0
        ? (r = f.map((T) => T.closest('div.MuiDataGrid-row[data-id]')))
        : (r = Array.from(document.querySelectorAll('div.MuiDataGrid-row[data-id]'))),
      r.length === 0)
    )
      throw new Error('No collection items found on this page to edit.');
    const o = Object.entries(i)
      .filter(([, T]) => T)
      .map(([T, D]) => ({ fieldId: parseInt(T, 10), value: D }));
    if (o.length === 0) throw new Error('No selections made in the panel to apply.');
    let b = 0;
    for (const T of r) {
      const D = parseInt(T.dataset.id || '', 10);
      if (D)
        for (const M of o) {
          const R = {
            operationName: 'EditCollectionItemNote',
            variables: {
              input: { discogsItemId: D, discogsNoteTypeId: M.fieldId, noteText: M.value },
            },
            extensions: { persistedQuery: { version: 1, sha256Hash: Ty } },
          };
          await new Promise((g) => {
            GM_xmlhttpRequest({
              method: 'POST',
              url: 'https://www.discogs.com/service/catalog/api/graphql',
              headers: { 'Content-Type': 'application/json' },
              data: JSON.stringify(R),
              onload: (x) => {
                x.status === 200 && (JSON.parse(x.responseText).errors || b++), setTimeout(g, 200);
              },
              onerror: () => setTimeout(g, 200),
            });
          });
        }
    }
    return `Finished: Successfully updated ${b} fields across ${r.length} items.`;
  }
  let Ts;
  function gi(i, f = 'error', r = 5e3) {
    const o = document.getElementById('dhp-status-area');
    o &&
      (window.clearTimeout(Ts),
      (o.innerText = i),
      (o.style.display = 'block'),
      (o.style.color = f === 'success' ? '#28a745' : f === 'info' ? '#17a2b8' : '#dc3545'),
      r > 0 &&
        (Ts = window.setTimeout(() => {
          o.style.display = 'none';
        }, r)));
  }
  const As = (i, f = document) => Array.from(f.querySelectorAll(i)),
    _y = { textAlign: 'center' },
    Cy = { color: '#ffc107', fontSize: '12px' },
    Dy = {
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: '5px',
      borderRadius: '3px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
    Ry = { border: 'none', borderTop: '1px solid rgb(80, 80, 80)', margin: '25px 0 15px 0' },
    Uy = { margin: '0 0 10px 0', fontSize: '14px', color: 'white', textAlign: 'center' },
    xy = { display: 'flex', flexDirection: 'column', gap: '10px' },
    Hy = { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', color: 'white' },
    Ny = {
      padding: '6px',
      borderRadius: '4px',
      border: '1px solid #555',
      backgroundColor: 'rgb(80, 80, 80)',
      color: 'white',
      fontFamily: 'inherit',
      width: '100%',
    },
    qy = {
      marginTop: '15px',
      padding: '10px',
      backgroundColor: '#00c700',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      width: '100%',
    };
  function jy() {
    const [i, f] = lt.useState(() => GM_getValue(ps, {})),
      { data: r, isLoading: o, error: b } = by({ queryKey: ['customFields'], queryFn: zy }),
      { mutate: T, isPending: D } = Ey({
        mutationFn: My,
        onSuccess: (U) => {
          gi(U, 'success', 0), setTimeout(() => location.reload(), 1500);
        },
        onError: (U) => {
          gi(U.message, 'error'), console.error('Bulk edit mutation failed', U);
        },
      }),
      M = () => {
        GM_setValue(ps, i), T(i);
      },
      R = (U, q) => {
        f((ft) => ({ ...ft, [U]: q === '' ? null : q }));
      };
    if (o) return G.jsx('div', { style: _y, children: 'Loading...' });
    if (b)
      return G.jsxs('div', {
        style: Cy,
        children: [
          G.jsx('p', { style: { fontWeight: 'bold' }, children: 'Authentication Failed' }),
          G.jsxs('p', { children: ['Status: ', b.message] }),
          G.jsx('pre', { style: Dy, children: b.message }),
        ],
      });
    const g = { ...qy, cursor: D ? 'not-allowed' : 'pointer', opacity: D ? '0.7' : '1' },
      x = r?.fields.filter((U) => U.type === 'dropdown') || [];
    return G.jsxs('div', {
      id: 'bulk-edit-section',
      children: [
        G.jsx('hr', { style: Ry }),
        G.jsx('h4', { style: Uy, children: 'Bulk edit' }),
        G.jsx('div', {
          style: xy,
          children: x.map((U) =>
            G.jsxs(
              'div',
              {
                children: [
                  G.jsx('label', { htmlFor: `dhp-field-${U.id}`, style: Hy, children: U.name }),
                  G.jsxs('select', {
                    id: `dhp-field-${U.id}`,
                    style: Ny,
                    value: i[U.id] || '',
                    onChange: (q) => R(U.id, q.target.value),
                    children: [
                      G.jsx('option', { value: '', children: '-- No change --' }),
                      U.options?.map((q) => G.jsx('option', { value: q, children: q }, q)),
                    ],
                  }),
                ],
              },
              U.id,
            ),
          ),
        }),
        G.jsx('button', {
          onClick: M,
          disabled: D,
          style: g,
          onMouseEnter: (U) => {
            D || (U.currentTarget.style.backgroundColor = '#00a300');
          },
          onMouseLeave: (U) => {
            D || (U.currentTarget.style.backgroundColor = '#00c700');
          },
          children: D ? 'Applying...' : 'Apply Selections',
        }),
      ],
    });
  }
  const Qy = { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' },
    By = {
      padding: '10px',
      backgroundColor: 'rgb(25, 118, 210)',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      width: '100%',
    };
  function Gy() {
    const [i, f] = lt.useState(!1),
      r = () => {
        f((o) => !o);
      };
    return (
      lt.useEffect(() => {
        document
          .querySelectorAll('tr:not(:has([class*=collection_], [class*=wantlist_]))')
          .forEach((b) => {
            const T = b;
            i ? T.classList.add('hidden') : T.classList.remove('hidden');
          });
      }, [i]),
      G.jsx('div', {
        style: Qy,
        children: G.jsxs('button', {
          onClick: r,
          style: By,
          onMouseEnter: (o) => (o.currentTarget.style.backgroundColor = 'rgb(20, 90, 180)'),
          onMouseLeave: (o) => (o.currentTarget.style.backgroundColor = 'rgb(25, 118, 210)'),
          children: [G.jsx('span', { dangerouslySetInnerHTML: { __html: Ay } }), ' In collection'],
        }),
      })
    );
  }
  const Yy = (i) => {
      const f = i.href.match(/(\/\/(master|release)\/(\d+))/);
      return f ? f[3] : null;
    },
    Ly = (i) => {
      const f = As('td.artist_title a', i);
      return {
        artist: f[0]?.textContent || '',
        title: f[1]?.textContent || '',
        id: f[1] ? Yy(f[1]) : null,
        rel: i,
      };
    },
    Xy = (i, f, r) =>
      r.slice(0, f).some((o) => {
        const b = i.artist.toLowerCase() === o.artist.toLowerCase(),
          T = i.title.toLowerCase() === o.title.toLowerCase();
        return b && T;
      }),
    Zy = { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' },
    Vy = {
      padding: '10px',
      backgroundColor: 'rgb(255, 159, 0)',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      width: '100%',
    };
  function Ky() {
    const [i, f] = lt.useState(!1),
      r = () => {
        f((o) => !o);
      };
    return (
      lt.useEffect(() => {
        const o = As('tr[class*=wantlist]'),
          b = (M) => {
            M.classList.add('hidden');
          },
          T = (M) => {
            M.classList.remove('hidden');
          },
          D = o.map(Ly);
        i
          ? D.forEach((M, R, g) => {
              Xy(M, R, g) ? b(M.rel) : T(M.rel);
            })
          : o.forEach(T);
      }, [i]),
      G.jsx('div', {
        style: Zy,
        children: G.jsx('button', {
          onClick: r,
          style: Vy,
          onMouseEnter: (o) => (o.currentTarget.style.backgroundColor = 'rgb(220, 130, 0)'),
          onMouseLeave: (o) => (o.currentTarget.style.backgroundColor = 'rgb(255, 159, 0)'),
          children: '⏷︎ Unique items',
        }),
      })
    );
  }
  function wy({ onEmptyStateChange: i }) {
    const f = /^\/user\/[^/]+\/collection/.test(window.location.pathname),
      r = window.location.pathname.startsWith('/artist'),
      o = window.location.pathname.startsWith('/mywantlist'),
      b = f || r || o;
    return (
      lt.useEffect(() => {
        i(!b);
      }, [b, i]),
      G.jsxs(G.Fragment, { children: [f && G.jsx(jy, {}), r && G.jsx(Gy, {}), o && G.jsx(Ky, {})] })
    );
  }
  const Os = () => {
    const i = GM_getValue(vi, bs);
    document.querySelectorAll('a[href*="/label/"]').forEach((r) => {
      const o = r,
        b = o.textContent?.trim() || '';
      (o.style.backgroundColor = ''),
        (o.style.color = ''),
        (o.style.padding = ''),
        (o.style.borderRadius = ''),
        (o.style.boxShadow = '');
      let T;
      for (const D in i)
        if (i[D].some((M) => M.toLowerCase() === b.toLowerCase())) {
          T = D;
          break;
        }
      if (T) {
        const D = Es[T];
        (o.style.backgroundColor = D),
          T === 'good' || T === 'fair' ? (o.style.color = 'black') : (o.style.color = 'white'),
          (o.style.padding = '2px 4px'),
          (o.style.borderRadius = '3px'),
          (o.style.boxShadow = '2px 2px 2px #aaaaaa');
      }
    });
  };
  function Jy() {
    return (
      lt.useEffect(() => {
        Os();
        const i = new MutationObserver(Os);
        return (
          i.observe(document.body, { childList: !0, subtree: !0 }),
          () => {
            i.disconnect(),
              document.querySelectorAll('a[href*="/label/"]').forEach((f) => {
                const r = f;
                (r.style.backgroundColor = ''),
                  (r.style.color = ''),
                  (r.style.padding = ''),
                  (r.style.borderRadius = '');
              });
          }
        );
      }, []),
      null
    );
  }
  const Fy = { padding: '10px', color: 'white' },
    Wy = { marginTop: '0', textAlign: 'center' },
    ky = { marginBottom: '15px' },
    $y = {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '5px',
      marginBottom: '10px',
    },
    Iy = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '5px',
      borderRadius: '3px',
      fontSize: '12px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    Py = {
      marginLeft: '5px',
      color: 'red',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '12px',
      padding: '0',
    },
    t0 = {
      width: 'calc(100% - 60px)',
      padding: '5px',
      marginRight: '5px',
      border: '1px solid #555',
      backgroundColor: 'rgb(80, 80, 80)',
      color: 'white',
      borderRadius: '3px',
    },
    e0 = {
      padding: '5px 10px',
      backgroundColor: '#00c700',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '12px',
    },
    l0 = {
      display: 'block',
      width: '100%',
      padding: '10px',
      marginTop: '10px',
      backgroundColor: '#00c700',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    };
  function a0({ onSaveSuccess: i }) {
    const [f, r] = lt.useState(() => GM_getValue(vi, bs)),
      [o, b] = lt.useState({ poor: '', fair: '', good: '', veryGood: '' }),
      T = (g, x) => {
        r((U) => ({ ...U, [g]: U[g].filter((q) => q !== x) }));
      },
      D = (g) => {
        const x = o[g].trim();
        x &&
          !f[g].includes(x) &&
          (r((U) => ({ ...U, [g]: [...U[g], x] })), b((U) => ({ ...U, [g]: '' })));
      },
      M = (g, x) => {
        b((U) => ({ ...U, [g]: x }));
      },
      R = () => {
        GM_setValue(vi, f), i();
      };
    return G.jsxs('div', {
      style: Fy,
      children: [
        G.jsx('h4', { style: Wy, children: 'Customize Highlighted Labels' }),
        Object.keys(f).map((g) =>
          G.jsxs(
            'div',
            {
              style: ky,
              children: [
                G.jsx('h5', { children: g.charAt(0).toUpperCase() + g.slice(1) }),
                G.jsx('div', {
                  style: $y,
                  children: f[g].map((x) => {
                    const U = Es[g],
                      q = g === 'good' || g === 'fair' ? 'black' : 'white';
                    return G.jsxs(
                      'span',
                      {
                        style: { ...Iy, backgroundColor: U, color: q },
                        children: [
                          G.jsx('span', { children: x }),
                          G.jsx('button', { style: Py, onClick: () => T(g, x), children: '✖' }),
                        ],
                      },
                      x,
                    );
                  }),
                }),
                G.jsxs('div', {
                  style: { marginTop: '10px', display: 'flex', alignItems: 'center' },
                  children: [
                    G.jsx('input', {
                      type: 'text',
                      style: t0,
                      value: o[g],
                      onChange: (x) => M(g, x.target.value),
                      placeholder: 'Add new label',
                    }),
                    G.jsx('button', { style: e0, onClick: () => D(g), children: 'Add' }),
                  ],
                }),
              ],
            },
            g,
          ),
        ),
        G.jsx('button', { style: l0, onClick: R, children: 'Save' }),
      ],
    });
  }
  function u0({ onLogin: i }) {
    const [f, r] = lt.useState(''),
      o = (M) => {
        M.preventDefault(), f && (GM_setValue(Hu, f), i());
      },
      b = { display: 'flex', flexDirection: 'column', marginBottom: '15px', gap: '5px' },
      T = {
        flex: '1',
        padding: '6px',
        borderRadius: '4px',
        border: '1px solid #555',
        backgroundColor: 'rgb(80, 80, 80)',
        color: 'white',
      },
      D = {
        padding: '6px 10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#00c700',
        color: 'white',
        cursor: 'pointer',
      };
    return G.jsxs('div', {
      children: [
        G.jsx('h3', { children: 'Please enter your Discogs API token' }),
        G.jsxs('form', {
          onSubmit: o,
          style: b,
          children: [
            G.jsx('input', {
              type: 'text',
              value: f,
              onChange: (M) => r(M.target.value),
              style: T,
            }),
            G.jsx('button', { type: 'submit', style: D, children: 'Save' }),
          ],
        }),
      ],
    });
  }
  const n0 = new cy();
  function i0() {
    const [i, f] = lt.useState(() => GM_getValue(gs, !0)),
      [r, o] = lt.useState(!1),
      [b, T] = lt.useState(!1),
      [D, M] = lt.useState(() => !!GM_getValue(Hu));
    lt.useEffect(() => {
      r && f(!1);
    }, [r]);
    const R = () => {
        M(!0);
      },
      g = (at) => {
        at.preventDefault(),
          GM_deleteValue(Hu),
          M(!1),
          gi('API Token cleared. Reloading page...', 'info', 0),
          setTimeout(() => window.location.reload(), 1500);
      },
      x = {
        position: 'fixed',
        top: '120px',
        right: '0px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        transition: 'transform 0.3s ease-in-out',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: 'white',
        transform: i ? 'translateX(0)' : 'translateX(calc(100% - 30px))',
      },
      U = {
        backgroundColor: 'rgb(51, 51, 51)',
        color: 'white',
        padding: '10px 0',
        width: '30px',
        textAlign: 'center',
        cursor: 'pointer',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        fontWeight: 'bold',
        userSelect: 'none',
        boxShadow: '-2px 2px 5px rgba(0,0,0,0.3)',
      },
      q = {
        position: 'relative',
        backgroundColor: 'rgb(51, 51, 51)',
        padding: '15px',
        border: '1px solid rgb(80, 80, 80)',
        borderRight: 'none',
        borderBottomLeftRadius: '8px',
        boxShadow: '-2px 2px 5px rgba(0,0,0,0.2)',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
      },
      ft = { margin: '0 0 15px 0', fontSize: '18px', textAlign: 'center', color: 'white' },
      tt = () => {
        f((at) => (GM_setValue(gs, !at), !at));
      };
    lt.useEffect(() => {
      const at = document.createElement('style');
      (at.innerHTML = '.hidden { display: none !important; }'), document.head.appendChild(at);
    }, []);
    const Z = () => {
      T(!1);
    };
    return G.jsxs(fy, {
      client: n0,
      children: [
        D && G.jsx(Jy, {}),
        G.jsxs('div', {
          id: 'dhp-container',
          style: x,
          children: [
            G.jsx('div', { style: U, onClick: tt, children: i ? '→' : '←' }),
            G.jsxs('div', {
              id: 'dhp-content-area',
              style: q,
              children: [
                G.jsxs('div', {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                  children: [
                    D &&
                      G.jsx('button', {
                        onClick: () => T(!0),
                        style: {
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '18px',
                        },
                        children: '⚙',
                      }),
                    G.jsx('h3', { style: ft, children: 'Discogs Panel' }),
                    D &&
                      G.jsx('a', {
                        href: '#',
                        onClick: g,
                        style: {
                          fontSize: '11px',
                          color: '#ccc',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          backgroundColor: 'transparent',
                          border: 'none',
                        },
                        children: 'Log out',
                      }),
                  ],
                }),
                G.jsx('div', {
                  id: 'dhp-status-area',
                  style: {
                    fontSize: '12px',
                    textAlign: 'center',
                    marginBottom: '10px',
                    display: 'none',
                    padding: '5px',
                    borderRadius: '4px',
                  },
                }),
                D
                  ? b
                    ? G.jsxs('div', {
                        children: [
                          G.jsx('button', {
                            onClick: () => T(!1),
                            style: {
                              background: 'none',
                              border: 'none',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '14px',
                              marginBottom: '10px',
                            },
                            children: '← Back',
                          }),
                          G.jsx(a0, { onSaveSuccess: Z }),
                        ],
                      })
                    : G.jsx(wy, { onEmptyStateChange: o })
                  : G.jsx(u0, { onLogin: R }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  const pi = document.createElement('div');
  (pi.id = 'discogs-helper-root'),
    document.body.appendChild(pi),
    Bd.createRoot(pi).render(G.jsx(i0, {}));
})();
