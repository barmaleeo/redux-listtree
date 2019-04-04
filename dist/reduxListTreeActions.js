"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleList = toggleList;
exports.checkList = checkList;

var _reduxListTreeConstants = require("./reduxListTreeConstants");

function toggleList(list, ids, id) {
  return {
    type: _reduxListTreeConstants.REDUX_LISTTREE_TOGGLE_LIST,
    payload: {
      list: list,
      ids: ids,
      id: id
    }
  };
}

function checkList(list, ids, id) {
  return {
    type: _reduxListTreeConstants.REDUX_LISTTREE_CHECK_LIST,
    payload: {
      list: list,
      ids: ids,
      id: id
    }
  };
}