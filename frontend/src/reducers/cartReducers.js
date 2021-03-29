import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'



export const cartReducer = (state= { cartItems: []}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            // Check if product exists, if it does just add qty, if it doesn't add both item and qty
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)  // Check if the item already exists, for action x.product and item.product are used as the id

            if(existItem){
                return{
                ...state,
                cartItems: state.cartItems.map(x =>         // if product matches existItem replace it with new item, if it doesn't return x(original product)
                    x.product === existItem.product ? item : x
                    )
                }
                
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item]    // Returns original state and cartItems, then adds new item
                }
            }

        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)        // product = id,  everything that doesn't match id will not be deleted,    will display new array using actions
            }

        default: 
            return state
    }
}

