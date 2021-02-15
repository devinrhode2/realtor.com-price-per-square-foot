// ==UserScript==
// @name         realtor.com price per sqft
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.realtor.com/myaccount/saved_homes
// @grant        none
// @run_at       document_end
// ==/UserScript==

(function() {
    'use strict';
window.addPpsq = () => {
    console.log('running price per sqft')
let ppsqList = []
let priceNodes = Array.from(document.querySelectorAll('[data-testid="card-price"]'))
let prices = priceNodes.map(priceNode => {
    return parseInt(
        priceNode.innerText.replace('$', '').replace(',', ''),
        10
    )
})
let sqftNodes = Array.from(document.querySelectorAll('[data-testid="property-meta-sqft"]'))
sqftNodes.forEach((sqftContainer, index) => {
  let sqftNode = sqftContainer.querySelector('[data-testid="meta-value"]')
  let sqft = parseInt(sqftNode.innerText.replace(',', ''), 10)
  let pricePerSqFtNode = document.createElement('li')
  let ppsq = (prices[index]/sqft).toFixed(2)

  ppsqList.push(ppsq)

  pricePerSqFtNode.innerHTML = '<span class="price-per-square-foot-devin">$' + ppsq.toString().trim() + '</span>\pp <span id="price-'+ppsq.replace('.', '')+'"></span>'

  sqftNode.parentNode.appendChild(pricePerSqFtNode)
});
ppsqList = ppsqList.sort()
ppsqList.forEach((ppsq, index) => {
  setTimeout(() => {
    document.getElementById(
      'price-'+ppsq.toString().replace('.', '')
    ).innerText = '#'+(index+1)+'-'
  }, 100);
})
};

    setTimeout(window.addPpsq, 2000);

})();














