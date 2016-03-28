const nullthrows = (check) => {
  if (check != null) { // eslint-disable-line
    return check;
  }
  throw new Error('Got unexpected null or undefined');
};

export default nullthrows;
