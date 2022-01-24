import { triggerEvent } from "../utilities/triggerEvents";

if (document.querySelector('.product__hero') !== null) {

    const $form = document.getElementById("add-to-cart");
    const prodHandle = $form.getAttribute("data-product-handle")

    let selectedVariant;
    let selectedVariantQty;
    let prodJSON;

    fetch(`/products/${prodHandle}.json`, {
        credentials: 'same-origin',
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

                const $selector = document.getElementById("product-select");
                selectedVariant = variant.id;
                selectedVariantQty = parseInt($selector.querySelector(`option[value="${selectedVariant}"]`).getAttribute('data-qty'));

                let variantImageId = variant.image_id;


                if (variant.available || selectedVariantQty > 0) {
                    // Selected a valid variant that is available.
                    // $('#add').removeClass('disabled').removeAttr('disabled').val('Add to Bag').fadeTo(200, 1);
                } else {
                    // Variant is sold out
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
                // $('#add').val('Out of Stock').addClass('disabled').attr('disabled', 'disabled').fadeTo(200, 0.5);
            }

        }
        // ]]>
        new Shopify.OptionSelectors("product-select", {
            product: prodJSON,
            onVariantSelected: selectCallback,
            enableHistoryState: true
        });

        if(document.querySelectorAll(".swatch__group-wrap") !== null){
            const $swatchGroups = document.querySelectorAll(".swatch__group-wrap");
            $swatchGroups.forEach($group => {
                const $swatches = $group.querySelectorAll(".swatch__radio");
                const $swatchWraps = $group.querySelectorAll(".swatch__wrap");
                const groupOption = $group.getAttribute("data-option");
                const $swatchSelector = document.getElementById(`product-select-option-${groupOption}`);
                $swatchSelector.style.display = "none";
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

    })

}