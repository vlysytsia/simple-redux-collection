# DEMO VERSION, NOT READY FOR PRODUCTION

# simple-redux-collection - Redux helper for simple collection management
[![Codecov Coverage](https://img.shields.io/codecov/c/github/volodymyrl/simple-redux-collection/master.svg)](https://codecov.io/gh/volodymyrl/simple-redux-collection/)

## [Demo](https://codesandbox.io/s/simple-redux-collection-264my)

## Include actions for:
* add a new item
* add new items
* update item
* delete item
* reset collection

## Install
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

**collectionReducer({name, initialState, key})**

##### Params
`name` : *String [required]* - reducer name, all actions types will be created in `@${name}/action_type` format 

`initialState` : *Object [optional]* - reducer inital state (empty object by default)

`key`: *String [optional]* - key for collection management 

##### Return object  **{ACTIONS_TYPES, actionCreators, reducer}**

`ACTIONS_TYPES`: *Object*  - all actions types constant, can be used in middlewares

    ADD_ITEM: `@${name}/add_item`,
    UPDATE_ITEM: `@${name}/updtae_item`,
    ADD_ITEMS: `@${name}/add_items`,
    REMOVE_ITEM: `@${name}/remove_item`,
    RESET: `@${name}/reset`,



`actionCreators`: *Object* - object of [actions creators](https://redux.js.org/basics/actions#action-creators):

**addItem**(item: *Object* key is required}) : *Function*  
**updateItem**: (item: *Object* key is required) : *Function*  
**addItems**:(item: *Object* key is required) : *Function*  
**removeItem**: (id: *String|Number*) : *Function*  
**reset**: *Function*


`reducer`: *Function* (state: *Object*, action: *Object*) - regular [reducer](https://redux.js.org/basics/reducers) function


## Example of usage 
Let's create collection of comments for example

```js
import cr from "simple-redux-collection";
const initialState = {
  id1: { id: "id1", title: "Commemt body", time: "30/11/2019, 22:21:29" }
};
const { reducer, actionCreators } = cr({name: "comments", initialState});
export { reducer, actionCreators };
```

Comments React container file *./containers.js* 

```js
import { connect } from "react-redux";
import { actionCreators } from "./reducer";
import Comments from "./Comments";

const { addItem, addItems, removeItem, updateItem, reset } = actionCreators;

const mapStateToProps = state => ({
  comments: state
});

const mapDispatchToProps = {
  addItem, addItems, removeItem, updateItem, reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
```

Now all actions and collection items can be used as props in the `Comments` component. Check the full code example https://codesandbox.io/s/simple-redux-collection-264my

