import { Router } from "express";
import puppeteer from "puppeteer";

const routes = Router();
const url = 'https://www.unwe.bg/bg/timetables/semesterresult?degID=1&cityID=1&formID=1&spec=2380&sem=2'

routes.get('/', (req, res) => {
    res.render('table', { layout: false  })
})

routes.get('/render-table', async (req, res) => {
   
// Launch the browser and open a new blank page
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto(url)

await page.setViewport({ width: 1080, height: 1920 })



// await browser.close();
res.end()

})




export default routes