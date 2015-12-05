const LOAD_GROUP = 'word/LOAD_GROUP';
const LOAD_GROUP_SUCCESS = 'word/LOAD_GROUP_SUCCESS';
const LOAD_GROUP_FAIL = 'word/LOAD_GROUP_FAIL';

const initalState = {
  groupLoaded: false
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
        groupData: action.result
      };
    case LOAD_GROUP_FAIL:
      return {
        ...state,
        groupLoading: false,
        groupLoaded: false,
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
