const checkMillionDollarIdea = (req, res, next) => {
	const { numWeeks, weeklyRevenue } = req.body;
	
	if (
		!numWeeks ||
		!weeklyRevenue ||
		isNaN(Number(numWeeks)) ||
		isNaN(Number(weeklyRevenue)) ||
		Number(numWeeks) * Number(weeklyRevenue) < 1000000
	) {
		return res.status(400).send('Idea must be worth at least one million dollars!');
	}
	
	next();
};

module.exports = checkMillionDollarIdea;
