const fromAmount = document.querySelector('.amount')
const convertedAmount = document.querySelector('.convertedAmount')
const fromCurrecny = document.querySelector('.fromCurrency')
const toCurrency = document.querySelector('.toCurrency')
const result = document.querySelector('.result')
const countries = [
    {code:"USD",name:"United States Dollar"},
    {code:"INR",name:"Indian Ruppe"},
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CNY", name: "Chinese Yuan" },
]

countries.forEach((country)=>{
  const option1 = document.createElement('option')
  option1.value = country.code;
  option1.textContent = `${country.code} (${country.name})`;
  fromCurrecny.appendChild(option1)

  const option2 = document.createElement('option')
  option2.value = country.code;
  option2.textContent = `${country.code} (${country.name})`;
  toCurrency.appendChild(option2)
   
  fromCurrecny.value = "USD"
  toCurrency.value = "INR"
})

const getExchange = async function(){
    const amount = parseFloat(fromAmount.value)
    const fromCurrecnyEle = fromCurrecny.value
    const toCurrencyEle = toCurrency.value
    const response =await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrecnyEle}`);
    const data = await response.json();

    //console.log(data)

    const conversionRate = data.rates[toCurrencyEle];
    const ca = (amount * conversionRate).toFixed(2);
    if(typeof conversionRate === 'undefined'){
        result.textContent = "Exchange rate data is not available for selected countries"
        convertedAmount = ""
    }else{
        convertedAmount.value = ca
      result.innerHTML= `${amount} ${fromCurrecny.value} = ${ca} ${toCurrency.value}`
     }
    }
    
    

fromAmount.addEventListener('input',getExchange)
