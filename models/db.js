import monk from "monk";

const db = monk("localhost/foodScreen");
export default db;
