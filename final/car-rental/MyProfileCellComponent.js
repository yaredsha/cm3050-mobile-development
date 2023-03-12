import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Cell } from "react-native-tableview-simple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class MyProfileCellComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Cell
        cellAccessoryView={
          <TextInput
            style={styles.textInput}
            value={this.props.value}
            placeholder={this.props.name}
            placeholderTextColor="#474747"
            onChangeText={this.props.onChangeText}
          />
        }
        cellContentView={
          <View style={styles.cellContentViewContainer}>
            <MaterialCommunityIcons
              name={this.props.icon}
              color="#fff"
              size={18}
            />
            <Text style={styles.text}>{this.props.name}</Text>
          </View>
        }
        title={this.props.name}
        titleTextStyle={{ fontSize: 16 }}
      />
    );
  }
}

export default MyProfileCellComponent;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    color: "#A7A7A9",
    justifyContent: "flex-end",
    textAlign: "right",
  },

  cellContentViewContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: "#A7A7A9",
    justifyContent: "flex-end",
    textAlign: "right",
    marginLeft: 5,
  },
});
