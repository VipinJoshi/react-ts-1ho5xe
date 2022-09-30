import * as React from 'react';

import './style.css';

export default function App() {
  const [loginFormState, setLoginFormState] = React.useState({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  });

  const [isFormValid, setIsFormValid] = React.useState(false);
  const handleSubmitClick = (event) => {
    event.preventDefault();
    console.log(
      `my payload will be like email: ${loginFormState.email.value}, password :${loginFormState.password.value}`
    );

    // here we perform so DB performane
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    let formState = loginFormState;
    let fieldErrorMessage = '';
    if (id === 'email') {
      const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test(value)) {
        fieldErrorMessage = 'Check Email Address';
        setIsFormValid(false);
      } else {
        setIsFormValid(true);
      }
      formState = {
        ...loginFormState,
        [id]: { value: value, error: fieldErrorMessage },
      };
    }
    if (id === 'password') {
      if (value.length < 8) {
        fieldErrorMessage = 'Password should be 8 character long';
        setIsFormValid(false);
      } else {
        setIsFormValid(true);
      }
      formState = {
        ...loginFormState,
        [id]: { value: value, error: fieldErrorMessage },
      };
    }
    setLoginFormState(formState);
  };

  return (
    <div>
      <form onSubmit={handleSubmitClick}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            className="email"
            placeholder="Email"
            value={loginFormState.email.value}
            onChange={handleChange}
          />
        </div>
        {loginFormState.email.error && (
          <span className="error">{loginFormState.email.error} </span>
        )}
        <div className="form-group">
          <input
            type="password"
            id="password"
            className="password"
            placeholder="Password"
            value={loginFormState.password.value}
            onChange={handleChange}
          />
        </div>
        {loginFormState.password.error && (
          <span className="error">{loginFormState.password.error} </span>
        )}
        <br />
        <button disabled={!isFormValid} type="submit" className="button">
          Enter
        </button>
      </form>
    </div>
  );
}
