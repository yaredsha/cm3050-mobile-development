import data from "./Data";

/**
 * Returns a list of all cars
 *
 * @returns The list of cars
 */
const getAllCars = () => {
  return data.cars;
};

/**
 * Returns a list of cars that match the filter criteria.
 * Note: an AND operator is used by more than one criterion
 *
 * @param {Object} filter A filter object containing filter selections
 * @returns A list of cars that match the filter criteria
 */
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

/**
 * Returns a list of cars that match the given car ids.
 *
 * @param {Array} carIds Array of car ids that should be returned
 * @returns A list of cars
 */
const getCarsByIds = (carIds) => {
  let result = [];
  if (carIds && carIds.length > 0) {
    result = data.cars.filter((car) => carIds.includes(car.id));
  }

  return result;
};

/**
 * Returns a list of all locations
 *
 * @returns The list of locations
 */
const getLocations = () => {
  return data.locations;
};

module.exports = {
  getAllCars,
  getCarsByFilter,
  getCarsByIds,
  getLocations,
};
