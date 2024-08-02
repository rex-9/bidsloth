const currencies: {
  code: string;
  name: string;
  label: string;
  symbol: string;
}[] = [
  {
    code: "USD",
    name: "United States Dollar",
    label: "$ USD - United States Dollar",
    symbol: "$",
  },
  {
    code: "EUR",
    name: "Euro",
    label: "€ EUR - Euro",
    symbol: "€",
  },
  {
    code: "GBP",
    name: "British Pound",
    label: "£ GBP - British Pound",
    symbol: "£",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    label: "C$ CAD - Canadian Dollar",
    symbol: "C$",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    label: "A$ AUD - Australian Dollar",
    symbol: "A$",
  },
  {
    code: "DKK",
    name: "Danish Krone",
    label: "kr DKK - Danish Krone",
    symbol: "kr",
  },
  {
    code: "NOK",
    name: "Norwegian Krone",
    label: "kr NOK - Norwegian Krone",
    symbol: "kr",
  },
  {
    code: "SEK",
    name: "Swedish Krona",
    label: "kr SEK - Swedish Krona",
    symbol: "kr",
  },
  {
    code: "HKD",
    name: "Hong Kong Dollar",
    label: "HK$ HKD - Hong Kong Dollar",
    symbol: "HK$",
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    label: "S$ SGD - Singapore Dollar",
    symbol: "S$",
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    label: "NZ$ NZD - New Zealand Dollar",
    symbol: "NZ$",
  },
  {
    code: "CZK",
    name: "Czech Koruna",
    label: "Kč CZK - Czech Koruna",
    symbol: "Kč",
  },
  {
    code: "HUF",
    name: "Hungarian Forint",
    label: "Ft HUF - Hungarian Forint",
    symbol: "Ft",
  },
  {
    code: "PLN",
    name: "Polish Złoty",
    label: "zł PLN - Polish Złoty",
    symbol: "zł",
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    label: "$ MXN - Mexican Peso",
    symbol: "$",
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    label: "R$ BRL - Brazilian Real",
    symbol: "R$",
  },
];

export default currencies;
