let forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });
});

// b1
function b1(){
    const dc = parseFloat(document.getElementById("b1__dc").value);
    const t =  parseFloat(document.getElementById("b1__t").value);
    const v =  parseFloat(document.getElementById("b1__v").value);
    const a =  parseFloat(document.getElementById("b1__a").value);

    let result = t + v + a + getKV()+ getDT();
    
    if (t <= 0 || v <= 0 || a <= 0) {
        document.getElementById("b1__kq").innerHTML = `Bạn đã rớt do có 1 môn 0`;
    } else if (result >= dc) {
        document.getElementById("b1__kq").innerHTML = `Bạn đã đậu với điểm ${result}`;
    } else { 
        document.getElementById("b1__kq").innerHTML = `Bạn đã rớt với điểm ${result}`;
    }
    

}

function getKV(){ 
    const kv = document.getElementById("b1__kv").value * 1;
    if (kv == 1) {
        return 2;
    } else if (kv == 2) {
        return 1;
    } else { 
        return 0.5;
    }
}

function getDT() { 
    const dt = document.getElementById("b1__dt").value * 1;
    if (dt == 1) {
        return 2.5;
    } else if (dt == 2) {
        return 1.5;
    } else{ 
        return 1;
    }
}

// b2
function b2() {
    const name = document.getElementById("b2__name").value;
    const soKw = document.getElementById("b2__kw").value;
    let tien = 0;
    let kw = soKw;

    if (kw > 0) {
        let bac1 = Math.min(kw, 50);
        tien += bac1 * 500;
        kw -= bac1;
    }
    if (kw > 0) {
        let bac2 = Math.min(kw, 50);
        tien += bac2 * 650;
        kw -= bac2;
    }
    if (kw > 0) {
        let bac3 = Math.min(kw, 100);
        tien += bac3 * 850;
        kw -= bac3;
    }
    if (kw > 0) {
        let bac4 = Math.min(kw, 150);
        tien += bac4 * 1100;
        kw -= bac4;
    }
    if (kw > 0) {
        tien += kw * 1300;
    }
    document.getElementById("b2__kq").innerHTML = `Khách hàng: ${name}, Số Kw: ${soKw}, Tiền phải trả: ${tien}đ`;
}

// b3
function tinhThuNhapChiuThue(tongThuNhap, soNguoiPhuThuoc) {
    let giamTruBanThan = 4000000;
    let giamTruNguoiPhuThuoc = soNguoiPhuThuoc * 1600000;
    let thuNhapChiuThue = tongThuNhap - giamTruBanThan - giamTruNguoiPhuThuoc;

    return thuNhapChiuThue > 0 ? thuNhapChiuThue : 0;
}

function layBieuThue() {
    return [
        [60000000, 0.05],
        [120000000, 0.10],
        [210000000, 0.15],
        [384000000, 0.20],
        [624000000, 0.25],
        [960000000, 0.30],
        [Infinity, 0.35]
    ];
}

function tinhThueTheoBieu(thuNhapChiuThue) {
    let bacThue = layBieuThue();
    let thuePhaiNop = 0;
    let mucDuoi = 0;

    for (let [mucTren, thueSuat] of bacThue) {
        if (thuNhapChiuThue > mucTren) {
            thuePhaiNop += (mucTren - mucDuoi) * thueSuat;
            mucDuoi = mucTren;
        } else {
            thuePhaiNop += (thuNhapChiuThue - mucDuoi) * thueSuat;
            break;
        }
    }

    return thuePhaiNop;
}

function b3() {
    const hoTen = document.getElementById("b3__name").value;
    const tongThuNhap = document.getElementById("b3__salary").value * 1;
    const soNguoiPhuThuoc = document.getElementById("b3__depend").value * 1;
    let thuNhapChiuThue = tinhThuNhapChiuThue(tongThuNhap, soNguoiPhuThuoc);
    let thuePhaiNop = tinhThueTheoBieu(thuNhapChiuThue);

    document.getElementById("b3__kq").innerHTML = `Tên: ${hoTen} - Tổng thu nhập: ${tongThuNhap}đ <br \> Thu nhập chịu thuế: ${thuNhapChiuThue}đ - Thuế phải nộp: ${thuePhaiNop}đ`;
}

// b4

const RATES = {
  res: { processing: 4.5, basic: 20.5, premium: 7.5 },
  biz: { processing: 15,  basic: 75,   premium: 50 }
};

function money(v) { return `$${v.toFixed(2)}`; }

function b4(){
  const typeVal = document.getElementById("b4__kh").value;     
  const id = document.getElementById("b4__ma").value.trim(); 
  const premium = Number(document.getElementById("b4__kcc").value || 0);

  if (!id) { alert("Vui lòng nhập Mã khách hàng"); return; }
  if (premium < 0) { alert("Số kênh cao cấp không hợp lệ"); return; }
  const key = (typeVal === "1") ? "res" : "biz";
  const rate = RATES[key];

  const processing = rate.processing;
  const basic = rate.basic;
  const premiumFee = premium * rate.premium; 
  const total = processing + basic + premiumFee;

  document.getElementById("b4__kq").innerHTML = `
    <h3>Kết quả cho KH: ${id} (${key === "res" ? 'Nhà dân' : 'Doanh nghiệp'})</h3>
    <ul>
      <li>Phí xử lý hóa đơn: <b>${money(processing)}</b></li>
      <li>Phí dịch vụ cơ bản: <b>${money(basic)}</b></li>
      <li>Thuê kênh cao cấp: <b>${money(premiumFee)}</b></li>
    </ul>
    <hr>
    <h2>Tổng cộng: ${money(total)}</h2>
  `;
}
