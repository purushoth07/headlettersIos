export const medium_yahoo= 'Yahoo';
export const medium_gmail= 'Gmail';
export const medium_faebook= 'Facebook';
export const PASSWORD = "HeadLetters@#!123456";
export const STAGING_URL = "https://staging.headletters.com/API/"
export const STARTING_URL = "http://49.50.103.132/LetterHead/";
export const HOME_URL ="https://api.headletters.com/";
export const BASE_URL = HOME_URL;
export const WEB_CLIENT_ID="26260079443-6su5mdpbihhg94omm3ncpqs5o5hdmgdd.apps.googleusercontent.com";
export const YAHOO_CLIENT_ID = "dj0yJmk9UlRGUzRhdlhvd0QzJmQ9WVdrOVJtSktRV051Tm1VbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02MQ--";
export const FACEBOOK_APP_ID = "1708254755957889";
export const FACEBOOK_REDIRECT_URI = 'https://headletters-d373f.firebaseapp.com/__/auth/handler';

export const LANG_CODE_ENGLISH = 'en';
export const LANG_CODE_HINDI = 'hi';
export const LANG_CODE_TAMIL = 'ta';
export const LANG_ENGLISH = 'English';
export const LANG_HINDI = 'हिंदी';
export const LANG_TAMIL = 'தமிழ்';

export const INR = 'INR';
export const USD = 'USD';
export const CURRENCY_USD = '$';
export const CURRENCY_INR = '₹';

export const DATE_TIME_FORMAT_SERVER  = 'ddMMyyhhmmss';

//key used in storage
export const USER_DATA = 'USER_DATA';
export const IS_LOGIN = "is_user_login"
export const LOGIN_WITH = "login_with";

export const SESSION_GOOGLE = 'GOOGLE_SESSION';

//used for NavParam
export const TYPE = 'type';

//title type
export const ADD_PROFILE = 'add_profile';
export const UPDATE_PROFILE = 'update_profile';
export const ADD_HOROSCOPE = 'add_horoscope';
export const UPDATE_HOROSCOPE = 'update_horoscope';
export const ADD_MESSAGE = 'add_message';
export const UPDATE_MESSAGE = 'update_message';

//popover type
export const POPOVER_LANGUAGE = 'popover_language';
export const POPOVER_COUNTRY = 'popover_country';
export const POPOVER_GENDER = 'popover_gender';
export const POPOVER_DATE = 'popover_date';
export const POPOVER_MONTH = 'popover_month';
export const POPOVER_YEAR = 'popover_year';
export const POPOVER_HOUR = 'popover_hour';
export const POPOVER_MIN = 'popover_min';
export const POPOVER_SEC = 'popover_sec';
export const POPOVER_AM_PM = 'popover_am_pm';
export const POPOVER_HOROSCOPE_MENU = 'popover_horoscope_menu';
export const POPOVER_HOROSCOPE_NAME = 'popover_horoscope_name';
export const POPOVER_CALENDAR = 'popover_calendar';
export const POPOVER_BIRTH_ORDER = 'popover_birth_order';

//calendar type
export const CALENDAR_DATE = 1;
export const CALENDAR_MONTH = 2;
export const CALENDAR_YEAR = 3;
export const CALENDAR_MONTH_NAME = 4;
export const CALENDAR_YEAR_FULL = 5;

export const CALENDAR_FOR_OWNER_DOB = 1;
export const CALENDAR_FOR_MARRIAGE = 2;
export const CALENDAR_FOR_TRAVEL = 3;
export const CALENDAR_FOR_CALL = 4;
export const CALENDAR_FOR_DEMISE = 5;
export const CALENDAR_FOR_CHILD = 6;
export const CALENDAR_FOR_STATEMENT = 7;

//timer type
export const TIME_HOUR = 1;
export const TIME_MIN = 2;
export const TIME_SEC = 3;
export const TIME_AM_PM = 4;
export const TIME_FOR_OWNER_DOB = 1;
export const TIME_FOR_MARRIAGE = 2;
export const TIME_FOR_TRAVEL = 3;
export const TIME_FOR_CALL = 4;
export const TIME_FOR_DEMISE = 5;
export const TIME_FOR_CHILD = 6;

export const REQ_CAT_WEEKLY = "1";
export const REQ_CAT_DAILY = "2";
export const REQ_CAT_SPECIAL = "3";
export const REQ_CAT_JU = "4";
export const REQ_CAT_SA = "5";
export const REQ_CAT_RA = "6";
export const REQ_CAT_KE = "7";
export const REQ_CAT_MA = "8";
export const REQ_CAT_SU = "9";
export const REQ_CAT_ME = "10";

export const TRANSIT_JU = "JU";
export const TRANSIT_SA = "SA";
export const TRANSIT_RA = "RA";
export const TRANSIT_KE = "KE";
export const TRANSIT_MA = "MA";
export const TRANSIT_SU = "SU";
export const TRANSIT_ME = "ME";


export const REQ_CAT_GEN_CHART = "7";
export const REQ_CAT_PROMISE = "11";

export const YES = "y";
export const NO = "n";
export const TRUE = "T";
export const FALSE = "F";
export const PARTIAL = "P";

export const email_checker =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_CHECKER  = /^(?![0-9]){1,}/;// /^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/;
export const NUMBER_CHECKER = /^\d+$/;

export const COMMON_PROFILE_IMAGE = "assets/icon/profile-pic.svg";

export const BLANK_DATE_TIME = "000000000000"
export const REGISTER_FOR_TOUCH = "register_for_touch";
export const UNAUTHORIZED  = "Unauthorized";
export const SELECTED_LANGUAGE = "selected_language";

// export const availableLanguages = [{
// 	code: 'en',
// 	name: 'English'
// }, {
// 	code: 'hi',
// 	name: 'Hindi'
// },{
//     code: 'ta',
// 	name: 'Tamil'
// }];


export const defaultLanguage = 'en';

export const sysOptions = {
	systemLanguage: defaultLanguage
};

export const PAYMENT_STATUS={
	YES:"Y",
	NO:"N",
	CANCEL:"C"
}

export const AMOUNT_TYPE={
	TOP_UP:"1",
	TAXES:"2",
	SERVICE_CHARGE:"3"
}

export const TERMS_CONDITION_CHECK = "terms_condition_check";

export const RESPONSE_WITH_STATUS_0_1 = "Response with status: 0";
export const RESPONSE_WITH_STATUS_0_2 = "Response with status:0";
// export const RESPONSE_WITH_STATUS_0 = "Response with status: 0 for URL: null";

export const UTC = "UTC";

export const LAT="lattitude";
export const LON="longitude";