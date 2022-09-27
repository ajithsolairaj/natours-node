import axios from 'axios';

export const emailSendForgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
        url: true,
      },
    });

    if (res.data.status === 'success') {
      //   console.log('hellllo');
      window.setTimeout(() => {
        const markup = `<div class="alert alert--success">check your email and reset password</div>`;
        document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(() => {
          const el = document.querySelector('.alert');
          el.parentElement.removeChild(el);
          // location.assign('/');
          // location.reload(true);
        }, 2000);
      }, 1000);
    }
  } catch (err) {
    // console.log(err);
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

export const sendResetPassword = async (password, passwordConfirm, token) => {
  try {
    const url = `/api/v1/users/resetPassword/${token}`;
    const res = await axios({
      method: 'PATCH',
      url,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      //   console.log('hellllo');
      window.setTimeout(() => {
        const markup = `<div class="alert alert--success">password reset successfully</div>`;
        document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(() => {
          const el = document.querySelector('.alert');
          el.parentElement.removeChild(el);
          location.assign('/');
          // location.reload(true);
        }, 2000);
      }, 1000);
    }
  } catch (err) {
    // console.log(err);
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
