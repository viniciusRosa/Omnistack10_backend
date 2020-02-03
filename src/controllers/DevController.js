const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../webSocket');

module.exports = {

	async index(req, res) {
		const devs = await Dev.find();
		return res.json(devs);
	},

	async store(req, res) {
		const { github_username, techs, latitude, longitude } = req.body;
		let dev = await Dev.findOne({ github_username });

		if (!dev) {
			const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
			const { name = login, avatar_url, bio } = apiResponse.data;

			const techsArray = parseStringAsArray(techs);

			const location = {
				type: 'Point',
				coordinates: [longitude, latitude],
			};

			dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				techs: techsArray,
				location
			});

			const sendSocketMessageTo = findConnections({
				latitude,
				longitude
			}, techsArray,
			)

			sendMessage(sendSocketMessageTo, 'new-dev', dev)
		}
		return res.json(dev);
	},

	async update(req, res) {

		console.log(req.params);

		const dev = await Dev.findByIdAndUpdate(req.params.id, req.body, { new: true }, () => {
			dev.techs = req.body.techs;
		});

		return res.json(dev)

	},

	async delete(req, res) {

		console.log(req.params);

		const dev = await Dev.findByIdAndDelete(req.params.id);

		return res.send()

	}
}