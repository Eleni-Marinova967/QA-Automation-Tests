import * as pcp from '../resources/Pages/promoCodePage.js';

/// <reference types="cypress" />


// // TEST CASES FOR PROMO CODE PAGE

describe('Test to see if the Heading And the Table of the Promo Code Page exist', () => {
  it('Check if the Heading of the Promo Code page exists', () => {
     pcp.LoginAdmin(); 
     pcp.navigateToPromoCodePage();
   })
   it('Check if the Table in the Promo Code page exists', () => {
     pcp.LoginAdmin();
    pcp.navigateToPromoCodePage();
     //Checking if table exists
    pcp.promoCodePageTableCheck(); 
   })
   it('Check if the New Promo Code Button in the Promo Code page exists', () => {
     pcp.LoginAdmin();
    pcp.navigateToPromoCodePage();
     //Checking if button exists
    pcp.promoCodePageNewPCButtonCheck(); 
   })
 })
 
 describe('Test to see if the Sorting of the columns of the Table on the Promo Code Page works', () => {
    it('Check if the Sorting of the ID column works', () => {
       pcp.LoginAdmin();
      //Check if sorting on ID column of the table in the saved searches page is working
      pcp.promoCodePageIDColumnSort(); 
    })
    it('Check if the Sorting of the Type column works', () => {
       pcp.LoginAdmin();
      //Check if sorting on Type column of the table in the saved searches page is working
      pcp.promoCodePageTypeColumnSort(); 
    })
    it('Check if the Sorting of the Start Date column works', () => {
       pcp.LoginAdmin();
      //Check if sorting on Start Date column of the table in the saved searches page is working
      pcp.promoCodePageStartDateSort(); 
    })
    it('Check if the Sorting of the End Date column works', () => {
       pcp.LoginAdmin();
      //Check if sorting on End Date column of the table in the saved searches page is working
      pcp.promoCodePageEndDateSort(); 
   })
   it('Check if the Sorting of the Status column works', () => {
       pcp.LoginAdmin();
      //Check if sorting on Status column of the table in the saved searches page is working
      pcp.promoCodePageStatusColumnSort(); 
   })
   it('Check if the Sorting of the Discount column works', () => {
      pcp.LoginAdmin();
     //Check if sorting on Discount column of the table in the saved searches page is working
     pcp.promoCodePageDiscountColumnSort(); 
   })
   it('Check if the Sorting of the Name column works', () => {
      pcp.LoginAdmin();
     //Check if sorting on Name column of the table in the saved searches page is working
     pcp.promoCodePageNameColumnSort(); 
   })
 })

 describe('Test to verify Promo Code creation functionality.', () => {
  it('Should create a new promo code as an Admin with all types selected',() => {
     pcp.LoginAdmin();
    pcp.navigateToPromoCodePage();
    //create a promo code with valid input
    pcp.createPromoCodeAsAdmin();
  })
  it('Should create a new promo code as an Admin with only one type selected',() => {
    pcp.LoginAdmin();
    pcp.navigateToPromoCodePage();
    //create a promo code with valid input
    pcp.createPromoCodeWithSingleTypeAndDate();
  })
  it('Should create a new promo code as a Regular User with only one type selected',() => {
    pcp.LoginUser();
    pcp.navigateToPromoCodePage();
    //create a promo code with valid input
    pcp.createPromoCodeWithUserTypeAndDate();
  })
 })

 //============================================== PAIR WISE TEST CASES ==============================================================
const pairwiseTestCases = [
  {
      testID: "TC-1",
      discountType: testData.NEW_PROMO_CODE_DISCOUNT_TYPE_PERCENTAGE,
      promoType: testData.NEW_PROMO_CODE_TYPE_VIEWED_OFFERS,
      includeLink: true,
      selectionType: [testData.NEW_PROMO_CODE_ONLINE_TYPE]
  },
  {
      testID: "TC-2",
      discountType: testData.NEW_PROMO_CODE_DISCOUNT_TYPE_FIXED,
      promoType: testData.NEW_PROMO_CODE_TYPE_LIKED_OFFERS,
      includeLink: false,
      selectionType: [testData.NEW_PROMO_CODE_LOCATION_TYPE]
  },
  {
      testID: "TC-3",
      discountType: testData.NEW_PROMO_CODE_DISCOUNT_TYPE_PERCENTAGE,
      promoType: testData.NEW_PROMO_CODE_TYPE_VIEWED_OFFERS,
      includeLink: true,
      selectionType: [testData.NEW_PROMO_CODE_PHONE_TYPE]
  },
  {
      testID: "TC-4",
      discountType: testData.NEW_PROMO_CODE_DISCOUNT_TYPE_FIXED,
      promoType: testData.NEW_PROMO_CODE_TYPE_LIKED_OFFERS,
      includeLink: false,
      selectionType: [testData.NEW_PROMO_CODE_FAST_ORDER_TYPE]
  },
  {
      testID: "TC-5",
      discountType: testData.NEW_PROMO_CODE_DISCOUNT_TYPE_PERCENTAGE,
      promoType: testData.NEW_PROMO_CODE_TYPE_VIEWED_OFFERS,
      includeLink: true,
      selectionType: [testData.NEW_PROMO_CODE_ONLINE_TYPE, testData.NEW_PROMO_CODE_LOCATION_TYPE]
  }
];

describe("Pairwise Testing for Promo Code Creation", () => {
  pairwiseTestCases.forEach((testCase) => {
      it(`${testCase.testID}: Create Promo Code with ${testCase.discountType}, ${testCase.promoType}, ${testCase.selectionType.join(", ")}`, () => {
          pcp.createPromoCode(
              "admin",
              testData.NEW_PROMO_CODE_VALID_NAME_INPUT,
              testData.NEW_PROMO_CODE_CONDITIONS_INPUT,
              testCase.discountType,
              testData.NEW_PROMO_CODE_DISCOUNT_INPUT,
              testCase.promoType,
              testData.NEW_PROMO_CODE_CONDITIONAL_NUMBER_INPUT,
              testCase.includeLink
          );
      });
  });
});