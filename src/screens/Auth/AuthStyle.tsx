import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

export const authStyles = StyleSheet.create({
  flex: {flex: 1},
  scrollContainer: {
    paddingHorizontal: 20,
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  iconSize: {
    width: 30,
    height: 30,
  },
  marginVertical: {
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.INPUT_VIEW,
    width: '100%',
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 20,
    color: COLORS.WHITE,
  },
  rememberMeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  rememberIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonMargin: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  socialLoginText: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
  socialIconsContainer: {
    marginVertical: 40,
  },
  animatedView: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginVertical: 10,
    gap: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: 'linear-gradient(90deg, #ff7f50, #ff4500)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  loader: {
    marginRight: 8,
  },
});
