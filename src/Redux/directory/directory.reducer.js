import directoryTypes from './directory.types';

const INITIAL_STATE = {
    DirectoryData: '',
    newCollection: []
}

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case directoryTypes.LOAD_CATEGORY_CLOTHES:
            return {
                ...state,
                DirectoryData: action.payload
            }
        case directoryTypes.LOAD_NEW_COLLECTION:
            return {
                ...state,
                newCollection: action.payload
            }
        default:
            return state
    }
}

export default directoryReducer;