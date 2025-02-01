import Program from "../src/models/progam-model.js"


export default {

    async saveProgram(data){
        await Program.create(data)
    },
    generateCleanTableData(data) {
        return data.map(table => { // Return mapped array
          return {
                schoolStream: table[0],
                day: table[1],
                time: table[2],
                Discipline: table[3],
                Type: table[4],
                Kind: table[5],
                Lecturer: table[6],
                studyHall: table[7]
            }
        });
    },
    async getProgramData(){
        return await Program.find({}).lean()
    }
}