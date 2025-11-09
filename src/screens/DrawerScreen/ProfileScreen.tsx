import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker'; // import DateTimePicker
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Typography} from '../../components/atoms';
import {BackHeader} from '../../components/atoms/BackHeader';
import {FooterItem} from '../../components/atoms/FooterItem';
import Icon from '../../components/atoms/Icon';
import {COLORS} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {fetchProfile} from '../../redux/slice/Profile/profileThunk';
import {AppDispatch, RootState} from '../../redux/store';

interface UpdateProfilePayload {
  full_name: string;
  phone: string;
  imageUri: string | null;
  token: string | null;
  email: string | null;
  dob: string | null;
  gender: string | null;
}

export const updateProfile = async ({
  full_name,
  phone,
  imageUri,
  token,
  email,
  dob,
  gender,
}: UpdateProfilePayload) => {
  const formData = new FormData();

  formData.append('full_name', full_name);
  formData.append('gender', gender);
  formData.append('dob', dob);
  formData.append('email', email);
  //   formData.append('phone', phone);
  formData.append('_method', 'PATCH'); // or "PUT" depending on API
  console.log(imageUri);
  if (imageUri && !imageUri.startsWith('https')) {
    const fileName = imageUri.split('/').pop() || 'profile.jpg';
    const fileType = fileName.split('.').pop();

    formData.append('profile_image', {
      uri:
        Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
      name: fileName,
      type: `image/${fileType}`,
    } as any);
  }

  try {
    console.log(token, ' user token');
    const response = await axios.post(
      'https://dhunn.pk/music_backend/public/api/user/update',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Profile updated:', response.data);
    ToastAndroid.show('Profile Updated!', ToastAndroid.SHORT);
    return response.data;
  } catch (error: any) {
    console.log(formData);
    console.error(
      'Profile update error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

const ProfileScreen = () => {
  const user_token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch<AppDispatch>();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<
    'male' | 'female' | null
  >(null);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [show, setShow] = useState(false);

  // Function to handle the date change
  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios' ? true : false); // Only show for Android by default
    setSelectedDate(currentDate);
    setDob(currentDate.toLocaleDateString());
  };

  // Show the date picker on button press
  const showDatePicker = () => {
    setShow(true);
  };

  useEffect(() => {
    getProfile();
  }, [dispatch]);

  const getProfile = async () => {
    setIsLoading(true);
    dispatch(fetchProfile())
      .unwrap()
      .then(profile => {
        setIsLoading(false);
        if (profile.code == 200) {
          console.log('Fetched profile:', profile.data.user);
          setProfile(profile.data.user);
          setFullName(profile?.data?.user?.full_name || '');
          setEmail(profile?.data?.user?.email || '');
          setDob(profile?.data?.user?.dob || '');
          setSelectedGender(profile?.data?.user?.gender);

          setPhoneNumber(profile?.data?.user?.phone || '');
          setIsSubscribed(profile?.data?.user?.is_subscribed === '1');
          setImageUri(profile.data.user.profile_image);
        } else {
          ToastAndroid.show(
            'Cannot get profile, Try again',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Profile fetch failed:', error);
        ToastAndroid.show('Cannot get profile, Try again', ToastAndroid.SHORT);
      });
  };
  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleUpdateProfile = async () => {
    setLoading(true);

    try {
      await updateProfile({
        full_name: fullName,
        phone: phoneNumber,
        imageUri: imageUri,
        token: user_token,
        email: email,
        dob: dob,
        gender: selectedGender,
      }).then(response => {
        console.log(response, 'from screen');
        if (response.code == 200) {
          dispatch(fetchProfile());
        }
      });
      // router.push("/");
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show(
        'Profile update failed,, Try again',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View paddingH-20 style={{paddingTop: Platform.OS == 'android' ? 35 : 0}}>
        <BackHeader />
      </View>

      {isLoading ? (
        <View style={styles.centeredLoading}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <Typography align="center" size={20}>
            Profile
          </Typography>

          <View gap-10 marginT-20 style={styles.profileInfo}>
            {profile ? (
              <>
                {/* Avatar Section - Centered */}
                <View style={styles.avatarSection}>
                  <View style={styles.avatarWrapper}>
                    {imageUri ? (
                      <View style={styles.avatarContainer}>
                        <Image source={{uri: imageUri}} style={styles.avatar} />
                      </View>
                    ) : (
                      <TouchableOpacity onPress={handleImagePick}>
                        <View style={styles.avatarContainer}>
                          <Text style={styles.avatarText}>+</Text>
                        </View>
                      </TouchableOpacity>
                    )}

                    {imageUri ? (
                      <TouchableOpacity
                        style={styles.editIcon}
                        onPress={handleImagePick}>
                        <Icon name="edit" size={18} color="#fff" />
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>

                <View style={{height: 0}} />

                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: COLORS.WHITE,
                  }}>
                  Name
                </Text>
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Name"
                  placeholderTextColor="#fff"
                  keyboardType="default"
                  value={fullName}
                  onChangeText={setFullName}
                />

                <View style={{height: 10}} />

                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: COLORS.WHITE,
                  }}>
                  Phone
                </Text>
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Phone"
                  placeholderTextColor="#fff"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />

                <View style={{height: 10}} />

                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: COLORS.WHITE,
                  }}>
                  Email
                </Text>
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />

                <View style={{height: 5}} />

                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: COLORS.WHITE,
                  }}>
                  Gender
                </Text>

                <View style={styles.radioGroup}>
                  {['male', 'female'].map(gender => (
                    <TouchableOpacity
                      key={gender}
                      style={styles.radioOption}
                      onPress={() =>
                        setSelectedGender(gender as 'male' | 'female')
                      }>
                      <View style={styles.radioCircleOuter}>
                        {selectedGender === gender && (
                          <View
                            style={[
                              styles.radioCircleInner,
                              {backgroundColor: COLORS.PRIMARY},
                            ]}
                          />
                        )}
                      </View>
                      <Text style={styles.radioLabel}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={{height: 10}} />

                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: COLORS.WHITE,
                  }}>
                  Date Of Birth
                </Text>
                <TouchableOpacity onPress={showDatePicker}>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder="Date Of Birth"
                    placeholderTextColor="#fff"
                    keyboardType="default"
                    value={dob} // Display selected date here
                    editable={false} // Make TextInput non-editable
                  />
                </TouchableOpacity>

                {/* TouchableOpacity to trigger date picker */}
                {/*      
        style={{
          backgroundColor: COLORS.PRIMARY,
          padding: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Change Date Of Birth</Text>
      </TouchableOpacity> */}
                {show && (
                  <DateTimePicker
                    themeVariant="dark"
                    testID="dateTimePicker"
                    value={selectedDate || new Date()} // Set initial value
                    mode="date" // Can be 'date', 'time', or 'datetime'
                    is24Hour={true} // Use 24-hour format
                    display="default" // Display style (Android only)
                    onChange={onDateChange} // Event handler on date change
                  />
                )}

                <View style={{height: 15}} />
                <Button
                  label="Save Changes"
                  onPress={handleUpdateProfile}
                  loading={loading}
                  isGradient={true}
                  disabled={false}
                />
              </>
            ) : (
              <Text>No profile data available.</Text>
            )}
          </View>
        </ScrollView>
      )}

      <FooterItem />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center', // Center the avatar
    marginTop: 20, // Optional: Space above the avatar
  },
  profileInfo: {
    // alignItems: 'center', // Align text and inputs to the left
  },
  inputContainer: {
    backgroundColor: COLORS.INPUT_VIEW,
    width: '100%',
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 20,
    color: COLORS.WHITE,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 20, // Add margin below the avatar for spacing
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    color: '#888',
  },
  centeredLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  radioGroup: {
    marginLeft: 15,
    flexDirection: 'row',
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircleOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.WHITE,
  },
});

export default ProfileScreen;
