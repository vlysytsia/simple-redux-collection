import reduxCollection from './index';

const reducerName = 'name';
const item1 = {
  id: 1,
  title: 'item 1',
};
const item2 = {
  id: 2,
  title: 'item 2',
};
const oneItemState = {
  [item1.id]: item1,
};
const twoItemsState = {
  [item1.id]: item1,
  [item2.id]: item2,
};
const initState = { [item1.id]: item1 };
const { reducer, ACTIONS_TYPES, actionCreators } = reduxCollection(
  reducerName,
  initState,
);

describe('reduxCollection test', () => {
  describe('ACTIONS_TYPES test', () => {
    expect(ACTIONS_TYPES.ADD_ITEM).toBe(`@${reducerName}/add_item`);

    expect(ACTIONS_TYPES.ADD_ITEMS).toBe(`@${reducerName}/add_items`);

    expect(ACTIONS_TYPES.REMOVE_ITEM).toBe(`@${reducerName}/remove_item`);

    expect(ACTIONS_TYPES.RESET).toBe(`@${reducerName}/reset`);
  });

  describe('actions creators test', () => {
    expect(actionCreators.addItem(item1)).toEqual({
      type: ACTIONS_TYPES.ADD_ITEM,
      payload: item1,
    });

    expect(actionCreators.addItems({ id: item1 })).toEqual({
      type: ACTIONS_TYPES.ADD_ITEMS,
      payload: { id: item1 },
    });

    expect(actionCreators.removeItemById(item1.id)).toEqual({
      type: ACTIONS_TYPES.REMOVE_ITEM,
      payload: item1.id,
    });

    expect(actionCreators.reset()).toEqual({
      type: ACTIONS_TYPES.RESET,
    });
  });

  describe('reducer test', () => {
    it('should return empty object for init without initalState', () => {
      const { reducer: defaultReducer } = reduxCollection(reducerName);

      expect(defaultReducer()).toEqual({});
    });

    it('should handle addItem action', () => {
      expect(reducer()).toEqual(initState);

      expect(reducer(initState, actionCreators.addItem(item1))).toEqual(
        oneItemState,
      );

      expect(reducer(oneItemState, actionCreators.addItem(item2))).toEqual(
        twoItemsState,
      );
    });

    it('should handle removeItemById action', () => {
      expect(
        reducer(twoItemsState, actionCreators.removeItemById(item2.id)),
      ).toEqual(oneItemState);

      expect(
        reducer(oneItemState, actionCreators.removeItemById(item1.id)),
      ).toEqual({});
    });

    it('should handle reset action', () => {
      expect(reducer(twoItemsState, actionCreators.reset())).toEqual(initState);

      expect(reducer(oneItemState, actionCreators.reset())).toEqual(initState);
    });

    it('should handle addItems action', () => {
      expect(reducer(initState, actionCreators.addItems(oneItemState))).toEqual(
        oneItemState,
      );

      expect(
        reducer(oneItemState, actionCreators.addItems({ [item2.id]: item2 })),
      ).toEqual(twoItemsState);
    });

    it('should handle updateItem action', () => {
      expect(
        reducer(
          initState,
          actionCreators.updateItem({ id: 1, test: 'test value' }),
        ),
      ).toEqual({ [item1.id]: { ...item1, test: 'test value' } });
    });
  });
});
