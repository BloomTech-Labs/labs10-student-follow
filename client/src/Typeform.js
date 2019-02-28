import React from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';

const Typeform = () => {
  return (
    <div>
      <h1>My Typeform</h1>
      <ReactTypeformEmbed url="https://nick971045.typeform.com/to/eaHFcw/" />
      {/* <form
        class="form"
        action="https://docs.google.com/forms/d/e/1FAIpQLSegUbJ2hFXTFfDbBbIp2nsAWF4m9lL1GOFOBztLz7hEPvopJA/viewform?embedded=true"
      >
        <label>Name</label>
        <input name="entry.742532386" type="text" />

        <label>Email</label>
        <input name="entry.1558941179" type="email" required />

        <input type="submit" value="Send" />
      </form> */}
    </div>
  );
};

export default Typeform;
