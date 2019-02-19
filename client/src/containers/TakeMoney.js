import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Image from './logo.png';
import axios from 'axios';

export default class TakeMoney extends React.Component {
  onToken = async token => {
    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token)
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
    console.log('TOKEN', token, this.props.subType);
    const url = 'http://localhost:9000/billing/charge';
    try {
      console.log('Inside try');
      const myResponse = await axios.post(url, {
        token: token,
        subType: this.props.subType
      });
      console.log('MY response', myResponse);
    } catch (error) {
      console.log('ERR', error);
    }
  };

  render() {
    return (
      <StripeCheckout // This component uses the token created above to make a one time payment
        token={this.onToken}
        stripeKey="pk_test_Y6iNnz4ImmbwJDcFA982Hahf"
        name="Refreshr"
        description="Purchase your subscription"
        panelLabel="Purchase"
        image={Image} // We should have a second smaller logo image without text
        amount={this.props.subType} //cents
        currency="USD"
        email="nickoferrall@gmail.com" // will update this to the user email
        bitcoin={true}
        alipay={true}
      />
    );
  }
}
