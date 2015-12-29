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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global $document */

var logger = new _nightingale.ConsoleLogger('ibex.react');

function ibexReactRedux(_ref) {
    var View = _ref.View;
    var reducers = _ref.reducers;
    var initialData = _ref.initialData;
    var element = _ref.element;

    return function (app) {
        app.context.render = function (View, data) {
            logger.debug('render view', { viewName: View.name, data: data });

            if (!View) {
                throw new Error('View is undefined, class expected');
            }

            throw new Error('TODO');
        };

        var context = Object.create(app.context); // initial context.
        var store = (0, _redux.createStore)(reducers, initialData);
        context.store = store;

        if (document.readyState === 'complete') {
            logger.debug('load react components, document is already ready');
            (0, _fody2.default)({
                context: context,
                Component: View,
                data: initialData,
                element: element,
                App: _fodyRedux2.default
            });
        } else {
            logger.debug('waiting document ready');
            $document.on('DOMContentLoaded', function () {
                logger.debug('load react components, document is ready');
                (0, _fody2.default)({
                    context: context,
                    Component: View,
                    data: initialData,
                    element: element,
                    App: _fodyRedux2.default
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map