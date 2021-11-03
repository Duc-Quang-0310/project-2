import { getDateAndTime } from "../../Helper/getDate";
import { randomID, randomNumb, randomStatus } from "../../Helper/randomStr";

export interface iFakeData {
  number: number;
  dataID: string;
  employeeID: string;
  numberOfProducts: number;
  status: "done" | "pending" | "cancel";
  time: string;
}

const orderData: iFakeData[] = [];

for (let i = 1; i <= 20; i++) {
  orderData.push({
    number: i,
    dataID: randomID(5),
    employeeID: randomNumb(4),
    numberOfProducts: 1,
    status: randomStatus(),
    time: getDateAndTime(new Date()),
  });
}

export default orderData;
