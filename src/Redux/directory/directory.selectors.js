import { createSelector } from 'reselect';

const directory = state => state.directory.DirectoryData;

export const categorySelector = createSelector(
    [directory],
    data => {
        if (data !== '') {
            console.log(data);
            return (
                Object.keys(data.prendas).map(prenda => ({
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
    [directory],
    items => items.newCollection
)
