import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Cell } from "react-native-tableview-simple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const cellHeight = Dimensions.get("window").height / 4.6;

class MyRentalCellComponent extends Component {
  render() {
    return (
      <Cell
        backgroundColor="transparent"
        cellStyle="Basic"
        hideSeparator={true}
        highlightUnderlayColor="#131313"
        cellContentView={
          <View style={styles.cellContentViewContainer}>
            <View style={styles.cellHeaderContainer}>
              <Text style={styles.modelText}>{this.props.model}</Text>
              <TouchableOpacity
                style={styles.bookButtonContainer}
                onPress={() => this.props.onBookingPressed("" + this.props.id)}
              >
                <MaterialCommunityIcons
                  name={"check"}
                  color="#ff0000"
                  size={18}
                />
                <Text style={styles.bookButtonText}>Book</Text>
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
                <Text style={styles.priceText}>£{this.props.price} /day</Text>
              </View>
            </ImageBackground>

            <View style={styles.cellFooterContainer}>
              <View style={styles.seatsContainer}>
                <MaterialCommunityIcons
                  name="seat-passenger"
                  color="#fff"
                  size={18}
                />
                <Text style={{ color: "#fff" }}>{this.props.seats}</Text>
              </View>

              <View style={styles.gearShiftContainer}>
                <MaterialCommunityIcons
                  name="car-shift-pattern"
                  color="#fff"
                  size={18}
                />
                <Text style={{ color: "#fff" }}>
                  {this.props.automatic ? "Automatic" : "Manual"}
                </Text>
              </View>

              <View style={styles.engineTypeContainer}>
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

export default MyRentalCellComponent;

const styles = StyleSheet.create({
  cellContentViewContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#2D2D2D",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#121212",
  },

  cellHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  modelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  bookButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#7F7F7F",
    padding: 5,
    paddingLeft: 6,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#2D2D2D",
  },

  bookButtonText: {
    marginLeft: 4,
    color: "#2D2D2D",
    fontSize: 16,
    fontWeight: "bold",
  },

  priceText: {
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
  },

  cellFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  seatsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  gearShiftContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  engineTypeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
