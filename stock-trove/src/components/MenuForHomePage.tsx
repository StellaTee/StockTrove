import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuGroup,
} from "@chakra-ui/react";
import useArticleQueryStore from "../stores/useArticleQueryStore";
import { useEffect, useState } from "react";

const MenuForHomePage = () => {
  const setDataFrom = useArticleQueryStore((s) => s.setDataFrom);
  const [heading, setHeading] = useState("");

  const today = new Date();

  // Handle the selected timeframe

  function onSelectTimeframe(value: string) {
    let fromDate: Date;

    switch (value) {
      case "year":
        fromDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate(),
        );
        setHeading("Last Year");
        break;
      case "month":
        fromDate = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate(),
        );
        setHeading("Last Month");
        break;
      case "week":
        fromDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7,
        );
        setHeading("Last Week");
        break;
      case "yesterday":
        fromDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1,
        );
        setHeading("Yesterday");
        break;
      default:
        fromDate = today;
    }

    const formattedDate = `${fromDate.getFullYear()}-${(fromDate.getMonth() + 1).toString().padStart(2, "0")}-${fromDate.getDate().toString().padStart(2, "0")}`;

    setDataFrom(formattedDate);
  }

  const handleTimeframeChange = (value: string) => {
    onSelectTimeframe(value); // Pass the selected value to the parent component
  };

  useEffect(() => {
    handleTimeframeChange("week");
  }, []);

  return (
    <Menu>
      <MenuButton as="button">{heading}</MenuButton>
      <MenuList>
        <MenuGroup title="Sort by ">
          <MenuItemOption
            value="year"
            onClick={() => handleTimeframeChange("year")}
          >
            Last Year
          </MenuItemOption>
          <MenuItemOption
            value="month"
            onClick={() => handleTimeframeChange("month")}
          >
            Last Month
          </MenuItemOption>
          <MenuItemOption
            value="week"
            onClick={() => handleTimeframeChange("week")}
          >
            Last Week
          </MenuItemOption>
          <MenuItemOption
            value="yesterday"
            onClick={() => handleTimeframeChange("yesterday")}
          >
            Yesterday
          </MenuItemOption>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
export default MenuForHomePage;
