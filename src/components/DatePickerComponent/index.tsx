import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { Container, DateContainer } from "./styles";
import { useEffect, useRef, useState } from "react";
import pt from "date-fns/locale/pt-BR";
import { BsCalendar3 } from "react-icons/bs";
import { Text, Button, Flex, Tooltip } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { colors } from "../../styles/theme";
import moment from "moment";
registerLocale("pt-BR", pt);

interface IDatePickerComponent {
  request: (values: any) => void;
  defaultDates?: { minDate: number; maxDate: number };
}

export const DatePickerComponent = ({
  request,
  defaultDates,
}: IDatePickerComponent) => {
  const [show, setShow] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  useEffect(() => {
    if (defaultDates) {
      let defaultStart: any = new Date(defaultDates.minDate);
      defaultStart = moment(defaultStart).format("YYYY-MM-DD");

      let defaultEnd: any = new Date(defaultDates.maxDate);
      defaultEnd = moment(defaultEnd).format("YYYY-MM-DD");

      setStartDate(new Date(defaultStart));
      setEndDate(new Date(defaultEnd));
    }
  }, [defaultDates]);

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

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);

    request({});
  };

  const formatDate = (value: Date) => {
    if (!value) return "";

    let date = new Date(value).toISOString();

    date = date.split("T")[0];

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
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
      {startDate && endDate ? (
        <Flex
          alignItems={"center"}
          gap="0.5rem"
          boxShadow={"0 0 4px lightgray"}
          padding="2px 5px"
          borderRadius={"5px"}
          height={"20px"}
        >
          <Flex
            alignItems={"center"}
            css={{ p: { marginBottom: "unset" } }}
            gap="0.5rem"
          >
            <Text>{`${formatDate(startDate)}`}</Text>
            <Text>-</Text>
            <Text>{`${formatDate(endDate)}`}</Text>
          </Flex>
          <Button
            onClick={handleClear}
            border="none"
            borderRadius={"100%"}
            minW={"unset"}
            padding={"3px"}
            w="1.3rem"
            h="1.3rem"
            background={colors.yellow}
            _hover={{
              background: "lightgray",
            }}
          >
            <IoMdClose />
          </Button>
        </Flex>
      ) : (
        <Flex height={"20px"}></Flex>
      )}

      <button onClick={() => setShow(true)}>
        <BsCalendar3 />
      </button>
      {show && (
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
