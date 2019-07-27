import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'antd/dist/antd.css';

import EditBook from './EditBook';
import NewBook from './NewBook';
import Books from './Books';

const client = new ApolloClient({
  uri: 'http://localhost:4567/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/new" component={NewBook} />
          <Route path="/books/:bookId" component={EditBook} />
          <Route path="/books" component={Books} />
          <Redirect from="/" to="/books" />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
