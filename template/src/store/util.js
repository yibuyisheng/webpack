/**
 * @file util
 * @author yibuyisheng(yibuyisheng@163.com)
 */

import request from 'superagent';
import Promise from 'bluebird';
import { partial, extend } from 'lodash';

function handleResponse(commit, resolve, reject, err, res) {
    commit('requestEnd');
    if (err) {
        commit('error', err);
        reject(err);
    } else {
        let data;
        try {
            data = JSON.parse(res.text);

            if (data.code === 0) {
                resolve(data.data || data.result);
            } else if (data.message && data.message.global) {
                commit('globalMessage', data.message.global);
            } else if (data.message && data.message.redirect) {
                commit('redirect', data.message.redirect);
            }
        } catch (error) {
            commit('error', error);
            reject(error);
        }
    }
}

export function post(url, params, callback) {
    return function fetch(context, extraParams) {
        return new Promise((resolve, reject) => {
            context.commit('requestStart');
            request.post(url).send(extend({}, params, extraParams))
                .end(partial(handleResponse, context.commit, resolve, reject));
        }).then(partial(callback, { context, url, params, extraParams }));
    };
}

export function get(url, params, callback) {
    return function fetch(context, extraParams) {
        return new Promise((resolve, reject) => {
            context.commit('requestStart');
            request.get(url).query(extend({}, params, extraParams))
                .end(partial(handleResponse, context.commit, resolve, reject));
        }).then(partial(callback, { context, url, params, extraParams }));
    };
}
