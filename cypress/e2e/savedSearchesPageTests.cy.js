import * as ssp from '../resources/Pages/savedSearchesPage.js';

//import * as res from '../../resources/mainResource';

/// <reference types="cypress" />



// // TEST CASES FOR SAVED SEARCHES PAGE

describe('Test to see if the Heading And the Table of the Saved Searches Page exist', () => {
  it('Check if the Heading of the Saved Searches page exists', () => {
     ssp.LoginAdmin();  
     ssp.navigateToSavedSearchesPage();
   })
   it('Check if the Table in the Saved Searches page exists', () => {
     ssp.LoginAdmin();
     ssp.navigateToSavedSearchesPage();
     //Checking if table exists
     ssp.savedSearchesPageTableCheck(); 
   })
 })

describe('Test to see if the Sorting of the columns of the Table on the Saved Searches Page works', () => {
   it('Check if the Sorting of the ID column works', () => {
     ssp.LoginAdmin();
     //Check if sorting on ID column of the table in the saved searches page is working
     ssp.savedSearchesPageIDColumnSort(); 
   })
   it('Check if the Sorting of the Device ID column works', () => {
     ssp.LoginAdmin();
     //Check if sorting on Device ID column of the table in the saved searches page is working
     ssp.savedSearchesPageDeviceIDColumnSort(); 
   })
   it('Check if the Sorting of the Name column works', () => {
    ssp.LoginAdmin();
     //Check if sorting on Name column of the table in the saved searches page is working
     ssp.savedSearchesPageNameColumnSort(); 
   })
   it('Check if the Sorting of the Search Text column works', () => {
    ssp.LoginAdmin();
    //Check if sorting on Search Text column of the table in the saved searches page is working
    ssp.savedSearchesPageSearchTextColumnSort(); 
  })
  it('Check if the Sorting of the Category column works', () => {
    ssp.LoginAdmin();
    //Check if sorting on Category column of the table in the saved searches page is working
    ssp.savedSearchesPageCategoryColumnSort(); 
  })
  it('Check if the Sorting of the Creation Date column works', () => {
    ssp.LoginAdmin();
    //Check if sorting on Creation Date column of the table in the saved searches page is working
    ssp.savedSearchesPageCreationDateColumnSort(); 
  })
  it('Check if the Sorting of the Date of Last Change column works', () => {
    ssp.LoginAdmin();
    //Check if sorting on Date of last change column of the table in the saved searches page is working
    ssp.savedSearchesPageLastChangeDateColumnSort(); 
  })
  it('Check if the Sorting of the Status column works', () => {
    ssp.LoginAdmin();
    //Check if sorting on Status column of the table in the saved searches page is working
    ssp.savedSearchesPageStatusColumnSort(); 
  })
})