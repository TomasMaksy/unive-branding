import type { ComponentType } from "react";
import AlertDoc from "./alert";
import AvatarDoc from "./avatar";
import BadgeDoc from "./badge";
import ButtonDoc from "./button";
import CardDoc from "./card";
import CheckboxDoc from "./checkbox";
import DialogDoc from "./dialog";
import InputDoc from "./input";
import MenuDoc from "./menu";
import RadioDoc from "./radio";
import SelectDoc from "./select";
import SwitchDoc from "./switch";
import TabsDoc from "./tabs";
import TextareaDoc from "./textarea";
import ToastDoc from "./toast";
import TooltipDoc from "./tooltip";

/** One page per slug in ../registry.ts. */
export const DOCS: Record<string, ComponentType> = {
  alert: AlertDoc,
  avatar: AvatarDoc,
  badge: BadgeDoc,
  button: ButtonDoc,
  card: CardDoc,
  checkbox: CheckboxDoc,
  dialog: DialogDoc,
  input: InputDoc,
  menu: MenuDoc,
  radio: RadioDoc,
  select: SelectDoc,
  switch: SwitchDoc,
  tabs: TabsDoc,
  textarea: TextareaDoc,
  toast: ToastDoc,
  tooltip: TooltipDoc,
};
