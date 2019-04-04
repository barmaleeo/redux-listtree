import React, {Component} from 'react';

import './listTreeStyle.scss';


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

    renderLevel(items, ids){
        return (
            <ul>
                {items.map((l, k) => (this.renderItem(l, k, ids)))}
            </ul>)
    }

    renderItem(l, k, ids){

        const newIds = ids.slice();
        newIds.push(l.id);
        return(
            <li key={k} className={(l.active?'active':'')}>
                {l.items && l.items.length > 0 &&
                    <div className={'drop'+(l.open?' open':'')}
                         onClick={this.onClickOpen.bind(this, newIds, l.id)}>
                        {l.open?'-':'+'}
                    </div>}
                <span onClick={this.onClickActive.bind(this, newIds, l.id)}>
                    {l.name}
                </span>
                {l.open && l.items && l.items.length > 0 &&
                    this.renderLevel(l.items, newIds)}
            </li>
        )
    }

    render() {
        const p = this.props;
        const s = this.state;
        const l = p.list;
        return (
            <div className="list-tree-outher">
                <ul>
                    <li className={(l.active?'active':'')}>
                        {l.items && l.items.length > 0 &&
                            <div className={'drop'+(l.open?' open':'')}
                                 onClick={this.onClickOpen.bind(this, [l.id], l.id)}>
                                {l.open?'-':'+'}
                            </div>}
                        <span onClick={this.onClickActive.bind(this, [l.id], l.id)}>
                            {l.name}
                        </span>
                        {l.open && l.items && l.items.length > 0 &&
                            this.renderLevel(l.items, [l.id])}
                    </li>
                </ul>
            </div>
        )
    }
}

export function removeActive(state){
    state.active = false;
    if(state.items) {
        for (const t of state.items) {
            removeActive(t)
        }
    }
}

export function setOpen(list, ids, level){
    if(level === undefined){
        level = 1;
    }
    if(ids.length<=level){
        list.open = !list.open;
        return;
    }
    for(const i of list.items){
        if(i.id == ids[level]){
            setOpen(i, ids, level+1)
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
    for(const i of list.items){
        if(i.id == ids[level]){
            setActive(i, ids, level+1)
        }
    }
}

