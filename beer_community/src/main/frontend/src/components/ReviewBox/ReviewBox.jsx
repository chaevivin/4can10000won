// ReviewBox.jsx
import React from "react";
import EachReview from "../EachReview/EachReview";
import styles from "./reviewBox.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ReviewBox = (props) => {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      let response = await axios.get(`/api/comments/${props.beerId}`);
      await setReviews(response.data.data);
      await setUserId(response.data.userId);
      console.log("comment data : ", response.data);
      console.log("userId:", response.data.userId);
    };
    getReviews();
  }, []);

  return (
    <div className={styles.main}>
      {reviews.map((i) => (
        <EachReview
          key={i.id}
          userId={userId}
          setReviews={setReviews}
          writerId={i.writerId} //댓글 작성자 아이디
          parentId={i.id} //댓글아이디
          username={i.username}
          edit={i.writerId === userId ? true : false}
          userImageUrl={
            i.userImageUrl
              ? i.userImageUrl
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          content={i.content}
          point={i.point}
          createdDate={i.createdDate}
          beerId={props.beerId}
        />
      ))}
    </div>
  );
};

export default ReviewBox;
