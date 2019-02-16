import React, { useState } from 'react';

const BillingPage = props => {
  const [cardInfo, setCardInfo] = useState({
    cardNum: '',
    expiration: '',
    cvv: '',
    subType: '',
  });

  const handleChange = e => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    console.log(cardInfo);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(cardInfo);
  };

  return (
    <>
      <h1>BillingPage</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNum"
          value={cardInfo.cardNum}
          onChange={handleChange}
          placeholder="CC#"
        />
        <input
          type="text"
          name="expiration"
          value={cardInfo.expiration}
          onChange={handleChange}
          placeholder="expiration date"
        />
        <input
          type="text"
          name="cvv"
          value={cardInfo.cvv}
          onChange={handleChange}
          placeholder="cvv"
        />
        <label>
          <input onChange={handleChange} type="radio" name="subType" value="yearly" />
          yearly
        </label>
        <label>
          <input onChange={handleChange} type="radio" name="subType" value="monthly" />
          monthly
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default BillingPage;
