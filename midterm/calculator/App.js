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

  // OPERATORS_ADD_SUB and OPERATORS_MULT_DIV are used
  // to correctly calculate things like: 2+3*3 which is 11 and not 15
  const OPERATORS_ADD_SUB = ["+", "-"];
  const OPERATORS_MULT_DIV = ["x", "/"];

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

  const TRANSITION = {
    DIGITS: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    OPERATORS: ["+", "-", "x", "/"],
    SIGN: "+/-",
    C: "C",
    PERCENTAGE: "%",
    EQUALS: "=",
  };

  const contextNew = {
    operand1: [0],
    operator1: "",
    operand2: [],
    operator2: "",
    trailing: [],
    stringValue: 0,
    state: STATE.INITIAL,
  };

  const [context, setContext] = useState(contextNew);

  const updateState = (ctx) => {
    console.log(ctx);
    setContext((context) => ({
      ...context,
      ...ctx,
    }));
  };

  const onButtonPressed = (value) => {
    const ctx = { ...context };

    // operation independent of states
    if (TRANSITION.C == value) {
      updateState(contextNew);
    } else if (EQUALS == value) {
      let ctxNew = handleEquals(ctx, value);
      updateState(ctxNew);
    } else {
      // transitions (state relevant)

      let ctxNew = undefined;

      switch (ctx.state) {
        case STATE.INITIAL:
        case STATE.FIRST_COLLECT:
          if (TRANSITION.DIGITS.includes(value)) {
            ctxNew = firstCollect(ctx, value);
            ctxNew.state = STATE.FIRST_COLLECT;
          } else if (TRANSITION.OPERATORS.includes(value)) {
            ctxNew = handleFirstOperator(ctx, value);
            ctxNew.state = STATE.FIRST_OPERATOR;
          } else if (TRANSITION.SIGN == value) {
            ctxNew = handleSignFirstCollect(ctx);
          }
          break;
        case STATE.FIRST_OPERATOR:
          // changing the operator
          if (TRANSITION.OPERATORS.includes(value)) {
            ctxNew = handleFirstOperator(ctx, value);
            ctxNew.state = STATE.FIRST_OPERATOR;
            break;
          } else if (TRANSITION.SIGN == value) {
            ctxNew = handleSignFirstCollect(ctx);
            break;
          }
        case STATE.SECOND_COLLECT:
          if (TRANSITION.DIGITS.includes(value)) {
            ctxNew = secondCollect(ctx, value);
            ctxNew.state = STATE.SECOND_COLLECT;
          } else if (TRANSITION.OPERATORS.includes(value)) {
            ctxNew = handleSecondOperator(ctx, value);
            ctxNew.state = STATE.SECOND_OPERATOR;
          } else if (TRANSITION.SIGN == value) {
            ctxNew = handleSignSecondCollect(ctx);
          }
          break;
        case STATE.SECOND_OPERATOR:
          // changing the operator
          if (TRANSITION.OPERATORS.includes(value)) {
            ctxNew = handleSecondOperator(ctx, value);
            ctxNew.state = STATE.SECOND_OPERATOR;
            break;
          } else if (TRANSITION.SIGN == value) {
            ctxNew = handleSignSecondCollect(ctx);
            break;
          }
        case STATE.TRAILING_COLLECT:
          if (TRANSITION.DIGITS.includes(value)) {
            ctxNew = trailingCollect(ctx, value);
            ctxNew.state = STATE.TRAILING_COLLECT;
          } else if (TRANSITION.OPERATORS.includes(value)) {
            ctxNew = handleTrailingOperator(ctx, value);
            break;
          } else if (TRANSITION.SIGN == value) {
            ctxNew = handleSignTrailingCollect(ctx);
          }
          break;
      }

      if (ctxNew) {
        updateState(ctxNew);
      }
    }

    /*if (DIGITS.includes(value)) {
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
    }*/
  };

  const firstCollect = (ctx, value) => {
    if (ctx.state == STATE.INITIAL) {
      ctx.operand1[0] = value == "." ? "0." : value;
    } else {
      if (value != "." || !ctx.operand1.join("").includes(".")) {
        ctx.operand1.push(value);
      }
    }

    ctx.stringValue = ctx.operand1.join("");

    return ctx;
  };

  const secondCollect = (ctx, value) => {
    if (ctx.state == STATE.FIRST_OPERATOR) {
      ctx.operand2[0] = value == "." ? "0." : value;
    } else {
      if (value != "." || !ctx.operand2.join("").includes(".")) {
        ctx.operand2.push(value);
      }
    }

    ctx.stringValue = ctx.operand2.join("");

    return ctx;
  };

  const trailingCollect = (ctx, value) => {
    if (ctx.state == STATE.SECOND_OPERATOR) {
      ctx.trailing[0] = value == "." ? "0." : value;
    } else {
      if (value != "." || !ctx.trailing.join("").includes(".")) {
        ctx.trailing.push(value);
      }
    }

    ctx.stringValue = ctx.trailing.join("");

    return ctx;
  };

  const handleFirstOperator = (ctx, value) => {
    if (ctx.state != STATE.INITIAL) {
      ctx.operator1 = value;
    }

    return ctx;
  };

  const handleSecondOperator = (ctx, value) => {
    ctx.operator2 = value;

    if (
      OPERATORS_MULT_DIV.includes(value) &&
      OPERATORS_ADD_SUB.includes(ctx.operator1)
    ) {
      //wait
      return ctx;
    }

    return handleEquals(ctx, value);
  };

  const handleTrailingOperator = (ctx, value) => {
    ctx.operator2 = value;
    return handleEquals(ctx, value);
  };

  const handleSignFirstCollect = (ctx) => {
    const value = -1 * parseFloat(context.operand1.join(""));
    context.operand1 = ("" + value).split("");
    ctx.operand1 = context.operand1;

    ctx.stringValue = "" + value;
    return ctx;
  };

  const handleSignSecondCollect = (ctx) => {
    const value = -1 * parseFloat(context.operand2.join(""));
    context.operand2 = ("" + value).split("");
    ctx.operand2 = context.operand2;

    ctx.stringValue = "" + value;
    return ctx;
  };

  const handleSignTrailingCollect = (ctx) => {
    const value = -1 * parseFloat(context.trailing.join(""));
    context.trailing = ("" + value).split("");
    ctx.trailing = context.trailing;

    ctx.stringValue = "" + value;
    return ctx;
  };

  const handleEquals = (ctx, value) => {
    const ctxNew = { ...contextNew };

    const no1 = ctx.operand1.join("");
    const no2 = ctx.operand2.join("");
    const trailing = ctx.trailing.join("");

    const op1 = ctx.operator1.replace("x", "*");
    const op2 = ctx.operator2.replace("x", "*");

    let equation = "(" + no1 + ")" + op1 + "(" + no2 + ")";

    if (trailing) {
      equation += op2 + "(" + trailing + ")";
    }

    console.log(equation);

    const result = parseFloat(eval(equation).toPrecision(12));

    ctxNew.operand1 = ("" + result).split("");

    ctxNew.state = STATE.FIRST_OPERATOR;

    if (ctx.state <= STATE.SECOND_OPERATOR) {
      ctxNew.operand2 = ctx.operand2;
      ctxNew.operator1 = ctx.operator1;
    } else {
      //trailing
      ctxNew.operand2 = ctx.trailing;
      ctxNew.operator1 = ctx.operator2;
    }

    ctxNew.stringValue = result;

    if (TRANSITION.OPERATORS.includes(value)) {
      ctxNew.operator1 = value;
    }

    return ctxNew;
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
