export class Statistics {
    count_store: number;
    count_pid: number;
    count_mfgr: number;
    count_manager: number;
}


export interface StatTile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    endVal: number;
  
  }
  
  export interface ActionTile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    icon: string;
    link: string;
  }
  
  export interface ReportTile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    icon: string;
    link: string;
  }
  
  
