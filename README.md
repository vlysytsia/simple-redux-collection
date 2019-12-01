# simple-redux-collection - Redux helper for simple collection management
[![Codecov Coverage](https://img.shields.io/codecov/c/github/volodymyrl/simple-redux-collection/master.svg)](https://codecov.io/gh/volodymyrl/simple-redux-collection/)

## Motivation

We work with collections every day, and creating monotonous reducers and actions can be quite tedious. So I decided to create this helper to minimize code duplication.

## [Demo](https://codesandbox.io/s/simple-redux-collection-264my)

## Include redux actions for:
* add a new item
* add new items
* update item
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

`key: String [optional]` - key for collection management

`initialState : Object [optional]` - reducer initall state (empty object by default)
Example of reducer state: 
```js
{
    uid1: {uid: 'uid1', title: 'title'},
    uid2: {uid: 'uid2', title: 'title 2'},
}
```
where `uid` should be used as the `key` option



##### Return object **{ACTIONS_TYPES, actionCreators, reducer}**

`ACTIONS_TYPES: Object`  - all action type constants, can be used in middleware 

    ADD_ITEM: @{name}/add_item,
    UPDATE_ITEM: @{name}/updtae_item,
    ADD_ITEMS: @{name}/add_items,
    REMOVE_ITEM: @{name}/remove_item,
    RESET: @${name}/reset,



`actionCreators: Object` - object of [actions creators](https://redux.js.org/basics/actions#action-creators):

    addItem: (item: Object) => Object, item[key] is required

    updateItem: (item: Object) => Object, item[key] is required

    addItems: (items: Object) => Object, 

    removeItem: (id: String|Number) => Object

    reset: () => Object


`reducer: (state: Object, action: Object) => state` - regular Redux [reducer](https://redux.js.org/basics/reducers) function


## Example
Let's create collection for list of comments

Reducer file:
```js
import cr from "simple-redux-collection";

const initialState = {
  id1: { id: "id1", title: "Commemt title", time: "30/11/2019, 22:21:29" }
};
const { reducer, actionCreators } = cr({name: "comments", initialState, key: 'id'});

// reducer function should be added to a root reducer
export { reducer, actionCreators };
```

Container file:

```js
import { connect } from "react-redux";
import { actionCreators } from "./reducer";
import Comments from "./Comments";

const { addItem, addItems, removeItem, updateItem, reset } = actionCreators;

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = {
  addItem, addItems, removeItem, updateItem, reset
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

const Comments = ({ comments, addItem, removeItem, reset, updateItem }) => {
  const [inputValue, changeCommentText] = useState("");

  const addNewComment = () => {
    // id is required for creating new item
    addItem({
      id: String(Math.random()),
      title: inputValue,
      time: new Date().toLocaleString()
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
      	{/* you can use your a selector in container to get data in a required format */}
        {Object.values(comments).map(({ id, title, time }) => (
          <div key={id} className="item">
            <b>{title}</b> <i>Comment time: {time}</i>
            <button
              onClick={() =>
				// id use as the `key` in reducer and it's required for updating item
                updateItem({ id, time: new Date().toLocaleString() })
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
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired
};

export default Comments;

```


Check the full [code example](https://codesandbox.io/s/simple-redux-collection-264my)


