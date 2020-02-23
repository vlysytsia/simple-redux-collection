# simple-redux-collection - Redux helper for simple collection management
[![Codecov Coverage](https://img.shields.io/codecov/c/github/volodymyrl/simple-redux-collection/master.svg)](https://codecov.io/gh/volodymyrl/simple-redux-collection/)

## Motivation

We work with collections every day, and creating monotonous reducers and actions can be quite tedious. So I decided to create this helper to minimize code duplication.

## [Demo](https://codesandbox.io/s/simple-redux-collection-264my)

## Include redux actions for:
* set a new item
* set new items
* delete item
* reset collection to initial state

## Install
You can install simple-redux-collection with npm or yarn
```sh
$ npm i simple-redux-collection -s 
```
or 
```sh
yarn add simple-redux-collection
```
## Documentation
```js
import collectionReducer from "simple-redux-collection";
```

**collectionReducer({name, key, initialState})**

##### options
`name: String [required]` - reducer name, all actions types will be created in `@{name}/action_type` format

`initialState : Object [optional]` - reducer inital state (empty object by default)

Example of reducer state: 
```js
{
    uid1: {uid: 'uid1', title: 'title'},
    uid2: {uid: 'uid2', title: 'title 2'},
}
```


##### Return object **{ACTIONS_TYPES, actionCreators, reducer}**

`ACTIONS_TYPES: Object`  - all action type constants, can be used in middleware 

    SET_ITEM: @{name}/set_item,
    SET_ITEMS: @{name}/set_items,
    REMOVE_ITEM: @{name}/remove_item,
    RESET: @${name}/reset,



`actionCreators: Object` - object of [actions creators](https://redux.js.org/basics/actions#action-creators):

    setItem: ({key, value})

    setItems: ([{key, value}]), 

    removeItem: (id: String|Number)

    reset: ()


`reducer: (state: Object, action: Object) => state` - regular Redux [reducer](https://redux.js.org/basics/reducers) function


## Example
Let's create collection for list of comments

Reducer file:
```js
import createReducer from "simple-redux-collection";

const initialState = {
  id1: { id: "id1", title: "Commemt title", time: "30/11/2019, 22:21:29" }
};
const { reducer, actionCreators } = createReducer({name: "comments", initialState});

// reducer function should be added to a root reducer
export { reducer, actionCreators };
```

Container file:

```js
import { connect } from "react-redux";
import { actionCreators } from "./reducer";
import Comments from "./Comments";

const { setItem, setItems, removeItem, reset } = actionCreators;

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = {
  setItem, setItems, removeItem, reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
```

Now all actions and collection items can be used as props in the `Comments` component.


```js
import PropTypes from "prop-types";
import React, { useState } from "react";

const Comments = ({ comments, setItem, removeItem, reset }) => {
  const [inputValue, changeCommentText] = useState("");

  const addNewComment = () => {
    // id is required for creating new item
    const id = String(Math.random());
    setItem({
      key: id,
      value: {
        id,
        title: inputValue,
        time: new Date().toLocaleString()
      }
    });

    changeCommentText("");
  };

  return (
    <div>
      <input
        onChange={e => changeCommentText(e.target.value)}
        value={inputValue}
      />
      <button onClick={addNewComment}>Post new comment</button>
      <div>
        {/* you can use your selector in container to return data in required format */}
        {Object.values(comments).map(({ id, title, time }) => (
          <div key={id} className="item">
            <b>{title}</b> <i>Comment time: {time}</i>
            <button
              onClick={() =>
                // id use as the `key` in reducer and it's required for updating item
                setItem({
                  key: id,
                  value: { id, title, time: new Date().toLocaleString() }
                })
              }
            >
              Update comment time
            </button>
            <button className="delete" onClick={() => removeItem(id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  setItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Comments;
```


Check the full [code example](https://codesandbox.io/s/simple-redux-collection-264my)


