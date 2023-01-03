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
  const [calculator, setCalculator] = useState({ input: 0.0 });

  const print = () => {
    console.log(calculator);
  };

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
      <SafeAreaView style={styles.container}>
        <TextInput
          keyboardType="numeric"
          returnKeyType="done"
          style={styles.inputText}
          onChangeText={(value) => onInputChange(value)}
          value={calculator.input.toString()}
        ></TextInput>

        <TouchableOpacity onPress={() => print()}>
          <Text style={styles.text}>print</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => reset()}>
          <Text style={styles.text}>reset</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onOperatorClicked("+")}>
          <Text style={styles.text}> + </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onOperatorClicked("-")}>
          <Text style={styles.text}> - </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onOperatorClicked("x")}>
          <Text style={styles.text}> x </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onOperatorClicked("/")}>
          <Text style={styles.text}> / </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPercentageClicked()}>
          <Text style={styles.text}> % </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onEqualsClicked()}>
          <Text style={styles.text}> = </Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          {calculator.operand1} {calculator.operator} {calculator.operand2}
        </Text>

        <StatusBar style="light" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  text: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 50,
    borderWidth: 1,
    borderColor: "#fff",
    minWidth: 50,
    margin: 3,
    textAlign: "center",
  },

  inputText: {
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    minWidth: 200,
    fontSize: 40,
    margin: 30,
  },
});
