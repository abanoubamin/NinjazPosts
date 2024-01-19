import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';

import {formatHumanDate} from '../utils/date.util';

import {IPost} from '../models/post.model';

type Props = {post: IPost};

const Post: React.FC<Props> = ({post}) => {
  const formattedDate = useMemo(
    () => formatHumanDate(post.publishDate),
    [post.publishDate],
  );

  return (
    <View style={styles.postContainer}>
      {post.owner?.picture ? (
        <Image source={{uri: post.owner.picture}} style={styles.ownerImage} />
      ) : null}
      <View style={styles.postContent}>
        <Text style={styles.ownerName}>
          {`${post.owner?.firstName || 'Unknown'} ${
            post.owner?.lastName || 'User'
          }`}
        </Text>
        <Text style={styles.publishDate}>{formattedDate}</Text>
        {post.text ? <Text style={styles.postText}>{post.text}</Text> : null}
        {post.image ? (
          <Image source={{uri: post.image}} style={styles.postImage} />
        ) : null}
        {post.tags?.length ? (
          <Text style={styles.tags}>{post.tags.join(', ')}</Text>
        ) : null}
        <Text style={styles.likes}>{`${post.likes || 0} Likes`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  likes: {fontWeight: 'bold', marginTop: 8},
  ownerImage: {width: 50, height: 50, borderRadius: 25, marginRight: 16},
  ownerName: {fontSize: 16, fontWeight: 'bold'},
  postContainer: {flexDirection: 'row', marginBottom: 16, padding: 12},
  postContent: {flex: 1},
  postImage: {height: 200, marginBottom: 8, borderRadius: 8},
  postText: {marginBottom: 8},
  publishDate: {fontSize: 12, color: 'gray', marginBottom: 8},
  tags: {fontSize: 12, color: 'blue'},
});

export default React.memo(Post);
