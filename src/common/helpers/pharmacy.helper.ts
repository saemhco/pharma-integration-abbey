import { Pharmacy } from "src/pharmacy/interfaces/pharmacy.interface";
import { formatDate } from "./date-time.helper";

      export const pharmacyFormatField = (item) => {
        const {
          // Hidden fields                
          total_jobs,
          active_jobs, 
          completed_jobs,
          avg_revenue,
          total_expense,
          available_cabs,
          token,
          socialType,
          socialId,
          stripe_customerId,
          selected_card,
          my_jobs,
          job_count,
          pickup_count,
          delivery_count,
          last_paid_on,
          last_requested_payment,
          payment_request,
          amount_payable,
          accepted_job,
          upcoming_jobs,
          payment_due,
          accepted_pending_counts,
          language,
          isSubscription,
          available_job,
          email_verified,
          mobile_verified,
          otp_mobile,
          otp_email,
          cookie_status,
          country_flag_name,
          preffered_drivers,
          devices,
          adminLoginToken,
          privacy_policy_accept_date,
          assignedDrivers,
          isSubscribedByDispatch,
          dispatchCompanyId,
          selectedAssignedDrivers,
          credentials_for_dispatch,
          preffered_dispatches,
          emailNotifications,
          isPharmacyTypeOnline,
          onlinePharmacySecretKey,
          password,
          //end hidden fields
          ...newData
      } =  item.toJSON();
      newData.createdAt =   formatDate(item.createdAt);
      return newData as Pharmacy;
    }
  