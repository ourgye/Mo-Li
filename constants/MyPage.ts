import { MyPageListType } from "./types.interface";

const myPageList: MyPageListType[] = [
  { _id: 0, name: "아카이브 관리", path: "/(setting)/archive-manage" },
  { _id: 1, name: "알림", path: "/(setting)/notification" },
  { _id: 2, name: "도움말", path: "/(setting)/help" },
  { _id: 3, name: "첫 화면 설정", path: "/(setting)/first-launch" },
];

export default myPageList;
