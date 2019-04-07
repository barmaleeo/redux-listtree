import React, {Component} from 'react';
import * as ReactDOM from "react-dom";

import './nameStyle.scss';


export default class Name extends Component {
    state = {edit:false};

    componentDidMount() {
        this.setState({element: ReactDOM.findDOMNode(this)});
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const ni = nextProps.item;
        const oi = this.props.item;
        if(!ni.nameProgress && oi.nameProgress){
            this.setState({errMsg:ni.errMsg, className:ni.errMsg?'error':'success'}, ()=>{
                setTimeout(() => {
                    console.log(this);
                    this.setState({edit:false, className:false})
                }, 300);
                console.log(this)
            })
        }
    }

    keyUpListener(e){
        if(e.code === 'Enter'){
            this.saveName()
        }else if(e.code === 'Escape'){
            window.removeEventListener('keyup', this.keyUpListener.bind(this) );
            window.removeEventListener('click', this.clickListener.bind(this) );
            this.setState({edit:false})
        }else{
            this.setState(this.state)
        }
    };
    componentWillUnmount() {
        window.removeEventListener('keyup', this.keyUpListener.bind(this) );
        window.removeEventListener('click', this.clickListener.bind(this) )
    }
    clickListener(e){
        if(this.state.edit && !this.state.className && !this.state.element.contains(e.target)){
            window.removeEventListener('keyup', this.keyUpListener.bind(this) );
            window.removeEventListener('click', this.clickListener.bind(this) );
            this.saveName()
        }
    }

    onDoubleClickName = () => {
        if(this.props.editName) {
            const self = this;
            window.addEventListener('keyup', this.keyUpListener.bind(this));
            window.addEventListener('click', this.clickListener.bind(this));
            this.setState({edit: true, name: this.props.item.name}, () => {
                self.refs.input.focus()
            });
        }
    };

    onChangeName = (e) => {
        this.setState({name:e.target.value})
    };

    onClick = (e) => {
        console.log(e);
        this.props.onClick(e)
    };

    saveName(){
        if(this.props.name !== this.state.name) {
            this.setState({className: 'progress'});
            this.props.onSave('name', this.state.name)
        }else{
            this.setState({edit:false})
        }
    }

    render() {
        const p = this.props;
        const s = this.state;
        const i = p.item;

        return(
            <div className="name-outher">
                {s.edit ?
                    <input ref="input" className={(s.name!==i.name?'changed ':'')+s.className}
                           disabled={s.className}
                           value={s.name}
                           onChange={this.onChangeName}/>:
                    <span onClick={this.onClick}
                          onDoubleClick={this.onDoubleClickName}>
                        {i.name}
                    </span>
                }
            </div>
        )

    }
}
