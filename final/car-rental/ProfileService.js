import * as SecureStore from "expo-secure-store";

const profileKey = "profile_key";

/**
 * Saves a profile object to the data storage
 *
 * @param {Object} profile The profile object to be saved
 */
const saveProfile = async (profile) => {
  await SecureStore.setItemAsync(profileKey, JSON.stringify(profile));
};

/**
 * Returns the profile from the data storage
 *
 * @returns A profile object
 */
const getProfile = async () => {
  const value = await SecureStore.getItemAsync(profileKey);
  return value ? JSON.parse(value) : value;
};

/**
 * Deletes the profile from the data storage
 */
const deleteProfile = async () => {
  await SecureStore.deleteItemAsync(profileKey);
};

module.exports = {
  saveProfile,
  getProfile,
  deleteProfile,
};
