import React from 'react';

function UserGreeting() {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
  return <h1>Please sign up.</h1>;
}

function LoginButton() {
  return <button>Login</button>;
}

function LogoutButton() {
  return <button>Logout</button>;
}

function Greeting(props) {
  const { isLoggedIn } = props;

  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoggedIn(props) {
  const { isLoggedIn } = props;

  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}

function Login({ isLoggedIn }) {
  let button;

  if (isLoggedIn) {
    button = <LogoutButton />;
  } else {
    button = <LoginButton />;
  }

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {button}
    </div>
  );
}

function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

export default function App() {
  // Breyttum stöðu með því að setja isLoggedIn sem false eða true
  const isLoggedIn = false;
  const messages = ['foo', 'bar'];
  return (
    <div>
      <LoggedIn isLoggedIn={isLoggedIn} />
      <Login isLoggedIn={isLoggedIn} />
      {isLoggedIn && (
        <Mailbox unreadMessages={messages} />
      )}
    </div>
  );
}
