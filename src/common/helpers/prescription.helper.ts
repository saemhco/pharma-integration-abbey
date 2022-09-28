      export const getCustomerPopulateObject = () => {
        return {
          path: 'customer',
          select: 'fname lname fullname email profile_img mobile_no country_code rating_customer active isVerified location lat_long isOnline country region state city postcode country_name_code customer_code createdAt'
      } 
    }
    export const getPharmacyPopulateObject = () => {
      return {
        path: 'pharmacy',
        select: 'fname lname fullname email profile_img pharmacy_name mobile_no country_code rating_pharmacy active isVerified location lat_long isOnline country region state city postcode country_name_code pharmacy_code pharmacy_landline_num street_name phone_number fax_number fax_country_code timeZone createdAt'
      }
    }
  