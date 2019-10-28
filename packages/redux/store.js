import { createStore } from 'redux';
import { reducer } from './reducers/reducer.js';

export const store = createStore(reducer);
