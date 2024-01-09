import React, { useRef, useState } from "react";
import { useClickOutside } from "../hooks/use-click-outside";

const Login: React.FC = () => {
  const [isOpened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpened(false));

  return (
    <div ref={ref} className="relative">
      <button
        className="bg-green px-3 py-2 text-white"
        onClick={() => setOpened(!isOpened)}
      >
        Войти
      </button>
      {isOpened && (
        <div className="absolute bg-white p-2 text-black">
          <form action="/login" method="POST">
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
              className="border-none bg-white text-black outline-none"
              placeholder="Пароль"
              required
            />

            <hr className="border-gray py-1" />

            <button type="submit" className="bg-green px-3 py-2 text-white">
              Войти
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
