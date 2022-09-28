    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      export const formatDate = (date) => {
        return (
          [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-') +
          ' ' +
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(':')
        );
      }

      export const updateUtcDate = (offset,date) => {
        const utc = new Date(date.toUTCString().slice(0, -4));
        const newDate = new Date(utc.getTime() + (offset * 1000 * 3600)); 
        return newDate; 
    }
  