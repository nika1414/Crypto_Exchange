const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const reverseBtn = document.getElementById("reverseBtn");
const input = document.getElementById("input");
const result = document.getElementById("result");
result.placeholder = "Calculated Amount";

const link =
  "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "bf4291de88msh1ba37180e2e8a18p13e411jsn34e228ba6a84",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

fetch(link, options)
  .then((resp) => resp.json())
  .then((data) => display(data));

function display(data) {
  const entries = data.data.coins;
  console.log(data.data.coins);
  for (let i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value="${data.data.coins[i].price}">${data.data.coins[i].name}</option>`;
    select[1].innerHTML += `<option value="${data.data.coins[i].price}">${data.data.coins[i].name}</option>`;
  }
  btn.addEventListener("click", () => {
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let value = input.value;

    console.log(currency1, currency2, value);

    if (currency1 != currency2) {
      let sum = (value * currency1) / currency2;
      result.placeholder = Math.round(sum * 100) / 100;
    } else {
      alert("It's the same Currency! Change it");
    }
  });
  reverseBtn.addEventListener("click", () => {
    let currency1 = select[0].selectedIndex;
    select[0].selectedIndex = select[1].selectedIndex;
    select[1].selectedIndex = currency1;
  });
}
