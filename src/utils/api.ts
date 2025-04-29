import axios from "axios";

export const machineIpAddress = "http://192.168.1.101";

export const api = axios.create({
  baseURL: `${machineIpAddress}:3001`,
});
