import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

type RootStackParamList = {
  AdminCaptors: undefined;
};

type AdminCaptorsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminCaptors'>;

interface AdminCaptorsScreenProps {
  navigation: AdminCaptorsScreenNavigationProp;
}

interface CaptorData {
  id: string;
  toilet_name: string;
  esp_id: string;
  gaz_level: number;
  sensor_status_ok: boolean;
}

const AdminCaptorsScreen: React.FC<AdminCaptorsScreenProps> = ({ navigation }) => {
  const [captors, setCaptors] = useState<CaptorData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newToiletName, setNewToiletName] = useState('');
  const [newEspId, setNewEspId] = useState('');
  const [editingCaptorId, setEditingCaptorId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'toilets'), (querySnapshot) => {
      const captorsList: CaptorData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        captorsList.push({
          id: docSnap.id,
          toilet_name: data.toilet_name,
          esp_id: data.esp_id ?? '',
          gaz_level: data.gaz_level,
          sensor_status_ok: data.sensor_status_ok,
        });
      });
      setCaptors(captorsList);
    });

    return () => unsubscribe();
  }, []);

  const getGazLevelColor = (level: number) => {
    if (level < 800) return styles.gazLow;
    if (level < 900) return styles.gazMedium;
    return styles.gazHigh;
  };

  const handleAddOrUpdateCaptor = async () => {
    if (!newToiletName.trim() || !newEspId.trim()) return;

    try {
      if (editingCaptorId) {
        await updateDoc(doc(db, 'toilets', editingCaptorId), {
          toilet_name: newToiletName.trim(),
          esp_id: newEspId.trim(),
        });
      } else {
        await addDoc(collection(db, 'toilets'), {
          toilet_name: newToiletName.trim(),
          esp_id: newEspId.trim(),
          available: true,
          gaz_level: 0,
          sensor_status_ok: false,
        });
      }

      setNewToiletName('');
      setNewEspId('');
      setShowForm(false);
      setEditingCaptorId(null);
    } catch (error) {
      console.error('Error saving captor:', error);
    }
  };

  const handleEditCaptor = (captor: CaptorData) => {
    setNewToiletName(captor.toilet_name);
    setNewEspId(captor.esp_id);
    setEditingCaptorId(captor.id);
    setShowForm(true);
  };

  const handleDeleteCaptor = (id: string) => {
    Alert.alert(
      'Delete Captor',
      'Are you sure you want to delete this captor?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'toilets', id));
            } catch (error) {
              console.error('Error deleting captor:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Captor Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setShowForm(!showForm);
            if (showForm) {
              setNewToiletName('');
              setNewEspId('');
              setEditingCaptorId(null);
            }
          }}
        >
          <Text style={styles.addButtonText}>{showForm ? 'Cancel' : 'Add Captor'}</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* FORM */}
          {showForm && (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Toilet Name"
                placeholderTextColor="#888"
                value={newToiletName}
                onChangeText={setNewToiletName}
              />
              <TextInput
                style={styles.input}
                placeholder="ESP ID"
                placeholderTextColor="#888"
                value={newEspId}
                onChangeText={setNewEspId}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleAddOrUpdateCaptor}>
                <Text style={styles.submitButtonText}>{editingCaptorId ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
            </View>
          )}

          {captors.map((captor) => (
            <View key={captor.id} style={styles.captorCard}>
              <Text style={styles.captorTitle}>{captor.toilet_name}</Text>
              <Text style={styles.captorEspId}>ESP ID: {captor.esp_id}</Text>
              <Text style={styles.captorStatus}>Status: {captor.sensor_status_ok ? 'Alive' : 'Offline'}</Text>
              <Text style={[styles.captorMethane, getGazLevelColor(captor.gaz_level)]}>
                Gaz Level: {captor.gaz_level}
              </Text>
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => handleEditCaptor(captor)}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteCaptor(captor.id)}
                >
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
  container: { flex: 1, backgroundColor: '#000' },
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
  content: { flex: 1 },
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
    marginBottom: 2,
    color: '#000',
  },
  captorEspId: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  captorStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  captorMethane: {
    fontSize: 14,
    marginBottom: 12,
  },
  gazLow: { color: '#10B981' },
  gazMedium: { color: '#F59E0B' },
  gazHigh: { color: '#EF4444' },
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
  editButton: { backgroundColor: '#F59E0B' },
  deleteButton: { backgroundColor: '#DC2626' },
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
  formContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminCaptorsScreen;
