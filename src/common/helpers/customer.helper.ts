import { Customer } from "src/customers/interfaces/customer.interface";
import { formatDate } from "./date-time.helper";

      export const customerFormatField = (item) => {
        const {
          //Hidden fields                
          recursiveJobs,
          pickup_note,
          delivery_note,

          //end hidden fields
          ...newData
      } =  item.toJSON();
      newData.createdAt =   formatDate(item.createdAt);
      return newData as Customer;
    }
  