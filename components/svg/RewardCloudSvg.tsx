import { StyleProps } from "react-native-reanimated";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import tw from "twrnc";
export const RewardCloudSvg = ({
//   style,
  width,
  height,
}: {
//   style: StyleProps;
  width: number;
  height: number;
}) => {
  return (
    // <Svg height="50%" width="50%" viewBox="0 0 100 100">
    // <Svg height="62.58" width="50.512" viewBox="0 0 62.58 50.512">
    <Svg
    //   style={{ ...style }}
      //   style={tw`bg-red-200`}
      height={height}
      width={width}
      //   viewBox="0 0 62.58 50.512"
    >
      <Path
        d="M19.959,0,17.637,2.322,14.793.68,13.151,3.524,9.98,2.674,9.13,5.846H5.846V9.13l-3.172.85.85,3.172L.681,14.794l1.642,2.844L0,19.96l2.322,2.322L.681,25.125l2.844,1.642-.85,3.172,3.172.85v3.284H9.13l.85,3.172,3.172-.85,1.642,2.844L17.638,37.6l2.322,2.322L22.282,37.6l2.844,1.642,1.642-2.844,3.172.85.85-3.172h3.284V30.788l3.172-.85-.85-3.172,2.844-1.642L37.6,22.281l2.322-2.322L37.6,17.637l1.642-2.844-2.844-1.642.85-3.172-3.172-.85V5.846H30.789l-.85-3.172-3.172.85L25.125.68,22.281,2.322Z"
        // transform="matrix(0.966, -0.259, 0.259, 0.966, -153.329, -17.219)"
        transform="matrix(0.966, -0.259, 0.259, 0.966, 0, 10.332)"
        fill="#fea834"
      />
    </Svg>
  );
};
