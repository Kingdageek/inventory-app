let CORE_URL = "";
let APP_URL = "";
let URL_PROTOCOL = "";
const APP_NAME = "Inventory-service";

if (process.env.REACT_APP_WEB_ENV === "backend_dev") {
  CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
} else if (process.env.REACT_APP_WEB_ENV === "staging") {
  CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
} else if (process.env.REACT_APP_WEB_ENV === "prod") {
  CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
} else {
  CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
}

export { APP_URL, CORE_URL, APP_NAME, URL_PROTOCOL };