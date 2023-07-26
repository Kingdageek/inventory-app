// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // Define the initial state
// const initialState = {
//   formInput: {
//     itemName: "",
//     categoryId: "",
//     hasShelfLife: false,
//   },
//   error: "",
//   tableData: [],
// };

// // Define the reducer function
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_FORM_INPUT":
//       return {
//         ...state,
//         formInput: action.payload,
//       };
//     case "SET_ERROR":
//       return {
//         ...state,
//         error: action.payload,
//       };
//     case "SET_TABLE_DATA":
//       return {
//         ...state,
//         tableData: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Configure Redux Persist
// const persistConfig = {
//   key: "root",
//   storage,
// };

// // Create the persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create the Redux store
// const store = configureStore({
//   reducer: persistedReducer,
// });

// // Create the persisted store
// const persistor = persistStore(store);

// export { store, persistor };