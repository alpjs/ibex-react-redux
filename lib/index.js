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

/* global $document */

const logger = new _nightingale.ConsoleLogger('ibex.react-redux');

/**
 * @function
 * @param
*/function ibexReactRedux(_ref) {
    let appDescriptor = _ref.appDescriptor;
    let initialData = _ref.initialData;
    let element = _ref.element;

    return app => {
        app.context.render = /**
                              * @function
                              * @param appDescriptor
                              * @param data
                             */function (appDescriptor, data) {
            logger.debug('render view', { data });

            if (!appDescriptor.View) {
                throw new Error('View is undefined, class expected');
            }

            const context = Object.create(app.context);
            const store = (0, _redux.createStore)(appDescriptor.app, initialData);
            context.store = store;

            (0, _fody2.default)({
                context,
                View: appDescriptor.View,
                data,
                element,
                App: _fodyRedux2.default
            });
        };

        if (document.readyState === 'complete') {
            logger.debug('load react components, document is already ready');
            app.context.render(appDescriptor, initialData);
        } else {
            logger.debug('waiting document ready');
            $document.on('DOMContentLoaded', () => {
                logger.debug('load react components, document is ready');
                app.context.render(appDescriptor, initialData);
            });
        }
    };
}
//# sourceMappingURL=index.js.map