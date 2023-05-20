import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {ListBackGround, textColor} from '../static';
import moment from 'moment';

const ItemListView = props => {
  return (
    <View style={styles.card}>
      <Text style={styles.dateTitle} numberOfLines={2}>
        {moment(props.data.createdAt).format('DD-MM-YYYY HH:mm')}
      </Text>

      <Text style={styles.title}>{props.data.title}</Text>
      <Image src={props.data.banner} style={styles.imageSize} />
      <Text style={styles.summary}>{props.data.summary}</Text>
      <Text style={styles.Total} numberOfLines={2}>
        totalReadingTime: {props.data.totalReadingTime}
      </Text>
    </View>
  );
};

export default ItemListView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: ListBackGround,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'column',
  },
  dateTitle: {
    position: 'absolute',
    right: 5,
    top: 5,
    color: textColor,
    fontSize: 12,
  },
  title: {
    marginTop: 10,
    marginBottom:5,
    textAlign: 'left',
    color: textColor,
    fontSize: 14,
    fontWeight: '600',
  },
  summary: {
    marginTop: 4,
    textAlign: 'left',
    color: textColor,
    fontSize: 14,
    fontWeight: '400',
  },
  Total: {
    textAlign: 'right',
    color: textColor,
    fontSize: 12,
  },
  text: {
    color: textColor,
    paddingTop: 2,
  },
  imageSize: {
    width: Dimensions.get('window').width * 0.9,
    height: 140,
    resizeMode: 'cover',
  },
});
