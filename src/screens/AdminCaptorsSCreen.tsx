// src/screens/AdminCaptorsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function AdminCaptorsScreen() {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Captor Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>Add Captor</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* CARD CAPTOR 1 */}
        <View style={styles.captorCard}>
          <Text style={styles.captorTitle}>Captor 1</Text>
          <Text style={styles.captorStatus}>Status: Alive</Text>
          <Text style={styles.captorMethane}>Methane: 62%</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CARD CAPTOR 2 */}
        <View style={styles.captorCard}>
          <Text style={styles.captorTitle}>Captor 2</Text>
          <Text style={styles.captorStatus}>Status: Offline</Text>
          <Text style={styles.captorMethane}>Methane: 45%</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CARD CAPTOR 3 */}
        <View style={styles.captorCard}>
          <Text style={styles.captorTitle}>Captor 3</Text>
          <Text style={styles.captorStatus}>Status: Alive</Text>
          <Text style={styles.captorMethane}>Methane: 78%</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Odorwatch Admin Panel</Text>
        <Text style={styles.footerSubtitle}>
          Manage captors and ensure the network&apos;s integrity
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fond noir
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80, // laisse la place pour le footer
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
    backgroundColor: '#F59E0B', // orange clair
  },
  deleteButton: {
    backgroundColor: '#DC2626', // rouge
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
  },
});
