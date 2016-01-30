# ibex-react-redux

```js
import Ibex from 'ibex';
import reactredux from 'ibex-react-redux';

const app = new Ibex();
reactredux({
    View: View,
    reducers: myApp,
    initialData: window.__INITIAL_STATE__,
    element: document.getElementById('app'),
})(app);
```

## debug

`DEBUG=ibex.react-redux`
