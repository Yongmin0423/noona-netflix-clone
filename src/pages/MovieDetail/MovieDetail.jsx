import { useParams } from "react-router-dom";
import { useMovieDetail } from "../../hooks/useMovieDetail";
import { Alert, Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { BASE_IMG_PATH } from "../../common/constants";
import { FaVoteYea } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

export default function MovieDetail() {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useMovieDetail(id);
  console.log(data);

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

  return (
    <Container className="text-white">
      <Row>
        <Col className="w-full h-full flex justify-center" lg={4} xs={12}>
          <img src={`${BASE_IMG_PATH}${data.poster_path}`} />
        </Col>
        <Col lg={8} xs={12}>
          <div className="flex flex-wrap justify-center gap-1 mb-3">
            {data?.genres.map((genre) => (
              <Badge key={genre.id} bg="danger">
                {genre.name}
              </Badge>
            ))}
          </div>
          <div>
            <h1>{data.title}</h1>
          </div>
          <p>{data.overview}</p>
          <div className="flex items-center my-5 gap-2">
            <FaVoteYea className="text-4xl bg-amber-400 p-2 rounded text-black" />
            <p className="flex items-center text-4xl mb-1">
              {data.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl flex gap-2 items-center">
              <Badge bg="warning">Budget</Badge>
              <span>${data.budget.toLocaleString()}</span>
            </div>
            <div className="text-2xl flex gap-2 items-center">
              <Badge bg="warning">Revenue</Badge>
              <span>${data.revenue.toLocaleString()}</span>
            </div>
            <div className="text-2xl flex gap-2 items-center">
              <Badge bg="warning">Release Date</Badge>
              <span>{data.release_date}</span>
            </div>
            <div className="text-2xl flex gap-2 items-center">
              <Badge bg="warning">Run time</Badge>
              <span>{data.runtime} min</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
