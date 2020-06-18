export const signUp = async (data) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }
  return Promise.reject(new Error('This email is already used!'));
};

export const signIn = async (data) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }
  return Promise.reject(new Error('Incorrect email or password!'));
};
