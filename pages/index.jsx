import { useState } from "react";
import { Form, FormControl, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await axios.get(`http://www.omdbapi.com/?apikey=a2b07930&s=&s=${searchQuery}`);
    setSearchResult(response.data.Search);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search for a movie"
              className="mr-2"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <ul>
            {searchResult.map((result) => (
              <li key={result.imdbID}>
                <a href={`https://www.imdb.com/title/${result.imdbID}`} target="_blank" rel="noreferrer">
                  {result.Title} ({result.Year})
                </a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}