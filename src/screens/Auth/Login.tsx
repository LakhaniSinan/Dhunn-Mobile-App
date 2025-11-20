import React, {useState} from 'react';
import {Alert, Image, ScrollView, TextInput} from 'react-native';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {Button, Typography} from '../../components/atoms';
import {COLORS, FONTSIZE, IMAGES, screenWidth} from '../../constants';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {loginUser} from '../../redux/slice/Auth/authSlice';
import {verifyCode} from '../../redux/slice/Auth/otpSlice';
import {AppDispatch} from '../../redux/store';
import {authStyles} from './AuthStyle';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    if (phoneNumber !== '') {
      try {
        await dispatch(loginUser({phone: phoneNumber})).unwrap();
        setShowOtpField(true);
      } catch (error: any) {
        Alert.alert(error.message || 'Failed to login');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Please enter your phone number');
      setLoading(false);
    }
  };

  const handleOtp = async () => {
    if (!otp) {
      Alert.alert('Please enter OTP.');
      return;
    }
    setLoading(true);

    try {
      await dispatch(verifyCode({phone: phoneNumber, otp})).unwrap();
      // router.push("/");
    } catch (error: any) {
      Alert.alert(error[0] || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={authStyles.scrollContainer}
        automaticallyAdjustKeyboardInsets>
        <Image
          source={IMAGES.logo}
          style={{
            width: screenWidth(50),
            height: 150,
            resizeMode: 'contain',
          }}
        />
        <Typography
          style={authStyles.marginVertical}
          size={FONTSIZE.L}
          color={COLORS.GREY}>
          Login to your account
        </Typography>

        {showOtpField ? (
          <Animated.View
            entering={FadeInUp.duration(1500)}
            exiting={FadeOutDown}
            style={authStyles.animatedView}>
            <TextInput
              style={authStyles.inputContainer}
              placeholder="Phone Number"
              placeholderTextColor="#fff"
              keyboardType="phone-pad"
              editable={false}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={authStyles.inputContainer}
              placeholder="Enter OTP"
              placeholderTextColor="#fff"
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
            />
            <Button
              label="Verify OTP"
              onPress={handleOtp}
              loading={loading}
              isGradient={true}
              disabled={false}
            />
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeInUp.duration(1000)}
            exiting={FadeOutDown}
            style={authStyles.animatedView}>
            <TextInput
              style={authStyles.inputContainer}
              placeholder="Phone Number"
              placeholderTextColor="#fff"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <Button
              label="Login"
              onPress={handleSubmit}
              loading={loading}
              isGradient={true}
              disabled={false}
            />
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Login;
