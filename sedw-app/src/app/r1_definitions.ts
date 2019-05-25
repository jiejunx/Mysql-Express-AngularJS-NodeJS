  /** GET top 100 manufacturers from server */
export class TopManufacturer {
    MfgrName: string;
    Total_Pid: string;
    Average_Price:string;
    Max_Price: string;
}

  /** GET drill down detail summary for a  manufacturer from server */
export class MfgrSummaryDD {
    MfgrName: string;
    Total_Pid: string;
    Average_Price: string;
    Min_Price: string;
    Max_Price: string;
    MaxDiscount: string;
}
  /** GET product list for a manufacturer from server */

export class MfgrProductListDD {
    MfgrName: string;
    PID: string;
    ProductName: string;
    CatNames: string;
    RetailPrice: string;
}

