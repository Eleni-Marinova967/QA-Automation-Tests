// 🔐 Sensitive data (login credentials) have been removed for security reasons.
export const ADMIN_USERNAME = Cypress.env("");
export const ADMIN_PASSWORD = Cypress.env("");
export const USER_USERNAME = Cypress.env("");
export const USER_PASSWORD = Cypress.env("");

//New Promo Code 
import { calculatePCDateTestData } from './Pages/promoCodePage';

const startDateUser = calculatePCDateTestData(1);
const endDateUser = calculatePCDateTestData(26);

const startDateAdmin = calculatePCDateTestData(-2);
const endDateAdmin = calculatePCDateTestData(23);

export const NEW_PROMO_CODE_NAME = 'TEST_AUTOMATION';
export const NEW_PROMO_CODE_CONDITIONS = 'This is an automated test to create a Promo Code';
export const NEW_PROMO_CODE_PAGE_LINK = 'https://www.youtube.com/watch?v=u8vMu7viCm8&t=52s';
export const NEW_PROMO_CODE_PAGE_DISCOUNT_TYPE = "FIXED_DISCOUNT";
export const NEW_PROMO_CODE_PAGE_TYPE = "X_LIKED_OFFERS";
export const NEW_PROMO_CODE_PAGE_CONDITIONAL_NUMBER = "5";
export const NEW_PROMO_CODE_PAGE_DISCOUNT = "35";

export const USER_PROMO_CODE_START_DATE = `${startDateUser.day}/${startDateUser.month}/${startDateUser.year}`;
export const USER_PROMO_CODE_END_DATE = `${endDateUser.day}/${endDateUser.month}/${endDateUser.year}`;
export const USER_PROMO_CODE_START_DAY = startDateUser.day;
export const USER_PROMO_CODE_END_DAY = endDateUser.day;
export const USER_PROMO_CODE_END_MONTH = `${endDateUser.month}`;

export const ADMIN_PROMO_CODE_START_DATE = `${startDateAdmin.day}/${startDateAdmin.month}/${startDateAdmin.year}`;
export const ADMIN_PROMO_CODE_END_DATE = `${endDateAdmin.day}/${endDateAdmin.month}/${endDateAdmin.year}`;
export const ADMIN_PROMO_CODE_START_DAY = startDateAdmin.day;
export const ADMIN_PROMO_CODE_END_DAY = endDateAdmin.day;
export const ADMIN_PROMO_CODE_END_MONTH = `${endDateAdmin.month}`;