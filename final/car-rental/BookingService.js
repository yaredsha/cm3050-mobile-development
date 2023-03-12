import AsyncStorage from "@react-native-async-storage/async-storage";

const bookingsKey = "bookings_key";

/**
 * Returns a list of all saved bookings or empty array
 *
 * @returns A list of all saved bookings or empty list
 */
const getBookings = async () => {
  const value = await AsyncStorage.getItem(bookingsKey);
  //console.log("getbookings value: ", value);
  return value && value !== "{}" ? JSON.parse(value) : new Array();
};

/**
 * Saves a given booking object to the data storage
 *
 * @param {Object} booking The booking object to be saved
 */
const saveBooking = async (booking) => {
  const bookings = await getBookings();
  bookings.push(booking);

  const unique = [];

  const uniqueBookings = bookings.filter((item) => {
    const str = JSON.stringify(item);
    if (!unique.includes(str)) {
      unique.push(str);
      return true;
    }
    return false;
  });

  // make remove duplicates
  bookingsSet = new Set(bookings);

  await AsyncStorage.setItem(bookingsKey, JSON.stringify(uniqueBookings));
};

/**
 * Deletes a give booking object from the data storage
 *
 * @param {Object} booking The booking object to be removed
 */
const deleteBooking = async (booking) => {
  const bookings = await getBookings();
  const value = bookings.filter(
    (element) => JSON.stringify(element) !== JSON.stringify(booking)
  );

  await AsyncStorage.setItem(bookingsKey, JSON.stringify(value));
};

/**
 * Deletes all bookings from the data storage
 */
const deleteAllBookings = async () => {
  await AsyncStorage.removeItem(bookingsKey);
};

module.exports = {
  getBookings,
  saveBooking,
  deleteBooking,
  deleteAllBookings,
};
