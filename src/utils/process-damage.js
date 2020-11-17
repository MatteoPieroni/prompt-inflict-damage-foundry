// we pass the actor instance here, because passing hp directly caused the value
// to be in the closure and not up to date
export function processDamage({ actorInstance, damage, isHalved, modifier }) {
	const initialDamage = isHalved ? Math.floor(damage / 2) : damage;
	const trimmedModifier = typeof modifier === 'string' && modifier.replaceAll(' ', '');
	let modifiedDamage = initialDamage;

	if (trimmedModifier.length > 0) {
		try {
			// this is a small test to make sure that the user input is only numbers and operators
			if (!(/^[\d+-]+$/g.test(trimmedModifier))) {
				throw new Error('The string has characters that are not allowed');
			}

			modifiedDamage = eval(`${initialDamage} + ${trimmedModifier}`);
		} catch(e) {
			console.error(e);

			return ui.notifications.error(game.i18n.localize("PID.FormulaError"));
		}
	}

	const hasDamage = modifiedDamage > 0;
	const newCalculatedHp = 
		actorInstance.data.data.attributes.hp.value - modifiedDamage > 0 ?
		actorInstance.data.data.attributes.hp.value - modifiedDamage :
		0;

	return {
		damage: hasDamage ? modifiedDamage : null,
		hp: newCalculatedHp,
	};
}