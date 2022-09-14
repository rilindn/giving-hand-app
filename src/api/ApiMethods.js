import { Client } from "./ApiBase";

// Users

export async function getAllUsers() {
  try {
    const result = await Client.get(`user`);
    return result.data;
  } catch (err) {
    console.error("getAllUsers", err);
  }
}
