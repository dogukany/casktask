import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from './screen-header.styles';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ScreenHeader({ 
  title, 
  subtitle, 
  showBackButton,
  onBackPress,
  leftElement,
  rightElement, 
  style 
}: ScreenHeaderProps) {
  const router = useRouter();
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <ThemedView style={[styles.header, style]}>
      <ThemedView style={styles.headerContent}>
        {(showBackButton || leftElement) && (
          <ThemedView style={styles.headerLeft}>
            {showBackButton ? (
              <IconButton
                icon="arrow-left"
                size={24}
                onPress={handleBackPress}
                style={styles.backButton}
              />
            ) : (
              leftElement
            )}
          </ThemedView>
        )}
        <ThemedView style={styles.headerText}>
          <ThemedText style={styles.headerTitle}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.headerSubtitle}>{subtitle}</ThemedText>
          )}
        </ThemedView>
        {rightElement && (
          <ThemedView style={styles.headerRight}>
            {rightElement}
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}