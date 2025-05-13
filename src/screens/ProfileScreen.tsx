
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../context/AppContext';

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.profileItem}>
    <Text style={styles.itemLabel}>{label}</Text>
    <Text style={styles.itemValue}>{value}</Text>
  </View>
);

const ProfileScreen = () => {
  const { student, logout } = useAppContext();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => logout(), style: "destructive" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: student.profileImage || 'https://i.pravatar.cc/150?img=11' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Icon name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentClass}>Class {student.class} - Section {student.section}</Text>
        </View>

        <ProfileSection title="Student Information">
          <ProfileItem label="Admission Number" value={student.admissionNumber} />
          <ProfileItem label="Roll Number" value={student.rollNumber} />
          <ProfileItem label="Date of Birth" value={new Date(student.dateOfBirth).toLocaleDateString()} />
          <ProfileItem label="Branch" value={student.branch} />
        </ProfileSection>

        <ProfileSection title="Contact Information">
          <ProfileItem label="Address" value={student.address} />
          <ProfileItem label="Mobile Number" value={student.mobileNumber} />
        </ProfileSection>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="account-edit" size={24} color="#00AAC8" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="shield-lock" size={24} color="#00AAC8" />
            <Text style={styles.actionText}>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="bell-outline" size={24} color="#00AAC8" />
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.versionText}>SchoolConnect v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#00AAC8',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  studentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 16,
    color: '#718096',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  profileItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  itemLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 16,
    color: '#2D3748',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    marginHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#4A5568',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 12,
    backgroundColor: '#FEEAE9',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});

export default ProfileScreen;
