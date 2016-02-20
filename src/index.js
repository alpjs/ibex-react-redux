import { ConsoleLogger } from 'nightingale';
import render from 'fody';
import App from 'fody-redux';
import { createStore } from 'redux';

const logger = new ConsoleLogger('ibex.react-redux');

export default function ibexReactRedux({ appDescriptor, initialData, element }) {
    return (app) => {
        app.context.render = function (appDescriptor, data) {
            logger.debug('render view', { data });

            if (!appDescriptor.View) {
                throw new Error('View is undefined, class expected');
            }

            const context = Object.create(app.context);
            const store = createStore(appDescriptor.app, initialData);
            context.store = store;

            render({
                context,
                View: appDescriptor.View,
                data,
                element,
                App,
            });
        };

        if (document.readyState === 'complete') {
            logger.debug('load react components, document is already ready');
            app.context.render(appDescriptor, initialData);
        } else {
            logger.debug('waiting document ready');
            document.addEventListener('DOMContentLoaded', () => {
                logger.debug('load react components, document is ready');
                app.context.render(appDescriptor, initialData);
            });
        }
    };
}
