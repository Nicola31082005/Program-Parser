import { Scema, model } from 'mongoose'


const programSchema = new Schema ({
    schoolStream: Number,
    day: String,
    time: String,
    Discipline: String,
    Type: String,
    Lecturer: String,
    studyHall: String 
});


const Program = model('Program', programSchema);

export default Program

