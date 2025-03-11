import * as testData from '../testData';
export * from '../testData';
import * as system from '../system';
export * from '../system';
import * as locators from '../locators';
export * from '../locators';

//================================================== FUNCTIONS FOR START/END DATE ==================================================
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Generates a date by adding or subtracting days from today and returns it in "DD/MM/YYYY" format.
export function calculatePCDateLocators(daysOffset) {
    // Get the current date
    const today = new Date();
    // Modify the date by adding or subtracting the given number of days
    today.setDate(today.getDate() + daysOffset);
    // Extract and format the day as a two-digit string (e.g., "03" instead of "3")
    const day = String(today.getDate()).padStart(2, "0");
    // Extract and format the month as a two-digit string (e.g., "03" for March)
    const month = String(today.getMonth() + 1).padStart(2, "0");
    // Extract the full year as a four-digit number (e.g., "2025")
    const year = today.getFullYear();
    // Return the formatted date as a string in "DD/MM/YYYY" format
    return `${day}/${month}/${year}`;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Generates a date object with day, month, and year by adding or subtracting days from today.
export function calculatePCDateTestData(daysOffset) {
    // Get the current date
    const today = new Date();
      // Modify the date by adding or subtracting the given number of days
      today.setDate(today.getDate() + daysOffset);
      // Return an object containing:
      return {
        // The day as a two-digit string (e.g., "03" instead of "3")
        day: String(today.getDate()).padStart(2, "0"),
        // The month as a number (JavaScript months are 0-indexed, so we add 1)
        month: today.getMonth() + 1, 
        // The full four-digit year (e.g., "2025")
        year: today.getFullYear(),
      };
    }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Selects a date from the date picker by clicking the input field and choosing the correct day.
export function selectDate(dateInput, day) {
    // Scroll to the date input field and open the date picker
    cy.get(dateInput)
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    // Convert the day to a number to remove leading zeros (e.g., "04" → 4)
    const dayNumber = Number(day); 
    // Wait for the date picker to fully load
    cy.wait(500);
    // Select the valid day from the date picker, ignoring days outside the current month
    cy.get('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
        .contains(dayNumber)
        .click();
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Selects the start and end dates for an admin user in the date picker.
export function selectDateAdmin() {
    // Select the start date
    selectDate(locators.ADMIN_PROMO_CODE_START_DATE_INPUT, testData.ADMIN_PROMO_CODE_START_DAY, testData.ADMIN_PROMO_CODE_START_DATE);
    // Open the date picker for the end date
    cy.get(locators.ADMIN_PROMO_CODE_END_DATE_INPUT)
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    // Select the end date
    selectDate(locators.ADMIN_PROMO_CODE_END_DATE_INPUT, testData.ADMIN_PROMO_CODE_END_DAY, testData.ADMIN_PROMO_CODE_END_DATE);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Selects the start and end dates for a user in the date picker.
export function selectDateUser() {
    // Select the start date
    selectDate(locators.USER_PROMO_CODE_START_DATE_INPUT, testData.USER_PROMO_CODE_START_DAY, testData.USER_PROMO_CODE_START_DATE);
    // Open the date picker for the end date
    cy.get(locators.USER_PROMO_CODE_END_DATE_INPUT)
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    // Select the end date
    selectDate(locators.USER_PROMO_CODE_END_DATE_INPUT, testData.USER_PROMO_CODE_END_DAY, testData.USER_PROMO_CODE_END_DATE);
}


//================================================= VALID USER/ADMIN LOGIN ========================================================
//=================================================================================================================================
// Login with Admin username and password
export const LoginAdmin = () => {
    //Open web portal
    cy.visit(system.HOST);
    cy.get(locators.LOGIN_PAGE_LABEL).should("exist").should("have.text","Email addressPassword");
    //Data input /valid
    cy.get(locators.LOGIN_PAGE_USERNAME_INPUT).type(testData.ADMIN_USERNAME);
    cy.get(locators.LOGIN_PAGE_PASSWORD_INPUT).type(testData.ADMIN_PASSWORD);
    //Click Login button
    cy.get(locators.LOGIN_PAGE_LOGIN_BUTTON).click();
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Login with Regular username and password
export const LoginUser = () => {
    //Open web portal
    cy.visit(system.HOST);
    cy.get(locators.LOGIN_PAGE_LABEL).should("exist").should("have.text","Email addressPassword");
    //Data input /valid
    cy.get(locators.LOGIN_PAGE_USERNAME_INPUT).type(testData.USER_USERNAME);
    cy.get(locators.LOGIN_PAGE_PASSWORD_INPUT).type(testData.USER_PASSWORD);
    //Click Login button
    cy.get(locators.LOGIN_PAGE_LOGIN_BUTTON).click();
};

//=================================================== PROMO CODE PAGE =============================================================
//=================================================================================================================================
 // Navigate to Promo Code Page.
 export const navigateToPromoCodePage = () => {
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should("have.text","promo codes").click(); 
    cy.wait(2000);
//Validation. Checking to see if heading exists
    cy.xpath(locators.PROMO_CODE_PAGE_HEADING_XPATH).should("exist"); 
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Check if the table is visible on the Promo Code page
export const promoCodePageTableCheck = () => {
    cy.wait(2000);
    //check to see if the table exists
    cy.xpath(locators.PROMO_CODE_PAGE_TABLE_XPATH).should("exist"); 
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test the ID column sorting on the Saved Searches page
export const promoCodePageIDColumnSort = () => {
    let sortedValuesAsc = [];
    let sortedValuesDesc = [];

    // Extracts and formats the 'id' values from the API response.
    const extractIDColumnValues = (responseBody) => {
        const filtered = responseBody.filter(row => row.id);
        const result = filtered.map(row => `PC${String(row.id).padStart(9, '0')}`);
        console.log('Extracted and formatted ID values:', result);
        return result;
    };

    // Custom sort function for ascending order
    const customSortAsc = (a, b) => a.localeCompare(b);

    // Intercept API request for promo codes
    cy.intercept('GET', '/api/v1/promoCode/252').as('getPromoCodes');

    // Navigate to the Promo Code page and wait for the API response
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should('have.text', 'promo codes').click();

    cy.wait('@getPromoCodes').then(({ response }) => {
        expect(response).to.exist; // Уверяваме се, че заявката има отговор
        const responseBody = response.body; 
        console.log('Full response body:', responseBody);

        // Extract and sort the full list of IDs
        const fullSortedAsc = extractIDColumnValues(responseBody).sort(customSortAsc);

        // Take the first 20 after sorting in ascending order
        sortedValuesAsc = fullSortedAsc.slice(0, 20);

        // Reverse the full sorted list for descending order, then take the first 20
        sortedValuesDesc = [...fullSortedAsc].reverse().slice(0, 20);

        console.log('Sorted values ASC:', sortedValuesAsc);
        console.log('Sorted values DESC:', sortedValuesDesc);
    });

    // Sort the table by clicking the column header (Ascending)
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('ID').should('exist').click();

    // Verify the table values match the sorted values (Ascending)
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_ID_XPATH).should('have.length', 20).then(($cells) => {
            const tableValuesAfterAscSort = [...$cells].map(cell => cell.innerText.trim());
            console.log('Table values ASC:', tableValuesAfterAscSort);

            expect(tableValuesAfterAscSort).to.deep.equal(sortedValuesAsc);
        });

    // Click column header again to sort in Descending order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('ID').should('exist').click();

    // Verify the table values match the sorted values (Descending)
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_ID_XPATH).should('have.length', 20).then(($cells) => {
            const tableValuesAfterDescSort = [...$cells].map(cell => cell.innerText.trim());
            console.log('Table values DESC:', tableValuesAfterDescSort);

            expect(tableValuesAfterDescSort).to.deep.equal(sortedValuesDesc);
        });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test the Type column sorting on the Promo codes page
export const promoCodePageTypeColumnSort = () => {
    let sortedValuesAsc = [];
    let sortedValuesDesc = [];

    // Function to format the API result
    const normalizeText = (text) => {
        return text
            .replace(/^X\s*/, '')  // Removing "X " 
            .replace(/_/g, ' ')    // Replace "_" with " "
            .trim()                // Removing empty intervals
            .toLowerCase()         // All to lower case
            .replace(/^(\w)/, c => c.toUpperCase()); // Only the first is upper case
    };

    // Extracts the 'type' values from the API response and normalizes them
    const extractTypeColumnValues = (responseBody) => {
        return responseBody.map(row => normalizeText(row.type));
    };

    // Custom sort functions   
    const customSortAsc = (a, b) => a.localeCompare(b);
    const customSortDesc = (a, b) => b.localeCompare(a);

    // Intercept API request for saved searches 
    cy.intercept('GET','/api/v1/promoCode/252').as('getPromoCodes'); 

    // Navigate to the Promo Code page and wait for the API response
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should('have.text', 'promo codes').click(); 

    cy.wait('@getPromoCodes').then(({response}) =>{
        expect(response).to.exist; // Уверяваме се, че има отговор от API
        const responseBody = response.body;
        console.log ('Full response body:', responseBody);

        // Extract values and sort them dynamically
        const extractedValues = extractTypeColumnValues(responseBody);
        sortedValuesAsc = [...extractedValues].sort(customSortAsc).slice(0, 20);
        sortedValuesDesc = [...extractedValues].sort(customSortDesc).slice(0, 20);

        console.log('Sorted values ASC:', sortedValuesAsc);
        console.log('Sorted values DESC:', sortedValuesDesc);
    });

    // Sort the table by clicking the column header (Ascending Order)    
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Type').should('exist').click();

    // Verify the table values match the sorted ASC values
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_TYPE_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterAscSort = [...$cells].map(cell => cell.innerText.trim());
        console.log ('Table values ASC sort:', tableValuesAfterAscSort);

        expect(tableValuesAfterAscSort).to.deep.equal(sortedValuesAsc);
    });

    // Click again to sort in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Type').should('exist').click();

    // Verify the table values match the sorted DESC values
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_TYPE_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterDescSort = [...$cells].map(cell => cell.innerText.trim());
        console.log ('Table values DESC sort:', tableValuesAfterDescSort);

        expect(tableValuesAfterDescSort).to.deep.equal(sortedValuesDesc);
    });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Test the Start Date column sorting on the Promo codes page
export const promoCodePageStartDateSort = () => {
    let sortedValuesAsc = [];
    let sortedValuesDesc = [];

// Formats API date from "YYYY-MM-DD" to "DD/MM/YYYY"   
    const formatApiDate = (dateString) => {
        const [year,month,day] = dateString.split('-'); 
        return `${day}/${month}/${year}`;
    };

// Extracts and formats 'creationDate' values from the API response
    const extractStartDateValues = (responseBody) => {
        const filtered = responseBody.filter(row=>row.startDate);
        const result = filtered.map(row=>formatApiDate(row.startDate));
        console.log('Extracted values:', result);
        return result; 
    };

// Sorting function for dates (ASCENDING)
    const customSortAsc = (a,b) => {
        return new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-'));
    };

// Sorting function for dates (DESCENDING)
    const customSortDesc = (a,b) =>{
        return new Date(b.split('/').reverse().join('-')) - new Date(a.split('/').reverse().join('-'));
    };

// Intercept API request for saved searches
    cy.intercept('GET', '/api/v1/promoCode/252').as('getPromoCodes');

// Navigate to the Promo Code page and wait for the API response
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should('have.text','promo codes').click();

    cy.wait('@getPromoCodes').then(({response}) =>{
        const responseBody = response.body;
        console.log('Full response body:',responseBody);

// Extract and sort values BEFORE slicing to get the first 20 sorted results
        const extractedValues = extractStartDateValues(responseBody);
        sortedValuesAsc = extractedValues.sort(customSortAsc).slice(0,20);
        sortedValuesDesc = extractedValues.sort(customSortDesc).slice(0,20);
        console.log ('Sorted values ASC:',sortedValuesAsc);
        console.log ('Sorted values DESC:',sortedValuesDesc);
    });

// Click to sort the "Start Date" column in ASCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Start Date').should('exist').click();

// Verify that the table is sorted in ASCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_START_DATE_XPATH).should('have.length',20).then(($cells)=>{
        const valuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting ASC:', valuesAfterSortAsc);

            valuesAfterSortAsc.forEach((value, index) => {
            const expectedValues = sortedValuesAsc[index];
            const formattedTableValue = value.trim();
            expect(expectedValues).to.equal(formattedTableValue);
            });
    });

// Click again to sort in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Start Date').should('exist').click();

// Verify that the table is sorted in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_START_DATE_XPATH).should('have.length',20).then(($cells)=>{
        const valuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting DESC:', valuesAfterSortDesc);

            valuesAfterSortDesc.forEach((value, index) => {
            const expectedValues = sortedValuesDesc[index];
            const formattedTableValue = value.trim();
            expect(expectedValues).to.equal(formattedTableValue);
            });
    });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Test the Start Date column sorting on the Promo codes page
