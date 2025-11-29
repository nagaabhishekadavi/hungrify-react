import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;




// import {configureSlice} from "@reduxjs/toolkit";
//  const cartSlice=configureSlice({
//   name:'cart',
//   intialState:{
//     item:[]
//   },
//   reducers:{
//     addCard:(state,action)=>{
//       state.item.push(action.payload)
//     },
//     removeItem:(state,action)=>{
//       state.item.pop();
//     },
//     clearCart:(state,action)=>{
//       state.item.length=0;
//     }
//   }

//  })

//  export defaukt cartSlice.reducer;
//  export const {addCard,removeCard,clearCart}=cartSlice.actions
