import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userRedeucer from "./Reducers/userRedeucer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userRedeucer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    reducer: persistedReducer
})

let persistor = persistStore(store)
export { store, persistor }