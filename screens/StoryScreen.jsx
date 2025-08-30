
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { Camera, CameraView } from "expo-camera";
import { useKeepAwake } from "expo-keep-awake";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";

const storyData = {
  title: "The Lantern in the Woods",
  narrationAsset: require("../assets/audio/narration.mp3"),
  musicAsset: require("../assets/audio/music.mp3"),
  content: `Once upon a time, in a forest deep and dark, lived a little firefly named Flicker. Flicker was not like the other fireflies. While they loved to dance in big, bright groups, Flicker loved to explore alone. One evening, a thick fog rolled into the forest. It was so thick you couldn't see your own wings. The other fireflies huddled together, their lights a small beacon in the gloom. But Flicker was far away, exploring an old, hollow log. When he came out, he was lost. The fog was everywhere. He tried to shine his light, but it was just a tiny pinprick in the vast, grey blanket. He felt a little scared. Suddenly, he heard a soft rustling. A small mouse with wide, worried eyes peeked out from behind a mushroom. "Are you lost too?" whispered the mouse. Flicker nodded his tiny head. "I know a way," said the mouse, "but it's very dark. I wish we had a lantern." Flicker had an idea. He flew right in front of the mouse's nose and shone his light as brightly as he could. "I can be your lantern!" he buzzed. So, with Flicker lighting the way, the little mouse led them through winding paths and under twisted roots. They met a sleepy owl who hooted a greeting, and a family of badgers who waved their paws. Finally, they saw a warm, gentle glow through the fog. It was the other fireflies! They cheered when they saw Flicker. The mouse squeaked a happy goodbye and scurried back to his family. Flicker learned that even a small light can make a big difference, and sometimes, the best adventures happen when you help a friend find their way home. From that day on, he was known as Flicker, the bravest lantern in the woods.`,
};

const StoryScreen = () => {
  
  useKeepAwake();

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(40);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(null);

  
  const recordingRef = useRef(null);
  const scrollViewRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const narrationSoundRef = useRef(null);
  const musicSoundRef = useRef(null);
  const animationFrameRef = useRef(null);
  const speedRef = useRef(speed);

  

  
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      setHasMicrophonePermission(audioStatus === 'granted');
    })();
  }, []);

  // Load and unload all audio assets
  useEffect(() => {
    const loadSounds = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound: narrationSound } = await Audio.Sound.createAsync(
          storyData.narrationAsset,
          { shouldPlay: false, volume: 1.0 }
        );
        narrationSoundRef.current = narrationSound;

        const { sound: musicSound } = await Audio.Sound.createAsync(
          storyData.musicAsset,
          { shouldPlay: false, isLooping: true, volume: 0.3 }
        );
        musicSoundRef.current = musicSound;
      } catch (error) {
        console.error("Error loading sounds:", error);
        Alert.alert("Audio Error", "Could not load the story's audio files.");
      }
    };

    loadSounds();

    
    return () => {
      narrationSoundRef.current?.unloadAsync();
      musicSoundRef.current?.unloadAsync();
      recordingRef.current?.unloadAsync();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

 

  //  auto-scroll animation loop
  const scrollLoop = () => {
    scrollPositionRef.current += speedRef.current / 60;
    scrollViewRef.current?.scrollTo({
      y: scrollPositionRef.current,
      animated: false,
    });
    animationFrameRef.current = requestAnimationFrame(scrollLoop);
  };

  // Play or pause 
  const handleTogglePlayPause = async () => {
    if (isRecording) {
      Alert.alert("Recording in Progress", "Please stop recording before playing the story.");
      return;
    }
    if (isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      await narrationSoundRef.current?.pauseAsync();
      await musicSoundRef.current?.pauseAsync();
    } else {
      await narrationSoundRef.current?.playAsync();
      await musicSoundRef.current?.playAsync();
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    }
    setIsPlaying(!isPlaying);
  };

  
  const handleToggleFlashlight = () => {
    if (!hasCameraPermission) {
      Alert.alert("Permission needed", "Camera permission is required to use the flashlight.");
      return;
    }
    setIsFlashlightOn((prev) => !prev);
  };

  // Start or stop audio recording
  const handleToggleRecording = async () => {
    if (isRecording) {
      // Stop Recording
      console.log('Stopping recording..');
      setIsRecording(false);
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      console.log('Recording stopped and stored at', uri);
      Alert.alert("Recording Finished", `Your recording has been saved.`);
      recordingRef.current = null;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    } else {
      // Start Recording
      if (!hasMicrophonePermission) {
        Alert.alert("Permission needed", "Microphone permission is required to record audio.");
        return;
      }
      if (isPlaying) {
        await handleTogglePlayPause(); // Pause story playing
      }
      try {
        console.log('Starting recording..');
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
           Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        recordingRef.current = recording;
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recording', err);
        Alert.alert("Error", "Could not start recording.");
      }
    }
  };

  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      
        <CameraView
          style={styles.camera}
          enableTorch={isFlashlightOn}
        />
      

      {/* Scrolling Story Text */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.storyContainer}
        scrollEnabled={false}
      >
        <Text style={styles.storyText}>{storyData.content}</Text>
      </ScrollView>

      {/* Control Panel */}
      <View style={styles.controlPanelContainer}>
        {/* Speed Slider */}
        <View style={styles.sliderContainer}>
          <Ionicons name="speedometer-outline" size={24} color={colors.text} />
          <Slider
            style={styles.slider}
            minimumValue={20}
            maximumValue={100}
            step={5}
            value={speed}
            onValueChange={setSpeed}
            minimumTrackTintColor={colors.accent}
            maximumTrackTintColor={colors.uiElement}
            thumbTintColor={colors.accent}
          />
          <Text style={styles.speedText}>{speed.toFixed(0)}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleToggleFlashlight} style={styles.button}>
            <Ionicons
              name={isFlashlightOn ? "flash-off" : "flash"}
              size={28}
              color={isFlashlightOn ? colors.accent : colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleTogglePlayPause} style={styles.playButton}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={40}
              color={colors.background}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleToggleRecording}
            style={[styles.button, isRecording && styles.recordingButton]}
          >
            <Ionicons
              name="mic"
              size={28}
              color={isRecording ? 'white' : colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



const colors = {
  background: '#0A192F',      
  text: '#E0E0E0',             
  accent: '#FFC107',           
  uiElement: '#172A45',       
  recordingRed: '#E53935',     
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  camera: {
    width: 1,
    height: 1,
    position: "absolute",
    top: -10,
    left: -10
  },
  storyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  storyText: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 40
  },
  controlPanelContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(10, 25, 47, 0.85)",
    paddingTop: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10
  },
  speedText: {
    color: colors.text,
    fontSize: 16,
    width: 30,
    textAlign: "right"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.uiElement,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
  },
  recordingButton: {
    backgroundColor: colors.recordingRed,
  },
});

export default StoryScreen;