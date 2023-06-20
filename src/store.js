import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import takeReducer from './reducers/take'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	user: userReducer,
	take: takeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	reducer: persistedReducer,
})

let persistor = persistStore(store)
export { store, persistor }
