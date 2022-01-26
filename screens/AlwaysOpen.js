import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Modalize } from "react-native-modalize";
// import faker from 'faker';

import { Button } from "../components/button/Button";

import tw from "twrnc";
export const AlwaysOpen = () => {
  const modalizeRef = useRef(null);

  const window = useWindowDimensions();
  const windowHeight = useWindowDimensions().height;

  const handleClose = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.close(dest);
    }
  };

  const handleOpen = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.open(dest);
    }
  };

  const renderContent = () => [
    <View style={s.content__header} key="0">
      <Text onPress={() => handleOpen("top")} style={s.content__heading}>
        BAO Borough
      </Text>
      <Text onPress={() => handleOpen("top")} style={s.content__subheading}>
        3 rewards available
      </Text>
    </View>,

    <View style={s.content__inside} key="1">
      {/* <Text style={s.content__paragraph}>{faker.lorem.paragraphs(4)}</Text>
      <Text style={[s.content__subheading, { marginTop: 30 }]}>Horizontal ScrollView</Text> */}

      {/* <Text style={s.content__subheading}>{'Introduction'.toUpperCase()}</Text> */}
      {/* <Text style={s.content__heading}>Always open modal!</Text> */}

      <Button name="Open" onPress={() => handleOpen("top")} />
      <Button
        name="Close to initial position"
        onPress={() => handleClose("alwaysOpen")}
      />
      <Button name="Close completely" onPress={handleClose} />

      <Text style={{ ...s.content__description, ...tw`text-red-700` }}>
        {/* {faker.lorem.paragraphs(8)} */}
        123 12381273891273 siouadfhajksdhf kjhjkas dfhjkasdh fjka
      </Text>

      {/* <ScrollView style={s.content__scrollview} horizontal>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <View key={i} style={s.content__block} />
          ))}
      </ScrollView> */}
    </View>,
    // <View style={s.content}>
    //   <Text style={s.content__subheading}>{'Introduction'.toUpperCase()}</Text>
    //   <Text style={s.content__heading}>Always open modal!</Text>
    //   <Button name="Open" onPress={() => handleOpen('top')} />
    //   <Button name="Close to initial position" onPress={() => handleClose('alwaysOpen')} />
    //   <Button name="Close completely" onPress={handleClose} />
    //   <Text style={s.content__description}>{faker.lorem.paragraph()}</Text>
    //   <Text style={s.content__description}>{faker.lorem.paragraph()}</Text>
    // </View>
  ];

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={s.content__modal}
      // modalStyle={tw`shadow-black shadow-xl`}
      alwaysOpen={150}
      modalHeight={windowHeight - 150}
      handlePosition="inside"
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        stickyHeaderIndices: [0],
      }}
    >
      {renderContent()}
    </Modalize>
  );
};

const s = StyleSheet.create({
  content: {
    padding: 20,
  },

  content__modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
  },

  content__heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  content__header: {
    padding: 15,
    paddingBottom: 0,

    backgroundColor: "rgba(255, 255, 255, 1)", //'rgba(255, 255, 255, 0.85)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  // content__heading: {
  //   marginBottom: 2,

  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: '#333',
  // },

  content__subheading: {
    marginBottom: 20,

    fontSize: 16,
    color: "#ccc",
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  content__scrollview: {
    marginVertical: 20,
  },

  content__block: {
    width: 200,
    height: 80,

    marginRight: 20,

    backgroundColor: "#ccc",
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 10,

    width: "100%",

    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#cdcdcd",
    borderRadius: 6,
  },
});
