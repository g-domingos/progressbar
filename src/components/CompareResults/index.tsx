import Select from "react-select";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { DatePickerComponent } from "../DatePickerComponent";
import colors from "../../styles/colors";
import { useQueryString } from "../../utils/queryString";
import { useTask } from "../../hooks/useTask";
import { useParams, useSearchParams } from "react-router-dom";

const FIRST_INTERVAL_QUERY_NAME = "firstDate";
const SECOND_INTERVAL_QUERY_NAME = "secondDate";

export const CompareResults = () => {
  const params = useParams();
  const [shouldCompare, setShouldCompare] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();

  const { queryParams } = useQueryString();

  const { fetch, taskInfo } = useTask();

  useEffect(() => {
    const queryParamsKeys = Object.keys(queryParams);

    const hasFirstIntervalQueryParam = queryParamsKeys.filter((item: string) =>
      item.includes(FIRST_INTERVAL_QUERY_NAME)
    ).length;

    const hasSecondIntervalQueryParam = queryParamsKeys.filter((item: string) =>
      item.includes(SECOND_INTERVAL_QUERY_NAME)
    ).length;

    const hasCnpjId = !!queryParams.cnpjId;

    if (
      hasFirstIntervalQueryParam &&
      hasSecondIntervalQueryParam &&
      hasCnpjId
    ) {
      setShouldCompare(true);
    } else {
      setShouldCompare(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetch(params?.id || "");
  }, []);

  const cnpjsOptions = useMemo(() => {
    if (taskInfo?.length) {
      const formatedForSelect = taskInfo.map((item: any) => {
        return {
          value: item.id,
          label: item.document,
        };
      });

      return formatedForSelect;
    }

    return [];
  }, [taskInfo]);

  const handleSelectCnpj = (
    option: {
      label: string;
      value: string | number;
    } | null
  ) => {
    if (option) {
      setSearchParams({ ...queryParams, cnpjId: option.value.toString() });
    } else {
      delete queryParams.cnpjId;

      setSearchParams(queryParams);
    }
  };

  const styles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      // Customize the overall container
      width: "240px", // Adjust width as needed
      borderRadius: "8px",
      backgroundColor: "#fff",
      borderColor: "#ccc",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      height: "2.5rem",
      "&:hover": {
        borderColor: "#999",
      },
      border: "none",
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      // Customize individual options
      padding: "10px 15px",
      backgroundColor: state.isSelected ? "#f0f8ff" : "#fff",
      color: state.isSelected ? "#007bff" : "#333",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f0f8ff",
      },
    }),

    menu: (baseStyles: any) => ({
      ...baseStyles,
      // Customize the dropdown menu
      width: "250px", // Match the control width
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 100,
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "24px",
      },
    }),

    // Customize other elements as needed:
    // singleValue, placeholder, multiValue, dropdownIndicator, etc.
  };

  return (
    <Flex
      w={"60rem"}
      height={"30rem"}
      flexDirection={"column"}
    >
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex
          mb="1rem"
          flexDirection={"column"}
        >
          <Text mb="6px">Selecione um CNPJ para comparar</Text>
          <Select
            options={cnpjsOptions}
            styles={styles}
            isClearable
            placeholder="Selecionar"
            onChange={handleSelectCnpj}
          />
        </Flex>
        <Button
          bg={shouldCompare ? colors.yellow : "lightgray"}
          disabled={!shouldCompare}
        >
          Comparar
        </Button>{" "}
      </Flex>
      <Flex w="100%">
        <Flex
          w="100%"
          css={{ "& > div": { width: "50%" } }}
        >
          <Flex
            justifyContent={"flex-start"}
            flexDirection={"column"}
          >
            <Text mb="6px">Selecione o período inicial</Text>
            <DatePickerComponent
              request={() => {}}
              queryName={FIRST_INTERVAL_QUERY_NAME}
            />
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"flex-start"}
          >
            <Text mb="6px">Selecione o período final</Text>
            <DatePickerComponent
              request={() => {}}
              queryName={SECOND_INTERVAL_QUERY_NAME}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
