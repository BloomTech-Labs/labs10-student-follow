import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Image from './logo.png';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import classNames from 'classnames';

const width = {
  width: '100%'
};

const contactButton = {
  padding: '3%',
  width: '100%',
  borderRadius: '5%',
  backgroundColor: '#F5F5F5',
  fontSize: '0.8rem'
};

export default class TakeMoney extends React.Component {
  onToken = async token => {
    const url = 'http://localhost:9000/billing/charge';
    try {
      await axios.post(url, {
        token: token,
        subType: this.props.subType
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  sendEmail = event => {
    // this is a temporary solution. We should create a custom form rather than opening the email client
    event.preventDefault();
    window.location.href = `mailto:hello@refreshr.com`;
  };

  render() {
    return this.props.variant === 'custom' ? (
      <div style={width}>
        <button onClick={this.sendEmail} style={contactButton}>
          Contact Us
        </button>
      </div>
    ) : (
      <div style={width}>
        <StripeCheckout // This component uses the token created above to make a one time payment
          style={width}
          token={this.onToken}
          stripeKey="pk_test_Y6iNnz4ImmbwJDcFA982Hahf"
          name="Refreshr"
          description="Purchase your subscription"
          panelLabel="Purchase"
          image={Image} // We should have a second smaller logo image without text
          amount={this.props.variant} // Amount passed by buttonVariant in Pricing.js
          currency="USD"
          email="nickoferrall@gmail.com" // will update this to the user email
        />
      </div>
    );
  }
}
