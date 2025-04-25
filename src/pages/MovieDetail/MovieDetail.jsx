import { useParams } from "react-router-dom";
import { useMovieDetail } from "../../hooks/useMovieDetail";
import {
  Alert,
  Badge,
  Col,
  Container,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { BASE_IMG_PATH } from "../../common/constants";
import { FaVoteYea } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { TbRating18Plus } from "react-icons/tb";
import { useMovieReviews } from "../../hooks/useMovieReviews";
import { useRecommendation } from "../../hooks/useRecommendations";
import RelatedMovie from "./components/RelatedMovie";
import { AnimatePresence, motion } from "motion/react";
import Example from "./components/Video";
import { useState } from "react";
import { useTrailer } from "../../hooks/useTrailer";

export default function MovieDetail() {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useMovieDetail(id);
  const { data: reviewData } = useMovieReviews(id);
  const { data: recommendData } = useRecommendation(id);
  const { data: trailerData } = useTrailer(id);
  const [showModal, setShowModal] = useState();
  const toggleModal = () => setShowModal((prev) => !prev);

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
    <>
      <Container className="text-white">
        <Row>
          <Col
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            lg={4}
            xs={12}
          >
            <img src={`${BASE_IMG_PATH}${data.poster_path}`} />
            <div className="text-2xl flex gap-2 items-center">
              <Badge
                bg="warning"
                onClick={toggleModal}
                className="cursor-pointer my-5"
              >
                See Trailer
              </Badge>
            </div>
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
            <div className="flex items-center gap-10">
              <div className="flex items-center my-5 gap-2">
                <FaVoteYea className="text-5xl bg-amber-400 p-2 rounded text-black" />
                <p className="flex items-center text-4xl mb-1">
                  {data.vote_average.toFixed(1)}
                </p>
              </div>
              <div className="flex items-center my-5 gap-2">
                <IoIosPeople className="text-5xl bg-amber-400 p-2 rounded text-black" />
                <p className="flex items-center text-4xl mb-1">
                  {data.vote_count}
                </p>
              </div>
              <div className="flex items-center my-5 gap-2">
                {data.adult && (
                  <TbRating18Plus className="text-5xl bg-red-500 p-2 rounded text-black" />
                )}
              </div>
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
            <div>
              <RelatedMovie recommendData={recommendData} />
            </div>
            {reviewData?.results.length === 0 ? null : (
              <div>
                <h2 className="m-2">Reviews</h2>
                <Tabs
                  defaultActiveKey="profile"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  {reviewData?.results.map((review) => (
                    <Tab
                      className="p"
                      eventKey={review.id}
                      title={review.author}
                    >
                      {review.content}
                    </Tab>
                  ))}
                </Tabs>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <AnimatePresence>
        {showModal && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
            />

            {/* 모달 창 */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-lg shadow-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
            >
              {trailerData.results.length === 0 ? (
                <p className="text-2x1 text-white">
                  해당 영화의 트레일러가 없습니다.
                </p>
              ) : (
                <Example trailerData={trailerData} />
              )}
              <button
                onClick={toggleModal}
                className="mt-2 px-4 py-2 bg-white text-black rounded"
              >
                닫기
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
