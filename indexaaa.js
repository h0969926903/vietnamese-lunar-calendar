// Tính toán Dương lịch sang Âm lịch (đã tối ưu hóa trả về số nguyên)
function solarToLunar(solarYear, solarMonth, solarDay) { 
  const SOLAR_TO_LUNAR_EPOCH = 5; 
  const epoche = new Date(solarYear + SOLAR_TO_LUNAR_EPOCH, 0, 1).getTime(); 
  const current = new Date(solarYear, solarMonth - 1, solarDay).getTime(); 
  const diff = (current - epoche) / (1000 * 60 * 60 * 24); 
  const base = Math.floor(diff / 365.25); 
  const remainder = diff % 365.25; 
  const leapYear = Math.floor((base + 4) / 10) * 3; 
  const year = base + SOLAR_TO_LUNAR_EPOCH + leapYear; 
  const lunarMonth = Math.floor((remainder + 30.6) / 29.5); 
  const leapMonth = Math.floor((lunarMonth - 3) / 12); 
  const month = (lunarMonth + 12 * leapMonth) % 12 + 1; 
  const day = Math.floor(remainder - (365.25 * base + 30.6 * lunarMonth) + 1); 
  const lunarDay = day > 30 ? day - 30 : (day > 0 ? day : 1); 
  
  // Tính hệ số Can Chi của Năm phục vụ Mai Hoa (Tý = 1, Sửu = 2... Hợi = 12)
  let chiNam = (year - 3) % 12;
  if (chiNam === 0) chiNam = 12;

  return { 
    nam_am_lich: year,
    he_so_nam: chiNam, // Dùng số này để cộng Mai Hoa
    thang_am_lich: month, // Dùng số này để cộng Mai Hoa
    ngay_am_lich: lunarDay // Dùng số này để cộng Mai Hoa
  }; 
} 

// Điểm tiếp nhận API cho Vercel
export default function handler(req, res) {
  // Nhận tham số date từ URL (Ví dụ: ?date=23/06/2026)
  const { date } = req.query; 

  if (!date) {
    return res.status(400).json({ error: "Vui lòng truyền tham số date (DD/MM/YYYY)" });
  }

  try {
    const [day, month, year] = date.split('/').map(Number); 
    const result = solarToLunar(year, month, day); 
    
    // Trả kết quả định dạng JSON về cho n8n
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Định dạng ngày không hợp lệ. Vui lòng dùng DD/MM/YYYY" });
  }
}
