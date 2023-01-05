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
  const buttonWidth = windowWidth * 0.21;

  const ERROR = "Error";

  const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const OPERATORS = ["+", "-", "x", "/"];

  // OPERATORS_ADD_SUB and OPERATORS_MULT_DIV are used
  // to correctly calculate things like: 2+3*3 which is 11 and not 15
  const OPERATORS_ADD_SUB = ["+", "-"];
  const OPERATORS_MULT_DIV = ["x", "/"];

  const SIGN = "+/-";
  const CLEAR = "C";
  const PERCENT = "%";
  const EQUALS = "=";

  const STATES = {
    INITIAL: "INITIAL",
    COLLECTING: "COLLECTING",
    OPERATOR: "OPERATOR",
    EQUALS: "EQUALS",
  };

  const TRANSITION = {
    DIGITS: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    OPERATORS: ["+", "-", "x", "/"],
    SIGN: "+/-",
    C: "C",
    PERCENTAGE: "%",
    EQUALS: "=",
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

  const contextNew = {
    operands: [],
    operators: [],
    stringValue: 0,
    lastOperand: undefined,
    lastOperator: undefined,
    state: STATES.INITIAL,
  };

  const [context, setContext] = useState(contextNew);

  const updateState = (ctx) => {
    console.log(ctx);
    setContext((context) => ({
      ...context,
      ...ctx,
    }));
  };

  const buttonPressed = (value) => {
    const ctx = { ...context };

    if (DIGITS.includes(value)) {
      handleDigits(ctx, value);
      ctx.state = STATES.COLLECTING;
    } else if (OPERATORS.includes(value)) {
      const changeState = handleOperators(ctx, value);
      if (changeState === true) {
        ctx.state = STATES.OPERATOR;
      }
    } else if (value == EQUALS) {
      const newCtx = handleEquals(ctx);
      newCtx.state = STATES.EQUALS;
      updateState(newCtx);
      return;
    } else if (value == PERCENT) {
      handlePercentage(ctx);
    } else if (value == CLEAR) {
      updateState(contextNew);
      return;
    } else if (value == SIGN) {
      handleSign(ctx);
    }

    updateState(ctx);
  };

  const handleDigits = (ctx, value) => {
    if (
      ctx.state == STATES.INITIAL ||
      ctx.state == STATES.OPERATOR ||
      ctx.state == STATES.EQUALS
    ) {
      const operand = value == "." ? "0." : value;
      ctx.operands.push(operand);
      ctx.stringValue = operand;
    } else {
      //COLLECTING
      const idx = ctx.operands.length - 1;
      const oldValue = ctx.operands[idx];

      if (value != "." || !oldValue.includes(".")) {
        const operand = parseFloat(oldValue + "" + value);
        ctx.operands[idx] = operand;
        ctx.stringValue = operand;
      }
    }
  };

  const handleOperators = (ctx, value) => {
    let changeState = false;

    if (ctx.state == STATES.OPERATOR && ctx.operators.length > 0) {
      // change operator
      ctx.operators.pop();
      ctx.operators.push(value);
      changeState = true;
    } else if (ctx.state != STATES.INITIAL) {
      ctx.operators.push(value);
      changeState = true;
    }

    if (
      changeState === true &&
      ctx.operands.length > 1 &&
      ctx.operators.length > 0
    ) {
      if (OPERATORS_MULT_DIV.includes(value)) {
        const found = ctx.operators.find((opr) =>
          OPERATORS_ADD_SUB.includes(opr)
        );
        if (found) {
          //wait
          return changeState;
        }
      }

      ctx.stringValue = calculate(ctx);
    }

    return changeState;
  };

  const handlePercentage = (ctx) => {
    const len = ctx.operands.length;
    let from = len > 1 ? ctx.operands[len - 2] : undefined;

    if (len > 0) {
      const percentagePoint = ctx.operands.pop();

      let result = percentagePoint / 100;

      if (from && ctx.operators.length > 0) {
        const lastOperator = ctx.operators.slice(-1)[0];
        if (OPERATORS_ADD_SUB.includes(lastOperator)) {
          result = from * result;
        }
      }

      ctx.operands.push(result);
      ctx.stringValue = String(result);
    }
  };

  const handleSign = (ctx) => {
    if (ctx.operands.length > 0) {
      const operand = String(-1 * parseFloat(ctx.operands.pop()));
      ctx.operands.push(operand);
      ctx.stringValue = operand;
    }
  };

  const mergeArraysAlternating = ([x, ...xs], ...rest) => {
    // credit: https://stackoverflow.com/questions/47061160/merge-two-arrays-with-alternating-values
    return x === undefined
      ? rest.length === 0
        ? []
        : mergeArraysAlternating(...rest)
      : [x, ...mergeArraysAlternating(...rest, xs)];
  };

  const handleEquals = (ctx) => {
    if (
      ctx.state == STATES.EQUALS &&
      ctx.lastOperand &&
      ctx.lastOperator &&
      ctx.operands.length > 0
    ) {
      const equation =
        ctx.operands[0] + ctx.lastOperator + "(" + ctx.lastOperand + ")";
      ctx.operands[0] = parseFloat(
        eval(equation.replaceAll("x", "*")).toPrecision(12)
      );
      ctx.stringValue = String(ctx.operands[0]);
    } else if (ctx.operators.length > 0) {
      const newCtx = { ...contextNew };
      newCtx.lastOperand = ctx.operands.slice(-1)[0];
      newCtx.lastOperator = ctx.operators.slice(-1)[0];

      newCtx.stringValue = calculate(ctx);
      if (newCtx.stringValue != ERROR) {
        newCtx.operands[0] = newCtx.stringValue;
      }
      return newCtx;
    }

    return ctx;
  };

  const calculate = (ctx) => {
    const operands = ctx.operands.map((op) => "(" + op + ")");
    const merged = mergeArraysAlternating(operands, ctx.operators);

    //last element can't be an operator
    const lastElement = merged.pop();
    if (!OPERATORS.includes(lastElement)) {
      merged.push(lastElement);
    }

    const equation = merged.join("").replaceAll("x", "*");
    const result =
      equation.includes("/(0)") || equation.includes("Infinity")
        ? ERROR
        : parseFloat(eval(equation).toPrecision(12));

    return result;
  };

  const isOperatorSelected = (value) => {
    return (
      context.state == STATES.OPERATOR &&
      context.operators.length > 0 &&
      value == context.operators.slice(-1)[0]
    );
  };

  const renderRow = (row) => {
    return row.map((item) => {
      return (
        <TouchableOpacity
          key={item.value}
          style={styles.button(
            item.type,
            buttonWidth,
            isOperatorSelected(item.value)
          )}
          onPress={() => buttonPressed(item.value)}
        >
          <Text style={item.type == 1 ? styles.blackText : styles.whiteText}>
            {item.value}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, styles.safeArea]}>
        <Text style={styles.resultField(context.stringValue)}>
          {context.stringValue}
        </Text>

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

  row: {
    flexDirection: "row",
  },

  resultField: (stringValue) => {
    console.log("stringValue: ", stringValue);
    let len = String(stringValue).length;
    len = len < 9 ? 8 : len + (len - 8) * 10;

    const size = Math.round((8 - (8 * (len - 8)) / 100) / 0.114);
    const fontSize = (size >= 47 ? size : 47) + "%";

    console.log("len: ", len, "fontSize: ", fontSize);

    return {
      fontSize: fontSize,
      color: "#fff",
      borderColor: "#fff",
      minWidth: "100%",
      textAlign: "right",
    };
  },

  button: (type, width, isSelected) => {
    const bgColor = type == 1 ? "#A6A6A6" : type == 2 ? "#0984E3" : "#333333";
    const w = type == 3 ? width * 2 : width;
    const borderWidth = isSelected ? 2 : 0;

    return {
      width: w,
      height: width,
      borderRadius: width / 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bgColor,
      borderWidth: borderWidth,
      borderColor: "#fff",
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
