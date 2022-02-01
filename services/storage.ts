import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { storage } from "./firebase-client";

export const getStorageUrl = (imagePath: string) => {
  return getDownloadURL(storageRef(storage, imagePath));
};
