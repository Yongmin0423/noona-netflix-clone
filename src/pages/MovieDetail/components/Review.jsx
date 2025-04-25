import { useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";

// ExpandableContent component to handle the show more/less functionality
const ExpandableContent = ({ content, maxLength = 300 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if the content needs to be truncated
  const needsTruncation = content.length > maxLength;

  // Get the display text based on expansion state
  const displayText =
    needsTruncation && !isExpanded
      ? `${content.substring(0, maxLength)}...`
      : content;

  return (
    <div className="review-content">
      <p>{displayText}</p>

      {needsTruncation && (
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-0 text-info"
        >
          {isExpanded ? "Close" : "See more"}
        </Button>
      )}
    </div>
  );
};

// Modified Reviews section for your MovieDetail component
const ReviewSection = ({ reviewData }) => {
  if (!reviewData?.results?.length) return null;

  return (
    <div>
      <h2 className="m-2">Reviews</h2>
      <Tabs
        defaultActiveKey={reviewData.results[0]?.id}
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        {reviewData.results.map((review) => (
          <Tab key={review.id} eventKey={review.id} title={review.author}>
            <ExpandableContent content={review.content} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default ReviewSection;
