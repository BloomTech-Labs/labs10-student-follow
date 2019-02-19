import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Image from './logo.png';

export default class TakeMoney extends React.Component {
  onToken = token => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  render() {
    console.log('PRopping', typeof this.props.subType);
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_Y6iNnz4ImmbwJDcFA982Hahf"
        name="Refreshr"
        description="Purchase your subscription"
        panelLabel="Purchase"
        image={Image}
        amount={this.props.subType} //cents
        currency="USD"
        email="nickoferrall@gmail.com"
        bitcoin={true}
        alipay={true}
      />
    );
  }
}
