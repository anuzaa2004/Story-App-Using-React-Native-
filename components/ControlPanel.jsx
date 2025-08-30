// components/ControlPanel.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const ControlPanel = ({
  isPlaying,
  isFlashlightOn,
  speed, 
  onTogglePlayPause,
  onToggleFlashlight,
  onSpeedChange, 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Ionicons name="speedometer-outline" size={24} color="#ccc" />
        <Slider
          style={styles.slider}
          minimumValue={20} 
          maximumValue={100} 
          step={5}
          value={speed}
          onValueChange={onSpeedChange}
          minimumTrackTintColor="#31B454"
          maximumTrackTintColor="#555"
          thumbTintColor="#FFF"
        />
        <Text style={styles.speedText}>{speed.toFixed(0)}</Text>
      </View>

      {/* Main Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onToggleFlashlight} style={styles.button}>
          <Ionicons name={isFlashlightOn ? 'flash-off' : 'flash'} size={28} color={isFlashlightOn ? '#FFD700' : 'white'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onTogglePlayPause} style={styles.playButton}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="#000" />
        </TouchableOpacity>

        {/* Placeholder for another button */}
        <View style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingTop: 15,
    paddingBottom: 30, 
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  speedText: {
    color: 'white',
    fontSize: 16,
    width: 30,
    textAlign: 'right',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default ControlPanel;
