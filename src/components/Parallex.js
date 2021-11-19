import React, {useRef} from 'react';
import {View, Text, Image, FlatList, StyleSheet, Animated} from 'react-native';
import {width, height} from '../constants';

/**
 ** Get images from local resource *
 ** Get random user images for displaying within the image view
 ** Styel the view by maping throug the images received
 ** Perform onScroll handler in the flatlist attribute
 ** Use Animated API for the parallex animations.
 * */

const IMAGE_WIDTH = width * 0.76;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.14;

const dataImages = [
  'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1433048980017-63f162f662b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1609726121380-243fcdbb1935?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559244673-9cee88d551f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=779&q=80',
  'https://images.unsplash.com/photo-1591543620767-582b2e76369e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=806&q=80',
];

const data = dataImages.map((item, index) => ({
  id: index.toString(),
  image: item,
  userImg: `https://randomuser.me/api/portraits/men/${Math.floor(
    Math.random() * 30,
  )}.jpg`,
}));

console.log();

const Parallex = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  console.log(scrollX);
  return (
    <View style={styleSheet.parallexContainer}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View style={styleSheet.imageWrapper}>
              <View style={styleSheet.parallexImageCont}>
                <View style={styleSheet.parallexImageCont}>
                  <View style={styleSheet.imageOverflow}>
                    <Animated.Image
                      source={{
                        uri: item.image,
                      }}
                      style={{
                        width: IMAGE_WIDTH * 2,
                        height: IMAGE_HEIGHT,
                        transform: [
                          {
                            translateX,
                          },
                        ],
                      }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View style={styleSheet.thumbImageWrapper}>
                  <Image
                    source={{uri: item.userImg}}
                    style={styleSheet.thumbImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

// * Image parallex styles for ANDROID * //
const styleSheet = StyleSheet.create({
  parallexContainer: {
    flex: 1,
  },
  imageWrapper: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  parallexImageCont: {
    borderRadius: 10,
    shadowColor: 'aquamarine',
    elevation: 5,
  },
  imageOverflow: {
    width: IMAGE_WIDTH * 1,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 10,
  },
  thumbImage: {
    width: 60,
    height: 60,
  },
  thumbImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    bottom: '-8%',
    right: '15%',
    left: 'auto',
    elevation: 6,
    overflow: 'hidden',
  },
});

export default Parallex;
