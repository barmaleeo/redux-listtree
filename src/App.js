import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import './App.scss';
import ListTree from "./lib/ListTree";
import * as listTreeActions from "./lib/reduxListTreeActions"
import * as editActions from "./editActions"

class App extends Component {
  state = {filerValue:''};
  onChangeSearch = (e) => {
    this.props.ea.filter(e.target.value);
    this.setState({filterValue:e.target.value})
  };
  render() {
    const p = this.props;
    return (
      <div className="App">


        <div className="left-panel">

          <div className="input-group">
            <input className="form-control input-sm"
                   onChange={this.onChangeSearch}/>
            <div className="input-group-addon">
              <span className="glyphicon glyphicon-search"/>
            </div>
          </div>


          <ListTree list={p.data.countries}
                    name="countries"
                    editName={true}
                    filterValue={this.state.filterValue}
                    renderItem={(item) => (<span>{item.id} - {item.name}</span>)}
                    editActions={p.ea}
                    actions={p.la}/>

          <ListTree list={p.data.companies}
                    name="companies"
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
    ea: bindActionCreators(editActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

export {listTreeActions as actions};
