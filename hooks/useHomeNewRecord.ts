import {
  homeNewRecordAction,
  homeNewRecordSelector,
  createNewRecordThunk,
} from "@/slices/home/homeNewRecordSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { RecordType } from "@/constants/types.interface";
import { nanoid } from "nanoid";
import { ImagePickerResult, ImagePickerSuccessResult } from "expo-image-picker";
import { saveImage2File } from "@/utils/saveImage2File";
import { useCallback, useMemo } from "react";

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
  const setRecordImage = useCallback((image: ImagePickerResult) => {
    dispatch(homeNewRecordAction.setRecordImage(image));
  }, []);
  const setRecordBody = useCallback((body: string) => {
    dispatch(homeNewRecordAction.setRecordBody(body));
  }, []);
  const setRecordArchive = (archive: { id: string; name: string }) => {
    dispatch(homeNewRecordAction.setRecordArchive(archive));
  };

  const handleCreateNewRecordHome = async () => {
    // 이미지 파일로 저장
    const id = nanoid();
    const imagePath = await saveImage2File(newRecordImage, id);

    if (!newRecordArchive.id && !newRecordArchive.name) {
      alert("No archive selected");
      return;
    }

    const newRecord: RecordType = {
      _id: id,
      date: newRecordDate,
      imagePath: imagePath,
      body: newRecordBody,
      archiveId: newRecordArchive.id as string,
      archiveName: newRecordArchive.name as string,
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
    handleCreateNewRecordHome,
  };
}
