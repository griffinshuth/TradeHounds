import type {
  ImagePickerOptions,
  ImagePickerResult,
  ImagePickerAsset,
  ImagePickerSuccessResult,
} from 'expo-image-picker';
import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Image, Dimensions, SafeAreaView} from 'react-native';
import Button from 'react-native-ui-lib/button';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-reanimated-carousel';

const windowWidth = Dimensions.get('window').width;

interface CustomImagePickerResult extends ImagePickerSuccessResult {
  assets: ImagePickerAsset[];
}

export default function ImagePickerCarouselScreen() {
  const [images, setImages] = useState<ImagePickerAsset[]>([]);

  const handleOpenGallery = useCallback(async () => {
    const options: ImagePickerOptions = {
      allowsMultipleSelection: true,
      selectionLimit: 0,
    };

    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync(
      options,
    );

    const customResult = result as CustomImagePickerResult;
    if (customResult.assets.length > 0) {
      setImages(customResult.assets);
    }

    // Just returning if user cancels the photo selection
    return;
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.button}>
        <Button
          size={Button.sizes.medium}
          label={'Open image gallery'}
          onPress={handleOpenGallery}
        />
      </View>
      <Carousel
        loop
        data={images}
        renderItem={({item}) => (
          <Image source={{uri: item.uri}} style={styles.image} />
        )}
        width={windowWidth * 0.8}
        height={windowWidth * 0.8}
        autoPlay={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    resizeMode: 'contain',
  },
  button: {
    padding: 15,
  },
});
