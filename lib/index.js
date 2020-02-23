"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const reduxCollection = ({
  name,
  initialState = {}
}) => {
  const ACTIONS_TYPES = {
    SET_ITEM: `@${name}/set_item`,
    SET_ITEMS: `@${name}/set_items`,
    REMOVE_ITEM: `@${name}/remove_item`,
    RESET: `@${name}/reset`
  };
  const actionCreators = {
    setItem: payload => ({
      type: ACTIONS_TYPES.SET_ITEM,
      payload
    }),
    setItems: payload => ({
      type: ACTIONS_TYPES.SET_ITEMS,
      payload
    }),
    removeItem: id => ({
      type: ACTIONS_TYPES.REMOVE_ITEM,
      payload: id
    }),
    reset: () => ({
      type: ACTIONS_TYPES.RESET
    })
  };

  const reducer = (state = initialState, action = {
    type: ''
  }) => {
    switch (action.type) {
      case ACTIONS_TYPES.SET_ITEM:
        return _objectSpread({}, state, {
          [action.payload.key]: action.payload.value
        });

      case ACTIONS_TYPES.SET_ITEMS:
        return _objectSpread({}, state, {}, action.payload);

      case ACTIONS_TYPES.REMOVE_ITEM:
        {
          const _action$payload = action.payload,
                {
            [_action$payload]: deletedItem
          } = state,
                rest = _objectWithoutProperties(state, [_action$payload].map(_toPropertyKey));

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
    reducer
  };
};

var _default = reduxCollection;
exports.default = _default;