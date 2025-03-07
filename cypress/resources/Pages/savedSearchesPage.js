import * as testData from '../testData';
export * from '../testData';
import * as system from '../system';
export * from '../system';
import * as locators from '../locators';
export * from '../locators';

//=================================================================================================================================
// Login with username and password
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


//==================================================================================================================================
// Navigate to Saved Searches Page.
export const navigateToSavedSearchesPage = () => {
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should("have.text","Saved searches").click(); 
//Validation. Checking to see if heading exists
    cy.xpath(locators.SAVED_SEARCHES_PAGE_HEADING_XPATH).should("exist").wait(1000); 
};



// ================ Saved Searches Page ================



// Check if the table is visible on the Saved Searches page
export const savedSearchesPageTableCheck = () => {
    cy.xpath(locators.SAVED_SEARCHES_PAGE_TABLE_XPATH).should("exist"); //check to see if the table exists
}

//==================================================================================================================================
// Test the ID column sorting on the Saved Searches page
export const savedSearchesPageIDColumnSort = () => {
    let sortedValuesAsc = [];
    let sortedValuesDesc = [];

    // Extracts and formats the 'id' values from the API response.
    const extractIDColumnValues = (responseBody) => {
        const filtered = responseBody.filter(row => row.id);
        const result = filtered.map(row => `SS${String(row.id).padStart(9, '0')}`);
        console.log('Extracted and formatted ID values:', result);
        return result;
    };

    // Custom sort function for ascending order
    const customSortAsc = (a, b) => a.localeCompare(b);
    
    // Custom sort function for descending order
    //const customSortDesc = (a, b) => b.localeCompare(a);

    // Intercept API request for saved searches
    cy.intercept('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should("have.text", "Saved searches").click();

    cy.wait('@getSavedSearches').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Extract and sort the full list of IDs
        const fullSortedAsc = extractIDColumnValues(responseBody).sort(customSortAsc);
        
        // Take the first 20 after sorting in ascending order
        sortedValuesAsc = fullSortedAsc.slice(0, 20);
        
        // Reverse the full sorted list for descending order, then take the first 20
        sortedValuesDesc = fullSortedAsc.reverse().slice(0, 20);

        console.log('Sorted values ASC (first 20):', sortedValuesAsc);
        console.log('Sorted values DESC (first 20):', sortedValuesDesc);
    });

    // Sort the table by clicking the column header (Ascending)
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('ID').should('exist').click();

    // Verify the table values match the sorted values (Ascending)
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_ID_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterAscSort = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values after sorting (Ascending):', tableValuesAfterAscSort);

        expect(tableValuesAfterAscSort).to.deep.equal(sortedValuesAsc);
    });

    // Click column header again to sort in Descending order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('ID').click();

    // Verify the table values match the sorted values (Descending)
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_ID_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterDescSort = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values after sorting (Descending):', tableValuesAfterDescSort);

        expect(tableValuesAfterDescSort).to.deep.equal(sortedValuesDesc);
    });
};

