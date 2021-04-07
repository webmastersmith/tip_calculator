import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { showAmount, showTip } from "./Controller"

const { pre, div, h1, label, i, input, p } = hh(h)

const round = (num) => Math.round(num * 100) / 100
const findCost = (meal, tipPercent, modifier) =>
	round(
		(parseFloat(meal) * 100 * (parseInt(tipPercent) + modifier)) / 10000 || 0
	)

// create input box
function inputSet(iconName, topLabelName, value, oninput) {
	return div({ className: `block mb-5 w-75%` }, [
		label({ className: `` }, topLabelName),
		div({ className: `relative` }, [
			div({ className: `absolute right-6 top-0 h-full w-6` }, [
				i({ className: `${iconName} text-green-600` }),
			]),
			input({
				className: `border border-black pl-2`,
				type: "text",
				value,
				oninput,
			}),
		]),
	])
}

function totalSet(mealCost, tipPercentage) {
	return div({ className: `my-2` }, [
		p(
			{ className: `text-blue-500` },
			`Tip: $${findCost(mealCost, tipPercentage, 0)}`
		),
		p(
			{ className: `text-red-500` },
			`Total: $${findCost(mealCost, tipPercentage, 100)}`
		),
	])
}

// total page view
function view(dispatch, model) {
	const { mealCost, tipPercentage } = model
	return div({ className: `w-80` }, [
		h1(
			{ className: `text-4xl font-bold border-b-2 border-black w-100 pb-1` },
			"Tip Calculator"
		),
		div({ className: `my-5 w-100` }, [
			inputSet("icon-dollar-sign", "Amount", mealCost, (e) =>
				dispatch(showAmount(e.target.value))
			),
			inputSet("icon-percent", "Tip", tipPercentage, (e) =>
				dispatch(showTip(e.target.value))
			),
			totalSet(mealCost, tipPercentage),
		]),

		// pre(JSON.stringify(model, null, 2)),
	])
}

export default view
