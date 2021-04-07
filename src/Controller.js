import * as R from "ramda"

const MSG = {
	AMOUNT: "AMOUNT",
	TIP: "TIP",
}

// change showAmount(27)
export function showAmount(amount) {
	return {
		type: MSG.AMOUNT,
		amount,
	}
}
export function showTip(tip) {
	return {
		type: MSG.TIP,
		tip,
	}
}

function update(msg, model) {
	const { amount: oldAmount, tip: oldTip } = model

	switch (msg.type) {
		case MSG.AMOUNT: {
			const { amount: amounts } = msg
			const amount = /^\d+\.?\d{0,2}?$|^$/.test(amounts) ? amounts : oldAmount
			const { totalAmount, totalTip } = getTotal(amount, oldTip)
			console.log(totalAmount, totalTip)
			return {
				...model,
				amount,
				totalTip,
				totalAmount,
			}
		}
		case MSG.TIP: {
			const { tip: tips } = msg
			const tip = /^\d{0,2}?$|^$/.test(tips) ? tips : oldTip
			const { totalAmount, totalTip } = getTotal(oldAmount, tip)
			return {
				...model,
				tip,
				totalTip,
				totalAmount,
			}
		}
		default:
			return model
	}
}

function round(num) {
	return Math.round(num * 100) / 100
}
function getTotal(amount = 0, tip = 0) {
	const sum = (parseFloat(amount) * 100 * (parseInt(tip) + 100)) / 10000
	const totalAmount = round(sum) || 0
	const totalTip = round(totalAmount - parseFloat(amount)) || 0
	return {
		totalAmount,
		totalTip,
	}
}

export default update
