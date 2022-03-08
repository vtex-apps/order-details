import { useEffect, useState } from "react";

export const useGetCustomerEmail = (email: string) => {
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    const params = {
      headers: {
        credentials: 'same-origin'
      }
    };
    const query = `?_fields=customerEmail&_where=email=${email}`;
    fetch(`/api/dataentities/CL/search${query}`, params)
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((data) => {
        const [customer] = data;
        console.log(customer)
        setCustomerEmail(customer?.customerEmail || null);
      });
  }, []);

  return customerEmail

}
