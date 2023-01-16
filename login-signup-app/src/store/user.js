const INITIAL_STATE = {
    isUser: false,
    reload: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_CONNECTED':
            return {
                ...state,
                isUser: action.isUser,
                userData:action.userData,
            }
        case 'RELOAD':
            return {
                ...state,
                reload: action.reload,
            }
        default:
            return state;
    }
};