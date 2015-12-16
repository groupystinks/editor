const LOAD_GROUP = 'word/LOAD_GROUP';
const LOAD_GROUP_SUCCESS = 'word/LOAD_GROUP_SUCCESS';
const LOAD_GROUP_FAIL = 'word/LOAD_GROUP_FAIL';

const LOAD_THREAD = 'word/LOAD_THREAD';
const LOAD_THREAD_SUCCESS = 'word/LOAD_THREAD_SUCCESS';
const LOAD_THREAD_FAIL = 'word/LOAD_THREAD_FAIL';

const initalState = {
  groupLoaded: false,
  threadLoaded: false,
};

export default function word(state = initalState, action = {}) {
  switch (action.type) {
    case LOAD_GROUP:
      return {
        ...state,
        groupLoading: true
      };
    case LOAD_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        groupLoaded: true,
        groups: action.result
      };
    case LOAD_GROUP_FAIL:
      return {
        ...state,
        groupLoading: false,
        groupLoaded: false,
        error: action.error
      };
    case LOAD_THREAD:
      return {
        ...state,
        threadLoading: true
      };
    case LOAD_THREAD_SUCCESS:
      return {
        ...state,
        threadLoading: false,
        threadLoaded: true,
        threads: action.result
      };
    case LOAD_THREAD_FAIL:
      return {
        ...state,
        threadLoading: false,
        threadLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isGroupLoaded(globalState) {
  return globalState.word && globalState.word.groupLoaded;
}

export function loadGroup() {
  return {
    types: [LOAD_GROUP, LOAD_GROUP_SUCCESS, LOAD_GROUP_FAIL],
    promise: (client) => client.githubApi.get(''),
  };
}

export function loadThread(groupName) {
  return {
    types: [LOAD_THREAD, LOAD_THREAD_SUCCESS, LOAD_THREAD_FAIL],
    promise: (client) => client.githubApi.get(groupName),
  };
}
