$(function() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart && cart.length > 0) {
        $('#piecesofcartitem').text(cart.length)
        $('#piecesofcartitem').css('display', 'inline-block')
    } else {
        $('#piecesofcartitem').hide()
    }
    fetch('json.json')
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
        let productsData = data.productsData
        let products = ''
        let popup = ''
        // 從 productsData 陣列中選取前四項產品
        let defaultProducts = productsData.slice(0, 4)
        defaultProducts.forEach(function(product) {
            products += `
            <div class="product">
                <img src="${product['data-image']}">
                <h3>${product['data-name']}</h3>
                <h2>${product['data-id']}</h2>
                <h1>${product['info']['description1']}</h1>
                <p><span>NT$</span>${product['data-price']}</p>
                <button class="wantBuy" data-id="${product['data-id']}">加入購物車</button>
            </div>
            `
            popup = `
            <div class="popup-content" onclick="event.stopPropagation()">
                <div class="left-div">
                    <img id='popupImg' src="" alt="Product Image">
                </div>
                <div class="right-div">
                    <h1 id="productName">商品名稱</h1>
                    <p id="productID"></p>
                    <p id="description1">商品描述1</p>
                    <p id="description2">商品描述2</p>
                    <div id="color-options">
                    <label>顏色： </label>
                        <input type="radio" name="color" value="black" data-text="黑色" checked>黑色
                        <input type="radio" name="color" value="white" data-text="白色">白色
                        <input type="radio" name="color" value="olive-green" data-text="橄欖綠">橄欖綠
                    </div>
                    <div id="size-options">
                    <label>尺寸： </label>
                        <input type="radio" name="size" value="s" data-text="S">Ｓ
                        <input type="radio" name="size" value="m" data-text="M" checked>Ｍ
                        <input type="radio" name="size" value="l" data-text="L">Ｌ
                        <input type="radio" name="size" value="xl" data-text="XL">XL
                        <input type="radio" name="size" value="2xl" data-text="2XL">2XL
                    </div>
                    <label>數量： </label>
                    <input id="quan" type="number" name="quantity" min="1">
                    <div id="div-price">
                        <span id="pprice">NT$ </span>
                        <span id="productPrice">商品價格</span>
                    </div>
                    <div id="div-add-to-cart">
                        <button class="add-to-cart">加入購物車</button>
                    </div>
                </div>
            </div>
            `
        })
        // 從 productsData 中亂數選取四項產品放入 popproducts
        let popproducts = ''
        let randomIndexes = []
        while (randomIndexes.length < 4) {
            let randomIndex = Math.floor(Math.random() * productsData.length)
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex)
                let product = productsData[randomIndex]
                popproducts += `
                <div class="product">
                    <img src="${product['data-image']}">
                    <h3>${product['data-name']}</h3>
                    <h2>${product['data-id']}</h2>
                    <h1>${product['info']['description1']}</h1>
                    <p><span>NT$</span>${product['data-price']}</p>
                    <button class="wantBuy" data-id="${product['data-id']}">加入購物車</button>
                </div>
                `
                popup = `
                <div class="popup-content" onclick="event.stopPropagation()">
                    <div class="left-div">
                        <img id='popupImg' src="" alt="Product Image">
                    </div>
                    <div class="right-div">
                        <h1 id="productName">商品名稱</h1>
                        <p id="productID"></p>
                        <p id="description1">商品描述1</p>
                        <p id="description2">商品描述2</p>
                        <div id="color-options">
                        <label>顏色： </label>
                            <input type="radio" name="color" value="black" data-text="黑色" checked>黑色
                            <input type="radio" name="color" value="white" data-text="白色">白色
                            <input type="radio" name="color" value="olive-green" data-text="橄欖綠">橄欖綠
                        </div>
                        <div id="size-options">
                        <label>尺寸： </label>
                            <input type="radio" name="size" value="s" data-text="S">Ｓ
                            <input type="radio" name="size" value="m" data-text="M" checked>Ｍ
                            <input type="radio" name="size" value="l" data-text="L">Ｌ
                            <input type="radio" name="size" value="xl" data-text="XL">XL
                            <input type="radio" name="size" value="2xl" data-text="2XL">2XL
                        </div>
                        <label>數量： </label>
                        <input id="quan" type="number" name="quantity" min="1">
                        <div id="div-price">
                            <span id="pprice">NT$ </span>
                            <span id="productPrice">商品價格</span>
                        </div>
                        <div id="div-add-to-cart">
                            <button class="add-to-cart">加入購物車</button>
                        </div>
                    </div>
                </div>
                `
            }
        }
        document.querySelector('#popproducts').innerHTML = popproducts
        document.querySelector('#products').innerHTML = products
        document.querySelector('#popup').innerHTML = popup

        //商品彈出視窗
        $('.wantBuy').click(function() {
            let id = $(this).attr('data-id');
            let description1 = data.productsData[id-1].info.description1;
            let description2 = data.productsData[id-1].info.description2;
            $('input[type="radio"]').prop
            $('input[type="number"]').val(1)
            $("#popup").fadeIn()
            $('#description1').text(description1);
            $('#description2').text(description2);
            $('p#productID').html($(this).siblings('h2').html())
            $('img#popupImg').attr('src', $(this).siblings('img').attr('src'))
            $('h1#productName').html($(this).siblings('h3').html());
            $('span#productPrice').html($(this).siblings('p').text().slice(3));
        })

        // 添加到購物車事件
        $('.add-to-cart').click(function() {
            let id = $(this).parent().siblings('p#productID').html()
            let name = $(this).parent().siblings('h1#productName').html()
            let price = $(this).parent().siblings('div#div-price').children('span#productPrice').html()
            let image = $(this).parent().parent().siblings('.left-div').children('img').attr('src')
            let color = $('input[name="color"]:checked').data('text')
            let size = $('input[name="size"]:checked').data('text')
            let quantity = $(this).parent().siblings('input#quan').val()
            let item = {id, name, price, image, color, size, quantity}
            let cart = JSON.parse(localStorage.getItem('cart')) || []
            // 找到 cart 中相同的物件
            let found = false
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id === id && cart[i].size === size && cart[i].color === color) {
                    found = true
                    // 把購物車中該商品的quantity加上選取商品的quantity
                    cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantity)
                    $('#piecesofcartitem').text(cart.length)
                    $('#piecesofcartitem').show()
                    break
                }
            }
            // 如果沒有找到，就加進 cart 中
            if (!found) {
                cart.push(item)
                $('#piecesofcartitem').text(cart.length)
                $('#piecesofcartitem').show()
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            //加入購物車彈出
            $("#popup").fadeOut(function() {
                alert("已加入購物車")
            })
        })

    })
    .catch(function(error) {
    console.error('抓不到json資料', error)
    })


})
// 定義關閉彈出視窗的函式
function closePopup() {
    $("#popup").hide()
}