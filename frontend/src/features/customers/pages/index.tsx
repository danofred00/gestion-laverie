import { useEffect, useState } from "react";
import { CustomerService } from "../service";

export default function CustomerPage() {
  const [data, setData] = useState<string>();

  useEffect(() => {
    CustomerService.getAll().then(res => setData(JSON.stringify(res)));
  }, []);

  return (
    <div>
      <h1>Customer Page</h1>
      <p>Welcome to customer Page</p>
      <p>Data: {data ?? "Empty Data"}</p>
    </div>
  );
}
