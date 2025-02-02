import Program from "../src/models/progam-model.js";

// Retry operation utility function
async function retryOperation(fn, retries = 5, delay = 1000) {
    let attempt = 0;

    while (attempt < retries) {
        try {
            return await fn(); // Try to execute the function
        } catch (err) {
            attempt++;
            console.log(`Attempt ${attempt} failed. Retrying...`);

            if (attempt >= retries) {
                throw new Error('Max retries reached');
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
            delay = delay * 2; // Optional: exponential backoff
        }
    }
}

export default {
    // Save the program to the database
    async saveProgram(data) {
        await Program.create(data);
    },

    // Generate cleaned-up table data
    generateCleanTableData(data) {
        return data.map(table => { 
            return {
                schoolStream: table[0],
                day: table[1],
                time: table[2],
                Discipline: table[3],
                Type: table[4],
                Kind: table[5],
                Lecturer: table[6],
                studyHall: table[7]
            };
        });
    },

    // Get program data with retry logic
    async getProgramData() {
        return await retryOperation(async () => {
            return await Program.find({}).lean().sort({ Kind: 1, Type: 1 });
        });
    }
};
