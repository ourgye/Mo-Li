import {
  homeNewRecordAction,
  homeNewRecordSelector,
  createNewRecordThunk,
} from "@/slices/home/homeNewRecordSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { RecordType } from "@/constants/types.interface";
import { nanoid } from "nanoid";
import { ImagePickerResult, ImagePickerSuccessResult } from "expo-image-picker";

interface NewRecordType {
  date: string;
  image: ImagePickerSuccessResult;
  body: string;
  archiveId: string;
  archiveName: string;
}

export function useHomeNewRecord() {
  const dispatch = useAppDispatch();
  const newRecord = useAppSelector(homeNewRecordSelector.selectRecord);
  const newRecordDate = useAppSelector(homeNewRecordSelector.selectRecordDate);
  const newRecordImage = useAppSelector(
    homeNewRecordSelector.selectRecordImage,
  );
  const newRecordBody = useAppSelector(homeNewRecordSelector.selectRecordBody);
  const newRecordArchive = useAppSelector(
    homeNewRecordSelector.selectRecordArchive,
  );

  const setRecordDate = (date: string) => {
    dispatch(homeNewRecordAction.setRecordDate(date));
  };
  const setRecordImage = (image: string) => {
    dispatch(homeNewRecordAction.setRecordImage(image));
  };
  const setRecordBody = (body: string) => {
    dispatch(homeNewRecordAction.setRecordBody(body));
  };
  const setRecordArchive = (archive: { id: string; name: string }) => {
    dispatch(homeNewRecordAction.setRecordArchive(archive));
  };

  const handleCreateNewRecord = ({ data }: { data: NewRecordType }) => {
    const newRecord: RecordType = {
      _id: nanoid(),
      date: data.date,
      imagePath: data.image.assets[0].uri,
      body: data.body,
      archiveId: data.archiveId,
      archiveName: data.archiveName,
    };
    dispatch(createNewRecordThunk.createNewRecord(newRecord));
  };

  return {
    newRecord,
    newRecordDate,
    newRecordImage,
    newRecordBody,
    newRecordArchive,
    setRecordDate,
    setRecordImage,
    setRecordBody,
    setRecordArchive,
    handleCreateNewRecord,
  };
}
