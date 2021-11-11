const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2
    let newRecipe = {
      title: "Curry Rice",
      level: "Easy Peasy",
      cuisine: "Indian"
    }
    return Recipe.create(newRecipe)
  })

  .then((newRecipe)=> {
    console.log(newRecipe.title)
    //Iteretion 3
      return Recipe.insertMany(data)
    })
  .then ((ourRecipe) => {
    ourRecipe.forEach((elem)=>{
      console.log(elem.title)
    })
  //Iteration 4
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration:100})
  })
  .then(()=>{
    console.log('Rigatoni duration updated!')
  })

  //Iteration 5
  .then(()=>{
    return Recipe.deleteOne({title:'Carrot Cake'})
  })

  //Iteration 6
  .then(()=>{
    return mongoose.connection.close()
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
