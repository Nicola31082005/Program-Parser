import { Router } from "express";
import puppeteer from "puppeteer";
import programService from "../services/programService.js";

const routes = Router();
const url = 'https://www.unwe.bg/bg/timetables/semesterresult?degID=1&cityID=1&formID=1&spec=2380&sem=2';

// routes.get('/', (req, res) => {
//     res.render('table', { layout: false });
// });

routes.get('/render-table', async (req, res) => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Capture console logs from the page
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

    await page.setViewport({ width: 1080, height: 1920 });

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Extract data from the page
        const tableData = await page.evaluate(() => {
            const tbody = document.querySelector('.timetable > tbody');
            if (!tbody) return []; // Return an empty array if the table is not found

            const rows = Array.from(tbody.querySelectorAll('tr'));

            return rows.map(row => {
                const cells = Array.from(row.children)
                .filter(td => td.textContent.trim() !== '')
                .map(td => { 
                    const cellText = Array.from(td.childNodes)
                    .map(node => node.textContent.trim())
                    .filter(text =>  {                        
                        return text !== ''
                    })
                    .join(', ')

                    const cleanedText = cellText.replace(/\(карта\)/g, '').trim();
        
                    return cleanedText
                })
    
                return cells;
            });

        });

        const data = programService.generateCleanTableData(tableData)

        console.log("Extracted Table Data:", data);

        // Close browser
        await browser.close();
        
        await programService.saveProgram(data)


        // Send extracted data as JSON
        res.json({ tableData });
    } catch (error) {
        console.error("Error fetching timetable:", error);
        await browser.close();
        res.status(500).json({ error: "Failed to fetch timetable data" });
    }


});

routes.get('/table', async (req, res) => {
    const programData = await programService.getProgramData();
    const programNames = [ 'поток / група',	'ден', 'час', 'дисциплина', 'вид', 'тип', 'преподавател', 'зала за присъствено обучение' ] 
    console.log(programNames);
    
    res.render('table', { programData, layout: false, programNames })
   
})

export default routes;
