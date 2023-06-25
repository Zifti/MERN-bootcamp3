import { PersistGate } from 'redux-persist/integration/react'
import AppRoutes from './routes/Routes'
import { store } from './store/Store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'


function App() {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  )
}

export default App