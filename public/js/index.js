// import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSetting';
import { emailSendForgotPassword, sendResetPassword } from './forgotPassword';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const submitMailForgotPassword = document.querySelector('.form--emailSubmit');
const passwordSubmit = document.querySelector('.form--passwordSubmit');
const signupForm = document.querySelector('.form--signup');
const bookBtn = document.getElementById('book-tour');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.forgot-password').textContent = 'processing...';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
    document.querySelector('.forgot-password').textContent = 'Login';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save Password';

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (submitMailForgotPassword) {
  submitMailForgotPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.mail-btn').textContent = 'processing...';

    const email = document.getElementById('email').value;
    // console.log(email);
    await emailSendForgotPassword(email);
    document.querySelector('.mail-btn').textContent = 'Ok';
  });
}

if (passwordSubmit) {
  // console.log('ggggg');
  passwordSubmit.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.password-btn').textContent = 'processing...';

    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const token = document.getElementById('token').value;
    // console.log(password, passwordConfirm, token);
    await sendResetPassword(password, passwordConfirm, token);
    document.querySelector('.password-btn').textContent = 'Ok';
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.signup-btn').textContent = 'processing...';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    await signup(name, email, password, passwordConfirm);
    document.querySelector('.signup-btn').textContent = 'Sign up';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
