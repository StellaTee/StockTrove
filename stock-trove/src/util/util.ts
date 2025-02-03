import { Company } from "../entities/Company";

//returns company's NASDAQ symbol   
export const getCompanySymbol = (company: Company | undefined) => {
    let companySymbol = "";
    if (company?.symbols) {
        for (let i = 0; i < company?.symbols.length; i++) {
            if (company?.symbols[i].exchangeShortName == "NASDAQ") {
                companySymbol = company?.symbols[i].symbol;
            }
        }
    }
    return companySymbol;
}
