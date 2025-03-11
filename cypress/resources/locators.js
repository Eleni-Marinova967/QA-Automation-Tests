// Header
export const HEADER_HOME_MENU_XPATH = '//a[@href="/"]';
export const HEADER_PROMO_CODES_MENU = '//*[@id="root"]/main/nav/ul/li[4]/a';
export const HEADER_SAVED_SEARCHES_MENU_XPATH = '//*[@id="root"]/main/nav/ul/li[7]/a';

// Login page
export const LOGIN_PAGE_LABEL = '[class="form-label"]';
export const LOGIN_PAGE_USERNAME_INPUT = 'input[type="email"]';
export const LOGIN_PAGE_PASSWORD_INPUT = 'input[type="password"]';
export const LOGIN_PAGE_LOGIN_BUTTON = 'button[type="submit"]';
export const LOGIN_PAGE_WELCOME_MESSAGE_XPATH = '//*[@id="root"]/main/div[2]/h3[contains(text(), "Welcome")]';

//Saved searches page
export const SAVED_SEARCHES_PAGE_HEADING_XPATH = '//*[@id="root"]/main/div[2]/h3[contains(text(),"Saved searches")]';
export const SAVED_SEARCHES_PAGE_TABLE_XPATH = '//*[@id="root"]/main/div[2]/table';
export const SAVED_SEARCHES_PAGE_COLUMN_ID_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[1]';
export const SAVED_SEARCHES_PAGE_COLUMN_DEVICEID_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[2]';
export const SAVED_SEARCHES_PAGE_COLUMN_NAME_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[3]';
export const SAVED_SEARCHES_PAGE_COLUMN_SEARCHTEXT_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[4]';
export const SAVED_SEARCHES_PAGE_COLUMN_CATEGORY_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[5]';
export const SAVED_SEARCHES_PAGE_COLUMN_CREATIONDATE_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[6]';
export const SAVED_SEARCHES_PAGE_COLUMN_LastChangeDate_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[7]';
export const SAVED_SEARCHES_PAGE_COLUMN_STATUS_XPATH = '//*[@id="root"]/main/div[2]/table/tbody/tr/td[9]';
export const SAVED_SEARCHES_PAGE_COLUMN_NAME_SELECTOR = '#root > main > div.container > table > thead > tr';

//Promo Code page
export const PROMO_CODE_PAGE_HEADING_XPATH = '/html/body/div/main/div[2]/h3';
export const PROMO_CODE_PAGE_TABLE_XPATH = '/html/body/div/main/div[2]/table';
export const PROMO_CODE_PAGE_COLUMN_XPATH = '/html/body/div/main/div[2]/table/thead';
export const PROMO_CODE_PAGE_COLUMN_ID_XPATH = '//*[@id="root"]//table/tbody/tr/td[1]';
export const PROMO_CODE_PAGE_COLUMN_TYPE_XPATH = '//*[@id="root"]//table/tbody/tr/td[2]';
export const PROMO_CODE_PAGE_COLUMN_NAME_XPATH = '//*[@id="root"]//table/tbody/tr/td[3]';
export const PROMO_CODE_PAGE_COLUMN_START_DATE_XPATH = '//*[@id="root"]//table/tbody/tr/td[4]';
export const PROMO_CODE_PAGE_COLUMN_END_DATE_XPATH = '//*[@id="root"]//table/tbody/tr/td[5]';
export const PROMO_CODE_PAGE_COLUMN_DISCOUNT_XPATH = '//*[@id="root"]//table/tbody/tr/td[6]';
export const PROMO_CODE_PAGE_COLUMN_STATUS_XPATH = '//*[@id="root"]//table/tbody/tr/td[7]';
export const PROMO_CODE_PAGE_NEW_PC_BUTTON ='button[id="newPromotionButton"]';

//New Promo Code Page
import { calculatePCDateLocators } from './Pages/promoCodePage';

const promoStartDateUserLocators = calculatePCDateLocators(1);
const promoEndDateUserLocators = calculatePCDateLocators(2);
const promoStartDateAdminLocators = calculatePCDateLocators(-2);
const promoEndDateAdminLocators = calculatePCDateLocators(2);

export const NEW_PROMO_CODE_PAGE_HEADING_XPATH = '//*[@id="root"]/main/div[2]/div/div/h3[contains(text(),"New promo code")]';

export const NEW_PROMO_CODE_NAME = 'input[name="name"]';
export const NEW_PROMO_CODE_CONDITIONS = 'textarea[name="conditions"]';

export const NEW_PROMO_CODE_ONLINE_TYPE = 'input[name="onlineType"]';
export const NEW_PROMO_CODE_PHONE_TYPE = 'input[name="phoneType"]';
export const NEW_PROMO_CODE_LOCATION_TYPE = 'input[name="locationType"]';
export const NEW_PROMO_CODE_FAST_ORDER_TYPE = 'input[name="fastOrderType"]';

export const NEW_PROMO_CODE_DISCOUNT_TYPE_SELECT = 'select[name="discountType"]';
export const NEW_PROMO_CODE_LINK = 'input[name="linkToProducts"]';
export const NEW_PROMO_CODE_TYPE_SELECT = 'select[name="type"]';
export const NEW_PROMO_CODE_CONDITIONAL_NUMBER = 'input[name="conditionalNumber"]';
export const NEW_PROMO_CODE_DISCOUNT ='input[name="discount"]';

export const NEW_PROMO_CODE_SAVE_BUTTON = 'button[type="submit"]';

export const USER_PROMO_CODE_START_DATE_INPUT = `input[value="${promoStartDateUserLocators}"]`;
export const USER_PROMO_CODE_END_DATE_INPUT = `input[value="${promoEndDateUserLocators}"]`;

export const ADMIN_PROMO_CODE_START_DATE_INPUT = `input[value="${promoStartDateAdminLocators}"]`;
export const ADMIN_PROMO_CODE_END_DATE_INPUT = `input[value="${promoEndDateAdminLocators}"]`;