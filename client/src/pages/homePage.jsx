import React, { useState } from "react";

import SignUp from "../components/signUp";
import Login from "../components/login";

export default function HomePage() {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div>
      {isRegistered ? (
        <div>
          <Login setIsRegistered={setIsRegistered} />
        </div>
      ) : (
        <div>
          <SignUp setIsRegistered={setIsRegistered} />
        </div>
      )}
    </div>
  );
}
