import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {API_KEY, width, height} from '../constants';
import {useScrollToImage} from '../hooks/scrollToImage';

const API_URL = 'https://api.pexels.com/v1/search?query=people';

const ImageSize = 80;
const ImageSpace = 10;

const fetchImages = async () => {
  try {
    const imagesData = await axios.get(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const {photos} = await imagesData.data;
    return photos;
  } catch (err) {
    console.log(err);
  }
};

fetchImages();

const Slider = () => {
  //   Images satate is set
  const [images, setImages] = useState();
  const [imgActiveIndex, setActiveIndex] = useState();

  const imageRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const getImageData = async () => {
      const getdata = await fetchImages();
      setImages(getdata);
    };
    getImageData();
  }, []);

  const scrollToImage = index => {
    // ** get calcualted imageOffset value using useScrollToImage hook.
    const {imageOffset} = useScrollToImage(index, width, ImageSize, ImageSpace);

    setActiveIndex(index);

    //** Scrolling to the images on clicking the thumb.
    imageRef.current.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    //* centering the thumb *//
    thumbRef.current.scrollToOffset({
      offset: imageOffset,
      animated: true,
    });
  };

  if (!images) {
    return (
      <View>
        <Text>Data Loading</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        ref={imageRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev =>
          scrollToImage(Math.floor(ev.nativeEvent.contentOffset.x / width))
        }
        renderItem={({item}) => {
          return (
            <View style={{width: width, height: height}}>
              <Image
                source={{
                  uri: item.src.portrait,
                }}
                style={[StyleSheet.absoluteFill]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: ImageSize}}
        contentContainerStyle={{paddingHorizontal: ImageSpace}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToImage(index)}>
              <Image
                source={{
                  uri: item.src.portrait,
                }}
                style={{
                  width: ImageSize,
                  height: ImageSize,
                  borderRadius: 10,
                  marginHorizontal: ImageSpace,
                  borderWidth: 2,
                  borderColor:
                    index === imgActiveIndex ? '#fff' : 'transparent',
                }}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Slider;
