import CommonMark from 'helpers/commonmark.js/lib/';

const LOAD_GROUP = 'word/LOAD_GROUP';
const LOAD_GROUP_SUCCESS = 'word/LOAD_GROUP_SUCCESS';
const LOAD_GROUP_FAIL = 'word/LOAD_GROUP_FAIL';

const LOAD_THREAD = 'word/LOAD_THREAD';
const LOAD_THREAD_SUCCESS = 'word/LOAD_THREAD_SUCCESS';
const LOAD_THREAD_FAIL = 'word/LOAD_THREAD_FAIL';

const LOAD_PASSAGE = 'word/LOAD_PASSAGE';
const LOAD_PASSAGE_SUCCESS = 'word/LOAD_PASSAGE_SUCCESS';
const LOAD_PASSAGE_FAIL = 'word/LOAD_PASSAGE_FAIL';

const initalState = {
  groupLoaded: false,
  passageLoaded: false,
  threadLoaded: false,
  groups: [],
  passages: {},
  threads: [],
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
    case LOAD_PASSAGE:
      return {
        ...state,
        passageLoading: true
      };
    case LOAD_PASSAGE_SUCCESS:
      const parser = new CommonMark.Parser({preserveRaw: true});
      const markedAst = parser.parse(action.result);

      return {
        ...state,
        passageLoading: false,
        passageLoaded: true,
        passages: {
          content: markedAst
        }
      };
    case LOAD_PASSAGE_FAIL:
      return {
        ...state,
        passageLoading: false,
        passageLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isGroupLoaded(globalState) {
  return globalState.word && globalState.word.groupLoaded;
}

export function isThreadLoaded(globalState) {
  return globalState.word && globalState.word.threadLoaded;
}

/* githubapi deprecated, now use firebaseApi*/
// export function loadGroup() {
//   return {
//     types: [LOAD_GROUP, LOAD_GROUP_SUCCESS, LOAD_GROUP_FAIL],
//     promise: (client) => client.githubApi.get(''),
//   };
// }

export function loadGroup() {
  return {
    types: [LOAD_GROUP, LOAD_GROUP_SUCCESS, LOAD_GROUP_FAIL],
    promise: (client) => client.firebaseApi.get('groups'),
  };
}

/* githubapi deprecated, now use firebaseApi*/
// export function loadThread(groupName) {
//   return {
//     types: [LOAD_THREAD, LOAD_THREAD_SUCCESS, LOAD_THREAD_FAIL],
//     promise: (client) => client.githubApi.get(groupName),
//   };
// }

export function loadThread(groupID) {
  return {
    types: [LOAD_THREAD, LOAD_THREAD_SUCCESS, LOAD_THREAD_FAIL],
    promise: (client) => client.firebaseApi.get('threads/' + groupID + '/threadList'),
  };
}

/* githubapi deprecated, now use firebaseApi*/
// export function loadPassage(completeURL) {
//   return {
//     types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
//     promise: (client) => client.firebaseApi.get(completeURL, {
//       options: {
//         isCompleteURL: true
//       }
//     }),
//   };
// }

export function loadPassage(ids) {
  return {
    types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
    promise: (client) => client.firebaseApi.get(`passages/${ids.groupID}/${ids.threadID}`),
  };
}

/* githubapi deprecated, now use firebaseApi*/
// export function initPassage(ids) {
//   // for github
//   const completeURL = 'https://raw.githubusercontent.com/groupystinks/skrik-view/master/data/'
//     + ids.groupID + '/' + ids.threadID;
//   return {
//     types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
//     promise: (client) => client.githubApi.get(completeURL, {
//       options: {
//         isCompleteURL: true
//       }
//     }),
//   };
// }

export function initPassage(ids) {
  return {
    types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
    promise: (client) => client.firebaseApi.get(`passages/${ids.groupID}/${ids.threadID}`),
  };
}
