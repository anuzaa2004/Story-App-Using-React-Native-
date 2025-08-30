// screens/StorySelectionScreen.jsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StorySelectionScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Pick Your Tale</Text>
        {/* This button now only navigates to the Story screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Story')}>
          <ImageBackground source= {require('../assets/images/coverImage.png')} style={styles.storyCard} imageStyle={{ borderRadius: 20 }}>
            <Text style={styles.storyTitle}>The Lantern in the Woods</Text>
          </ImageBackground>
        </TouchableOpacity>
      
        <Text style={styles.sectionHeader}>New Tales (Coming Soon)</Text>
        <TouchableOpacity >
        <ImageBackground source= {require('../assets/images/coverImage2.png')} style={styles.storyCard} imageStyle={{ borderRadius: 20 }}>
            <Text style={styles.storyTitle}>The Girl Who Stepped Through</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#4A148C' },
    header: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginVertical: 20 },
    storyCard: { height: 200, justifyContent: 'flex-end', padding: 20, marginHorizontal: 20, marginBottom: 20 },
    storyTitle: { fontSize: 28, color: 'white', fontWeight: 'bold', textAlign: 'center' },
    tutorialButton: { flexDirection: 'row', backgroundColor: '#3A006A', borderRadius: 15, padding: 20, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between' },
    tutorialText: { color: 'white', fontSize: 16, flex: 1 },
    sectionHeader: { fontSize: 24, fontWeight: 'bold', color: 'white', margin: 20, marginTop: 30 },
});

export default StorySelectionScreen;