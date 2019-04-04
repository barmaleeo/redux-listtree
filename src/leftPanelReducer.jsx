import {REDUX_LISTTREE_CHECK_LIST, REDUX_LISTTREE_TOGGLE_LIST} from "./lib/reduxListTreeConstants";
import {removeActive, setActive, setOpen} from "./lib/ListTree";

const initialState = {
    countries:    {id:0, name:'Countries', open:true,    items:[
            {id:1, name:"Europe", items:[]},
            {id:2, name:"South America", items:[]},
            {id:3, name:"North America", items:[]},
            {id:4, name:"Asia", items:[]},
            {id:5, name:"Africa", items:[]},
            {id:6, name:"Australia", items:[]},
        ]},
    companies:  {id:0, name:'Companies',  items:[]}
};

export default function (state = initialState, action) {
    const pl = action.payload;

    let newState = state;
     switch (action.type) {
         case REDUX_LISTTREE_TOGGLE_LIST:
             newState = {...state};

             setOpen(newState[pl.list], pl.ids);

             break;
         case REDUX_LISTTREE_CHECK_LIST:
             newState = {...state};

             newState.activeCategory = pl.list;
             newState.activeItem = pl.id;

             removeActive(newState.countries);
             removeActive(newState.companies);

             setActive(state[pl.list], pl.ids);
             newState[pl.list] = {...state[pl.list]};

             break;
         default:

     }


    return newState;
}