//==================================================================================================================================
// Test the Device ID column sorting on the Saved Searches page
export const savedSearchesPageDeviceIDColumnSort = () => {
    let sortedValuesAsc = [];
    let sortedValuesDesc = [];

    // Extracts the 'creatorDeviceId' values from the API response.
    const extractDeviceIDColumnValues = (responseBody) => {
        const filtered = responseBody.filter(row => row.creatorDeviceId);
        const result = filtered.map(row => row.creatorDeviceId);
        console.log('Extracted creatorDeviceId values:', result);
        return result;
    };

    // Custom sort functions
    const customSortAsc = (a, b) => a.localeCompare(b);
    const customSortDesc = (a, b) => b.localeCompare(a);

    // Intercept API request for saved searches (we will use this data only once)
    cy.intercept('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should("have.text", "Saved searches").click();

    cy.wait('@getSavedSearches').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);
        
        // Extract values and THEN sort them before slicing
        const extractedValues = extractDeviceIDColumnValues(responseBody);
        sortedValuesAsc = extractedValues.sort(customSortAsc).slice(0, 20); // FIRST SORT, THEN SLICE
        sortedValuesDesc = extractedValues.sort(customSortDesc).slice(0, 20); // FIRST SORT, THEN SLICE
        console.log('Sorted values ASC (first 20):', sortedValuesAsc);
        console.log('Sorted values DESC (first 20):', sortedValuesDesc);
    });

    // Sort the table by clicking the column header (Ascending Order)
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Device ID').should('exist').click();

    // Verify the table values match the sorted ASC values
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_DEVICEID_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values after sorting ASC:', tableValuesAfterSortAsc);
        
        expect(tableValuesAfterSortAsc).to.deep.equal(sortedValuesAsc);
    });

    // Click again to sort in DESCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Device ID').click();

    // Verify the table values match the sorted DESC values (FROM TABLE, NOT API)
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_DEVICEID_XPATH).should('have.length', 20).then(($cells) => {
        const tableValuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values after sorting DESC:', tableValuesAfterSortDesc);

        expect(tableValuesAfterSortDesc).to.deep.equal(sortedValuesDesc);
    });
};

