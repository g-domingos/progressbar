import { Text, Flex, RadioGroup, Stack, Radio, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface IRadioInput {
  options: any[];
  name: string;
  title: string;
  subtitle?: string;
  defaultValue?: number | null | string;
}

export const RadioInput = ({
  subtitle,
  title,
  name,
  defaultValue = null,
  options,
}: IRadioInput) => {
  const {
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext();

  const [radioValue, setRadioValue] = useState<any>();

  useEffect(() => {
    if (getValues(name)) {
      setRadioValue(getValues(name));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(name)]);

  useEffect(() => {
    if (defaultValue && !getValues(name)) {
      setRadioValue(defaultValue);
      setValue(name, defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string) => {
    setRadioValue(value);
    setValue(name, value);

    if (errors[name]) {
      clearErrors(name);
    }
  };

  return (
    <Flex flexDirection={"column"} gap="2px">
      <Flex>
        <Text
          marginBottom={"unset"}
          borderBottom={
            errors[name] ? "2px solid red" : "2px solid transparent"
          }
        >
          {title}
        </Text>
      </Flex>

      {subtitle && <Text>{subtitle}</Text>}

      <RadioGroup
        value={radioValue}
        onChange={handleChange}
        sx={{
          span: { fontSize: "13px" },
          div: { label: { marginTop: "0.1rem" } },
        }}
      >
        <Stack>
          {options.map(
            (option: { label: string; value: any }, index: number) => (
              <Radio
                fontSize={12}
                key={index}
                value={option?.value}
                border={"2px solid lightgray"}
              >
                {option.label}
              </Radio>
            )
          )}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};
