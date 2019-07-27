import React from 'react';
import { Mutation } from 'react-apollo';

import Layout from './Layout';
import BookForm from './BookForm';
import { CREATE_BOOK, FETCH_BOOKS } from './queries';

function NewBook({ history }) {
  return (
    <Mutation
      mutation={CREATE_BOOK}
      refetchQueries={[{ query: FETCH_BOOKS }]}
      onCompleted={() => history.push('/books')}
    >
      {createBook => (
        <Layout title="New Book" breadcrumb={[{ url: `/new`, title: 'New Book' }]}>
          <BookForm onSave={variables => createBook({ variables })} />
        </Layout>
      )}
    </Mutation>
  );
}

export default NewBook;
