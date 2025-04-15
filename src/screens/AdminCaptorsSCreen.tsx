import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

type RootStackParamList = {
  AdminCaptors: undefined;
};

type AdminCaptorsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminCaptors'>;

interface AdminCaptorsScreenProps {
  navigation: AdminCaptorsScreenNavigationProp;
}

interface CaptorData {
  toilet_name: string;
  gaz_level: number;
  sensor_status_ok: boolean;
}

const AdminCaptorsScreen: React.FC<AdminCaptorsScreenProps> = ({ navigation }) => {
  const [captors, setCaptors] = useState<CaptorData[]>([]);

  useEffect(() => {
    // Mettre en place un listener Firestore pour écouter les changements en temps réel
    const unsubscribe = onSnapshot(collection(db, 'toilets'), (querySnapshot) => {
      const captorsList: CaptorData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        captorsList.push({
          toilet_name: data.toilet_name,
          gaz_level: data.gaz_level,
          sensor_status_ok: data.sensor_status_ok,
        });
      });
      setCaptors(captorsList); // Met à jour l'état avec les nouvelles données
    });

    // Retourner une fonction de nettoyage pour arrêter l'écoute lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Captor Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>Add Captor</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {captors.map((captor, index) => (
            <View key={index} style={styles.captorCard}>
              <Text style={styles.captorTitle}>{captor.toilet_name}</Text>
              <Text style={styles.captorStatus}>Status: {captor.sensor_status_ok ? 'Alive' : 'Offline'}</Text>
              <Text style={styles.captorMethane}>Gaz Level: {captor.gaz_level}</Text>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Odorwatch Admin Panel</Text>
        <Text style={styles.footerSubtitle}>
          Manage captors and ensure the network&apos;s integrity
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  goBackButton: {
    position: 'absolute',
    left: 16,
    top: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  addButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  captorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  captorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  captorStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  captorMethane: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#F59E0B',
  },
  deleteButton: {
    backgroundColor: '#DC2626',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footerSubtitle: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AdminCaptorsScreen;