//==================================================================================================================================
// Test the Name column sorting on the Saved Searches page
export const savedSearchesPageNameColumnSort = () => {
    let valuesNameColumnAsc = [];
    let valuesNameColumnDesc = [];
    let tableValuesAfterSortAsc = [];
    let tableValuesAfterSortDesc = [];

    // Extracts the 'name' values from the API response.
    const extractNameColumnValues = (responseBody) => {
        const filtered = responseBody.filter(row => row.name);
        const result = filtered.map(row => row.name);
        console.log('Extracted name values:', result); 
        return result;
    };

    // Custom sort functions
    const customSortAsc = (a, b) => a.localeCompare(b);
    const customSortDesc = (a, b) => b.localeCompare(a);

    // Intercept API request for saved searches
    cy.intercept('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should("have.text", "Saved searches").click();

    // Taking values from the response body
    cy.wait('@getSavedSearches').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Sorting the filtered response body
        const extractedValues = extractNameColumnValues(responseBody);
        valuesNameColumnAsc = extractedValues.sort(customSortAsc).slice(0, 20);
        valuesNameColumnDesc = extractedValues.sort(customSortDesc).slice(0, 20);
        console.log('Sorted values ASC:', valuesNameColumnAsc);
        console.log('Sorted values DESC:', valuesNameColumnDesc);
    });

    // Sort the table by clicking the column header
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Name').should('exist').click();

    // Save values from table in a new array
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_XPATH).should('have.length', 20).then(($cells) => {
        tableValuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values after sorting ASC:', tableValuesAfterSortAsc);
    });

    // Click again to sort in DESCENDING order       
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Name').should('exist').click();

    // Save values from table in a new array
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_XPATH).should('have.length', 20).then(($cells) => {
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

//==================================================================================================================================
// Test the Search Text column sorting on the Saved Searches page
export const savedSearchesPageSearchTextColumnSort = () => {
    let valuesSearchTextColumnAsc = [];
    let valuesSearchTextColumnDesc = [];
    let tableValuesAfterSortAsc = [];
    let tableValuesAfterSortDesc = [];

    // Extracts the 'search text' values from the API response.
    const extractSearchTextValues = (responseBody)  => {
        const filtered = responseBody.filter(row=>row.searchText);
        const result = filtered.map(row=>row.searchText);
        console.log('Extracted results:',result); 
        return result;
    };

     // Custom sort functions
    const customSortAsc = (a,b) => a.localeCompare(b);
    const customSortDesc = (a,b) => b.localeCompare(a);

     // Intercept API request for saved searches
    cy.intercept ('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

     // Navigate to the Saved Searches page and wait for the API response
    cy.xpath (locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should('have.text','Saved searches').click();

    // Taking values from the response body
    cy.wait ('@getSavedSearches').then(({response}) =>{
        const responseBody = response.body;
        console.log('Full response body',responseBody);

        // Sorting the filtered response body
        valuesSearchTextColumnAsc = extractSearchTextValues(responseBody).sort(customSortAsc).slice(0,20);
        valuesSearchTextColumnDesc = extractSearchTextValues(responseBody).sort(customSortDesc).slice(0,20);
        console.log('Sorted values ASC:', valuesSearchTextColumnAsc);
        console.log('Sorted values DESC:', valuesSearchTextColumnDesc);
    });

    // Sort the table by clicking the column header
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Search text').should('exist').click();

    // Save values from table in a new array
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_SEARCHTEXT_XPATH).should('have.length', 20).then (($cells) => {
        tableValuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values After Sort Asc:',tableValuesAfterSortAsc);
    });

    // Click again to sort in DESCENDING order   
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Search text').should('exist').click();

     // Save values from table in a new array
     cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_SEARCHTEXT_XPATH).should('have.length', 20).then (($cells) => {
        tableValuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
        console.log('Table values After Sort Desc:',tableValuesAfterSortDesc);

    // Removing "..." and any unneeded space before comparison
    tableValuesAfterSortAsc.forEach((value, index) => {
        const expectedValue = valuesSearchTextColumnAsc[index];
        const formattedTableValueAsc = value.replace(/\s+/g, ' ').replace("...", "").trim();
        const formattedApiValueAsc = expectedValue.replace(/\s+/g, ' ').trim();
        expect(formattedApiValueAsc.startsWith(formattedTableValueAsc)).to.be.true;
    });

    tableValuesAfterSortDesc.forEach((value,index) => {
        const expectedValue = valuesSearchTextColumnDesc[index];
        const formattedTableValueDesc = value.replace(/\s+/g, ' ').replace("...", "").trim();
        const formattedApiValueDesc = expectedValue.replace(/\s+/g, ' ').trim();
        expect(formattedApiValueDesc.startsWith(formattedTableValueDesc)).to.be.true;
    });
});
};

//==================================================================================================================================
// Test the Category column sorting on the Saved Searches page
export const savedSearchesPageCategoryColumnSort = () => {
    let valuesCategoryAsc = [];
    let valuesCategoryDesc = [];

    
    // Formats API category values to match UI format
    const formatApiValue = (value) => {
        return value
            .toLowerCase()
            .replace(/_/g, ' ') // Replace underscores with spaces
            .replace(/\b\w/g, (char, index) => (index === 0 ? char.toUpperCase() : char)) // Capitalize first word
            .replace(/\bpc\b/gi, "PCs"); // Ensure "PCs" is correct
    };

   // Extracts and formats 'category' values from the API response
    const extractCategoryValues = (responseBody) => {
        const filtered = responseBody.filter(row => row.category);
        const result = filtered.map(row => formatApiValue(row.category));
        console.log('Extracted and formatted values:', result);
        return result;
    };

    // Sorting functions
    const customSortAsc = (a, b) => a.localeCompare(b);
    const customSortDesc = (a, b) => b.localeCompare(a);

    // Intercept API request for saved searches
    cy.intercept('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should('have.text', 'Saved searches').click();

    cy.wait('@getSavedSearches').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Extract values and sort them BEFORE slicing
        const extractedValues = extractCategoryValues(responseBody);
        valuesCategoryAsc = extractedValues.sort(customSortAsc).slice(0, 20);
        valuesCategoryDesc = extractedValues.sort(customSortDesc).slice(0, 20);
        console.log('Sorted values ASC:', valuesCategoryAsc);
        console.log('Sorted values DESC:', valuesCategoryDesc);
    });

    // Click to sort the Category column in ASCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Category').should('exist').click();

    // Verify that the table is sorted in ASCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_CATEGORY_XPATH).should('have.length', 20).then(($cells) => {
            const valuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values after sorting ASC:', valuesAfterSortAsc);

            valuesAfterSortAsc.forEach((value, index) => {
                const expectedValue = valuesCategoryAsc[index];
                const formattedTableValue = value.replace(/\s+/g, ' ').replace('...', '').trim();

                expect(expectedValue.toLowerCase().startsWith(formattedTableValue.toLowerCase())).to.be.true;
            });
        });

    // Click again to sort in DESCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Category').should('exist').click();

    // Verify that the table is sorted in DESCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_CATEGORY_XPATH).should('have.length', 20).then(($cells) => {
            const valuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values after sorting DESC:', valuesAfterSortDesc);

            valuesAfterSortDesc.forEach((value, index) => {
                const expectedValue = valuesCategoryDesc[index];
                const formattedTableValue = value.replace(/\s+/g, ' ').replace('...', '').trim();

                expect(expectedValue.toLowerCase().startsWith(formattedTableValue.toLowerCase())).to.be.true;
            });
        });
};

