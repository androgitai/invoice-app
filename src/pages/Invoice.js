import { useParams } from 'react-router-dom';

const Invoice = () => {
  const params = useParams();

  return (
    <div>
      <h2>Invoice (details)</h2>
      <p>Id: {params.invoiceId}</p>
    </div>
  );
};

export default Invoice;
