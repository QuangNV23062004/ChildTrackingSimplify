import React from "react";
import { AllergyEnum } from "./AllergyEnum";
import { FaCheckCircle, FaQuestionCircle, FaPills, FaAppleAlt, FaHandPaper, FaLeaf, FaPaw, FaSeedling } from "react-icons/fa";

export const ALLERGY_ICON_LABEL_MAP: Record<AllergyEnum, { label: string; icon: React.ReactNode; color: string }> = {
  [AllergyEnum.None]: {
    label: 'No known allergies',
    icon: <FaCheckCircle className="text-green-500" />,
    color: 'bg-green-100 text-green-700',
  },
  [AllergyEnum.NA]: {
    label: 'Not Available',
    icon: <FaQuestionCircle className="text-gray-400" />,
    color: 'bg-gray-100 text-gray-500',
  },
  [AllergyEnum.DrugAllergy]: {
    label: 'Drug',
    icon: <FaPills className="text-pink-500" />,
    color: 'bg-pink-100 text-pink-700',
  },
  [AllergyEnum.FoodAllergy]: {
    label: 'Food',
    icon: <FaAppleAlt className="text-yellow-500" />,
    color: 'bg-yellow-100 text-yellow-700',
  },
  [AllergyEnum.LatexAllergy]: {
    label: 'Latex',
    icon: <FaHandPaper className="text-purple-500" />,
    color: 'bg-purple-100 text-purple-700',
  },
  [AllergyEnum.MoldAllergy]: {
    label: 'Mold',
    icon: <FaLeaf className="text-green-700" />,
    color: 'bg-green-200 text-green-800',
  },
  [AllergyEnum.PetAllergy]: {
    label: 'Pet',
    icon: <FaPaw className="text-orange-500" />,
    color: 'bg-orange-100 text-orange-700',
  },
  [AllergyEnum.PollenAllergy]: {
    label: 'Pollen',
    icon: <FaSeedling className="text-yellow-600" />,
    color: 'bg-yellow-200 text-yellow-800',
  },
}; 