const express = require('express');
const router = express.Router();
const db = require('../data/helpers/classesHelper');
const jwtCheck = require('../middleware/authenticate');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

// router.get(
//   'https://nickoferrall.auth0.com/api/v2/clients',
//   async (req, res) => {
//     try {
//       // const clients = await router.get(
//       //   'https://nickoferrall.auth0.com/api/v2/clients'
//       // );
//       console.log('CLIENTS', clients);
//       res.status(200).json(clients);
//     } catch (error) {
//       console.log('ERR', error);
//     }
//   }
// );

var request = require('request');

var options = {
  method: 'GET',
  url: 'https://nickoferrall.auth0.com/api/v2/stats/active-users',
  headers: {
    authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qUTRSRU5CT1RWQlJqSkNNa0l5T1VGRk1EUTNNa00xTlRKQ1EwWXlSVU5DTVRnME9FRkRNUSJ9.eyJpc3MiOiJodHRwczovL25pY2tvZmVycmFsbC5hdXRoMC5jb20vIiwic3ViIjoiem83Rkp6cVNlR0NHaFhGRm5tU21jNDhsQmIxNnpLcWdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbmlja29mZXJyYWxsLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTUxMjE4MjI1LCJleHAiOjE1NTEzMDQ2MjUsImF6cCI6InpvN0ZKenFTZUdDR2hYRkZubVNtYzQ4bEJiMTZ6S3FnIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.ISFYm_ZyEuROpyJ-SMiCrHW1rlQ8byQG41Ng1LscZsEE-EFN6QldoXqSJH-wMpQmjv1Q8qwztczq084C6vMQ48F73L0z50X02F9415elsFCH0NPrTYBIIN4ulZos18-nb7mOqMK6tHhSXa8oszpOWBLZHQlfEYSaQ7L3dMMth19YuEz4Wymll0TevnoYdECviOqyOCCvO4Dvu-ouigvRVF3kV_4cOoQNr5xPqWJ0swp34k9xvTy8NM14y8yCY-q8f9HIHlNBj9orfTFZdwea88zJHp0IQLbxfxMOhzAcB-Xht0MZNqoR5Qpiy1SS5_FaReGXO3yeGn6YmqMBU7XSEQ',
    'content-type': 'application/json'
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

module.exports = router;