export const promoCodePageEndDateSort = () => {
    let sortedValuesAsc = [];
    let sortedValuesDesc = [];

// Formats API date from "YYYY-MM-DD" to "DD/MM/YYYY"   
    const formatApiDate = (dateString) => {
        const [year,month,day] = dateString.split('-'); 
        return `${day}/${month}/${year}`;
    };

// Extracts and formats 'creationDate' values from the API response
    const extractStartDateValues = (responseBody) => {
        const filtered = responseBody.filter(row=>row.endDate);
        const result = filtered.map(row=>formatApiDate(row.endDate));
        console.log('Extracted values:', result);
        return result; 
    };

// Sorting function for dates (ASCENDING)
    const customSortAsc = (a,b) => {
        return new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-'));
    };

// Sorting function for dates (DESCENDING)
    const customSortDesc = (a,b) =>{
        return new Date(b.split('/').reverse().join('-')) - new Date(a.split('/').reverse().join('-'));
    };

// Intercept API request for saved searches
    cy.intercept('GET', '/api/v1/promoCode/252').as('getPromoCodes');

// Navigate to the Promo Code page and wait for the API response
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should('have.text','promo codes').click();

    cy.wait('@getPromoCodes').then(({response}) =>{
        const responseBody = response.body;
        console.log('Full response body:',responseBody);

// Extract and sort values BEFORE slicing to get the first 20 sorted results
        const extractedValues = extractStartDateValues(responseBody);
        sortedValuesAsc = extractedValues.sort(customSortAsc).slice(0,20);
        sortedValuesDesc = extractedValues.sort(customSortDesc).slice(0,20);
        console.log ('Sorted values ASC:',sortedValuesAsc);
        console.log ('Sorted values DESC:',sortedValuesDesc);
    });

// Click to sort the "Start Date" column in ASCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('End Date').should('exist').click();

// Verify that the table is sorted in ASCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_END_DATE_XPATH).should('have.length',20).then(($cells)=>{
        const valuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting ASC:', valuesAfterSortAsc);

            valuesAfterSortAsc.forEach((value, index) => {
            const expectedValues = sortedValuesAsc[index];
            const formattedTableValue = value.trim();
            expect(expectedValues).to.equal(formattedTableValue);
            });
    });

