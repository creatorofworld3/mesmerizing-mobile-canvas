
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'exam' | 'holiday' | 'event';
  color: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Sample events
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Mid-Term Examination',
    description: 'Mathematics paper from 9:00 AM to 11:00 AM in Hall A',
    date: new Date(2023, 4, 20), // May 20, 2023
    category: 'exam',
    color: '#F56565',
  },
  {
    id: '2',
    title: 'Science Project Submission',
    description: 'Submit science projects to Mr. Johnson by 3:00 PM',
    date: new Date(2023, 4, 22), // May 22, 2023
    category: 'event',
    color: '#ED8936',
  },
  {
    id: '3',
    title: 'Local Elections Holiday',
    description: 'School will remain closed due to local elections',
    date: new Date(2023, 4, 15), // May 15, 2023
    category: 'holiday',
    color: '#38B2AC',
  },
  {
    id: '4',
    title: 'Annual Sports Day',
    description: 'Students should wear sports uniform and report at 8:00 AM',
    date: new Date(2023, 4, 25), // May 25, 2023
    category: 'event',
    color: '#4299E1',
  },
  {
    id: '5',
    title: 'Parent-Teacher Meeting',
    description: 'Discuss academic progress and collect report cards',
    date: new Date(2023, 4, 28), // May 28, 2023
    category: 'event',
    color: '#9F7AEA',
  }
];

const CalendarDay = ({ date, events, isCurrentMonth, isSelected, onSelectDate }: {
  date: Date;
  events: Event[];
  isCurrentMonth: boolean;
  isSelected: boolean;
  onSelectDate: (date: Date) => void;
}) => {
  const isToday = new Date().toDateString() === date.toDateString();
  const hasEvents = events.length > 0;
  
  return (
    <TouchableOpacity 
      style={[
        styles.calendarDay,
        isSelected && styles.selectedDay,
        isToday && !isSelected && styles.today
      ]}
      onPress={() => onSelectDate(date)}
    >
      <Text style={[
        styles.dayNumber,
        !isCurrentMonth && styles.otherMonthDay,
        isSelected && styles.selectedDayText
      ]}>
        {date.getDate()}
      </Text>
      
      {hasEvents && (
        <View style={styles.eventDotsContainer}>
          {events.slice(0, 3).map((event, index) => (
            <View 
              key={index} 
              style={[styles.eventDot, { backgroundColor: event.color }]} 
            />
          ))}
          {events.length > 3 && <View style={[styles.eventDot, { backgroundColor: '#CBD5E0' }]} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const categoryIcons = {
    'exam': 'pencil',
    'holiday': 'beach',
    'event': 'calendar-star',
  };
  
  return (
    <View style={[styles.eventCard, { borderLeftColor: event.color }]}>
      <View style={styles.eventHeader}>
        <View style={[styles.categoryContainer, { backgroundColor: `${event.color}20` }]}>
          <Icon name={categoryIcons[event.category]} size={14} color={event.color} />
          <Text style={[styles.categoryText, { color: event.color }]}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Text>
        </View>
        <Text style={styles.eventTime}>
          {event.date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
        </Text>
      </View>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
    </View>
  );
};

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Get days of current month view
  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      days.push({
        date,
        isCurrentMonth: false
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true
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
  
  const calendarDays = getDaysInMonth(currentYear, currentMonth);
  
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
  
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Filter events for selected date
  const selectedDateEvents = sampleEvents.filter(event => 
    event.date.toDateString() === selectedDate.toDateString()
  );
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter(event => event.date.toDateString() === date.toDateString());
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>School Calendar</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={previousMonth}>
              <Icon name="chevron-left" size={24} color="#4A5568" />
            </TouchableOpacity>
            
            <Text style={styles.calendarTitle}>
              {MONTHS[currentMonth]} {currentYear}
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
          
          <View style={styles.daysContainer}>
            {calendarDays.map((day, index) => (
              <CalendarDay 
                key={index}
                date={day.date}
                events={getEventsForDate(day.date)}
                isCurrentMonth={day.isCurrentMonth}
                isSelected={day.date.toDateString() === selectedDate.toDateString()}
                onSelectDate={handleSelectDate}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
          
          {selectedDateEvents.length === 0 ? (
            <View style={styles.noEventsContainer}>
              <Icon name="calendar-blank" size={50} color="#CBD5E0" />
              <Text style={styles.noEventsText}>No events scheduled for this day</Text>
            </View>
          ) : (
            <FlatList
              data={selectedDateEvents}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <EventCard event={item} />}
              scrollEnabled={false}
            />
          )}
        </View>
        
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legend</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <Icon name="pencil" size={14} color="#F56565" />
              <Text style={styles.legendText}>Exam</Text>
            </View>
            <View style={styles.legendItem}>
              <Icon name="beach" size={14} color="#38B2AC" />
              <Text style={styles.legendText}>Holiday</Text>
            </View>
            <View style={styles.legendItem}>
              <Icon name="calendar-star" size={14} color="#4299E1" />
              <Text style={styles.legendText}>Event</Text>
            </View>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  weekdaysRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#A0AEC0',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  selectedDay: {
    backgroundColor: '#00AAC8',
    borderRadius: 25,
  },
  today: {
    backgroundColor: 'rgba(0, 170, 200, 0.1)',
    borderRadius: 25,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  otherMonthDay: {
    color: '#CBD5E0',
  },
  eventDotsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    height: 6,
    justifyContent: 'center',
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  eventsContainer: {
    margin: 16,
    marginTop: 0,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  noEventsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  noEventsText: {
    marginTop: 16,
    fontSize: 16,
    color: '#A0AEC0',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 12,
    color: '#718096',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  legendContainer: {
    margin: 16,
    marginBottom: 32,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  legendText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 8,
  },
});

export default CalendarScreen;
