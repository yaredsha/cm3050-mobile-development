import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import { getBookings, deleteBooking } from "./BookingService";
import { getCarsByIds } from "./RentalService";

class BookingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { bookedCars: [] };
  }

  /**
   * We can't use await inside a construtor.
   * So we use await inside componentDidMount event
   */
  componentDidMount = async () => {
    await this.updateBookings();
  };

  onBookingCancelPressed = async (carId) => {
    const booking = { carId: "" + carId };
    await deleteBooking(booking);
    await this.updateBookings();
  };

  updateBookings = async () => {
    const bookings = await getBookings();
    const carIds = bookings.map((booking) => parseInt(booking.carId));
    const bookedCars = await getCarsByIds(carIds);
    this.setState({ bookedCars: bookedCars });
  };

  render() {
    return (
      <ScrollView>
        <TableView appearance="dark">
          <Section
            header={this.state.bookedCars.length + " cars booked"}
            //separatorTintColor="#ccc"
            headerTextStyle={{ fontSize: 18 }}
          >
            {this.state.bookedCars.map((car, i) => {
              return (
                <Cell
                  key={"cell_" + i}
                  cellStyle="RightDetail"
                  title={car.model}
                  detail={"£" + car.price}
                  onPress={() =>
                    Alert.alert(
                      "Cancel booking?",
                      "Remove " + car.model + "?",
                      [
                        {
                          text: "No",
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: async () => {
                            await this.onBookingCancelPressed(car.id);
                            this.props.onBookingDeleted();
                          },
                        },
                      ]
                    )
                  }
                  image={
                    <Image
                      style={{
                        borderRadius: 5,
                      }}
                      source={car.img}
                    />
                  }
                />
              );
            })}
          </Section>
        </TableView>
        <StatusBar />
      </ScrollView>
    );
  }
}

export default BookingsComponent;
