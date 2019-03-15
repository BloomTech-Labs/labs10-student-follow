import React from 'react';
import ReactDOMServer from 'react-dom/server';

function makeEmail(refreshr) {
  return ReactDOMServer.renderToStaticMarkup(
    <html>
      <head>
        <title />
      </head>
      <body>
        <p>
          Take your Refreshr <a href={refreshr.typeform_url}>here</a>.
        </p>
        <p />
        <a href="[unsubscribe]">Unsubscribe</a>
      </body>
    </html>
  );
}

export default makeEmail;
