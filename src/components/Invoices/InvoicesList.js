import classes from './InvoicesList.module.css';

const InvoicesList = () => {
  return (
    <>
      <section className={classes.invoicesList}>
        <div className={classes.card}>
          <h4 className={classes.item1}>
            <span>#</span>RT3080
          </h4>
          <p className={classes.item2}>Jensen Huang</p>
          <div className={classes.item3}>
            <p>
              <span>Due</span>19 Aug 2021
            </p>
            <h3>£1,800.90</h3>
          </div>
          <ul className={classes.item4}>
            <li>
              <h4>
                <div className={classes.dot}></div>Paid
              </h4>
            </li>
          </ul>
        </div>
      </section>
      <section className={classes.invoicesList}>
        <div className={classes.card}>
          <h4 className={classes.item1}>
            <span>#</span>RT3080
          </h4>
          <p className={classes.item2}>Jensen Huang</p>
          <div className={classes.item3}>
            <p>
              <span>Due</span>19 Aug 2021
            </p>
            <h3>£1,800.90</h3>
          </div>
          <ul className={classes.item4}>
            <li>
              <h4>Paid</h4>
            </li>
          </ul>
        </div>
      </section>
      <section className={classes.invoicesList}>
        <div className={classes.card}>
          <h4 className={classes.item1}>
            <span>#</span>RT3080
          </h4>
          <p className={classes.item2}>Jensen Huang</p>
          <div className={classes.item3}>
            <p>
              <span>Due</span>19 Aug 2021
            </p>
            <h3>£1,800.90</h3>
          </div>
          <ul className={classes.item4}>
            <li>
              <h4>Paid</h4>
            </li>
          </ul>
        </div>
      </section>
      <section className={classes.invoicesList}>
        <div className={classes.card}>
          <h4 className={classes.item1}>
            <span>#</span>RT3080
          </h4>
          <p className={classes.item2}>Jensen Huang</p>
          <div className={classes.item3}>
            <p>
              <span>Due</span>19 Aug 2021
            </p>
            <h3>£1,800.90</h3>
          </div>
          <ul className={classes.item4}>
            <li>
              <h4>Paid</h4>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default InvoicesList;
