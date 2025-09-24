import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { styles } from './screen-header.styles';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ScreenHeader({ 
  title, 
  subtitle, 
  rightElement, 
  style 
}: ScreenHeaderProps) {
  return (
    <ThemedView style={[styles.header, style]}>
      <ThemedView style={styles.headerContent}>
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