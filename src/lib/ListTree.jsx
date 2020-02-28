import React, {Component} from 'react';

import './listTreeStyle.scss';
import Name from "./Name";


export default class ListTree extends Component {
    onClickOpen = (ids, id, e) => {
        //console.log(ids);
        e.stopPropagation();
        this.props.actions.toggleList(this.props.name, ids, id)
    };
    onClickActive = (ids, id, e) => {
        //console.log(ids);
        e.stopPropagation();
        this.props.actions.checkList( this.props.name, ids, id)
    };

    onSave = (id, name, value) => {
        console.log(this.props.name, id, name, value);
        this.props.editActions.edit(this.props.name, id, name, value);
    };

    onContextMenu = (ids, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(item)
    };

    renderLevel(items, ids){
        if(!items){
            return null;
        }
        const p = this.props;
        return (
            <ul>
                {items.map((l, k) => (
                    typeof p.renderItem==='function'?p.renderItem(this, l, k, ids):this.renderItem(l, k, ids)))
                }
            </ul>)
    }

    renderItem(l, k, ids){

        const newIds = ids.slice();
        newIds.push(l.id);
        let open;
        if(this.props.filterValue){
            if(!l.filtered) {
                return null;
            }else {
                open = true;
            }
        }else{
            open = l.open;
        }
        return(
            <li key={k} className={(l.active?'active':'')}
                onContextMenu={this.onContextMenu.bind(this,  newIds, l)}>
                {l.items && l.items.length > 0 &&
                    <div className={'drop'+(open?' open':'')}
                         onClick={this.onClickOpen.bind(this, newIds, l.id)}>
                        {open?'-':'+'}
                    </div>
                }
                <Name item={l} onClick={this.onClickActive.bind(this, newIds, l.id)}
                      editName={this.props.editName}
                      entity={this}
                      onSave={this.onSave.bind(this, l.id)}/>
                {open && l.items && l.items.length > 0 &&
                    this.renderLevel(l.items, newIds)}
            </li>
        )
    }

    render() {
        const p = this.props;
        //const s = this.state;
        const l = p.list;

        return (
            <div className="list-tree-outher">
                {this.renderLevel([l], [])}
            </div>
        )
    }
}

export function removeActive(state){
    state.active = false;
    if(Array.isArray(state.items)) {
        for (const t of state.items) {
            removeActive(t)
        }
    }
}

export function getLevel(list, id, callback){

    if(parseInt(list.id) === parseInt(id)){
        callback(list);
        return true;
    }
    if(Array.isArray(list.items)) {
        for (const n in list.items) {
            if (parseInt(list.items[n].id) === parseInt(id)) {
                list.items[n] = {...list.items[n]};
                const result = callback(list.items[n]);
                if (result === 'remove') {
                    list.items.splice(n, 1)
                } else if (typeof result === 'object') {
                    list.items[n] = {...result};
                }
                return true;
            } else if (getLevel(list.items[n], id, callback)) {
                return true;
            }
        }
    }
    return false;
}

export function setOpen(list, ids, level){
    if(level === undefined){
        level = 1;
    }
    if(ids.length<=level){
        list.open = !list.open;
        return;
    }
    if(Array.isArray(list.items)) {
        for (const i of list.items) {
            if (parseInt(i.id) === parseInt(ids[level])) {
                setOpen(i, ids, level + 1)
            }
        }
    }
}

export function setActive(list, ids, level){
    if(level === undefined){
        level = 1;
    }
    if(ids.length<=level){
        list.active = true;
        return;
    }
    if(Array.isArray(list.items)) {
        for (const i of list.items) {
            if (parseInt(i.id) === parseInt(ids[level])) {
                setActive(i, ids, level + 1)
            }
        }
    }
}

