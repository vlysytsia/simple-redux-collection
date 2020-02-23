import reduxCollection from './index';

const name = 'name';
const key1 = 'key1';
const key2 = 'key2';
const value1 = 'value1';
const value2 = 'value2';
const action1 = { key: key1, value: value1 };
const action2 = { key: key2, value: value2 };
const item1 = { [key1]: value1 };
const item2 = { [key2]: value2 };

const initialState = {};
const { reducer, ACTIONS_TYPES, actionCreators } = reduxCollection({
  name,
  initialState,
});

describe('reduxCollection test', () => {
  describe('ACTIONS_TYPES test', () => {
    it('should represent correct action types', () => {
      expect(ACTIONS_TYPES.SET_ITEM).toBe(`@${name}/set_item`);
      expect(ACTIONS_TYPES.SET_ITEMS).toBe(`@${name}/set_items`);
      expect(ACTIONS_TYPES.REMOVE_ITEM).toBe(`@${name}/remove_item`);
      expect(ACTIONS_TYPES.RESET).toBe(`@${name}/reset`);
    });
  });

  describe('actions creators test', () => {
    it('should represent setItem action creator', () => {
      expect(actionCreators.setItem(action1)).toEqual({
        type: ACTIONS_TYPES.SET_ITEM,
        payload: action1,
      });
    });

    it('should represent removeItem action creator', () => {
      expect(actionCreators.removeItem(key1)).toEqual({
        type: ACTIONS_TYPES.REMOVE_ITEM,
        payload: key1,
      });
    });

    it('should represent reset action creator', () => {
      expect(actionCreators.reset()).toEqual({
        type: ACTIONS_TYPES.RESET,
      });
    });

    it('should represent reset action creator', () => {
      expect(actionCreators.setItems([action1, action2])).toEqual({
        type: ACTIONS_TYPES.SET_ITEMS,
        payload: [action1, action2],
      });
    });
  });

  describe('reducer test', () => {
    it('should return empty object for init without initialState', () => {
      const { reducer: defaultReducer } = reduxCollection(name);

      expect(defaultReducer()).toEqual({});
    });

    it('should handle setItem action', () => {
      expect(reducer()).toEqual(initialState);

      expect(reducer(initialState, actionCreators.setItem(action1))).toEqual({
        ...initialState,
        ...item1,
      });

      expect(
        reducer({ key1: value1 }, actionCreators.setItem(action2)),
      ).toEqual({
        ...item1,
        ...item2,
      });
    });

    it('should handle removeItem action', () => {
      expect(
        reducer(
          {
            ...item1,
            ...item2,
          },
          actionCreators.removeItem(key1),
        ),
      ).toEqual(item2);

      expect(reducer(item1, actionCreators.removeItem(key1))).toEqual({});
    });

    it('should handle reset action', () => {
      expect(
        reducer(
          {
            ...item1,
            ...item2,
          },
          actionCreators.reset(),
        ),
      ).toEqual(initialState);

      expect(
        reducer(
          {
            ...item1,
          },
          actionCreators.reset(),
        ),
      ).toEqual(initialState);
    });

    it('should handle setItems action', () => {
      const state = { testKey: 'testValue' };
      expect(
        reducer(
          state,
          actionCreators.setItems({
            ...item1,
            ...item2,
          }),
        ),
      ).toEqual({
        ...state,
        ...item1,
        ...item2,
      });
    });
  });
});
