import { useEffect, useState } from "react";
import { View } from "react-native";
import { Image, Text, useWindowDimensions } from "react-native";
import {
  NativeAd,
  NativeAdView,
  NativeMediaView,
  NativeAdChoicesPlacement,
  NativeAsset,
  NativeAssetType,
  TestIds,
} from "react-native-google-mobile-ads";

export default function RecordAdBlock() {
  const dimension = useWindowDimensions();
  const _width = Math.round((dimension.width - 48 - 24) / 3);

  const [nativeAd, setNativeAd] = useState<NativeAd>();

  useEffect(() => {
    NativeAd.createForAdRequest(TestIds.NATIVE, {
      adChoicesPlacement: NativeAdChoicesPlacement.TOP_RIGHT,
    })
      .then(setNativeAd)
      .catch(console.error);
  }, []);

  if (!nativeAd) {
    return <RecordAdBlock.skeleton />;
  }

  return (
    <NativeAdView
      nativeAd={nativeAd}
      style={{ borderColor: "#ff0000", borderWidth: 1, width: _width }}
    >
      <NativeMediaView
        resizeMode={"contain"}
        style={{ borderRadius: 8, overflow: "hidden" }}
      />
      <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
        <Text>{nativeAd.callToAction}</Text>
      </NativeAsset>
      <NativeAsset assetType={NativeAssetType.HEADLINE}>
        <Text>{nativeAd.headline}</Text>
      </NativeAsset>
      {/* <NativeAsset assetType={NativeAssetType.BODY}>
        <Text>{nativeAd.body}</Text>
      </NativeAsset> */}
      <Text>Sponsored</Text>
    </NativeAdView>
  );
}

RecordAdBlock.skeleton = () => {
  const dimension = useWindowDimensions();
  const _width = Math.round((dimension.width - 48 - 24) / 3);

  return (
    <View
      style={{
        borderColor: "#ff0000",
        borderWidth: 1,
        width: _width,
        backgroundColor: "#f0f0f0",
        aspectRatio: 1,
      }}
    ></View>
  );
};
