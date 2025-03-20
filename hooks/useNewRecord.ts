import {
  newRecordAction,
  newRecordArchiveSelector,
  newRecordSelector,
  createNewRecordThunk,
} from "@/slices/home/newRecordSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { RecordType } from "@/constants/types.interface";
import { nanoid } from "nanoid";
import { ImagePickerResult, ImagePickerSuccessResult } from "expo-image-picker";
import { saveImage2File } from "@/utils/saveImage2File";
import { useCallback, useMemo } from "react";

export function useNewRecord() {
  const dispatch = useAppDispatch();
  const newRecord_s = useAppSelector(newRecordSelector.selectRecord);
  const [
    newRecordDate_s,
    newRecordImage_s,
    newRecordBody_s,
    newRecordArchive_s,
    newRecordImageRatio_s,
  ] = [
    useAppSelector(newRecordSelector.selectRecordDate),
    useAppSelector(newRecordSelector.selectRecordImage),
    useAppSelector(newRecordSelector.selectRecordBody),
    useAppSelector(newRecordArchiveSelector),
    useAppSelector(newRecordSelector.selectImageRatio),
  ];
  const recordIsThereNew_s = useAppSelector(
    newRecordSelector.selectIsThereNewRecord,
  );

  const [
    newRecord,
    newRecordDate,
    newRecordImage,
    newRecordBody,
    newRecordArchive,
    newRecordImageRatio,
    recordIsThereNew,
  ] = useMemo(
    () => [
      newRecord_s,
      newRecordDate_s,
      newRecordImage_s,
      newRecordBody_s,
      newRecordArchive_s,
      newRecordImageRatio_s,
      recordIsThereNew_s,
    ],
    [
      newRecord_s,
      newRecordDate_s,
      newRecordImage_s,
      newRecordBody_s,
      newRecordArchive_s,
      newRecordImageRatio_s,
      recordIsThereNew_s,
    ],
  );

  const setRecordDate = (date: string) => {
    dispatch(newRecordAction.setRecordDate(date));
  };
  const setRecordImage = useCallback((image: ImagePickerResult) => {
    dispatch(newRecordAction.setRecordImage(image));
  }, []);
  const setRecordBody = useCallback((body: string) => {
    dispatch(newRecordAction.setRecordBody(body));
  }, []);
  const setRecordArchive = (archive: { id: string; name: string }) => {
    dispatch(newRecordAction.setRecordArchive(archive));
  };
  const setRecordIsThereNew = useCallback((isThere: boolean) => {
    dispatch(newRecordAction.setIsThereNewRecord(isThere));
  }, []);
  const setImageRatio = useCallback((ratio: number) => {
    dispatch(newRecordAction.setImageRatio(ratio));
  }, []);

  const handleCreateNewRecordHome = async () => {
    if (!newRecordArchive.id && !newRecordArchive.name) {
      throw new Error("아카이브를 선택해주세요.");
    }
    // 이미지 파일로 저장
    const id = nanoid();
    const imagePath = await saveImage2File(newRecordImage, id);

    const newRecord: RecordType = {
      _id: id,
      date: newRecordDate,
      imagePath: imagePath,
      body: newRecordBody,
      archiveId: newRecordArchive.id as string,
      imageRatio: newRecordImageRatio,
    };
    dispatch(createNewRecordThunk.createNewRecord(newRecord));
    dispatch(newRecordAction.resetRecord());
  };

  return {
    newRecord,
    newRecordDate,
    newRecordImage,
    newRecordBody,
    newRecordArchive,
    newRecordImageRatio,
    recordIsThereNew,
    setRecordDate,
    setRecordImage,
    setRecordBody,
    setRecordArchive,
    setRecordIsThereNew,
    setImageRatio,
    handleCreateNewRecordHome,
  };
}
