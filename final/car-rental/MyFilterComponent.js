import React, { Component } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class MyFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAutomatic: false,
      isElectric: false,
    };
  }

  toggleAutomaticSwitch = () => {
    this.setState({
      isAutomatic: (this.state.isAutomatic = !this.state.isAutomatic),
    });
    this.props.onAutomaticPressed("" + this.state.isAutomatic);
  };

  toggleElectricSwitch = () => {
    this.setState({
      isElectric: (this.state.isElectric = !this.state.isElectric),
    });
    this.props.onElectricPressed("" + this.state.isElectric);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.automaticContainer}>
          <Switch
            trackColor={{ false: "#7F7F7F", true: "#fff" }}
            thumbColor="#2D2D2D"
            ios_backgroundColor="#7F7F7F"
            onValueChange={() => this.toggleAutomaticSwitch()}
            value={this.state.isAutomatic}
            style={{ marginRight: 5 }}
          />
          <MaterialCommunityIcons
            name="car-shift-pattern"
            color="#fff"
            size={18}
          />
          <Text style={{ color: "#fff" }}>Automatic</Text>
        </View>

        <Text style={{ color: "#A5A5A5" }}>{this.props.carsCount} found</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Switch
            trackColor={{ false: "#7F7F7F", true: "#fff" }}
            thumbColor="#2D2D2D"
            ios_backgroundColor="#7F7F7F"
            onValueChange={() => this.toggleElectricSwitch()}
            value={this.state.isElectric}
            style={{ marginRight: 5 }}
          />
          <MaterialCommunityIcons name={"flash"} color="#fff" size={18} />
          <Text style={{ color: "#fff" }}>Electric</Text>
        </View>
      </View>
    );
  }
}

export default MyFilterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#2D2D2D",
  },

  automaticContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
