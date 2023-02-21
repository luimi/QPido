const utils = require('./utils');
module.exports = {
  isInitialized: async () => {
    return await isInitialized();
  },
  initialize: async (request) => {
    return await initialize(request);
  }/*,
  installModules: async modules => {
    const admin = await new Parse.Query(Parse.User).equalTo('username', 'admin').first();
    const adminRole = await new Parse.Query(Parse.Role).equalTo('name', "Administrator").first();
    if (modules.includes("authentication-email")) {
      const AuthEmailValidation = Parse.Object.extend("AuthEmailValidation");
      const authEmailValidation = new AuthEmailValidation();
      authEmailValidation.set('user', admin);
      authEmailValidation.set('code', utils.randomNumberBetween(100000, 999999));
      authEmailValidation.set('status', false);
      authEmailValidation.set('token', utils.randomString(20));
      authEmailValidation.setACL(new Parse.ACL());
      await authEmailValidation.save();
    }
    if (modules.includes("ecommerce")) {
      const Product = Parse.Object.extend("ECommerceProduct");
      let product = new Product();
      product.set('name', 'Nombre del producto');
      product.set('nameSearch', 'nombre del producto');
      product.set('detail', 'Detalle del producto');
      product.set('price', 0);
      product.set('isDiscount', false);
      product.set('discountPercentage', 0);
      product.set('image', '');
      product.set('tag', []);
      product.setACL(ACLPublicRead(adminRole));
      product = await product.save();
      const Address = Parse.Object.extend("address");
      let address = new Address();
      address.set('address', 'Calle falsa 123');
      address.set('extra', 'apto 2');
      address.set('location', new Parse.GeoPoint(0, 0));
      address.set('type', 'home');
      address.set('user', admin);
      address.set('status', false);
      address.setACL(ACLPublicRead(undefined, admin));
      address = await address.save();
      const Delivery = Parse.Object.extend("delivery");
      let delivery = new Delivery();
      delivery.set('user', admin);
      delivery.set('products', [{ id: product.id, qty: 1 }]);
      delivery.set('address', address);
      delivery.set('status', 1);
      delivery.set('cancelReason', '');
      delivery.setACL(ACLPublicRead(adminRole, admin));
      delivery = await delivery.save();

      await Parse.Config.save({
        location: new Parse.GeoPoint({ latitude: 11.009678, longitude: -74.833201 })
      });
    }
    if (modules.includes("chat")) {

    }
  }*/
};

const ACLPublicRead = (role, user) => {
  var ACL = new Parse.ACL();
  ACL.setPublicReadAccess(true);
  if (role) {
    ACL.setRoleWriteAccess(role, true);
  }
  if (user) {
    ACL.setWriteAccess(user, true);
  }
  return ACL;
};
const isInitialized = async () => {
  let roleAdmin = await new Parse.Query(Parse.Role).equalTo("name","Administrator").first();
  return roleAdmin !== undefined;
}

const initialize = async (request) => {
  if (await isInitialized()) {
    return { success: false, message: "server alredy initialized" };
  }
  if (!request.params.username || !request.params.password || !request.params.email || !request.params.location) {
    return { success: false, message: "missing parameters" };
  }
  // Creacion del usuario
  let admin = new Parse.User();
  admin.set("username", request.params.username);
  admin.set("password", request.params.password);
  admin.set("email", request.params.email);
  admin = await admin.signUp();

  // Creacion del rol administrador
  const roleAdmin = new Parse.Role("Administrator", ACLPublicRead());
  roleAdmin.getUsers().add(admin);
  await roleAdmin.save();

  // Creacion del rol repartidor
  const roleCourrier = new Parse.Role("Courrier", ACLPublicRead(roleAdmin));
  await roleCourrier.save()

  // Nombre del restaurante
  // Direccion fisica
  // Telefono
  // Logo

  // Guardar la configuracion
  await Parse.Config.save({
    location: request.params.location
  },{ useMasterKey: true });
  return { success: true };
}
