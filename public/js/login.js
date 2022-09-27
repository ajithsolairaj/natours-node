import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    // console.log('helo');
    if (res.data.status === 'success') {
      //   console.log('helo');
      //   alert('Logged in successfully!');
      window.setTimeout(() => {
        const markup = `<div class="alert alert--success">Logged in successfully</div>`;
        document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(() => {
          const el = document.querySelector('.alert');
          el.parentElement.removeChild(el);
          location.assign('/');
          location.reload(true);
        }, 2000);
      }, 1000);
    }
    // console.log(res.data);
  } catch (err) {
    // alert('Incorrect email or password');
    window.setTimeout(() => {
      const markup = `<div class="alert alert--error">Incorrect email or password</div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
      window.setTimeout(() => {
        const el = document.querySelector('.alert');
        el.parentElement.removeChild(el);
      }, 2000);
    }, 1000);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      location.reload(true);
      location.assign('/');
    }
  } catch (err) {
    // showAlert('error', 'Error logging out! Try again later');
    window.setTimeout(() => {
      const markup = `<div class="alert alert--error">Error logging out! Try again later</div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
      window.setTimeout(() => {
        const el = document.querySelector('.alert');
        el.parentElement.removeChild(el);
      }, 2000);
    }, 1000);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        const markup = `<div class="alert alert--success">signed up successfully</div>`;
        document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(() => {
          const el = document.querySelector('.alert');
          el.parentElement.removeChild(el);
          location.assign('/');
          location.reload(true);
        }, 2000);
      }, 1000);
    }
  } catch (err) {
    window.setTimeout(() => {
      const markup = `<div class="alert alert--error">${err.response.data.message}</div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
      window.setTimeout(() => {
        const el = document.querySelector('.alert');
        el.parentElement.removeChild(el);
      }, 2000);
    }, 1000);
  }
};
