//const wizard = require('./wizard');
const authEmail = require('./authentication-email');
const authCompact = require('./authentication-compact');
const profile = require('./profile');
const ecommerce = require('./ecommerce');
const imageController = require('./imageController');
const setup = require("./setup");

Parse.Cloud.define('authentication-email_generateCode', authEmail.generateCode);
Parse.Cloud.define('authentication-email_validateCode', authEmail.validateCode);
Parse.Cloud.define('authentication-email_changePassword', authEmail.changePassword);

Parse.Cloud.define('authentication-compact_createUser', authCompact.createUser);
Parse.Cloud.define('authentication-compact_resetUserPassword', authCompact.resetUserPassword);

Parse.Cloud.define("profile_uploadAvatar", profile.uploadAvatar);

Parse.Cloud.define("general_upload-image", imageController.upload);

Parse.Cloud.afterSave("delivery", ecommerce.createReceipt);

Parse.Cloud.define("setup-is_initialized", setup.isInitialized);
Parse.Cloud.define("setup-initialize", setup.initialize);