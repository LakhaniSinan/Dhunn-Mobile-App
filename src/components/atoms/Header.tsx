import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';
import {COLORS, FONTSIZE, IMAGES, SCREENS} from '../../constants';
import {navigate, onBack} from '../../navigation/RootNavigation';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native-ui-lib';
import {Typography} from './Typography';
import {useDispatch} from 'react-redux';
import ImageCardList from '../../screens/HomeScreens/ImageCardList';

export const Header = (props: any) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const {
    onPressRight2,
    onPressLeft = () => onBack(),
    leftIcon = 'arrow-left',
    rightIcon = 'arrow-left',
    rightIcon2 = 'arrow-left',
    titleText = 'Music APP',
    titleColor = COLORS.WHITE,
    style = {},
  } = props;

  const CustomModal = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View row spread center>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  // navigate(SCREENS.SEARCH)
                }}>
                <View row spread style={styles.searchBarStyle}>
                  <TextInput
                    placeholder="Search Audio, Video..."
                    placeholderTextColor={COLORS.WHITE}
                  />
                  <Image
                    source={IMAGES.searchTop}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={IMAGES.vector}
                  style={{width: 20, height: 20, alignSelf: 'center'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View marginV-20>
              <Typography align="center" size={20}>
                Top Trending
              </Typography>
            </View>
            <View row>
              <ImageCardList
                cardWidth={120}
                cardHeight={80}
                customImages={IMAGES.imageCont}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View paddingH-20 style={[styles.container]}>
      <View style={[styles.headerView]}>
        <View row center flex style={{marginLeft: -20}}>
          {leftIcon && (
            <TouchableOpacity onPress={onPressLeft} style={{flex: 1}}>
              <Image
                source={IMAGES.menu}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          <View style={{left: -20}}>
            <Typography
              size={FONTSIZE.M}
              textType="semiBold"
              numberOfLines={1}
              color={titleColor}>
              {titleText}
            </Typography>
          </View>
        </View>
        <View flex style={{flexDirection: 'row', gap: 10, marginRight: -20}}>
          {rightIcon && (
            <TouchableOpacity
              style={{flex: 1, marginLeft: 100, alignItems: 'flex-end'}}
              onPress={() => navigation.navigate(SCREENS.PROFILE_SCREEN)}>
              <Image
                source={IMAGES.user}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          {rightIcon2 && (
            <TouchableOpacity
              onPress={() => navigate(SCREENS.SEARCH)}
              style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                source={IMAGES.search}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <CustomModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == 'ios' ? 0 : 0,
    backgroundColor: 'transparent',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  headerText: {
    fontSize: FONTSIZE.L,
    color: COLORS.BLACK,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    marginTop: 5,
  },
  modalView: {
    backgroundColor: COLORS.BLACK,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBarStyle: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.WHITE,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});