//==================================================================================================================================
//Test the Creation Date column sorting on the Saved Searches page
export const savedSearchesPageCreationDateColumnSort = () => { 
    let valuesCreationDateAsc = [];
    let valuesCreationDateDesc = [];

    
     // Formats API date from "YYYY-MM-DD" to "DD/MM/YYYY"
    const formatApiDate = (dateString) => {
        const [year, month, day] = dateString.split('-');  
        return `${day}/${month}/${year}`;  
    };


     // Extracts and formats 'creationDate' values from the API response
    const extractCreationDateValues = (responseBody) => { 
        const filtered = responseBody.filter(row => row.creationDate);
        const result = filtered.map(row => formatApiDate(row.creationDate)); 
        console.log('Extracted and formatted results:', result); 
        return result;
    };


     // Sorting function for dates (ASCENDING)
    const customSortAsc = (a, b) => {
        return new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-'));
    };


     // Sorting function for dates (DESCENDING)
    const customSortDesc = (a, b) => {
        return new Date(b.split('/').reverse().join('-')) - new Date(a.split('/').reverse().join('-'));
    };

    // Intercept API request for saved searches
    cy.intercept('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should('have.text', 'Saved searches').click();

    cy.wait('@getSavedSearches').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Extract and sort values BEFORE slicing to get the first 20 sorted results
        const extractedValues = extractCreationDateValues(responseBody);
        valuesCreationDateAsc = extractedValues.sort(customSortAsc).slice(0, 20); 
        valuesCreationDateDesc = extractedValues.sort(customSortDesc).slice(0, 20); 
        console.log('Sorted values ASC:', valuesCreationDateAsc);
        console.log('Sorted values DESC:', valuesCreationDateDesc);
    });

    // Click to sort the "Creation Date" column in ASCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Creation Date').should('exist').click();

    // Verify that the table is sorted in ASCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_CREATIONDATE_XPATH).should('have.length', 20).then(($cells) => {
            const valuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting ASC:', valuesAfterSortAsc);

            valuesAfterSortAsc.forEach((value, index) => {
                const expectedValue = valuesCreationDateAsc[index];
                const formattedTableValue = value.trim(); 
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });

    // Click again to sort in DESCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Creation Date').should('exist').click();

    // Verify that the table is sorted in DESCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_CREATIONDATE_XPATH).should('have.length', 20).then(($cells) => {
            const valuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting DESC:', valuesAfterSortDesc);

            valuesAfterSortDesc.forEach((value, index) => {
                const expectedValue = valuesCreationDateDesc[index];
                const formattedTableValue = value.trim(); 
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });
};

