import React, { Fragment } from 'react';
import Wrapper from '../components/UI/Layout/Wrapper';
import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <Fragment>
      <div className={classes.homePage}>
        <Wrapper>
          <h1 style={{ fontSize: '4rem', lineHeight: '6rem', margin: '10rem 0 2rem' }}>
            Welcome to Invoice<span style={{ color: '#9277ff' }}>Me</span>!
          </h1>
          <p style={{ fontSize: '0.9rem', lineHeight: '2rem' }}>
            We will take care of your invoices wherever you are.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: '2rem' }}>
            Instant access from you pc, tablet, or your phone.
          </p>
        </Wrapper>
      </div>
    </Fragment>
  );
};

export default HomePage;
