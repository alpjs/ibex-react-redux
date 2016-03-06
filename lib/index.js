'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ibexReactRedux;

var _nightingale = require('nightingale');

var _fody = require('fody');

var _fody2 = _interopRequireDefault(_fody);

var _fodyRedux = require('fody-redux');

var _fodyRedux2 = _interopRequireDefault(_fodyRedux);

var _redux = require('redux');

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _nightingale.ConsoleLogger('ibex.react-redux');

var store = undefined;

/**
 * @function
 * @param
*/function ibexReactRedux(_ref) {
    var appDescriptor = _ref.appDescriptor;
    var initialData = _ref.initialData;
    var element = _ref.element;

    return function (app) {
        app.context.render = /**
                              * @function
                              * @param appDescriptor
                              * @param data
                             */function (appDescriptor, data) {
            logger.debug('render view', { data: data });

            if (!appDescriptor.View) {
                throw new Error('View is undefined, class expected');
            }

            var reducer = appDescriptor.reducer || appDescriptor.app;

            if (store === undefined) {
                if (appDescriptor.app) {
                    store = (0, _redux.createStore)(reducer, initialData);
                }
            } else {
                ( /**
                   * @function
                  */function () {
                    // replace state
                    var state = store.getState();
                    Object.keys(state).forEach(function (key) {
                        return delete state[key];
                    });
                    Object.assign(state, initialData);

                    // replace reducer
                    if (reducer) {
                        store.replaceReducer(reducer);
                    } else {
                        store.replaceReducer(function (state, action) {
                            return state;
                        });
                    }
                })();
            }

            if (reducer) {
                this.store = store;
            }

            (0, _fody2.default)({
                context: this,
                View: appDescriptor.View,
                data: data,
                element: element,
                App: _fodyRedux2.default
            });
        };

        var context = Object.create(app.context);
        if (document.readyState === 'complete') {
            logger.debug('load react components, document is already ready');
            context.render(appDescriptor, initialData);
        } else {
            logger.debug('waiting document ready');
            document.addEventListener('DOMContentLoaded', function () {
                logger.debug('load react components, document is ready');
                context.render(appDescriptor, initialData);
            });
        }
    };
}
//# sourceMappingURL=index.js.map