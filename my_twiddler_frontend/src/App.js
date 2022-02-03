import './App.css';
import MyTwiddler from './components/MyTwiddler';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <MyTwiddler />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
