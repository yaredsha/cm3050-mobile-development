import { getAllCars, getCarsByFilter } from "./Rental";

it("gets all cars", () => {
  const cars = getAllCars();
  expect(24).toBe(cars.length);
});

it("gets automatic cars", () => {
  const cars = getCarsByFilter({ automatic: true });
  expect(12).toBe(cars.length);
});

it("gets automatic and electric cars", () => {
  const cars = getCarsByFilter({ automatic: true, electric: true });
  expect(7).toBe(cars.length);
});

it("gets large, automatic and electric cars with 5 seats", () => {
  const cars = getCarsByFilter({
    automatic: true,
    electric: true,
    category: 3,
    seats: 5,
  });
  expect(4).toBe(cars.length);
});

it("empty filter, get all cars", () => {
  const cars = getCarsByFilter();
  expect(24).toBe(cars.length);
});