// Click again to sort in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('End Date').should('exist').click();

// Verify that the table is sorted in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_END_DATE_XPATH).should('have.length',20).then(($cells)=>{
        const valuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting DESC:', valuesAfterSortDesc);

            valuesAfterSortDesc.forEach((value, index) => {
            const expectedValues = sortedValuesDesc[index];
            const formattedTableValue = value.trim();
            expect(expectedValues).to.equal(formattedTableValue);
            });
    });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Test the Status column sorting on the Promo code page
export const promoCodePageStatusColumnSort = () => {
    let valuesStatusAsc = [];  
    let valuesStatusDesc = []; 

     // Formats API status values to match UI format
    const formatApiValue = (value) => {
        return value
            .toLowerCase()
            .replace(/_/g, ' ') //Replaces underscores with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); //Capitalizes first letter of each word
    };

     // Extracts and formats 'status' values from the API response
    const extractStatusColumnValues = (responseBody) => {
        const filtered = responseBody.filter(row => row.status);
        const result = filtered.map(row => formatApiValue(row.status)); 

        console.log('Extracted Status values:', result); 
        return result;
    };

    // Sorting functions
    const customSortAsc = (a, b) => a.localeCompare(b);
    const customSortDesc = (a, b) => b.localeCompare(a);

    // Intercept API request for saved searches
    cy.intercept('GET', '/api/v1/promoCode/252').as('getPromoCodes');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should('have.text','promo codes').click();

    cy.wait('@getPromoCodes').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Extract values and sort them BEFORE slicing
        const extractedValues = extractStatusColumnValues(responseBody);
        valuesStatusAsc = extractedValues.sort(customSortAsc).slice(0, 20);
        valuesStatusDesc = extractedValues.sort(customSortDesc).slice(0, 20);
        console.log('Sorted values ASC:', valuesStatusAsc);
        console.log('Sorted values DESC:', valuesStatusDesc);
    });

    // Click to sort the "Status" column in ASCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Status').should('exist').click();

    // Verify that the table is sorted in ASCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_STATUS_XPATH).should('have.length', 20).then(($cells) => {
            const tableValuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Table values after sorting ASC:', tableValuesAfterSortAsc);

            tableValuesAfterSortAsc.forEach((value, index) => {
                const expectedValue = valuesStatusAsc[index]
                const formattedTableValue = value.trim(); 
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });

    // Click again to sort in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Status').should('exist').click();

    // Verify that the table is sorted in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_STATUS_XPATH).should('have.length', 20).then(($cells) => {
            const tableValuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Table values after sorting DESC:', tableValuesAfterSortDesc);

            tableValuesAfterSortDesc.forEach((value, index) => {
                const expectedValue = valuesStatusDesc[index];
                const formattedTableValue = value.trim(); 
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test the Name column sorting on the Promo code page
export const promoCodePageDiscountColumnSort = () => {
    let sortedValuesAsc = [];
    let sortedValuesDesc = [];

    // Function to format discount values dynamically
    const formatDiscount = (value, type) => {
        if (type === "PERCENTAGE_DISCOUNT") {
            return `-${value}%`; // If it's a percentage discount
        } else if (type === "FIXED_DISCOUNT") {
            return `-${value}lv.`; // If it's a fixed discount
        }
        return `-${value}`; // Default formatting
    };

    // Function to extract and sort discount values before formatting
    const extractAndSortDiscountValues = (responseBody, order = "asc") => {
        const sorted = responseBody
            .map(row => ({ value: row.discount, type: row.discountType })) // Store both value and type
            .sort((a, b) => order === "asc" ? a.value - b.value : b.value - a.value); // Sort BEFORE formatting

        return sorted.map(row => formatDiscount(row.value, row.type)).slice(0, 20);
    };

    // Intercept API request for discounts
    cy.intercept('GET', '/api/v1/promoCode/252').as('getPromoCodes');

    // Navigate to the Promo Code page and wait for the API response
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should('have.text', 'promo codes').click();

    cy.wait('@getPromoCodes').then(({ response }) => {
        expect(response).to.exist; // Ensure API response is available
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Extract and sort values dynamically before taking the top 20
        sortedValuesAsc = extractAndSortDiscountValues(responseBody, "asc");
        sortedValuesDesc = extractAndSortDiscountValues(responseBody, "desc");

        console.log('Sorted values ASC:', sortedValuesAsc);
        console.log('Sorted values DESC:', sortedValuesDesc);
    });

    // Sort the table by clicking the column header (Ascending Order)
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Discount').should('exist').click();

    // Verify the table values match the sorted ASC values
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_DISCOUNT_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterAscSort = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values ASC sort:', tableValuesAfterAscSort);

        expect(tableValuesAfterAscSort).to.deep.equal(sortedValuesAsc);
    });

    // Click again to sort in DESCENDING order
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Discount').should('exist').click();

    // Verify the table values match the sorted DESC values
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_DISCOUNT_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterDescSort = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values DESC sort:', tableValuesAfterDescSort);

        expect(tableValuesAfterDescSort).to.deep.equal(sortedValuesDesc);
    });
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test the Name column sorting on the Promo code page
export const promoCodePageNameColumnSort = () => {
    let valuesNameColumnAsc = [];
    let valuesNameColumnDesc = [];
    let tableValuesAfterSortAsc = [];
    let tableValuesAfterSortDesc = [];

    // Function to check if text starts with Cyrillic
    const isCyrillic = text => /^[А-Яа-я]/.test(text);

    // Custom sort functions (Ensures Cyrillic is separate from Latin)
    const customSortAsc = (a, b) => {
        const aIsCyrillic = isCyrillic(a);
        const bIsCyrillic = isCyrillic(b);

        if (aIsCyrillic && !bIsCyrillic) return 1;  // Move Latin before Cyrillic
        if (!aIsCyrillic && bIsCyrillic) return -1; // Move Cyrillic after Latin

        return a.localeCompare(b, 'bg', { numeric: true, sensitivity: 'base' });
    };

    // Reverse ASC for DESC
    const customSortDesc = (a, b) => customSortAsc(b, a);

    // Extracts the 'name' values from the API response.
    const extractNameColumnValues = (responseBody) => {
        const filtered = responseBody.filter(row => row.name);
        const result = filtered.map(row => row.name);
        console.log('Extracted name values:', result); 
        return result;
    };

    // Intercept API request for saved searches
    cy.intercept('GET', '/api/v1/promoCode/252').as('getPromoCodes');

    // Navigate to the Promo Code page and wait for the API response
    cy.xpath(locators.HEADER_PROMO_CODES_MENU).should('have.text', 'promo codes').click();

    // Taking values from the response body
    cy.wait('@getPromoCodes').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Extract values
        const extractedValues = extractNameColumnValues(responseBody);

        // Sort ASC and print it
        const sortedAscFull = [...extractedValues].sort(customSortAsc);
        console.log('Sorted values ASC (FULL LIST):', sortedAscFull);

        // Reverse to DESC and print it
        const sortedDescFull = [...sortedAscFull].reverse();
        console.log('Sorted values DESC (FULL LIST):', sortedDescFull);

        // Now take only the first 20 elements for comparison
        valuesNameColumnAsc = sortedAscFull.slice(0, 20);
        valuesNameColumnDesc = sortedDescFull.slice(0, 20);
        
        console.log('Sorted values ASC (TOP 20):', valuesNameColumnAsc);
        console.log('Sorted values DESC (TOP 20):', valuesNameColumnDesc);
    });

    // Sort the table by clicking the column header
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Name').should('exist').click();

    // Save values from table in a new array
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_NAME_XPATH).should('have.length', 20).then(($cells) => {
        tableValuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values after sorting ASC:', tableValuesAfterSortAsc);
    });

    // Click again to sort in DESCENDING order       
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_XPATH).contains('Name').should('exist').click();

    // Save values from table in a new array
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_NAME_XPATH).should('have.length', 20).then(($cells) => {
        tableValuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values after sorting DESC:', tableValuesAfterSortDesc);

        // Removing "..." and any unneeded space before comparison
        tableValuesAfterSortAsc.forEach((value, index) => {
            const expectedValue = valuesNameColumnAsc[index];
            const formattedTableValueAsc = value.replace(/\s+/g, ' ').replace("...", "").trim();
            const formattedApiValueAsc = expectedValue.replace(/\s+/g, ' ').trim();
            expect(formattedApiValueAsc.startsWith(formattedTableValueAsc)).to.be.true;
        });

        tableValuesAfterSortDesc.forEach((value, index) => {
            const expectedValue = valuesNameColumnDesc[index];
            const formattedTableValueDesc = value.replace(/\s+/g, ' ').replace("...", "").trim();
            const formattedApiValueDesc = expectedValue.replace(/\s+/g, ' ').trim();
            expect(formattedApiValueDesc.startsWith(formattedTableValueDesc)).to.be.true;
        });
    });
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test to see if "New Promo Code" button exist
export const promoCodePageNewPCButtonCheck = () => {
    cy.xpath(locators.PROMO_CODE_PAGE_NEW_PC_BUTTON_XPATH).should('exists');
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test: Create a new promo code as an Admin user with all types selected, no date selection
export const createPromoCodeAsAdmin = () => {
    // Click "New promo code" button
    cy.get(locators.PROMO_CODE_PAGE_NEW_PC_BUTTON)
        .click();

    // Verify that we are on the "New Promo Code" page
    cy.xpath(locators.NEW_PROMO_CODE_PAGE_HEADING_XPATH)
        .should("exist");

    // Enter promo code name
    cy.get(locators.NEW_PROMO_CODE_NAME)
        .type(testData.NEW_PROMO_CODE_VALID_NAME_INPUT);

    // Enter promo code conditions
    cy.get(locators.NEW_PROMO_CODE_CONDITIONS)
        .type(testData.NEW_PROMO_CODE_CONDITIONS_INPUT);

    // Select discount type
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT_TYPE_SELECT)
        .scrollIntoView()
        .should('be.visible')
        .select(testData.NEW_PROMO_CODE_DISCOUNT_TYPE_FIXED);

    // Add a product page link
    cy.get(locators.NEW_PROMO_CODE_LINK)
        .scrollIntoView()
        .should('be.visible')
        .type(testData.NEW_PROMO_CODE_PAGE_LINK_INPUT);

    // Select promo code type
    cy.get(locators.NEW_PROMO_CODE_TYPE_SELECT)
        .scrollIntoView()
        .should('be.visible')
        .select(testData.NEW_PROMO_CODE_TYPE_LIKED_OFFERS);

    // Enter conditional number to receive the promo code
    cy.get(locators.NEW_PROMO_CODE_CONDITIONAL_NUMBER)
        .scrollIntoView()
        .should('be.visible')
        .type(testData.NEW_PROMO_CODE_CONDITIONAL_NUMBER_INPUT);

    // Enter discount amount
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT)
        .scrollIntoView()
        .should('be.visible')
        .type(testData.NEW_PROMO_CODE_DISCOUNT_INPUT);

    // Click the "Save" button
    cy.get(locators.NEW_PROMO_CODE_SAVE_BUTTON)
        .scrollIntoView()
        .should('be.visible')
        .click();

    // Wait for the promo codes table to load (1 second delay)
    cy.xpath(locators.PROMO_CODE_PAGE_TABLE_XPATH).should('be.visible').wait(1000);

    // Verify that the first row in the table contains the newly created promo code
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_NAME_XPATH).first()
        .should("contain.text", testData.NEW_PROMO_CODE_VALID_NAME_INPUT);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Test: Create a new promo code as an Admin user with only one type selected and date selection

