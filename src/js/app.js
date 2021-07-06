
//get data from local json file 


const Data = require("../data/dino.json");
const Dinos = Data["Dinos"];

const comparingApp = (function () {

    //catch elements from DOM 

    let button = document.getElementById("btn");
    let restButton = document.getElementById("restbtn");
    let inputDataDiv = document.getElementById("dino-compare");
    let GridOutput = document.getElementById("grid");

    //initiate human object
    let human = {};

    // creating a generic comparing function that return a specific comparison function  

    let comparing = function (animal, human, property) {
        
        return function compare() {
            if (human[property] > animal[property]) {
                return `${human.name}  ${property} > ${animal.species}'s  ${property} `
            }
            else if(human[property] < animal[property] ){
                return `${animal.species}   ${property} > ${human.name}'s  ${property}`
            }
            else{
                 return `${animal.species}   ${property} = ${human.name}'s  ${property}`
            };
        }

    };
    let compareDiet = function (animal, human) {
        return function () {
        
            if(animal.diet != human.diet){
            return `${animal.species} diet is ${animal.diet} while ${human.name} is ${human.diet}`}
            else{
                return `${animal.species} and ${human.name} are on the same diet : ${animal.diet} ` 
            }
        };

    };
    let compareName = function (animal,human ){
        return function () {
           return `your name is ${human.name} , while this Dino name is ${animal.species}`
        };
    } ;

    // Create Dino objects using module pattern

    function createDinos(Dino, human, img) {
        let species = Dino.species;
        let weight = Dino.weight;
        let height = Dino.height;
        let diet = Dino.diet;
        let where = Dino.where;
        let when = Dino.when;
        let fact = Dino.fact;
        let image = `../src/images/${img}.png`
        let compareDinoHeight = comparing(Dino, human, "height");
        let compareDinoweight = comparing(Dino, human, "weight");
        let compareDinoDiet = compareDiet(Dino, human);
        let compareDinoName= compareName(Dino,human);

        return Object.assign({}, {
            species,
            weight,
            height,
            diet,
            where,
            when,
            fact,
            image,
            compareDinoHeight,
            compareDinoweight,
            compareDinoDiet,
            compareDinoName,
        })
    };


    //create a dino with specific fact "all birds are Dinasours"

    function createSpecificDino(human, Dino,img) {
        let species = Dino.species;
        let weight = Dino.weight;
        let height = Dino.height;
        let diet = Dino.diet;
        let where = Dino.where;
        let when = Dino.when;
        let fact = Dino.fact;
        let image = `../src/images/${img}.png`


        compareDinoHeight = comparing(Dino, human, "height");
        compareDinoweight = comparing(Dino, human, "weight");
        compareDinoDiet = compareDiet(Dino, human);
        let compareDinoName= compareName(Dino,human);
        return {
            species,
            weight,
            height,
            diet,
            where,
            when,
            fact:"All birds are Dinosaurs.",
            compareDinoHeight,
            compareDinoweight,
            compareDinoDiet,
            image,
            compareDinoName,
            
        }

    };
   


    //updating UI elements

//make a shuffle function to shuffle arrays then make a random UI tiles
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    function updatingUI(humanData, DinosData, specDinoData) {

    

    let DinoObjects = [];
       
    //create 8 dino instance
    for (let i = 0 ; i < 8 ; i++){
        DinoObjects.push(createDinos(Dinos[i], human, i));
    } ; 

    //create random dino object weith fact all birds are dinasours.
    const randNumber = Math.floor(Math.random()*8);
    let specDino = createSpecificDino(human, Dinos[randNumber],randNumber) ;
 
    delete DinoObjects[randNumber] ;
    DinoObjects.splice(randNumber,1) ;
    DinoObjects.push(specDino);

        //updating dinos UI

        let shuffledDinos = shuffle(DinoObjects);
       
        let itemsElements = [];

        for (let i = 0; i < 8  ; i++) {
        
            itemsElements.push(document.getElementById(`item-${i}`));
            // itemsElements[i].classname = `grid-item:nth-child(${i})`;
            document.querySelector(`#item-${i} img`).src = shuffledDinos[i].image;
            document.querySelector(`#item-${i} h2`).textContent = `${shuffledDinos[i].species}`;
            document.querySelector(`#item-${i} .first`).textContent = `${shuffledDinos[i].compareDinoHeight()}`;
            document.querySelector(`#item-${i} .second`).textContent = `${shuffledDinos[i].compareDinoweight()}`;
            document.querySelector(`#item-${i} .third`).textContent = `${shuffledDinos[i].compareDinoDiet()}`;
            document.querySelector(`#item-${i} .fourth`).textContent = `${shuffledDinos[i].compareDinoName()}`;


            //displaying facts &specific fact "all birds are dinasours" 
            document.querySelector(`#item-${i} p`).textContent = `${shuffledDinos[i].fact}`
          
        }


        //updating human UI

        document.querySelector("#human h2").textContent = human.name;
        document.querySelector("#human img").src = human.img;
        document.querySelector(`#human .first`).textContent = `Height : ${human.height} inch`;
        document.querySelector(`#human .second`).textContent = `Weight : ${human.weight} lb`;
        document.querySelector(`#human .third`).textContent = `Diet  : ${human.diet} `;


    };
    function showComparison() {
        //getting user data
        human.name = document.getElementById("name").value;
        human.feet = document.getElementById("feet").value;
        human.inches = document.getElementById("inches").value;
        human.weight = document.getElementById("weight").value;
        human.diet = document.getElementById("diet").value.toLowerCase();
        human.img = "../src/images/human.png";

        //validate input
        if (human.name == "" || human.weight == "" || human.feet == "") {
            alert("please fill all inputs");
            return false;
        }

        if (human.feet != "") {
            human.height = human.feet * 12;
        }

        //hide input panel 
        inputDataDiv.style.display = "none";
        //show output grid 
        GridOutput.style.display = "flex";
        restButton.style.display = "block";
        //show grid tiles 
        updatingUI();


    }
    function restart() {
        GridOutput.style.display = "none";
        restButton.style.display = "none";
        inputDataDiv.style.display = "block";

    }



    button.addEventListener("click", showComparison);
    restButton.addEventListener("click", restart);


})();

