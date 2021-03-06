import load from 'load-script';

function makeApiCall(bodyData) {
  const params = {
    spreadsheetId: app.env.GOOGLE_SPREAD_SHEET_ID,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS'
  };

  const valueRangeBody = {
    majorDimension: 'ROWS',
    range: '',
    values: [bodyData]
  };

  const request = gapi.client.sheets.spreadsheets.values.append(
    params,
    valueRangeBody
  );
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
    },
    function(reason) {
      console.error('error: ' + reason.result.error.message);
    }
  );
}

function initClient() {
  const CLIENT_ID = app.env.GOOGLE_CLIENT_ID;
  const API_KEY = app.env.GOOGLE_SHEET_API_KEY;
  const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
      discoveryDocs: [
        'https://sheets.googleapis.com/$discovery/rest?version=v4'
      ]
    })
    .then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function updateSignInStatus(formData) {
  makeApiCall(formData);
}

function getFormDataAPIKeys(e) {
  if (e.target.name === 'submit') {
    const nodeList = e.currentTarget.childNodes;
    const formData = Array.from(nodeList)
      .filter(dom => dom.className === 'input-item')
      .map(dom => dom.childNodes[0].value);
    updateSignInStatus(formData);
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

load('https://apis.google.com/js/api.js', { async: true }, function(
  err,
  script
) {
  if (err) {
    // print useful message
  } else {
    handleClientLoad();
    // use script
    // note that in IE8 and below loading error wouldn't be reported
  }
});

export { getFormDataAPIKeys };
