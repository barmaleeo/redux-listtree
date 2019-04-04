import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import './App.scss';
import ListTree from "./lib/ListTree";
import * as listTreeActions from "./lib/reduxListTreeActions"

class App extends Component {
  render() {
    const p = this.props;
    return (
      <div className="App">
        <div className="left-panel">

          <ListTree list={p.data.countries} name="countries"
                    actions={p.la}/>

          <ListTree list={p.data.companies} name="companies"
                    actions={p.la}/>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data:       state.leftPanel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    la: bindActionCreators(listTreeActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
