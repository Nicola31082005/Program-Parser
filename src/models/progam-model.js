import { Schema, model } from 'mongoose'


const programSchema = new Schema ({
    schoolStream: String,
    day: String,
    time: String,
    Discipline: String,
    Type: String,
    Kind: String,
    Lecturer: String,
    studyHall: String 
});


const Program = model('Program', programSchema);

export default Program

