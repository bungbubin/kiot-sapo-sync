import fetch from "node-fetch";

// ====== CONFIG ======
const KIOT_CLIENT_ID = process.env.KIOT_CLIENT_ID;
const KIOT_CLIENT_SECRET = process.env.KIOT_CLIENT_SECRET;
const KIOT_RETAILER = process.env.KIOT_RETAILER;

// ====== KIOT AUTH ======
async function getKiotToken() {
  const res = await fetch("https://id.kiotviet.vn/connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      `client_id=${KIOT_CLIENT_ID}` +
      `&client_secret=${KIOT_CLIENT_SECRET}` +
      `&grant_type=client_credentials` +
      `&scopes=PublicApi.Access`
  });
  const data = await res.json();
  return data.access_token;
}

// ====== LẤY TỒN KHO ======
async function getKiotInventories(token) {
  const res = await fetch(
    "https://public.kiotapi.com/inventories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Retailer: KIOT_RETAILER
      }
    }
  );
  const data = await res.json();
  return data.data || [];
}

// ====== MAIN (DRY-RUN) ======
(async () => {
  console.log("=== START KIOT → SAPO (DRY-RUN) ===");

  const token = await getKiotToken();
  const inventories = await getKiotInventories(token);

  inventories.slice(0, 5).forEach(i => {
    console.log(
      `SKU ${i.productCode} | Tồn Kiot: ${i.onHand}`
    );
  });

  console.log("=== DRY-RUN ONLY – CHƯA UPDATE SAPO ===");
})();

