import ajaxGet from 'redux-ajax-get';
import {REDUX_LISTTREE_EDIT_LIST_REQ, REDUX_LISTTREE_FILTER} from "./editConstants";

export function edit(list, id, name, value){
    return ajaxGet('example/edit', REDUX_LISTTREE_EDIT_LIST_REQ,
        {list:list, id:id, name:name, value:value})
}

export function filter(value){
    return {type:REDUX_LISTTREE_FILTER, payload:{value:value}}
}
