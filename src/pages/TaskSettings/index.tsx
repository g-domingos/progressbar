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
import { GeneralInfoTask } from "../GeneralInfoTask";
import { RoundButton } from "../../components/RoundButton";
import { useNavigate } from "react-router-dom";
import { IoMdOpen } from "react-icons/io";

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

  const handleOpenDash = () => {
    window.open("/clients/dashboard/" + params.id, "_blank");
  };

  return (
    <GenericPage
      title={"Configurações | " + (task?.name || "")}
      processing={processing}
      action={<RoundButton handleClick={handleOpenDash} icon={<IoMdOpen />} />}
    >
      <Flex w={"100%"}>
        <Flex w="100%">
          <Tabs position="relative" w={"100%"}>
            <TabList>
              <Tab color="black">Geral</Tab>
              <Tab color="black">Usuários</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg={colors.yellow}
              borderRadius="1px"
            />
            <TabPanels w={"100%"} height={"95%"}>
              <TabPanel width={"100%"} height={"100%"}>
                <GeneralInfoTask />
              </TabPanel>
              <TabPanel width={"100%"}>
                <Users />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </GenericPage>
  );
};
