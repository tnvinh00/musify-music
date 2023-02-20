import { ISection, SectionType, SectionId } from "types/model.type";

export const getSectionByType = (items: ISection[], type: SectionType, id?: SectionId) => {
  return items.find((item) => {
    if (id) {
      return item.sectionType === type && item.sectionId === id;
    }
    return item.sectionType === type;
  });
}

export const convertDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const getAudioUrl = (id: string = "") => {
  return `${process.env.NEXT_PUBLIC_API_AUDIO + id}/320`;
}

export const shortNumber = (number: number) => {
  if (number < 1000) {
    return number;
  }
  if (number < 1000000) {
    return `${Math.floor(number / 1000)}K`;
  }
  if (number < 1000000000) {
    return `${Math.floor(number / 1000000)}M`;
  }
  return `${Math.floor(number / 1000000000)}B`;
}

export const convertToDateTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}