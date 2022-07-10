import { Post } from "../../firebase/Post/Post";
import { 
  BsArrowUpCircle as ArrowUp,
  BsArrowDownCircle as ArrowDown,
} from "react-icons/bs"
import { Container } from "./style"
import { useState } from "react";

interface RatingStaperProps {
  ratingSum: number;
  postUid: string;
  ownerUid: string;
  rating: {
    status: string;
    uid: string;
  }
  state: boolean;
  update: (newState: boolean) => void;
}

export function RatingStaper({ratingSum, rating, postUid, ownerUid, state, update}: RatingStaperProps) {
  const [loading, setLoading] = useState(false)

  function updateValue(userRating: number) {
    const postService = new Post()
    postService.updateUserRating(rating.uid, userRating, setLoading)
    update(!state)
  }

  function createValue(userRating: number) {
    const postService = new Post()
    postService.createPostRating({postUid, ownerUid, value: userRating, update: setLoading})
    update(!state)
  }

  function handleUpArrow() {
    switch (rating.status) {
      case "less-rating":
        updateValue(0)
        break;
      case "zero-rating":
        updateValue(1)
        break;
      case "no-rating":
        createValue(1)
        break;
    }
  }

  function handleDownArrow() {
    switch (rating.status) {
      case "plus-rating":
        updateValue(0)
        break;
      case "zero-rating":
        updateValue(-1)
        break;
      case "no-rating":
        createValue(-1)
        break;
    }
  }

  return (
    <Container>

      <div className="action-rating">

        {rating.status === "plus-rating" ? (
          <button disabled>
            <ArrowUp className="no-icon" />
          </button>
        ) : (
          <button
            onClick={handleUpArrow}
          >
            <ArrowUp className="icon" />
          </button>
        )}
      
          {!loading ? ratingSum : <div className="loader"></div>}

        {rating.status === "less-rating" ? (
          <button disabled>
            <ArrowDown className="no-icon" />
          </button>
        ): (
          <button
            onClick={handleDownArrow}
          >
            <ArrowDown className="icon" />
          </button>
        )}
        

      </div>
    </Container>
  )
}