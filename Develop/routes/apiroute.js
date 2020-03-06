const router = require("express").Router();
const Workouts = require("../models/workouts.js");

router.post("/api/exercise", ({body}, res) =>{
    Workouts.create(body)
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts/exercises", ({body}, res) =>{
    Workouts.insertMany(body)
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    Workouts.find({})
    .sort({
        // idk what to do here yet and am getting tired
    })
    .then(dbWorkouts =>{
        res.json(dbWorkouts);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});

module.exports = router;