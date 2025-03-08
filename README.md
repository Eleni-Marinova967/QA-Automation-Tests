# 🚀 QA Automation Tests with Cypress  

This repository contains **Cypress automation tests** for web application testing.  
The project is a **work in progress**, as I am actively learning and developing my skills in test automation.  

---

## 🌱 About This Project  
I started learning **Cypress** two months ago, and this project is my personal practice to improve my automation skills.  
Although the project is in its **early stages**, I am constantly improving and expanding it.  

✔ Covers **promo code creation tests** with different user roles.  
✔ Uses **best practices** such as **Page Object Model** and environment variables.  
✔ Ensures **test data security** (no credentials stored in the repository).  

I am **highly motivated** to continue learning and developing this project further! 🚀  

---

## 🛠️ Technologies Used  
- **Cypress** – End-to-end testing framework  
- **JavaScript** – Test scripting language  
- **Mocha & Chai** – Assertions  
- **XPath Selectors** – For dynamic element handling  
- **Page Object Model (POM)** – Structured test automation  

---
 
> ⚠ **Note:** This repository does not contain login credentials or environment variables.  


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

# 🐞 Bug Reports (Real Issues Found)  

During manual and automation testing, I have identified various **critical and functional issues** in the system.  
The list below includes **some of the bugs I have found**, demonstrating my ability to detect, analyze, and document defects effectively.  

| **Bug Title** | **Category** | **Steps to Reproduce** | **Expected Result** | **Actual Result** |
|--------------|-------------|------------------------|----------------------|--------------------|
| **Admin cannot change user email** | Critical | 1. Login as Admin.<br>2. Navigate to User Management.<br>3. Select a user and attempt to change the email.<br>4. Click 'Save'. | The email should be successfully updated. | An error appears, and the email remains unchanged. |
| **User cannot edit scheduled offer** | Critical | 1. Login as a user.<br>2. Navigate to 'Scheduled Offers'.<br>3. Edit an existing scheduled offer.<br>4. Click 'Save'. | The offer should be updated and saved successfully. | The changes are not saved, and no error message appears. |
| **Incorrect default end date for promotions** | Functional | 1. Create a new promotion.<br>2. Observe the default end date set by the system. | The end date should be two days after the start date. | The system sets an old date, requiring manual correction. |
| **Copying a promotion changes its image** | Functional | 1. Copy an existing promotion.<br>2. Check the image of the copied promotion. | The copied promotion should retain the original image. | A different or incorrect image appears. |
| **Search in admin panel returns no results** | Critical | 1. Login as Admin.<br>2. Use the search function to find an existing offer.<br>3. Observe the results. | Relevant offers matching the search should be displayed. | No results are returned, even if the offer exists. |
| **Filters stop working after sorting** | Functional | 1. Apply a category filter.<br>2. Sort the results by date.<br>3. Observe the filtered results. | The filtered items should remain visible. | All items are displayed, ignoring the active filter. |
| **Promo codes do not activate at the start date** | Critical | 1. Create a promo code with a future start date.<br>2. Wait for the activation time.<br>3. Check the promo code status. | The promo code should become active automatically. | The code remains in 'Scheduled' status past the start time. |
| **Promo code notifications duplicate** | UX | 1. Receive a promo code.<br>2. Observe the notifications. | Only one notification should appear. | Two identical notifications appear instead of one. |
| **Clearing search also removes category selection** | UI/UX | 1. Select a category.<br>2. Enter a search term.<br>3. Click the 'X' to clear the search. | Only the search text should be cleared. | Both the search text and selected category are removed. |
| **Saved searches do not refresh properly** | UI/UX | 1. Save a search query.<br>2. Refresh the page.<br>3. Observe the saved searches list. | Saved searches should remain visible and active. | The search text remains in the input field but is not actively applied. |

📌 **These are just some of the bugs I have found. I continue to actively test and report issues to improve product quality.** 🚀  


🎉 This project is just the beginning! I am excited to continue improving and learning more in the field of test automation. 🚀
