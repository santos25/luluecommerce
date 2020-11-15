export const addUniqueitemToList = (savedList, newItem) => {
  const itemExist = savedList.find((item) => item.name === newItem.name);

  if (itemExist) {
    return savedList;
  }

  return [...savedList, { ...newItem }];
};
