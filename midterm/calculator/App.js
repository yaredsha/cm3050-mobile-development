import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const windowWidth = Dimensions.get("window").width;
  const buttonWidth = windowWidth / 4.8;

  const [calculator, setCalculator] = useState({ input: 32 });

  const reset = () => {
    const calculatorUpdated = {
      operand1: undefined,
      operand2: undefined,
      operator: undefined,
      input: 0.0,
    };

    update(calculatorUpdated);
  };

  const onInputChange = (value) => {
    const calculatorUpdated = { ...calculator };
    calculatorUpdated.input = !value || isNaN(value) ? 0.0 : parseFloat(value);
    update(calculatorUpdated);
  };

  const onOperatorClicked = (operator) => {
    const calculatorUpdated = { ...calculator };
    calculatorUpdated.operand1 = calculatorUpdated.input;
    calculatorUpdated.operator = operator;

    update(calculatorUpdated);
  };

  const onPercentageClicked = () => {
    const calculatorUpdated = { ...calculator };
    const per = calculatorUpdated.input / 100;

    if (calculatorUpdated.operator != undefined) {
      const value = calculatorUpdated.operand1 * per;
      calculatorUpdated.operand2 = value;
      calculatorUpdated.input = value;
    } else {
      calculatorUpdated.input = per;
    }

    update(calculatorUpdated);
  };

  const onEqualsClicked = () => {
    const calculatorUpdated = { ...calculator };

    if (calculatorUpdated.operator != undefined) {
      if (calculatorUpdated.operand2 === undefined) {
        calculatorUpdated.operand2 = calculatorUpdated.input;
      }

      const { operand1, operator, operand2 } = calculatorUpdated;

      let result = calculatorUpdated.input;

      switch (operator) {
        case "+":
          result = operand1 + operand2;
          break;
        case "-":
          result = operand1 - operand2;
          break;
        case "x":
          result = operand1 * operand2;
          break;
        case "/":
          if (operand2 == 0) {
            result = "Error";
          } else {
            result = operand1 / operand2;
          }

          break;
      }

      calculatorUpdated.input = result;

      if (!isNaN(result)) {
        calculatorUpdated.operand1 = result;
      }

      update(calculatorUpdated);
    }
  };

  const update = (calculatorUpdated) => {
    setCalculator((calculator) => ({
      ...calculator,
      ...calculatorUpdated,
    }));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, styles.safeArea]}>
        <Text
          style={styles.resultField}
          onChangeText={(value) => onInputChange(value)}
        >
          {calculator.input.toString()}
        </Text>

        {/* row #1 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button(1, buttonWidth)}>
            <Text style={styles.blackText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(1, buttonWidth)}>
            <Text style={styles.blackText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(1, buttonWidth)}>
            <Text style={styles.blackText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(2, buttonWidth)}>
            <Text style={styles.whiteText}>/</Text>
          </TouchableOpacity>
        </View>

        {/* row #2 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(2, buttonWidth)}>
            <Text style={styles.whiteText}>x</Text>
          </TouchableOpacity>
        </View>

        {/* row #3 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(2, buttonWidth)}>
            <Text style={styles.whiteText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* row #4 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(2, buttonWidth)}>
            <Text style={styles.whiteText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* row #5 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button(3, buttonWidth)}>
            <Text style={styles.whiteText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button(0, buttonWidth)}>
            <Text style={styles.whiteText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button(2, buttonWidth)}>
            <Text style={styles.whiteText}>=</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light" />
      </SafeAreaView>
    </View>
  );
}

const baseText = {
  fontSize: "30%",
  fontWeight: "500",
  textAlign: "center",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  safeArea: {
    margin: 20,
  },

  resultField: {
    fontSize: "70%",
    color: "#fff",
    borderColor: "#fff",
    minWidth: "100%",
    textAlign: "right",
  },

  row: {
    flexDirection: "row",
  },

  button: (type, width) => {
    const bgColor = type == 1 ? "#A6A6A6" : type == 2 ? "#0984E3" : "#333333";
    const w = type == 3 ? width * 2 : width;

    return {
      width: w,
      height: width,
      borderRadius: width / 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bgColor,
      margin: 5,
    };
  },

  whiteText: {
    color: "#fff",
    ...baseText,
  },

  blackText: {
    color: "#000",
    ...baseText,
  },
});
