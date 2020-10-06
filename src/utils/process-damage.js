export function processDamage({ hp, damage, isHalved, modifier }) {
	const initialDamage = isHalved ? Math.floor(damage / 2) : damage;
	const trimmedModifier = typeof modifier === 'string' && modifier.replaceAll(' ', '');
	const finalModifiers = trimmedModifier && trimmedModifier.split(/(?<=[+-][0-9]+)/i);

	let modifiedDamage = initialDamage;

	if (finalModifiers.length > 0) {
		finalModifiers.forEach(function(modifier) {
			modifiedDamage = +modifiedDamage + +modifier;
		});
	}

	const hasDamage = modifiedDamage > 0;
	const newCalculatedHp = hp - modifiedDamage > 0 ? hp - modifiedDamage : 0;

	return {
		damage: hasDamage ? modifiedDamage : null,
		hp: newCalculatedHp,
	};
}