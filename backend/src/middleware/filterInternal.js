import mung from 'express-mung';

let filterInternalFields = (responseBody) => {
  return JSON.parse(
    JSON.stringify(responseBody, (key, value) =>
      key.startsWith('_') ? undefined : value
    )
  );
}

export default mung.json((responseBody, request, response) => {
  return filterInternalFields(responseBody);
});