export const createPromoCodeWithSingleTypeAndDate = () => {
    // Click on "New promo code" button
    cy.get(locators.PROMO_CODE_PAGE_NEW_PC_BUTTON).click();

    // Validate that we are on the correct page
    cy.xpath(locators.NEW_PROMO_CODE_PAGE_HEADING_XPATH)
        .should('exist');

    // Type a name for the new promo code
    cy.get(locators.NEW_PROMO_CODE_NAME)
        .type(testData.NEW_PROMO_CODE_VALID_NAME_INPUT);

    // Type the conditions for the new promo code
    cy.get(locators.NEW_PROMO_CODE_CONDITIONS)
        .type(testData.NEW_PROMO_CODE_CONDITIONS_INPUT);

    // Uncheck all types except one
    cy.get(locators.NEW_PROMO_CODE_ONLINE_TYPE)
        .click();   // Uncheck Online
    cy.get(locators.NEW_PROMO_CODE_LOCATION_TYPE)
        .click(); // Uncheck Location
    cy.get(locators.NEW_PROMO_CODE_FAST_ORDER_TYPE)
        .scrollIntoView()
        .should('be.visible')
        .click(); // Uncheck Fast Order

    // Select the discount type
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT_TYPE_SELECT)
        .scrollIntoView()
        .should('be.visible')
        .select(testData.NEW_PROMO_CODE_DISCOUNT_TYPE_FIXED);

    // Select the promo code type
    cy.get(locators.NEW_PROMO_CODE_TYPE_SELECT)
        .scrollIntoView()
        .should('be.visible')
        .select(testData.NEW_PROMO_CODE_TYPE_LIKED_OFFERS);

    // Enter the conditional number to receive the new promo code
    cy.get(locators.NEW_PROMO_CODE_CONDITIONAL_NUMBER)
        .scrollIntoView()
        .should('be.visible')
        .type(testData.NEW_PROMO_CODE_CONDITIONAL_NUMBER_INPUT);

    // Select start and end dates
    selectDateAdmin(); 

    // Enter the discount amount
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT)
        .scrollIntoView()
        .should('be.visible')
        .type(testData.NEW_PROMO_CODE_DISCOUNT_INPUT);

    // Click the "Save" button
    cy.get(locators.NEW_PROMO_CODE_SAVE_BUTTON)
        .scrollIntoView()
        .should('be.visible')
        .click();

    // Wait for the promo codes table to load (1 second delay)
    cy.xpath(locators.PROMO_CODE_PAGE_TABLE_XPATH).should('be.visible').wait(1000);

    // Verify that the first row in the table contains the newly created promo code
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_NAME_XPATH).first()
        .should("contain.text", testData.NEW_PROMO_CODE_VALID_NAME_INPUT);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Test: Create a new promo code as a Regular User with only one type selected and date selection

