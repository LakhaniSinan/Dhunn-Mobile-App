import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = (key: string, value: any) => 
  AsyncStorage.setItem(key, JSON.stringify(value));

export const getItem = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error retrieving item', e);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing item', e);
  }
};
