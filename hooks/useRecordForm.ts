import { recordSelector, recordAction } from "@/slices/recordSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
// import { ImagePickerAsset } from "expo-image-picker";
import { useCallback, useMemo } from "react";
import Archive from "@/db/schema/archive";
import Record from "@/db/schema/record";

export function useRecordForm() {
  const dispatch = useAppDispatch();
  const [
    recordWhole,
    recordDate,
    recordArchive,
    // recordImage,
    recordBody,
    recordImageRatio,
    recordImagePath,
  ] = [
    useAppSelector(recordSelector.selectRecord),
    useAppSelector(recordSelector.selectRecordDate),
    useAppSelector(recordSelector.selectArchive),
    // useAppSelector(recordSelector.selectRecordImage),
    useAppSelector(recordSelector.selectRecordBody),
    useAppSelector(recordSelector.selectImageRatio),
    useAppSelector(recordSelector.selectRecordImagePath),
  ];

  const setRecordDate = (date: Date) => {
    dispatch(recordAction.setRecordDate(date));
  };
  // const setRecordImage = useCallback((image: ImagePickerAsset[]) => {
  //   dispatch(recordAction.setRecordImage(image));
  // }, []);
  const setRecordImagePath = (imagePath: string[]) => {
    dispatch(recordAction.setImagePath(imagePath));
  };
  const setRecordBody = useCallback((body: string) => {
    dispatch(recordAction.setRecordBody(body));
  }, []);
  const setRecordArchive = (archive: Archive) => {
    dispatch(recordAction.setArchive(archive));
  };
  const setImageRatio = useCallback((ratio: number[]) => {
    dispatch(recordAction.setImageRatio(ratio));
  }, []);
  const setInitiailState = useCallback(() => {
    dispatch(recordAction.resetRecord());
  }, []);
  const setModifyState = useCallback((record: Record) => {
    dispatch(
      recordAction.setRecord({
        date: record.date,
        imagePath: record.imagePath,
        imageRatio: record.imageRatio,
        body: record.body,
        archive: record.archive?.[0],
      }),
    );
  }, []);

  return {
    recordWhole,
    recordDate,
    recordArchive,
    // recordImage,
    recordBody,
    recordImageRatio,
    recordImagePath,
    setRecordDate,
    setRecordImagePath,
    // setRecordImage,
    setRecordBody,
    setRecordArchive,
    setImageRatio,
    setInitiailState,
    setModifyState,
  };
}
