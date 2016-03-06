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

            var context = Object.create(app.context);
            if (store === undefined) {
                store = (0, _redux.createStore)(appDescriptor.app, initialData);
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
                    store.replaceReducer(appDescriptor.app);
                })();
            }
            context.store = store;

            (0, _fody2.default)({
                context: context,
                View: appDescriptor.View,
                data: data,
                element: element,
                App: _fodyRedux2.default
            });
        };

        if (document.readyState === 'complete') {
            logger.debug('load react components, document is already ready');
            app.context.render(appDescriptor, initialData);
        } else {
            logger.debug('waiting document ready');
            document.addEventListener('DOMContentLoaded', function () {
                logger.debug('load react components, document is ready');
                app.context.render(appDescriptor, initialData);
            });
        }
    };
}
//# sourceMappingURL=index.js.map