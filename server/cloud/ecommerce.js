module.exports = {
    createReceipt: async request => {
      console.log("createReceipt")
      const delivery = request.object;
      if (delivery.get("createdAt") === delivery.get("updatedAt")) {
        var Receipt = Parse.Object.extend("receipt");
        let receipt = new Receipt();
        var data = [];
        var total = 0;
        const objects = delivery.get("products").map(o => {
          const Product = Parse.Object.extend("product");
          const product = new Product();
          product.id = o.id;
          return product;
        });
        const products = await Parse.Object.fetchAllIfNeeded(objects);
        products.forEach(product => {
          delivery.get('products').forEach(cartProduct => {
            if (product.id === cartProduct.id) {
              let price = product.get('price') - (product.get('isDiscount')?product.get('price')*(product.get('discountPercentage')/100):0);
              data.push({name:product.get('name'), qty: cartProduct.qty, price: price});
            }
          });
        });
        data.forEach((product) => {
          total += product.price * product.qty;
        });
        receipt.set('data',data);
        receipt.set('total',total);
        var ACL = new Parse.ACL();
        ACL.setPublicReadAccess(true);
        receipt.setACL(ACL);
        receipt = await receipt.save();
        delivery.set('receipt', receipt);
        await delivery.save(null,{ useMasterKey: true });
      }
    }
  };
  