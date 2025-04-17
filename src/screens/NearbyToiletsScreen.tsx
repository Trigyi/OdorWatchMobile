import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'NearbyToilets'>;

export default function NearbyToiletsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [ynovExpanded, setYnovExpanded] = useState(false);
  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const navigation = useNavigation<NavigationProps>();

  const handleAdminLogin = () => {
    setMenuVisible(false);
    setCodeModalVisible(true);
  };

  const verifyAdminCode = () => {
    if (adminCode === '1234') {
      setCodeModalVisible(false);
      setAdminCode('');
      navigation.navigate('AdminCaptors');
    } else {
      Alert.alert('Incorrect Code', 'The code you entered is incorrect.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* -- HEADER -- */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Nearby Toilets</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.menuText}>Menu</Text>
        </TouchableOpacity>
      </View>

      {/* -- MAP -- */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.6047,
          longitude: 1.4442,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 43.6047, longitude: 1.4442 }} />
      </MapView>

      {/* -- Toilets List -- */}
      <View style={styles.toiletCard}>
        <Text style={styles.locationName}>Compans-Caffarelli Toilet</Text>
        <View style={styles.statusRow}>
          <Text style={styles.distance}>Distance: 200m</Text>
          <View style={styles.statusTagBlue}>
            <FontAwesome name="smile-o" size={14} color="#4F46E5" />
            <Text style={styles.statusTextBlue}>Usable</Text>
          </View>
        </View>
      </View>

      {/* -- Ynov Accordion -- */}
      <View style={styles.toiletCard}>
        <TouchableOpacity onPress={() => setYnovExpanded(!ynovExpanded)} style={styles.accordionHeader}>
          <View>
            <Text style={styles.locationName}>Ynov Toilet</Text>
            <Text style={styles.distance}>Distance: 600m</Text>
          </View>
          <Entypo name={ynovExpanded ? "chevron-up" : "chevron-down"} size={24} color="#333" />
        </TouchableOpacity>

        {ynovExpanded && (
          <View style={styles.accordionContent}>
            <View style={styles.subToilet}>
              <Text style={styles.subToiletTitle}>Toilet N°1</Text>
              <View style={styles.statusTagRed}>
                <MaterialIcons name="cancel" size={14} color="#DC2626" />
                <Text style={styles.statusTextRed}>Occupied</Text>
              </View>
            </View>
            <View style={styles.subToilet}>
              <Text style={styles.subToiletTitle}>Toilet N°2</Text>
              <View style={styles.statusTagBlue}>
                <FontAwesome name="smile-o" size={14} color="#4F46E5" />
                <Text style={styles.statusTextBlue}>Usable</Text>
              </View>
            </View>
            <View style={styles.subToilet}>
              <Text style={styles.subToiletTitle}>Toilet N°3</Text>
              <View style={styles.statusTagOrange}>
                <Entypo name="warning" size={14} color="#F59E0B" />
                <Text style={styles.statusTextOrange}>Stinky</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.toiletCard}>
        <Text style={styles.locationName}>Jeanne d’Arc Toilet</Text>
        <View style={styles.statusRow}>
          <Text style={styles.distance}>Distance: 1.2km</Text>
          <View style={styles.statusTagOrange}>
            <Entypo name="warning" size={14} color="#F59E0B" />
            <Text style={styles.statusTextOrange}>Stinky</Text>
          </View>
        </View>
      </View>

      {/* -- MODAL MENU -- */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeButton} onPress={() => setMenuVisible(false)}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>

            <TouchableOpacity style={[styles.menuOption, styles.admin]} onPress={handleAdminLogin}>
              <Text style={styles.menuOptionText}>Connect as Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuOption, styles.report]}>
              <Text style={styles.menuOptionText}>Report a Problem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuOption, styles.settings]}>
              <Text style={styles.menuOptionText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuOption, styles.closeApp]}>
              <Text style={styles.menuOptionText}>Close the application</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* -- MODAL CODE -- */}
      <Modal
        visible={codeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCodeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Enter Admin Code</Text>
            <TextInput
              style={{
                backgroundColor: '#eee',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 8,
                width: '100%',
                marginBottom: 12,
                textAlign: 'center',
              }}
              keyboardType="numeric"
              secureTextEntry
              value={adminCode}
              onChangeText={setAdminCode}
              placeholder="Enter code"
            />
            <TouchableOpacity
              style={{ backgroundColor: '#4F46E5', padding: 10, borderRadius: 8, width: '100%', alignItems: 'center' }}
              onPress={verifyAdminCode}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// === STYLES ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },
  toiletCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  locationName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  distance: {
    color: '#555',
    fontSize: 14,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  subToilet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  subToiletTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusTagBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusTagRed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusTagOrange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusTextBlue: {
    color: '#4F46E5',
    fontWeight: 'bold',
  },
  statusTextRed: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
  statusTextOrange: {
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  accordionContent: {
    marginTop: 8,
    paddingLeft: 8,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // fond semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuOption: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  admin: {
    backgroundColor: '#845EF7',
  },
  report: {
    backgroundColor: '#007BFF',
  },
  settings: {
    backgroundColor: '#E64980',
  },
  closeApp: {
    backgroundColor: '#868E96',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  
});
