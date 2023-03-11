import data from "./Data";

/**
 *
 * @returns The list of cars
 */
const getAllCars = () => {
  return data.cars;
};

const getCarsByFilter = ({
  automatic = false,
  electric = false,
  category = 0,
  seats = 0,
} = {}) => {
  let result = data.cars;

  if (automatic === true) {
    result = result.filter((car) => car.automatic == true);
  }

  if (electric === true) {
    result = result.filter((car) => car.electric == true);
  }

  if (category > 0) {
    result = result.filter((car) => car.category == category);
  }

  if (seats > 0) {
    result = result.filter((car) => car.seats == seats);
  }

  return result;
};

module.exports = {
  getAllCars,
  getCarsByFilter,
};
