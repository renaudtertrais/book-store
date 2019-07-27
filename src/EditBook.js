import React from 'react';
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';

import Layout from './Layout';
import BookForm from './BookForm';
import { FETCH_BOOK_BY_ID, FETCH_BOOKS, SAVE_BOOK } from './queries';

function EditBook({ match, history }) {
  const bookId = parseInt(match.params.bookId, 10);

  return (
    <Query query={FETCH_BOOK_BY_ID} variables={{ bookId }}>
      {({ loading, error, data }) => {
        const { book = {} } = data || {};
        return (
          <Mutation
            mutation={SAVE_BOOK}
            refetchQueries={[
              { query: FETCH_BOOKS },
              { query: FETCH_BOOK_BY_ID, variables: { bookId } },
            ]}
            onCompleted={() => history.push('/books')}
          >
            {saveBook => (
              <Layout
                title={book.title || ''}
                breadcrumb={[
                  { url: `/books`, title: 'Books' },
                  { url: `/books/${bookId}`, title: book.title || '' },
                ]}
                loading={loading}
              >
                {data && (
                  <BookForm
                    values={data.book}
                    onSave={values => {
                      saveBook({ variables: { ...values, bookId } });
                    }}
                  />
                )}
              </Layout>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default EditBook;
