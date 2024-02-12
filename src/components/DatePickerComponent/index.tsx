import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { Container, DateContainer } from "./styles";
import { useEffect, useRef, useState } from "react";
import pt from "date-fns/locale/pt-BR";
import { BsCalendar3 } from "react-icons/bs";
registerLocale("pt-BR", pt);

export const DatePickerComponent = ({ request }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleClose = () => {
    setShow(false);
  };

  const ref = useRef<any>();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 59);

      handleClose();
      request({
        minDate: start.getTime(),
        maxDate: end.getTime(),
      });
    }
  }, [endDate]);

  return (
    <Container ref={ref}>
      {!show ? (
        <button onClick={() => setShow(true)}>
          <BsCalendar3 />
        </button>
      ) : (
        <DateContainer>
          <DatePicker
            selected={startDate}
            locale={"pt-BR"}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
            selectsRange
            inline
          />
        </DateContainer>
      )}
    </Container>
  );
};
