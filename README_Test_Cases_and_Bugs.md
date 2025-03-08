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

📌 **These are just some of the test cases and bugs I have worked on. I continue to expand my knowledge and improve test coverage.** 🚀  

## 📌 Training & Practice Experience  
🎓 *This section includes test cases and bug reports created during my QA training and practice sessions.*  
These cover various **functional, UI, and validation scenarios**, helping me develop structured test documentation and improve my analytical skills.  

### **Test Cases from Training**

| **Test Case ID** | **Title/Description** | **Steps** | **Expected Result** | **Pass / Fail** | **Comments** |
|-----------------|----------------------|----------|----------------------|----------------|-----------|
| **LP6** | Footer copyright text "TimeWise" should redirect to the Terms of Service page | 1. Open the web application.<br>2. Scroll to the bottom of the page.<br>3. Click on the "TimeWise" text in the footer. | Clicking "TimeWise" should redirect to the Terms of Service page. | **Fail** | It does not open the Terms of Service page. |
| **UR1** | Last Name field label is incorrect | 1. Navigate to the Register page.<br>2. Check the field labels for First Name, Middle Name, Last Name. | The labels should be correctly assigned. | **Fail** | The Last Name field is labeled as "Middle Name". |
| **UR9** | Terms of Service checkbox is not mandatory for account creation | 1. Go to the Register form.<br>2. Try submitting the form without checking the Terms of Service checkbox. | An error should appear stating the checkbox must be selected. | **Fail** | The account is created even when the checkbox is not selected. |
| **UL5** | Clicking "Forgot Password" does not work | 1. Navigate to the Login page.<br>2. Click on the "Forgot Password" link. | The Restore Password page should open. | **Fail** | The button does nothing when clicked. |
| **UL7** | Register hyperlink does not work | 1. Navigate to the Login page.<br>2. Click on the "Register" hyperlink. | The Register form should appear. | **Fail** | The hyperlink does not work. |
| **PM2** | Edit Profile button does not work | 1. Navigate to the Profile page.<br>2. Click on the "Edit Profile Info" button. | Clicking the button should open the Edit Profile page. | **Fail** | The button is present but does not work. |
| **PM5** | Profile edits do not save | 1. Update First Name, Last Name, or Avatar URL.<br>2. Click "Edit". | The profile should be updated successfully. | **Fail** | The changes are not saved. |
| **TCM1** | Task status update does not reflect in UI | 1. Create a new task.<br>2. Move it to "In Progress".<br>3. Move it to "Done". | The task should appear under the correct board based on its status. | **Pass** | The feature works correctly. |
| **TCM11** | Task delete button removes the task from the board | 1. Click the "Delete" button on a task. | The task should be deleted and no longer visible. | **Pass** | Tasks are successfully removed. |

### **Bug reports from Training**

| **Bug ID** | **Priority** | **Severity** | **Title** | **Steps to reproduce** | **Expected Result** | **Actual Result** |
|------------|------------|------------|-----------|----------------------|----------------------|--------------------|
| **B1** | High | Medium | Clicking "TimeWise" in the footer does not open the Terms of Service page | 1. Open the web application.<br>2. Scroll to the bottom.<br>3. Click on "TimeWise" in the footer. | It should redirect to the Terms of Service page. | It is clickable but does nothing. |
| **B3** | High | Critical | Terms of Service checkbox is not required for account creation | 1. Navigate to the Register page.<br>2. Try submitting the form without checking the checkbox. | An error should appear requiring selection. | The account is created without accepting the terms. |
| **B5** | High | High | User can register without entering a middle name | 1. Navigate to the Register page.<br>2. Fill some fields but leave Middle Name empty.<br>3. Submit the form. | All fields should be required. | The account is created successfully without a middle name. |
| **B7** | High | Critical | "Forgot Password" button does not work | 1. Navigate to the Login page.<br>2. Click "Forgot Password". | The Reset Password page should open. | Nothing happens. |
| **B9** | High | High | Edit Profile button does not work | 1. Navigate to the Profile page.<br>2. Click on the "Edit Profile" button. | The user should be redirected to the Edit Profile page. | The button does nothing. |
| **B10** | High | Critical | Profile updates do not save | 1. Edit the First Name, Last Name, or Avatar URL.<br>2. Click "Edit". | The profile changes should be saved. | The changes are lost after page reload. |

