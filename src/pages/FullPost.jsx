import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/posts";
import { fetchComments } from "../redux/slices/comment";

export const FullPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.items)
  console.log('ima',comments)
  const { posts, tags } = useSelector(state => state.posts)
  const isPostsLoading = posts.status === 'loading'

  console.log('here', posts);

  const data = posts.items.find(item => {
    if (item._id === id) {
      return true
    }
  })

  const postComments = comments.filter(item => {
    if (item.post === id)
    return true
  })
  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchComments())

  }, []);

  return (
    <>
      <Post
        id={data?._id}
        title={data?.title}
        imageUrl={data?.imageUrl ? `http://localhost:4000${data?.imageUrl}` : ''}
        user={data?.user}
        createdAt={data?.createdAt}
        viewsCount={data?.viewsCount}
        commentsCount={postComments.length}
        tags={data?.tags}
        isFullPost
        isLoading={isPostsLoading}
      >
        <ReactMarkdown children={data?.text} />,
      </Post>
      <CommentsBlock
        items={postComments}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};