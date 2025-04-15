import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function NearbyToiletsScreen() {
  // État pour afficher/masquer le popup
  const [menuVisible, setMenuVisible] = useState(false);

  // État pour l'accordéon (Ynov Toilet)
  const [ynovExpanded, setYnovExpanded] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* -- HEADER -- */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Nearby Toilets</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)} // Affiche le popup
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

      {/* -- Toilets List (on garde l'existant) -- */}
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

      {/* Accordéon Ynov Toilet */}

      <View style={styles.toiletCard}>
      <TouchableOpacity 
        onPress={() => setYnovExpanded(!ynovExpanded)} 
        style={styles.accordionHeader}
      >
        <View>
          <Text style={styles.locationName}>Ynov Toilet</Text>
          <Text style={styles.distance}>Distance: 600m</Text>
        </View>
        <Entypo 
          name={ynovExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#333" 
        />
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


      {/* -- MODAL POUR LE MENU -- */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* fond gris transparent */}
        <View style={styles.modalOverlay}>
          {/* Contenu du menu */}
          <View style={styles.modalContainer}>
            {/* Bouton fermer (X) */}
            <Pressable style={styles.closeButton} onPress={() => setMenuVisible(false)}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>

            <TouchableOpacity style={[styles.menuOption, styles.admin]} onPress={() => {}}>
              <Text style={styles.menuOptionText}>Connect as Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuOption, styles.report]} onPress={() => {}}>
              <Text style={styles.menuOptionText}>Report a Problem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuOption, styles.settings]} onPress={() => {}}>
              <Text style={styles.menuOptionText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuOption, styles.closeApp]} onPress={() => {}}>
              <Text style={styles.menuOptionText}>Close the application</Text>
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
