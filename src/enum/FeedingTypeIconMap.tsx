import React from "react";
import { FeedingTypeEnum } from "./FeedingTypeEnum";
import { FaQuestionCircle, FaBaby, FaGlassWhiskey, FaCarrot } from "react-icons/fa";

export const FEEDING_TYPE_ICON_LABEL_MAP: Record<FeedingTypeEnum, { label: string; icon: React.ReactNode; color: string }> = {
  [FeedingTypeEnum.NA]: {
    label: 'Not Available',
    icon: <FaQuestionCircle className="text-gray-400" />,
    color: 'bg-gray-100 text-gray-500',
  },
  [FeedingTypeEnum.Breastfeeding]: {
    label: 'Breastfeeding',
    icon: <FaBaby className="text-pink-500" />,
    color: 'bg-pink-100 text-pink-700',
  },
  [FeedingTypeEnum.FormulaFeeding]: {
    label: 'Formula Feeding',
    icon: <FaGlassWhiskey className="text-blue-500" />,
    color: 'bg-blue-100 text-blue-700',
  },
  [FeedingTypeEnum.SolidFoods]: {
    label: 'Solid Foods',
    icon: <FaCarrot className="text-orange-500" />,
    color: 'bg-orange-100 text-orange-700',
  },
}; 