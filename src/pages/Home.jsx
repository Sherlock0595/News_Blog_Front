import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../redux/slices/comment';




export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data)

  const [activeTab, setActiveTab] = useState(0); // Состояние активной вкладки (0 - Новые, 1 - Популярные)
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const comments = useSelector(state => state.comments.items.slice(-5))
  const { id } = useParams();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); // Обновление состояния активной вкладки при изменении
  };

  const sortedArr = () => {
    switch (activeTab) {
      case 0:
        return [...posts.items].reverse();
      case 1:
        return [...posts.items].sort((a, b) => b.viewsCount - a.viewsCount);
      default:
        break;
    }
  }

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  useEffect(() => {
    dispatch(fetchComments())
  }, [id]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} onChange={handleTabChange} value={activeTab} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : sortedArr()).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4000${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ))}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
