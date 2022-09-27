import axios from 'axios';
// import {showAlert} from './alerts'

// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:3000/api/v1/users/updateMyPassword'
        : 'http://localhost:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        const markup = `<div class="alert alert--success">${type.toUpperCase()} Updated  successfully</div>`;
        document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(() => {
          const el = document.querySelector('.alert');
          el.parentElement.removeChild(el);
          location.reload(true);
        }, 2000);
      }, 1000);
    }
  } catch (err) {
    console.log('hello', err.response);
    window.setTimeout(() => {
      const markup = `<div class="alert alert--error">${err.response.data.message}</div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
      window.setTimeout(() => {
        const el = document.querySelector('.alert');
        el.parentElement.removeChild(el);
        // location.reload(true);
      }, 2000);
    }, 1000);
  }
};
