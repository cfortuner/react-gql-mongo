import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries'

function AddBook() {

  // form state
  const [name, setName] = useState()
  const [genre, setGenre] = useState()
  const [authorId, setAuthorId] = useState()


  const { loading, error, data: authorsData } = useQuery(getAuthorsQuery)
  const [addBook, { data: addBookData }] = useMutation(addBookMutation)

  if (loading) return <option disabled>Loading...</option>
  if (error) return <p>Error :(</p>

  function DisplayAuthors() {
    return authorsData.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>{author.name}</option>
      )
    })
  }

  function SubmitForm(e) {
    // prevent refresh of page
    e.preventDefault()

    addBook({
      variables: {
        name, genre, authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    })
  }


  return (
    <form id="add-book" onSubmit={SubmitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => {
          setName(e.target.value)
        }} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => {
          setGenre(e.target.value)
        }} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => {
          setAuthorId(e.target.value)
        }}>
          <option>Select author</option>
          { DisplayAuthors() }
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook
