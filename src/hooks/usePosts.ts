import {useCallback, useEffect, useState} from 'react';
import Realm from 'realm';

import {DB} from '../constants/common';
import {IPaginatedPosts, IPost} from '../models/post.model';
import {POST_PREFIX} from '../config';
import {useFetch} from '../hooks/useFetch';
import RealmContext from '../contexts/RealmContext';

const {useRealm} = RealmContext;

export function usePosts() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const {data, loading, error} = useFetch<IPaginatedPosts>(
    `${POST_PREFIX}?page=${page}`,
  );

  const realm = useRealm();

  const savePostsToRealm = async (posts: IPost[]) => {
    try {
      realm.write(() => {
        posts.forEach(post => {
          const existingPost = realm.objectForPrimaryKey(DB.POST, post.id);
          if (!existingPost) {
            realm.create(DB.POST, post, Realm.UpdateMode.Modified);
          }
        });
      });
    } catch (err) {
      console.error('Failed to save posts to Realm:', err);
    }
  };

  useEffect(() => {
    if (error?.message === 'Network request failed') {
      const savedPosts = realm.objects('Post');
      const savedPostsArray = Array.from(savedPosts).map(
        post =>
          ({
            id: post.id,
            image: post.image,
            likes: post.likes,
            tags: post.tags,
            text: post.text,
            publishDate: post.publishDate,
            owner: post.owner,
          } as IPost),
      );
      setAllPosts(savedPostsArray);
    }
  }, [error?.message, realm]);

  useEffect(() => {
    if (data?.page === 1) {
      setAllPosts(data.data);
      savePostsToRealm(data.data);
    }
    if (data?.page && data.page > 1) {
      setAllPosts(prevState => [...prevState, ...data.data]);
      savePostsToRealm(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.page]);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setRefreshing(false);
  }, []);

  return {
    posts: allPosts,
    loading,
    error,
    loadMore: handleLoadMore,
    refreshing,
    refresh: handleRefresh,
  };
}
