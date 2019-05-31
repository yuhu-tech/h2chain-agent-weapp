module.exports = (function() {
  var __MODS__ = {};
  var __DEFINE__ = function(modId, func, req) {
    var m = {
      exports: {}
    };
    __MODS__[modId] = {
      status: 0,
      func: func,
      req: req,
      m: m
    };
  };
  var __REQUIRE__ = function(modId, source) {
    if (!__MODS__[modId]) return require(source);
    if (!__MODS__[modId].status) {
      var m = {
        exports: {}
      };
      __MODS__[modId].status = 1;
      __MODS__[modId].func(__MODS__[modId].req, m, m.exports);
      if (typeof m.exports === "object") {
        Object.keys(m.exports).forEach(function(k) {
          __MODS__[modId].m.exports[k] = m.exports[k];
        });
        if (m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", {
          value: true
        });
      } else {
        __MODS__[modId].m.exports = m.exports;
      }
    }
    return __MODS__[modId].m.exports;
  };
  var __REQUIRE_WILDCARD__ = function(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};
      if (obj != null) {
        for (var k in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k];
        }
      }
      newObj.default = obj;
      return newObj;
    }
  };
  var __REQUIRE_DEFAULT__ = function(obj) {
    return obj && obj.__esModule ? obj.default : obj;
  };
  __DEFINE__(1554946536254, function(require, module, exports) {
    var responseHandler = function(resolve, reject, res, errorHandler) {
      var retData = res.data.errors ? res.data.errors[0].message : {
        code: 200
      };
      if (res.statusCode == 200 && retData.code == 200) {
        resolve(res.data.data);
      } else {
        reject(res.data);
        if (errorHandler) {
          errorHandler(res.data);
        }
      }
    }

    var GraphQL = function(obj, retObj) {

      if (!obj.url) {
        throw "请提供GraphQL请求URL(.url)"
      }

      retObj = retObj || false;

      let header = undefined;

      if (typeof obj.header != 'function' && typeof obj.header != 'object') {
        throw 'header必须是function或者object'
      }

      if (retObj) {
        return {
          query: function(queryObj) {
            return new Promise(function(resolve, reject) {
              wx.showToast({
                title: '获取中',
                icon: 'loading',
                duration: 10000
              })
              wx.request({
                url: obj.url,
                method: 'POST',
                data: JSON.stringify({
                  query: queryObj.query,
                  variables: queryObj.variables
                }),
                header: queryObj.header || (typeof obj.header === 'function' ? obj.header() : obj.header),
                success: function(res) {
                  wx.hideToast()
                },
                complete: function(res) {
                  if (res.errMsg.indexOf('timeout') > -1) {
                    wx.showToast({
                      title: '请求超时',
                      icon: 'none'
                    })
                  }
                  responseHandler(resolve, reject, res, obj.errorHandler);
                }
              });
            });
          },

          mutate: function(mutateObj) {
            return new Promise(function(resolve, reject) {
              wx.showToast({
                title: '获取中',
                icon: 'loading',
                duration: 10000
              })
              wx.request({
                url: obj.url,
                method: 'POST',
                data: JSON.stringify({
                  query: mutateObj.mutation,
                  variables: mutateObj.variables
                }),
                header: mutateObj.header || (typeof obj.header === 'function' ? obj.header() : obj.header),
                success: function(res) {
                  wx.hideToast()
                },
                complete: function(res) {
                  if (res.errMsg.indexOf('timeout') > -1) {
                    wx.showToast({
                      title: '请求超时',
                      icon: 'none'
                    })
                  }
                  responseHandler(resolve, reject, res);
                }
              });
            });
          }
        }
      } else {
        return function(_obj) {

          if (!_obj.body) {
            throw "请提供GraphQL请求body"
          }

          return wx.request({
            url: obj.url,
            method: 'POST',
            data: JSON.stringify(_obj.body),
            success: _obj.success,
            fail: _obj.fail,
            header: _obj.header || (typeof obj.header === 'function' ? obj.header() : obj.header),
            complete: _obj.complete
          });
        }
      }
    }

    module.exports = {
      GraphQL: GraphQL
    }

  }, function(modId) {
    var map = {};
    return __REQUIRE__(map[modId], modId);
  })
  return __REQUIRE__(1554946536254);
})()
//# sourceMappingURL=index.js.map