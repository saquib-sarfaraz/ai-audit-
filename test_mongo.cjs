const mongoose = require('mongoose');
const uri = "mongodb+srv://fk160837_db_user:6OQHwY6YnLUpOtpS@cluster0.xqdizqe.mongodb.net/?appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    const reportSchema = new mongoose.Schema({}, { strict: false });
    const Report = mongoose.model('Report', reportSchema, 'reports');
    return Report.findOne().sort({ createdAt: -1 });
  })
  .then(doc => {
    console.log("Latest Document:", JSON.stringify(doc, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
