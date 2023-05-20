import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import ApiContext, {useAPI} from '../context/ApiContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemListView from '../components/ItemListView';
import {APIURL, BackgroundStaticColor} from '../static';

const BlogList = props => {
  const {
    dataSource,
    loading,
    setDataSource,
    setLoading,
    offset,
    setOffset,
    isListEnd,
    setIsListEnd,
  } = useAPI(ApiContext);

  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() =>
          props.navigation.navigate('detail', {
            data: itemData,
          })
        }>
        <View>
          <ItemListView title="List" data={itemData.item} />
        </View>
      </TouchableOpacity>
    );
  };

  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      // Service to get the data from the server to render
      fetch(APIURL + offset)
        // Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          // Successful response from the API Call
          console.log(responseJson);
          if (responseJson.result.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson.result]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
        }}
      />
    );
  };
  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={styles.indicator} />
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <FlatList
        data={dataSource}
        bounces={false}
        renderItem={renderGridItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default BlogList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: BackgroundStaticColor,
  },
  gridItem: {
    flex: 1,
    marginTop: 10,
  },
  indicator: {
    margin: 15,
  },
});
