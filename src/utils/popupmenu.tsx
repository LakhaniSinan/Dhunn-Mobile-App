import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

const PopupMenu: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleMenuPress = (action: string) => (e: GestureResponderEvent) => {
    setVisible(false);
    console.log(`Pressed: ${action}`);
    // You can perform navigation or actions here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.trigger}>
        <Text style={styles.triggerText}>☰ Open Menu</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuPress('Profile')}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuPress('Settings')}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuPress('Logout')}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: 'center',
  },
  trigger: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  triggerText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: 'white',
    width: 200,
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PopupMenu;
