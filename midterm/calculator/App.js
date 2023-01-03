import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [calculator, setCalculator] = useState({ operand1: 0.0 });

  const print = () => {
    console.log(calculator);
  };

  const reset = () => {
    const calculatorUpdated = {
      operand1: 0.0,
      operand2: undefined,
      operator: undefined,
      result: undefined,
    };

    update(calculatorUpdated);
  };

  const onOperatorClicked = (operator, operand1) => {
    const calculatorUpdated = { ...calculator };
    calculatorUpdated.operand1 = operand1;
    calculatorUpdated.operator = operator;

    update(calculatorUpdated);
  };

  const onEqualsClicked = (operand2) => {
    const calculatorUpdated = { ...calculator };

    if (calculatorUpdated.operator != undefined) {
      calculatorUpdated.operand2 = operand2;

      const { operand1, operator } = calculatorUpdated;

      switch (operator) {
        case "+":
          calculatorUpdated.result = operand1 + operand2;
          break;
        case "-":
          calculatorUpdated.result = operand1 - operand2;
          break;
        case "x":
          calculatorUpdated.result = operand1 * operand2;
          break;
        case "/":
          if (operand2 == 0) {
            // TODO throw error
            console.log("can't divide with 0");
          }
          calculatorUpdated.result = operand1 / operand2;
          break;
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
      <TouchableOpacity onPress={() => print()}>
        <Text style={styles.text}>print</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => reset()}>
        <Text style={styles.text}>reset</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onOperatorClicked("+", 8)}>
        <Text style={styles.text}>click 8+</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onOperatorClicked("-", 8)}>
        <Text style={styles.text}>click 8-</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onOperatorClicked("x", 8)}>
        <Text style={styles.text}>click 8x</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onOperatorClicked("/", 8)}>
        <Text style={styles.text}>click 8 / </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onEqualsClicked(6)}>
        <Text style={styles.text}>onEqualsClicked</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        {calculator.operand1} {calculator.operator} {calculator.operand2}
      </Text>
      <Text style={styles.text}>Result: {calculator.result}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
  },
});
