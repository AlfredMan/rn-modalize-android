import React, { forwardRef, useReducer, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
// Also checkout formik &&  validatejs
import tw from "tailwind-rn";
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const FOCUS = "FOCUS";
const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    case FOCUS:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};
//export default function Input(props) {
const Input = forwardRef((props: any, ref) => {
  let colorScheme = useColorScheme();
  const is_mounted_ref = useRef<boolean | null>(null);

  useEffect(() => {
    //console.log("b1");
    is_mounted_ref.current = true;
    return () => {
      //console.log("xb1");
      is_mounted_ref.current = false;
    };
  });
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;
  useEffect(() => {
    //console.log("c1");
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
    return () => {
      //console.log("xc1");
      //is_mounted_ref.current = false;
    };
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text: string) => {
    if (!is_mounted_ref.current) return;
    //console.log("a", text);
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && (!text || text.trim().length === 0)) {
      isValid = false;
    }
    if (props.email && text && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && text && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && text && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };
  const lostFocusHandler = (event) => {
    if (!is_mounted_ref.current) return;
    //console.log("yc");
    // // console.log(event)
    // console.log(event.nativeEvent.text)
    // textChangeHandler(event.nativeEvent.text);
    dispatch({ type: INPUT_BLUR });
  };
  const focusHandler = (event: any) => {
    //console.log("fff");
    if (!is_mounted_ref.current) return;
    //console.log("focus", event.nativeEvent.text);
    textChangeHandler(event.nativeEvent.text);
    dispatch({ type: FOCUS });
  };

  return (
    <View style={styles.formControl}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            // ...styles.label,
            ...tw('my-2 flex flex-col'),
            ...props.labelStyle,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          {props.label}
        </Text>
        {props.buttonsRight && props.buttonsRight}
      </View>

      {!props.view_only && !props.hide_field && (
        <TextInput
          ref={ref}
          {...props}
          style={{ ...tw("py-0 bg-white h-6 px-2 justify-center items-center"), ...props.valueStyle }}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onFocus={focusHandler}
          onBlur={lostFocusHandler}
          onSubmitEditing={props.onSubmitEditing}
          placeholder={props.placeholder}
        ></TextInput>
      )}
      {props.view_only && !props.hide_field && (
        <View style={{ ...styles.viewOnlyValueContainer }}>
          <Text style={{ ...styles.viewOnlyValue, ...props.valueStyle }}>
            {props.initialValue}
          </Text>
        </View>
      )}
      {!inputState.isValid && inputState.touched && !props.hide_field && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  // label: {
  //   //    fontFamily:'open-sans-bold',
  //   marginVertical: 8,
  //   flex: 1,
  // },
  viewOnlyValueContainer: {
    //fontFamily: "notoSansHK-Regular",
    //paddingVertical: 5,
    backgroundColor: "#F7F7F7",
    //backgroundColor: "green",
    height: 50,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    //textAlignVertical: "center",
  },
  viewOnlyValue: {
    // fontFamily: "notoSansHK-Regular",
    textAlignVertical: "center",
    color: "rgba(0,0,0,0.5)",
    //borderBottomColor: "#ccc",
    //borderBottomWidth: 1,
  },
  // input: {
  //   // fontFamily: "notoSansHK-Regular",
  //   paddingVertical: 5,
  //   backgroundColor: "#F7F7F7",
  //   height: 50,
  //   paddingHorizontal: 15,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlignVertical: "center",
  //   //borderBottomColor: "#ccc",
  //   //borderBottomWidth: 1,
  // },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    //    fontFamily:'open-sans',
    color: "red",
    fontSize: 13,
  },
});