//==================================================================================================================================
//Test the Last Change Date column sorting on the Saved Searches page
export const savedSearchesPageLastChangeDateColumnSort = () => { 
    let valuesLastChangeDateAsc = [];
    let valuesLastChangeDateDesc = [];

    
     // Formats API date from "YYYY-MM-DD" to "DD/MM/YYYY"
    const formatApiDate = (dateString) => {
        const [year, month, day] = dateString.split('-');  
        return `${day}/${month}/${year}`;  
    };

   
     // Extracts and formats 'lastChangeDate' values from the API response
    const extractLastChangeDateValues = (responseBody) => { 
        const filtered = responseBody.filter(row => row.lastChangeDate);
        const result = filtered.map(row => formatApiDate(row.lastChangeDate)); 
        console.log('Extracted and formatted results:', result); 
        return result;
    };

     // Sorting function for dates (ASCENDING)
    const customSortAsc = (a, b) => {
        return new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-'));
    };

     // Sorting function for dates (DESCENDING)
    const customSortDesc = (a, b) => {
        return new Date(b.split('/').reverse().join('-')) - new Date(a.split('/').reverse().join('-'));
    };

    // Intercept API request for saved searches
    cy.intercept('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should('have.text', 'Saved searches').click();

    cy.wait('@getSavedSearches').then(({ response }) => {
        const responseBody = response.body;
        console.log('Full response body:', responseBody);

        // Extract and sort values BEFORE slicing to get the first 20 sorted results
        const extractedValues = extractLastChangeDateValues(responseBody);
        valuesLastChangeDateAsc = extractedValues.sort(customSortAsc).slice(0, 20); 
        valuesLastChangeDateDesc = extractedValues.sort(customSortDesc).slice(0, 20); 
        console.log('Sorted values ASC:', valuesLastChangeDateAsc);
        console.log('Sorted values DESC:', valuesLastChangeDateDesc);
    });

    // Click to sort the "Date of Last Change" column in ASCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Date of Last Change').should('exist').click();

    // Verify that the table is sorted in ASCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_LastChangeDate_XPATH).should('have.length', 20).then(($cells) => {
            const valuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting ASC:', valuesAfterSortAsc);

            valuesAfterSortAsc.forEach((value, index) => {
                const expectedValue = valuesLastChangeDateAsc[index];
                const formattedTableValue = value.trim(); // Премахнато "..."
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });

    // Click again to sort in DESCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Date of Last Change').should('exist').click();

    // Verify that the table is sorted in DESCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_LastChangeDate_XPATH).should('have.length', 20).then(($cells) => {
            const valuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Values After Sorting DESC:', valuesAfterSortDesc);

            valuesAfterSortDesc.forEach((value, index) => {
                const expectedValue = valuesLastChangeDateDesc[index];
                const formattedTableValue = value.trim(); // Премахнато "..."
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });
};
 

//==================================================================================================================================
//Test the Status column sorting on the Saved Searches page
export const savedSearchesPageStatusColumnSort = () => {
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
    cy.intercept('GET', '**/api/v1/savedSearch/admin').as('getSavedSearches');

    // Navigate to the Saved Searches page and wait for the API response
    cy.xpath(locators.HEADER_SAVED_SEARCHES_MENU_XPATH).should("have.text", "Saved searches").click();

    cy.wait('@getSavedSearches').then(({ response }) => {
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
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Status').should('exist').click();

    // Verify that the table is sorted in ASCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_STATUS_XPATH)
        .should('have.length', 20)
        .then(($cells) => {
            const tableValuesAfterSortAsc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Table values after sorting ASC:', tableValuesAfterSortAsc);

            tableValuesAfterSortAsc.forEach((value, index) => {
                const expectedValue = valuesStatusAsc[index];
                const formattedTableValue = value.trim(); // Форматиране без многоточие
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });

    // Click again to sort in DESCENDING order
    cy.get(locators.SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR).contains('Status').should('exist').click();

    // Verify that the table is sorted in DESCENDING order
    cy.xpath(locators.SAVED_SEARCHES_PAGE_COLUMN_STATUS_XPATH).should('have.length', 20).then(($cells) => {
            const tableValuesAfterSortDesc = [...$cells].map(cell => cell.innerText.trim());
            console.log('Table values after sorting DESC:', tableValuesAfterSortDesc);

            tableValuesAfterSortDesc.forEach((value, index) => {
                const expectedValue = valuesStatusDesc[index];
                const formattedTableValue = value.trim(); 
                expect(expectedValue).to.equal(formattedTableValue); 
            });
        });
};
