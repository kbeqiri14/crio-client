import { useState } from 'react';
import { userHasGroup } from './auth/hoc';
import { signIn } from './auth';

const SigninForm = function() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      signIn(email, password);
    }}>
      <span>Sign in</span>
      <p>
        <input
          type="text"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
      </p>
      <p>
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
      </p>
      <button>Sign in</button>
    </form>
  );
}

const ComponentA = userHasGroup('doctor')(function() {
  return 'Visible for Doctors';
});

const ComponentB = userHasGroup('patient')(function() {
  return 'Visible for Patients';
});

function App() {
  return (
    <div className="App">
      <SigninForm/>
      <ComponentA/>
      <ComponentB/>
    </div>
  );
}

export default App;
