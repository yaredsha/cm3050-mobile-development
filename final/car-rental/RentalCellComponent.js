import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Cell } from "react-native-tableview-simple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const cellHeight = Dimensions.get("window").height / 4.6;

class RentalCellComponent extends Component {
  render() {
    return (
      <Cell
        backgroundColor="transparent"
        cellStyle="Basic"
        hideSeparator={true}
        highlightUnderlayColor="#131313"
        //onPress={this.props.action}
        cellContentView={
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              //marginBottom: 10,
              //paddingTop: 20,
              //paddingTop: 5,
              //paddingBottom: 2,

              //borderWidth: 1,
              //borderRadius: 10,
              //borderColor: "#fff",
              backgroundColor: "#2D2D2D",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#121212",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                //paddingBottom: 10,
                padding: 10,
                //paddingLeft: 10,
                //paddingRight: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>
                {this.props.model}
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //backgroundColor: "#FC4C35",
                  backgroundColor: "#7F7F7F",
                  padding: 5,
                  paddingLeft: 6,
                  paddingRight: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#2D2D2D",
                }}
                onPress={() => this.props.onBookingPressed("" + this.props.id)}
              >
                <MaterialCommunityIcons
                  name={"check"}
                  color="#ff0000"
                  size={18}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#2D2D2D",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Book
                </Text>
              </TouchableOpacity>
            </View>

            <ImageBackground
              style={{
                height: cellHeight,
                padding: 5,
              }}
              imageStyle={{ resizeMode: "cover" }}
              source={this.props.img}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column-reverse",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                    alignSelf: "flex-end",
                    backgroundColor: "#121212",
                    padding: 5,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: "#BABABA",
                    opacity: 0.5,
                  }}
                >
                  £{this.props.price} /day
                </Text>
              </View>
            </ImageBackground>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                //paddingLeft: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="seat-passenger"
                  color="#fff"
                  size={18}
                />
                <Text style={{ color: "#fff" }}>{this.props.seats}</Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="car-shift-pattern"
                  color="#fff"
                  size={18}
                />
                <Text style={{ color: "#fff" }}>
                  {this.props.automatic ? "Automatic" : "Manual"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={this.props.electric ? "flash" : "gas-station"}
                  color="#fff"
                  size={18}
                />
                <Text style={{ color: "#fff" }}>
                  {this.props.electric ? "Electric" : "Fuel"}
                </Text>
              </View>
            </View>
          </View>
        }
      />
    );
  }
}

export default RentalCellComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flex: 1,
    height: "100%",
  },
});
