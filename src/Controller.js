const MSG = {
	AMOUNT: "AMOUNT",
	TIP: "TIP",
}

export function showAmount(mealCost) {
	return {
		type: MSG.AMOUNT,
		mealCost,
	}
}
export function showTip(tipPercentage) {
	return {
		type: MSG.TIP,
		tipPercentage,
	}
}

function update(msg, model) {
	const { mealCost: oldMealCost, tipPercentage: oldTipPercentage } = model
	switch (msg.type) {
		case MSG.AMOUNT: {
			const { mealCost: newMealCosts } = msg
			const mealCost = /^\d+\.?\d{0,2}?$|^$/.test(newMealCosts)
				? newMealCosts
				: oldMealCost
			return { ...model, mealCost }
		}
		case MSG.TIP: {
			const { tipPercentage: newTipPercentage } = msg
			const tipPercentage = /^\d{0,2}?$|^$/.test(newTipPercentage)
				? newTipPercentage
				: oldTipPercentage
			return { ...model, tipPercentage }
		}
	}
	return model
}

export default update
