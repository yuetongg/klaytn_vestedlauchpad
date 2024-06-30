import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SendFunds from './components/SendFunds';

const App = () => {
  return (
    <Router basename="/klaytn_vestedlaunchpad">
      <Switch>
        <Route path="/send-funds/:recipientAddress?" component={SendFunds} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
};

export default App;
