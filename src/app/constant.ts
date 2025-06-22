export const APP_CONSTANTS = {
    DATE_FORMAT: 'YYYY-MM-DD',
    TIME_FORMAT: 'HH:mm:ss',
    DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  
    API_ENDPOINTS: {
      LOGIN: '/login',
      REGISTER: '/auth/register',
      USERS: '/users',
      PROFILE: '/users/profile',
      CUSTOMERS:'/customers'
    },
  
    MESSAGES: {
      GENERIC_ERROR: 'Something went wrong. Please try again later.',
      FORM_INVALID: 'Please fill all required fields.'
    },
  
    PAGINATION: {
      DEFAULT_PAGE_SIZE: 10,
      PAGE_SIZES: [10, 20, 50, 100]
    }
  };