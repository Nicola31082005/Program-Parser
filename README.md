# UNWE Program Viewer

This project provides a web-based interface where students of the UNWE (University of National and World Economy) in Sofia can view their semester schedule. The system allows students to select their group and see the corresponding schedule for their lectures. The project was built using **Puppeteer** to scrape and render the UNWE program schedule, overcoming the limitations of the official schedule system.

## Features

- **Group Selection**: Users can filter the schedule based on their group number.
- **Semester Updates**: The schedule automatically updates once per semester using a Puppeteer script that scrapes the new program from the UNWE website.
- **Filtered Display**: Unlike the official UNWE timetable, this application allows users to filter the schedule based on their group, making it more user-friendly.
- **Searchable Program**: The schedule can be searched and displayed with all essential details, such as day, time, discipline, type (compulsory/elective), lecturer, and study hall.

## Technologies Used

- **Node.js**: Backend server for the application.
- **Express.js**: Web framework for building the RESTful API and serving the pages.
- **Puppeteer**: Tool for web scraping to extract the latest semester's schedule from the official UNWE website.
- **MongoDB**: Database for storing the program data.
- **Handlebars.js (HBS)**: Templating engine to render HTML pages dynamically.
- **CSS**: Styles for the frontend design with a custom color scheme inspired by the UNWE official branding.

## Live Demo

You can view the live version of the application at:  
[UNWE Program Viewer](https://program-parser.vercel.app/)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/unwe-program-viewer.git
   cd unwe-program-viewer
