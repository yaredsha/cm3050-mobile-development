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

  const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const OPERATORS = ["+", "-", "x", "/"];

  // the following two arrays are used
  // to correctly calculate things
  // like: 2+3*3 which is 11 and not 15

  // addition and subtraction
  const OPERATORS_AS = ["+", "-"];
  //multiplication and division
  const OPERATORS_MD = ["x", "/"];

  const SIGN = "+/-";
  const C = "C";
  const PERCENT = "%";
  const EQUALS = "=";

  const STATE = {
    INITIAL: 0,
    FIRST_COLLECT: 1,
    FIRST_OPERATOR: 2,
    SECOND_COLLECT: 3,
    SECOND_OPERATOR: 4,
    TRAILING_COLLECT: 5,
  };

  const contextNew = {
    operand1: [0],
    operator1: "+",
    operand2: [0],
    operator2: "+",
    trailing: [0],
    stringValue: 0,
    state: STATE.INITIAL,
  };

  const [context, setContext] = useState(contextNew);

  const reset = () => {
    updateState(contextNew);
  };

  const updateState = (cxt) => {
    setContext((context) => ({
      ...context,
      ...cxt,
    }));
  };

  const onButtonPressed = (value) => {
    const ctx = { ...context };

    if (DIGITS.includes(value)) {
      if (ctx.state <= STATE.FIRST_COLLECT) {
        firstCollect(value);
      } else if (ctx.state <= STATE.SECOND_COLLECT) {
        secondCollect(value);
      } else if (ctx.state <= STATE.TRAILING_COLLECT) {
        trailingCollect(value);
      }

      return;
    } else if (OPERATORS.includes(value)) {
      handleOperators(value);
      return;
    } else if (SIGN == value) {
      handleSign();
      return;
    } else if (C == value) {
      reset();
      return;
    } else if (PERCENT == value) {
    } else if (EQUALS == value) {
      handleEquals(value);
      return;
    }
  };

  const firstCollect = (value) => {
    const ctx = { ...context };

    if (ctx.state == STATE.INITIAL) {
      ctx.state = STATE.FIRST_COLLECT;
      ctx.operand1[0] = value == "." ? "0." : value;
    } else {
      if (value != "." || !ctx.operand1.join("").includes(".")) {
        ctx.operand1.push(value);
      }
    }

    ctx.stringValue = ctx.operand1.join("");

    updateState(ctx);
  };

  const secondCollect = (value) => {
    const ctx = { ...context };

    if (ctx.state == STATE.FIRST_OPERATOR) {
      ctx.state = STATE.SECOND_COLLECT;
      ctx.operand2[0] = value == "." ? "0." : value;
    } else {
      if (value != "." || !ctx.operand2.join("").includes(".")) {
        ctx.operand2.push(value);
      }
    }

    ctx.stringValue = ctx.operand2.join("");

    updateState(ctx);
  };

  const trailingCollect = (value) => {
    const ctx = { ...context };

    if (ctx.state == STATE.SECOND_OPERATOR) {
      ctx.state = STATE.TRAILING_COLLECT;
      ctx.trailing[0] = value == "." ? "0." : value;
    } else {
      if (value != "." || !ctx.trailing.join("").includes(".")) {
        ctx.trailing.push(value);
      }
    }

    ctx.stringValue = ctx.trailing.join("");

    updateState(ctx);
  };

  const handleOperators = (value) => {
    const ctx = { ...context };

    if (ctx.state == STATE.FIRST_COLLECT || ctx.state == STATE.FIRST_OPERATOR) {
      ctx.operator1 = value;
      ctx.state = STATE.FIRST_OPERATOR;
    } else if (
      ctx.state == STATE.SECOND_COLLECT ||
      ctx.state == STATE.SECOND_OPERATOR
    ) {
      context.operator2 = value;
      context.state = STATE.SECOND_OPERATOR;
      //updateState(ctx);

      //console.log("ctx1: ", ctx);
      if (
        OPERATORS_MD.includes(value) &&
        OPERATORS_AS.includes(ctx.operator1)
      ) {
        //wait
        return;
      }

      handleEquals(value);
      return;
    }

    updateState(ctx);
  };

  const handleSign = () => {
    const ctx = { ...context };

    if (ctx.state <= STATE.FIRST_COLLECT) {
      context.operand1[0] = -1 * context.operand1[0];
      ctx.stringValue = context.operand1.join("");
    } else if (ctx.state <= STATE.SECOND_COLLECT) {
      context.operand2[0] = -1 * context.operand2[0];
      ctx.stringValue = context.operand2.join("");
    } else if (ctx.state <= STATE.TRAILING_COLLECT) {
      context.trailing[0] = -1 * context.trailing[0];
      ctx.stringValue = context.trailing.join("");
    }

    updateState(ctx);
  };

  const handleEquals = (value) => {
    const ctx = { ...context };

    console.log("ctx2: ", ctx);

    const no1 = ctx.operand1.join("");
    const no2 = ctx.operand2.join("");
    const trailing = ctx.trailing.join("");

    const op1 = ctx.operator1.replace("x", "*");
    const op2 = ctx.operator2.replace("x", "*");

    const equation =
      "(" + no1 + ")" + op1 + "(" + no2 + ")" + op2 + "(" + trailing + ")";
    console.log(equation);

    const result = parseFloat(eval(equation).toPrecision(12));

    const ctxNew = { ...contextNew };
    ctxNew.operand1 = ("" + result).split("");
    ctxNew.operand2 = ctx.operand2;
    ctxNew.state = STATE.FIRST_OPERATOR;
    ctxNew.stringValue = result;

    if (OPERATORS.includes(value)) {
      //operator clicked
      ctxNew.operator1 = value;
    } else {
      ctxNew.operator1 = ctx.operator1;
    }

    updateState(ctxNew);
  };

  const renderRow = (row) => {
    return row.map((item) => {
      return (
        <TouchableOpacity
          key={item.value}
          style={styles.button(item.type, buttonWidth)}
          onPress={() => onButtonPressed(item.value)}
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
        <Text style={styles.resultField}>{context.stringValue}</Text>

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
