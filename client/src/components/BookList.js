import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

function BookList() {

  const [selectedBookId, setSelectedBookId] = useState()

  const { loading, error, data } = useQuery(getBooksQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  function DisplayBooks() {
    return data.books.map(book => {
      return <li key={book.id} onClick={(e) => {
        setSelectedBookId(book.id)
      }}>{book.name}</li>
    })
  }

  return (
    <div>
      <ul id="book-list">
        {DisplayBooks()}
      </ul>
      <BookDetails bookId={selectedBookId}/>
    </div>
  );
}

export default BookList
