module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define(
      "tbl_booking",
      {
        f_code: {
          type: Sequelize.INTEGER,
          field: "f_code",
          autoIncrement: true,
          allowNull: false,        
          primaryKey: true,
        },
        f_running: {
          type: Sequelize.STRING,
          field: "f_running",
        },
        f_customer: {
          type: Sequelize.STRING,
          field: "f_customer",
        },
        f_mobile: {
          type: Sequelize.STRING,
          field: "f_mobile",
        },
        f_cardid: {
          type: Sequelize.STRING,
          field: "f_cardid",
        },
        f_birthdate: {
          type: Sequelize.STRING,
          field: "f_birthdate",
        },
        f_address: {
          type: Sequelize.STRING,
          field: "f_address",
        },
        f_mail_address: {
          type: Sequelize.STRING,
          field: "f_mail_address",
        },
        f_email: {
          type: Sequelize.STRING,
          field: "f_email",
        },
        f_line: {
          type: Sequelize.STRING,
          field: "f_line",
        },
        f_nation: {
          type: Sequelize.STRING,
          field: "f_nation",
        },
        f_nation: {
          type: Sequelize.STRING,
          field: "f_nation",
        },
        f_gent: {
          type: Sequelize.STRING,
          field: "f_gent",
        },
        f_bud: {
          type: Sequelize.STRING,
          field: "f_bud",
        },
        f_promotion: {
          type: Sequelize.STRING,
          field: "f_promotion",
        },
        f_groupcode: {
          type: Sequelize.STRING,
          field: "f_groupcode",
        },
        f_totalprice: {
          type: Sequelize.STRING,
          field: "f_totalprice",        
        },
        f_bankname: {
            type: Sequelize.STRING,
            field: "f_bankname",        
          },
          f_name: {
            type: Sequelize.STRING,
            field: "f_name",        
          },
          f_number: {
            type: Sequelize.STRING,
            field: "f_number",        
          },
          f_branch: {
            type: Sequelize.STRING,
            field: "f_branch",        
          },
          f_bookingdate: {
            type: Sequelize.STRING,
            field: "f_bookingdate",        
          },
          f_pricesum: {
            type: Sequelize.STRING,
            field: "f_pricesum",        
          },
          f_status: {
            type: Sequelize.STRING,
            field: "f_status",        
          },
          f_userlogin: {
            type: Sequelize.STRING,
            field: "f_userlogin",        
          },
          f_project: {
            type: Sequelize.STRING,
            field: "f_project",        
          },              
          f_unit: {
            type: Sequelize.STRING,
            field: "f_unit",        
          },
          f_type: {
            type: Sequelize.STRING,
            field: "f_type",        
          },
          f_sq_m: {
            type: Sequelize.STRING,
            field: "f_sq_m",        
          },
          f_sq_wa: {
            type: Sequelize.STRING,
            field: "f_sq_wa",        
          },     
          f_downpayment: {
            type: Sequelize.STRING,
            field: "f_downpayment",        
          },
          f_booking: {
            type: Sequelize.STRING,
            field: "f_booking",        
          },
          f_contact: {
            type: Sequelize.STRING,
            field: "f_contact",        
          },
          f_down: {
            type: Sequelize.STRING,
            field: "f_down",        
          },                       
          f_final_payment: {
            type: Sequelize.STRING,
            field: "f_final_payment",        
          },
          f_datesave: {
            type: Sequelize.STRING,
            field: "f_datesave",        
          },
          f_cashdiscount: {
            type: Sequelize.STRING,
            field: "f_cashdiscount",        
          },
          f_type_contact: {
            type: Sequelize.STRING,
            field: "f_type_contact",        
          },   
          
          f_contactnumber: {
            type: Sequelize.STRING,
            field: "f_contactnumber",        
          },   
          f_ref: {
            type: Sequelize.STRING,
            field: "f_ref",        
          },   
          f_grade: {
            type: Sequelize.STRING,
            field: "f_grade",        
          },   
          f_datetranfer: {
            type: Sequelize.STRING,
            field: "f_datetranfer",        
          },   
          f_datecancle: {
            type: Sequelize.STRING,
            field: "f_datecancle",        
          },   
          f_contacetranfer: {
            type: Sequelize.STRING,
            field: "f_contacetranfer",        
          },   
          f_datefollow: {
            type: Sequelize.STRING,
            field: "f_datefollow",        
          },   
          f_datecancletimestamp: {
            type: Sequelize.STRING,
            field: "f_datecancletimestamp",        
          },   
          f_contacetranfertimestamp: {
            type: Sequelize.STRING,
            field: "f_contacetranfertimestamp",        
          },                                                                                             
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
    return Booking;
  };
  