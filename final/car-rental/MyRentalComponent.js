import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

import { ScrollView } from "react-native";
import { Section, TableView } from "react-native-tableview-simple";

import MyRentalCellComponent from "./MyRentalCellComponent";
import MyFilterComponent from "./MyFilterComponent";

import { getAllCars, getCarsByFilter } from "./MyRentalService";

class MyRentalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: getAllCars(),
      isAutomatic: false,
      isElectric: false,
    };
  }

  updateCars = (isAutomatic, isElectric) => {
    value = getCarsByFilter({
      automatic: isAutomatic,
      electric: isElectric,
    });

    this.setState({
      cars: value,
    });
  };

  automaticFilterSelected = (value) => {
    isAutomatic = JSON.parse(value.toLowerCase());
    this.setState({
      isAutomatic: isAutomatic,
    });
    this.updateCars(isAutomatic, this.state.isElectric);
  };

  electricFilterSelected = (value) => {
    isElectric = JSON.parse(value.toLowerCase());
    this.setState({
      isElectric: isElectric,
    });

    this.updateCars(this.state.isAutomatic, isElectric);
  };

  render() {
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ backgroundColor: "#121212" }}
      >
        <MyFilterComponent
          onAutomaticPressed={this.automaticFilterSelected}
          onElectricPressed={this.electricFilterSelected}
          carsCount={this.state.cars.length}
        ></MyFilterComponent>
        <TableView appearance="dark">
          <Section hideSeparator={true} separatorTintColor={"#121212"}>
            {this.state.cars.map((car, i) => {
              return (
                <MyRentalCellComponent
                  onBookingPressed={this.props.onBookingPressed}
                  key={"hs_" + i}
                  id={car.id}
                  model={car.model}
                  automatic={car.automatic}
                  electric={car.electric}
                  category={car.category}
                  seats={car.seats}
                  img={car.img}
                  price={car.price}
                  action={() =>
                    this.props.navigation.navigate("Bookings", {
                      car: car,
                    })
                  }
                ></MyRentalCellComponent>
              );
            })}
          </Section>
        </TableView>
        <StatusBar />
      </ScrollView>
    );
  }
}

export default MyRentalComponent;
