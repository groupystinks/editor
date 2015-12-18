// import {createSelector} from 'reselect';

export const groupsListSelector = state => state.word.groups;

export const selectedGroupIDSelector = state => state.router.params.groupID;
export const selectedThreadIDSelector = state => state.router.params.threadID;
