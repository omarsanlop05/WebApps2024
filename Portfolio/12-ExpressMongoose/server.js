const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const moment = require("moment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England", nationality: "British"},
  { code: "SPA", label: "Spain", nationality: "Spanish"},
  { code: "GER", label: "Germany", nationality: "British" },
  { code: "FRA", label: "France", nationality: "French" },
  { code: "MEX", label: "Mexico", nationality: "Mexican" },
  { code: "AUS", label: "Australia", nationality: "Australian" },
  { code: "FIN", label: "Finland", nationality: "Finnish" },
  { code: "NET", label: "Netherlands", nationality: "Dutch" },
  { code: "CAN", label: "Canada", nationality: "Canadian" },
  { code: "MON", label: "Monaco", nationality: "Monegasque" },
  { code: "THA", label: "Thailand", nationality: "Thai" },
  { code: "JAP", label: "Japan", nationality: "Japanese" },
  { code: "CHI", label: "China", nationality: "Chinese" },
  { code: "USA", label: "USA", nationality: "American" },
  { code: "DEN", label: "Denmark", nationality: "Danish" },
];

const loadData = async (req, res, next) => {
  try {
      const drivers = await Driver.find();
      const teams = await Driver.distinct("team.name").then(teamNames => teamNames.map(name => ({ name })));
      req.data = { drivers, teams, countries };
      next();
  } catch (error) {
      console.error("Error loading data:", error);
      res.status(500).send("Error loading data.");
  }
};

app.get("/", loadData, (req, res) => {
  const { drivers, teams, countries } = req.data;
  res.render("index", { drivers, teams, countries });
});


const cleanRow = (row) => {
  const cleanedRow = {};
  for (const key in row) {
      const cleanedKey = key.replace(/^\s+|\s+$/g, '').replace(/[^\x20-\x7E]/g, ''); // Clean keys
      const cleanedValue = row[key].replace(/[^\x20-\x7E]/g, '').trim(); // Clean values
      cleanedRow[cleanedKey] = cleanedValue;
  }
  return cleanedRow;
};

const importDataFromCSV = (filePath) => {
  fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
          try {
              const cleanedRow = cleanRow(row); // Clean the row

              const driver = new Driver({
                  num: parseInt(cleanedRow.number, 10),
                  code: cleanedRow.code,
                  forename: cleanedRow.forename,
                  surname: cleanedRow.surname,
                  dob: moment(cleanedRow.dob, "DD/MM/YYYY").isValid() ? moment(cleanedRow.dob, "DD/MM/YYYY").toDate() : null,
                  nationality: cleanedRow.nationality,
                  url: cleanedRow.url,
                  team: { name: cleanedRow.current_team },
              });

              if (driver.dob === null) {
                  console.error(`Invalid date format for driver: ${driver.forename} ${driver.surname}`);
                  return;
              }

              await driver.save();
              console.log(`Saved driver: ${driver.forename} ${driver.surname}`);
          } catch (error) {
              console.error("Error saving driver:", error);
          }
      })
      .on("end", () => {
          console.log("CSV file successfully processed.");
      })
      .on("error", (error) => {
          console.error("Error processing CSV file:", error);
      });
};

importDataFromCSV("public/data/f1_2023.csv");

const clearDatabase = async () => {
  try {
      await Driver.deleteMany({}); // Deletes all documents in the Driver collection
      await Team.deleteMany({});   // Deletes all documents in the Team collection
      console.log("All documents in Driver and Team collections have been deleted.");
  } catch (error) {
      console.error("Error clearing database:", error);
  }
};

app.post("/driver", async (req, res) => {
  try {
    
    const { num, code, name, lname, dob, nation, url, teamName } = req.body;

    
    /*
    if (!team) {
      team = new Team({ name: teamName, nationality: nation, url });
      await team.save();
    }
    */

    const driver = new Driver({
      num,
      code,
      forename: name,
      surname: lname,
      dob,
      nationality: nation,
      url,
      team : { name: teamName },
    });

    await driver.save();

    //res.status(201).send("Driver information saved successfully.");
    res.redirect("/");
  } catch (error) {
    console.error("Error saving driver:", error);
    res.status(500).send("An error occurred while saving driver data.");
  }
});

app.get("/drivers/edit/:id", async (req, res) => {
    const driverId = req.params.id;
    const driver = await Driver.findById(driverId).populate("team");
    const teams = await Driver.distinct("team.name").then(teamNames => {
      return teamNames.map(name => ({ name })); // Format it to an array of objects
    });
    res.render("edit", { driver, teams, countries });
});

app.post("/drivers/edit/:id", async (req, res) => {
  try {
      const driverId = req.params.id;
      const { num, code, name, lname, dob, nationality, url, team } = req.body;

      
      var driverTeam = { name: team };
      /*
      if (!driverTeam) {
          driverTeam = new Team({ name: team });
          await driverTeam.save();
      }
      */

      // Actualizar el conductor con los datos del formulario
      await Driver.findByIdAndUpdate(driverId, {
          num,
          code,
          forename: name,
          surname: lname,
          dob,
          nationality,
          url,
          team: driverTeam,
      });

      res.redirect("/"); // Redirige a la página principal después de la edición
  } catch (error) {
      console.error("Error updating driver:", error);
      res.status(500).send("An error occurred while updating driver data.");
  }
});

app.get("/clear", async (req, res) => {
  await clearDatabase();
  //res.status(200).send("Database has been cleared.");
  res.redirect("/"); // Redirige a la página principal después de limpiar la base de datos
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
