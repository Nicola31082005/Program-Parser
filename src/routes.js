import { Router } from "express";
import puppeteer from "puppeteer";

const routes = Router();
const url = 'https://www.unwe.bg/bg/timetables/semesterresult?degID=1&cityID=1&formID=1&spec=2380&sem=2';

routes.get('/', (req, res) => {
    res.render('table', { layout: false });
});

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
                .map(td => td.textContent.trim());
                return cells;
            });
        });

        console.log("Extracted Table Data:", tableData);

        // Close browser
        await browser.close();

        // Send extracted data as JSON
        res.json({ tableData });
    } catch (error) {
        console.error("Error fetching timetable:", error);
        await browser.close();
        res.status(500).json({ error: "Failed to fetch timetable data" });
    }
});

export default routes;
