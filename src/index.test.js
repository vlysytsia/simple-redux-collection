import reduxCollection from './index';

const name = 'name';
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
const initialState = { [item1.id]: item1 };
const { reducer, ACTIONS_TYPES, actionCreators } = reduxCollection({
  name,
  initialState,
});

describe('reduxCollection test', () => {
  describe('ACTIONS_TYPES test', () => {
    expect(ACTIONS_TYPES.ADD_ITEM).toBe(`@${name}/add_item`);

    expect(ACTIONS_TYPES.ADD_ITEMS).toBe(`@${name}/add_items`);

    expect(ACTIONS_TYPES.REMOVE_ITEM).toBe(`@${name}/remove_item`);

    expect(ACTIONS_TYPES.RESET).toBe(`@${name}/reset`);
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

    expect(actionCreators.removeItem(item1.id)).toEqual({
      type: ACTIONS_TYPES.REMOVE_ITEM,
      payload: item1.id,
    });

    expect(actionCreators.reset()).toEqual({
      type: ACTIONS_TYPES.RESET,
    });
  });

  describe('reducer test', () => {
    it('should return empty object for init without initalState', () => {
      const { reducer: defaultReducer } = reduxCollection(name);

      expect(defaultReducer()).toEqual({});
    });

    it('should handle addItem action', () => {
      expect(reducer()).toEqual(initialState);

      expect(reducer(initialState, actionCreators.addItem(item1))).toEqual(
        oneItemState,
      );

      expect(reducer(oneItemState, actionCreators.addItem(item2))).toEqual(
        twoItemsState,
      );
    });

    it('should handle removeItem action', () => {
      expect(
        reducer(twoItemsState, actionCreators.removeItem(item2.id)),
      ).toEqual(oneItemState);

      expect(
        reducer(oneItemState, actionCreators.removeItem(item1.id)),
      ).toEqual({});
    });

    it('should handle reset action', () => {
      expect(reducer(twoItemsState, actionCreators.reset())).toEqual(
        initialState,
      );

      expect(reducer(oneItemState, actionCreators.reset())).toEqual(
        initialState,
      );
    });

    it('should handle addItems action', () => {
      expect(
        reducer(initialState, actionCreators.addItems(oneItemState)),
      ).toEqual(oneItemState);

      expect(
        reducer(oneItemState, actionCreators.addItems({ [item2.id]: item2 })),
      ).toEqual(twoItemsState);
    });

    it('should handle updateItem action', () => {
      expect(
        reducer(
          initialState,
          actionCreators.updateItem({ id: 1, test: 'test value' }),
        ),
      ).toEqual({ [item1.id]: { ...item1, test: 'test value' } });
    });

    it('should handle action with custom key', () => {
      const key = 'uid';
      const state = {
        1: {
          uid: 1,
        },
      };
      const title = 'title';

      const {
        reducer: r,
        actionCreators: { updateItem },
      } = reduxCollection({
        name: 'comments',
        initialState: state,
        key,
      });

      expect(r(state, updateItem({ id: 1, title }))).toEqual(state);
      expect(r(state, updateItem({ uid: 1, title }))).toEqual({
        1: {
          uid: 1,
          title,
        },
      });
    });
  });
});
