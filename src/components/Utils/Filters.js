export const userLevelEnToFa = v => {
  switch (v) {
    case "normal":
      return "معمولی";
    case "owner":
      return "مالک";
    case "editor":
      return "ویرایشگر";
    case "author":
      return "نویسنده";
    case "tarah":
      return "طراح";
    case "admin":
      return "مدیر";
    case "storekeeper":
      return "فروشنده";
    case "delivery":
      return "پیک";
    case "organic.operatorEt":
      return "اپراتور اتحادیه";
    case "organic.bossEt":
      return "رئیس  اتحادیه";
    case "organic.officerEt":
      return "بازرس اتحادیه";
    case "organic.operatorAs":
      return "اپراتور اتاق بازرگانی";
    case "organic.bossAs":
      return "مدیر اتاق بازرگانی";
    case "organic.officerAs":
      return "بازرس اتاق بازرگانی";
    default:
      return "";
  }
};
