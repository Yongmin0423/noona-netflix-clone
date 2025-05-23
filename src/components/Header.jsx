import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };
  return (
    <Navbar expand="lg" className="bg-body-dark px-2">
      <Container fluid>
        <Navbar.Brand href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="50"
            viewBox="0 0 309 83"
          >
            <path
              d="M238.626 75.3097C242.971 75.6476 247.3 76.0015 251.645 76.3877V0H238.626V75.3097ZM29.3052 46.962L12.3594 0H0V82.9839C4.32899 82.3726 8.65799 81.7773 13.0192 81.2142V36.0863L28.0821 79.364C32.8134 78.817 37.5769 78.2861 42.3244 77.8035V0H29.3052V46.962ZM54.8286 76.5968C66.8178 75.5028 78.8714 74.6019 90.9732 73.9101V61.0876C83.2486 61.5381 75.524 62.069 67.8477 62.6643V43.2778C72.8848 43.2295 79.5312 43.0686 85.4212 43.1491V30.3266C80.722 30.3105 73.1584 30.391 67.8477 30.4553V12.9351H90.9732V0H54.8286V76.5968ZM99.3254 12.9351H112.94V72.8804C117.269 72.7195 121.614 72.5747 125.959 72.4621V12.9351H139.574V0H99.3254V12.9351ZM147.91 72.1082H160.929V42.5216H178.567V29.6992H160.913V12.9351H184.232V0H147.91V72.1082ZM308.984 0H294.693L285.279 21.8319L276.798 0H262.717L277.844 39.0143L261.349 77.2886C265.919 77.7391 270.474 78.2057 275.028 78.7044L284.635 56.4542L294.146 80.9889C299.103 81.6325 304.043 82.2921 308.984 83L309 82.9839L292.054 39.2878L308.984 0ZM205.587 0H192.584V72.7517C204.412 73.1539 216.192 73.7492 227.908 74.5375V61.7151C220.489 61.2163 213.054 60.798 205.587 60.4602V0Z"
              fill="#E50914"
            />
          </svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="/movies" className="text-white">
              Movies
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchByKeyword}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button variant="outline-danger" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
