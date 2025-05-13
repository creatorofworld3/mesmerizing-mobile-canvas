
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../context/AppContext';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarDayProps {
  date: Date;
  status?: 'present' | 'absent' | 'late' | undefined;
  isCurrentMonth: boolean;
  onPress: () => void;
}

const CalendarDay = ({ date, status, isCurrentMonth, onPress }: CalendarDayProps) => {
  let backgroundColor = 'transparent';
  let textColor = isCurrentMonth ? '#2D3748' : '#CBD5E0';
  
  if (status) {
    switch (status) {
      case 'present':
        backgroundColor = '#C6F6D5';
        textColor = '#22543D';
        break;
      case 'absent':
        backgroundColor = '#FED7D7';
        textColor = '#822727';
        break;
      case 'late':
        backgroundColor = '#FEEBC8';
        textColor = '#744210';
        break;
    }
  }

  const isToday = new Date().toDateString() === date.toDateString();
  
  return (
    <TouchableOpacity 
      style={[
        styles.calendarDay, 
        { backgroundColor },
        isToday && styles.today
      ]} 
      onPress={onPress}
    >
      <Text style={[styles.dayText, { color: textColor }]}>
        {date.getDate()}
      </Text>
      
      {status && (
        <View style={styles.statusIndicator}>
          <Icon 
            name={
              status === 'present' ? 'check' : 
              status === 'absent' ? 'close' : 'clock-outline'
            } 
            size={12} 
            color={textColor} 
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const AttendanceScreen = () => {
  const { attendance, student } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'present' | 'absent' | 'late' | undefined>(undefined);
  const [selectedRemarks, setSelectedRemarks] = useState<string | undefined>(undefined);

  // Calculate current month's calendar days
  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      
      // Find attendance status for this date
      const dateString = date.toISOString().split('T')[0];
      const attendanceRecord = attendance.find(record => record.date === dateString);
      
      days.push({
        date,
        isCurrentMonth: true,
        status: attendanceRecord?.status,
        remarks: attendanceRecord?.remarks
      });
    }
    
    // Add days from next month to complete the last week
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  const calendarDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const previousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };
  
  const nextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
  const selectDay = (day: any) => {
    setSelectedDate(day.date);
    setSelectedStatus(day.status);
    setSelectedRemarks(day.remarks);
  };
  
  // Calculate statistics
  const totalDays = attendance.length;
  const presentDays = attendance.filter(record => record.status === 'present').length;
  const absentDays = attendance.filter(record => record.status === 'absent').length;
  const lateDays = attendance.filter(record => record.status === 'late').length;
  
  const attendancePercentage = totalDays > 0 
    ? Math.round((presentDays / totalDays) * 100) 
    : 0;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attendance</Text>
        <Text style={styles.studentName}>{student.name} | Class {student.class}</Text>
      </View>
      
      <ScrollView>
        <View style={styles.statisticsContainer}>
          <View style={[styles.statCard, styles.attendanceCard]}>
            <Text style={styles.statValue}>{attendancePercentage}%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          
          <View style={styles.statsRow}>
            <View style={[styles.statBox, styles.presentBox]}>
              <Text style={styles.statBoxValue}>{presentDays}</Text>
              <Text style={styles.statBoxLabel}>Present</Text>
            </View>
            
            <View style={[styles.statBox, styles.absentBox]}>
              <Text style={styles.statBoxValue}>{absentDays}</Text>
              <Text style={styles.statBoxLabel}>Absent</Text>
            </View>
            
            <View style={[styles.statBox, styles.lateBox]}>
              <Text style={styles.statBoxValue}>{lateDays}</Text>
              <Text style={styles.statBoxLabel}>Late</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={previousMonth}>
              <Icon name="chevron-left" size={24} color="#4A5568" />
            </TouchableOpacity>
            
            <Text style={styles.calendarTitle}>
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            
            <TouchableOpacity onPress={nextMonth}>
              <Icon name="chevron-right" size={24} color="#4A5568" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekdaysRow}>
            {WEEKDAYS.map(day => (
              <Text key={day} style={styles.weekdayText}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <CalendarDay 
                key={index}
                date={day.date}
                status={day.status}
                isCurrentMonth={day.isCurrentMonth}
                onPress={() => selectDay(day)}
              />
            ))}
          </View>
        </View>
        
        {selectedDate && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              {selectedDate.toDateString()}
            </Text>
            
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status:</Text>
              <View style={[
                styles.statusBadge,
                selectedStatus === 'present' && styles.presentBadge,
                selectedStatus === 'absent' && styles.absentBadge,
                selectedStatus === 'late' && styles.lateBadge,
              ]}>
                <Text style={styles.statusText}>
                  {selectedStatus ? selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) : 'No Record'}
                </Text>
              </View>
            </View>
            
            {selectedRemarks && (
              <View style={styles.remarksContainer}>
                <Text style={styles.remarksLabel}>Remarks:</Text>
                <Text style={styles.remarksText}>{selectedRemarks}</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#C6F6D5' }]} />
            <Text style={styles.legendText}>Present</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FED7D7' }]} />
            <Text style={styles.legendText}>Absent</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FEEBC8' }]} />
            <Text style={styles.legendText}>Late</Text>
          </View>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  studentName: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  statisticsContainer: {
    padding: 20,
  },
  statCard: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  attendanceCard: {
    backgroundColor: '#00AAC8',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  presentBox: {
    backgroundColor: '#C6F6D5',
  },
  absentBox: {
    backgroundColor: '#FED7D7',
  },
  lateBox: {
    backgroundColor: '#FEEBC8',
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statBoxLabel: {
    fontSize: 14,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  weekdaysRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  today: {
    borderWidth: 2,
    borderColor: '#00AAC8',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 4,
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#718096',
    marginRight: 8,
    width: 60,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  presentBadge: {
    backgroundColor: '#C6F6D5',
  },
  absentBadge: {
    backgroundColor: '#FED7D7',
  },
  lateBadge: {
    backgroundColor: '#FEEBC8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4A5568',
  },
  remarksContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  remarksLabel: {
    fontSize: 14,
    color: '#718096',
    marginRight: 8,
    width: 60,
  },
  remarksText: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#718096',
  },
});

export default AttendanceScreen;
