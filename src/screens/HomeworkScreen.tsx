
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../context/AppContext';

type FilterType = 'all' | 'pending' | 'completed';

const HomeworkScreen = () => {
  const { homework, markHomeworkAsCompleted } = useAppContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedHomework, setSelectedHomework] = useState<string | null>(null);

  const filteredHomework = homework.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const handleMarkAsCompleted = (id: string) => {
    Alert.alert(
      "Mark as Completed",
      "Are you sure you want to mark this homework as completed?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => markHomeworkAsCompleted(id) }
      ]
    );
  };

  const toggleDetails = (id: string) => {
    setSelectedHomework(prevId => prevId === id ? null : id);
  };

  const pendingCount = homework.filter(item => !item.completed).length;
  const completedCount = homework.filter(item => item.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Homework</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>{homework.length}</Text>
          <Text style={styles.statsLabel}>Total</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={[styles.statsValue, { color: '#F59E0B' }]}>{pendingCount}</Text>
          <Text style={styles.statsLabel}>Pending</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={[styles.statsValue, { color: '#10B981' }]}>{completedCount}</Text>
          <Text style={styles.statsLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.activeFilterText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      {filteredHomework.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="book-open-variant" size={60} color="#CBD5E0" />
          <Text style={styles.emptyText}>No homework found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredHomework}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.homeworkList}
          renderItem={({ item }) => (
            <View style={styles.homeworkCard}>
              <TouchableOpacity
                style={styles.homeworkHeader}
                onPress={() => toggleDetails(item.id)}
              >
                <View style={styles.homeworkHeaderLeft}>
                  <View
                    style={[
                      styles.subjectBadge,
                      { backgroundColor: getSubjectColor(item.subject) }
                    ]}
                  >
                    <Text style={styles.subjectCode}>
                      {getSubjectInitials(item.subject)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.homeworkTitle}>{item.title}</Text>
                    <Text style={styles.homeworkSubject}>{item.subject}</Text>
                  </View>
                </View>
                <View style={styles.homeworkHeaderRight}>
                  <Text
                    style={[
                      styles.dueDate,
                      isOverdue(item.dueDate) && !item.completed && styles.overdue
                    ]}
                  >
                    Due: {formatDate(item.dueDate)}
                  </Text>
                  <Icon
                    name={selectedHomework === item.id ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#A0AEC0"
                  />
                </View>
              </TouchableOpacity>

              {selectedHomework === item.id && (
                <View style={styles.homeworkDetails}>
                  <Text style={styles.detailsTitle}>Description:</Text>
                  <Text style={styles.detailsText}>{item.description}</Text>
                  
                  {!item.completed && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => handleMarkAsCompleted(item.id)}
                    >
                      <Icon name="check" size={16} color="#FFFFFF" />
                      <Text style={styles.completeButtonText}>Mark as Completed</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <View style={styles.homeworkStatus}>
                {item.completed ? (
                  <View style={styles.completedBadge}>
                    <Icon name="check-circle" size={14} color="#10B981" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                ) : (
                  <View style={styles.pendingBadge}>
                    <Icon name="clock-outline" size={14} color="#F59E0B" />
                    <Text style={styles.pendingText}>Pending</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

// Helper functions
const getSubjectColor = (subject: string): string => {
  const subjectColors: Record<string, string> = {
    'Mathematics': '#3B82F6',
    'Science': '#10B981',
    'English': '#8B5CF6',
    'Social Studies': '#F59E0B',
    'Art': '#EC4899',
    'Physical Education': '#EF4444',
    'Music': '#6366F1',
    'Computer Science': '#14B8A6'
  };
  
  return subjectColors[subject] || '#A0AEC0';
};

const getSubjectInitials = (subject: string): string => {
  return subject.split(' ').map(word => word[0]).join('');
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const isOverdue = (dateString: string): boolean => {
  const dueDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dueDate < today;
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  statsLabel: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#EDF2F7',
  },
  activeFilter: {
    backgroundColor: '#00AAC8',
  },
  filterText: {
    color: '#4A5568',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#718096',
  },
  homeworkList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  homeworkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  homeworkHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeworkHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subjectCode: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeworkHeaderRight: {
    alignItems: 'flex-end',
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    marginBottom: 4,
  },
  homeworkSubject: {
    fontSize: 14,
    color: '#718096',
  },
  dueDate: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  overdue: {
    color: '#E53E3E',
  },
  homeworkDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  homeworkStatus: {
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FFFA',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
    fontWeight: '500',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  pendingText: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default HomeworkScreen;
