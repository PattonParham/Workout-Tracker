let db;

const request = indexDB.open("workouts", 1);

request.onupgraded = function(event) {
    const db = event.target.result;
    db.createObjectStore("workouts", {autoIncrement: true});
};

request.onsuccess = function(event){
    db = event.target.result;
    if (navigator.onLine){
        checkDatabase();
    };
};

request.onerror = function(event){
    console.log("Woops" + event.target.errorCode);
};

function saveExercise(exercise) {
    const workout = db.workout(["workouts"], "readwrite");
    const workouts = workout.objectStore("workouts");
    workouts.add(exercise);
}

function checkDatabase() {
    const workout = db.workout(["workouts"], "readwrite");
    const workouts = workout.objectStore("workouts");
    const getAll = workouts.getAll();

    getAll.onsuccess = function(){

        if (getAll.result.length > 0){
            fetch("/api/exercise", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(()=>{
                const workout = db.workout(["workouts"], "readwrite");
                const workouts = workout.createObjectStore("workouts");
                workouts.clear();
            });
        };

    };
};
 window.addEventListener("online", checkDatabase);


