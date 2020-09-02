import React from 'react';
import { Provider } from 'react-redux';

import TasksPage from './components/TasksPage';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TasksPage />
      </Provider>
    </div>
  );
}

export default App;
