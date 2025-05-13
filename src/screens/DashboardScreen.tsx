
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../context/AppContext';

interface MenuItemProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const MenuItem = ({ title, icon, color, onPress }: MenuItemProps) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon name={icon} size={24} color="white" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { student, notifications, fees, homework } = useAppContext();
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const pendingHomework = homework.filter(h => !h.completed).length;
  const pendingFees = fees.filter(f => f.status !== 'paid');
  
  const totalFeesPending = pendingFees.reduce((total, fee) => {
    if (fee.status === 'unpaid') {
      return total + fee.amount;
    } else if (fee.status === 'partial' && fee.paidAmount) {
      return total + (fee.amount - fee.paidAmount);
    }
    return total;
  }, 0);

  const navigateToScreen = (screenName: string) => {
    // @ts-ignore - Navigation typing issue
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.nameText}>Parent of {student.name}</Text>
        </View>
        <TouchableOpacity style={styles.notificationContainer}>
          <Icon name="bell" size={24} color="#00AAC8" />
          {unreadNotifications > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>{unreadNotifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.studentCard}>
          <View style={styles.studentInfo}>
            <Image 
              source={{ uri: student.profileImage || 'https://i.pravatar.cc/150?img=11' }} 
              style={styles.studentImage} 
            />
            <View>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentClass}>Class: {student.class} | Section: {student.section}</Text>
              <Text style={styles.studentId}>ID: {student.admissionNumber}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Icon name="check" size={20} color="#4CAF50" />
            <Text style={styles.summaryText}>Attendance: 95%</Text>
          </View>
          <View style={styles.summaryItem}>
            <Icon name="book-open-variant" size={20} color="#FF9800" />
            <Text style={styles.summaryText}>Homework: {pendingHomework} pending</Text>
          </View>
          <View style={styles.summaryItem}>
            <Icon name="currency-inr" size={20} color="#F44336" />
            <Text style={styles.summaryText}>Fees: ₹{totalFeesPending} pending</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Quick Access</Text>
        
        <View style={styles.menuGrid}>
          <MenuItem 
            title="Attendance" 
            icon="calendar-check" 
            color="#4CAF50" 
            onPress={() => navigateToScreen('Attendance')} 
          />
          <MenuItem 
            title="Homework" 
            icon="book-open-variant" 
            color="#FF9800" 
            onPress={() => navigateToScreen('Homework')} 
          />
          <MenuItem 
            title="Fees" 
            icon="cash-multiple" 
            color="#F44336" 
            onPress={() => navigateToScreen('Fees')} 
          />
          <MenuItem 
            title="Report Card" 
            icon="chart-bar" 
            color="#9C27B0" 
            onPress={() => {}} 
          />
          <MenuItem 
            title="Calendar" 
            icon="calendar-month" 
            color="#3F51B5" 
            onPress={() => navigateToScreen('Calendar')} 
          />
          <MenuItem 
            title="Time Table" 
            icon="clock-outline" 
            color="#00BCD4" 
            onPress={() => {}} 
          />
          <MenuItem 
            title="Transport" 
            icon="bus-school" 
            color="#009688" 
            onPress={() => {}} 
          />
          <MenuItem 
            title="Gallery" 
            icon="image-multiple" 
            color="#607D8B" 
            onPress={() => {}} 
          />
        </View>
        
        <Text style={styles.sectionTitle}>Latest Announcements</Text>
        
        <View style={styles.announcementsContainer}>
          {notifications.map((notification) => (
            <View key={notification.id} style={styles.announcementCard}>
              <View style={[
                styles.notificationType, 
                { backgroundColor: notification.type === 'alert' ? '#FFE0E0' : '#E0F7FF' }
              ]}>
                <Icon 
                  name={notification.type === 'alert' ? 'alert' : 'message-text'} 
                  size={18} 
                  color={notification.type === 'alert' ? '#F44336' : '#03A9F4'} 
                />
              </View>
              <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>{notification.title}</Text>
                <Text style={styles.announcementText}>{notification.description}</Text>
                <Text style={styles.announcementDate}>
                  {new Date(notification.createdAt).toLocaleDateString()}
                </Text>
              </View>
              {!notification.read && <View style={styles.unreadIndicator} />}
            </View>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 14,
    color: '#718096',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: '#F44336',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  studentCard: {
    backgroundColor: '#00AAC8',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  studentClass: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  studentId: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#4A5568',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 24,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 12,
    color: '#4A5568',
    textAlign: 'center',
  },
  announcementsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationType: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  announcementText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00AAC8',
    marginLeft: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  }
});

export default DashboardScreen;
