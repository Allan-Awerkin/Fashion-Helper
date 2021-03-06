/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Locale model
var Genders = sequelize.import(__dirname + "/../models/Gender");

// Create the schema if necessary
// Genders.sync();

/**
 * takes an Array of records
 * and and Array of fields and returns 
 * a collection.
 *
 * 
 * @param {Array} recs
 * @param {Array} fields
 * @return {Array}
 * @api public
 */
function mapCollection(recs, fields){
	return recs.map(function(row){
		var result = {};
		fields.forEach(function(field){
			result[field] = row[field]
		});
		return result;
	});
};

/**
 * GET /genders
 */
exports.index = function(req, res){
	Genders.findAll().on('success', function(genders){

		switch(req.format){
			case 'json':
				// debugger;
				var recs = mapCollection(genders, ['id', 'gender', 'visible']);
				res.json(recs);
				break;
			
			case 'xml':
				res.send('<genders>' + genders.map(function(g){
					return '<gender>' + g.gender + '</gender>';
				}).join('') + '</genders>');
				break;

			default:
				// debugger;
				res.render('genders', {
					locals: {
						title: 'Genders',
						data: genders
					}
				});
		}
	}).on('failure', function(err){
		switch(req.format){
			case 'json':
				res.json({
					success: false,
					msg: err
				}, 500);

			// TODO: add xml res

			default:
				res.render('500', {
					locals: {
						title: '500 - Internal Server Error',
						desc: err
					},
					status: 500
				});
		};
	});
};

/**
 * GET /genders/:id
 */
exports.show = function(req, res){
	var genderId = parseInt(req.params.gender);

	Genders.find(genderId).on('success', function(gender){
		switch(req.format){
			case 'json':
				if(!gender){
					res.json({
						success: false,
						msg: 'The requested resource could not be found'
					}, 404);
				} else {
					var rec = {
						'id': gender.id,
						'gender': gender.gender,
						'visible': gender.visible
					};
					res.json({
						success: true,
						article: rec
					});
				}
				break;

			case 'xml':
				res.send('<gender>' + gender.gender + '</gender>');
				break;

			default:
				if(!gender){
					res.render('404', {
						locals: {
							title: '404 - Not Found',
							desc: 'The requested resource could not be found'
						},
						status: 404
					});
				} else {
					res.render('gender_show', {
						locals: {
							title: 'Display Gender',
							data: {
								'gender': gender
							}
						}
					});
				}
		};
	}).on('failure', function(err){
		switch(req.format){
			case 'json':
				res.json({
					success: false,
					msg: err
				}, 500);

			// TODO: add xml res

			default:
				res.render('500', {
					locals: {
						title: '500 - Internal Server Error',
						desc: err
					},
					status: 500
				});
		};
	});
};

/**
 * GET /genders/new
 */
exports.new = function(req, res){
	res.render('genders_new', {
		locals: {
			title: 'New Gender'
		}
	});
};

/**
 * POST /genders
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Genders.build({
		gender: req.body.gender
	});
	post.save().on('success', function(id){
		res.json({
			success: true
		}, 200);
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};

/**
 * GET /genders/:id/edit
 */
exports.edit = function(req, res){
	var genderId = parseInt(req.params.gender);
	Genders.find(genderId).on('success', function(rec){
		res.render('gender_edit', {
			id: rec.id,
			title: 'Edit gender: ' + rec.gender,
			gender: rec.gender
		});
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};

/**
 * PUT /genders/:id
 */
exports.update = function(req, res){
	if(req.body.gender){
		var genderId = parseInt(req.params.gender);
		Genders.find(genderId).on('success', function(rec){
			rec.updateAttributes({
				gender: req.body.gender
			}).on('success', function(err){
				res.json({
					success: true,
				}, 200);
			}).on('failure', function(err){
 				res.json({
					success: false,
					msg: err
				}, 500);
 			});
 		}).on('failure', function(err){
 			res.json({
				success: false,
				msg: err
			}, 500);
 		});
 	} else {
 		res.json({
			success: false,
			msg: 'Data not provided'
		}, 500);
 	}
};

/**
 * DELETE /genders/:id
 *
 * TODO: add authorization here
 */
exports.destroy = function(req, res){
	var genderId = parseInt(req.params.gender);
	Genders.find(genderId).on('success', function(rec){
		rec.destroy().on('success', function(foo){
			res.json({
				success: true,
			}, 200);
		}).on('failure', function(err){
			res.json({
				success: false,
				msg: err
			}, 500);
		});
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};