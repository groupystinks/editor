import {createSelector} from 'reselect';

export const groupsListSelector = state => state.word.groups;
export const threadsListSelector = state => state.word.threads;
export const passageContentSelector = state => state.word.passages.content;

export const selectedGroupIDSelector = state => state.router.params.groupID;
export const selectedThreadIDSelector = state => state.router.params.threadID;

export const passageDownloadURLSelector = createSelector(
  threadsListSelector,
  selectedThreadIDSelector,
  (threadsList = [], selectedThreadID) => {
    const downloadTarget = threadsList
      .filter((thread) => thread.name === selectedThreadID)
      .pop();
    return downloadTarget ? downloadTarget.download_url : '';
  }
);
