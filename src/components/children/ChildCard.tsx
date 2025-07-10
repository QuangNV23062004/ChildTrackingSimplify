import React from "react";
import { FaBaby, FaEye, FaEdit, FaTrash, FaChartLine } from "react-icons/fa";
import { AllergyEnum } from "../../enum/AllergyEnum";
import { ALLERGY_ICON_LABEL_MAP } from "../../enum/AllergyIconMap";
import { FeedingTypeEnum } from "../../enum/FeedingTypeEnum";
import { FEEDING_TYPE_ICON_LABEL_MAP } from "../../enum/FeedingTypeIconMap";
import { getFeedingTypeLabel, getAllergyLabels } from "@/app/children/page";

interface ChildCardProps {
  child: any;
  onEdit: (child: any) => void;
  onDelete: (id: string) => void;
  onGrowthData: (child: any) => void;
}

function calculateAge(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  if (years === 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} old`;
  } else {
    return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'} old`;
  }
}



const ChildCard: React.FC<ChildCardProps> = ({ child, onEdit, onDelete, onGrowthData }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col min-w-0 overflow-hidden">
    {/* Colored top bar */}
    <div className={`h-2 w-full ${child.gender === 0 ? 'bg-gradient-to-r from-blue-100 to-blue-300' : 'bg-gradient-to-r from-pink-100 to-pink-300'}`}></div>
    <div className="p-5 flex-1 flex flex-col">
      {/* Avatar, name, gender badge */}
      <div className="flex items-center mb-4">
        <div className={`rounded-full p-2 flex items-center justify-center ${child.gender === 0 ? 'bg-blue-400' : 'bg-pink-400'}`}
          style={{ minWidth: 48, minHeight: 48 }}>
          <FaBaby className="text-white text-2xl" />
        </div>
        <div className="ml-4 flex flex-col gap-1">
          <span className="font-bold text-lg text-black">{child.name}</span>
          <span className={`inline-block px-1 py-0.5 text-center rounded text-xs font-semibold ${child.gender === 0 ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>{child.gender === 0 ? 'Boy' : 'Girl'}</span>
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-col gap-2 text-sm text-black mb-4">
        <div><span className="font-semibold">Birthday:</span> {child.birthDate?.slice(0, 10)}</div>
        {/* Feeding type as badge */}
        {FEEDING_TYPE_ICON_LABEL_MAP[child.feedingType as FeedingTypeEnum] && (
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Feeding:</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white text-black border border-gray-200`}
              title={FEEDING_TYPE_ICON_LABEL_MAP[child.feedingType as FeedingTypeEnum].label}
              aria-label={FEEDING_TYPE_ICON_LABEL_MAP[child.feedingType as FeedingTypeEnum].label}
            >
              {FEEDING_TYPE_ICON_LABEL_MAP[child.feedingType as FeedingTypeEnum].icon}
              <span className="text-black">{FEEDING_TYPE_ICON_LABEL_MAP[child.feedingType as FeedingTypeEnum].label}</span>
            </span>
            {/* Fallback plain text label */}
            <span className="ml-2 text-xs text-gray-500">({getFeedingTypeLabel(child.feedingType)})</span>
          </div>
        )}
        {/* Always show feeding type label if icon/label map is missing */}
        {!FEEDING_TYPE_ICON_LABEL_MAP[child.feedingType as FeedingTypeEnum] && (
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Feeding:</span>
            <span className="text-black">{getFeedingTypeLabel(child.feedingType)}</span>
          </div>
        )}
        {/* Allergies as badges */}
        {Array.isArray(child.allergies) && child.allergies.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <span className="font-semibold">Allergies:</span>
            {child.allergies.map((allergy: string, idx: number) => {
              const allergyEnum = allergy as AllergyEnum;
                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white text-black border border-gray-200`}
                  title={ALLERGY_ICON_LABEL_MAP[allergyEnum]?.label || allergy}
                  aria-label={ALLERGY_ICON_LABEL_MAP[allergyEnum]?.label || allergy}
                    >
                      {ALLERGY_ICON_LABEL_MAP[allergyEnum]?.icon}
                  <span className="text-black">{ALLERGY_ICON_LABEL_MAP[allergyEnum]?.label || allergy}</span>
                    </span>
                  );
                })}
            {/* Fallback plain text label */}
            <span className="ml-2 text-xs text-gray-500">({getAllergyLabels(child.allergies)})</span>
          </div>
        )}
        {/* Friendly empty state if both are NA/None */}
        {((child.allergies && (child.allergies.includes(AllergyEnum.None) || child.allergies.includes(AllergyEnum.NA))) &&
          (child.feedingType === FeedingTypeEnum.NA)) && (
          <div className="text-xs text-gray-500 italic mb-2">No allergies or special feeding requirements.</div>
        )}
        {child.note && <div><span className="font-semibold">Note:</span> {child.note}</div>}
      </div>
      {/* Action bar */}
      <div className="flex justify-center gap-2 mt-auto pt-2 border-t border-gray-100">
        <button className="p-2 rounded-full hover:bg-teal-100 transition cursor-pointer" title="Growth Data" onClick={() => onGrowthData(child)}>
          <FaChartLine className="text-teal-600 text-lg" />
        </button>
        <button className="p-2 rounded-full hover:bg-green-100 transition cursor-pointer" title="Edit" onClick={() => onEdit(child)}>
          <FaEdit className="text-green-600 text-lg" />
        </button>
        <button className="p-2 rounded-full hover:bg-red-100 transition cursor-pointer" title="Delete" onClick={() => onDelete(child.id)}>
          <FaTrash className="text-red-600 text-lg" />
        </button>
      </div>
    </div>
  </div>
);

export default ChildCard; 