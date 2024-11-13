import {
  archiveNewRecordAction,
  newRecordArchiveSelector,
  archiveNewRecordSelector,
  createNewRecordThunk,
} from "@/slices/archive/archiveNewRecordSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { RecordType } from "@/constants/types.interface";
import { nanoid } from "nanoid";
import { ImagePickerResult, ImagePickerSuccessResult } from "expo-image-picker";
import { saveImage2File } from "@/utils/saveImage2File";
import { useCallback, useMemo } from "react";

export function useArchiveNewRecord() {
  const dispatch = useAppDispatch();
  const newRecord_s = useAppSelector(archiveNewRecordSelector.selectRecord);
  const [
    newRecordDate_s,
    newRecordImage_s,
    newRecordBody_s,
    newRecordArchive_s,
  ] = [
    useAppSelector(archiveNewRecordSelector.selectRecordDate),
    useAppSelector(archiveNewRecordSelector.selectRecordImage),
    useAppSelector(archiveNewRecordSelector.selectRecordBody),
    useAppSelector(newRecordArchiveSelector),
  ];
  const recordIsThereNew_s = useAppSelector(
    archiveNewRecordSelector.selectIsThereNewRecord,
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
    dispatch(archiveNewRecordAction.setRecordDate(date));
  };
  const setRecordImage = useCallback((image: ImagePickerResult) => {
    dispatch(archiveNewRecordAction.setRecordImage(image));
  }, []);
  const setRecordBody = useCallback((body: string) => {
    dispatch(archiveNewRecordAction.setRecordBody(body));
  }, []);
  const setRecordArchive = (archive: { id: string; name: string }) => {
    dispatch(archiveNewRecordAction.setRecordArchive(archive));
  };
  const setRecordIsThereNew = useCallback((isThere: boolean) => {
    dispatch(archiveNewRecordAction.setIsThereNewRecord(isThere));
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
    // dispatch(archiveNewRecordAction.resetRecord());
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
