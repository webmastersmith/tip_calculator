import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { showAmount, showTip } from "./Controller"

const { pre, div, h1, form, label, i, input, span } = hh(h)

// create input box
function inputSet(img, name, value, fn, dispatch) {
	return div({ className: `block mb-5 w-75%` }, [
		label({ className: `` }, name),
		div({ className: `relative` }, [
			div(
				{
					className: `absolute right-6 top-0 h-full w-6`,
				},
				i({ className: `${img} text-green-600` })
			),
			input({
				className: `border border-black pl-2`,
				type: "text",
				value,
				oninput: (e) => dispatch(fn(e.target.value)),
			}),
		]),
	])
}

function createTotals(str, color = "") {
	return div({ className: `my-2` }, [span({ className: `${color}` }, str)])
}

// total page view
function view(dispatch, model) {
	const { amount, tip, totalAmount, totalTip } = model
	return div({ className: `w-80` }, [
		h1(
			{ className: `text-4xl font-bold border-b-2 border-black w-100 pb-1` },
			"Tip Calculator"
		),
		form({ className: `my-5 w-100` }, [
			inputSet("icon-dollar-sign", "Amount", amount, showAmount, dispatch),
			inputSet("icon-percent", "Tip", tip, showTip, dispatch),
			createTotals(`Tip: $${totalTip}`, "text-blue-500"),
			createTotals(`Total: $${totalAmount}`, "text-red-500"),
		]),

		// pre(JSON.stringify(model, null, 2)),
	])
}

export default view
