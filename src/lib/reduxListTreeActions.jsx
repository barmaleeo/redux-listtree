

import {REDUX_LISTTREE_TOGGLE_LIST} from "./reduxListTreeConstants";
import {REDUX_LISTTREE_CHECK_LIST} from "./reduxListTreeConstants";

export function toggleList(list, ids, id){
    return {type:REDUX_LISTTREE_TOGGLE_LIST, payload:{list:list, ids:ids, id:id}}
}
export function checkList(list, ids, id){
    return {type:REDUX_LISTTREE_CHECK_LIST, payload:{list:list, ids:ids, id:id}}
}
