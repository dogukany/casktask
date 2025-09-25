# CaskTask

CaskTask is a React Native/Expo application that uses Firebase push notification system. It allows you to send and receive text, image, and video notifications.

## Features

- Cross-platform (iOS & Android)
- Push Notification support (Firebase Cloud Messaging)
- 3 different notification types:
  - Text notifications
  - Image notifications 
  - Video notifications (YouTube integration)
- Notification history and management
- Modern UI/UX design
- Dark/Light mode support

## Requirements

- Node.js 18 or higher
- Yarn package manager
- Expo CLI
- iOS: Xcode and iOS Simulator
- Android: Android Studio and Android emulator/device

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd casktask
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Run prebuild

```bash
npx expo prebuild
```

This command creates native iOS and Android folders and prepares Firebase configurations.

### 4. Pod installation for iOS

```bash
cd ios && pod install && cd ..
```

## Running the App

### Android

```bash
yarn run android
```

### iOS

```bash
yarn run ios
```

### Web (Development)

```bash
yarn start --web
```

## Configuration

### Firebase Setup

The project uses Firebase Cloud Messaging. The following files should be added to the project:

- `GoogleService-Info.plist` (for iOS)
- `google-services.json` (for Android)

### Notification Permissions

The app automatically requests notification permissions. Required configurations are available in `Info.plist` for iOS and `AndroidManifest.xml` for Android.

## App Structure

```
src/
├── app/                    # Expo Router pages
├── components/            # Reusable components
├── constants/             # Constants
├── hooks/                 # Custom hooks
├── lib/                   # Utility functions and types
├── screens/               # Main screen components
├── service/               # API and Firebase services
└── index.ts              # Application entry point
```

## Key Features

### Notification Types

1. **Text Notifications**: Simple text messages
2. **Image Notifications**: Notifications displaying images via URL
3. **Video Notifications**: Video playback with YouTube video links

### Screens

- **Home**: Welcome screen
- **Send**: Notification sending form (text, image, video)
- **Notification Details**: Custom detail screens for each notification type (text, image, video)

## Development

### Linting

```bash
yarn lint
```

### TypeScript Check

The project is written with full TypeScript support. For type checking:

```bash
npx tsc --noEmit
```

## Key Dependencies

- **Expo SDK 54**: Cross-platform development framework
- **React Native Firebase**: Firebase integration
- **Expo Router**: File-based navigation
- **React Query**: State management and API calls
- **React Native Paper**: UI components
- **MMKV**: Fast key-value storage
- **YouTube Player**: Video playback

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear cache: `yarn start --clear`
2. Reinstall node modules: `rm -rf node_modules && yarn install`
3. For iOS: `cd ios && pod install && cd ..`

### Firebase Issues

For Firebase configuration issues:

1. Make sure `GoogleService-Info.plist` and `google-services.json` files are in the correct locations
2. Verify that Bundle IDs match with Firebase console

