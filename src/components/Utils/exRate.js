export const exRateToAlphabet = v => {
  switch (v) {
    case 5:
      return "A";
      break;
    case 4:
      return "B";
      break;
    case 3:
      return "C";
      break;
    case 2:
      return "D";
      break;
    case 1:
      return "E";
      break;
    default:
      return null;
      break;
  }
};

export const sortToFa = v => {
  switch (v) {
    case "expertRate":
      return "نظر کارشناس";
      break;
    case "peopleRate":
      return "نظر مردم";
      break;
    case "likes":
      return "محبوبیت";
      break;
    case "discount":
      return "تخفیف";
      break;
    default:
      return null;
      break;
  }
};

export const checkCaracter = v => {
  if (v.length > 31) {
    return v.slice(0, 27) + " ...";
  } else {
    return v;
  }
};

export const hhmmss = (v = 0) => {
  let date = new Date(null);
  date.setSeconds(v);
  return date.toISOString().substr(11, 8);
};

export const renderRateText = (cnt, rateType) => {
  const rateTypeHandle = (rateType, price, quality, salesman) => {
    if (rateType === "quality") {
      return quality;
    } else if (rateType === "salesman") {
      return salesman;
    } else if (rateType === "price") {
      return price;
    }
  };

  if (cnt === "office") {
    return rateTypeHandle(rateType, "قیمت مناسب ویزیت", "قدرت تشخیص طبیب", "برخورد مناسب طبیب");
  } else if (cnt === "healthcare") {
    return rateTypeHandle(rateType, "قیمت مناسب ویزیت", "کیفیت خدمات ارائه شده", "برخورد مناسب کادر");
  } else if (cnt === "healthy_food") {
    return rateTypeHandle(rateType, "قیمت مناسب", "کیفیت مواد غذایی", "برخورد فروشنده");
  } else {
    return rateTypeHandle(rateType, "ارزش در برابر قیمت", "کیفیت محصول", "نحوه برخورد فروشنده");
  }
};
