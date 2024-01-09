import React, { useRef, useState } from "react";
import { useClickOutside } from "../hooks/use-click-outside";

const Donate: React.FC = () => {
  const [isOpened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  //Нажал снаружи - закрыл(
  useClickOutside(ref, () => setOpened(false));

  return (
    // Относительное позиционирование для модалки
    <div ref={ref} className="relative">
      <button
        className="bg-biege px-3 py-2 text-black"
        onClick={() => setOpened(!isOpened)}
      >
        Помощь нам ❤
      </button>
      {isOpened && (
        <div className="absolute bg-white p-2 text-black">
          <form action="/api/donate" method="POST">
            <input
              name="firstName"
              className="border-0 bg-white bg-none text-black"
              placeholder="Имя"
              // Если ничего не ввёл - алерт
              required
            />

            <hr className="border-gray py-1" />

            <input
              name="secondName"
              className="border-0 bg-white bg-none text-black"
              placeholder="Фамилия"
              required
            />

            <hr className="border-gray py-1" />

            <input
              name="phoneNumber"
              className="border-0 bg-white bg-none text-black"
              placeholder="Номер телефона"
              type="tel"
              required
            />

            <hr className="border-gray py-1" />

            <input
              name="amount"
              className="border-0 bg-white bg-none text-black"
              placeholder="Сумма пожертвования"
              type="number"
              required
            />

            <hr className="border-gray py-1" />

            <button type="submit" className="bg-biege px-3 py-2 text-black">
              Помочь
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Donate;
