export default function authHeader() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ5LCJpYXQiOjE2MDM0NzQxMzQsImV4cCI6MTYwNDY4MzczNH0.23BL23rU1TF02VxiFf3IOMyfvAXYAmVvTFJaUAGiFPE'; // JSON.parse(localStorage.getItem('user'));

  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
  } else {
    return {};
  }
}
