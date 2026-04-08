import { cn } from "@/libs/utils";
import {
  User,
  GraduationCap,
  Menu,
  Mail,
  KeyRound,
  List,
  Home,
  Tag,
  Pen,
  Trash,
  Eye,
  LucideProps,
  LogOut,
  BookOpenText,
  Layers,
} from "lucide-react";

const SVGList = {
  user: User,
  "graduation-cap": GraduationCap,
  menu: Menu,
  mail: Mail,
  "key-round": KeyRound,
  list: List,
  home: Home,
  tag: Tag,
  pen: Pen,
  trash: Trash,
  eye: Eye,
  "log-out": LogOut,
  "book-open-text": BookOpenText,
  layers: Layers,
};

export type SVGListTypes = keyof typeof SVGList;

interface PsSVGPropTypes extends LucideProps {
  name: SVGListTypes;
}

const PsSVG = ({
  name,
  className,
  size,
  strokeWidth = 1.5,
  ...props
}: PsSVGPropTypes) => {
  const SVG = SVGList[name] ?? User;
  return (
    <SVG
      {...props}
      strokeWidth={strokeWidth}
      style={{
        width: size ?? undefined,
        height: size ?? undefined,
        minWidth: size ?? undefined,
        minHeight: size ?? undefined,
      }}
      className={cn(!size && "aspect-square", className)}
    />
  );
};

export default PsSVG;