export const createPromoCodeWithUserTypeAndDate = () => {
    // Click on "New promo code" button
    cy.get(locators.PROMO_CODE_PAGE_NEW_PC_BUTTON)
        .click();

    // Validate that we are on the correct page
    cy.xpath(locators.NEW_PROMO_CODE_PAGE_HEADING_XPATH)
        .should('exist');

    // Type a name for the new promo code
    cy.get(locators.NEW_PROMO_CODE_NAME)
        .type(testData.NEW_PROMO_CODE_VALID_NAME_INPUT);

    // Type the conditions for the new promo code
    cy.get(locators.NEW_PROMO_CODE_CONDITIONS)
        .type(testData.NEW_PROMO_CODE_CONDITIONS_INPUT);

    // Uncheck all types except one
    cy.get(locators.NEW_PROMO_CODE_ONLINE_TYPE).click();   // Uncheck Online
    cy.get(locators.NEW_PROMO_CODE_LOCATION_TYPE).click(); // Uncheck Location
    cy.get(locators.NEW_PROMO_CODE_FAST_ORDER_TYPE)
        .scrollIntoView()
        .should('be.visible')
        .click(); // Uncheck Fast Order

    // Select the discount type
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT_TYPE_SELECT)
        .scrollIntoView()
        .should('be.visible')
        .select(testData.NEW_PROMO_CODE_DISCOUNT_TYPE_FIXED);

    // Select the promo code type
    cy.get(locators.NEW_PROMO_CODE_TYPE_SELECT)
        .scrollIntoView()
        .should('be.visible')
        .select(testData.NEW_PROMO_CODE_TYPE_LIKED_OFFERS);

    // Enter the conditional number to receive the new promo code
    cy.get(locators.NEW_PROMO_CODE_CONDITIONAL_NUMBER)
        .scrollIntoView()
        .should('be.visible')
        .type(testData.NEW_PROMO_CODE_CONDITIONAL_NUMBER_INPUT);

    // Select start and end dates (using user date function)
    selectDateUser(); 

    // Enter the discount amount
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT)
        .scrollIntoView()
        .should('be.visible')
        .type(testData.NEW_PROMO_CODE_DISCOUNT_INPUT);

    // Click the "Save" button
    cy.get(locators.NEW_PROMO_CODE_SAVE_BUTTON)
        .scrollIntoView()
        .should('be.visible')
        .click();

    // Wait for the promo codes table to load (1 second delay)
    cy.xpath(locators.PROMO_CODE_PAGE_TABLE_XPATH).should('be.visible').wait(1000);

    // Verify that the first row in the table contains the newly created promo code
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_NAME_XPATH).first()
        .should("contain.text", testData.NEW_PROMO_CODE_VALID_NAME_INPUT);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Function to create a new promo code using different test parameters.
 * 
 * @param {string} userType - Type of user ("admin" or "user").
 * @param {string} name - Name of the promo code.
 * @param {string} conditions - Conditions for the promo code.
 * @param {string} discountType - Type of discount ("PERCENTAGE_DISCOUNT" or "FIXED_DISCOUNT").
 * @param {string} discountValue - Value of the discount.
 * @param {string} promoType - Type of promo code ("VIEWED_OFFERS" or "LIKED_OFFERS").
 * @param {string} conditionalNumber - Required number of actions to activate the promo code.
 * @param {boolean} includeLink - Whether to include a product link.
 */
