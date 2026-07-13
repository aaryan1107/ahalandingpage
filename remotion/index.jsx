import { Composition, registerRoot } from "remotion";
import { HeroProductFilm } from "./HeroProductFilm";

function RemotionRoot() {
  return (
    <Composition
      id="NexCruiseHeroFilm"
      component={HeroProductFilm}
      durationInFrames={270}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ accent: "#18dcdc", signal: "#006aed" }}
    />
  );
}

registerRoot(RemotionRoot);
