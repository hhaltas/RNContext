import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {textColor} from '../static';

const ItemDetailView = ({title, data, navigation}) => {
  const {width} = useWindowDimensions();
  const contentText = {
    html: data.item.content,
  };
  useEffect(() => {
    navigation.setOptions({title: data.item.title.substring(0, 22) + '...'});
  }, []);
  return (
    <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
      <Text style={styles.dateTitle}>
        {moment(data.createdAt).format('DD-MM-YYYY HH:mm')}
      </Text>
      <Image src={data.item.banner} style={styles.imageSize} />
      <RenderHtml
        contentWidth={Dimensions.get('window').width * 0.9}
        source={contentText}
        defaultTextProps={{style: {color: textColor}}}
      />
      {/*
      HTML içeriklerin temizlemesi için
      kullandığım bir parti kütüphanesi ile ayarladım.
      <Text>{data.item.content}</Text>
      */}
    </ScrollView>
  );
};

export default ItemDetailView;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
  },
  dateTitle: {
    position: 'absolute',
    right: 5,
    top: 5,
    fontSize: 12,
    color: textColor,
  },
  imageSize: {
    width: Dimensions.get('window').width * 0.9,
    height: 150,
    resizeMode: 'contain',
    marginTop: 30,
  },
});
