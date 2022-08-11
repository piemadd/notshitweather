export default function SearchResults(props) {
    if (!props.results) {
      return null;
    }
  
    if (!props.results.length) {
      return <p>There are no results for your query.</p>;
    }
  
    return (
      <ol>
        {props.results.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ol>
    );
  }