type Props = {
  className?: string;
  width?: number;
  align?: "left" | "center";
};

/**
 * SectionSignal — retired. The loud per-section gradient rule + portal'd
 * node read as scattered decoration over the new living AuroraField
 * background, so this renders nothing. Kept as a no-op to preserve the
 * existing call sites; the props are accepted and ignored.
 */
const SectionSignal = (_props: Props) => null;

export default SectionSignal;
