import React from 'react';

const Signup = () => {
    return (
        <div>
    <form>
    <label htmlFor="username">Username</label>
      <br />
      <input type="text" name="username" />
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input type="text" name="username" />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input type="password" name="password" />
      <br />
      <button type="submit">Sign up</button>
    </form>
        </div>
    );
}

export default Signup;
