import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import SearchBar from "./Components/Search/Search";
import Results from "./Components/Movies/MovieList";
import Nominations from "./Components/Nominations/Nominations";
import "./App.css";
import Banner from "./Components/Snackbar/Snackbar";
require('dotenv').config();

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => alert(message));
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: process.env.REACT_APP_URI }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="Components">
        <h1 className="mainTitleComp">The Shoppies</h1>
        <br/>
        <br />
        <Banner />
        <SearchBar />
        <div className="ResultsandNominations">
          <Results />
          <Nominations />
        </div>
        <br />
      </div>
    </ApolloProvider>
  );
}

export default App;
