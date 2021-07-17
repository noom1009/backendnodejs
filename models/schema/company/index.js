module.exports = (sequelize, Sequelize) => {
	const Company = sequelize.define(
	  "tbl_company",
	  {
	    f_code: {
	      type: Sequelize.INTEGER,
	      field: "f_code",
	      autoIncrement: true,
	      allowNull: false,
	      primaryKey: true,
	    },
	    f_companyname: {
	      type: Sequelize.STRING,
	      field: "f_companyname",
	    },
	    f_address: {
	      type: Sequelize.STRING,
	      field: "f_address",
	    },
	    f_tel: {
	      type: Sequelize.STRING,
	      field: "f_tel",
	    },
	    f_tax: {
	      type: Sequelize.STRING,
	      field: "f_tax",
	    },
	    f_let: {
	      type: Sequelize.STRING,
	      field: "f_let",
	    },
	    f_long: {
	      type: Sequelize.STRING,
	      field: "f_long",
	    },
	    f_website: {
	      type: Sequelize.STRING,
	      field: "f_website",
	    },
	    f_facebook: {
	      type: Sequelize.STRING,
	      field: "f_facebook",
	    },
	    f_youtube: {
	      type: Sequelize.STRING,
	      field: "f_youtube",
	    },
	    f_instagram: {
	      type: Sequelize.STRING,
	      field: "f_instagram",
	    },
	    f_twitter: {
	      type: Sequelize.STRING,
	      field: "f_twitter",
	    },
	    f_logo: {
	      type: Sequelize.STRING,
	      field: "f_logo",
	    },
	    f_status: {
	      type: Sequelize.STRING,
	      field: "f_status",
	    },
	  },
	  {
	    timestamps: false,
	    freezeTableName: true,
	  }
	);
	return Company;
      };
