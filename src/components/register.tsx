import React, { useRef, useState } from "react";

import { useClickOutside } from "../hooks/use-click-outside";

const Register: React.FC = () => {
  const [isOpened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpened(false));

  return (
    <div className="relative" ref={ref}>
      <button
        className="bg-green px-3 py-2 text-white"
        onClick={() => setOpened(!isOpened)}
      >
        Зарегистрироваться
      </button>
      {isOpened && (
        <div className="absolute bg-white p-2 text-black">
          <form action="/register" method="POST">
            <input
              name="login"
              className="border-0 bg-white bg-none text-black"
              placeholder="Логин"
              required
            />

            <hr className="border-gray py-1" />

            <input
              name="password"
              type="password"
              className="border-0 bg-white bg-none text-black"
              placeholder="Пароль"
              required
            />

            <hr className="border-gray py-1" />

            <button type="submit" className="bg-green px-3 py-2 text-white">
              Зарегистрироваться
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
