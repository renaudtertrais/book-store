import { gql } from 'apollo-boost';

export const FETCH_BOOKS = gql`
  {
    books {
      title
      author
      price
      bookId
    }
  }
`;

export const FETCH_BOOK_BY_ID = gql`
  query fetchBookById($bookId: Int!) {
    book(bookId: $bookId) {
      title
      author
      price
      bookId
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookId: Int!, $title: String!, $author: String!, $price: Float!) {
    editBook(bookId: $bookId, title: $title, author: $author, price: $price) {
      bookId
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $price: Float!) {
    createBook(title: $title, author: $author, price: $price) {
      bookId
    }
  }
`;
