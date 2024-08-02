const truncate = (text: string, length: number) =>
  `${text?.substring(0, length)}  ... `;

export default truncate;
