import { cn } from "@/lib/utils";
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
};

export type SVGListTypes = keyof typeof SVGList;

interface PsSVGPropTypes extends LucideProps {
  name: SVGListTypes;
}

const PsSVG = ({ name, className, ...props }: PsSVGPropTypes) => {
  const SVG = SVGList[name];
  return <SVG {...props} className={cn("aspect-square", className)} />;
};

export default PsSVG;
