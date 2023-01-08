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
  const themeButtonWidth = buttonWidth * 0.6;

  const ERROR = "Error";

  const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const OPERATORS = ["+", "-", "×", "/"];

  // OPERATORS_ADD_SUB and OPERATORS_MULT_DIV are used
  // to correctly calculate things like: 2+3*3 which is 11 and not 15
  const OPERATORS_ADD_SUB = ["+", "-"];
  const OPERATORS_MULT_DIV = ["×", "/"];

  const SIGN = "+/-";
  const ALL_CLEAR = "AC";
  const CLEAR_ENTRY = "C";
  const PERCENT = "%";
  const EQUALS = "=";

  const STATES = {
    INITIAL: "INITIAL",
    COLLECTING: "COLLECTING",
    OPERATOR: "OPERATOR",
    EQUALS: "EQUALS",
  };

  const row1 = [
    { type: 1, value: ALL_CLEAR },
    { type: 1, value: "+/-" },
    { type: 1, value: "%" },
    { type: 2, value: "/" },
  ];

  const row2 = [
    { type: 0, value: "7" },
    { type: 0, value: "8" },
    { type: 0, value: "9" },
    { type: 2, value: "×" },
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

  const themesButtons = [
    { name: "light", bgColor: "#BFBFBF" },
    { name: "orange", bgColor: "#FF9501" },
    { name: "blue", bgColor: "#0984E3" },
  ];

  const contextNew = {
    operands: [0],
    operators: [],
    stringValue: 0,
    lastOperand: undefined,
    lastOperator: undefined,
    state: STATES.INITIAL,
    theme: "blue",
  };

  const [context, setContext] = useState({ ...contextNew });

  const updateState = (ctx) => {
    // console.log(ctx);
    setContext((context) => ({
      ...context,
      ...ctx,
    }));
  };

  const buttonPressed = (value) => {
    let ctx = { ...context };

    if (DIGITS.includes(value)) {
      handleDigits(ctx, value);
      ctx.state = STATES.COLLECTING;
    } else if (OPERATORS.includes(value)) {
      const changeState = handleOperators(ctx, value);
      if (changeState === true) {
        ctx.state = STATES.OPERATOR;
      }
    } else if (value == EQUALS) {
      // can return a complete new context
      ctx = handleEquals(ctx);
      ctx.state = STATES.EQUALS;
    } else if (value == CLEAR_ENTRY && canClearEntry(ctx)) {
      ctx.operands.pop();
      ctx.stringValue = ctx.operands.slice(-1)[0];
      ctx.state = STATES.OPERATOR;
    } else if (value == ALL_CLEAR) {
      const theme = ctx.theme;
      ctx = { ...contextNew };
      ctx.theme = theme;
    } else if (value == PERCENT) {
      // independent of state
      handlePercentage(ctx);
    } else if (value == SIGN) {
      // independent of state
      handleSign(ctx);
    }

    updateState(ctx);
  };

  const themeButtonPressed = (name) => {
    const ctx = { ...context };
    if (ctx.theme != name) {
      ctx.theme = name;
      updateState(ctx);
    }
  };

  const canClearEntry = (ctx) => {
    return ctx.operands.length > 1 && ctx.state === STATES.COLLECTING;
  };

  const handleDigits = (ctx, value) => {
    if (ctx.state != STATES.COLLECTING) {
      let operand = value == "." ? "0." : value;

      if (ctx.state == STATES.INITIAL) {
        operand = String(ctx.operands[0]).startsWith("-")
          ? "-" + operand
          : operand;

        ctx.operands[0] = operand;
      } else if (ctx.state == STATES.EQUALS) {
        ctx.operands[0] = operand;
      } else {
        // OPERATOR
        ctx.operands.push(operand);
      }

      ctx.stringValue = operand;
    } else {
      //COLLECTING

      const idx = ctx.operands.length - 1;
      const oldValue = ctx.operands[idx];

      if (value != "." || !String(oldValue).includes(".")) {
        const strVal = oldValue + "" + value;
        const operand = value == "." ? strVal : parseNumber(strVal);
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
    } else {
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

      ctx.stringValue = calculate(ctx.operands, ctx.operators);
    }

    return changeState;
  };

  const handlePercentage = (ctx) => {
    if (ctx.operands.length > 0) {
      const percentagePoint = ctx.operands.pop();

      let result = percentagePoint / 100;

      if (ctx.operators.length > 0) {
        // remove operator for percent to calculate the left part
        const lastOperator = ctx.operators.pop();

        if (OPERATORS_ADD_SUB.includes(lastOperator)) {
          const from = calculate(ctx.operands, ctx.operators);
          result = from * result;
        }

        // add operator for percent back
        ctx.operators.push(lastOperator);
      }

      ctx.operands.push(result);
      ctx.stringValue = String(result);
    }
  };

  const handleSign = (ctx) => {
    if (ctx.operands.length > 0) {
      const oldOperand = String(ctx.operands.pop());
      const operand = oldOperand.startsWith("-")
        ? oldOperand.substring(1)
        : "-" + oldOperand;
      ctx.operands.push(operand);
      ctx.stringValue = operand;
    }
  };

  const parseNumber = (num) => {
    // substitution function for parseFloat

    const strNum = String(num);
    const intValue = parseInt(num);
    const arrValue = strNum.split(".");

    let result = intValue;

    if (arrValue.length > 1) {
      result = "" + intValue + "." + arrValue[1];
    }

    //sign may get lost with 0
    if (intValue == 0) {
      const sign = strNum.startsWith("-") ? "-" : "";
      result = sign + result;
    }

    return result;
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
        eval(equation.replace(/×/g, "*")).toPrecision(11)
      );
      ctx.stringValue = String(ctx.operands[0]);
    } else if (ctx.operators.length > 0) {
      const newCtx = { ...contextNew };
      newCtx.theme = ctx.theme;
      newCtx.lastOperand = ctx.operands.slice(-1)[0];
      newCtx.lastOperator = ctx.operators.slice(-1)[0];

      newCtx.stringValue = calculate(ctx.operands, ctx.operators);
      if (newCtx.stringValue != ERROR) {
        newCtx.operands[0] = newCtx.stringValue;
      }
      return newCtx;
    }

    return ctx;
  };

  const getEquation = (operands, operators) => {
    const operandsInBrackets = operands.map((op, index) =>
      String(op).startsWith("-") && index > 0 ? "(" + op + ")" : op
    );

    return mergeArraysAlternating(operandsInBrackets, operators);
  };

  const getEquationAsString = (ctx) => {
    const merged = getEquation(ctx.operands, ctx.operators);
    return merged.join("").replace(/\//g, "÷");
  };

  const calculate = (operands, operators) => {
    const merged = getEquation(operands, operators);

    //last element can't be an operator
    const lastElement = merged.pop();
    if (OPERATORS.includes(lastElement)) {
      if (operands.length == 1) {
        merged.push(lastElement);

        // brakets necessary for single calcualtion to avoid "--" bug
        merged.push("(" + operands[0] + ")");
      }
    } else {
      merged.push(lastElement);
    }

    const equation = merged.join("").replace(/×/g, "*");

    // console.log("merged: ", merged, "equation: ", equation);

    const regex = /\/0(?![\.])/;

    const result =
      !equation || equation.match(regex) || equation.includes("Infinity")
        ? ERROR
        : parseFloat(eval(equation).toPrecision(11));

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
    let currentRow = row;

    if (row[0].value == ALL_CLEAR && canClearEntry(context)) {
      currentRow = [...row];
      currentRow[0].value = CLEAR_ENTRY;
    }

    return currentRow.map((item) => {
      return (
        <TouchableOpacity
          key={item.value}
          style={styles.button(
            item.type,
            buttonWidth,
            isOperatorSelected(item.value),
            context.theme
          )}
          onPress={() => buttonPressed(item.value)}
        >
          <Text
            style={styles.text(
              item.type,
              isOperatorSelected(item.value),
              context.theme
            )}
          >
            {item.value}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const renderThemesButtons = () => {
    const currentThemesButtons = themesButtons.filter(
      (item) => item.name != context.theme
    );

    return currentThemesButtons.map((item) => {
      return (
        <TouchableOpacity
          key={item.name}
          style={styles.themeButton(item.bgColor, themeButtonWidth)}
          onPress={() => themeButtonPressed(item.name)}
        />
      );
    });
  };

  return (
    <View style={styles.container(context.theme)}>
      <View style={styles.themeButtonContainer(context.theme)}>
        {renderThemesButtons()}
      </View>
      <SafeAreaView style={[styles.container(context.theme), styles.safeArea]}>
        <Text style={styles.equationField(context.theme)}>
          {getEquationAsString(context)}
        </Text>

        <Text
          style={styles.resultField(
            context.stringValue,
            context.theme,
            windowWidth
          )}
        >
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

const styles = StyleSheet.create({
  container: (theme) => {
    const bgColor = theme == "light" ? "#BFBFBF" : "#000";
    return {
      flex: 1,
      backgroundColor: bgColor,
      alignItems: "center",
      justifyContent: "flex-end",
    };
  },

  safeArea: {
    margin: 20,
  },

  row: {
    flexDirection: "row",
  },

  equationField: (theme) => {
    const color = theme == "light" ? "#333333" : "#A6A6A6";
    return {
      flex: 1,
      color: color,
      marginBottom: 20,
      minWidth: "100%",
      fontSize: 30,
      padding: 10,
    };
  },

  resultField: (stringValue, theme, windowWidth) => {
    let len = String(stringValue).length;
    len = len < 9 ? 8 : len;

    const size = (70 / 51.75) * ((1 / len) * windowWidth);
    const fontSize = size >= 47 ? size : 47;

    const color = theme == "light" ? "#000" : "#fff";

    return {
      fontSize: fontSize,
      color: color,
      minWidth: "100%",
      textAlign: "right",
    };
  },

  button: (type, width, isSelected, theme) => {
    let bgColor =
      type == 1 ? "#A6A6A6" : theme == "light" ? "#4F4F4F" : "#333333";

    if (type == 2) {
      bgColor = isSelected
        ? "#fff"
        : theme == "blue"
        ? "#0984E3"
        : theme == "orange"
        ? "#FF9501"
        : "#000000";
    }

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

  text: (type, isSelected, theme) => {
    let color = type == 1 ? "#000" : "#fff";

    if (type == 2 && isSelected) {
      color =
        theme == "blue" ? "#0984E3" : theme == "orange" ? "#FF9501" : "#000000";
    }

    return {
      fontSize: 30,
      fontWeight: "500",
      textAlign: "center",
      color: color,
    };
  },

  themeButtonContainer: (theme) => {
    const bgColor = theme == "light" ? "#BFBFBF" : "#000";

    return {
      justifyContent: "flex-end",
      flexDirection: "row",
      backgroundColor: bgColor,
    };
  },

  themeButton: (bgColor, themeButtonWidth) => {
    const height = themeButtonWidth * 2;
    const marginTop = -(height * 0.2);
    const borderRadius = height * 0.15;

    return {
      width: themeButtonWidth,
      height: height,
      backgroundColor: bgColor,
      marginLeft: 6,
      borderColor: "#000",
      borderRadius: borderRadius,
      marginTop: marginTop,
    };
  },
});
