import axios from "axios";
import config from "../config/config";
import { PRODUCT } from "../constants/backend.constants";

type ListProductApi = {
  query?: Record<string, any>;
};

const listProducts = (args?: ListProductApi) => {
  let url = config.BACKEND_BASE + PRODUCT.LIST;
  console.log(url);
  return axios.get(url);
};

export { listProducts };
