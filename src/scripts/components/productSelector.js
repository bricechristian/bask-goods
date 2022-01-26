import { triggerEvent } from "../utilities/triggerEvents";
import { wrapEl } from "../utilities/wrapEl";

if (document.querySelector('.product__hero') !== null) {

    const $form = document.getElementById("add-to-cart");
    const prodHandle = $form.getAttribute("data-product-handle")

    let selectedVariant;
    let selectedVariantQty;
    let prodJSON;
    let loaded = false;

    fetch(`/products/${prodHandle}.json`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'xmlhttprequest'
        }
    }).then(response => {
        return response.json();
    }).then(json => {

        prodJSON = json.product

        // <![CDATA[
        const selectCallback = function (variant, selector) {

            if (variant) {

                // console.log(variant)
                // console.log(selector)

                const $selector = document.getElementById("product-select");
                const $addToCartButton = document.getElementById("add");
                const $buyNowButton = document.getElementById("buy-now");
                selectedVariant = variant.id;
                selectedVariantQty = parseInt($selector.querySelector(`option[value="${selectedVariant}"]`).getAttribute('data-qty'));

                let variantImageId = variant.image_id;


                if (variant.available || selectedVariantQty > 0) {
                    // Selected a valid variant that is available.
                    $addToCartButton.disabled = null;
                    $buyNowButton.disabled = null;
                    $addToCartButton.textContent = "Add to Cart";                 
                    $buyNowButton.value = "Buy it Now";                        
                    $buyNowButton.setAttribute("href", `${window.shopUrl}/cart/${selectedVariant}:1`)
                    // $('#add').removeClass('disabled').removeAttr('disabled').val('Add to Bag').fadeTo(200, 1);
                } else {
                    // Variant is sold out
                    $addToCartButton.disabled = true;
                    $buyNowButton.disabled = true;
                    $addToCartButton.textContent = "Out of Stock";                 
                    $buyNowButton.value = "Out of Stock";                 
                    // $('#add').val('Out of Stock').addClass('disabled').attr('disabled', 'disabled').fadeTo(200, 0.5);
                }

                // Whether the variant is in stock or not, we can update the price and compare at price.
                if (variant.compare_at_price > variant.price) {
                    // $('#price-field').html('<span style="display:inline-block; color:#ff0000;">' + Shopify.formatMoney(variant.price, "").replace('.00', '') + '</span>' + '<span style="display:inline-block; text-decoration:line-through;padding-left:5px;">' + Shopify.formatMoney(variant.compare_at_price, "").replace('.00', '') + '</span>');
                } else {
                    // $('#price-field').html(Shopify.formatMoney(variant.price, "").replace('.00', ''));
                }


            } else {
                // variant doesn't exist.
                $addToCartButton.disabled = true;
                $buyNowButton.disabled = true;  
                $addToCartButton.textContent = "Out of Stock";    
                // $('#add').val('Out of Stock').addClass('disabled').attr('disabled', 'disabled').fadeTo(200, 0.5);
            }

            //DEFAULT SELECTOR
            if(document.querySelector(".single-option-selector") !== null){
                if(document.querySelector(".single-option-selector option").value === "Default Title"){
                    // DEFAULT SELECTOR
                    const $defaultSelectorOption = document.querySelector(".single-option-selector option[value='Default Title']");
                    const $defaultSelector = $defaultSelectorOption.closest(".selector-wrapper");
                    $defaultSelector.style.display = "none"
                } else {
                    // OTHER SELECTOR
                    document.querySelectorAll(".selector-wrapper").forEach($selectorWrap => {
                        const variantSelectorIndex = $selectorWrap.querySelector("select").getAttribute("id").split("option-")[1]
                        const variantSelectorLabel = selector.product.options[variantSelectorIndex].name;
                        if(!loaded && variantSelectorLabel !== "Size" && variantSelectorLabel !== "Color"){
                            $selectorWrap.classList.add("dropdown__alt")       
                            let variantSelectorLabelHTML = document.createRange().createContextualFragment(`
                                <div class="font-matter text-13">Select a ${selector.product.options[variantSelectorIndex].name}:</div>
                            `);                
                            $selectorWrap.prepend(variantSelectorLabelHTML)
                            wrapEl($selectorWrap, document.createElement('div'));
                        }
                    });
                    loaded = true;
                }
            }            

        }
        // ]]>
        new Shopify.OptionSelectors("product-select", {
            product: prodJSON,
            onVariantSelected: selectCallback,
            enableHistoryState: true
        });

        //SWATCH BUTTONS
        if(document.querySelectorAll(".swatch__group-wrap") !== null){
            const $swatchGroups = document.querySelectorAll(".swatch__group-wrap");
            $swatchGroups.forEach($group => {
                const $swatches = $group.querySelectorAll(".swatch__radio");
                const $swatchWraps = $group.querySelectorAll(".swatch__wrap");
                const groupOption = $group.getAttribute("data-option");
                const $swatchSelector = document.getElementById(`product-select-option-${groupOption}`);
                $swatchSelector.style.display = "none";
                $swatchSelector.previousSibling.style.display = "none";
                const removeSwatchActiveClasses = () => {
                    $swatchWraps.forEach($wrap => {
                        if($wrap.classList.contains("active")){
                            $wrap.classList.remove("active")
                        }
                    });
                }
                $swatches.forEach($swatch => {
                    $swatch.addEventListener("click", (event) => {
                        removeSwatchActiveClasses();
                        $swatch.parentNode.classList.add("active");
                        const swatchVal = $swatch.value;
                        const $label = $group.querySelector(".swatch__label");
                        $swatchSelector.value = swatchVal;
                        $label.textContent = `Color: ${swatchVal}`
                        triggerEvent($swatchSelector, "change")
                    })
                });
            });
        }

        //SIZE BUTTONS
        if(document.querySelectorAll(".size__group-wrap") !== null){
            const $sizeGroups = document.querySelectorAll(".size__group-wrap");
            $sizeGroups.forEach($group => {
                const $sizes = $group.querySelectorAll(".size__radio");
                const $sizeButtons = $group.querySelectorAll(".size__button");
                const sizeGroupOption = $group.getAttribute("data-option");
                const $sizeSelector = document.getElementById(`product-select-option-${sizeGroupOption}`);
                $sizeSelector.style.display = "none";
                $sizeSelector.previousSibling.style.display = "none";
                const removeSizeActiveClasses = () => {
                    $sizeButtons.forEach($button => {
                        if($button.classList.contains("active")){
                            $button.classList.remove("active")
                        }
                    });
                }
                $sizes.forEach($size => {
                    $size.addEventListener("click", (event) => {
                        removeSizeActiveClasses();
                        $size.parentNode.classList.add("active");
                        const sizeVal = $size.value;
                        $sizeSelector.value = sizeVal;
                        triggerEvent($sizeSelector, "change")
                    })
                });
            });
        }

    })

}