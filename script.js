const amountUpdateModes = {
    add: 'ADD',
    delete: 'DELETE'
}

const clearSearchBtn = document.querySelector('#clear-search-btn');
clearSearchBtn.addEventListener('click', () => {
    const searchField = document.querySelector('#search-field');
    searchField.value = '';
});

const productController = (() => {
    let amount = 0;
    let isPackMode = false;
    let isInFavorites = false;
    const price = 14150;
    const discount = 0.15;
    const packSize = 12;
    const $packSwitcher = document.querySelector('#pack-toggle');
    const $priceWithoutDiscount = document.querySelector('#price-without-discount');
    const $price = document.querySelector('#price');
    const $favoritesButton = document.querySelector('#favorites-button');
    const $toBasketButton = document.querySelector('#to-basket');
    const $amountButton = document.querySelector('#amount-btn');
    const $plusButton = document.querySelector('#amount-btn .amount-button__plus');
    const $minusButton = document.querySelector('#amount-btn .amount-button__minus');
    const $amount = document.querySelector('#amount-btn .amount-button__amount');

    return {
        changePackMode(isEnabled) {
            isPackMode = isEnabled;
            let currentPriceWithoutDiscount = isPackMode ? price * packSize : price;
            let currentPrice = Math.round(currentPriceWithoutDiscount * (1 - discount));
            $priceWithoutDiscount.innerHTML = new Intl.NumberFormat("ru-RU").format(currentPriceWithoutDiscount);
            $price.innerHTML = new Intl.NumberFormat("ru-RU").format(currentPrice);
        },
        toggleInFavorites() {
            isInFavorites = !isInFavorites;
            $favoritesButton.classList.toggle('product-card__favorites-btn_active');
        },
        changeAmount(mode) {
            let quantity = isPackMode ? packSize : 1;
            let newAmount;

            switch (mode) {
                case amountUpdateModes.add:
                    newAmount = amount + quantity;
                    break;
                case amountUpdateModes.delete:
                    newAmount = amount - quantity;
                    break;
                default:
                    break;
            }
            if (newAmount < 0) { newAmount = 0 }

            amount = newAmount;

            $amount.textContent = String(amount);
            $amount.innerHTML = String(amount);

            if (amount) {
                $toBasketButton.classList.add('button_hidden');
                $amountButton.classList.remove('amount-button_hidden');
            } else {
                $toBasketButton.classList.remove('button_hidden');
                $amountButton.classList.add('amount-button_hidden');
            }

        },
        initListeners() {
            $packSwitcher.addEventListener('change', (e) => {
                this.changePackMode(e.target.checked);
            });
            $favoritesButton.addEventListener('click', () => {
                this.toggleInFavorites();
            });
            [$plusButton, $toBasketButton].forEach(i => {
                i.addEventListener('click', () => {
                    this.changeAmount(amountUpdateModes.add);
                })
            });
            $minusButton.addEventListener('click', () => {
                this.changeAmount(amountUpdateModes.delete);
            })
        }
    }
})();
productController.initListeners();