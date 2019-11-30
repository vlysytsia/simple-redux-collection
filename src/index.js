const reduxCollection = ({ name, key = 'id', initialState = {} }) => {
  const ACTIONS_TYPES = {
    ADD_ITEM: `@${name}/add_item`,
    UPDATE_ITEM: `@${name}/updtae_item`,
    ADD_ITEMS: `@${name}/add_items`,
    REMOVE_ITEM: `@${name}/remove_item`,
    RESET: `@${name}/reset`,
  };

  const actionCreators = {
    addItem: item => ({ type: ACTIONS_TYPES.ADD_ITEM, payload: item }),
    updateItem: item => ({ type: ACTIONS_TYPES.UPDATE_ITEM, payload: item }),
    addItems: items => ({ type: ACTIONS_TYPES.ADD_ITEMS, payload: items }),
    removeItem: id => ({ type: ACTIONS_TYPES.REMOVE_ITEM, payload: id }),
    reset: () => ({ type: ACTIONS_TYPES.RESET }),
  };

  const reducer = (state = initialState, action = { type: '' }) => {
    switch (action.type) {
      case ACTIONS_TYPES.ADD_ITEM:
        return {
          ...state,
          [action.payload[key]]: action.payload,
        };
      case ACTIONS_TYPES.UPDATE_ITEM: {
        if (action.payload[key]) {
          return {
            ...state,
            [action.payload[key]]: {
              ...state[action.payload[key]],
              ...action.payload,
            },
          };
        }

        return state;
      }
      case ACTIONS_TYPES.ADD_ITEMS:
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
