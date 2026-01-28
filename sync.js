const fs = require('fs');

// ====== GIẢ LẬP DATA (test trước) ======
const kiotData = [
  { productCode: "SP001", onHand: 50 },
  { productCode: "SP002", onHand: 20 }
];

const sapoData = [
  { sku: "SP001", quantity: 40 },
  { sku: "SP002", quantity: 20 }
];

console.log("=== START SYNC ===");

kiotData.forEach(k => {
  const s = sapoData.find(x => x.sku === k.productCode);

  if (!s) {
    console.log(`⚠️ SKU ${k.productCode} chưa có trên Sapo`);
    return;
  }

  if (s.quantity !== k.onHand) {
    console.log(`🔄 UPDATE ${k.productCode}: ${s.quantity} → ${k.onHand}`);
  } else {
    console.log(`✅ ${k.productCode} OK`);
  }
});

console.log("=== END SYNC ===");
