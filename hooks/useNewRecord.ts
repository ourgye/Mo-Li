import { recordSelector, recordAction } from "@/slices/recordSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { RecordType } from "@/constants/types.interface";
import { ImagePickerResult, ImagePickerSuccessResult } from "expo-image-picker";
import { saveImage2File } from "@/utils/saveImage2File";
import { useCallback, useMemo } from "react";
import Archive from "@/db/schema/archive";

export function useNewRecord() {
  const dispatch = useAppDispatch();
  const [
    newRecord,
    newRecordDate,
    newRecordArchive,
    newRecordImage,
    newRecordBody,
    newRecordImageRatio,
  ] = [
    useAppSelector(recordSelector.selectRecord),
    useAppSelector(recordSelector.selectRecordDate),
    useAppSelector(recordSelector.selectArchive),
    useAppSelector(recordSelector.selectRecordImage),
    useAppSelector(recordSelector.selectRecordBody),
    useAppSelector(recordSelector.selectImageRatio),
  ];

  const setRecordDate = (date: Date) => {
    dispatch(recordAction.setRecordDate(date));
  };
  const setRecordImage = useCallback((image: ImagePickerResult) => {
    dispatch(recordAction.setRecordImage(image));
  }, []);
  const setRecordBody = useCallback((body: string) => {
    dispatch(recordAction.setRecordBody(body));
  }, []);
  const setRecordArchive = (archive: Archive) => {
    dispatch(recordAction.setArchive(archive));
  };
  const setImageRatio = useCallback((ratio: number) => {
    dispatch(recordAction.setImageRatio(ratio));
  }, []);
  const setInitiailState = useCallback(() => {
    dispatch(recordAction.resetRecord());
  }, []);

  return {
    newRecord,
    newRecordDate,
    newRecordImage,
    newRecordArchive,
    newRecordBody,
    newRecordImageRatio,
    setRecordDate,
    setRecordImage,
    setRecordBody,
    setRecordArchive,
    setImageRatio,
    setInitiailState,
  };
}
