import React, { useEffect, useState } from "react";

import styles from "./AddComment.module.scss";

import axios from '../../axios';
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts, fetchTags } from '../../redux/slices/posts'
import { addComments, fetchComments } from "../../redux/slices/comment";
export const Index = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [text, setText] = useState('');
  const { comments } = useSelector(state => state.comments);
  const isLoadingComments = useSelector(state => state.comments.isLoading);


  const onSubmit = () => {
    dispatch(addComments({text, id}))
    setText("");
  };

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [dispatch, id]);

  const handleChangeComments = (event) => {
    setText(event.target.value);
  };



  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={handleChangeComments}
          />
          <Button onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
