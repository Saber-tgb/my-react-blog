/*
 * @Description: store
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-28 10:53:46
 * @LastEditTime: 2019-04-28 18:00:14
 */
import rootReducer from '../reducers/reducers'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const windowDom: any = window
const composeEnhancers =
  windowDom.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV === 'development'
    ? windowDom.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store: any = createStore(persistedReducer, enhancer)

export default store
