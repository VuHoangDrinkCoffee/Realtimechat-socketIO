import axios from "axios";

axios.get('http://localhost:3000/')
 .then(function(response){
    console.log(response)
 })
 .catch(function(error){
    console.log(error)
 })