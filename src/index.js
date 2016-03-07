import { ConsoleLogger } from 'nightingale';
import render from 'fody';
import DefaultApp from 'fody-app';
import ReduxApp from 'fody-redux-app';
import { createStore } from 'redux';

const logger = new ConsoleLogger('ibex.react-redux');

let store;

export default function ibexReactRedux({ moduleDescriptor, initialData, element }) {
    return (app) => {
        app.context.render = function (moduleDescriptor, data) {
            logger.debug('render view', { data });

            if (!moduleDescriptor.View) {
                throw new Error('View is undefined, class expected');
            }

            const reducer = moduleDescriptor.reducer;

            if (store === undefined) {
                if (reducer) {
                    store = createStore(reducer, initialData);
                }
            } else {
                // replace state
                const state = store.getState();
                Object.keys(state).forEach(key => delete state[key]);
                Object.assign(state, initialData);

                // replace reducer
                if (reducer) {
                    store.replaceReducer(reducer);
                } else {
                    store.replaceReducer((state, action) => state);
                }
            }

            if (reducer) {
                this.store = store;
            }

            render({
                context: this,
                View: moduleDescriptor.View,
                data,
                element,
                App: reducer ? ReduxApp : DefaultApp,
            });
        };

        const context = Object.create(app.context);
        if (document.readyState === 'complete') {
            logger.debug('load react components, document is already ready');
            context.render(moduleDescriptor, initialData);
        } else {
            logger.debug('waiting document ready');
            document.addEventListener('DOMContentLoaded', () => {
                logger.debug('load react components, document is ready');
                context.render(moduleDescriptor, initialData);
            });
        }
    };
}
