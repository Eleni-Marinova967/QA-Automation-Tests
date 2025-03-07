<<<<<<< HEAD
# 🚀 Cypress Web Automation Tests  

This repository contains **Cypress end-to-end (E2E) tests** for web automation, covering **Promo Code Page** and **Saved Searches Page** functionalities.

---

## 📌 Project Overview  
The automation scripts include:  
✅ **UI tests** (checking page elements and sorting functionality)  
✅ **API authentication tests**  
✅ **Custom Cypress commands for reusable actions**  
✅ **XPath selectors for element targeting**  

I have nearly **two years of experience in manual testing**, working with this platform.  
Two months ago, I started learning **Cypress automation** on my own, aiming to convert my manual test cases into automated tests.  
I began with the **simplest page** and am continuously expanding the test coverage. This project is still **a work in progress**.

---

## 📂 Folder Structure  
📂 cypress
├── 📂 e2e # Cypress test files (.cy.js)
│ ├── promoCodePageTests.cy.js # Tests for promo codes
│ ├── savedSearchesPageTests.cy.js # Tests for saved searches
├── 📂 resources # Page objects and test data
│ ├── locators.js # All element selectors
│ ├── system.js # API endpoints
│ ├── testData.js # Test data (credentials, promo codes)
│ ├── Pages # Functions for page interactions
│ ├── promoCodePage.js
│ ├── savedSearchesPage.js
├── 📂 support # Custom Cypress commands
│ ├── commands.js # API login and reusable functions
📄 e2e.js # Cypress support file
📄 cypress.config.js # Cypress configuration
📄 package.json # Project dependencies
📄 package-lock.json # Dependency lock file
📄 README.md # Project documentation


---

## 🛠️ Technologies Used  
- **Cypress** – For E2E automation testing  
- **JavaScript** – Test scripting  
- **Mocha & Chai** – Assertions  
- **cypress-xpath** – XPath support  
- **cypress-file-upload** – File upload testing  

---

## 🚀 Installation & Setup  
###Clone the Repository  

git clone https://github.com/Eleni-Marinova967/QA-Automation-Tests.git
cd QA-Automation-Tests

Install Dependencies
npm install


To open the Cypress Test Runner:
npx cypress open

To run tests in headless mode:
npx cypress run


Test Scenarios
✅ Promo Code Page Tests (promoCodePageTests.cy.js)
Check if Heading, Table, and New Promo Code Button exist
Validate Sorting Functionality (ID, Type, Start Date, End Date, Status, Discount, Name)
Test Creating a New Promo Code
✅ Saved Searches Page Tests (savedSearchesPageTests.cy.js)
Check if Heading and Table exist
Validate Sorting Functionality (ID, Device ID, Name, Search Text, Category, Creation Date, Last Change Date, Status)


🔹 Custom Cypress Commands (commands.js)

cy.apiLogin(username, password)	- Logs in via API and stores the token in Cypress.env()

## 🏗️ Future Improvements  
 
🔹 Expand automation coverage to more complex pages  
🔹 Continue improving my Cypress skills and refining test automation  
=======
# QA-Automation-Tests
Repository for my Cypress end-to-end automation test scripts
>>>>>>> 77546ae59615d6f6dded28548d5841e931a44354
