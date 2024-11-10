import {
  homeNewRecordAction,
  newRecordArchiveSelector,
  homeNewRecordSelector,
  createNewRecordThunk,
} from "@/slices/home/homeNewRecordSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { RecordType } from "@/constants/types.interface";
import { nanoid } from "nanoid";
import { ImagePickerResult, ImagePickerSuccessResult } from "expo-image-picker";
import { saveImage2File } from "@/utils/saveImage2File";
import { useCallback, useMemo } from "react";

export function useHomeNewRecord() {
  const dispatch = useAppDispatch();
  const newRecord_s = useAppSelector(homeNewRecordSelector.selectRecord);
  const [
    newRecordDate_s,
    newRecordImage_s,
    newRecordBody_s,
    newRecordArchive_s,
  ] = [
    useAppSelector(homeNewRecordSelector.selectRecordDate),
    useAppSelector(homeNewRecordSelector.selectRecordImage),
    useAppSelector(homeNewRecordSelector.selectRecordBody),
    useAppSelector(newRecordArchiveSelector),
  ];
  const recordIsThereNew_s = useAppSelector(
    homeNewRecordSelector.selectIsThereNewRecord,
  );

  const [
    newRecord,
    newRecordDate,
    newRecordImage,
    newRecordBody,
    newRecordArchive,
    recordIsThereNew,
  ] = useMemo(
    () => [
      newRecord_s,
      newRecordDate_s,
      newRecordImage_s,
      newRecordBody_s,
      newRecordArchive_s,
      recordIsThereNew_s,
    ],
    [
      newRecord_s,
      newRecordDate_s,
      newRecordImage_s,
      newRecordBody_s,
      newRecordArchive_s,
      recordIsThereNew_s,
    ],
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
  const setRecordIsThereNew = useCallback((isThere: boolean) => {
    dispatch(homeNewRecordAction.setIsThereNewRecord(isThere));
  }, []);

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
    setRecordIsThereNew(true);
    // dispatch(homeNewRecordAction.resetRecord());
  };

  return {
    newRecord,
    newRecordDate,
    newRecordImage,
    newRecordBody,
    newRecordArchive,
    recordIsThereNew,
    setRecordDate,
    setRecordImage,
    setRecordBody,
    setRecordArchive,
    setRecordIsThereNew,
    handleCreateNewRecordHome,
  };
}
