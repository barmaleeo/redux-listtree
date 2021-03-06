import React from 'react';
import 'babel-polyfill'
import configureStore from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import './index.css';

import * as serviceWorker from './serviceWorker';

import DevTools from "./DevTools";

import App from "./App";

const root = document.getElementById('root');

window.$ = {};

window.$.get = (path, params, callback, format) => {

    if(path === 'example/edit') {
        const response = {
            status: 'ok',
            items: [
                {id: 0, name: 'Client 1'},
                {id: 1, name: 'Client 2'},
                {id: 2, name: 'Client 3'},
                {id: 3, name: 'Client 4'},
                {id: 4, name: 'Client 5'},
            ]
        };
        if(typeof callback === "function"){
            setTimeout(() => {callback(response)}, 1000)
        }
    }else if(path === 'office/get-countries-detail'){

        const response = {
            status: 'ok',
            id: 0,
            name: 'Client 1',
            detailed:'Detailed client info'
        };

        if(typeof callback === "function"){
            setTimeout(() => {callback(response)}, 1000)
        }

    }else{

        return {fail:(callback) => {

            if(typeof callback === "function"){
                callback(new Error('Not found!'))
            }
        }, always:(callback) => {callback()}}

    }
    return {fail:(callback) => {}, always:(callback) => {callback()}}
};

const store = configureStore();

console.log('ListTree Development');

render(
    <Provider store={store}>
        <div id="provider-root">
            <DevTools/>
            <App/>
        </div>
    </Provider>,
    root
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
