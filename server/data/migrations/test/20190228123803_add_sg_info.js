exports.up = function(knex, Promise) {
  return addSgRecipient()
    .then(addSgList)
    .then(addSgCampaign);

  function addSgRecipient() {
    return knex.schema.table('students', tbl => {
      tbl.string('sg_recipient_id');
    });
  }
  function addSgList() {
    return knex.schema.table('classes', tbl => {
      tbl.string('sg_list_id');
    });
  }
  function addSgCampaign() {
    return knex.schema.table('teachers_classes_refreshrs', tbl => {
      tbl.string('sg_campaign_id');
    });
  }
};

exports.down = function(knex, Promise) {
  return dropSgRecipient()
    .then(dropSgList)
    .then(dropSgCampaign);

  function dropSgRecipient() {
    return knex.schema.table('students', tbl => {
      tbl.dropColumn('sg_recipient_id');
    });
  }

  function dropSgList() {
    return knex.schema.table('classes', tbl => {
      tbl.dropColumn('sg_list_id');
    });
  }

  function dropSgCampaign() {
    return knex.schema.table('teachers_classes_refreshrs', tbl => {
      tbl.dropColumn('sg_campaign_id');
    });
  }
};
