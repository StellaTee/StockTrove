import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";

interface Props {
  // handleDeleteFollow: (email: string, symbol: string) => void;
  email: string;
  symbol: string;
  handleFollowCompany: (symbol: string) => void; // Adjust the type to accept a function with no parameters
}

const FollowedMenuButton = ({ symbol, handleFollowCompany }: Props) => {
  const handleOptionSelect = (option: string) => {
    if (option === "Unfollow") {
      // handleDeleteFollow(email, symbol);
      handleFollowCompany(symbol); // Call handleFollowCompany when "Unfollow" is selected
    } else {
      console.log("Option not implemented");
    }
  };

  return (
    <Menu>
      <MenuButton as="button">Followed</MenuButton>
      <MenuList>
        {/* HAVENT IMPLEMENTED  */}
        <MenuItem onClick={() => handleOptionSelect("Notification On")}>
          Notification On
        </MenuItem>
        <MenuItem onClick={() => handleOptionSelect("Notification Off")}>
          Notification Off
        </MenuItem>
        <MenuItem onClick={() => handleOptionSelect("Unfollow")}>
          Unfollow
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FollowedMenuButton;


