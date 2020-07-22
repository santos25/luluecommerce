import directoryTypes from './directory.types';

export const loadDirectory = (items) => {
    return {
        type: directoryTypes.LOAD_CATEGORY_CLOTHES,
        payload: items
    }
}

export const loadNewCollection = (items) => {
    return {
        type: directoryTypes.LOAD_NEW_COLLECTION,
        payload: items
    }
}