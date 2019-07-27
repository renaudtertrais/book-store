import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Table, Button } from 'antd';

import Layout from './Layout';
import { FETCH_BOOKS } from './queries';

const { Column } = Table;

const formatPrice = price => `£${price.toFixed(2)}`;

function Books({ match, history }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [search, setSearch] = useState('');
  const matchSearch = str => str.toLowerCase().includes(search.toLowerCase());

  const rowSelection = {
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };
  return (
    <Query query={FETCH_BOOKS}>
      {({ loading, error, data }) => {
        const { books = [] } = data || {};
        const booksFiltered = books.filter(
          ({ title, author }) => matchSearch(title) || matchSearch(author)
        );
        const selection = booksFiltered.filter(({ bookId }) => selectedRowKeys.includes(bookId));
        const total = selection.reduce((acc, book) => acc + book.price, 0);

        return (
          <Layout
            title={
              selection.length
                ? `${selection.length} books selected - total: ${formatPrice(total)}`
                : `${booksFiltered.length} books`
            }
            breadcrumb={[{ url: `/books`, title: 'Books' }]}
            actions={
              <Link to={`/new`}>
                <Button type="primary" shape="round" icon="plus">
                  Create New
                </Button>
              </Link>
            }
            search={search}
            onSearch={setSearch}
          >
            <div className="Books">
              <Table
                dataSource={booksFiltered}
                rowKey="bookId"
                loading={loading}
                rowSelection={rowSelection}
              >
                <Column title="id" dataIndex="bookId" render={id => `#${id}`} />
                <Column title="Title" dataIndex="title" />
                <Column title="Author" dataIndex="author" />
                <Column title="Price" dataIndex="price" render={formatPrice} />
                <Column
                  title=""
                  dataIndex="bookId"
                  key="edit"
                  render={bookId => (
                    <Link to={`/books/${bookId}`}>
                      <Button>Edit</Button>
                    </Link>
                  )}
                  width={100}
                />
              </Table>
            </div>
          </Layout>
        );
      }}
    </Query>
  );
}

export default Books;
