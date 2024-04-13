import { GenericPage } from "../../components/GenericPage";
import { Flex } from "@chakra-ui/layout";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { colors } from "../../styles/theme";
import { Users } from "../Users";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export const TaskSettings = () => {
  const params = useParams();

  const [task, setTask] = useState<any>({});

  const { request, processing } = useApi({
    path: `/task/${params.id}/details`,
  });

  const fetchTask = () => {
    request({ method: "get" }).then((response) => {
      setTask(response);
    });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <GenericPage
      title={"Configurações | " + (task?.name || "")}
      processing={processing}
    >
      <Flex w={"100%"}>
        <Flex w="100%">
          <Tabs position="relative" w={"100%"}>
            <TabList>
              <Tab color="black">Usuários</Tab>
              {/* <Tab>Two</Tab>
              <Tab>Three</Tab> */}
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg={colors.yellow}
              borderRadius="1px"
            />
            <TabPanels w={"100%"}>
              <TabPanel width={"100%"}>
                <Users />
              </TabPanel>
              {/* <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </GenericPage>
  );
};
