import ajaxGet from 'redux-ajax-get';
import {REDUX_LISTTREE_EDIT_LIST_REQ} from "./editConstants";

export function edit(list, ids, id, name, value){
    return ajaxGet('example/edit', REDUX_LISTTREE_EDIT_LIST_REQ,
        {list:list, ids:ids, id:id, name:name, value:value})
}
