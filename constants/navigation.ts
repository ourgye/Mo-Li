import { Href } from "expo-router";

export type navigationType = {
  _id: number;
  name: string;
  path?: Href;
  nameKo?: string;
  children?: navigationType[];
};

const naviList: navigationType[] = [
  {
    _id: 1000,
    name: "(tabs)",
    children: [
      {
        _id: 1100,
        name: "(home)",
        children: [
          { _id: 1110, name: "index", path: "/(tabs)/(home)" },
          {
            _id: 1120,
            name: "archive-manage",
            path: "/(tabs)/(home)/archive-manage",
          },
        ],
      },
      {
        _id: 1200,
        name: "(archive)",
        children: [
          { _id: 1210, name: "archive", path: "/(tabs)/(archive)/archive" },
          {
            _id: 1220,
            name: "record-detail/[id]",
            path: "/(tabs)/(archive)/record-detail/[id]",
          },
        ],
      },
      {
        _id: 1300,
        name: "(setting)",
        children: [
          {
            _id: 1310,
            name: "setting",
            path: "/(tabs)/(setting)/setting",
            nameKo: "설정",
          },
          {
            _id: 1320,
            name: "archive-manage",
            path: "/(tabs)/(setting)/archive-manage",
            nameKo: "아카이브 관리",
          },
          {
            _id: 1330,
            name: "help",
            path: "/(tabs)/(setting)/help",
            nameKo: "도움말",
          },
          {
            _id: 1340,
            name: "backup-file",
            path: "/(tabs)/(setting)/backup-file",
            nameKo: "백업 파일 관리",
          },
          {
            _id: 1350,
            name: "open-source",
            path: "/(tabs)/(setting)/open-source",
            nameKo: "오픈 소스",
          },
          {
            _id: 1360,
            name: "privacy-policy",
            path: "/(tabs)/(setting)/privacy-policy",
            nameKo: "개인정보 처리방침",
          },
          {
            _id: 1370,
            name: "contact-us",
            path: "/(tabs)/(setting)/contact-us",
            nameKo: "문의하기",
          },
          {
            _id: 1380,
            name: "app-metainfo",
            path: "/(tabs)/(setting)/app-metainfo",
            nameKo: "어플리케이션 정보",
          },
          {
            _id: 1390,
            name: "theme",
            path: "/(tabs)/(setting)/theme",
            nameKo: "테마",
          },
        ],
      },
    ],
  },
  {
    _id: 2000,
    name: "create-record",
    path: "/create-record",
    nameKo: "레코드 생성",
  },
  {
    _id: 3000,
    name: "select-archive",
    path: "/select-archive",
    nameKo: "아카이브 선택",
  },
  {
    _id: 4000,
    name: "modify-record/[id]",
    path: "/modify-record/[id]",
    nameKo: "레코드 수정",
  },
];

export default naviList;
