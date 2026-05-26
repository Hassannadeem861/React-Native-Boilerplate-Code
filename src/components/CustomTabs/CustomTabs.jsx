import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const CustomTabs = ({
  tabs = [],
  activeTab = 0,
  onTabChange,
  containerStyle,
}) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const [tabWidths, setTabWidths] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeTab !== selectedTab) {
      setSelectedTab(activeTab);
      if (isInitialized) animateSlider(activeTab);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isInitialized]);

  useEffect(() => {
    if (tabWidths.length === tabs.length && tabWidths.every(w => w > 0) && !isInitialized) {
      let pos = 0;
      for (let i = 0; i < activeTab; i++) pos += tabWidths[i] || 0;
      slideAnim.setValue(pos);
      setIsInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabWidths, activeTab, isInitialized]);

  const animateSlider = index => {
    let pos = 0;
    for (let i = 0; i < index; i++) pos += tabWidths[i] || 0;
    Animated.timing(slideAnim, {
      toValue: pos,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleTabPress = index => {
    setSelectedTab(index);
    if (isInitialized) animateSlider(index);
    if (onTabChange) onTabChange(index);
  };

  const handleTabLayout = (event, index) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths(prev => {
      const next = [...prev];
      next[index] = width;
      return next;
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Sliding active background */}
      {isInitialized && (
        <Animated.View
          style={[
            styles.activeBackground,
            {
              width: tabWidths[selectedTab] || 0,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />
      )}

      {tabs.map((tab, index) => {
        const isActive = index === selectedTab;
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}
            onLayout={e => handleTabLayout(e, index)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {typeof tab === 'string' ? tab : tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: `${colors.parrot}22`, // Light parrot background
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.parrot,
    borderRadius: 10,
    top: 0,
    left: 0,
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: 15,
    fontFamily: FONTS.display_regular,
    color: colors.parrot,
  },
  activeTabText: {
    fontFamily: FONTS.display_bold,
    color: colors.white,
  },
});

