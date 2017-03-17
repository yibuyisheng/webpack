/**
 * @file room
 * @author yibuyisheng(yibuyisheng@163.com)
 */

import { camelCase, uniqBy, sortBy, mapKeys, map, extend, escape, flatten, includes } from 'lodash';
import moment from 'moment';
import constants from '../constants';
import { get } from '../util';

const room = constants.room;

export default {
    state: {
        messageList: []
    },
    mutations: {
        /* eslint-disable no-param-reassign */
        [room.ADD_MESSAGES_MUTATION](state, data) {
            state.messageList = messageList;
        },
        [room.CLEAR_MESSAGE_LIST_MUTATION](state) {
            state.messageList = [];
        }
        /* eslint-enable no-param-reassign */
    },
    actions: {
        [room.HISTORY_MESSAGE_LIST_ACTION]: get(
            '/historyMessageList',
            {
                pageSize: 30
            },
            ({ context }, data) => {
                context.commit(room.ADD_MESSAGES_MUTATION, data);
            }
        ),
        [room.NEW_MESSAGE_LIST_ACTION]: get(
            '/',
            {},
            ({ context }, data) => {
                context.commit(room.ADD_MESSAGES_MUTATION, data);
            }
        ),
        [room.SEND_MESSAGE_ACTION]: get(
            '/',
            {},
            ({ context }, data) => {
                context.commit(room.ADD_MESSAGES_MUTATION, [data]);
            }
        )
    },
    getters: {
        [room.MESSAGE_LIST_GETTER](state) {
            return state.messageList;
        }
    }
};
