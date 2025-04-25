import { useNavigate } from "react-router-dom";
import { BASE_IMG_PATH } from "../../../common/constants";

export default function RelatedMovie({ recommendData }) {
  const navigate = useNavigate();

  return (
    <>
      <h1> relatedMovie</h1>
      <div className="flex overflow-auto gap-2 w-full h-[20vh]">
        {recommendData?.results.map((movie) => (
          <img
            className="cursor-pointer"
            onClick={() => navigate(`/movies/${movie.id}`)}
            src={`${BASE_IMG_PATH}${movie.backdrop_path}`}
          />
        ))}
      </div>
    </>
  );
}
