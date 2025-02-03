import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useFollowingCompanyQueryStore from "../stores/useFollowingCompanyQueryStore";
import { Company } from "../entities/Company";
import { followCompany, unfollowCompany } from "../servicies/DatabaseAPIClient";
import useAuthUserStore from "../stores/useAuthUser";
import { getCompanySymbol } from "../util/util";

interface Props {
  company: Company;
}

const FollowCompanyButton = ({ company }: Props) => {
  const { symbols, addSymbol, removeSymbol } = useFollowingCompanyQueryStore();
  const [heading, setHeading] = useState("");
  console.log(company);
  const symbol = getCompanySymbol(company);
  const { authUser } = useAuthUserStore();
  const email = authUser.email;

  useEffect(() => {
    // Use hasOwnProperty to check if symbol exists in symbols object
    if (symbols.includes(symbol)) {
      setHeading("Unfollow");
    } else {
      setHeading("Follow");
    }
  }, []); // Ensure useEffect re-runs when symbol or symbols change

  const handleAddFollow = async (email: string, company: Company) => {
    try {
      const response = await followCompany({
        email: email,
        companyname: company.name,
        companydescription: company.description,
        symbol: symbol,
        logourl: company.logo,
        employeecount: company.fullTimeEmployees,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteFollow = async (email: string, symbol: string) => {
    try {
      const response = await unfollowCompany({
        email: email,
        symbol: symbol,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleFollowCompany = (symbol: string) => {
    if (symbols.includes(symbol)) {
      handleDeleteFollow(email, symbol);
      removeSymbol(symbol);
      setHeading("Follow");
    } else {
      handleAddFollow(email, company);
      addSymbol(symbol);
      setHeading("Unfollow");
    }
  };

  return <Button onClick={() => handleFollowCompany(symbol)}>{heading}</Button>;
};

export default FollowCompanyButton;
