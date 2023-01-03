import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const windowWidth = Dimensions.get("window").width;
  const buttonWidth = windowWidth / 4.8;

  const [calculator, setCalculator] = useState({ inputStr: "0" });

  const reset = () => {
    const calculatorUpdated = {
      operand1: undefined,
      operand2: undefined,
      operator: undefined,
      input: undefined,
      inputStr: "0",
    };

    update(calculatorUpdated);
  };

  const onButtonClick = (item) => {
    const calculatorUpdated = { ...calculator };
    const { input, inputStr, operator } = calculatorUpdated;

    if (!isNaN(item.value)) {
      if (input === undefined) {
        console.log("drin", operator);
        calculatorUpdated.input = parseFloat(item.value);
        calculatorUpdated.inputStr = "" + item.value;
      } else {
        console.log("nicht drin", operator);

        calculatorUpdated.inputStr = inputStr + item.value;
        calculatorUpdated.input = parseFloat(calculatorUpdated.inputStr);
      }
    } else {
      switch (item.value) {
        case ".":
          if (input === undefined) {
            calculatorUpdated.input = 0.0;
            calculatorUpdated.inputStr = "0.";
          } else {
            calculatorUpdated.inputStr = inputStr.includes(".")
              ? inputStr
              : inputStr + ".";
            calculatorUpdated.input = parseFloat(calculatorUpdated.inputStr);
          }

          break;
        case "C":
          reset();
          return;
        case "+/-":
          calculatorUpdated.input = -1 * parseFloat(inputStr);
          calculatorUpdated.inputStr = "" + calculatorUpdated.input;
          break;
        case "%":
          onPercentageClicked();
          return;
        case "=":
          calculatorUpdated.input = parseFloat(calculatorUpdated.inputStr);
          onEqualsClicked();
          return;
        default:
          onOperatorClicked(item.value);
          return;
      }
    }

    update(calculatorUpdated);
  };

  const onOperatorClicked = (operator) => {
    const calculatorUpdated = { ...calculator };
    calculatorUpdated.operand1 = calculatorUpdated.input;
    calculatorUpdated.operator = operator;
    calculatorUpdated.input = undefined;

    update(calculatorUpdated);
  };

  const onPercentageClicked = () => {
    const calculatorUpdated = { ...calculator };
    const per = calculatorUpdated.input / 100;

    if (calculatorUpdated.operator !== undefined) {
      const value = calculatorUpdated.operand1 * per;
      calculatorUpdated.operand2 = value;
      calculatorUpdated.input = value;
      calculatorUpdated.inputStr = "" + value;
    } else {
      calculatorUpdated.input = per;
      calculatorUpdated.inputStr = "" + per;
    }

    update(calculatorUpdated);
  };

  const onEqualsClicked = () => {
    const calculatorUpdated = { ...calculator };

    if (calculatorUpdated.operator !== undefined) {
      if (calculatorUpdated.operand2 === undefined) {
        calculatorUpdated.operand2 = parseFloat(calculatorUpdated.inputStr);
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
      calculatorUpdated.inputStr = "" + parseFloat(result.toPrecision(12));

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

  const renderRow = (row) => {
    return row.map((item) => {
      return (
        <TouchableOpacity
          key={item.value}
          style={styles.button(item.type, buttonWidth)}
          onPress={() => onButtonClick(item)}
        >
          <Text style={item.type == 1 ? styles.blackText : styles.whiteText}>
            {item.value}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const row1 = [
    { type: 1, value: "C" },
    { type: 1, value: "+/-" },
    { type: 1, value: "%" },
    { type: 2, value: "/" },
  ];

  const row2 = [
    { type: 0, value: "7" },
    { type: 0, value: "8" },
    { type: 0, value: "9" },
    { type: 2, value: "x" },
  ];

  const row3 = [
    { type: 0, value: "4" },
    { type: 0, value: "5" },
    { type: 0, value: "6" },
    { type: 2, value: "-" },
  ];

  const row4 = [
    { type: 0, value: "1" },
    { type: 0, value: "2" },
    { type: 0, value: "3" },
    { type: 2, value: "+" },
  ];

  const row5 = [
    { type: 3, value: "0" },
    { type: 0, value: "." },
    { type: 2, value: "=" },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, styles.safeArea]}>
        <Text style={styles.resultField}>{calculator.inputStr}</Text>

        <View style={styles.row}>{renderRow(row1)}</View>

        <View style={styles.row}>{renderRow(row2)}</View>

        <View style={styles.row}>{renderRow(row3)}</View>

        <View style={styles.row}>{renderRow(row4)}</View>

        <View style={styles.row}>{renderRow(row5)}</View>

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
