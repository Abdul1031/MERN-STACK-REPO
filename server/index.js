const path = require("path");

// Load .env file only in development (Azure App Service sets env vars directly)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8080;

connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});
