// 音乐详情
export interface MusicDetail {
  a: null;
  al: {
    id: number;
    name: string;
    pic: number;
    picUrl: string;
    pic_str: string;
    tns: any[];
  };
  alia: string[];
  ar: { alias: any[]; id: number; name: string; tns: any[] }[];
  cd: string;
  cf: string;
  copyright: number;
  cp: number;
  crbt: null;
  djId: number;
  dt: number;
  fee: number;
  ftype: number;
  h: object;
  id: number;
  l: object;
  m: object;
  mark: number;
  mst: number;
  mv: number;
  name: string;
  no: number;
  noCopyrightRcmd: null;
  originCoverType: number;
  originSongSimpleData: null;
  pop: number;
  privilege: {
    chargeInfoList: {
      rate: number;
      chargeUrl: null;
      chargeMessage: null;
      chargeType: number;
    }[];
    cp: number;
    cs: boolean;
    dl: number;
    downloadMaxbr: number;
    fee: number;
    fl: number;
    flag: number;
    freeTrialPrivilege: { resConsumable: boolean; userConsumable: boolean };
    id: number;
    maxbr: number;
    payed: number;
    pl: number;
    playMaxbr: number;
    preSell: boolean;
    rscl: null;
    sp: number;
    st: number;
    subp: number;
    toast: boolean;
  };
  pst: number;
  publishTime: number;
  resourceState: boolean;
  rt: string;
  rtUrl: null;
  rtUrls: any[];
  rtype: number;
  rurl: null;
  s_id: number;
  single: number;
  st: number;
  t: number;
  v: number;
  playable?: boolean;
  reason?: string;
}

export interface MusicListData {
  title: string;
  tip: string;
  bg: string;
  list: MusicDetail[] | [];
}
