import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { Cell } from "react-native-tableview-simple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class ProfileCellComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Cell
        cellAccessoryView={
          <TextInput
            style={{
              fontSize: 16,
              color: "#A7A7A9",
              justifyContent: "flex-end",
              textAlign: "right",
            }}
            value={this.props.value}
            placeholder={this.props.name}
            placeholderTextColor="#474747"
            onChangeText={this.props.onChangeText}
          />
        }
        cellContentView={
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name={this.props.icon}
              color="#fff"
              size={18}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#A7A7A9",
                justifyContent: "flex-end",
                textAlign: "right",
                marginLeft: 5,
              }}
            >
              {this.props.name}
            </Text>
          </View>
        }
        title={this.props.name}
        titleTextStyle={{ fontSize: 16 }}
      />
    );
  }
}

export default ProfileCellComponent;
