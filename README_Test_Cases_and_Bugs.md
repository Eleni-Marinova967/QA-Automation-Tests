# 📝 QA Manual Testing - Test Cases & Bug Reports  

This document contains some of my **manual test cases** and **real bugs** I have found while testing.  
It demonstrates my ability to design structured test scenarios and identify system defects.  

---

## 📌 Test Cases (Regression & Functional Testing)

| **Test Case ID** | **Title/Description** | **Steps** | **Expected Result** | **Pass / Fail** | **Comments** |
|-----------------|----------------------|----------|----------------------|----------------|-----------|
| **TC001** | Login without internet | 1. Open the mobile app.<br>2. Disconnect the internet on the device.<br>3. Try logging in. | A message should appear stating that an internet connection is required. | **Pass** | Error message displayed correctly. |
| **TC002** | Offer statistics synchronization between web and mobile | 1. Open the mobile app and view promotions (e.g., 6 promotions).<br>2. Switch to the web portal and check the statistics.<br>3. Open the mobile app again and scroll down to view 10 more offers.<br>4. Check the statistics again on the web. | The statistics should update correctly, reflecting the new number of viewed offers. | **Fail** | The web statistics do not update immediately, leading to discrepancies. |
| **TC003** | Searches Statistics - Matching algorithm validation | 1. Open the Searches statistics page.<br>2. Enter keywords in lowercase.<br>3. Enter the same keywords in uppercase.<br>4. Compare the results. | The results should be the same, regardless of letter case. | **Pass** | Search returns correct results. |
| **TC004** | Promo Code Status Update | 1. Log in as an admin.<br>2. Open the promo codes page.<br>3. Change the status of a promo code (Activate/Deactivate/Copy/Plan).<br>4. Observe the UI updates. | The promo code status should update instantly and correctly. | **Fail** | The UI does not always reflect the new status immediately. |
| **TC005** | Download Offer Statistics as CSV | 1. Open the Offer Statistics page.<br>2. Scroll to the bottom.<br>3. Click the "Download as CSV" button. | A CSV file with statistics should be downloaded. | **Pass** | CSV file downloads successfully. |
| **TC006** | Invalid Offer ID handling in statistics | 1. Open the Offer Statistics page.<br>2. Enter an invalid Offer ID (random characters).<br>3. Click outside the input field. | A message should appear stating that the ID is invalid. | **Fail** | No message appears, and the statistics remain unchanged. |

---

## 🐞 Bug Reports (Real Issues Found)  

During manual and automation testing, I have identified various **critical and functional issues** in the system.  
The list below includes **some of the bugs I have found**, demonstrating my ability to detect, analyze, and document defects effectively.  

| **Bug Title** | **Category** | **Steps to Reproduce** | **Expected Result** | **Actual Result** |
|--------------|-------------|------------------------|----------------------|--------------------|
| **Admin cannot change user email** | Critical | 1. Login as Admin.<br>2. Navigate to User Management.<br>3. Select a user and attempt to change the email.<br>4. Click 'Save'. | The email should be successfully updated. | An error appears, and the email remains unchanged. |
| **User cannot edit scheduled offer** | Critical | 1. Login as a user.<br>2. Navigate to 'Scheduled Offers'.<br>3. Edit an existing scheduled offer.<br>4. Click 'Save'. | The offer should be updated and saved successfully. | The changes are not saved, and no error message appears. |
| **Incorrect default end date for promotions** | Functional | 1. Create a new promotion.<br>2. Observe the default end date set by the system. | The end date should be two days after the start date. | The system sets an old date, requiring manual correction. |

📌 **These are just some of the test cases and bugs I have worked on. I continue to expand my knowledge and improve test coverage.** 🚀  
