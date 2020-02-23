const reduxCollection = ({ name, initialState = {} }) => {
  const ACTIONS_TYPES = {
    SET_ITEM: `@${name}/set_item`,
    SET_ITEMS: `@${name}/set_items`,
    REMOVE_ITEM: `@${name}/remove_item`,
    RESET: `@${name}/reset`,
  };

  const actionCreators = {
    setItem: payload => ({ type: ACTIONS_TYPES.SET_ITEM, payload }),
    setItems: payload => ({ type: ACTIONS_TYPES.SET_ITEMS, payload }),
    removeItem: id => ({ type: ACTIONS_TYPES.REMOVE_ITEM, payload: id }),
    reset: () => ({ type: ACTIONS_TYPES.RESET }),
  };

  const reducer = (state = initialState, action = { type: '' }) => {
    switch (action.type) {
      case ACTIONS_TYPES.SET_ITEM:
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      case ACTIONS_TYPES.SET_ITEMS:
        return {
          ...state,
          ...action.payload,
        };
      case ACTIONS_TYPES.REMOVE_ITEM: {
        const { [action.payload]: deletedItem, ...rest } = state;
        return rest;
      }
      case ACTIONS_TYPES.RESET:
        return initialState;
      default:
        return state;
    }
  };

  return {
    ACTIONS_TYPES,
    actionCreators,
    reducer,
  };
};

export default reduxCollection;
