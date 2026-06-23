// index.js

const LUNAR_MONTHS = [
    'Tân', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất'
  ];
  
  const LUNAR_LEAP_MONTHS = [
    'Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'
  ];
  
  const LUNAR_DAYS = ['ngày 1', 'ngày 2', 'ngày 3', 'ngày 4', 'ngày 5', 'ngày 6', 'ngày 7', 'ngày 8', 'ngày 9', 'ngày 10',
    'ngày 11', 'ngày 12', 'ngày 13', 'ngày 14', 'ngày 15', 'ngày 16', 'ngày 17', 'ngày 18', 'ngày 19', 'ngày 20',
    'ngày 21', 'ngày 22', 'ngày 23', 'ngày 24', 'ngày 25', 'ngày 26', 'ngày 27', 'ngày 28','ngày 29', 'ngày 30'
  ];
  
  const SOLAR_TO_LUNAR_EPOCH = 5;
  
  function solarToLunar(solarYear, solarMonth, solarDay) {
    const epoche = new Date(solarYear + SOLAR_TO_LUNAR_EPOCH, 0,1).getTime();
    const current = new Date(solarYear, solarMonth - 1, solarDay).getTime();
    const diff = (current - epoche) / (1000 * 60 * 60 * 24);
    const base = Math.floor(diff / 365.25);
    const remainder = diff % 365.25;
    const leapYear = Math.floor((base + 4) / 10) * 3;
    const year = base + SOLAR_TO_LUNAR_EPOCH + leapYear;
    const lunarMonth = Math.floor((remainder + 30.6) / 29.5);
    const leapMonth = Math.floor((lunarMonth - 3) / 12);
    const month = (lunarMonth + 12 * leapMonth) % 12 + 1;
    const leap = month > 12 || month === 1 && lunarMonth > 11;
    const day = remainder - (365.25 * base + 30.6 * lunarMonth) + 1;
    const lunarDay = day > 30 ? day - 30 : day;
    const lunarDayName = LUNAR_DAYS[lunarDay - 1];
    const lunarMonthName = month > 12 ? LUNAR_LEAP_MONTHS[leapMonth] : LUNAR_MONTHS[month - 1];
    return {
      year,
      month: lunarMonthName,
      day: lunarDayName
    };
  }
  
  function convertDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    constlunarDate = solarToLunar(year, month, day);
    return `${lunarDate.day} ${lunarDate.month} ${lunarDate.year}`;
  }
  
  module.exports = {
    convertDate
  };
