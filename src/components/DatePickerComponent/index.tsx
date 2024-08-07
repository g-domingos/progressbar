import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { Container, DateContainer } from "./styles";
import { useEffect, useRef, useState } from "react";
import pt from "date-fns/locale/pt-BR";
import { BsCalendar3 } from "react-icons/bs";
import { Text, Button, Flex, Tooltip } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import colors from "../../styles/theme";

import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useQueryString } from "../../utils/queryString";
registerLocale("pt-BR", pt);

interface IDatePickerComponent {
  request: (values: any) => void;
  defaultDates?: { minDate: number; maxDate: number };
  hideClearButton?: boolean;
  queryName?: string;
  filters?: any[];
}

export const DatePickerComponent = ({
  request,
  defaultDates,
  hideClearButton,
  queryName,
  filters = [],
}: IDatePickerComponent) => {
  const [show, setShow] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { queryParams } = useQueryString();

  useEffect(() => {
    if (defaultDates) {
      const start = new Date(defaultDates.minDate);
      const end = new Date(defaultDates.maxDate);

      setStartDate(start);
      setEndDate(end);
    }
  }, [defaultDates]);

  const onChange = (dates: any) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);

    if (queryName && start && end) {
      const startDate = new Date(start).getTime().toString();
      const endDate = new Date(end).getTime().toString();

      setSearchParams({
        ...queryParams,
        [queryName + "Start"]: startDate,
        [queryName + "End"]: endDate,
      });
    }
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

    if (queryName) {
      delete queryParams[queryName + "Start"];
      delete queryParams[queryName + "End"];
      setSearchParams(queryParams);
    }

    request({ situacaosId: filters || [] });
  };

  const formatDate = (value: Date) => {
    if (!value) return "";

    const epoch = new Date(value).getTime() - 3 * 60 * 60 * 1000;

    let date = new Date(epoch).toISOString();

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
        situacaosId: filters || [],
      });
    }
  }, [endDate, filters?.length]);

  return (
    <Container ref={ref}>
      <button onClick={() => setShow(true)}>
        <BsCalendar3 />
      </button>
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
          {!hideClearButton && (
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
          )}
        </Flex>
      ) : (
        <Flex height={"20px"}></Flex>
      )}

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
