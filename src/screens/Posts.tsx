import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import {colors} from '../theme/colors';
import {globalStyles} from '../theme/styles';
import {IPost} from '../models/post.model';
import {usePosts} from '../hooks/usePosts';
import Post from '../components/Post';

const Posts: React.FC = () => {
  const {posts, loading, error, loadMore, refreshing, refresh} = usePosts();

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={refresh}
        colors={[colors.primary]}
        tintColor={colors.primary}
      />
    );
  };

  const renderPostItem = ({item}: {item: IPost}) => {
    return <Post post={item} />;
  };

  if (error && !posts.length) {
    return (
      <ScrollView
        contentContainerStyle={globalStyles.container}
        refreshControl={renderRefreshControl()}>
        <Text>There is an error.</Text>
      </ScrollView>
    );
  }

  if (!posts.length) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={renderPostItem}
      style={styles.container}
      onEndReachedThreshold={1}
      onEndReached={loadMore}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : null
      }
      refreshControl={renderRefreshControl()}
    />
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: colors.background},
});

export default Posts;
