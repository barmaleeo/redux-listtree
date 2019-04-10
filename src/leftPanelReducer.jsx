import {REDUX_LISTTREE_CHECK_LIST, REDUX_LISTTREE_TOGGLE_LIST} from "./lib/reduxListTreeConstants";
import {getLevel, removeActive, setActive, setOpen} from "./lib/ListTree";
import {
    REDUX_LISTTREE_EDIT_LIST_DONE,
    REDUX_LISTTREE_EDIT_LIST_ERR,
    REDUX_LISTTREE_EDIT_LIST_REQ, REDUX_LISTTREE_FILTER
} from "./editConstants";

const initialState = {
    countries:    {id:0, name:'Countries', open:true,    items:[
            {id:1, name:"Europe", items:[
                    {id:7, name:'Pegeot', items:[]},
                    {id:8, name:'Renault', items:[]}
                ]},
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
         case REDUX_LISTTREE_EDIT_LIST_REQ:
             newState = {...state};
             newState[pl.params.list] = {...state[pl.params.list]};
             getLevel(newState[pl.params.list], pl.params.id,(item) => {
                 item.nameProgress  = true;
                 item.errMsg        = false;
             });

             break;
         case REDUX_LISTTREE_EDIT_LIST_DONE:
             newState = {...state};
             newState[pl.params.list] = {...state[pl.params.list]};
             getLevel(newState[pl.params.list], pl.params.id,(item) => {
                 item.nameProgress  = false;
                 item.name = pl.params.value;
             });
             break;
         case REDUX_LISTTREE_EDIT_LIST_ERR:
             newState = {...state};
             newState[pl.params.list] = {...state[pl.params.list]};
             getLevel(newState[pl.params.list], pl.params.id,(item) => {
                 item.nameProgress  = false;
                 item.errMsg        = 'Error!!!';
             });
             break;
         case REDUX_LISTTREE_FILTER:
             newState = {...state};
             newState.countries = {...state.countries};
             filterList(newState.countries, pl.value.toLowerCase());
             break;

         default:

     }


    return newState;
}


function filterList(list, token){
    list.filtered = !!list.name && list.name.toLowerCase().indexOf(token) >= 0;
    if(list.items){
        for(const i of list.items){
            list.filtered |= filterList(i, token)
        }
    }
    return list.filtered;
}
