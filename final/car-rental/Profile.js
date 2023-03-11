import * as SecureStore from "expo-secure-store";

const profileKey = "@profile_key";

/**
 *
 * @param {Object} profile The profile object to save to secure store
 */
const saveProfile = async (profile) => {
  return await SecureStore.setItemAsync(profileKey, JSON.stringify(profile));
};

/**
 *
 * @returns The profile from the secure store
 */
const loadProfile = async () => {
  return await SecureStore.getItemAsync(profileKey);
};

module.exports = {
  saveProfile,
  loadProfile,
};
