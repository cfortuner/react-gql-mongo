import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import BookList from './components/BookList'
import AddBook from './components/AddBook'

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Colin's Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;