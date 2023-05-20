import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemDetailView from '../components/ItemDetailView';
import {BackgroundStaticColor} from '../static';

const BlogDetail = props => {
  return (
    <View style={styles.main}>
      <ItemDetailView
        title="detail"
        data={props.route.params.data}
        navigation={props.navigation}
      />
    </View>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: BackgroundStaticColor,
  },
});
