import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Col, Container, Row, Spinner, Badge } from "react-bootstrap";
import MovieCard from "../Home/components/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

export default function Movies() {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const keyword = query.get("q");

  // 키워드가 변경되면 페이지 리셋
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // 장르나 정렬이 변경되면 페이지 번호를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [sortOrder, selectedGenre]);

  const { data, isLoading, error, isError } = useSearchMovieQuery({
    keyword,
    page,
  });
  const { data: genreData } = useMovieGenreQuery();

  // 정렬 함수
  const sortMovies = (movies) => {
    if (!movies) return [];

    const moviesCopy = [...movies]; // 원본 데이터 변경 방지를 위한 복사

    if (sortOrder === "popularity") {
      return moviesCopy.sort((a, b) => b.popularity - a.popularity);
    }

    return moviesCopy;
  };

  // 장르 필터링 함수
  const filterMoviesByGenre = (movies, genreId) => {
    if (!genreId || genreId === "") return movies;
    return movies.filter((movie) => movie.genre_ids.includes(Number(genreId)));
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortChange = (eventKey) => {
    setSortOrder(eventKey);
  };

  const handleGenreChange = (eventKey) => {
    // 같은 장르를 다시 클릭하면 필터 제거
    if (selectedGenre === eventKey) {
      setSelectedGenre("");
    } else {
      setSelectedGenre(eventKey);
    }
  };

  // 선택된 장르 이름 찾기
  const getSelectedGenreName = () => {
    if (!selectedGenre || !genreData) return null;
    const genre = genreData.find((g) => g.id.toString() === selectedGenre);
    return genre ? genre.name : null;
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 필터링과 정렬 적용
  const filteredMovies = filterMoviesByGenre(
    data?.results || [],
    selectedGenre
  );
  const sortedAndFilteredMovies = sortMovies(filteredMovies);

  if (sortedAndFilteredMovies.length === 0) {
    return (
      <div className="flex justify-center items-center text-white h-screen">
        <h1>해당 영화가 존재하지 않습니다.</h1>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className="d-flex gap-3 mb-3">
          <Dropdown onSelect={handleSortChange}>
            <Dropdown.Toggle variant="danger" id="dropdown-sort">
              {sortOrder === "popularity" ? "인기순" : "정렬"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="popularity">인기순</Dropdown.Item>
              <Dropdown.Item eventKey="">기본</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={handleGenreChange}>
            <Dropdown.Toggle variant="danger" id="dropdown-genre">
              {getSelectedGenreName() || "장르"}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
              {genreData?.map((genre) => (
                <Dropdown.Item
                  eventKey={genre.id.toString()}
                  key={genre.id}
                  active={selectedGenre === genre.id.toString()}
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item eventKey="">전체 장르</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {selectedGenre && (
          <Col lg={8} xs={12} className="mb-3">
            <div className="d-flex align-items-center">
              <span className="me-2">선택된 장르:</span>
              <Badge bg="danger" className="d-flex align-items-center">
                {getSelectedGenreName()}
                <span
                  className="ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedGenre("")}
                >
                  ×
                </span>
              </Badge>
            </div>
          </Col>
        )}

        <Col lg={12}>
          <Row>
            {sortedAndFilteredMovies.map((movie) => (
              <Col className="my-2" key={movie.id} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              nextLabel="다음 >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages > 500 ? 500 : data?.total_pages}
              previousLabel="< 이전"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