export const createPromoCode = (userType, name, conditions, discountType, discountValue, promoType, conditionalNumber, includeLink) => {
    // Login as admin or user
    if (userType === "admin") {
        LoginAdmin();
    } else {
        LoginUser();
    }

    navigateToPromoCodePage();

    // Click on "New promo code" button
    cy.get(locators.PROMO_CODE_PAGE_NEW_PC_BUTTON).click();

    // Enter promo code details
    cy.get(locators.NEW_PROMO_CODE_NAME).type(name);
    cy.get(locators.NEW_PROMO_CODE_CONDITIONS).type(conditions);

    // Select discount type and enter discount value
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT_TYPE_SELECT).select(discountType);
    cy.get(locators.NEW_PROMO_CODE_DISCOUNT).type(discountValue);

    // Select promo type (Liked or Viewed)
    cy.get(locators.NEW_PROMO_CODE_TYPE_SELECT).select(promoType);

    // Enter conditional number (mandatory field)
    cy.get(locators.NEW_PROMO_CODE_CONDITIONAL_NUMBER).type(conditionalNumber);

    // Add link if required
    if (includeLink) {
        cy.get(locators.NEW_PROMO_CODE_LINK).type(testData.NEW_PROMO_CODE_PAGE_LINK_INPUT);
    }

    // Select dates based on user type
    if (userType === "admin") {
        selectDateAdmin();
    } else {
        selectDateUser();
    }

    // Click "Save" button
    cy.get(locators.NEW_PROMO_CODE_SAVE_BUTTON).click();

    // Wait for the promo code table to load
    cy.xpath(locators.PROMO_CODE_PAGE_TABLE_XPATH).should("be.visible").wait(2000);

    // Verify that the created promo code appears in the table
    cy.xpath(locators.PROMO_CODE_PAGE_COLUMN_NAME_XPATH).first().invoke("text").then((tableName) => {
        expect(tableName.trim()).to.contain(name);
    });
};