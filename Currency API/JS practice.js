let dollar = document.querySelector(".dollar");
let syp = document.querySelector(".syp");
//Rates api call 
fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=1c22ab90da15441badf0903e5aab374b`)
.then(res =>  {return res.json()})
.then(currency => {
  dollar.innerHTML = `1 $`;
  syp.innerHTML = Math.trunc(parseInt(dollar.innerHTML) * currency.rates[`SYP`]) + ` SYP`;
});