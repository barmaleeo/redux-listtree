import ajaxGet from 'redux-ajax-get';
import {REDUX_LISTTREE_EDIT_LIST_REQ} from "./editConstants";

export function edit(list, id, name, value){
    return ajaxGet('example/edit', REDUX_LISTTREE_EDIT_LIST_REQ,
        {list:list, id:id, name:name, value:value})
}
