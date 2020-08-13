import { createSelector } from 'reselect';

const directory = state => state.directory.DirectoryData;
const newcollection = state => state.directory.newCollection;

export const categorySelector = createSelector(
    [directory],
    data => {
        if (data !== '') {
            console.log(data);
            return (
                Object.keys(data.prendas).filter( (key, i) => i < 4).map(prenda => ({
                    id: data.name.toLowerCase(),
                    name: data.prendas[prenda].name,
                    image: data.prendas[prenda].image
                }))
            )
        }
        return null;
    }
)

export const newCollectionSelector = createSelector(
    [newcollection],
    collection => collection
)

export const landscapeImageSelector = createSelector(
    [directory],
    directory => directory.landscape
)