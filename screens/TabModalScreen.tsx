// import * as React from 'react';
// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
// import { RootTabScreenProps } from '../types';

// export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabOneScreen.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
import { RootTabScreenProps } from '../types';

import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import { Portal } from 'react-native-portalize';

// import { Layout } from '../components/layout/Layout';
// import { Header } from '../components/header/Header';
// import { Button } from '../components/button/Button';
// import { AbsoluteHeader } from '../components/modals/AbsoluteHeader';
// import { SimpleContent } from '../components/modals/SimpleContent';
// import { FixedContent } from '../components/modals/FixedContent';
// import { SnappingList } from '../components/modals/SnappingList';
// import { FlatList } from '../components/modals/FlatList';
// import { SectionList } from '../components/modals/SectionList';
// import { AppleMusicPlayer } from '../components/modals/AppleMusicPlayer';
// import { FacebookWebView } from '../components/modals/FacebookWebView';
// import { SlackTabView } from '../components/modals/SlackTabView';

import { Host } from 'react-native-portalize';
import { AlwaysOpen } from './AlwaysOpen';

// export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabOneScreen.tsx" />
//     </View>
//   );
// }

// export const ExamplesScreen = () => {
export default function TabModalScreen({ navigation }: RootTabScreenProps<'TabModalScreen'>) {

  const modals = Array.from({ length: 8 }).map(_ => useRef(null).current);
  const animated = useRef(new Animated.Value(0)).current;


  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* <Host> */}
      {/* <Layout
        // Style here is used to create the iOS 13 modal presentation style for the AppleMusicPlayer example
        style={{
          borderRadius: animated.interpolate({ inputRange: [0, 1], outputRange: [0, 12] }),
          transform: [
            {
              scale: animated.interpolate({ inputRange: [0, 1], outputRange: [1, 0.92] }),
            },
          ],
          opacity: animated.interpolate({ inputRange: [0, 1], outputRange: [1, 0.75] }),
        }}
      > */}

        <AlwaysOpen />
      {/* </Layout> */}
      {/* </Host> */}
    </View>
  );
};
